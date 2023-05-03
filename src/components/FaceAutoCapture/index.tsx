import type {
  FaceCallback,
  FaceComponentData,
} from "@innovatrics/dot-face-auto-capture";
import {
  dispatchControlEvent,
  FaceCustomEvent,
  ControlEventInstruction,
} from "@innovatrics/dot-face-auto-capture/events";
import { useState } from "react";
import styles from "../../styles/index.module.css";
import localStyles from "./styles.module.css";
import buttonStyles from "../../styles/button.module.css";
import { ReactComponent as Arrow } from "../../assets/icons/Arrow_right_1.svg";
import Stepleft from "./subcomponents/stepLeft";
import StepContent from "./subcomponents/stepContent";

interface Props {
  onPhotoTaken: FaceCallback;
  onError: (error: Error) => void;
  photoUrl: undefined | string;
  nextStep: () => void;
}

function FaceAutoCapture({ onPhotoTaken, onError, photoUrl, nextStep }: Props) {
  const [captionOnMobile, setCaptionOnMobile] = useState<boolean>(false)

  const handlePhotoTaken = (image: Blob, data: FaceComponentData) => {
    onPhotoTaken(image, data);
  };

  const handleNextStep = () => {
    if (window.document.body.clientWidth > 420) {
      if (photoUrl) nextStep();
    } else {
      if (captionOnMobile && photoUrl) nextStep()
      else setCaptionOnMobile(true)
    }
  }

  const handleContinueDetection = () => {
    dispatchControlEvent(
      FaceCustomEvent.CONTROL,
      ControlEventInstruction.CONTINUE_DETECTION
    );

  };


  return (
    <main className={styles.main}>
      {window.document.body.clientWidth > 420 &&
        <>
          <Stepleft
            handlePhotoTaken={onPhotoTaken}
            onError={onError}
            photoUrl={photoUrl}
          />

          <StepContent handleNextStep={handleNextStep} />
        </>
      }

      {window.document.body.clientWidth <= 420 && captionOnMobile &&
        <>
          <Stepleft
            handlePhotoTaken={onPhotoTaken}
            onError={onError}
            photoUrl={photoUrl}
          />
          <div className={`${styles.stepContent} ${localStyles.stepContent}`}>
            <div className={styles.buttonsArea}>
              <button className={`${buttonStyles.secondary} ${localStyles.cancelButton}`} onClick={() => null}>
                Cancelar
              </button>
              <button className={buttonStyles.primary} onClick={handleNextStep}>
                <span>PRÓXIMO</span>
                <Arrow width={24} />
              </button>
            </div>
          </div>
        </>
      }

      {window.document.body.clientWidth <= 420 && !captionOnMobile &&
        <StepContent handleNextStep={handleNextStep} />
      }

    </main >
  );
}

export default FaceAutoCapture;
