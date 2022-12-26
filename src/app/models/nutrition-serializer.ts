export abstract class NutritionSerializer<A, B> {
  public constructor(protected readonly obj: B) {}

  public stringGuard(value: unknown): value is string {
    return typeof value === 'string';
  }

  public numberGuard(value: unknown): value is number {
    return typeof value === 'number';
  }

  public arrayGuard<T>(value: unknown): value is Array<T> {
    return Array.isArray(value);
  }

  public hasField<K extends keyof A>(
    key: K
  ): this is { obj: Record<K, unknown> } {
    return key in this.obj;
  }

  public serialize<T, K extends keyof A>(
    key: K,
    fn: (value: unknown) => value is T
  ): T {
    if (this.hasField(key)) {
      const value = this.obj[key];

      if (fn(value)) {
        return value;
      }
    }

    //TODO set current type key
    throw new Error(`${String(key)} is undefined`);
  }
}
