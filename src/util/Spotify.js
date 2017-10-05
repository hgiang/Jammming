const CLIENT_ID = '269a27da3f1e4dce8aa9d4c0256b1575';
const REDIRECT_URI = 'http://localhost:3000/';
let accessToken;

const Spotify = {
    getAccessToken(){
        if(accessToken){
            return;
        }
        const currentURL = window.location.href;
        const token = currentURL.match(/access_token=([^&]*)/);
        const expiresIn = currentURL.match(/expires_in=([^&]*)/);
        if(token && expiresIn){
            accessToken = token;
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return;
        }
        window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;
    },

    search: function(term) {
        this.getAccessToken();  
        console.log(accessToken);
        const searchURL = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        return fetch(searchURL, {
            headers: {Authorization: `Bearer ${accessToken}`}
            
        })
        .then(response => response.json())
        .then(jsonResponse => {      
            console.log(jsonResponse);
            if(jsonResponse.tracks){
                return jsonResponse.tracks.map(track => ({                   
                        id: track.id,                        
                        name: track.name,
                        artist: track.artists[0].name,                        
                        album: track.album.name,
                        uri: track.uri,                        
                    })
                );
            }
        });        
    }
};




export default Spotify;