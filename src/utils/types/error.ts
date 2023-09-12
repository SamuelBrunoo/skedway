export type ErrorComponentType = {
  [K in ErrorTypes]: {
    description: string;
    instructions: string;
  };
}

export type ErrorTypes = "accessDenied" | "generic" | "cameraDenied";