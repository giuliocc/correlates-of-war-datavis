/*var wars = [
{"startDate":new Date(1920, 12),"endDate":new Date(1921, 2),"warName":"guerra da copa 4","class":1},
{"startDate":new Date(1922, 12),"endDate":new Date(1925, 2),"warName":"guerra da copa 3","class":2},
{"startDate":new Date(1810, 12),"endDate":new Date(1830, 2),"warName":"guerra da copa 1","class":3},
{"startDate":new Date(1912, 12),"endDate":new Date(1915, 2),"warName":"guerra da copa 2","class":1}];
*/
var clickedWar;
var wars = [];
var warNames = [];
var warClasses = [];

d3.json("dataset.json", function(json){
	for (var i = json.data.length - 1; i >= 0; i--) {
		if((wars.length == 0) || (wars.filter(function(d){return d.warName === json.data[i].war_name;})[0] == undefined)){
			wars.push({	
				"warName": json.data[i].war_name,
				"class": json.data[i].war_type,
				"startDate": new Date(json.data[i].start_year1, json.data[i].start_month1, json.data[i].start_day1),
				"endDate": new Date(json.data[i].end_year1, json.data[i].end_month1, json.data[i].end_day1)
			});

			warNames.push(json.data[i].war_name);
		}
		else{
			var i_startDate = new Date(json.data[i].start_year1, json.data[i].start_month1, json.data[i].start_day1);
			var i_endDate =  new Date(json.data[i].end_year1, json.data[i].end_month1, json.data[i].end_day1);

			if( i_endDate > wars[wars.length-1].endDate){
				wars[wars.length-1].endDate = i_endDate;
			}
			if( i_startDate < wars[wars.length-1].startDate){
				wars[wars.length-1].startDate = i_startDate;
			}
		}

		if((warClasses.length == 0) || (warClasses.filter(function(d){return d === json.data[i].war_type;})[0] == undefined)){
			warClasses.push(json.data[i].war_type);
		}

	}

	wars.sort(function(a, b) {
	    return a.endDate - b.endDate;
	});
	var maxDate = wars[wars.length - 1].endDate;
	var minDate = wars[0].startDate;

	var gantt = d3.gantt().height(450).width(800).warNames(warNames).warClasses(warClasses);
	gantt(wars)
});





