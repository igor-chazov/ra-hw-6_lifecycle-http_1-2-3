const url = new URL(window.location.href);

if (url.hostname === 'localhost') {
  url.port = '7777';
}

if (url.hostname === 'igor-chazov.github.io') {
  url.hostname = 'ra-6-lifecycle-2-crud-backend.herokuapp.com';
  url.protocol = 'https';
}

const root = url;
root.pathname = '';

const links = {
  root: root.origin,
  notes: new URL('notes', url.href).href,
};

export default links;