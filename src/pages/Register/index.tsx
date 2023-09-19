import { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"

import useApi from "../../Api"
import { UserInfo } from "../../utils/types/api/UserInfo"
import { isAndroid, isOnWeb } from "../../utils/auxs/getDeviceType"

import FeedBackPage from "../FeedBackPage"
import { StartScreen, CaptureScreen, SuccessScreen } from "../../components/_steps"
import LoadingComponent from "../../components/Loading"


function RegisterPage() {
  const [tokenError, setTokenError] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<null | UserInfo>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [step, setStep] = useState<'start' | 'taking' | 'sending' | 'sendError' | 'success'>('start')

  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const Api = useApi({ token: token as string })

  const startFlow = () => {
    setStep("taking")
  }

  const returnToApp = () => {
    if (isAndroid()) {
      const linkProfundo = 'com.apekbrazil.skedway://home';
      window.location.href = linkProfundo;
    } else {
      // @ts-ignore
      window.webkit.messageHandlers.closeWebView.postMessage('closeWebView');
    }
  }

  const endFlow = () => {
    if (isOnWeb()) window.location.href = window.location.href
    else returnToApp()
  }

  const sendFn = async (blob: Blob) => {
    if (userInfo) {
      setStep('sending')
      const send = await Api.sendPhoto(userInfo?.id, blob)

      if (send.success) setStep('success')
      else setStep('sendError')
    } else setStep('sendError')
  }

  const renderStep = () => {

    switch (step) {
      case "start":
        return <StartScreen laterOn={returnToApp} startFlow={startFlow} />
      case "taking":
        return <CaptureScreen setError={() => setTokenError(true)} sendFn={sendFn} />
      case "sending":
        return <FeedBackPage isError={false} msgType="uploading" />
      case "sendError":
        return <FeedBackPage isError={true} msgType="unknown" />
      case "success":
        return <SuccessScreen endFlow={endFlow} />
    }
  }


  useEffect(() => {
    if (!token) {
      setTokenError(true)
      return
    } else {
      setLoading(true)

      Api.getUserInfo()
        .then((req) => {
          if (req.success) {
            const info = req.info

            setUserInfo(info)
            setLoading(false)
          } else {
            setTokenError(true)
            setLoading(false)
          }
        })
    }
  }, [token])

  return tokenError ? <FeedBackPage isError={true} msgType="unknown" /> :
    loading ? <LoadingComponent /> : renderStep()
}


export default RegisterPage