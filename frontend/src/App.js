import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Text Comparison</h1>
      <div className='text-area-div'>
        <div className='text-area-wrapper'>
          <button className='upload-btn'>Upload File</button>
          <textarea className='text-area'>Enter First File Text</textarea>
        </div>
        <div className='text-area-wrapper'>
          <button className='upload-btn'>Upload Right</button>
          <textarea className='text-area'>Enter Second File Text</textarea>
        </div>
      </div>
    </div>
  );
}

export default App;
