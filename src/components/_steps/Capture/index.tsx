import React, { useEffect } from 'react'
import * as S from './styles'


const Capture = () => {

  const handleCapture = () => {
    alert('capted')
  }

  const renderUI = () => {
    // init config
  }

  useEffect(() => {
    renderUI()
  }, [])


  return (
    <div id="onfido-mount"></div>
  )

}


export default Capture