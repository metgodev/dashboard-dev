import React from 'react';
import Dashboard from './pages/dashboard/Dashboard'
import Maps from './pages/maps/Maps'
import Login from './pages/login/Login'

import { em } from './utils/document'
import term from './terms';
let t = term('hello_world')

console.log(t)

function App() {
  return (
    <div style={{ padding: em(1) }}>
      <Dashboard />
      {/* <Maps /> */}
      {/* <Login /> */}
    </div>
  );
}

export default App;
