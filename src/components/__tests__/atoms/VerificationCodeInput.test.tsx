import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import { render } from '../../../../src/test-utils/test-utils';
import { VerificationCodeInput } from '../../atoms/VerificationCodeInput/VerificationCodeInput';
import { ThemeProvider } from '../../../context/ThemeContext/ThemeContext';

// Mock useTheme hook
jest.mock('../../../hooks/UseTheme', () => ({
  useTheme: () => ({
    colors: {
      background: '#fff',
      text: '#000',
      primary: '#007AFF',
      border: '#ccc',
    },
  }),
}));

describe('VerificationCodeInput', () => {
  const initialCode = ['', '', '', '', '', ''];

  it('renders correctly with empty code', () => {
    const { toJSON } = render(
      <ThemeProvider>
        <VerificationCodeInput 
          code={initialCode}
          setCode={jest.fn()}
          onCodeComplete={jest.fn()}
        />
      </ThemeProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with partial code', () => {
    const partialCode = ['1', '2', '3', '', '', ''];
    const { toJSON } = render(
      <ThemeProvider>
        <VerificationCodeInput 
          code={partialCode}
          setCode={jest.fn()}
          onCodeComplete={jest.fn()}
        />
      </ThemeProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders correctly with complete code', () => {
    const completeCode = ['1', '2', '3', '4', '5', '6'];
    const { toJSON } = render(
      <ThemeProvider>
        <VerificationCodeInput 
          code={completeCode}
          setCode={jest.fn()}
          onCodeComplete={jest.fn()}
        />
      </ThemeProvider>
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders 6 input fields', () => {
    const { getAllByTestId } = render(
      <ThemeProvider>
        <VerificationCodeInput 
          code={initialCode}
          setCode={jest.fn()}
          onCodeComplete={jest.fn()}
        />
      </ThemeProvider>
    );

    const inputs = getAllByTestId(/verification-input-\d/);
    expect(inputs).toHaveLength(6);
  });

  it('handles numeric input correctly', () => {
    const mockSetCode = jest.fn();
    const { getAllByTestId } = render(
      <ThemeProvider>
        <VerificationCodeInput 
          code={initialCode}
          setCode={mockSetCode}
          onCodeComplete={jest.fn()}
        />
      </ThemeProvider>
    );

    const inputs = getAllByTestId(/verification-input-\d/);
    fireEvent.changeText(inputs[0], '1');
    
    expect(mockSetCode).toHaveBeenCalledWith(['1', '', '', '', '', '']);
  });

  it('rejects non-numeric input', () => {
    const mockSetCode = jest.fn();
    const { getAllByTestId } = render(
      <ThemeProvider>
        <VerificationCodeInput 
          code={initialCode}
          setCode={mockSetCode}
          onCodeComplete={jest.fn()}
        />
      </ThemeProvider>
    );

    const inputs = getAllByTestId(/verification-input-\d/);
    fireEvent.changeText(inputs[0], 'a');
    
    expect(mockSetCode).not.toHaveBeenCalled();
  });

  it('handles input sequence correctly', () => {
    let currentCode = [...initialCode];
    const mockSetCode = jest.fn((newCode) => {
      currentCode = newCode;
    });

    const { getAllByTestId, rerender } = render(
      <ThemeProvider>
        <VerificationCodeInput 
          code={currentCode}
          setCode={mockSetCode}
          onCodeComplete={jest.fn()}
        />
      </ThemeProvider>
    );

    const inputs = getAllByTestId(/verification-input-\d/);
    
    // Test each input individually
    fireEvent.changeText(inputs[0], '1');
    expect(mockSetCode).toHaveBeenCalledWith(['1', '', '', '', '', '']);
    
    // Update the component with new state
    rerender(
      <ThemeProvider>
        <VerificationCodeInput 
          code={currentCode}
          setCode={mockSetCode}
          onCodeComplete={jest.fn()}
        />
      </ThemeProvider>
    );

    fireEvent.changeText(inputs[1], '2');
    expect(mockSetCode).toHaveBeenCalledWith(['1', '2', '', '', '', '']);
    
    // Update the component with new state
    rerender(
      <ThemeProvider>
        <VerificationCodeInput 
          code={currentCode}
          setCode={mockSetCode}
          onCodeComplete={jest.fn()}
        />
      </ThemeProvider>
    );

    fireEvent.changeText(inputs[2], '3');
    expect(mockSetCode).toHaveBeenCalledWith(['1', '2', '3', '', '', '']);
  });

  it('handles complete code entry', () => {
    const mockOnCodeComplete = jest.fn();
    const mockSetCode = jest.fn();
    const { getAllByTestId } = render(
      <ThemeProvider>
        <VerificationCodeInput 
          code={['1', '2', '3', '4', '5', '']}
          setCode={mockSetCode}
          onCodeComplete={mockOnCodeComplete}
        />
      </ThemeProvider>
    );

    const inputs = getAllByTestId(/verification-input-\d/);
    fireEvent.changeText(inputs[5], '6');
    
    expect(mockSetCode).toHaveBeenCalledWith(['1', '2', '3', '4', '5', '6']);
  });
}); 