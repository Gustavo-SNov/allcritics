import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const RatingConteudo = ({titulo, handleAvaliacao}) => {
    const [value, setValue] = React.useState(2);

    
    return (
        <div>
            <Typography component="h6">{titulo}</Typography>
            <Rating
                name="simple-uncontrolled"
                onChange={(event, newValue) => {
                    console.log("Novo valor: ", newValue);
                }}
                defaultValue={0}
            />
        </div>);
}
export default RatingConteudo;