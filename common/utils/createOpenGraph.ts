type Options = {
  pathname: string;
  title: string | string[];
  subtitle?: string;
  theme?: 'light' | 'dark';
};

/**
 * @description opengraph image url 생성 함수입니다.
 * @param {Options} options - 페이지 정보
 * @param {string} options.pathname - 최상단에 표시되는 현재 페이지의 pathname. capitalize 처리됩니다.
 * @param {string | string[]} options.title - 페이지의 제목으로, 배열일 경우 줄바꿈 처리
 * @param {string} options.subtitle - 부제목입니다. (optional)
 * @param {'light' | 'dark'} options.theme - 테마 설정 (optional)
 * @returns {string} opengraph image url
 *
 * @example
 * createOpenGraph({ pathname: 'home', title: '홍준혁 | 웹 프론트엔드 개발자' });
 * createOpenGraph({ pathname: 'home', title: ['웹 프론트엔드 개발자 홍준혁입니다.', '찾아주셔서 감사합니다!'] });
 * createOpenGraph({
 *  pathname: 'post',
 *  title: '타입 안정성 보장하기',
 *  subtitle: 'tRPC를 사용한 요청/응답 데이터 타입 안정성 보장',
 *  categories: ['TanStack Query', 'tRPC']
 * });
 */
const createOpenGraph = ({ pathname, title, subtitle, theme }: Options): string => {
  const urlPrefix = '/api/og/';
  const searchParams = new URLSearchParams({
    title: title instanceof Array ? title.join(`\\n`) : title,
  });

  if (subtitle) searchParams.append('subtitle', subtitle);
  if (theme) searchParams.append('theme', theme);

  return `${urlPrefix}${pathname}?${searchParams.toString()}`;
};

export default createOpenGraph;
