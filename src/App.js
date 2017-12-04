import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import SearchResults from './Components/SearchResults/SearchResults';
import Playlist from './Components/Playlist/Playlist';
import SearchBar from './Components/SearchBar/SearchBar';
import Spotify from './util/Spotify';


class App extends Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this),
    this.removeTrack = this.removeTrack.bind(this),
    this.updatePlaylistName = this.updatePlaylistName.bind(this),
    this.savePlaylist = this.savePlaylist.bind(this),
    this.search = this.search.bind(this),
    this.state ={ searchResults:[{name},{artist},{album}],
                  playlistName:"New Playlist",
                  playlistTracks:[{name},{artist},{album}]
                };
  }

  addTrack(track) {
     if(track.id ==! this.state.playlistTracks) {
       this.props.playlist.track;
     } else {
      delete this.props.playlistTracks.track;
    }
  }

  removeTrack(track){
    if(track.id ==! this.state.playlistTracks) {
     delete this.props.playlistTracks.track;
   }
  }

  updatePlaylistName(name){
    this.setState({playlistName: name});
  }

  searchSpotify(term) {
  Spotify.search(term).then(track =>
    {this.setState({searchResults:track})}
    );
  };

savePlaylist(){
  let trackURIs = playlistTracks.map(track =>
  track.uri);
}

search(term) {
  console.log(term);
}

  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar onSearch={this.search} searchSpotify={this.searchSpotify} />
            <div className="App-playlist">
            <SearchResults onAdd={this.addTrack} searchResults={this.state.searchResults}/>
            <Playlist onSave ={this.savePlaylist} onNameChange={this.updatePlaylistName} playlistTracks={this.state.playlistTracks} onRemove=(this.removeTrack} playlistName={this.state.playListName}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
