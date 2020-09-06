import React from 'react';

const FindButton = ({ expeditionsCount, findFalcone, loading }) => {
  return (
    <div className="container mt-4" style={{ marginBottom: 100 }}>
      <div className="row justify-content-center mb-4">
        <button
          className={`btn ${
            expeditionsCount <= 3 ? 'btn-secondary' : 'btn-primary'
          } mr-3`}
          disabled={expeditionsCount <= 3}
          onClick={findFalcone}
        >
          Find Falcone!
        </button>
        {loading && (
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FindButton;
