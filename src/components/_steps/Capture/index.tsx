import { useEffect, useState } from 'react'
import * as S from './styles'

import useApi from '../../../Api'
import LoadingComponent from '../../Loading'
import FeedBackPage from '../../../pages/FeedBackPage'


type Props = {
  setError: () => void;
  sendFn: (blob: Blob, userId: string) => void;
}

type TFlowStatus = 'leadingCamera' | 'capturing' | 'capted';

const Capture = ({ setError, sendFn }: Props) => {

  const Api = useApi({})

  const [flowStatus, setFlowStatus] = useState<TFlowStatus>('leadingCamera')

  const completeFn = async (id: string) => {
    setTimeout(async () => {
      const frame = await Api.getMotionFrame(id)
      if (frame.success) sendFn(frame.blob, id)
      else setError()
    }, 2000)
  }

  const getElements = () => {

    const onfidoDiv = document.getElementById('onfido-mount') as HTMLDivElement

    const els = {
      startBtn: document.querySelector(
        'button[data-onfido-qa="welcome-next-btn"]') as HTMLButtonElement | null,
      enableCamBtn: document.querySelector(
        'button[data-onfido-qa="enable-camera-btn"]') as HTMLButtonElement | null,
      recordBtn: document.querySelector(
        'button[data-onfido-qa="motion-continue-btn"]') as HTMLButtonElement | null,
      activeCapture: document.querySelector(
        'div[data-page-id="ActiveVideoCapture"]') !== null,
      isRecordingComplete: document.querySelector(
        'div[data-page-id="RecordingComplete"]') as HTMLDivElement | null,
      isComplete: document
        .querySelector('div[data-page-id="Complete"]') as HTMLDivElement | null,
      confirmBtn: onfidoDiv.querySelector(
        'button.ods-button.-action--primary.onfido-sdk-ui-Theme-button-centered.onfido-sdk-ui-Theme-button-lg'
      ) as HTMLButtonElement
    }

    return els
  }

  const setClickListener = async (userId: string) => {

    const { startBtn, enableCamBtn, recordBtn, activeCapture, isRecordingComplete, isComplete, confirmBtn } = getElements()

    if (startBtn) startBtn.click()
    if (enableCamBtn) enableCamBtn.click()
    if (recordBtn) recordBtn.click()

    if (activeCapture) setFlowStatus('capturing')
    else if ((isRecordingComplete || isComplete) && confirmBtn) {
      setFlowStatus('capted')
      confirmBtn.addEventListener('click', () => completeFn(userId))
      confirmBtn.click()
    }
  }

  const runWorkflow = async (token: string, wId: string, userId: string) => {
    const config = { childList: true, subtree: true }

    if (document.getElementById('onfido-mount') !== null) {
      const container = document.getElementById('onfido-mount') as HTMLDivElement
      const observer = new MutationObserver(() => setClickListener(userId))
      observer.observe(container, config)
    }

    // @ts-ignore
    loadUI(token, wId)
  }

  const loadWorkflow = async () => {

    const creation = await Api.createOnfidoUser()
    const id = creation.id

    const token = await Api.getOnfidoSDKToken(id) as string

    if (token) {
      const workflowRunId = await Api.getWorkflowRunId(id) as string
      if (workflowRunId) runWorkflow(token, workflowRunId, id)
      else setError()
    } else setError()

  }

  const renderCapture = () => {

    return (
      <>
        <S.CaptureArea
          id="onfido-mount"
          showing={(flowStatus === 'capturing') ? true : undefined}

        />
        {(flowStatus == 'leadingCamera') == true && <FeedBackPage isError={false} msgType='leadingCamera' />}
        {(flowStatus == 'capted') == true && <LoadingComponent />}
      </>
    )
  }

  useEffect(() => {
    loadWorkflow()
  }, [])


  return renderCapture()

}


export default Capture