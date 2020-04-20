import React from 'react'
import Wishlist from '../Wishlist'
import './header.css'

const Header = ({
  componentClassName,
  width
}) => {
  return (
    <>
      <div className="top-header flex">
        <div>
          <div className={componentClassName}>
            ABCcommerce
          </div>
          <div className={componentClassName}>
            Generic products listing
          </div>
        </div>
        <div className="wish-list-trigger">
          Wishlist
        </div>
        <Wishlist />
      </div>
    </>
  )
}

export default Header