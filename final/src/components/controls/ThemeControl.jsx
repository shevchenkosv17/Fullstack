import SunnyIcon from '@mui/icons-material/Sunny';
import BedtimeIcon from '@mui/icons-material/Bedtime';
import { ControlButton } from './ControlButton';

function ThemeControl({ theme, toggleTheme }) {
  return (
    <ControlButton $themeMode={theme} onClick={toggleTheme}>
      {theme === 'day' ? <BedtimeIcon /> : <SunnyIcon />}
    </ControlButton>
  );
}

export default ThemeControl;
