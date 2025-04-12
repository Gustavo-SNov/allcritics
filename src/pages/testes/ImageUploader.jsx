import React, { useState } from "react";
import { Button, Box, Typography, IconButton, Avatar } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ImageUploader = () => {
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
      <input
        accept="image/*"
        style={{ display: "none" }}
        id="upload-button"
        type="file"
        onChange={handleImageChange}
      />
      
      <label htmlFor="upload-button">
        <Button
          variant="contained"
          component="span"
          startIcon={<CloudUploadIcon />}
        >
          Upload Imagem
        </Button>
      </label>

      {image && (
        <Box mt={2}>
          <Typography variant="body1">Pré-visualização:</Typography>
          {/* <img src={image} alt="Preview" style={{ width: 200, borderRadius: 8 }} /> */}
          <Avatar
          alt="fotoPerfil"
          src={image}
          sx={{ width: 100, height: 100 }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ImageUploader;
