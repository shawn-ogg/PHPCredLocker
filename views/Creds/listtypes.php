<?php
/** Add Credential Type
*
* Copyright (C) 2012 B Tasker
* Released under GNU GPL V2
* See LICENSE
*
*/ 
defined('_CREDLOCK') or die;
BTMain::checkSuperAdmin();

global $notifications;


$db = new CredDB;
$crypt = new Crypto;
$crypt->safemode = 0;


$credtypes = $db->getCredTypes();

$path = array(array('name'=>'Credential Types','url'=>'index.php?option=listCredTypes'));

$notifications->setBreadcrumb($path);


foreach ($credtypes as $cred){

$name = $crypt->decrypt($cred->Name,'CredType');
$creds[$name] = $cred->id;

}

ksort($creds);
?>
<h1>Credential Types</h1>
<br />
<button class="btn btn-primary" onclick="window.location.href = 'index.php?option=addCredType';">Add Credential Type</button><br />
<br />
<table class="table table-hover">
<tr><th>Credential Type</th><th></th><th></th></tr>


<?php 
foreach ($creds as $key=>$value){
?>


<tr id='CredType<?php echo $value;?>'>
  <td><?php echo $key;?></td>
  <td class='editicon' onclick="window.location.href = 'index.php?option=editCredType&id=<?php echo $value;?>';"><i class='icon-pencil'></i></td>
  <td class='delicon' onclick="delCredType('<?php echo $value;?>');"><i class='icon-remove'></i></td>
</tr>


<?php } ?>
</table>
<button class="btn btn-primary" onclick="window.location.href = 'index.php?option=addCredType';">Add Credential Type</button><br />