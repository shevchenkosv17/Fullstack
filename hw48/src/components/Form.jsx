import { useState } from 'react';
import { TextField, Button, Box, Typography, MenuItem } from '@mui/material';

export default function FormComponent() {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && model) {
      alert(`Заявку для ${name} успішно надіслано!`);
      setName('');
      setModel('');
    }
  };

  return (
    <Box 
      component="form" 
      onSubmit={handleSubmit}
      style={{ background: '#ffffff', padding: '32px', borderRadius: '12px', border: '1px solid #eef0f2', boxShadow: '0 10px 30px rgba(0, 0, 0, 0.04)', display: 'flex', flexDirection: 'column', gap: '20px' }}
    >
      <Typography variant="h6" component="h3" style={{ fontFamily: '"Geologica", "Segoe UI", sans-serif', fontWeight: 700, color: '#091524', textAlign: 'center' }}>
        Заявка на пропозицію
      </Typography>

      <TextField
        label="Ваше ім'я"
        variant="outlined"
        fullWidth
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        InputLabelProps={{ style: { fontFamily: '"Geologica", sans-serif' } }}
        inputProps={{ style: { fontFamily: '"Geologica", sans-serif' } }}
      />

      <TextField
        select
        label="Модель IVECO"
        fullWidth
        required
        value={model}
        onChange={(e) => setModel(e.target.value)}
        InputLabelProps={{ style: { fontFamily: '"Geologica", sans-serif' } }}
      >
        <MenuItem value="edaily" style={{ fontFamily: '"Geologica", sans-serif' }}>IVECO eDaily (Електро)</MenuItem>
        <MenuItem value="sway" style={{ fontFamily: '"Geologica", sans-serif' }}>IVECO S-Way (Газ/LNG)</MenuItem>
        <MenuItem value="eurocargo" style={{ fontFamily: '"Geologica", sans-serif' }}>IVECO Eurocargo</MenuItem>
      </TextField>

      <Button 
        type="submit" 
        variant="contained" 
        fullWidth 
        style={{ backgroundColor: '#0056b3', fontWeight: 700, padding: '12px', fontFamily: '"Geologica", sans-serif', textTransform: 'uppercase', letterSpacing: '0.5px', boxShadow: 'none' }}
      >
        Надіслати запит
      </Button>
    </Box>
  );
}
