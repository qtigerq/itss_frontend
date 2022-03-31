import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react';

import './App.css';

import Navbar from "./components/layout/Navbar"
import Container from "./components/layout/Container"

import Home from './pages/Home';
import UserData from './users/UserData';

function App() {

  const [user, setUser] = useState({})
  const id=1;

  useEffect(() => {
    fetch(`http://localhost:8080/user/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then((resp) => resp.json())
    .then((data) => {
        setUser(data)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [id]) 
  
  return (
    <div className="App">
      <Router>
        <Navbar userId={user.id} userName={user.name} />
        <Container>
          <Routes>
            <Route exact path="/" element={<Home userName={user.name} />}> </Route>
            <Route path="/userdata/:id" element={<UserData userData={user} />}> </Route>
          </Routes>
        </Container>
      </Router>
    </div>
  );
}

export default App;