declare namespace API {
  export interface User {
    _id: string;
    name: string;
    score: number;
    email: string;
    otpSecret: string;
  }
}
