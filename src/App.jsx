import React, { useState } from 'react';
import axios from 'axios';
import './index.css';
import sound from '../dist/sound.png'

function App() {
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [error, setError] = useState(null);

  const fetchDefinition = async () => {
    try {
      const response = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      setDefinition(response.data);
      console.log(definition);
      setError(null);
    } catch (err) {
      setError('Word not found. Please try again.');
      setDefinition(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (word.trim() !== '') {
      fetchDefinition();
    }
  };

  const getSound = () => {
    let audio = new Audio(definition[0].phonetics[0].audio);
    audio.play();
    console.log(definition[0].phonetics[0].audio);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Dictionary App</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Enter a word"
          />
          <button type="submit">Search</button>
        </form>
        {error && <p className="error">{error}</p>}
        {definition && (
          <div className="definition">
            <div className='header'>
              <h2>{definition[0].word}</h2>

              {definition[0].phonetic && (
                <h5 className='margin-left-10'>{definition[0].phonetic}</h5>
              )}

              {definition[0].phonetics[0] && (
                <img className = 'sound-img-size margin-left-10' src={sound} onClick={getSound}/>
              )}
            </div>
            
              <p className = 'capitalize no-margin-top'><strong>{definition[0].meanings[0].partOfSpeech}</strong> </p>
              
              <p>{definition[0].meanings[0].definitions[0].definition}</p>
              
              {definition[0].meanings[0].definitions[1] && (
                <p>{definition[0].meanings[0].definitions[1].definition}</p>
              )}

              {definition[0].meanings[0].definitions[2] && (
                <p>{definition[0].meanings[0].definitions[2].definition}</p>
              )}
              
              {definition[0].meanings[0].definitions[0].example && (
                <p><strong>Example:</strong> {definition[0].meanings[0].definitions[0].example}</p>
              )}

              {definition[1] && (
                <div>
                  <br></br>

                  {definition[1].meanings[0].partOfSpeech && (
                    <p className = 'capitalize no-margin-top'><strong>{definition[1].meanings[0].partOfSpeech}</strong></p>
                  )}

                  {definition[1].meanings[0].definitions[0] && (
                    <p>{definition[1].meanings[0].definitions[0].definition}</p>
                  )}

                  {definition[1].meanings[0].definitions[1] && (
                    <p>{definition[1].meanings[0].definitions[1].definition}</p>
                  )}

                  {definition[1].meanings[0].definitions[2] && (
                    <p>{definition[1].meanings[0].definitions[2].definition}</p>
                  )}

                  {definition[1].meanings[0].definitions[0].example && (
                    <p><strong>Example:</strong> {definition[1].meanings[0].definitions[0].example}</p>
                  )}

                </div>
              )}

              {definition[2] && (
                <div>
                  <br></br>

                  {definition[2].meanings[0].partOfSpeech && (
                    <p className = 'capitalize no-margin-top'><strong>{definition[2].meanings[0].partOfSpeech}</strong></p>
                  )}

                  {definition[2].meanings[0].definitions[0] && (
                    <p>{definition[2].meanings[0].definitions[0].definition}</p>
                  )}

                  {definition[2].meanings[0].definitions[1] && (
                    <p>{definition[2].meanings[0].definitions[1].definition}</p>
                  )}

                  {definition[2].meanings[0].definitions[2] && (
                    <p>{definition[2].meanings[0].definitions[2].definition}</p>
                  )}

                  {definition[2].meanings[0].definitions[0].example && (
                    <p><strong>Example:</strong> {definition[2].meanings[0].definitions[0].example}</p>
                  )}

                </div>
              )}
            
          </div>
        )}
      </header>
    </div>
  );
}

export default App;