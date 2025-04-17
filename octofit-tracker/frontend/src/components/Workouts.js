import React, { useState, useEffect } from 'react';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://build-w-copilot-agent-8000.app.github.dev/api/workouts/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setWorkouts(data);
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
        <h2 className="mb-0">Recommended Workouts</h2>
        <div>
          <button className="btn btn-outline-primary me-2">
            <i className="bi bi-filter me-1"></i>Filter
          </button>
          <button className="btn btn-primary">
            <i className="bi bi-plus-circle me-1"></i>Add Workout
          </button>
        </div>
      </div>
      
      {workouts.length === 0 ? (
        <div className="alert alert-info">No workouts found.</div>
      ) : (
        <div className="row">
          {workouts.map(workout => (
            <div className="col-md-6 col-lg-4 mb-4" key={workout._id}>
              <div className="card h-100">
                <div className="card-header bg-success text-white">
                  <h5 className="card-title mb-0">{workout.name}</h5>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-primary me-2">Difficulty: Medium</span>
                    <span className="badge bg-info">Duration: 30 min</span>
                  </div>
                  <p className="card-text">{workout.description}</p>
                  <h6 className="card-subtitle mb-2 text-muted">Exercises:</h6>
                  <ul className="list-group list-group-flush mb-3">
                    <li className="list-group-item px-0">
                      <div className="d-flex justify-content-between">
                        <span>Warm-up</span>
                        <span>5 minutes</span>
                      </div>
                    </li>
                    <li className="list-group-item px-0">
                      <div className="d-flex justify-content-between">
                        <span>Main activity</span>
                        <span>20 minutes</span>
                      </div>
                    </li>
                    <li className="list-group-item px-0">
                      <div className="d-flex justify-content-between">
                        <span>Cool down</span>
                        <span>5 minutes</span>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="card-footer d-grid">
                  <button className="btn btn-outline-success">
                    <i className="bi bi-play-circle me-1"></i>Start Workout
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

export default Workouts;