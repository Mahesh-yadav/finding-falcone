import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import SelectExpedition from '../input/SelectExpedition';
import ExpeditionList from '../expedition/ExpeditionList';
import Loading from '../components/Loading';
import FindButton from './FindButton';
import ErrorNotification from '../components/ErrorNotification';
import useGetData from '../hooks/useGetData';
import { fetchToken, fetchResult } from './api';

const PLANETS_API_URL = 'https://findfalcone.herokuapp.com/planets';
const VEHICLES_API_URL = 'https://findfalcone.herokuapp.com/vehicles';

const Home = ({
  expeditions,
  onDeleteExpedition,
  onSelectExpedition,
  setResult,
  setExpeditions,
}) => {
  const [planets, planetsLoading, planetsError] = useGetData(PLANETS_API_URL);
  const [vehicles, vehiclesLoading, vehiclesError] = useGetData(
    VEHICLES_API_URL
  );
  const [resultLoading, setResultLoading] = useState(false);

  const history = useHistory();

  const getRemainingPlanets = () => {
    const selectedPlanets = expeditions.map((expedition) => expedition.planet);

    return planets.filter((planet) => !selectedPlanets.includes(planet.name));
  };

  const getRemainingVehicles = () => {
    const selectedVehicles = {};

    for (const expedition of expeditions) {
      selectedVehicles[expedition.vehicle] = selectedVehicles[
        expedition.vehicle
      ]
        ? selectedVehicles[expedition.vehicle] + 1
        : 1;
    }

    return vehicles.map((vehicle) => {
      return {
        ...vehicle,
        total_no:
          vehicle.total_no -
          (selectedVehicles[vehicle.name] ? selectedVehicles[vehicle.name] : 0),
      };
    });
  };

  const findFalcone = async () => {
    try {
      setResultLoading(true);

      const token = await fetchToken();

      const result = await fetchResult(token, expeditions);

      if (result.status === 'success') {
        result.time = expeditions.reduce(
          (total, expedition) => total + expedition.distance / expedition.speed,
          0
        );
      }

      setResult(result);
      setExpeditions([]);
    } catch (error) {
      setResult(null);
    } finally {
      setResultLoading(false);
      history.push('/result');
    }
  };

  const renderedOutput = () => {
    if (planetsLoading || vehiclesLoading) {
      return <Loading />;
    }

    if (planetsError || vehiclesError) {
      return <ErrorNotification message="Error fetching data" />;
    }

    return (
      <>
        <SelectExpedition
          planets={getRemainingPlanets()}
          vehicles={getRemainingVehicles()}
          onSelectExpedition={onSelectExpedition}
          expeditionCount={expeditions.length}
        />

        <ExpeditionList
          expeditions={expeditions}
          onDeleteExpedition={onDeleteExpedition}
        />
      </>
    );
  };

  return (
    <>
      {renderedOutput()}
      <FindButton
        expeditionsCount={expeditions.length}
        findFalcone={findFalcone}
        loading={resultLoading}
      />
    </>
  );
};

export default Home;
