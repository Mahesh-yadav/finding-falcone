import React from 'react';

const Loading = () => {
  return (
    <div className="container my-4">
      <div className="row justify-content-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
