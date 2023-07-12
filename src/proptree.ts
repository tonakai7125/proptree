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
        PropTree.addProp(this.props, name, groupConstructor(PropTree.new<PropBase>(), this.props).props)
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
