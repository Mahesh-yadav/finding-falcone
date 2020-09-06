import React from 'react';
import { render } from '@testing-library/react';

import SelectVehicle from '../SelectVehicle';

describe('The <SelectVehicle /> component', () => {
  const testProps = {
    legend: 'TEST_LEGEND',
    vehicles: [
      {
        name: 'Space pod',
        total_no: 2,
        max_distance: 200,
        speed: 2,
      },
      {
        name: 'Space rocket',
        total_no: 0,
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
    selectedPlanet: {
      name: 'Jebing',
      distance: 300,
    },
    selectedVehicle: null,
    onChangeVehicle: jest.fn(),
  };

  test('should render a legend element', () => {
    const { getByText } = render(<SelectVehicle {...testProps} />);
    expect(getByText(testProps.legend)).toBeInTheDocument();
  });

  test('should render correct number of radio inputs', () => {
    const { getAllByRole } = render(<SelectVehicle {...testProps} />);

    expect(getAllByRole('radio')).toHaveLength(testProps.vehicles.length);
  });

  test('should render a radio in disabled state if vehicle count is 0', () => {
    const { getByLabelText } = render(<SelectVehicle {...testProps} />);

    expect(getByLabelText(/rocket/)).toBeDisabled();
  });

  test("should render a radio in disabled state if planet's distance > vehicle's max_distance", () => {
    const { getByLabelText } = render(<SelectVehicle {...testProps} />);

    expect(getByLabelText(/pod/)).toBeDisabled();
  });

  test('should render a radio correctly if it is selected', () => {
    const selectedVehicle = {
      name: 'Space shuttle',
      total_no: 1,
      max_distance: 400,
      speed: 5,
    };
    const { getByLabelText } = render(
      <SelectVehicle {...{ ...testProps, selectedVehicle }} />
    );

    expect(
      getByLabelText(
        `${selectedVehicle.name} (${selectedVehicle.total_no - 1})`
      )
    ).toBeInTheDocument();
  });
});
