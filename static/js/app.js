var url = "samples.json";
var selectedid = 0;
// function unpack(rows, index) {
//     //return rows[index];
//     return rows.map(function(row) {
//         if(row.id == index)
//         return row;
//     });
//   }

  function loadIds()
  {
     d3.json(url).then(
         function(data)
        {
            var ids = data.samples.map((row) => row.id)
            console.log(ids);

            selectedid = ids[0];

            d3.select("#selDataset")
            .selectAll("option")
            .data(ids)
            .enter().append("option")
            .text(function(d) { return d; })
            .property("value",ids[0])
            .attr("value", function (d, i) {
                return d;
            });
        });     
  }


var x=[];
var y=[];
var labels=[];

function buildPlot() 
{
    // Fetch the JSON data and console log it
    d3.json(url).then(function(data) {

    var selected = data.samples.map(function(row){
        if(row.id === selectedid)
        {
            y = row.sample_values.sort((a,b) => a.sample_values - b.sample_values);
            x = row.otu_ids.sort((a,b) => a.sample_values - b.sample_values);
            labels = row.otu_labels.sort((a,b) => a.sample_values - b.sample_values);

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

    var trace1 = {
        y:x.map((row) => `OTU ${row}`),
        x:y,
        text:labels,
        type:"bar",
        orientation:'h'
    }

    var data = [trace1];

    var layout = {
       // title:`Top 10 OTUs found in ${selectedid}`,
        title:`Top 10 OTUs`,
        height:600,
        weight:300,
        margin:100
    }
    Plotly.newPlot("bar",data, layout);

    var trace2 = {
        y:y,
        x:x,
        text:labels,
        mode: 'markers',
        marker:
        {
            size: y,
            color:x
        },
        type:"bubble"
    }

    var data2 = [trace2];

    var layout2 = {
       // title:`Top 10 OTUs found in ${selectedid}`,
        title:`Top 10 OTUs`
    }

    Plotly.newPlot("bubble",data2,layout2);

    });

}

function optionChanged(id)
{
    alert(id);

    selectedid = id;

    d3.json(url).then(
        function(data) 
        {

        var selected = data.samples.map(
            function(row)
            {
                if(row.id === selectedid)
                {
                    y = row.sample_values.sort((a,b) => a.sample_values - b.sample_values);
                    x = row.otu_ids.sort((a,b) => a.sample_values - b.sample_values);
                    labels = row.otu_labels.sort((a,b) => a.sample_values - b.sample_values);
        
                    x = x.slice(0,10).reverse();
                    y = y.slice(0,10).reverse();
                    labels = labels.slice(0,10).reverse();
                }
            });
            console.log(x);
            console.log(y);
            //Plotly.restyle("bar","x:",[y],"y:",[x]);
            Plotly.restyle("bar", "x", [y]);
            Plotly.restyle("bar", "y", [x.map((row) => `OTU ${row}`)]);
            Plotly.restyle("bar","text", [labels]);
            //Plotly.restyle("bar","title",`{Top 10 OTUs found in ${selectedid}}`);
    });

    //buildPlot()
}

loadIds();

buildPlot();
// var otu = data1.map((row) => row.samples)

// console.log(otu);
// Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);
