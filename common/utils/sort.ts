import type { GetCareerResponseSchema } from '@/schema/company/response.schema';

export const sortByExperience = (a: GetCareerResponseSchema, b: GetCareerResponseSchema) => {
  // endDate가 null인지 확인
  const aHasNullEnd = a.experiences.some((e) => e.endDate === null);
  const bHasNullEnd = b.experiences.some((e) => e.endDate === null);

  if (aHasNullEnd && !bHasNullEnd) return -1;
  if (!aHasNullEnd && bHasNullEnd) return 1;

  const getLatestEnd = (experiences: { startDate: Date; endDate: Date | null }[]) => {
    const nonNullEnds = experiences.filter((e) => e.endDate !== null).map((e) => e.endDate as Date);
    if (nonNullEnds.length === 0) return null;
    return nonNullEnds.reduce(
      (max, curr) => (curr > max ? curr : max),
      new Date(-8640000000000000),
    ); // 가장 작은 Date로 초기화
  };

  const aLatestEnd = getLatestEnd(a.experiences);
  const bLatestEnd = getLatestEnd(b.experiences);

  // endDate가 null인 경우는 이미 앞서 처리했으므로 여기서는 null이 아님을 가정
  if (aLatestEnd && bLatestEnd) {
    if (aLatestEnd > bLatestEnd) return -1;
    if (aLatestEnd < bLatestEnd) return 1;
  }

  // endDate가 동일한 경우, startDate의 최솟값(가장 이른 시작일)으로 정렬
  const getEarliestStart = (experiences: { startDate: Date; endDate: Date | null }[]) => {
    return experiences.reduce(
      (min, curr) => (curr.startDate < min ? curr.startDate : min),
      new Date(8640000000000000),
    ); // 매우 큰 Date로 초기화
  };

  const aEarliestStart = getEarliestStart(a.experiences);
  const bEarliestStart = getEarliestStart(b.experiences);

  if (aEarliestStart < bEarliestStart) return -1;
  if (aEarliestStart > bEarliestStart) return 1;

  // 모든 조건이 동일한 경우 변화 없음
  return 0;
};
