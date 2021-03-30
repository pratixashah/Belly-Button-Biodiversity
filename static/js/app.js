var url = "samples.json";
var selectedid = "940";

function unpack(rows, index) {
    //return rows[index];
    return rows.map(function(row) {
        if(row.id == index)
        return row;
    });
  }

  function Ids(){
      d3.json(url).then(function(data)
      {
        var ids = data.samples.map((row) => row.id)
        console.log(ids);

        d3.select("#selDataset").data(ids).enter().append('option');

        d3.select("#selDataset")
		.selectAll("option")
		.data(ids)
		.enter().append("option")
		.text(function(d) { return d; })
		.attr("value", function (d, i) {
			return d;
		});
      });

      

  }
  function buildPlot() {

    // Fetch the JSON data and console log it
    d3.json(url).then(function(data) {
    
    console.log(data.samples);
    // 
    // var selecteddata = unpack(data.samples,selectedid)[0];
    // console.log(selecteddata);
    });
  }
  function optionChanged(s)
  {
    alert(s);
  }
  Ids();
  
  //buildPlot();
// var otu = data1.map((row) => row.samples)

// console.log(otu);
// Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);
