const fs = require("fs");

// let investors = [];

// fs.readdir("./updates", (err, files) => {
//   for (file of files) {
//     // let index = file.indexOf("_");
//     const investorName = file.slice(0, file.indexOf("_"));

//     if (investors.find((investor) => investor == investorName)) {
//       console.log("found");
//     } else {
//       investors.push(investorName);
//     }
//   }
//   console.log(investors);

//   for (investor of investors) {
//     const filesToMerge = [];
//     for (file of files) {
//       if (investor == file.slice(0, file.indexOf("_"))) {
//         // add to buffer
//         console.log(file, "match");
//         filesToMerge.push("./updates/" + file);
//       }
//     }
//     merge(filesToMerge, `./merged/${investor} - merged.pdf`, function (err) {
//       if (err) {
//         return console.log(err);
//       }
//       console.log("Successfully merged!");
//     });
//   }

//   if (err) {
//     console.log(err);
//   }
// });
const PDFMerger = require("pdf-merger-js");

let investors = [];

const directory = "updates_full";
let errors = [];

fs.readdir(`./${directory}`, (err, files) => {
  for (file of files) {
    // let index = file.indexOf("_");
    const investorName = file.slice(0, file.lastIndexOf("_"));

    if (investors.find((investor) => investor == investorName)) {
      console.log("found");
    } else {
      investors.push(investorName);
    }
  }
  //   console.log(investors);

  for (investor of investors) {
    var merger = new PDFMerger();
    console.log(investor);
    let filesTM = [];
    (async () => {
      try {
        for (file of files) {
          if (file != ".DS_Store") {
            if (investor == file.slice(0, file.lastIndexOf("_"))) {
              // add to buffer
              console.log(file, "match", typeof file);
              filesTM.push(file);
              merger.add(`./${directory}/` + file);
            }
          }
        }
        await merger.save(`./merged/${investor} - Investor Updates Q1 2022.pdf`); //save under given name and reset the internal document
      } catch (err) {
        console.log(err);
        errors.push({ name: investor, files: filesTM });
      }
    })();
  }
  console.log(errors, errors.length);
  if (err) {
    console.log(err);
  }
});

// for (investor of investors) {
//   var merger = new PDFMerger();
//   console.log(investor);
//   (async () => {
//     merger.add(`./updates/${investor}_1.pdf`); //merge all pages. parameter is the path to file and filename.
//     merger.add(`./updates/${investor}_2.pdf`); //merge all pages. parameter is the path to file and filename.

//     await merger.save(`./merged/${investor}.pdf`); //save under given name and reset the internal document
//   })();
// }
