import localFont from 'next/font/local';

const JetBrainsMono = localFont({
  src: '../../public/fonts/JetBrainsMono[wght].woff2',
  style: 'normal',
  weight: '100 900',
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export default JetBrainsMono;
