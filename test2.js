/*
    Made by: Jonathan Na
    Source: https://bl.ocks.org/alokkshukla/5306fdf5684f85d5b768d2bc02013b09 and
    https://bl.ocks.org/alexmacy/770f14e11594623320db1270361331dc 
    Function: Creates the variable and function to create a random bar graph that needs to be sorted.
*/

var count = 0,
    array = 0,
    durationTime = 0,
    barWidth = 0,
    width = 900,
    height = 500,
    unsortedArray = [],
    x = d3.scaleBand(),
    y = d3.scaleLinear();
var svg;

function newBar2() {
    let size = parseInt(document.getElementById('size').value);
    count = size;
    durationTime = 40000/count;
    array = d3.shuffle(d3.range(1,count + 1));
    unsortedArray = [...array];
    barWidth = width/count;

    x = d3.scaleBand()
            .domain(d3.range(unsortedArray.length))
            .rangeRound([0, width])
            .paddingInner(0.04);
    
    y = d3.scaleLinear()
            .domain([0, d3.max(unsortedArray)])
            .range([0, height]);

    svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);
    
    svg.selectAll("rect")
    .data(unsortedArray)
    .enter()
    .append("rect")
    .attr("x", function(d, i) { return x(i); })
    .attr("y", function(d) { return height - y(d); })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return y(d); });

    svg.selectAll("text")
    .data(unsortedArray)
    .enter()
    .append("text")
    .text(function(d) { return d; })
    .attr("text-anchor", "middle")
    .attr("x", function(d, i) { return x(i) + x.bandwidth() / 2; })
    .attr("y", function(d) {
        if(y(d)<=15) {
            return height - y(d) - 2;
        }else{
            return height - y(d) + 14;
        }
    })
    .style('fill', 'red');
}

/*
    Made by: Jonathan Na
    Source: https://bl.ocks.org/alokkshukla/5306fdf5684f85d5b768d2bc02013b09
    and https://www.w3resource.com/javascript-exercises/javascript-function-exercise-24.php  
    Function: Performs the bubble sort from the random array, note: instead of using an if statement
    to go through each sort I wanted to make it quicker to sort through the array first then commit the graphical action. 
*/
   function bubbleSort2() {
    var done;
    do {
        done = false;
        clickit2();
        for (let i = 0; i < unsortedArray.length; i++) {
            if (unsortedArray[i] > unsortedArray[i + 1]) {

                var temp = unsortedArray[i];
                unsortedArray[i] = unsortedArray[i + 1];
                unsortedArray[i + 1] = temp;
                arrayBounce();
                checkit2(done);
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
    function clickit2() {
        setInterval(() => {
            document.getElementById('buttons3').click();
        }, 5000);
    }

    /*
        Made by: Jonathan Na
        Param: done = false
        Function: Checks if aray has been sorted correctly
    */
    function checkit2(done) {
        for (let i = 0; i < unsortedArray.length; i++) {
            if (unsortedArray[i] < unsortedArray[i + 1]) {
                done = true;
            }
        }
    }

   /*
    Made by: Jonathan Na
    Source: https://bl.ocks.org/alokkshukla/5306fdf5684f85d5b768d2bc02013b09
    Function: Performs the d3 action to bounce the bar graph
*/
   function arrayBounce() {
        svg.selectAll("rect")
        .data(unsortedArray)
        .transition()
        .delay(function(d, i) { return i * 100; })
        .duration(1000)
        .ease(d3.easeBounceOut)
        .attr("y", function(d) { return height - y(d); })
        .attr("height", function(d) { return y(d); })
        .style('fill', 'red');

    svg.selectAll("text")
        .data(unsortedArray)
        .transition()
        .delay(function(d, i) { return i * 100; })
        .duration(1000)
        .ease(d3.easeCircleIn)
            .text(function(d) {
            return d;
        })
        .attr("x", function(d, i) { return x(i) + x.bandwidth() / 2; })
        .attr("y", function(d) {
            if(y(d)<=15) {
                return height - y(d) - 2;
            }else{
                return height - y(d) + 14;
            }
        })
        .style('fill', 'black');
   }