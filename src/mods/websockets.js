/*
  Copyright (C) 2025 Arturo Vasquez Soluciones Web.
  Todos los derechos reservados.
  Licencia: MIT
*/

const ws = (function () {
  const sockets = new Map(); // nombreid → WebSocket
  const channels = new Map(); // topic → Set of nombreid
  const metrics = new Map(); // nombreid → { openAt, messages, errors }
  const queue = new Map(); // nombreid → [pending messages]
  const log = console.log;
  const error = console.error;

  function createSocket(nombreid, urldir) {
    if (!window.WebSocket) {
      error("El WebSocket API no está soportado por el navegador.");
      return null;
    }

    try {
      const socket = new WebSocket(urldir);
      const stats = { openAt: null, messages: 0, errors: 0 };
      metrics.set(nombreid, stats);

      socket.addEventListener("open", () => {
        stats.openAt = Date.now();
        log(`✅ Conexión abierta: ${nombreid}`);
        flush(nombreid);
      });

      socket.addEventListener("message", e => {
        stats.messages++;
        log(`📨 [${nombreid}] Mensaje recibido:`, e.data);
      });

      socket.addEventListener("error", e => {
        stats.errors++;
        error(`🛑 [${nombreid}] Error:`, e.error);
      });

      sockets.set(nombreid, socket);
      queue.set(nombreid, []);
      return socket;
    } catch (e) {
      error("Error al crear WebSocket:", e);
      return null;
    }
  }

  function getSocket(nombreid) {
    return sockets.get(nombreid) || null;
  }

  function flush(nombreid) {
    const socket = getSocket(nombreid);
    const pending = queue.get(nombreid);
    if (socket && socket.readyState === WebSocket.OPEN && pending?.length) {
      pending.forEach(msg => socket.send(msg));
      queue.set(nombreid, []);
      log(`🚀 [${nombreid}] Mensajes pendientes enviados.`);
    }
  }

  return {
    set(nombreid, urldir) {
      if (!sockets.has(nombreid) && urldir) {
        return createSocket(nombreid, urldir);
      }
      log(`ℹ️ Socket "${nombreid}" ya existe o URL inválida.`);
      return null;
    },

    get(nombreid) {
      const socket = getSocket(nombreid);
      return socket ? { id: nombreid, socket } : { id: null, socket: null };
    },

    close(nombreid) {
      const socket = getSocket(nombreid);
      if (socket) {
        socket.close();
        sockets.delete(nombreid);
        queue.delete(nombreid);
        metrics.delete(nombreid);
        log(`🔒 Socket "${nombreid}" cerrado.`);
        return true;
      }
      return false;
    },

    send(nombreid, message) {
      const socket = getSocket(nombreid);
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(message);
        log(`📤 [${nombreid}] Enviado:`, message);
        return true;
      } else {
        queue.get(nombreid)?.push(message);
        log(`⏳ [${nombreid}] Socket no abierto. Mensaje en cola.`);
        return false;
      }
    },

    receive(nombreid, callback) {
      const socket = getSocket(nombreid);
      if (socket) {
        socket.addEventListener("message", event => callback(event.data));
        log(`👂 [${nombreid}] Escuchando mensajes.`);
        return true;
      }
      return false;
    },

    reply(nombreid, callback) {
      return this.receive(nombreid, callback);
    },

    isOpen(nombreid) {
      const socket = getSocket(nombreid);
      return socket?.readyState === WebSocket.OPEN;
    },

    reconnect(nombreid, urldir) {
      const socket = getSocket(nombreid);
      if (!socket || socket.readyState === WebSocket.CLOSED) {
        log(`🔄 Reconectando "${nombreid}"...`);
        return createSocket(nombreid, urldir);
      }
      log(`✅ Socket "${nombreid}" ya está activo.`);
      return socket;
    },

    subscribe(nombreid, topic, callback) {
      if (!channels.has(topic)) channels.set(topic, new Set());
      channels.get(topic).add(nombreid);
      this.receive(nombreid, callback);
      log(`📡 [${nombreid}] Suscrito a "${topic}"`);
    },

    broadcast(topic, message) {
      const ids = channels.get(topic);
      if (ids) {
        ids.forEach(id => this.send(id, message));
        log(`📢 Broadcast a "${topic}":`, message);
      }
    },

    pause(nombreid) {
      const socket = getSocket(nombreid);
      if (socket) socket.onmessage = null;
      log(`⏸️ [${nombreid}] Pausado.`);
    },

    resume(nombreid, callback) {
      this.receive(nombreid, callback);
      log(`▶️ [${nombreid}] Reanudado.`);
    },

    flush(nombreid) {
      flush(nombreid);
    },

    stats(nombreid) {
      return metrics.get(nombreid) || null;
    },

    list() {
      return Array.from(sockets.keys());
    }
  };
})();

module.exports = ws;
