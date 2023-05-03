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
}

const StepContent = ({ handleNextStep }: Props) => {
  return (
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
          {window.document.body.clientWidth > 420 &&
            `Mais praticidade na passagem dos acessos. Essa foto será utilizada para a sua identificação no terminal e será tratada como um documento.`
          }
          {window.document.body.clientWidth <= 420 &&
            `Siga as orientações abaixo e garanta uma boa foto.`
          }
        </p>
        {window.document.body.clientWidth > 420 &&
          <h3>Dicas para uma boa foto</h3>
        }
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
        {window.document.body.clientWidth <= 420 &&
          <p className={localStyles.reminderMessage}>
            Lembrando que essa é uma foto de segurança, não para as mídias sociais.
          </p>
        }
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
  )
}

export default StepContent