import { useEffect, useState } from 'react'
import * as S from './styles'
import texts from "../../_lang"
import { PatternsNames } from "../../utils/types/template"

import Template from "../../components/_template"
import LoadingDots from '../../components/LoadingDots'

import { ReactComponent as CameraIcon } from '../../assets/icons/camera.svg'
import { ReactComponent as CameraDenIcon } from '../../assets/icons/camera_denied.svg'
import { ReactComponent as UploadIcon } from '../../assets/icons/upload.svg'
import { ReactComponent as AlertIcon } from '../../assets/icons/alert.svg'


type Props = {
  isError: boolean;
  msgType: 'leadingCamera' | 'cameraDenied' | 'uploading' | 'unknown';
}

function FeedBackPage(p: Props) {

  const [icon, setIcon] = useState<JSX.Element | null>(null)
  const [combination, setCombination] = useState<PatternsNames>('greenPurple')

  useEffect(() => {
    switch (p.msgType) {
      case "leadingCamera":
        setIcon(<CameraIcon />)
        setCombination("greenPurple")
        break;
      case "cameraDenied":
        setIcon(<CameraDenIcon />)
        setCombination("purpleGreen")
        break;
      case "uploading":
        setIcon(<UploadIcon />)
        setCombination("greyGrey")
        break;
      case "unknown":
        setIcon(<AlertIcon />)
        setCombination("darkGrey")
        break;
    }
  }, [(p.isError && p.msgType)])

  return (
    <Template type={combination}>
      <S.Content>
        <S.Main>
          <S.Info>
            <S.IconArea>
              {icon}
            </S.IconArea>

            <S.Description>{texts.feedbacks[p.msgType].description}</S.Description>
            {texts.feedbacks[p.msgType].instructions.trim().length > 0 &&
              <S.Instructions>
                {texts.feedbacks[p.msgType].instructions}
              </S.Instructions>
            }
          </S.Info>
          {!p.isError && <LoadingDots />}
        </S.Main>
      </S.Content>
    </Template>
  )

}

export default FeedBackPage