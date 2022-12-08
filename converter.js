import PDFParser from "pdf2json";
import * as fs from 'fs';

const PATH = './storage/buff.pdf';

const deleteIfExists = async (path) => {
    fs.exists(path, (exists) => {
        if(exists) {
            fs.unlink(path, () => {});
        } 
    });
}

export const convert = async (file) => new Promise((resolve, reject) => {

    fs.writeFileSync(PATH, file.buffer);

    const pdfParser = new PDFParser();


    pdfParser.loadPDF(PATH)

    pdfParser.on("pdfParser_dataError", errData => {
        deleteIfExists(PATH);
        reject(errData.parserError)
    } );
    pdfParser.on("pdfParser_dataReady", pdfData => {
        deleteIfExists(PATH);
        resolve(pdfData);
    });
});