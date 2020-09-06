import React from 'react';
import { render } from '@testing-library/react';

import Footer from '../Footer';

describe('The <Footer /> component', () => {
  test('should render correctly', () => {
    const { getByText } = render(<Footer />);

    expect(getByText(/Coding Problem/)).toBeInTheDocument();
  });
});
