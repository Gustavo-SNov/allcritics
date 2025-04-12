import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

const StyledBox = styled("div")(({ theme }) => ({
    alignSelf: "center",
    width: "800px",
    height: "100%",
    borderRadius: theme.shape.borderRadius,
    outline: "6px solid hsla(220, 25%, 80%, 0.2)",
    border: "1px solid",
    borderColor: theme.palette.grey[200],
    boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: theme.spacing(2),
    textAlign: "center",
    [theme.breakpoints.up("sm")]: {
      marginTop: theme.spacing(2),
    },
    ...theme.applyStyles?.("dark", {
      boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",
      outlineColor: "hsla(220, 20%, 42%, 0.1)",
      borderColor: theme.palette.grey[700],
    }),
  }));

const ListasPerfil = () => {
    return (
        <StyledBox>
            <Typography variant="h2" gutterBottom>
                Minhas Listas
            </Typography>
        </StyledBox>
    );
};

export  default ListasPerfil;
