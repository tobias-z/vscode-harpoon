function createSingletonHandler() {
  type Key = { new (): any };
  const singletonMap = new Map<Key, any>();

  return {
    getInstance<T>(singleton: { new (): T }): T {
      if (singletonMap.has(singleton)) {
        return singletonMap.get(singleton) as T;
      }
      const instance = new singleton();
      singletonMap.set(singleton, instance);
      return instance as T;
    },
  };
}

export const { getInstance } = createSingletonHandler();
