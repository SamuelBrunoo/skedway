import React from 'react'
import { ReactComponent as Logo } from "../../assets/icons/Lockup_Logo.svg";



const renderLogo = (logo: string | null | undefined) => {


  return logo ? (
    <img src={logo} alt="" width={238} />
  ) : (
    <Logo width={238} />
  )

}


export default renderLogo