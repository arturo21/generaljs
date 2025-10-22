const fetchapi = (function (global) {
  // 🔧 Utilidad interna para obtener fetch
  function getSocket() {
    return global.fetch || null;
  }

  // 🔧 Utilidad para construir opciones de solicitud
  function buildOptions(method, data = null) {
    const options = {
      method: method.toUpperCase(),
      headers: {
        'Content-Type': 'application/json'
      }
    };
    if (data) {
      options.body = JSON.stringify({ data });
    }
    return options;
  }

  // 🔧 Manejo de respuesta genérico
  function handleResponse(response, callback, parse = 'json') {
    if (!response.ok) {
      console.error(`Error HTTP: ${response.status}`);
      return;
    }

    response[parse]()
      .then(data => {
        try {
          callback(data);
        } catch (e) {
          console.error('Callback error:', e);
        }
      })
      .catch(err => console.error('Parse error:', err));
  }

  return {
    getFetch: function () {
      return getSocket();
    },

    get: function (url, callback) {
      const fetcher = getSocket();
      if (!fetcher) return console.error('Fetch API no disponible');
      fetcher(url)
        .then(response => handleResponse(response, callback, 'json'))
        .catch(err => console.error('Fetch error:', err));
    },

    post: function (url, data, callback) {
      const fetcher = getSocket();
      if (!fetcher) return console.error('Fetch API no disponible');
      const options = buildOptions('POST', data);
      fetcher(url, options)
        .then(response => handleResponse(response, callback, 'text'))
        .catch(err => console.error('Fetch error:', err));
    },

    put: function (url, data, callback) {
      const fetcher = getSocket();
      if (!fetcher) return console.error('Fetch API no disponible');
      const options = buildOptions('PUT', data);
      fetcher(url, options)
        .then(response => handleResponse(response, callback, 'json'))
        .catch(err => console.error('Fetch error:', err));
    },

    delete: function (url, callback) {
      const fetcher = getSocket();
      if (!fetcher) return console.error('Fetch API no disponible');
      const options = buildOptions('DELETE');
      fetcher(url, options)
        .then(response => handleResponse(response, callback, 'json'))
        .catch(err => console.error('Fetch error:', err));
    }
  };
})(window);

module.exports = fetchapi;