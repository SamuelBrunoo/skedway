import React from "react"
import styles from "../../styles/index.module.css"
import localStyles from "./styles.module.css"
import { ReactComponent as PersonOffIcon } from "../../assets/icons/person_off.svg"
import { ReactComponent as WarningIcon } from "../../assets/icons/error.svg"
import { ReactComponent as CameraDeniedIcon } from "../../assets/icons/no_camera.svg"


interface Props {
  type: 'access-denied' | 'generic' | 'camera-denied';
  description: string;
  instructions: string;
}

function ErrorComponent({ type, description, instructions }: Props) {

  const typeIconrelation = {
    'access-denied': <PersonOffIcon />,
    'generic': <WarningIcon />,
    'camera-denied': <CameraDeniedIcon />
  }

  const icon = typeIconrelation[type]

  return (
    <main className={localStyles.main}>
      <div className={localStyles.icon}>
        {icon}
      </div>
      <div className={localStyles.errorInfo}>
        <h1>Oops!</h1>
        <h2 className={localStyles.errorDescription}>
          {description}
        </h2>
      </div>
      <p className={localStyles.errorInstructions}>
        {instructions}
      </p>
      <button className={localStyles.refreshBtn}>Refresh</button>
    </main>
  )
}

export default ErrorComponent