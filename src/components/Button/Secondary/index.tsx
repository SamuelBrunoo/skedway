import React from 'react'
import * as S from './styles'


type Props = {
  text: string;
  action: () => void;
}

const Secondary = ({ text, action }: Props) => {


  return (
    <S.El onClick={action}>
      <span>{text}</span>
    </S.El>
  )

}


export default Secondary