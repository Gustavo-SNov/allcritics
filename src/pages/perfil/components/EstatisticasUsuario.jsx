import { styled, Typography } from "@mui/material";

const StyledBox = styled("div")(({ theme }) => ({
  alignSelf: "center",
  width: "300px",
  height: "400px",
  marginTop: theme.spacing(8),
  borderRadius: (theme.vars || theme).shape.borderRadius,
  outline: "6px solid",
  outlineColor: "hsla(220, 25%, 80%, 0.2)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.grey[200],
  boxShadow: "0 0 12px 8px hsla(220, 25%, 80%, 0.2)",
  backgroundSize: "cover",
  [theme.breakpoints.up("sm")]: {
    marginTop: theme.spacing(8),
    // height: 700,
  },
  ...theme.applyStyles("dark", {
    boxShadow: "0 0 24px 12px hsla(210, 100%, 25%, 0.2)",

    outlineColor: "hsla(220, 20%, 42%, 0.1)",
    borderColor: (theme.vars || theme).palette.grey[700],
  }),
}));

const EstatisticasUsuario = () => {
  return (
    <StyledBox>
      <Typography variant="h3">Estatísticas</Typography>
    </StyledBox>
  );
};

export default EstatisticasUsuario;
