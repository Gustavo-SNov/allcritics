import { useEffect, useState } from "react";
import { Button, FormControl, TextField, Autocomplete } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import {getConteudos } from "../../../service/ConteudoService";

const options = ["Filmes", "Séries", "Jogos", "Livros", "Músicas", "Eventos"];

const PesquisaInput = () => {
  const [filtro, setFiltro] = useState("");
  const [conteudos, setConteudos] = useState([]);

  useEffect(() => {
    async function buscarDados() {
      const dados = await getConteudos({ orderByUltimos: true});
      setConteudos(dados);
    }
    buscarDados();
  }, [filtro])


  const handleChangeFiltro = (event, newValue) => {
    setFiltro(newValue);
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
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <FormControl sx={{ width: 300 }}>
        <Autocomplete
          freeSolo
          options={options} // Lista de sugestões
          value={filtro}
          onInputChange={handleChangeFiltro} // Atualiza estado ao digitar
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search..."
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchRoundedIcon />
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </FormControl>
      <Button variant="contained" onClick={handleSubmit}>
        <SearchRoundedIcon fontSize="small" />
      </Button>
    </div>
  );
};

export default PesquisaInput;
