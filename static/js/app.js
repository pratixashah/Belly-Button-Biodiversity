var url = "samples.json";

var selectedid = 0;

var x=[];
var y=[];
var labels=[];


  function loadPlots()
  {
     d3.json(url).then(
         function(data)
        {
            // console.log("Original Data:");
            // console.log(data);

            // To get list of all Ids and fill dropdown
            var ids = data.samples.map((row) => row.id)

            console.log(`Ids: ${ids}`);

            selectedid = ids[0];
            
            console.log(`Selected Id: ${selectedid}`);

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

            // Fill Demographic Info 
            let dataForSelectedId = data.metadata.filter(function(m) { return m.id == selectedid});

            console.log("Info for Selected Id:");
            console.log(dataForSelectedId[0]);

            d3.select("#sample-metadata")
            .selectAll("p")
            .data(dataForSelectedId)
            .enter()
            .append("p")
            .html(function(d) { 
                return `<p>Id: ${d.id}</p><p>Ethinicity: ${d.ethnicity}</p><p>Gender: ${d.gender}</p><p>Age: ${d.age}</p><p>Location: ${d.location}</p><p>bbType: ${d.bbtype}</p><p>wfreq: ${d.wfreq}</p>`; });

            // To get data for selected Id
            data.samples.map(function(row){
                if(row.id === selectedid)
                {
                    y = row.sample_values.sort((a,b) => a.sample_values - b.sample_values);
                    x = row.otu_ids.sort((a,b) => a.sample_values - b.sample_values);
                    labels = row.otu_labels.sort((a,b) => a.sample_values - b.sample_values);
    
                    console.log("Data for Chart");
                    console.log(x.slice(0,10).reverse());
                    console.log(y.slice(0,10).reverse());
                    console.log(labels.slice(0,10).reverse());

                    return true;
                }
                else
                {
                    return false;
                }
            });
        
            // To get Bar chart with Top 10 OTUs
            var tracebar = {
                y:x.slice(0,10).reverse().map((row) => `OTU ${row}`),
                x:y.slice(0,10).reverse(),
                text:labels.slice(0,10).reverse(),
                type:"bar",
                orientation:'h'
            }
        
            var databar = [tracebar];
        
            var layoutbar = {
                title:`Top 10 OTUs`,
                height:600,
                weight:300,
                margin:100
            }
            Plotly.newPlot("bar",databar, layoutbar);
        
            // To get Bubble Chart for all OTUs for selected Id
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
                title:`All OTUs`,
                xaxis:{ title:"OTU ID"}
            }
        
            Plotly.newPlot("bubble",databubble,layoutbubble);
        
           
            // To get Gauge Chart
            var datagauge = [
                {
                    domain: { x: [0, 1], y: [0, 1]},
                    value: dataForSelectedId[0].wfreq,
                    title: { text: "Belly Button Washing Frequency (Scrubs per week)"},
                    type: "indicator",
                    mode: "gauge+number",
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
                font: { color: "darkblue", family: "Arial" }
              };

            Plotly.newPlot('gauge', datagauge, layoutgauge);
        });     
  }

// Function to get data & charts for selected id
function optionChanged(id)
{
    selectedid = id;

    console.log(`Selected Id: ${selectedid}`);

    // To get data for selected Id
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
                }
            });
               
            console.log("Data for Chart");
            console.log(x.slice(0,10).reverse());
            console.log(y.slice(0,10).reverse());
            console.log(labels.slice(0,10).reverse());

            // Fill Demographic Info for selected id
            let dataForSelectedId = data.metadata.filter(function(m) { return m.id == selectedid});
    
            console.log("Info for Selected Id:");
            console.log(dataForSelectedId[0]);

            d3.select("#sample-metadata").html("");

            d3.select("#sample-metadata")
            .selectAll("p")
            .data(dataForSelectedId)
            .enter()
            .append("p")
            .html(function(d) { 
                return `<p>Id: ${d.id}</p><p>Ethinicity: ${d.ethnicity}</p><p>Gender: ${d.gender}</p><p>Age: ${d.age}</p><p>Location: ${d.location}</p><p>bbType: ${d.bbtype}</p><p>wfreq: ${d.wfreq}</p>`; });

            // To restyle Bar Chart
            Plotly.restyle("bar", "x", [y.slice(0,10).reverse()]);
            Plotly.restyle("bar", "y", [x.slice(0,10).reverse().map((row) => `OTU ${row}`)]);
            Plotly.restyle("bar","text", [labels.slice(0,10).reverse()]);

            // To restyle Bubble Chart
            Plotly.restyle("bubble", "x", [x]);
            Plotly.restyle("bubble", "y", [y]);
            Plotly.restyle("bubble","text", [labels]);

            // To restyle Gauge Chart
            Plotly.restyle("gauge","value", dataForSelectedId[0].wfreq);
    });
}

// To load page with default chart and data 
loadPlots();

