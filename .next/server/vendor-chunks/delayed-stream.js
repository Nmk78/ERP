/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/delayed-stream";
exports.ids = ["vendor-chunks/delayed-stream"];
exports.modules = {

/***/ "(ssr)/./node_modules/delayed-stream/lib/delayed_stream.js":
/*!***********************************************************!*\
  !*** ./node_modules/delayed-stream/lib/delayed_stream.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var Stream = (__webpack_require__(/*! stream */ \"stream\").Stream);\nvar util = __webpack_require__(/*! util */ \"util\");\n\nmodule.exports = DelayedStream;\nfunction DelayedStream() {\n  this.source = null;\n  this.dataSize = 0;\n  this.maxDataSize = 1024 * 1024;\n  this.pauseStream = true;\n\n  this._maxDataSizeExceeded = false;\n  this._released = false;\n  this._bufferedEvents = [];\n}\nutil.inherits(DelayedStream, Stream);\n\nDelayedStream.create = function(source, options) {\n  var delayedStream = new this();\n\n  options = options || {};\n  for (var option in options) {\n    delayedStream[option] = options[option];\n  }\n\n  delayedStream.source = source;\n\n  var realEmit = source.emit;\n  source.emit = function() {\n    delayedStream._handleEmit(arguments);\n    return realEmit.apply(source, arguments);\n  };\n\n  source.on('error', function() {});\n  if (delayedStream.pauseStream) {\n    source.pause();\n  }\n\n  return delayedStream;\n};\n\nObject.defineProperty(DelayedStream.prototype, 'readable', {\n  configurable: true,\n  enumerable: true,\n  get: function() {\n    return this.source.readable;\n  }\n});\n\nDelayedStream.prototype.setEncoding = function() {\n  return this.source.setEncoding.apply(this.source, arguments);\n};\n\nDelayedStream.prototype.resume = function() {\n  if (!this._released) {\n    this.release();\n  }\n\n  this.source.resume();\n};\n\nDelayedStream.prototype.pause = function() {\n  this.source.pause();\n};\n\nDelayedStream.prototype.release = function() {\n  this._released = true;\n\n  this._bufferedEvents.forEach(function(args) {\n    this.emit.apply(this, args);\n  }.bind(this));\n  this._bufferedEvents = [];\n};\n\nDelayedStream.prototype.pipe = function() {\n  var r = Stream.prototype.pipe.apply(this, arguments);\n  this.resume();\n  return r;\n};\n\nDelayedStream.prototype._handleEmit = function(args) {\n  if (this._released) {\n    this.emit.apply(this, args);\n    return;\n  }\n\n  if (args[0] === 'data') {\n    this.dataSize += args[1].length;\n    this._checkIfMaxDataSizeExceeded();\n  }\n\n  this._bufferedEvents.push(args);\n};\n\nDelayedStream.prototype._checkIfMaxDataSizeExceeded = function() {\n  if (this._maxDataSizeExceeded) {\n    return;\n  }\n\n  if (this.dataSize <= this.maxDataSize) {\n    return;\n  }\n\n  this._maxDataSizeExceeded = true;\n  var message =\n    'DelayedStream#maxDataSize of ' + this.maxDataSize + ' bytes exceeded.'\n  this.emit('error', new Error(message));\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvZGVsYXllZC1zdHJlYW0vbGliL2RlbGF5ZWRfc3RyZWFtLmpzIiwibWFwcGluZ3MiOiJBQUFBLGFBQWEsb0RBQXdCO0FBQ3JDLFdBQVcsbUJBQU8sQ0FBQyxrQkFBTTs7QUFFekI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2VudGVycHJpc2UtcmVzb3VyY2UtbWFuYWdlbWVudC1zeXN0ZW0vLi9ub2RlX21vZHVsZXMvZGVsYXllZC1zdHJlYW0vbGliL2RlbGF5ZWRfc3RyZWFtLmpzP2U4ODIiXSwic291cmNlc0NvbnRlbnQiOlsidmFyIFN0cmVhbSA9IHJlcXVpcmUoJ3N0cmVhbScpLlN0cmVhbTtcbnZhciB1dGlsID0gcmVxdWlyZSgndXRpbCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IERlbGF5ZWRTdHJlYW07XG5mdW5jdGlvbiBEZWxheWVkU3RyZWFtKCkge1xuICB0aGlzLnNvdXJjZSA9IG51bGw7XG4gIHRoaXMuZGF0YVNpemUgPSAwO1xuICB0aGlzLm1heERhdGFTaXplID0gMTAyNCAqIDEwMjQ7XG4gIHRoaXMucGF1c2VTdHJlYW0gPSB0cnVlO1xuXG4gIHRoaXMuX21heERhdGFTaXplRXhjZWVkZWQgPSBmYWxzZTtcbiAgdGhpcy5fcmVsZWFzZWQgPSBmYWxzZTtcbiAgdGhpcy5fYnVmZmVyZWRFdmVudHMgPSBbXTtcbn1cbnV0aWwuaW5oZXJpdHMoRGVsYXllZFN0cmVhbSwgU3RyZWFtKTtcblxuRGVsYXllZFN0cmVhbS5jcmVhdGUgPSBmdW5jdGlvbihzb3VyY2UsIG9wdGlvbnMpIHtcbiAgdmFyIGRlbGF5ZWRTdHJlYW0gPSBuZXcgdGhpcygpO1xuXG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBmb3IgKHZhciBvcHRpb24gaW4gb3B0aW9ucykge1xuICAgIGRlbGF5ZWRTdHJlYW1bb3B0aW9uXSA9IG9wdGlvbnNbb3B0aW9uXTtcbiAgfVxuXG4gIGRlbGF5ZWRTdHJlYW0uc291cmNlID0gc291cmNlO1xuXG4gIHZhciByZWFsRW1pdCA9IHNvdXJjZS5lbWl0O1xuICBzb3VyY2UuZW1pdCA9IGZ1bmN0aW9uKCkge1xuICAgIGRlbGF5ZWRTdHJlYW0uX2hhbmRsZUVtaXQoYXJndW1lbnRzKTtcbiAgICByZXR1cm4gcmVhbEVtaXQuYXBwbHkoc291cmNlLCBhcmd1bWVudHMpO1xuICB9O1xuXG4gIHNvdXJjZS5vbignZXJyb3InLCBmdW5jdGlvbigpIHt9KTtcbiAgaWYgKGRlbGF5ZWRTdHJlYW0ucGF1c2VTdHJlYW0pIHtcbiAgICBzb3VyY2UucGF1c2UoKTtcbiAgfVxuXG4gIHJldHVybiBkZWxheWVkU3RyZWFtO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KERlbGF5ZWRTdHJlYW0ucHJvdG90eXBlLCAncmVhZGFibGUnLCB7XG4gIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgZ2V0OiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5zb3VyY2UucmVhZGFibGU7XG4gIH1cbn0pO1xuXG5EZWxheWVkU3RyZWFtLnByb3RvdHlwZS5zZXRFbmNvZGluZyA9IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5zb3VyY2Uuc2V0RW5jb2RpbmcuYXBwbHkodGhpcy5zb3VyY2UsIGFyZ3VtZW50cyk7XG59O1xuXG5EZWxheWVkU3RyZWFtLnByb3RvdHlwZS5yZXN1bWUgPSBmdW5jdGlvbigpIHtcbiAgaWYgKCF0aGlzLl9yZWxlYXNlZCkge1xuICAgIHRoaXMucmVsZWFzZSgpO1xuICB9XG5cbiAgdGhpcy5zb3VyY2UucmVzdW1lKCk7XG59O1xuXG5EZWxheWVkU3RyZWFtLnByb3RvdHlwZS5wYXVzZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLnNvdXJjZS5wYXVzZSgpO1xufTtcblxuRGVsYXllZFN0cmVhbS5wcm90b3R5cGUucmVsZWFzZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9yZWxlYXNlZCA9IHRydWU7XG5cbiAgdGhpcy5fYnVmZmVyZWRFdmVudHMuZm9yRWFjaChmdW5jdGlvbihhcmdzKSB7XG4gICAgdGhpcy5lbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9LmJpbmQodGhpcykpO1xuICB0aGlzLl9idWZmZXJlZEV2ZW50cyA9IFtdO1xufTtcblxuRGVsYXllZFN0cmVhbS5wcm90b3R5cGUucGlwZSA9IGZ1bmN0aW9uKCkge1xuICB2YXIgciA9IFN0cmVhbS5wcm90b3R5cGUucGlwZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB0aGlzLnJlc3VtZSgpO1xuICByZXR1cm4gcjtcbn07XG5cbkRlbGF5ZWRTdHJlYW0ucHJvdG90eXBlLl9oYW5kbGVFbWl0ID0gZnVuY3Rpb24oYXJncykge1xuICBpZiAodGhpcy5fcmVsZWFzZWQpIHtcbiAgICB0aGlzLmVtaXQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGFyZ3NbMF0gPT09ICdkYXRhJykge1xuICAgIHRoaXMuZGF0YVNpemUgKz0gYXJnc1sxXS5sZW5ndGg7XG4gICAgdGhpcy5fY2hlY2tJZk1heERhdGFTaXplRXhjZWVkZWQoKTtcbiAgfVxuXG4gIHRoaXMuX2J1ZmZlcmVkRXZlbnRzLnB1c2goYXJncyk7XG59O1xuXG5EZWxheWVkU3RyZWFtLnByb3RvdHlwZS5fY2hlY2tJZk1heERhdGFTaXplRXhjZWVkZWQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKHRoaXMuX21heERhdGFTaXplRXhjZWVkZWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAodGhpcy5kYXRhU2l6ZSA8PSB0aGlzLm1heERhdGFTaXplKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgdGhpcy5fbWF4RGF0YVNpemVFeGNlZWRlZCA9IHRydWU7XG4gIHZhciBtZXNzYWdlID1cbiAgICAnRGVsYXllZFN0cmVhbSNtYXhEYXRhU2l6ZSBvZiAnICsgdGhpcy5tYXhEYXRhU2l6ZSArICcgYnl0ZXMgZXhjZWVkZWQuJ1xuICB0aGlzLmVtaXQoJ2Vycm9yJywgbmV3IEVycm9yKG1lc3NhZ2UpKTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/delayed-stream/lib/delayed_stream.js\n");

/***/ })

};
;