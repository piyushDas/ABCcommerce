/* eslint no-undef: "error" */
/* eslint-env browser */
import React, { useState, useContext } from 'react'
import { AppContext } from '../../context'
import Uploadlogo from '../../icons/upload.png'
import './file.css'

const FileUploadButton = () => {
  const {
    uploadSelectedCSV,
    apiError
  } = useContext(AppContext)

  const [selectedFile, setSelectedFile] = useState({
    name: 'No file selected yet'
  })

  const selectFile = e => {
    setSelectedFile(e.target.files[0])
  }

  const uploadFile = () => {
    const formData = new FormData()
    formData.append('csv', selectedFile)
    uploadSelectedCSV(formData)
  }

  return (
    <>
      <div className="">
        <div className="file-button">
          <input className="hide-file" type="file" onChange={e => selectFile(e)} />
          <div className="mb-20">
            <img className="page-header-icon" src={Uploadlogo} alt="text" />
          </div>
          <div>Select your file</div>
          <div className="file-name">
            {selectedFile.name}
          </div>
        </div>
      </div>
      <div className="flex flex-center">
        <button
          type="button"
          className="Button--secondary"
          onClick={uploadFile}
        >
          Upload
        </button>
      </div>
       { apiError &&
        <div className="error-message">
          * File upload failed. Please choose a valid CSV and try again.
        </div>
      }
      {/*
      <If condition={pageLoader}>
        <PageLoader
          title="Uploading your file"
          message="Please wait while we fetch your code"
        />
      </If> */}
    </>
  )
}

export default FileUploadButton
