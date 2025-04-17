import React, { useState, useEffect } from 'react';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://build-w-copilot-agent-8000.app.github.dev/api/activities/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setActivities(data);
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
      <div className="card-header bg-primary text-white">
        <h2 className="card-title mb-0">Fitness Activities</h2>
      </div>
      <div className="card-body">
        {activities.length === 0 ? (
          <div className="alert alert-info">No activities found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Activity Type</th>
                  <th scope="col">Duration</th>
                  <th scope="col">Date</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {activities.map(activity => (
                  <tr key={activity._id}>
                    <td>{activity.user?.username || 'Unknown'}</td>
                    <td>{activity.activity_type}</td>
                    <td>{activity.duration}</td>
                    <td>{new Date(activity.created_at).toLocaleDateString()}</td>
                    <td>
                      <button className="btn btn-sm btn-outline-primary me-1">
                        <i className="bi bi-eye"></i> View
                      </button>
                      <button className="btn btn-sm btn-outline-secondary">
                        <i className="bi bi-pencil"></i> Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer">
        <button className="btn btn-primary">
          <i className="bi bi-plus-circle me-1"></i>Add Activity
        </button>
      </div>
    </div>
  );
}

export default Activities;