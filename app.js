//Use d3.json() to fetch the data from the JSON file
//The data within the json file is arbitrarily called importedData
d3.json("data/samples.json").then((importedData) => {
    console.log(importedData)

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
            yaxis: { title: "OTU IDs" },
            xaxis: { title: "Sample Values" },
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
            x: top10OtuIDs,
            y: top10SampleValues,
            text: top10OtuLabels,
            mode: 'markers',
            marker: {
                color: top10OtuIDs,
                size: top10SampleValues
            }
        };

        var trace2Data = [trace2];

        var layout2 = {
            showlegend: false,
            height: 600,
            width: 1000,
            xaxis: { title: "OTU ID" }
        };

        Plotly.newPlot('bubble', trace2Data, layout2);

        //Create default demographic info for ID: 940
        let filterMetadata = data.metadata[0]
        // console.log(filterMetadata);

        Object.entries(filterMetadata).forEach(([key, value]) => {
            // Log the key and value
            // console.log(`${key}: ${value}`);
            d3.select("#sample-metadata")
                .append("p")
                .text(`${key}:${value}`)
        })
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
        console.log(filteredID);

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



        // Note the extra brackets around 'x' and 'y'
    //     Plotly.restyle(CHART, "x", [x]);
    //     Plotly.restyle(CHART, "y", [y]);
    }

    init();





})
