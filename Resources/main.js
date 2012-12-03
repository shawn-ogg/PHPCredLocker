var counter=false;
var cancel='';
	
	function comparePwds(){
	  
	  
	  var pass = document.getElementById('frmPass');
	  var nomatch = document.getElementById('PassNoMatch');
	  var passscore = document.getElementById('passScore');
	  var minpass = document.getElementById('minpassStrength');
	  
	  
	  if (minpass){
	  
	    
	    var strength = minpass.value;
	    var test;
	    if (strength.indexOf("+") >= 0){
		if (parseInt(passScore.value) > 45){
		 test = true; 
		}else{
		 test = false; 
		}
	      
	    }else{
	      
	      var testvars = strength.split("-");
	      
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
	
	
	function validateUserAdd(){
	  var username = document.getElementById('frmUsername');
	  var RealName = document.getElementById('frmRName');
	  var error = 0;
	  
	 if (username.value == null || username.value == ''){
	  username.className = 'frmEntryMissed'; 
	  error = 1;
	 }
	 
	 
	   if (RealName.value == null || RealName.value == ''){
	  RealName.className = 'frmEntryMissed'; 
	  error = 1;
	 }
	  
	  if (!comparePwds()){
	    
	   error = 1; 
	  }
	  
	  if (error == 1){
	    
	   alert("Please correct input errors and re-submit");
	   return false;
	  }
	  
	  return true;
	}
	
	
	
	function validateUserEdit(){
	  
	  var username = document.getElementById('frmUsername');
	  var RealName = document.getElementById('frmRName');
	  var pass = document.getElementById('frmPass');
	  var error = 0;
	  
	  
	  if (username.value == null || username.value == ''){
	  username.className = 'frmEntryMissed'; 
	  error = 1;
	 }
	 
	 
	   if (RealName.value == null || RealName.value == ''){
	  RealName.className = 'frmEntryMissed'; 
	  error = 1;
	 }
	  
	  
	  if (pass.value != null && pass.value != ''){
	  if (!comparePwds()){
	    
	   error = 1; 
	  }
	  }
	  
	  
	  if (error == 1){
	    
	   alert("Please correct input errors and re-submit");
	   return false;
	  }
	  
	  return true;
	  
	  
	}
	
function getCreds(id){

  var xmlhttp;
var resp;
var jsonObj;

var clicky = document.getElementById('retrievePassword'+id);
var Address = document.getElementById('Address'+id);
var User = document.getElementById('UserName'+id);
var Pass = document.getElementById('Password'+id);

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
    resp = xmlhttp.responseText.split('|..|');
    if (resp[0] == 0){
     // Request failed, authentication issue maybe? 
      clicky.innerHTML = 'Failed to retrieve credentials. Click to try again';
      return false;
    }
    
    var limit = document.getElementById('defaultInterval').value;
    var cnt = document.getElementById('PassCount'+id);
     cnt.value = limit;
     var count = limit;
      Address.innerHTML = resp[2];
      Pass.innerHTML = resp[1];
      User.innerHTML = resp[3];
      clicky.innerHTML = 'Displaying Password for ' +count+ ' seconds';
      
      if (counter){
	cancel=1;
	
	setTimeout(function() {cancel=false; counter=setInterval("Credtimer('"+id+"')", 1000);},1000);
	return;
      }
      
      counter=setInterval("Credtimer('"+id+"')", 1000);
      
      }
      
      
      
      

    }
  
  
  
xmlhttp.open("POST","api.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send('option=retCred&id='+id);
 
}




function DelCust(id){

  var xmlhttp;
var resp;
var jsonObj;


if (!confirm("Are you sure you want to delete this customer and all associated credentials?")){
 return false; 
}


var credrow = document.getElementById('CustDisp'+id);
var notify = document.getElementById('NotificationArea');
   
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
    resp = xmlhttp.responseText.split('|..|');
    if (resp[0] == 0 || resp[1] == 0){
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
  
  
  
xmlhttp.open("POST","api.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send('option=delCust&id='+id);
 
}




function delGroup(id){

  var xmlhttp;
var resp;
var jsonObj;


if (!confirm("Are you sure you want to delete this group (any credentials recorded against the group will be deleted)?")){
 return false; 
}


var credrow = document.getElementById('GroupDisp'+id);



var notify = document.getElementById('NotificationArea');


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
    resp = xmlhttp.responseText.split('|..|');
    if (resp[0] == 0 || resp[1] == 0){
     // Request failed, authentication issue maybe? 
       notify.innerHTML += '<div class="alert alert-error">Failed to Delete</div>';
      return false;
    }
      credrow.parentNode.removeChild(credrow);
      notify.innerHTML += '<div class="alert alert-success">Group Deleted</div>';
    
     
      
      }
      
      
      
      

    }
  
  
  
xmlhttp.open("POST","api.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send('option=delGroup&id='+id);
 
}







function delUser(id){

  var xmlhttp;
var resp;
var jsonObj;


if (!confirm("Are you sure you want to delete this user?")){
 return false; 
}


var credrow = document.getElementById('User'+id);



var notify = document.getElementById('NotificationArea');


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
    resp = xmlhttp.responseText.split('|..|');
    if (resp[0] == 0 || resp[1] == 0){
     // Request failed, authentication issue maybe? 
       notify.innerHTML += '<div class="alert alert-error">Failed to Delete</div>';
      return false;
    }
      credrow.parentNode.removeChild(credrow);
      notify.innerHTML += '<div class="alert alert-success">User Deleted</div>';
    
     
      
      }
      
      
      
      

    }
  
  
  
xmlhttp.open("POST","api.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send('option=delUser&id='+id);
 
}






function delCredType(id){

  var xmlhttp;
var resp;
var jsonObj;


if (!confirm("Are you sure you want to delete this Credential Type (any associated credentials will be deleted)?")){
 return false; 
}


var credrow = document.getElementById('CredType'+id);



var notify = document.getElementById('NotificationArea');


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
    resp = xmlhttp.responseText.split('|..|');
    if (resp[0] == 0 || resp[1] == 0){
     // Request failed, authentication issue maybe? 
       notify.innerHTML += '<div class="alert alert-error">Failed to Delete</div>';
      return false;
    }
      credrow.parentNode.removeChild(credrow);
      notify.innerHTML += '<div class="alert alert-success">Credential Type Deleted</div>';
    
     
      
      }
      
      
      
      

    }
  
  
  
xmlhttp.open("POST","api.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send('option=delCredType&id='+id);
 
}




function DelCred(id){

  var xmlhttp;
var resp;
var jsonObj;


if (!confirm("Are you sure you want to delete this credential?")){
 return false; 
}


var credrow = document.getElementById('CredDisp'+id);



var notify = document.getElementById('NotificationArea');


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
    resp = xmlhttp.responseText.split('|..|');
    if (resp[0] == 0 || resp[1] == 0){
     // Request failed, authentication issue maybe? 
       notify.innerHTML += '<div class="alert alert-error">Failed to Delete</div>';
      return false;
    }
      credrow.parentNode.removeChild(credrow);
      notify.innerHTML += '<div class="alert alert-success">Customer and all associated credentials Deleted</div>';
    
     
      
      }
      
      
      
      

    }
  
  
  
xmlhttp.open("POST","api.php",true);
xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
xmlhttp.send('option=delCred&id='+id);
 
}





function Credtimer(id)
{
  var cnt = document.getElementById('PassCount'+id);
  var count=cnt.value-1;
  cnt.value = count;
  var field = document.getElementById('retrievePassword'+id);
  
  
  
  if (count <= 0 || cancel == 1)
  {
     clearInterval(counter);
     
     field.innerHTML = 'Display Password';
     document.getElementById('Address'+id).innerHTML = '';
     document.getElementById('UserName'+id).innerHTML = '';
     document.getElementById('Password'+id).innerHTML = '';
     return;
  }

  field.innerHTML = 'Displaying Password for ' +count+ ' seconds';
}






function checkNewCred(){

  
  var cred = document.getElementById('frmCredential');
  var user = document.getElementById('frmUser');
  var addr = document.getElementById('frmAddress');
  
if (cred.value.indexOf("http") !== -1){


if (confirm("Click OK to make this credential a hyperlink in the database, click cancel to set not clicky")){

document.getElementById('frmClicky').value = 1;
}







}
}


function checkEditCred(){

  
  var cred = document.getElementById('frmCredential');
  var user = document.getElementById('frmUser');
  var addr = document.getElementById('frmAddress');
  
if (cred.value.indexOf("http") !== -1){


if (confirm("Click OK to make this credential a hyperlink in the database, click cancel to set not clicky")){

document.getElementById('frmClicky').value = 1;
}







}


// See if any have been blanked

if (cred.value == null || cred.value == ''){
 cred.value = ' '; 
}

if (user.value == null || user.value == ''){
 user.value = ' '; 
}

if (addr.value == null || addr.value == ''){
 cred.value = ' '; 
}


return true;
}


function noCredTypes(){
  
  $(document).ready(function(){
    if (document.getElementById('AddCredBtnTop')){
     var btntop =  document.getElementById('AddCredBtnTop');
     btntop.parentNode.removeChild(btntop);
    }

    if (document.getElementById('AddCredBtnBottom')){
     var btntop =  document.getElementById('AddCredBtnBottom');
     btntop.parentNode.removeChild(btntop);
    }
  });
  
  
  
  
  
}




function CreateMenuContent(menu,type,tbl,cellNr, limit, menucode){
  
  var menu = document.getElementById(menu);
  
  var menuentry;
  
  
    var table = document.getElementById(tbl);
  
  var lim = 0;
  
  
  var ind;
  var item;
  var str;
  
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







/****                  SEARCH FUNCTIONS                 *******/


function positionResults(SearchBox,ResBox){
  
 var search = document.getElementById(SearchBox);
 var res = document.getElementById(ResBox);
 
 
 
 
 res.style.left = search.offsetLeft +'px';
 
 // Set the position, but account for bootstrap's border and padding
 res.style.top = eval( search.offsetTop + search.offsetHeight + 6 )+'px';
 
 res.style.width = search.offsetWidth +'px';
}

function SearchTable(val,tbl,dispdiv,cellNr,e){
  
  // Many thanks to http://www.vonloesch.de/node/23 for the headstart on this function!



var keynum = 0;

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
  var disp = document.getElementById(dispdiv);   
  disp.innerHTML = '';
  

  // Only search after 3 chars have been entered
  if (val.length < 3){
    return;     
    }
  
  positionResults("SearchBox",dispdiv);
  
  var suche = val.toLowerCase();
  var table = document.getElementById(tbl);
  var res;
  var num = 0;
  var id;
  var ele;
  var add;
  
  
  
  
	for (var r = 0; r < table.rows.length; r++){
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
 var ind;
 var SelIndex = document.getElementById('SelectedValue');
 var SearchResult ;
 
 
 if (dir == 'down'){
   
   if (SelIndex.value != 0){
   document.getElementById("SearchResult" + parseInt(SelIndex.value)).className = 'SearchResult';
   }
   
 ind = eval(parseInt(SelIndex.value) + 1);
 

 
   
  }else{
    document.getElementById("SearchResult" + parseInt(SelIndex.value)).className = 'SearchResult';
 ind = eval(parseInt(SelIndex.value) - 1);  
   if (ind == 0){ return; }
   
   
 }
 
 SearchResult = document.getElementById('SearchResult'+ind);
 SearchResult.className = 'SearchResult SearchResultActive';
  SelIndex.value = ind; 
  document.getElementById('SrchOpt').value = SearchResult.getAttribute('link');
  document.getElementById('SrchID').name = SearchResult.getAttribute('frmName');
  document.getElementById('SrchID').value = SearchResult.getAttribute('entID');
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

CreateMenuContent('TypeDropDownMenu',2,'SearchListing',0, 100, 'TypeMenu');
CreateMenuContent('CustDropDownMenu',1,'SearchListing',0, 5, 'Custmenu');
var menu = document.getElementById('CustDropDownMenu');
var ele = document.createElement('li');
ele.className='divider';

menu.appendChild(ele);

ele = document.createElement('li');
ele.innerHTML = "<a href='index.php?option=viewCustomers'>View All</a></li>";
menu.appendChild(ele);
});



}