import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import SelectPlanet from '../SelectPlanet';

describe('The <SelectPlanet /> component', () => {
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
    selectedPlanet: null,
    onSelectPlanet: jest.fn(),
  };

  test('should render select input and label with linked id and for attributes', () => {
    const { getByLabelText } = render(<SelectPlanet {...testProps} />);

    expect(getByLabelText('Choose Destination:')).toBeInTheDocument();
  });

  test('should render correct number options', () => {
    const { getAllByRole } = render(<SelectPlanet {...testProps} />);

    expect(getAllByRole('option')).toHaveLength(testProps.planets.length + 1);
  });

  test('should call the onSelectPlanet callback when an option is selected', () => {
    const { getByLabelText } = render(<SelectPlanet {...testProps} />);

    userEvent.selectOptions(
      getByLabelText('Choose Destination:'),
      `${testProps.planets[0].name}`
    );

    userEvent.selectOptions(
      getByLabelText('Choose Destination:'),
      `${testProps.planets[5].name}`
    );

    expect(testProps.onSelectPlanet).toHaveBeenCalledTimes(2);
  });
});
