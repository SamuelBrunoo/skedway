import texts from "../../_lang"
import { useState } from "react";
import styles from "../../styles/index.module.css";
import localStyles from "./styles.module.css";
import buttonStyles from "../../styles/button.module.css";
import { ReactComponent as Arrow } from "../../assets/icons/Arrow_right_1.svg";
import Stepleft from "./subcomponents/stepLeft";
import StepContent from "./subcomponents/stepContent";
import LoadingComponent from "../Loading";
import api from "../../Api";
import { ErrorTypes } from "../../types/error";

interface Props {
  onPhotoTaken: <T>(image: Blob, data: T) => void;
  onError: (error: Error) => void;
  photoUrl: undefined | string;
  nextStep: () => void;
  lateronFn: () => void;
  handleContinueDetection: () => void;
}

function FaceAutoCapture({ onPhotoTaken, onError, photoUrl, nextStep, lateronFn, handleContinueDetection }: Props) {
  const [captionOnMobile, setCaptionOnMobile] = useState<boolean>(false)
  const [sendingPhoto, setSendingPhoto] = useState(false)
  const [photoData, setPhotoData] = useState<null | Blob>(null)
  const [reloadCount, setReloadCount] = useState<number>(0)
  const [error, setError] = useState<null | ErrorTypes>(null)

  const handlePhotoData = <T,>(image: Blob, data: T) => {
    onPhotoTaken(image, data)
    setPhotoData(image)
  }

  const handleNextStep = async () => {
    if (window.document.body.clientWidth > 840) {
      if (photoUrl && photoData) {
        setSendingPhoto(true)
        const res = await api.sendPhoto(photoData)
        setSendingPhoto(true)
        if (res.success) {
          nextStep()
        } else {
          setError("accessDenied")
        }
      }
    } else {
      if (captionOnMobile && photoUrl) {
        nextStep()
      }
      else setCaptionOnMobile(true)
    }
  }

  const handleTakeAnother = () => {
    handleContinueDetection()
    setPhotoData(null)
    setReloadCount(Number(reloadCount) + 1)
  };


  return !sendingPhoto ? (
    <main className={`${styles.main} ${localStyles.main} ${window.document.body.clientWidth <= 840 && captionOnMobile ? 'showingPhoto' : ''
      }`}>
      {window.document.body.clientWidth > 840 &&
        <>
          <Stepleft
            handlePhotoTaken={handlePhotoData}
            onError={onError}
            photoUrl={photoUrl}
            reloadCount={reloadCount}
          />

          <StepContent
            handleNextStep={handleNextStep}
            lateronFn={lateronFn}
            isAlreadyTaked={photoUrl !== undefined}
            handleTakeAnother={handleTakeAnother}
          />
        </>
      }

      {window.document.body.clientWidth <= 840 && captionOnMobile &&
        <>
          <Stepleft
            handlePhotoTaken={onPhotoTaken}
            onError={onError}
            photoUrl={photoUrl}
            reloadCount={reloadCount}
          />
          <div className={`${styles.stepContent} ${localStyles.stepContent}`}>
            <div className={`${styles.buttonsArea} ${localStyles.buttonsArea}`}>
              <button
                className={`${buttonStyles.secondary} ${localStyles.cancelButton}`}
                onClick={handleTakeAnother}
              >
                {texts.other.buttons.take_another}
              </button>
              <button className={buttonStyles.primary} onClick={handleNextStep}>
                <span>{texts.other.buttons.next.toUpperCase()}</span>
                <Arrow width={24} />
              </button>
            </div>
          </div>
        </>
      }

      {window.document.body.clientWidth <= 840 && !captionOnMobile &&
        <StepContent handleNextStep={handleNextStep} lateronFn={lateronFn} />
      }

    </main >
  ) : (
    <LoadingComponent />
  );
}

export default FaceAutoCapture;
