import React, { useState, useEffect } from 'react';
import API from '../config/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API.baseUrl}${API.endpoints.teams}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setTeams(data);
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
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Teams</h2>
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-1"></i>Create Team
        </button>
      </div>
      
      {teams.length === 0 ? (
        <div className="alert alert-info">No teams found.</div>
      ) : (
        <div className="row">
          {teams.map(team => (
            <div className="col-md-6 col-lg-4 mb-4" key={team._id}>
              <div className="card h-100">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  <h5 className="card-title mb-0">{team.name}</h5>
                  <span className="badge bg-light text-dark">{team.members?.length || 0} Members</span>
                </div>
                <div className="card-body">
                  <h6 className="card-subtitle mb-3 text-muted">Team Members:</h6>
                  {team.members && team.members.length > 0 ? (
                    <ul className="list-group">
                      {team.members.map(member => (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={member._id}>
                          {member.username}
                          <span className="badge bg-primary rounded-pill">Active</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No members in this team</p>
                  )}
                </div>
                <div className="card-footer d-flex gap-2">
                  <button className="btn btn-sm btn-outline-primary flex-grow-1">
                    <i className="bi bi-people me-1"></i>Join
                  </button>
                  <button className="btn btn-sm btn-outline-secondary flex-grow-1">
                    <i className="bi bi-info-circle me-1"></i>Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;