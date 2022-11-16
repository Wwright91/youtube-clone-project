import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [apidata, setApidata] = useState([])

  useEffect(() => {
    fetch(
      `https://youtube.googleapis.com/youtube/v3/search?key=${process.env.REACT_APP_API_KEY}`
    )
      .then(res => res.json())
    .then(setApidata)
  }, [])

  console.log(apidata)

  return (
    <div className="App">

    </div>
  );
}

export default App;
