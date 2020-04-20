import React, { useState, useContext } from 'react'
import {
  htmlDecoder
} from '../../utils'
import './searchListItem.css'
import { AppContext } from '../../context'

const SearchListItem = ({
  data,
  imgHeight,
  imgWidth,
  componentClassName
}) => {

  const {
    wishList,
    updateWishlist
  } = useContext(AppContext)

  const {
    image,
    name,
    currency_symbol,
    price,
    // avlble,
    category,
    collection,
    description
  } = data

  const moveToWishlist = type => {
    let count = 1
    let updateIndex = ''
    for (const [index, item] of wishList.entries()) {
        if ( item.data._id === data._id ) {
          count = item.count + 1
          updateIndex = index
        }
    }
    const dataList = [...wishList]
    if (count === 1 && type === 'add') {
      dataList.push({
        data,
        count
      })
    } else if (count === 2 && type === 'remove') {
      dataList.splice(updateIndex, 1)
    } else if (count > 1 && type === 'remove') {
      dataList[updateIndex] = {
        data,
        count: count - 2
      }
    } else {
      dataList[updateIndex] = {
        data,
        count
      }
    }
    updateWishlist(dataList)
  }

  const [wishlistCount, updateCount] = useState(0)
  const  addToWishlist = () => {
    updateCount(wishlistCount + 1)
    moveToWishlist('add')
  }

  const removeFromWishlist = () => {
    if (wishlistCount < 1) {
      return
    }
    updateCount(wishlistCount - 1)
    moveToWishlist('remove')
  }
  return (
    <li className={`search-list-item ${componentClassName ? componentClassName: ''}`}>
      <div>
          <img
            src={image}
            loading="lazy"
            alt={name}
            height={imgHeight}
            width={imgWidth}
          />
      </div>
      <div className="item-details">
        <div className="product-title">{name}</div>
        <div className="product-subtitle">{description}</div>
        <div className="flex">
        <div className="product-discount-price">{htmlDecoder(currency_symbol)}{price}</div>
        </div>
        <div className="product-subtitle">
           Category: {category || '--'}
        </div>
        <div className="product-subtitle">
           Collection: {collection || '--'}
        </div>
        <div className="flex flex-wrap flex-middle">
          Qty: {wishlistCount}&nbsp;
          <span className="product-controls" onClick={addToWishlist}> + </span>
          <span className="product-controls" onClick={removeFromWishlist}> - </span>
        </div>
      </div>
    </li>
  )
}

export default SearchListItem