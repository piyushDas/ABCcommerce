import React, { useEffect, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import {
  checkMobileDevice
} from './utils'
import { AppState, AppContext } from './context'
// import MobileShell from './Containers/Mobile'
// import DesktopShell from './Containers/Desktop'
import Router from './Router'
import './App.css'

const AppView = withRouter(() => {
  // const [isMobileDevice, updateMobileDeviceFlag] = useState(false)
  const {
    updateMobileDeviceFlag
  } = useContext(AppContext)

  useEffect(() => {
    updateMobileDeviceFlag(checkMobileDevice())
  }, [])

  // useEffect(() => {
  //   fetchSearchResults(pageData.pageSize, pageData.pageNumber)
  // }, [])

  // let pageView
  // if (isMobileDevice) {
  //   pageView = (
  //     <>
  //       <MobileShell />
  //     </>
  //   )
  // } else {
  //   pageView = (
  //     <>
  //       <DesktopShell />
  //     </>
  //   )
  // }

  return (
    <Router />
  )
})

const App = () => (
  <AppState>
    <AppView />
  </AppState>
)

export default App
