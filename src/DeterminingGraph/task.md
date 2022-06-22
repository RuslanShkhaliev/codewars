https://www.codewars.com/kata/53223653a191940f2b000877

Implement a function `solve_graph`/`solveGraph` (or equivalent depending on your language) accepting 3 arguments in the given order:

1. `start` - The initial node of the directed graph
2. `end` - The destination node of the directed graph
3. `arcs` - A directed graph represented by a list/array of directed edges

and returns a boolean value depending on whether the destination node can be reached from the initial node by traversing _zero or more_ directed edges.
That means that if the `start` and `end` nodes are identical then the `end` node is trivially considered to be reachable - return `true`/`True` in this case.
Also, if the `start` and `end` nodes are distinct and either node does not appear in `arcs` then you should return `false`/`False` since there
is no sequence of directed edges that you may traverse to reach the `end` node from the `start` node.

You may not assume any properties of the given directed graph (other than the fact that it is a directed graph) - for example,
the given directed graph may contain multiple edges (in either direction) between two nodes or contain loops (directed edges starting and finishing on the same node).

You may also wish to take a look at adjacency lists.

### Example:

```
var arcs = [
{ start : "a", end : "b" },
{ start : "a", end : "a"}
];

solve_graph("a", "b", arcs);
// Should return true, because "b" can be reached from "a"

solve_graph("a", "c", arcs);
// Should return false, because "c" can never be reached from "a", using any combination of arcs
```
