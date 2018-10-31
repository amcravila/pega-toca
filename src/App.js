import React, { Component } from 'react';
import './App.css';
import ArtistCard from './ArtistCard.js';
import { Route, Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      artists: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const BASE_URL = 'https://peaceful-badlands-98440.herokuapp.com';
    const options = {
      method: "post",
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ email: "rafael@laboratoria.la", password: "banana" })
    };

    fetch(`${BASE_URL}/login`, options)
      .then(res => {
        const options = {
          method: 'get',
          credentials: 'include'
        };
        fetch(`${BASE_URL}/artists`, options)
          .then(res => res.json())
          .then(data => this.setState({ artists: data }));
        });
  }

  handleClick() {

  }

  render() {
    return (
      <div className="container-fluid">
        <nav className="menu navbar-light bg-success">
          <img src="./PegaToca.png" alt=""/>
          <Link to="/">Home</Link>
          <Link to="/artists">Artistas</Link>
          <Link to="/about">Sobre</Link>
          <Link to="/contato">Contato</Link>
        </nav>

        <Route path="/" exact component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/about/:id" render={({ match }) => "Somos demais!" + match.params.id}/>

        <Route path="/contato" component={Contact}/>

        <Route path="/artists" render={ () =>
          <div>
            {this.state.artists.map( (artist) =>
              <ArtistCard {...artist} key={artist.id} />
            )}
          </div>
        } />

      </div>
    );
  }
}

const Home  = () => {
  return (
    <div className="home-menu">
      <h1>Bem-Vindo ao projeto PegaToca.</h1>
      <h2>Site para busca de músicas.</h2>
      <h3>Pegou, Tocou!</h3>
    </div>
  )
}

const About  = () => {
  return (
    <div className="about-menu">
      <p>Somos um projeto que integra com a API PegaToca, onde é possível buscar as músicas de seu artista favorito.</p>
    </div>
  )
}

const Contact  = () => {
  return (
    <div className="contact-menu">
      <h1>Laboratória SP</h1>
      <h2>Alameda Santos, 2356</h2>
      <h2>laboratoria@laboratoria.la</h2>
    </div>
  )
}

export default App;
