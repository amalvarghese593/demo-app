import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
  Paper,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/actions";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f0f4f7" }}>
      <AppBar position="static" sx={{ backgroundColor: "#1976d2" }}>
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Home
          </Typography>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              border: "1px solid white",
              borderRadius: "4px",
              padding: "5px 15px",
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <Container sx={{ mt: 8 }}>
        <Paper
          elevation={3}
          sx={{ padding: 4, textAlign: "center", borderRadius: 3 }}
        >
          {" "}
          <Typography
            variant="h3"
            gutterBottom
            sx={{ fontWeight: "bold", color: "#1976d2" }}
          >
            Welcome to the Application
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default HomePage;
