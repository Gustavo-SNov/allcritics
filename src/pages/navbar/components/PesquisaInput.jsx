import { useState } from "react";
import { Button, FormControl } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const PesquisaInput = () => {
  const [filtro, setFiltro] = useState("");

  const handleChangeFiltro = (novoFiltro) => {
    setFiltro(novoFiltro);
  };

  const limpaFiltro = () => {
    setFiltro("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(filtro);

    limpaFiltro();
  };
  
  return (
    <div>
      <FormControl>
        <OutlinedInput
          size="medium"
          id="search"
          placeholder="Search…"
          sx={{ flexGrow: 1 }}
          startAdornment={
            <InputAdornment
              position="start"
              sx={{ color: "text.primary" }}
            ></InputAdornment>
          }
          inputProps={{
            "aria-label": "search",
          }}
          backgroundColor="black"
          value={filtro || ""}
          onChange={(event) => {
            handleChangeFiltro(() => event.target.value);
          }}
        />
      </FormControl>
      <Button onClick={handleSubmit}>
        <SearchRoundedIcon fontSize="small" />
      </Button>
    </div>
  );
};

export default PesquisaInput;
