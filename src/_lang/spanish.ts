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
    refresh: 'Actualizar'
  },
  cameraLabels: {
    loading: 'Cargando. Por favor espere.',
  },
  errors: {
    "access-denied": {
      description: "Usuario no autorizado",
      instructions: "Si el error persiste, póngase en contacto con nuestro soporte."
    },
    "generic": {
      description: "Se encontró un error",
      instructions: "Si el error persiste, póngase en contacto con nuestro soporte."
    },
    "camera-denied": {
      description: "Acceso a la cámara denegado.",
      instructions: "Permita que su navegador acceda a la cámara para grabar su rostro."
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