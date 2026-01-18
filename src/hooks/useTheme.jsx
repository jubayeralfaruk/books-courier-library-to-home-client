import { use } from 'react';
import { ThemeContext } from '../contexts/ThemeContext';

const useTheme = () => {
  const themeInfo = use(ThemeContext);
  return themeInfo;
};

export default useTheme;
