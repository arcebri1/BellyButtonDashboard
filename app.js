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
    }

    init();
})
