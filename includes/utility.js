/****************************************************
All of these functions are based on slightly modified
code written by Terry Reese
*****************************************************/
var Nwind=0;

function GetPage(sURL, lwidth, lheight)
{
searchresults=window.open('','results');

searchresults.document.writeln(
  '<b>'
  + 'Retrieving information from OCLC......'  
  + '<p />All OCLC data is provided by and &copy OCLC. All OCLC information appears in the same window, so this program will not open multiple windows.'
  +'</b>'
   );
   searchresults.document.close();

if (lwidth==null) {
   var wind= window.open(sURL, 'NewWindow', 'width=600,height=600,scrollbars=yes,resizable=yes');
   wind.focus();
   if (wind.opener == null){
         wind.opener = self;
   }
	
}
else if (lwidth!=null) {
    var wind= window.open(sURL, 'NewWindow', 'width=' + lwidth + ',height=' + lheight + ',scrollbars=yes, resizable=yes');
    wind.focus();
    if (wind.opener == null){
         wind.opener = self;
   }
  
}
}

function OpenWin(sURL)
{
  var wind= window.open(sURL, 'NewWindow', 'width=600,height=600,scrollbars=yes,resizable=yes');
   wind.focus();
   if (wind.opener == null){
         wind.opener = self;
   }
	

}

function NavRollOver(oTd) {

N   = (document.layers) ? true:false;                 // netscape 4
I   = (document.all) ? true:false;                    // ie4+
DOM = ((document.getElementById)&&(!I))?true:false;   // ns6 etc.

if (I) {
   if (!oTd.contains(event.fromElement)) {
	oTd.style.backgroundColor='#ffffcc';
	oTd.style.border='#999999 solid 1px';
   }
}
else if (DOM) {
    oTd.style.backgroundColor='#ffffcc';
    oTd.style.border='#999999 solid 1px';
}
}
function NavRollOut(oTd) {

N   = (document.layers) ? true:false;                 // netscape 4
I   = (document.all) ? true:false;                    // ie4+
DOM = ((document.getElementById)&&(!I))?true:false;   // ns6 etc.

if (I) {
   if (!oTd.contains(event.toElement)) {
	oTd.style.backgroundColor='#f1f1f1';
	oTd.style.border='#f1f1f1';
  }
}
else if (DOM) {
    oTd.style.backgroundColor='#f1f1f1';
    oTd.style.border='#f1f1f1';
}
}





                                   
