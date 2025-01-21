
import {useState} from "react";
import Display from "./Display";
import './App.css';

function App() {

  const [fileContent1, setFileContent1] = useState("");
  const [fileContent2, setFileContent2] = useState("");
  const [error, setError] = useState(null);
  const [inputFlag, setInputFlag] = useState(false);


  const handleFileChange = (event, setFileContent) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setFileContent(e.target.result); // Set file content to the state
      };

      reader.onerror = () => {
        alert("Failed to read the file. Please try again.");
      };

      reader.readAsText(file); // Read file as plain text

    }
  }

  const handleUpload = async () => {
    if(!fileContent1 || !fileContent2){
      console.log("Please select a file to upload")
      return;
    }


    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileContent1,
          fileContent2
        })
      });

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.error) {
        setError(data.error);
      } else {
        setInputFlag(true)
        setFileContent1(data.json1); // Set the returned json1 (with possible bold text)
        setFileContent2(data.json2); // Set the returned json2
      }
    } catch (error) {
      setError("Failed to upload files.");
    }
    
  }

  return (
    <div className="display-dev">
      {!inputFlag && <div className="App">
        <h1>Text Comparison</h1>
        <button className="diff-btn" onClick={handleUpload}>FIND DIFFERENCE</button>
        <div className='text-area-div'>
          <div className='text-area-wrapper'>
            
            <input 
              type="file" 
              className= "input-field" 
              accept=".txt, .json"
              onChange={(e) => handleFileChange(e, setFileContent1)}  
            />
            <textarea
              className='text-area'
              value={fileContent1}
              placeholder = "Enter Text">
            </textarea>
            
            
          </div>
          <div className='text-area-wrapper'>

            <input 
              type="file" 
              className= "input-field" 
              accept=".txt, .json"
              onChange={(e) => handleFileChange(e, setFileContent2)} 
            />
            <textarea 
              className='text-area'
              value={fileContent2}
              placeholder = "Enter Text">
            </textarea>

          </div>
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
        
      </div>}

      { inputFlag && 
        <Display 
          file1 = {fileContent1}
          file2 = {fileContent2}
        />}
    </div>
  );
}

export default App;
