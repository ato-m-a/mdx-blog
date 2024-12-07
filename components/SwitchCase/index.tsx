import type { ReactNode } from 'react';

type SwitchCaseProps<T extends string | number> = {
  value: T;
  caseBy: Partial<Record<T, ReactNode>>;
  default?: ReactNode;
};

const SwitchCase = <T extends string | number>({
  value,
  caseBy,
  default: defaultComponent,
}: SwitchCaseProps<T>): ReactNode => caseBy[value] ?? defaultComponent ?? null;

export default SwitchCase;
