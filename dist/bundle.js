/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory();
	}
	else {}
}(this, function () {

	/**
	 * CryptoJS core components.
	 */
	var CryptoJS = CryptoJS || (function (Math, undefined) {
	    /*
	     * Local polyfil of Object.create
	     */
	    var create = Object.create || (function () {
	        function F() {};

	        return function (obj) {
	            var subtype;

	            F.prototype = obj;

	            subtype = new F();

	            F.prototype = null;

	            return subtype;
	        };
	    }())

	    /**
	     * CryptoJS namespace.
	     */
	    var C = {};

	    /**
	     * Library namespace.
	     */
	    var C_lib = C.lib = {};

	    /**
	     * Base object for prototypal inheritance.
	     */
	    var Base = C_lib.Base = (function () {


	        return {
	            /**
	             * Creates a new object that inherits from this object.
	             *
	             * @param {Object} overrides Properties to copy into the new object.
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         field: 'value',
	             *
	             *         method: function () {
	             *         }
	             *     });
	             */
	            extend: function (overrides) {
	                // Spawn
	                var subtype = create(this);

	                // Augment
	                if (overrides) {
	                    subtype.mixIn(overrides);
	                }

	                // Create default initializer
	                if (!subtype.hasOwnProperty('init') || this.init === subtype.init) {
	                    subtype.init = function () {
	                        subtype.$super.init.apply(this, arguments);
	                    };
	                }

	                // Initializer's prototype is the subtype object
	                subtype.init.prototype = subtype;

	                // Reference supertype
	                subtype.$super = this;

	                return subtype;
	            },

	            /**
	             * Extends this object and runs the init method.
	             * Arguments to create() will be passed to init().
	             *
	             * @return {Object} The new object.
	             *
	             * @static
	             *
	             * @example
	             *
	             *     var instance = MyType.create();
	             */
	            create: function () {
	                var instance = this.extend();
	                instance.init.apply(instance, arguments);

	                return instance;
	            },

	            /**
	             * Initializes a newly created object.
	             * Override this method to add some logic when your objects are created.
	             *
	             * @example
	             *
	             *     var MyType = CryptoJS.lib.Base.extend({
	             *         init: function () {
	             *             // ...
	             *         }
	             *     });
	             */
	            init: function () {
	            },

	            /**
	             * Copies properties into this object.
	             *
	             * @param {Object} properties The properties to mix in.
	             *
	             * @example
	             *
	             *     MyType.mixIn({
	             *         field: 'value'
	             *     });
	             */
	            mixIn: function (properties) {
	                for (var propertyName in properties) {
	                    if (properties.hasOwnProperty(propertyName)) {
	                        this[propertyName] = properties[propertyName];
	                    }
	                }

	                // IE won't copy toString using the loop above
	                if (properties.hasOwnProperty('toString')) {
	                    this.toString = properties.toString;
	                }
	            },

	            /**
	             * Creates a copy of this object.
	             *
	             * @return {Object} The clone.
	             *
	             * @example
	             *
	             *     var clone = instance.clone();
	             */
	            clone: function () {
	                return this.init.prototype.extend(this);
	            }
	        };
	    }());

	    /**
	     * An array of 32-bit words.
	     *
	     * @property {Array} words The array of 32-bit words.
	     * @property {number} sigBytes The number of significant bytes in this word array.
	     */
	    var WordArray = C_lib.WordArray = Base.extend({
	        /**
	         * Initializes a newly created word array.
	         *
	         * @param {Array} words (Optional) An array of 32-bit words.
	         * @param {number} sigBytes (Optional) The number of significant bytes in the words.
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.create();
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607]);
	         *     var wordArray = CryptoJS.lib.WordArray.create([0x00010203, 0x04050607], 6);
	         */
	        init: function (words, sigBytes) {
	            words = this.words = words || [];

	            if (sigBytes != undefined) {
	                this.sigBytes = sigBytes;
	            } else {
	                this.sigBytes = words.length * 4;
	            }
	        },

	        /**
	         * Converts this word array to a string.
	         *
	         * @param {Encoder} encoder (Optional) The encoding strategy to use. Default: CryptoJS.enc.Hex
	         *
	         * @return {string} The stringified word array.
	         *
	         * @example
	         *
	         *     var string = wordArray + '';
	         *     var string = wordArray.toString();
	         *     var string = wordArray.toString(CryptoJS.enc.Utf8);
	         */
	        toString: function (encoder) {
	            return (encoder || Hex).stringify(this);
	        },

	        /**
	         * Concatenates a word array to this word array.
	         *
	         * @param {WordArray} wordArray The word array to append.
	         *
	         * @return {WordArray} This word array.
	         *
	         * @example
	         *
	         *     wordArray1.concat(wordArray2);
	         */
	        concat: function (wordArray) {
	            // Shortcuts
	            var thisWords = this.words;
	            var thatWords = wordArray.words;
	            var thisSigBytes = this.sigBytes;
	            var thatSigBytes = wordArray.sigBytes;

	            // Clamp excess bits
	            this.clamp();

	            // Concat
	            if (thisSigBytes % 4) {
	                // Copy one byte at a time
	                for (var i = 0; i < thatSigBytes; i++) {
	                    var thatByte = (thatWords[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                    thisWords[(thisSigBytes + i) >>> 2] |= thatByte << (24 - ((thisSigBytes + i) % 4) * 8);
	                }
	            } else {
	                // Copy one word at a time
	                for (var i = 0; i < thatSigBytes; i += 4) {
	                    thisWords[(thisSigBytes + i) >>> 2] = thatWords[i >>> 2];
	                }
	            }
	            this.sigBytes += thatSigBytes;

	            // Chainable
	            return this;
	        },

	        /**
	         * Removes insignificant bits.
	         *
	         * @example
	         *
	         *     wordArray.clamp();
	         */
	        clamp: function () {
	            // Shortcuts
	            var words = this.words;
	            var sigBytes = this.sigBytes;

	            // Clamp
	            words[sigBytes >>> 2] &= 0xffffffff << (32 - (sigBytes % 4) * 8);
	            words.length = Math.ceil(sigBytes / 4);
	        },

	        /**
	         * Creates a copy of this word array.
	         *
	         * @return {WordArray} The clone.
	         *
	         * @example
	         *
	         *     var clone = wordArray.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone.words = this.words.slice(0);

	            return clone;
	        },

	        /**
	         * Creates a word array filled with random bytes.
	         *
	         * @param {number} nBytes The number of random bytes to generate.
	         *
	         * @return {WordArray} The random word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.lib.WordArray.random(16);
	         */
	        random: function (nBytes) {
	            var words = [];

	            var r = (function (m_w) {
	                var m_w = m_w;
	                var m_z = 0x3ade68b1;
	                var mask = 0xffffffff;

	                return function () {
	                    m_z = (0x9069 * (m_z & 0xFFFF) + (m_z >> 0x10)) & mask;
	                    m_w = (0x4650 * (m_w & 0xFFFF) + (m_w >> 0x10)) & mask;
	                    var result = ((m_z << 0x10) + m_w) & mask;
	                    result /= 0x100000000;
	                    result += 0.5;
	                    return result * (Math.random() > .5 ? 1 : -1);
	                }
	            });

	            for (var i = 0, rcache; i < nBytes; i += 4) {
	                var _r = r((rcache || Math.random()) * 0x100000000);

	                rcache = _r() * 0x3ade67b7;
	                words.push((_r() * 0x100000000) | 0);
	            }

	            return new WordArray.init(words, nBytes);
	        }
	    });

	    /**
	     * Encoder namespace.
	     */
	    var C_enc = C.enc = {};

	    /**
	     * Hex encoding strategy.
	     */
	    var Hex = C_enc.Hex = {
	        /**
	         * Converts a word array to a hex string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The hex string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var hexString = CryptoJS.enc.Hex.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var hexChars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                hexChars.push((bite >>> 4).toString(16));
	                hexChars.push((bite & 0x0f).toString(16));
	            }

	            return hexChars.join('');
	        },

	        /**
	         * Converts a hex string to a word array.
	         *
	         * @param {string} hexStr The hex string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Hex.parse(hexString);
	         */
	        parse: function (hexStr) {
	            // Shortcut
	            var hexStrLength = hexStr.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < hexStrLength; i += 2) {
	                words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << (24 - (i % 8) * 4);
	            }

	            return new WordArray.init(words, hexStrLength / 2);
	        }
	    };

	    /**
	     * Latin1 encoding strategy.
	     */
	    var Latin1 = C_enc.Latin1 = {
	        /**
	         * Converts a word array to a Latin1 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Latin1 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var latin1String = CryptoJS.enc.Latin1.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;

	            // Convert
	            var latin1Chars = [];
	            for (var i = 0; i < sigBytes; i++) {
	                var bite = (words[i >>> 2] >>> (24 - (i % 4) * 8)) & 0xff;
	                latin1Chars.push(String.fromCharCode(bite));
	            }

	            return latin1Chars.join('');
	        },

	        /**
	         * Converts a Latin1 string to a word array.
	         *
	         * @param {string} latin1Str The Latin1 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Latin1.parse(latin1String);
	         */
	        parse: function (latin1Str) {
	            // Shortcut
	            var latin1StrLength = latin1Str.length;

	            // Convert
	            var words = [];
	            for (var i = 0; i < latin1StrLength; i++) {
	                words[i >>> 2] |= (latin1Str.charCodeAt(i) & 0xff) << (24 - (i % 4) * 8);
	            }

	            return new WordArray.init(words, latin1StrLength);
	        }
	    };

	    /**
	     * UTF-8 encoding strategy.
	     */
	    var Utf8 = C_enc.Utf8 = {
	        /**
	         * Converts a word array to a UTF-8 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The UTF-8 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var utf8String = CryptoJS.enc.Utf8.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            try {
	                return decodeURIComponent(escape(Latin1.stringify(wordArray)));
	            } catch (e) {
	                throw new Error('Malformed UTF-8 data');
	            }
	        },

	        /**
	         * Converts a UTF-8 string to a word array.
	         *
	         * @param {string} utf8Str The UTF-8 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Utf8.parse(utf8String);
	         */
	        parse: function (utf8Str) {
	            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
	        }
	    };

	    /**
	     * Abstract buffered block algorithm template.
	     *
	     * The property blockSize must be implemented in a concrete subtype.
	     *
	     * @property {number} _minBufferSize The number of blocks that should be kept unprocessed in the buffer. Default: 0
	     */
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
	        /**
	         * Resets this block algorithm's data buffer to its initial state.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm.reset();
	         */
	        reset: function () {
	            // Initial values
	            this._data = new WordArray.init();
	            this._nDataBytes = 0;
	        },

	        /**
	         * Adds new data to this block algorithm's buffer.
	         *
	         * @param {WordArray|string} data The data to append. Strings are converted to a WordArray using UTF-8.
	         *
	         * @example
	         *
	         *     bufferedBlockAlgorithm._append('data');
	         *     bufferedBlockAlgorithm._append(wordArray);
	         */
	        _append: function (data) {
	            // Convert string to WordArray, else assume WordArray already
	            if (typeof data == 'string') {
	                data = Utf8.parse(data);
	            }

	            // Append
	            this._data.concat(data);
	            this._nDataBytes += data.sigBytes;
	        },

	        /**
	         * Processes available data blocks.
	         *
	         * This method invokes _doProcessBlock(offset), which must be implemented by a concrete subtype.
	         *
	         * @param {boolean} doFlush Whether all blocks and partial blocks should be processed.
	         *
	         * @return {WordArray} The processed data.
	         *
	         * @example
	         *
	         *     var processedData = bufferedBlockAlgorithm._process();
	         *     var processedData = bufferedBlockAlgorithm._process(!!'flush');
	         */
	        _process: function (doFlush) {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;
	            var dataSigBytes = data.sigBytes;
	            var blockSize = this.blockSize;
	            var blockSizeBytes = blockSize * 4;

	            // Count blocks ready
	            var nBlocksReady = dataSigBytes / blockSizeBytes;
	            if (doFlush) {
	                // Round up to include partial blocks
	                nBlocksReady = Math.ceil(nBlocksReady);
	            } else {
	                // Round down to include only full blocks,
	                // less the number of blocks that must remain in the buffer
	                nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
	            }

	            // Count words ready
	            var nWordsReady = nBlocksReady * blockSize;

	            // Count bytes ready
	            var nBytesReady = Math.min(nWordsReady * 4, dataSigBytes);

	            // Process blocks
	            if (nWordsReady) {
	                for (var offset = 0; offset < nWordsReady; offset += blockSize) {
	                    // Perform concrete-algorithm logic
	                    this._doProcessBlock(dataWords, offset);
	                }

	                // Remove processed words
	                var processedWords = dataWords.splice(0, nWordsReady);
	                data.sigBytes -= nBytesReady;
	            }

	            // Return processed words
	            return new WordArray.init(processedWords, nBytesReady);
	        },

	        /**
	         * Creates a copy of this object.
	         *
	         * @return {Object} The clone.
	         *
	         * @example
	         *
	         *     var clone = bufferedBlockAlgorithm.clone();
	         */
	        clone: function () {
	            var clone = Base.clone.call(this);
	            clone._data = this._data.clone();

	            return clone;
	        },

	        _minBufferSize: 0
	    });

	    /**
	     * Abstract hasher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this hasher operates on. Default: 16 (512 bits)
	     */
	    var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         */
	        cfg: Base.extend(),

	        /**
	         * Initializes a newly created hasher.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for this hash computation.
	         *
	         * @example
	         *
	         *     var hasher = CryptoJS.algo.SHA256.create();
	         */
	        init: function (cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this hasher to its initial state.
	         *
	         * @example
	         *
	         *     hasher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-hasher logic
	            this._doReset();
	        },

	        /**
	         * Updates this hasher with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {Hasher} This hasher.
	         *
	         * @example
	         *
	         *     hasher.update('message');
	         *     hasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            // Append
	            this._append(messageUpdate);

	            // Update the hash
	            this._process();

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the hash computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The hash.
	         *
	         * @example
	         *
	         *     var hash = hasher.finalize();
	         *     var hash = hasher.finalize('message');
	         *     var hash = hasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Final message update
	            if (messageUpdate) {
	                this._append(messageUpdate);
	            }

	            // Perform concrete-hasher logic
	            var hash = this._doFinalize();

	            return hash;
	        },

	        blockSize: 512/32,

	        /**
	         * Creates a shortcut function to a hasher's object interface.
	         *
	         * @param {Hasher} hasher The hasher to create a helper for.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var SHA256 = CryptoJS.lib.Hasher._createHelper(CryptoJS.algo.SHA256);
	         */
	        _createHelper: function (hasher) {
	            return function (message, cfg) {
	                return new hasher.init(cfg).finalize(message);
	            };
	        },

	        /**
	         * Creates a shortcut function to the HMAC's object interface.
	         *
	         * @param {Hasher} hasher The hasher to use in this HMAC helper.
	         *
	         * @return {Function} The shortcut function.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var HmacSHA256 = CryptoJS.lib.Hasher._createHmacHelper(CryptoJS.algo.SHA256);
	         */
	        _createHmacHelper: function (hasher) {
	            return function (message, key) {
	                return new C_algo.HMAC.init(hasher, key).finalize(message);
	            };
	        }
	    });

	    /**
	     * Algorithm namespace.
	     */
	    var C_algo = C.algo = {};

	    return C;
	}(Math));


	return CryptoJS;

}));

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else {}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Constants table
	    var T = [];

	    // Compute constants
	    (function () {
	        for (var i = 0; i < 64; i++) {
	            T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
	        }
	    }());

	    /**
	     * MD5 hash algorithm.
	     */
	    var MD5 = C_algo.MD5 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Swap endian
	            for (var i = 0; i < 16; i++) {
	                // Shortcuts
	                var offset_i = offset + i;
	                var M_offset_i = M[offset_i];

	                M[offset_i] = (
	                    (((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
	                    (((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
	                );
	            }

	            // Shortcuts
	            var H = this._hash.words;

	            var M_offset_0  = M[offset + 0];
	            var M_offset_1  = M[offset + 1];
	            var M_offset_2  = M[offset + 2];
	            var M_offset_3  = M[offset + 3];
	            var M_offset_4  = M[offset + 4];
	            var M_offset_5  = M[offset + 5];
	            var M_offset_6  = M[offset + 6];
	            var M_offset_7  = M[offset + 7];
	            var M_offset_8  = M[offset + 8];
	            var M_offset_9  = M[offset + 9];
	            var M_offset_10 = M[offset + 10];
	            var M_offset_11 = M[offset + 11];
	            var M_offset_12 = M[offset + 12];
	            var M_offset_13 = M[offset + 13];
	            var M_offset_14 = M[offset + 14];
	            var M_offset_15 = M[offset + 15];

	            // Working varialbes
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];

	            // Computation
	            a = FF(a, b, c, d, M_offset_0,  7,  T[0]);
	            d = FF(d, a, b, c, M_offset_1,  12, T[1]);
	            c = FF(c, d, a, b, M_offset_2,  17, T[2]);
	            b = FF(b, c, d, a, M_offset_3,  22, T[3]);
	            a = FF(a, b, c, d, M_offset_4,  7,  T[4]);
	            d = FF(d, a, b, c, M_offset_5,  12, T[5]);
	            c = FF(c, d, a, b, M_offset_6,  17, T[6]);
	            b = FF(b, c, d, a, M_offset_7,  22, T[7]);
	            a = FF(a, b, c, d, M_offset_8,  7,  T[8]);
	            d = FF(d, a, b, c, M_offset_9,  12, T[9]);
	            c = FF(c, d, a, b, M_offset_10, 17, T[10]);
	            b = FF(b, c, d, a, M_offset_11, 22, T[11]);
	            a = FF(a, b, c, d, M_offset_12, 7,  T[12]);
	            d = FF(d, a, b, c, M_offset_13, 12, T[13]);
	            c = FF(c, d, a, b, M_offset_14, 17, T[14]);
	            b = FF(b, c, d, a, M_offset_15, 22, T[15]);

	            a = GG(a, b, c, d, M_offset_1,  5,  T[16]);
	            d = GG(d, a, b, c, M_offset_6,  9,  T[17]);
	            c = GG(c, d, a, b, M_offset_11, 14, T[18]);
	            b = GG(b, c, d, a, M_offset_0,  20, T[19]);
	            a = GG(a, b, c, d, M_offset_5,  5,  T[20]);
	            d = GG(d, a, b, c, M_offset_10, 9,  T[21]);
	            c = GG(c, d, a, b, M_offset_15, 14, T[22]);
	            b = GG(b, c, d, a, M_offset_4,  20, T[23]);
	            a = GG(a, b, c, d, M_offset_9,  5,  T[24]);
	            d = GG(d, a, b, c, M_offset_14, 9,  T[25]);
	            c = GG(c, d, a, b, M_offset_3,  14, T[26]);
	            b = GG(b, c, d, a, M_offset_8,  20, T[27]);
	            a = GG(a, b, c, d, M_offset_13, 5,  T[28]);
	            d = GG(d, a, b, c, M_offset_2,  9,  T[29]);
	            c = GG(c, d, a, b, M_offset_7,  14, T[30]);
	            b = GG(b, c, d, a, M_offset_12, 20, T[31]);

	            a = HH(a, b, c, d, M_offset_5,  4,  T[32]);
	            d = HH(d, a, b, c, M_offset_8,  11, T[33]);
	            c = HH(c, d, a, b, M_offset_11, 16, T[34]);
	            b = HH(b, c, d, a, M_offset_14, 23, T[35]);
	            a = HH(a, b, c, d, M_offset_1,  4,  T[36]);
	            d = HH(d, a, b, c, M_offset_4,  11, T[37]);
	            c = HH(c, d, a, b, M_offset_7,  16, T[38]);
	            b = HH(b, c, d, a, M_offset_10, 23, T[39]);
	            a = HH(a, b, c, d, M_offset_13, 4,  T[40]);
	            d = HH(d, a, b, c, M_offset_0,  11, T[41]);
	            c = HH(c, d, a, b, M_offset_3,  16, T[42]);
	            b = HH(b, c, d, a, M_offset_6,  23, T[43]);
	            a = HH(a, b, c, d, M_offset_9,  4,  T[44]);
	            d = HH(d, a, b, c, M_offset_12, 11, T[45]);
	            c = HH(c, d, a, b, M_offset_15, 16, T[46]);
	            b = HH(b, c, d, a, M_offset_2,  23, T[47]);

	            a = II(a, b, c, d, M_offset_0,  6,  T[48]);
	            d = II(d, a, b, c, M_offset_7,  10, T[49]);
	            c = II(c, d, a, b, M_offset_14, 15, T[50]);
	            b = II(b, c, d, a, M_offset_5,  21, T[51]);
	            a = II(a, b, c, d, M_offset_12, 6,  T[52]);
	            d = II(d, a, b, c, M_offset_3,  10, T[53]);
	            c = II(c, d, a, b, M_offset_10, 15, T[54]);
	            b = II(b, c, d, a, M_offset_1,  21, T[55]);
	            a = II(a, b, c, d, M_offset_8,  6,  T[56]);
	            d = II(d, a, b, c, M_offset_15, 10, T[57]);
	            c = II(c, d, a, b, M_offset_6,  15, T[58]);
	            b = II(b, c, d, a, M_offset_13, 21, T[59]);
	            a = II(a, b, c, d, M_offset_4,  6,  T[60]);
	            d = II(d, a, b, c, M_offset_11, 10, T[61]);
	            c = II(c, d, a, b, M_offset_2,  15, T[62]);
	            b = II(b, c, d, a, M_offset_9,  21, T[63]);

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

	            var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
	            var nBitsTotalL = nBitsTotal;
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
	                (((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
	            );
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
	                (((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
	                (((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
	            );

	            data.sigBytes = (dataWords.length + 1) * 4;

	            // Hash final blocks
	            this._process();

	            // Shortcuts
	            var hash = this._hash;
	            var H = hash.words;

	            // Swap endian
	            for (var i = 0; i < 4; i++) {
	                // Shortcut
	                var H_i = H[i];

	                H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
	                       (((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
	            }

	            // Return final computed hash
	            return hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    function FF(a, b, c, d, x, s, t) {
	        var n = a + ((b & c) | (~b & d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function GG(a, b, c, d, x, s, t) {
	        var n = a + ((b & d) | (c & ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function HH(a, b, c, d, x, s, t) {
	        var n = a + (b ^ c ^ d) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    function II(a, b, c, d, x, s, t) {
	        var n = a + (c ^ (b | ~d)) + x + t;
	        return ((n << s) | (n >>> (32 - s))) + b;
	    }

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.MD5('message');
	     *     var hash = CryptoJS.MD5(wordArray);
	     */
	    C.MD5 = Hasher._createHelper(MD5);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacMD5(message, key);
	     */
	    C.HmacMD5 = Hasher._createHmacHelper(MD5);
	}(Math));


	return CryptoJS.MD5;

}));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(10), __webpack_require__(11));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var C_algo = C.algo;
	    var MD5 = C_algo.MD5;

	    /**
	     * This key derivation function is meant to conform with EVP_BytesToKey.
	     * www.openssl.org/docs/crypto/EVP_BytesToKey.html
	     */
	    var EvpKDF = C_algo.EvpKDF = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {number} keySize The key size in words to generate. Default: 4 (128 bits)
	         * @property {Hasher} hasher The hash algorithm to use. Default: MD5
	         * @property {number} iterations The number of iterations to perform. Default: 1
	         */
	        cfg: Base.extend({
	            keySize: 128/32,
	            hasher: MD5,
	            iterations: 1
	        }),

	        /**
	         * Initializes a newly created key derivation function.
	         *
	         * @param {Object} cfg (Optional) The configuration options to use for the derivation.
	         *
	         * @example
	         *
	         *     var kdf = CryptoJS.algo.EvpKDF.create();
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8 });
	         *     var kdf = CryptoJS.algo.EvpKDF.create({ keySize: 8, iterations: 1000 });
	         */
	        init: function (cfg) {
	            this.cfg = this.cfg.extend(cfg);
	        },

	        /**
	         * Derives a key from a password.
	         *
	         * @param {WordArray|string} password The password.
	         * @param {WordArray|string} salt A salt.
	         *
	         * @return {WordArray} The derived key.
	         *
	         * @example
	         *
	         *     var key = kdf.compute(password, salt);
	         */
	        compute: function (password, salt) {
	            // Shortcut
	            var cfg = this.cfg;

	            // Init hasher
	            var hasher = cfg.hasher.create();

	            // Initial values
	            var derivedKey = WordArray.create();

	            // Shortcuts
	            var derivedKeyWords = derivedKey.words;
	            var keySize = cfg.keySize;
	            var iterations = cfg.iterations;

	            // Generate key
	            while (derivedKeyWords.length < keySize) {
	                if (block) {
	                    hasher.update(block);
	                }
	                var block = hasher.update(password).finalize(salt);
	                hasher.reset();

	                // Iterations
	                for (var i = 1; i < iterations; i++) {
	                    block = hasher.finalize(block);
	                    hasher.reset();
	                }

	                derivedKey.concat(block);
	            }
	            derivedKey.sigBytes = keySize * 4;

	            return derivedKey;
	        }
	    });

	    /**
	     * Derives a key from a password.
	     *
	     * @param {WordArray|string} password The password.
	     * @param {WordArray|string} salt A salt.
	     * @param {Object} cfg (Optional) The configuration options to use for this computation.
	     *
	     * @return {WordArray} The derived key.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var key = CryptoJS.EvpKDF(password, salt);
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8 });
	     *     var key = CryptoJS.EvpKDF(password, salt, { keySize: 8, iterations: 1000 });
	     */
	    C.EvpKDF = function (password, salt, cfg) {
	        return EvpKDF.create(cfg).compute(password, salt);
	    };
	}());


	return CryptoJS.EvpKDF;

}));

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(4);


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(5);


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright (C) 2019 Arturo Vasquez Soluciones Web.
  Todos los derechos reservados.

  La redistribución y uso en formatos fuente y binario están permitidas
  siempre que el aviso de copyright anterior y este párrafo son
  duplicado en todas esas formas y que cualquier documentación,
  materiales de publicidad y otros materiales relacionados con dicha
  distribución y uso reconocen que el software fue desarrollado
  por el Arturo Vasquez Soluciones Web. El nombre de
  Arturo Vasquez Soluciones Web No se puede utilizar para respaldar o promocionar productos derivados
  de este software sin el permiso previo por escrito.
  ESTE SOFTWARE SE PROPORCIONA '' tal cual '' Y SIN EXPRESA O
  Garantías implícitas, incluyendo, sin limitación, los implicados
  GARANTÍAS DE COMERCIALIZACIÓN Y APTITUD PARA UN PROPÓSITO PARTICULAR.
*/
/*Integrado GDOM para el manejo del DOM / eventos / AJAX */
/*Este archivo lo necesita Function SMOOTH SCROLL*/
__webpack_require__(6);
/*************************************************/
cripto=__webpack_require__(7);
fetchapi=__webpack_require__(14);
ww=__webpack_require__(15);
ws=__webpack_require__(16);
storage=__webpack_require__(17);
webapi=__webpack_require__(18);
datab=__webpack_require__(19);
let is=__webpack_require__(20);
let watchjs = __webpack_require__(21);
let watch = watchjs.watch;
let unwatch = watchjs.unwatch;
let callWatchers = watchjs.callWatchers;
let numapps=0;
let elementactive="html";
let varsint=[{}];
let scope=[{}];

g=(function(global,factory){
	this.elemaux='';
	this.childrenaux=[{}];
	this.parentsaux=[{}];
	this.parentaux='';
	//here wuould go private functions
	//...................
	function glog(msg){
		console.log(msg);
	};
	function easeInOutQuad(t, b, c, d){
		t /= d / 2;
		if (t < 1) return c / 2 * t * t + b;
		t--;
		return -c / 2 * (t * (t - 2) - 1) + b;
	};
	function wrap(el, wrapper) {
	    el.parentNode.insertBefore(wrapper, el);
	    wrapper.appendChild(el);
	};
	function indexOf_(array, valToFind){
	    let foundIndex = -1;
	    for (let index = 0; index < array.length; index++) {
	        if (array[index] === valToFind) {
	            foundIndex = index;
	            break;
	        }
	    }
		return foundIndex;
	};
	function prop(element,proper){
		let obj; //busca dentro del objeto y devuelve solo la primera acepcion
		let val;
		obj=getelems(element);
		if(is.isObject(obj)){
		  	result=obj[0].getAttribute(proper);
			return result;
		}
	};
	function propAll(proper){
		let val=''; //busca dentro del objeto y devuelve solo la primera acepcion
		let array_tags=[];
		let array_final=[];
		let i=0;
		array_tags=getelems(proper);
		if(array_tags.length>0){
			for(i=0;i<array_tags.length;i++){
				array_final[i]=array_tags[i];
			}
			return array_final;
		}
	};
	function getScreenCordinates(obj) {
        let p = {};
        p.x = obj.offsetLeft;
        p.y = obj.offsetTop;
        while (obj.offsetParent) {
            p.x = p.x + obj.offsetParent.offsetLeft;
            p.y = p.y + obj.offsetParent.offsetTop;
            if (obj == document.getElementsByTagName("body")[0]) {
                break;
            }
            else {
                obj = obj.offsetParent;
            }
        }
        return p;
	};
	function setError(name,message){
		this.name = name;
		this.message = message || '';
		let error = new Error(this.message);
		error.name = this.name;
		this.stack = error.stack;
	};
	function getBrowserPreffix(){
		let N = navigator.appName, ua = navigator.userAgent, tem;
		let M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
		if(M && (tem = ua.match(/version\/([\.\d]+)/i))!= null) M[2] = tem[1];
		M = M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
		M = M[0];
		if(M == "Chrome") { browserPrefix = "webkit"; }
		if(M == "Firefox") { browserPrefix = "moz"; }
		if(M == "Safari") { browserPrefix = "webkit"; }
		if(M == "Opera") { browserPrefix = "o"; }
		if(M == "MSIE") { browserPrefix = "ms"; }
		return browserPrefix;
	};
	function setAnimationDuration(el,speed){
		let preffixbrowser;
		preffixbrowser=getBrowserPreffix();
		el.style[preffixbrowser + "-animation-duration"] = speed + "s";
		return 0;
	};
	function getTransitionEvent(){
		let t, el = document.createElement("fakeelement");
		let transitions = {
	    	"transition"      : "transitionend",
	    	"OTransition"     : "oTransitionEnd",
	    	"MozTransition"   : "transitionend",
	    	"WebkitTransition": "webkitTransitionEnd"
	  	};
		for (t in transitions){
	    	if (el.style[t] !== undefined){
	      		return transitions[t];
	    	}
		}
	};
	function getAnimationEvent(){
	  	let t, el = document.createElement("fakeelement");
	  	let animations = {
		    "animationDuration"      : "animationend",
		    "OAnimationDuration"     : "oanimationend",
		    "MozAnimationDuration"   : "animationend",
		    "WebkitAnimationDuration": "webkitAnimationEnd",
			'MSAnimationDuration': 'MSAnimationEnd'
	  	}
	  	for (a in animations){
	    	if (el.style[a] !== undefined){
	      		return animations[a];
	    	}
	  	}
	};
	function getobjtype(id){
		let cadena;
		let typestr;
		if(typeof id==='string'){
			cadena=id;
	      	if(cadena.search("#")==0){
	        	typestr="id";
	      	}
	      	else if(cadena.search(".")==0){
				typestr="class";
			}
			else{
				typestr="element";
			}
			return typestr;
		}
	};
	function getelem(id){
		let objeto;
		if(id!=undefined){
			if(typeof id==='string'){
				let pcarac='';
				pcarac=id.charAt(0);
				objeto=document.querySelector(id);
				if(typeof objeto==='object'){
					return objeto;
				}
			}
			else{
				if(typeof id==='object'){
					return id;
				}			
			}
		}
	};
	function getelems(tag){
		let arrtags=[];
		if(tag!=undefined){
			arrtags=document.querySelectorAll(tag);
			return arrtags;
		}
		else{
			return -1;
		}
	};
	function valobj(objval){
        let valor;
        let obj;
        let args;
        let tovalue;
        obj=getelem(objval);
        if(obj.type!='select-one' && obj.type!="file"){
			valor=obj.value;
        }
        else{
        	if(obj.type=="file"){
        		valor=obj.files[0];
        	}
        	else{
        		valor=obj.options[obj.selectedIndex].value;
        	}
        }
        return valor;
   };
   function setval(objval,value){
        let valor;
        let obj;
        let args;
        let tovalue;
        obj=getelem(objval);
        if(obj.type!='select-one' && obj.type!="file"){
			obj.value=value;
        }
        return 0;
	};
	function version(){
		return "0.0.1";
	};
	function getCssElements(el){
		if(el instanceof HTMLElement){
			return [el];
		}
		else if(typeof el === 'string'){
			return document.querySelectorAll(el);
		}
		return [];
	};
	function child_(domel_,number){
      	let objeto;
      	let valaux;
      	let numint;
      	let children;
      	let childfin;
      	let intquery=domel_;
      	objeto=getelem(intquery);
      	if(typeof number==='number'){
      		if(typeof objeto==='object'){
	      		if(objeto.children!=undefined){
	      			numint=parseInt(number);
	      			children=objeto.children;
	      			childfin=children[numint-1];
					setValAux_(childfin);
	      			return this;
				}
			}
		}
		return this;
	};
	function debugvar_(varinter){
		if(varinter != undefined || varinter != null || varinter.length > 0 || varinter != ''){
			return varinter;
		}
		else{
			return -1;
		}
	};
	function setValAux_(valor){
		this.elemaux=valor;
		return 0;
	};
	function getValAux_(){
		console.log("ELEMAUX +" + this.elemaux);
		return this.elemaux;
	};
	function emptyValAux_(){
		this.elemaux=null;
		return 0;
	};
	function setChildrenAux_(valor){
		this.childrenaux=valor;
		return 0;
	};
	function getChildrenAux_(){
		console.log("CHILDRENAUX +" + this.childrenaux);
		return this.childrenaux;
	};
	function emptyChildrenAux_(){
		this.childrenaux=null;
		return 0;
	};
	function setParentAux_(valor){
		this.parentaux=valor;
		return 0;
	};
	function getParentAux_(){
		console.log("PARENTAUX +" + this.parentaux);
		return this.parentaux;
	};
	function emptyParentAux_(){
		this.parentaux=null;
		return 0;
	};
	setError.prototype = Object.create(Error.prototype);		
	//here wuould go public functions
	//...................
	return function(domel="html"){
		return{
			getthis(){
				console.log(this);
				return 0;
			},
			getel: function(id){
				return getelem(id);
			},
			getels: function(id){
				let arrtags=[];
				arrtags=getelems(id);
				return arrtags;
			},
			getArgs:function(stylesStr){
				console.log(arguments)
				return this;
			},
			hide: function(){
				let domelement;
				if(!document.getElementById){
					return false;
				}
				domelement=getelem(domel);
				if(domelement.style!=undefined){
					domelement.style.display="none";
				}
				return this;
			},
			height: function(){
				let domelement;
				domelement=getelem(domel);
				return parseFloat(getComputedStyle(domelement, null).height.replace("px", ""));
			},
			show:function(){
				let domelement;
				if(!document.getElementById){
					return false;
				}
				domelement=getelem(domel);
				if(domelement.style!=undefined){
					domelement.style.display="block";
				}
				return this;
			},
			animate:function(){
				let infiniteBool=0;
				let speedanim=0;
				let bit;
				//write code below
				//define arguments to work with
				el=getelem(domel);
				animationStr="";
				animationName=arguments[0];
				bit=arguments[1];
				if(bit<=1){
					infiniteBool=parseInt(arguments[1]);
				}
				else{
					speedanim=parseInt(arguments[1]);
				}
				callbackFunc=arguments[2];
				animpreffix="";
				animpreffix=getAnimationEvent();
				el.addEventListener(animpreffix,function(){
					if(infiniteBool==true){
						glog("INFINITO");
						el.classList.remove('infinite');
					}
					el.classList.remove(animationName);
					el.classList.remove('animated');
					if(animationName=='fadeOut'){
						el.style.opacity=0;
					}
					if(animationName=='fadeIn'){
						el.style.opacity=1;
					}
					callbackFunc();
				});
				//call animateCss function
				el.classList.add('animated');
				el.classList.add(animationName);
				if(infiniteBool==true){
					glog("INFINITO");
					el.classList.add('infinite');
				}
				else{
					setAnimationDuration(el,speedanim);
				}
		    	return this;
			},
			find:function(selector,callbackfind){
				// Final found elements
				let found_elements = [];
				let i;
				// Find all the outer matched elements
				let outers = document.querySelectorAll(domel);
				for(i=0;i<outers.length;i++){
					let elements_in_outer=outers[i].querySelectorAll(selector);
					// document.querySelectorAll() returns an "array-like" collection of elements
				// convert this "array-like" collection to an array
					elements_in_outer=Array.prototype.slice.call(elements_in_outer);
					found_elements=found_elements.concat(elements_in_outer);
				}
				// The final 4 elements
				if(found_elements.length>0){
					glog(found_elements);
					callbackfind(found_elements);
				}
				return this;
		   },
			each:function(callbackeach){
		      	let objeto;
		      	let x,y,valor,indice;
		      	objeto=getelems(domel);
		        g.each(objeto,callbackeach);
		        return this;
	      	},
			trigger:function(evtname){
		      	let objeto;
		      	objeto=getelem(domel);
				let event = document.createEvent('HTMLEvents');
				event.initEvent(evtname, true, false);
				objeto.dispatchEvent(event);
				return this;
			},
			empty:function(){
		      	let objeto;
		      	objeto=getelem(domel);
		        objeto.innerHTML='';
		        return this;
			},
			emptyVal:function(){
		      	let objeto;
		      	objeto=getelem(domel);
		        objeto.value='';
		        return this;
			},
			wrap:function(){
		      	let objeto;
		      	let content;
		      	objeto=getelem(domel);
		      	content=document.createElement('div');
		      	content.class="wrap";
		      	content.name="wrap";
		      	content.id="wrap";
				wrap(objeto, content);
				return this;
			},
			wrapAll:function(){
				let wrapper = document.createElement('div');
				let objeto=getelems(domel);
				objeto[0].before(wrapper);
				elements.forEach(function(element) {
				    wrapper.append(element);
				});
				return this;
			},
			prop:function(property){
		      	//busca dentro del objeto y devuelve solo la primera acepcion
				let obj;
				//Llama a funcion interna prop(domel,prper)
				obj=prop(domel,property);
				if(is.isObject(obj)){
					return obj;
				}
				return this;
			},
			unwrap:function(docunw){
		      	let objeto;
		      	objeto=getelem(docunw);
				// get the element's parent node
				let parent = objeto.parentNode;
				// move all children out of the element
				while (objeto.firstChild) parent.insertBefore(objeto.firstChild, objeto);
				// remove the empty element
				parent.removeChild(objeto);
				return this;
			},
			html:function(){
		      	let objeto;
		      	let objetohtml=getelem(domel);
		      	let args=arguments;
		      	if(args[0]!=undefined){
		      		string=args[0];
		      		objetohtml.innerHTML = string;
		      		return this;
		      	}
				return objeto.innerHTML;
			},
			text:function(){
		      	let objeto;
		      	let objetotext=getelem(domel);
		      	let args=arguments;
		      	if(args[0]!=undefined){
		      		string=args[0];
		      		objetotext.textContent = string;
					return this;
		      	}
		      	else{
		      		return objeto;
		      	}
			},
			is:function(classElem){
		      	let objeto;
		      	let otroobjeto;
		      	objetois=getelem(domel);
		      	otroobjeto=getelem(classElem);
		      	if(objetois === otherEl){
					return 0;
		      	}
			},
			prev:function(){
		      	let objeto;
		      	let nextsib;
		      	objetoprev=getelem(domel);
		      	prevsib=objetoprev.previousElementSibling;
				return prevsib;
			},
			next:function(){
		      	let objeto;
		      	let nextsib;
		      	objetonext=getelem(domel);
		      	nextsib=objetonext.nextElementSibling;
				return nextsib;
			},
			remove:function(){
		      	let objeto;
		      	objetorm=getelem(domel);
		      	objetorm.parentNode.removeChild(objeto);
		      	return this;
			},
			replaceWith:function(string){
		      	let objetorep;
		      	objetorep=getelem(domel);
		      	objetorep.outerHTML = string;
		      	return this;
			},
			matches:function(selector){
		      	let objetomat;
		      	let otroobjetomat;
		      	objetomat=getelem(domel);
		      	otroobjetomat=getelem(classElem);
		      	if(objetomat === otroobjetomat){
					return this;
		      	}
			},
			filter:function(filterFn){
		      	let objetofilter;
		      	objetofilter=getelem(domel);
		      	if(typeof filterFn==='function'){
		      		Array.prototype.filter.call(objetofilter,filterFn);
		      	}
		      	return this;
			},
			has:function(strquery){
		      	let objetohas;
		      	let intqueryhas=domel + ":has " + strquery;
		      	objetohas=getelem(intqueryhas);
		      	if(typeof strquery==='string'){
		      		if(typeof objetohas==='object'){
		      			return this;
		      		}
		      	}
			},
			not:function(strquery){
				let objetonot;
		      	let intquerynot=domel + ":has " + strquery;
		      	objetonot=getelem(intquerynot);
		      	if(typeof strquery==='string'){
		      		if(typeof objetonot==='object'){
		      			return this;
		      		}
		      	}
			},
			child:function(number){
				child_(domel,number);
				return this;
			},
			closest:function(strelem){
				let objetoclo;
				objetoclo=getelem(domel);
				if(typeof strelem==='string'){
					return objetoclo.closest(strelem);
	  			}
	  			return this;
	  		},
	  		siblings:function(){
	  			let objetosib;
	  			objetosib=getelem(domel);
	  			Array.prototype.filter.call(objetosib.parentNode.children, function(child){
					return child !== objetosib;
				});
				return this;
	  		},
			offset:function(){
				let objetooff;
				let par;
				let rect;
				let result;
				objetooff=getelem(domel);
				rect = objetooff.getBoundingClientRect();
				result={
					top: rect.top + document.body.scrollTop,
					left: rect.left + document.body.scrollLeft
				};
				return result;
	  		},
	  		scrollLeft:function(){
	  			let objetoscr;
	  			let par;
	  			let rect;
	  			let result;
	  			objetoscr=getelem(domel);
	  			rect = objetoscr.getBoundingClientRect();
	  			if(arguments.length<1){
	  				let valor=rect.left;
	  				return valor;
	  			}
	  			else{
	  				let valor=rect.left + arguments[0];
	  				objetoscr.style.transition="transform 3s linear 1s";
					objetoscr.style.transform="translateX(" + valor + "px)";
	  				return this;
	  			}
	  		},
			scrollTop:function(){
		    	let objetoscrt;
		      	let par;
		      	let rect;
		      	let result;
		      	objetoscrt=getelem(domel);
		      	rect = objetoscrt.getBoundingClientRect();
		      	
		      	if(arguments.length<1){
		      		let valor=rect.top;
		      		return valor;
		      	}
		      	else{
		      		let valor=rect.top + arguments[0];
		      		objetoscrt.style.transition="transform 3s linear 1s";
		      		objetoscrt.style.transform="translateY(" + valor + "px)";
					return this;
				}
			},
			offsetParent:function(){
			  	let objetooffp;
			  	let par;
			  	let rect;
			  	let result;
			  	objetooffp=getelem(domel);
			  	result=objetooffp.offsetParent || objetooffp;
				return this;
			},
			parent:function(){
				let objetopar;
				objetopar=getelem(domel);
				return objetopar.parentNode;
			},
			position:function(){
		      	let objetopos;
		      	let result;
		      	objetopos=getelem(domel);
		      	result={left:objetopos.offsetLeft,top:objetopos.offsetTop};
				return result;
			},
			outerHeight:function(){
		      	let objeto;
		      	let result;
		      	let objetooh=getelem(domel);
			    let height=objetooh.offsetHeight;
		    	let style=getComputedStyle(objetooh);
		      	let args=arguments;
		      	if(args[0]!=undefined){
		      		if(args[0]==true){
					  		height+=parseInt(style.marginTop) + parseInt(style.marginBottom);
					  		return height;
		      		}
		      		else{
		      			return objetooh.offsetHeight;
		      		}
		      	}
		      	else{
		      		return objetooh.offsetHeight;
		      	}
			},
			outerWidth:function(){
		      	let result;
		      	let objetoow=getelem(domel);
			    let height=objeto.offsetWidth;
			    let style=getComputedStyle(objeto);
		      	let args=arguments;
		      	if(args[0]!=undefined){
		      		if(args[0]==true){
					  width += parseInt(style.marginLeft) + parseInt(style.marginRight);
					  return width;
		      		}
		      		else{
		      			return objetoow.offsetWidth;
		      		}
		      	}
		      	else{
		      		return objetoow.offsetHeight;
		      	}
			},
			after:function(htmlstr){
		      	//write code below...
		      	let objaf;
		      	objaf=getelem(domel);
				objaf.insertAdjacentHTML('afterend', htmlstr);
				return this;
			},
			before:function(htmlstr){
		      	//write code below...
		      	let objbef;
		      	objbef=getelem(domel);
				objbef.insertAdjacentHTML('beforebegin', htmlstr);
				return this;
			},
			append:function(html){
		      	//write code below...
		      	let objappe;
		      	let elChild = document.createElement('div');
				objappe=getelem(domel);
				elChild.innerHTML=html;
				objappe.appendChild(elChild);
				return this;
			},
			prepend:function(html){
		      	//write code below...
		      	let objprep;
		      	objprep=getelem(domel);
				objprep.insertAdjacentHTML('afterend', html);
				return this;
			},
			clone:function(){
		      	//write code below...
		      	let objclo;
		      	objclo=getelem(domel);
		      	objclo.cloneNode(true);
		      	return this;
			},
			children:function(){
		      	//write code below...
		      	let objcld;
		      	objcld=getelem(domel);
				setChildrenAux_(objcld.children);
				return this;
			},
			first:function(){
		      	//write code below...
		      	let objfrs;
		      	let numeqch;
		      	objfrs=getelem(domel);
				numeqch=objfrs.children[0];
				return this;
			},
			last:function(){
		      	//write code below...
		      	let objlst;
		      	let numeqch;
		      	objlst=getelem(domel);
				numeqch=objlst.slice(-1);
				return this;
			},
			index:function(){
				let elm=getelem(domel);
				let c = elm.parentNode.children;
				let i=0;
				for(; i < c.length; i++ ){
					if( c[i] == elm ){
						return i;
					}
				}
				return this;
			},
			hasClass:function(classElem){
		      	let objetohasc;
		      	objetohasc=getelem(domel);
		      	if(objetohasc.classList.contains(classElem)){
					return this;
		      	}
			},
			addClass:function(classele){
		      	//write code below...
		      	let obj;let stringclass;let stringarr;let i;
				stringclass="";
				stringclass=classele;
		      	obj=getelem(domel);
				stringarr=stringclass.split(' ');
				if(stringarr.length>0){
					for(i=0;i<stringarr.length;i++){
						obj.classList.add(stringarr[i]);
					}
				}
				else{
					obj.classList.add(classele);
				}
				return this;
			},
			removeClass:function(classele){
		      	//write code below...
				let obj; let stringclass; let stringarr; stringclass="";let i;
				stringclass=classele;
	  			obj=getelem(domel);
				stringarr=stringclass.split(' ');
				if(stringarr.length>0){
					for(i=0;i<stringarr.length;i++){
						obj.classList.remove(stringarr[i]);
					}
				}
				else{
					obj.classList.remove(classele);
				}
				return this;
			},
			addAttrb:function(attr,value){
		      	//write code below...
		      	let obj;
		      	let type;
		      	let i;
		      	type=getobjtype(domel);
		      	switch(type){
		      		case 'element':
		      			obj=getelems(domel);
		      			for(i=0;i<obj.length;i++){
		      				obj[i].setAttribute(attr,value);
		      			}
		      			break;
		      		case 'class':
		      			obj=getelems(domel);
		      			for(i=0;i<obj.length;i++){
		      				obj[i].setAttribute(attr,value);
		      			}
		      			break;
		      		case 'id':
						obj=getelem(domel);
						obj.setAttribute(attr,value);
						break;
		      	}
		      	return this;
			},
			getAttrb:function(attr){
				//write code below...
		      	let obj;
		      	let type;
		      	let i;
		      	let result;
		      	result=Array;
		      	type=getobjtype(domel);
		      	switch(type){
		      		case 'element':
		      			obj=getelems(domel);
		      			for(i=0;i<obj.length;i++){
		      				result[i]=obj[i].getAttribute(attr);
		      			}
		      			return result;
		      			break;
		      		case 'class':
		      			obj=getelems(domel);
		      			for(i=0;i<obj.length;i++){
		      				result[i]=obj[i].getAttribute(attr);
		      			}
		      			return result;
		      			break;
		      		case 'id':
						obj=getelem(domel);
						result[i]=obj.getAttribute(attr);
						return result;
						break;
		      	}
				return this;
			},
			rmAttrb:function(attr){
		      	//write code below...
		      	let obj;
		      	let type;
		      	let i;
		      	type=getobjtype(domel);
		      	switch(type){
		      		case 'element':
		      			obj=getelems(domel);
		      			for(i=0;i<obj.length;i++){
		      				obj[i].removeAttribute(attr);
		      			}
		      			break;
		      		case 'class':
		      			obj=getelems(domel);
		      			for(i=0;i<obj.length;i++){
		      				obj[i].removeAttribute(attr);
		      			}
		      			break;
		      		case 'id':
						obj=getelem(domel);
						obj.removeAttribute(attr);
						break;
		      	}
		      	return this;
			},
			data:function(attr){
			  	//write code below...
			  	let obj;
			  	let i;
			  	let value;
			  	obj=getelems(domel);
			  	if(arguments.length<2){
					for(i=0;i<obj.length;i++){
						result[i]=obj[i].getAttribute(attr);
					}
					return result;
			  	}
			  	else{
			  		value=arguments[1];
					for(i=0;i<obj.length;i++){
						obj[i].setAttribute(attr,value);
					}
					result=0;
			  	}
				return this;
			},
			toggleClass:function(classele){
			  	//write code below...
			  	let obj;
			  	obj=getelem(domel);
			  	obj.classList.toggle(classele);
			  	return this;
			},
			cursor:function(estilo){
		        let fila;
		      	switch(estilo){
		      		case 'auto':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
					case 'pointer':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
					case 'wait':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
					case 'text':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
					case 'initial':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
					case 'inherit':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
					case 'none':
						fila=getelem(domel);
						fila.style.cursor=estilo;
						break;
	      		}
	      		return this;
	      	},
	      	toggleDisplay: function(){
	        	let fila;
	            if (!document.getElementById){
	                return false;
	            }
	            fila=getelem(domel);
	            if(fila.style.display != "none"){
	              fila.style.display = "none";
	            }
	            else{
	              fila.style.display = "";
	            }
	            return this;
	        },
	        resetText: function(){
	          	let textcontent;
	          	textcontent=getelem(domel);
	          	textcontent.value='';
				return this;
	        },
	        val: function(){
	            let valor;
	            let args;
	            args=arguments;
	            if(args[0]==undefined){
	                valor=valobj(domel);
	                return valor;
	            }
	            else{
	            	setval(domel,args[0]);
	            }
	            return this;
	        },
	        version: function(){
	            glog(version());
	            return this;
	        },
	        intval: function(){
				let number;
				valor=valobj(domel);
				return parseInt(valor);
	        },
	        floatval: function(){
	        	let number;
				valor=valobj(domel);
				return parseFloat(valor);
	        },
		    gotodiv: function(){
		        let objeto;
		        objeto=getelem(domel);
		        objeto.scrollIntoView();
		        return this;
		    },
			smooth: function(target, options){
			    let start = window.pageYOffset,
			        opt = {
			            duration: options.duration,
			            offset: options.offset || 0,
			            callback: options.callback,
			            easing: easeInOutQuad
			        },
			        distance = typeof target === 'string'
			            ? opt.offset + document.querySelector(target).getBoundingClientRect().top
			            : target,
			        duration = typeof opt.duration === 'function'
			            ? opt.duration(distance)
			            : opt.duration,
			        timeStart, timeElapsed;
			    requestAnimationFrame(function(time){ timeStart = time; loop(time); });
			    function loop(time){
			        timeElapsed = time - timeStart;
			        window.scrollTo(0, opt.easing(timeElapsed, start, distance, duration));
			        if (timeElapsed < duration){
			        	requestAnimationFrame(loop)
			        }
			        else{
			        	end();
			        }
			    }
			    function end(){
			        window.scrollTo(0, start + distance);
	
			        if (typeof opt.callback==='function'){
			        	opt.callback();
			        }
			    }
			    // Robert Penner's easeInOutQuad - http://robertpenner.com/easing/
			    function easeInOutQuad(t, b, c, d)  {
			        t /= d / 2
			        if(t < 1) return c / 2 * t * t + b
			        t--
			        return -c / 2 * (t * (t - 2) - 1) + b
			    }
			    return this;
			},
		    blink: function(status){
		        let fila;
		        switch(status){
		        	case 'on':
			        	fila=getelem(domel);
			        	fila.className="blink_div";
			        	break;
			        case 'off':
			        	fila=getelem(domel);
			        	fila.className="";
			        	break;
	
		        }
		        return this;
		    },
			submit:function(callbackfunc){
	        	let control;
	        	control=getelem(domel);
		        control.onsubmit=function(){
		        	callbackfunc();
		        }
		        return this;
			},
	        click:function(callbackfunc){
	        	let control;
	        	control=getelem(domel);
		        control.onclick=function(){
		        	callbackfunc();
		        }
		        return this;
	      	},
	      	change:function(callbackfunc){
		        let control;
	        	control=getelem(domel);
		        control.onchange=function(){
		        	callbackfunc();
		        }
		        return this;
	      	},
	      	blur:function(callbackfunc){
		        let control;
	        	control=getelem(domel);
		        control.onblur=function(){
		        	callbackfunc();
		        }
		        return this;
	      	},
			not:function(ignomename){
				let control=getelems(domel + ':not(' + ignomename + ')');
				if(control!=undefined){
					return;
				}
				return this;
			},
			bind:function(fn,context){
				if(typeof fn==='function'){
					fn.bind(context);
				}
				return this;
			},
			trigger:function(el, eventName, options){
				let event;
				if (window.CustomEvent) {
					event = new CustomEvent(eventName, options);
				}
				else{
					event = document.createEvent('CustomEvent');
					event.initCustomEvent(eventName, true, true, options);
				}
				el.dispatchEvent(event);
				return this;
			},
			on:function(e){
				let control;
				let eventoCall;
				eventoCall=arguments[0];
				callback=arguments[1];
				control=getelem(domel);
				control.addEventListener(eventoCall,callback);
				return this;
			},
			one:function(e){
				let control;
				let eventoCall;
				eventoCall=arguments[0];
				callback=arguments[1];
				control=getelem(domel);
				control.addEventListener(eventoCall,function(){
					control.removeEventListener(eventoCall,callback);
				});
				return this;
		    },
			off:function(e){
				let control;
				let eventoCall;
				eventoCall=arguments[0];
				callback=arguments[1];
				control=getelem(domel);
				control.removeEventListener(eventoCall,callback);
				return this;
			},
			load:function(modulourl){
				window.addEventListener('load', function() {
				    // page is fully rendered
			        let xmlhttp=false;
			        let filecont;
			        let contentdiv;
			        let n;
			        let allScripts;
			        let callback;
			        callback=arguments[1];
			        contentdiv=getelem(domel);
			        xmlhttp=g.getxhr();
			        if (typeof callback==='function'){
								callback();
			        }
				    xmlhttp.onreadystatechange = function(){
				        if(xmlhttp.readyState==XMLHttpRequest.DONE){
				           if(xmlhttp.status == 200){
				               contentdiv.innerHTML = xmlhttp.responseText;
				               allScripts=contentdiv.getElementsByTagName('script');
				               for (n=0;n<allScripts.length;n++){
									//run script inside rendered div
									eval(allScripts[n].innerHTML);
				               }
				               if(callback!=undefined){
							        if(typeof callback==='function'){
										callback();
							        }
							        else{
							        	glog("No se puede ejecutar la llamada, no es tipo funcion");
							        }
				               }
				           }
				           else {
				               glog('Error');
				           }
				        }
				    }
				    xmlhttp.open("GET", modulourl, true);
				    xmlhttp.send();
				});
			},
			get:function(stylesStr){
				let result;
				let aux,i;
				let objelem=getelem(domel);
				let style=window.getComputedStyle ? getComputedStyle(objelem,null) : objelem.currentStyle;
				result={};
				if(!Array.isArray(stylesStr)){
					aux=style[stylesStr];
					result[stylesStr]=aux;
				}
				else{
					let objeto=stylesStr;
					let indi;
					for(i=0;i<2;i++){
						indi=stylesStr[i];
						aux=style[indi];
						result[indi]=aux;
					}
				}
				return result;
			},
			set:function(styles){
				let elems;
				let i;
				if (typeof styles !== 'object') {
					throw new Error('Second parameter of this function should be an object');
				}
				elems=getCssElements(domel);
				if(elems.length === 0) {
					return false;
				}
				else{
					elems.forEach(function(elem) {
						for (let i in styles) {
							if (styles.hasOwnProperty(i)) {
								elem.style[i] = styles[i];
							}
						}
					});
				}
				return this;
			},
			css: function(style){
				//Hacer callback un argumento opcional
				let callbackCall;
				let callbackAux;
				let response;
				let dominter;
				let valaux;
				let valchildren;
				let valparent;
				let domelint;
				valaux=getValAux_();
				valchildren=getChildrenAux_();
				valparent=getParentAux_();
				if(typeof arguments[1]==='function'){
					callbackCall=arguments[1];
				}
				if(debugvar_(valaux)){
					domelint=valaux;
				}
				else{
					if(debugvar_(valchildren)){
						domelint=valchildren;
					}
					else{
						if(debugvar_(valparent)){
							domelint=valparent;
						}
					}
				}
				if(typeof style==='string' || Array.isArray(style) || typeof style==='object'){
					if(Array.isArray(domelint) || domelint.length>0){
						try{
							for(i=0;i<domelint.length;i++){
								g(domelint[i]).set(style);
							}
							return this;
						}
						catch(e){
							genrl.log(e);
						}
					}
					else{
						try{
							g(domelint).set(style);
							return this;
						}
						catch(e){
							genrl.log(e);
						}
					}
				}
				if(typeof callbackCall==='function'){
					callbackCall();
				}
			},
		}
	}
}(window));

//CLASE GENERAL - GENRL
genrl=(function(global,factory){
	function glog(msg){
		console.log(msg);
	};
	function easeInOutQuad(t, b, c, d){
	  t /= d / 2;
	  if (t < 1) return c / 2 * t * t + b;
	  t--;
	  return -c / 2 * (t * (t - 2) - 1) + b;
	};
	function wrap(el, wrapper) {
	    el.parentNode.insertBefore(wrapper, el);
	    wrapper.appendChild(el);
	};
	function indexOf_(array, valToFind){
	    let foundIndex = -1;
	    for (let index = 0; index < array.length; index++) {
	        if (array[index] === valToFind) {
	            foundIndex = index;
	            break;
	        }
	    }
		return foundIndex;
	};
	function prop(element,proper){
		let obj; //busca dentro del objeto y devuelve solo la primera acepcion
		let val;
		obj=getelems(element);
		if(is.isObject(obj)){
		  	result=obj[0].getAttribute(proper);
			return result;
		}
	};
	function propAll(proper){
		let val=''; //busca dentro del objeto y devuelve solo la primera acepcion
		let array_tags=[];
		let array_final=[];
		let i=0;
		array_tags=getelems(proper);
		if(array_tags.length>0){
			for(i=0;i<array_tags.length;i++){
				array_final[i]=array_tags[i];
			}
			return array_final;
		}
	};
	function getScreenCordinates(obj) {
        let p = {};
        p.x = obj.offsetLeft;
        p.y = obj.offsetTop;
        while (obj.offsetParent) {
            p.x = p.x + obj.offsetParent.offsetLeft;
            p.y = p.y + obj.offsetParent.offsetTop;
            if (obj == document.getElementsByTagName("body")[0]) {
                break;
            }
            else {
                obj = obj.offsetParent;
            }
        }
        return p;
	};
	function setError(name,message){
		this.name = name;
	  this.message = message || '';
	  let error = new Error(this.message);
	  error.name = this.name;
	  this.stack = error.stack;
	};
	function getBrowserPreffix(){
	  let N = navigator.appName, ua = navigator.userAgent, tem;
	  let M = ua.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
	  if(M && (tem = ua.match(/version\/([\.\d]+)/i))!= null) M[2] = tem[1];
	  M = M? [M[1], M[2]]: [N, navigator.appVersion,'-?'];
	  M = M[0];
	  if(M == "Chrome") { browserPrefix = "webkit"; }
	  if(M == "Firefox") { browserPrefix = "moz"; }
	  if(M == "Safari") { browserPrefix = "webkit"; }
		if(M == "Opera") { browserPrefix = "o"; }
	  if(M == "MSIE") { browserPrefix = "ms"; }

		return browserPrefix;
	};
	function setAnimationDuration(el,speed){
		let preffixbrowser;
		preffixbrowser=getBrowserPreffix();
		el.style[preffixbrowser + "-animation-duration"] = speed + "s";
		return 0;
	}
	function getTransitionEvent(){
	  let t, el = document.createElement("fakeelement");
	  let transitions = {
	    "transition"      : "transitionend",
	    "OTransition"     : "oTransitionEnd",
	    "MozTransition"   : "transitionend",
	    "WebkitTransition": "webkitTransitionEnd"
	  }
	  for (t in transitions){
	    if (el.style[t] !== undefined){
	      return transitions[t];
	    }
	  }
	};
	function getAnimationEvent(){
	  let t, el = document.createElement("fakeelement");
	  let animations = {
	    "animationDuration"      : "animationend",
	    "OAnimationDuration"     : "oanimationend",
	    "MozAnimationDuration"   : "animationend",
	    "WebkitAnimationDuration": "webkitAnimationEnd",
			'MSAnimationDuration': 'MSAnimationEnd'
	  }
	  for (a in animations){
	    if (el.style[a] !== undefined){
	      return animations[a];
	    }
	  }
	};
	function getobjtype(id){
		let cadena;
		let typestr;
		if(typeof id==='string'){
			cadena=id;
	      	if(cadena.search("#")==0){
	        	typestr="id";
	      	}
	      	else if(cadena.search(".")==0){
				typestr="class";
			}
			else{
				typestr="element";
			}
			return typestr;
		}
	};
	function getelem(id){
		let objeto;
		if(id!=undefined){
			if(typeof id==='string'){
				objeto=document.querySelector(id);
				if(typeof objeto==='object'){
					return objeto;
				}
			}
			else{
				if(typeof id==='object'){
					return id;
				}			
			}
		}
	};
	function getelems(tag){
		let arrtags=[];
		if(tag!=undefined){
			arrtags=document.querySelectorAll(tag);
			return arrtags;
		}
		else{
			return -1;
		}
	};
	function valobj(objval){
        let valor;
        let obj;
        let args;
        let tovalue;
        obj=getelem(objval);
        if(obj.type!='select-one' && obj.type!="file"){
			valor=obj.value;
        }
        else{
        	if(obj.type=="file"){
        		valor=obj.files[0];
        	}
        	else{
        		valor=obj.options[obj.selectedIndex].value;
        	}
        }
        return valor;
   };
   function setval(objval,value){
        let valor;
        let obj;
        let args;
        let tovalue;
        obj=getelem(objval);
        if(obj.type!='select-one' && obj.type!="file"){
			obj.value=value;
        }
        return 0;
	};
	function version(){
		return "0.0.1";
	};
	function getCssElements(el){
		if(el instanceof HTMLElement){
			return [el];
		}
		else if(typeof el === 'string'){
			return document.querySelectorAll(el);
		}
		return [];
	};
	setError.prototype = Object.create(Error.prototype);
	return{
		//write code below
		//aqui van las funciones que no dependen del DOM ni de un control. Que van solas sin atarla a un control HTML
		print:function(){
			console.log("Esta es una prueba");
		},
		mprint:function(mensaje){
			console.log(mensaje);
		},
		init: function(){
			this.createScope();
		},
		docready: function(fn){
			if(document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
				fn();
			}
			else{
		    	document.addEventListener('DOMContentLoaded', fn);
			}
		},
		createScope: function(){
			//Crear Scope HTML - Javascript DOM
			scopenom="genrlapp-" + Math.floor(Math.random() * 27);
			g("html").addAttrb("id","appdata"+numapps);
			g("html").addAttrb("name","appdata"+numapps);
			g("html").addAttrb("data-scope",scopenom);
			g("html").addAttrb("data-gapp",scopenom);
			let attrbdata=g("html").getAttrb("data-scope");
			let model = new datab.Model(scopenom);
			numapps++;
		},
		log: function(msg){
			console.log(msg);
			return this;
		},
		error: function(msg){
			console.error(msg);
			return this;
		},
		info: function(msg){
			console.info(msg);
			return this;
		},
		warn: function(msg){
			console.warn(msg);
			return this;
		},
		map: function(array,callbackmap){
			let val,index;
			if(array.isArray()){
				array.map(callbackmap);
			}
			return this;
	  	},
		propAll:function(prper){
	      	//busca dentro del objeto y devuelve solo la primera acepcion
			let obj;
			obj=propAll(prper);
			return obj;
		},
		extend:function(callback){
			//extiende las funcionalidades de la librería mediante la función interna extend
			genrl.fn.extend(genrl,callback);
		},
		create:function(domelement){
			document.createElement(domelement);
			return this;
		},
		slice: function(array,start,end,callbackslc){
			if(array.isArray()){
				callbackslc(array.slice(start, end));
			}
		},
	    encb64: function(string){
				return atob(string)
	    },
	    decb64: function(string){
				return btoa(string);
	    },
		each:function(objeto,callbackeach){
			let objProc;
			let x,y,valor,indice;
			if(is.isObject(objeto)){
				try {
					objeto.forEach(callbackeach);
				}
				catch(e){
					objProc=[
						objeto
					];
					objProc.forEach(callbackeach);
				}
			}
			else{
	      		glog("Is not an object!");
	      	}
	      	return this;
		},
	    preventDefault: function(e){
			if(e.preventDefault){
				e.preventDefault();
			}
			return this;
	    },
	    stopPropagation: function(e){
			if(e.stopPropagation){
				e.stopPropagation();
			}
			return this;
	    },
		watch:function(object,attrib,callback){
			//Función Watch
			elementDOM=getelem(object);
			watch(elementDOM,attrib,callback);
			return this;
		},
		unwatch:function(attrib,callback){
		 	//Función Unwatch
		 	elementDOM=getelem(object);
			unwatch(elementDOM,attrib,callback);
			return this;
		},
	    browser: function(){
				//Detect browser and write the corresponding name
				if (navigator.userAgent.search("MSIE") >= 0){
				    glog('"MS Internet Explorer ');
				    let position = navigator.userAgent.search("MSIE") + 5;
				    let end = navigator.userAgent.search("; Windows");
				    let version = navigator.userAgent.substring(position,end);
				    glog(version + '"');
				}
				else if (navigator.userAgent.search("Chrome") >= 0){
					glog('"Google Chrome ');// For some reason in the browser identification Chrome contains the word "Safari" so when detecting for Safari you need to include Not Chrome
				    let position = navigator.userAgent.search("Chrome") + 7;
				    let end = navigator.userAgent.search(" Safari");
				    let version = navigator.userAgent.substring(position,end);
				    glog(version + '"');
				}
				else if (navigator.userAgent.search("Firefox") >= 0){
				    glog('"Mozilla Firefox ');
				    let position = navigator.userAgent.search("Firefox") + 8;
				    let version = navigator.userAgent.substring(position);
				    glog(version + '"');
				}
				else if (navigator.userAgent.search("Safari") >= 0 && navigator.userAgent.search("Chrome") < 0){//<< Here
				    glog('"Apple Safari ');
				    let position = navigator.userAgent.search("Version") + 8;
				    let end = navigator.userAgent.search(" Safari");
				    let version = navigator.userAgent.substring(position,end);
				    glog(version + '"');
				}
				else if (navigator.userAgent.search("Opera") >= 0){
				    glog('"Opera ');
				    let position = navigator.userAgent.search("Version") + 8;
				    let version = navigator.userAgent.substring(position);
				    glog(version + '"');
				}
				else{
				    glog('"Other"');
				}
				return navigator.userAgent;
	    },
	    isArray: function(arr){
	    	if(Object.prototype.toString.call(arr) === "[object Array]"){
	    		return true;
	    	}
	    	else{
	    		return false;
	    	}
	    },
	    isFunction: function(fn){
	        if(typeof fn === 'function'){
	        	return true;
	        }
	        else{
	        	return false;
	        }
	    },
	    isPlainObject: function(obj){
	        // is this an object?
	        if(obj != null && Object.prototype.toString.call(obj) === "[object Object]"){
	        	return true;
	        }
	        else{
	        	return false;
	        }
	    },
	    rReplace: function(direccion,variable,valor){
	        location.replace([direccion]+"?"+[variable]+"="+[valor]);
			return this;
	    },
	    rHref: function(direccion,variable,valor){
	        location.href([direccion]+"?"+[variable]+"="+[valor]);
			return this;
	    },
	    base64_encode: function(cadena){
	        return btoa(cadena);
	    },
	    base64_decode: function(cadena){
	        return atob(cadena);
	    },
		param: function(object) {
		    let encodedString = '';
		    for (let prop in object) {
		        if (object.hasOwnProperty(prop)) {
		            if (encodedString.length > 0) {
		                encodedString += '&';
		            }
		            encodedString += encodeURI(prop + '=' + object[prop]);
		        }
		    }
		    return encodedString;
		},
	    getParam: function(name){
	            let regexS = "[\\?&]"+name+"=([^&#]*)";
	            let regex = new RegExp ( regexS );
	            let tmpURL = window.location.href;
	            let results = regex.exec( tmpURL );
	            if(results==null){
					return"";
	            }
	            else{
	                return results[1];
	            }
	    },
	    utf8_encode: function(argString){
	      //  discuss at: http://phpjs.org/functions/utf8_encode/
	      // original by: Webtoolkit.info (http://www.webtoolkit.info/)
	      // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	      // improved by: sowberry
	      // improved by: Jack
	      // improved by: Yves Sucaet
	      // improved by: kirilloid
	      // bugfixed by: Onno Marsman
	      // bugfixed by: Onno Marsman
	      // bugfixed by: Ulrich
	      // bugfixed by: Rafal Kukawski
	      // bugfixed by: kirilloid
	      //   example 1: utf8_encode('Kevin van Zonneveld');
	      //   returns 1: 'Kevin van Zonneveld'
	      if (argString === null || typeof argString === 'undefined'){
	        return '';
	      }
	      let string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
	      let utftext = '',
	        start, end, stringl = 0;

	      start = end = 0;
	      stringl = string.length;
	      for (let n = 0; n < stringl; n++){
	        let c1 = string.charCodeAt(n);
	        let enc = null;

	        if (c1 < 128){
	          end++;
	        } else if (c1 > 127 && c1 < 2048){
	          enc = String.fromCharCode(
	            (c1 >> 6) | 192, (c1 & 63) | 128
	          );
	        } else if ((c1 & 0xF800) != 0xD800){
	          enc = String.fromCharCode(
	            (c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
	          );
	        } else { // surrogate pairs
	          if ((c1 & 0xFC00) != 0xD800){
	            throw new RangeError('Unmatched trail surrogate at ' + n);
	          }
	          let c2 = string.charCodeAt(++n);
	          if ((c2 & 0xFC00) != 0xDC00){
	            throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
	          }
	          c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
	          enc = String.fromCharCode(
	            (c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
	          );
	        }
	        if (enc !== null){
	          if (end > start){
	            utftext += string.slice(start, end);
	          }
	          utftext += enc;
	          start = end = n + 1;
	        }
	      }

	      if (end > start){
	        utftext += string.slice(start, stringl);
	      }

	      return utftext;
	    },
	    utf8_decode: function(str_data){
	      //  discuss at: http://phpjs.org/functions/utf8_decode/
	      // original by: Webtoolkit.info (http://www.webtoolkit.info/)
	      //    input by: Aman Gupta
	      //    input by: Brett Zamir (http://brett-zamir.me)
	      // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	      // improved by: Norman "zEh" Fuchs
	      // bugfixed by: hitwork
	      // bugfixed by: Onno Marsman
	      // bugfixed by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	      // bugfixed by: kirilloid
	      //   example 1: utf8_decode('Kevin van Zonneveld');
	      //   returns 1: 'Kevin van Zonneveld'

	      let tmp_arr = [],
	        i = 0,
	        ac = 0,
	        c1 = 0,
	        c2 = 0,
	        c3 = 0,
	        c4 = 0;

	      str_data += '';

	      while (i < str_data.length){
	        c1 = str_data.charCodeAt(i);
	        if (c1 <= 191){
	          tmp_arr[ac++] = String.fromCharCode(c1);
	          i++;
	        } else if (c1 <= 223){
	          c2 = str_data.charCodeAt(i + 1);
	          tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
	          i += 2;
	        } else if (c1 <= 239){
	          // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
	          c2 = str_data.charCodeAt(i + 1);
	          c3 = str_data.charCodeAt(i + 2);
	          tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
	          i += 3;
	        } else {
	          c2 = str_data.charCodeAt(i + 1);
	          c3 = str_data.charCodeAt(i + 2);
	          c4 = str_data.charCodeAt(i + 3);
	          c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
	          c1 -= 0x10000;
	          tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF));
	          tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
	          i += 4;
	        }
	      }

	      return tmp_arr.join('');
	    },
	    getURLComplete: function(){
	        return window.location.href;
	    },
	    getDomain: function(){
	        return document.domain;
	    },
	    getURI: function(){
	        let request_uri;
	        request_uri=location.pathname + location.search;
	        return request_uri;
	    },
	    explode: function(variab, delimiter){
	      let arraystr;
	      return variab.split(delimiter);
	    },
	    gotolocal: function(valselect){
	      let URL;
	      URL=valselect;
	      location.href=URL;
	    },
	    gotoremote: function(valselect){
	      let URL;
	      URL="http://"+valselect;
	      location.href=URL;
	    },
		parseHTML:function(htmlstr){
			let tmp = document.implementation.createHTMLDocument();
			tmp.body.innerHTML = htmlstr;
			return tmp.body.children;
		},
		parseJSON:function(json){
			return JSON.parse(json);
		},
		stringifyJSON:function(json){
			return JSON.stringify(json);
		},
		now:function(){
			return Date.now();
		},
		dialog:function(type,content,callback){
			switch(type){
				case 'alert':
					alert(title);
					callback();
					break;
				case 'confirm':
					if(confirm(title)){
						callback();
					}
					break;
				case 'terminal':
					prompt(title);
					callback();
					break;
			}
		},
		inArray: function(array, valToFind){
			return indexOf_(array,valToFind);
		},
		makeArray: function(pseudoarray){
			let realArray = [].slice.call(pseudoarray);
			return realArray;
		},
		indexOf: function(array, valToFind){
		    return indexOf_(array,valToFind);
		},
		getKey: function(e){
			let KeyCode;
			if(e){
				if(e.keyCode>0){
					KeyCode=e.keyCode;
				}
				else{
					KeyCode=e.charCode;
				}
			}
			return KeyCode;
		},
		getChar: function(event){
	       	let cadena;
			//bloquear teclado a solo numeros
			teclan=g.getKey(event);
			cadena=String.fromCharCode(teclan);
			return String.fromCharCode(cadena);
		},
		blockChar: function(e){
			//bloquear teclado a solo letras
			teclap=g.getKey(e);
			teclan=String.fromCharCode(teclap);
			if(IsNumeric(teclan)==true){
				return "Solo está peritido escribir letras";
			}
			return this;
		},
		bloqNum: function(e){
			teclap=g.getKey(e);
			teclan=String.fromCharCode(teclap);
			if(IsNumeric(teclan)==false){
				return "Solo esta permitido escribir numeros";
			}
			return this;
		},
		trim: function(cadena){
			if (string.trim) {
				return string.trim();
			}
			return string.replace(/^\s+|\s+$/g, '');
		},
		type: function(objname){
			//retorna el tipo de objeto
			let obj;
			obj=getelem(objname);
			return Object.prototype.toString.call(obj).replace(/^\[object (.+)\]$/, '$1').toLowerCase();
		},
		/**
		 * Ajax Clase
		 * Funciones XHR para trabajar con AJAX
		 * */
		getxhr:function(){
	  		let xhr;
			xhr=window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
			return xhr;
		},
		upload: function(fileid,callbackup){
			let filectrl;
	      	let file;
	      	let reader;
	      	let finalfile;
	      	let fileapi;
	      	let formData;
	      	let objnombrefile;
	      	let resp;
	      	objnombrefile={};
			//Validación si hay los elementos para realizar la carga asíncrona de archivos
		     if(window.File && window.FileList && window.Blob && window.FileReader && window.FormData){
				 try{
					reader=new FileReader();
					filectrl=getelem(fileid); //Files[0] = 1st file
					file=filectrl.files[0];
					reader.readAsBinaryString(file);
					reader.onload=function(event){
					    let result=event.target.result;
					    let fileName=filectrl.files[0].name;
					    let objres;
					    objres={};
						objres.__proto__={
							data:'',
							file:'',
							status:'',
							error:'',
						};
					    g.post(
							{
								data:btoa(result),
								name:fileName
							},
							"upload.php",
							function(data){
								resp=JSON.parse(data.data);
								objres.file=resp[0].file;
								objres.status="200 OK";
								objres.error="0";
								callbackup(objres);
							}
						);
					};
					reader.onerror=function(event){
						glog("Hubo un error de lectura de disco." + event.target.error);
						objres.file="";
						objres.status=event.target.error;
						objres.error=event.target.error;
						callbackup(objres);
					};
				 }
				 catch(e){
					 genrl.log("EXCEPCION...." + e);
				 }
			}
			else{
			    // browser doesn't supports File API
			    glog("browser doesn't supports File API");
			}
			return this;
	      },
	      post: function(){
	      	/*
	      	 * Parámetros:
	      	 * 0 objvariables
	      	 * 1 dirsocket
	      	 * 2 [callback] optional
	      	 */
	      	let i;
	        let arrayvar;
	        let ajxProtocol;
	        let dirsocket;
	        let variablesobj;
	        let variablesaux;
	        let sock;
	        let callback;
	        let data;
	        let responset;
	        let contenedor;
	        let headers;
			let objres;
			objres={};
			objres.__proto__={
				data:'',
				status:'',
				error:'',
			};
	        arrayvar=new Array();
	        variablesobj={};
	        variablesaux={};
	        //almacenar argumentos en el array 'arrayvar'
	        for(i=0;i<arguments.length;i++){
	          arrayvar[i]=arguments[i];
	        }
			if(arguments.length<2){
	      		glog("Faltan Argumentos " + arguments.length);
	      	}
	      	else{
	      		// Obtener objeto AJAX;
	      		sock=g.getxhr();
	      		sock.addEventListener("load", transferComplete);
						sock.addEventListener("error", transferFailed);
	      		// Obtener objeto de variables;
	      		variablesaux=JSON.stringify(arrayvar[0]);
	      		variablesobj=JSON.parse(variablesaux);
	      		glog(variablesobj);
	      		// Obtener string de protocolo
	      		ajxProtocol="POST";
	      		// Obtener string de dir archivo socket
	      		dirsocket=arrayvar[1];
	      		// Obtener string de enctype
	      		headers="application/x-www-form-urlencoded";
	      		// VALIDACIONES
	      		if(arguments[2]!=undefined){
		      		if(typeof arguments[2]==="function"){
						callback=arguments[2];
					}
					else{
						glog("El argumento Callback debe ser de tipo función");
					}
	      		}
	      		////////////////////////////////////////////////////
	      		// EJECUTAR FUNCION Y CALLBACK//////////////////////
		        sock.open(ajxProtocol,dirsocket,true);
				function transferComplete(event){
					glog("STATUS: " + event.target.readyState + " " + event.target.status + " " + event.target.statusText);
					if(callback!=undefined){
		         		if(typeof callback==="function"){
							objres.data=event.target.responseText;
							objres.status=event.target.readyState;
							objres.error=0;
							glog("MESSAGE " + event.target.responseText);
							callback(objres);
						}
						else{
							glog("El parámetro Callback no es función o no existe!");
						}
					}
					else{
						glog("El parámetro Callback no existe!");
					}
				}

				function transferFailed(event){
					objres.data=event.target.responseText;
					objres.status=event.target.readyState;
					objres.error=event.target.error;
					glog(event.target.error);
					callback(objres);
				}
				sock.setRequestHeader("Content-Type",headers);
				sock.send(JSON.stringify(variablesobj));
		        ////////////////////////////////////////////////////
					}
				return this;
			},
			getJSON: function(){
				/*
				 * Parámetros:
				 * 0 objvariables
				 * 1 dirsocket
				 * 2 [callback] optional
				 */
				let i;
				let arrayvar;
				let ajxProtocol;
				let dirsocket;
				let variablesobj;
				let variablesaux;
				let sock;
				let callback;
				let data;
				let responset;
				let contenedor;
				let headers;
				let objres;
				objres={};
				objres.__proto__={
					data:'',
					status:'',
					error:'',
				};
				arrayvar=new Array();
				variablesobj={};
				variablesaux={};
				//almacenar argumentos en el array 'arrayvar'
				for(i=0;i<arguments.length;i++){
					arrayvar[i]=arguments[i];
				}
				if(arguments.length<2){
					glog("Faltan Argumentos " + arguments.length);
				}
				else{
					// Obtener objeto AJAX;
					sock=g.getxhr();
					sock.addEventListener("load", transferComplete);
					sock.addEventListener("error", transferFailed);
					// Obtener objeto de variables;
					variablesaux=JSON.stringify(arrayvar[0]);
					variablesobj=JSON.parse(variablesaux);
					// Obtener string de protocolo
					ajxProtocol="POST";
					// Obtener string de dir archivo socket
					dirsocket=arrayvar[1];
					// Obtener string de enctype
					headers="application/x-www-form-urlencoded";
					// VALIDACIONES
					if(arguments[2]!=undefined){
						if(typeof arguments[2]==="function"){
							callback=arguments[2];
						}
						else{
							glog("El argumento Callback debe ser de tipo función");
						}
					}
					////////////////////////////////////////////////////
					// EJECUTAR FUNCION Y CALLBACK//////////////////////
				sock.open(ajxProtocol,dirsocket,true);
				function transferComplete(event){
				glog("STATUS: " + event.target.readyState + " " + event.target.status + " " + event.target.statusText);
				if(callback!=undefined){
					if(typeof callback==="function"){
						sanity=JSON.stringify(event.target.responseText);
						objres.data=JSON.parse(sanity);
						objres.status=event.target.readyState;
						objres.error=0;
						glog(objres.data);
						callback(objres);
					}
					else{
						glog("El parámetro Callback no es función o no existe!");
					}
				}
				else{
					glog("El parámetro Callback no existe!");
				}
				return this;
			}

			function transferFailed(event){
				objres.data=event.target.responseText;
				objres.status=event.target.readyState;
				objres.error=event.target.error;
				glog(event.target.error);
				callback(objres);
			}
			sock.setRequestHeader("Content-Type",headers);
			sock.send(JSON.stringify(variablesobj));
					////////////////////////////////////////////////////
			}
			return this;
		},
		get: function(){
      	/*
      	 * Parámetros:
      	 * 0 objvariables
      	 * 1 dirsocket
      	 * 2 [callback] optional
		*/
	      	let i;
	        let arrayvar;
	        let ajxProtocol;
	        let dirsocket;
	        let variablesobj;
	        let variablesaux;
	        let sock;
	        let callback;
	        let data;
	        let responset;
	        let enctype;
	        let contenedor;
			let objres;
			objres={};
			objres.__proto__={
				data:'',
				status:'',
				error:'',
			};
	        arrayvar=new Array();
	        variablesobj={};
	        variablesaux={};
	        //almacenar argumentos en el array 'arrayvar'
	        for(i=0;i<arguments.length;i++){
	          arrayvar[i]=arguments[i];
	        }
			if(arguments.length<2){
	      		glog("Faltan Argumentos " + arguments.length);
	      	}
	      	else{
	      		// Obtener objeto AJAX;
	      		sock=g.getxhr();
	      		sock.addEventListener("load", transferComplete);
						sock.addEventListener("error", transferFailed);
	      		// Obtener string de protocolo
	      		ajxProtocol="GET";
	      		// Obtener string de dir archivo socket
	      		dirsocket=arrayvar[1];
	      		// VALIDACIONES
		    		if(arguments[2]!=undefined){
		      		if(typeof arguments[2]==="function"){
								callback=arguments[2];
							}
							else{
								glog("El argumento Callback debe ser de tipo función");
							}
			      }
	      		////////////////////////////////////////////////////
	      		// EJECUTAR FUNCION Y CALLBACK//////////////////////
		        sock.open(ajxProtocol,dirsocket,true);
						function transferComplete(event){
		          data=event.target.responseText;
		          glog("STATUS: " + event.target.readyState + " " + event.target.status + " " + event.target.statusText);
		          if(callback!=undefined){
								if(typeof callback==="function"){
									objres.data=event.target.responseText;
									objres.status=event.target.readyState;
									objres.error=0;
									glog("MESSAGE " + event.target.responseText);
									callback(objres);
								}
								else{
									glog("El parámetro Callback no es función o no existe!");
								}
							}
							else{
								glog("El parámetro Callback no existe!");
							}
						}
						function transferFailed(event){
							objres.data=event.target.responseText;
							objres.status=event.target.readyState;
							objres.error=event.target.error;
							glog(event.target.error);
							callback(objres);
						}
						sock.send(null);
						////////////////////////////////////////////////////
			}
			return this;
		}
	};
}(window));
////////Módulo para extender el framework
genrl.fn=(function(){
	let _class2type={};
	function glogfn(msg){
		console.log(msg);
	};
	function _type(obj){
	    return obj == null ?
	      String( obj ) :
	      _class2type[ toString.call(obj) ] || "object";
	};
	function _isWindow(obj) {
    return obj != null && obj == obj.window;
  };
  function _isFunction(target){
    return toString.call(target) === "[object Function]";
  };
  let _isArray =  Array.isArray || function(obj) {
      return _type(obj) === "array";
	};
	function _isPlainObject(obj) {
		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || _type(obj) !== "object" || obj.nodeType || _isWindow( obj ) ) {
			return false;
		}
		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call(obj, "constructor") &&
				!hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		}
		catch(e){
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}
		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		let key;
		for ( key in obj ) {}
		return key === undefined || hasOwn.call( obj, key );
	};
	function _extend(){
    let options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;
    // Handle a deep copy situation
    if ( typeof target === "boolean" ) {
      deep = target;
      target = arguments[1] || {};
      // skip the boolean and the target
      i = 2;
    }
    // Handle case when target is a string or something (possible in deep copy)
    if ( typeof target !== "object" && !_isFunction(target) ) {
      target = {};
    }
    if ( length === i ) {
      target = this;
      --i;
    }
    for ( ; i < length; i++ ) {
      // Only deal with non-null/undefined values
      if ( (options = arguments[ i ]) != null ) {
        // Extend the base object
        for ( name in options ) {
          src = target[ name ];
          copy = options[ name ];

          // Prevent never-ending loop
          if ( target === copy ) {
            continue;
          }
          // Recurse if we're merging plain objects or arrays
          if ( deep && copy && ( _isPlainObject(copy) || (copyIsArray = _isArray(copy)) ) ) {
            if ( copyIsArray ) {
              copyIsArray = false;
              clone = src && _isArray(src) ? src : [];

            } else {
              clone = src && _isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            target[ name ] = _extend( deep, clone, copy );

          // Don't bring in undefined values
          } else if ( copy !== undefined ) {
            target[ name ] = copy;
          }
        }
      }
    }
    // Return the modified object
    return target;
};
	return{
		extend:function(){
			let options, name, src, copy, copyIsArray, clone,
	      target = arguments[0] || {},
	      i = 1,
	      length = arguments.length,
	      deep = false;
	    // Handle a deep copy situation
	    if ( typeof target === "boolean" ) {
	      deep = target;
	      target = arguments[1] || {};
	      // skip the boolean and the target
	      i = 2;
	    }
	    // Handle case when target is a string or something (possible in deep copy)
	    if ( typeof target !== "object" && !_isFunction(target) ) {
	      target = {};
	    }
	    if ( length === i ) {
	      target = this;
	      --i;
	    }
	    for ( ; i < length; i++ ) {
	      // Only deal with non-null/undefined values
	      if ( (options = arguments[ i ]) != null ) {
	        // Extend the base object
	        for ( name in options ) {
	          src = target[ name ];
	          copy = options[ name ];

	          // Prevent never-ending loop
	          if ( target === copy ) {
	            continue;
	          }

	          // Recurse if we're merging plain objects or arrays
	          if ( deep && copy && ( _isPlainObject(copy) || (copyIsArray = _isArray(copy)) ) ) {
	            if ( copyIsArray ) {
	              copyIsArray = false;
	              clone = src && _isArray(src) ? src : [];

	            } else {
	              clone = src && _isPlainObject(src) ? src : {};
	            }

	            // Never move original objects, clone them
	            target[ name ] = _extend( deep, clone, copy );

	          // Don't bring in undefined values
	          } else if ( copy !== undefined ) {
	            target[ name ] = copy;
	          }
	        }
	      }
	    }
	    // Return the modified object
			return target;
		}
	}
}());
//Módulo - Path.JS - Enrutado
/************************************************/
genrl.path=(function(){
	//Submodulo Cookies
	//Submodulo path / Rewrite pathJS
	function version(){
		return "1.0.0";
	};
	return{
		//Write code below..
		getVersion:function(){
	        return version();
	    },
	    map:function(path){
	        if(genrl.path.routes.defined.hasOwnProperty(path)){
	            return genrl.path.routes.defined[path];
	        }
	        else{
				return new genrl.path.core.route(path);
	        }
	    },
	    root: function(path){
	        genrl.path.routes.root = path;
	    },
	    rescue: function(fn){
	        genrl.path.routes.rescue = fn;
	    },
	    history: {
	        initial:{}, // Empty container for "Initial Popstate" checking variables.
	        pushState: function(state, title, path){
	            if(genrl.path.history.supported){
	                if(genrl.path.dispatch(path)){
	                    history.pushState(state, title, path);
	                }
	            } else {
	                if(genrl.path.history.fallback){
	                    window.location.hash = "#" + path;
	                }
	            }
	        },
	        popState: function(event){
	            let initialPop = !genrl.path.history.initial.popped && location.href == genrl.path.history.initial.URL;
	            genrl.path.history.initial.popped = true;
	            if(initialPop) return;
	            genrl.path.dispatch(document.location.pathname);
	        },
	        listen: function(fallback){
	            genrl.path.history.supported = !!(window.history && window.history.pushState);
	            genrl.path.history.fallback  = fallback;

	            if(genrl.path.history.supported){
	                genrl.path.history.initial.popped = ('state' in window.history), genrl.path.history.initial.URL = location.href;
	                window.onpopstate = path.history.popState;
	            }
	            else{
	                if(genrl.path.history.fallback){
	                    for(route in genrl.path.routes.defined){
	                        if(route.charAt(0) != "#"){
	                          genrl.path.routes.defined["#"+route] = genrl.path.routes.defined[route];
	                          genrl.path.routes.defined["#"+route].path = "#"+route;
	                        }
	                    }
	                    path.listen();
	                }
	            }
	        }
	    },
	    match:function(path, parameterize){
			let compare="";
			let params = {}, route = null, possible_routes, slice, i, j;
				try{
			        for (route in genrl.path.routes.defined){
			            if (route !== null && route !== undefined){
			                route = genrl.path.routes.defined[route];
			                possible_routes = route.partition();
			                for (j = 0; j < possible_routes.length; j++){
			                    slice = possible_routes[j];
			                    compare = path;
			                    if (slice.search(/:/) > 0){
			                        for (i = 0; i < slice.split("/").length; i++){
			                            if ((i < compare.split("/").length) && (slice.split("/")[i].charAt(0) === ":")){
			                                params[slice.split('/')[i].replace(/:/, '')] = compare.split("/")[i];
			                                compare = compare.replace(compare.split("/")[i], slice.split("/")[i]);
			                            }
			                        }
			                    }
			                    if (slice === compare){
			                        if (parameterize){
			                            route.params = params;
			                        }
			                        return route;
			                    }
			                }
			            }
			        }
				}
				catch(e){
					//Tipo de error
					//prototipo de excepcion donde aparece el tipo de error a validar
					namerror=e.__proto__.name;
					if(namerror!='TypeError'){
						genrl.log(e);
					}
					else{
						genrl.log("EXCEPCION: Esta no es una ruta definida");
					}
				}
				return null;
	    },
	    dispatch:function(passed_route){
	        let previous_route, matched_route;
	        if (genrl.path.routes.current !== passed_route){
	            genrl.path.routes.previous = genrl.path.routes.current;
	            genrl.path.routes.current = passed_route;
	            matched_route = genrl.path.match(passed_route, true);

	            if (genrl.path.routes.previous){
	                previous_route = genrl.path.match(genrl.path.routes.previous);
	                if (previous_route !== null && previous_route.do_exit !== null){
	                    previous_route.do_exit();
	                }
	            }

	            if (matched_route !== null){
	                matched_route.run();
	                return true;
	            } else {
	                if (genrl.path.routes.rescue !== null){
	                    genrl.path.routes.rescue();
	                }
	            }
	        }
	    },
	    listen:function(){
	        let fn = function(){ genrl.path.dispatch(location.hash); }

	        if (location.hash === ""){
	            if (genrl.path.routes.root !== null){
	                location.hash = genrl.path.routes.root;
	            }
	        }

	        // The 'document.documentMode' checks below ensure that pathJS fires the right events
	        // even in IE "Quirks Mode".
	        if ("onhashchange" in window && (!document.documentMode || document.documentMode >= 8)){
	            window.onhashchange = fn;
	        } else {
	            setInterval(fn, 50);
	        }

	        if(location.hash !== ""){
	            genrl.path.dispatch(location.hash);
	        }
	    },
	    core:{
	        route:function(path){
	            this.path = path;
	            this.action = null;
	            this.do_enter = [];
	            this.do_exit = null;
	            this.params = {};
	            genrl.path.routes.defined[path] = this;
	        }
	    },
	    routes:{
	        'current': null,
	        'root': null,
	        'rescue': null,
	        'previous': null,
	        'defined': {}
	    }
	}
}());
//Módulo - Path.JS - prototipos
/************************************************/
genrl.path.core.route.prototype = {
    'to': function (fn) {
        this.action = fn;
        return this;
    },
    'enter': function (fns) {
        if (fns instanceof Array) {
            this.do_enter = this.do_enter.concat(fns);
        } else {
            this.do_enter.push(fns);
        }
        return this;
    },
    'exit': function (fn) {
        this.do_exit = fn;
        return this;
    },
    'partition': function () {
        let parts = [], options = [], re = /\(([^}]+?)\)/g, text, i;
        while (text = re.exec(this.path)) {
            parts.push(text[1]);
        }
        options.push(this.path.split("(")[0]);
        for (i = 0; i < parts.length; i++) {
            options.push(options[options.length - 1] + parts[i]);
        }
        return options;
    },
    'run': function () {
        let halt_execution = false, i, result, previous;

        if (genrl.path.routes.defined[this.path].hasOwnProperty("do_enter")) {
            if (genrl.path.routes.defined[this.path].do_enter.length > 0) {
                for (i = 0; i < genrl.path.routes.defined[this.path].do_enter.length; i++) {
                    result = genrl.path.routes.defined[this.path].do_enter[i].apply(this, null);
                    if (result === false) {
                        halt_execution = true;
                        break;
                    }
                }
            }
        }
        if(!halt_execution){
            genrl.path.routes.defined[this.path].action();
        }
    }
};
////////PROTOTIPOS//////////
genrl.__proto__.extend_=function(callback){
	//extiende las funcionalidades de la librería mediante la función interna extend
	genrl.fn.extend(genrl,callback);
};
genrl.__proto__.watch_=function(objeto,attrib,callback){
	//funcion Watch
	DOMelement=g.getelem(objeto);
	watch(DOMelement,attrib,callback);
};
genrl.__proto__.unwatch_=function(objeto,attrib,callback){
	//Funcion Unwatch
	DOMelement=g.getelem(objeto);
	unwatch(DOMelement,attrib,callback);
};
genrl.__proto__.ajax=function(){
	let sock;
	sock=g.getxhr();
	return sock;
};
genrl.__proto__.ds=function(iddataset){
  	let obj;
  	let idfinal;
  	obj=g.getelems(iddataset);
  	return{
  		get:function(nomvar){
  			let result;
			idfinal="data-" + nomvar;
			result=g(iddataset).prop(idfinal);
			return result;
  		},
  		set:function(nomvar,val){
				if(obj.dataset==undefined){
	  			idfinal="data-" + nomvar;
	  			g(iddataset).addAttrb(idfinal,val);
				}
				else{
					Object.defineProperty(obj.dataset, nomvar, "data-variable");
				}
  		},
  		remove:function(nomvar){
  			idfinal="data-" + nomvar;
  			g(iddataset).rmAttrb(idfinal);
  		},
	}
};
genrl.__proto__.isReady=function(){
	if(document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
		return 1;
	}
	else{
		return 0;
	}
}
genrl.__proto__.isEmpty=function(string){
	if(typeof string==='string'){
		if(string.replace(/\s/g,"")==""){
			return;
		}
		else{
			return -2;
		}
	}
	else{
		return -1;
	}
};
genrl.__proto__.getelem=function(id){
	let objeto;
	if(typeof id==='string'){
		objeto=document.querySelector(id);
		if(typeof objeto==='object'){
			return objeto;
		}
	}
};
genrl.__proto__.getelems=function(tag){
	let arrtags=[];
	if(tag!=undefined){
		arrtags=document.querySelectorAll(tag);
		return arrtags;
	}
	else{
		return -1;
	}
};
genrl.extend({ cripto });
genrl.extend({ ww });
genrl.extend({ ws });
genrl.extend({ storage });
genrl.extend({ fetchapi });
genrl.extend({ webapi });
genrl.init();
module.exports=g;


/***/ }),
/* 6 */
/***/ (function(module, exports) {

!function(){for(var n=0,i=["webkit","moz"],e=0;e<i.length&&!window.requestAnimationFrame;++e)window.requestAnimationFrame=window[i[e]+"RequestAnimationFrame"],window.cancelAnimationFrame=window[i[e]+"CancelAnimationFrame"]||window[i[e]+"CancelRequestAnimationFrame"];window.requestAnimationFrame||(window.requestAnimationFrame=function(i){var e=(new Date).getTime(),a=Math.max(0,16-(e-n)),o=window.setTimeout(function(){i(e+a)},a);return n=e+a,o}),window.cancelAnimationFrame||(window.cancelAnimationFrame=function(n){clearTimeout(n)})}();
//# sourceMappingURL=requestAnimationFrame.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

/*
  Copyright (C) 2019 Arturo Vasquez Soluciones Web.
  Todos los derechos reservados.

  La redistribución y uso en formatos fuente y binario están permitidas
  siempre que el aviso de copyright anterior y este párrafo son
  duplicado en todas esas formas y que cualquier documentación,
  materiales de publicidad y otros materiales relacionados con dicha
  distribución y uso reconocen que el software fue desarrollado
  por el Arturo Vasquez Soluciones Web. El nombre de
  Arturo Vasquez Soluciones Web No se puede utilizar para respaldar o promocionar productos derivados
  de este software sin el permiso previo por escrito.
  ESTE SOFTWARE SE PROPORCIONA '' tal cual '' Y SIN EXPRESA O
  Garantías implícitas, incluyendo, sin limitación, los implicados
  GARANTÍAS DE COMERCIALIZACIÓN Y APTITUD PARA UN PROPÓSITO PARTICULAR.
*/

var AES = __webpack_require__(8);
var SHA256 = __webpack_require__(13);
var MD5 = __webpack_require__(1);
/************************************************/
cripto=(function(){
  //write code below
  return{
  	encode:function(protocol,key,message){
  		var protStr="";
  		protStr=protocol.toUpperCase();
  		switch(protocol){
  			case "SHA256":
  				ciphertext = SHA256(message,key);      				
  				break;
  			case "AES":
  				ciphertext = AES(message,key);
  				break;
  			case "MD5":
  				ciphertext = MD5(message, key);
  				break;
  		}
  		return ciphertext;
  	},
  	decode:function(protocol,key,message){
  		
  	},
  	hash:function(protocol,key,message){
  		
  	}
  }
}());
module.exports=cripto;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(9), __webpack_require__(1), __webpack_require__(2), __webpack_require__(12));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var BlockCipher = C_lib.BlockCipher;
	    var C_algo = C.algo;

	    // Lookup tables
	    var SBOX = [];
	    var INV_SBOX = [];
	    var SUB_MIX_0 = [];
	    var SUB_MIX_1 = [];
	    var SUB_MIX_2 = [];
	    var SUB_MIX_3 = [];
	    var INV_SUB_MIX_0 = [];
	    var INV_SUB_MIX_1 = [];
	    var INV_SUB_MIX_2 = [];
	    var INV_SUB_MIX_3 = [];

	    // Compute lookup tables
	    (function () {
	        // Compute double table
	        var d = [];
	        for (var i = 0; i < 256; i++) {
	            if (i < 128) {
	                d[i] = i << 1;
	            } else {
	                d[i] = (i << 1) ^ 0x11b;
	            }
	        }

	        // Walk GF(2^8)
	        var x = 0;
	        var xi = 0;
	        for (var i = 0; i < 256; i++) {
	            // Compute sbox
	            var sx = xi ^ (xi << 1) ^ (xi << 2) ^ (xi << 3) ^ (xi << 4);
	            sx = (sx >>> 8) ^ (sx & 0xff) ^ 0x63;
	            SBOX[x] = sx;
	            INV_SBOX[sx] = x;

	            // Compute multiplication
	            var x2 = d[x];
	            var x4 = d[x2];
	            var x8 = d[x4];

	            // Compute sub bytes, mix columns tables
	            var t = (d[sx] * 0x101) ^ (sx * 0x1010100);
	            SUB_MIX_0[x] = (t << 24) | (t >>> 8);
	            SUB_MIX_1[x] = (t << 16) | (t >>> 16);
	            SUB_MIX_2[x] = (t << 8)  | (t >>> 24);
	            SUB_MIX_3[x] = t;

	            // Compute inv sub bytes, inv mix columns tables
	            var t = (x8 * 0x1010101) ^ (x4 * 0x10001) ^ (x2 * 0x101) ^ (x * 0x1010100);
	            INV_SUB_MIX_0[sx] = (t << 24) | (t >>> 8);
	            INV_SUB_MIX_1[sx] = (t << 16) | (t >>> 16);
	            INV_SUB_MIX_2[sx] = (t << 8)  | (t >>> 24);
	            INV_SUB_MIX_3[sx] = t;

	            // Compute next counter
	            if (!x) {
	                x = xi = 1;
	            } else {
	                x = x2 ^ d[d[d[x8 ^ x2]]];
	                xi ^= d[d[xi]];
	            }
	        }
	    }());

	    // Precomputed Rcon lookup
	    var RCON = [0x00, 0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80, 0x1b, 0x36];

	    /**
	     * AES block cipher algorithm.
	     */
	    var AES = C_algo.AES = BlockCipher.extend({
	        _doReset: function () {
	            // Skip reset of nRounds has been set before and key did not change
	            if (this._nRounds && this._keyPriorReset === this._key) {
	                return;
	            }

	            // Shortcuts
	            var key = this._keyPriorReset = this._key;
	            var keyWords = key.words;
	            var keySize = key.sigBytes / 4;

	            // Compute number of rounds
	            var nRounds = this._nRounds = keySize + 6;

	            // Compute number of key schedule rows
	            var ksRows = (nRounds + 1) * 4;

	            // Compute key schedule
	            var keySchedule = this._keySchedule = [];
	            for (var ksRow = 0; ksRow < ksRows; ksRow++) {
	                if (ksRow < keySize) {
	                    keySchedule[ksRow] = keyWords[ksRow];
	                } else {
	                    var t = keySchedule[ksRow - 1];

	                    if (!(ksRow % keySize)) {
	                        // Rot word
	                        t = (t << 8) | (t >>> 24);

	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];

	                        // Mix Rcon
	                        t ^= RCON[(ksRow / keySize) | 0] << 24;
	                    } else if (keySize > 6 && ksRow % keySize == 4) {
	                        // Sub word
	                        t = (SBOX[t >>> 24] << 24) | (SBOX[(t >>> 16) & 0xff] << 16) | (SBOX[(t >>> 8) & 0xff] << 8) | SBOX[t & 0xff];
	                    }

	                    keySchedule[ksRow] = keySchedule[ksRow - keySize] ^ t;
	                }
	            }

	            // Compute inv key schedule
	            var invKeySchedule = this._invKeySchedule = [];
	            for (var invKsRow = 0; invKsRow < ksRows; invKsRow++) {
	                var ksRow = ksRows - invKsRow;

	                if (invKsRow % 4) {
	                    var t = keySchedule[ksRow];
	                } else {
	                    var t = keySchedule[ksRow - 4];
	                }

	                if (invKsRow < 4 || ksRow <= 4) {
	                    invKeySchedule[invKsRow] = t;
	                } else {
	                    invKeySchedule[invKsRow] = INV_SUB_MIX_0[SBOX[t >>> 24]] ^ INV_SUB_MIX_1[SBOX[(t >>> 16) & 0xff]] ^
	                                               INV_SUB_MIX_2[SBOX[(t >>> 8) & 0xff]] ^ INV_SUB_MIX_3[SBOX[t & 0xff]];
	                }
	            }
	        },

	        encryptBlock: function (M, offset) {
	            this._doCryptBlock(M, offset, this._keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX);
	        },

	        decryptBlock: function (M, offset) {
	            // Swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;

	            this._doCryptBlock(M, offset, this._invKeySchedule, INV_SUB_MIX_0, INV_SUB_MIX_1, INV_SUB_MIX_2, INV_SUB_MIX_3, INV_SBOX);

	            // Inv swap 2nd and 4th rows
	            var t = M[offset + 1];
	            M[offset + 1] = M[offset + 3];
	            M[offset + 3] = t;
	        },

	        _doCryptBlock: function (M, offset, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
	            // Shortcut
	            var nRounds = this._nRounds;

	            // Get input, add round key
	            var s0 = M[offset]     ^ keySchedule[0];
	            var s1 = M[offset + 1] ^ keySchedule[1];
	            var s2 = M[offset + 2] ^ keySchedule[2];
	            var s3 = M[offset + 3] ^ keySchedule[3];

	            // Key schedule row counter
	            var ksRow = 4;

	            // Rounds
	            for (var round = 1; round < nRounds; round++) {
	                // Shift rows, sub bytes, mix columns, add round key
	                var t0 = SUB_MIX_0[s0 >>> 24] ^ SUB_MIX_1[(s1 >>> 16) & 0xff] ^ SUB_MIX_2[(s2 >>> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow++];
	                var t1 = SUB_MIX_0[s1 >>> 24] ^ SUB_MIX_1[(s2 >>> 16) & 0xff] ^ SUB_MIX_2[(s3 >>> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow++];
	                var t2 = SUB_MIX_0[s2 >>> 24] ^ SUB_MIX_1[(s3 >>> 16) & 0xff] ^ SUB_MIX_2[(s0 >>> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow++];
	                var t3 = SUB_MIX_0[s3 >>> 24] ^ SUB_MIX_1[(s0 >>> 16) & 0xff] ^ SUB_MIX_2[(s1 >>> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow++];

	                // Update state
	                s0 = t0;
	                s1 = t1;
	                s2 = t2;
	                s3 = t3;
	            }

	            // Shift rows, sub bytes, add round key
	            var t0 = ((SBOX[s0 >>> 24] << 24) | (SBOX[(s1 >>> 16) & 0xff] << 16) | (SBOX[(s2 >>> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow++];
	            var t1 = ((SBOX[s1 >>> 24] << 24) | (SBOX[(s2 >>> 16) & 0xff] << 16) | (SBOX[(s3 >>> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow++];
	            var t2 = ((SBOX[s2 >>> 24] << 24) | (SBOX[(s3 >>> 16) & 0xff] << 16) | (SBOX[(s0 >>> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow++];
	            var t3 = ((SBOX[s3 >>> 24] << 24) | (SBOX[(s0 >>> 16) & 0xff] << 16) | (SBOX[(s1 >>> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow++];

	            // Set output
	            M[offset]     = t0;
	            M[offset + 1] = t1;
	            M[offset + 2] = t2;
	            M[offset + 3] = t3;
	        },

	        keySize: 256/32
	    });

	    /**
	     * Shortcut functions to the cipher's object interface.
	     *
	     * @example
	     *
	     *     var ciphertext = CryptoJS.AES.encrypt(message, key, cfg);
	     *     var plaintext  = CryptoJS.AES.decrypt(ciphertext, key, cfg);
	     */
	    C.AES = BlockCipher._createHelper(AES);
	}());


	return CryptoJS.AES;

}));

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var C_enc = C.enc;

	    /**
	     * Base64 encoding strategy.
	     */
	    var Base64 = C_enc.Base64 = {
	        /**
	         * Converts a word array to a Base64 string.
	         *
	         * @param {WordArray} wordArray The word array.
	         *
	         * @return {string} The Base64 string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var base64String = CryptoJS.enc.Base64.stringify(wordArray);
	         */
	        stringify: function (wordArray) {
	            // Shortcuts
	            var words = wordArray.words;
	            var sigBytes = wordArray.sigBytes;
	            var map = this._map;

	            // Clamp excess bits
	            wordArray.clamp();

	            // Convert
	            var base64Chars = [];
	            for (var i = 0; i < sigBytes; i += 3) {
	                var byte1 = (words[i >>> 2]       >>> (24 - (i % 4) * 8))       & 0xff;
	                var byte2 = (words[(i + 1) >>> 2] >>> (24 - ((i + 1) % 4) * 8)) & 0xff;
	                var byte3 = (words[(i + 2) >>> 2] >>> (24 - ((i + 2) % 4) * 8)) & 0xff;

	                var triplet = (byte1 << 16) | (byte2 << 8) | byte3;

	                for (var j = 0; (j < 4) && (i + j * 0.75 < sigBytes); j++) {
	                    base64Chars.push(map.charAt((triplet >>> (6 * (3 - j))) & 0x3f));
	                }
	            }

	            // Add padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                while (base64Chars.length % 4) {
	                    base64Chars.push(paddingChar);
	                }
	            }

	            return base64Chars.join('');
	        },

	        /**
	         * Converts a Base64 string to a word array.
	         *
	         * @param {string} base64Str The Base64 string.
	         *
	         * @return {WordArray} The word array.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var wordArray = CryptoJS.enc.Base64.parse(base64String);
	         */
	        parse: function (base64Str) {
	            // Shortcuts
	            var base64StrLength = base64Str.length;
	            var map = this._map;
	            var reverseMap = this._reverseMap;

	            if (!reverseMap) {
	                    reverseMap = this._reverseMap = [];
	                    for (var j = 0; j < map.length; j++) {
	                        reverseMap[map.charCodeAt(j)] = j;
	                    }
	            }

	            // Ignore padding
	            var paddingChar = map.charAt(64);
	            if (paddingChar) {
	                var paddingIndex = base64Str.indexOf(paddingChar);
	                if (paddingIndex !== -1) {
	                    base64StrLength = paddingIndex;
	                }
	            }

	            // Convert
	            return parseLoop(base64Str, base64StrLength, reverseMap);

	        },

	        _map: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
	    };

	    function parseLoop(base64Str, base64StrLength, reverseMap) {
	      var words = [];
	      var nBytes = 0;
	      for (var i = 0; i < base64StrLength; i++) {
	          if (i % 4) {
	              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << ((i % 4) * 2);
	              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> (6 - (i % 4) * 2);
	              words[nBytes >>> 2] |= (bits1 | bits2) << (24 - (nBytes % 4) * 8);
	              nBytes++;
	          }
	      }
	      return WordArray.create(words, nBytes);
	    }
	}());


	return CryptoJS.enc.Base64;

}));

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-1 hash algorithm.
	     */
	    var SHA1 = C_algo.SHA1 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init([
	                0x67452301, 0xefcdab89,
	                0x98badcfe, 0x10325476,
	                0xc3d2e1f0
	            ]);
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];

	            // Computation
	            for (var i = 0; i < 80; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var n = W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16];
	                    W[i] = (n << 1) | (n >>> 31);
	                }

	                var t = ((a << 5) | (a >>> 27)) + e + W[i];
	                if (i < 20) {
	                    t += ((b & c) | (~b & d)) + 0x5a827999;
	                } else if (i < 40) {
	                    t += (b ^ c ^ d) + 0x6ed9eba1;
	                } else if (i < 60) {
	                    t += ((b & c) | (b & d) | (c & d)) - 0x70e44324;
	                } else /* if (i < 80) */ {
	                    t += (b ^ c ^ d) - 0x359d3e2a;
	                }

	                e = d;
	                d = c;
	                c = (b << 30) | (b >>> 2);
	                b = a;
	                a = t;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA1('message');
	     *     var hash = CryptoJS.SHA1(wordArray);
	     */
	    C.SHA1 = Hasher._createHelper(SHA1);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA1(message, key);
	     */
	    C.HmacSHA1 = Hasher._createHmacHelper(SHA1);
	}());


	return CryptoJS.SHA1;

}));

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else {}
}(this, function (CryptoJS) {

	(function () {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var C_algo = C.algo;

	    /**
	     * HMAC algorithm.
	     */
	    var HMAC = C_algo.HMAC = Base.extend({
	        /**
	         * Initializes a newly created HMAC.
	         *
	         * @param {Hasher} hasher The hash algorithm to use.
	         * @param {WordArray|string} key The secret key.
	         *
	         * @example
	         *
	         *     var hmacHasher = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, key);
	         */
	        init: function (hasher, key) {
	            // Init hasher
	            hasher = this._hasher = new hasher.init();

	            // Convert string to WordArray, else assume WordArray already
	            if (typeof key == 'string') {
	                key = Utf8.parse(key);
	            }

	            // Shortcuts
	            var hasherBlockSize = hasher.blockSize;
	            var hasherBlockSizeBytes = hasherBlockSize * 4;

	            // Allow arbitrary length keys
	            if (key.sigBytes > hasherBlockSizeBytes) {
	                key = hasher.finalize(key);
	            }

	            // Clamp excess bits
	            key.clamp();

	            // Clone key for inner and outer pads
	            var oKey = this._oKey = key.clone();
	            var iKey = this._iKey = key.clone();

	            // Shortcuts
	            var oKeyWords = oKey.words;
	            var iKeyWords = iKey.words;

	            // XOR keys with pad constants
	            for (var i = 0; i < hasherBlockSize; i++) {
	                oKeyWords[i] ^= 0x5c5c5c5c;
	                iKeyWords[i] ^= 0x36363636;
	            }
	            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this HMAC to its initial state.
	         *
	         * @example
	         *
	         *     hmacHasher.reset();
	         */
	        reset: function () {
	            // Shortcut
	            var hasher = this._hasher;

	            // Reset
	            hasher.reset();
	            hasher.update(this._iKey);
	        },

	        /**
	         * Updates this HMAC with a message.
	         *
	         * @param {WordArray|string} messageUpdate The message to append.
	         *
	         * @return {HMAC} This HMAC instance.
	         *
	         * @example
	         *
	         *     hmacHasher.update('message');
	         *     hmacHasher.update(wordArray);
	         */
	        update: function (messageUpdate) {
	            this._hasher.update(messageUpdate);

	            // Chainable
	            return this;
	        },

	        /**
	         * Finalizes the HMAC computation.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} messageUpdate (Optional) A final message update.
	         *
	         * @return {WordArray} The HMAC.
	         *
	         * @example
	         *
	         *     var hmac = hmacHasher.finalize();
	         *     var hmac = hmacHasher.finalize('message');
	         *     var hmac = hmacHasher.finalize(wordArray);
	         */
	        finalize: function (messageUpdate) {
	            // Shortcut
	            var hasher = this._hasher;

	            // Compute HMAC
	            var innerHash = hasher.finalize(messageUpdate);
	            hasher.reset();
	            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));

	            return hmac;
	        }
	    });
	}());


}));

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory, undef) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0), __webpack_require__(2));
	}
	else {}
}(this, function (CryptoJS) {

	/**
	 * Cipher core components.
	 */
	CryptoJS.lib.Cipher || (function (undefined) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var Base = C_lib.Base;
	    var WordArray = C_lib.WordArray;
	    var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm;
	    var C_enc = C.enc;
	    var Utf8 = C_enc.Utf8;
	    var Base64 = C_enc.Base64;
	    var C_algo = C.algo;
	    var EvpKDF = C_algo.EvpKDF;

	    /**
	     * Abstract base cipher template.
	     *
	     * @property {number} keySize This cipher's key size. Default: 4 (128 bits)
	     * @property {number} ivSize This cipher's IV size. Default: 4 (128 bits)
	     * @property {number} _ENC_XFORM_MODE A constant representing encryption mode.
	     * @property {number} _DEC_XFORM_MODE A constant representing decryption mode.
	     */
	    var Cipher = C_lib.Cipher = BufferedBlockAlgorithm.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {WordArray} iv The IV to use for this operation.
	         */
	        cfg: Base.extend(),

	        /**
	         * Creates this cipher in encryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createEncryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createEncryptor: function (key, cfg) {
	            return this.create(this._ENC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Creates this cipher in decryption mode.
	         *
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {Cipher} A cipher instance.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.createDecryptor(keyWordArray, { iv: ivWordArray });
	         */
	        createDecryptor: function (key, cfg) {
	            return this.create(this._DEC_XFORM_MODE, key, cfg);
	        },

	        /**
	         * Initializes a newly created cipher.
	         *
	         * @param {number} xformMode Either the encryption or decryption transormation mode constant.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @example
	         *
	         *     var cipher = CryptoJS.algo.AES.create(CryptoJS.algo.AES._ENC_XFORM_MODE, keyWordArray, { iv: ivWordArray });
	         */
	        init: function (xformMode, key, cfg) {
	            // Apply config defaults
	            this.cfg = this.cfg.extend(cfg);

	            // Store transform mode and key
	            this._xformMode = xformMode;
	            this._key = key;

	            // Set initial values
	            this.reset();
	        },

	        /**
	         * Resets this cipher to its initial state.
	         *
	         * @example
	         *
	         *     cipher.reset();
	         */
	        reset: function () {
	            // Reset data buffer
	            BufferedBlockAlgorithm.reset.call(this);

	            // Perform concrete-cipher logic
	            this._doReset();
	        },

	        /**
	         * Adds data to be encrypted or decrypted.
	         *
	         * @param {WordArray|string} dataUpdate The data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.process('data');
	         *     var encrypted = cipher.process(wordArray);
	         */
	        process: function (dataUpdate) {
	            // Append
	            this._append(dataUpdate);

	            // Process available blocks
	            return this._process();
	        },

	        /**
	         * Finalizes the encryption or decryption process.
	         * Note that the finalize operation is effectively a destructive, read-once operation.
	         *
	         * @param {WordArray|string} dataUpdate The final data to encrypt or decrypt.
	         *
	         * @return {WordArray} The data after final processing.
	         *
	         * @example
	         *
	         *     var encrypted = cipher.finalize();
	         *     var encrypted = cipher.finalize('data');
	         *     var encrypted = cipher.finalize(wordArray);
	         */
	        finalize: function (dataUpdate) {
	            // Final data update
	            if (dataUpdate) {
	                this._append(dataUpdate);
	            }

	            // Perform concrete-cipher logic
	            var finalProcessedData = this._doFinalize();

	            return finalProcessedData;
	        },

	        keySize: 128/32,

	        ivSize: 128/32,

	        _ENC_XFORM_MODE: 1,

	        _DEC_XFORM_MODE: 2,

	        /**
	         * Creates shortcut functions to a cipher's object interface.
	         *
	         * @param {Cipher} cipher The cipher to create a helper for.
	         *
	         * @return {Object} An object with encrypt and decrypt shortcut functions.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var AES = CryptoJS.lib.Cipher._createHelper(CryptoJS.algo.AES);
	         */
	        _createHelper: (function () {
	            function selectCipherStrategy(key) {
	                if (typeof key == 'string') {
	                    return PasswordBasedCipher;
	                } else {
	                    return SerializableCipher;
	                }
	            }

	            return function (cipher) {
	                return {
	                    encrypt: function (message, key, cfg) {
	                        return selectCipherStrategy(key).encrypt(cipher, message, key, cfg);
	                    },

	                    decrypt: function (ciphertext, key, cfg) {
	                        return selectCipherStrategy(key).decrypt(cipher, ciphertext, key, cfg);
	                    }
	                };
	            };
	        }())
	    });

	    /**
	     * Abstract base stream cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 1 (32 bits)
	     */
	    var StreamCipher = C_lib.StreamCipher = Cipher.extend({
	        _doFinalize: function () {
	            // Process partial blocks
	            var finalProcessedBlocks = this._process(!!'flush');

	            return finalProcessedBlocks;
	        },

	        blockSize: 1
	    });

	    /**
	     * Mode namespace.
	     */
	    var C_mode = C.mode = {};

	    /**
	     * Abstract base block cipher mode template.
	     */
	    var BlockCipherMode = C_lib.BlockCipherMode = Base.extend({
	        /**
	         * Creates this mode for encryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createEncryptor(cipher, iv.words);
	         */
	        createEncryptor: function (cipher, iv) {
	            return this.Encryptor.create(cipher, iv);
	        },

	        /**
	         * Creates this mode for decryption.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.createDecryptor(cipher, iv.words);
	         */
	        createDecryptor: function (cipher, iv) {
	            return this.Decryptor.create(cipher, iv);
	        },

	        /**
	         * Initializes a newly created mode.
	         *
	         * @param {Cipher} cipher A block cipher instance.
	         * @param {Array} iv The IV words.
	         *
	         * @example
	         *
	         *     var mode = CryptoJS.mode.CBC.Encryptor.create(cipher, iv.words);
	         */
	        init: function (cipher, iv) {
	            this._cipher = cipher;
	            this._iv = iv;
	        }
	    });

	    /**
	     * Cipher Block Chaining mode.
	     */
	    var CBC = C_mode.CBC = (function () {
	        /**
	         * Abstract base CBC mode.
	         */
	        var CBC = BlockCipherMode.extend();

	        /**
	         * CBC encryptor.
	         */
	        CBC.Encryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // XOR and encrypt
	                xorBlock.call(this, words, offset, blockSize);
	                cipher.encryptBlock(words, offset);

	                // Remember this block to use with next block
	                this._prevBlock = words.slice(offset, offset + blockSize);
	            }
	        });

	        /**
	         * CBC decryptor.
	         */
	        CBC.Decryptor = CBC.extend({
	            /**
	             * Processes the data block at offset.
	             *
	             * @param {Array} words The data words to operate on.
	             * @param {number} offset The offset where the block starts.
	             *
	             * @example
	             *
	             *     mode.processBlock(data.words, offset);
	             */
	            processBlock: function (words, offset) {
	                // Shortcuts
	                var cipher = this._cipher;
	                var blockSize = cipher.blockSize;

	                // Remember this block to use with next block
	                var thisBlock = words.slice(offset, offset + blockSize);

	                // Decrypt and XOR
	                cipher.decryptBlock(words, offset);
	                xorBlock.call(this, words, offset, blockSize);

	                // This block becomes the previous block
	                this._prevBlock = thisBlock;
	            }
	        });

	        function xorBlock(words, offset, blockSize) {
	            // Shortcut
	            var iv = this._iv;

	            // Choose mixing block
	            if (iv) {
	                var block = iv;

	                // Remove IV for subsequent blocks
	                this._iv = undefined;
	            } else {
	                var block = this._prevBlock;
	            }

	            // XOR blocks
	            for (var i = 0; i < blockSize; i++) {
	                words[offset + i] ^= block[i];
	            }
	        }

	        return CBC;
	    }());

	    /**
	     * Padding namespace.
	     */
	    var C_pad = C.pad = {};

	    /**
	     * PKCS #5/7 padding strategy.
	     */
	    var Pkcs7 = C_pad.Pkcs7 = {
	        /**
	         * Pads data using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to pad.
	         * @param {number} blockSize The multiple that the data should be padded to.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.pad(wordArray, 4);
	         */
	        pad: function (data, blockSize) {
	            // Shortcut
	            var blockSizeBytes = blockSize * 4;

	            // Count padding bytes
	            var nPaddingBytes = blockSizeBytes - data.sigBytes % blockSizeBytes;

	            // Create padding word
	            var paddingWord = (nPaddingBytes << 24) | (nPaddingBytes << 16) | (nPaddingBytes << 8) | nPaddingBytes;

	            // Create padding
	            var paddingWords = [];
	            for (var i = 0; i < nPaddingBytes; i += 4) {
	                paddingWords.push(paddingWord);
	            }
	            var padding = WordArray.create(paddingWords, nPaddingBytes);

	            // Add padding
	            data.concat(padding);
	        },

	        /**
	         * Unpads data that had been padded using the algorithm defined in PKCS #5/7.
	         *
	         * @param {WordArray} data The data to unpad.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     CryptoJS.pad.Pkcs7.unpad(wordArray);
	         */
	        unpad: function (data) {
	            // Get number of padding bytes from last byte
	            var nPaddingBytes = data.words[(data.sigBytes - 1) >>> 2] & 0xff;

	            // Remove padding
	            data.sigBytes -= nPaddingBytes;
	        }
	    };

	    /**
	     * Abstract base block cipher template.
	     *
	     * @property {number} blockSize The number of 32-bit words this cipher operates on. Default: 4 (128 bits)
	     */
	    var BlockCipher = C_lib.BlockCipher = Cipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Mode} mode The block mode to use. Default: CBC
	         * @property {Padding} padding The padding strategy to use. Default: Pkcs7
	         */
	        cfg: Cipher.cfg.extend({
	            mode: CBC,
	            padding: Pkcs7
	        }),

	        reset: function () {
	            // Reset cipher
	            Cipher.reset.call(this);

	            // Shortcuts
	            var cfg = this.cfg;
	            var iv = cfg.iv;
	            var mode = cfg.mode;

	            // Reset block mode
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                var modeCreator = mode.createEncryptor;
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                var modeCreator = mode.createDecryptor;
	                // Keep at least one block in the buffer for unpadding
	                this._minBufferSize = 1;
	            }

	            if (this._mode && this._mode.__creator == modeCreator) {
	                this._mode.init(this, iv && iv.words);
	            } else {
	                this._mode = modeCreator.call(mode, this, iv && iv.words);
	                this._mode.__creator = modeCreator;
	            }
	        },

	        _doProcessBlock: function (words, offset) {
	            this._mode.processBlock(words, offset);
	        },

	        _doFinalize: function () {
	            // Shortcut
	            var padding = this.cfg.padding;

	            // Finalize
	            if (this._xformMode == this._ENC_XFORM_MODE) {
	                // Pad data
	                padding.pad(this._data, this.blockSize);

	                // Process final blocks
	                var finalProcessedBlocks = this._process(!!'flush');
	            } else /* if (this._xformMode == this._DEC_XFORM_MODE) */ {
	                // Process final blocks
	                var finalProcessedBlocks = this._process(!!'flush');

	                // Unpad data
	                padding.unpad(finalProcessedBlocks);
	            }

	            return finalProcessedBlocks;
	        },

	        blockSize: 128/32
	    });

	    /**
	     * A collection of cipher parameters.
	     *
	     * @property {WordArray} ciphertext The raw ciphertext.
	     * @property {WordArray} key The key to this ciphertext.
	     * @property {WordArray} iv The IV used in the ciphering operation.
	     * @property {WordArray} salt The salt used with a key derivation function.
	     * @property {Cipher} algorithm The cipher algorithm.
	     * @property {Mode} mode The block mode used in the ciphering operation.
	     * @property {Padding} padding The padding scheme used in the ciphering operation.
	     * @property {number} blockSize The block size of the cipher.
	     * @property {Format} formatter The default formatting strategy to convert this cipher params object to a string.
	     */
	    var CipherParams = C_lib.CipherParams = Base.extend({
	        /**
	         * Initializes a newly created cipher params object.
	         *
	         * @param {Object} cipherParams An object with any of the possible cipher parameters.
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.lib.CipherParams.create({
	         *         ciphertext: ciphertextWordArray,
	         *         key: keyWordArray,
	         *         iv: ivWordArray,
	         *         salt: saltWordArray,
	         *         algorithm: CryptoJS.algo.AES,
	         *         mode: CryptoJS.mode.CBC,
	         *         padding: CryptoJS.pad.PKCS7,
	         *         blockSize: 4,
	         *         formatter: CryptoJS.format.OpenSSL
	         *     });
	         */
	        init: function (cipherParams) {
	            this.mixIn(cipherParams);
	        },

	        /**
	         * Converts this cipher params object to a string.
	         *
	         * @param {Format} formatter (Optional) The formatting strategy to use.
	         *
	         * @return {string} The stringified cipher params.
	         *
	         * @throws Error If neither the formatter nor the default formatter is set.
	         *
	         * @example
	         *
	         *     var string = cipherParams + '';
	         *     var string = cipherParams.toString();
	         *     var string = cipherParams.toString(CryptoJS.format.OpenSSL);
	         */
	        toString: function (formatter) {
	            return (formatter || this.formatter).stringify(this);
	        }
	    });

	    /**
	     * Format namespace.
	     */
	    var C_format = C.format = {};

	    /**
	     * OpenSSL formatting strategy.
	     */
	    var OpenSSLFormatter = C_format.OpenSSL = {
	        /**
	         * Converts a cipher params object to an OpenSSL-compatible string.
	         *
	         * @param {CipherParams} cipherParams The cipher params object.
	         *
	         * @return {string} The OpenSSL-compatible string.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var openSSLString = CryptoJS.format.OpenSSL.stringify(cipherParams);
	         */
	        stringify: function (cipherParams) {
	            // Shortcuts
	            var ciphertext = cipherParams.ciphertext;
	            var salt = cipherParams.salt;

	            // Format
	            if (salt) {
	                var wordArray = WordArray.create([0x53616c74, 0x65645f5f]).concat(salt).concat(ciphertext);
	            } else {
	                var wordArray = ciphertext;
	            }

	            return wordArray.toString(Base64);
	        },

	        /**
	         * Converts an OpenSSL-compatible string to a cipher params object.
	         *
	         * @param {string} openSSLStr The OpenSSL-compatible string.
	         *
	         * @return {CipherParams} The cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var cipherParams = CryptoJS.format.OpenSSL.parse(openSSLString);
	         */
	        parse: function (openSSLStr) {
	            // Parse base64
	            var ciphertext = Base64.parse(openSSLStr);

	            // Shortcut
	            var ciphertextWords = ciphertext.words;

	            // Test for salt
	            if (ciphertextWords[0] == 0x53616c74 && ciphertextWords[1] == 0x65645f5f) {
	                // Extract salt
	                var salt = WordArray.create(ciphertextWords.slice(2, 4));

	                // Remove salt from ciphertext
	                ciphertextWords.splice(0, 4);
	                ciphertext.sigBytes -= 16;
	            }

	            return CipherParams.create({ ciphertext: ciphertext, salt: salt });
	        }
	    };

	    /**
	     * A cipher wrapper that returns ciphertext as a serializable cipher params object.
	     */
	    var SerializableCipher = C_lib.SerializableCipher = Base.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {Formatter} format The formatting strategy to convert cipher param objects to and from a string. Default: OpenSSL
	         */
	        cfg: Base.extend({
	            format: OpenSSLFormatter
	        }),

	        /**
	         * Encrypts a message.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key);
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv });
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher.encrypt(CryptoJS.algo.AES, message, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Encrypt
	            var encryptor = cipher.createEncryptor(key, cfg);
	            var ciphertext = encryptor.finalize(message);

	            // Shortcut
	            var cipherCfg = encryptor.cfg;

	            // Create and return serializable cipher params
	            return CipherParams.create({
	                ciphertext: ciphertext,
	                key: key,
	                iv: cipherCfg.iv,
	                algorithm: cipher,
	                mode: cipherCfg.mode,
	                padding: cipherCfg.padding,
	                blockSize: cipher.blockSize,
	                formatter: cfg.format
	            });
	        },

	        /**
	         * Decrypts serialized ciphertext.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {WordArray} key The key.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.SerializableCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, key, { iv: iv, format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, key, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Decrypt
	            var plaintext = cipher.createDecryptor(key, cfg).finalize(ciphertext.ciphertext);

	            return plaintext;
	        },

	        /**
	         * Converts serialized ciphertext to CipherParams,
	         * else assumed CipherParams already and returns ciphertext unchanged.
	         *
	         * @param {CipherParams|string} ciphertext The ciphertext.
	         * @param {Formatter} format The formatting strategy to use to parse serialized ciphertext.
	         *
	         * @return {CipherParams} The unserialized ciphertext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.SerializableCipher._parse(ciphertextStringOrParams, format);
	         */
	        _parse: function (ciphertext, format) {
	            if (typeof ciphertext == 'string') {
	                return format.parse(ciphertext, this);
	            } else {
	                return ciphertext;
	            }
	        }
	    });

	    /**
	     * Key derivation function namespace.
	     */
	    var C_kdf = C.kdf = {};

	    /**
	     * OpenSSL key derivation function.
	     */
	    var OpenSSLKdf = C_kdf.OpenSSL = {
	        /**
	         * Derives a key and IV from a password.
	         *
	         * @param {string} password The password to derive from.
	         * @param {number} keySize The size in words of the key to generate.
	         * @param {number} ivSize The size in words of the IV to generate.
	         * @param {WordArray|string} salt (Optional) A 64-bit salt to use. If omitted, a salt will be generated randomly.
	         *
	         * @return {CipherParams} A cipher params object with the key, IV, and salt.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32);
	         *     var derivedParams = CryptoJS.kdf.OpenSSL.execute('Password', 256/32, 128/32, 'saltsalt');
	         */
	        execute: function (password, keySize, ivSize, salt) {
	            // Generate random salt
	            if (!salt) {
	                salt = WordArray.random(64/8);
	            }

	            // Derive key and IV
	            var key = EvpKDF.create({ keySize: keySize + ivSize }).compute(password, salt);

	            // Separate key and IV
	            var iv = WordArray.create(key.words.slice(keySize), ivSize * 4);
	            key.sigBytes = keySize * 4;

	            // Return params
	            return CipherParams.create({ key: key, iv: iv, salt: salt });
	        }
	    };

	    /**
	     * A serializable cipher wrapper that derives the key from a password,
	     * and returns ciphertext as a serializable cipher params object.
	     */
	    var PasswordBasedCipher = C_lib.PasswordBasedCipher = SerializableCipher.extend({
	        /**
	         * Configuration options.
	         *
	         * @property {KDF} kdf The key derivation function to use to generate a key and IV from a password. Default: OpenSSL
	         */
	        cfg: SerializableCipher.cfg.extend({
	            kdf: OpenSSLKdf
	        }),

	        /**
	         * Encrypts a message using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {WordArray|string} message The message to encrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {CipherParams} A cipher params object.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password');
	         *     var ciphertextParams = CryptoJS.lib.PasswordBasedCipher.encrypt(CryptoJS.algo.AES, message, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        encrypt: function (cipher, message, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Encrypt
	            var ciphertext = SerializableCipher.encrypt.call(this, cipher, message, derivedParams.key, cfg);

	            // Mix in derived params
	            ciphertext.mixIn(derivedParams);

	            return ciphertext;
	        },

	        /**
	         * Decrypts serialized ciphertext using a password.
	         *
	         * @param {Cipher} cipher The cipher algorithm to use.
	         * @param {CipherParams|string} ciphertext The ciphertext to decrypt.
	         * @param {string} password The password.
	         * @param {Object} cfg (Optional) The configuration options to use for this operation.
	         *
	         * @return {WordArray} The plaintext.
	         *
	         * @static
	         *
	         * @example
	         *
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, formattedCiphertext, 'password', { format: CryptoJS.format.OpenSSL });
	         *     var plaintext = CryptoJS.lib.PasswordBasedCipher.decrypt(CryptoJS.algo.AES, ciphertextParams, 'password', { format: CryptoJS.format.OpenSSL });
	         */
	        decrypt: function (cipher, ciphertext, password, cfg) {
	            // Apply config defaults
	            cfg = this.cfg.extend(cfg);

	            // Convert string to CipherParams
	            ciphertext = this._parse(ciphertext, cfg.format);

	            // Derive key and other params
	            var derivedParams = cfg.kdf.execute(password, cipher.keySize, cipher.ivSize, ciphertext.salt);

	            // Add IV to config
	            cfg.iv = derivedParams.iv;

	            // Decrypt
	            var plaintext = SerializableCipher.decrypt.call(this, cipher, ciphertext, derivedParams.key, cfg);

	            return plaintext;
	        }
	    });
	}());


}));

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

;(function (root, factory) {
	if (true) {
		// CommonJS
		module.exports = exports = factory(__webpack_require__(0));
	}
	else {}
}(this, function (CryptoJS) {

	(function (Math) {
	    // Shortcuts
	    var C = CryptoJS;
	    var C_lib = C.lib;
	    var WordArray = C_lib.WordArray;
	    var Hasher = C_lib.Hasher;
	    var C_algo = C.algo;

	    // Initialization and round constants tables
	    var H = [];
	    var K = [];

	    // Compute constants
	    (function () {
	        function isPrime(n) {
	            var sqrtN = Math.sqrt(n);
	            for (var factor = 2; factor <= sqrtN; factor++) {
	                if (!(n % factor)) {
	                    return false;
	                }
	            }

	            return true;
	        }

	        function getFractionalBits(n) {
	            return ((n - (n | 0)) * 0x100000000) | 0;
	        }

	        var n = 2;
	        var nPrime = 0;
	        while (nPrime < 64) {
	            if (isPrime(n)) {
	                if (nPrime < 8) {
	                    H[nPrime] = getFractionalBits(Math.pow(n, 1 / 2));
	                }
	                K[nPrime] = getFractionalBits(Math.pow(n, 1 / 3));

	                nPrime++;
	            }

	            n++;
	        }
	    }());

	    // Reusable object
	    var W = [];

	    /**
	     * SHA-256 hash algorithm.
	     */
	    var SHA256 = C_algo.SHA256 = Hasher.extend({
	        _doReset: function () {
	            this._hash = new WordArray.init(H.slice(0));
	        },

	        _doProcessBlock: function (M, offset) {
	            // Shortcut
	            var H = this._hash.words;

	            // Working variables
	            var a = H[0];
	            var b = H[1];
	            var c = H[2];
	            var d = H[3];
	            var e = H[4];
	            var f = H[5];
	            var g = H[6];
	            var h = H[7];

	            // Computation
	            for (var i = 0; i < 64; i++) {
	                if (i < 16) {
	                    W[i] = M[offset + i] | 0;
	                } else {
	                    var gamma0x = W[i - 15];
	                    var gamma0  = ((gamma0x << 25) | (gamma0x >>> 7))  ^
	                                  ((gamma0x << 14) | (gamma0x >>> 18)) ^
	                                   (gamma0x >>> 3);

	                    var gamma1x = W[i - 2];
	                    var gamma1  = ((gamma1x << 15) | (gamma1x >>> 17)) ^
	                                  ((gamma1x << 13) | (gamma1x >>> 19)) ^
	                                   (gamma1x >>> 10);

	                    W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
	                }

	                var ch  = (e & f) ^ (~e & g);
	                var maj = (a & b) ^ (a & c) ^ (b & c);

	                var sigma0 = ((a << 30) | (a >>> 2)) ^ ((a << 19) | (a >>> 13)) ^ ((a << 10) | (a >>> 22));
	                var sigma1 = ((e << 26) | (e >>> 6)) ^ ((e << 21) | (e >>> 11)) ^ ((e << 7)  | (e >>> 25));

	                var t1 = h + sigma1 + ch + K[i] + W[i];
	                var t2 = sigma0 + maj;

	                h = g;
	                g = f;
	                f = e;
	                e = (d + t1) | 0;
	                d = c;
	                c = b;
	                b = a;
	                a = (t1 + t2) | 0;
	            }

	            // Intermediate hash value
	            H[0] = (H[0] + a) | 0;
	            H[1] = (H[1] + b) | 0;
	            H[2] = (H[2] + c) | 0;
	            H[3] = (H[3] + d) | 0;
	            H[4] = (H[4] + e) | 0;
	            H[5] = (H[5] + f) | 0;
	            H[6] = (H[6] + g) | 0;
	            H[7] = (H[7] + h) | 0;
	        },

	        _doFinalize: function () {
	            // Shortcuts
	            var data = this._data;
	            var dataWords = data.words;

	            var nBitsTotal = this._nDataBytes * 8;
	            var nBitsLeft = data.sigBytes * 8;

	            // Add padding
	            dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = Math.floor(nBitsTotal / 0x100000000);
	            dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = nBitsTotal;
	            data.sigBytes = dataWords.length * 4;

	            // Hash final blocks
	            this._process();

	            // Return final computed hash
	            return this._hash;
	        },

	        clone: function () {
	            var clone = Hasher.clone.call(this);
	            clone._hash = this._hash.clone();

	            return clone;
	        }
	    });

	    /**
	     * Shortcut function to the hasher's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     *
	     * @return {WordArray} The hash.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hash = CryptoJS.SHA256('message');
	     *     var hash = CryptoJS.SHA256(wordArray);
	     */
	    C.SHA256 = Hasher._createHelper(SHA256);

	    /**
	     * Shortcut function to the HMAC's object interface.
	     *
	     * @param {WordArray|string} message The message to hash.
	     * @param {WordArray|string} key The secret key.
	     *
	     * @return {WordArray} The HMAC.
	     *
	     * @static
	     *
	     * @example
	     *
	     *     var hmac = CryptoJS.HmacSHA256(message, key);
	     */
	    C.HmacSHA256 = Hasher._createHmacHelper(SHA256);
	}(Math));


	return CryptoJS.SHA256;

}));

/***/ }),
/* 14 */
/***/ (function(module, exports) {

/*
  Copyright (C) 2019 Arturo Vasquez Soluciones Web.
  Todos los derechos reservados.

  La redistribución y uso en formatos fuente y binario están permitidas
  siempre que el aviso de copyright anterior y este párrafo son
  duplicado en todas esas formas y que cualquier documentación,
  materiales de publicidad y otros materiales relacionados con dicha
  distribución y uso reconocen que el software fue desarrollado
  por el Arturo Vasquez Soluciones Web. El nombre de
  Arturo Vasquez Soluciones Web No se puede utilizar para respaldar o promocionar productos derivados
  de este software sin el permiso previo por escrito.
  ESTE SOFTWARE SE PROPORCIONA '' tal cual '' Y SIN EXPRESA O
  Garantías implícitas, incluyendo, sin limitación, los implicados
  GARANTÍAS DE COMERCIALIZACIÓN Y APTITUD PARA UN PROPÓSITO PARTICULAR.
*/
/************************************************/
/**********************FETCH API*****************/
/************************************************/
fetchapi=(function(global,factory){
  //write code below
  function getSocket(){
    var fetchapi=fetch;
    if(fetchapi){
      return fetchapi;
    }
  };
  return{
    getFetch:function(){
		var sockfetch=getSocket();
      return sockfetch;
  	},
  	get:function(url,callbackReq){
  		var objeto;
		var x,y,valor,indice;
		var sockfetch=getSocket();
		sockfetch(url)
	    .then(function(response){
	    	response.json().then(function(data){
			if(response.ok){
		          try {
		            callbackReq(data);
		          }
		          catch (e) {
		            throw new Error(e);
		          }
		          finally {
		              //silence is golden
		          }
	          }
	    	})
	        .catch(function(error){
	          console.log(error);
	        })
	    })
	    .catch(function(error){
	      console.log(error);
	    })
  	},
  	post:function(url,data,callbackReq){
		var sockfetch=getSocket();
		var options;
		var respjson;
		var objeto;
		var x,y,valor,indice;
      options={
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
			"data":data
		})
      }
      sockfetch(url,options)
        .then(function(response){
        	if(response.ok){
				response.text().then(function(data){
					callbackReq(data);
				})
		        .catch(function(error){
		          	console.log(error);
	        	})
        	}
        })
        .catch(function(error){
          console.log(error);
        })
  	}
  }
}(window));
module.exports=fetchapi;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

/*
  Copyright (C) 2019 Arturo Vasquez Soluciones Web.
  Todos los derechos reservados.

  La redistribución y uso en formatos fuente y binario están permitidas
  siempre que el aviso de copyright anterior y este párrafo son
  duplicado en todas esas formas y que cualquier documentación,
  materiales de publicidad y otros materiales relacionados con dicha
  distribución y uso reconocen que el software fue desarrollado
  por el Arturo Vasquez Soluciones Web. El nombre de
  Arturo Vasquez Soluciones Web No se puede utilizar para respaldar o promocionar productos derivados
  de este software sin el permiso previo por escrito.
  ESTE SOFTWARE SE PROPORCIONA '' tal cual '' Y SIN EXPRESA O
  Garantías implícitas, incluyendo, sin limitación, los implicados
  GARANTÍAS DE COMERCIALIZACIÓN Y APTITUD PARA UN PROPÓSITO PARTICULAR.
*/
/*función - módulo interno webworkers*/
/************************************************/
var nombreww='';
ww=(function(nombreww){
	var workers=[];
	var numworkers=0;
	var workertmp;
    var workerSck;
    var workerName;
	var retobject;
	var objectfinal;
	retobject={};
	objectfinal={};
	//Submodulo WebWorkers
	return{
		set:function(nombreid,filename){
			if(workerSck==undefined){
				if(filename!=''){
            		// Code Below.....
            		try{
            			workertmp = new Worker(filename);
            			try{
            				workers[numworkers]={'nombre':nombreid,'inst':(workertmp)};
							numworkers++;
            			}
            			catch(e){
            				console.log(e);
            			}
            		}
            		catch(e){
            			console.error(e);
            		}
				}
			}
			else{
				glog("El WebWorker API no está soportado por el navegador.");
			}
		},
		get:function(nombreid){
			for(w in workers){
				if(workers[w].inst!=undefined){
					if(workers[w].nombre==nombreid){
						retobject.worker=workers[w].inst;
						retobject.id=workers[w].nombre;
						break;
					}
				}
			}
			return retobject;
		},
		terminate:function(nombreid){
			var workeri;
			for(w in workers){
				if(workers[w].inst!=undefined){
					if(workers[w].nombre==nombreid){
						workeri=workers[w].inst;
						break;
					}
				}
			}
			workeri.terminate();
			return 0;
		},
		close:function(nombreid){
			var workeri;
			for(w in workers){
				if(workers[w].inst!=undefined){
					if(workers[w].nombre==nombreid){
						workeri=workers[w].inst;
						break;
					}
				}
			}
			workeri.close();
			return 0;
		},
		send:function(nombreid,message){
			var w=g.ww.get(nombreid);
			w.worker.postMessage(message);
		}
	}
}(nombreww));
module.exports=ww;


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/*
  Copyright (C) 2019 Arturo Vasquez Soluciones Web.
  Todos los derechos reservados.

  La redistribución y uso en formatos fuente y binario están permitidas
  siempre que el aviso de copyright anterior y este párrafo son
  duplicado en todas esas formas y que cualquier documentación,
  materiales de publicidad y otros materiales relacionados con dicha
  distribución y uso reconocen que el software fue desarrollado
  por el Arturo Vasquez Soluciones Web. El nombre de
  Arturo Vasquez Soluciones Web No se puede utilizar para respaldar o promocionar productos derivados
  de este software sin el permiso previo por escrito.
  ESTE SOFTWARE SE PROPORCIONA '' tal cual '' Y SIN EXPRESA O
  Garantías implícitas, incluyendo, sin limitación, los implicados
  GARANTÍAS DE COMERCIALIZACIÓN Y APTITUD PARA UN PROPÓSITO PARTICULAR.
*/
/*función - módulo interno websockets*/
/************************************************/
ws=(function(){
	var numsockets;
	var socketUnt;
    var workerName;
	var retobject;
	var objectfinal;
	var socketi;
	var sockets;
	sockets=[];
	retobject={};
	objectfinal={};
	
	function printonerror(event){
		console.log("ERROR...");
		console.log(event.error);
	};
	function printonopen(event){
		console.log("Conexion abierta...");
	};
	function printonmsg(event){
		console.log("Enviando mensaje...");
		console.log(event.data);
	};
	//Submodulo WebSockets
	return{
		set:function(nombreid,urldir){
			console.log("************************************SOCKET*******************************");
			console.log(socketUnt);
			console.log("************************************SOCKET*******************************");
			if(socketUnt==undefined){
				if(urldir!=''){
            // Code Below.....
            			try{
            				socketUnt=new WebSocket(urldir);
            			}
            			catch(e){
            				console.error(e);
            			}
            			finally{
            				socketUnt.addEventListener('error',printonerror);
							socketUnt.addEventListener('open',printonopen);
							socketUnt.addEventListener('message',printonmsg);
							sockets[numsockets]={'nombre':nombreid,'inst':socketUnt};
							numsockets++;
            			}
				}
			}
			else{
				g.log("El WebSocket API no está soportado por el navegador.");
			}
		},
		get:function(nombreid){
			for(w in sockets){
				if(sockets[w].inst!=undefined){
					if(sockets[w].nombre==nombreid){
						g.log(sockets[w]);
						retobject.socket=sockets[w].inst;
						retobject.id=sockets[w].nombre;
						break;
					}
				}
			}
			return retobject;
		},
		close:function(nombreid){
			for(w in sockets){
				if(sockets[w].inst!=undefined){
					if(sockets[w].nombre==nombreid){
						socketi=sockets[w].inst;
						break;
					}
				}
			}
			socketi.close();
			return 0;
		},
		reply:function(nombreid,message,callbackmsg){
			var w=g.ws.get(nombreid);
			w.socket.addEventListener('message',callbackmsg);
			callbackmsg();
		},
		send:function(nombreid,message){
			var w=g.ws.get(nombreid);
			w.socket.send(message);
			g.log("************SOCKET RESPONSE*************");
			g.log(message);
			g.log("************SOCKET RESPONSE*************");
		}
	}
}());
module.exports=ws;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

/*
  Copyright (C) 2019 Arturo Vasquez Soluciones Web.
  Todos los derechos reservados.

  La redistribución y uso en formatos fuente y binario están permitidas
  siempre que el aviso de copyright anterior y este párrafo son
  duplicado en todas esas formas y que cualquier documentación,
  materiales de publicidad y otros materiales relacionados con dicha
  distribución y uso reconocen que el software fue desarrollado
  por el Arturo Vasquez Soluciones Web. El nombre de
  Arturo Vasquez Soluciones Web No se puede utilizar para respaldar o promocionar productos derivados
  de este software sin el permiso previo por escrito.
  ESTE SOFTWARE SE PROPORCIONA '' tal cual '' Y SIN EXPRESA O
  Garantías implícitas, incluyendo, sin limitación, los implicados
  GARANTÍAS DE COMERCIALIZACIÓN Y APTITUD PARA UN PROPÓSITO PARTICULAR.
*/
//Módulo - prototipo que permite extender el framework
/************************************************/
storage=(function(){
	//Submodulo Cookies
	return{
		setLocal:function(variable,valorvariable){
			if (window.localStorage) {
			  localStorage.setItem(variable, valorvariable);
			}
			else {
			  throw new Error('Tu navegador no soporta LocalStorage!');
			}
		},
		getLocal:function(variable){
			if (window.localStorage) {
			  return localStorage.getItem("nombre");
			}
			else {
			  throw new Error('Tu navegador no soporta LocalStorage!');
			}
		},
		rmLocal:function(variable){
			if (window.localStorage) {
			  localStorage.removeItem(variable);
			}
			else {
			  throw new Error('Tu navegador no soporta LocalStorage!');
			}
		},
		setSession:function(variable,valorvariable){
			if (window.sessionStorage) {
				sessionStorage.setItem(variable, valorvariable);
			}
			else {
				throw new Error('Tu navegador no soporta SessionStorage!');
			}
		},
		getSession:function(variable){
			if (window.sessionStorage) {
				sessionStorage.getItem(variable);
			}
			else {
				throw new Error('Tu navegador no soporta SessionStorage!');
			}
		},
		rmSession:function(variable){
			if (window.sessionStorage) {
				sessionStorage.removeItem(variable);
			}
			else {
				throw new Error('Tu navegador no soporta SessionStorage!');
			}
		},
	}
}());
module.exports=storage;

/***/ }),
/* 18 */
/***/ (function(module, exports) {

/*
  Copyright (C) 2021 Arturo Vasquez Soluciones Web.
  Todos los derechos reservados.

  La redistribución y uso en formatos fuente y binario están permitidas
  siempre que el aviso de copyright anterior y este párrafo son
  duplicado en todas esas formas y que cualquier documentación,
  materiales de publicidad y otros materiales relacionados con dicha
  distribución y uso reconocen que el software fue desarrollado
  por el Arturo Vasquez Soluciones Web. El nombre de
  Arturo Vasquez Soluciones Web No se puede utilizar para respaldar o promocionar productos derivados
  de este software sin el permiso previo por escrito.
  ESTE SOFTWARE SE PROPORCIONA '' tal cual '' Y SIN EXPRESA O
  Garantías implícitas, incluyendo, sin limitación, los implicados
  GARANTÍAS DE COMERCIALIZACIÓN Y APTITUD PARA UN PROPÓSITO PARTICULAR.
*/
/*función - módulo web api animations*/
/*
var options = {
  iterations: Infinity,
  iterationStart: 0,
  delay: 0,
  endDelay: 0,
  direction: 'alternate',
  duration: 700,
  fill: 'forwards',
  easing: 'ease-out',
}
*/
/************************************************/
var nombrewapi='';
webapi=(function(nombrewapi){
	var element=getelem(domel);
	//Submodulo WebAnimationsAPI
	return{
		animate:function(keyframesanim,optanim){
			if(element!=undefined){
				element.animate(keyframesanim, optanim)
			}
			else{
				glog("El Elemento no está definido para trabajar con la API.");
			}
			return this;
		}
	}
}(nombrewapi));
module.exports=webapi;


/***/ }),
/* 19 */
/***/ (function(module, exports) {

var DataBind=function(dataBind){"use strict";dataBind.Binder=function(model,document){var doc=document||window.document;var scopeElement=doc.querySelector("[data-scope="+model.scope+"]");var currentValue={};var foreach={};model.addValueChangedListener(valueChangedHandler);function valueChangedHandler(name){var foreachElements=scopeElement.querySelectorAll('[data-foreach$="in '+name+'"]');bindForeach(foreachElements,name);bindElementsInForeach(foreachElements);var valueElements=scopeElement.querySelectorAll('[data-bind="'+name+'"]');bindValues(valueElements);var classElements=scopeElement.querySelectorAll('[data-class="'+name+'"]');bindClasses(classElements);var computedClassElements=scopeElement.querySelectorAll('[data-class^="'+name+'("]');bindClasses(computedClassElements)}var bindElementsInForeach=function(elements){for(var i=0;i<elements.length;i++){var valueElements=elements[i].querySelectorAll("[data-bind]");bindValues(valueElements);var classElements=elements[i].querySelectorAll("[data-class]");bindClasses(classElements);var clickElements=elements[i].querySelectorAll("[data-click]");bindClicks(clickElements);var enterElements=scopeElement.querySelectorAll("[data-enter]");bindEnters(enterElements)}};var bindClasses=function(elements){for(var i=0;i<elements.length;i++){bindClass(elements[i])}};var bindClass=function(element){var attrValue=element.getAttribute("data-class");var oldValue=currentValue[attrValue];if(oldValue){element.classList.remove(oldValue)}var newClass=model.get(attrValue);currentValue[attrValue]=newClass;if(newClass){element.classList.add(newClass)}};function excludeNested(all,nested){var arr=[].slice.call(all);for(var i=0;i<arr.length;i++){for(var j=0;j<nested.length;j++){if(arr[i]===nested[j]){arr.splice(i,1)}}}return arr}var bind=function(){var foreachElements=scopeElement.querySelectorAll("[data-foreach]");var nestedForeachElements=scopeElement.querySelectorAll("[data-foreach] [data-foreach]");var outerForeachElements=excludeNested(foreachElements,nestedForeachElements);captureForeach(outerForeachElements);bindForeach(outerForeachElements);var valueElements=scopeElement.querySelectorAll("[data-bind]");bindValues(valueElements);var classElements=scopeElement.querySelectorAll("[data-class]");bindClasses(classElements);var clickElements=scopeElement.querySelectorAll("[data-click]");bindClicks(clickElements);var enterElements=scopeElement.querySelectorAll("[data-enter]");bindEnters(enterElements)};var bindEnters=function(elements){for(var i=0;i<elements.length;i++){bindEnter(elements[i])}};var bindEnter=function(element){var expression=element.getAttribute("data-enter");element.onkeydown=function(event){if(event.which===13){model.invoke(expression)}}};var bindClicks=function(elements){for(var i=0;i<elements.length;i++){bindClick(elements[i])}};var captureForeach=function(elements){for(var i=0;i<elements.length;i++){var templateChildren=[];for(var j=0;j<elements[i].children.length;j++){templateChildren.push(elements[i].children[j].cloneNode(true))}var forIn=elements[i].getAttribute("data-foreach");var pieces=forIn.split(" in ");foreach[forIn]={template:templateChildren,items:pieces[1].trim(),item:pieces[0].trim()}}};var bindForeach=function(elements){for(var i=0;i<elements.length;i++){clearChildren(elements[i]);var forIn=elements[i].getAttribute("data-foreach");var foreachTemplate=foreach[forIn];var value=model.get(foreachTemplate.items);for(var j=0;j<value.length();j++){for(var k=0;k<foreachTemplate.template.length;k++){var clone=foreachTemplate.template[k].cloneNode(true);elements[i].appendChild(clone);convertBinding(clone,"data-bind",foreachTemplate,j);convertBinding(clone,"data-class",foreachTemplate,j);convertBinding(clone,"data-click",foreachTemplate,j);convertBinding(clone,"data-foreach",foreachTemplate,j)}}}};var clearChildren=function(element){while(element.lastChild){element.removeChild(element.lastChild)}};var convertBinding=function(element,attribute,template,index){var replace=function(match){return match.replace(template.item,template.items+"["+index+"]")};if(element.hasAttribute(attribute)){var oldAttribute=element.getAttribute(attribute);var newAttribute=oldAttribute.replace(new RegExp("^"+template.item+"(?=[.]|$)"),template.items+"["+index+"]").replace(new RegExp("[(,] *"+template.item+" *(?=[,)])","g"),replace).replace(new RegExp(" in "+template.item+"$")," in "+template.items+"["+index+"]");element.setAttribute(attribute,newAttribute);if(attribute==="data-foreach"){captureForeach([element]);bindForeach([element])}}for(var i=0;i<element.children.length;i++){convertBinding(element.children[i],attribute,template,index)}};var bindClick=function(element){var expression=element.getAttribute("data-click");element.onclick=function(){model.invoke(expression)}};var bindValues=function(elements){for(var i=0;i<elements.length;i++){bindValue(elements[i])}};var bindValue=function(element){var name=element.getAttribute("data-bind");var modelValue=model.get(name);if(modelValue===undefined){model.attr(name,"")}else if(element.type==="checkbox"){element.checked=modelValue;element.onclick=function(){model.attr(name,element.checked)}}else if(element.type==="radio"){element.checked=modelValue===element.value;element.onclick=function(){model.attr(name,element.value)}}else if(element.tagName.toLowerCase()==="select"){element.value=modelValue;element.onchange=function(){model.attr(name,element.value)}}else if(element.type==="text"||element.type==="textarea"){if(element.value!==modelValue){element.value=modelValue}element.oninput=function(){model.attr(name,element.value)}}else{element.innerHTML=modelValue}};return{bind:bind}};return dataBind}(DataBind||{});var DataBind=function(dataBind){"use strict";dataBind.Model=function(scope){var attrs={};var dependsOn={};var valueChangedListeners=[];var parser=new DataBind.Parser(fireValueChangedForAllDependencies,doLookup,updateValue);function doLookup(name){return attrs[name]}function updateValue(name,value){attrs[name]=value}var attr=function(name,value){parser.attr(name,value)};var get=function(expr){return parser.get(expr)};function fireValueChangedForAllDependencies(name){valueChangedListeners.forEach(function(listener){listener(name)});if(dependsOn.hasOwnProperty(name)){dependsOn[name].forEach(function(dependency){fireValueChangedForAllDependencies(dependency)})}}var computed=function(name,func,explicitDependencies){if(explicitDependencies){explicitDependencies.forEach(function(dependency){addDependency(name,dependency)})}var regEx=/this\.get\(['"]([^'"]+)['"]\)/g;var match=regEx.exec(func.toString());while(match!=null){addDependency(name,match[1]);match=regEx.exec(func.toString())}attrs[name]=func};var action=function(name,func){attrs[name]=func};var addDependency=function(name,dependency){dependsOn[dependency]=dependsOn[dependency]||[];dependsOn[dependency].push(name)};var addValueChangedListener=function(callback){valueChangedListeners.push(callback)};return{attr:attr,get:get,computed:computed,action:action,scope:scope,addValueChangedListener:addValueChangedListener,invoke:function(actionExpr){get(actionExpr)}}};return dataBind}(DataBind||{});var DataBind=function(dataBind){"use strict";dataBind.Collection=function(name,arr,valueChangedCallback){var push=function(value){arr.push(value);valueChangedCallback(name)};var pop=function(){arr.pop();valueChangedCallback(name)};var forEach=function(callback){arr.forEach(function(item){callback(item)});valueChangedCallback(name)};var remove=function(item){var index=arr.indexOf(item);if(index>=0){arr.splice(index,1);valueChangedCallback(name);return true}return false};var clear=function(){arr.length=0;valueChangedCallback(name)};return{push:push,pop:pop,remove:remove,value:arr,length:function(){return arr.length},forEach:forEach,clear:clear}};return dataBind}(DataBind||{});var DataBind=function(dataBind){"use strict";dataBind.Parser=function(fireValueChangedForAllDependencies,lookupFunc,updateValueFunc){var checkWrapArray=function(name,object){return Array.isArray(object)?new DataBind.Collection(name,object,fireValueChangedForAllDependencies):object};var getFunctionArgs=function(lexer){var args=[];if(lexer.currentToken().token==="LPAREN"){lexer.consume();var argList="";while(lexer.currentToken().token!=="RPAREN"){argList+=lexer.currentToken().text;lexer.consume()}if(argList){argList.split(",").forEach(function(argText){args.push(get(argText))})}}return args};var parseFunction=function(lexer){var functionName=lexer.currentToken().text;lexer.consume();var args=getFunctionArgs(lexer);return lookupFunc(functionName).apply(this,args)};var parseProperty=function(lexer,id,object){lexer.consume("ID");if(object){return object[lookupFunc(id)[lexer.currentToken().text]]}return lookupFunc(id)[lexer.currentToken().text]};var parseId=function(lexer,object){var id=lexer.currentToken().text;lexer.consume();if(lexer.currentToken().token==="DOT"){return parseProperty(lexer,id,object)}else if(lexer.currentToken().token==="LBRACK"){lexer.consume();var index=get(lexer.currentToken().text);return lookupFunc(id)[index]}else{return checkWrapArray(id,lookupFunc(id))}};var get=function(name){var lexer=new DataBind.Lexer(name);var object=null;do{if(lexer.currentToken().token==="NUMBER"){return parseInt(lexer.currentToken().text)}if(lexer.currentToken().token==="LITERAL"){return lexer.currentToken().text.slice(1,-1)}if(lexer.currentToken().token==="ID"){if(typeof lookupFunc(lexer.currentToken().text)==="function"){object=parseFunction.call(this,lexer)}else{object=parseId(lexer,object)}}if(lexer.currentToken().token==="DOT"){lexer.consume("ID");object=object[lexer.currentToken().text]}else if(lexer.currentToken().token==="LBRACK"){lexer.consume();object=object[get(lexer.currentToken().text)]}lexer.consume()}while(lexer.hasNextToken());return checkWrapArray(name,object)};var attr=function(name,value){var changedCollections=[];var object=null;var lexer=new DataBind.Lexer(name);do{var id;if(lexer.currentToken().token==="ID"){id=lexer.currentToken().text;if(!object)object=lookupFunc(id);if(object===undefined){object={};updateValueFunc(id,object)}if(!lexer.hasNextToken()){updateValueFunc(id,value);fireValueChangedForAllDependencies(id)}lexer.consume()}if(lexer.currentToken().token==="LBRACK"){changedCollections.push(id);lexer.consume();var index=get(lexer.currentToken().text);lexer.consume("RBRACK");if(lexer.hasNextToken()){object=object[index]}else{object[index]=value;fireValueChangedForAllDependencies(name);fireValueChangedForAll(changedCollections)}}else if(lexer.currentToken().token==="DOT"){lexer.consume("ID");if(lexer.hasNextToken()){object[lexer.currentToken().text]=object[lexer.currentToken().text]||{};object=object[lexer.currentToken().text]}else{object[lexer.currentToken().text]=value;fireValueChangedForAllDependencies(name);fireValueChangedForAll(changedCollections)}}lexer.consume()}while(lexer.hasNextToken())};var fireValueChangedForAll=function(items){items.forEach(function(item){fireValueChangedForAllDependencies(item)})};return{get:get,attr:attr}};return dataBind}(DataBind||{});var DataBind=function(dataBind){"use strict";dataBind.Lexer=function(expr){var rules={root:[[/\[/,"LBRACK"],[/\]/,"RBRACK"],[/[(]/,"LPAREN"],[/[)]/,"RPAREN"],[/,/,"COMMA"],[/['][^']*[']/,"LITERAL"],[/["][^"]*["]/,"LITERAL"],[/[a-zA-Z][a-zA-Z0-9]*/,"ID"],[/[0-9]+/,"NUMBER"],[/[.]/,"DOT"],[/\s+/,TokenJS.Ignore]]};var lexer=new TokenJS.Lexer(expr,rules,false);var tokens=lexer.tokenize();var i=0;var hasNextToken=function(){return i<tokens.length-1};var currentToken=function(){if(i<tokens.length)return tokens[i];else return TokenJS.EndOfStream};var consume=function(expected){i++;if(expected&&currentToken().token!==expected)throw{toString:function(){return"Syntax error: Expected token: "+expected+", actual: "+currentToken().token}}};return{currentToken:currentToken,consume:consume,hasNextToken:hasNextToken}};return dataBind}(DataBind||{});var TokenJS=TokenJS||{};TokenJS.Ignore={toString:function(){return"Ignored rule"}};TokenJS.EndOfStream={toString:function(){return"End of token stream"}};TokenJS.SyntaxError=function(message){this.name="SyntaxError";this.message=message};TokenJS.StateError=function(message){this.name="StateError";this.message=message};TokenJS.Lexer=function(input,rules,ignoreUnrecognized){var _rules=rules;var _currentState;var _input=input;var _index=0;var _ignoreUnrecognized=ignoreUnrecognized;var state=function(newState){if(!_rules.hasOwnProperty(newState)){throw new TokenJS.StateError("Missing state: '"+newState+"'.")}_currentState=newState};state("root");var getNextToken=function(){if(_index>=_input.length){return TokenJS.EndOfStream}var oldState=_currentState;var allMatches=getAllMatches();for(var i=0;i<allMatches.length;i++){var bestMatch=allMatches[i];if(typeof bestMatch.value==="function"){var returnValue=bestMatch.value.call(callbackContext,bestMatch.matchText);if(returnValue===TokenJS.Ignore){consume(bestMatch.matchText);return getNextToken()}else if(hasValue(returnValue)){consume(bestMatch.matchText);return{text:bestMatch.matchText,token:returnValue,index:bestMatch.index}}else if(changedStateWithoutReturningToken(oldState)){throwSyntaxError()}}else{consume(bestMatch.matchText);if(bestMatch.value===TokenJS.Ignore){return getNextToken()}else{return{text:bestMatch.matchText,token:bestMatch.value,index:bestMatch.index}}}}if(_ignoreUnrecognized){_index+=1;return getNextToken()}else{throwSyntaxError()}};var getAllMatches=function(){var allMatches=[];var currentRules=_rules[_currentState];for(var i=0;i<currentRules.length;i++){var regex=currentRules[i][0];var match=regex.exec(_input.substring(_index));if(match&&match.index===0){allMatches.push({matchText:match[0],value:currentRules[i][1],index:_index})}}sortByLongestMatchDescending(allMatches);return allMatches};var sortByLongestMatchDescending=function(allMatches){allMatches.sort(function(a,b){if(a.matchText.length<b.matchText.length){return 1}else if(a.matchText.length>b.matchText.length){return-1}return 0})};var changedStateWithoutReturningToken=function(oldState){return _currentState!==oldState};var throwSyntaxError=function(){throw new TokenJS.SyntaxError("Invalid character '"+_input[_index]+"' at index "+(_index+1))};var consume=function(match){_index+=match.length};var reset=function(){_index=0;_currentState="root"};var tokenize=function(){reset();var allTokens=[];var token=getNextToken();while(token!==TokenJS.EndOfStream){allTokens.push(token);token=getNextToken()}return allTokens};var hasValue=function(variable){return typeof variable!=="undefined"&&variable!==null};var callbackContext={state:state};return{getNextToken:getNextToken,tokenize:tokenize,state:state,reset:reset}};module.exports=DataBind;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

(function(){var exports;if(!Array.prototype.forEach){Array.prototype.forEach=function(func,option){var i;if(typeof func!=="function"){throw new TypeError}for(i=0;i<this.length;i++){func.call(option,this[i],i,this)}}}exports=this;exports.is=function(){var av,dateP,each,extend,isClass,methods,object,proto,stringP,ua;object=Object;proto=object.prototype;ua=window.navigator&&navigator.userAgent||"";av=window.navigator&&navigator.appVersion||"";dateP=Date.prototype;stringP=String.prototype;isClass=function(obj,klass){return proto.toString.call(obj)==="[object "+klass+"]"};extend=function(target,source){return Array.prototype.slice.call(arguments,1).forEach(function(source){var key;for(key in source){target[key]=source[key]}return target})};each=function(elements,callback){var element,key,_i,_len;if(typeof elements==="array"){for(_i=0,_len=elements.length;_i<_len;_i++){element=elements[_i];if(!callback.call(element,_i,element)){return elements}}}else{for(key in elements){if(!callback.call(elements[key],key,elements[key])){return elements}}}return elements};methods={};each(["Object","Array","Boolean","Date","Function","Number","String","RegExp"],function(i,type){return methods["is"+type]=function(){return isClass(this,type)}});extend(methods,{isInteger:function(){return this%1===0},isFloat:function(){return!this.isInteger()},isOdd:function(){return!this.isEven()},isEven:function(){return this.isMultipleOf(2)},isMultipleOf:function(multiple){return this%multiple===0},isNaN:function(){return!this.isNumber()},isEmpty:function(){if(this===null||typeof this!=="object"){return!(this&&this.length>0)}return object.keys(this).length===0},isSameType:function(obj){return proto.toString.call(this)===proto.toString.call(obj)},isOwnProperty:function(prop){return proto.hasOwnProperty.call(this,prop)},isType:function(type){return isClass(this,type)},isBlank:function(){return this.trim().length===0}});extend(dateP,{isPast:function(d){if(d==null){d=this}return this.getTime()<d.getTime()},isFuture:function(d){if(d==null){d=this}return this.getTime()>d.getTime()},isWeekday:function(){return this.getUTCDay()>0&&this.getUTCDay()<6},isWeekend:function(){return this.getUTCDay()===0||this.getUTCDay()===6},isBefore:function(d){if(d==null){d=this}return this.isPast(d)},isAfter:function(d){if(d==null){d=this}return this.isFuture(d)},isLeapYear:function(){var year;year=this.getFullYear();return year%4===0&&year%100!==0||year%400===0},isValid:function(){return!this.getTime().isNaN()}});extend(stringP,{isCC:function(type){var regex;if(type==null){type="any"}regex=function(){switch(type){case"any":return/^[0-9]{15,16}$/;case"ae"||false:return/^(34)|(37)\d{14}$/;case"Discover":return/^6011\d{12}$/;case"mc"||false:return/^5[1-5]\d{14}$/;case"Visa":return/^4\d{15}$/}}();return regex.test(this)},isCreditCard:function(type){if(type==null){type="any"}return this.isCC(type)},isEmail:function(){return/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(this)},isLatLng:function(){return/-?\d{1,3}\.\d+/.test(this)},isLatLong:function(){return this.isLatLng()},isPhone:function(country){var regex;if(country==null){country="us"}regex=function(){switch(country){case"ar":return/^(?:\+|[0]{2})?(54)?(:?[\s-])*\d{4}(:?[\s-])*\d{4}$/;case"au":return/^(?:\+|0)?(?:61)?\s?[2-478](?:[ -]?[0-9]){8}$/;case"ca":return/^(1-?)?(([2-9]\d{2})|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/;case"fr":return/^(?:0|\(?\+33\)?\s?|0033\s?)[1-79](?:[\.\-\s]?\d\d){4}$/;case"is":return/^(?:\+|[0]{2})?(354)?(:?[\s-])*\d{3}(:?[\s-])*\d{4}$/;case"uk":return/^(?:\+|044)?(?:\s+)?\(?(\d{1,5}|\d{4}\s*\d{1,2})\)?\s+|-(\d{1,4}(\s+|-)?\d{1,4}|(\d{6}))\d{6}$/;case"us":return/^(1-?)?(\d{3})(:?[\s\-])*(\d{3})(:?[\s\-])*(\d{4})$/}}();return regex.test(this)},isZip:function(country){var regex;if(country==null){country="us"}regex=function(){switch(country){case"ar":return/^\d{4}$/;case"au":return/^\d{4}$/;case"at":return/^\d{4}$/;case"be":return/^\d{4}$/;case"br":return/^\d{5}[\-]?\d{3}$/;case"ca":return/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;case"dk":return/^\d{3,4}$/;case"de":return/^\d{5}$/;case"es":return/^((0[1-9]|5[0-2])|[1-4]\d)\d{3}$/;case"gb":return/^[A-Za-z]{1,2}[0-9Rr][0-9A-Za-z]? \d[ABD-HJLNP-UW-Zabd-hjlnp-uw-z]{2}$/;case"hu":return/^\d{4}$/;case"is":return/^\d{3}$/;case"it":return/^\d{5}$/;case"jp":return/^\d{3}-\d{4}$/;case"nl":return/^\d{4}$/;case"pl":return/^\d{2}\-\d{3}$/;case"se":return/^\d{3}\s?\d{2}$/;case"us":return/^(\d{5}([\-]\d{4})?)$/}}();return regex.test(this)}});extend(proto,methods);return{ie:function(){return/msie/i.test(ua)},ie6:function(){return/msie 6/i.test(ua)},ie7:function(){return/msie 7/i.test(ua)},ie8:function(){return/msie 8/i.test(ua)},ie9:function(){return/msie 9/i.test(ua)},ie10:function(){return/msie 10/i.test(ua)},ie11:function(){return/Trident.*rv[ :]*11\./.test(ua)},firefox:function(){return/firefox/i.test(ua)},gecko:function(){return/gecko/i.test(ua)},opera:function(){return/opera/i.test(ua)},safari:function(){return/webkit\W(?!.*chrome).*safari\W/i.test(ua)},chrome:function(){return/webkit\W.*(chrome|chromium)\W/i.test(ua)},webkit:function(){return/webkit\W/i.test(ua)},mobile:function(){return/iphone|ipod|(android.*?mobile)|blackberry|nokia/i.test(ua)},tablet:function(){return/ipad|android(?!.*mobile)/i.test(ua)},desktop:function(){return!this.mobile()&&!this.tablet()},kindle:function(){return/kindle|silk/i.test(ua)},tv:function(){return/googletv|sonydtv|appletv|roku|smarttv/i.test(ua)},online:function(){return navigator.onLine},offline:function(){return!this.online()},windows:function(){return/win/i.test(av)},mac:function(){return/mac/i.test(av)},unix:function(){return/x11/i.test(av)},linux:function(){return/linux/i.test(av)}}}()}).call(this);

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
(function(factory){if(true){module.exports=factory()}else {}})(function(){var WatchJS={noMore:false,useDirtyCheck:false},lengthsubjects=[];var dirtyChecklist=[];var pendingChanges=[];var supportDefineProperty=false;try{supportDefineProperty=Object.defineProperty&&Object.defineProperty({},"x",{})}catch(ex){}var isFunction=function(functionToCheck){var getType={};return functionToCheck&&getType.toString.call(functionToCheck)=="[object Function]"};var isInt=function(x){return x%1===0};var isArray=function(obj){return Object.prototype.toString.call(obj)==="[object Array]"};var isObject=function(obj){return{}.toString.apply(obj)==="[object Object]"};var getObjDiff=function(a,b){var aplus=[],bplus=[];if(!(typeof a=="string")&&!(typeof b=="string")){if(isArray(a)&&b){for(var i=0;i<a.length;i++){if(b[i]===undefined)aplus.push(i)}}else{for(var i in a){if(a.hasOwnProperty(i)){if(b&&b[i]===undefined){aplus.push(i)}}}}if(isArray(b)&&a){for(var j=0;j<b.length;j++){if(a[j]===undefined)bplus.push(j)}}else{for(var j in b){if(b.hasOwnProperty(j)){if(a&&a[j]===undefined){bplus.push(j)}}}}}return{added:aplus,removed:bplus}};var clone=function(obj){if(null==obj||"object"!=typeof obj){return obj}var copy=obj.constructor();for(var attr in obj){copy[attr]=obj[attr]}return copy};var defineGetAndSet=function(obj,propName,getter,setter){try{Object.observe(obj,function(changes){changes.forEach(function(change){if(change.name===propName){setter(change.object[change.name])}})})}catch(e){try{Object.defineProperty(obj,propName,{get:getter,set:function(value){setter.call(this,value,true)},enumerable:true,configurable:true})}catch(e2){try{Object.prototype.__defineGetter__.call(obj,propName,getter);Object.prototype.__defineSetter__.call(obj,propName,function(value){setter.call(this,value,true)})}catch(e3){observeDirtyChanges(obj,propName,setter)}}}};var defineProp=function(obj,propName,value){try{Object.defineProperty(obj,propName,{enumerable:false,configurable:true,writable:false,value:value})}catch(error){obj[propName]=value}};var observeDirtyChanges=function(obj,propName,setter){dirtyChecklist[dirtyChecklist.length]={prop:propName,object:obj,orig:clone(obj[propName]),callback:setter}};var watch=function(){if(isFunction(arguments[1])){watchAll.apply(this,arguments)}else if(isArray(arguments[1])){watchMany.apply(this,arguments)}else{watchOne.apply(this,arguments)}};var watchAll=function(obj,watcher,level,addNRemove){if(typeof obj=="string"||!(obj instanceof Object)&&!isArray(obj)){return}if(isArray(obj)){defineWatcher(obj,"__watchall__",watcher,level);if(level===undefined||level>0){for(var prop=0;prop<obj.length;prop++){watchAll(obj[prop],watcher,level,addNRemove)}}}else{var prop,props=[];for(prop in obj){if(prop=="$val"||!supportDefineProperty&&prop==="watchers"){continue}if(Object.prototype.hasOwnProperty.call(obj,prop)){props.push(prop)}}watchMany(obj,props,watcher,level,addNRemove)}if(addNRemove){pushToLengthSubjects(obj,"$$watchlengthsubjectroot",watcher,level)}};var watchMany=function(obj,props,watcher,level,addNRemove){if(typeof obj=="string"||!(obj instanceof Object)&&!isArray(obj)){return}for(var i=0;i<props.length;i++){var prop=props[i];watchOne(obj,prop,watcher,level,addNRemove)}};var watchOne=function(obj,prop,watcher,level,addNRemove){if(typeof obj=="string"||!(obj instanceof Object)&&!isArray(obj)){return}if(isFunction(obj[prop])){return}if(obj[prop]!=null&&(level===undefined||level>0)){watchAll(obj[prop],watcher,level!==undefined?level-1:level)}defineWatcher(obj,prop,watcher,level);if(addNRemove&&(level===undefined||level>0)){pushToLengthSubjects(obj,prop,watcher,level)}};var unwatch=function(){if(isFunction(arguments[1])){unwatchAll.apply(this,arguments)}else if(isArray(arguments[1])){unwatchMany.apply(this,arguments)}else{unwatchOne.apply(this,arguments)}};var unwatchAll=function(obj,watcher){if(obj instanceof String||!(obj instanceof Object)&&!isArray(obj)){return}if(isArray(obj)){var props=["__watchall__"];for(var prop=0;prop<obj.length;prop++){props.push(prop)}unwatchMany(obj,props,watcher)}else{var unwatchPropsInObject=function(obj2){var props=[];for(var prop2 in obj2){if(obj2.hasOwnProperty(prop2)){if(obj2[prop2]instanceof Object){unwatchPropsInObject(obj2[prop2])}else{props.push(prop2)}}}unwatchMany(obj2,props,watcher)};unwatchPropsInObject(obj)}};var unwatchMany=function(obj,props,watcher){for(var prop2 in props){if(props.hasOwnProperty(prop2)){unwatchOne(obj,props[prop2],watcher)}}};var timeouts=[],timerID=null;function clearTimerID(){timerID=null;for(var i=0;i<timeouts.length;i++){timeouts[i]()}timeouts.length=0}var getTimerID=function(){if(!timerID){timerID=setTimeout(clearTimerID)}return timerID};var registerTimeout=function(fn){if(timerID==null)getTimerID();timeouts[timeouts.length]=fn};var trackChange=function(){var fn=isFunction(arguments[2])?trackProperty:trackObject;fn.apply(this,arguments)};var trackObject=function(obj,callback,recursive,addNRemove){var change=null,lastTimerID=-1;var isArr=isArray(obj);var level,fn=function(prop,action,newValue,oldValue){var timerID=getTimerID();if(lastTimerID!==timerID){lastTimerID=timerID;change={type:"update"};change["value"]=obj;change["splices"]=null;registerTimeout(function(){callback.call(this,change);change=null})}if(isArr&&obj===this&&change!==null){if(action==="pop"||action==="shift"){newValue=[];oldValue=[oldValue]}else if(action==="push"||action==="unshift"){newValue=[newValue];oldValue=[]}else if(action!=="splice"){return}if(!change.splices)change.splices=[];change.splices[change.splices.length]={index:prop,deleteCount:oldValue?oldValue.length:0,addedCount:newValue?newValue.length:0,added:newValue,deleted:oldValue}}};level=recursive==true?undefined:0;watchAll(obj,fn,level,addNRemove)};var trackProperty=function(obj,prop,callback,recursive,addNRemove){if(obj&&prop){watchOne(obj,prop,function(prop,action,newvalue,oldvalue){var change={type:"update"};change["value"]=newvalue;change["oldvalue"]=oldvalue;if(recursive&&isObject(newvalue)||isArray(newvalue)){trackObject(newvalue,callback,recursive,addNRemove)}callback.call(this,change)},0);if(recursive&&isObject(obj[prop])||isArray(obj[prop])){trackObject(obj[prop],callback,recursive,addNRemove)}}};var defineWatcher=function(obj,prop,watcher,level){var newWatcher=false;var isArr=isArray(obj);if(!obj.watchers){defineProp(obj,"watchers",{});if(isArr){watchFunctions(obj,function(index,action,newValue,oldValue){addPendingChange(obj,index,action,newValue,oldValue);if(level!==0&&newValue&&(isObject(newValue)||isArray(newValue))){var i,n,ln,wAll,watchList=obj.watchers[prop];if(wAll=obj.watchers["__watchall__"]){watchList=watchList?watchList.concat(wAll):wAll}ln=watchList?watchList.length:0;for(i=0;i<ln;i++){if(action!=="splice"){watchAll(newValue,watchList[i],level===undefined?level:level-1)}else{for(n=0;n<newValue.length;n++){watchAll(newValue[n],watchList[i],level===undefined?level:level-1)}}}}})}}if(!obj.watchers[prop]){obj.watchers[prop]=[];if(!isArr)newWatcher=true}for(var i=0;i<obj.watchers[prop].length;i++){if(obj.watchers[prop][i]===watcher){return}}obj.watchers[prop].push(watcher);if(newWatcher){var val=obj[prop];var getter=function(){return val};var setter=function(newval,delayWatcher){var oldval=val;val=newval;if(level!==0&&obj[prop]&&(isObject(obj[prop])||isArray(obj[prop]))&&!obj[prop].watchers){var i,ln=obj.watchers[prop].length;for(i=0;i<ln;i++){watchAll(obj[prop],obj.watchers[prop][i],level===undefined?level:level-1)}}if(isSuspended(obj,prop)){resume(obj,prop);return}if(!WatchJS.noMore){if(oldval!==newval){if(!delayWatcher){callWatchers(obj,prop,"set",newval,oldval)}else{addPendingChange(obj,prop,"set",newval,oldval)}WatchJS.noMore=false}}};if(WatchJS.useDirtyCheck){observeDirtyChanges(obj,prop,setter)}else{defineGetAndSet(obj,prop,getter,setter)}}};var callWatchers=function(obj,prop,action,newval,oldval){if(prop!==undefined){var ln,wl,watchList=obj.watchers[prop];if(wl=obj.watchers["__watchall__"]){watchList=watchList?watchList.concat(wl):wl}ln=watchList?watchList.length:0;for(var wr=0;wr<ln;wr++){watchList[wr].call(obj,prop,action,newval,oldval)}}else{for(var prop in obj){if(obj.hasOwnProperty(prop)){callWatchers(obj,prop,action,newval,oldval)}}}};var methodNames=["pop","push","reverse","shift","sort","slice","unshift","splice"];var defineArrayMethodWatcher=function(obj,original,methodName,callback){defineProp(obj,methodName,function(){var index=0;var i,newValue,oldValue,response;if(methodName==="splice"){var start=arguments[0];var end=start+arguments[1];oldValue=obj.slice(start,end);newValue=[];for(i=2;i<arguments.length;i++){newValue[i-2]=arguments[i]}index=start}else{newValue=arguments.length>0?arguments[0]:undefined}response=original.apply(obj,arguments);if(methodName!=="slice"){if(methodName==="pop"){oldValue=response;index=obj.length}else if(methodName==="push"){index=obj.length-1}else if(methodName==="shift"){oldValue=response}else if(methodName!=="unshift"&&newValue===undefined){newValue=response}callback.call(obj,index,methodName,newValue,oldValue)}return response})};var watchFunctions=function(obj,callback){if(!isFunction(callback)||!obj||obj instanceof String||!isArray(obj)){return}for(var i=methodNames.length,methodName;i--;){methodName=methodNames[i];defineArrayMethodWatcher(obj,obj[methodName],methodName,callback)}};var unwatchOne=function(obj,prop,watcher){if(prop){if(obj.watchers[prop]){if(watcher===undefined){delete obj.watchers[prop]}else{for(var i=0;i<obj.watchers[prop].length;i++){var w=obj.watchers[prop][i];if(w==watcher){obj.watchers[prop].splice(i,1)}}}}}else{delete obj.watchers}removeFromLengthSubjects(obj,prop,watcher);removeFromDirtyChecklist(obj,prop)};var suspend=function(obj,prop){if(obj.watchers){var name="__wjs_suspend__"+(prop!==undefined?prop:"");obj.watchers[name]=true}};var isSuspended=function(obj,prop){return obj.watchers&&(obj.watchers["__wjs_suspend__"]||obj.watchers["__wjs_suspend__"+prop])};var resume=function(obj,prop){registerTimeout(function(){delete obj.watchers["__wjs_suspend__"];delete obj.watchers["__wjs_suspend__"+prop]})};var pendingTimerID=null;var addPendingChange=function(obj,prop,mode,newval,oldval){pendingChanges[pendingChanges.length]={obj:obj,prop:prop,mode:mode,newval:newval,oldval:oldval};if(pendingTimerID===null){pendingTimerID=setTimeout(applyPendingChanges)}};var applyPendingChanges=function(){var change=null;pendingTimerID=null;for(var i=0;i<pendingChanges.length;i++){change=pendingChanges[i];callWatchers(change.obj,change.prop,change.mode,change.newval,change.oldval)}if(change){pendingChanges=[];change=null}};var loop=function(){for(var i=0;i<lengthsubjects.length;i++){var subj=lengthsubjects[i];if(subj.prop==="$$watchlengthsubjectroot"){var difference=getObjDiff(subj.obj,subj.actual);if(difference.added.length||difference.removed.length){if(difference.added.length){watchMany(subj.obj,difference.added,subj.watcher,subj.level-1,true)}subj.watcher.call(subj.obj,"root","differentattr",difference,subj.actual)}subj.actual=clone(subj.obj)}else{var difference=getObjDiff(subj.obj[subj.prop],subj.actual);if(difference.added.length||difference.removed.length){if(difference.added.length){for(var j=0;j<subj.obj.watchers[subj.prop].length;j++){watchMany(subj.obj[subj.prop],difference.added,subj.obj.watchers[subj.prop][j],subj.level-1,true)}}callWatchers(subj.obj,subj.prop,"differentattr",difference,subj.actual)}subj.actual=clone(subj.obj[subj.prop])}}var n,value;if(dirtyChecklist.length>0){for(var i=0;i<dirtyChecklist.length;i++){n=dirtyChecklist[i];value=n.object[n.prop];if(!compareValues(n.orig,value)){n.orig=clone(value);n.callback(value)}}}};var compareValues=function(a,b){var i,state=true;if(a!==b){if(isObject(a)){for(i in a){if(!supportDefineProperty&&i==="watchers")continue;if(a[i]!==b[i]){state=false;break}}}else{state=false}}return state};var pushToLengthSubjects=function(obj,prop,watcher,level){var actual;if(prop==="$$watchlengthsubjectroot"){actual=clone(obj)}else{actual=clone(obj[prop])}lengthsubjects.push({obj:obj,prop:prop,actual:actual,watcher:watcher,level:level})};var removeFromLengthSubjects=function(obj,prop,watcher){for(var i=0;i<lengthsubjects.length;i++){var subj=lengthsubjects[i];if(subj.obj==obj){if(!prop||subj.prop==prop){if(!watcher||subj.watcher==watcher){lengthsubjects.splice(i--,1)}}}}};var removeFromDirtyChecklist=function(obj,prop){var notInUse;for(var i=0;i<dirtyChecklist.length;i++){var n=dirtyChecklist[i];var watchers=n.object.watchers;notInUse=n.object==obj&&(!prop||n.prop==prop)&&watchers&&(!prop||!watchers[prop]||watchers[prop].length==0);if(notInUse){dirtyChecklist.splice(i--,1)}}};setInterval(loop,50);WatchJS.watch=watch;WatchJS.unwatch=unwatch;WatchJS.callWatchers=callWatchers;WatchJS.suspend=suspend;WatchJS.onChange=trackChange;return WatchJS});

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map