<?php
/** Add Credential
*
* Copyright (C) 2012 B Tasker
* Released under GNU GPL V2
* See LICENSE
*
*/ 




$creds = new CredDB;
global $notifications;
if (BTMain::getVar('addCredSubmitted')){


  // Add the cred to the db
  if ($creds->addCred(BTMain::getVar('cust'),BTMain::getVar('FrmCredType'),BTMain::getVar('frmCredential'),BTMain::getVar('frmClicky'),BTMain::getVar('frmGroup'),BTMain::getVar('frmAddress'),BTMain::getVar('frmUser'))){
  // Success
  $notifications->setNotification("addCredSuccess");
  }else{
  $notifications->setNotification("addCredFail");
  }





}

$path = array(array('name'=>'Credentials','url'=>'#'),array('name'=>'Add','url'=>'index.php?option=addCred&cust='.BTMain::getVar('cust')));

$notifications->setBreadcrumb($path);

$auth = new AuthDB;
$credtypes = $creds->getCredTypes();
$cust = BTMain::getVar('cust');
$custs = new CustDB;
$customers = $custs->getAllCustomers();



?>

<form method="POST" onsubmit="return checkNewCred();">

<input type="hidden" name="option" value="addCred">
<input type="hidden" name="addCredSubmitted" value="1">
<input type="hidden" name="frmClicky" id="frmClicky" value="0">




<label for='FrmCustomer'>Customer</label><select name="cust" id="FrmCustomer">

<?php
$crypt = new Crypto;
$crypt->safety = 0;

foreach ($customers as $customer){

$plaintext = $crypt->decrypt($customer->Name,'Customer');

$custdets[$plaintext] = "<option value='{$customer->id}'" ;

    if ($customer->id == $cust){
    $custdets[$plaintext] .= " selected";
    }

$custdets[$plaintext] .= ">$plaintext</option>";

}

ksort($cust);
echo implode("\n",$custdets);
?>


</select>

<label for='FrmCredType'>Credential Type</label><select id="FrmCredType" name="FrmCredType">
<?php 
foreach ($credtypes as $cred){

?>
<option value="<?php echo $cred->id;?>"><?php echo $crypt->decrypt($cred->Name,'CredType');?></option>
<?php

}
unset($crypt);
?>
</select>

<label for="frmUser">User</label><input type="text" name="frmUser" id="frmUser">

<label for="frmCredential">Credentials</label><textarea id="frmCredential" name="frmCredential"></textarea>

<label for="frmAddress">Address</label><input type="text" name="frmAddress" id="frmAddress">



<?php include 'lib/includes/groupSelection.php'; ?>

<input type="submit" class="btn btn-primary" value="Add Credential">
</form>