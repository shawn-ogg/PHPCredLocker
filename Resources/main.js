/* ************************************************************
Author:  Ben Tasker - BenTasker.co.uk
Description: Main Javascript functions for PHPCredLocker. Most 
  functions currently quick and dirty, will improve in future releases!

License: GNU AGPL V3 -  See http://www.gnu.org/licenses/agpl-3.0.html

Repo: https://github.com/bentasker/PHPCredLocker/
---------------------------------------------------------------
Copyright (c) 2012 Ben Tasker

*/


var counter=false, cancel='', dispcred, interval,terms;



function genPwd(a,l){
var i,
    p='',
    key="(=?)+.,abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    
    for (i=0; i<l; i++){
     p+=key.charAt(Math.floor(Math.random()*key.length)); 
    }


if (a =='r'){ return p; }
document.getElementById(a).value = p;


}



function resizebkgrnd(){
  
var width = document.documentElement.clientHeight, height = width, img;
img = document.getElementById('ContentWrap');
img.style.minHeight = eval(height * 0.8)+'px';



}


function CreateMenuContent(menu,type,tbl,cellNr, limit, menucode){
  
  var  menuentry, ind, item, str,
  lim = 0, 
  menu = document.getElementById(menu),  
  table = document.getElementById(tbl);
  
    if (!table){ return false; }
    
  
  
	for (var r = 0; r < table.rows.length; r++){
		if ( lim == limit) { break; }
		ind = table.rows[r].cells[3].innerHTML;
		if (ind == type ){
		  
		  
		  item = document.createElement('li');
		  item.id = menucode + table.rows[r].cells[2].innerHTML;		  
		  
		  item.innerHTML = "<a href='index.php?option="+table.rows[r].cells[5].innerHTML+"&id="+table.rows[r].cells[2].innerHTML+"'>"+table.rows[r].cells[cellNr].innerHTML+"</a>";
		  menu.appendChild(item);
		  
		  lim = lim + 1;
		  }
		
	}
  
  
  
  
}




function Credtimer(id)
{
  var count,
  cnt = document.getElementById('PassCount'+id),
  field = document.getElementById('retrievePassword'+id);
 
 
  count=cnt.value-1;
  cnt.value = count;
  
   
  if (count <= 0 || cancel == 1)
  {
     clearInterval(counter);
     if (document.getElementById('credHidden'+id)){
     field.innerHTML = 'Display<span class="DisPwdText"> Username</span>';  
     }else{
     field.innerHTML = 'Display<span class="DisPwdText"> Password</span>';  
     }
     
     document.getElementById('Address'+id).innerHTML = '';
     document.getElementById('UserName'+id).innerHTML = '';
     document.getElementById('Password'+id).innerHTML = '';
     document.getElementById('CredPluginOutput'+id).innerHTML = '';
     document.getElementById("clickCount"+id).value = 0;
     return;
  }

  field.innerHTML = 'Displaying for ' +count+ ' seconds';
}





function noCredTypes(){
  
  $(document).ready(function(){
    var btntop;
    
    if (document.getElementById('AddCredBtnTop')){
     btntop =  document.getElementById('AddCredBtnTop');
     btntop.parentNode.removeChild(btntop);
    }

    if (document.getElementById('AddCredBtnBottom')){
     btntop =  document.getElementById('AddCredBtnBottom');
     btntop.parentNode.removeChild(btntop);
    }
  });
  
  
  
  
  
}






/*********              Validation Stuff                       ****/



function loginReqProcess(){
  
 var i,
 a='',
 entered = document.getElementById('FrmPassPlace'),
 pass = document.getElementById('FrmPass');
 
 
 if (!enabledEncryption()){ pass.value = entered.value; return true;}
 
 // Calculate the encrypted value
 pass.value = Base64.encode(xorestr(entered.value,retAuthKey()));
  
 // Update the placeholder so we're not accompanying our encrypted text with the plaintext value
 
 for (i = 0;i < entered.length; i++){   
   a += "a";
 }
 entered.value = a;
 
  return true;
}


function checkNewCust(){
  
  var nme = document.getElementById('FrmName'),
  grp = document.getElementById('frmGroup'),
  email = document.getElementById('FrmEmail');
      
      if (email.value.indexOf('@') == -1){
	email.className += ' frmEntryMissed';
	return false;
      }
      
      
      if (grp.options[grp.selectedIndex].value == 'null'){
	grp.className += ' frmEntryMissed';
	return false;
      }
      
      
      if (nme.value == ''){
	nme.className += ' frmEntryMissed';
	return false;
      }
      
      
      if (enabledEncryption()){ 
 
 var fname = document.getElementById('FrmconName'),
  sname = document.getElementById('FrmSurname');
 
  // Calculate the encrypted value
 nme.value = Base64.encode(xorestr(nme.value,retKey()));
 email.value = Base64.encode(xorestr(email.value,retKey()));
 fname.value = Base64.encode(xorestr(fname.value,retKey()));
 sname.value = Base64.encode(xorestr(sname.value,retKey()));
}
      
      
      
      
      
      
  return true;
}



function checkNewCred(){

  
  var cred = document.getElementById('frmCredential'),
      user = document.getElementById('frmUser'),
      addr = document.getElementById('frmAddress'),
      grp = document.getElementById('frmGroup'),
      comment = document.getElementById('frmComment');
      
      
      
      if (grp.options[grp.selectedIndex].value == 'null'){
	grp.className += ' frmEntryMissed';
	return false;
      }
  
if (cred.value.indexOf("http") !== -1){


if (confirm("Click OK to make this credential a hyperlink in the database, click cancel to set not clicky")){

document.getElementById('frmClicky').value = 1;
}
}

if (enabledEncryption()){ 
 
 // Calculate the encrypted value
 cred.value = Base64.encode(xorestr(cred.value,retKey()));
 user.value = Base64.encode(xorestr(user.value,retKey()));
 addr.value = Base64.encode(xorestr(addr.value,retKey()));
 comment.value = Base64.encode(xorestr(comment.value,retKey()));
}
return true;

}




function checkEditCred(){

  
  var cred = document.getElementById('frmCredential'),
      user = document.getElementById('frmUser'),
      addr = document.getElementById('frmAddress'),
      grp = document.getElementById('frmGroup'),
      comment = document.getElementById('frmComment');
      
      
      
      if (grp.options[grp.selectedIndex].value == 'null'){
	grp.className += ' frmEntryMissed';
	return false;
      }
      
      
  
if (cred.value.indexOf("http") !== -1){


if (confirm("Click OK to make this credential a hyperlink in the database, click cancel to set not clicky")){

document.getElementById('frmClicky').value = 1;
}

}


// See if any have been blanked

if (cred.value == null || cred.value == ''){
 cred.value = ' '; 
}
if (comment.value == null || comment.value == ''){
 comment.value = ' '; 
}

if (user.value == null || user.value == ''){
 user.value = ' '; 
}

if (addr.value == null || addr.value == ''){
 addr.value = ' '; 
}


if (enabledEncryption()){ 
 
 // Calculate the encrypted value
 cred.value = Base64.encode(xorestr(cred.value,retKey()));
 user.value = Base64.encode(xorestr(user.value,retKey()));
 addr.value = Base64.encode(xorestr(addr.value,retKey()));
 comment.value = Base64.encode(xorestr(comment.value,retKey()));
}

return true;
}



function checkChngPwds(){
 if(!comparePwds() ){ return false; }
 
 if (!enabledEncryption()){ return true; }
 

 var pass = document.getElementById('frmPass'),
 passconf = document.getElementById('frmPassConf');
 pass.value = Base64.encode(xorestr(pass.value,retKey()));
 passconf.value = Base64.encode(xorestr(passconf.value,retKey()));
 
 return true;
  
  
}


function comparePwds(){
	  
	  
	  var strength, test,testvars,
	  pass = document.getElementById('frmPass'),
	  nomatch = document.getElementById('PassNoMatch'),
	  passscore = document.getElementById('passScore'),
	  minpass = document.getElementById('minpassStrength');
	  
	  
	  if (minpass){
	  
	    
	    strength = minpass.value;
	    
	    if (strength.indexOf("+") >= 0){
		if (parseInt(passScore.value) > 45){
		 test = true; 
		}else{
		 test = false; 
		}
	      
	    }else{
	      
	      testvars = strength.split("-");
	      
	      if ((parseInt(passScore.value) > testvars[0])){
		test = true;
		
	      }else{
		
		test = false;
	      }
	      
	      
	      
	      
	      
	    }
	    
	      if (!test){
	    
		nomatch.innerHTML = "Password is too weak";
		nomatch.style.display = 'inline-block';
	   
		return false;
	    
	  }
	  
	  }
	  
	  
	 if (pass.value != document.getElementById('frmPassConf').value){
	   nomatch.innerHTML = "Passwords don't match";
	   nomatch.style.display = 'inline-block';
	   
	   return false;
	 }
	 
	 if (pass.value == null || pass.value == ''){
	   
	   document.getElementById('PassNoMatch').innerHTML = "You must set a password";
	   nomatch.style.display = 'inline-block';
	   return false;
	 }
	 nomatch.style.display = 'none';
	  return true;  
	  
}
	
	
	
	
	
/**********                 AJAX                                  *****/	
	
	
	
function getCreds(id){

var xmlhttp, resp, limit, cnt, count, option,
    clicky = document.getElementById('retrievePassword'+id),
    Address = document.getElementById('Address'+id),
    User = document.getElementById('UserName'+id),
    Pass = document.getElementById('Password'+id),
    Pluginout = document.getElementById('CredPluginOutput'+id),
    key = retKey(),
    clickcount = document.getElementById("clickCount"+id);

    if (clickcount.value != 0){
	return; 
    }
    
    clickcount.value = 1;
    clicky.innerHTML = '<i>Retrieving.....</i>';


  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
xmlhttp=new XMLHttpRequest();
  }
else
 {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      
      
      
      resp = decryptAPIResp(xmlhttp.responseText,key).split(getDivider());
    
      // Check for an invalid verb response
    if (resp[1] == 2){
     return unknownAPICommand(); 
    }
      
    if (resp[1] == 0){
     // Request failed, authentication issue maybe? 
      clicky.innerHTML = 'Failed to retrieve credentials. Click to try again';
      return false;
    }
    
    limit = document.getElementById('defaultInterval').value;
    cnt = document.getElementById('PassCount'+id);
     cnt.value = limit;
    count = limit;
      Address.innerHTML = resp[3];
      Pass.innerHTML = '<input class="passDisp" onclick="this.select();" type="text" value="'+resp[2]+'" title="Click to select" name="null"/>';
      User.innerHTML = resp[4];
      Pluginout.innerHTML = resp[5];
      clicky.innerHTML = 'Displaying Password for ' +count+ ' seconds';
      
      if (counter){
	cancel=1;
	document.getElementById("clickCount"+dispcred).value = 0;
	dispcred=id;
	setTimeout(function() {cancel=false; counter=setInterval("Credtimer('"+id+"')", 1000);},1000);
	return;
      }
      dispcred=id;
      counter=setInterval("Credtimer('"+id+"')", 1000);
      
      }
      
      
      
      

    }
  
  
  
  
 
  option = cryptReq('retCred');
xmlhttp.open("POST","api.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send('option='+option+'&id='+id);
 
}






function checkSession(){

  var xmlhttp, resp, cookies, option, key = retKey();



  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
xmlhttp=new XMLHttpRequest();
  }
else
 {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    resp = xmlhttp.responseText.split(getDivider());
    // Check for an invalid verb response
    if (resp[1] == 2){
     return unknownAPICommand(); 
    }
    
    if (resp[1] == 0){
     // Session Invalid
    removeCurrKey(0);
    
    cookies = document.cookie.split(";");
   
    for (var i = 0; i < cookies.length; i++){
    KillCookie(cookies[i].split("=")[0]);
    }
     
     window.location.href = "index.php?notif=InvalidSession";
     
     
     
     
      return false;
    }
    
      
      }
      
      
      
      

    }
  
  
  
  option = cryptReq('checkSess');
  // Add an id, it's completely pointless but sessioncheck requests are the only ones not specifying an id - bit easy to check
xmlhttp.open("POST","api.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send('option='+option+'&id='+Math.floor((Math.random()*100)+1));
 
}


function DelCust(id){

  var xmlhttp, resp, credrow, notify, option, key = retKey();


if (!confirm("Are you sure you want to delete this customer and all associated credentials?")){
 return false; 
}


    credrow = document.getElementById('CustDisp'+id);
    notify = document.getElementById('NotificationArea');
   
if (document.getElementById('Custmenu'+id)){
	var menu = document.getElementById('Custmenu'+id);
      }
     


  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
xmlhttp=new XMLHttpRequest();
  }
else
 {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    resp = decryptAPIResp(xmlhttp.responseText,key).split(getDivider());
    // Check for an invalid verb response
    if (resp[1] == 2){
     return unknownAPICommand(); 
    }
    if (resp[1] == 0 || resp[2] == 0){
     // Request failed, authentication issue maybe? 
      notify.innerHTML += '<div class="alert alert-error">Failed to Delete</div>';
      return false;
    }
      credrow.parentNode.removeChild(credrow);
    notify.innerHTML += '<div class="alert alert-success">Customer and all associated credentials Deleted</div>';


      
	  if (menu){
	  menu.parentNode.removeChild(menu);
	  }
      
      }
      
      
      
      

    }
  
  
  
  option = cryptReq('delCust');
xmlhttp.open("POST","api.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send('option='+option+'&id='+id);
 
}


function DelCred(id){

  var xmlhttp, resp, credrow, notify, option, key = retKey();


if (!confirm("Are you sure you want to delete this credential?")){
 return false; 
}


  credrow = document.getElementById('CredDisp'+id);
  notify = document.getElementById('NotificationArea');


  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
xmlhttp=new XMLHttpRequest();
  }
else
 {// code for IE6, IE5
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
xmlhttp.onreadystatechange=function()
  {
if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    resp = decryptAPIResp(xmlhttp.responseText,key).split(getDivider());
    // Check for an invalid verb response
    if (resp[1] == 2){
     return unknownAPICommand(); 
    }
    if (resp[1] == 0 || resp[2] == 0){
     // Request failed, authentication issue maybe? 
       notify.innerHTML += '<div class="alert alert-error">Failed to Delete</div>';
      return false;
    }
      credrow.parentNode.removeChild(credrow);
      notify.innerHTML += '<div class="alert alert-success">Credential Deleted</div>';
    
     
      
      }
      
      
      
      

    }
  
  
  option = cryptReq('delCred');
xmlhttp.open("POST","api.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send('option='+option+'&id='+id);
 
}








/****                  SEARCH FUNCTIONS                 *******/


function positionResults(SearchBox,ResBox){
  
 var search = document.getElementById(SearchBox),
      res = document.getElementById(ResBox);
 
 res.style.left = search.offsetLeft +'px';
 
 // Set the position, but account for bootstrap's border and padding
 res.style.top = eval( search.offsetTop + search.offsetHeight + 6 )+'px';
 
 res.style.width = search.offsetWidth +'px';
}


function SearchTable(val,tbl,dispdiv,cellNr,e){
  
  // Many thanks to http://www.vonloesch.de/node/23 for the headstart on this function!

var disp, suche, table, res, num=0, id, ele, add, r,
    keynum = 0;

if(window.event) { keynum = window.event.keyCode; }  // IE (sucks)
else if(e.which) { keynum = e.which; }    // Netscape/Firefox/Opera

if(keynum === 38) { // up
    //Move selection up
    selectResult('up');
    return;
}

if(keynum === 40) { // down
    //Move selection down
    selectResult('down');
    
    return;
}



  // Reset the display div
  disp = document.getElementById(dispdiv);   
  disp.innerHTML = '';
  

  // Only search after 3 chars have been entered
  if (val.length < 3){
    return;     
    }
  
  
  document.getElementById('SelectedValue').value=0;
  
  positionResults("SearchBox",dispdiv);
  
  suche = val.toLowerCase();
  table = document.getElementById(tbl);

  
  
  
	for ( r = 0; r < table.rows.length; r++){
		ele = table.rows[r].cells[cellNr].innerHTML.replace(/<[^>]+>/g,"");
		
		if ((ele.toLowerCase().indexOf(suche)>=0 ) || ((suche.indexOf(":") >= 0) && (table.rows[r].cells[1].innerHTML.toLowerCase().indexOf(suche)>=0))){
		  
		num=num+1;  
		  // Work out how to display
		  
		   res = document.createElement('div');
		   res.id = 'SearchResult'+num; 
		   res.className = 'SearchResult';
		   res.setAttribute('link',table.rows[r].cells[5].innerHTML);
		   res.setAttribute('entID',table.rows[r].cells[2].innerHTML);
		   
		   if (table.rows[r].cells[4].innerHTML != null && table.rows[r].cells[4].innerHTML != ''){
		      id = table.rows[r].cells[4].innerHTML;
		     
		   }else{
		     id = 'id';
		     
		   }
		   
		    if (table.rows[r].cells[6]){
		     
		      
		     add = table.rows[r].cells[6].innerHTML.split("=");
		      
		     res.setAttribute('entid2',add[0]);
		     res.setAttribute('entid2val',add[1]);
		      
		     add = "&"+ table.rows[r].cells[6].innerHTML;
		     
		     
		     
		     
		     
		    }else{
		     add = ''; 
		    }
		    
		   res.setAttribute('onclick',"window.location.href = 'index.php?option="+table.rows[r].cells[5].innerHTML + "&"+id+"="+table.rows[r].cells[2].innerHTML+add+"';");
		   res.setAttribute('frmName',id);
		    
		    res.innerHTML = table.rows[r].cells[1].innerHTML + " " +table.rows[r].cells[cellNr].innerHTML;
		    
		    
		  disp.appendChild(res);
		  
		  disp.style.display = 'block';
		  

		  }
		
	}
  
}


function selectResult(dir){
 var ind, SearchResult,
     SelIndex = document.getElementById('SelectedValue'),
     SearchLength = document.getElementById('SearchResBox').childNodes.length;
 

 
 
 if (dir == 'down'){
   
   if (SelIndex.value != 0){
   document.getElementById("SearchResult" + parseInt(SelIndex.value)).className = 'SearchResult';
   }
 
 if (SearchLength == SelIndex.value){
  SelIndex.value=0; 
 }
 
 ind = eval(parseInt(SelIndex.value) + 1);
 

 
   
  }else{
    document.getElementById("SearchResult" + parseInt(SelIndex.value)).className = 'SearchResult';
    
    if (SelIndex.value == 1){
 ind = SearchLength;     
    }else{
 ind = eval(parseInt(SelIndex.value) - 1); 
    }
    
    
   
   
 }
 
 SearchResult = document.getElementById('SearchResult'+ind);
 SearchResult.className = 'SearchResult SearchResultActive';
  SelIndex.value = ind; 
  document.getElementById('SrchOpt').value = SearchResult.getAttribute('link');
  document.getElementById('SrchID').name = SearchResult.getAttribute('frmName');
  document.getElementById('SrchID').value = SearchResult.getAttribute('entID');
  document.getElementById('SrchID2').name = SearchResult.getAttribute('entid2');
  document.getElementById('SrchID2').value = SearchResult.getAttribute('entid2val');
  document.getElementById('SearchBox').focus();
 
}


function hideSearchDiv(dispdiv){
  var div = document.getElementById(dispdiv);
  
  
  
  for (opacity = 10; opacity > 0; opacity--){
    
    
  div.style.opacity = '0.'+opacity;
    
  }
 
  
  div.style.display = 'none';
  div.style.opacity = '1';
}


function checkExistingSearch(val,div){
      if (val.length > 3){
	  document.getElementById(div).style.display = 'block';
	  }
}


function setUpMenus(){

jQuery(document).ready(function() {

 
  
  if (!document.getElementById('SearchListing')){ return; }
   var menu,ele;
   
CreateMenuContent('TypeDropDownMenu',2,'SearchListing',0, 100, 'TypeMenu');
CreateMenuContent('CustDropDownMenu',1,'SearchListing',0, 5, 'Custmenu');
menu = document.getElementById('CustDropDownMenu');
ele = document.createElement('li');
ele.className='divider';

menu.appendChild(ele);

ele = document.createElement('li');
ele.className = 'viewAll';
ele.innerHTML = "<a href='index.php?option=viewCustomers'>View All</a></li>";
menu.appendChild(ele);
});



}


/*****                            Crypto Functions                                  ******/


/** Use bitwise Xor to encrypt the supplied string with the supplied key and return a base64 encoded representation of the character codes
 * Did try converting back to char, but things broke quite monumentally. Realistically makes little difference to an attacker, though it is a pain
 * as it means a longer request.
 * 
 */


function inlineDeCrypt(){
 var i, eles = document.getElementsByClassName('inlineTLS');
 
 for (i=0;i < eles.length;i++){
   eles[i].innerHTML = decryptAPIResp(eles[i].innerHTML,retKey());   
 }  
  
}


function xorestr(str,key){
    if (!enabledEncryption()){ return str; }
    
var a, b,
    enc='',
    keypos = 0,
    k = key.split(":");

  for (var i=0; i<str.length;i++) {


        a = str.charCodeAt(i);
        b = (a ^ k[0].charCodeAt(keypos)) ^ k[1].charCodeAt(keypos) ;    
        enc += b.toString()+" ";

	keypos++;
	if (keypos = key[0].length){ keypos = 0;}
    }





return enc;
}


function xordstr(str,key){

  if (!enabledEncryption()){ return str; }
  
  
var a, b,
    enc='',
    keypos = 0,
    str = str.split(" "),
    k = key.split(":");
  for (var i=0; i<str.length;i++) {

	if (str[i].length == 0){ continue; }
        a = str[i];
        b = (a ^ k[1].charCodeAt(keypos)) ^ k[0].charCodeAt(keypos) ;    
        enc += String.fromCharCode(b);

	keypos++;
	if (keypos = key[0].length){ keypos = 0;}
    }

return enc;
}


function unknownAPICommand(){
 // The API reports that the verb used wasn't recognised. We need to refresh the key file  
  
  var notify = document.getElementById('NotificationArea');
  
 clearInterval(sesscheck);
 
 
 notify.innerHTML += "<div id='apiError' class='alert alert-error'>API Error Detected</div>";
 
 if (!enabledEncryption()){ return; }
 
 if(!confirm("The API reported an error, attempting to rectify. Click OK to try and rectify")){
   
  return; 
 }
  notify.removeChild(document.getElementById('apiError'));
  notify.innerHTML = "<div id='apiError' class='alert alert-info'>Attempting to rectify API issue. Window will refresh when ready</div>";
 
  destroyKeys();
  removeCurrKey(1);
  
}



function removeCurrKey(n){
  
  var frm,
  sess = document.getElementById("kFile"),
  sessid = sess.getAttribute('src'),
  parent = sess.parentNode;
  
  parent.removeChild(sess);
  
  // We need to delete the cookie, but can't do that from the current location
  frm = document.createElement('iframe');
  frm.setAttribute('id','kfile');
  frm.setAttribute('src',sessid+'&forceload=y');
  frm.style.width = '0px';
  frm.style.height = '0px';
  frm.style.border = '0px';
  document.body.appendChild(frm);
  // Wait 500 milliseconds so we can be sure it's loaded
  interval = setInterval("reloadKeyf('"+sessid+"',"+n+")",500);
  
}



function reloadKeyf(sessid,n){
  var frm, date, notify;
  
  clearInterval(interval);
  
  frm = document.getElementById('kfile');
  frm.contentWindow.document.cookie = 'PHPCredLockerKeySet=0;';
  frm.parentNode.removeChild(frm);
  
  date = new Date();
  
  frm = document.createElement('script');
  frm.setAttribute('id','kFile');
  
  // Append a string to ensure the browser doesn't use the cache.
  frm.setAttribute('src',sessid+'&forceload=y'+'&rand='+date.getTime());
  
  document.getElementsByTagName("head")[0].appendChild(frm);
  
 
  if (window.getKey != '' && n == 1){
    
    notify = document.getElementById('apiError');
    notify.parentNode.removeChild(notify);
    
   sesscheck = setInterval("checkSession()",120000); 
   
  }
  
}







function decryptAPIResp(str,key){
    if (!enabledEncryption()){ return str; }
  
 return Base64.decode(xordstr(Base64.decode(str),key));
}


function getDivider(){
  
    if(typeof(Storage)!=="undefined" && sessionStorage.Delimiter){
	return sessionStorage.getItem('Delimiter');
  }
  
 return getDelimiter(); 
}


function getTerms(a){
  
  if(typeof(Storage)!=="undefined"){
	if (!terms){
      terms = JSON.parse(sessionStorage.getItem('Terminology'))
	}
      return Base64.decode(terms[a.toString()]);
  }
  
  return Base64.decode(getTerminology(a));
}


function cryptReq(str){
  /* We retrieve the key here (even though it's available to the parent) 
   * because we may want to implement a second key used for sending requests,
   * whether that's a symmetric or asymetric key.
   */  
  var ciphert,key = retKey(), 
  div = getDivider();
  
  ciphert = genPadding() + div + getTerms(str) + div + genPadding();
  if (!enabledEncryption()){ return ciphert; }
  
  return encodeURIComponent(Base64.encode(xorestr(Base64.encode(ciphert),key))); 
}


/** Really not that familiar with random string generation in JS, but this seems to work! */
function genPadding(){
  if (!enabledEncryption()){ return 'a'; }
  
  var i,c,
      a='';

  c = Math.random().toString(10).substring(2,3);
  
  for (i=0;i < c;i++){  
   a += Math.random().toString(10).substring(Math.random().toString(10).substring(2,3));
  }

 return a; 
}


function retAuthKey(){
 return Base64.decode(getAuthKey()); 
}

function retKey(){
 return Base64.decode(getKey());
}


function checkKeyAvailable(){
 
  
 if(!getKey && typeof getTLSKey != 'function') {
   
   if (confirm("Key retrieval failed - Attempting to rectify, Click OK to continue - Screen may refresh")){
   
   var i,
	cookies = document.cookie.split(";");
   
  for (i = 0; i < cookies.length; i++){
    KillCookie(cookies[i].split("=")[0]);
    }
   
   removeCurrKey();
   
    if(typeof getTLSKey == 'function') {
      alert("Keys retrieved successfully");
      return true;
      
    }
   
   window.location.reload(true);
  return false; 
  }
 }
  
  return true;
  
  
  
}

function getKey(){ 
  
 if(typeof(Storage)!=="undefined" && sessionStorage.key){
    return sessionStorage.getItem('key');
  }else{
    if(typeof getTLSKey != 'function'){
     return false; 
    }
   return getTLSKey(); 
  }
    
}

function enabledEncryption(){
  
   if(typeof(Storage)!=="undefined" && sessionStorage.CryptEnabled){
    return sessionStorage.getItem('CryptEnabled');
  }else{
    if(typeof enabledTLSEncryption != 'function'){
     return false; 
    }
   return enabledTLSEncryption(); 
  }
  

}




/*********                  MMMMMMMMMMMM COOKIES!                 ******/


function KillCookie(name) {
    createCookie(name,"",-1);
}



function createCookie(nme,val,expire) {
  var expires, date;
  
    if (expire) {
	date = new Date();
    	date.setTime(date.getTime()+(expire*24*60*60*1000));
    	expires = "; expires="+date.toGMTString();
    }
    else expires = "";
    document.cookie = nme+"="+val+expires+"; path=/";
}
