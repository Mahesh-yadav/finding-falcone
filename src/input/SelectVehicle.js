import React from 'react';
import RadioInput from './RadioInput';

const SelectVehicle = ({
  legend,
  vehicles,
  selectedPlanet,
  selectedVehicle,
  onChangeVehicle,
}) => {
  const formatLabelText = (vehicle) => {
    return `${vehicle.name} (${
      selectedVehicle
        ? selectedVehicle.name === vehicle.name
          ? vehicle.total_no - 1
          : vehicle.total_no
        : vehicle.total_no
    })`;
  };

  return (
    <fieldset>
      <legend className="col-form-label-lg">{legend}</legend>
      {vehicles.map((vehicle) => (
        <RadioInput
          key={vehicle.name}
          id={vehicle.name}
          checked={
            selectedVehicle ? selectedVehicle.name === vehicle.name : false
          }
          onChange={() => onChangeVehicle(vehicle)}
          disabled={
            vehicle.total_no === 0 ||
            selectedPlanet.distance > vehicle.max_distance
          }
          labelText={formatLabelText(vehicle)}
        />
      ))}
    </fieldset>
  );
};

export default SelectVehicle;
