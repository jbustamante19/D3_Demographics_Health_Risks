// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 50,
    left: 50
  };
  
// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  var scatterGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

d3.csv("stateData.csv").then(function(data){


    // scale x to chart width
    var xScale = d3.scaleLinear()
    .domain([6,24])//d3.extent(data.poverty))
    .range([0, chartWidth])

    var xAxis = d3.axisBottom(xScale); // creates x axis
    // set x to the bottom of the chart
    scatterGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);


    // Add X axis label:
    svg.append("text")
    .attr("text-anchor", "end")
    .attr("x", svgWidth/2)
    .attr("y", svgHeight-10)
    .text("In Poverty % ");
    

    // scale y to chart height
    var yScale = d3.scaleLinear()
    .domain([0, 40])
    .range([chartHeight, 0]);

    var yAxis = d3.axisLeft(yScale); // creates y axis

    scatterGroup.append("g")
    .call(yAxis);


    svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 5)
    .attr("x",0 - (chartHeight / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Lacking Health Coverage %");


    //Add circles
    svg.append('g')
    .selectAll("circles")
    .data(data)
    .enter()
    .append("circle")
        .attr("cx", function (d) { return xScale(d.poverty); } )
        .attr("cy", function (d) { return yScale(d.healthcare);} )
        .attr("r", 15)
        .style("fill", "purple")
        .style("opacity",.5)


        svg.selectAll("circles")
        .data(data)
        .enter()
        .append("text")
        .text((d) => d.abbr)
        .attr("x", function (d) { return xScale(d.poverty)-8; } )
        .attr("y", function (d) { return yScale(d.healthcare)+5;} )
        .attr({
            "text-anchor": 'left',
            "font-size": 9,
          "fill":"red"});

          




});
