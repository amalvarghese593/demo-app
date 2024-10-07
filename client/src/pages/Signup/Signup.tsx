import React from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import { SignupProps } from "../../interfaces";
import { registerUser } from "../../actions/actions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupValidationSchema } from "../../validation";

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignup = (formData: SignupProps) => {
    const { name, email, password } = formData;
    const onSuccess = () => {
      navigate("/");
    };
    dispatch(registerUser({ name, email, password, onSuccess }) as any);
  };

  const initialValues = { name: "", email: "", password: "" };
  return (
    <AuthForm
      isSignup={true}
      initialValues={initialValues}
      validationSchema={signupValidationSchema}
      onSubmit={handleSignup}
    />
  );
};

export default Signup;
