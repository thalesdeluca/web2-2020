import React, { useContext } from 'react'
import { Redirect, Route } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';

export const ProtectedRoute = ({ children, ...props }) => {
  const { auth: { authenticated } } = useContext(AuthContext);

  return authenticated ? (
    <Route key={props.path}  {...props} />
  ) : (
    <Redirect to="/auth" />
  )
}
