import React from 'react';
import PropTypes from 'prop-types';
import './TrackList.css';
import Track from '../Track/Track';


class TrackList extends React.Component {
    render(){
        console.log(this.props.tracks);
        const trackList = this.props.tracks.map( track => <Track key={track.id} track={track} /> );        
        return (
            <div className="TrackList">      
                {
                    trackList
                }
            </div>
        );
    }
}

TrackList.propTypes = {
    tracks: PropTypes.array
}

export default TrackList;