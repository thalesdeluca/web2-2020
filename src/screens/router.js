import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom';
import { ProtectedRoute } from '../components';
import Header from '../components/Header';
import { UnprotectedRoute } from '../components/UnprotectedRoute';
import SongProvider from '../contexts/SongsContext';
import { AuthScreen } from './Auth';
import { HomeScreen } from './Home';
import { NewSong } from './NewSong';

const Router = () => (
  <BrowserRouter>
      <Header/>
      <Switch>
        <UnprotectedRoute exact path="/auth" component={AuthScreen}/>

        <SongProvider>
          <ProtectedRoute exact path="/" component={HomeScreen} />
          <ProtectedRoute exact path="/new" component={NewSong} />
        </SongProvider>
      
      </Switch>
    </BrowserRouter>
)

export default Router;
