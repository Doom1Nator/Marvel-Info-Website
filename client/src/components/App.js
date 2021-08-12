import '../App.css';
import React from 'react';
import logo from '../img/marvel-logo.png';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Home from './Home';
import Character from './Character';
import CharacterList from './CharacterList';
import Comic from './Comic';
import ComicList from './ComicList';
import Series from './Serie';
import SeriesList from './SerieList';
import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  ApolloProvider
} from '@apollo/client';
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:4000'
  })
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className='App'>
          <header className='App-header'>
            <img src={logo} className='App-logo' alt='logo' />
            <h1 className='App-title'>Welcome to the MARVEL API Example</h1>
            <Link className='navlink' to='/'>
              Home
					</Link>
            <Link className='navlink' to='/characters/page/0'>
              Characters
					</Link>
            <Link className='navlink' to='/comics/page/0'>
              Comics
					</Link>
            <Link className='navlink' to='/series/page/0'>
              Series
					</Link>
          </header>
          <br />
          <br />
          <div className='App-body'>
            <Route exact path='/' component={Home} />
            <Route exact path='/characters/page/:pagenum' component={CharacterList} />
            <Route exact path='/characters/:id' component={Character} />
            <Route exact path='/comics/page/:pagenum' component={ComicList} />
            <Route exact path='/comics/:id' component={Comic} />
            <Route exact path='/series/page/:pagenum' component={SeriesList} />
            <Route exact path='/series/:id' component={Series} />
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
