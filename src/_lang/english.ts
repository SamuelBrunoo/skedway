const start = {
  title: {
    black: 'Registration of',
    orange: 'Facial biometrics'
  },
  serviceDes: {
    one: 'Facial recognition will soon be used to validate tickets at access terminals.',
    two: 'Register your security photo! It is confidential and will not be shared.',
    three: 'By clicking continue, you agree to the secure storage of this data by Skedway for security purposes, in accordance with the',
    connective: 'and',
    identification: ''
  },
  links: {
    privacy: 'Privacy Policy',
    data: 'and Personal Data Protection',
    terms: 'Identification Image Terms of use',
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
  systemTitle: {
    spanOne: 'Facial',
    spanTwo: 'recognition'
  },
  buttons: {
    close: 'Close',
    later: 'Later',
    next: 'Next',
    refresh: 'Refresh',
    take_another: 'Take another picture',
    start: 'Start'
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
    loading: 'Loading. Please wait.',
    waiting: 'Waiting for input'
  },
}

const feedbacks = {
  leadingCamera: {
    description: 'Preparing the camera',
    instructions: 'Wait a minute'
  },
  cameraDenied: {
    description: 'Camera access denied',
    instructions: "Release your camera's access permissions to record your face"
  },
  uploading: {
    description: 'Sending biometric data',
    instructions: ''
  },
  unknown: {
    description: 'Unknown error',
    instructions: 'If the error persists, please contact our support'
  },
}

const langPattern = 'en-US'

const texts = {
  start,
  finished,
  other,
  langPattern,
  feedbacks
}


export default texts