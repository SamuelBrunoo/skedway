const start = {
  title: {
    black: 'Registro da',
    orange: 'Biometria facial'
  },
  serviceDes: {
    one: 'Em breve será utilizado o reconhecimento facial para a validação da passagem nos terminais de acesso.',
    two: 'Cadastre a sua foto de segurança! Ela é confidencial e não será compartilhada.',
    three: 'Ao clicar em continuar, você concorda com o armazenamento seguro deste dado pela Skedway para fins de segurança, conforme a',
    connective: 'e',
    identification: 'de identificação.'
  },
  links: {
    privacy: 'Política de Privacidade',
    data: 'Proteção de Dados Pessoais',
    terms: 'Termos de Uso de Imagem',
  },
}

const finished = {
  title: {
    black: 'Foto cadastrada com',
    orange: 'successo!'
  },
  resume: 'O reconhecimento facial é uma forma segura e simples e passiva de validacão.',
  instructions: 'Apresente-se aos terminais e siga as etapas de validação. Caso encontre algum problama, entre em contato com um gestor ou acesse nosso portal de atendimento.',
}

const other = {
  buttons: {
    close: 'Fechar',
    later: 'Mais tarde',
    next: 'Próximo',
    refresh: 'Atualizar',
    take_another: 'Tirar outra foto',
    start: 'Continuar'
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
}

const feedbacks = {
  leadingCamera: {
    description: 'Preparando câmera',
    instructions: 'Aguarde um instante'
  },
  cameraDenied: {
    description: 'Acesso a câmera negado',
    instructions: 'Libere as permissões de acesso da sua câmera para registrar sua face'
  },
  uploading: {
    description: 'Enviando dados biometricos',
    instructions: ''
  },
  unknown: {
    description: 'Erro desconhecido',
    instructions: 'Se o erro persistir, por gentileza contate nosso suporte'
  },
}

const langPattern = 'pt-BR'

const texts = {
  start,
  finished,
  other,
  langPattern,
  feedbacks
}


export default texts