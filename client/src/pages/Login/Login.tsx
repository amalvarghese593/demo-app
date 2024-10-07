import React, { useEffect } from "react";
import AuthForm from "../../components/AuthForm/AuthForm";
import { LoginProps } from "../../interfaces";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../actions/actions";
import { useNavigate } from "react-router-dom";
import { loginValidationSchema } from "../../validation";

interface State {
  authReducer: any;
}
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoggedIn } = useSelector((state: State) => state.authReducer);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const handleLogin = (formData: LoginProps) => {
    const { email, password } = formData;
    const onSuccess = () => {
      navigate("/");
    };
    dispatch(loginUser({ email, password, onSuccess }) as any);
  };
  const initialValues = { email: "", password: "" };

  return (
    <AuthForm
      isSignup={false}
      initialValues={initialValues}
      validationSchema={loginValidationSchema}
      onSubmit={handleLogin}
    />
  );
};

export default Login;
