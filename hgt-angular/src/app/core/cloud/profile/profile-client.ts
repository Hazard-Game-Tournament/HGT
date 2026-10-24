export interface ProfileQuery {
  select(fields: string): ProfileQuery;
  eq(field: string, value: unknown): ProfileQuery;
  update(value: unknown): ProfileQuery;
  insert(value: unknown): ProfileQuery;
  single(): Promise<{ data: any; error: any }>;
  maybeSingle(): Promise<{ data: any; error: any }>;
}

export interface ProfileCloudClient {
  from(table: string): ProfileQuery;
}
