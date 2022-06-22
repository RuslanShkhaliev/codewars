function solve_graph(s, e, arcs) {
  if (s === e) return true;

  const find = (routes, start) => {
    const index = routes.findIndex((route) => route.start === start)
    return index > -1 ? routes.splice(index, 1)[0] : null;
  };

  const copyArcs = arcs.slice()
  let current = find(copyArcs, s);

  if (!current) {
    return false
  }
  if (current.start === s && current.end === e) {
    return true
  }

  while(copyArcs.length) {
    const { start, end } = current;
    const route = find(copyArcs, end);
    if (!route) {
      return false;
    }
    if (route.end === s) {
      continue
    }
    if (route.end === e) {
      return true
    }
    current = route;
  }

  return false
}
