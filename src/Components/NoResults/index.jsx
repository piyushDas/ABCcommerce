import React from 'react'
import {ReactComponent as Search} from '../../icons/search.svg'
import './noResults.css'

const NoResults = ({
  componentClassName,
  type
}) => {
  let message = 'Sorry we are not able to find you were looking for!'
  let description = 'Would you like to explore other products?'
  if (type === 'wishlist') {
    message = 'Your wishlist is empty.'
    description = 'Please add items here to view them'
  }
  return (
    <div className="no-result-box">
      <div>
        <Search height="60px" width="60px" />
      </div>
      <div className="no-result-title">
        {message}
      </div>
      <div className="no-result-subtitle">
        {description}
      </div>
      { type !== 'wishlist' &&
        <div>
          <button className="no-result-button" onClick={() => window.location.reload()}>Explore</button>
        </div>
      }
    </div>
  )
}

export default NoResults