import React from 'react';

const ProductItem = React.memo(({ product, onToggleFavorite }) => {
  return (
    <div className="product-item" data-testid={`product-${product.id}`}>
      <div>
        <h3>{product.name}</h3>
        <p>Категорія: {product.category}</p>
        <p>Рейтинг: {product.computedRating}</p>
      </div>
      <button 
        className="fav-btn"
        onClick={() => onToggleFavorite(product.id)}
        style={{ 
          backgroundColor: product.isFavorite ? '#ffc107' : '#e2e8f0',
          color: product.isFavorite ? '#000000' : '#0f172a'
        }}
      >
        {product.isFavorite ? 'У списку бажань' : 'Додати до списку бажань'}
      </button>
    </div>
  );
});

ProductItem.displayName = 'ProductItem';

export default ProductItem;
