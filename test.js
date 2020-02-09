    var count = 0,
        durationTime = 0,
        array = 0,
        unsortedArray = [],
        sortedArray = [],
        barWidth = 0,
        x = d3.scaleLinear();
    
    var margin = {top: 40, right: 40, bottom: 180, left: 40},
        width = 1000 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom;

    function newBar() {
        let size = parseInt(document.getElementById('size').value);
        count = size;
        durationTime = 2000/count;
        array = d3.shuffle(d3.range(1,count + 1));
        unsortedArray = [...array];
        sortedArray = [];
        barWidth = width/count;

        x = d3.scaleLinear()
            .domain([0,count])
            .range([0, width]);

        var svg = d3.select("body").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
        .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

        var rects = svg.append("g")
            .attr("transform", "translate(" + barWidth + ",2)")
        .selectAll("rect")
            .data(unsortedArray)
        .enter().append("rect")
    
        var labels = svg.selectAll("text")
            .data(unsortedArray)
        .enter().append("text")

        labels.attr("id", function(d) {return "text" + d})
            .attr("transform", function(d, i) {return "translate(" + x(i) + ",0)"})
            .html(function(d) {return d;})

        rects.attr("id", function(d) {return "rect" + d})
            .attr("transform", function(d, i) {return "translate(" + (x(i) - barWidth) + ",0)"})
            .attr("width", barWidth *.9)
            .attr("height", function(d) {return d*barWidth/3})
    }

    function erase() {
        window.location.reload(false);
    }

    function bubbleSort() {
        function sortPass(i) {
            if (i<=unsortedArray.length) {
                if (unsortedArray[i] < unsortedArray[i-1]) {

                    d3.select("#rect" + unsortedArray[i]).attr("class", "testing")
                    d3.select("#rect" + unsortedArray[i-1]).attr("class", "testing")
                    
                    d3.timeout(function() {
                        d3.select("#rect" + unsortedArray[i]).attr("class", "")
                        d3.select("#rect" + unsortedArray[i-1]).attr("class", "")                                            
                    }, durationTime);

                    var temp = unsortedArray[i-1];
                    unsortedArray[i-1] = unsortedArray[i];
                    unsortedArray[i] = temp;

                    slide(unsortedArray[i], i + sortedArray);
                    slide(unsortedArray[i-1], i-1 + sortedArray);

                    d3.timeout(function() {return sortPass(++i)}, durationTime);

                } else if (i == unsortedArray.length) {

                    for (n = i; n == unsortedArray[n-1]; n--) {
                        d3.select("#text" + n).attr("class", "sorted")
                        unsortedArray.pop();
                    }              

                    sortPass(++i);
                } else {               
                    sortPass(++i);
                }

            } else {
                bubbleSort();
            }
        }
        sortPass(1);
    }

    function slide(d, i) {
        d3.select("#text" + d)
            .transition().duration(durationTime)
            .attr("transform", function(d) {return "translate(" + (x(i)) + ", 0)"})

        d3.select("#rect" + d)
            .transition().duration(durationTime)
            .attr("transform", function(d) {return "translate(" + (x(i-1)) + ", 0)"})                
    }

    function repeat() {
        d3.select("body")
        .transition() // First fade to green.
        .delay(1000)
          .style("background-color", "blue")
        .transition() // Then red.
        .delay(1000)
          .style("background-color", "green")
        .transition() // Wait one second. Then brown, and remove.
          .delay(1000)
          .style("background-color", "red")
        .on("end", repeat);
      }