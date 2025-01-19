
import {useState} from "react";
import './App.css';

function App() {

  const [fileContent1, setFileContent1] = useState("");
  const [fileContent2, setFileContent2] = useState("");

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

  return (
    <div className="App">
      <h1>Text Comparison</h1>
      <button className="diff-btn">FIND DIFFERENCE</button>
      <div className='text-area-div'>
        <div className='text-area-wrapper'>
          
          <input 
            type="file" 
            className= "input-field" 
            accept=".txt"
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
            accept=".txt"
            onChange={(e) => handleFileChange(e, setFileContent2)} 
          />
          <textarea 
            className='text-area'
            value={fileContent2}
            placeholder = "Enter Text">
          </textarea>

        </div>
      </div>
      
    </div>
  );
}

export default App;
