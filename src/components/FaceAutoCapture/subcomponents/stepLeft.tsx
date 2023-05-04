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
          <span>Reconhecimento </span>
          <span>facial</span>
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
              <FaceUi />
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