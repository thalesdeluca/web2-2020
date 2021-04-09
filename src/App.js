import { BrowserRouter, Switch } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext";
import Router from "./screens/router";
import "./App.css"

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
