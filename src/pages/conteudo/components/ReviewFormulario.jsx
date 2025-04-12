import { Card, FormControl, Rating, TextField, Button } from "@mui/material";

const ReviewFormulario = ({ handleSubmit, handleChange, review }) => {
  return (
    <Card>
      <FormControl>
        <Rating
          id="avaliacao"
          name="simple-uncontrolled"
          onChange={(event) =>
            handleChange((prevState) => ({
              ...prevState,
              nota: event.target.value,
            }))
          }
          precision={0.5}
          value={review.nota || 0}
        />
      </FormControl>
      <FormControl>
        <TextField
          id="comentario"
          label="Insira seu Comentário  "
          multiline
          rows={4}
          variant="filled"
          sx={{
            marginTop: "20px",
            width: "300px",
            textAlign: "center",
          }}
          value={review.comentario || ""}
          onChange={(event) =>
            handleChange((prevState) => ({
              ...prevState,
              comentario: event.target.value,
            }))
          }
        />
      </FormControl>

      <Button
        variant="contained"
        color="success"
        sx={{
          marginTop: "20px",
          width: "300px",
        }}
        onClick={handleSubmit}
      >
        Success
      </Button>
    </Card>
  );
};

export default ReviewFormulario;
