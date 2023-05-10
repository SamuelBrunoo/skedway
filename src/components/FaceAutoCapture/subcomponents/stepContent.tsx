import texts from "../../../_lang";
import styles from "../../../styles/index.module.css";
import localStyles from ".././styles.module.css";
import buttonStyles from "../../../styles/button.module.css";
import { ReactComponent as OrangeDegrade } from "../../../assets/degrades/orange_degrade.svg";
import { ReactComponent as Lamp } from "../../../assets/icons/lamp.svg";
import { ReactComponent as Face } from "../../../assets/icons/face.svg";
import { ReactComponent as Block } from "../../../assets/icons/block.svg";
import { ReactComponent as FaceSkewed } from "../../../assets/icons/face_skewed.svg";
import { ReactComponent as Arrow } from "../../../assets/icons/Arrow_right_1.svg";

interface Props {
  handleNextStep: () => void;
  lateronFn: () => void;
  isAlreadyTaked?: boolean;
  handleTakeAnother?: () => void;
}

const StepContent = ({ handleNextStep, lateronFn, isAlreadyTaked, handleTakeAnother }: Props) => {
  return (
    <div className={`${styles.stepContent} ${localStyles.stepContent}`}>
      <div className={localStyles.backColors}>
        <div className={localStyles.grey} />
        <OrangeDegrade />
      </div>
      <div className={localStyles.box}>
        <h2>
          <span>{texts.other.systemTitle.spanOne} </span>
          <span>{texts.other.systemTitle.spanTwo}</span>
        </h2>
        <p className={localStyles.description}>
          {window.document.body.clientWidth > 840 &&
            texts.stepTwo.description.others
          }
          {window.document.body.clientWidth <= 840 &&
            texts.stepTwo.description.mobile
          }
        </p>
        {window.document.body.clientWidth > 840 &&
          <h3>{texts.stepTwo.tipsTitle}</h3>
        }
        <ul className={localStyles.tipsList}>
          <li>
            <Lamp />
            <span>{texts.stepTwo.tips.one}</span>
          </li>
          <li>
            <Face />
            <span>{texts.stepTwo.tips.two}</span>
          </li>
          <li>
            <Block />
            <span>{texts.stepTwo.tips.three}</span>
          </li>
          <li>
            <FaceSkewed className={localStyles.skewedFace} />
            <span>{texts.stepTwo.tips.four}</span>
          </li>
        </ul>
        {window.document.body.clientWidth <= 840 &&
          <p className={localStyles.reminderMessage}>
            {texts.stepTwo.mobileReminder}
          </p>
        }
      </div>
      <div className={styles.buttonsArea}>
        {isAlreadyTaked !== undefined && isAlreadyTaked === false &&
          <button className={buttonStyles.secondary} onClick={lateronFn}>
            {texts.other.buttons.later}
          </button>
        }
        {isAlreadyTaked &&
          <button className={buttonStyles.secondary} onClick={handleTakeAnother}>
            {texts.other.buttons.take_another}
          </button>
        }
        <button className={buttonStyles.primary} onClick={handleNextStep}>
          <span>{texts.other.buttons.next.toUpperCase()}</span>
          <Arrow width={24} />
        </button>
      </div>
    </div>
  )
}

export default StepContent