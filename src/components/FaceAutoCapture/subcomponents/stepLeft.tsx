import texts from "../../../_lang"
import { FaceComponentData } from "@innovatrics/dot-face-auto-capture/.";
import styles from "../../../styles/index.module.css";
import localStyles from "../styles.module.css";
import FaceCamera from "../../_faceReconComponents/FaceCamera";
import FaceUi from "../../_faceReconComponents/FaceUi";
import { ReactComponent as GreenDegrade } from "../../../assets/degrades/green_degrade.svg";
import { useEffect, useRef, useState } from "react";
import LoadingComponent from "../../Loading";
import { ErrorTypes } from "../../../types/error";
import ErrorComponent from "../../ErrorComponent";


interface Props {
  photoUrl: undefined | string;
  handlePhotoTaken: (image: Blob, data: FaceComponentData) => void;
  onError: (error: Error) => void;
  reloadCount: number;
  error: null | ErrorTypes;
  previewImageRef: React.MutableRefObject<HTMLImageElement | null>;
}

const Stepleft = ({ photoUrl, handlePhotoTaken, onError, reloadCount, error, previewImageRef }: Props) => {

  const videoareaRef = useRef(null)
  const [showingLoading, setShowingLoading] = useState(true)

  useEffect(() => {
    const el = videoareaRef.current
    if (el) {
      const changeOpacity = () => {
        (el as HTMLElement).classList.toggle('notShowing')
      }
      setShowingLoading(true)
      changeOpacity()

      setTimeout(() => {
        setShowingLoading(false)
        changeOpacity()
      }, 3000)
    }
  }, [reloadCount])


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
              <FaceCamera
                imageType="png"
                cameraFacing="user"
                onPhotoTaken={handlePhotoTaken}
                onError={onError}
                thresholds={{
                  minFaceSizeRatio: 3 / 4
                }}
              />
              <FaceUi
                instructions={{
                  brightness_too_high: texts.other.cameraLabels.brightness_too_high,
                  brightness_too_low: texts.other.cameraLabels.brightness_too_low,
                  candidate_selection: texts.other.cameraLabels.candidate_selection,
                  face_centering: texts.other.cameraLabels.face_centering,
                  face_not_present: texts.other.cameraLabels.face_not_present,
                  face_too_close: texts.other.cameraLabels.face_too_close,
                  face_too_far: texts.other.cameraLabels.face_too_far,
                  sharpness_too_low: texts.other.cameraLabels.sharpness_too_low
                }}
                appStateInstructions={{
                  loading: {
                    text: texts.other.cameraLabels.loading,
                    visible: false
                  },
                  waiting: {
                    text: texts.other.cameraLabels.waiting,
                    visible: false
                  }
                }}
                theme={{
                  colors: {
                    placeholderColor: 'white',
                    instructionTextColor: 'white',
                    instructionColor: 'transparent',
                    instructionColorSuccess: 'green',
                    placeholderColorSuccess: 'green'
                  }
                }}
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