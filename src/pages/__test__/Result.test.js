import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import Result from '../Result';

function renderResult(props) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: '/result' }]} initialIndex={0}>
      <Result {...props} />
    </MemoryRouter>
  );
}

describe('The <Result /> component', () => {
  const testProps = {
    result: {
      status: 'success',
      time: 200,
      planet_name: 'TEST_PLANET',
    },
    setResult: jest.fn(),
  };

  test('should render success message when status is success', () => {
    const { getByText } = renderResult(testProps);
    expect(getByText(/Success! Congratulations/i)).toBeInTheDocument();
  });

  test('should render planet name when status is success', () => {
    const { getByText } = renderResult(testProps);
    expect(
      getByText(new RegExp(testProps.result.planet_name))
    ).toBeInTheDocument();
  });

  test('should render total time taken when status is success', () => {
    const { getByText } = renderResult(testProps);
    expect(
      getByText(`Time Taken: ${testProps.result.time}`)
    ).toBeInTheDocument();
  });

  test('should render failure message when status is false', () => {
    const { getByText } = renderResult({
      ...testProps,
      result: { status: 'false' },
    });
    expect(getByText(/Failure! Unfortunately/i)).toBeInTheDocument();
  });

  test('should render Start Again button', () => {
    const { getByText } = renderResult(testProps);
    expect(getByText('Start Again')).toBeInTheDocument();
  });

  test('should call setResult() when start again is clicked', () => {
    const { getByText } = renderResult(testProps);

    userEvent.click(getByText('Start Again'));
    expect(testProps.setResult).toHaveBeenCalledWith(null);
  });
});
