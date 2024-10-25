'use server';

import { dehydrate } from '@tanstack/react-query';
import { createHelpers } from '../server';

type Helpers = ReturnType<typeof createHelpers>;
type Queries = (helpers: Helpers) => Promise<void>[];

/**
 * tRPC procedure를 병렬로 실행하고 Dynamic rendering을 위한 dehydrated state를 반환합니다.
 *
 * @param queries serverSideHelpers를 인자로 전달하여 병렬로 실행할 procedure query 배열을 전달합니다.
 *
 * @example
 * const dehydrated = await getDehydrated((helpers) => [
 *   helpers.skill.getMany.prefetch(),
 *   helpers.career.getMany.prefetch(),
 *   helpers.project.getMany.prefetch()
 * ]);
 */
const getDehydrated = async (queries: Queries) => {
  const helpers = createHelpers();

  await Promise.all(queries(helpers));

  return dehydrate(helpers.queryClient);
};

export default getDehydrated;
