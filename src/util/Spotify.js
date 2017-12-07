
const clientId = "5c5513141b284d129f3c7a824df18561";
//const secret = "3023d7f19937490fa574f48355407959";
let accessToken;
//let redirectUri = 'http://localhost:3000/callback';
let redirectUri = "localhost:3000";
let userId;

let Spotify = {

getAccessToken() {
    if (accessToken) {
      return accessToken;

    }
	   //check to see if the accessToken is allready set in the URL

	   let URLToCheck = window.location.href;
	   let checkForAccessToken = URLToCheck.match(/access_token=([^&]*)/);
	   let checkForExpire = URLToCheck.match(/expires_in=([^&]*)/);

	     if (this.checkforAccessToken && checkForExpire) {
      	accessToken = checkForAccessToken[1];
	      let expirationTime = Number(checkForExpire[1]);

		    window.setTimeout(() => accessToken = '', expirationTime * 1000);
	      window.history.pushState('Access Token', null, '/');
	   	  return accessToken;
     	  } else {

        let URL = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&&redirect_uri=${redirectUri}&scope=playlist-modify-public`;
        window.location.href = URL;
        }
},

  search(term) {
    return Spotify.getAccessToken().then(() => {
      return fetch(`https//:cors-anywhere.herokuapp.com/https://api.spotify.com/v1/search?type=track&q=${term}`,{
        headers:{Authorization: `Bearer ${accessToken}`}
      })
      }).then(response => {return response.json();}).then(jsonResponse =>
                {if(jsonResponse.track){
                  return jsonResponse.tracks.map(track=>({

                      id:track.id,
                      name:track.name,
                      artist:track.artists[0].name,
                      album: track.album.name,
                      uri: track.uri

                  }));
                } else {

                  return [];
                }


    });
  },

  //writes custom playlist in App to the Spotify App
  acceptTwoArguements(playlistName, trackURIs) {

    //check if there are values for playlistName and trackURIs
    if(!playlistName || !trackURIs){
      return;
    }
    //let accessToken;
    //let headers = {Authorization: this.Spotify.getAccessToken.headers.Authorization};
    //let userId;

    return Spotify.getAccessToken().then(() => {
      return userId = fetch(`https://api.spotify.com/v1/me`, {headers:{Authorization: `Bearer ${accessToken}`}}
    )}
  ).then(() => {
    return fetch(`https://api.spotify.com/v1/users/${this.userID}/playlists`,
      {headers:{Authorization: `Bearer ${accessToken}`}, method: 'POST', body:playlistName}
    )}

  ).then(response => {return response.json();}).then(jsonResponse =>
          {if(jsonResponse.id){
            return this.playlistId = jsonResponse.response.id;
            }


  }).then(() => {
    return fetch(`https://api.spotify.com/v1/users/${this.userId}/playlists/${this.playlistId}/tracks`,
      {method:"POST",headers:{Authorization: `Bearer ${accessToken}`},body: trackURIs})


  }).then(response => {return response.json();}).then(jsonResponse =>
          {if(jsonResponse.id){

            return this.playlistId = jsonResponse.response.id;
            }
  });
  }

};

export default Spotify;
