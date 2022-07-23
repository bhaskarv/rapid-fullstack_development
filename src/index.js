const express = require('express')
const app = express()
const path = require('path');
const fs = require('fs');
const port = 3000

/*
app.get('/test', (req, res) => {
  res.json( {
    "hello":"Computer!!!"
  });
});
*/

app.post("/asset",(req, res) => {
    const fileName = req.header("file-Name"); // arguments are not case sensitive
    const contenType = req.header("Content-Type");

    const localFileName = path.join(__dirname,"../uploads",fileName);

    const fileWriterStream = fs.createWriteStream(localFileName);
    req.pipe(fileWriterStream)
        .on("error",err => {
            console.error(`Error writing ${localFileName}`);
            console.error(err);
            res.sendStatus(500);
        })
        .on("finish", () => {
            console.log(`Done writing file ${localFileName}`);
            res.sendStatus(200);
        });

    //console.log("File name ",fileName);
    //console.log("content type",contenType);

    //res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})