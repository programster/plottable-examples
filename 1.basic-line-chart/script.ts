/*
 * This script file will generate a chart to put in the basic-line-graph.html page. 
 * Normally, this code would just go within some <script> tags, but it appears you lose
 * the advantages of using typescript autocomplete when doing that in netbeans on the page
 * directly.
 */

/**
 * Generate a fake set of data to graph which has the provided number of points
 * with a minimum y value of 0, and a maximum possible y value of whatever is provided.
 * The x coordinates all just increment by 1 from 0 to the number of points.
 * @type array - array of objects with an x and y attribute.
 */
function generateFakeDataset(numPoints, min, max) 
{
    var data = [];
    var range = max - min;

    for (var i = 0; i < numPoints; i += 1) 
    {
        var point = {
            x: i, 
            y: (Math.random() * range) + min
        };

        data.push(point);
    }

    return data;
};


var msPerDay = 86400000;
var lineRenderer;
var maxXValue = 40;
var maxYValue = 100;
var maxXAxisValue = maxXValue * 1.1; // add some buffer room.
var maxYAxisValue = maxYValue * 1.1; // add some buffer room.

var xScale = new Plottable.Scales.Linear().domain([0, maxXValue]);
var xAxis = new Plottable.Axes.Numeric(xScale, "bottom");

var yScale = new Plottable.Scales.Linear().domain([0, maxYAxisValue]);
var yAxis = new Plottable.Axes.Numeric(yScale, "left");

// Create a line renderer for rendering our datasets.
lineRenderer = new Plottable.Plots.Line();
lineRenderer.x(function(d) { return d.x; }, xScale)
lineRenderer.y(function(d) { return d.y; }, yScale)
lineRenderer.attr("stroke", function(d, i, ds) { return ds.metadata().colour; });

var datasets = [
    new Plottable.Dataset(generateFakeDataset(maxXValue, 30, maxYValue), {"colour": "#ffa500"}),
    new Plottable.Dataset(generateFakeDataset(maxXValue, 10, 30), {"colour": "green"}),
    new Plottable.Dataset(generateFakeDataset(maxXValue, 0, 10), {"colour": "rgb(0,0,0)"})
];

lineRenderer.datasets(datasets);

var areaChart = new Plottable.Components.Table(
    [
        [null,        null],
        [yAxis, lineRenderer],
        [null,         xAxis]
    ]
);

areaChart.renderTo("svg#example");