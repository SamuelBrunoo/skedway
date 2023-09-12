import React from 'react'
import localStyles from "./styles.module.css"


const LoadingDots = () => {


  return (
    <div className={localStyles.dots}>
      <div className={localStyles.dot} />
      <div className={localStyles.dot} />
      <div className={localStyles.dot} />
    </div>
  )

}


export default LoadingDots