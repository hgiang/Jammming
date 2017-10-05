import React from 'react';
import './Track.css';


class Track extends React.Component {

    constructor(props){
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    addTrack(){
        this.props.onAdd(this.props.track);
    }

    removeTrack(){
        this.props.onRemove(this.props.track);
    }

    render(){        
        const track = this.props.track;
        let trackAction;
        if(this.props.isRemoval){
            trackAction = <a className="Track-action" onClick={this.removeTrack}> - </a>               
        }else{
            trackAction = <a className="Track-action" onClick={this.addTrack}> + </a>;
        }
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3> {track.name} </h3>
                    <p> {track.artist} | {track.album} </p>
                </div>
                {
                  trackAction
                }
            </div>

        );
    }
}

export default Track;