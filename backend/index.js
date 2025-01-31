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

     try {
        const json1 = JSON.parse(fileContent1);
        const json2 = JSON.parse(fileContent2);
      
        const highlightDifferences = (obj1, obj2) => {
   
            for (const key in { ...obj1, ...obj2 }) {
                if (obj1[key] === undefined) {
                    obj1[key] = typeof obj2[key] === 'object'
                        ? JSON.parse(JSON.stringify(obj2[key]))  // Deep copy object
                        : `<b>${obj2[key]}</b>`;
                } 
                else if (obj2[key] === undefined) {
                    obj2[key] = typeof obj1[key] === 'object'
                        ? JSON.parse(JSON.stringify(obj1[key]))  // Deep copy object
                        : `<b>${obj1[key]}</b>`;
                } 
                else if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                    highlightDifferences(obj1[key], obj2[key]); // Recursively compare nested objects
                } 
                else {
                    if (obj1[key] !== obj2[key]) {
                        obj1[key] = `<b>${obj1[key]}</b>`;
                        obj2[key] = `<b>${obj2[key]}</b>`;
                    }
                }
            }
            
            
        };
      
        highlightDifferences(json1, json2);
      
        res.status(200).json({
          json1: json1,
          json2: json2
        });
      
      } catch (error) {
        res.status(400).json({ error: "Invalid JSON content." });
      }
      
    
    console.log("File received");
})


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
