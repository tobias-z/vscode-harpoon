function createSingletonHandler() {
  const singletonMap = new Map<{ new (): any }, any>();

  return {
    getInstance<T>(
      singleton: { new (): T; new (...args: any): T },
      ...constructorArgs: any[]
    ): T {
      if (singletonMap.has(singleton)) {
        return singletonMap.get(singleton) as T;
      }
      const instance =
        constructorArgs.length > 0 ? new singleton(...constructorArgs) : new singleton();
      singletonMap.set(singleton, instance);
      return instance as T;
    },
  };
}

export const { getInstance } = createSingletonHandler();
