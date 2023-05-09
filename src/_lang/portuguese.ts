const stepOne = {
  serviceDesc: {
    others: {
      one: 'Em breve será utilizado o reconhecimento facial para a validação da passagem nos terminais de acesso. Cadastre a sua foto de segurança!',
      two: 'Ela é confidencial e não será compartilhada.'
    },
    mobile: {
      one: 'Cadastre sua foto de segurança e utilize o',
      two: 'reconhecimento facial para a validação da',
      three: 'passagem e outros recursos do sistema.'
    },
  },
  serviceSubDes: 'Ao clicar em continuar, você concorda com o armazenamento seguro deste dado pela Skedway para fins de segurança.'
}

const stepTwo = {
  description: {
    others: 'Mais praticidade na passagem dos acessos. Essa foto será utilizada para a sua identificação no terminal e será tratada como um documento.',
    mobile: 'Siga as orientações abaixo e garanta uma boa foto.'
  },
  tipsTitle: 'Dicas para uma boa foto',
  tips: {
    one: 'Encontre um local claro.',
    two: 'Certifique-se que seu rosto esteja iluminado.',
    three: 'Não use óculos de sol, bonés, mascaras ou qualquer acessório que cubra o rosto.',
    four: 'Não faça poses nem caretas ao bater a foto.',
  },
  mobileReminder: 'Lembrando que essa é uma foto de segurança, não para as mídias sociais.'
}

const stepThree = {
  successMsg: {
    one: 'Foto cadastrada',
    break: 'com',
    two: 'sucesso!',
  },
  confirmation: 'Você já pode fazer sua validação nos  terminais de acesso com seu rosto',
  instructions: {
    one: 'Apresente-se ao terminal e siga as etapas de validação.',
    two: 'O reconhecimento facial é uma forma segura e passiva de validacão, sem necessitar de interação. Contudo, caso tenha algum problama você poderá validar seu acesso com seu ID Digital (QR Code).',
    three: 'Caso o problema persista, por gentileza contato um administrador.',
  },
}

const footer = {
  register: {
    privacy: 'Política de privacidade',
    terms: 'Termos de uso',
  }
}

const other = {
  systemTitle: {
    spanOne: 'Reconhecimento',
    spanTwo: 'facial'
  },
  buttons: {
    close: 'Fechar',
    later: 'Mais tarde',
    next: 'Próximo',
    refresh: 'Atualizar'
  },
  cameraLabels: {
    candidate_selection: 'Mantenha a posição...',
    face_too_close: 'Afaste-se',
    face_too_far: 'Aproxime-se',
    face_centering: 'Centralize seu rosto',
    face_not_present: 'Posicione seu rosto no círculo',
    sharpness_too_low: 'Vire seu rosto contra a luz',
    brightness_too_low: 'Vire seu rosto contra a luz',
    brightness_too_high: 'Menos luz necessária',
    loading: 'Carregando. Por favor, espere.',
    waiting: 'Aguardando câmera'
  },
  errors: {
    accessDenied: {
      description: "Usuário não autorizado",
      instructions: "Se o erro persistir, por gentileza contate nosso suporte."
    },
    generic: {
      description: "Foi encontrado um erro",
      instructions: "Se o erro persistir, por gentileza contate nosso suporte"
    },
    cameraDenied: {
      description: "Acesso a câmera negado",
      instructions: "Permita que seu navegador tenha acesso a câmera para registrar sua face."
    }
  },
}

const texts = {
  stepOne,
  stepTwo,
  stepThree,
  other,
  footer,
}


export default texts