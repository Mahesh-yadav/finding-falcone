import React, { useState } from 'react';
import SelectPlanet from './SelectPlanet';
import SelectVehicle from './SelectVehicle';

const expeditionStr = ['1st', '2nd', '3rd', '4th'];

const SelectExpedition = ({
  planets,
  vehicles,
  onSelectExpedition,
  expeditionCount,
}) => {
  const [planet, setPlanet] = useState();
  const [vehicle, setVehicle] = useState();

  const planetNames = planets.map((p) => p.name);

  let showVehicles = planet ? planetNames.includes(planet.name) : false;

  const saveExpedition = () => {
    onSelectExpedition(planet, vehicle);
    setVehicle(null);
    setPlanet(null);
  };

  const onSelectPlanet = (e) => {
    const p = planets.find((p) => p.name === e.target.value);
    setPlanet(p);
  };

  return (
    <div className="container my-4">
      {expeditionCount === 4 && (
        <div className="row justify-content-center">
          <p className="col-10 lead text-danger font-weight-bold text-center">
            Maximum number of expeditions selected ({expeditionCount})
          </p>
        </div>
      )}
      {expeditionCount < 4 && (
        <div className="row my-4 justify-content-center">
          <h4 className="col-12 text-center text-info">
            Select {expeditionStr[expeditionCount]} expedition:
          </h4>
          <div className="form-group col-8 col-sm-6 col-md-4 col-xl-4 mb-3">
            <SelectPlanet
              planets={planets}
              selectedPlanet={planet}
              onSelectPlanet={onSelectPlanet}
            />
          </div>
          {showVehicles && (
            <>
              <div className="col-8 col-sm-4 col-md-3 col-xl-3 offset-sm-2 mb-3">
                <SelectVehicle
                  legend="Choose Vehicle:"
                  vehicles={vehicles}
                  selectedPlanet={planet}
                  selectedVehicle={vehicle}
                  onChangeVehicle={setVehicle}
                />
              </div>
              <div className="col-12 col-xl-3 mb-2 text-center">
                <p className="col-form-label-lg">
                  Time Needed: {vehicle ? planet.distance / vehicle.speed : 0}
                </p>
                <button
                  className={`text-white px-3 ${
                    !planet || !vehicle
                      ? 'btn btn-secondary'
                      : 'btn btn-primary'
                  }`}
                  onClick={saveExpedition}
                  disabled={!planet || !vehicle}
                >
                  Save Expedition
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectExpedition;
