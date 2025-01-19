import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Text Comparison</h1>
      <button className="diff-btn">FIND DIFFERENCE</button>
      <div className='text-area-div'>
        <div className='text-area-wrapper'>
          
          <input type="file" className= "input-field" id="upload-left"/>
          <textarea className='text-area'></textarea>
          
        </div>
        <div className='text-area-wrapper'>

          <input type="file" className= "input-field" id="upload-left"/>
          <textarea className='text-area'></textarea>

        </div>
      </div>
      
    </div>
  );
}

export default App;
