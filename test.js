/*
    Made by: Jonathan Na
    Source: https://bl.ocks.org/alexmacy/770f14e11594623320db1270361331dc 
    Function: Creates the variable and function to create a random bar graph that needs to be sorted
*/
var count = 0,
durationTime = 0,
array = 0,
unsortedArray = [],
sortedArray = [],
barWidth = 0,
finish = false;
finish2 = false;
xScale = d3.scaleLinear();

var margin = {top: 40, right: 40, bottom: 180, left: 40},
width = 900 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

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

    var svg = d3.select("#mychart").append("svg")
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

/*
    Made by: Jonathan Na
    Source: https://bl.ocks.org/alexmacy/770f14e11594623320db1270361331dc 
    and https://www.w3resource.com/javascript-exercises/javascript-function-exercise-24.php  
    Function: Performs the bubble sort from the random array, note: instead of using an if statement
    to go through each sort I wanted to make it quicker to sort through the array first then commit the graphical action. 
*/
function bubbleSort() {
var done;
    do {
        done = false;
        clickit();
        for (let i = 0; i < unsortedArray.length; i++) {
            if (unsortedArray[i] > unsortedArray[i + 1]) {
                var temp = unsortedArray[i];
                unsortedArray[i] = unsortedArray[i + 1];
                unsortedArray[i + 1] = temp;

                movetransition(unsortedArray[i + 1], i+1 + sortedArray);
                movetransition(unsortedArray[i], i + sortedArray);

                checkit(done);
            }
        }
    } while(done);
    return unsortedArray;
}

/*
    Made by: Jonathan Na
    Source: https://www.reddit.com/r/incremental_games/comments/4ontg9/javascript_autoclicker/
    Function: autoclicks until array is sorted
*/
function clickit() {
    setInterval(() => {
        document.getElementById('buttons2').click();
    }, 5000);
}

/*
    Made by: Jonathan Na
    Param: done = false
    Function: Checks if aray has been sorted correctly
*/
function checkit(done) {
    for (let i = 0; i < unsortedArray.length; i++) {
        if (unsortedArray[i] < unsortedArray[i + 1]) {
            done = true;
        }
    }
}

    /*
        Made by: Jonathan Na
        Source: https://bl.ocks.org/alexmacy/770f14e11594623320db1270361331dc 
        Function: Performs the d3 translate and transition moves
    */
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
