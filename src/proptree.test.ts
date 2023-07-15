import { PropTree } from "./proptree";


test("proptree", () => {

    const ptree = PropTree.new<number|string>() // create property tree that contains value extended number or string
        .add("answer", () => 42) //add property by value construction function
        .addVal("directDef", "abc") //add property by specifying a value directry
        .add("twice", p=>p.answer*2) //using above properties for value construction
        .group("someGroup", (g, root) => g //add sub property group('g' should be returned with any additional properties.)
            .addVal("child", "foo") //add property in this group
            .add("usingGroupProp", g => g.child+"bar") //using above properties in this group. ('child' in this example)
            .addVal("usingAllProp", root.answer.toString()) //using all above properties for value construction
        )
    ;

/*
* ptree.props has following properties.
* {
*    answer: 42,
*    directDef: "abc",
*    twice: 84,
*    someGroup: {
*        child: "foo",
*        usingGroupProp: "foobar",
*        usingAllProp: "42"
*    }
* };
* 
* this properties are { writable:false, enumerable: true, configurable: false }
*/

    expect(ptree.props.answer).toBe(42);
    expect(ptree.props.directDef).toBe("abc");
    expect(ptree.props.twice).toBe(84);
    expect(ptree.props.someGroup.child).toBe("foo");
    expect(ptree.props.someGroup.usingGroupProp).toBe("foobar");
    expect(ptree.props.someGroup.usingAllProp).toBe("42");

});

test("proptree: invalid group", () => {
    const someTree = PropTree.new<number>()
        .addVal("a", 1)
    ;

    expect(() => PropTree.new<number>().group("b", () => someTree)).toThrow();
});