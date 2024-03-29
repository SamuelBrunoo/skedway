import { useState, useEffect } from "react"
import { useLoaderData, useSearchParams } from "react-router-dom"

import useApi from "../../Api"
import { UserInfo } from "../../utils/types/api/UserInfo"

import FeedBackPage from "../FeedBackPage"
import {
  StartScreen,
  CaptureScreen,
  SuccessScreen,
} from "../../components/_steps"
import LoadingComponent from "../../components/Loading"

function RegisterPage() {
  const loaderInfo = useLoaderData()

  const [tokenError, setTokenError] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<null | UserInfo>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [step, setStep] = useState<
    "start" | "taking" | "sending" | "sendError" | "success"
  >("start")

  const [searchParams] = useSearchParams()
  const token = searchParams.get("token")

  const Api = useApi({ token: token as string })

  const startFlow = () => {
    setStep("taking")
  }

  const refreshPage = () => {
    window.location.href = window.location.href
  }

  const returnToApp = () => {
    // @ts-ignore
    if (loaderInfo.native === "Android") {
      const linkProfundo = "com.apekbrazil.skedway://home"
      window.location.href = linkProfundo
    } else {
      // @ts-ignore
      window.webkit.messageHandlers.closeWebView.postMessage("closeWebView")
    }
  }

  const endFlow = () => {
    const referrer = document.referrer

    // @ts-ignore
    if (loaderInfo.isNativeMobile) returnToApp()
    else window.location.href = referrer
  }

  const restartFlow = () => {
    startFlow()
  }

  const sendFn = async (blob: Blob, userId: string) => {
    if (userInfo) {
      setStep("sending")
      const send = await Api.sendPhoto(userInfo?.id, blob)

      if (send.success) {
        Api.deleteOnfidoUser(userId)
        setStep("success")
      } else setStep("sendError")
    } else setStep("sendError")
  }

  const setError = (type?: string) => {
    if (type === "sendError") setStep("sendError")
    else setTokenError(true)
  }

  const renderStep = () => {
    switch (step) {
      case "start":
        return <StartScreen laterOn={endFlow} startFlow={startFlow} />
      case "taking":
        return <CaptureScreen setError={setError} sendFn={sendFn} restartFlow={restartFlow} />
      case "sending":
        return <FeedBackPage isError={false} msgType="uploading" />
      case "sendError":
        return (
          <FeedBackPage
            isError={true}
            msgType="sendError"
            startFlow={startFlow}
          />
        )
      case "success":
        return <SuccessScreen endFlow={endFlow} />
    }
  }

  useEffect(() => {
    if (!token) {
      setTokenError(true)
      return
    } else {
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
        .catch(() => {
          setTokenError(true)
        })
    }
  }, [token])

  return tokenError ? (
    <FeedBackPage isError={true} msgType="unknown" startFlow={refreshPage} />
  ) : loading ? (
    <LoadingComponent />
  ) : (
    renderStep()
  )
}

export default RegisterPage
