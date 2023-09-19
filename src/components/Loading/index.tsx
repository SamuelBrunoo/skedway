import React from "react"
import * as S from './styles'
import LoadingDots from "../LoadingDots"
import Template from "../_template"

function LoadingComponent() {

  return (
    <Template type="greenPurple">
      <S.Content>
        <S.LoadingContainer>
          <LoadingDots />
        </S.LoadingContainer>
      </S.Content>
    </Template>
  )
}

export default LoadingComponent