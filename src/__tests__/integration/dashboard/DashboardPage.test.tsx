import { render, screen, fireEvent } from '@testing-library/react';
import DashboardPage from '@/app/(authenticated)/dashboard/page';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn()
}));

describe('DashboardPage', () => {
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
  });

  it('muestra el título del dashboard', () => {
    render(<DashboardPage />);
    expect(screen.getByText(/Bienvenido al Dashboard/i)).toBeInTheDocument();
  });

  it('muestra los widgets de estadísticas', () => {
    render(<DashboardPage />);
    expect(screen.getByText(/Total Usuarios/i)).toBeInTheDocument();
    expect(screen.getByText(/Crecimiento/i)).toBeInTheDocument();
    expect(screen.getByText(/Actividad/i)).toBeInTheDocument();
  });

  it('redirige al login al hacer logout', () => {
    render(<DashboardPage />);
    const button = screen.getByText(/Cerrar sesión/i);
    fireEvent.click(button);
    expect(pushMock).toHaveBeenCalledWith('/auth/login');
  });
});
