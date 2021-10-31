import React from "react"
import './App.css'
import Webcam from "react-webcam"
import axios from "axios"

function App() {
  const webcamRef = React.useRef(null)
  const [drunk, setDrunk] = React.useState(null)

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot()
    const image = new Image()
    image.src = imageSrc
    let data = new FormData()
    data.append('image', image.src)

    const headers = { 
      'content-type': 'multipart/form-data' 
    }
    const res = axios.post("https://am-i-drunk-330707.ue.r.appspot.com/get_drunk/", data, { headers })
    res.then(r => {
      setDrunk(r.data.drunk)
      console.log(r.data.drunk)
    })
  }

  return (
    <div className="App">
      <h1>Am I Drunk?</h1>
      <Webcam ref={webcamRef} screenshotFormat="image/jpeg" />
      <button onClick={capture}>Check</button>
      {drunk ? (
        <p>🍺 You are drunk!</p>
      ) : null}
    </div>
  );
}

export default App;
