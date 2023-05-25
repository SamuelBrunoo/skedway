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

function RegisterPage() {
  const [step, setStep] = useState<Step>(Step.SELECT_COMPONENT);
  const [photoUrl, setPhotoUrl] = useState<string>();
  const [succededSubmit, setSuccededSubmit] = useState<boolean>(false);
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null)
  const [companyLogo, setCompanyLogo] =
    useState<string | FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined; }>>(Logo)
  const [userInfo, setUserInfo] = useState<null | UserInfo>(null)

  const Api = useApi()

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

  const submitPhoto = async ():Promise<SendPhotoType> => {
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
          <SuccessSubmit />
        );
      default:
        return <ComponentSelect setStep={setStep} />;
    }
  };

  useEffect(() => {
    Api.getUserInfo().then((info: GetUserInfo | false) => {
      if (info) {
        setUserInfo(info.items[0])
        Api.getCompanyUserInfo().then((data: CompanyUserInfo | false) => {
          if (data) {
            setCompanyLogo(data.company.logo)
          }
        })
      }
    })
  }, [])

  return (
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
    </div>
  );
}

export default RegisterPage;
