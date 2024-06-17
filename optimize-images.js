const sharp = require('sharp');
const fs = require('fs');
const path = require("path");

const inputDir = "./src/imatges";
const outputDir = "./src/output";

fs.readdirSync(inputDir).forEach(file => {
  const inputPath = path.join(inputDir, file);
  const outputFilename = file.replace(/\.(png|jpg|jpeg)$/, '.webp')
  const outputPath = path.join(outputDir, outputFilename);

  sharp(inputPath)
    .webp({ quality: 50 })
    .toFile(outputPath, (err, info) => {
      if (err) {
        console.error("Error!");
      } else {
        console.log("Done!");
      }
    });
});