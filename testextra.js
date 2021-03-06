/*
    Made by: Jonathan Na
    Source: https://bl.ocks.org/d3noob/bf44061b1d443f455b3f857f82721372 
    Function: Changes the background color of the webpage and will endlessly repeat
*/
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

/*
    Made by: Jonathan Na
    Function: Refreshes the webpage
*/
function erase() {
    window.location.reload(false);
}

//Changes the input box size, making it bigger
document.getElementById('size').style.width="50px";
document.getElementById('size').style.fontSize="14pt";

document.getElementById('inputbar').style.color="white";
document.getElementById('inputbar').style.width="200px";
document.getElementById('inputbar').style.paddingLeft="10px";
document.getElementById('inputbar').style.paddingRight="10px";

/*
    Made by: Jonathan Na
    Source: https://stackoverflow.com/questions/17584515/how-to-enable-a-disabled-button-by-clicking-on-another-button/17584555
    Function: Disable another button when clicked
*/
function disablebutton1() {
    document.getElementById("buttons5").disabled = true;
    document.getElementById("buttons2").disabled = true;
}

function disablebutton2() {
    document.getElementById("buttons4").disabled = true;
    document.getElementById("buttons3").disabled = true;
}
