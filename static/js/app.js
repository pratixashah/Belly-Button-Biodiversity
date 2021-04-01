var url = "samples.json";
var selectedid = 0;

var x=[];
var y=[];
var labels=[];


  function loadIds()
  {
     d3.json(url).then(
         function(data)
        {
            //console.log(data);
            var ids = data.samples.map((row) => row.id)
            //console.log(ids);

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

            var metadata = data.metadata.filter(function(m) { return m.id == selectedid});

            console.log(metadata[0].wfreq);

            d3.select("#sample-metadata")
            .selectAll("p")
            .data(metadata)
            .enter()
            .append("p")
            .html(function(d) { 
                return `<p>Id: ${d.id}</p><p>Ethinicity: ${d.ethnicity}</p><p>Gender: ${d.gender}</p><p>Age: ${d.age}</p><p>Location: ${d.location}</p><p>bbType: ${d.bbtype}</p><p>wfreq: ${d.wfreq}</p>`; });

            /////////////
            var selected = data.samples.map(function(row){
                if(row.id === selectedid)
                {
                    y = row.sample_values.sort((a,b) => a.sample_values - b.sample_values);
                    x = row.otu_ids.sort((a,b) => a.sample_values - b.sample_values);
                    labels = row.otu_labels.sort((a,b) => a.sample_values - b.sample_values);
        
                    // x = x.slice(0,10).reverse();
                    // y = y.slice(0,10).reverse();
                    //labels = labels.slice(0,10).reverse();
                    // console.log("Chart Data");
                    // console.log(x);
                    // console.log(y);
                    // console.log(labels);
                    return true;
                }
                else
                {
                    return false;
                }
            });
        
            var tracebar = {
                y:x.slice(0,10).reverse().map((row) => `OTU ${row}`),
                x:y.slice(0,10).reverse(),
                text:labels.slice(0,10).reverse(),
                type:"bar",
                orientation:'h'
            }
        
            var databar = [tracebar];
        
            var layoutbar = {
                title:`Bar Chart`,
                height:600,
                weight:300,
                margin:100
            }
            Plotly.newPlot("bar",databar, layoutbar);
        
            var tracebubble = {
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
        
            var databubble = [tracebubble];
        
            var layoutbubble = {
                title:`Bubble Chart`,
                xaxis:{ title:"OTU ID"}
            }
        
            Plotly.newPlot("bubble",databubble,layoutbubble);
        
           
            ////////////
            //console.log(metadata.map((row) => row.wfreq)[0]);

            var datagauge = [
                {
                    domain: { x: [0, 1], y: [0, 1]},
                    value: metadata[0].wfreq,
                    title: { text: "Belly Button Washing Frequency - Scrubs per week"},
                    type: "indicator",
                    mode: "gauge+number",
                    // values:[180/9,180/9,180/9,180/9,180/9,180/9,180/9,180/9,180/9,180],
                    meta: ['0-1','1-2','2-3','3-4','4-5','5-6','6-7','7-8','8-9'],
                    gauge: {
                        axis: { range: [null, 10] },
                        steps: [
                          { range: [0, 1], color: "#F8F3EC"},
                          { range: [1, 2], color: "#eff2e6"},
                          { range: [2,3], color: "#E9E6CA" },
                          { range: [3,4], color: "#E2E4B1" },
                          { range: [4,5], color: "#D5E49D" },
                          { range: [5,6], color: "#B7CC92" },
                          { range: [6,7], color: "#8CBF88" },
                          { range: [7,8], color: "#8ABB8F" },
                          { range: [8,9], color: "#85B48A" },
                          { range: [9,10], color:"#69946e"}
                        ],
                    }
                }
            ];
            
            var layoutgauge = {
                width: 500,
                height: 400,
                margin: { t: 0, r: 0, l: 0, b: 0 },
                //paper_bgcolor: "lavender",
                font: { color: "darkblue", family: "Arial" }
              };

            Plotly.newPlot('gauge', datagauge, layoutgauge);
        });     
  }
//   d3.select(".img-gallery").selectAll("div")
//   .data(complexData)
//   .enter() // creates placeholder for new data
//   .append("div") // appends a div to placeholder
//   .classed("col-md-4 thumbnail", true) // sets the class of the new div
//   .html(function(d) {return `<img src="${d.url}">`;
//   }); /


function buildPlot() 
{
    // Fetch the JSON data and console log it
    d3.json(url).then(function(data) {

    //console.log(selectedid);
    var selected = data.samples.map(function(row){
        if(row.id === selectedid)
        {
            y = row.sample_values.sort((a,b) => a.sample_values - b.sample_values);
            x = row.otu_ids.sort((a,b) => a.sample_values - b.sample_values);
            labels = row.otu_labels.sort((a,b) => a.sample_values - b.sample_values);

            // x = x.slice(0,10).reverse();
            // y = y.slice(0,10).reverse();
            //labels = labels.slice(0,10).reverse();
            // console.log("Chart Data");
            // console.log(x);
            // console.log(y);
            // console.log(labels);
            return true;
        }
        else
        {
            return false;
        }
    });

    var trace1 = {
        y:x.slice(0,10).reverse().map((row) => `OTU ${row}`),
        x:y.slice(0,10).reverse(),
        text:labels.slice(0,10).reverse(),
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
        
                    // x = x.slice(0,10).reverse();
                    // y = y.slice(0,10).reverse();
                    // labels = labels.slice(0,10).reverse();
                }
            });
                
            var metadata = data.metadata.filter(function(m) { return m.id == selectedid});

            //console.log(metadata);
    
            d3.select("#sample-metadata").html("");

            d3.select("#sample-metadata")
            .selectAll("p")
            .data(metadata)
            .enter()
            .append("p")
            .html(function(d) { 
                return `<p>Id: ${d.id}</p><p>Ethinicity: ${d.ethnicity}</p><p>Gender: ${d.gender}</p><p>Age: ${d.age}</p><p>Location: ${d.location}</p><p>bbType: ${d.bbtype}</p><p>wfreq: ${d.wfreq}</p>`; });

            // console.log(x);
            // console.log(y);

            //console.log(metadata.map((row) => row.wfreq)[0]);

            Plotly.restyle("bar", "x", [y.slice(0,10).reverse()]);
            Plotly.restyle("bar", "y", [x.slice(0,10).reverse().map((row) => `OTU ${row}`)]);
            Plotly.restyle("bar","text", [labels.slice(0,10).reverse()]);

            Plotly.restyle("bubble", "x", [x]);
            Plotly.restyle("bubble", "y", [y]);
            Plotly.restyle("bubble","text", [labels]);

            Plotly.restyle("gauge","value", metadata.map((row) => row.wfreq)[0]);
    });
}

loadIds();
//buildPlot();

