# proptree
Library for creating hierarchical properties that can reference predefined properties when setting their respective values

# Usage
```ts
import { PropTree } from "proptree";


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


```
