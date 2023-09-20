import { useEffect, useRef, useState } from 'react'
import * as S from './styles'

import useApi from '../../../Api'
import LoadingComponent from '../../Loading'
import FeedBackPage from '../../../pages/FeedBackPage'
import { useLoaderData } from 'react-router-dom'


type Props = {
  setError: () => void;
  sendFn: (blob: Blob) => void;
}

type TFlowStatus = 'leadingCamera' | 'capturing' | 'capted';

const Capture = ({ setError, sendFn }: Props) => {

  const loaderInfo = useLoaderData()

  const Api = useApi({})
  const containerEl = useRef<HTMLDivElement>(null)
  const [flowStatus, setFlowStatus] = useState<TFlowStatus>('leadingCamera')

  const completeFn = async () => {
    const { blob } = await Api.getMotionFrame()
    sendFn(blob)
  }

  const getElements = () => {

    const onfidoDiv = document.getElementById('onfido-mount') as HTMLDivElement

    const els = {
      startBtn: document.querySelector(
        'button[data-onfido-qa="welcome-next-btn"]') as HTMLButtonElement | null,
      recordBtn: document.querySelector(
        'button[data-onfido-qa="motion-continue-btn"]') as HTMLButtonElement | null,
      activeCapture: document.querySelector(
        'div[data-page-id="ActiveVideoCapture"]') !== null,
      isRecordComplete: document.querySelector(
        'div[data-page-id="RecordingComplete"]') as HTMLDivElement | null,
      confirmBtn: onfidoDiv.querySelector(
        'button.ods-button.-action--primary.onfido-sdk-ui-Theme-button-centered.onfido-sdk-ui-Theme-button-lg'
      ) as HTMLButtonElement
    }

    return els
  }

  const setClickListener = async () => {

    const { startBtn, recordBtn, activeCapture, isRecordComplete, confirmBtn } = getElements()

    if (startBtn) startBtn.click()
    if (recordBtn) recordBtn.click()

    if (activeCapture) setFlowStatus('capturing')
    else if (isRecordComplete && confirmBtn) {
      setFlowStatus('capted')
      confirmBtn.addEventListener('click', completeFn)
      confirmBtn.click()
    }
  }

  const runWorkflow = async (token: string, wId: string) => {
    const config = { childList: true, subtree: true }

    if (document.getElementById('onfido-mount') !== null) {
      const container = document.getElementById('onfido-mount') as HTMLDivElement
      const observer = new MutationObserver(setClickListener)
      observer.observe(container, config)
    }

    // @ts-ignore
    loadUI(token, wId)
  }

  const loadWorkflow = async () => {
    const token = await Api.getOnfidoSDKToken() as string

    if (token) {
      const workflowRunId = await Api.getWorkflowRunId() as string
      if (workflowRunId) runWorkflow(token, workflowRunId)
      else setError()
    } else setError()

  }

  const renderCapture = () => {

    return (
      <>
        <S.CaptureArea
          id="onfido-mount"
          showing={(flowStatus === 'capturing') ? true : undefined}
          ref={containerEl}
        />

        {(flowStatus == 'leadingCamera') == true && <FeedBackPage isError={false} msgType='leadingCamera' />}
        {(flowStatus == 'capted') == true && <LoadingComponent />}
      </>
    )
  }

  useEffect(() => {
    loadWorkflow()
    console.log(navigator.userAgent)
    console.log(loaderInfo)
  }, [])


  return renderCapture()

}


export default Capture