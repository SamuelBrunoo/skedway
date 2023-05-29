import texts from "../../_lang";
import { FunctionComponent, SVGProps, useCallback, useEffect, useState } from "react";
import ComponentSelect from "../../components/ComponentSelect";
import FaceAutoCapture from "../../components/FaceAutoCapture";
import SuccessSubmit from "../../components/SuccessSubmit";
import styles from "../../styles/index.module.css";
import { Step } from "../../types";
import { ReactComponent as Logo } from "../../assets/icons/Lockup_Logo.svg";
import { ControlEventInstruction, FaceCustomEvent, dispatchControlEvent } from "@innovatrics/dot-face-auto-capture/events";
import useApi from "../../Api";
import { GetUserInfo, Item as UserInfo } from "../../types/api/UserInfo";
import { CompanyUserInfo } from "../../types/api/Company";
import { SendPhotoType } from "../../types/api/SendPhoto";
import { ErrorTypes } from "../../types/error";
import { useSearchParams } from "react-router-dom";
import ErrorPage from "../ErrorPage";
import { UserAndCompany } from "../../types/api/UserAndCompany";
import LoadingComponent from "../../components/Loading";

function RegisterPage() {
  const [pageError, setPageError] = useState<'token' | 'generic' | null>(null)
  const [step, setStep] = useState<Step>(Step.SELECT_COMPONENT);
  const [photoUrl, setPhotoUrl] = useState<string>();
  const [succededSubmit, setSuccededSubmit] = useState<boolean>(false);
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null)
  const [companyLogo, setCompanyLogo] =
    useState<string | FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined; }>>(Logo)
  const [userInfo, setUserInfo] = useState<null | UserInfo>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const Api = useApi({ token: token as string })

  const handlePhotoTaken = <T,>(image: Blob, data: T) => {
    const imageUrl = URL.createObjectURL(image);
    setPhotoUrl(imageUrl);
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
      const sendPhoto = await Api.sendPhoto(userInfo.id, photoBlob)
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
          />
        ) : (
          <SuccessSubmit
            onFinish={handleFinish}
          />
        );
      default:
        return <ComponentSelect setStep={setStep} />;
    }
  };

  useEffect(() => {
    if (!token) {
      setPageError("token")
      return
    } else {
      setLoading(true)

      Api.getUserAndCompanyInfo(token)
        .then((info) => {
          if (info.success) {
            setCompanyLogo(info.all?.company.company.logo as string)
            setUserInfo(info.all?.user.items[0] as UserInfo)
            setLoading(false)
          } else {
            setPageError("token")
          }
        })
    }
  }, [])

  return (pageError) ? (
    <ErrorPage error={(pageError === "token") ? 'accessDenied' : 'generic'} />
  ) : (loading) ? (
    <div className={styles.loadingContainer}>
      <LoadingComponent />
    </div>
  ) : (
    <div className={styles.app}>
      <header className={styles.header}>
        {typeof (companyLogo) === "string" &&
          <img src={companyLogo} alt="" width={238} />
        }
        {!(typeof (companyLogo) === "string") &&
          <Logo width={238} />
        }

      </header>
      {renderStep(step)}
      <footer className={styles.footer}>
        <a
          href={`https://skedway.com/${texts.langPattern}/privacy`}
          target="_blank"
        >
          {texts.footer.register.privacy}
        </a>
        <a
          href={`https://skedway.com/${texts.langPattern}/terms`}
          target="_blank"
        >
          {texts.footer.register.terms}
        </a>
      </footer>
    </div >
  );
}

export default RegisterPage;
