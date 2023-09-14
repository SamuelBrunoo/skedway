import React, { useEffect, useRef } from 'react'
import * as S from './styles'

import useApi from '../../../Api'


const Capture = () => {

  const Api = useApi({})

  const completeFn = async () => {
    const motionId = await Api.getMotionCaptureId()
    const imageBlob = await Api.getVideoFrame(motionId)
    console.log(imageBlob)
  }

  const renderCapture = async () => {
    const sdkToken = await Api.getVideoFrame('e1e551d6-3e6a-4144-9ef9-2a1dc9190490')
    // const sdkToken = await Api.getOnfidoSDKToken()
    // const worflowRunId = await Api.getWorkflowRunId()

    // @ts-ignore
    loadUI(sdkToken, worflowRunId, completeFn)
  }

  useEffect(() => {
    renderCapture()
  }, [])


  return (
    <div id="onfido-mount"></div>
  )

}


export default Capture