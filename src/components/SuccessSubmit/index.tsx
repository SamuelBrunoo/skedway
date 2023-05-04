import styles from "../../styles/index.module.css";
import localStyles from "./styles.module.css";
import button from "../../styles/button.module.css";
import { ReactComponent as GreenDegrade } from "../../assets/degrades/green_degrade.svg";
import { ReactComponent as PurpleDegrade } from "../../assets/degrades/purple_degrade.svg";
import { ReactComponent as FaceZoneIcon } from "../../assets/icons/facezone.svg";


function SuccessSubmit() {
  return (
    <main className={`${styles.main} ${localStyles.main}`}>
      <div className={localStyles.stepLeft}>
        <GreenDegrade width={390} height={150} className={localStyles.green_degrade} />
        <PurpleDegrade width={534} height={197} className={localStyles.purple_degrade} />
        <div className={localStyles.leftContent}>
          <div className={localStyles.faceZone}>
            <FaceZoneIcon width={57} className={localStyles.faceZoneIcon} />
          </div>
          <h1>
            <span>Foto cadastrada<br />com </span>
            <span>sucesso!</span>
          </h1>
          <p className={localStyles.confirmationMessage}>
            Você já pode fazer sua validação nos  terminais de acesso com seu rosto
          </p>
        </div>
      </div>
      <div className={`${localStyles.stepContent} ${localStyles.stepContent}`}>
        <div className={localStyles.box}>
          <p className={localStyles.instructions}>
            Apresente-se ao terminal e siga as etapas de validação.
            <br /><br />
            O reconhecimento facial é uma forma segura e passiva de validacão, sem necessitar de interação, contudo, caso tenha algum problama você poderá validar seu acesso com seu ID Digital (QR Code)
            <br /><br />
            Caso o problema persista, por gentileza contato um administrador.
          </p>
        </div>
        <div className={styles.buttonsArea}>
          <button className={button.secondary} onClick={() => null}>
            <span>FECHAR</span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default SuccessSubmit;
