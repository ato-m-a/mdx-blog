import localFont from 'next/font/local';

const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  style: 'normal',
  weight: '100 900',
  variable: '--font-pretendard',
  display: 'swap',
});

export default pretendard;
