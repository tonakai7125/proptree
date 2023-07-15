import { DuplicatePropDefError } from "./duplicatepropdeferror";
import { GeneralType } from "./generaltype";
import { Branch, createBranch } from "./branch";


export class PropTree<PropBase = any, Structure = {}>
{
    public readonly props: Structure & Branch;

    constructor(props: Structure) {
        this.props = createBranch(props);
    }

    add<PropKey extends string, Value extends PropBase>(
        name: PropKey,
        valueConstructor: (props: Structure) => Value
    ) {
        PropTree.addProp(this.props, name, valueConstructor(this.props));
        return this as PropTree<PropBase, Structure & Record<PropKey,GeneralType<Value>>>;
    }

    addVal<PropKey extends string, Value extends PropBase>(
        name: PropKey,
        value: Value
    ) {
        return this.add(name, ()=>value);
    }

    group<PropKey extends string, SubStructure>(
        name: PropKey,
        groupConstructor: (group: PropTree<PropBase>, props: Structure) => PropTree<PropBase,SubStructure>
    ) {
        const e = PropTree.new<PropBase>();
        const g = groupConstructor(e, this.props);
        if (!Object.is(e, g)) throw Error("Unexpected group tree is given. First argument of 'groupConstructor' should be returned after adding any properties.")
        PropTree.addProp(this.props, name, g.props)
        return this as PropTree<PropBase, Structure & Record<PropKey, SubStructure>>
    }

    private static addProp(props: any, name: string, value: any)
    {
        if (name in props) throw new DuplicatePropDefError(name);
        Object.defineProperty(props, name, {
            value: value,
            enumerable: true,
            writable: false,
            configurable: false,
        });
    }

    public static new<Base = any>() { return new PropTree<Base>({}); }
}
