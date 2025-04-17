// API Configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const API = {
  baseUrl: API_BASE_URL,
  endpoints: {
    users: '/api/users/',
    teams: '/api/teams/',
    activities: '/api/activities/',
    workouts: '/api/workouts/',
    leaderboard: '/api/leaderboard/'
  }
};

export default API;