import { render, screen, fireEvent } from '@testing-library/react';
import PrimaryButton from '@/components/pure/button/PrimaryButton';

describe('PrimaryButton', () => {
  it('renderiza el texto correctamente', () => {
    render(<PrimaryButton>Click me</PrimaryButton>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('llama a onClick cuando se hace click', () => {
    const onClick = jest.fn();
    render(<PrimaryButton onClick={onClick}>Click me</PrimaryButton>);
    fireEvent.click(screen.getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });

  it('deshabilita el botón si disabled=true', () => {
    render(<PrimaryButton disabled>Click me</PrimaryButton>);
    expect(screen.getByText('Click me')).toBeDisabled();
  });

  it('pasa correctamente las props al Button', () => {
    render(
      <PrimaryButton size="large" className="custom">
        Click me
      </PrimaryButton>
    );
    const button = screen.getByText('Click me');
    expect(button).toHaveClass('custom');
  });
});
