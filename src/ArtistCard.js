import React from 'react';
import Card from './Card.js';
import './ArtistCard.css';
import PropTypes from "prop-types";

function ArtistTrack(props) {
  return (
    <li className={props.class}>
      {props.title}<br />
      <iframe src={props.url} title="Track"></iframe>
    </li>
  )
}

ArtistTrack.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  class: PropTypes.string
}

class ArtistCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {tracks: []}
    this.getArtistTracks = this.getArtistTracks.bind(this);
  }

  getArtistTracks(event) {
    const BASE_URL = 'https://peaceful-badlands-98440.herokuapp.com';
    const options = {
      method: "get",
      credentials: 'include'
    };

    fetch(`${BASE_URL}/artists/${this.props.id}/tracks`, options)
      .then(res => res.json())
      .then(data => {
        if (data.length === 0) {
          this.setState({ tracks: [{title: 'Músicas não encontradas'}]});
        } else {
          this.setState({ tracks: data});
        }
      });
    }

  render() {
    return (
      <Card>
        <div className="container-fluid">
          <h2>{ this.props.name }</h2>
          <h3>{ this.props.genre }</h3>
          <button onClick={this.getArtistTracks}>
            Musicas
          </button>
          <ul>
            {this.state.tracks.map( (track, index) =>
              <ArtistTrack key={index} {...track}/>)}
          </ul>
        </div>
      </Card>
    );
  }
}

ArtistCard.propTypes = {
  name: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired
}

export default ArtistCard;
