import { registerAs } from '@nestjs/config';

const { PORT, MONGODB_URI, MONGODB_NAME, JWT_EXPIRES, JWT_SECRET } =
  process.env;

export default registerAs('app', () => ({
  PORT: parseInt(PORT, 10) || 3010,
  MONGODB_URI,
  MONGODB_NAME,
  JWT_SECRET,
  JWT_EXPIRES,
}));
