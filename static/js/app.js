var url = "samples.json";
var selectedid = 0;

  function loadIds()
  {
     d3.json(url).then(
         function(data)
        {
            console.log(data.metadata);
            var ids = data.samples.map((row) => row.id)
            console.log(ids);

            selectedid = ids[0];
            
            d3.select("#selDataset")
            .selectAll("option")
            .data(ids)
            .enter()
            .append("option")
            .text(function(d) { return d; })
            .property("value",ids[0])
            .attr("value", function (d, i) {
                return d;
            });

            var metadata = data.metadata.filter(function(m) { return m.id == selectedid})[0];

            console.log(metadata);

            d3.select("#sample-metadata")
            .selectAll("label")
            .data(metadata)
            .enter()
            .append("label")
            .text(function(d) { return `${d3.keys(metadata)}${d3.values(metadata)}`; })
            .append('br');
        });     
  }
//   d3.select(".img-gallery").selectAll("div")
//   .data(complexData)
//   .enter() // creates placeholder for new data
//   .append("div") // appends a div to placeholder
//   .classed("col-md-4 thumbnail", true) // sets the class of the new div
//   .html(function(d) {return `<img src="${d.url}">`;
//   }); /

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
        title:`Bar Chart`,
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
            color:x,
            colorscale: 'Portland'
        },
        type:"bubble"
    }

    var data2 = [trace2];

    var layout2 = {
        title:`Bubble Chart`,
        xaxis:{ title:"OTU ID"}
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

            Plotly.restyle("bar", "x", [y]);
            Plotly.restyle("bar", "y", [x.map((row) => `OTU ${row}`)]);
            Plotly.restyle("bar","text", [labels]);

            Plotly.restyle("bubble", "x", [x]);
            Plotly.restyle("bubble", "y", [y]);
            Plotly.restyle("bubble","text", [labels]);
    });
}

loadIds();
//buildPlot();

