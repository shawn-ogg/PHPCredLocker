<?php
/** Add Customer
*
* Copyright (C) 2012 B Tasker
* Released under GNU GPL V2
* See LICENSE
*
*/
defined('_CREDLOCK') or die;
global $notifications;


$notifications->setPageTitle("Add ".Lang::_('Customer'));

if (BTMain::getVar('AddCustSubmitted')){

$db = new CustDB;


$frmname = BTMain::getVar('FrmName');
$fname = BTMain::getVar('FrmconName');
$sname = BTMain::getVar('FrmSurname');
$email = BTMain::getVar('FrmEmail');




	if (!BTMain::getConnTypeSSL()){
	    $tlskey = BTMain::getsessVar('tls');
	    $frmname = base64_decode($crypt->xordstring(base64_decode($frmname),$tlskey));
	    $fname = base64_decode($crypt->xordstring(base64_decode($fname),$tlskey));
	    $sname = base64_decode($crypt->xordstring(base64_decode($sname),$tlskey));
	    $email = base64_decode($crypt->xordstring(base64_decode($email),$tlskey));
	 }


if ($db->addCustomer(htmlspecialchars($frmname),BTMain::getVar('frmGroup'),htmlspecialchars($fname),htmlspecialchars($sname),htmlspecialchars($email))){


$notifications->setNotification("addCustSuccess");

}else{
$notifications->setNotification("addCustFail");

}






}
$path = array(array('name'=>'Customers','url'=>'index.php?option=viewCustomers'),array('name'=>'Add','url'=>'index.php?option=addCustomer'));

$notifications->setBreadcrumb($path);


?>
<form method="POST" onsubmit="return checkNewCust();">
<input type="hidden" name="option" value="addCustomer">
<input type="hidden" name="AddCustSubmitted" value="1">
<label for="FrmName">Company Name</label><input type="text" name="FrmName" id="FrmName">
<label for="FrmconName">Contact First Name</label><input type="text" name="FrmconName" id="FrmconName">
<label for="FrmSurname">Surname</label><input type="text" name="FrmSurname" id="FrmSurname">
<label for="FrmEmail">Email</label><input type="text" name="FrmEmail" id="FrmEmail">

<?php include 'lib/includes/groupSelection.php'; ?>

<input type="submit" class="btn btn-primary" value="Add Customer">
</form>