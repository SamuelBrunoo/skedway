import texts from "../../_lang"
import styles from "../../styles/index.module.css";
import localStyles from "./styles.module.css";
import button from "../../styles/button.module.css";
import { ReactComponent as GreenDegrade } from "../../assets/degrades/green_degrade.svg";
import { ReactComponent as PurpleDegrade } from "../../assets/degrades/purple_degrade.svg";
import { ReactComponent as FaceZoneIcon } from "../../assets/icons/facezone.svg";


type Props = {
  onFinish: () => void;
}

function SuccessSubmit({ onFinish }: Props) {
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
            <span>
              {texts.stepThree.successMsg.one}
              <br />
              {texts.stepThree.successMsg.break ?
                <>
                  {`${texts.stepThree.successMsg.break} `}
                </>
                : ''
              }
            </span>
            <span>{texts.stepThree.successMsg.two}</span>
          </h1>
          <p className={localStyles.confirmationMessage}>
            {texts.stepThree.confirmation}
          </p>
        </div>
      </div>
      <div className={`${localStyles.stepContent} ${localStyles.stepContent}`}>
        <div className={localStyles.box}>
          <p className={localStyles.instructions}>
            {texts.stepThree.instructions.one}
            <br /><br />
            {texts.stepThree.instructions.two}
            <br /><br />
            {texts.stepThree.instructions.three}
          </p>
        </div>
        <div className={styles.buttonsArea}>
          <button className={button.secondary} onClick={onFinish}>
            <span>{texts.other.buttons.close.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default SuccessSubmit;
