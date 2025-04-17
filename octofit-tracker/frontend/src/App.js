import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
// Import actual component files
import Activities from './components/Activities';
import Teams from './components/Teams';
import Users from './components/Users';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
// We don't need to import the logo image directly when it's in the public folder

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="container">
            <Link className="navbar-brand" to="/">
              <div className="logo-container">
                <img src={`${process.env.PUBLIC_URL}/octofitapp-small.png`} className="App-logo" alt="OctoFit logo" />
                OctoFit Tracker
              </div>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">Activities</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">Teams</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">Leaderboard</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">Workouts</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/users" element={<Users />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="jumbotron">
      <h1 className="display-4">Welcome to OctoFit Tracker</h1>
      <p className="lead">Mergington High School's fitness tracking application</p>
      <hr className="my-4" />
      <p>Track activities, join teams, and compete on the leaderboard!</p>
      <div className="mt-4">
        <Link to="/activities" className="btn btn-primary me-2">Start Tracking</Link>
        <Link to="/leaderboard" className="btn btn-success">View Leaderboard</Link>
      </div>
    </div>
  );
}

export default App;
