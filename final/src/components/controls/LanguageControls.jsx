import ButtonGroup from '@mui/material/ButtonGroup';
import { ControlButton } from './ControlButton';

function LanguageControls({ theme, language, changeLanguage }) {
  return (
    <ButtonGroup variant="outlined" aria-label="Language button group">
      <ControlButton
        $themeMode={theme}
        disabled={language === 'en'}
        onClick={() => changeLanguage('en')}
      >
        EN
      </ControlButton>
      <ControlButton
        $themeMode={theme}
        disabled={language === 'uk'}
        onClick={() => changeLanguage('uk')}
      >
        UA
      </ControlButton>
    </ButtonGroup>
  );
}

export default LanguageControls;
