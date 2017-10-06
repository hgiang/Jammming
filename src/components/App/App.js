import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

/*const playList = [
  {id: 1, name: 'Testing 123', artist: 'Tatami', album: 'Test'},
  {id: 2, name: 'Testing 456', artist: 'Tatami', album: 'Test'},
  {id: 3, name: 'Testing 789', artist: 'Tatami', album: 'Test'},
];*/

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      searchResults : [],
      playListName: 'New Playlist',
      playListTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  playListContains(trackId){
    const trackList = this.state.playListTracks;
    for(let i=0; i<trackList.length; i++){
      if( trackList[i].id === trackId ){
        return true;
      }
    }
    return false;
  }

  addTrack(track){
    if( !this.playListContains(track.id) ){
      const trackList = this.state.playListTracks.concat(track);
      this.setState( { playListTracks: trackList});
    }
  }

  removeTrack(track){
    const trackId = track.id;
    const trackList = this.state.playListTracks;
    for (let i =0; i < trackList.length; i++)
    if (trackList[i].id === trackId) {
        trackList.splice(i,1);
        break;
    }
    this.setState( { playListTracks: trackList});
  }

  updatePlaylistName(playListName){
    this.setState( { playListName: playListName } );
  }

  savePlaylist(){    
    const uriList = this.state.playListTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playListName, uriList);
    this.setState({
      playListName: 'New Playlist',
      playListTracks: []
    });
  }

  search(searchTerm){
    console.log(searchTerm);
    Spotify.search(searchTerm).then(tracks => {
        console.log(tracks);
        this.setState( {searchResults : tracks } );
    });
  }
  
  
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search}/>
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} 
                            onAdd={this.addTrack} 
            />
            <Playlist playlistName={this.state.playListName} 
                      playlistTracks={this.state.playListTracks} 
                      onRemove={this.removeTrack} 
                      onNameChange = {this.updatePlaylistName}
                      onSave = {this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
