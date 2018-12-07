// export `addListenerMulti` function
export function addListenerMulti(el, s, fn){
  s.split(' ').forEach(function (e) {
    return el.addEventListener(e, fn, false);
  });
}
