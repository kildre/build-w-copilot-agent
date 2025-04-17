import React, { useState, useEffect } from 'react';
import API from '../config/api';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API.baseUrl}${API.endpoints.leaderboard}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setLeaderboard(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="d-flex justify-content-center"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="card mb-4">
      <div className="card-header bg-success text-white">
        <h2 className="card-title mb-0">Leaderboard</h2>
      </div>
      <div className="card-body">
        {leaderboard.length === 0 ? (
          <div className="alert alert-info">No leaderboard data found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col" width="10%">#</th>
                  <th scope="col">User</th>
                  <th scope="col" width="20%">Score</th>
                  <th scope="col" width="20%">Badge</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard
                  .sort((a, b) => b.score - a.score)
                  .map((entry, index) => (
                    <tr key={entry._id} className={index < 3 ? 'table-primary' : ''}>
                      <td className="fw-bold">{index + 1}</td>
                      <td>{entry.user?.username || 'Unknown'}</td>
                      <td className="fw-bold">{entry.score}</td>
                      <td>
                        {index === 0 && <span className="badge bg-warning text-dark">Gold</span>}
                        {index === 1 && <span className="badge bg-secondary">Silver</span>}
                        {index === 2 && <span className="badge bg-danger">Bronze</span>}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer">
        <p className="text-muted mb-0">Scores are updated daily. Keep exercising to improve your rank!</p>
      </div>
    </div>
  );
}

export default Leaderboard;