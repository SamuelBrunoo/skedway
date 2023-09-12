import React from 'react'
import * as S from './styles'

import { ReactComponent as Arrow } from '../../../assets/icons/arrow.svg'


type Props = {
  text: string;
  action: () => void;
}

const Primary = ({ text, action }: Props) => {


  return (
    <S.El onClick={action}>
      <span>{text}</span>
      <Arrow />
    </S.El>
  )

}


export default Primary