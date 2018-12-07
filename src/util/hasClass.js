// export `hasClass` function
export function hasClass(el, className){
  return el.classList ? el.classList.contains(className) : new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}
