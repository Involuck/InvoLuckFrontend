import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '@/app/auth/page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('LoginPage', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders the form with inputs and button', () => {
    render(<LoginPage />);
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /ingresar/i })
    ).toBeInTheDocument();
  });

  test('displays error for invalid credentials', async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/correo/i), {
      target: { value: 'wrong@user.com' }
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'wrongpass' }
    });

    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));

    // wait for the error message
    await waitFor(() =>
      expect(screen.getByText(/credenciales inválidas/i)).toBeInTheDocument()
    );
    expect(pushMock).not.toHaveBeenCalled();
  });

  test('submits with valid credentials and redirects', async () => {
    render(<LoginPage />);

    fireEvent.change(screen.getByLabelText(/correo/i), {
      target: { value: 'dev@involuck.com' }
    });
    fireEvent.change(screen.getByLabelText(/contraseña/i), {
      target: { value: 'Involuck123' }
    });

    fireEvent.click(screen.getByRole('button', { name: /ingresar/i }));

    // wait for the success message
    await waitFor(() =>
      expect(screen.getByText(/bienvenido. redirigiendo/i)).toBeInTheDocument()
    );

    // wait for the redirect
    await waitFor(() =>
      expect(pushMock).toHaveBeenCalledWith('/dashboard')
    );
  });
});
