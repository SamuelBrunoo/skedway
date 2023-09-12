import React from 'react'
import texts from '../../../_lang'
import * as S from '../styles'

import Template from '../../_template'
import Button from '../../Button'

import { Logo } from '../../../utils/imports/icons'


type Props = {
  endFlow: () => void;
}

const SuccessPage = ({ endFlow }: Props) => {


  return (
    <Template type="purpleGreen">
      <S.Content>
        <S.Main>
          <Logo width={40} height={'auto'} />
          <S.Title>
            <span className="finishTitle">{texts.finished.title.black} </span>
            <span className="finishTitle">{texts.finished.title.orange}</span>
          </S.Title>
          <S.Text>
            <span>{texts.finished.resume}</span>
            <br /> <br />
            <span>{texts.finished.instructions}</span>
            <br /><br />
          </S.Text>
        </S.Main>
        <S.ButtonsArea>
          <Button.Primary text="OK" action={endFlow} noIcon={true} />
        </S.ButtonsArea>
      </S.Content>
    </Template>
  )

}


export default SuccessPage