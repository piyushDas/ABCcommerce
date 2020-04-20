import React, { useState, createContext } from 'react'
import {
  appAxiosInstance
} from './utils'

export const AppContext = createContext({
  searchResults: [],
  testVar: '',
  fetchSearchResults: () => { }
})

export const AppState = ({ children }) => {
  /*
    States used in the context
  */
  const [testVar, updateTestVar] = useState('test')
  const [searchResults, populateSearchResults] = useState([])
  const [pageData, updatePageData] = useState({pageSize: 10, pageNumber: 0})
  const [showScrollToTop, updateScrollToTop] = useState(false)

  const [apiError, setApiError] = useState(false)
  const [apiErrorMessage, setApiErrorMessage] = useState([])
  const [pageLoader, setPageLoader] = useState(false)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [wishList, updateWishlist] = useState([])
  const [categories, setCategories] = useState([])
  const urlPrefix = 'http://localhost:3012'
  
  const [isMobileDevice, updateMobileDeviceFlag] = useState(false)

  const uploadSelectedCSV = payload => {
    setPageLoader(true)
    const apiUrl = `${urlPrefix}/abcComm_v1/uploadCSV`
    setApiError(false)
    appAxiosInstance(apiUrl, 'post', true, payload)
      .then(res => {
        setPageLoader(false)
        if (res) {
          setUploadComplete(true)
        }
      })
      .catch(err => {
        setPageLoader(false)
        let message = 'Not able to upload the file. Only CSV files uploads possible'
        if (err.response.status === 400) {
          message = 'Please select a file to upload.'
        }
        setApiError(true)
        console.error(err)
        setApiErrorMessage(message)
      })
  }
  
  const fetchSearchResults = (size, pageNo, str, filterStr) => {
    updateTestVar("updated")
    const apiUrl = `${urlPrefix}/abcComm_v1/fetchAllproducts`
    const params = {
      pageSize: size,
      pageNumber: pageNo,
      searchStr: str,
      filter: filterStr
    }
    if (!str && typeof str === 'string') {
      params.pageNumber = 0
    }
    appAxiosInstance(apiUrl, 'get', false, params)
      .then(res => {
        if (res &&
          res.data &&
          res.data.paginatedData
        ) {
          if (params.pageNumber > 0 && !showScrollToTop) {
            updateScrollToTop(true)
          }
          params.lastPage = res.data.lastPageNumber
          delete params.searchStr
          updatePageData(params)
          setCategories(res.data.categoryFilters)
          let updatedSearchListState = [...res.data.paginatedData]
          if (!str && typeof str === 'string') {
            updatedSearchListState = [...res.data.paginatedData]
          } else if (!str) {
            updatedSearchListState = [...searchResults, ...res.data.paginatedData]
          }
          populateSearchResults(updatedSearchListState)
        }
      })
      .catch(err => {
      })
  }

  return (
    <AppContext.Provider
      value={{
        searchResults,
        testVar,
        fetchSearchResults,
        pageData,
        updatePageData,
        showScrollToTop,
        updateScrollToTop,
        isMobileDevice,
        updateMobileDeviceFlag,
        uploadSelectedCSV,
        apiError,
        apiErrorMessage,
        pageLoader,
        uploadComplete,
        wishList,
        updateWishlist,
        categories
      }}
    >
      {children}
    </AppContext.Provider>
  )
}