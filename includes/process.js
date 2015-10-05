/******************************************
contents of data files are stored in variables
named after the search value in js files. For
example gac codes are stored in gac.js and
are known as a gac search in this form
********************************************/

var charstrokes;
var userinput;
var search;

function process(obj_f) {

  for (x=0; x<=10; x++) {
	search = obj_f.searchtype[x].value;

	if (obj_f.searchtype[x].checked) {
	  search = obj_f.searchtype[x].value;
	  x = 10;
	  }
	}

  userinput = obj_f.userinput.value;

	switch (search) {
	  	default:
			if (userinput.length > 2) {
				body=extract();
				document.getElementById('results').innerHTML=body;
				break;
				}
	  	}
return;

}

/***********************************
************************************

Looks for data input by user in
tables and outputs data to result
screen

************************************
***********************************/

function extract() {
var resultarray = new Array();
var cellarray = new Array();
var founditems = '';
var found = 0;
var weblink = '';
var webbase = '';
var regmatch = '\\b' + userinput;
var regmarc = '\\d\\d\\d';

var regexsearch = new RegExp(regmatch, "i");
var regmarcsearch = new RegExp(regmarc, "i");
switch (search) {
	case "mesh":
		{
		resultarray = mesh.split("\@");
		founditems += '<center><table width="65%"><tr><th>Search Results</th></tr>\n';

		for (x=0; x<=resultarray.length-1; x++) {
			if (regexsearch.exec(resultarray[x])) {
				found += 1;
				heading = resultarray[x];	

				webbase = 'http://www.nlm.nih.gov/cgi/mesh/2013/MB_cgi?term=';

				id_url = '<a href="javascript:OpenWin(\'' + webbase
					+ heading
					+ '\');">'
					+ heading
					+ '</a></td></tr>'
					+ '\n';

				if (found % 2 == 0) {
					founditems += '<tr><td style="background: #c6d6ee;">' + id_url;
					}
					else
					{
					founditems += '<tr><td>'
					+ id_url;
					}
				}
			}
		founditems += '<tr><td><br /><center><b>Click on any field above for detailed information from NLM</b></center></td></tr></table>';

    if (found == 0) {
			founditems = notfound();
			}
		return founditems;
		break;
		}
	case "icd10":
		{
		resultarray = diseases_and_injuries.split("\@");
		founditems += '<center><table width="65%"><tr><th>Search Results</th></tr>\n';

		for (x=0; x<=resultarray.length-1; x++) {
			if (regexsearch.exec(resultarray[x])) {
				found += 1;
				heading = resultarray[x];	
				splitheading = heading.split("\t");

				webbase = 'https://apps2.nlm.nih.gov/medlineplus/services/mpconnect.cfm?mainSearchCriteria.v.cs=2.16.840.1.113883.6.90&mainSearchCriteria.v.c=';

				id_url = '<a href="javascript:OpenWin(\'' + webbase
					+ splitheading[0] 
					+ '\');">'
					+ splitheading[0] 
					+ '</a> '
					+ splitheading[1]
					+ '</td></tr>'
					+ '\n';

				if (found % 2 == 0) {
					founditems += '<tr><td style="background: #c6d6ee;">' + id_url;
					}
					else
					{
					founditems += '<tr><td>'
					+ id_url;
					}
				}
			}
		founditems += '<tr><td><br /><center><b>Click on any field above for detailed information from Medline</b></center></td></tr></table>';

    if (found == 0) {
			founditems = notfound();
			}
		return founditems;
		break;
		}
	}
}


/***********************************
************************************
 
Default no items found message

************************************
************************************/

function notfound() {
	return "<center><h1>No matches were found. Please try again</h1></center>";
}

/***********************************
************************************
 
Outputs HTML to search result window

************************************
************************************/

function render(body) {
 searchresults=window.open('','results')
 searchresults.document.write(
  '<html>\n'
  + body
  +'</body></html>'
 )
 searchresults.document.close()
}
