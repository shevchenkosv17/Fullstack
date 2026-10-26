import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductDashboard from './ProductDashboard';

describe('ProductDashboard Component', () => {
  it('коректно відображає початковий список продуктів', () => {
    render(<ProductDashboard />);
    
    expect(screen.getByText('Ноутбук Pro')).toBeInTheDocument();
    expect(screen.getByText('Смартфон X')).toBeInTheDocument();
    expect(screen.getByText('Кавомашина Ultra')).toBeInTheDocument();
  });

  it('фільтрує продукти відповідно до введеного тексту в пошук', () => {
    render(<ProductDashboard />);
    
    const searchInput = screen.getByPlaceholderText('Пошук продукту...');
    fireEvent.change(searchInput, { target: { value: 'Ноутбук' } });
    
    expect(screen.getByText('Ноутбук Pro')).toBeInTheDocument();
    expect(screen.queryByText('Смартфон X')).not.toBeInTheDocument();
    expect(screen.queryByText('Кавомашина Ultra')).not.toBeInTheDocument();
  });

  it('змінює текст кнопки при додаванні продукту до вибраного', () => {
    render(<ProductDashboard />);
    
    const productContainer = screen.getByTestId('product-1');
    const favoriteButton = productContainer.querySelector('button');
    
    expect(favoriteButton).toHaveTextContent('Додати до вибраного');
    
    fireEvent.click(favoriteButton);
    
    expect(favoriteButton).toHaveTextContent('У вибраному');
  });
});
