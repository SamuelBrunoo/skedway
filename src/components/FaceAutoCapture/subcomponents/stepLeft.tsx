import texts from "../../../_lang"
import { FaceComponentData } from "@innovatrics/dot-face-auto-capture/.";
import styles from "../../../styles/index.module.css";
import localStyles from "../styles.module.css";
import FaceCamera from "../../_faceReconComponents/FaceCamera";
import FaceUi from "../../_faceReconComponents/FaceUi";
import { ReactComponent as GreenDegrade } from "../../../assets/degrades/green_degrade.svg";


interface Props {
  photoUrl: undefined | string;
  handlePhotoTaken: (image: Blob, data: FaceComponentData) => void;
  onError: (error: Error) => void;
}

const Stepleft = ({ photoUrl, handlePhotoTaken, onError }: Props) => {
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
        <div className={localStyles.videoCaptureArea}>
          {!photoUrl &&
            <>
              <FaceCamera
                imageType="png"
                cameraFacing="user"
                onPhotoTaken={handlePhotoTaken}
                onError={onError}
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
                    text: texts.other.cameraLabels.loading
                  },
                  waiting: {
                    text: texts.other.cameraLabels.waiting
                  }
                }}
              />
            </>
          }
          {photoUrl &&
            <div className={localStyles.finalImgContainer}>
              <img src={photoUrl} alt="" loading="lazy" />
            </div>
          }
        </div>
      </div>
    </div>
  )
}

export default Stepleft