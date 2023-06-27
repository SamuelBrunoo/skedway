import texts from "../../_lang";
import { Step } from "../../types";
import button from "../../styles/button.module.css";
import styles from "../../styles/index.module.css";
import localStyles from "./styles.module.css";
import StepOnePerson from "../../assets/images/step_one_person.png";
import { ReactComponent as FaceZoneIcon } from "../../assets/icons/facezone.svg";
import { ReactComponent as GreenDegrade } from "../../assets/degrades/green_degrade.svg";
import { ReactComponent as PurpleDegrade } from "../../assets/degrades/purple_degrade.svg";
import { ReactComponent as Arrow } from "../../assets/icons/Arrow_right_1.svg";

interface Props {
  setStep: (step: Step) => void;
}

function ComponentSelect({ setStep }: Props) {
  const handleFaceClick = () => {
    setStep(Step.FACE_CAPTURE);
  };

  return (
    <main className={styles.main}>
      <div className={styles.stepLeft}>
        <div className={styles.stepLeftBackSquare}>
          <h1>
            <span>{texts.other.systemTitle.spanOne} </span>
            <span>{texts.other.systemTitle.spanTwo}</span>
          </h1>
        </div>
        <div className={localStyles.faceZone}>
          <FaceZoneIcon width={57} className={localStyles.faceZoneIcon} />
        </div>
        <img src={StepOnePerson} alt="" />
        <GreenDegrade width={485} className={styles.green_degrade} />
        <PurpleDegrade width={485} className={styles.purple_degrade} />
      </div>
      <div className={styles.stepContent}>
        <div className={styles.texts}>
          <p className={styles.description}>
            {window.document.body.clientWidth > 600 &&
              <>
                {texts.stepOne.serviceDesc.others.one}
                <br />
                {texts.stepOne.serviceDesc.others.two}
              </>
            }
            {window.document.body.clientWidth <= 600 &&
              <>
                {texts.stepOne.serviceDesc.mobile.one}
                <br />
                {texts.stepOne.serviceDesc.mobile.two}
                <br />
                {texts.stepOne.serviceDesc.mobile.three}
              </>
            }
          </p>
          <p className={styles.subDescription}>
            {texts.stepOne.serviceSubDes}
          </p>
        </div>
        <div className={styles.buttonsArea}>
          <button className={button.secondary} onClick={() => null}>
            {texts.other.buttons.close}
          </button>
          <button className={button.primary} onClick={handleFaceClick}>
            <span>{texts.other.buttons.next.toUpperCase()}</span>
            <Arrow width={24} />
          </button>
        </div>
      </div>
    </main>
  );
}

export default ComponentSelect;
