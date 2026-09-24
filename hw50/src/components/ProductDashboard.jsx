import { useState, useMemo, useCallback } from 'react';
import ProductItem from './ProductItem';

const INITIAL_PRODUCTS = [
  { id: 1, name: 'Ноутбук ASUS', category: 'Електроніка', rating: 4.8, isFavorite: false },
  { id: 2, name: 'Смартфон Apple', category: 'Електроніка', rating: 4.5, isFavorite: false },
  { id: 3, name: 'Кавомашина Philips', category: 'Побутова техніка', rating: 4.2, isFavorite: false },
  { id: 4, name: 'Крісло геймерське', category: 'Меблі', rating: 4.7, isFavorite: false },
];

export default function ProductDashboard() {
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('light');

  const handleToggleFavorite = useCallback((id) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === id ? { ...p, isFavorite: !p.isFavorite } : p))
    );
  },);

  const filteredProducts = useMemo(() => {
    return products
      .filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .map((product) => {
        let sum = 0;
        for (let i = 0; i < 100000; i++) {
          sum += Math.sin(i) * Math.cos(i);
        }
        return {
          ...product,
          computedRating: (product.rating + (sum > 0 ? 0 : 0)).toFixed(1),
        };
      });
  }, [products, searchTerm]);

  return (
    <div className={`dashboard ${theme}`} style={{ padding: '20px' }}>
      <h2>Панель продуктів</h2>
      
      <button className="theme-btn" onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>

      <div className="search-container" style={{ margin: '20px 0' }}>
        <input
          type="text"
          placeholder="Пошук продукту..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="products-list">
        {filteredProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            onToggleFavorite={handleToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}
