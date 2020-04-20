import React from 'react'
import {
  htmlDecoder
} from '../../utils'
import './wishlistItem.css'

const WishlistItem = ({
  result,
  componentClassName
}) => {
  const {
    image,
    name,
    currency_symbol,
    price
  } = result.data
  
  return (
    <li className={`wish-list-item flex ${componentClassName ? componentClassName: ''}`}>
      <div>
          <img
            src={image}
            loading="lazy"
            alt={name}
          />
      </div>
      <div className="item-details">
        <div className="product-title">{name}</div>
        <div className="product-discount-price">{htmlDecoder(currency_symbol)}{price}</div>
        <div className="product-title">{result.count > 1 ? `${result.count} items` : `${result.count} item`}</div>
      </div>
    </li>
  )
}

export default WishlistItem