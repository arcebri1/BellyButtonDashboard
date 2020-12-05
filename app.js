//Use d3.json() to fetch the data from the JSON file
//The data within the json file is arbitrarily called importedData
d3.json("data/samples.json").then((importedData) => {
    // console.log(importedData)

    let data = importedData;

    // data.sort(function(a,b){
    //     return (d.)
    // })

    let subjectID = data.names;

    // console.log(subjectID);

    subjectID.forEach((member) => {
        // console.log(member)

        let section = d3.select("#selDataset");

        section.append("option").text(member)
    })
})

// let sample_values = data.samples.sample_values;

// console.log(sample_values);

function unpack(rows, index) {
    return rows.map(function (row) {
        return row[index];
    });
}

// function getData() {
//     d3.json("data/samples.json").then(function(data) {
//         let values = unpack(data.samples.sample_values)

    // console.log(values)

    // })
// console.log(values)
// }
// console.log(values)
