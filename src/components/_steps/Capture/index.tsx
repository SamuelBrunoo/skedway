import { useEffect } from 'react'

import * as Onfido from 'onfido-sdk-ui'
import useApi from '../../../Api'


type Props = {
  setError: () => void;
  sendFn: (blob: Blob) => void;
}

const Capture = ({ setError, sendFn }: Props) => {

  const Api = useApi({})

  const completeFn = async (blob: Blob) => {
    sendFn(blob)
  }

  const setClickListener = async () => {
    const onfidoDiv = document.getElementById('onfido-mount')
    const confirmBtn = onfidoDiv?.querySelector('button[data-onfido-qa="confirm-action-btn"]') as HTMLButtonElement | null

    if (confirmBtn) {
      confirmBtn.removeAttribute('onclick')

      const image = (document.querySelector('.onfido-sdk-ui-CaptureViewer-image') as HTMLImageElement).src
      const blob = await fetch(image).then(res => res.blob())

      confirmBtn.addEventListener('click', () => completeFn(blob))
    }
  }

  const runWorkflow = async (token: string, wId: string) => {

    Onfido.init(
      {
        useWorkflow: true,
        customUI: { colorContentButtonPrimaryText: "#faf7f8" },
        enterpriseFeatures: {
          cobrand: { text: "Skedway" },
          hideOnfidoLogo: true,
          logoCobrand: undefined,
        },
        containerId: 'onfido-mount',
        token: token,
        workflowRunId: wId,
      }
    )

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


  return <div id="onfido-mount"></div>

}


export default Capture