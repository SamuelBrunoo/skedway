const stepOne = {
  serviceDesc: {
    others: {
      one: 'Próximamente se utilizará el reconocimiento facial para validar los billetes en las terminales de acceso. Registra tu foto de seguridad!',
      two: 'Es confidencial y no será compartida.'
    },
    mobile: {
      one: 'Registre su foto de seguridad y use el',
      two: 'reconocimiento facial para la validación de',
      three: 'boletos y otros recursos del sistema.'
    },
  },
  serviceSubDes: 'Al hacer clic en continuar, acepta el almacenamiento seguro de estos datos por parte de Skedway por motivos de seguridad.'
}

const stepTwo = {
  description: {
    others: 'Más practicidad en el paso de accesos. Esta foto se utilizará para identificarlo en la terminal y se tratará como un documento.',
    mobile: 'Siga las pautas a continuación y asegúrese una buena foto.'
  },
  tipsTitle: 'Consejos para una buena foto',
  tips: {
    one: 'Encuentre una ubicación clara.',
    two: 'Asegúrate de que tu cara esté iluminada.',
    three: 'No use lentes de sol, gorras, máscaras o cualquier accesorio que cubra la cara.',
    four: 'No poses ni hagas muecas al tomar la foto.',
  },
  mobileReminder: 'Recordando que esta es una foto de seguridad, no para redes sociales.'
}

const stepThree = {
  successMsg: {
    one: 'Foto',
    break: 'registrada',
    two: 'correctamente!',
  },
  confirmation: 'Ya puedes validar tu rostro en los terminales de acceso',
  instructions: {
    one: 'Preséntate a la terminal y sigue los pasos de validación.',
    two: 'El reconocimiento facial es una forma de validación segura y pasiva, que no requiere interacción. No obstante, si tienes algún problema, puedes validar tu acceso con tu DNI Digital (Código QR).',
    three: 'Si el problema persiste, póngase en contacto con un administrador.',
  },
}

const footer = {
  register: {
    privacy: 'Política de privacidad',
    terms: 'Terminos de uso',
  }
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
    take_another: 'Toma otra foto'
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
  stepOne,
  stepTwo,
  stepThree,
  other,
  footer,
  langPattern,
  feedbacks
}


export default texts