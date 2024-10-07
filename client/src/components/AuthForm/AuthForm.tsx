import React from "react";
import { Typography, Box, Paper, TextField, Button } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link } from "react-router-dom";
import styles from "./AuthForm.module.css";

interface AuthFormProps {
  isSignup: boolean;
  initialValues: object;
  validationSchema: object;
  onSubmit: (values: any) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isSignup,
  initialValues,
  validationSchema,
  onSubmit,
}) => {
  return (
    <div className={styles.root}>
      <Paper className={styles.container}>
        <Typography variant="h4" component="h1" gutterBottom>
          {isSignup ? "Sign Up" : "Login"}
        </Typography>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, touched, errors, setTouched }: any) => (
            <Form onSubmit={handleSubmit}>
              {isSignup && (
                <div>
                  <Field
                    name="name"
                    as={TextField}
                    label="Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    onBlur={(e: React.FormEvent) => {
                      e.preventDefault();
                      setTouched({ ...touched, name: true });
                    }}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && <ErrorMessage name="name" />}
                  />
                </div>
              )}
              <div>
                <Field
                  name="email"
                  as={TextField}
                  label="Email"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onBlur={(e: React.FormEvent) => {
                    e.preventDefault();
                    setTouched({ ...touched, email: true });
                  }}
                  error={Boolean(touched.email && errors.email)}
                  helperText={touched.email && <ErrorMessage name="email" />}
                />
              </div>
              <div>
                <Field
                  name="password"
                  as={TextField}
                  type="password"
                  label="Password"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  onBlur={(e: React.FormEvent) => {
                    e.preventDefault();
                    setTouched({ ...touched, password: true });
                  }}
                  error={Boolean(touched.password && errors.password)}
                  helperText={
                    touched.password && <ErrorMessage name="password" />
                  }
                />
              </div>
              <Button type="submit" variant="contained" color="primary">
                {isSignup ? "Sign Up" : "Login"}
              </Button>
              {!isSignup && <SignupLink />}
            </Form>
          )}
        </Formik>
      </Paper>
    </div>
  );
};

const SignupLink = () => {
  return (
    <Box mt={2} display="flex" justifyContent="center" alignItems="center">
      <Typography variant="body2" color="textSecondary">
        Don't have an account?{" "}
      </Typography>
      <Link
        to="/signup"
        style={{
          marginLeft: 5,
          textDecoration: "none",
          color: "#1976d2",
          fontSize: "14px",
        }}
      >
        Sign Up
      </Link>
    </Box>
  );
};

export default AuthForm;
