import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FindButton from '../FindButton';

describe('The <FindButton /> component', () => {
  const testProps = {
    expeditionsCount: 3,
    findFalcone: jest.fn(),
    loading: false,
  };

  test('renders Find falcone button in disabled state when expeditionsCount is < 4', () => {
    const { getByRole } = render(<FindButton {...testProps} />);

    expect(getByRole('button')).toBeDisabled();
  });

  test('renders Find falcone button in enabled state when expeditionsCount is 4', () => {
    const { getByRole } = render(
      <FindButton {...{ ...testProps, expeditionsCount: 4 }} />
    );

    expect(getByRole('button')).toBeEnabled();
  });

  test('should call findFalcone callback when expedition count is 4 and Find falcone button is clicked', () => {
    const { getByRole } = render(
      <FindButton {...{ ...testProps, expeditionsCount: 4 }} />
    );

    userEvent.click(getByRole('button'));
    expect(testProps.findFalcone).toHaveBeenCalled();
  });
});
