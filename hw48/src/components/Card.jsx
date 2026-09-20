import { Card, CardContent, CardActions, Typography, Button, Box, Chip } from '@mui/material';

export default function CardComponent({ title, type, description, power }) {
  return (
    <Card 
      style={{ 
        width: '100%', 
        maxWidth: '320px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
        borderRadius: '12px',
        border: '1px solid #eef0f2',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.02)',
        background: '#ffffff',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease'
      }}
      sx={{
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: '0 12px 30px rgba(9, 21, 36, 0.08)',
          borderColor: '#0056b3'
        }
      }}
    >
      <CardContent style={{ padding: '24px' }}>
        <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <Typography variant="h6" component="div" style={{ fontFamily: '"Geologica", "Segoe UI", sans-serif', fontWeight: 700, color: '#091524' }}>
            {title}
          </Typography>
          <Chip 
            label={type} 
            color={type === 'Електро' ? 'success' : 'primary'} 
            size="small" 
            style={{ fontWeight: 600, fontSize: '12px', fontFamily: '"Geologica", sans-serif' }}
          />
        </Box>
        <Typography variant="body2" color="text.secondary" style={{ fontFamily: '"Geologica", sans-serif', minHeight: '48px', marginBottom: '16px', lineHeight: '1.5' }}>
          {description}
        </Typography>
        <Typography variant="body2" style={{ fontFamily: '"Geologica", sans-serif', fontWeight: 600, color: '#091524' }}>
          Потужність: {power}
        </Typography>
      </CardContent>
      <CardActions style={{ padding: '0 24px 24px 24px' }}>
        <Button size="small" style={{ color: '#0056b3', fontWeight: 700, padding: 0, fontFamily: '"Geologica", sans-serif', textTransform: 'none' }}>
          Дізнатись більше →
        </Button>
      </CardActions>
    </Card>
  );
}
