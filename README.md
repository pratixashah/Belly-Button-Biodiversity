# BELLY BUTTON BIODIVERSITY with Plotly

An interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogs the microbes that colonize human navels. The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.
 
- **Data Resources: samples.json**
- **Script File: static/js/app.js**
- **Landing page: index.html**


**Features:**
- Displays a HTML web page as landing page.
- Loads list of Ids to dropdown with first Id selected by default.
- Based on user selection for Id, it changes dashboard dynamically. 

  - **1. Demographic Information:**
    - Display each key-value pair from the metadata JSON object.
    - Displays the sample metadata, i.e., an individual’s demographic information.

  - **2. Bar Chart:**
    - Displays horizontal bar chart for Top 10 OTU of selected Id.
    - sample_values as the values for the bar chart.
    - otu_ids as the labels for the bar chart.
    - otu_labels as the hovertext for the chart.

  - **3. Gauge Chart:**
    - It shows weekly washing frequency of the individual.
    - The value ranges between 0 to 9.

  - **4. Bubble Chart:**
    - Displays All OTU for selected Id.
    - otu_ids for the x values.
    - sample_values for the y values.
    - sample_values for the marker size.
    - otu_ids for the marker colors.
    - otu_labels for the text values.

