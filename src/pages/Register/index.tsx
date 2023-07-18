import { useState, useEffect, useRef } from "react";
import texts from "../../_lang";
import { UserInfo } from "../../types/api/UserInfo";
import { SendPhotoType } from "../../types/api/SendPhoto";
import { ErrorTypes } from "../../types/error";
import { Step } from "../../types";
import styles from "../../styles/index.module.css";
import { ControlEventInstruction, FaceCustomEvent, dispatchControlEvent } from "@innovatrics/dot-face-auto-capture/events";
import { useSearchParams } from "react-router-dom";
import useApi from "../../Api";

import ErrorPage from "../ErrorPage";
import LoadingComponent from "../../components/Loading";
import ComponentSelect from "../../components/ComponentSelect";
import FaceAutoCapture from "../../components/FaceAutoCapture";
import SuccessSubmit from "../../components/SuccessSubmit";
import renderLogo from "../../consts/auxs/renderLogo";

function RegisterPage() {
  const [pageError, setPageError] = useState<'token' | 'generic' | null>(null)
  const [step, setStep] = useState<Step>(Step.SELECT_COMPONENT);
  const [photoUrl, setPhotoUrl] = useState<string | undefined>();
  const [succededSubmit, setSuccededSubmit] = useState<boolean>(false);
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null)
  const [userInfo, setUserInfo] = useState<null | UserInfo>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const previewImageRef = useRef<HTMLImageElement | null>(null)

  function laterFunction() {
    window.webkit.messageHandlers.closeWebView.postMessage('closeWebView');
  }

  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const Api = useApi({ token: token as string })

  const handlePhotoTaken = <T,>(image: Blob, data: T) => {
    const imageUrl = URL.createObjectURL(image)
    setPhotoUrl(imageUrl)
    setPhotoBlob(image)
  };

  const handleFaceCapturePhotoTaken = (image: Blob, data?: any) => {
    handlePhotoTaken(image, data);
  };

  const handleBackClick = () => {
    setPhotoUrl(undefined);
    setStep(Step.SELECT_COMPONENT);
  };

  const handleContinueDetection = () => {
    dispatchControlEvent(
      FaceCustomEvent.CONTROL,
      ControlEventInstruction.CONTINUE_DETECTION
    );
    setPhotoUrl(undefined);

  }

  const submitPhoto = async (): Promise<SendPhotoType> => {


    if (photoBlob && userInfo !== null) {
      const sendPhoto = await Api.sendPhoto(userInfo.id)
      if (sendPhoto.success) {
        setSuccededSubmit(true)
        return sendPhoto
      }
      return sendPhoto
    }
    return { success: false, error: 'generic' as ErrorTypes }
  }

  const handleFinish = () => {
    setPhotoUrl(undefined);
    setStep(Step.SELECT_COMPONENT);
    setSuccededSubmit(false)
    setPhotoBlob(null)

    window.webkit.messageHandlers.closeWebView.postMessage('closeWebView');
  }

  const renderStep = (currentStep: Step) => {
    switch (currentStep) {
      case Step.FACE_CAPTURE:
        return (!succededSubmit) ? (
          <FaceAutoCapture
            onPhotoTaken={handleFaceCapturePhotoTaken}
            photoUrl={photoUrl}
            nextStep={submitPhoto}
            lateronFn={handleBackClick}
            handleContinueDetection={handleContinueDetection}
            deletePhotoUrl={() => setPhotoUrl(undefined)}
            laterFunction={laterFunction}
            previewImageRef={previewImageRef}
          />
        ) : (
          <SuccessSubmit
            onFinish={handleFinish}
          />
        );
      default:
        return <ComponentSelect
          setStep={setStep}
          laterFunction={laterFunction}
        />;
    }
  };

  useEffect(() => {
    if (!token) {
      setPageError("token")
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
            setPageError("token")
            setLoading(false)
          }
        })
    }
  }, [token])

  return (pageError) ? (
    <ErrorPage error={(pageError === "token") ? 'accessDenied' : 'generic'} />
  ) : (loading) ? (
    <div className={styles.loadingContainer}>
      <LoadingComponent />
    </div>
  ) : (
    <div className={styles.app}>
      <header className={styles.header}>
        {userInfo && renderLogo(userInfo.company.logo)}
      </header>
      {renderStep(step)}
      <footer className={styles.footer}>
        <a href={`https://skedway.com/${texts.langPattern}/privacy`} target="_blank" >
          {texts.footer.register.privacy}
        </a>
        <a href={`https://skedway.com/${texts.langPattern}/terms`} target="_blank" >
          {texts.footer.register.terms}
        </a>
      </footer>
    </div >
  );
}

export default RegisterPage;
