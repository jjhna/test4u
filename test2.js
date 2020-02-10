/*
    Made by: Jonathan Na
    Source: https://bl.ocks.org/alokkshukla/5306fdf5684f85d5b768d2bc02013b09
    Function: Creates a graph bar that goes up with a bounce transition.
*/

var count = 0,
    array = 0,
    durationTime = 0,
    barWidth = 0,
    width = 900,
    height = 500,
    unsortedArray = [],
    sortedArray = [];

var x = d3.scaleBand();

var y = d3.scaleLinear();

//Create SVG element
var svg;

function newBar2() {
    let size = parseInt(document.getElementById('size').value);
    count = size;
    durationTime = 40000/count;
    array = d3.shuffle(d3.range(1,count + 1));
    unsortedArray = [...array];
    sortedArray = [];
    barWidth = width/count;

    x = d3.scaleBand()
            .domain(d3.range(unsortedArray.length))
            .rangeRound([0, width])
            .paddingInner(0.04);
    
    y = d3.scaleLinear()
            .domain([0, d3.max(unsortedArray)])
            .range([50, height]);

    svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
    
    //Create bars
    svg.selectAll("rect")
    .data(unsortedArray)
    .enter()
    .append("rect")
    .attr("x", function(d, i) {
            return x(i);
    })
    .attr("y", function(d) {
            return height - y(d);
    })
    .attr("width", x.bandwidth())
    .attr("height", function(d) {
            return y(d);
    })
    .attr("fill", function(d) {
            return "rgb(0, 0, " + Math.round(d * 10) + ")";
   });

    //Create labels
    svg.selectAll("text")
    .data(unsortedArray)
    .enter()
    .append("text")
    .text(function(d) {
            return d;
    })
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) {
            return x(i) + x.bandwidth() / 2;
    })
        .attr("y", function(d) {
            if(y(d)<=15) {
                return height - y(d) - 2;
            }else{
                return height - y(d) + 14;
            }
        })
    .attr("font-family", "sans-serif")
    .attr("font-size", "11px")
    .attr("fill", function (d) {
        if(y(d)<=15){
            return "black"
        }else{
            return "white";
        }
    });
}


   function upBar() {
       //New values for dataset
       var numValues = unsortedArray.length;						//Count original length of dataset
       dataset = [];  						 				//Initialize empty array
       var maxValue = 100;
       for (var i = 0; i < numValues; i++) {				//Loop numValues times
           var newNumber = Math.floor(Math.random() * maxValue); //New random integer (0-24)
           dataset.push(newNumber);			 			//Add new number to array
       }

       y.domain([0, d3.max(dataset)]);

       //Update all rects
       svg.selectAll("rect")
           .data(dataset)
           .transition()
           .delay(function(d, i) {
               return i * 100;
           })
           .duration(1000)
           .ease(d3.easeBounceOut)
           .attr("y", function(d) {
               return height - y(d);
           })
           .attr("height", function(d) {
               return y(d);
           })
           .attr("fill", function(d) {
               return "rgb(0,0," + Math.round(d * 10) + ")";
           });



       //Update all labels
       svg.selectAll("text")
           .data(dataset)
           .transition()								// <-- Now with
           .delay(function(d, i) {
               return i * 100;
           })
           .duration(1000)
           .ease(d3.easeCircleIn)
               .text(function(d) {
               return d;
           })
           .attr("x", function(d, i) {
               return x(i) + x.bandwidth() / 2;
           })
           .attr("y", function(d) {
               if(y(d)<=15) {
                   return height - y(d) - 2;
               }else{
                   return height - y(d) + 14;
               }
           })
           .attr("fill", function (d) {
               if(y(d)<=15){
                   return "black"
               }else{
                   return "white";
               }
           });
   }

