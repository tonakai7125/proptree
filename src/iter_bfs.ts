import { GenericProps, isBranch } from "./branch";
import { PropTree } from "./proptree";


export function *iter_BFS<T,S>(tree: PropTree<T,S>, sep: string = "/") {
    const p = tree.props as GenericProps<T>;

    const q = [["",p]] as [string, T|GenericProps<T>][];

    while (1) {
        const x = q.pop();
        if (x === undefined) break;
        const [n, c] = x;
        if (isBranch(c)) {
            q.unshift(...Object.entries(c).map(
                y => [n + sep + y[0], y[1]] as [string, T|GenericProps<T>]
            ).reverse());
        } else {
            yield [n, c] as [string, T];
        }
    }
}