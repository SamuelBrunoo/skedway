import { ErrorTypes } from "../../types/error"
import localStyles from "./styles.module.css"
import { ReactComponent as PersonOffIcon } from "../../assets/icons/person_off.svg"
import { ReactComponent as WarningIcon } from "../../assets/icons/error.svg"
import { ReactComponent as CameraDeniedIcon } from "../../assets/icons/no_camera.svg"
import { errors } from "../../consts/errors"


interface Props {
  type: ErrorTypes;
}

function ErrorComponent({ type }: Props) {

  const typeIconrelation = {
    accessDenied: <PersonOffIcon />,
    generic: <WarningIcon />,
    cameraDenied: <CameraDeniedIcon />
  }

  const error = errors[type]

  const icon = typeIconrelation[type]

  return (
    <main className={localStyles.main}>
      <div className={localStyles.icon}>
        {icon}
      </div>
      <div className={localStyles.errorInfo}>
        <h1>Oops!</h1>
        <h2 className={localStyles.errorDescription}>
          {error.description}
        </h2>
      </div>
      <p className={localStyles.errorInstructions}>
        {error.instructions}
      </p>
      <button className={localStyles.refreshBtn}>Refresh</button>
    </main>
  )
}

export default ErrorComponent