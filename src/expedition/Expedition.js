import React from 'react';
import images from '../assets/images/images';

const Expedition = ({ expedition, onDeleteExpedition }) => {
  return (
    <li
      className="col-10 col-sm-8 col-md-5 col-xl-4 list-group-item mb-3 mx-md-2 border"
      data-testid="Expedition"
    >
      <div className="row border-bottom">
        <div className="col-4">
          <img
            className="card-img-top"
            src={images[expedition.planet]}
            alt={expedition.planet}
          />
          <h5 className="text-center mt-2">{expedition.planet}</h5>
        </div>
        <div className="col-5 text-center align-self-center">
          <h6>Distance</h6>
          <p
            className="badge badge-pill badge-info py-1 px-3"
            style={{ fontSize: 16 }}
          >
            {expedition.distance}
          </p>
        </div>
        <div className="col-3">
          <img
            className="card-img-top"
            src={images[expedition.vehicle.toLowerCase().split(' ').join('-')]}
            alt={expedition.vehicle}
          />
          <h6 className="text-center mt-2">{expedition.vehicle}</h6>
        </div>
      </div>
      <div className="row pt-2 justify-content-between align-items-center">
        <p className="col-8 mb-0 h6">
          Time Needed: {expedition.distance / expedition.speed}
        </p>
        <button
          className="col-3 btn btn-danger btn-sm"
          onClick={() => onDeleteExpedition(expedition.planet)}
        >
          Delete
        </button>
      </div>
    </li>
  );
};

export default Expedition;
