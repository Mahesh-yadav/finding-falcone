import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import RadioInput from '../RadioInput';

describe('The <RadioInput /> component', () => {
  const testProps = {
    id: 'TEST_ID',
    labelText: 'TEST_LABEL',
    checked: false,
    disabled: false,
    onChange: jest.fn(),
  };

  test('should render label and radio with linked id and htmlFor attributes', () => {
    const { getByLabelText } = render(<RadioInput {...testProps} />);

    expect(getByLabelText(testProps.labelText)).toBeInTheDocument();
  });

  test('should call onChange when clicked on radio input', () => {
    const { getByLabelText } = render(<RadioInput {...testProps} />);

    const radio = getByLabelText(testProps.labelText);
    userEvent.click(radio);

    expect(testProps.onChange).toHaveBeenCalled();
  });

  test('should call onChange when clicked on radio label', () => {
    const { getByText } = render(<RadioInput {...testProps} />);

    const label = getByText(testProps.labelText);
    userEvent.click(label);

    expect(testProps.onChange).toHaveBeenCalled();
  });

  test('should be disabled when disabled prop is true', () => {
    testProps.disabled = true;
    const { getByLabelText } = render(<RadioInput {...testProps} />);

    expect(getByLabelText(testProps.labelText)).toBeDisabled();
  });

  test('should be checked when checked prop is true', () => {
    testProps.checked = true;
    const { getByLabelText } = render(<RadioInput {...testProps} />);

    expect(getByLabelText(testProps.labelText)).toBeChecked();
  });
});
