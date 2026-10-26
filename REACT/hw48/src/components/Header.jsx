import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

export default function HeaderComponent() {
  return (
    <AppBar position="static" elevation={0} style={{ backgroundColor: '#091524', borderBottom: '1px solid #1e2d3d' }}>
      <Toolbar style={{ maxWidth: '1200px', width: '100%', margin: '0 auto', padding: '0 20px' }}>
        <Typography variant="h5" component="div" style={{ fontFamily: '"Geologica", "Segoe UI", sans-serif', fontWeight: 900, letterSpacing: '2px', color: '#ffffff', marginRight: '60px' }}>
          IVECO
        </Typography>
        <Box style={{ display: 'flex', gap: '32px' }}>
          <Button color="inherit" style={{ fontFamily: '"Geologica", "Segoe UI", sans-serif', fontSize: '14px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase' }}>Головна</Button>
          <Button color="inherit" style={{ fontFamily: '"Geologica", "Segoe UI", sans-serif', fontSize: '14px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.7 }}>Моделі</Button>
          <Button color="inherit" style={{ fontFamily: '"Geologica", "Segoe UI", sans-serif', fontSize: '14px', fontWeight: 500, letterSpacing: '1px', textTransform: 'uppercase', opacity: 0.7 }}>Контакти</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
