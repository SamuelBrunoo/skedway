import texts from "../../../_lang"
import styles from "../../../styles/index.module.css";
import localStyles from "../styles.module.css";
import { ReactComponent as GreenDegrade } from "../../../assets/degrades/green_degrade.svg";
import { useEffect, useRef, useState } from "react";
import LoadingComponent from "../../Loading";
import { ErrorTypes } from "../../../types/error";
import ErrorComponent from "../../ErrorComponent";
import FaceApiCapture from "../../FaceApiCapture";


interface Props {
  photoUrl: undefined | string;
  handlePhotoTaken: (image: Blob) => void;
  onError: (error: Error) => void;
  reloadCount: number;
  error: null | ErrorTypes;
  previewImageRef: React.MutableRefObject<HTMLImageElement | null>;
  isCapted: boolean;
  showingCircle: boolean;
  setIsCapted: React.Dispatch<React.SetStateAction<boolean>>;
  setCircle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Stepleft = ({
  photoUrl,
  handlePhotoTaken,
  onError,
  reloadCount,
  error,
  previewImageRef,
  isCapted,
  setIsCapted,
  showingCircle,
  setCircle,
}: Props) => {

  const videoareaRef = useRef(null)
  const [showingLoading, setShowingLoading] = useState(true)

  useEffect(() => {
    const el = videoareaRef.current
    if (el) {
      if (showingLoading) {
        (el as HTMLElement).classList.add('notShowing')
      }
      if (!showingLoading) {
        (el as HTMLElement).classList.remove('notShowing')
      }
    }

  }, [showingLoading])


  return (
    <div className={localStyles.stepLeft}>
      {window.document.body.clientWidth <= 840 &&
        <h1>
          <span>{texts.other.systemTitle.spanOne} </span>
          <span>{texts.other.systemTitle.spanTwo}</span>
        </h1>
      }
      <GreenDegrade width={485} height={225} className={localStyles.green_degrade} />
      <div className={`${styles.stepLeftBackSquare} ${localStyles.stepLeftBackSquare}`}>
        <div className={`${localStyles.videoCaptureArea} notShowing`} ref={videoareaRef}>
          {!photoUrl && error === null &&
            <>
              <FaceApiCapture
                onError={onError}
                handlePhotoTaken={handlePhotoTaken}
                setLoading={setShowingLoading}
                isCapted={isCapted}
                setIsCapted={setIsCapted}
                showingCircle={showingCircle}
                setCircle={setCircle}
              />

              {showingLoading &&
                <div className={localStyles.loadingArea}>
                  <LoadingComponent />
                </div>
              }
            </>
          }
          <div className={localStyles.finalImgContainer} style={{ display: photoUrl ? "flex" : "none" }}>
            <img src={photoUrl} alt="" loading="lazy" id="previewImage" ref={previewImageRef} />
          </div>
          {error !== null && !photoUrl &&
            <div className={localStyles.finalImgContainer}>
              <ErrorComponent
                type={error}
                refreshAction={() => window.document.location.href = window.document.location.href}
              />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Stepleft