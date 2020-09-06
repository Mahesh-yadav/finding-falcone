import React from 'react';

const SelectPlanet = ({ planets, selectedPlanet, onSelectPlanet }) => {
  return (
    <>
      <label htmlFor="planet" className="col-form-label-lg">
        Choose Destination:
      </label>
      <select
        id="planet"
        value={selectedPlanet ? selectedPlanet.name : ''}
        onChange={onSelectPlanet}
        className="form-control form-control-sm"
      >
        <option>Choose ...</option>
        {planets.map((p) => (
          <option key={p.name} value={p.name}>
            {p.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectPlanet;
