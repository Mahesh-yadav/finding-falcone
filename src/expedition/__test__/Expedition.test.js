import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Expedition from '../Expedition';

describe('The <Expedition /> component', () => {
  const testProps = {
    expedition: {
      planet: 'Donlon',
      vehicle: 'Space pod',
      distance: 100,
      speed: 2,
    },
    onDeleteExpedition: jest.fn(),
  };

  test('should render planet image', () => {
    const { getByAltText } = render(<Expedition {...testProps} />);

    expect(getByAltText(testProps.expedition.planet)).toBeInTheDocument();
  });

  test('should render vehicle image', () => {
    const { getByAltText } = render(<Expedition {...testProps} />);

    expect(getByAltText(testProps.expedition.vehicle)).toBeInTheDocument();
  });

  test('should render delete button', () => {
    const { getByText } = render(<Expedition {...testProps} />);

    expect(getByText('Delete')).toBeInTheDocument();
  });

  test('should call onDeleteExpedition when delete button is clicked', () => {
    const { getByText } = render(<Expedition {...testProps} />);

    userEvent.click(getByText('Delete'));

    expect(testProps.onDeleteExpedition).toHaveBeenCalledWith(
      testProps.expedition.planet
    );
  });
});
