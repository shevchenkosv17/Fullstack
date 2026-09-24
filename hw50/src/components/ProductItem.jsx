import React from 'react';

const ProductItem = React.memo(({ product, onToggleFavorite }) => {
  return (
    <div className="product-item" data-testid={`product-${product.id}`}>
      <h3>{product.name}</h3>
      <p>Категорія: {product.category}</p>
      <p>Рейтинг: {product.computedRating}</p>
      <button 
        onClick={() => onToggleFavorite(product.id)}
        style={{ background: product.isFavorite ? '#ffc107' : '#e2e8f0' }}
      >
        {product.isFavorite ? 'У вибраному' : 'Додати до вибраного'}
      </button>
    </div>
  );
});

ProductItem.displayName = 'ProductItem';

export default ProductItem;
