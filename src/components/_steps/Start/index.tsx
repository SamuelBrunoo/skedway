import React from "react"
import texts from "../../../_lang"
import * as S from "../styles"

import Template from "../../_template"
import Button from "../../Button"

import { Logo } from "../../../utils/imports/icons"

type Props = {
  laterOn: () => void
  startFlow: () => void
}

const StartPage = ({ laterOn, startFlow }: Props) => {
  return (
    <Template type="greenPurple">
      <S.Content>
        <S.Main>
          <Logo width={40} height={"auto"} />
          <S.Title>
            <span>{texts.start.title.black} </span>
            <span>{texts.start.title.orange}</span>
          </S.Title>
          <S.Text>
            <span>{texts.start.serviceDes.one}</span>
            <br /> <br />
            <span>{texts.start.serviceDes.two}</span>
            <br />
            <br />
            <span>
              {texts.start.serviceDes.three}{" "}
              <a
                href={`https://skedway.com/${texts.langPattern}/privacy`}
                target="_blank"
              >
                {texts.start.links.privacy}
              </a>{" "}
              {texts.start.serviceDes.connective}{" "}
              <a
                href={`https://skedway.com/${texts.langPattern}/terms`}
                target="_blank"
              >
                {texts.start.links.terms}
              </a>{" "}
              {texts.start.serviceDes.identification}
            </span>
          </S.Text>
        </S.Main>
        <S.ButtonsArea>
          <Button.Secondary text={texts.other.buttons.later} action={laterOn} />
          <Button.Primary text={texts.other.buttons.start} action={startFlow} />
        </S.ButtonsArea>
      </S.Content>
    </Template>
  )
}

export default StartPage
