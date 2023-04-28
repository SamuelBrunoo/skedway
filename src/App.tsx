import type { FaceCallback } from "@innovatrics/dot-face-auto-capture";
import { useCallback, useState } from "react";
import ComponentSelect from "./components/ComponentSelect";
import FaceAutoCapture from "./components/FaceAutoCapture";
import styles from "./styles/index.module.css";
import { Step } from "./types";
import { ReactComponent as Logo } from "./assets/icons/Lockup_Logo.svg";
import SuccessSubmit from "./components/SuccessSubmit";

function App() {
  const [step, setStep] = useState<Step>(Step.SELECT_COMPONENT);
  const [photoUrl, setPhotoUrl] = useState<string>();
  const [succededSubmit, setSuccededSubmit] = useState<boolean>(false);

  const handlePhotoTaken = <T,>(image: Blob, data: T) => {
    const imageUrl = URL.createObjectURL(image);
    setPhotoUrl(imageUrl);
  };

  const handleFaceCapturePhotoTaken: FaceCallback = (image, data) => {
    handlePhotoTaken(image, data);
  };

  const handleError = useCallback((error: Error) => {
    alert(error);
  }, []);

  const handleBackClick = () => {
    setPhotoUrl(undefined);
    setStep(Step.SELECT_COMPONENT);
  };

  const renderStep = (currentStep: Step) => {
    switch (currentStep) {
      case Step.FACE_CAPTURE:
        return (!succededSubmit) ? (
          <FaceAutoCapture
            onPhotoTaken={handleFaceCapturePhotoTaken}
            onError={handleError}
            photoUrl={photoUrl}
            nextStep={() => setSuccededSubmit(true)}
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
        <a href="/">Privacy Policy</a>
        <a href="/">Term of user</a>
      </footer>
    </div>
  );
}

export default App;
