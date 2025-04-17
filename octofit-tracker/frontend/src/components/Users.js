import React, { useState, useEffect } from 'react';
import API from '../config/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API.baseUrl}${API.endpoints.users}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUsers(data);
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
      <div className="card-header bg-info text-white d-flex justify-content-between align-items-center">
        <h2 className="card-title mb-0">Users</h2>
        <button className="btn btn-light btn-sm">
          <i className="bi bi-plus-circle me-1"></i>Add User
        </button>
      </div>
      <div className="card-body">
        {users.length === 0 ? (
          <div className="alert alert-info">No users found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Team</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="avatar me-2 bg-primary rounded-circle text-white d-flex align-items-center justify-content-center" style={{width: "32px", height: "32px"}}>
                          {user.username?.charAt(0).toUpperCase() || '?'}
                        </div>
                        <span>{user.username}</span>
                      </div>
                    </td>
                    <td>{user.email}</td>
                    <td>
                      <span className="badge bg-primary">Team assignment here</span>
                    </td>
                    <td>
                      <div className="btn-group">
                        <button className="btn btn-sm btn-outline-secondary">
                          <i className="bi bi-person-lines-fill"></i>
                        </button>
                        <button className="btn btn-sm btn-outline-primary">
                          <i className="bi bi-pencil"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer">
        <nav aria-label="User pagination">
          <ul className="pagination justify-content-center mb-0">
            <li className="page-item disabled">
              <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
            </li>
            <li className="page-item active"><a className="page-link" href="#">1</a></li>
            <li className="page-item"><a className="page-link" href="#">2</a></li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Users;