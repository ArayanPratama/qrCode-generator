// import inquirer from "inquirer";
// import qr from "qr-image";
// import fs from "fs";

// inquirer
//   .prompt([
//     {
//       message: "Type in your URL",
//       name: "URL",
//     },
//   ])
//   .then((answers) => {
//     const url = answers.URL;
//     console.log("URL entered:", url); // Tambahan untuk debugging
//     var qr_svg = qr.image(url, { type: 'png' });
//     qr_svg.pipe(fs.createWriteStream("qr_img.png"));

//     fs.writeFile("URL.txt", url, (err) => {
//       if (err) throw err;
//       console.log("The file has been saved!");
//     });
//   })
//   .catch((error) => {
//     if (error.isTtyError) {
//       console.log("Prompt couldn't be rendered in the current environment");
//     } else {
//       console.error("Something else went wrong:", error);
//     }
//   });



import qr from "qr-image";
import fs from "fs";

const url = process.argv[2]; // Ambil URL dari argumen baris perintah

if (!url) {
  console.error("Please provide a URL as an argument.");
  process.exit(1);
}

console.log("URL entered:", url); // Tambahan untuk debugging
var qr_svg = qr.image(url, { type: 'png' });
qr_svg.pipe(fs.createWriteStream("qr_img.png"));

fs.writeFile("URL.txt", url, (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});
