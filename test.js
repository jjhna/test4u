var count = 0,
durationTime = 0,
array = 0,
unsortedArray = [],
sortedArray = [],
barWidth = 0,
xScale = d3.scaleLinear();

var margin = {top: 40, right: 40, bottom: 180, left: 40},
width = 1000 - margin.left - margin.right,
height = 1000 - margin.top - margin.bottom;

function newBar() {
    let size = parseInt(document.getElementById('size').value);
    count = size;
    durationTime = 40000/count;
    array = d3.shuffle(d3.range(1,count + 1));
    unsortedArray = [...array];
    sortedArray = [];
    barWidth = width/count;

    xScale = d3.scaleLinear()
        .domain([0,count])
        .range([0, width]);

    var svg = d3.select("body").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

    var bar = svg.append("g")
        .attr("transform", "translate(" + barWidth + ",2)")
        .selectAll("rect")
        .data(unsortedArray)
        .enter().append("rect")

    var texts = svg.selectAll("text")
        .data(unsortedArray)
        .enter().append("text")

    texts.attr("id", function(d) {return "text" + d})
        .attr("transform", function(d, i) {return "translate(" + xScale(i) + ",0)"})
        .html(function(d) {return d;})

    bar.attr("id", function(d) {return "rect" + d})
        .attr("transform", function(d, i) {return "translate(" + (xScale(i) - barWidth) + ",0)"})
        .attr("width", barWidth *.9)
        .attr("height", function(d) {return d*barWidth/3})
}

function erase() {
    window.location.reload(false);
}

function bubbleSort() {
var done;
do {
    done = false;
    for (let i = 0; i < unsortedArray.length; i++) {
        if (unsortedArray[i] > unsortedArray[i + 1]) {
            d3.select("#rect" + unsortedArray[i]).attr("class", "testing")
            d3.select("#rect" + unsortedArray[i-1]).attr("class", "testing")
            
            d3.timeout(function() {
                d3.select("#rect" + unsortedArray[i]).attr("class", "")
                d3.select("#rect" + unsortedArray[i-1]).attr("class", "")                                            
            }, durationTime);

            var temp = unsortedArray[i];
            unsortedArray[i] = unsortedArray[i + 1];
            unsortedArray[i + 1] = temp;

            movetransition(unsortedArray[i + 1], i+1 + sortedArray);
            movetransition(unsortedArray[i], i + sortedArray);
            
            done = true;
        }
    }
} while(done);
return unsortedArray;
}

function movetransition(original, other) {
    d3.select("#text" + original)
        .transition().duration(durationTime)
        .attr("transform", "translate(" + (xScale(other)) + ", 0)")
        .style('fill', 'blue')

    d3.select("#rect" + original)
        .transition().duration(durationTime)
        .attr("transform", "translate(" + (xScale(other-1)) + ", 0)")
        .style('fill', 'blue')
}

function rave() {
    d3.select("body")
    .transition()
    .delay(1000)
    .style("background-color", "purple")
    .transition() 
    .delay(1000)
    .style("background-color", "green")
    .transition() 
    .delay(1000)
    .style("background-color", "red")
    .on("end", rave);
}