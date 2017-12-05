import React from 'react';
import './Playlist.css';
import Tracklist from '../Tracklist/Tracklist';




class Playlist extends React.Component {
  constructor(props){
    super(props)
//    this.onNameChange= this.onNameChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

handleNameChange(event){
  this.setState({location: event.target.value});
}
render(){
  return (
    <div className="Playlist">
      <input onChange={this.handleNameChange} value="New Playlist"/>
      <Tracklist tracks={this.props.playlistTracks} onRemove={this.props.onRemove}/>
      <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
    </div>
    )

}


}

export default Playlist;
