/*
 * This script file will generate a chart to put in the basic-line-graph.html page.
 * Normally, this code would just go within some <script> tags, but it appears you lose
 * the advantages of using typescript autocomplete when doing that in netbeans on the page
 * directly.
 */
/// <reference path="jquery.d.ts" />
/**
 * Generate a fake set of data to graph which has the provided number of points
 * with a minimum y value of 0, and a maximum possible y value of whatever is provided.
 * The x coordinates all just increment by 1 from 0 to the number of points.
 * @type array - array of objects with an x and y attribute.
 */
function generateFakeDataset(numPoints, min, max) {
    var data = [];
    var range = max - min;
    for (var i = 0; i < numPoints; i += 1) {
        var point = {
            x: i,
            y: (Math.random() * range) + min
        };
        data.push(point);
    }
    return data;
}
;
var maxXValue = 40;
var maxYValue = 100;
var maxXAxisValue = maxXValue * 1.1; // add some buffer room.
var maxYAxisValue = maxYValue * 1.1; // add some buffer room.
var datasetColors = ["#ffa500", "green", "rgb(0,0,0)"];
var xScale = new Plottable.Scales.Linear().domain([0, maxXValue]);
var xAxis = new Plottable.Axes.Numeric(xScale, "bottom");
var yScale = new Plottable.Scales.Linear().domain([0, maxYAxisValue]);
var yAxis = new Plottable.Axes.Numeric(yScale, "left");
// Create a line plot (lline chart) for our datasets.
var linePlot = new Plottable.Plots.Line();
linePlot.x(function (d) { return d.x; }, xScale);
linePlot.y(function (d) { return d.y; }, yScale);
linePlot.attr("stroke", function (d, i, ds) { return ds.metadata().colour; });
var datasets = [
    new Plottable.Dataset(generateFakeDataset(maxXValue, 30, maxYValue), { "colour": datasetColors[0] }),
    new Plottable.Dataset(generateFakeDataset(maxXValue, 10, 30), { "colour": datasetColors[1] }),
    new Plottable.Dataset(generateFakeDataset(maxXValue, 0, 10), { "colour": datasetColors[2] })
];
linePlot.datasets(datasets);
var areaChart = new Plottable.Components.Table([
    [null, null],
    [yAxis, linePlot],
    [null, xAxis]
]);
areaChart.renderTo("svg#example");
// Add a legend.
// By having this AFTER the rendering of the plot/chart, it will appear ABOVE any lines etc.
var colorScale = new Plottable.Scales.Color();
colorScale.range(datasetColors);
var legend = new Plottable.Components.Legend(colorScale);
colorScale.domain(["Dataset 1", "Dataset 2", "Dataset 3"]);
legend.xAlignment("right");
legend.yAlignment("top");
legend.renderTo("svg#example");
// Resize the plot to fit the window on resize.
$(window).resize(function () {
    linePlot.redraw();
});
