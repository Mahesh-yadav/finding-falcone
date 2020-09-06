import React from 'react';
import Expedition from './Expedition';

const ExpeditionList = ({ expeditions, onDeleteExpedition }) => {
  const getTotalTime = () =>
    expeditions.reduce(
      (total, expedition) => total + expedition.distance / expedition.speed,
      0
    );

  return (
    <div className="container mb-4 pb-4">
      {expeditions.length === 0 ? (
        <h4 className="text-center text-info">No Expedition Selected</h4>
      ) : (
        <h4 className="text-center text-info mb-4">
          Selected Expeditions ({expeditions.length})
        </h4>
      )}
      <>
        <ul className="row list-group list-group-horizontal justify-content-center">
          {expeditions.map((expedition) => (
            <Expedition
              key={expedition.planet}
              expedition={expedition}
              onDeleteExpedition={onDeleteExpedition}
            />
          ))}
        </ul>
        {expeditions.length > 0 && (
          <div className="row justify-content-center">
            <p className="col-12 text-center h5 mb-3">
              Total Time Needed: {getTotalTime()}
            </p>
            <button
              className="btn btn-danger btn-sm col-4"
              onClick={() => onDeleteExpedition('all')}
            >
              Delete All
            </button>
          </div>
        )}
      </>
    </div>
  );
};

export default ExpeditionList;
