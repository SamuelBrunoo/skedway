import React from 'react'
import * as S from './styles'

import { ReactComponent as Arrow } from '../../../assets/icons/arrow.svg'


type Props = {
  text: string;
  action: () => void;
  noIcon?: boolean;
}

const Primary = ({ text, action, noIcon }: Props) => {


  return (
    <S.El onClick={action}>
      <span>{text}</span>
      {!noIcon && <Arrow />}
    </S.El>
  )

}


export default Primary