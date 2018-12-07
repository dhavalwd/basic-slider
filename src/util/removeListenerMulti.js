// export `removeListenerMulti` function
export function removeListenerMulti(el, s, fn){
  s.split(' ').forEach(function (e) {
    return el.removeEventListener(e, fn, false);
  });
}
