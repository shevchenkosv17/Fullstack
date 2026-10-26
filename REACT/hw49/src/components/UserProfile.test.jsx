import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import UserProfile from './UserProfile';

global.fetch = vi.fn();

describe('UserProfile Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('відображає індикатор завантаження під час виконання запиту', () => {
    fetch.mockImplementationOnce(() => new Promise(() => {}));
    
    render(<UserProfile />);
    
    expect(screen.getByTestId('loading')).toBeInTheDocument();
    expect(screen.getByText('Завантаження...')).toBeInTheDocument();
  });

  it('коректно відображає дані користувача після успішного запиту', async () => {
    const mockUser = { name: 'Сергій Шевченко', email: 'sergey@example.com' };
    
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockUser,
    });

    render(<UserProfile />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByText('Сергій Шевченко')).toBeInTheDocument();
    expect(screen.getByText('sergey@example.com')).toBeInTheDocument();
  });

  it('відображає повідомлення про помилку у разі невдалого запиту', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    render(<UserProfile />);

    await waitFor(() => {
      expect(screen.queryByTestId('loading')).not.toBeInTheDocument();
    });

    expect(screen.getByTestId('error')).toBeInTheDocument();
    expect(screen.getByText(/Помилка/)).toBeInTheDocument();
  });
});
