import { useState, useEffect } from "react";
import * as S from './styles'
import { useSearchParams } from "react-router-dom";

import texts from "../../_lang";
import { isAndroid } from "../../consts/auxs/getDeviceType";
import useApi from "../../Api";
import { UserInfo } from "../../types/api/UserInfo";

import Template from "../../components/_template";
import Button from "../../components/Button";

import { ReactComponent as Logo } from '../../assets/icons/logo.svg'
import FeedBackPage from "../FeedBackPage";


function RegisterPage() {
  const [pageError, setPageError] = useState<'token' | 'generic' | null>(null)
  const [userInfo, setUserInfo] = useState<null | UserInfo>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const Api = useApi({ token: token as string })

  const laterOn = () => {
    if (isAndroid()) {
      const linkProfundo = 'com.apekbrazil.skedway://home';
      window.location.href = linkProfundo;
    } else {
      window.webkit.messageHandlers.closeWebView.postMessage('closeWebView');
    }
  }

  useEffect(() => {
    if (!token) {
      setPageError("token")
      return
    } else {
      setLoading(true)

      Api.getUserInfo()
        .then((req) => {
          if (req.success) {
            const info = req.info

            setUserInfo(info)
            setLoading(false)
          } else {
            setPageError("token")
            setLoading(false)
          }
        })
    }
  }, [token])

  return (pageError) ? (
    <FeedBackPage isError={true} msgType="unknown" />
  ) : (loading) ? (
    <FeedBackPage isError={false} msgType="leadingCamera" />
  ) : (
    <Template type="greenPurple">
      <S.Content>
        <S.Main>
          <Logo width={40} height={'auto'} />
          <S.Title>
            <span>Registro da </span>
            <span>Biometria facial</span>
          </S.Title>
          <S.Text>
            <span>Em breve será utilizado o reconhecimento facial para a validação da passagem nos terminais de acesso.</span>
            <br /> <br />
            <span>Cadastre a sua foto de segurança! Ela é confidencial e não será compartilhada.</span>
            <br /><br />
            <span>Ao clicar em continuar, você concorda com o armazenamento seguro deste dado pela Skedway para fins de segurança, conforme a <a href={`https://skedway.com/${texts.langPattern}/privacy`} target="_blank">Política de Privacidade</a> e <a href="">Proteção de Dados Pessoais</a> e <a href={`https://skedway.com/${texts.langPattern}/terms`} target="_blank">Termo de Uso de Imagem</a> de Identificação.</span>
          </S.Text>
        </S.Main>
        <S.ButtonsArea>
          <Button.Secondary text="Mais tarde" action={laterOn} />
          <Button.Primary text="Continuar" action={laterOn} />
        </S.ButtonsArea>
      </S.Content>
    </Template>
  );
}

export default RegisterPage;
