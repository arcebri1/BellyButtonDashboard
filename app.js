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
    });
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

        trace = {
           x: otuIDs,
           y: sampleValues,
           text: otuLabels,
           name: "Bar Graph",
           type: "bar",
           orientation: "h" 
        }

        let traceData = [trace]

        let layout = {
            title: "Top 10 OTUs",
            xaxis: {title: "OTU IDs"},
            yaxis: {title: "Sample Values"}
        }

        Plotly.newPlot("bar", traceData, layout);
    }

    init();

});


