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
import path from "path";

// Ambil URL dari argumen baris perintah
const url = process.argv[2];

if (!url) {
  console.error("Please provide a URL as an argument.");
  process.exit(1);
}

// Fungsi untuk mendapatkan nomor urut berikutnya
const getNextIndex = () => {
  const files = fs.readdirSync('.').filter(file => file.startsWith('qr_img_') && file.endsWith('.png'));
  const indices = files.map(file => parseInt(file.replace(/^qr_img_|\.png$/g, ''), 10));
  const maxIndex = Math.max(0, ...indices);
  return maxIndex + 1;
};

// Tambahkan nomor urut ke nama file untuk memastikan nama file unik
const index = getNextIndex();
const qrFileName = `qr_img_${index}.png`;
const urlFileName = `URL_${index}.txt`;

console.log("URL entered:", url); // Tambahan untuk debugging

// Menghasilkan QR Code
var qr_svg = qr.image(url, { type: 'png' });
qr_svg.pipe(fs.createWriteStream(qrFileName));

// Menyimpan URL ke file teks~
fs.writeFile(urlFileName, url, (err) => {
  if (err) throw err;
  console.log(`The file ${urlFileName} has been saved!`);
});

