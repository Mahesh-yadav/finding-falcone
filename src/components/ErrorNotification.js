import React, { useState, useEffect } from 'react';

const Error = ({ message }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShow(false);
    }, 5000);
  }, []);

  return (
    <div
      className={`error border rounded-top ${show ? 'show-error' : ''}`}
      data-testid="error-container"
    >
      <h5 className="text-danger p-2 mb-0 rounded-top">Network Error</h5>
      <p className="px-2 pt-2 bg-light mb-0">{message}</p>
      <p className="px-2 pt-2 pb-2 bg-light mb-0">Try reloading page.</p>
    </div>
  );
};

export default Error;
