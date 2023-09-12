import React from "react"
import localStyles from "./styles.module.css"
import LoadingDots from "../LoadingDots"

function LoadingComponent() {

  return (
    <div className={localStyles.main} id="loadingComponent">
      <LoadingDots />
    </div>
  )
}

export default LoadingComponent