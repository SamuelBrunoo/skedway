import { useEffect, useState } from 'react'
import * as S from './styles'

import useApi from '../../../Api'
import LoadingComponent from '../../Loading';
import FeedBackPage from '../../../pages/FeedBackPage';


type Props = {
  setError: () => void;
  sendFn: (blob: Blob) => void;
}

const Capture = ({ setError, sendFn }: Props) => {

  const Api = useApi({})
  const [flowStatus, setFlowStatus] = useState<'leadingCamera' | 'capturing' | 'capted'>('leadingCamera')

  const completeFn = async () => {
    const { blob } = await Api.getMotionFrame()
    sendFn(blob)
  }

  const setClickListener = async () => {
    const onfidoDiv = document.getElementById('onfido-mount')

    const startBtn = document.querySelector('button[data-onfido-qa="welcome-next-btn"]') as HTMLButtonElement | null
    const recordBtn = document.querySelector('button[data-onfido-qa="motion-continue-btn"]') as HTMLButtonElement | null
    const activeCapture = document.querySelector('div[data-page-id="ActiveVideoCapture"]') !== null

    const isRecordComplete = document.querySelector('div[data-page-id="RecordingComplete"]') as HTMLDivElement | null
    const confirmBtn = onfidoDiv?.querySelector('button.ods-button.-action--primary.onfido-sdk-ui-Theme-button-centered.onfido-sdk-ui-Theme-button-lg') as HTMLButtonElement | null

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

    // @ts-ignore
    loadUI(token, wId)

    const targetNode = document.getElementById('onfido-mount') as HTMLDivElement
    const config = { childList: true, subtree: true }
    const observer = new MutationObserver(setClickListener)
    observer.observe(targetNode, config);
  }

  const renderCapture = async () => {
    const token = await Api.getOnfidoSDKToken() as string

    if (token) {
      const workflowRunId = await Api.getWorkflowRunId() as string
      if (workflowRunId) runWorkflow(token, workflowRunId)
      else setError()
    } else setError()

  }

  useEffect(() => {
    renderCapture()
  }, [])


  return (
    <>
      <S.CaptureArea id="onfido-mount" showing={flowStatus === 'capturing'}></S.CaptureArea>
      {flowStatus === 'leadingCamera' && <FeedBackPage isError={false} msgType='leadingCamera' />}
      {flowStatus === 'capted' && <LoadingComponent />}
    </>
  )

}


export default Capture