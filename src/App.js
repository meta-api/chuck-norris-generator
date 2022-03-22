import { useState } from 'react';
import './App.css';
import chuckNorris from "./chuck-norris.png"

//Set your Spell ID HERE
const SPELL_ID = "6239e3233a9230e5d5a8da28";

//Add your API KEY inside a .env file (at root of the folder) and add it to variable REACT_APP_API_KEY
//Check .env.example for a example

function App() {

  const [lastFact, setLastFact] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  const generateAFact = async () => {
    setError(null);
    setIsLoading(true);
    try {
      const fact = await fetch(`https://api.meta-api.io/api/spells/${SPELL_ID}/runSync?apikey=${process.env.REACT_APP_API_KEY}`);
      if (fact.ok) {
        setLastFact(await fact.json());
      } else {
        console.error(fact);
        setError(`${fact.status}: ${fact.statusText}`)
      }
    } catch (error) {
      console.error(error);
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img
          style={{ animation: isLoading ? "spin 1s linear infinite" : "", margin: "1em" }}
          src={chuckNorris}
          alt="Chuck Norris" />
        <button onClick={generateAFact}>Generate a new Chuck Norris fact!</button>
        {lastFact && <div style={{ padding: "1em" }}>
          <i>Category: {lastFact.category}</i>
          <p>Fact: {lastFact.text}</p>
          <p>Yodish: {lastFact.yodish}</p>
        </div>}
        {error && <div style={{ color: "red" }}>{error}</div>}
      </header>
    </div>
  );
}

export default App;
