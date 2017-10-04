import React from 'react';
import './Track.css';


class Track extends React.Component {
    render(){        
        const track = this.props.track;
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3> {track.name} </h3>
                    <p> {track.artist} | {track.album} </p>
                </div>
                <a className="Track-action"> + </a>
            </div>

        );
    }
}

export default Track;