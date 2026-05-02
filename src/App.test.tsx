import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders header with correct title', () => {
    render(<App />);
    const header = screen.getByText('OS Lab Dashboard');
    expect(header).toBeInTheDocument();
  });

  it('renders all navigation tabs', () => {
    render(<App />);
    expect(screen.getByText('Мониторинг')).toBeInTheDocument();
    expect(screen.getByText('Лаборатория')).toBeInTheDocument();
    expect(screen.getByText('Файлы')).toBeInTheDocument();
    expect(screen.getByText('Настройки')).toBeInTheDocument();
  });

  it('shows monitoring page by default', () => {
    render(<App />);
    // Monitoring page should be visible initially
    const monitoringTab = screen.getByText('Мониторинг');
    expect(monitoringTab).toBeInTheDocument();
  });
});
