import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  FormLabel,
  FormControl,
  TextField,
  CssBaseline,
  Box,
  Button,
  Typography,
  Modal,
} from "@mui/material";
import { registerPost } from "../../../../service/AuthService";
import { RegisterCard, RegisterContainer } from "./styles/RegisterStyles";

const Register = ({ open, handleClose }) => {
    const dispatch = useDispatch();
  
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState("");
  
    const validateInputs = () => {
      console.log("INÍCIO VALIDAÇÃO");
      const email = document.getElementById("email");
      const password = document.getElementById("senha");
      const nome = document.getElementById("nome");
  
      let isValid = true;
  
      if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
        setEmailError(true);
        setEmailErrorMessage("Email inválido");
        isValid = false;
      } else {
        setEmailError(false);
        setEmailErrorMessage("");
      }
  
      if (!password.value || password.value.length < 6) {
        setPasswordError(true);
        setPasswordErrorMessage(
          "Senha inválida, deve conter no mínimo 6 caracteres"
        );
        isValid = false;
      } else {
        setPasswordError(false);
        setPasswordErrorMessage("");
      }
  
      if (!nome.value || nome.value.length < 1) {
        setNameError(true);
        setNameErrorMessage("Nome inválido.");
        isValid = false;
      } else {
        setNameError(false);
        setNameErrorMessage("");
      }
      return isValid;
    };
  
    const handleSubmit = (event) => {
      console.log("HANDLESUBMIT");
      if (!validateInputs()) {
        event.preventDefault();
        console.log("DENTRO DO VALIDATE?");
        return;
      }
  
      const data = new FormData(event.currentTarget);
      const register = {
        nome: data.get("nome"),
        email: data.get("email"),
        senha: data.get("senha"),
      };
  
      console.log("REGISTE: ", register);
  
      dispatch(registerPost(register));
  
      handleClose();
    };
  
    return (
      <div>
        <CssBaseline enableColorScheme />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <RegisterContainer direction="column" justifyContent="space-between">
            <RegisterCard variant="outlined">
              <Typography
                component="h1"
                variant="h4"
                sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
              >
                Register
              </Typography>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  gap: 2,
                }}
              >
                <FormControl>
                  <FormLabel htmlFor="name">Nome Usuário</FormLabel>
                  <TextField
                    autoComplete="nome"
                    name="nome"
                    required
                    fullWidth
                    id="nome"
                    placeholder="Nome Usuário"
                    error={nameError}
                    helperText={nameErrorMessage}
                    color={nameError ? "error" : "primary"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="email">Email</FormLabel>
                  <TextField
                    error={emailError}
                    helperText={emailErrorMessage}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={emailError ? "error" : "primary"}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel htmlFor="password">Senha</FormLabel>
                  <TextField
                    error={passwordError}
                    helperText={passwordErrorMessage}
                    name="senha"
                    placeholder="••••••"
                    type="password"
                    id="senha"
                    autoComplete="current-password"
                    autoFocus
                    required
                    fullWidth
                    variant="outlined"
                    color={passwordError ? "error" : "primary"}
                  />
                </FormControl>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  onClick={validateInputs}
                >
                  Entrar
                </Button>
  
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleClose}
                  color="error"
                >
                  Voltar
                </Button>
              </Box>
            </RegisterCard>
          </RegisterContainer>
        </Modal>
      </div>
    );
  };
  
  export default Register;