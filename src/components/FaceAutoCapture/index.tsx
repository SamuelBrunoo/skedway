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
import FaceCamera from "../FaceCamera";
import FaceUi from "../FaceUi";
import { ReactComponent as GreenDegrade } from "../../assets/degrades/green_degrade.svg";
import { ReactComponent as OrangeDegrade } from "../../assets/degrades/orange_degrade.svg";
import { ReactComponent as Lamp } from "../../assets/icons/lamp.svg";
import { ReactComponent as Face } from "../../assets/icons/face.svg";
import { ReactComponent as Block } from "../../assets/icons/block.svg";
import { ReactComponent as FaceSkewed } from "../../assets/icons/face_skewed.svg";
import { ReactComponent as Arrow } from "../../assets/icons/Arrow_right_1.svg";

interface Props {
  onPhotoTaken: FaceCallback;
  onError: (error: Error) => void;
  photoUrl: undefined | string;
  nextStep: () => void;
}

function FaceAutoCapture({ onPhotoTaken, onError, photoUrl, nextStep }: Props) {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [photoInfo, setPhotoInfo] = useState<null | { image: Blob, data: FaceComponentData }>(null)

  const handlePhotoTaken = (image: Blob, data: FaceComponentData) => {
    setIsButtonDisabled(false);
    onPhotoTaken(image, data);
  };

  const handleNextStep = () => {
    if (photoUrl) nextStep();
  }

  const handleContinueDetection = () => {
    dispatchControlEvent(
      FaceCustomEvent.CONTROL,
      ControlEventInstruction.CONTINUE_DETECTION
    );

    setIsButtonDisabled(true);
  };
  return (


    <main className={styles.main}>
      <div className={localStyles.stepLeft}>
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
      <div className={`${styles.stepContent} ${localStyles.stepContent}`}>
        <div className={localStyles.backColors}>
          <div className={localStyles.grey} />
          <OrangeDegrade />
        </div>
        <div className={localStyles.box}>
          <h2>
            <span>Reconhecimento </span>
            <span>facial</span>
          </h2>
          <p className={localStyles.description}>
            Mais praticidade na passagem dos acessos. Essa foto será utilizada para a sua identificação no terminal e será tratada como um documento.
          </p>
          <h3>Dicas para uma boa foto</h3>
          <ul className={localStyles.tipsList}>
            <li>
              <Lamp />
              <span>Encontre um local claro.</span>
            </li>
            <li>
              <Face />
              <span>Certifique-se que seu rosto esteja iluminado.</span>
            </li>
            <li>
              <Block />
              <span>Não use óculos de sol, bonés, mascaras ou qualquer acessório que cubra o rosto.</span>
            </li>
            <li>
              <FaceSkewed className={localStyles.skewedFace} />
              <span>Não faça poses nem caretas ao bater a foto.</span>
            </li>
          </ul>
        </div>
        <div className={styles.buttonsArea}>
          <button className={buttonStyles.secondary} onClick={() => null}>
            Mais tarde
          </button>
          <button className={buttonStyles.primary} onClick={handleNextStep}>
            <span>PRÓXIMO</span>
            <Arrow width={24} />
          </button>
        </div>
      </div>
    </main>
  );
}

export default FaceAutoCapture;
