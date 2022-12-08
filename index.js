import express from 'express';
import bodyParser from 'body-parser';
import multer from 'multer';

import { convert } from './converter.js';


const app = express();
const upload = multer();
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.text());

const port = 3000

app.post('/convert', upload.single('file'), async (req, res) => {
    
    const fileData = await convert(req.file);

    const result = fileData.Pages.map(page => page.Texts.reduce((prev, curr) => {
            prev.push(
                curr.R.map(obj => decodeURI(obj.T)).join(' ')
            );
            return prev;
        }, [])
    );

    res.status(200).json(result)
})

app.listen(port, () => {
    console.log(`Converter app listening on port ${port}`)
});