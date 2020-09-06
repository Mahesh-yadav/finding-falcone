import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ExpeditionList from '../ExpeditionList';

describe('The <Expedition /> component', () => {
  const testProps = {
    expeditions: [
      {
        planet: 'Donlon',
        vehicle: 'Space pod',
        distance: 100,
        speed: 2,
      },
      { planet: 'Lerbin', vehicle: 'Space ship', distance: 500, speed: 10 },
    ],
    onDeleteExpedition: jest.fn(),
  };

  test('should render heading with expedition count', () => {
    const { getByText } = render(<ExpeditionList {...testProps} />);

    expect(
      getByText(`Selected Expeditions (${testProps.expeditions.length})`)
    ).toBeInTheDocument();
  });

  test('should render correct heading when expedition count is 0', () => {
    const { getByText } = render(
      <ExpeditionList expeditions={[]} onDeleteExpedition={() => jest.fn()} />
    );

    expect(getByText(/No Expedition/)).toBeInTheDocument();
  });

  test('should render correct number of expeditions', () => {
    const { getAllByTestId } = render(<ExpeditionList {...testProps} />);

    expect(getAllByTestId('Expedition')).toHaveLength(
      testProps.expeditions.length
    );
  });

  test('should render delete all button', () => {
    const { getByText } = render(<ExpeditionList {...testProps} />);

    expect(getByText('Delete All')).toBeInTheDocument();
  });

  test('should call onDeleteExpedition with correct argument when delete all button is clicked', () => {
    const { getByText } = render(<ExpeditionList {...testProps} />);

    userEvent.click(getByText('Delete All'));
    expect(testProps.onDeleteExpedition).toHaveBeenCalledWith('all');
  });
});
