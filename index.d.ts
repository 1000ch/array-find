declare function find<T>(items: T[], predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): T | undefined;

export default find;
