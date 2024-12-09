import type { ExperienceSchema } from '@/schema/experience/base.schema';
import { format } from 'date-fns';

type GetPeriodOptions = {
  format: string;
  join?: string;
} & ({ flat: true; fallback?: never } | { flat?: never; fallback: string });

/**
 * ExperienceSchema 배열을 전달받아 재직 기간을 반환합니다.
 * @param experiences {ExperienceSchema[]} 이력 목록
 * @param options {GetPeriodOptions} 옵션
 * @param options.format {string} 날짜 포맷
 * @param options.join {string} 구분자
 * @param options.flat {boolean} 해당 경력이 현재 진행 중일 때 시작일자에 대한 formatted 문자열만 반환할지 여부
 * @param options.fallback {string} 해당 경력이 현재 진행 중일 때 반환할 문자열
 * @returns {string} 재직 기간
 *
 * @example
 * getPeriod([{ startDate: new Date('2020-01-01'), endDate: new Date('2020-01-05') }], { format: 'yyyy.MM.dd' })
 * // '2020.01.01 - 2020.01.05'
 *
 * getPeriod([{ startDate: new Date('2020-01-01'), endDate: new Date('2020-01-05') }], {
 *   format: 'yyyy.MM.dd',
 *   fallback: '재직중',
 * })
 * // '2020.01.01 - 재직중'
 *
 * getPeriod([{ startDate: new Date('2020-01-01'), endDate: new Date('2020-01-05') }], {
 *   format: 'yyyy.MM.dd',
 *   flat: true,
 * })
 * // '2020.01.01
 */
const getPeriod = (
  experiences: ExperienceSchema[],
  { format: dateFormat, join = ' - ', flat, fallback }: GetPeriodOptions,
) => {
  if (!experiences.length) return '재직 정보 없음';

  return [experiences[0], experiences[experiences.length - 1]]
    .flatMap(({ startDate, endDate }, index) => {
      switch (index) {
        case 0:
          return format(startDate, dateFormat);
        case 1:
          return endDate ? format(endDate, dateFormat) : flat ? [] : fallback;
      }
    })
    .join(join);
};

export default getPeriod;
