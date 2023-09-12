const start = {
  title: {
    black: 'Registro de',
    orange: 'Biometría facial'
  },
  serviceDes: {
    one: 'Próximamente se utilizará el reconocimiento facial para validar los billetes en las terminales de acceso.',
    two: '¡Registra tu foto de seguridad! Es confidencial y no será compartido.',
    three: 'Al hacer clic en Continuar, acepta el almacenamiento seguro de estos datos por parte de Skedway con fines de seguridad, de acuerdo con la',
    connective: 'y',
    identification: 'de identificación'
  },
  links: {
    privacy: 'Política de privacidad',
    data: 'y Protección de datos personales',
    terms: 'y Términos de uso de la imagen'
  }
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
  systemTitle: {
    spanOne: 'Reconocimiento',
    spanTwo: 'facial'
  },
  buttons: {
    close: 'Cerrar',
    later: 'Más tarde',
    next: 'Proximo',
    refresh: 'Actualizar',
    take_another: 'Toma otra foto',
    start: 'Comenzar'
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
    loading: 'Cargando. Por favor espere.',
    waiting: 'Esperando la cámara'
  },
  errors: {
    accessDenied: {
      description: "Usuario no autorizado",
      instructions: "Si el error persiste, póngase en contacto con nuestro soporte."
    },
    "generic": {
      description: "Se encontró un error",
      instructions: "Si el error persiste, póngase en contacto con nuestro soporte."
    },
    cameraDenied: {
      description: "Acceso a la cámara denegado.",
      instructions: "Permita que su navegador acceda a la cámara para grabar su rostro."
    }
  },
}

const feedbacks = {
  leadingCamera: {
    description: 'Preparando la cámara',
    instructions: 'Espera un minuto'
  },
  cameraDenied: {
    description: 'Acceso a la cámara denegado',
    instructions: 'Libera los permisos de acceso de tu cámara para grabar tu rostro'
  },
  uploading: {
    description: 'Envío de datos biométricos',
    instructions: ''
  },
  unknown: {
    description: 'Error desconocido',
    instructions: 'Si el error persiste, por favor contacta con nuestro soporte'
  },
}

const langPattern = 'es-ES'

const texts = {
  start,
  finished,
  other,
  langPattern,
  feedbacks
}


export default texts