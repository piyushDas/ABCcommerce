import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom'
import { AppContext } from '../../context'
import Header from '../../Components/Header'
import FileUploadButton from '../../Components/FileUploadButton'
import './upload.css'

const UploadView = () => {
  const {
    uploadComplete
  } = useContext(AppContext)

  const link = '/products'
  let template = (
    <div className="desktop-shell">
      <Header width="80px" componentClassName="desktop-container" />
      <FileUploadButton />
      {uploadComplete && <>
        <Redirect to={link} />
      </>}
    </div>
  )

  return (
      <>
        {template}
      </>
  )
}

export default UploadView