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

function RegisterPage() {
  const [step, setStep] = useState<Step>(Step.SELECT_COMPONENT);
  const [photoUrl, setPhotoUrl] = useState<string>();
  const [succededSubmit, setSuccededSubmit] = useState<boolean>(false);
  const [photoBlob, setPhotoBlob] = useState<Blob | null>(null)
  const [companyLogo, setCompanyLogo] =
    useState<string | FunctionComponent<SVGProps<SVGSVGElement> & { title?: string | undefined; }>>(Logo)

  const Api = useApi()

  const handlePhotoTaken = <T,>(image: Blob, data: T) => {
    const imageUrl = URL.createObjectURL(image);
    setPhotoUrl(imageUrl);
  };

  const handleFaceCapturePhotoTaken = (image: Blob, data: any) => {
    handlePhotoTaken(image, data);
  };

  const handleError = useCallback((error: Error) => {
    alert(error.message);
  }, []);

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

  const submitPhoto = async () => {
    if (photoBlob) {
      const sendPhoto = await Api.sendPhoto(photoBlob)
      if (sendPhoto.status(200)) {
        setSuccededSubmit(true)
      }
    }
  }

  const renderStep = (currentStep: Step) => {
    switch (currentStep) {
      case Step.FACE_CAPTURE:
        return (!succededSubmit) ? (
          <FaceAutoCapture
            onPhotoTaken={handleFaceCapturePhotoTaken}
            onError={handleError}
            photoUrl={photoUrl}
            nextStep={submitPhoto}
            lateronFn={handleBackClick}
            handleContinueDetection={handleContinueDetection}
          />
        ) : (
          <SuccessSubmit />
        );
      default:
        return <ComponentSelect setStep={setStep} />;
    }
  };

  useEffect(() => {
    Api.getCompanyInfo().then(info => {
      const logoSrc = info.items[0].pictureUrl
      if (logoSrc) setCompanyLogo(logoSrc)
    })
  }, [])

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        {typeof (companyLogo) === "string" &&
          <img src={companyLogo} alt="" />
        }
        {!(typeof (companyLogo) === "string") &&
          <Logo width={238} />
        }

      </header>
      {renderStep(step)}
      <footer className={styles.footer}>
        <a href="/">{texts.footer.register.privacy}</a>
        <a href="/">{texts.footer.register.terms}</a>
      </footer>
    </div>
  );
}

export default RegisterPage;
