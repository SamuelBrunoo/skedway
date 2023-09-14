import { useState, useEffect } from "react"
import * as S from './styles'
import { useSearchParams } from "react-router-dom"

import useApi from "../../Api"
import { UserInfo } from "../../utils/types/api/UserInfo"
import { isAndroid } from "../../utils/auxs/getDeviceType"

import FeedBackPage from "../FeedBackPage"
import Template from "../../components/_template"
import LoadingDots from "../../components/LoadingDots"
import { StartScreen, CaptureScreen, SuccessScreen } from "../../components/_steps"


function RegisterPage() {
  const [tokenError, setTokenError] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<null | UserInfo>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [step, setStep] = useState<'start' | 'taking' | 'success'>('taking')

  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const Api = useApi({ token: token as string })

  const startFlow = () => {
    setStep("taking")
  }

  const laterOn = () => {
    if (isAndroid()) {
      const linkProfundo = 'com.apekbrazil.skedway://home';
      window.location.href = linkProfundo;
    } else {
      window.webkit.messageHandlers.closeWebView.postMessage('closeWebView');
    }
  }

  const endFlow = () => {

    if (isAndroid()) {
      const linkProfundo = 'com.apekbrazil.skedway://home';
      window.location.href = linkProfundo;
    } else {
      window.webkit.messageHandlers.closeWebView.postMessage('closeWebView');
    }

  }

  const renderStep = () => {

    switch (step) {
      case "start":
        return <StartScreen
          laterOn={laterOn}
          startFlow={startFlow}
        />
        break;
      case "taking":
        return <CaptureScreen />
        break;
      case "success":
        return <SuccessScreen
          endFlow={endFlow}
        />
        break;
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

  return (tokenError) ? (
    <FeedBackPage isError={true} msgType="unknown" />
  ) : (loading) ? (
    <Template type="greenPurple">
      <S.Content>
        <S.LoadingContainer>
          <LoadingDots />
        </S.LoadingContainer>
      </S.Content>
    </Template>
  ) : renderStep()
}


export default RegisterPage