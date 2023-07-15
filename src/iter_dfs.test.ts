import { iter_DFS } from "./iter_dfs";
import { PropTree } from "./proptree";


test("iter_dfs", () => {
    const pt = PropTree.new<number|string>()
        .addVal("a", 42)
        .group("b", (g, p) =>g
            .addVal("c", p.a*2)
            .add("d", g => g.c.toString())
        )
        .addVal("e", "foo")
    ;

    //all properties as depth first order
    const answer = [
        ["/a", 42],
        ["/b/c", 84],
        ["/b/d", "84"],
        ["/e", "foo"],
    ];

    const result = [...iter_DFS(pt)];

    //check output
    //console.log(result);

    //check if result contains all properties as depth first order.
    expect(result.every((r, i) => {
        const a = answer[i];
        return r[0] == a[0] && r[1] == a[1];
    })).toBeTruthy();
    
});
