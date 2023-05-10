import texts from "../../_lang";
import { useCallback, useState } from "react";
import ComponentSelect from "../../components/ComponentSelect";
import FaceAutoCapture from "../../components/FaceAutoCapture";
import SuccessSubmit from "../../components/SuccessSubmit";
import styles from "../../styles/index.module.css";
import { Step } from "../../types";
import { ReactComponent as Logo } from "../../assets/icons/Lockup_Logo.svg";
import { ControlEventInstruction, FaceCustomEvent, dispatchControlEvent } from "@innovatrics/dot-face-auto-capture/events";

function RegisterPage() {
  const [step, setStep] = useState<Step>(Step.SELECT_COMPONENT);
  const [photoUrl, setPhotoUrl] = useState<string>();
  const [succededSubmit, setSuccededSubmit] = useState<boolean>(false);

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

  const renderStep = (currentStep: Step) => {
    switch (currentStep) {
      case Step.FACE_CAPTURE:
        return (!succededSubmit) ? (
          <FaceAutoCapture
            onPhotoTaken={handleFaceCapturePhotoTaken}
            onError={handleError}
            photoUrl={photoUrl}
            nextStep={() => setSuccededSubmit(true)}
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

  return (
    <div className={styles.app}>
      <header className={styles.header}>
        <Logo width={238} />
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
