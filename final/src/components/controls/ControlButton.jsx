import Button from '@mui/material/Button';
import styled from 'styled-components';

export const ControlButton = styled(Button)`
  padding: 6px 12px;
  border-radius: 6px;
  text-transform: none;
  font-weight: 500;
  transition: all 0.2s ease;
  min-width: auto;

  /* ========================================== */
  /* 1. REGULAR STATE (Unselected / Clickable)  */
  /* ========================================== */
  border: 1px solid ${({ $themeMode }) => ($themeMode === 'night' ? '#334155' : '#cbd5e1')};
  color: ${({ $themeMode }) => ($themeMode === 'night' ? '#94a3b8' : '#64748b')};
  background: transparent;

  /* HOVER STATE (Unselected Hover) */
  &:hover {
    background: ${({ $themeMode }) => ($themeMode === 'night' ? '#1e293b' : '#f1f5f9')};
    color: ${({ $themeMode }) => ($themeMode === 'night' ? '#e2e8f0' : '#1e293b')};
    border-color: ${({ $themeMode }) => ($themeMode === 'night' ? '#475569' : '#94a3b8')};
  }

  /* ========================================== */
  /* 2. ACTIVE STATE (Selected / Disabled)      */
  /* ========================================== */
  &:disabled {
    border-color: #2563eb;
    background: ${({ $themeMode }) => ($themeMode === 'night' ? '#1e3a8a' : '#dbeafe')};
    color: ${({ $themeMode }) => ($themeMode === 'night' ? '#38bdf8' : '#1d4ed8')};
    cursor: not-allowed;
    opacity: 1;
  }
`;
