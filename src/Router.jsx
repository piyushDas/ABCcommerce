import React from 'react'
import { Switch, Route } from 'react-router-dom'
import UploadView from './Containers/UploadView'
import ProductView from './Containers/ProductView'

const router = props => (
  <React.Fragment>
    <Switch>
      <Route exact={true} path="/" component={UploadView} />
      <Route exact={true} path="/upload" component={UploadView} />
      <Route exact={true} path="/products" component={ProductView} />
      {/* <Route path="*" component={PageNotFound} /> */}
    </Switch>
  </React.Fragment>
)

export default router
