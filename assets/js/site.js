(function () {
  var button = document.querySelector('.menu-toggle');
  var nav = document.querySelector('#site-nav');
  if (!button || !nav) return;
  button.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    button.setAttribute('aria-expanded', String(open));
    button.textContent = open ? 'close' : 'menu';
  });
}());
