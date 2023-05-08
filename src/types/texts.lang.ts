import { ErrorComponentType } from "./error";

export interface TextsInterface {
  stepOne: {
    serviceDesc: {
      others: {
        one: string;
        two: string;
      };
      mobile: {
        one: string;
        two: string;
        three: string;
      };
    };
    serviceSubDes: string;
  };
  stepTwo: {
    description: {
      others: string;
      mobile: string;
    };
    tipsTitle: string;
    tips: {
      one: string;
      two: string;
      three: string;
      four: string,
    };
    mobileReminder: string;
  };
  stepThree: {
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
  };
  other: {
    systemTitle: {
      spanOne: string;
      spanTwo: string;
    };
    buttons: {
      close: string;
      later: string;
      next: string;
      refresh: string;
    };
    cameraLabels: {
      loading: string;
    };
    errors: ErrorComponentType;
  };
  footer: {
    register: {
      privacy: string;
      terms: string;
    };
  };
}