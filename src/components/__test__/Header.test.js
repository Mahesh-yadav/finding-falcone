import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import Header from '../Header';

function renderHeader(props, url = { pathname: '/' }) {
  return render(
    <MemoryRouter initialEntries={[url]} initialIndex={0}>
      <Header {...props} />
    </MemoryRouter>
  );
}

describe('The <Header /> component', () => {
  const testProps = {
    title: 'TEST_TITLE',
    onReset: jest.fn(),
    expeditionsCount: 0,
  };

  test('should render title as h1 heading', () => {
    const { getByRole } = renderHeader(testProps);
    expect(getByRole('heading', { level: 1 }).textContent).toBe(
      testProps.title
    );
  });

  test('should render a link to GeekTrust', () => {
    const { getByRole } = renderHeader(testProps);
    expect(getByRole('link').textContent).toBe('GeekTrust');
  });

  test('should render Reset button in disabled state when expeditionCount is 0', () => {
    const { getByText } = renderHeader(testProps);
    expect(getByText('Reset')).toBeDisabled();
  });

  test('should render Reset button in enabled state when expeditionCount is > 0', () => {
    const { getByText } = renderHeader({ ...testProps, expeditionsCount: 2 });
    expect(getByText('Reset')).toBeEnabled();
  });

  test("should not render Reset button if url is other than '/'", () => {
    const { queryByText } = renderHeader(testProps, { pathname: '/abc' });
    expect(queryByText('Reset')).toBeNull();
  });
});
