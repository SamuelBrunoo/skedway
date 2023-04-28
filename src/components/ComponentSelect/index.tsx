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
            <span>Reconhecimento </span>
            <span>facial</span>
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
            Em breve será utilizado o reconhecimento facial para a validação da passagem nos terminais de acesso. Cadastre a sua foto de segurança!
            <br />
            Ela é confidencial e não será compartilhada.
          </p>
          <p className={styles.subDescription}>
            Ao clicar em continuar, você concorda com o armazenamento seguro deste dado pela Skedway para fins de segurança.
          </p>
        </div>
        <div className={styles.buttonsArea}>
          <button className={button.secondary} onClick={() => null}>
            Fechar
          </button>
          <button className={button.primary} onClick={handleFaceClick}>
            <span>PRÓXIMO</span>
            <Arrow width={24} />
          </button>
        </div>
      </div>
    </main>
  );
}

export default ComponentSelect;
