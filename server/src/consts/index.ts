const PORT: string = 'PORT';
const MONGODB_URI: string = 'MONGODB_URI';
const MONGODB_NAME: string = 'MONGODB_NAME';
const JWT_EXPIRES: string = 'JWT_EXPIRES';
const JWT_SECRET: string = 'JWT_SECRET';
const specialCharactersRegex = /[~`!@#$%^&*)(=,./\\|<>?;:[\]}{'"+_-]/;

interface CreateUser {
  name: string;
  email: string;
  password: string;
}

type SuccessResponse = {
  success: boolean;
};

type SuccessResponseWith<T extends object> = SuccessResponse & T;

export {
  PORT,
  MONGODB_URI,
  MONGODB_NAME,
  JWT_EXPIRES,
  JWT_SECRET,
  specialCharactersRegex,
  CreateUser,
  SuccessResponse,
  SuccessResponseWith,
};
