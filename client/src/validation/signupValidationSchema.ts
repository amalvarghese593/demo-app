import * as Yup from "yup";
import { specialCharactersRegex } from "../consts";

export const signupValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .max(50, "Name must not be longer than 50 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .max(50, "Password must not be longer than 50 characters")
    .matches(/[a-zA-Z]/, "Password must contain at least 1 letter")
    .matches(/[0-9]/, "Password must contain at least 1 number")
    .matches(
      specialCharactersRegex,
      "Password must contain at least 1 special character"
    ),
});
