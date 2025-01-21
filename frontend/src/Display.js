import "./Display.css"

export default function Display(props) {

    const json1 = JSON.stringify(props.file1, null, 2)

    const json2 = JSON.stringify(props.file2, null, 2)
    
  
    return (
      <div className="display-div">
        <h1>Comparison Result</h1>
        <div className="changes-div">
            <div className="pretag-div">
                <pre className="text-tag" dangerouslySetInnerHTML={{__html: json1}}/>
            </div>
            <div className="pretag-div">
                <pre className="text-tag" dangerouslySetInnerHTML={{__html: json2}}/>
            </div>
        </div>
    </div>
    );
  }
  