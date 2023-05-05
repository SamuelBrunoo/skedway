const stepOne = {
  serviceDesc: {
    others: {
      one: 'Facial recognition will soon be used to validate tickets at access terminals. Register your security photo!',
      two: 'It is confidential and will not be shared.'
    },
    mobile: {
      one: 'Register your security photo and use the',
      two: 'facial recognition for validation of',
      three: 'passthrough and other system resources.'
    },
  },
  serviceSubDes: "By clicking continue, you agree to Skedway's secure storage of this data for security purposes."
}

const stepTwo = {
  description: {
    others: 'More practicality in the passage of accesses. This photo will be used to identify you at the terminal and will be treated as a document.',
    mobile: 'Follow the guidelines below and ensure a good photo.'
  },
  tipsTitle: 'Tips for a good photo',
  tips: {
    one: 'Find a clear location.',
    two: 'Make sure your face is lit.',
    three: 'Do not wear sunglasses, caps, masks or any accessory that covers the face.',
    four: 'Do not pose or grimace when taking the photo.',
  },
  mobileReminder: 'Remembering that this is a security photo, not for social media.'
}

const stepThree: {
  successMsg: {
    one: string;
    break?: string;
    two: string;
  };
  confirmation: string,
  instructions: {
    one: string;
    two: string;
    three: string;
  }
} = {
  successMsg: {
    one: 'Photo successfully',
    two: 'registered!',
  },
  confirmation: 'You can now validate your face at access terminals',
  instructions: {
    one: 'Introduce yourself to the terminal and follow the validation steps.',
    two: 'Facial recognition is a safe and passive form of validation, without the need for interaction. However, if you have any problems, you can validate your access with your Digital ID (QR Code).',
    three: 'If the problem persists, please contact an administrator.',
  },
}

const footer = {
  register: {
    privacy: 'Privacy Policy',
    terms: 'Terms of use',
  }
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
    refresh: 'Refresh'
  },
  cameraLabels: {
    loading: 'Loading. Please wait.',
  },
  errors: {
    "access-denied": {
      description: "Unauthorized user",
      instructions: "If the error persists, please contact our support."
    },
    "generic": {
      description: "An error was found",
      instructions: "If the error persists, please contact our support."
    },
    "camera-denied": {
      description: "Camera access denied",
      instructions: "Allow your browser access to the camera to record your face."
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