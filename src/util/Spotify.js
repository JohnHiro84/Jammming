
const clientId = "5c5513141b284d129f3c7a824df18561";
const secret = "3023d7f19937490fa574f48355407959";
let accessToken;
let redirectUri = "spotifyplaylist.surge.sh";

let Spotify = {
  
getAccessToken() {
    if (accessToken) {
      return new Promise(resolve => resolve(accessToken));
    }
    return fetch(`https://cors-anywhere.herokuapp.com/https://accounts.spotify.com/authorize?client_id=${clientId}&redirect_uri=http:%2F%2Flocalhost:3000%2Fcallback&scope=user-read-private%20user-read-email&response_type=token&state=123`,
    {method: 'GET'}, ).then(
      window.location.href = "https://example.com/callback#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123";
      let at = /access_token=([^&]*)/;
      let ei = /expires_in=([^&]*)/;


      if((window.location.href).match(at) && (window.location.href).match(ei)) {
        accessToken = (window.location.href).match(at);
        expirationTime = (window.location.href).match(ei);
        `https://example.com/callback#access_token=${accessToken}&token_type=Bearer&expires_in=${expirationTime}&state=123`;
      }

        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
        window.location = `https://accounts.spotify.com/authorize?${clientId}=CLIENT_ID&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
     ).then(jsonResponse => {
      accessToken = jsonResponse.access_token;
    });
  },

  search(term) {
    return Spotify.getAccessToken().then(() => {
      return fetch(`https://api.spotify.com/v1/search?q=${term}&type=artist`,{
        headers:{Authorization: `Bearer ${accessToken}`
    }
  })
      }).then(response => {return response.json();}).then(jsonResponse =>
                {if(jsonResponse.track){
                  return jsonResponse.track.map(track=>({
                    id:track.id,
                    name:track.name,
                    artist:track.artists[0].title,
                    album: track.album.name,
                    Uri: track.uri
                  }));
                  }


    });
  }
  acceptTwoArguements(playlistName, ArrayOfTrackUri) {
    let accessToken;
    let headers = {this.search.Spotify.getAccessToken.headers.Authorization};
    let userID;

    return Spotify.getAccessToken().then(() => {
      return fetch(`https://api.spotify.com/v1/me`,{
        headers:{Authorization: `Bearer ${accessToken}`
    }, {headers:headers}
  })
  }).then(response => {return response.json();}).then(jsonResponse =>
          {if(jsonResponse.track){

            return let userID = jsonResponse.id;
            }


  }).then(() => {
    return fetch(`https://api.spotify.com/v1/users/${this.userID}/playlists`,{headers:headers, method: 'POST', body:})

  }).then(response => {return response.json();}).then(jsonResponse =>
          {if(jsonResponse.track){

            return let playlistID = jsonResponse.response.id;
            }


  }).then(() => {
    return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {method:"POST",headers:headers,body:})


  }).then(response => {return response.json();}).then(jsonResponse =>
          {if(jsonResponse.track){

            return let playlistID = jsonResponse.response.id;
            }


  });
  }

};

export default Spotify;
