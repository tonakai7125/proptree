

const branchFlag = Symbol("branchFlag");


export type Branch = { readonly [branchFlag]: boolean; };


export type GenericProps<PropBase = any> =
    { [key: string]: PropBase | GenericProps<PropBase> } &
    Branch;


export function isBranch<PropBase = any>(props: PropBase | GenericProps<PropBase>)
: props is GenericProps<PropBase>{
    return typeof props === "object" &&
        props !== null &&
        branchFlag in props;
}

export function createBranch<T>(obj: T): T & Branch {
    return Object.defineProperty(obj, branchFlag, {
        value: true,
        writable: false,
        enumerable: false,
        configurable: false
    }) as T & Branch;
}
