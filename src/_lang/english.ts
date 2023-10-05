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
    black: 'Photo registered',
    orange: 'successfully!'
  },
  resume: 'Facial recognition is a safe, simple and passive form of validation.',
  instructions: 'Introduce yourself to the terminals and follow the validation steps. If you encounter any problems, contact a manager or access our support portal.',
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
    start: 'Start',
    retry: 'Try again'
  },
  cameraLabels: {
    candidate_selection: 'Hold position...',
    face_too_close: 'Stay away',
    face_too_far: 'Come closer',
    face_centering: 'Center your face',
    face_not_present: 'Place your face inside the circle',
    sharpness_too_low: 'Turn your face to the light',
    brightness_too_low: 'Turn your face to the light',
    brightness_too_high: 'Less light needded',
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
  sendError: {
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