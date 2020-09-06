import React from 'react';
import { render } from '@testing-library/react';

import ErrorNotification from '../ErrorNotification';
import { act } from 'react-dom/test-utils';

describe('The <ErrorNotification /> component', () => {
  test('should render error message', () => {
    const message = 'Error Message';
    const { getByText } = render(<ErrorNotification message={message} />);

    expect(getByText(message)).toBeInTheDocument();
  });

  test('should render with show-error class on container element', () => {
    const message = 'Error Message';
    const { getByTestId } = render(<ErrorNotification message={message} />);

    expect(getByTestId('error-container')).toHaveClass('show-error');
  });

  test('show-error class is removed from container element after 5 seconds', () => {
    jest.useFakeTimers();
    const message = 'Error Message';
    const { getByTestId } = render(<ErrorNotification message={message} />);

    expect(getByTestId('error-container')).toHaveClass('show-error');
    act(() => {
      jest.advanceTimersByTime(5000);
    });
    expect(getByTestId('error-container')).not.toHaveClass('show-error');
  });
});
