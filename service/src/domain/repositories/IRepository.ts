export interface IRepository<T, TKey> {
  getById(id: TKey): Promise<T | undefined>;
  update(entity: T): Promise<boolean>;
  insert(entity: T): Promise<T>;
  insertMultiple(entities: Array<T>): Promise<T[]>;
  getAll(): Promise<Array<T>>;
  getCount(): Promise<number>;
}
