const bwipjs = require('bwip-js');

// Function to generate a barcode based on product details
const generateBarcode = async (name, price) => {
  try {
    // Combine name and price to create a unique identifier for the barcode
    const barcodeData = `${name}-${price}`;

    // Generate the barcode using bwip-js
    const pngBuffer = await new Promise((resolve, reject) => {
      bwipjs.toBuffer({
        bcid: 'code128',       // Barcode type
        text: barcodeData,     // Text to encode
        scale: 3,              // Scale factor
        height: 10,            // Bar height
        includetext: true,     // Show human-readable text
        textxalign: 'center',  // Text alignment
      }, (err, png) => {
        if (err) reject(err);
        else resolve(png);
      });
    });

    // You can save the PNG buffer to a file or send it as a response, etc.
    return pngBuffer;
  } catch (error) {
    console.error('Error generating barcode:', error);
    throw error;
  }
};

module.exports = {
  generateBarcode,
};
