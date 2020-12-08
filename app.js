//Use d3.json() to fetch the data from the JSON file
//The data within the json file is arbitrarily called importedData
d3.json("data/samples.json").then((importedData) => {
    // console.log(importedData)

    let data = importedData;

    let subjectID = data.names;

    // console.log(subjectID);

    subjectID.forEach((member) => {
        // console.log(member)

        let section = d3.select("#selDataset");

        section.append("option").text(member);
    })
    // });

    // Initialize the page with a default plot
    //We will use subject ID 940 data for default plot
    function init() {

        let fileteredID = data.samples.filter(subject => subject.id === "940")[0];
        // console.log(fileteredID);

        let sampleValues = fileteredID.sample_values;
        // console.log(sampleValues);

        let otuIDs = fileteredID.otu_ids;
        // console.log(otuIDs);

        let otuLabels = fileteredID.otu_labels;
        // console.log(otuLabels);

        let top10SampleValues = sampleValues.slice(0, 10).reverse();
        // console.log(top10SampleValues);

        let top10OtuIDs = otuIDs.slice(0, 10).reverse();
        // console.log(top10OtuIDs);

        let top10OtuLabels = otuLabels.slice(0, 10).reverse();
        // console.log(top10OtuLabels);

        //Create horizontal bar graph
        trace = {
            x: top10SampleValues,
            y: top10OtuIDs.map(id => `OTU ${id}`),
            text: top10OtuLabels,
            type: "bar",
            orientation: "h"
        }

        let traceData = [trace]

        let layout = {
            title: "Top 10 Microbial Species (OTUs)",
            yaxis: { title: "OTU ID" },
            xaxis: { title: "Sample Value" },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 100
            }
        }

        Plotly.newPlot("bar", traceData, layout);

        //Create bubble graph
        let trace2 = {
            x: otuIDs,
            y: sampleValues,
            text: otuLabels,
            mode: 'markers',
            marker: {
                color: otuIDs,
                size: sampleValues
            }
        };

        var trace2Data = [trace2];

        var layout2 = {
            showlegend: false,
            height: 600,
            width: 1200,
            xaxis: { title: "OTU ID" },
            yaxis: {title: "Sample Value"},
            title: "Microbial Species Found per Sample"
        };

        Plotly.newPlot('bubble', trace2Data, layout2);

        //Create default demographic info for ID: 940
        let filterMetadata = data.metadata[0]
        // console.log(filterMetadata);

        // Use `Object.entries` to add each key and value pair to the panel
        Object.entries(filterMetadata).forEach(([key, value]) => {
            // Log the key and value
            // console.log(`${key}: ${value}`);
            d3.select("#sample-metadata")
                .append("p")
                .text(`${key}:${value}`)
        })

        //Optional : Gauge Chart
        let wfreq = filterMetadata.wfreq
        console.log(wfreq)

        let gaugeData = [
            {
                domain: { x: [0, 1], y: [0, 1] },
                value: wfreq,
                title: { text: "Belly Button Washing Frequency" },
                type: "indicator",
                mode: "gauge+number",
                gauge: { 
                    axis: { range: [null, 9] }, 
                    steps: [
                        {range: [0, 1], color: "floralwhite"},
                        {range: [1, 2], color: "antiquewhite"},
                        {range: [2, 3], color: "beige"},
                        {range: [3, 4], color: "bisque"},
                        {range: [4, 5], color: "blanchedalmond"},
                        {range: [5, 6], color: "cornsilk"},
                        {range: [6, 7], color: "ivory"},
                        {range: [7, 8], color: "lightgoldenrodyellow"},
                        {range: [8, 9], color: "linen"}
                    ]
                }
            }
        ];

        
        
        let gaugeLayout = { width: 600, height: 500, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', gaugeData, gaugeLayout);

    }
    // init();

    // Call updatePlotly() when a change takes place to the DOM
    d3.selectAll("#selDataset").on("change", optionChanged);

    // This function is called when a dropdown menu item is selected
    function optionChanged() {

        // Use D3 to select the dropdown menu
        let dropdownMenu = d3.select("#selDataset");
        // console.log(dropdownMenu)

        // Assign the value of the dropdown menu option to a variable
        let dataset = dropdownMenu.node().value;
        // console.log(dataset)

        let filteredID = data.samples.filter(subject => subject.id === dataset)[0];
        // console.log(filteredID);

        let sampleValues = filteredID.sample_values;
        // console.log(sampleValues);

        let otuIDs = filteredID.otu_ids;
        // console.log(otuIDs);

        let otuLabels = filteredID.otu_labels;
        // console.log(otuLabels);

        let top10SampleValues = sampleValues.slice(0, 10).reverse();
        // console.log(top10SampleValues);

        let top10OtuIDs = otuIDs.slice(0, 10).reverse();
        // console.log(top10OtuIDs);

        let top10OtuLabels = otuLabels.slice(0, 10).reverse();
        // console.log(top10OtuLabels);

        // Since we have a default plot, we must restyle the plots according to the ID called up
        //Restyle bar grapg
        Plotly.restyle("bar", "x", [top10SampleValues]);
        Plotly.restyle("bar", "y", [top10OtuIDs.map(id => `OTU ${id}`)]);
        Plotly.restyle("bar", "text", [top10OtuLabels]);

        //Restyle the bubble graph
        Plotly.restyle("bubble", "x", [otuIDs]);
        Plotly.restyle("bubble", "y", [sampleValues]);
        Plotly.restyle("bubble", "text", [otuLabels]);
        Plotly.restyle("bubble", "marker.color", [otuIDs]);
        Plotly.restyle("bubble", "marker.size", [sampleValues]);

        //Have the demographic info change depending on the ID selected
        //Remember that the id is an integer and the dropdown input value is not
        //So either change the input to a float or use 2 equal signs instead of 3
        let filterMetadata = data.metadata.filter(subject => subject.id == dataset)[0];
        // console.log(filterMetadata);

         //Use `.html("") to clear any existing metadata
        d3.select("#sample-metadata").html("");

        // Use `Object.entries` to add each key and value pair to the panel
        Object.entries(filterMetadata).forEach(([key, value]) => {
            // console.log(`${key}: ${value}`);
            d3.select("#sample-metadata")
                .append("p")
                .text(`${key}:${value}`)
        })

        //Gauge chart

        let allWfreq = filterMetadata.wfreq;
        // console.log(allWfreq)

        Plotly.restyle("gauge", "value", [allWfreq]);
    }

    init();





})
