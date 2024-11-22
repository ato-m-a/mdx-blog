export type SearchParamsRecord = Record<string, string | undefined>;
export type DispatchSearchParamsProps =
  | SearchParamsRecord
  | ((prev: SearchParamsRecord) => SearchParamsRecord);
export type DispatchSearchParamsOptions = { replace: boolean };
export type DispatchSearchParams = (
  setter: DispatchSearchParamsProps,
  options?: DispatchSearchParamsOptions,
) => void;
export type SearchParamsContextType = {
  searchParams: SearchParamsRecord;
  setSearchParams: DispatchSearchParams;
  isPending: boolean;
};
