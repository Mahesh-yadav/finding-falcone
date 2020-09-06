import React from 'react';
import { useHistory } from 'react-router-dom';

const Result = ({ result, setResult }) => {
  const history = useHistory();

  const onRestart = () => {
    setResult(null);
    history.replace('/');
  };

  if (!result) {
    history.replace('/');
    return null;
  }

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-12 text-center">
          {result.status === 'success' && (
            <>
              <h3 className="mb-5 text-success">
                Success! Congratulations on Finding Falcone. King Shan is
                mightly pleased.
              </h3>
              <p className="h6">Time Taken: {result.time}</p>
              <p className="h6">Planet found: {result.planet_name}</p>
            </>
          )}
          {result.status === 'false' && (
            <>
              <h3 className="mb-5 text-danger">
                Failure! Unfortunately you are unable to find Falcone. King Shan
                is furious.
              </h3>
            </>
          )}
          <button
            className="btn btn-primary py-1 px-3 mt-5"
            onClick={onRestart}
          >
            Start Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
