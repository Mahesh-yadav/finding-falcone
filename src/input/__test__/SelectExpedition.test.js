import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SelectExpedition from '../SelectExpedition';

describe('The <SelectExpedition /> component', () => {
  const testProps = {
    planets: [
      {
        name: 'Donlon',
        distance: 100,
      },
      {
        name: 'Enchai',
        distance: 200,
      },
      {
        name: 'Jebing',
        distance: 300,
      },
      {
        name: 'Sapir',
        distance: 400,
      },
      {
        name: 'Lerbin',
        distance: 500,
      },
      {
        name: 'Pingasor',
        distance: 600,
      },
    ],
    vehicles: [
      {
        name: 'Space pod',
        total_no: 2,
        max_distance: 200,
        speed: 2,
      },
      {
        name: 'Space rocket',
        total_no: 1,
        max_distance: 300,
        speed: 4,
      },
      {
        name: 'Space shuttle',
        total_no: 1,
        max_distance: 400,
        speed: 5,
      },
      {
        name: 'Space ship',
        total_no: 2,
        max_distance: 600,
        speed: 10,
      },
    ],
    onSelectExpedition: jest.fn(),
    expeditionCount: 0,
  };

  test('should render only planet select input when no planet is selected', () => {
    const { getByLabelText, queryByText } = render(
      <SelectExpedition {...testProps} />
    );

    expect(getByLabelText('Choose Destination:')).toBeInTheDocument();
    expect(queryByText('Choose Vehicle:')).toBeNull();
  });

  test('should render vehicle radio inputs when a planet is selected', () => {
    const { getByLabelText, queryByText } = render(
      <SelectExpedition {...testProps} />
    );

    expect(queryByText('Choose Vehicle:')).toBeNull();
    userEvent.selectOptions(
      getByLabelText('Choose Destination:'),
      `${testProps.planets[0].name}`
    );

    expect(queryByText('Choose Vehicle:')).toBeInTheDocument();
  });

  test('should render save expedition button when a planet is selected', () => {
    const { getByLabelText, queryByText } = render(
      <SelectExpedition {...testProps} />
    );

    userEvent.selectOptions(
      getByLabelText('Choose Destination:'),
      `${testProps.planets[0].name}`
    );
    expect(queryByText(/Save Expedition/)).toBeInTheDocument();
  });

  test('should call onSelectExpedition() when save expedition button is clicked', () => {
    const { getByLabelText, getByText } = render(
      <SelectExpedition {...testProps} />
    );

    // Select planet
    userEvent.selectOptions(
      getByLabelText('Choose Destination:'),
      `${testProps.planets[0].name}`
    );

    // ṣelect vehicle
    userEvent.click(getByLabelText(/Space pod/i));

    userEvent.click(getByText('Save Expedition'));

    expect(testProps.onSelectExpedition).toHaveBeenCalledWith(
      testProps.planets[0],
      testProps.vehicles[0]
    );
  });
});
