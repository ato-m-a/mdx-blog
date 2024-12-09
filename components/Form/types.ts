export type FormAction = 'update' | 'create';
export type FormProps<T extends object> =
  /** update action with defaultValues */
  | {
      action: Extract<FormAction, 'update'>;
      defaultValues: T;
    }
  /** create action without defaultValues */
  | {
      action: Extract<FormAction, 'create'>;
      defaultValues?: never;
    };
