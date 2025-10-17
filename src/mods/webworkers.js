/*
  Copyright (C) 2025 Arturo Vasquez Soluciones Web.
  Todos los derechos reservados.
  Licencia MIT
*/

const ww = (function () {
  const workers = new Map();       // nombreid → Worker
  const queue = new Map();         // nombreid → [pending messages]
  const metrics = new Map();       // nombreid → { createdAt, messages, errors }
  const channels = new Map();      // topic → Set of nombreid
  const paused = new Set();        // nombreid → paused state
  const log = console.log;
  const error = console.error;

  function createWorker(nombreid, filename) {
    if (!window.Worker) {
      error("El WebWorker API no está soportado por el navegador.");
      return null;
    }

    try {
      const worker = new Worker(filename);
      const stats = { createdAt: Date.now(), messages: 0, errors: 0 };
      metrics.set(nombreid, stats);
      queue.set(nombreid, []);

      worker.addEventListener("message", e => {
        if (!paused.has(nombreid)) {
          stats.messages++;
          log(`📨 [${nombreid}] Mensaje recibido:`, e.data);
        }
      });

      worker.addEventListener("error", e => {
        stats.errors++;
        error(`🛑 [${nombreid}] Error:`, e.message);
      });

      workers.set(nombreid, worker);
      return worker;
    } catch (e) {
      error("Error al crear Worker:", e);
      return null;
    }
  }

  function getWorker(nombreid) {
    return workers.get(nombreid) || null;
  }

  function flush(nombreid) {
    const worker = getWorker(nombreid);
    const pending = queue.get(nombreid);
    if (worker && pending?.length) {
      pending.forEach(msg => worker.postMessage(msg));
      queue.set(nombreid, []);
      log(`🚀 [${nombreid}] Mensajes pendientes enviados.`);
    }
  }

  return {
    /**
     * Crea un nuevo WebWorker
     */
    set(nombreid, filename) {
      if (!workers.has(nombreid) && filename) {
        return createWorker(nombreid, filename);
      }
      log(`ℹ️ Worker "${nombreid}" ya existe o filename inválido.`);
      return null;
    },

    /**
     * Obtiene un Worker por nombre
     */
    get(nombreid) {
      const worker = getWorker(nombreid);
      return worker ? { id: nombreid, worker } : { id: null, worker: null };
    },

    /**
     * Envía un mensaje al Worker
     */
    send(nombreid, message) {
      const worker = getWorker(nombreid);
      if (worker) {
        worker.postMessage(message);
        log(`📤 [${nombreid}] Enviado:`, message);
        return true;
      } else {
        queue.get(nombreid)?.push(message);
        log(`⏳ [${nombreid}] Worker no disponible. Mensaje en cola.`);
        return false;
      }
    },

    /**
     * Escucha mensajes del Worker
     */
    receive(nombreid, callback) {
      const worker = getWorker(nombreid);
      if (worker) {
        worker.addEventListener("message", e => {
          if (!paused.has(nombreid)) callback(e.data);
        });
        log(`👂 [${nombreid}] Escuchando mensajes.`);
        return true;
      }
      return false;
    },

    /**
     * Termina el Worker
     */
    terminate(nombreid) {
      const worker = getWorker(nombreid);
      if (worker) {
        worker.terminate();
        workers.delete(nombreid);
        queue.delete(nombreid);
        metrics.delete(nombreid);
        paused.delete(nombreid);
        log(`🔒 Worker "${nombreid}" terminado.`);
        return true;
      }
      return false;
    },

    /**
     * Cierra el Worker (alias de terminate)
     */
    close(nombreid) {
      return this.terminate(nombreid);
    },

    /**
     * Reenvía mensajes en cola
     */
    flush(nombreid) {
      flush(nombreid);
    },

    /**
     * Pausa la recepción de mensajes
     */
    pause(nombreid) {
      paused.add(nombreid);
      log(`⏸️ [${nombreid}] Pausado.`);
    },

    /**
     * Reanuda la recepción de mensajes
     */
    resume(nombreid) {
      paused.delete(nombreid);
      log(`▶️ [${nombreid}] Reanudado.`);
    },

    /**
     * Suscribe un Worker a un canal temático
     */
    subscribe(nombreid, topic, callback) {
      if (!channels.has(topic)) channels.set(topic, new Set());
      channels.get(topic).add(nombreid);
      this.receive(nombreid, callback);
      log(`📡 [${nombreid}] Suscrito a "${topic}"`);
    },

    /**
     * Envía un mensaje a todos los Workers suscritos a un canal
     */
    broadcast(topic, message) {
      const ids = channels.get(topic);
      if (ids) {
        ids.forEach(id => this.send(id, message));
        log(`📢 Broadcast a "${topic}":`, message);
      }
    },

    /**
     * Métricas del Worker
     */
    stats(nombreid) {
      return metrics.get(nombreid) || null;
    },

    /**
     * Lista de Workers activos
     */
    list() {
      return Array.from(workers.keys());
    }
  };
})();

module.exports = ww;
