import texts from "../../_lang"
import { useCallback, useState } from "react";
import styles from "../../styles/index.module.css";
import localStyles from "./styles.module.css";
import buttonStyles from "../../styles/button.module.css";
import { ReactComponent as Arrow } from "../../assets/icons/Arrow_right_1.svg";
import Stepleft from "./subcomponents/stepLeft";
import StepContent from "./subcomponents/stepContent";
import LoadingComponent from "../Loading";
import { ErrorTypes } from "../../types/error";
import { SendPhotoType } from "../../types/api/SendPhoto";

interface Props {
  onPhotoTaken: <T>(image: Blob, data: T) => void;
  photoUrl: undefined | string;
  nextStep: () => Promise<SendPhotoType>;
  lateronFn: () => void;
  handleContinueDetection: () => void;
  deletePhotoUrl: () => void;
}

function FaceAutoCapture({ onPhotoTaken, photoUrl, nextStep, lateronFn, handleContinueDetection, deletePhotoUrl }: Props) {
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
        const send = await nextStep()
        if (send.success === false) {
          setError(send.error)
          setPhotoData(null)
          deletePhotoUrl()
          setSendingPhoto(false)
        }
      }
    } else {
      if (captionOnMobile && photoUrl) {
        setSendingPhoto(true)
        const send = await nextStep()
        if (send.success === false) {
          setError(send.error)
          setPhotoData(null)
          deletePhotoUrl()
          setSendingPhoto(false)
        }
      }
      else setCaptionOnMobile(true)
    }
  }

  const handleTakeAnother = () => {
    setPhotoData(null)
    setError(null)
    handleContinueDetection()
    setReloadCount(Number(reloadCount) + 1)
  };

  const handleError = (e: Error) => {
    setError('generic')
  }


  return !sendingPhoto ? (
    <main className={`${styles.main} ${localStyles.main} ${window.document.body.clientWidth <= 840 && captionOnMobile ? 'showingPhoto' : ''
      }`}>
      {window.document.body.clientWidth > 840 &&
        <>
          <Stepleft
            handlePhotoTaken={handlePhotoData}
            onError={e => handleError(e)}
            photoUrl={photoUrl}
            reloadCount={reloadCount}
            error={error}
          />

          <StepContent
            handleNextStep={handleNextStep}
            lateronFn={lateronFn}
            isAlreadyTaked={photoUrl !== undefined}
            theresAnError={error !== null}
            handleTakeAnother={handleTakeAnother}
          />
        </>
      }

      {window.document.body.clientWidth <= 840 && captionOnMobile &&
        <>
          <Stepleft
            handlePhotoTaken={onPhotoTaken}
            onError={e => handleError(e)}
            photoUrl={photoUrl}
            reloadCount={reloadCount}
            error={error}
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
