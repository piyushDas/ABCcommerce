import React, { useEffect, useContext } from 'react'
import NoResults from '../NoResults'
import WishlistItem from '../WishlistItem'
import './wishlist.css'
import { AppContext } from '../../context'

const Wishlist = ({
    results,
    componentClassName
}) => {
    const {
        wishList
    } = useContext(AppContext)
    useEffect(() => {
        console.log("Did render")
    }, [wishList])

  let list = (
    <div>Loading results</div>
  )
  if (wishList && wishList.length) {
    list = (
      <>
        {
          wishList.map((res, index) => (
            <WishlistItem
              result={res}
              key={`${index}_${res._id}`}
            />
          ))
        }
      </>
    )
  } else {
    list = (
      <NoResults type="wishlist" />
    )
  }

  return (
    <ul id="wish-list" className={`wish-list ${componentClassName ? componentClassName: ''}`}>
      {list}
    </ul>
  )
}

export default Wishlist