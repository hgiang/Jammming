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
        const expiredIn = currentURL.match(/expires_in=([^&]*)/);
        if(token && expiredIn){
            accessToken = token[1];            
            window.setTimeout( () => accessToken = '', Number(expiredIn[1]) * 1000);
            window.history.pushState('Access Token', null, '/');
            return;
        }
        window.location = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${REDIRECT_URI}`;        
    },

    search: function(term) {
        this.getAccessToken();
        
        const searchURL = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        return fetch(searchURL, {
            headers: {Authorization: `Bearer ${accessToken}`}            
        })
        .then(response => response.json())
        .then(jsonResponse => {      
            console.log(jsonResponse);
            if(jsonResponse.tracks.items){
                return  jsonResponse.tracks.items.map(track => ({                   
                            id: track.id,                        
                            name: track.name,
                            artist: track.artists[0].name,                        
                            album: track.album.name,
                            uri: track.uri,                        
                    })
                );
            }
        });        
    },

    savePlaylist(playListName, uriList){

        if(playListName && uriList){
            console.log(playListName);
            console.log(uriList);            
            
            const headers = {
                                Authorization: `Bearer ${accessToken}`,
                                'Content-type': 'application/json'
                            };

            let userID;
            let playlistID;

            const profileRequestURL = `https://api.spotify.com/v1/me`;
            return fetch(profileRequestURL, {
                headers: headers
            })
            .then(response => response.json())
            .then(jsonResponse => userID = jsonResponse.id )
            .then( () => {
                return fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                        headers: headers,                        
                        method: 'POST',
                        body: JSON.stringify({ name: playListName, public: false })
                    });
                }
            )
            .then(response => {console.log(response); return response.json() } )
            .then(jsonResponse =>  playlistID = jsonResponse.id )
            .then( () => {
                    return fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`,{
                        headers: headers,                        
                        method: 'POST',
                        body: JSON.stringify({ uris: uriList, public: false})                        
                    });
                }
            );
        }
    }
};




export default Spotify;