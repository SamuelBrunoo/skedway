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
    black: 'Foto registrada',
    orange: 'exitosamente!'
  },
  resume: 'El reconocimiento facial es una forma de validación segura, sencilla y pasiva.',
  instructions: 'Preséntate en los terminales y sigue los pasos de validación. Si tiene algún problema, comuníquese con un gerente o acceda a nuestro portal de soporte.',
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
    start: 'Comenzar',
    retry: 'Intentar otra vez'
  },
  cameraLabels: {
    candidate_selection: 'Mantén la posición...',
    face_too_close: 'Apártate',
    face_too_far: 'Acércate',
    face_centering: 'Centra tu rostro',
    face_not_present: 'Coloca tu rostro en el círculo',
    sharpness_too_low: 'Vuelve tu rostro hacia la luz',
    brightness_too_low: 'Vuelve tu rostro hacia la luz',
    brightness_too_high: 'Se necesita menos luz',
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
  sendError: {
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