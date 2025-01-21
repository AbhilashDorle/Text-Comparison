const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post('/upload', (req,res) =>{
    const { fileContent1, fileContent2 } = req.body;

     if (!fileContent1 || !fileContent2) {
    return res.status(400).json({ error: "Both file contents are required." });
     }

    try{
        const json1 = JSON.parse(fileContent1);
        const json2 = JSON.parse(fileContent2);

        for(const key in {...json1, ...json2})
        {
            if(json1[key]!=json2[key])
            {
                json1[key]=`<b>${json1[key]}</b>`;
                json2[key]=`<b>${json2[key]}</b>`;
            }
        }
        
        res.status(200).json({
            json1: json1,
            json2: json2,
          });
          
    } catch (error) {
        res.status(400).json({ error: "Invalid JSON content." });
      }
    
    
    console.log("File received");
})


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
