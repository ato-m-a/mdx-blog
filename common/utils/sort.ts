import type { GetCareerResponseSchema } from '@/schema/company/response.schema';

export const sortByExperience = (a: GetCareerResponseSchema, b: GetCareerResponseSchema) => {
  // 각 company별로 startDate 중 최솟값(earliest_start), endDate 중 최대값(latest_end), null endDate 존재여부 계산
  
  const getEarliestStart = (experiences: { startDate: Date, endDate: Date | null }[]) => {
    return experiences.reduce((min, curr) => {
      if (curr.startDate < min) return curr.startDate;
      return min;
    }, new Date(8640000000000000)); // 아주 큰 값으로 초기화(비교용)
  }

  const getLatestEnd = (experiences: { startDate: Date, endDate: Date | null }[]) => {
    // endDate 중 null이 아니라면 그 중 최대값
    // 만약 전부 null이라면 null 반환
    const nonNullEnds = experiences.filter(e => e.endDate !== null).map(e => e.endDate as Date);
    if (nonNullEnds.length === 0) return null;
    return nonNullEnds.reduce((max, curr) => {
      if (curr > max) return curr;
      return max;
    }, new Date(-8640000000000000)); // 아주 작은 값으로 초기화
  }

  const hasNullEnd = (experiences: { startDate: Date, endDate: Date | null }[]) => {
    return experiences.some(e => e.endDate === null);
  }

  const aHasNull = hasNullEnd(a.experiences);
  const bHasNull = hasNullEnd(b.experiences);

  // null endDate 우선 정렬
  if (aHasNull && !bHasNull) return -1; // a가 위로
  if (!aHasNull && bHasNull) return 1;  // b가 위로

  // 둘다 null을 가지거나 둘 다 없는 경우 startDate 비교
  const aEarliest = getEarliestStart(a.experiences);
  const bEarliest = getEarliestStart(b.experiences);
  if (aEarliest < bEarliest) return -1;
  if (aEarliest > bEarliest) return 1;

  // startDate도 같다면 latest_end 비교 (null이 있을 경우 처리)
  const aLatest = getLatestEnd(a.experiences);
  const bLatest = getLatestEnd(b.experiences);

  // null vs 값 비교: null이면 최대값 비교에서 유리하지 않으므로, 여기선 null을 가장 작은 값 취급
  // 하지만 요구사항에 따라 로직 변경 가능
  if (aLatest === null && bLatest !== null) return 1;  // a가 endDate 전부 null이고, b는 있음 -> b가 더 늦은 값이 있으니 b를 위로
  if (bLatest === null && aLatest !== null) return -1; // 반대 상황
  
  if (aLatest && bLatest) {
    // latest_end desc 정렬이므로 더 큰 endDate 가진 쪽이 앞으로
    if (aLatest > bLatest) return -1;
    if (aLatest < bLatest) return 1;
  }

  // 모든 조건 동일하면 변화 없음
  return 0;
}