import { Grid, Typography, Box } from '@mui/material';
import HeaderComponent from './components/Header';
import CardComponent from './components/Card';
import FormComponent from './components/Form';

export default function App() {
  return (
    <Box style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', fontFamily: '"Geologica", "Segoe UI", sans-serif' }}>
      <HeaderComponent />
      <Box style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto' }}>
        <Grid container spacing={5} alignContent="flex-start">
          <Grid item xs={12} md={7}>
            <Box style={{ marginBottom: '40px' }}>
              <Typography variant="caption" style={{ textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700, color: '#0056b3' }}>
                Альтернативна енергія
              </Typography>
              <Typography variant="h4" component="h2" style={{ fontFamily: '"Geologica", "Segoe UI", sans-serif', fontWeight: 800, marginTop: '8px', color: '#091524', letterSpacing: '-0.5px' }}>
                Екологічний ряд IVECO 2026
              </Typography>
              <Box style={{ width: '60px', height: '4px', backgroundColor: '#0056b3', marginTop: '16px', borderRadius: '2px' }} />
            </Box>
            <Box style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
              <CardComponent 
                title="IVECO eDaily" 
                type="Електро" 
                description="Ідеальний вибір для міської логістики з нульовим рівнем викидів в атмосферу."
                power="140 кВт"
              />
              <CardComponent 
                title="IVECO S-Way LNG" 
                type="Газ/Метан" 
                description="Важкий магістральний тягач для високоефективних міжнародних перевезень."
                power="460 к.с."
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={5}>
            <FormComponent />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
