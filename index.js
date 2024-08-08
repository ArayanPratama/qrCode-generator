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



import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from 'fs';

async function main() {
  // Mengambil URL dari argumen baris perintah
  const url = process.argv[2];

  if (!url) {
    console.error("Tolong masukan URL sebagai argumen.");
    process.exit(1);
  }

  // Menanyakan nama file untuk gambar QR Code
  const { qrFileName, urlFileName } = await inquirer.prompt([
    {
      type: 'input',
      name: 'qrFileName',
      message: 'Enter the filename for the QR code image ("YourFileName.png"):',
      validate: (input) => input.trim() !== '' ? true : 'Filename cannot be empty.'
    },
    {
      type: 'input',
      name: 'urlFileName',
      message: 'Enter the filename for the URL text file ("YourFileName.txt"):',
      validate: (input) => input.trim() !== '' ? true : 'Filename cannot be empty.'
    }
  ]);

  // Menampilkan URL yang dimasukkan
  console.log("URL entered:", url);

  // Menghasilkan QR Code
  const qr_svg = qr.image(url, { type: 'png' });
  qr_svg.pipe(fs.createWriteStream(qrFileName));

  // Menyimpan URL ke file teks
  fs.writeFile(urlFileName, url, (err) => {
    if (err) throw err;
    console.log(`The file ${urlFileName} has been saved!`);
  });
}

// Menjalankan fungsi utama
main();


