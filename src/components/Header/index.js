import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext';
import ExitLogo from "../../assets/images/exit.svg"
import { Nav } from './styles';

const Header = () => {
  const { auth: { authenticated, user }, logout } = useContext(AuthContext);


  const LoggedButton = () => {
    return authenticated ? (
      <>
       <span>{user?.name}</span>
        <img onClick={logout} src={ExitLogo} width="42" className="btn d-inline-block align-bottom" alt="" />
      </>
    ): null
  }

  return (
    <Nav className="navbar navbar-light fixed-top">
      <div className="container">
        <a href="/">
          SongList 
        </a>
        <LoggedButton />
      </div>

    </Nav>
  )
}

export default Header
