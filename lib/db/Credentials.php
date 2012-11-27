<?php
/** Credential related Database functions
*
* Copyright (C) 2012 B Tasker
* Released under GNU GPL V2
* See LICENSE
*
*/ 
defined('_CREDLOCK') or die;


class CredDB extends BTDB{


/** Check Cred Types are specified
*
* @return boolean
*/
function checkCredTypesDefined(){

$sql = "SELECT * FROM CredTypes";
$this->setQuery($sql);
return $this->loadResult();
}



/** Delete the credential specified
*
* @arg id INT
*
* @return boolena
*/
function DelCredential($id){
// Log the request
$log = new Logging;
$log->logEntry($id,10);
$ACL = BTMain::buildACLQuery();
$id = $this->StringEscape($id);
$sql = "DELETE FROM Cred WHERE id='$id' AND ($ACL)";
$this->setQuery($sql);
return $this->runQuery();

}



/** Retrieve the credential specified
*
* @arg id INT
*
* @return object
*/
function FetchCredential($id){
// Log the request
$log = new Logging;
$log->logEntry($id,9);

$ACL = BTMain::buildACLQuery();

$id = $this->StringEscape($id);

$sql = "SELECT Hash, Clicky, Address, UName, CredType, `Group` FROM Cred WHERE id='$id' AND ($ACL)";
$this->setQuery($sql);


return $this->loadResult();
}


/** Add a new Credential Type
*
* @arg Name string
*
* @return boolean
*/
function AddCredType($name){
$crypt = new Crypto;
$name = $crypt->encrypt($name,'CredType');

$name = $this->StringEscape($name);

$sql = "INSERT INTO CredTypes (`Name`) VALUES ('$name')";
$this->setQuery($sql);

$id = $this->insertID();

if ($id){
$log = new Logging;
$log->logEntry($id,15);
return true;
}else{
return false;
}
}



/** Retrieve the available credential types
*
*/
function getCredTypes(){

$sql = "SELECT * FROM CredTypes ORDER BY Name ASC";
$this->setQuery($sql);
return $this->loadResults();
}


/** Retrieve credential type
*
* @arg id INT
*
* @return object
*/
function getCredType($id){
$id = $this->StringEscape($id);
$sql = "SELECT * FROM CredTypes WHERE id='$id'";
$this->setQuery($sql);
return $this->loadResult();
}



/** Edit Credential Type
*
* @arg id - INT
* @arg name - string
*
* @return boolean
*/
function editCredType($id,$name){
$crypt = new Crypto;
$id = $this->StringEscape($id);

$name = $crypt->encrypt($name,'CredType');
$name = $this->StringEscape($name);

$sql = "UPDATE CredTypes SET `Name`='$name' WHERE id='$id'";
$this->setQuery($sql);

return $this->runQuery();

}



/** Delete credential type and all associated creds
*
* @arg id INT
*
* @return boolean
*/
function DelCredentialType($id){
$id = $this->StringEscape($id);

$sql = "DELETE FROM Cred WHERE `CredType`='$id'";
$this->setQuery($sql);
$this->runQuery();

$sql = "DELETE FROM CredTypes WHERE id='$id'";
$this->setQuery($sql);
if ($this->runQuery()){
$log = new Logging;
$log->logEntry($id,16);
return true;
}else{
return false;
}






}


/** Insert a new Credential into the database
*
* @arg cust - INT
* @arg credtype - INT
* @arg cred - string
* @arg clicky - tinyint
* @arg group - INT
* @arg address - string
* @arg uname - string
*
* @return object
*/
function addCred($cust,$credtype,$cred,$clicky,$group = 1,$address = '', $uname = '')
{


// Encrypt the relevant parts
$crypt = new Crypto;
$cred = $crypt->encrypt($cred,'Cre'.$credtype);
$address = $crypt->encrypt($address,'Cre'.$credtype);
$uname = $crypt->encrypt($uname,'Cre'.$credtype);


$address = $this->StringEscape($address);
$uname = $this->StringEscape($uname);
$credtype = $this->StringEscape($credtype);
$cred = $this->StringEscape($cred);
$cust = $this->StringEscape($cust);
$clicky = $this->StringEscape($clicky);
$date = date('Y-m-d H:i:s');
$group = $this->StringEscape($group);


$sql = "INSERT INTO Cred (`cust`,`Added`,`Group`,`Hash`,`CredType`,`Clicky`,`Address`,`UName`) ".
"VALUES ('$cust','$date','$group','$cred','$credtype','$clicky','$address','$uname')";
$this->setQuery($sql);

$id = $this->insertID();

    if ($id){
      $log = new Logging;
      $log->logEntry($id,7);
      return true;
      }else{
      return false;
      }

}




/** Edit Specified Credential
*
* @arg id - INT
* @arg credtype - INT
* @arg cred - string
* @arg clicky - tinyint
* @arg group - INT
* @arg address - string
* @arg uname - string
*
* @return object
*/
function editCred($id,$credtype,$cred,$clicky,$group = 1,$address = '', $uname = '')
{


// Initialise some vars
$crypt = new Crypto;
$ACL = BTMain::buildACLQuery();
$credtype = $this->StringEscape($credtype);
$id = $this->StringEscape($id);
$date = date('Y-m-d H:i:s');
$group = $this->StringEscape($group);


// build the SQL

$sql = "UPDATE Cred SET `Added`='$date', `Group`='$group',";

if ($cred){
$cred = $crypt->encrypt($cred,'Cre'.$credtype);
$cred = $this->StringEscape($cred);
$sql .= "`Hash`='$cred',";
}


if ($clicky){
$clicky = $this->StringEscape($clicky);
$sql .= "`Clicky`='$clicky',";
}

if ($address){
$address = $crypt->encrypt($address,'Cre'.$credtype);
$address = $this->StringEscape($address);
$sql .= "`Address`='$address',";
}

if ($uname){
$uname = $crypt->encrypt($uname,'Cre'.$credtype);
$uname = $this->StringEscape($uname);
$sql .= "`UName`='$uname',";
}

// Get rid of the last comma to prevent a syntax error
$sql = rtrim($sql,",");

$sql .= " WHERE id='$id' AND ($ACL)";

echo $sql;

$this->setQuery($sql);

      if ($this->runQuery()){

      $log = new Logging;
      $log->logEntry($id,8);
      return true;
      }else{
      return false;
      }

}




}




?>