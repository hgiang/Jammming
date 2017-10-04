import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';


const playList = [
  {name: 'Testing 123', artist: 'Tatami', album: 'Test'},
  {name: 'Testing 456', artist: 'Tatami', album: 'Test'},
  {name: 'Testing 789', artist: 'Tatami', album: 'Test'},
]

class App extends Component {
  
  constructor(props){
    super(props);
    this.state = {
      searchResults : playList
    };
  }
  
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} />
            <Playlist />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
