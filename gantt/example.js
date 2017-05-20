var wars = [
{"startDate":new Date(1920, 12),"endDate":new Date(1921, 2),"warName":"guerra da copa 4","class":1},
{"startDate":new Date(1922, 12),"endDate":new Date(1925, 2),"warName":"guerra da copa 3","class":2},
{"startDate":new Date(1810, 12),"endDate":new Date(1830, 2),"warName":"guerra da copa 1","class":3},
{"startDate":new Date(1912, 12),"endDate":new Date(1915, 2),"warName":"guerra da copa 2","class":1}];

var warClasses = {
    1 : "bar",
    2 : "bar-failed",
    3 : "bar-running",
    4 : "bar-killed"
};

var warNames = [ "guerra da copa 1", "guerra da copa 2", "guerra da copa 3", "guerra da copa 4"];
	
wars.sort(function(a, b) {
    return a.endDate - b.endDate;
});
var maxDate = wars[wars.length - 1].endDate;
wars.sort(function(a, b) {
    return a.startDate - b.startDate;
});
var minDate = wars[0].startDate;

var format = "%Y:%m";

var gantt = d3.gantt().height(450).width(800).warNames(warNames).warClasses(warClasses)
.margin({top : 20, right : 40, bottom : 20, left : 50});
gantt(wars)
gantt.redraw(wars)