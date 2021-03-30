var url = "samples.json";
var selectedid = "940";

function unpack(rows, index) {
    //return rows[index];
    return rows.map(function(row) {
        if(row.id == index)
        return row;
    });
  }

  function loadIds(){
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

var x=[];
var y=[];
var labels=[];

  function buildPlot() {

    // Fetch the JSON data and console log it
    d3.json(url).then(function(data) {
    
    console.log(data.samples);

    var selected = data.samples.map(function (row){
        if(row.id === selectedid)
        {
            y = row.sample_values.sort((a,b) => b.sample_values - a.sample_values);
            x = row.otu_ids.sort((a,b) => b.sample_values - a.sample_values);
            labels = row.otu_labels;

            x = x.slice(0,10).reverse();
            y = y.slice(0,10).reverse();
            labels = labels.slice(0,10).reverse();
            console.log(x);
            console.log(y);
            console.log(labels);
            return true;
        }
        else
        {
            return false;
        }
    });
    //var selecteddata = unpack(data.samples,selectedid)[0];
    //console.log(selected);

    var trace1 = {
        y:x.map((row) => `OTU ${row}`),
        x:y,
        text:labels,
        type:"bar",
        orientation:'h'
    }

    var data = [trace1];

    var layout = {
        title:`Top 10 OTUs found in ${selectedid}`,
        height:600,
        weight:300,
        margin:100
    }

    Plotly.newPlot("bar",data, layout);
    });

    
  }
  function optionChanged(s)
  {
    alert(s);
  }

  loadIds();
  
  buildPlot();
// var otu = data1.map((row) => row.samples)

// console.log(otu);
// Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);
