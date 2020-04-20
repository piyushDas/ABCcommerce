import React, { useContext, useEffect} from 'react'
import { AppContext } from '../../context'
import Header from '../../Components/Header'
import Search from '../../Components/Search'
import SearchList from '../../Components/SearchList'
import LoadMore from '../../Components/LoadMore'
import ScrollToTop from '../../Components/ScrollToTop'
import './desktop.css'

const ProductView = () => {
  const {
    searchResults,
    fetchSearchResults,
    pageData,
    showScrollToTop,
    updateScrollToTop,
    isMobileDevice,
    wishList
  } = useContext(AppContext)

  useEffect(() => {
    fetchSearchResults(pageData.pageSize, pageData.pageNumber)
  }, [])

  let template = (
    <div className="desktop-shell">
      <Header width="80px" componentClassName="desktop-container" wishlist={wishList} />
      <Search
        mobileClass="desktop-container"
        searchFunc={fetchSearchResults}
        pageSize={pageData.pageSize}
        pageNumber={pageData.pageNumber}
      />
      <SearchList searchResults={searchResults} componentClassName="desktop-container" />
      <ScrollToTop toggler={updateScrollToTop} visibility={showScrollToTop} />
      <LoadMore
        loaderFunc={fetchSearchResults}
        pageSize={pageData.pageSize}
        pageNumber={pageData.pageNumber}
        lastPage={pageData.lastPage}
        scrollUpdate={updateScrollToTop}
      />
    </div>
  )

  if(isMobileDevice) {
    template = (
      <div className="mobile-shell">
        <Header width="80px" componentClassName="align-center" />
        <Search
          mobileClass="align-center"
          searchFunc={fetchSearchResults}
          pageSize={pageData.pageSize}
          pageNumber={pageData.pageNumber}
        />
        <SearchList searchResults={searchResults} componentClassName="mobile-container" /> 
        <ScrollToTop toggler={updateScrollToTop} visibility={showScrollToTop} />
        <LoadMore
          loaderFunc={fetchSearchResults}
          pageSize={pageData.pageSize}
          pageNumber={pageData.pageNumber}
          lastPage={pageData.lastPage}
          scrollUpdate={updateScrollToTop}
        />
      </div>
    )
  }

  return (
    <>
      {template}
    </>
  ) 
}

export default ProductView