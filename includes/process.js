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

function extractRow(found, row) {
	tablestring = '';
	fullstring = '';
	webbase = 'https://www.cms.gov/medicare-coverage-database/staticpages/icd-10-code-lookup.aspx?KeyWord=';

	splitrow = row.split("\t");

	for (fields = 1; fields < splitrow.length; fields++) {
		tablestring = tablestring + '<td class="center"><a href="javascript:OpenWin(\'' + webbase
			+ splitrow[fields] 
			+ '\');">'
			+ splitrow[fields] 
			+ '</a> '
			+ '</td>';
	}
	fullstring = splitrow[0] + tablestring;

	if (found % 2 == 0) {
		fullrow = '<tr style="background: #c6d6ee;"><td>' + fullstring + '</td></tr>';
		}
		else
		{
		fullrow = '<tr><td>' + fullstring + '</td></tr>';
		}
	return fullrow;
}

function searchEntry(userinput, entry) {
	userinput = userinput.toLowerCase();
	entry = entry.toLowerCase();
	terms = userinput.split(" ");
	returnfound = 0;

	for (foundit = 0; foundit < terms.length; foundit++) {
		if (terms[foundit].length > 2) {
			var regmatch = '\\b' + terms[foundit];
			var regexsearch = new RegExp(regmatch);
			if (regexsearch.exec(entry)) {
				returnfound = 1;
			}
			else {
				returnfound = 0;	
				break;
			}
		}
	}

return returnfound;
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

switch (search) {
	case "mesh":
		{
		resultarray = mesh.split("\@");
		founditems += '<table><tr><th>Search Results</th></tr>\n';

		for (x=0; x<=resultarray.length-1; x++) {
			if (searchEntry(userinput, resultarray[x]) == 1) {
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
					founditems += '<tr style="background: #c6d6ee;"><td>' + id_url;
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
	case "diseases_and_injuries":
		{
		resultarray = diseases_and_injuries.split("\@");
		founditems += '<table><tr><th>Search Results</th></tr>\n';

		for (x=0; x<=resultarray.length-1; x++) {
			if (searchEntry(userinput, resultarray[x]) == 1) {
				found += 1;
				heading = resultarray[x];	
				splitheading = heading.split("\t");

				webbase = 'https://www.cms.gov/medicare-coverage-database/staticpages/icd-10-code-lookup.aspx?KeyWord=';

				id_url = '<a href="javascript:OpenWin(\'' + webbase
					+ splitheading[0] 
					+ '\');">'
					+ splitheading[0] 
					+ '</a> '
					+ splitheading[1]
					+ '</td></tr>'
					+ '\n';

				if (found % 2 == 0) {
					founditems += '<tr style="background: #c6d6ee;"><td>' + id_url;
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
	case "drugs":
		{
		resultarray = drugs.split("\@");
		founditems += '<table><tr><th class="left">Substance</th><th class="plain">Poisoning, Accidental</th><th class="plain">Poisoning, Intentional</th><th class="plain">Poisoning, Assault</th><th class="plain">Poisoning, Undetermined</th><th class="plain">Adverse effect</th><th class="right">Underdosing</th></tr>\n';

		for (x=0; x<=resultarray.length-1; x++) {
			if (searchEntry(userinput, resultarray[x]) == 1) {
				found += 1;
				entries = resultarray[x];	
				splitentries = entries.split("^");

				for (s = 0; s < splitentries.length; s++) {
					founditems += extractRow(found, splitentries[s]);	
					}

				}
			}
		founditems += '<tr><td colspan="6"><br /><center><b>Click on any link above for detailed information from Medline</b></center></td></tr></table>';

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
