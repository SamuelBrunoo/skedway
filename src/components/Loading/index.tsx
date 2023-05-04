import React from "react"
import localStyles from "./styles.module.css"

function LoadingComponent() {

  return (
    <main className={localStyles.main}>
      <div className={localStyles.dots}>
        <div className={localStyles.dot} />
        <div className={localStyles.dot} />
        <div className={localStyles.dot} />
      </div>
    </main>
  )
}

export default LoadingComponent