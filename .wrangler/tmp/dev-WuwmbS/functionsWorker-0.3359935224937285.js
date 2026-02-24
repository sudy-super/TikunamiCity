var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// ../../.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// ../../.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd3) {
    this.fd = fd3;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd3) {
    this.fd = fd3;
  }
  clearLine(dir4, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x3, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env3) {
    return 1;
  }
  hasColors(count4, env3) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// ../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd3) {
    this.#cwd = cwd3;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// ../../.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// .wrangler/tmp/pages-u6lnzJ/functionsWorker-0.3359935224937285.mjs
import { Writable as Writable2 } from "node:stream";
import { EventEmitter as EventEmitter2 } from "node:events";
import resvgWasmModule from "./a7e702bc5ba9227243abda7977c8096f59478d3f-a7e702bc5ba9227243abda7977c8096f59478d3f-resvg.wasm";
import yogaWasmModule from "./a5d4d0ae9bf0a18b666f06b1864089d3fe4057cc-a5d4d0ae9bf0a18b666f06b1864089d3fe4057cc-yoga.wasm";
var __create = Object.create;
var __defProp2 = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var __esm = /* @__PURE__ */ __name((fn, res) => /* @__PURE__ */ __name(function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
}, "__init"), "__esm");
var __commonJS = /* @__PURE__ */ __name((cb, mod) => /* @__PURE__ */ __name(function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
}, "__require"), "__commonJS");
var __export = /* @__PURE__ */ __name((target, all) => {
  for (var name in all)
    __defProp2(target, name, { get: all[name], enumerable: true });
}, "__export");
var __copyProps = /* @__PURE__ */ __name((to2, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp2(to2, key, { get: /* @__PURE__ */ __name(() => from[key], "get"), enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to2;
}, "__copyProps");
var __toESM = /* @__PURE__ */ __name((mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp2(target, "default", { value: mod, enumerable: true }) : target,
  mod
)), "__toESM");
// @__NO_SIDE_EFFECTS__
function createNotImplementedError2(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError2, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented2(name) {
  const fn = /* @__PURE__ */ __name2(() => {
    throw /* @__PURE__ */ createNotImplementedError2(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented2, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass2(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass2, "notImplementedClass");
var init_utils = __esm({
  "../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/_internal/utils.mjs"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name2(createNotImplementedError2, "createNotImplementedError");
    __name2(notImplemented2, "notImplemented");
    __name2(notImplementedClass2, "notImplementedClass");
  }
});
var _timeOrigin2;
var _performanceNow2;
var nodeTiming2;
var PerformanceEntry2;
var PerformanceMark3;
var PerformanceMeasure2;
var PerformanceResourceTiming2;
var PerformanceObserverEntryList2;
var Performance2;
var PerformanceObserver2;
var performance2;
var init_performance = __esm({
  "../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_utils();
    _timeOrigin2 = globalThis.performance?.timeOrigin ?? Date.now();
    _performanceNow2 = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin2;
    nodeTiming2 = {
      name: "node",
      entryType: "node",
      startTime: 0,
      duration: 0,
      nodeStart: 0,
      v8Start: 0,
      bootstrapComplete: 0,
      environment: 0,
      loopStart: 0,
      loopExit: 0,
      idleTime: 0,
      uvMetricsInfo: {
        loopCount: 0,
        events: 0,
        eventsWaiting: 0
      },
      detail: void 0,
      toJSON() {
        return this;
      }
    };
    PerformanceEntry2 = class {
      static {
        __name(this, "PerformanceEntry");
      }
      static {
        __name2(this, "PerformanceEntry");
      }
      __unenv__ = true;
      detail;
      entryType = "event";
      name;
      startTime;
      constructor(name, options) {
        this.name = name;
        this.startTime = options?.startTime || _performanceNow2();
        this.detail = options?.detail;
      }
      get duration() {
        return _performanceNow2() - this.startTime;
      }
      toJSON() {
        return {
          name: this.name,
          entryType: this.entryType,
          startTime: this.startTime,
          duration: this.duration,
          detail: this.detail
        };
      }
    };
    PerformanceMark3 = class PerformanceMark2 extends PerformanceEntry2 {
      static {
        __name(this, "PerformanceMark2");
      }
      static {
        __name2(this, "PerformanceMark");
      }
      entryType = "mark";
      constructor() {
        super(...arguments);
      }
      get duration() {
        return 0;
      }
    };
    PerformanceMeasure2 = class extends PerformanceEntry2 {
      static {
        __name(this, "PerformanceMeasure");
      }
      static {
        __name2(this, "PerformanceMeasure");
      }
      entryType = "measure";
    };
    PerformanceResourceTiming2 = class extends PerformanceEntry2 {
      static {
        __name(this, "PerformanceResourceTiming");
      }
      static {
        __name2(this, "PerformanceResourceTiming");
      }
      entryType = "resource";
      serverTiming = [];
      connectEnd = 0;
      connectStart = 0;
      decodedBodySize = 0;
      domainLookupEnd = 0;
      domainLookupStart = 0;
      encodedBodySize = 0;
      fetchStart = 0;
      initiatorType = "";
      name = "";
      nextHopProtocol = "";
      redirectEnd = 0;
      redirectStart = 0;
      requestStart = 0;
      responseEnd = 0;
      responseStart = 0;
      secureConnectionStart = 0;
      startTime = 0;
      transferSize = 0;
      workerStart = 0;
      responseStatus = 0;
    };
    PerformanceObserverEntryList2 = class {
      static {
        __name(this, "PerformanceObserverEntryList");
      }
      static {
        __name2(this, "PerformanceObserverEntryList");
      }
      __unenv__ = true;
      getEntries() {
        return [];
      }
      getEntriesByName(_name, _type) {
        return [];
      }
      getEntriesByType(type) {
        return [];
      }
    };
    Performance2 = class {
      static {
        __name(this, "Performance");
      }
      static {
        __name2(this, "Performance");
      }
      __unenv__ = true;
      timeOrigin = _timeOrigin2;
      eventCounts = /* @__PURE__ */ new Map();
      _entries = [];
      _resourceTimingBufferSize = 0;
      navigation = void 0;
      timing = void 0;
      timerify(_fn, _options) {
        throw /* @__PURE__ */ createNotImplementedError2("Performance.timerify");
      }
      get nodeTiming() {
        return nodeTiming2;
      }
      eventLoopUtilization() {
        return {};
      }
      markResourceTiming() {
        return new PerformanceResourceTiming2("");
      }
      onresourcetimingbufferfull = null;
      now() {
        if (this.timeOrigin === _timeOrigin2) {
          return _performanceNow2();
        }
        return Date.now() - this.timeOrigin;
      }
      clearMarks(markName) {
        this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
      }
      clearMeasures(measureName) {
        this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
      }
      clearResourceTimings() {
        this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
      }
      getEntries() {
        return this._entries;
      }
      getEntriesByName(name, type) {
        return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
      }
      getEntriesByType(type) {
        return this._entries.filter((e) => e.entryType === type);
      }
      mark(name, options) {
        const entry = new PerformanceMark3(name, options);
        this._entries.push(entry);
        return entry;
      }
      measure(measureName, startOrMeasureOptions, endMark) {
        let start;
        let end;
        if (typeof startOrMeasureOptions === "string") {
          start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
          end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
        } else {
          start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
          end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
        }
        const entry = new PerformanceMeasure2(measureName, {
          startTime: start,
          detail: {
            start,
            end
          }
        });
        this._entries.push(entry);
        return entry;
      }
      setResourceTimingBufferSize(maxSize) {
        this._resourceTimingBufferSize = maxSize;
      }
      addEventListener(type, listener, options) {
        throw /* @__PURE__ */ createNotImplementedError2("Performance.addEventListener");
      }
      removeEventListener(type, listener, options) {
        throw /* @__PURE__ */ createNotImplementedError2("Performance.removeEventListener");
      }
      dispatchEvent(event) {
        throw /* @__PURE__ */ createNotImplementedError2("Performance.dispatchEvent");
      }
      toJSON() {
        return this;
      }
    };
    PerformanceObserver2 = class {
      static {
        __name(this, "PerformanceObserver");
      }
      static {
        __name2(this, "PerformanceObserver");
      }
      __unenv__ = true;
      static supportedEntryTypes = [];
      _callback = null;
      constructor(callback) {
        this._callback = callback;
      }
      takeRecords() {
        return [];
      }
      disconnect() {
        throw /* @__PURE__ */ createNotImplementedError2("PerformanceObserver.disconnect");
      }
      observe(options) {
        throw /* @__PURE__ */ createNotImplementedError2("PerformanceObserver.observe");
      }
      bind(fn) {
        return fn;
      }
      runInAsyncScope(fn, thisArg, ...args) {
        return fn.call(thisArg, ...args);
      }
      asyncId() {
        return 0;
      }
      triggerAsyncId() {
        return 0;
      }
      emitDestroy() {
        return this;
      }
    };
    performance2 = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance2();
  }
});
var init_perf_hooks = __esm({
  "../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/perf_hooks.mjs"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_performance();
  }
});
var init_performance2 = __esm({
  "../../../.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs"() {
    init_perf_hooks();
    globalThis.performance = performance2;
    globalThis.Performance = Performance2;
    globalThis.PerformanceEntry = PerformanceEntry2;
    globalThis.PerformanceMark = PerformanceMark3;
    globalThis.PerformanceMeasure = PerformanceMeasure2;
    globalThis.PerformanceObserver = PerformanceObserver2;
    globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList2;
    globalThis.PerformanceResourceTiming = PerformanceResourceTiming2;
  }
});
var noop_default2;
var init_noop = __esm({
  "../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/mock/noop.mjs"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    noop_default2 = Object.assign(() => {
    }, { __unenv__: true });
  }
});
var _console2;
var _ignoreErrors2;
var _stderr2;
var _stdout2;
var log3;
var info3;
var trace3;
var debug3;
var table3;
var error3;
var warn3;
var createTask3;
var clear3;
var count3;
var countReset3;
var dir3;
var dirxml3;
var group3;
var groupEnd3;
var groupCollapsed3;
var profile3;
var profileEnd3;
var time3;
var timeEnd3;
var timeLog3;
var timeStamp3;
var Console2;
var _times2;
var _stdoutErrorHandler2;
var _stderrErrorHandler2;
var init_console = __esm({
  "../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/console.mjs"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_noop();
    init_utils();
    _console2 = globalThis.console;
    _ignoreErrors2 = true;
    _stderr2 = new Writable2();
    _stdout2 = new Writable2();
    log3 = _console2?.log ?? noop_default2;
    info3 = _console2?.info ?? log3;
    trace3 = _console2?.trace ?? info3;
    debug3 = _console2?.debug ?? log3;
    table3 = _console2?.table ?? log3;
    error3 = _console2?.error ?? log3;
    warn3 = _console2?.warn ?? error3;
    createTask3 = _console2?.createTask ?? /* @__PURE__ */ notImplemented2("console.createTask");
    clear3 = _console2?.clear ?? noop_default2;
    count3 = _console2?.count ?? noop_default2;
    countReset3 = _console2?.countReset ?? noop_default2;
    dir3 = _console2?.dir ?? noop_default2;
    dirxml3 = _console2?.dirxml ?? noop_default2;
    group3 = _console2?.group ?? noop_default2;
    groupEnd3 = _console2?.groupEnd ?? noop_default2;
    groupCollapsed3 = _console2?.groupCollapsed ?? noop_default2;
    profile3 = _console2?.profile ?? noop_default2;
    profileEnd3 = _console2?.profileEnd ?? noop_default2;
    time3 = _console2?.time ?? noop_default2;
    timeEnd3 = _console2?.timeEnd ?? noop_default2;
    timeLog3 = _console2?.timeLog ?? noop_default2;
    timeStamp3 = _console2?.timeStamp ?? noop_default2;
    Console2 = _console2?.Console ?? /* @__PURE__ */ notImplementedClass2("console.Console");
    _times2 = /* @__PURE__ */ new Map();
    _stdoutErrorHandler2 = noop_default2;
    _stderrErrorHandler2 = noop_default2;
  }
});
var workerdConsole2;
var assert3;
var clear22;
var context2;
var count22;
var countReset22;
var createTask22;
var debug22;
var dir22;
var dirxml22;
var error22;
var group22;
var groupCollapsed22;
var groupEnd22;
var info22;
var log22;
var profile22;
var profileEnd22;
var table22;
var time22;
var timeEnd22;
var timeLog22;
var timeStamp22;
var trace22;
var warn22;
var console_default2;
var init_console2 = __esm({
  "../../../.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_console();
    workerdConsole2 = globalThis["console"];
    ({
      assert: assert3,
      clear: clear22,
      context: (
        // @ts-expect-error undocumented public API
        context2
      ),
      count: count22,
      countReset: countReset22,
      createTask: (
        // @ts-expect-error undocumented public API
        createTask22
      ),
      debug: debug22,
      dir: dir22,
      dirxml: dirxml22,
      error: error22,
      group: group22,
      groupCollapsed: groupCollapsed22,
      groupEnd: groupEnd22,
      info: info22,
      log: log22,
      profile: profile22,
      profileEnd: profileEnd22,
      table: table22,
      time: time22,
      timeEnd: timeEnd22,
      timeLog: timeLog22,
      timeStamp: timeStamp22,
      trace: trace22,
      warn: warn22
    } = workerdConsole2);
    Object.assign(workerdConsole2, {
      Console: Console2,
      _ignoreErrors: _ignoreErrors2,
      _stderr: _stderr2,
      _stderrErrorHandler: _stderrErrorHandler2,
      _stdout: _stdout2,
      _stdoutErrorHandler: _stdoutErrorHandler2,
      _times: _times2
    });
    console_default2 = workerdConsole2;
  }
});
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console = __esm({
  "../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console"() {
    init_console2();
    globalThis.console = console_default2;
  }
});
var hrtime4;
var init_hrtime = __esm({
  "../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    hrtime4 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name2(/* @__PURE__ */ __name(function hrtime22(startTime) {
      const now = Date.now();
      const seconds = Math.trunc(now / 1e3);
      const nanos = now % 1e3 * 1e6;
      if (startTime) {
        let diffSeconds = seconds - startTime[0];
        let diffNanos = nanos - startTime[0];
        if (diffNanos < 0) {
          diffSeconds = diffSeconds - 1;
          diffNanos = 1e9 + diffNanos;
        }
        return [diffSeconds, diffNanos];
      }
      return [seconds, nanos];
    }, "hrtime2"), "hrtime"), { bigint: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function bigint2() {
      return BigInt(Date.now() * 1e6);
    }, "bigint"), "bigint") });
  }
});
var ReadStream2;
var init_read_stream = __esm({
  "../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    ReadStream2 = class {
      static {
        __name(this, "ReadStream");
      }
      static {
        __name2(this, "ReadStream");
      }
      fd;
      isRaw = false;
      isTTY = false;
      constructor(fd3) {
        this.fd = fd3;
      }
      setRawMode(mode) {
        this.isRaw = mode;
        return this;
      }
    };
  }
});
var WriteStream2;
var init_write_stream = __esm({
  "../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    WriteStream2 = class {
      static {
        __name(this, "WriteStream");
      }
      static {
        __name2(this, "WriteStream");
      }
      fd;
      columns = 80;
      rows = 24;
      isTTY = false;
      constructor(fd3) {
        this.fd = fd3;
      }
      clearLine(dir32, callback) {
        callback && callback();
        return false;
      }
      clearScreenDown(callback) {
        callback && callback();
        return false;
      }
      cursorTo(x22, y, callback) {
        callback && typeof callback === "function" && callback();
        return false;
      }
      moveCursor(dx, dy, callback) {
        callback && callback();
        return false;
      }
      getColorDepth(env22) {
        return 1;
      }
      hasColors(count32, env22) {
        return false;
      }
      getWindowSize() {
        return [this.columns, this.rows];
      }
      write(str, encoding, cb) {
        if (str instanceof Uint8Array) {
          str = new TextDecoder().decode(str);
        }
        try {
          console.log(str);
        } catch {
        }
        cb && typeof cb === "function" && cb();
        return false;
      }
    };
  }
});
var init_tty = __esm({
  "../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/tty.mjs"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_read_stream();
    init_write_stream();
  }
});
var NODE_VERSION2;
var init_node_version = __esm({
  "../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    NODE_VERSION2 = "22.14.0";
  }
});
var Process2;
var init_process = __esm({
  "../../../.npm/_npx/32026684e21afda6/node_modules/unenv/dist/runtime/node/internal/process/process.mjs"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_tty();
    init_utils();
    init_node_version();
    Process2 = class _Process extends EventEmitter2 {
      static {
        __name(this, "_Process");
      }
      static {
        __name2(this, "Process");
      }
      env;
      hrtime;
      nextTick;
      constructor(impl) {
        super();
        this.env = impl.env;
        this.hrtime = impl.hrtime;
        this.nextTick = impl.nextTick;
        for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter2.prototype)]) {
          const value = this[prop];
          if (typeof value === "function") {
            this[prop] = value.bind(this);
          }
        }
      }
      // --- event emitter ---
      emitWarning(warning, type, code) {
        console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
      }
      emit(...args) {
        return super.emit(...args);
      }
      listeners(eventName) {
        return super.listeners(eventName);
      }
      // --- stdio (lazy initializers) ---
      #stdin;
      #stdout;
      #stderr;
      get stdin() {
        return this.#stdin ??= new ReadStream2(0);
      }
      get stdout() {
        return this.#stdout ??= new WriteStream2(1);
      }
      get stderr() {
        return this.#stderr ??= new WriteStream2(2);
      }
      // --- cwd ---
      #cwd = "/";
      chdir(cwd22) {
        this.#cwd = cwd22;
      }
      cwd() {
        return this.#cwd;
      }
      // --- dummy props and getters ---
      arch = "";
      platform = "";
      argv = [];
      argv0 = "";
      execArgv = [];
      execPath = "";
      title = "";
      pid = 200;
      ppid = 100;
      get version() {
        return `v${NODE_VERSION2}`;
      }
      get versions() {
        return { node: NODE_VERSION2 };
      }
      get allowedNodeEnvironmentFlags() {
        return /* @__PURE__ */ new Set();
      }
      get sourceMapsEnabled() {
        return false;
      }
      get debugPort() {
        return 0;
      }
      get throwDeprecation() {
        return false;
      }
      get traceDeprecation() {
        return false;
      }
      get features() {
        return {};
      }
      get release() {
        return {};
      }
      get connected() {
        return false;
      }
      get config() {
        return {};
      }
      get moduleLoadList() {
        return [];
      }
      constrainedMemory() {
        return 0;
      }
      availableMemory() {
        return 0;
      }
      uptime() {
        return 0;
      }
      resourceUsage() {
        return {};
      }
      // --- noop methods ---
      ref() {
      }
      unref() {
      }
      // --- unimplemented methods ---
      umask() {
        throw /* @__PURE__ */ createNotImplementedError2("process.umask");
      }
      getBuiltinModule() {
        return void 0;
      }
      getActiveResourcesInfo() {
        throw /* @__PURE__ */ createNotImplementedError2("process.getActiveResourcesInfo");
      }
      exit() {
        throw /* @__PURE__ */ createNotImplementedError2("process.exit");
      }
      reallyExit() {
        throw /* @__PURE__ */ createNotImplementedError2("process.reallyExit");
      }
      kill() {
        throw /* @__PURE__ */ createNotImplementedError2("process.kill");
      }
      abort() {
        throw /* @__PURE__ */ createNotImplementedError2("process.abort");
      }
      dlopen() {
        throw /* @__PURE__ */ createNotImplementedError2("process.dlopen");
      }
      setSourceMapsEnabled() {
        throw /* @__PURE__ */ createNotImplementedError2("process.setSourceMapsEnabled");
      }
      loadEnvFile() {
        throw /* @__PURE__ */ createNotImplementedError2("process.loadEnvFile");
      }
      disconnect() {
        throw /* @__PURE__ */ createNotImplementedError2("process.disconnect");
      }
      cpuUsage() {
        throw /* @__PURE__ */ createNotImplementedError2("process.cpuUsage");
      }
      setUncaughtExceptionCaptureCallback() {
        throw /* @__PURE__ */ createNotImplementedError2("process.setUncaughtExceptionCaptureCallback");
      }
      hasUncaughtExceptionCaptureCallback() {
        throw /* @__PURE__ */ createNotImplementedError2("process.hasUncaughtExceptionCaptureCallback");
      }
      initgroups() {
        throw /* @__PURE__ */ createNotImplementedError2("process.initgroups");
      }
      openStdin() {
        throw /* @__PURE__ */ createNotImplementedError2("process.openStdin");
      }
      assert() {
        throw /* @__PURE__ */ createNotImplementedError2("process.assert");
      }
      binding() {
        throw /* @__PURE__ */ createNotImplementedError2("process.binding");
      }
      // --- attached interfaces ---
      permission = { has: /* @__PURE__ */ notImplemented2("process.permission.has") };
      report = {
        directory: "",
        filename: "",
        signal: "SIGUSR2",
        compact: false,
        reportOnFatalError: false,
        reportOnSignal: false,
        reportOnUncaughtException: false,
        getReport: /* @__PURE__ */ notImplemented2("process.report.getReport"),
        writeReport: /* @__PURE__ */ notImplemented2("process.report.writeReport")
      };
      finalization = {
        register: /* @__PURE__ */ notImplemented2("process.finalization.register"),
        unregister: /* @__PURE__ */ notImplemented2("process.finalization.unregister"),
        registerBeforeExit: /* @__PURE__ */ notImplemented2("process.finalization.registerBeforeExit")
      };
      memoryUsage = Object.assign(() => ({
        arrayBuffers: 0,
        rss: 0,
        external: 0,
        heapTotal: 0,
        heapUsed: 0
      }), { rss: /* @__PURE__ */ __name2(() => 0, "rss") });
      // --- undefined props ---
      mainModule = void 0;
      domain = void 0;
      // optional
      send = void 0;
      exitCode = void 0;
      channel = void 0;
      getegid = void 0;
      geteuid = void 0;
      getgid = void 0;
      getgroups = void 0;
      getuid = void 0;
      setegid = void 0;
      seteuid = void 0;
      setgid = void 0;
      setgroups = void 0;
      setuid = void 0;
      // internals
      _events = void 0;
      _eventsCount = void 0;
      _exiting = void 0;
      _maxListeners = void 0;
      _debugEnd = void 0;
      _debugProcess = void 0;
      _fatalException = void 0;
      _getActiveHandles = void 0;
      _getActiveRequests = void 0;
      _kill = void 0;
      _preload_modules = void 0;
      _rawDebug = void 0;
      _startProfilerIdleNotifier = void 0;
      _stopProfilerIdleNotifier = void 0;
      _tickCallback = void 0;
      _disconnect = void 0;
      _handleQueue = void 0;
      _pendingMessage = void 0;
      _channel = void 0;
      _send = void 0;
      _linkedBinding = void 0;
    };
  }
});
var globalProcess2;
var getBuiltinModule2;
var workerdProcess2;
var unenvProcess2;
var exit2;
var features2;
var platform2;
var _channel2;
var _debugEnd2;
var _debugProcess2;
var _disconnect2;
var _events2;
var _eventsCount2;
var _exiting2;
var _fatalException2;
var _getActiveHandles2;
var _getActiveRequests2;
var _handleQueue2;
var _kill2;
var _linkedBinding2;
var _maxListeners2;
var _pendingMessage2;
var _preload_modules2;
var _rawDebug2;
var _send2;
var _startProfilerIdleNotifier2;
var _stopProfilerIdleNotifier2;
var _tickCallback2;
var abort2;
var addListener2;
var allowedNodeEnvironmentFlags2;
var arch2;
var argv2;
var argv02;
var assert22;
var availableMemory2;
var binding2;
var channel2;
var chdir2;
var config2;
var connected2;
var constrainedMemory2;
var cpuUsage2;
var cwd2;
var debugPort2;
var disconnect2;
var dlopen2;
var domain2;
var emit2;
var emitWarning2;
var env2;
var eventNames2;
var execArgv2;
var execPath2;
var exitCode2;
var finalization2;
var getActiveResourcesInfo2;
var getegid2;
var geteuid2;
var getgid2;
var getgroups2;
var getMaxListeners2;
var getuid2;
var hasUncaughtExceptionCaptureCallback2;
var hrtime32;
var initgroups2;
var kill2;
var listenerCount2;
var listeners2;
var loadEnvFile2;
var mainModule2;
var memoryUsage2;
var moduleLoadList2;
var nextTick2;
var off2;
var on2;
var once2;
var openStdin2;
var permission2;
var pid2;
var ppid2;
var prependListener2;
var prependOnceListener2;
var rawListeners2;
var reallyExit2;
var ref2;
var release2;
var removeAllListeners2;
var removeListener2;
var report2;
var resourceUsage2;
var send2;
var setegid2;
var seteuid2;
var setgid2;
var setgroups2;
var setMaxListeners2;
var setSourceMapsEnabled2;
var setuid2;
var setUncaughtExceptionCaptureCallback2;
var sourceMapsEnabled2;
var stderr2;
var stdin2;
var stdout2;
var throwDeprecation2;
var title2;
var traceDeprecation2;
var umask2;
var unref2;
var uptime2;
var version2;
var versions2;
var _process2;
var process_default2;
var init_process2 = __esm({
  "../../../.npm/_npx/32026684e21afda6/node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_hrtime();
    init_process();
    globalProcess2 = globalThis["process"];
    getBuiltinModule2 = globalProcess2.getBuiltinModule;
    workerdProcess2 = getBuiltinModule2("node:process");
    unenvProcess2 = new Process2({
      env: globalProcess2.env,
      hrtime: hrtime4,
      // `nextTick` is available from workerd process v1
      nextTick: workerdProcess2.nextTick
    });
    ({ exit: exit2, features: features2, platform: platform2 } = workerdProcess2);
    ({
      _channel: _channel2,
      _debugEnd: _debugEnd2,
      _debugProcess: _debugProcess2,
      _disconnect: _disconnect2,
      _events: _events2,
      _eventsCount: _eventsCount2,
      _exiting: _exiting2,
      _fatalException: _fatalException2,
      _getActiveHandles: _getActiveHandles2,
      _getActiveRequests: _getActiveRequests2,
      _handleQueue: _handleQueue2,
      _kill: _kill2,
      _linkedBinding: _linkedBinding2,
      _maxListeners: _maxListeners2,
      _pendingMessage: _pendingMessage2,
      _preload_modules: _preload_modules2,
      _rawDebug: _rawDebug2,
      _send: _send2,
      _startProfilerIdleNotifier: _startProfilerIdleNotifier2,
      _stopProfilerIdleNotifier: _stopProfilerIdleNotifier2,
      _tickCallback: _tickCallback2,
      abort: abort2,
      addListener: addListener2,
      allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags2,
      arch: arch2,
      argv: argv2,
      argv0: argv02,
      assert: assert22,
      availableMemory: availableMemory2,
      binding: binding2,
      channel: channel2,
      chdir: chdir2,
      config: config2,
      connected: connected2,
      constrainedMemory: constrainedMemory2,
      cpuUsage: cpuUsage2,
      cwd: cwd2,
      debugPort: debugPort2,
      disconnect: disconnect2,
      dlopen: dlopen2,
      domain: domain2,
      emit: emit2,
      emitWarning: emitWarning2,
      env: env2,
      eventNames: eventNames2,
      execArgv: execArgv2,
      execPath: execPath2,
      exitCode: exitCode2,
      finalization: finalization2,
      getActiveResourcesInfo: getActiveResourcesInfo2,
      getegid: getegid2,
      geteuid: geteuid2,
      getgid: getgid2,
      getgroups: getgroups2,
      getMaxListeners: getMaxListeners2,
      getuid: getuid2,
      hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback2,
      hrtime: hrtime32,
      initgroups: initgroups2,
      kill: kill2,
      listenerCount: listenerCount2,
      listeners: listeners2,
      loadEnvFile: loadEnvFile2,
      mainModule: mainModule2,
      memoryUsage: memoryUsage2,
      moduleLoadList: moduleLoadList2,
      nextTick: nextTick2,
      off: off2,
      on: on2,
      once: once2,
      openStdin: openStdin2,
      permission: permission2,
      pid: pid2,
      ppid: ppid2,
      prependListener: prependListener2,
      prependOnceListener: prependOnceListener2,
      rawListeners: rawListeners2,
      reallyExit: reallyExit2,
      ref: ref2,
      release: release2,
      removeAllListeners: removeAllListeners2,
      removeListener: removeListener2,
      report: report2,
      resourceUsage: resourceUsage2,
      send: send2,
      setegid: setegid2,
      seteuid: seteuid2,
      setgid: setgid2,
      setgroups: setgroups2,
      setMaxListeners: setMaxListeners2,
      setSourceMapsEnabled: setSourceMapsEnabled2,
      setuid: setuid2,
      setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback2,
      sourceMapsEnabled: sourceMapsEnabled2,
      stderr: stderr2,
      stdin: stdin2,
      stdout: stdout2,
      throwDeprecation: throwDeprecation2,
      title: title2,
      traceDeprecation: traceDeprecation2,
      umask: umask2,
      unref: unref2,
      uptime: uptime2,
      version: version2,
      versions: versions2
    } = unenvProcess2);
    _process2 = {
      abort: abort2,
      addListener: addListener2,
      allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags2,
      hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback2,
      setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback2,
      loadEnvFile: loadEnvFile2,
      sourceMapsEnabled: sourceMapsEnabled2,
      arch: arch2,
      argv: argv2,
      argv0: argv02,
      chdir: chdir2,
      config: config2,
      connected: connected2,
      constrainedMemory: constrainedMemory2,
      availableMemory: availableMemory2,
      cpuUsage: cpuUsage2,
      cwd: cwd2,
      debugPort: debugPort2,
      dlopen: dlopen2,
      disconnect: disconnect2,
      emit: emit2,
      emitWarning: emitWarning2,
      env: env2,
      eventNames: eventNames2,
      execArgv: execArgv2,
      execPath: execPath2,
      exit: exit2,
      finalization: finalization2,
      features: features2,
      getBuiltinModule: getBuiltinModule2,
      getActiveResourcesInfo: getActiveResourcesInfo2,
      getMaxListeners: getMaxListeners2,
      hrtime: hrtime32,
      kill: kill2,
      listeners: listeners2,
      listenerCount: listenerCount2,
      memoryUsage: memoryUsage2,
      nextTick: nextTick2,
      on: on2,
      off: off2,
      once: once2,
      pid: pid2,
      platform: platform2,
      ppid: ppid2,
      prependListener: prependListener2,
      prependOnceListener: prependOnceListener2,
      rawListeners: rawListeners2,
      release: release2,
      removeAllListeners: removeAllListeners2,
      removeListener: removeListener2,
      report: report2,
      resourceUsage: resourceUsage2,
      setMaxListeners: setMaxListeners2,
      setSourceMapsEnabled: setSourceMapsEnabled2,
      stderr: stderr2,
      stdin: stdin2,
      stdout: stdout2,
      title: title2,
      throwDeprecation: throwDeprecation2,
      traceDeprecation: traceDeprecation2,
      umask: umask2,
      uptime: uptime2,
      version: version2,
      versions: versions2,
      // @ts-expect-error old API
      domain: domain2,
      initgroups: initgroups2,
      moduleLoadList: moduleLoadList2,
      reallyExit: reallyExit2,
      openStdin: openStdin2,
      assert: assert22,
      binding: binding2,
      send: send2,
      exitCode: exitCode2,
      channel: channel2,
      getegid: getegid2,
      geteuid: geteuid2,
      getgid: getgid2,
      getgroups: getgroups2,
      getuid: getuid2,
      setegid: setegid2,
      seteuid: seteuid2,
      setgid: setgid2,
      setgroups: setgroups2,
      setuid: setuid2,
      permission: permission2,
      mainModule: mainModule2,
      _events: _events2,
      _eventsCount: _eventsCount2,
      _exiting: _exiting2,
      _maxListeners: _maxListeners2,
      _debugEnd: _debugEnd2,
      _debugProcess: _debugProcess2,
      _fatalException: _fatalException2,
      _getActiveHandles: _getActiveHandles2,
      _getActiveRequests: _getActiveRequests2,
      _kill: _kill2,
      _preload_modules: _preload_modules2,
      _rawDebug: _rawDebug2,
      _startProfilerIdleNotifier: _startProfilerIdleNotifier2,
      _stopProfilerIdleNotifier: _stopProfilerIdleNotifier2,
      _tickCallback: _tickCallback2,
      _disconnect: _disconnect2,
      _handleQueue: _handleQueue2,
      _pendingMessage: _pendingMessage2,
      _channel: _channel2,
      _send: _send2,
      _linkedBinding: _linkedBinding2
    };
    process_default2 = _process2;
  }
});
var init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process = __esm({
  "../../../.npm/_npx/32026684e21afda6/node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process"() {
    init_process2();
    globalThis.process = process_default2;
  }
});
var noto_sans_v27_latin_regular_ttf_bin_inline_default;
var init_chunk_F4YVNV3Y = __esm({
  "../node_modules/@cf-wasm/og/dist/chunk-F4YVNV3Y.js"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    noto_sans_v27_latin_regular_ttf_bin_inline_default = Uint8Array.from(atob("AAEAAAAPAIAAAwBwR0RFRgdYC5QAAAHoAAAAjkdQT1OM9XJoAAAXKAAACqpHU1VCU3tD+AAAB7wAAAMsT1MvMmtn3tAAAAGIAAAAYGNtYXAceBMdAAACeAAAAQhnYXNwAAAAEAAAAQQAAAAIZ2x5ZvlPWNcAACHUAABKkGhlYWQj6VTeAAABUAAAADZoaGVhDLMGuAAAASwAAAAkaG10eHbhOiQAAAroAAAFBGxvY2G8P6qSAAAFNAAAAoZtYXhwAWUBfwAAAQwAAAAgbmFtZSG4Pe4AAAOAAAABtHBvc3Ttoj9GAAAP7AAABztwcmVwaAaMhQAAAPwAAAAHuAH/hbAEjQAAAQAB//8ADwABAAABQgEEABgAeQAGAAEAAAAAAAAAAAAAAAAABAABAAEAAAQt/tsAAAsY/ZP7hArwAAEAAAAAAAAAAAAAAAAAAAFAAAEAAAACActs4F56Xw889QADA+gAAAAA3icHNgAAAADeJwdB/ZP+dgrwBUMAAAAGAAIAAAAAAAAABAI7AZAABQAAAooCWAAAAEsCigJYAAABXgAyAUIAAAILBQIEBQQCAgSAAAAnAAAASwAAACgAAAAAR09PRwDAAAD//QQt/tsAAAVDAYsAAAGfAAAAAAIYAsoAAAAgAAQAAQACAFQAAAAmAAAADgABAAQAAAAUAAAAFAAAABQAAAAUAAEAAAAOAAUAJgAmACYAGAAYAAIAAQDpAO0AAAACAAoABgABAncAAQE7AAEABAABAS0AAgAJACQAPQABAEQAXQABAGwAbAABAHwAfAABAIIAmAABAJoAuAABALoAxQABAOkA7QACAO4A7gABAAAAAAABAAMAAQAAAAwABAD8AAAAOgAgAAQAGgAAAA0AfgD/ATEBUwK8AsYC2gLcIAIgCSALIBQgGiAeICIgJiAzIDogRCB0IKwhIiISIhX+///9//8AAAAAAA0AIACgATEBUgK7AsYC2gLcIAIgCSALIBMgGCAcICIgJiAyIDkgRCB0IKwhIiISIhX+///9//8AAf/1/+P/wv+9/3IAAP4A/e797eDd4Nfg1uC34LTgs+Cw4K3gouCd4JTgZ+At37jfL939AeMA5gABAAAAAAAAAAAAAAAAAC4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADlAOQAAAAIAGYAAwABBAkAAABoAOYAAwABBAkAAQASANQAAwABBAkAAgAOAMYAAwABBAkAAwA2AJAAAwABBAkABAAiAG4AAwABBAkABQAaAFQAAwABBAkABgAgADQAAwABBAkADgA0AAAAaAB0AHQAcAA6AC8ALwBzAGMAcgBpAHAAdABzAC4AcwBpAGwALgBvAHIAZwAvAE8ARgBMAE4AbwB0AG8AUwBhAG4AcwAtAFIAZQBnAHUAbABhAHIAVgBlAHIAcwBpAG8AbgAgADIALgAwADAANwBOAG8AdABvACAAUwBhAG4AcwAgAFIAZQBnAHUAbABhAHIAMgAuADAAMAA3ADsARwBPAE8ARwA7AE4AbwB0AG8AUwBhAG4AcwAtAFIAZQBnAHUAbABhAHIAUgBlAGcAdQBsAGEAcgBOAG8AdABvACAAUwBhAG4AcwBDAG8AcAB5AHIAaQBnAGgAdAAgADIAMAAxADUALQAyADAAMgAxACAARwBvAG8AZwBsAGUAIABMAEwAQwAuACAAQQBsAGwAIABSAGkAZwBoAHQAcwAgAFIAZQBzAGUAcgB2AGUAZAAuAAAAFAAUABQAFAAxAEcAdwDCAQsBXQFrAYUBoAG/AdQB6AH0AgoCGgJEAl0CiQLHAuwDHQNeA3ADwQQDBCkETgRhBHQEhwTHBTMFVwWMBbcF1wXuBgIGNAZLBmMGgAadBqwG0gbzByAHQwd2B58H3QfuCA0IKghkCH8IlQisCL0IzAjdCPAI/QkUCU8JggmsCeAKEgo4CncKmgq3CuMLBQsRC0MLZAuOC8QL+QwcDFoMgQyiDMAM/A0VDUMNWg2GDZMNvw3mDeYOAw43DmcOtA7XDukPSQ9vD8gP/xAdEC0QNRCMEJoQwBDcEQYRQBFXEYARoBGpEcsR5RILEikSZxKsEwoTSxNXE2MTbxN7E4cTkxO2E8ITzhPaE+YT8hP+FAoUFhQiFEoUVhRiFG4UehSGFJIUrBTyFP4VChUWFSIVLhVTFaAVqxW3FcIVzRXYFeQWQBZMFlcWYxZuFnkWhBaPFpoWphbrFvYXAhcOFxkXJBcvF1wXnBeoF7QXvxfKF9YYDxgaGCYYMhhoGLcY2BjuGRQZOBlEGVAZZRl6GYMZphnKGdMZ6Rn5GgYaEhokGjYaRhqKGroa3RsMGx4baBtoG2gbaBtoG60btRu9G+AcHRxXHGMcbxx7HIscmxynHNEc6x0WHVQdeR2qHesd/R5NHo8emB6hHqoesx68HsUezh7XHuAe6R7yHvsfBB8NHxYfHx8oHzEfOh9DH0MfQx9DH0sfaB99H6wf9CACIB0gOCBWIGogfiCKIKAgriDXIPEhHSFYIX0hryHxIgMiUCKSIrgi3SLvIwIjFSNVI2YjdCOFI5cjpCPSI98kDCQ2JDYkQyRQJGUkeiScJL8k9CUOJTslSAAAAAEAAAAKAHAA1gAGREZMVABQY3lybABQZGV2MgBEZGV2YQBEZ3JlawBQbGF0bgAmAC4AAUNBVCAACgAA//8ABwAAAAEAAgADAAUABgAHAAQAAAAA//8AAQAEAAQAAAAA//8ABgAAAAEAAgAFAAYABwAIZG5vbQBgZnJhYwBWbGlnYQBQbG9jbABKbG9jbABEbnVtcgA+cG51bQA4dG51bQAyAAAAAQALAAAAAQAKAAAAAQADAAAAAQANAAAAAQAAAAAAAQAMAAAAAwAFAAYABwAAAAEABAAOAhQB9AHUAbwBrgGaAbwBUgFEAUQBNgEeANoAHgABAAAAAQAIAAIAbgA0AQ0BDgEPAREBEgETARQBFQEWARcBGAEZARoBGwEcAR0BHgEfASABIQEiASMBJAElASYBJwEoASkBKgErASwBLQEuAS8BMAExATIBMwE0ATUBNgE3AT8BQAE4ATkBOgE7ATwBPQE+ARAAAgALAAEABgAAAAgACAAGAAoAIgAHAD4AQgAgAF4AYgAlAJkAmQAqALkAuQArAMoAzQAsAM8A0AAwANMA0wAyAOQA5AAzAAQAAAABAAgAAQA2AAEACAAFACYAHgAYABIADADrAAIATwDqAAIATADpAAIASQDtAAMASQBPAOwAAwBJAEwAAQABAEkAAQAAAAEACAABAAb/JAACAAEA7wD4AAAAAQAAAAEACAABAIwA3AABAAAAAQAIAAEAPv/2AAYAAAACACYACgADAAEAEgABAC4AAAABAAAACQACAAEA+QECAAAAAwABABwAAQASAAAAAQAAAAgAAgABAQMBDAAAAAEAAQDYAAEAAAABAAgAAQAGAMYAAQABABIAAQAAAAEACAABABQA5gABAAAAAQAIAAEABgDwAAIAAQATABwAAAAEAAAAAQAIAAEAEgABAAgAAQAEAMIAAgB5AAEAAQAvAAQAAAABAAgAAQASAAEACAABAAQAwwACAHkAAQABAE8ABgAAAAEACAABAAoAAgAmABIAAQACAC8ATwABAAQAAAACAHkAAQBPAAEAAAABAAEABAAAAAIAeQABAC8AAQAAAAICWABeAAAAAAEEAAABBAAAAQ0ASAGYAEEChgAZAjwAPgM/ADEC3AA1AOEAQQEsACgBLAAeAicAKQI8ADIBDAApAUIAKAEMAEgBdAAKAjwAMQI8AFkCPAAwAjwALQI8ABUCPAA/AjwANwI8ACwCPAAxAjwAMgEMAEgBDAAfAjwAMgI8ADgCPAAyAbIADAODADoCfwAAAooAYQJ4AD0C2gBhAiwAYQIHAGEC2AA9AuUAYQFTACgBEf+yAmsAYQIMAGEDiwBhAvgAYQMNAD0CXQBhAw0APQJuAGECJQAzAiwACgLbAFoCWAAAA6IADAJKAAQCNgAAAjwAJgFJAFABdAAKAUkAGQI8ACYBvP/+ARkAKAIxAC4CZwBVAeAANwJnADcCNAA3AVgADwJnADcCagBVAQIATgEC/8kCFgBVAQIAVQOnAFUCagBVAl0ANwJnAFUCZwA3AZ0AVQHfADMBaQAQAmoATwH8AAADEgALAhEAEgH+AAEB1gAnAXwAHAInAO8BfAAgAjwAMgEEAAABDQBIAjwAWwI8ACACPAA7AjwADgInAO8CAQA7AkQAlQNAADEBZQAgAf0AKAI8ADIBQgAoA0AAMQH0//0BrAA3AjwAMgFeABgBXgARARkAKAJvAFUCjwA3AQwASADhAA4BXgAlAXgAIAH9ACcC6QAiAwMAFgMNAA8BsgAYAn8AAAJ/AAACfwAAAn8AAAJ/AAACfwAAA3H//wJ4AD0CLABhAiwAYQIsAGECLABhAVMAKAFTACgBUwABAVMAHgLaAB4C+ABhAw0APQMNAD0DDQA9Aw0APQMNAD0CPABAAw0APQLbAFoC2wBaAtsAWgLbAFoCNgAAAl0AYQJ3AFUCMQAuAjEALgIxAC4CMQAuAjEALgIxAC4DYAAuAeAANwI0ADcCNAA3AjQANwI0ADcBAv//AQIATAEC/9gBAv/1Al0ANwJqAFUCXQA3Al0ANwJdADcCXQA3Al0ANwI8ADICXQA3AmoATwJqAE8CagBPAmoATwH+AAECZwBVAf4AAQIMAGEBDABVA6AAPQOyADYBogAoALcAKAEsACgBvwAoAfQAKAPoACgArwAMAK8ADAD6AB8BZwAMAWcADAGgAB8BeABNAxcASADoACcBmAAnATYAKAE2ACcAgv9BAjwAFwMFABEBXgAKAV4AHgFeABwBXgAZAfQAAACmAAAAAAAAAAAAAAPoACkArwAMAK8ADAFeABMBXgAUAV4AEQKwAA8CWgAPAloADwOyAA8DsgAPAQIAVQJIADcBuQAZAisAJgI8AC0CPAAVAjwAPwI8ADcB/wAIAk0AOgI8ADIBXgATAV4AJQFeABgBXgARAV4ACgFeAB4BXgAUAV4AHAFeABkBXgARAV4AEwFeACUBXgAYAV4AEQFeAAoBXgAeAV4AFAFeABwBXgAZAV4AEQAAAAABBAAAAQQAAAE4AFEBfwCTAfYAcwKNACIDPAA5AUYAcwFiAEQBYgA7Al8ASQInADIBDAAuAVQAMQEMAEgBrQAqAicAMAInAFcCJwAvAicAKAInAAsCJwBAAicANwInACwCJwA0AicANAEmAFUBJgAsAicAMgInADICJwAyAgYARwFkAGwBrQAqAWQANgInAB0Bm//+AYcALAIcAOoBeAA2AicAMgEEAAAB9AAoA+gAKAE4AFIBOABRAfQAUwH0AFEDJABIAicARQAyADIAAgAAAAAAAP+cADIAAAAAAAAAAAAAAAAAAAAAAAAAAAFCAAABAgEDAAMABAAFAAYABwAIAAkACgALAAwADQAOAA8AEAARABIAEwAUABUAFgAXABgAGQAaABsAHAAdAB4AHwAgACEAIgAjACQAJQAmACcAKAApACoAKwAsAC0ALgAvADAAMQAyADMANAA1ADYANwA4ADkAOgA7ADwAPQA+AD8AQABBAEIAQwBEAEUARgBHAEgASQBKAEsATABNAE4ATwBQAFEAUgBTAFQAVQBWAFcAWABZAFoAWwBcAF0AXgBfAGAAYQEEAKMAhACFAL0AlgDoAIYAjgCLAJ0AqQCkAQUAigEGAIMAkwEHAQgAjQEJAIgAwwDeAQoAngCqAPUA9AD2AKIArQDJAMcArgBiAGMAkABkAMsAZQDIAMoAzwDMAM0AzgDpAGYA0wDQANEArwBnAPAAkQDWANQA1QBoAOsA7QCJAGoAaQBrAG0AbABuAKAAbwBxAHAAcgBzAHUAdAB2AHcA6gB4AHoAeQB7AH0AfAC4AKEAfwB+AIAAgQDsAO4AugELAQwAsACxANgA3ADdANkAsgCzALYAtwDEALQAtQDFAIcAqwENAQ4AvgC/ALwBDwCMARABEQESARMBFAEVARYBFwEYARkBGgEbARwBHQEeAMAAwQEfASAA1wEhASIBIwEkASUBJgEnASgBKQEqASsBLAEtAS4BLwEwATEBMgEzATQBNQE2ATcBOAE5AToBOwE8AT0BPgE/AUABQQFCAUMBRAFFAUYBRwFIAUkBSgFLAUwBTQFOAU8BUAFRAVIBUwFUAVUBVgFXAVgBWQFaAVsBXAFdAV4BXwFgAWEBYgFjAWQBZQFmAWcBaAFpAWoBawFsAW0BbgFvAXABcQFyAXMETlVMTAJDUgd1bmkwMEEwB3VuaTAwQUQJb3ZlcnNjb3JlB3VuaTAwQjIHdW5pMDBCMwd1bmkwMEI1B3VuaTAwQjkETGRvdARsZG90Bm1pbnV0ZQZzZWNvbmQERXVybwd1bmkyMDc0B3VuaTIwNzUHdW5pMjA3Nwd1bmkyMDc4B3VuaTIwMDIHdW5pMjAwOQd1bmkyMDBCB3VuaUZFRkYHdW5pRkZGRAd1bmkwMkJDB3VuaTAyQkIHdW5pMjA3MAd1bmkyMDc2B3VuaTIwNzkDZl9mBWZfZl9pBWZfZl9sB3plcm8ubGYGb25lLmxmBnR3by5sZgh0aHJlZS5sZgdmb3VyLmxmB2ZpdmUubGYGc2l4LmxmCHNldmVuLmxmCGVpZ2h0LmxmB25pbmUubGYJemVyby5kbm9tCG9uZS5kbm9tCHR3by5kbm9tCnRocmVlLmRub20JZm91ci5kbm9tCWZpdmUuZG5vbQhzaXguZG5vbQpzZXZlbi5kbm9tCmVpZ2h0LmRub20JbmluZS5kbm9tCXplcm8ubnVtcghvbmUubnVtcgh0d28ubnVtcgp0aHJlZS5udW1yCWZvdXIubnVtcglmaXZlLm51bXIIc2l4Lm51bXIKc2V2ZW4ubnVtcgplaWdodC5udW1yCW5pbmUubnVtcgRudWxsBENSXzEHc3BhY2VfMQl1bmkwMkJDXzELZXhjbGFtLmRldmENcXVvdGVkYmwuZGV2YQ9udW1iZXJzaWduLmRldmEMcGVyY2VudC5kZXZhEHF1b3Rlc2luZ2xlLmRldmEOcGFyZW5sZWZ0LmRldmEPcGFyZW5yaWdodC5kZXZhDWFzdGVyaXNrLmRldmEJcGx1cy5kZXZhCmNvbW1hLmRldmELaHlwaGVuLmRldmELcGVyaW9kLmRldmEKc2xhc2guZGV2YQl6ZXJvLmRldmEIb25lLmRldmEIdHdvLmRldmEKdGhyZWUuZGV2YQlmb3VyLmRldmEJZml2ZS5kZXZhCHNpeC5kZXZhCnNldmVuLmRldmEKZWlnaHQuZGV2YQluaW5lLmRldmEKY29sb24uZGV2YQ5zZW1pY29sb24uZGV2YQlsZXNzLmRldmEKZXF1YWwuZGV2YQxncmVhdGVyLmRldmENcXVlc3Rpb24uZGV2YRBicmFja2V0bGVmdC5kZXZhDmJhY2tzbGFzaC5kZXZhEWJyYWNrZXRyaWdodC5kZXZhEGFzY2lpY2lyY3VtLmRldmEPdW5kZXJzY29yZS5kZXZhDmJyYWNlbGVmdC5kZXZhCGJhci5kZXZhD2JyYWNlcmlnaHQuZGV2YQ9hc2NpaXRpbGRlLmRldmEMbmJzcGFjZS5kZXZhC2VuZGFzaC5kZXZhC2VtZGFzaC5kZXZhDnF1b3RlbGVmdC5kZXZhD3F1b3RlcmlnaHQuZGV2YRFxdW90ZWRibGxlZnQuZGV2YRJxdW90ZWRibHJpZ2h0LmRldmENZWxsaXBzaXMuZGV2YQ1tdWx0aXBseS5kZXZhC2RpdmlkZS5kZXZhCm1pbnVzLmRldmEAAAEAAAAKADAAPgAEREZMVAAaY3lybAAaZ3JlawAabGF0bgAaAAQAAAAA//8AAQAAAAFrZXJuAAgAAAABAAAAAQAEAAIACAACCJIACgACBPIABAAABzoFsAAZABkAAAAAAAAAAAAAAAAAAP/sAAAAAAAAAAAAAAAAAAAAAAAA//b/9gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/sAAAAAAAA//YAAP/2AAAAAAAA/9j/4gAAAAAAAP/2AAAAAAAAAAAAAAAA/+wAAAAAAAAAAAAAAAD/xAAA/9gAAAAAAAAAAP+6AAD/ugAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9gAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//YAAAAAAAAAAAAAAAAAAAAAAAD/7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAyAAAAAAAAAAD/zv/s/+L/zv/EAAAAAAAAAAAAAAAAAAD/2P/O/8QAAP/sAAAAAAAAAAD/4v+wAAAAAP/EAAD/4v/Y/7oAAAAAAAAACgAAABQAAP/i/+IAAAAUAAAAAAAAAAAAAAAAAAD/sAAA/+z/9v/2/+z/2AAAAAAAAAAAAAAAAAAA//b/9v/OAAAAAAAAAAAAAAAA//b/4gAAAAAAAP/sAAAAAAAA//YAAAAA/+IAAP/sAAAAAAAAAAD/7AAA/7AAAAAAAAAAAAAAAAAAAAAA/+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAD/uv/s/87/sP+6AAD/7AAAAAAAAAAAAAD/xP+6/8QAFP/YAAD/2AAAAAD/4v/EAAAAAP/sAAAAAP/sAAAAAAAAAAAAAAAAAAAAAAAA//b/YAAAAAAAKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9gAAAAAAAAAAAAAAAAAAAAAAAAAAP/OAAAAAAAA/+wAAAAA/8QAAP/EAAAAAAAAAAD/ugAAAAAAAAAAAAAAAAAAAAAAAAAA//YAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+wAAAAAAAD/7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/7AAAAAD/7AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/sAAA/+IAAAAAAAAAAP/EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/iAAD/9gAAAAAAAAAA/+IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/+wAAAAAADwAAAAAACgAAAAAAAAAAAAAAAAAAAAA/84AAAAAAAAAAAAAAAAAAAAAAAD/fgAAAAAAAAAA//YAAAAA/+z/4gACAB8ABQAFAAAACgAKAAEADwARAAIAJAAkAAUAJgAoAAYALgAvAAkAMgA0AAsANwA9AA4ARABFABUASABJABcASwBLABkAUABTABoAVQBVAB4AVwBXAB8AWQBcACAAbQBtACQAfQB9ACUAggCNACYAkgCSADIAlACYADMAmgCgADgAogCoAD8AqgCtAEYAsACyAEoAtAC4AE0AugC6AFIAvwDCAFMAxADFAFcAygDRAFkA1gDXAGEA6QDpAGMAAgBBAAUABQASAAoACgASAAwADAAVAA8ADwAPABAAEAATABEAEQAPACQAJAAFACYAJgACACoAKgACADIAMgACADQANAACADcANwAQADgAOAAGADkAOgALADwAPAAJAD0APQAUAEAAQAAVAEQARAAEAEUARQAIAEYASAABAEkASQAKAEoASgAOAEsASwAIAE4ATwAIAFAAUQADAFIAUgABAFMAUwADAFQAVAABAFUAVQADAFYAVgANAFcAVwAMAFgAWAADAFkAXAAHAF0AXQARAGAAYAAVAG0AbQAXAH0AfQAWAIIAhwAFAIgAiAAYAIkAiQACAJQAmAACAJoAmgACAJsAngAGAJ8AnwAJAKIAogABAKMAqAAEAKkArQABALQAuAABALoAugABALsAvgADAL8AvwAHAMAAwAAIAMEAwQAHAMMAwwAIAMQAxAACAMUAxQABAMoAywATAM0AzQASAM4AzgAPANAA0AASANEA0QAPANMA0wAPANYA1gAXANcA1wAWAOkA7QAKAAIANwAFAAUACQAKAAoACQAPAA8AEQAQABAAEAARABEAEQAkACQAAwAmACYADAAnACcAAgAoACgABAAuAC4AEwAvAC8ACwAyADIAAgAzADMAGAA0ADQAAgA3ADcADgA4ADgABgA5ADoACgA7ADsAEwA8ADwACAA9AD0AEgBEAEQAAQBJAEkAFwBLAEsAAQBQAFEAAQBVAFUADwBXAFcADQBZAFoABQBbAFsAFABcAFwABQBtAG0AFgB9AH0AFQCCAIcAAwCIAIgABACJAIkADACKAI0ABACSAJIAAgCUAJgAAgCaAJoAAgCbAJ4ABgCfAJ8ACACgAKAAGACiAKcAAQCwALEABwC/AL8ABQDBAMEABQDCAMIACwDEAMQABADKAMsAEADMAM0ACQDOAM4AEQDPANAACQDRANEAEQDWANYAFgDXANcAFQDpAOkAFwABAGwABAAAADEBwAG2AbABmgGUAY4BTAGUAUIBlAE4AS4BKAEoAR4BtgEYAQYBKAEoASgBtgDsAZQA0gGwAbABsAGwAbABsAGOAY4BjgGOAY4BlAGUAZQBlAGUAZQBlAEeAUIBKAEoAY4BlAABADEACQALACQAJQAnACgAKQAyADMANAA1ADcAOQA6ADwAPgBCAEYAWQBaAFwAXgBjAH0AgQCCAIMAhACFAIYAhwCIAIoAiwCMAI0AkgCUAJUAlgCXAJgAmgCfAKAAvwDBAMQA1wAGAC0AZAA3/9gAOf/iADr/4gA8/9gAn//YAAYALQAyADf/7AA5//YAOv/2ADz/4gCf/+IABAAFABQACgAUAM0AFADQABQAAQAtAF8AAgAJ/+IAIgAUAAEAIgAUAAIACf/sACIAFAACAG3/9gDW//YAAgAJ//YAO//sABAADAAUAA//xAAR/8QAIgAUACT/7ABAABQAYAAUAIL/7ACD/+wAhP/sAIX/7ACG/+wAh//sAM7/xADR/8QA0//EAAEALQA8AAEAO//sAAUAD//2ABH/9gDO//YA0f/2ANP/9gABAC0AMgACAC0AWgBNACgABQA3/8QAOf/sADr/7AA8/+IAn//iAAAAAgBeAAAB+QLKAAMABwAAMxEhESUhESFeAZv+mAE1/ssCyv02MwJkAAIASP/yAMQCygADAA8AADcjAzMDNDYzMhYVFAYjIiajORlrdCQaGSUlGRokyQIB/WwlHh4lJCAgAAACAEEByAFXAsoAAwAHAAATAyMDIQMjA6AUNxQBFhQ3FALK/v4BAv7+AQIAAAIAGQAAAmwCygAbAB8AAAEHMxUjByM3IwcjNyM1MzcjNTM3MwczNzMHMxUFMzcjAeAfiZYpRymPJ0YmfosghpIoSCiQKEUof/5/jx+PAbSgQ9HR0dFDoELU1NTUQqCgAAMAPv/GAgQC9wAiACkAMAAANyYmJzUWFhc1JiY1NDY3NTMVFhYXByYmJxUeAhUUBgcVIxEGBhUUFhcTNjY1NCYn/TdoICJqM2NcZ1hANVckGyBNKEJYLWhfQDYzLTxAOzYwQTEBEQ9VEBgByhtSR0pUBVhXARUPSg0TA8kTKz8yRlcKbwKMBCohKCsP/uIGKyImJxAAAAUAMf/2Aw4C1AALAA8AGQAlAC8AABMyFhUUBiMiJjU0NgUBIwEFIgYVFBYzMjU0BTIWFRQGIyImNTQ2FyIGFRQWMzI1NMNKTElNR0tGAhX+dE0BjP6EJiMjJk0BaElNSU1HS0ZMJiMjJk0C1HVqand3amp1Cv02Aso0UVBQUqKh4HVqand3amp1P1BQUVGioAAAAwA1//YC2gLVAB8AKwA1AAABMhYVFAYHFzY2NzMGBgcXIycGBiMiJjU0NjcmJjU0NhciBhUUFhc2NjU0JgMGBhUUFjMyNjcBMFBdUT7BGiELWRAwJpJ3Vy90U2d6U0cgN2NSKjUmJDszMFI2PUo+QFwfAtVRST9YJLofUS9AbimOVCo0Zl5NXSgkUjdKUkgsJyQ9JSI9KCQu/sggQjY3QiodAAABAEEByACgAsoAAwAAEwMjA6AUNxQCyv7+AQIAAQAo/2IBDgLKAA0AABM0NjczBgYVFBYXIyYmKEdMU0ZHR0VSTEcBEnrjW17id3TfXljfAAEAHv9iAQQCygANAAABFAYHIzY2NTQmJzMWFgEER0xSRUdHRlNMRwESed9YXt90d+JeW+MAAAEAKQE2AfwC+AAOAAABBzcXBxcHJwcnNyc3FycBQhTADrh3VlVNWXW2Dr4VAvjANlwPni+vry+eD1w2wAAAAQAyAG8CCAJTAAsAAAEzFSMVIzUjNTM1MwFBx8dIx8dIAYRHzs5HzwAAAQAp/38AwAB0AAgAADcGBgcjNjY3M8ANMRhBDh0HXmk1fzY5iDQAAAEAKADlARoBMwADAAA3NTMVKPLlTk4AAAEASP/yAMQAeQALAAA3NDYzMhYVFAYjIiZIJBkaJSUaGSQ2JR4eJSQgIAAAAQAKAAABagLKAAMAAAEBIwEBav72VgEKAsr9NgLKAAACADH/9gILAtUADQAZAAABFAYGIyImNTQ2NjMyFgUUFjMyNjU0JiMiBgILMGhWeXMvaFV4dv5+Q1FQRUVQUUMBZnOlWMOtdKRXwa6TkpGUkpKSAAABAFkAAAFjAsoADAAAISMRNDY3BgYHByc3MwFjVgICEBoUTC7BSQHzKzQcEBYRPjuWAAEAMAAAAggC1AAbAAAhITU3PgI1NCYjIgYHJzY2MzIWFRQGBgcHFSECCP4ouzZKJkY4NE8pLyptRGR0LlI3lQFpSb02VFEwOz0kIDsjMWVZOGJfNpMEAAABAC3/9gIDAtQAKgAAARQGBxUWFhUUBgYjIiYnNRYWMzI2NTQmIyM1MzI2NTQmIyIGByc2NjMyFgHtUERWVDp5XzhgLC1oMGBVaV9FRlhbRjw6UigsJnFIcG0CI0hVDgQKWEc+YTYRFlIWGUtCQztLSj00OSIaPB4sZAAAAgAVAAACKALOAAoAFAAAJSMVIzUhNQEzETMnNDY3IwYGBwMhAihoVf6qAVBbaL0EAQQIGAvWAQCioqJLAeH+I+E0SSETLA/+zwABAD//9gIDAsoAHgAAATIWFRQGIyImJzUWFjMyNjU0JiMiBgcnEyEVIQc2NgETboKNfjdhISRnL09hVl0cSBYsGwFm/uUREToBtm5kb38UE1MWGUtPRksKBRwBUVDPAwgAAAIAN//2Ag0C1AAeACwAABM0PgIzMhYXFSYmIyIOAgczNjYzMhYVFAYjIiYmFzI2NTQmIyIGBhUUFhY3G0eAZRUzEBItF0VcNRgDBhdSQF1ye2hEbkHyP05FRS9GJyJEATFNlXlIBAVLBgYuUGg7IzFxaHCARIyGUVVEUCc8ICtVNwABACwAAAILAsoABgAAMwEhNSEVAYgBJf5/Ad/+3gJ6UET9egADADH/9gIKAtQAGwAoADUAAAEyFhUUBgYHHgIVFAYjIiY1NDY2NyYmNTQ2NhciBhUUFhYXNjY1NCYDFBYzMjY1NCYnJwYGAR1eeCU+JSxIK39rc3wpRCc0SThgPDdHIzwkNEdGz0pNSU1SRBBCRQLUWFMrQDETFTVGMVppZVsxSDQSHlVCN0soRzUyJTIjEBY+NjI1/ig0RUU3NEUaBhxJAAACADL/9gIIAtQAHgAsAAABFA4CIyImJzUWMzI+AjcjBgYjIiY1NDY2MzIWFiciBhUUFjMyNjY1NCYmAggbR4FlFDURJzFGWzYYAgYWU0FccTlmRURuQPI+T0NGMEYnIkQBmU2VeUgFBUsNLk9pOiIxcWdLbDpFi4ZSVEVPJzwgK1Q4AAACAEj/8gDEAiYACwAXAAATNDYzMhYVFAYjIiYRNDYzMhYVFAYjIiZIJBkaJSUaGSQkGRolJRoZJAHiJh4eJiQgIP54JR4eJSQgIAAAAgAf/38AwgImAAsAFQAAEzQ2MzIWFRQGIyImEwYGByM+AjczRiQZGiUlGhkkcQ0xGEIKExEFXgHiJh4eJiQgIP6rNIE1JldVIwABADIAdAIJAmAABgAAJSU1JRUFBQIJ/ikB1/6HAXl0zzLrTrKeAAIAOADZAgIB5wADAAcAABM1IRUFNSEVOAHK/jYBygGgR0fHR0cAAQAyAHQCCQJgAAYAADclJTUFFQUyAXn+hwHX/inCnbNO6zLPAAACAAz/8gGYAtQAHwArAAA3NDY2Nz4CNTQmIyIGByc2NjMyFhUUBgYHDgIVFSMHNDYzMhYVFAYjIiaMDyUgJysSPjsxTCMfKGE8X2gdNSQhIwxGFyMbGSQkGRsj5CY3MhshLCoeMDQZEUYVHF5RLT81HhwqKR0RkyUeHiUkICAAAAIAOv+nA0kCygA/AE0AAAEUDgIjIiYnIwYGIyImNTQ2NjMyFhcHBhQVFBYzMjY2NTQmJiMiBgYVFBYzMjY3FQYGIyImJjU0PgIzMhYWBRQWMzI2NzcmJiMiBgYDSRUsQCwuNQYFEkY1TFM0X0EsVRgKASUZHysXS4NTcp1RnJM9bysra0F2qFk6bp1jaKJd/gczKzgxBAYNKBUxPBoBZS5YRys1IiUyZlRCZToPCcsSDwM0IjNVM12BRF6lapSeGxBEEhdYpXRdn3VBVqCvQDpUQ30EBjBLAAIAAAAAAn4CzQAHABEAACEnIQcjATMBAS4CJwYGBwczAiFW/uVVWwEXUQEW/uIDDg0EBxIGUeLd3QLN/TMCBQgqLQwfOxHYAAMAYQAAAlQCygAQABkAIgAAATIWFRQGBxUeAhUUBiMjERMyNjU0JiMjFRURMzI2NTQmIwEtholGQi1JKoVz+95cRFNbdpBfSk1jAspPYj9TDAUHJkY4YWoCyv7QOzo7M+NL/v1KPDhFAAABAD3/9gJZAtQAGgAAASIGFRQWMzI2NxUGBiMiJiY1NDY2MzIXByYmAZNzhHt7L1QoKFU7bZJJT5pucVQkIVEChZqGhZsQDE4PDlqmcGylXSpMDxgAAAIAYQAAAp0CygAJABEAAAEUBiMjETMyFhYHNCYjIxEzIAKdxbDH3GyeVl+NgXVhASIBbLW3AspQm3aPhf3QAAABAGEAAAHwAsoACwAAISERIRUhFSEVIRUhAfD+cQGP/ssBI/7dATUCyk/fTv8AAQBhAAAB8ALKAAkAADMjESEVIRUhFSG7WgGP/ssBIv7eAspP/U8AAAEAPf/2Ao4C1AAgAAABMxEGBiMiJiY1NDY2MzIWFwcmJiMiBhUUFhYzMjY3NSMBl/c6dktvmE9YpXU8ay4iJl8zgI83dmAvQhudAXn+ohMSWaVxcKRbFhROERiahlWDSQoH1AABAGEAAAKDAsoACwAAISMRIREjETMRIREzAoNa/pJaWgFuWgFN/rMCyv7SAS4AAQAoAAABKgLKAAsAACEhNTcRJzUhFQcRFwEq/v5UVAECVFQ0EwI7FDQ0FP3FEwAAAf+y/0IAtgLKABAAAAciJic1FhYzMjY2NREzERQGBBgkDhAkFBktHFpmvgcGTAQGFDItAsb9QWdiAAEAYQAAAmsCygAOAAAhIwMHESMRMxE2Njc3MwECa2r9SVpaHj4fwWn+5QFVQP7rAsr+oCJEItj+yQABAGEAAAHzAsoABQAAMxEzESEVYVoBOALK/YZQAAABAGEAAAMqAsoAFQAAIQMjFhYVESMRMxMzEzMRIxE0NjcjAwGc6wQDBFOF3ATghFkFAgTuAnIfaTn+TwLK/bcCSf02Abc0ZiD9jwAAAQBhAAAClwLKABIAACEjASMWFhURIxEzATMuAjURMwKXaf6CBAIGU2gBfQQBAwNUAlEjaDf+cQLK/bEQQEwgAZMAAgA9//YC0ALVAA8AGwAAARQGBiMiJiY1NDY2MzIWFgUUFjMyNjU0JiMiBgLQS5Jsb5NISJNwa5JL/cxyeXpwcHl5cwFmb6VcXKZvbqRcW6Vvh5ubh4eZmQAAAgBhAAACKgLKAAsAFAAAATIWFRQGBiMjESMRFyMRMzI2NTQmAR6MgDV9a1JatVtIZmRYAspuZDtnQP7qAspN/uZCT0VEAAIAPf9WAtAC1QAUACAAAAEUBgcXIyciBiMiJiY1NDY2MzIWFgUUFjMyNjU0JiMiBgLQaWergYoGDQZvk0hIk3Brkkv9zHJ5enBweXlzAWaDuCOyoQFcpm9upFxbpW+Hm5uHh5mZAAIAYQAAAl8CygAOABcAAAEyFhUUBgYHEyMDIxEjERcjETMyNjU0JgEmhX8qQSTEaa2OWsBma1dQVALKZWY5TC0N/sABJ/7ZAspO/vdFQ0Y7AAABADP/9gH2AtQAKQAAJRQGIyImJzUWFjMyNjU0JiYnJiY1NDY2MzIWFwcmJiMiBhUUFhYXHgIB9op1PGYiJGs5UFEeSUFbXTpnQztiKBwlVy9DRB5EOj9XLb9fahIQVhAaPjUjMCkXIWBTOVEsFhJNEBY5LyQwJhYXNUoAAQAKAAACIQLKAAcAACEjESM1IRUjAUNa3wIX3gJ7T08AAAEAWv/2AoACygASAAAlFAYGIyImNREzERQWMzI2NREzAoA8e1+Fi1pdXmFXWfxKd0WRdwHM/jFXYGdRAc4AAQAAAAACWALKAAwAAAEDIwMzExYWFzY2NxMCWP9a/16hEBYHBxYQoALK/TYCyv42LE0jI04tAcgAAAEADAAAA5UCygAfAAABAyMDLgInBgYHAyMDMxMWFhc2NjcTMxMWFhc2NjcTA5W+W4sIEAoCARMOh1u9Xm8MEQUFFA1+XYMOFAUFEgxuAsr9NgHUHTotCQ1VLv4vAsr+TC5WJidcLAGv/k4uWyMlVy8BswAAAQAEAAACRgLKAAsAACEjAwMjEwMzExMzAwJGZr3AX+3eZK+wX90BNv7KAXQBVv7oARj+rAAAAQAAAAACNgLKAAgAAAETMwMRIxEDMwEbumHuWu5iAWsBX/5L/usBEQG5AAABACYAAAIVAsoACQAAISE1ASE1IRUBIQIV/hEBeP6UAdn+iAGCRAI2UET9ygAAAQBQ/2IBMALKAAcAAAUjETMVIxEzATDg4IqKngNoSP0oAAEACgAAAWsCygADAAATASMBYAELV/72Asr9NgLKAAEAGf9iAPkCygAHAAAXMxEjNTMRIxmKiuDgVgLYSPyYAAABACYBCwIWAs8ABgAAExMzEyMDAybUMupOtKABCwHE/jwBZ/6ZAAH//v9mAb7/pgADAAAFITUhAb7+QAHAmkAAAQAoAl4A8QL+AAsAABMeAhcVIy4CJzWRCyElDzsXOjEMAv4WNzQTDBI5ORIKAAIALv/2AeACIQAbACYAAAEyFhURIycjBgYjIiY1NDY3NzU0JiMiBgcnNjYTBgYVFBYzMjY1NQEgYl5AEQQjTURJYH6DWzo1KkwhGyNgTmRNNytEWgIhVl7+k0wsKk1SUFcEAyBDNBkQQhMb/uIEODMtKktOMAACAFX/9gIwAvgAFQAhAAATFAYHMzY2MzIWFRQGIyImJyMHIxEzEyIGFRUUFjMyNjU0rQMCBRdQP2R5emM/UBcHEj9Yl1VCQVhIRwI/IjsRIi6LioqMLiBEAvj+4GJnBGNpamTLAAABADf/9gG/AiIAGgAABSImJjU0NjYzMhYXByYmIyIVFBYzMjY3FQYGASxHbz9CcUgpTBgbGEAcnk1MLEMcG0EKOnpfY3w6EQxJCRDLYWcSDU4ODwACADf/9gISAvgAFQAiAAAFIiY1NDYzMhYXMyYmNTUzESMnIwYGJzI2NTU0JiMiBhUUFgETZHh5ZD5PGQYBBVhHDQQYUDFVRUJZR0dHCouKio0uIQ0zD9b9CEgiMEldXhBka3FfYGoAAAIAN//2AgECIgAXAB4AAAEyFhYVFSEWFjMyNjcVBgYjIiYmNTQ2NhciBgchJiYBJEVjNf6RAllQM08qKVA3THVBO2tGP0kHAREBPgIiPG1JNVtfExJNEhE+e1lYfkRIUUhEVQABAA8AAAGDAv0AFwAAASMRIxEjNTc1NDYzMhYXByYmIyIGFRUzAUyHWF5eXFIgNRMXECoWLCuHAdT+LAHUKR4faFsLB0UFCjs/IwAAAgA3/xACEgIiAB4AKwAAATIWFzM3MxEUBiMiJzUWMzI2NTU0NjcjBiMiJjU0NhciBhUUFjMyNjU1NCYBEzVVHgUMRnV7dktPd0VPAgEENnBodXVzQ0pJRlFKTAIiKClH/d9zdCJRKlFGFQwtCVGSg4CXSmtjY2lXYRVuXwAAAQBVAAACGQL4ABUAABMUBzM2NjMyFhURIxE0IyIGFREjETOtBQYaWTRiYld4WkNYWAIZKCMpKl1n/qMBV4FlXv7rAvgAAAIATgAAALUC4QALAA8AABMyFhUUBiMiJjU0NhcRIxGCFB8fFBYeHkFYAuEbHRwcHBwdG8n96AIYAAAC/8n/EAC1AuEACwAbAAATNDYzMhYVFAYjIiYDIiYnNRYWMzI2NREzERQGTh4WFB8fFBYeOBkmDg8gEyAqWEgCqR0bGx0cHBz8gwcFRwQGIzECa/2YS1UAAQBVAAACDQL4ABMAABMUBgczPgI3NzMHEyMnBxUjETOsAwEEBhgZCatn2ehquj1XVwFrEDQTCB4fCrXl/s36NcUC+AABAFUAAACtAvgAAwAAMyMRM61YWAL4AAABAFUAAANWAiIAIQAAATIWFREjETQjIgYVESMRNCMiBhURIxEzFzM2NjMyFzM2NgKhW1pXbU5DV25RPlhHDQUZVTB+JgUbXQIiXWj+owFZf1pW/tgBWX9kXv7qAhhJKilaLiwAAQBVAAACGQIiABMAAAEyFhURIxE0IyIGFREjETMXMzY2AVdgYld4WURYRw0FGlwCIl1o/qMBV4FkXv7qAhhJKikAAgA3//YCJwIiAA0AGQAAARQGIyImJjU0NjMyFhYFFBYzMjY1NCYjIgYCJ4dzR29AhnNJbz/+a0tSUUxMUlJKAQ2FkkF9WYWQQXtZX29vX19sbAAAAgBV/xACMAIiABUAIwAAATIWFRQGIyImJyMWFhUVIxEzFzM2NhciBgcVFBYzMjY2NTQmAVRjeXlkPlEXBgIEWEgMBBhOMVJDAkFYMT8fRwIiiouJji8fETQT3AMISSMwSlxeEWNrNl08XG4AAgA3/xACEgIiABUAIgAABTQ2NyMGBiMiJjU0NjMyFhczNzMRIwMyNjc1NCYjIgYVFBYBugIDBhdRQGF5e2I/UBgEDUZYmFNFAURXSEZHCxIwESIwi4qKjTAjSfz4AS9bXhJmaXFfX2sAAAEAVQAAAY4CIgATAAABMhYXByYmIyIGBhURIxEzFzM2NgFPDyMNCw0fDilIK1hICgQaUgIiAwNRAwQtUTb+4gIYYixAAAABADP/9gGyAiIAKQAAJRQGIyImJzUWFjMyNjU0JiYnLgI1NDYzMhYXByYmIyIGFRQWFhceAgGydGI4UR8gWy9DPBY5NTRKKG9aMVUlHiJKJzY5Gj0zM0gmlE5QEhBQEBsrJBQgIBQUKDgsREoTEUYOFCMeFh8dFBMoOQAAAQAQ//YBUwKTABgAACUyNjcVBgYjIiYmNREjNTc3MxUzFSMRFBYBCBQqDQ40GCpHLExNIzSbmy8+BwRDBwkdSEEBOCojcntE/soxLwAAAQBP//YCFQIYABMAAAERIycjBgYjIiY1ETMRFDMyNjURAhVIDQQaXDRhYll3WUUCGP3oRyonXWYBX/6ngGReARcAAQAAAAAB/AIYAA8AADMDMxMeAhczPgI3EzMDy8tecggSDgMEBA8TB3JezAIY/sQWNjERETI2FQE8/egAAQALAAEDBwIZACIAAAEmJicjBgYHAyMDMxMWFhczPgI3EzMTFhYXMzY2NxMzAyMBrw0TBQQEEg5gZJNbSgsUBAQECw4HX2BcCxUEBAMVDEtalWcBLylPFhZPKv7TAhj+4itYHREyNxYBLv7SIlAdGVguAR796AAAAQASAAAB/wIYAAsAABMDMxc3MwMTIycHI9S5ZIqJY7nDZJKUYwESAQbKyv76/u7W1gABAAH/EAH+AhgAGgAAEzMTFhYXMzY2NxMzAwYGIyImJzUWFjMyNjc3AV50DxgGBAYaDm1f5xxZThgkDQsfES45EBwCGP7PKEkhGVEpATD9nkxaBQNGAgQ0K0cAAAEAJwAAAa8CGAAJAAAhITUBITUhFQEhAa/+eAEg/vEBcP7kASM6AZpEQv5uAAABABz/YgFcAsoAHQAABSYmNTU0JiM1NjY1NTQ2MxUGBhUVFAcVFhUVFBYXAVxcaj87Oz9uWDQ7bW06NZ4BTlCTMytJASoylFBOSAEsMZBnEwYTZ5MxKwEAAQDv/w8BOAL4AAMAABMzESPvSUkC+PwXAAABACD/YgFgAsoAHQAAFzY2NTU0NzUmNTU0Jic1FhYVFRQWMxUGBhUVFAYjIDQ7bW06NVxqPzs7P25YVgIrMZFnEwYTZ5IxKwFIAU5QkjMrSQEqMpVPTwAAAQAyAR8CCQGiABcAAAEmJiMiBgc1NjMyFhcWFjMyNjcVBiMiJgENJC8WHD4YMEgdOS4kLxUdPhgxRxw7AT8QCyIZTjUMFBALIhlNNg0AAgBI/0oAxAIiAAsADwAAExQGIyImNTQ2MzIWBzMTI8QkGhklJRkaJFw6GWwB3iUeHiUkICC4/gAAAAEAW//2AeUC1AAhAAABFhYXByYmIyIGFRQWMzI2NxUGBgcVIzUuAjU0NjY3NTMBYSZFGRoaQhtSTU9MLEEfGzonQztXMDBYOkQChAERC0kKEGVoaF8RDU0NDwJhZAk8cllbdD4JVAAAAQAgAAACFwLTACAAAAEyFhcHJiYjIgYVFTMVIxUUBgchFSE1NjY1NSM1MzU0NgFON1giHx5JKTk8zMwqGgGA/gkrOGBgbwLTGBFGDhg7QotCaD07EFBKC0BCaUKUWWQAAgA7AIAB/wJCACEAMQAAEzQ2Nyc3FzY2MzIWFzcXBxYWFRQHFwcnBgYjIicHJzcmJjcUFhYzMjY2NTQmJiMiBgZaExBCMUIXOh8fNxhDMEAPFCM/L0MXOB9AMEIwQRATQyI7JCU6IyM6JSQ7IgFhHjkXRC9AERISEUAvQxc5Hz8xQi9AEBIjQC9CFzkfJDojIzokJTsjIzsAAAEADgAAAiwCygAWAAABEzMDMxUjFTMVIxUjNSM1MzUjNTMDMwEds1zJfJeXl1aXl5d6x10BbQFd/olAUkCBgUBSQAF3AAACAO//DwE4AvgAAwAHAAATMxEjFTMRI+9JSUlJAvj+g+/+gwACADv/+wG/Av0AMwBBAAATNDY3JiY1NDYzMhYXByYmIyIGFRQWFxYWFRQGBxYWFRQGIyImJzUWFjMyNjU0JiYnLgI3FBYXFzY2NTQmJicGBkMwHyQoZl84TiUbIkQwPDE4TE1WLh0jJ3NnN1IgIF4vSjgTNzc0SydLP1AWFykbRD4cLAGLMj0PFDcoPEUTD0MOEx8cHCccHEg8M0EREzUmRUwREEsPGiscExwfFBQqOjYlMx4IDisiGSglEwcuAAACAJUCdwGuAtoACwAXAAATNDYzMhYVFAYjIiY3NDYzMhYVFAYjIiaVHBMTHBwTExy8GxMTHBwTExsCqRoXFxoZGRkZGhcXGhkZGQAAAwAx//YDDwLUABMAJgA/AAAFIi4CNTQ+AjMyHgIVFA4CJzI+AjU0LgIjIgYGFRQeAjciJjU0NjYzMhcHJiMiBhUUFjMyNjcVBgYBoFCGYzY2Y4ZQTIVlOTZjhlBAcFYwLlNxRFqNUC5TclNjYi5aQUE6HTIrO0E5Qhc5GRgyCjZjhlBQhmM2NmOGUFCGYzY1LlVyRUFyVjFRjVxBclYxWntlQWU5Hj0aVEpMUw0KQAoOAAIAIAF/ATQC0gAZACQAABMyFhUVIycGBiMiJjU0Nzc1NCYjIgYHJzY2FwYGFRQWMzI2NTWxQUIvDBQ4Ji84njgqHRwyFxYaQTc8Kh0ZMy0C0jY73CoVGzEyYwYCFiEaDwsxDRC0Ah8bGRcvKBcAAgAoADgB1gHXAAYADQAAEzcXBxcHJzc3FwcXBycoqD+MjD+oxqo+jIw+qgEOySSrqyXJDckkq6slyQAAAQAyAIACCAGEAAUAAAERIzUhNQIIR/5xAYT+/L1HAP//ACgA5QEaATMCBgAQAAAABAAx//YDDwLUABMAJgA0AD0AAAUiLgI1ND4CMzIeAhUUDgInMj4CNTQuAiMiBgYVFB4CJxEzMhYVFAYHFyMnIxU3MjY1NCYjIxUBoFCGYzY2Y4ZQTIVlOTZjhlBAcFYwLlNxRFqNUC5TckWAUkwwHnRWZD4yJywoLDEKNmOGUFCGYzY2Y4ZQUIZjNjUuVXJFQXJWMVGNXEFyVjFfAbVAQS83DMKtresoHyMgigAAAf/9AvgB9wM6AAMAAAEhNSEB9/4GAfoC+EIAAAIANwGhAXUC1AALABcAABMiJjU0NjMyFhUUBicyNjU0JiMiBhUUFtZIV1ZJR1hYRjAtLy4xLi4BoVVERFZWRERVOzQqLDQ0LCo0AAACADIAAAIJAlYACwAPAAABMxUjFSM1IzUzNTMBNSEVAUHHx0jHx0j+8QHXAYdHzs5Hz/2qR0cAAAEAGAGgATMDVQAZAAABITU3PgI1NCYjIgYHJzY2MzIWFRQGBwczATL+5nMpKQ8lHh4xGiMdRStASTs4UcMBoDZwJzEnFiAgFxQuGR4/NzFONU0AAAEAEQGYAUEDVQAoAAATMhYVFAYHFRYWFRQGIyImJzUWMzI2NTQmIyM1MzI2NTQmIyIGByc2NqVHSCseJy9UWSVAHkY+NDA6NDk5Mi8pHR81GyQfRQNVPjAoNAoDBzMpOkkNDz8iKSMkITcnHyAdFREuFxoAAQAoAl4A8QL+AAsAABMOAgcjNT4CNzPxDDI5GDoPIyILagL0Ejk5EgwTNDcWAAEAVf8QAhoCGAAZAAABESMnIwYGIyImJyMWFhUVIxEzERQzMjY1EQIaRw4FGVA4JzgUBAIDWFh4WUQCGP3oSCgqGRQSPCmcAwj+pn9kXgEXAAABADf/gQIlAvgAEgAABSMRIxEjEQYGIyImJjU0NjYzIQIlOmY6DycRPlwzN2RBARJ/Az/8wQGQBAUubFtgbS7//wBIAR0AxAGkAgcAEQAAASsAAQAO/xAA1AAAABQAABcUBiMiJzUWFjMyNjU0Jic3MwcWFtRKSiASCR4OJCY1Jis6GiQzizA1BTcCAxMZGhgFVjUIKAABACUBoADwA0wADAAAExEjETQ2NwYGBwcnN/BHAwEKGA02I4IDTP5UARQaKhUJFQknMVwAAgAgAX8BWQLSAAsAFwAAARQGIyImNTQ2MzIWBxQWMzI2NTQmIyIGAVlWSENYVElHVfosMTEsLDExLAIpUVlXU1JXVlM6Ozs6Ozk5AAIAJwA4AdUB1wAGAA0AAAEHJzcnNxcHByc3JzcXAdWqPoyMPqrHqT6MjD6pAQHJJaurJMkNySWrqyTJAAQAIgAAAuACygADABAAGwAkAAAzATMBAzQ2NwYGBwcnNzMRIwE1IzUTMxEzFSMVJzM1NDY3BgYHfgG0S/5MIwMBChgNNiOCSUcBssPFST09yH0CAQUgCwLK/TYCMhoqFQkVCScxXP5U/uJgNAEb/u08YJxdFTgYCzERAAADABYAAALYAsoAAwAQACoAADMBMwEDNDY3BgYHByc3MxEjATU3PgI1NCYjIgYHJzY2MzIWFRQGBwczFWABtEv+TBEDAQoYDTYjgklHASNzKSkPJR4eMRojHUUrQEk7OFHDAsr9NgIyGioVCRUJJzFc/lT+4jZwJzEnFiAgFxQuGR4/NzFONU0+AAAEAA8AAAMEAtMAKAAsADcAQAAAEyImJzUWMzI2NTQmIyM1MzI2NTQmIyIGByc2NjMyFhUUBgcVFhYVFAYDATMBITUjNRMzETMVIxUnMzU0NjcGBgeSJUAeRj40MDo0OTkyLykdHzUbJB9FLkdIKx4nL1RBAbRL/kwBh8PFST09yH0CAQUgCwEWDQ8/IikjJCE3Jx8gHRURLhcaPjAoNAoDBzMpOkn+6gLK/TZgNAEb/u08YJxdFTgYCzERAAIAGP9AAaQCIgALACsAAAEUBiMiJjU0NjMyFgcUBgYHDgIVFBYzMjY3FwYGIyImNTQ2Njc+AjU1MwE7IxsZJCQZGyMXDyQhJiwSPzoyTCIfKGE8X2gdNSQiIgxGAd4lHh4lJCAg0iU4MRwgLSoeMDQaEEYVHF5RLT81Hh0pKhwRAP//AAAAAAJ+A7ACJgAkAAAABwBDAJQAsv//AAAAAAJ+A7ACJgAkAAAABwB2AOEAsv//AAAAAAJ+A7ACJgAkAAAABwDGAG0Asv//AAAAAAJ+A5ECJgAkAAAABwDJAF8Asv//AAAAAAJ+A4wCJgAkAAAABwBqAB0Asv//AAAAAAJ+A24CJgAkAAAABwDIAKgAPQAC//8AAAM1AsoADwATAAAhITUjByMBIRUhFSEVIRUhJTMRIwM1/oz6a10BUwHj/uYBB/75ARr9tdc63d0Cyk/fTv/eAU3//wA9/xACWQLUAiYAJgAAAAcAegEFAAD//wBhAAAB8AOwAiYAKAAAAAcAQwCHALL//wBhAAAB8AOwAiYAKAAAAAcAdgDUALL//wBhAAAB8AOwAiYAKAAAAAcAxgBgALL//wBhAAAB8AOMAiYAKAAAAAcAagAQALL//wAoAAABKgOwAiYALAAAAAcAQwAAALL//wAoAAABPgOwAiYALAAAAAcAdgBNALL//wABAAABUwOwAiYALAAAAAcAxv/ZALL//wAeAAABNwOMAiYALAAAAAcAav+JALIAAgAeAAACnQLKAA0AGQAAATIWFhUUBiMjESM1MxEXIxUzFSMVMyARNCYBPWueV8Wxv0pKyG6ysloBIo4CylCbc7W3ATpOAUJN9U7tARyPhf//AGEAAAKXA5ECJgAxAAAABwDJAJ0Asv//AD3/9gLQA7ACJgAyAAAABwBDAN0Asv//AD3/9gLQA7ACJgAyAAAABwB2ASoAsv//AD3/9gLQA7ACJgAyAAAABwDGALYAsv//AD3/9gLQA5ECJgAyAAAABwDJAKgAsv//AD3/9gLQA4wCJgAyAAAABwBqAGYAsgABAEAAhAH6Aj4ACwAAARcHFwcnByc3JzcXAcgyqqkyq6c0qao0qQI+M6qqM6mpM6qpNKsAAwA9/+EC0ALqABcAIAApAAABFAYGIyInByc3JiY1NDY2MzIWFzcXBxYFFBYXASYjIgYFNCcBFhYzMjYC0EuSbHBJMD00LCxIk3A0WSUuPTNe/cwXGAE/NE55cwHVM/7AGkUqenABZm+lXC9EKEoxjFdupFwYFUIpR2OxPWQlAcMjmYeBSf46EhSbAP//AFr/9gKAA7ACJgA4AAAABwBDAMQAsv//AFr/9gKAA7ACJgA4AAAABwB2AREAsv//AFr/9gKAA7ACJgA4AAAABwDGAJ0Asv//AFr/9gKAA4wCJgA4AAAABwBqAE0Asv//AAAAAAI2A7ACJgA8AAAABwB2AL4AsgACAGEAAAIqAsoADQAWAAABFAYGIyMVIxEzFTMyFgUyNjU0JiMjEQIqNH1tUVpaYJF+/tlpYVdiWQF+PGdAmwLKfG75Q09FQ/7mAAEAVf/2AkoC/QA2AAABFA4DFRQWFhcWFhUUBiMiJic1FhYzMjY1NCYnJiY1ND4DNTQmIyIGBhURIxE0NjYzMhYCChwqKhwNJiU2PmdTL0gaGkwoNzApNT8uGykpG0c4Iz0lWDpkP2F3AmkiMycgHxINFh0ZJEs7VU4SEE8QGi4oJDIiKTsoHywhICYbKiYTLiv9uAJIQ08jSv//AC7/9gHgAv4CJgBEAAAABgBDbwD//wAu//YB4AL+AiYARAAAAAcAdgC8AAD//wAu//YB4AL+AiYARAAAAAYAxkgA//8ALv/2AeAC3wImAEQAAAAGAMk6AP//AC7/9gHgAtoCJgBEAAAABgBq+AD//wAu//YB4AMxAiYARAAAAAcAyACDAAAAAwAu//YDLQIiACwAMwA+AAABMhYWFRUhFhYzMjY3FQYGIyInBgYjIiY1NDY3NzU0JiMiBgcnNjYzMhYXNjYXIgYHMzQmBQYGFRQWMzI2NTUCW0FeM/6pAk9KMkwmKE0yjT4iXE1JYXh8Wj0zKE0hGyNkMT5RFRpUNTpDBfg5/pheSDMqP1UCIjxsSDZgWxMSTRIRcTQ9TVJQVwQDIkE0GBFCFBopLSkuSE9KRVTXBDgzLSpLTjAA//8AN/8QAb8CIgImAEYAAAAHAHoAqgAA//8AN//2AgEC/gImAEgAAAAGAENzAP//ADf/9gIBAv4CJgBIAAAABwB2AMAAAP//ADf/9gIBAv4CJgBIAAAABgDGTAD//wA3//YCAQLaAiYASAAAAAYAavwA/////wAAAMgC/gImAO4AAAAGAEPXAP//AEwAAAEVAv4CJgDuAAAABgB2JAD////YAAABKgL+AiYA7gAAAAYAxrAA////9QAAAQ4C2gImAO4AAAAHAGr/YAAAAAIAN//2AicC/QAgACwAABMWFhc3FwcWFhUUBiMiJiY1NDYzMhYXNyYmJwcnNyYmJxMiBhUUFjMyNjU0JtggQR1zJmNEV4Z0SG8/f2w1TxgEEEIqgiZwFS4Xe1RLTFNTTE4C/Q8kFUM2OUC8eo6PO21LcIAcHgI5YCZLN0AOGwz+0VlTSV9hXD5Z//8AVQAAAhkC3wImAFEAAAAGAMlWAP//ADf/9gInAv4CJgBSAAAABwBDAIUAAP//ADf/9gInAv4CJgBSAAAABwB2ANIAAP//ADf/9gInAv4CJgBSAAAABgDGXgD//wA3//YCJwLfAiYAUgAAAAYAyVAA//8AN//2AicC2gImAFIAAAAGAGoOAAADADIAeQIJAkcACwAPABsAAAEiJjU0NjMyFhUUBgU1IRUHIiY1NDYzMhYVFAYBHRchIRcXICD+/gHX7BchIRcXICABzh0gIhoaIiAdkUdHxB0gIhoaIiAdAAADADf/3wInAjYAFQAeACYAAAEUBiMiJwcnNyYmNTQ2MzIXNxcHFhYFFBYXEyYjIgYFNCcDFjMyNgInh3NJOCg6LR8hhnNJOic7LR0i/msLDdwkNFJKAToX3CI0UUwBDYWSITgnPiRlQIWQJDgmPyNjPiZBGQEyGWxfSjH+zhdv//8AT//2AhUC/gImAFgAAAAHAEMAiwAA//8AT//2AhUC/gImAFgAAAAHAHYA2AAA//8AT//2AhUC/gImAFgAAAAGAMZkAP//AE//9gIVAtoCJgBYAAAABgBqFAD//wAB/xAB/gL+AiYAXAAAAAcAdgCiAAAAAgBV/xACMAL4ABkAJgAAARQGIyImJyMeAhUVIxEzFRQGBzM2NjMyFgc0JiMiBgcVFBYzMjYCMHljP1AYBgEDAlhYAgEEGE5AY3lbRkpSRAJBWEpFAQ2Jji4gByAiC+AD6OAOLQ0iMIyIZWVcXBNja2v//wAB/xAB/gLaAiYAXAAAAAYAat4A//8AYQAAAfMCygImAC8AAAAHAMcBI/68//8AVQAAAToC+AAmAE8AAAAHAMcAq/7SAAIAPf/2A2QC1QAXACIAAAEyFyEVIRUhFSEVIRUhBgYjIiYmNTQ2NhciBhUUFjMyNxEmAYIyLgGC/uEBDP70AR/+hBYxGm+TSEeRdXt0dHo5KikC1QtP307/TwQGXKZvb6RbT5mHh5sRAiEQAAMANv/2A34CIQAhACgANAAAATIWFRUhFhYzMjY3FQYGIyImJwYGIyImJjU0NjMyFhc2NhciBgchNCYFIgYVFBYzMjY1NCYCpWV0/pwCU001TSgoTjVEaCAfZkJGbT+Dcj9kHh1fPDxGBgEFPP5CT0ZIT05ISQIhg241YFoTEk0SETg3NzhBfVmEkDg2NTlITkpFUwFmZWVpZmRoZwAAAQAoAl4BegL+ABIAABMeAhcVIyYmJwYGByM1PgI3/QwtMRM+GjgbGzYaPBMvLA0C/hY3NRMLEC8bGy4RCxQ0NxYAAQAoAnEAjwLhAAsAABMyFhUUBiMiJjU0NlwUHx8UFh4eAuEbHRwcHBwdGwACACgCXgEEAzEACwAXAAATIiY1NDYzMhYVFAYnMjY1NCYjIgYVFBaVMTw8MS9APzAZHyAYGCAdAl44MjI3NzEzODIeGhoeHhoaHgAAAQAoAl4BlwLfABUAABM2NjMyFhYzMjY3MwYGIyImJiMiBgcoBjkvHjUwFRcZBzIGOC8cNTEWGBgHAl47RR0cHR06RhwdHR0AAQAoAOUBzAEzAAMAADc1IRUoAaTlTk4AAQAoAOUDwAEzAAMAADc1IRUoA5jlTk4AAQAMAdUAowLKAAkAABM2NjczDgIHIwwOMBhBCRQQBV8B4DWANSZXVSMAAQAMAdUAowLKAAkAABMGBgcjPgI3M6MNMRhBChMQBV4CvzSBNSZXVSP//wAf/38AtgB0AAcAzQAT/aoAAgAMAdUBWwLKAAgAEQAAAQYGByMnNjY3IwYGByMnNjY3AVsOHAhfBw4wGXgOHAheBg4vGQLKOoc0CzV/NjqHNAs1fzYAAAIADAHVAVsCygAJABMAAAEGBgcjPgI3MwcGBgcjPgI3MwFbDTEYQgoTEQVesg0xGEAKEhAFXgK/NYA1JldVIws1gDUmV1Uj//8AH/9/AW4AdAAHANAAE/2qAAEATQDxASsB6QALAAATNDYzMhYVFAYjIiZNQC8vQEAvL0ABbUQ4OERCOjr//wBI//ICzwB5ACYAEQAAACcAEQEGAAAABwARAgsAAAABACcByAECAsoAAwAAEzMDI6haoToCyv7+//8AJwHIAbICygAnANQAsAAAAAYA1AAAAAEAKAA4AQ8B1wAGAAATNxcHFwcnKKg/jIw/qAEOySSrqyXJAAEAJwA4AQ4B1wAGAAATFxUHJzcnZampPoyMAdfJDcklq6sAAAH/QQAAAUACygADAAABASMBAUD+TEsBtALK/TYCygAAAQAX//YCLwLTADAAAAEyFhcHJiYjIgczFSMGFBUUFBczFSMWFjMyNjcVBgYjIiYnIzUzJjQ1NDY1IzUzNjYBfDJYKSUcSyeYJfT7AQHd1RFhUidPHx9LMHmJFlBIAQFITxOMAtMWGEgPGr9BChIKCRULQVVdEw1ODROKdkEMEA0LFQZBe5EAAAIAEQFqAr0CygAUABwAAAERMxMTMxEjNTQ2NyMDIwMjFhYVFSERIzUhFSMRAUVeXmFbQAIBBGU1YAQBAv71ZQEKZgFqAWD+8QEP/qDMCC8M/vEBDxAoBtEBKjY2/tYAAAIACgGgAVUDTwAKABMAAAEjFSM1IzUTMxEzJzQ2NwYGBwczAVU9S8PFST2IAgEFIAtQfQIAYGA0ARv+7V0VOBgLMRF1AAABAB4BlwFAA0wAHgAAARUjBzY2MzIWFRQGIyImJzUWFjMyNjU0JiMiBgcnNwEruQkMHRFDWlRSIEYWG0UaLTU1MBolDx8QA0w3bQIEREBGTQ0NQxATKCsmKggEFNAAAQAcAaABQwNMAAYAABMTIzUhFQNPqt0BJ6oBoAFwPDH+hQAAAwAZAZgBRQNUABgAJAAxAAATMhYVFAYHFhYVFAYjIiY1NDY3JiY1NDY2FyIGFRQWFzY2NTQmBwYGFRQWMzI2NTQmJ7A3UCoeJy9TQklOLSAfISY/JCAkKB4dJSQvISIoKSooLSYDVDU3JTAQEDcpOENAOCk2ERQrJiQxGjcdGhoiDAshHBoduBAoHRwkJBwdJg0AAAMAKf9kA74C+AADAB8AKwAACQMFNDY3NjY1NCYjIgYHFzY2MzIWFRQGBwYGFRUzBxQWMzI2NTQmIyIGAfMBy/41/jYB6hQhKytcUCpYIighPhsfHhohJSFndCgdGykpGx0oAvj+Nv42AcpkGR4ZIz0xQ0ocFFcRFhwXHCMaHjcnHYYjHx8jJR4e//8ADAHVAKMCygIGAM0AAP//AAwB1QCjAsoCBgDMAAAAAgATAZgBSgNUAAsAFQAAEyImNTQ2MzIWFRQGJzI1NCMiBhUUFq5NTkpRTU9JU1RUKycnAZhzbGpzcmtqdT+gn09RT1AAAAIAFAGYAUwDVAAcACkAABMyFhcVJiYjIgYGBzM2NjMyFhUUBiMiJjU0PgIXIgYVFBYWMzI2NTQm7A4jCwsiEzY+GwMEDjYpO0pSRURdEi9UDSsyFCgeJi8pA1QEAzsEBSlGKhUdRkBGUF9hL1pIK9ctGhgvHi0uJisAAgARAZgBSQNWABsAJwAAEzIWFRQOAiMiJzUWFjMyNjY3IwYGIyImNTQ2FyIGFRQWMzI2NTQmqERdEi1UQiUaCyAYNzwbAgUNMyhASlJFJC8nKiszLQNWXGMvW0ksBzwEBixHKBMfSEBBUzksLCYuLRoqO///AA8AAALbAv0AJgBJAAAABwBJAVgAAP//AA8AAAINAv0AJgBJAAAABwBMAVgAAP//AA8AAAIFAv0AJgBJAAAABwBPAVgAAP//AA8AAANlAv0AJgBJAAAAJwBJAVgAAAAHAEwCsAAA//8ADwAAA10C/QAmAEkAAAAnAEkBWAAAAAcATwKwAAAAAQBVAAAArQIYAAMAADMjETOtWFgCGAAAAgA3//YCEQLVAA0AGQAAARQGBiMiJjU0NjYzMhYFFBYzMjY1NCYjIgYCETBoVnlzL2hVeHb+fkNRUEVFUFFDAWZzpVjDrXSkV8Guk5KRlJKSkgAAAQAZAAABIwLKAAwAABM0NjcGBgcHJzczESPNAgIQGhRMLsFJVgHzKzQcEBYRPjuW/TYAAAEAJgAAAf4C1AAbAAAzNTc+AjU0JiMiBgcnNjYzMhYVFAYGBwcVIRUmuzZKJkY4NE8pLyptRGR0LlI3lQFpSb02VFEwOz0kIDsjMWVZOGJfNpMEUAAAAQAt//YCAwLUACoAAAEUBgcVFhYVFAYGIyImJzUWFjMyNjU0JiMjNTMyNjU0JiMiBgcnNjYzMhYB7VBEVlQ6eV84YCwtaDBgVWlfRUZYW0Y8OlIoLCZxSHBtAiNIVQ4EClhHPmE2ERZSFhlLQkM7S0o9NDkiGjweLGQAAAIAFQAAAigCzgAKABQAACE1ITUBMxEzFSMVAzQ2NyMGBgcDIQFr/qoBUFtoaFUCAgQKIAvLAQCiSwHh/iNPogHSNE0ZEzIP/tkAAQA///YCAwLKAB4AAAEyFhUUBiMiJic1FhYzMjY1NCYjIgYHJxMhFSEHNjYBE26CjX43YSEkZy9PYVZdHEgWLBsBZv7lERE6AbZuZG9/FBNTFhlLT0ZLCgUcAVFQzwMIAAACADf/9gINAtQAHgAsAAATND4CMzIWFxUmJiMiDgIHMzY2MzIWFRQGIyImJhcyNjU0JiMiBgYVFBYWNxtHgGUVMxASLRdFXDUYAwYXUkBdcntoRG5B8j9ORUUvRiciRAExTZV5SAQFSwYGLlBoOyMxcWhwgESMhlFVRFAnPCArVTcAAQAIAAAB5wLKAAYAADMBITUhFQFkASX+fwHf/t4CelBE/XoAAwA6//YCEwLUABsAKAA1AAAFIiY1NDY2NyYmNTQ2NjMyFhUUBgYHHgIVFAYDNjY1NCYjIgYVFBYWEzI2NTQmJycGBhUUFgEpc3wpRCc0SThgPV54JT4lLEgrf2o0R0Y6N0cjPCFJTVJEEEJFSgplWzFINBIeVUI3SyhYUytAMRMVNUYxWmkBphY+NjI1NTIlMiP+kEU3NEUaBhxJNzRFAAIAMv/2AggC1AAeACwAAAEUDgIjIiYnNRYzMj4CNyMGBiMiJjU0NjYzMhYWJyIGFRQWMzI2NjU0JiYCCBtHgWUUNREnMUZbNhgCBhZTQVxxOWZFRG5A8j5PQ0YwRiciRAGZTZV5SAUFSw0uT2k6IjFxZ0tsOkWLhlJURE8mPCArVDgA//8AE//4AUoBtAIHAOYAAP5g//8AJQAAAPABrAIHAHsAAP5g//8AGAAAATMBtQIHAHQAAP5g//8AEf/4AUEBtQIHAHUAAP5g//8ACgAAAVUBrwIHANsAAP5g//8AHv/3AUABrAIHANwAAP5g//8AFP/4AUwBtAIHAOcAAP5g//8AHAAAAUMBrAIHAN0AAP5g//8AGf/4AUUBtAIHAN4AAP5g//8AEf/4AUkBtgIHAOgAAP5g//8AEwEWAUoC0gIHAOYAAP9+//8AJQEeAPACygIHAHsAAP9+//8AGAEeATMC0wIHAHQAAP9+//8AEQEWAUEC0wIHAHUAAP9+//8ACgEeAVUCzQIHANsAAP9+//8AHgEVAUACygIHANwAAP9+//8AFAEWAUwC0gIHAOcAAP9+//8AHAEeAUMCygIHAN0AAP9+//8AGQEWAUUC0gIHAN4AAP9+//8AEQEWAUkC1AIHAOgAAP9+//8AUQHkAOoC2QIGATsAAAACAJP/8gEPAsoAAwAPAAA3AzMDBzQ2MzIWFRQGIyImtRlrGVskGhklJRkaJMkCAf3/kyUeHiUkICAAAgBzAdcBkQLZAAMABwAAEwMzAzMDMwOMGW8ZcxluGQHXAQL+/gEC/v4AAgAiAAACawJ4ABsAHwAANyM1MzcjNTM3MwczNzMHMxUjBzMVIwcjNyMHIzc3IweffYkfhI8iRiGMIkUifosdhZIiRiOMIkX/HowdsEKYQa2tra1BmEKwsLDymJgAAAUAOf/2AwICeAALAA8AGQAlAC8AABMiJjU0NjMyFhUUBgEzASMTMjU0IyIGFRQWASImNTQ2MzIWFRQGJzI1NCMiBhUUFspHSkVMSEtGASJN/n9OEktLJiIiAc1ISUVMSUlFTUtLJiIiAQ9gVVZeXlZVYAFf/ZIBTnZ1Ojs6PP6oYVRWX19WVGFBdHY7Ozo6AAEAcwHXAOIC2QADAAATAzMDjBlvGQHXAQL+/gABAET/WwEnA0AADQAAFyYCNTQ2NzMGBhUUEhfVS0ZFTFFESUhGpWcBBYqM/WZq/oiF/v1tAAABADv/WwEeA0AADQAAFzYSNTQCJzMWEhUUBgc8REhHRlJLRkZLpWoBAIWGAQNtZ/76iov+ZQABAEkBJQIfAukADgAAEzcnNxcnMwc3FwcXBycHina3Dr8VZBXCDbl4V1ZNAVSfDl42wMA2Xg6fL6+vAAABADIAYQH1AiQACwAAEyM1MzUzFTMVIxUj7729Sb29SQEeSb29Sb0AAQAu/38AxwB0AAgAABc2NjczFwYGBy4PGwdhBw0wGYE7hjQLNX43AAEAMQEAASMBUgADAAATMxUjMfLyAVJSAAEASP/yAMQAeQALAAA3NDYzMhYVFAYjIiZIJBkaJSUaGSQ2JR4eJSQgIAAAAQAq/1oBgwNBAAMAAAEzASMBMVL++lMDQfwZAAIAMP/2AfgC1QANABkAAAUiJjU0NjYzMhYVFAYGJzI2NTQmIyIGFRQWARNzcC1kUnRxLWVTS0BAS0s+PgrDrXSkV8Guc6VYTJCUkpGRkpKSAAABAFcAAAFbAsoADAAAIRE0NjcGBgcHJzczEQEFAwEQFxRIL7tJAb4qZSERFRE7PJL9NgAAAQAvAAAB7ALUABsAADc3PgI1NCYjIgYHJzY2MzIWFRQGBgcHFSEVIS+rMUUmQDMuSyIyJ2dAXm4sTTKJAVD+Q0y6NVRSMTk+Jh06IzFmWTdiYDWSBFEAAAEAKP/2AesC1AApAAAXIiYnNRYWMzI2NTQmIyM1MzI2NTQmIyIGByc2NjMyFhUUBgcVFhYVFAblNV8pK2IuWlNkVkFBUFRDNzRQJC0lbERpbFVFVlqAChEWUxYZS0JCPEpLPDM5IRo9HitkTUhXDAMKWUdedwACAAsAAAITAs4ACgAVAAAlITUBMxEzFSMVIzU1NDY2NSMGBgcDAVX+tgFEXGhoVgMDBAcaC8mgTgHg/iNRoPGuJVFHFhM0Ef7XAAEAQP/2Ae8CygAgAAAXIiYnNR4CMzI2NTQmIyIGBycTIRUhBzY2MzIWFhUUBu4yXCAWPUIbTVdWUhpDFCwbAVH+/BMQNx9BZz2EChMUVA8VC0pPR0kJBBwBUFHNBAYvXUVwfwACADf/9gH5AtQAHwAtAAAFIiYmNTQ+AzMyFhcVJiYjIg4CBzM2NjMyFhUUBicyNjU0JiMiBgYVFBYWASBBaj4PKEZtThMxEBErFUJVMRYCBhRIOlxvdWU7SUBBLEIkIEAKRIxrPnhrUy8EBUwGBi5PaDojMHFob4FLUFVETyc7ICtUNwABACwAAAH3AsoABgAAASE1IRUBIwGc/pABy/7xXwJ5UUf9fQADADT/9gH0AtUAGwAnADMAAAUiJjU0NjcmJjU0NjYzMhYWFRQGBx4CFRQGBgM2NjU0JiMiBhUUFhMyNjU0JicGBhUUFgEUa3VROTBDOFw1N1s3STcmRSw5ZEIvQj02ND1BL0VGSU09P0EKZ1lJWxwfVUA5TCYmTDpBUhwUNUcwPFgwAagWPTUyMzMyNzn+ikI3MEckHUw2NEEAAgA0//YB9gLUAB8ALQAAFyImJzUWFjMyPgI3IwYGIyImNTQ2MzIWFhUUDgMDMjY2NTQmJiMiBhUUFr4TMBERKxVCVjAWAgYTSTpcb3VkQmk+DyhGbQEsQiQgPzA6SkEKBQRMBgYuT2g6IzByZ3CARIxrPXlrUy8BWyc8HyxTN1BVRE8AAgBV//IA0QImAAsAFwAAEyImNTQ2MzIWFRQGAyImNTQ2MzIWFRQGkxokJBoaJCQaGiQkGhokJAGeICQmHh4mJCD+VCAkJh4eJiQgAAIALP9/ANECJgALABQAABMiJjU0NjMyFhUUBhMXBgYHIzY2N5MaJCQaGiQkEQcNMBlDDxsHAZ4gJCYeHiYkIP7WCzV+NzuGNAAAAQAyAE0B9QI4AAYAABM1JRUFBRUyAcP+mQFnARwx606xnk4AAgAyALoB9QHLAAMABwAAEyEVIRUhFSEyAcP+PQHD/j0By0l/SQABADIATQH1AjgABgAANyUlNQUVBTIBZ/6ZAcP+PZuesU7rMc8AAAIAR//yAb4C1AAfACsAADc1NDY2Nz4CNTQmIyIGByc2NjMyFhUUBgYHDgIVFQc0NjMyFhUUBiMiJr4OJSAfJxI5NihKIh8oXC9baRcvIyEkDlskGhokJBoaJMoSJjcyGxsqMCIvOhkRRxQdYFYrQDYfHSkoHQmUJh4eJiQgIAAAAQBs/1oBLgNAAAcAABMzFSMRMxUjbMJycsIDQEb8pkYAAAEAKv9aAYMDQAADAAATMwEjKlIBB1IDQPwaAAABADb/WgD4A0AABwAAFzMRIzUzESM2cXHCwmADWkb8GgAAAQAdAQwCCQLPAAYAABMzEyMDAyP9MtpOpapPAs/+PQFn/pkAAf/+/2IBnf+mAAMAAAchFSECAZ/+YVpEAAABACz/WgFRA0AAHgAAEzI2NTU0NjcVBgYVFRQHFRYWFRUUFhcVJiY1NTQmIyw8P2FJKTBqNDYwKUlhPzwBcikx50tBAUgBHC7mYhYFCjoz5S4cAkgCQEvnMSkAAAEA6v9aATIDQAADAAATMxEj6khIA0D8GgAAAQA2/1oBWwNAAB0AAAEiBhUVFAYHNTY2NTU0NzUmNTU0Jic1FhYVFRQWMwFbPD5hSiovamovKkphPjwBKCkx50tAAkgCHC7lYxQFFWPmLhwBSAFBS+cxKQAAAQAyAQAB9QGFABkAABM2MzIWFhcWFjMyNjcVBiMiJiYnJiYjIgYHMjFIEyAoHiUoFRw8FzBJEyAnHyQnFxs8GAFPNQUNDRALIhlPNQUNDRALIhkAAQAoAQUBzAFXAAMAABMhFSEoAaT+XAFXUgABACgBBQPAAVcAAwAAEyEVISgDmPxoAVdSAAEAUgHkAOsC2QAIAAATJzY2NzMGBgdZBw4vGUMPGggB5As1fjc8hTQAAAEAUQHkAOoC2QAIAAATFwYGByM2NjfjBw0wGUMOHAcC2Qs1fjc7hzMAAAIAUwHkAagC2QAIABEAABMnNjY3MwYGBzMnNjY3MwYGB1oHDi8ZQw8aCFsHDi8ZQw8aCAHkCzV+NzyFNAs1fjc8hTQAAgBRAeQBpgLZAAgAEQAAARcGBgcjNjY3IxcGBgcjNjY3AZ8HDTAZQw4cB1sHDTAZQw4cBwLZCzV+NzuHMws1fjc7hzMAAAMASP/yAtwAegALABcAIwAABSImNTQ2MzIWFRQGISImNTQ2MzIWFRQGISImNTQ2MzIWFRQGAZIaJCQaGiQk/toaJCQaGiQkAf4aJCQaGiQkDiAkJh4eJiQgICQmHh4mJCAgJCYeHiYkIAABAEUAcwHjAhAACwAAAQcnNyc3FzcXBxcHARObMpqbM5udM52cMgEOmjOanDObmzKdnDIAAwAyAF8B9QIuAAsADwAbAAABIiY1NDYzMhYVFAYHIRUhFyImNTQ2MzIWFRQGARMXISEXFyEh+AHD/j3hFyEhFxchIQG0HSAiGxsiIB1NSb8dICIbGyIgHQAAAQAyAR4B9QFnAAMAABMhFSEyAcP+PQFnSQ=="), (c2) => c2.charCodeAt(0)).buffer;
  }
});
var init_chunk_5NA2TFPG = __esm({
  "../node_modules/@cf-wasm/og/dist/chunk-5NA2TFPG.js"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
  }
});
function constructGoogleFontCssUrl(family, { style = "normal", weight = 400, subset = "latin", display, text } = {}) {
  if (typeof family !== "string" || family.trim().length === 0) {
    throw new Error("Not a valid font family name was provided");
  }
  const params = {
    family: `${family.replaceAll(" ", "+")}:${style === "italic" ? "ital," : ""}wght@${style === "italic" ? "1," : ""}${weight}`
  };
  if (text) {
    params.text = encodeURIComponent(text);
  } else {
    params.subset = subset;
  }
  if (typeof display === "string") {
    params.display = display;
  }
  const cssUrl = `https://fonts.googleapis.com/css2?${Object.keys(params).map((key) => `${key}=${params[key]}`).join("&")}`;
  return cssUrl;
}
__name(constructGoogleFontCssUrl, "constructGoogleFontCssUrl");
async function loadGoogleFont(family, options = {}) {
  const cssUrl = constructGoogleFontCssUrl(family, options);
  const fromMap = FONT_CACHE_MAP.get(cssUrl);
  if (fromMap) {
    return fromMap;
  }
  const css = await googleFonts.loadCss(cssUrl);
  const fontUrl = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/)?.[1];
  if (!fontUrl) {
    throw new Error("The css does not content source for truetype font.");
  }
  const fontResponse = await cache.serve(
    fontUrl,
    () => fetch(fontUrl).then((res) => {
      if (!res.ok) {
        throw new FetchError(`Response was not successful (status: ${res.status}, statusText: ${res.statusText})`, { response: res });
      }
      return res;
    }).catch((e) => {
      throw new FetchError(`An error ocurred while fetching ${fontUrl}`, {
        cause: e,
        response: e instanceof FetchError ? e.response : void 0
      });
    })
  );
  const buffer = await fontResponse.arrayBuffer();
  FONT_CACHE_MAP.set(cssUrl, buffer);
  return buffer;
}
__name(loadGoogleFont, "loadGoogleFont");
function toCodePoint(unicodeSurrogates) {
  const r = [];
  let c2 = 0;
  let p = 0;
  let i2 = 0;
  while (i2 < unicodeSurrogates.length) {
    c2 = unicodeSurrogates.charCodeAt(i2);
    i2 += 1;
    if (p) {
      r.push((65536 + (p - 55296 << 10) + (c2 - 56320)).toString(16));
      p = 0;
    } else if (55296 <= c2 && c2 <= 56319) {
      p = c2;
    } else {
      r.push(c2.toString(16));
    }
  }
  return r.join("-");
}
__name(toCodePoint, "toCodePoint");
function getIconCode(char) {
  return toCodePoint(char.indexOf(U200D) < 0 ? char.replace(UFE0Fg, "") : char);
}
__name(getIconCode, "getIconCode");
async function loadEmoji(code, type) {
  const apiType = !type || !EMOJI_APIS[type] ? DEFAULT_EMOJI_TYPE : type;
  const api = EMOJI_APIS[apiType];
  const svgUrl = api(code);
  const fromMap = EMOJI_CACHE_MAP.get(svgUrl);
  if (fromMap) {
    return fromMap;
  }
  const response = await cache.serve(
    svgUrl,
    () => fetch(svgUrl).then((res) => {
      if (!res.ok) {
        throw new FetchError(`Response was not successful (status: \`${res.status}\`, statusText: \`${res.statusText}\`)`, { response: res });
      }
      return res;
    }).catch((e) => {
      throw new FetchError(`An error ocurred while fetching \`${svgUrl}\``, {
        cause: e,
        response: e instanceof FetchError ? e.response : void 0
      });
    })
  );
  response.headers.set("content-type", "text/xml");
  const svgCode = await response.text();
  EMOJI_CACHE_MAP.set(svgUrl, svgCode);
  return svgCode;
}
__name(loadEmoji, "loadEmoji");
function convert(input) {
  return input.split(", ").map((r) => {
    const range = r.replaceAll("U+", "");
    const [start, end] = range.split("-").map((hex) => Number.parseInt(hex, 16));
    if (typeof end !== "number" || Number.isNaN(end)) {
      return start;
    }
    return [start, end];
  });
}
__name(convert, "convert");
function checkSegmentInRange(segment, range) {
  const codePoint = segment.codePointAt(0);
  if (!codePoint) {
    return false;
  }
  return range.some((value) => {
    if (typeof value === "number") {
      return codePoint === value;
    }
    const [start, end] = value;
    return start <= codePoint && codePoint <= end;
  });
}
__name(checkSegmentInRange, "checkSegmentInRange");
async function loadSatoriAsset(languageCode, segment, emoji) {
  if (languageCode === "emoji") {
    return `data:image/svg+xml;base64,${btoa(await loadEmoji(getIconCode(segment), emoji))}`;
  }
  const codes = languageCode.split("|");
  const names = codes.map((code) => LANGUAGE_FONT_MAP[code]).filter(Boolean).flat();
  if (names.length !== 0) {
    try {
      const textByFont = await DETECTOR.detect(segment, names);
      const fonts = Object.keys(textByFont);
      const fontData = await Promise.all(
        fonts.map(
          (font) => loadGoogleFont(font, {
            text: textByFont[font],
            weight: 400
          })
        )
      );
      return fontData.map((data, index) => ({
        name: `satori_${codes[index]}_fallback_${segment}`,
        data,
        weight: 400,
        style: "normal",
        lang: codes[index] === "unknown" ? void 0 : codes[index]
      }));
    } catch (e) {
      console.warn(`(@cf-wasm/og) [ WARN ] Failed to load dynamic font for segment \`${segment}\`.
`, e);
    }
  }
  return [];
}
__name(loadSatoriAsset, "loadSatoriAsset");
async function loadDynamicAsset(languageCode, segment, emoji) {
  const key = JSON.stringify([languageCode, segment]);
  if (ASSET_CACHE_MAP.has(key)) {
    const cache2 = ASSET_CACHE_MAP.get(key);
    return cache2 ?? [];
  }
  const asset = await loadSatoriAsset(languageCode, segment, emoji);
  ASSET_CACHE_MAP.set(key, asset);
  return asset;
}
__name(loadDynamicAsset, "loadDynamicAsset");
function render(element, options = {}) {
  const promises = {};
  const renderOptions = {
    ...RENDER_DEFAULT_OPTIONS,
    ...options
  };
  const loadAdditionalAsset = /* @__PURE__ */ __name2(async (languageCode, segment) => {
    const next = /* @__PURE__ */ __name2(() => loadDynamicAsset(languageCode, segment, renderOptions?.emoji), "next");
    let result;
    if (options.loadAdditionalAsset) {
      result = await options.loadAdditionalAsset(languageCode, segment, next);
    }
    result ?? (result = await next());
    if (Array.isArray(result)) {
      return await Promise.all(
        result.map(async (asset) => ({
          ...asset,
          data: await asset.data
        }))
      );
    }
    return result;
  }, "loadAdditionalAsset");
  const getFonts = /* @__PURE__ */ __name2(async () => {
    const fallback = /* @__PURE__ */ __name2(async () => {
      const defaultFonts = [];
      const fallbackFont = await (renderOptions.defaultFont?.data ?? defaultFont.get());
      if (fallbackFont) {
        defaultFonts.push(
          new CustomFont("sans serif", fallbackFont, {
            weight: 400,
            style: "normal"
          })
        );
      } else {
        console.warn("(@cf-wasm/og) [ WARN ] No default font specified. Using 'Noto Sans' from Google Fonts as the fallback.");
        defaultFonts.push(
          new GoogleFont("Noto Sans", {
            name: "sans serif",
            weight: 400,
            style: "normal"
          })
        );
      }
      return Promise.all(
        [...defaultFonts, ...renderOptions.fonts].map(async (font) => ({
          ...font,
          data: await font.data
        }))
      ).then(
        (fonts) => (
          /**
           * An attempt to improve performance by passing cached satori font object
           *
           * @see https://github.com/vercel/satori/issues/590
           */
          fonts.map((font) => {
            const key = JSON.stringify([font.name, font.style || "", font.weight || "", font.lang || "", font.data.byteLength]);
            const fromMap = SATORI_FONT_CACHE_MAP.get(key);
            if (fromMap) {
              return fromMap;
            }
            SATORI_FONT_CACHE_MAP.set(key, font);
            return font;
          })
        )
      );
    }, "fallback");
    promises.fonts = promises.fonts?.then(null, fallback) ?? fallback();
    return promises.fonts;
  }, "getFonts");
  const asSvg = /* @__PURE__ */ __name2(async () => {
    const fallback = /* @__PURE__ */ __name2(async () => {
      const satoriFonts = await getFonts();
      const satoriOptions = {
        ...renderOptions.satoriOptions,
        width: renderOptions.width,
        height: renderOptions.height,
        debug: renderOptions.debug,
        fonts: satoriFonts,
        loadAdditionalAsset
      };
      const svg = await modules.satori.satori(element, satoriOptions);
      return {
        image: svg,
        height: satoriOptions.height,
        width: satoriOptions.width,
        type: "image/svg+xml"
      };
    }, "fallback");
    promises.svg = promises.svg?.then(null, fallback) ?? fallback();
    return promises.svg;
  }, "asSvg");
  const asPng = /* @__PURE__ */ __name2(async () => {
    const fallback = /* @__PURE__ */ __name2(async () => {
      const svg = await asSvg();
      const resvg = await modules.resvg.Resvg.async(svg.image, {
        ...renderOptions.resvgOptions,
        fitTo: {
          mode: "width",
          value: renderOptions.width
        }
      });
      const renderedImage = resvg.render();
      const result = {
        pixels: renderedImage.pixels,
        image: renderedImage.asPng(),
        width: renderedImage.width,
        height: renderedImage.height,
        type: "image/png"
      };
      renderedImage.free();
      resvg.free();
      return result;
    }, "fallback");
    promises.png = promises.png?.then(null, fallback) ?? fallback();
    return promises.png;
  }, "asPng");
  return { asSvg, asPng };
}
__name(render, "render");
function renderAsResponse(input, options) {
  const isSvg = options?.format === "svg";
  const headers = new Headers(options?.headers);
  if (!headers.has("Cache-Control")) {
    if (typeof process === "object" && process !== null && typeof process.env === "object" && process.env !== null && true) {
      headers.set("Cache-Control", "no-cache, no-store");
    } else {
      headers.set("Cache-Control", "public, immutable, no-transform, max-age=31536000");
    }
  }
  headers.set("Content-Type", isSvg ? "image/svg+xml" : "image/png");
  const init2 = {
    headers,
    status: options?.status,
    statusText: options?.statusText
  };
  if (options && typeof options === "object" && "cf" in options) {
    Object.assign(init2, { cf: options.cf });
  }
  const body = /* @__PURE__ */ __name2(async () => {
    const [element, renderOptions] = await input();
    const renderer = render(element, renderOptions);
    const { image } = isSvg ? await renderer.asSvg() : await renderer.asPng();
    return image;
  }, "body");
  const stream = /* @__PURE__ */ __name2(() => {
    return new ReadableStream({
      start(controller) {
        body().then((body2) => {
          const bytes = typeof body2 === "string" ? CONTAINER.encoder.encode(body2) : body2;
          controller.enqueue(bytes);
          controller.close();
        }).catch((e) => {
          controller.error(e);
        });
      }
    });
  }, "stream");
  return {
    body,
    stream,
    init: init2
  };
}
__name(renderAsResponse, "renderAsResponse");
var ASSET_CACHE_MAP;
var EMOJI_CACHE_MAP;
var FONT_CACHE_MAP;
var SATORI_FONT_CACHE_MAP;
var CACHE_INSTANCE_MAP;
var CACHE_INTERFACE;
var CacheUtils;
var cache;
var FetchError;
var GOOGLE_FONT_CSS_DEFAULT_USER_AGENT;
var GoogleFontsUtils;
var googleFonts;
var CustomFont;
var GoogleFont;
var DefaultFont;
var defaultFont;
var Modules;
var modules;
var EMOJI_APIS;
var U200D;
var UFE0Fg;
var DEFAULT_EMOJI_TYPE;
var LANGUAGE_FONT_MAP;
var FontDetector;
var DETECTOR;
var RENDER_DEFAULT_OPTIONS;
var Container;
var CONTAINER;
var ImageResponse;
var init_chunk_YPHVUSHP = __esm({
  "../node_modules/@cf-wasm/og/dist/chunk-YPHVUSHP.js"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    ASSET_CACHE_MAP = /* @__PURE__ */ new Map();
    EMOJI_CACHE_MAP = /* @__PURE__ */ new Map();
    FONT_CACHE_MAP = /* @__PURE__ */ new Map();
    SATORI_FONT_CACHE_MAP = /* @__PURE__ */ new Map();
    CACHE_INSTANCE_MAP = /* @__PURE__ */ new Map();
    CACHE_INTERFACE = {
      add: /* @__PURE__ */ __name2(() => Promise.resolve(), "add"),
      addAll: /* @__PURE__ */ __name2(() => Promise.resolve(), "addAll"),
      delete: /* @__PURE__ */ __name2(() => Promise.resolve(false), "delete"),
      keys: /* @__PURE__ */ __name2(() => Promise.resolve([]), "keys"),
      match: /* @__PURE__ */ __name2(() => Promise.resolve(void 0), "match"),
      matchAll: /* @__PURE__ */ __name2(() => Promise.resolve([]), "matchAll"),
      put: /* @__PURE__ */ __name2(() => Promise.resolve(), "put")
    };
    CacheUtils = class {
      static {
        __name(this, "CacheUtils");
      }
      static {
        __name2(this, "CacheUtils");
      }
      constructor() {
        this._enabled = true;
        this.store = "cf-wasm-og-cache";
        this.cacheControlHeader = "public, max-age=604800, s-maxage=43200";
      }
      /**
       * Indicates whether {@link Cache} api is supported
       * in current environment or not
       */
      get supported() {
        return typeof caches !== "undefined";
      }
      /** Enables cache */
      enable() {
        this._enabled = true;
      }
      /** Disables cache */
      disable() {
        this._enabled = false;
      }
      /**
       * Sets execution context
       *
       * Example for Cloudflare workers:
       *
       * ```ts
       * import { cache } from "@cf-wasm/og";
       *
       * export interface Env {}
       *
       * export default {
       *   fetch(req: Request, env: Env, ctx: ExecutionContext) {
       *     cache.setExecutionContext(ctx);
       *
       *     // ...
       *   }
       * }
       * ```
       */
      setExecutionContext(ctx) {
        if (typeof ctx?.waitUntil !== "function") {
          throw new TypeError("Provided object is not an execution context object.");
        }
        this._waitUntil = (promise) => ctx.waitUntil(promise);
      }
      /**
       * Opens a cache
       *
       * @param cacheName If provided, the name of cache to be opened
       *
       * @returns A promise which resolves to {@link Cache}
       */
      async open(cacheName) {
        if (typeof this.store === "object") {
          return this.store;
        }
        const name = typeof cacheName === "string" ? cacheName : this.store;
        const store = this.supported ? CACHE_INSTANCE_MAP.get(name) ?? await caches.open(name) : CACHE_INTERFACE;
        CACHE_INSTANCE_MAP.set(name, store);
        return store;
      }
      /**
       * Serve cached assets
       *
       * @param key The cache key
       * @param fallback The fallback function which provides the {@link Response} when cache key is not matched
       * @param param2 Options
       *
       * @returns A promise which resolves to {@link Response}
       */
      async serve(key, fallback, { cache: cacheStore, preserveHeaders, overwriteCacheControl = true } = {}) {
        const store = cacheStore ?? await this.open();
        let response;
        if (!this._enabled || !this.supported || !this._waitUntil) {
          const fallbackResponse = await fallback(key, store);
          if (fallbackResponse instanceof Response) {
            response = new Response(fallbackResponse.body, fallbackResponse);
          }
        } else {
          response = await store.match(key).then((res) => res?.ok ? res : void 0);
          if (!response) {
            const fallbackResponse = await fallback(key, store);
            if (fallbackResponse instanceof Response) {
              response = new Response(fallbackResponse.body, fallbackResponse);
              if (preserveHeaders !== true) {
                response.headers.forEach((value, _key) => {
                  if (preserveHeaders === false) {
                    response?.headers.delete(_key);
                  } else if (typeof preserveHeaders === "function" && !preserveHeaders(_key, value, response, store, key)) {
                    response?.headers.delete(_key);
                  } else {
                    const preservedHeaders = (Array.isArray(preserveHeaders) ? preserveHeaders : ["content-type", "cache-control"]).map(
                      (e) => e.toLowerCase()
                    );
                    if (!preservedHeaders.includes(_key.toLowerCase())) {
                      response?.headers.delete(_key);
                    }
                  }
                });
              }
              if (overwriteCacheControl === true || typeof overwriteCacheControl === "string" || !response.headers.has("Cache-Control")) {
                response.headers.set("Cache-Control", typeof overwriteCacheControl === "string" ? overwriteCacheControl : this.cacheControlHeader);
              }
              const promise = store.put(key, response.clone());
              this._waitUntil(promise);
            }
          } else {
            response = new Response(response.body, response);
          }
        }
        return response;
      }
      clearMaps() {
        ASSET_CACHE_MAP.clear();
        CACHE_INSTANCE_MAP.clear();
        EMOJI_CACHE_MAP.clear();
        FONT_CACHE_MAP.clear();
      }
    };
    cache = new CacheUtils();
    FetchError = class extends Error {
      static {
        __name(this, "FetchError");
      }
      static {
        __name2(this, "FetchError");
      }
      /**
       * Creates an instance of {@link FetchError}
       *
       * @param message The error message
       * @param options The {@link FetchErrorOptions}
       */
      constructor(message, options) {
        super(message, options);
        this.name = "FetchError";
        this.response = options?.response;
      }
    };
    GOOGLE_FONT_CSS_DEFAULT_USER_AGENT = "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1";
    GoogleFontsUtils = class {
      static {
        __name(this, "GoogleFontsUtils");
      }
      static {
        __name2(this, "GoogleFontsUtils");
      }
      constructor() {
        this._defaultCssLoader = async (cssUrl, userAgent) => {
          const cssResponse = await cache.serve(
            cssUrl,
            () => fetch(cssUrl, {
              headers: {
                "User-Agent": userAgent
              }
            }).then((res) => {
              if (!res.ok) {
                throw new FetchError(`Response was not successful (status: \`${res.status}\`, statusText: \`${res.statusText}\`)`, { response: res });
              }
              return res;
            }).catch((e) => {
              throw new FetchError(`An error ocurred while fetching \`${cssUrl}\``, {
                cause: e,
                response: e instanceof FetchError ? e.response : void 0
              });
            })
          );
          return cssResponse.text();
        };
        this._cssLoader = this._defaultCssLoader;
      }
      /**
       * Loads Google font css
       *
       * @param cssUrl The Google font css url
       * @param userAgent The user agent header to be used
       *
       * @returns On success, the css as string
       */
      async loadCss(cssUrl, userAgent = GOOGLE_FONT_CSS_DEFAULT_USER_AGENT) {
        let css = await this._cssLoader(cssUrl, userAgent);
        if (typeof css === "undefined") {
          css = await this._defaultCssLoader(cssUrl, userAgent);
        } else if (typeof css !== "string") {
          throw new Error("Google font css loader return value must resolve to string");
        }
        return css;
      }
      /**
       * Sets Google font css loader
       *
       * @param loader The {@link GoogleFontCssLoader}
       */
      setCssLoader(loader) {
        if (typeof loader !== "function") {
          throw new TypeError("Argument 1 must be a function.");
        }
        this._cssLoader = loader;
      }
    };
    googleFonts = new GoogleFontsUtils();
    __name2(constructGoogleFontCssUrl, "constructGoogleFontCssUrl");
    __name2(loadGoogleFont, "loadGoogleFont");
    CustomFont = class {
      static {
        __name(this, "CustomFont");
      }
      static {
        __name2(this, "CustomFont");
      }
      /**
       * Creates an instance of {@link CustomFont}
       *
       * @param name The name of the font (can be used for font-family css property)
       * @param input Font data as `ArrayBuffer` or a promise which resolves to `ArrayBuffer`
       * @param options
       */
      constructor(name, input, { style = "normal", weight = 400, lang } = {}) {
        this.type = "custom";
        this.name = name;
        this.style = style;
        this.weight = weight;
        this.input = input;
        this.lang = lang;
      }
      /**
       * A promise which resolves to font data as `ArrayBuffer`
       */
      get data() {
        const fallback = /* @__PURE__ */ __name2(async () => typeof this.input === "function" ? this.input() : this.input, "fallback");
        this.promise = this.promise?.then(null, fallback) ?? fallback();
        return this.promise;
      }
    };
    GoogleFont = class {
      static {
        __name(this, "GoogleFont");
      }
      static {
        __name2(this, "GoogleFont");
      }
      /**
       * Creates an instance of {@link GoogleFont}
       *
       * @param family The name of font family to load
       * @param options The {@link GoogleFontOptions}
       */
      constructor(family, { name, style = "normal", weight = 400, subset = "latin", text } = {}) {
        this.type = "google";
        this.name = name || family;
        this.style = style;
        this.weight = weight;
        this.subset = subset;
        this.family = family;
        this.text = text;
      }
      /** A promise which resolves to font data as `ArrayBuffer` */
      get data() {
        const fallback = /* @__PURE__ */ __name2(async () => loadGoogleFont(this.family, {
          style: this.style,
          weight: this.weight,
          subset: this.subset,
          text: this.text
        }), "fallback");
        this.promise = this.promise?.then(null, fallback) ?? fallback();
        return this.promise;
      }
      /**
       * Checks whether font can load buffer
       *
       * @returns On success, true otherwise the error object thrown
       */
      async canLoad() {
        try {
          await this.data;
        } catch (e) {
          return e;
        }
        return true;
      }
    };
    DefaultFont = class {
      static {
        __name(this, "DefaultFont");
      }
      static {
        __name2(this, "DefaultFont");
      }
      constructor() {
        this._shouldResolve = true;
      }
      /**
       * Sets default font for image rendering
       *
       * @param input {@link FontInput}
       */
      set(input) {
        if (!input) {
          throw new TypeError("Argument 1 type is not acceptable");
        }
        this._shouldResolve = true;
        this._input = input;
      }
      /**
       * Gets default font buffer for image rendering if it is set
       *
       * @returns A Promise which resolves to ArrayBuffer if default font is set,
       * otherwise undefined
       */
      async get() {
        let buffer;
        if (this._shouldResolve && this._input) {
          const input = typeof this._input === "function" ? await this._input() : await this._input;
          if (input instanceof Response) {
            buffer = await input.arrayBuffer();
          } else if ("data" in input) {
            buffer = await input.data;
          } else {
            buffer = input;
          }
        } else if (this._data) {
          buffer = this._data;
        }
        this._data = buffer;
        this._shouldResolve = false;
        return buffer;
      }
      /**
       * Check whether default font is set or not
       *
       * @returns true if default font is set, otherwise false
       */
      has() {
        return Boolean(this._input);
      }
    };
    defaultFont = new DefaultFont();
    Modules = class {
      static {
        __name(this, "Modules");
      }
      static {
        __name2(this, "Modules");
      }
      /** The {@link ResvgModule} */
      get resvg() {
        if (!this._resvg) {
          throw new Error("Module `resvg` is not set, set it before accessing.");
        }
        return this._resvg;
      }
      set resvg(module) {
        this._resvg = module;
      }
      /** The {@link SatoriModule} */
      get satori() {
        if (!this._satori) {
          throw new Error("Module `satori` is not set, set it before accessing.");
        }
        return this._satori;
      }
      set satori(module) {
        this._satori = module;
      }
      /** Sets modules */
      set(resvgModule, satoriModule) {
        this.resvg = resvgModule;
        this.satori = satoriModule;
      }
      /** Ensures all the modules are set */
      isUsable() {
        if (this._resvg && this._satori) {
          return true;
        }
        return false;
      }
    };
    modules = new Modules();
    EMOJI_APIS = {
      openmoji: /* @__PURE__ */ __name2((code) => `https://cdn.jsdelivr.net/npm/@svgmoji/openmoji@2.0.0/svg/${code.toUpperCase()}.svg`, "openmoji"),
      blobmoji: /* @__PURE__ */ __name2((code) => `https://cdn.jsdelivr.net/npm/@svgmoji/blob@2.0.0/svg/${code.toUpperCase()}.svg`, "blobmoji"),
      noto: /* @__PURE__ */ __name2((code) => `https://cdn.jsdelivr.net/gh/svgmoji/svgmoji/packages/svgmoji__noto/svg/${code.toUpperCase()}.svg`, "noto"),
      twemoji: /* @__PURE__ */ __name2((code) => `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${code.toLowerCase()}.svg`, "twemoji"),
      fluent: /* @__PURE__ */ __name2((code) => `https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/${code.toLowerCase()}_color.svg`, "fluent"),
      fluentFlat: /* @__PURE__ */ __name2((code) => `https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/${code.toLowerCase()}_flat.svg`, "fluentFlat")
    };
    __name2(toCodePoint, "toCodePoint");
    U200D = String.fromCharCode(8205);
    UFE0Fg = /\uFE0F/g;
    __name2(getIconCode, "getIconCode");
    DEFAULT_EMOJI_TYPE = "twemoji";
    __name2(loadEmoji, "loadEmoji");
    LANGUAGE_FONT_MAP = {
      "ja-JP": "Noto+Sans+JP",
      "ko-KR": "Noto+Sans+KR",
      "zh-CN": "Noto+Sans+SC",
      "zh-TW": "Noto+Sans+TC",
      "zh-HK": "Noto+Sans+HK",
      "th-TH": "Noto+Sans+Thai",
      "bn-IN": "Noto+Sans+Bengali",
      "ar-AR": "Noto+Sans+Arabic",
      "ta-IN": "Noto+Sans+Tamil",
      "ml-IN": "Noto+Sans+Malayalam",
      "he-IL": "Noto+Sans+Hebrew",
      "te-IN": "Noto+Sans+Telugu",
      devanagari: "Noto+Sans+Devanagari",
      kannada: "Noto+Sans+Kannada",
      symbol: ["Noto+Sans+Symbols", "Noto+Sans+Symbols+2"],
      math: "Noto+Sans+Math",
      unknown: "Noto+Sans"
    };
    __name2(convert, "convert");
    __name2(checkSegmentInRange, "checkSegmentInRange");
    FontDetector = class {
      static {
        __name(this, "FontDetector");
      }
      static {
        __name2(this, "FontDetector");
      }
      constructor() {
        this.rangesByLang = {};
      }
      addDetectors(input) {
        var _a3;
        const regex = /font-family:\s*'(.+?)';.+?unicode-range:\s*(.+?);/gms;
        const matches = input.matchAll(regex);
        for (const [, _lang, range] of matches) {
          const lang = _lang.replaceAll(" ", "+");
          (_a3 = this.rangesByLang)[lang] ?? (_a3[lang] = []);
          this.rangesByLang[lang].push(...convert(range));
        }
      }
      detectSegment(segment, fonts) {
        for (const font of fonts) {
          const range = this.rangesByLang[font];
          if (range && checkSegmentInRange(segment, range)) {
            return font;
          }
        }
        return null;
      }
      async load(fonts) {
        let params = "";
        const existingLang = Object.keys(this.rangesByLang);
        const langNeedsToLoad = fonts.filter((font) => !existingLang.includes(font));
        if (langNeedsToLoad.length === 0) {
          return;
        }
        for (const font of langNeedsToLoad) {
          params += `family=${font}&`;
        }
        params += "display=swap";
        const cssUrl = `https://fonts.googleapis.com/css2?${params}`;
        const fontFace = await googleFonts.loadCss(
          cssUrl,
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Safari/537.36"
        );
        this.addDetectors(fontFace);
      }
      async detect(text, fonts) {
        await this.load(fonts);
        const result = {};
        for (const segment of text) {
          const lang = this.detectSegment(segment, fonts);
          if (lang) {
            result[lang] = result[lang] || "";
            result[lang] += segment;
          }
        }
        return result;
      }
    };
    DETECTOR = new FontDetector();
    __name2(loadSatoriAsset, "loadSatoriAsset");
    __name2(loadDynamicAsset, "loadDynamicAsset");
    RENDER_DEFAULT_OPTIONS = {
      width: 1200,
      height: 630,
      debug: false,
      fonts: []
    };
    __name2(render, "render");
    Container = class {
      static {
        __name(this, "Container");
      }
      static {
        __name2(this, "Container");
      }
      get encoder() {
        this._encoder ?? (this._encoder = new TextEncoder());
        return this._encoder;
      }
    };
    CONTAINER = new Container();
    __name2(renderAsResponse, "renderAsResponse");
    ImageResponse = class extends Response {
      static {
        __name(this, "ImageResponse");
      }
      static {
        __name2(this, "ImageResponse");
      }
      /**
       * Creates an instance of {@link ImageResponse}
       *
       * @param element The {@link ReactNode}
       * @param options The {@link ImageResponseOptions}
       */
      constructor(element, options) {
        const { stream, init: init2 } = renderAsResponse(() => [element, options], options);
        super(stream(), init2);
      }
      static async async(element, options) {
        const { body, init: init2 } = renderAsResponse(() => [element, options], options);
        return new Response(await body(), init2);
      }
    };
  }
});
function addHeapObject(obj) {
  if (heap_next === heap.length)
    heap.push(heap.length + 1);
  const idx = heap_next;
  heap_next = heap[idx];
  heap[idx] = obj;
  return idx;
}
__name(addHeapObject, "addHeapObject");
function getObject(idx) {
  return heap[idx];
}
__name(getObject, "getObject");
function dropObject(idx) {
  if (idx < 132)
    return;
  heap[idx] = heap_next;
  heap_next = idx;
}
__name(dropObject, "dropObject");
function takeObject(idx) {
  const ret = getObject(idx);
  dropObject(idx);
  return ret;
}
__name(takeObject, "takeObject");
function getUint8Memory0() {
  if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
    cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
  }
  return cachedUint8Memory0;
}
__name(getUint8Memory0, "getUint8Memory0");
function passStringToWasm0(arg, malloc, realloc) {
  if (realloc === void 0) {
    const buf = cachedTextEncoder.encode(arg);
    const ptr2 = malloc(buf.length);
    getUint8Memory0().subarray(ptr2, ptr2 + buf.length).set(buf);
    WASM_VECTOR_LEN = buf.length;
    return ptr2;
  }
  let len = arg.length;
  let ptr = malloc(len);
  const mem = getUint8Memory0();
  let offset = 0;
  for (; offset < len; offset++) {
    const code = arg.charCodeAt(offset);
    if (code > 127)
      break;
    mem[ptr + offset] = code;
  }
  if (offset !== len) {
    if (offset !== 0) {
      arg = arg.slice(offset);
    }
    ptr = realloc(ptr, len, len = offset + arg.length * 3);
    const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
    const ret = encodeString(arg, view);
    offset += ret.written;
  }
  WASM_VECTOR_LEN = offset;
  return ptr;
}
__name(passStringToWasm0, "passStringToWasm0");
function isLikeNone(x22) {
  return x22 === void 0 || x22 === null;
}
__name(isLikeNone, "isLikeNone");
function getInt32Memory0() {
  if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
    cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
  }
  return cachedInt32Memory0;
}
__name(getInt32Memory0, "getInt32Memory0");
function getStringFromWasm0(ptr, len) {
  return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
__name(getStringFromWasm0, "getStringFromWasm0");
function _assertClass(instance, klass) {
  if (!(instance instanceof klass)) {
    throw new Error(`expected instance of ${klass.name}`);
  }
  return instance.ptr;
}
__name(_assertClass, "_assertClass");
async function load(module, imports) {
  if (typeof Response === "function" && module instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming === "function") {
      try {
        return await WebAssembly.instantiateStreaming(module, imports);
      } catch (e) {
        if (module.headers.get("Content-Type") != "application/wasm") {
          console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);
        } else {
          throw e;
        }
      }
    }
    const bytes = await module.arrayBuffer();
    return await WebAssembly.instantiate(bytes, imports);
  } else {
    const instance = await WebAssembly.instantiate(module, imports);
    if (instance instanceof WebAssembly.Instance) {
      return { instance, module };
    } else {
      return instance;
    }
  }
}
__name(load, "load");
function getImports() {
  const imports = {};
  imports.wbg = {};
  imports.wbg.__wbg_new_15d3966e9981a196 = function(arg0, arg1) {
    const ret = new Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_memory = function() {
    const ret = wasm.memory;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_buffer_cf65c07de34b9a08 = function(arg0) {
    const ret = getObject(arg0).buffer;
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_newwithbyteoffsetandlength_9fb2f11355ecadf5 = function(arg0, arg1, arg2) {
    const ret = new Uint8Array(getObject(arg0), arg1 >>> 0, arg2 >>> 0);
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
  };
  imports.wbg.__wbg_new_537b7341ce90bb31 = function(arg0) {
    const ret = new Uint8Array(getObject(arg0));
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_instanceof_Uint8Array_01cebe79ca606cca = function(arg0) {
    let result;
    try {
      result = getObject(arg0) instanceof Uint8Array;
    } catch (e) {
      result = false;
    }
    const ret = result;
    return ret;
  };
  imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
    const obj = getObject(arg1);
    const ret = typeof obj === "string" ? obj : void 0;
    var ptr0 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    var len0 = WASM_VECTOR_LEN;
    getInt32Memory0()[arg0 / 4 + 1] = len0;
    getInt32Memory0()[arg0 / 4 + 0] = ptr0;
  };
  imports.wbg.__wbg_new_b525de17f44a8943 = function() {
    const ret = new Array();
    return addHeapObject(ret);
  };
  imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
    const ret = getStringFromWasm0(arg0, arg1);
    return addHeapObject(ret);
  };
  imports.wbg.__wbg_push_49c286f04dd3bf59 = function(arg0, arg1) {
    const ret = getObject(arg0).push(getObject(arg1));
    return ret;
  };
  imports.wbg.__wbg_length_27a2afe8ab42b09f = function(arg0) {
    const ret = getObject(arg0).length;
    return ret;
  };
  imports.wbg.__wbg_set_17499e8aa4003ebd = function(arg0, arg1, arg2) {
    getObject(arg0).set(getObject(arg1), arg2 >>> 0);
  };
  imports.wbg.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
  };
  return imports;
}
__name(getImports, "getImports");
function initMemory(imports, maybe_memory) {
}
__name(initMemory, "initMemory");
function finalizeInit(instance, module) {
  wasm = instance.exports;
  init.__wbindgen_wasm_module = module;
  cachedInt32Memory0 = null;
  cachedUint8Memory0 = null;
  return wasm;
}
__name(finalizeInit, "finalizeInit");
async function init(input) {
  if (typeof input === "undefined") {
    input = new URL("index_bg.wasm", void 0);
  }
  const imports = getImports();
  if (typeof input === "string" || typeof Request === "function" && input instanceof Request || typeof URL === "function" && input instanceof URL) {
    input = fetch(input);
  }
  initMemory(imports);
  const { instance, module } = await load(await input, imports);
  return finalizeInit(instance, module);
}
__name(init, "init");
var wasm;
var heap;
var heap_next;
var WASM_VECTOR_LEN;
var cachedUint8Memory0;
var cachedTextEncoder;
var encodeString;
var cachedInt32Memory0;
var cachedTextDecoder;
var BBox;
var RenderedImage;
var Resvg;
var dist_default;
var initialized;
var initWasm;
var Resvg2;
var init_resvg_wasm_legacy = __esm({
  "../node_modules/@resvg/resvg-wasm-legacy/index.mjs"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    heap = new Array(128).fill(void 0);
    heap.push(void 0, null, true, false);
    heap_next = heap.length;
    __name2(addHeapObject, "addHeapObject");
    __name2(getObject, "getObject");
    __name2(dropObject, "dropObject");
    __name2(takeObject, "takeObject");
    WASM_VECTOR_LEN = 0;
    cachedUint8Memory0 = null;
    __name2(getUint8Memory0, "getUint8Memory0");
    cachedTextEncoder = new TextEncoder("utf-8");
    encodeString = typeof cachedTextEncoder.encodeInto === "function" ? function(arg, view) {
      return cachedTextEncoder.encodeInto(arg, view);
    } : function(arg, view) {
      const buf = cachedTextEncoder.encode(arg);
      view.set(buf);
      return {
        read: arg.length,
        written: buf.length
      };
    };
    __name2(passStringToWasm0, "passStringToWasm0");
    __name2(isLikeNone, "isLikeNone");
    cachedInt32Memory0 = null;
    __name2(getInt32Memory0, "getInt32Memory0");
    cachedTextDecoder = new TextDecoder("utf-8", { ignoreBOM: true, fatal: true });
    cachedTextDecoder.decode();
    __name2(getStringFromWasm0, "getStringFromWasm0");
    __name2(_assertClass, "_assertClass");
    BBox = class {
      static {
        __name(this, "BBox");
      }
      static {
        __name2(this, "BBox");
      }
      static __wrap(ptr) {
        const obj = Object.create(BBox.prototype);
        obj.ptr = ptr;
        return obj;
      }
      __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;
        return ptr;
      }
      free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_bbox_free(ptr);
      }
      /**
      * @returns {number}
      */
      get x() {
        const ret = wasm.__wbg_get_bbox_x(this.ptr);
        return ret;
      }
      /**
      * @param {number} arg0
      */
      set x(arg0) {
        wasm.__wbg_set_bbox_x(this.ptr, arg0);
      }
      /**
      * @returns {number}
      */
      get y() {
        const ret = wasm.__wbg_get_bbox_y(this.ptr);
        return ret;
      }
      /**
      * @param {number} arg0
      */
      set y(arg0) {
        wasm.__wbg_set_bbox_y(this.ptr, arg0);
      }
      /**
      * @returns {number}
      */
      get width() {
        const ret = wasm.__wbg_get_bbox_width(this.ptr);
        return ret;
      }
      /**
      * @param {number} arg0
      */
      set width(arg0) {
        wasm.__wbg_set_bbox_width(this.ptr, arg0);
      }
      /**
      * @returns {number}
      */
      get height() {
        const ret = wasm.__wbg_get_bbox_height(this.ptr);
        return ret;
      }
      /**
      * @param {number} arg0
      */
      set height(arg0) {
        wasm.__wbg_set_bbox_height(this.ptr, arg0);
      }
    };
    RenderedImage = class {
      static {
        __name(this, "RenderedImage");
      }
      static {
        __name2(this, "RenderedImage");
      }
      static __wrap(ptr) {
        const obj = Object.create(RenderedImage.prototype);
        obj.ptr = ptr;
        return obj;
      }
      __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;
        return ptr;
      }
      free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_renderedimage_free(ptr);
      }
      /**
      * Get the PNG width
      * @returns {number}
      */
      get width() {
        const ret = wasm.renderedimage_width(this.ptr);
        return ret >>> 0;
      }
      /**
      * Get the PNG height
      * @returns {number}
      */
      get height() {
        const ret = wasm.renderedimage_height(this.ptr);
        return ret >>> 0;
      }
      /**
      * Write the image data to Uint8Array
      * @returns {Uint8Array}
      */
      asPng() {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.renderedimage_asPng(retptr, this.ptr);
          var r0 = getInt32Memory0()[retptr / 4 + 0];
          var r1 = getInt32Memory0()[retptr / 4 + 1];
          var r2 = getInt32Memory0()[retptr / 4 + 2];
          if (r2) {
            throw takeObject(r1);
          }
          return takeObject(r0);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
      * Get the RGBA pixels of the image
      * @returns {Uint8Array}
      */
      get pixels() {
        const ret = wasm.renderedimage_pixels(this.ptr);
        return takeObject(ret);
      }
    };
    Resvg = class {
      static {
        __name(this, "Resvg");
      }
      static {
        __name2(this, "Resvg");
      }
      static __wrap(ptr) {
        const obj = Object.create(Resvg.prototype);
        obj.ptr = ptr;
        return obj;
      }
      __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;
        return ptr;
      }
      free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_resvg_free(ptr);
      }
      /**
      * @param {Uint8Array | string} svg
      * @param {string | undefined} options
      */
      constructor(svg, options) {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          var ptr0 = isLikeNone(options) ? 0 : passStringToWasm0(options, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          var len0 = WASM_VECTOR_LEN;
          wasm.resvg_new(retptr, addHeapObject(svg), ptr0, len0);
          var r0 = getInt32Memory0()[retptr / 4 + 0];
          var r1 = getInt32Memory0()[retptr / 4 + 1];
          var r2 = getInt32Memory0()[retptr / 4 + 2];
          if (r2) {
            throw takeObject(r1);
          }
          return Resvg.__wrap(r0);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
      * Get the SVG width
      * @returns {number}
      */
      get width() {
        const ret = wasm.resvg_width(this.ptr);
        return ret;
      }
      /**
      * Get the SVG height
      * @returns {number}
      */
      get height() {
        const ret = wasm.resvg_height(this.ptr);
        return ret;
      }
      /**
      * Renders an SVG in Wasm
      * @returns {RenderedImage}
      */
      render() {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.resvg_render(retptr, this.ptr);
          var r0 = getInt32Memory0()[retptr / 4 + 0];
          var r1 = getInt32Memory0()[retptr / 4 + 1];
          var r2 = getInt32Memory0()[retptr / 4 + 2];
          if (r2) {
            throw takeObject(r1);
          }
          return RenderedImage.__wrap(r0);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
      * Output usvg-simplified SVG string
      * @returns {string}
      */
      toString() {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.resvg_toString(retptr, this.ptr);
          var r0 = getInt32Memory0()[retptr / 4 + 0];
          var r1 = getInt32Memory0()[retptr / 4 + 1];
          return getStringFromWasm0(r0, r1);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
          wasm.__wbindgen_free(r0, r1);
        }
      }
      /**
      * Calculate a maximum bounding box of all visible elements in this SVG.
      *
      * Note: path bounding box are approx values.
      * @returns {BBox | undefined}
      */
      innerBBox() {
        const ret = wasm.resvg_innerBBox(this.ptr);
        return ret === 0 ? void 0 : BBox.__wrap(ret);
      }
      /**
      * Calculate a maximum bounding box of all visible elements in this SVG.
      * This will first apply transform.
      * Similar to `SVGGraphicsElement.getBBox()` DOM API.
      * @returns {BBox | undefined}
      */
      getBBox() {
        const ret = wasm.resvg_getBBox(this.ptr);
        return ret === 0 ? void 0 : BBox.__wrap(ret);
      }
      /**
      * Use a given `BBox` to crop the svg. Currently this method simply changes
      * the viewbox/size of the svg and do not move the elements for simplicity
      * @param {BBox} bbox
      */
      cropByBBox(bbox) {
        _assertClass(bbox, BBox);
        wasm.resvg_cropByBBox(this.ptr, bbox.ptr);
      }
      /**
      * @returns {Array<any>}
      */
      imagesToResolve() {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          wasm.resvg_imagesToResolve(retptr, this.ptr);
          var r0 = getInt32Memory0()[retptr / 4 + 0];
          var r1 = getInt32Memory0()[retptr / 4 + 1];
          var r2 = getInt32Memory0()[retptr / 4 + 2];
          if (r2) {
            throw takeObject(r1);
          }
          return takeObject(r0);
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
      /**
      * @param {string} href
      * @param {Uint8Array} buffer
      */
      resolveImage(href, buffer) {
        try {
          const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
          const ptr0 = passStringToWasm0(href, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
          const len0 = WASM_VECTOR_LEN;
          wasm.resvg_resolveImage(retptr, this.ptr, ptr0, len0, addHeapObject(buffer));
          var r0 = getInt32Memory0()[retptr / 4 + 0];
          var r1 = getInt32Memory0()[retptr / 4 + 1];
          if (r1) {
            throw takeObject(r0);
          }
        } finally {
          wasm.__wbindgen_add_to_stack_pointer(16);
        }
      }
    };
    __name2(load, "load");
    __name2(getImports, "getImports");
    __name2(initMemory, "initMemory");
    __name2(finalizeInit, "finalizeInit");
    __name2(init, "init");
    dist_default = init;
    initialized = false;
    initWasm = /* @__PURE__ */ __name2(async (module_or_path) => {
      if (initialized) {
        throw new Error("Already initialized. The `initWasm()` function can be used only once.");
      }
      await dist_default(await module_or_path);
      initialized = true;
    }, "initWasm");
    Resvg2 = class extends Resvg {
      static {
        __name(this, "Resvg2");
      }
      static {
        __name2(this, "Resvg2");
      }
      /**
       * @param {Uint8Array | string} svg
       * @param {ResvgRenderOptions | undefined} options
       */
      constructor(svg, options) {
        if (!initialized)
          throw new Error("Wasm has not been initialized. Call `initWasm()` function.");
        super(svg, JSON.stringify(options));
      }
    };
  }
});
async function initResvg(input) {
  if (initResvg.initialized) {
    throw new Error("(@cf-wasm/resvg/legacy): Function already called. The `initResvg()` function can be used only once.");
  }
  if (!input) {
    throw new Error("(@cf-wasm/resvg/legacy): Argument `input` is not valid.");
  }
  initResvg.initialized = true;
  initResvg.promise = (async () => {
    await initWasm(await input);
    initResvg.ready = true;
  })();
  return initResvg.promise;
}
__name(initResvg, "initResvg");
var Resvg3;
var init_chunk_JNEBUQIW = __esm({
  "../node_modules/@cf-wasm/resvg/dist/chunk-JNEBUQIW.js"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_resvg_wasm_legacy();
    __name2(initResvg, "initResvg");
    initResvg.promise = null;
    initResvg.initialized = false;
    initResvg.ready = false;
    initResvg.ensure = async () => {
      if (!initResvg.promise) {
        throw new Error("(@cf-wasm/resvg/legacy): Function not called. Call `initResvg()` function first.");
      }
      return initResvg.promise;
    };
    Resvg3 = class _Resvg extends Resvg2 {
      static {
        __name(this, "_Resvg");
      }
      static {
        __name2(this, "_Resvg");
      }
      constructor(svg, options) {
        if (!initResvg.ready) {
          if (initResvg.initialized) {
            throw new Error(
              "(@cf-wasm/resvg/legacy): Resvg is not yet ready while `initResvg()` function was called. Use `Resvg.async()` async static method instead to ensure Resvg is ready."
            );
          }
          throw new Error("(@cf-wasm/resvg/legacy): Resvg is not yet initialized. Call `initResvg()` function first.");
        }
        super(svg, options);
      }
      static async async(svg, options) {
        await initResvg.ensure();
        return new _Resvg(svg, options);
      }
      /**
       * @deprecated Use {@link Resvg.async} instead
       */
      static async create(svg, options) {
        return _Resvg.async(svg, options);
      }
    };
  }
});
var workerd_exports = {};
__export(workerd_exports, {
  Resvg: /* @__PURE__ */ __name(() => Resvg3, "Resvg"),
  initResvg: /* @__PURE__ */ __name(() => initResvg, "initResvg"),
  resvgWasmModule: /* @__PURE__ */ __name(() => resvgWasmModule, "resvgWasmModule")
});
var init_workerd = __esm({
  "../node_modules/@cf-wasm/resvg/dist/legacy/workerd.js"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_chunk_JNEBUQIW();
    initResvg(resvgWasmModule);
  }
});
var require_tiny_inflate = __commonJS({
  "../node_modules/tiny-inflate/index.js"(exports2, module) {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var TINF_OK = 0;
    var TINF_DATA_ERROR = -3;
    function Tree() {
      this.table = new Uint16Array(16);
      this.trans = new Uint16Array(288);
    }
    __name(Tree, "Tree");
    __name2(Tree, "Tree");
    function Data(source, dest) {
      this.source = source;
      this.sourceIndex = 0;
      this.tag = 0;
      this.bitcount = 0;
      this.dest = dest;
      this.destLen = 0;
      this.ltree = new Tree();
      this.dtree = new Tree();
    }
    __name(Data, "Data");
    __name2(Data, "Data");
    var sltree = new Tree();
    var sdtree = new Tree();
    var length_bits = new Uint8Array(30);
    var length_base = new Uint16Array(30);
    var dist_bits = new Uint8Array(30);
    var dist_base = new Uint16Array(30);
    var clcidx = new Uint8Array([
      16,
      17,
      18,
      0,
      8,
      7,
      9,
      6,
      10,
      5,
      11,
      4,
      12,
      3,
      13,
      2,
      14,
      1,
      15
    ]);
    var code_tree = new Tree();
    var lengths = new Uint8Array(288 + 32);
    function tinf_build_bits_base(bits2, base, delta, first) {
      var i2, sum;
      for (i2 = 0; i2 < delta; ++i2) bits2[i2] = 0;
      for (i2 = 0; i2 < 30 - delta; ++i2) bits2[i2 + delta] = i2 / delta | 0;
      for (sum = first, i2 = 0; i2 < 30; ++i2) {
        base[i2] = sum;
        sum += 1 << bits2[i2];
      }
    }
    __name(tinf_build_bits_base, "tinf_build_bits_base");
    __name2(tinf_build_bits_base, "tinf_build_bits_base");
    function tinf_build_fixed_trees(lt, dt) {
      var i2;
      for (i2 = 0; i2 < 7; ++i2) lt.table[i2] = 0;
      lt.table[7] = 24;
      lt.table[8] = 152;
      lt.table[9] = 112;
      for (i2 = 0; i2 < 24; ++i2) lt.trans[i2] = 256 + i2;
      for (i2 = 0; i2 < 144; ++i2) lt.trans[24 + i2] = i2;
      for (i2 = 0; i2 < 8; ++i2) lt.trans[24 + 144 + i2] = 280 + i2;
      for (i2 = 0; i2 < 112; ++i2) lt.trans[24 + 144 + 8 + i2] = 144 + i2;
      for (i2 = 0; i2 < 5; ++i2) dt.table[i2] = 0;
      dt.table[5] = 32;
      for (i2 = 0; i2 < 32; ++i2) dt.trans[i2] = i2;
    }
    __name(tinf_build_fixed_trees, "tinf_build_fixed_trees");
    __name2(tinf_build_fixed_trees, "tinf_build_fixed_trees");
    var offs = new Uint16Array(16);
    function tinf_build_tree(t, lengths2, off22, num) {
      var i2, sum;
      for (i2 = 0; i2 < 16; ++i2) t.table[i2] = 0;
      for (i2 = 0; i2 < num; ++i2) t.table[lengths2[off22 + i2]]++;
      t.table[0] = 0;
      for (sum = 0, i2 = 0; i2 < 16; ++i2) {
        offs[i2] = sum;
        sum += t.table[i2];
      }
      for (i2 = 0; i2 < num; ++i2) {
        if (lengths2[off22 + i2]) t.trans[offs[lengths2[off22 + i2]]++] = i2;
      }
    }
    __name(tinf_build_tree, "tinf_build_tree");
    __name2(tinf_build_tree, "tinf_build_tree");
    function tinf_getbit(d2) {
      if (!d2.bitcount--) {
        d2.tag = d2.source[d2.sourceIndex++];
        d2.bitcount = 7;
      }
      var bit = d2.tag & 1;
      d2.tag >>>= 1;
      return bit;
    }
    __name(tinf_getbit, "tinf_getbit");
    __name2(tinf_getbit, "tinf_getbit");
    function tinf_read_bits(d2, num, base) {
      if (!num)
        return base;
      while (d2.bitcount < 24) {
        d2.tag |= d2.source[d2.sourceIndex++] << d2.bitcount;
        d2.bitcount += 8;
      }
      var val = d2.tag & 65535 >>> 16 - num;
      d2.tag >>>= num;
      d2.bitcount -= num;
      return val + base;
    }
    __name(tinf_read_bits, "tinf_read_bits");
    __name2(tinf_read_bits, "tinf_read_bits");
    function tinf_decode_symbol(d2, t) {
      while (d2.bitcount < 24) {
        d2.tag |= d2.source[d2.sourceIndex++] << d2.bitcount;
        d2.bitcount += 8;
      }
      var sum = 0, cur = 0, len = 0;
      var tag = d2.tag;
      do {
        cur = 2 * cur + (tag & 1);
        tag >>>= 1;
        ++len;
        sum += t.table[len];
        cur -= t.table[len];
      } while (cur >= 0);
      d2.tag = tag;
      d2.bitcount -= len;
      return t.trans[sum + cur];
    }
    __name(tinf_decode_symbol, "tinf_decode_symbol");
    __name2(tinf_decode_symbol, "tinf_decode_symbol");
    function tinf_decode_trees(d2, lt, dt) {
      var hlit, hdist, hclen;
      var i2, num, length;
      hlit = tinf_read_bits(d2, 5, 257);
      hdist = tinf_read_bits(d2, 5, 1);
      hclen = tinf_read_bits(d2, 4, 4);
      for (i2 = 0; i2 < 19; ++i2) lengths[i2] = 0;
      for (i2 = 0; i2 < hclen; ++i2) {
        var clen = tinf_read_bits(d2, 3, 0);
        lengths[clcidx[i2]] = clen;
      }
      tinf_build_tree(code_tree, lengths, 0, 19);
      for (num = 0; num < hlit + hdist; ) {
        var sym = tinf_decode_symbol(d2, code_tree);
        switch (sym) {
          case 16:
            var prev = lengths[num - 1];
            for (length = tinf_read_bits(d2, 2, 3); length; --length) {
              lengths[num++] = prev;
            }
            break;
          case 17:
            for (length = tinf_read_bits(d2, 3, 3); length; --length) {
              lengths[num++] = 0;
            }
            break;
          case 18:
            for (length = tinf_read_bits(d2, 7, 11); length; --length) {
              lengths[num++] = 0;
            }
            break;
          default:
            lengths[num++] = sym;
            break;
        }
      }
      tinf_build_tree(lt, lengths, 0, hlit);
      tinf_build_tree(dt, lengths, hlit, hdist);
    }
    __name(tinf_decode_trees, "tinf_decode_trees");
    __name2(tinf_decode_trees, "tinf_decode_trees");
    function tinf_inflate_block_data(d2, lt, dt) {
      while (1) {
        var sym = tinf_decode_symbol(d2, lt);
        if (sym === 256) {
          return TINF_OK;
        }
        if (sym < 256) {
          d2.dest[d2.destLen++] = sym;
        } else {
          var length, dist, offs2;
          var i2;
          sym -= 257;
          length = tinf_read_bits(d2, length_bits[sym], length_base[sym]);
          dist = tinf_decode_symbol(d2, dt);
          offs2 = d2.destLen - tinf_read_bits(d2, dist_bits[dist], dist_base[dist]);
          for (i2 = offs2; i2 < offs2 + length; ++i2) {
            d2.dest[d2.destLen++] = d2.dest[i2];
          }
        }
      }
    }
    __name(tinf_inflate_block_data, "tinf_inflate_block_data");
    __name2(tinf_inflate_block_data, "tinf_inflate_block_data");
    function tinf_inflate_uncompressed_block(d2) {
      var length, invlength;
      var i2;
      while (d2.bitcount > 8) {
        d2.sourceIndex--;
        d2.bitcount -= 8;
      }
      length = d2.source[d2.sourceIndex + 1];
      length = 256 * length + d2.source[d2.sourceIndex];
      invlength = d2.source[d2.sourceIndex + 3];
      invlength = 256 * invlength + d2.source[d2.sourceIndex + 2];
      if (length !== (~invlength & 65535))
        return TINF_DATA_ERROR;
      d2.sourceIndex += 4;
      for (i2 = length; i2; --i2)
        d2.dest[d2.destLen++] = d2.source[d2.sourceIndex++];
      d2.bitcount = 0;
      return TINF_OK;
    }
    __name(tinf_inflate_uncompressed_block, "tinf_inflate_uncompressed_block");
    __name2(tinf_inflate_uncompressed_block, "tinf_inflate_uncompressed_block");
    function tinf_uncompress(source, dest) {
      var d2 = new Data(source, dest);
      var bfinal, btype, res;
      do {
        bfinal = tinf_getbit(d2);
        btype = tinf_read_bits(d2, 2, 0);
        switch (btype) {
          case 0:
            res = tinf_inflate_uncompressed_block(d2);
            break;
          case 1:
            res = tinf_inflate_block_data(d2, sltree, sdtree);
            break;
          case 2:
            tinf_decode_trees(d2, d2.ltree, d2.dtree);
            res = tinf_inflate_block_data(d2, d2.ltree, d2.dtree);
            break;
          default:
            res = TINF_DATA_ERROR;
        }
        if (res !== TINF_OK)
          throw new Error("Data error");
      } while (!bfinal);
      if (d2.destLen < d2.dest.length) {
        if (typeof d2.dest.slice === "function")
          return d2.dest.slice(0, d2.destLen);
        else
          return d2.dest.subarray(0, d2.destLen);
      }
      return d2.dest;
    }
    __name(tinf_uncompress, "tinf_uncompress");
    __name2(tinf_uncompress, "tinf_uncompress");
    tinf_build_fixed_trees(sltree, sdtree);
    tinf_build_bits_base(length_bits, length_base, 4, 3);
    tinf_build_bits_base(dist_bits, dist_base, 2, 1);
    length_bits[28] = 0;
    length_base[28] = 258;
    module.exports = tinf_uncompress;
  }
});
var require_swap = __commonJS({
  "../node_modules/unicode-trie/swap.js"(exports2, module) {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var isBigEndian = new Uint8Array(new Uint32Array([305419896]).buffer)[0] === 18;
    var swap = /* @__PURE__ */ __name2((b, n, m2) => {
      let i2 = b[n];
      b[n] = b[m2];
      b[m2] = i2;
    }, "swap");
    var swap32 = /* @__PURE__ */ __name2((array) => {
      const len = array.length;
      for (let i2 = 0; i2 < len; i2 += 4) {
        swap(array, i2, i2 + 3);
        swap(array, i2 + 1, i2 + 2);
      }
    }, "swap32");
    var swap32LE = /* @__PURE__ */ __name2((array) => {
      if (isBigEndian) {
        swap32(array);
      }
    }, "swap32LE");
    module.exports = {
      swap32LE
    };
  }
});
var require_unicode_trie = __commonJS({
  "../node_modules/unicode-trie/index.js"(exports2, module) {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var inflate = require_tiny_inflate();
    var { swap32LE } = require_swap();
    var SHIFT_1 = 6 + 5;
    var SHIFT_2 = 5;
    var SHIFT_1_2 = SHIFT_1 - SHIFT_2;
    var OMITTED_BMP_INDEX_1_LENGTH = 65536 >> SHIFT_1;
    var INDEX_2_BLOCK_LENGTH = 1 << SHIFT_1_2;
    var INDEX_2_MASK = INDEX_2_BLOCK_LENGTH - 1;
    var INDEX_SHIFT = 2;
    var DATA_BLOCK_LENGTH = 1 << SHIFT_2;
    var DATA_MASK = DATA_BLOCK_LENGTH - 1;
    var LSCP_INDEX_2_OFFSET = 65536 >> SHIFT_2;
    var LSCP_INDEX_2_LENGTH = 1024 >> SHIFT_2;
    var INDEX_2_BMP_LENGTH = LSCP_INDEX_2_OFFSET + LSCP_INDEX_2_LENGTH;
    var UTF8_2B_INDEX_2_OFFSET = INDEX_2_BMP_LENGTH;
    var UTF8_2B_INDEX_2_LENGTH = 2048 >> 6;
    var INDEX_1_OFFSET = UTF8_2B_INDEX_2_OFFSET + UTF8_2B_INDEX_2_LENGTH;
    var DATA_GRANULARITY = 1 << INDEX_SHIFT;
    var UnicodeTrie = class {
      static {
        __name(this, "UnicodeTrie");
      }
      static {
        __name2(this, "UnicodeTrie");
      }
      constructor(data) {
        const isBuffer = typeof data.readUInt32BE === "function" && typeof data.slice === "function";
        if (isBuffer || data instanceof Uint8Array) {
          let uncompressedLength;
          if (isBuffer) {
            this.highStart = data.readUInt32LE(0);
            this.errorValue = data.readUInt32LE(4);
            uncompressedLength = data.readUInt32LE(8);
            data = data.slice(12);
          } else {
            const view = new DataView(data.buffer);
            this.highStart = view.getUint32(0, true);
            this.errorValue = view.getUint32(4, true);
            uncompressedLength = view.getUint32(8, true);
            data = data.subarray(12);
          }
          data = inflate(data, new Uint8Array(uncompressedLength));
          data = inflate(data, new Uint8Array(uncompressedLength));
          swap32LE(data);
          this.data = new Uint32Array(data.buffer);
        } else {
          ({ data: this.data, highStart: this.highStart, errorValue: this.errorValue } = data);
        }
      }
      get(codePoint) {
        let index;
        if (codePoint < 0 || codePoint > 1114111) {
          return this.errorValue;
        }
        if (codePoint < 55296 || codePoint > 56319 && codePoint <= 65535) {
          index = (this.data[codePoint >> SHIFT_2] << INDEX_SHIFT) + (codePoint & DATA_MASK);
          return this.data[index];
        }
        if (codePoint <= 65535) {
          index = (this.data[LSCP_INDEX_2_OFFSET + (codePoint - 55296 >> SHIFT_2)] << INDEX_SHIFT) + (codePoint & DATA_MASK);
          return this.data[index];
        }
        if (codePoint < this.highStart) {
          index = this.data[INDEX_1_OFFSET - OMITTED_BMP_INDEX_1_LENGTH + (codePoint >> SHIFT_1)];
          index = this.data[index + (codePoint >> SHIFT_2 & INDEX_2_MASK)];
          index = (index << INDEX_SHIFT) + (codePoint & DATA_MASK);
          return this.data[index];
        }
        return this.data[this.data.length - DATA_GRANULARITY];
      }
    };
    module.exports = UnicodeTrie;
  }
});
var require_b64 = __commonJS({
  "../node_modules/base64-js/lib/b64.js"(exports2) {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var lookup = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    (function(exports3) {
      "use strict";
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var PLUS = "+".charCodeAt(0);
      var SLASH = "/".charCodeAt(0);
      var NUMBER = "0".charCodeAt(0);
      var LOWER = "a".charCodeAt(0);
      var UPPER = "A".charCodeAt(0);
      var PLUS_URL_SAFE = "-".charCodeAt(0);
      var SLASH_URL_SAFE = "_".charCodeAt(0);
      function decode2(elt) {
        var code = elt.charCodeAt(0);
        if (code === PLUS || code === PLUS_URL_SAFE)
          return 62;
        if (code === SLASH || code === SLASH_URL_SAFE)
          return 63;
        if (code < NUMBER)
          return -1;
        if (code < NUMBER + 10)
          return code - NUMBER + 26 + 26;
        if (code < UPPER + 26)
          return code - UPPER;
        if (code < LOWER + 26)
          return code - LOWER + 26;
      }
      __name(decode2, "decode2");
      __name2(decode2, "decode");
      function b64ToByteArray(b64) {
        var i2, j, l2, tmp, placeHolders, arr;
        if (b64.length % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var len = b64.length;
        placeHolders = "=" === b64.charAt(len - 2) ? 2 : "=" === b64.charAt(len - 1) ? 1 : 0;
        arr = new Arr(b64.length * 3 / 4 - placeHolders);
        l2 = placeHolders > 0 ? b64.length - 4 : b64.length;
        var L = 0;
        function push(v2) {
          arr[L++] = v2;
        }
        __name(push, "push");
        __name2(push, "push");
        for (i2 = 0, j = 0; i2 < l2; i2 += 4, j += 3) {
          tmp = decode2(b64.charAt(i2)) << 18 | decode2(b64.charAt(i2 + 1)) << 12 | decode2(b64.charAt(i2 + 2)) << 6 | decode2(b64.charAt(i2 + 3));
          push((tmp & 16711680) >> 16);
          push((tmp & 65280) >> 8);
          push(tmp & 255);
        }
        if (placeHolders === 2) {
          tmp = decode2(b64.charAt(i2)) << 2 | decode2(b64.charAt(i2 + 1)) >> 4;
          push(tmp & 255);
        } else if (placeHolders === 1) {
          tmp = decode2(b64.charAt(i2)) << 10 | decode2(b64.charAt(i2 + 1)) << 4 | decode2(b64.charAt(i2 + 2)) >> 2;
          push(tmp >> 8 & 255);
          push(tmp & 255);
        }
        return arr;
      }
      __name(b64ToByteArray, "b64ToByteArray");
      __name2(b64ToByteArray, "b64ToByteArray");
      function uint8ToBase64(uint8) {
        var i2, extraBytes = uint8.length % 3, output = "", temp, length;
        function encode(num) {
          return lookup.charAt(num);
        }
        __name(encode, "encode");
        __name2(encode, "encode");
        function tripletToBase64(num) {
          return encode(num >> 18 & 63) + encode(num >> 12 & 63) + encode(num >> 6 & 63) + encode(num & 63);
        }
        __name(tripletToBase64, "tripletToBase64");
        __name2(tripletToBase64, "tripletToBase64");
        for (i2 = 0, length = uint8.length - extraBytes; i2 < length; i2 += 3) {
          temp = (uint8[i2] << 16) + (uint8[i2 + 1] << 8) + uint8[i2 + 2];
          output += tripletToBase64(temp);
        }
        switch (extraBytes) {
          case 1:
            temp = uint8[uint8.length - 1];
            output += encode(temp >> 2);
            output += encode(temp << 4 & 63);
            output += "==";
            break;
          case 2:
            temp = (uint8[uint8.length - 2] << 8) + uint8[uint8.length - 1];
            output += encode(temp >> 10);
            output += encode(temp >> 4 & 63);
            output += encode(temp << 2 & 63);
            output += "=";
            break;
        }
        return output;
      }
      __name(uint8ToBase64, "uint8ToBase64");
      __name2(uint8ToBase64, "uint8ToBase64");
      exports3.toByteArray = b64ToByteArray;
      exports3.fromByteArray = uint8ToBase64;
    })(typeof exports2 === "undefined" ? exports2.base64js = {} : exports2);
  }
});
var import_unicode_trie;
var import_base64_js;
var $557adaaeb0c7885f$exports;
var $1627905f8be2ef3f$export$fb4028874a74450;
var $1627905f8be2ef3f$export$1bb1140fe1358b00;
var $1627905f8be2ef3f$export$f3e416a182673355;
var $1627905f8be2ef3f$export$24aa617c849a894a;
var $1627905f8be2ef3f$export$a73c4d14459b698d;
var $1627905f8be2ef3f$export$9e5d732f3676a9ba;
var $1627905f8be2ef3f$export$1dff41d5c0caca01;
var $1627905f8be2ef3f$export$30a74a373318dec6;
var $1627905f8be2ef3f$export$d710c5f50fc7496a;
var $1627905f8be2ef3f$export$66498d28055820a9;
var $1627905f8be2ef3f$export$eb6c6d0b7c8826f2;
var $1627905f8be2ef3f$export$de92be486109a1df;
var $1627905f8be2ef3f$export$606cfc2a8896c91f;
var $1627905f8be2ef3f$export$e51d3c675bb0140d;
var $1627905f8be2ef3f$export$da51c6332ad11d7b;
var $1627905f8be2ef3f$export$bea437c40441867d;
var $1627905f8be2ef3f$export$c4c7eecbfed13dc9;
var $1627905f8be2ef3f$export$98e1f8a379849661;
var $32627af916ac1b00$export$98f50d781a474745;
var $32627af916ac1b00$export$12ee1f8f5315ca7e;
var $32627af916ac1b00$export$e4965ce242860454;
var $32627af916ac1b00$export$8f14048969dcd45e;
var $32627af916ac1b00$export$133eb141bf58aff4;
var $32627af916ac1b00$export$5bdb8ccbf5c57afc;
var $557adaaeb0c7885f$var$data;
var $557adaaeb0c7885f$var$classTrie;
var $557adaaeb0c7885f$var$mapClass;
var $557adaaeb0c7885f$var$mapFirst;
var $557adaaeb0c7885f$var$Break;
var $557adaaeb0c7885f$var$LineBreaker;
var init_module = __esm({
  "../node_modules/linebreak/dist/module.mjs"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    import_unicode_trie = __toESM(require_unicode_trie(), 1);
    import_base64_js = __toESM(require_b64(), 1);
    $557adaaeb0c7885f$exports = {};
    $1627905f8be2ef3f$export$fb4028874a74450 = 5;
    $1627905f8be2ef3f$export$1bb1140fe1358b00 = 12;
    $1627905f8be2ef3f$export$f3e416a182673355 = 13;
    $1627905f8be2ef3f$export$24aa617c849a894a = 16;
    $1627905f8be2ef3f$export$a73c4d14459b698d = 17;
    $1627905f8be2ef3f$export$9e5d732f3676a9ba = 22;
    $1627905f8be2ef3f$export$1dff41d5c0caca01 = 28;
    $1627905f8be2ef3f$export$30a74a373318dec6 = 31;
    $1627905f8be2ef3f$export$d710c5f50fc7496a = 33;
    $1627905f8be2ef3f$export$66498d28055820a9 = 34;
    $1627905f8be2ef3f$export$eb6c6d0b7c8826f2 = 35;
    $1627905f8be2ef3f$export$de92be486109a1df = 36;
    $1627905f8be2ef3f$export$606cfc2a8896c91f = 37;
    $1627905f8be2ef3f$export$e51d3c675bb0140d = 38;
    $1627905f8be2ef3f$export$da51c6332ad11d7b = 39;
    $1627905f8be2ef3f$export$bea437c40441867d = 40;
    $1627905f8be2ef3f$export$c4c7eecbfed13dc9 = 41;
    $1627905f8be2ef3f$export$98e1f8a379849661 = 42;
    $32627af916ac1b00$export$98f50d781a474745 = 0;
    $32627af916ac1b00$export$12ee1f8f5315ca7e = 1;
    $32627af916ac1b00$export$e4965ce242860454 = 2;
    $32627af916ac1b00$export$8f14048969dcd45e = 3;
    $32627af916ac1b00$export$133eb141bf58aff4 = 4;
    $32627af916ac1b00$export$5bdb8ccbf5c57afc = [
      //OP   , CL    , CP    , QU    , GL    , NS    , EX    , SY    , IS    , PR    , PO    , NU    , AL    , HL    , ID    , IN    , HY    , BA    , BB    , B2    , ZW    , CM    , WJ    , H2    , H3    , JL    , JV    , JT    , RI    , EB    , EM    , ZWJ   , CB
      [
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$8f14048969dcd45e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e
      ],
      [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ],
      [
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$e4965ce242860454,
        $32627af916ac1b00$export$133eb141bf58aff4,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$98f50d781a474745,
        $32627af916ac1b00$export$12ee1f8f5315ca7e,
        $32627af916ac1b00$export$98f50d781a474745
      ]
      // CB
    ];
    $557adaaeb0c7885f$var$data = import_base64_js.default.toByteArray("AAgOAAAAAAAQ4QAAAQ0P8vDtnQuMXUUZx+eyu7d7797d9m5bHoWltKVUlsjLWE0VJNigQoMVqkStEoNQQUl5GIo1KKmogEgqkKbBRki72lYabZMGKoGAjQRtJJDaCCIRiiigREBQS3z+xzOTnZ3O+3HOhd5NfpkzZx7fN9988zivu2M9hGwB28F94DnwEngd/Asc1EtIs9c/bIPDwCxwLDgezHcodyo4w5C+CCwBS8FnwSXgCnA1uFbI93XwbXAbWAfWgx+CzWAb+An4KfgFeAzsYWWfYuFz4CXwGvgb+Dfo6yNkEEwGh4CZYB44FpwI3g1OY+kfBItZOo2fB84Hy8DF4HJwNbiWpV8PVoO1LH4n2NRXyN+KcAd4kNVP9XsY4aPgcfAbsBfs6SniL4K/sPjfEf6HlanXCRkCw2BGvUh/keWfXS/CY+pFXs7x9XHmM94LTmWIeU2cgbxnS/k/B3kf86jDhU8L9V2E40vAFWAlWFUfb++NOL4F3C7JX4/4GiE+hvgWsF0oS7mXldspnN+F493gyXrh9xTav0cg3EvzgVfBG6wsmVSEkxBOBgdPGpd7JI6PnqRvJ68/xlbHof53gPeA94OzwLngk+ACsAwsByvASrAK3MB0Ws3CtQjvBJvAVrADPMDSHkb4CNijaccTwvnf4fiPEs8Lxy+D18A/QU8/xjgYBjPAbDAKTgYLwOngTHAO+EQ/8wuEF4EvsPiVCFf2+9tsFStzA8LVHuXXBsi6QyqzUYiPMR/7Mc7dAx7oL8bzw/3u/Bw8Bp4Az4AXwCtgHzsmDXP5fiF9iiVvly5d0sHngar16NKlS5cuXbp06fLmYlqHXrcd3ph4P0THUY3iXh49novju4S0tzfs5d+JPKewfAsRntZb3K9ZhOMlrO6lCC8An28U9+OuovcPcPxlVu5rCL/VmHh/iHIrzn3fIPu7SN8Axmg+8AOwEWwCm7tp3bRuWjetm5Y8bSu4B9zbKO6ZVsnORrVU3f4uXTqZ2H3sLoyx3eDXjfDndE9qyj6L838CfwVvgFpzYnof4oNgOhgBc8Fos9DrZIQLmtXPP1MmF6wGj4H+KXoWguvADkXaPil+YpuQy8Am8Ey7ODdtmJDF4HowBp4De6HDTNjhfHAHeBr0DBBy0kDxfPbcgSIusgrcWhtnJ8vL+TPix7UIOQtcBq4C28Cr4KRBnANbwSuDE+s50JgyNNFuXbp06XIgsXjIvPafjvXozKY+fVFz/z0LT1uCtKVSWbrOLWPnztG8e0Xfy7ol8XtZJi7WtG+5od2UFXQ/A12vUeS7jp27yVKHjdsU9lXB869TyNvAzt0lpP2oWbwLdjiO78bx/Sz+EMJHwK9Y/LcIfw+eZ3F67/Hl5vh9xX80J+rwX8SvRDhpgL17iPAQMHNArfPrqHPewLheI+AERV6efwV418B4nOZ/H+IfYHV8GOF5LJ3eAz0fx8sM9S0fUNud39O9CulfGZhY5huI3wzWgNvBelbHZoTbNPVpfYjKQpkHwUNgl0LWblbnk0LbbDxr0OMFpL3iqWdu9nWYPlVAWkXY39LnGdCkDbeqv1YNbfcMQ3t9oe8lzm6NH9N1ZB6Ln4BwfkJZJk7RyFnYKt6b/JDQXx9p5X+eFdqOjzM9P9MB/lUlFzr20aXIdzlY4dmn9F3YqtvoO76/2hp/D/xA5Zue88nNyL8GbFbs075X0tyUig3Qd2MCnf//HjnzpbsR3g9+1kHzzVjdnE71/qVBX9rGPUh/ysNWe1neFzvIDi5zAufV1sT0N0poR22wkFUfTOPfA4N2mbZ5fSrqOHSw+IbkSBbOGSzSRgf91/GTUWYBOB2cIZQ/G8cfBZ8CFwrnL8XxF8FKcA24jqXdiPA7Qr61OF7H4mMItwzuv2/YLth1ISt3Hzu3k4W7EH5JqPdRHD/O4k+z8A8IX5Lq3y7Z4nXE9xn6kX6vQ4bKfy+ok+hH+xf3hq9dnTTHhjKd2GmDuWA242iHMq4cC7A8kJ7i8o1+skSa7Jieo38HCWnoNjKFhdSFBxzpZ7QE6lI8N4S14aASZcryaV/WWHw66f6NHuCoxuQxmvM56GX9QMd8Q4D65ywGP+ZzRJuM+zQvx/MOS2VFeqQ4IXnH26zM9Xe6/E6D+4foAzzuajPZp8Qyw5ayZVDWuH0z0BtYRkeIDqH9KO9VbH1btd/lhNqCzvl8zeLnG0S/hnU6baHfpiuO6yy0rd+DHURo/zYF5H26j03rQsip2ndzz82u1z9N4VjWKWeb68Tedpt95HRVXp7H1R6p+/Wt4FPy/PpWwscOLRJ+PVWF/+W0iVyGzs18TIvXkOJ1Wxm66vSXz+vylenrZcj1ub439W+K8RNCGTJi2p/TJ1K23VaXr35tRpnzmjxequgfcfyk6B/TGBVlyedsNgpdd/h+W1U3P99QyFPNo1X3TwpM/WLTIWYfoBqXrv6iskHZ/RFr79R6hIyHBrH3f1nrUVnjP8SnZZ+rYtzr9Exld5MNbPNErusAPg+77u/eDOPftU9yj39TH7rezxd1LvsZQJlzkWlOirG/79zjMj/mtHUKu7vKy+3/LnXr9okyKedjX5/0He9iP/j63LwOQdarEVlfy8OO/Lqw023j6xcqmwxLiOd6heM2i9cV9LJy8jMJ23yQ+rpbfu7EQ/pXE8KYvUSqvVnb4XzZa6LrHMXHR+zcLvqWbm/Bn0/HzIs6fWPHoat8XfnDKmZGxRxeMbn2UqZ5Q94nmcZRbqqUXbZ8+lcjE+cPX11t814orvvAXNcG8vqj2vvk1MGn3anlj0bIT72v47bvE+Lc98T9b6r7AKn6j+8Duf7D0nnZx/j7Zjn0j9nbpSTndaLr9WNLivP+iN23xF7L+fqv6ZouFyb78jxVXvv5jJ9YUs9/sddO8h7KNg5jrhfaJGztT6G7KF+1d6yCmD5Kdb2fan60rSc552fZr3zeQ9DpnPp+Si5cx5Ktv2QfSzF/mMbWdOm46rFI4XstnU9xeqX4NKb7TKEdcr6pZOK3ID1k/LvFHkVczEuZLEDr499YqvqBym1aEHWgcvoYOtv0M91qQl5TfpO/in6rWx8OVpT1Wedkv3f5xom3T/xeR/6Gx6V86PWAOB4bBpqWdN+yTcVxjIyGRz/FrDGu6w/3d7kPm8StX8RyPu+uuvpNju/vTLJV37GpvoM0oZPnW87VLnL/5pDno1NoW1R6yedU6TyUv3u19a3KFnIbTLYz+ZCLP4T0tU1uivFgso0pnsJ/UtXvarNY28Xq5cvkBDrQP/E5ZaiuQwwfmTlsOiQRU1fMuqrDd/3ISSuwjOwXOfTyGUMpZIXq4GpLn3pUcdfzch2x7XO1u2uZHOPb1G6b3Xg9PH1IIWeEpJlPQtqos2EKW8b0u8rnuP1UeVLoXJb9be0uG9nnbchjU+XTszT5VeNBThPHnc5OKj1U9aj0GTHIVaGy1YhEWT4ixns00DT+XEzWn/7VAsIc63Cov3OdyhwjrnaqQqZvWKXdypRdlq+k8msZ031U+Rm4fA+3TtyeR9hwfW9G9yxDN0fZMN33F+9TE6md4hwoxumfaUzI9fN3PFT3xVV2msrQ3UsnChm6Nulk8TndpS28D3zX9tTIPsF/z7Am5OkTjm1tI1JZW74+4VgsZ0N3L1yXV3WeP5uR7TGHHdvC3JQlxybfpd22tDlk/2eofRK8TzrN/qnar/K/OUTth6I/+jAnEptNbPvFHP2gs40N3+dfMWtwqvVct7/wfd8gtQ7imifial9ZJ9/3IHLYU6eDj3+4PhsNhX+vwvcWLnu6kGfEMe8DuciPfUfGZB8X/7HJy/Gefe5n+VRGFd/wyP2ta7/LO4yh/sbLV/k9lev6kfO9Dt/5U67b1/6u/epqB1U9Me23jfHY9sscAg4tkbLl+e4/U36rJ9ddxfd6sg5vq5ice42Wpk/pb9FOJ36/W9tpv4kbC79nUbZceX8Zu6/qJ+P3WvhvA8v3reh7Jbn2d6rrNC7XNZTLma4Ba0JI9efX2uLzF5scG/w9UNU1ZxW+ymUfzELeTllXlQ1rUuhzjS5fp9c964iFBOqeSz63bU065nZKdU+mDEz3qHIjjifquw0pnb/raRtvrnsYcb46ihT3taoYz6brdNW9l6rWRnE/navdPn1XlR1km7hcz1WlH/elKuSOSvLLuE8U6m8uzwRdfcGl73VyTHuyMvzJ1Sa2cWDTP/Z63Kc94n2B1PYr24dz1JlyHLlcP+S4B6vD1c9EW4q2LWstCvUjeVy63k/LMYdUNd5D1xQfvVTzX1VjkMsUv88N8VH5fReVn/Fjn++/h6X6Q8a6b1/q3g/i/ewi0/Scs8zxXeV6mWIOUPlPzBgdFerW+bZrm2P18dnjuK6HunEp+rHvPMXbr+sHVb/lnL+pTP57jPw9Cvk3PW178JD9qChfzuvTf7Htl38L1QUf/VKu9SFjwWbTWPvFEvu7Uq76y7+31g6QlYPc669pbsm9Xur2LWI9Pu8ypfDXqm3A2z8s1FWGn4ntL9NfQu2oSlftX9uetvTtv7J8Ql4zxfXGZ3zk8PeQ9w59x2uMfqI8/q5eKh/l9cb2rwsu9rSNl06ZP2Pmxtz+rNMx93yno0n2/82rVH7rQ+y9P15H6FyRun9ViH81ATmffI7nJ5r8uXXW6enbP6b/B8/l5OifVHYLnb9S39s2zcc+Ph+rh8+eQgVPS72elzGWY/tUtbbabBpDiI7yN1q6/4th2y+ErAc5+9BVvu/7KamJbWNZeuqI/R4tRf+YyD1HmOZM1bMV3/14Sn10c0Xu+Sj1nOXb5jL73ncdy02uvlXZNde65dOHYl7Vs4KYuS6FzWLn2zJlpZqPXPVPOa5yzKOyn1VhT9lmMfdbfH7D11Wf2PXN5h9y+dD287+qxgSnaYmnIrRtIb8pJe6/Uv9OVer6Whn0zfGO/BEloZI9ojmfAlUflClDd178bTmVHVTpZXOkAlk/lb42UujmI89HH5V+cl7XtowY6vTxLVWok6UrGzoGTHN+bB+6ri05687VNpvfuvRfaP2uMlNQth1D5JjGelm/8yn+9p3p/7qk9gnfeddXZmq/Sm333PJT659Kv1zjNbZ9uv2Oi//67CV8/N1nj1DmviyXDNVeJkaeaX8UsyesYg8cu2+NvdaPfb+lLDu5tvt/");
    $557adaaeb0c7885f$var$classTrie = new import_unicode_trie.default($557adaaeb0c7885f$var$data);
    $557adaaeb0c7885f$var$mapClass = /* @__PURE__ */ __name2(function(c2) {
      switch (c2) {
        case $1627905f8be2ef3f$export$d710c5f50fc7496a:
          return $1627905f8be2ef3f$export$1bb1140fe1358b00;
        case $1627905f8be2ef3f$export$da51c6332ad11d7b:
        case $1627905f8be2ef3f$export$bea437c40441867d:
        case $1627905f8be2ef3f$export$98e1f8a379849661:
          return $1627905f8be2ef3f$export$1bb1140fe1358b00;
        case $1627905f8be2ef3f$export$eb6c6d0b7c8826f2:
          return $1627905f8be2ef3f$export$fb4028874a74450;
        default:
          return c2;
      }
    }, "$557adaaeb0c7885f$var$mapClass");
    $557adaaeb0c7885f$var$mapFirst = /* @__PURE__ */ __name2(function(c2) {
      switch (c2) {
        case $1627905f8be2ef3f$export$606cfc2a8896c91f:
        case $1627905f8be2ef3f$export$e51d3c675bb0140d:
          return $1627905f8be2ef3f$export$66498d28055820a9;
        case $1627905f8be2ef3f$export$c4c7eecbfed13dc9:
          return $1627905f8be2ef3f$export$9e5d732f3676a9ba;
        default:
          return c2;
      }
    }, "$557adaaeb0c7885f$var$mapFirst");
    $557adaaeb0c7885f$var$Break = class {
      static {
        __name(this, "$557adaaeb0c7885f$var$Break");
      }
      static {
        __name2(this, "$557adaaeb0c7885f$var$Break");
      }
      constructor(position, required = false) {
        this.position = position;
        this.required = required;
      }
    };
    $557adaaeb0c7885f$var$LineBreaker = class {
      static {
        __name(this, "$557adaaeb0c7885f$var$LineBreaker");
      }
      static {
        __name2(this, "$557adaaeb0c7885f$var$LineBreaker");
      }
      nextCodePoint() {
        const code = this.string.charCodeAt(this.pos++);
        const next = this.string.charCodeAt(this.pos);
        if (55296 <= code && code <= 56319 && 56320 <= next && next <= 57343) {
          this.pos++;
          return (code - 55296) * 1024 + (next - 56320) + 65536;
        }
        return code;
      }
      nextCharClass() {
        return $557adaaeb0c7885f$var$mapClass($557adaaeb0c7885f$var$classTrie.get(this.nextCodePoint()));
      }
      getSimpleBreak() {
        switch (this.nextClass) {
          case $1627905f8be2ef3f$export$c4c7eecbfed13dc9:
            return false;
          case $1627905f8be2ef3f$export$66498d28055820a9:
          case $1627905f8be2ef3f$export$606cfc2a8896c91f:
          case $1627905f8be2ef3f$export$e51d3c675bb0140d:
            this.curClass = $1627905f8be2ef3f$export$66498d28055820a9;
            return false;
          case $1627905f8be2ef3f$export$de92be486109a1df:
            this.curClass = $1627905f8be2ef3f$export$de92be486109a1df;
            return false;
        }
        return null;
      }
      getPairTableBreak(lastClass) {
        let shouldBreak = false;
        switch ($32627af916ac1b00$export$5bdb8ccbf5c57afc[this.curClass][this.nextClass]) {
          case $32627af916ac1b00$export$98f50d781a474745:
            shouldBreak = true;
            break;
          case $32627af916ac1b00$export$12ee1f8f5315ca7e:
            shouldBreak = lastClass === $1627905f8be2ef3f$export$c4c7eecbfed13dc9;
            break;
          case $32627af916ac1b00$export$e4965ce242860454:
            shouldBreak = lastClass === $1627905f8be2ef3f$export$c4c7eecbfed13dc9;
            if (!shouldBreak) {
              shouldBreak = false;
              return shouldBreak;
            }
            break;
          case $32627af916ac1b00$export$8f14048969dcd45e:
            if (lastClass !== $1627905f8be2ef3f$export$c4c7eecbfed13dc9) return shouldBreak;
            break;
          case $32627af916ac1b00$export$133eb141bf58aff4:
            break;
        }
        if (this.LB8a) shouldBreak = false;
        if (this.LB21a && (this.curClass === $1627905f8be2ef3f$export$24aa617c849a894a || this.curClass === $1627905f8be2ef3f$export$a73c4d14459b698d)) {
          shouldBreak = false;
          this.LB21a = false;
        } else this.LB21a = this.curClass === $1627905f8be2ef3f$export$f3e416a182673355;
        if (this.curClass === $1627905f8be2ef3f$export$1dff41d5c0caca01) {
          this.LB30a++;
          if (this.LB30a == 2 && this.nextClass === $1627905f8be2ef3f$export$1dff41d5c0caca01) {
            shouldBreak = true;
            this.LB30a = 0;
          }
        } else this.LB30a = 0;
        this.curClass = this.nextClass;
        return shouldBreak;
      }
      nextBreak() {
        if (this.curClass == null) {
          let firstClass = this.nextCharClass();
          this.curClass = $557adaaeb0c7885f$var$mapFirst(firstClass);
          this.nextClass = firstClass;
          this.LB8a = firstClass === $1627905f8be2ef3f$export$30a74a373318dec6;
          this.LB30a = 0;
        }
        while (this.pos < this.string.length) {
          this.lastPos = this.pos;
          const lastClass = this.nextClass;
          this.nextClass = this.nextCharClass();
          if (this.curClass === $1627905f8be2ef3f$export$66498d28055820a9 || this.curClass === $1627905f8be2ef3f$export$de92be486109a1df && this.nextClass !== $1627905f8be2ef3f$export$606cfc2a8896c91f) {
            this.curClass = $557adaaeb0c7885f$var$mapFirst($557adaaeb0c7885f$var$mapClass(this.nextClass));
            return new $557adaaeb0c7885f$var$Break(this.lastPos, true);
          }
          let shouldBreak = this.getSimpleBreak();
          if (shouldBreak === null) shouldBreak = this.getPairTableBreak(lastClass);
          this.LB8a = this.nextClass === $1627905f8be2ef3f$export$30a74a373318dec6;
          if (shouldBreak) return new $557adaaeb0c7885f$var$Break(this.lastPos);
        }
        if (this.lastPos < this.string.length) {
          this.lastPos = this.string.length;
          return new $557adaaeb0c7885f$var$Break(this.string.length);
        }
        return null;
      }
      constructor(string) {
        this.string = string;
        this.pos = 0;
        this.lastPos = 0;
        this.curClass = null;
        this.nextClass = null;
        this.LB8a = false;
        this.LB21a = false;
        this.LB30a = 0;
      }
    };
    $557adaaeb0c7885f$exports = $557adaaeb0c7885f$var$LineBreaker;
  }
});
var require_parse = __commonJS({
  "../node_modules/postcss-value-parser/lib/parse.js"(exports2, module) {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var openParentheses = "(".charCodeAt(0);
    var closeParentheses = ")".charCodeAt(0);
    var singleQuote = "'".charCodeAt(0);
    var doubleQuote = '"'.charCodeAt(0);
    var backslash = "\\".charCodeAt(0);
    var slash = "/".charCodeAt(0);
    var comma = ",".charCodeAt(0);
    var colon = ":".charCodeAt(0);
    var star = "*".charCodeAt(0);
    var uLower = "u".charCodeAt(0);
    var uUpper = "U".charCodeAt(0);
    var plus = "+".charCodeAt(0);
    var isUnicodeRange = /^[a-f0-9?-]+$/i;
    module.exports = function(input) {
      var tokens = [];
      var value = input;
      var next, quote, prev, token, escape, escapePos, whitespacePos, parenthesesOpenPos;
      var pos = 0;
      var code = value.charCodeAt(pos);
      var max2 = value.length;
      var stack = [{ nodes: tokens }];
      var balanced = 0;
      var parent;
      var name = "";
      var before = "";
      var after = "";
      while (pos < max2) {
        if (code <= 32) {
          next = pos;
          do {
            next += 1;
            code = value.charCodeAt(next);
          } while (code <= 32);
          token = value.slice(pos, next);
          prev = tokens[tokens.length - 1];
          if (code === closeParentheses && balanced) {
            after = token;
          } else if (prev && prev.type === "div") {
            prev.after = token;
            prev.sourceEndIndex += token.length;
          } else if (code === comma || code === colon || code === slash && value.charCodeAt(next + 1) !== star && (!parent || parent && parent.type === "function" && parent.value !== "calc")) {
            before = token;
          } else {
            tokens.push({
              type: "space",
              sourceIndex: pos,
              sourceEndIndex: next,
              value: token
            });
          }
          pos = next;
        } else if (code === singleQuote || code === doubleQuote) {
          next = pos;
          quote = code === singleQuote ? "'" : '"';
          token = {
            type: "string",
            sourceIndex: pos,
            quote
          };
          do {
            escape = false;
            next = value.indexOf(quote, next + 1);
            if (~next) {
              escapePos = next;
              while (value.charCodeAt(escapePos - 1) === backslash) {
                escapePos -= 1;
                escape = !escape;
              }
            } else {
              value += quote;
              next = value.length - 1;
              token.unclosed = true;
            }
          } while (escape);
          token.value = value.slice(pos + 1, next);
          token.sourceEndIndex = token.unclosed ? next : next + 1;
          tokens.push(token);
          pos = next + 1;
          code = value.charCodeAt(pos);
        } else if (code === slash && value.charCodeAt(pos + 1) === star) {
          next = value.indexOf("*/", pos);
          token = {
            type: "comment",
            sourceIndex: pos,
            sourceEndIndex: next + 2
          };
          if (next === -1) {
            token.unclosed = true;
            next = value.length;
            token.sourceEndIndex = next;
          }
          token.value = value.slice(pos + 2, next);
          tokens.push(token);
          pos = next + 2;
          code = value.charCodeAt(pos);
        } else if ((code === slash || code === star) && parent && parent.type === "function" && parent.value === "calc") {
          token = value[pos];
          tokens.push({
            type: "word",
            sourceIndex: pos - before.length,
            sourceEndIndex: pos + token.length,
            value: token
          });
          pos += 1;
          code = value.charCodeAt(pos);
        } else if (code === slash || code === comma || code === colon) {
          token = value[pos];
          tokens.push({
            type: "div",
            sourceIndex: pos - before.length,
            sourceEndIndex: pos + token.length,
            value: token,
            before,
            after: ""
          });
          before = "";
          pos += 1;
          code = value.charCodeAt(pos);
        } else if (openParentheses === code) {
          next = pos;
          do {
            next += 1;
            code = value.charCodeAt(next);
          } while (code <= 32);
          parenthesesOpenPos = pos;
          token = {
            type: "function",
            sourceIndex: pos - name.length,
            value: name,
            before: value.slice(parenthesesOpenPos + 1, next)
          };
          pos = next;
          if (name === "url" && code !== singleQuote && code !== doubleQuote) {
            next -= 1;
            do {
              escape = false;
              next = value.indexOf(")", next + 1);
              if (~next) {
                escapePos = next;
                while (value.charCodeAt(escapePos - 1) === backslash) {
                  escapePos -= 1;
                  escape = !escape;
                }
              } else {
                value += ")";
                next = value.length - 1;
                token.unclosed = true;
              }
            } while (escape);
            whitespacePos = next;
            do {
              whitespacePos -= 1;
              code = value.charCodeAt(whitespacePos);
            } while (code <= 32);
            if (parenthesesOpenPos < whitespacePos) {
              if (pos !== whitespacePos + 1) {
                token.nodes = [
                  {
                    type: "word",
                    sourceIndex: pos,
                    sourceEndIndex: whitespacePos + 1,
                    value: value.slice(pos, whitespacePos + 1)
                  }
                ];
              } else {
                token.nodes = [];
              }
              if (token.unclosed && whitespacePos + 1 !== next) {
                token.after = "";
                token.nodes.push({
                  type: "space",
                  sourceIndex: whitespacePos + 1,
                  sourceEndIndex: next,
                  value: value.slice(whitespacePos + 1, next)
                });
              } else {
                token.after = value.slice(whitespacePos + 1, next);
                token.sourceEndIndex = next;
              }
            } else {
              token.after = "";
              token.nodes = [];
            }
            pos = next + 1;
            token.sourceEndIndex = token.unclosed ? next : pos;
            code = value.charCodeAt(pos);
            tokens.push(token);
          } else {
            balanced += 1;
            token.after = "";
            token.sourceEndIndex = pos + 1;
            tokens.push(token);
            stack.push(token);
            tokens = token.nodes = [];
            parent = token;
          }
          name = "";
        } else if (closeParentheses === code && balanced) {
          pos += 1;
          code = value.charCodeAt(pos);
          parent.after = after;
          parent.sourceEndIndex += after.length;
          after = "";
          balanced -= 1;
          stack[stack.length - 1].sourceEndIndex = pos;
          stack.pop();
          parent = stack[balanced];
          tokens = parent.nodes;
        } else {
          next = pos;
          do {
            if (code === backslash) {
              next += 1;
            }
            next += 1;
            code = value.charCodeAt(next);
          } while (next < max2 && !(code <= 32 || code === singleQuote || code === doubleQuote || code === comma || code === colon || code === slash || code === openParentheses || code === star && parent && parent.type === "function" && parent.value === "calc" || code === slash && parent.type === "function" && parent.value === "calc" || code === closeParentheses && balanced));
          token = value.slice(pos, next);
          if (openParentheses === code) {
            name = token;
          } else if ((uLower === token.charCodeAt(0) || uUpper === token.charCodeAt(0)) && plus === token.charCodeAt(1) && isUnicodeRange.test(token.slice(2))) {
            tokens.push({
              type: "unicode-range",
              sourceIndex: pos,
              sourceEndIndex: next,
              value: token
            });
          } else {
            tokens.push({
              type: "word",
              sourceIndex: pos,
              sourceEndIndex: next,
              value: token
            });
          }
          pos = next;
        }
      }
      for (pos = stack.length - 1; pos; pos -= 1) {
        stack[pos].unclosed = true;
        stack[pos].sourceEndIndex = value.length;
      }
      return stack[0].nodes;
    };
  }
});
var require_walk = __commonJS({
  "../node_modules/postcss-value-parser/lib/walk.js"(exports2, module) {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function walk(nodes, cb, bubble) {
      var i2, max2, node, result;
      for (i2 = 0, max2 = nodes.length; i2 < max2; i2 += 1) {
        node = nodes[i2];
        if (!bubble) {
          result = cb(node, i2, nodes);
        }
        if (result !== false && node.type === "function" && Array.isArray(node.nodes)) {
          walk(node.nodes, cb, bubble);
        }
        if (bubble) {
          cb(node, i2, nodes);
        }
      }
    }, "walk"), "walk");
  }
});
var require_stringify = __commonJS({
  "../node_modules/postcss-value-parser/lib/stringify.js"(exports2, module) {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    function stringifyNode(node, custom) {
      var type = node.type;
      var value = node.value;
      var buf;
      var customResult;
      if (custom && (customResult = custom(node)) !== void 0) {
        return customResult;
      } else if (type === "word" || type === "space") {
        return value;
      } else if (type === "string") {
        buf = node.quote || "";
        return buf + value + (node.unclosed ? "" : buf);
      } else if (type === "comment") {
        return "/*" + value + (node.unclosed ? "" : "*/");
      } else if (type === "div") {
        return (node.before || "") + value + (node.after || "");
      } else if (Array.isArray(node.nodes)) {
        buf = stringify(node.nodes, custom);
        if (type !== "function") {
          return buf;
        }
        return value + "(" + (node.before || "") + buf + (node.after || "") + (node.unclosed ? "" : ")");
      }
      return value;
    }
    __name(stringifyNode, "stringifyNode");
    __name2(stringifyNode, "stringifyNode");
    function stringify(nodes, custom) {
      var result, i2;
      if (Array.isArray(nodes)) {
        result = "";
        for (i2 = nodes.length - 1; ~i2; i2 -= 1) {
          result = stringifyNode(nodes[i2], custom) + result;
        }
        return result;
      }
      return stringifyNode(nodes, custom);
    }
    __name(stringify, "stringify");
    __name2(stringify, "stringify");
    module.exports = stringify;
  }
});
var require_unit = __commonJS({
  "../node_modules/postcss-value-parser/lib/unit.js"(exports2, module) {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var minus = "-".charCodeAt(0);
    var plus = "+".charCodeAt(0);
    var dot = ".".charCodeAt(0);
    var exp = "e".charCodeAt(0);
    var EXP = "E".charCodeAt(0);
    function likeNumber(value) {
      var code = value.charCodeAt(0);
      var nextCode;
      if (code === plus || code === minus) {
        nextCode = value.charCodeAt(1);
        if (nextCode >= 48 && nextCode <= 57) {
          return true;
        }
        var nextNextCode = value.charCodeAt(2);
        if (nextCode === dot && nextNextCode >= 48 && nextNextCode <= 57) {
          return true;
        }
        return false;
      }
      if (code === dot) {
        nextCode = value.charCodeAt(1);
        if (nextCode >= 48 && nextCode <= 57) {
          return true;
        }
        return false;
      }
      if (code >= 48 && code <= 57) {
        return true;
      }
      return false;
    }
    __name(likeNumber, "likeNumber");
    __name2(likeNumber, "likeNumber");
    module.exports = function(value) {
      var pos = 0;
      var length = value.length;
      var code;
      var nextCode;
      var nextNextCode;
      if (length === 0 || !likeNumber(value)) {
        return false;
      }
      code = value.charCodeAt(pos);
      if (code === plus || code === minus) {
        pos++;
      }
      while (pos < length) {
        code = value.charCodeAt(pos);
        if (code < 48 || code > 57) {
          break;
        }
        pos += 1;
      }
      code = value.charCodeAt(pos);
      nextCode = value.charCodeAt(pos + 1);
      if (code === dot && nextCode >= 48 && nextCode <= 57) {
        pos += 2;
        while (pos < length) {
          code = value.charCodeAt(pos);
          if (code < 48 || code > 57) {
            break;
          }
          pos += 1;
        }
      }
      code = value.charCodeAt(pos);
      nextCode = value.charCodeAt(pos + 1);
      nextNextCode = value.charCodeAt(pos + 2);
      if ((code === exp || code === EXP) && (nextCode >= 48 && nextCode <= 57 || (nextCode === plus || nextCode === minus) && nextNextCode >= 48 && nextNextCode <= 57)) {
        pos += nextCode === plus || nextCode === minus ? 3 : 2;
        while (pos < length) {
          code = value.charCodeAt(pos);
          if (code < 48 || code > 57) {
            break;
          }
          pos += 1;
        }
      }
      return {
        number: value.slice(0, pos),
        unit: value.slice(pos)
      };
    };
  }
});
var require_lib = __commonJS({
  "../node_modules/postcss-value-parser/lib/index.js"(exports2, module) {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var parse3 = require_parse();
    var walk = require_walk();
    var stringify = require_stringify();
    function ValueParser(value) {
      if (this instanceof ValueParser) {
        this.nodes = parse3(value);
        return this;
      }
      return new ValueParser(value);
    }
    __name(ValueParser, "ValueParser");
    __name2(ValueParser, "ValueParser");
    ValueParser.prototype.toString = function() {
      return Array.isArray(this.nodes) ? stringify(this.nodes) : "";
    };
    ValueParser.prototype.walk = function(cb, bubble) {
      walk(this.nodes, cb, bubble);
      return this;
    };
    ValueParser.unit = require_unit();
    ValueParser.walk = walk;
    ValueParser.stringify = stringify;
    module.exports = ValueParser;
  }
});
var require_camelize = __commonJS({
  "../node_modules/camelize/index.js"(exports2, module) {
    "use strict";
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = function(obj) {
      if (typeof obj === "string") {
        return camelCase(obj);
      }
      return walk(obj);
    };
    function walk(obj) {
      if (!obj || typeof obj !== "object") {
        return obj;
      }
      if (isDate(obj) || isRegex(obj)) {
        return obj;
      }
      if (isArray(obj)) {
        return map(obj, walk);
      }
      return reduce(objectKeys(obj), function(acc, key) {
        var camel = camelCase(key);
        acc[camel] = walk(obj[key]);
        return acc;
      }, {});
    }
    __name(walk, "walk");
    __name2(walk, "walk");
    function camelCase(str) {
      return str.replace(/[_.-](\w|$)/g, function(_2, x22) {
        return x22.toUpperCase();
      });
    }
    __name(camelCase, "camelCase");
    __name2(camelCase, "camelCase");
    var isArray = Array.isArray || function(obj) {
      return Object.prototype.toString.call(obj) === "[object Array]";
    };
    var isDate = /* @__PURE__ */ __name2(function(obj) {
      return Object.prototype.toString.call(obj) === "[object Date]";
    }, "isDate");
    var isRegex = /* @__PURE__ */ __name2(function(obj) {
      return Object.prototype.toString.call(obj) === "[object RegExp]";
    }, "isRegex");
    var has = Object.prototype.hasOwnProperty;
    var objectKeys = Object.keys || function(obj) {
      var keys = [];
      for (var key in obj) {
        if (has.call(obj, key)) {
          keys.push(key);
        }
      }
      return keys;
    };
    function map(xs, f) {
      if (xs.map) {
        return xs.map(f);
      }
      var res = [];
      for (var i2 = 0; i2 < xs.length; i2++) {
        res.push(f(xs[i2], i2));
      }
      return res;
    }
    __name(map, "map");
    __name2(map, "map");
    function reduce(xs, f, acc) {
      if (xs.reduce) {
        return xs.reduce(f, acc);
      }
      for (var i2 = 0; i2 < xs.length; i2++) {
        acc = f(acc, xs[i2], i2);
      }
      return acc;
    }
    __name(reduce, "reduce");
    __name2(reduce, "reduce");
  }
});
var require_colors = __commonJS({
  "../node_modules/css-color-keywords/colors.json"(exports2, module) {
    module.exports = {
      black: "#000000",
      silver: "#c0c0c0",
      gray: "#808080",
      white: "#ffffff",
      maroon: "#800000",
      red: "#ff0000",
      purple: "#800080",
      fuchsia: "#ff00ff",
      green: "#008000",
      lime: "#00ff00",
      olive: "#808000",
      yellow: "#ffff00",
      navy: "#000080",
      blue: "#0000ff",
      teal: "#008080",
      aqua: "#00ffff",
      orange: "#ffa500",
      aliceblue: "#f0f8ff",
      antiquewhite: "#faebd7",
      aquamarine: "#7fffd4",
      azure: "#f0ffff",
      beige: "#f5f5dc",
      bisque: "#ffe4c4",
      blanchedalmond: "#ffebcd",
      blueviolet: "#8a2be2",
      brown: "#a52a2a",
      burlywood: "#deb887",
      cadetblue: "#5f9ea0",
      chartreuse: "#7fff00",
      chocolate: "#d2691e",
      coral: "#ff7f50",
      cornflowerblue: "#6495ed",
      cornsilk: "#fff8dc",
      crimson: "#dc143c",
      darkblue: "#00008b",
      darkcyan: "#008b8b",
      darkgoldenrod: "#b8860b",
      darkgray: "#a9a9a9",
      darkgreen: "#006400",
      darkgrey: "#a9a9a9",
      darkkhaki: "#bdb76b",
      darkmagenta: "#8b008b",
      darkolivegreen: "#556b2f",
      darkorange: "#ff8c00",
      darkorchid: "#9932cc",
      darkred: "#8b0000",
      darksalmon: "#e9967a",
      darkseagreen: "#8fbc8f",
      darkslateblue: "#483d8b",
      darkslategray: "#2f4f4f",
      darkslategrey: "#2f4f4f",
      darkturquoise: "#00ced1",
      darkviolet: "#9400d3",
      deeppink: "#ff1493",
      deepskyblue: "#00bfff",
      dimgray: "#696969",
      dimgrey: "#696969",
      dodgerblue: "#1e90ff",
      firebrick: "#b22222",
      floralwhite: "#fffaf0",
      forestgreen: "#228b22",
      gainsboro: "#dcdcdc",
      ghostwhite: "#f8f8ff",
      gold: "#ffd700",
      goldenrod: "#daa520",
      greenyellow: "#adff2f",
      grey: "#808080",
      honeydew: "#f0fff0",
      hotpink: "#ff69b4",
      indianred: "#cd5c5c",
      indigo: "#4b0082",
      ivory: "#fffff0",
      khaki: "#f0e68c",
      lavender: "#e6e6fa",
      lavenderblush: "#fff0f5",
      lawngreen: "#7cfc00",
      lemonchiffon: "#fffacd",
      lightblue: "#add8e6",
      lightcoral: "#f08080",
      lightcyan: "#e0ffff",
      lightgoldenrodyellow: "#fafad2",
      lightgray: "#d3d3d3",
      lightgreen: "#90ee90",
      lightgrey: "#d3d3d3",
      lightpink: "#ffb6c1",
      lightsalmon: "#ffa07a",
      lightseagreen: "#20b2aa",
      lightskyblue: "#87cefa",
      lightslategray: "#778899",
      lightslategrey: "#778899",
      lightsteelblue: "#b0c4de",
      lightyellow: "#ffffe0",
      limegreen: "#32cd32",
      linen: "#faf0e6",
      mediumaquamarine: "#66cdaa",
      mediumblue: "#0000cd",
      mediumorchid: "#ba55d3",
      mediumpurple: "#9370db",
      mediumseagreen: "#3cb371",
      mediumslateblue: "#7b68ee",
      mediumspringgreen: "#00fa9a",
      mediumturquoise: "#48d1cc",
      mediumvioletred: "#c71585",
      midnightblue: "#191970",
      mintcream: "#f5fffa",
      mistyrose: "#ffe4e1",
      moccasin: "#ffe4b5",
      navajowhite: "#ffdead",
      oldlace: "#fdf5e6",
      olivedrab: "#6b8e23",
      orangered: "#ff4500",
      orchid: "#da70d6",
      palegoldenrod: "#eee8aa",
      palegreen: "#98fb98",
      paleturquoise: "#afeeee",
      palevioletred: "#db7093",
      papayawhip: "#ffefd5",
      peachpuff: "#ffdab9",
      peru: "#cd853f",
      pink: "#ffc0cb",
      plum: "#dda0dd",
      powderblue: "#b0e0e6",
      rosybrown: "#bc8f8f",
      royalblue: "#4169e1",
      saddlebrown: "#8b4513",
      salmon: "#fa8072",
      sandybrown: "#f4a460",
      seagreen: "#2e8b57",
      seashell: "#fff5ee",
      sienna: "#a0522d",
      skyblue: "#87ceeb",
      slateblue: "#6a5acd",
      slategray: "#708090",
      slategrey: "#708090",
      snow: "#fffafa",
      springgreen: "#00ff7f",
      steelblue: "#4682b4",
      tan: "#d2b48c",
      thistle: "#d8bfd8",
      tomato: "#ff6347",
      turquoise: "#40e0d0",
      violet: "#ee82ee",
      wheat: "#f5deb3",
      whitesmoke: "#f5f5f5",
      yellowgreen: "#9acd32",
      rebeccapurple: "#663399"
    };
  }
});
var require_css_color_keywords = __commonJS({
  "../node_modules/css-color-keywords/index.js"(exports2, module) {
    "use strict";
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    module.exports = require_colors();
  }
});
var require_css_to_react_native = __commonJS({
  "../node_modules/css-to-react-native/index.js"(exports2) {
    "use strict";
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    Object.defineProperty(exports2, "__esModule", {
      value: true
    });
    function _interopDefault(ex) {
      return ex && typeof ex === "object" && "default" in ex ? ex["default"] : ex;
    }
    __name(_interopDefault, "_interopDefault");
    __name2(_interopDefault, "_interopDefault");
    var parse3 = require_lib();
    var parse__default = _interopDefault(parse3);
    var camelizeStyleName = _interopDefault(require_camelize());
    var cssColorKeywords = _interopDefault(require_css_color_keywords());
    var matchString = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function matchString2(node) {
      if (node.type !== "string") return null;
      return node.value.replace(/\\([0-9a-f]{1,6})(?:\s|$)/gi, function(match2, charCode) {
        return String.fromCharCode(parseInt(charCode, 16));
      }).replace(/\\/g, "");
    }, "matchString2"), "matchString");
    var hexColorRe = /^(#(?:[0-9a-f]{3,4}){1,2})$/i;
    var cssFunctionNameRe = /^(rgba?|hsla?|hwb|lab|lch|gray|color)$/;
    var matchColor = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function matchColor2(node) {
      if (node.type === "word" && (hexColorRe.test(node.value) || node.value in cssColorKeywords || node.value === "transparent")) {
        return node.value;
      } else if (node.type === "function" && cssFunctionNameRe.test(node.value)) {
        return parse3.stringify(node);
      }
      return null;
    }, "matchColor2"), "matchColor");
    var noneRe = /^(none)$/i;
    var autoRe = /^(auto)$/i;
    var identRe = /(^-?[_a-z][_a-z0-9-]*$)/i;
    var numberRe = /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?)$/i;
    var lengthRe = /^(0$|(?:[+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?)(?=px$))/i;
    var unsupportedUnitRe = /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?(ch|em|ex|rem|vh|vw|vmin|vmax|cm|mm|in|pc|pt))$/i;
    var angleRe = /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?(?:deg|rad))$/i;
    var percentRe = /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?%)$/i;
    var noopToken = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function noopToken2(predicate) {
      return function(node) {
        return predicate(node) ? "<token>" : null;
      };
    }, "noopToken2"), "noopToken");
    var valueForTypeToken = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function valueForTypeToken2(type) {
      return function(node) {
        return node.type === type ? node.value : null;
      };
    }, "valueForTypeToken2"), "valueForTypeToken");
    var regExpToken = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function regExpToken2(regExp, transform2) {
      if (transform2 === void 0) {
        transform2 = String;
      }
      return function(node) {
        if (node.type !== "word") return null;
        var match2 = node.value.match(regExp);
        if (match2 === null) return null;
        var value = transform2(match2[1]);
        return value;
      };
    }, "regExpToken2"), "regExpToken");
    var SPACE = noopToken(function(node) {
      return node.type === "space";
    });
    var SLASH = noopToken(function(node) {
      return node.type === "div" && node.value === "/";
    });
    var COMMA = noopToken(function(node) {
      return node.type === "div" && node.value === ",";
    });
    var WORD = valueForTypeToken("word");
    var NONE = regExpToken(noneRe);
    var AUTO = regExpToken(autoRe);
    var NUMBER = regExpToken(numberRe, Number);
    var LENGTH = regExpToken(lengthRe, Number);
    var UNSUPPORTED_LENGTH_UNIT = regExpToken(unsupportedUnitRe);
    var ANGLE = regExpToken(angleRe, function(angle) {
      return angle.toLowerCase();
    });
    var PERCENT = regExpToken(percentRe);
    var IDENT = regExpToken(identRe);
    var STRING = matchString;
    var COLOR = matchColor;
    var LINE = regExpToken(/^(none|underline|line-through)$/i);
    var aspectRatio = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function aspectRatio2(tokenStream) {
      var aspectRatio3 = tokenStream.expect(NUMBER);
      if (tokenStream.hasTokens()) {
        tokenStream.expect(SLASH);
        aspectRatio3 /= tokenStream.expect(NUMBER);
      }
      return {
        aspectRatio: aspectRatio3
      };
    }, "aspectRatio2"), "aspectRatio");
    var BORDER_STYLE = regExpToken(/^(solid|dashed|dotted)$/);
    var defaultBorderWidth = 1;
    var defaultBorderColor = "black";
    var defaultBorderStyle = "solid";
    var border = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function border2(tokenStream) {
      var borderWidth2;
      var borderColor2;
      var borderStyle;
      if (tokenStream.matches(NONE)) {
        tokenStream.expectEmpty();
        return {
          borderWidth: 0,
          borderColor: "black",
          borderStyle: "solid"
        };
      }
      var partsParsed = 0;
      while (partsParsed < 3 && tokenStream.hasTokens()) {
        if (partsParsed !== 0) tokenStream.expect(SPACE);
        if (borderWidth2 === void 0 && tokenStream.matches(LENGTH, UNSUPPORTED_LENGTH_UNIT)) {
          borderWidth2 = tokenStream.lastValue;
        } else if (borderColor2 === void 0 && tokenStream.matches(COLOR)) {
          borderColor2 = tokenStream.lastValue;
        } else if (borderStyle === void 0 && tokenStream.matches(BORDER_STYLE)) {
          borderStyle = tokenStream.lastValue;
        } else {
          tokenStream["throw"]();
        }
        partsParsed += 1;
      }
      tokenStream.expectEmpty();
      if (borderWidth2 === void 0) borderWidth2 = defaultBorderWidth;
      if (borderColor2 === void 0) borderColor2 = defaultBorderColor;
      if (borderStyle === void 0) borderStyle = defaultBorderStyle;
      return {
        borderWidth: borderWidth2,
        borderColor: borderColor2,
        borderStyle
      };
    }, "border2"), "border");
    var directionFactory = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function directionFactory2(_ref) {
      var _ref$types = _ref.types, types = _ref$types === void 0 ? [LENGTH, UNSUPPORTED_LENGTH_UNIT, PERCENT] : _ref$types, _ref$directions = _ref.directions, directions = _ref$directions === void 0 ? ["Top", "Right", "Bottom", "Left"] : _ref$directions, _ref$prefix = _ref.prefix, prefix = _ref$prefix === void 0 ? "" : _ref$prefix, _ref$suffix = _ref.suffix, suffix = _ref$suffix === void 0 ? "" : _ref$suffix;
      return function(tokenStream) {
        var _ref2;
        var values = [];
        values.push(tokenStream.expect.apply(tokenStream, types));
        while (values.length < 4 && tokenStream.hasTokens()) {
          tokenStream.expect(SPACE);
          values.push(tokenStream.expect.apply(tokenStream, types));
        }
        tokenStream.expectEmpty();
        var top = values[0], _values$ = values[1], right = _values$ === void 0 ? top : _values$, _values$2 = values[2], bottom = _values$2 === void 0 ? top : _values$2, _values$3 = values[3], left = _values$3 === void 0 ? right : _values$3;
        var keyFor = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function keyFor2(n) {
          return "" + prefix + directions[n] + suffix;
        }, "keyFor2"), "keyFor");
        return _ref2 = {}, _ref2[keyFor(0)] = top, _ref2[keyFor(1)] = right, _ref2[keyFor(2)] = bottom, _ref2[keyFor(3)] = left, _ref2;
      };
    }, "directionFactory2"), "directionFactory");
    var parseShadowOffset = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseShadowOffset2(tokenStream) {
      var width = tokenStream.expect(LENGTH);
      var height = tokenStream.matches(SPACE) ? tokenStream.expect(LENGTH) : width;
      tokenStream.expectEmpty();
      return {
        width,
        height
      };
    }, "parseShadowOffset2"), "parseShadowOffset");
    var parseShadow = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseShadow2(tokenStream) {
      var offsetX;
      var offsetY;
      var radius;
      var color;
      if (tokenStream.matches(NONE)) {
        tokenStream.expectEmpty();
        return {
          offset: {
            width: 0,
            height: 0
          },
          radius: 0,
          color: "black"
        };
      }
      var didParseFirst = false;
      while (tokenStream.hasTokens()) {
        if (didParseFirst) tokenStream.expect(SPACE);
        if (offsetX === void 0 && tokenStream.matches(LENGTH, UNSUPPORTED_LENGTH_UNIT)) {
          offsetX = tokenStream.lastValue;
          tokenStream.expect(SPACE);
          offsetY = tokenStream.expect(LENGTH, UNSUPPORTED_LENGTH_UNIT);
          tokenStream.saveRewindPoint();
          if (tokenStream.matches(SPACE) && tokenStream.matches(LENGTH, UNSUPPORTED_LENGTH_UNIT)) {
            radius = tokenStream.lastValue;
          } else {
            tokenStream.rewind();
          }
        } else if (color === void 0 && tokenStream.matches(COLOR)) {
          color = tokenStream.lastValue;
        } else {
          tokenStream["throw"]();
        }
        didParseFirst = true;
      }
      if (offsetX === void 0) tokenStream["throw"]();
      return {
        offset: {
          width: offsetX,
          height: offsetY
        },
        radius: radius !== void 0 ? radius : 0,
        color: color !== void 0 ? color : "black"
      };
    }, "parseShadow2"), "parseShadow");
    var boxShadow = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function boxShadow2(tokenStream) {
      var _parseShadow = parseShadow(tokenStream), offset = _parseShadow.offset, radius = _parseShadow.radius, color = _parseShadow.color;
      return {
        shadowOffset: offset,
        shadowRadius: radius,
        shadowColor: color,
        shadowOpacity: 1
      };
    }, "boxShadow2"), "boxShadow");
    var defaultFlexGrow = 1;
    var defaultFlexShrink = 1;
    var defaultFlexBasis = 0;
    var flex = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function flex2(tokenStream) {
      var flexGrow;
      var flexShrink;
      var flexBasis;
      if (tokenStream.matches(NONE)) {
        tokenStream.expectEmpty();
        return {
          flexGrow: 0,
          flexShrink: 0,
          flexBasis: "auto"
        };
      }
      tokenStream.saveRewindPoint();
      if (tokenStream.matches(AUTO) && !tokenStream.hasTokens()) {
        return {
          flexGrow: 1,
          flexShrink: 1,
          flexBasis: "auto"
        };
      }
      tokenStream.rewind();
      var partsParsed = 0;
      while (partsParsed < 2 && tokenStream.hasTokens()) {
        if (partsParsed !== 0) tokenStream.expect(SPACE);
        if (flexGrow === void 0 && tokenStream.matches(NUMBER)) {
          flexGrow = tokenStream.lastValue;
          tokenStream.saveRewindPoint();
          if (tokenStream.matches(SPACE) && tokenStream.matches(NUMBER)) {
            flexShrink = tokenStream.lastValue;
          } else {
            tokenStream.rewind();
          }
        } else if (flexBasis === void 0 && tokenStream.matches(LENGTH, UNSUPPORTED_LENGTH_UNIT, PERCENT)) {
          flexBasis = tokenStream.lastValue;
        } else if (flexBasis === void 0 && tokenStream.matches(AUTO)) {
          flexBasis = "auto";
        } else {
          tokenStream["throw"]();
        }
        partsParsed += 1;
      }
      tokenStream.expectEmpty();
      if (flexGrow === void 0) flexGrow = defaultFlexGrow;
      if (flexShrink === void 0) flexShrink = defaultFlexShrink;
      if (flexBasis === void 0) flexBasis = defaultFlexBasis;
      return {
        flexGrow,
        flexShrink,
        flexBasis
      };
    }, "flex2"), "flex");
    var FLEX_WRAP = regExpToken(/(nowrap|wrap|wrap-reverse)/);
    var FLEX_DIRECTION = regExpToken(/(row|row-reverse|column|column-reverse)/);
    var defaultFlexWrap = "nowrap";
    var defaultFlexDirection = "row";
    var flexFlow = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function flexFlow2(tokenStream) {
      var flexWrap;
      var flexDirection;
      var partsParsed = 0;
      while (partsParsed < 2 && tokenStream.hasTokens()) {
        if (partsParsed !== 0) tokenStream.expect(SPACE);
        if (flexWrap === void 0 && tokenStream.matches(FLEX_WRAP)) {
          flexWrap = tokenStream.lastValue;
        } else if (flexDirection === void 0 && tokenStream.matches(FLEX_DIRECTION)) {
          flexDirection = tokenStream.lastValue;
        } else {
          tokenStream["throw"]();
        }
        partsParsed += 1;
      }
      tokenStream.expectEmpty();
      if (flexWrap === void 0) flexWrap = defaultFlexWrap;
      if (flexDirection === void 0) flexDirection = defaultFlexDirection;
      return {
        flexWrap,
        flexDirection
      };
    }, "flexFlow2"), "flexFlow");
    var fontFamily = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function fontFamily2(tokenStream) {
      var fontFamily3;
      if (tokenStream.matches(STRING)) {
        fontFamily3 = tokenStream.lastValue;
      } else {
        fontFamily3 = tokenStream.expect(IDENT);
        while (tokenStream.hasTokens()) {
          tokenStream.expect(SPACE);
          var nextIdent = tokenStream.expect(IDENT);
          fontFamily3 += " " + nextIdent;
        }
      }
      tokenStream.expectEmpty();
      return {
        fontFamily: fontFamily3
      };
    }, "fontFamily2"), "fontFamily");
    var NORMAL = regExpToken(/^(normal)$/);
    var STYLE = regExpToken(/^(italic)$/);
    var WEIGHT = regExpToken(/^([1-9]00|bold)$/);
    var VARIANT = regExpToken(/^(small-caps)$/);
    var defaultFontStyle = "normal";
    var defaultFontWeight = "normal";
    var defaultFontVariant = [];
    var font = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function font2(tokenStream) {
      var fontStyle;
      var fontWeight2;
      var fontVariant2;
      var lineHeight;
      var numStyleWeightVariantMatched = 0;
      while (numStyleWeightVariantMatched < 3 && tokenStream.hasTokens()) {
        if (tokenStream.matches(NORMAL)) ;
        else if (fontStyle === void 0 && tokenStream.matches(STYLE)) {
          fontStyle = tokenStream.lastValue;
        } else if (fontWeight2 === void 0 && tokenStream.matches(WEIGHT)) {
          fontWeight2 = tokenStream.lastValue;
        } else if (fontVariant2 === void 0 && tokenStream.matches(VARIANT)) {
          fontVariant2 = [tokenStream.lastValue];
        } else {
          break;
        }
        tokenStream.expect(SPACE);
        numStyleWeightVariantMatched += 1;
      }
      var fontSize = tokenStream.expect(LENGTH, UNSUPPORTED_LENGTH_UNIT);
      if (tokenStream.matches(SLASH)) {
        lineHeight = tokenStream.expect(LENGTH, UNSUPPORTED_LENGTH_UNIT);
      }
      tokenStream.expect(SPACE);
      var _fontFamily = fontFamily(tokenStream), fontFamily$1 = _fontFamily.fontFamily;
      if (fontStyle === void 0) fontStyle = defaultFontStyle;
      if (fontWeight2 === void 0) fontWeight2 = defaultFontWeight;
      if (fontVariant2 === void 0) fontVariant2 = defaultFontVariant;
      var out = {
        fontStyle,
        fontWeight: fontWeight2,
        fontVariant: fontVariant2,
        fontSize,
        fontFamily: fontFamily$1
      };
      if (lineHeight !== void 0) out.lineHeight = lineHeight;
      return out;
    }, "font2"), "font");
    var fontVariant = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function fontVariant2(tokenStream) {
      var values = [tokenStream.expect(IDENT)];
      while (tokenStream.hasTokens()) {
        tokenStream.expect(SPACE);
        values.push(tokenStream.expect(IDENT));
      }
      return {
        fontVariant: values
      };
    }, "fontVariant2"), "fontVariant");
    var ALIGN_CONTENT = regExpToken(/(flex-(?:start|end)|center|stretch|space-(?:between|around))/);
    var JUSTIFY_CONTENT = regExpToken(/(flex-(?:start|end)|center|space-(?:between|around|evenly))/);
    var placeContent = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function placeContent2(tokenStream) {
      var alignContent = tokenStream.expect(ALIGN_CONTENT);
      var justifyContent;
      if (tokenStream.hasTokens()) {
        tokenStream.expect(SPACE);
        justifyContent = tokenStream.expect(JUSTIFY_CONTENT);
      } else {
        justifyContent = "stretch";
      }
      tokenStream.expectEmpty();
      return {
        alignContent,
        justifyContent
      };
    }, "placeContent2"), "placeContent");
    var STYLE$1 = regExpToken(/^(solid|double|dotted|dashed)$/);
    var defaultTextDecorationLine = "none";
    var defaultTextDecorationStyle = "solid";
    var defaultTextDecorationColor = "black";
    var textDecoration = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function textDecoration2(tokenStream) {
      var line;
      var style;
      var color;
      var didParseFirst = false;
      while (tokenStream.hasTokens()) {
        if (didParseFirst) tokenStream.expect(SPACE);
        if (line === void 0 && tokenStream.matches(LINE)) {
          var lines = [tokenStream.lastValue.toLowerCase()];
          tokenStream.saveRewindPoint();
          if (lines[0] !== "none" && tokenStream.matches(SPACE) && tokenStream.matches(LINE)) {
            lines.push(tokenStream.lastValue.toLowerCase());
            lines.sort().reverse();
          } else {
            tokenStream.rewind();
          }
          line = lines.join(" ");
        } else if (style === void 0 && tokenStream.matches(STYLE$1)) {
          style = tokenStream.lastValue;
        } else if (color === void 0 && tokenStream.matches(COLOR)) {
          color = tokenStream.lastValue;
        } else {
          tokenStream["throw"]();
        }
        didParseFirst = true;
      }
      return {
        textDecorationLine: line !== void 0 ? line : defaultTextDecorationLine,
        textDecorationColor: color !== void 0 ? color : defaultTextDecorationColor,
        textDecorationStyle: style !== void 0 ? style : defaultTextDecorationStyle
      };
    }, "textDecoration2"), "textDecoration");
    var textDecorationLine = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function textDecorationLine2(tokenStream) {
      var lines = [];
      var didParseFirst = false;
      while (tokenStream.hasTokens()) {
        if (didParseFirst) tokenStream.expect(SPACE);
        lines.push(tokenStream.expect(LINE).toLowerCase());
        didParseFirst = true;
      }
      lines.sort().reverse();
      return {
        textDecorationLine: lines.join(" ")
      };
    }, "textDecorationLine2"), "textDecorationLine");
    var textShadow = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function textShadow2(tokenStream) {
      var _parseShadow2 = parseShadow(tokenStream), offset = _parseShadow2.offset, radius = _parseShadow2.radius, color = _parseShadow2.color;
      return {
        textShadowOffset: offset,
        textShadowRadius: radius,
        textShadowColor: color
      };
    }, "textShadow2"), "textShadow");
    var oneOfType = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function oneOfType2(tokenType) {
      return function(functionStream) {
        var value = functionStream.expect(tokenType);
        functionStream.expectEmpty();
        return value;
      };
    }, "oneOfType2"), "oneOfType");
    var singleNumber = oneOfType(NUMBER);
    var singleLength = oneOfType(LENGTH);
    var singleAngle = oneOfType(ANGLE);
    var xyTransformFactory = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function xyTransformFactory2(tokenType) {
      return function(key, valueIfOmitted) {
        return function(functionStream) {
          var _ref3, _ref4;
          var x22 = functionStream.expect(tokenType);
          var y;
          if (functionStream.hasTokens()) {
            functionStream.expect(COMMA);
            y = functionStream.expect(tokenType);
          } else if (valueIfOmitted !== void 0) {
            y = valueIfOmitted;
          } else {
            return x22;
          }
          functionStream.expectEmpty();
          return [(_ref3 = {}, _ref3[key + "Y"] = y, _ref3), (_ref4 = {}, _ref4[key + "X"] = x22, _ref4)];
        };
      };
    }, "xyTransformFactory2"), "xyTransformFactory");
    var xyNumber = xyTransformFactory(NUMBER);
    var xyLength = xyTransformFactory(LENGTH);
    var xyAngle = xyTransformFactory(ANGLE);
    var partTransforms = {
      perspective: singleNumber,
      scale: xyNumber("scale"),
      scaleX: singleNumber,
      scaleY: singleNumber,
      translate: xyLength("translate", 0),
      translateX: singleLength,
      translateY: singleLength,
      rotate: singleAngle,
      rotateX: singleAngle,
      rotateY: singleAngle,
      rotateZ: singleAngle,
      skewX: singleAngle,
      skewY: singleAngle,
      skew: xyAngle("skew", "0deg")
    };
    var transform = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function transform2(tokenStream) {
      var transforms2 = [];
      var didParseFirst = false;
      while (tokenStream.hasTokens()) {
        if (didParseFirst) tokenStream.expect(SPACE);
        var functionStream = tokenStream.expectFunction();
        var functionName = functionStream.functionName;
        var transformedValues = partTransforms[functionName](functionStream);
        if (!Array.isArray(transformedValues)) {
          var _ref5;
          transformedValues = [(_ref5 = {}, _ref5[functionName] = transformedValues, _ref5)];
        }
        transforms2 = transformedValues.concat(transforms2);
        didParseFirst = true;
      }
      return {
        transform: transforms2
      };
    }, "transform2"), "transform");
    var background = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function background2(tokenStream) {
      return {
        backgroundColor: tokenStream.expect(COLOR)
      };
    }, "background2"), "background");
    var borderColor = directionFactory({
      types: [COLOR],
      prefix: "border",
      suffix: "Color"
    });
    var borderRadius = directionFactory({
      directions: ["TopLeft", "TopRight", "BottomRight", "BottomLeft"],
      prefix: "border",
      suffix: "Radius"
    });
    var borderWidth = directionFactory({
      prefix: "border",
      suffix: "Width"
    });
    var margin = directionFactory({
      types: [LENGTH, UNSUPPORTED_LENGTH_UNIT, PERCENT, AUTO],
      prefix: "margin"
    });
    var padding = directionFactory({
      prefix: "padding"
    });
    var fontWeight = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function fontWeight2(tokenStream) {
      return {
        fontWeight: tokenStream.expect(WORD)
        // Also match numbers as strings
      };
    }, "fontWeight2"), "fontWeight");
    var shadowOffset = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function shadowOffset2(tokenStream) {
      return {
        shadowOffset: parseShadowOffset(tokenStream)
      };
    }, "shadowOffset2"), "shadowOffset");
    var textShadowOffset = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function textShadowOffset2(tokenStream) {
      return {
        textShadowOffset: parseShadowOffset(tokenStream)
      };
    }, "textShadowOffset2"), "textShadowOffset");
    var transforms = {
      aspectRatio,
      background,
      border,
      borderColor,
      borderRadius,
      borderWidth,
      boxShadow,
      flex,
      flexFlow,
      font,
      fontFamily,
      fontVariant,
      fontWeight,
      margin,
      padding,
      placeContent,
      shadowOffset,
      textShadow,
      textShadowOffset,
      textDecoration,
      textDecorationLine,
      transform
    };
    var propertiesWithoutUnits;
    if (true) {
      propertiesWithoutUnits = ["aspectRatio", "elevation", "flexGrow", "flexShrink", "opacity", "shadowOpacity", "zIndex"];
    }
    var devPropertiesWithUnitsRegExp = propertiesWithoutUnits != null ? new RegExp(propertiesWithoutUnits.join("|")) : null;
    var SYMBOL_MATCH = "SYMBOL_MATCH";
    var TokenStream = /* @__PURE__ */ (function() {
      function TokenStream2(nodes, parent) {
        this.index = 0;
        this.nodes = nodes;
        this.functionName = parent != null ? parent.value : null;
        this.lastValue = null;
        this.rewindIndex = -1;
      }
      __name(TokenStream2, "TokenStream2");
      __name2(TokenStream2, "TokenStream");
      var _proto = TokenStream2.prototype;
      _proto.hasTokens = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function hasTokens() {
        return this.index <= this.nodes.length - 1;
      }, "hasTokens"), "hasTokens");
      _proto[SYMBOL_MATCH] = function() {
        if (!this.hasTokens()) return null;
        var node = this.nodes[this.index];
        for (var i2 = 0; i2 < arguments.length; i2 += 1) {
          var tokenDescriptor = i2 < 0 || arguments.length <= i2 ? void 0 : arguments[i2];
          var value = tokenDescriptor(node);
          if (value !== null) {
            this.index += 1;
            this.lastValue = value;
            return value;
          }
        }
        return null;
      };
      _proto.matches = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function matches() {
        return this[SYMBOL_MATCH].apply(this, arguments) !== null;
      }, "matches"), "matches");
      _proto.expect = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function expect() {
        var value = this[SYMBOL_MATCH].apply(this, arguments);
        return value !== null ? value : this["throw"]();
      }, "expect"), "expect");
      _proto.matchesFunction = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function matchesFunction() {
        var node = this.nodes[this.index];
        if (node.type !== "function") return null;
        var value = new TokenStream2(node.nodes, node);
        this.index += 1;
        this.lastValue = null;
        return value;
      }, "matchesFunction"), "matchesFunction");
      _proto.expectFunction = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function expectFunction() {
        var value = this.matchesFunction();
        return value !== null ? value : this["throw"]();
      }, "expectFunction"), "expectFunction");
      _proto.expectEmpty = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function expectEmpty() {
        if (this.hasTokens()) this["throw"]();
      }, "expectEmpty"), "expectEmpty");
      _proto["throw"] = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function _throw() {
        throw new Error("Unexpected token type: " + this.nodes[this.index].type);
      }, "_throw"), "_throw");
      _proto.saveRewindPoint = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function saveRewindPoint() {
        this.rewindIndex = this.index;
      }, "saveRewindPoint"), "saveRewindPoint");
      _proto.rewind = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function rewind() {
        if (this.rewindIndex === -1) throw new Error("Internal error");
        this.index = this.rewindIndex;
        this.lastValue = null;
      }, "rewind"), "rewind");
      return TokenStream2;
    })();
    var numberOrLengthRe = /^([+-]?(?:\d*\.)?\d+(?:e[+-]?\d+)?)(?:px)?$/i;
    var numberOnlyRe = /^[+-]?(?:\d*\.\d*|[1-9]\d*)(?:e[+-]?\d+)?$/i;
    var boolRe = /^true|false$/i;
    var nullRe = /^null$/i;
    var undefinedRe = /^undefined$/i;
    var transformRawValue = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function transformRawValue2(propName, value) {
      if (true) {
        var needsUnit = !devPropertiesWithUnitsRegExp.test(propName);
        var isNumberWithoutUnit = numberOnlyRe.test(value);
        if (needsUnit && isNumberWithoutUnit) {
          console.warn('Expected style "' + propName + ": " + value + '" to contain units');
        }
        if (!needsUnit && value !== "0" && !isNumberWithoutUnit) {
          console.warn('Expected style "' + propName + ": " + value + '" to be unitless');
        }
      }
      var numberMatch = value.match(numberOrLengthRe);
      if (numberMatch !== null) return Number(numberMatch[1]);
      var boolMatch = value.match(boolRe);
      if (boolMatch !== null) return boolMatch[0].toLowerCase() === "true";
      var nullMatch = value.match(nullRe);
      if (nullMatch !== null) return null;
      var undefinedMatch = value.match(undefinedRe);
      if (undefinedMatch !== null) return void 0;
      return value;
    }, "transformRawValue2"), "transformRawValue");
    var baseTransformShorthandValue = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function baseTransformShorthandValue2(propName, value) {
      var ast = parse__default(value);
      var tokenStream = new TokenStream(ast.nodes);
      return transforms[propName](tokenStream);
    }, "baseTransformShorthandValue2"), "baseTransformShorthandValue");
    var transformShorthandValue = false ? baseTransformShorthandValue : function(propName, value) {
      try {
        return baseTransformShorthandValue(propName, value);
      } catch (e) {
        throw new Error('Failed to parse declaration "' + propName + ": " + value + '"');
      }
    };
    var getStylesForProperty = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function getStylesForProperty2(propName, inputValue, allowShorthand) {
      var _ref6;
      var isRawValue = allowShorthand === false || !(propName in transforms);
      var value = inputValue.trim();
      var propValues = isRawValue ? (_ref6 = {}, _ref6[propName] = transformRawValue(propName, value), _ref6) : transformShorthandValue(propName, value);
      return propValues;
    }, "getStylesForProperty2"), "getStylesForProperty");
    var getPropertyName = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function getPropertyName2(propName) {
      var isCustomProp = /^--\w+/.test(propName);
      if (isCustomProp) {
        return propName;
      }
      return camelizeStyleName(propName);
    }, "getPropertyName2"), "getPropertyName");
    var index = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function index2(rules, shorthandBlacklist) {
      if (shorthandBlacklist === void 0) {
        shorthandBlacklist = [];
      }
      return rules.reduce(function(accum, rule) {
        var propertyName = getPropertyName(rule[0]);
        var value = rule[1];
        var allowShorthand = shorthandBlacklist.indexOf(propertyName) === -1;
        return Object.assign(accum, getStylesForProperty(propertyName, value, allowShorthand));
      }, {});
    }, "index2"), "index");
    exports2["default"] = index;
    exports2.getPropertyName = getPropertyName;
    exports2.getStylesForProperty = getStylesForProperty;
    exports2.transformRawValue = transformRawValue;
  }
});
var require_css_background_parser = __commonJS({
  "../node_modules/css-background-parser/index.js"(exports2, module) {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    (function(exports3) {
      function BackgroundList(backgrounds) {
        if (!(this instanceof BackgroundList)) {
          return new BackgroundList();
        }
        this.backgrounds = backgrounds || [];
      }
      __name(BackgroundList, "BackgroundList");
      __name2(BackgroundList, "BackgroundList");
      BackgroundList.prototype.toString = function() {
        return this.backgrounds.join(", ");
      };
      function Background(props) {
        if (!(this instanceof Background)) {
          return new Background(props);
        }
        props = props || {};
        var bg = this;
        function defprop(name, defaultValue) {
          bg[name] = name in props ? props[name] : defaultValue;
        }
        __name(defprop, "defprop");
        __name2(defprop, "defprop");
        defprop("color", "");
        defprop("image", "none");
        defprop("attachment", "scroll");
        defprop("clip", "border-box");
        defprop("origin", "padding-box");
        defprop("position", "0% 0%");
        defprop("repeat", "repeat");
        defprop("size", "auto");
      }
      __name(Background, "Background");
      __name2(Background, "Background");
      Background.prototype.toString = function() {
        var list = [
          this.image,
          this.repeat,
          this.attachment,
          this.position + " / " + this.size,
          this.origin,
          this.clip
        ];
        if (this.color) {
          list.unshift(this.color);
        }
        return list.join(" ");
      };
      exports3.BackgroundList = BackgroundList;
      exports3.Background = Background;
      function parseImages(cssText) {
        var images = [];
        var tokens = /[,\(\)]/;
        var parens = 0;
        var buffer = "";
        if (cssText == null) {
          return images;
        }
        while (cssText.length) {
          var match2 = tokens.exec(cssText);
          if (!match2) {
            break;
          }
          var char = match2[0];
          var ignoreChar = false;
          switch (char) {
            case ",":
              if (!parens) {
                images.push(buffer.trim());
                buffer = "";
                ignoreChar = true;
              }
              break;
            case "(":
              parens++;
              break;
            case ")":
              parens--;
              break;
          }
          var index = match2.index + 1;
          buffer += cssText.slice(0, ignoreChar ? index - 1 : index);
          cssText = cssText.slice(index);
        }
        if (buffer.length || cssText.length) {
          images.push((buffer + cssText).trim());
        }
        return images;
      }
      __name(parseImages, "parseImages");
      __name2(parseImages, "parseImages");
      function trim(str) {
        return str.trim();
      }
      __name(trim, "trim");
      __name2(trim, "trim");
      function parseSimpleList(cssText) {
        return (cssText || "").split(",").map(trim);
      }
      __name(parseSimpleList, "parseSimpleList");
      __name2(parseSimpleList, "parseSimpleList");
      exports3.parseElementStyle = function(styleObject) {
        var list = new BackgroundList();
        if (styleObject == null) {
          return list;
        }
        var bgImage = parseImages(styleObject.backgroundImage);
        var bgColor = styleObject.backgroundColor;
        var bgAttachment = parseSimpleList(styleObject.backgroundAttachment);
        var bgClip = parseSimpleList(styleObject.backgroundClip);
        var bgOrigin = parseSimpleList(styleObject.backgroundOrigin);
        var bgPosition = parseSimpleList(styleObject.backgroundPosition);
        var bgRepeat = parseSimpleList(styleObject.backgroundRepeat);
        var bgSize = parseSimpleList(styleObject.backgroundSize);
        var background;
        for (var i2 = 0, ii = bgImage.length; i2 < ii; i2++) {
          background = new Background({
            image: bgImage[i2],
            attachment: bgAttachment[i2 % bgAttachment.length],
            clip: bgClip[i2 % bgClip.length],
            origin: bgOrigin[i2 % bgOrigin.length],
            position: bgPosition[i2 % bgPosition.length],
            repeat: bgRepeat[i2 % bgRepeat.length],
            size: bgSize[i2 % bgSize.length]
          });
          if (i2 === ii - 1) {
            background.color = bgColor;
          }
          list.backgrounds.push(background);
        }
        return list;
      };
    })((function(root) {
      if (typeof module !== "undefined" && module.exports !== void 0) return module.exports;
      return root.cssBgParser = {};
    })(exports2));
  }
});
var require_css_box_shadow = __commonJS({
  "../node_modules/css-box-shadow/index.js"(exports2, module) {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var VALUES_REG = /,(?![^\(]*\))/;
    var PARTS_REG = /\s(?![^(]*\))/;
    var LENGTH_REG = /^[0-9]+[a-zA-Z%]+?$/;
    var parseValue = /* @__PURE__ */ __name2((str) => {
      const parts = str.split(PARTS_REG);
      const inset = parts.includes("inset");
      const last = parts.slice(-1)[0];
      const color = !isLength(last) ? last : void 0;
      const nums = parts.filter((n) => n !== "inset").filter((n) => n !== color).map(toNum);
      const [offsetX, offsetY, blurRadius, spreadRadius] = nums;
      return {
        inset,
        offsetX,
        offsetY,
        blurRadius,
        spreadRadius,
        color
      };
    }, "parseValue");
    var stringifyValue = /* @__PURE__ */ __name2((obj) => {
      const {
        inset,
        offsetX = 0,
        offsetY = 0,
        blurRadius = 0,
        spreadRadius,
        color
      } = obj || {};
      return [
        inset ? "inset" : null,
        offsetX,
        offsetY,
        blurRadius,
        spreadRadius,
        color
      ].filter((v2) => v2 !== null && v2 !== void 0).map(toPx).map((s) => ("" + s).trim()).join(" ");
    }, "stringifyValue");
    var isLength = /* @__PURE__ */ __name2((v2) => v2 === "0" || LENGTH_REG.test(v2), "isLength");
    var toNum = /* @__PURE__ */ __name2((v2) => {
      if (!/px$/.test(v2) && v2 !== "0") return v2;
      const n = parseFloat(v2);
      return !isNaN(n) ? n : v2;
    }, "toNum");
    var toPx = /* @__PURE__ */ __name2((n) => typeof n === "number" && n !== 0 ? n + "px" : n, "toPx");
    var parse3 = /* @__PURE__ */ __name2((str) => str.split(VALUES_REG).map((s) => s.trim()).map(parseValue), "parse");
    var stringify = /* @__PURE__ */ __name2((arr) => arr.map(stringifyValue).join(", "), "stringify");
    module.exports = {
      parse: parse3,
      stringify
    };
  }
});
var require_index_umd = __commonJS({
  "../node_modules/parse-css-color/dist/index.umd.js"(exports2, module) {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    !(function(e, r) {
      "object" == typeof exports2 && "undefined" != typeof module ? module.exports = r() : "function" == typeof define && define.amd ? define(r) : (e = e || self).parseCssColor = r();
    })(exports2, (function() {
      "use strict";
      var e = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] }, r = new RegExp(/^#([a-f0-9]{3,4}|[a-f0-9]{4}(?:[a-f0-9]{2}){1,2})\b$/, "i"), n = "-?\\d*(?:\\.\\d+)", a = "(" + n + "?)", l2 = "(" + n + "?%)", t = ("^\n  hsla?\\(\n    \\s*(-?\\d*(?:\\.\\d+)?(?:deg|rad|turn)?)\\s*,\n    \\s*" + l2 + "\\s*,\n    \\s*" + l2 + "\\s*\n    (?:,\\s*(-?\\d*(?:\\.\\d+)?%?)\\s*)?\n  \\)\n  $\n").replace(/\n|\s/g, ""), s = new RegExp(t), i2 = ("^\n  hsla?\\(\n    \\s*(-?\\d*(?:\\.\\d+)?(?:deg|rad|turn)?)\\s*\n    \\s+" + l2 + "\n    \\s+" + l2 + "\n    \\s*(?:\\s*\\/\\s*(-?\\d*(?:\\.\\d+)?%?)\\s*)?\n  \\)\n  $\n").replace(/\n|\s/g, ""), o = new RegExp(i2), d2 = ("^\n  rgba?\\(\n    \\s*" + a + "\\s*,\n    \\s*" + a + "\\s*,\n    \\s*" + a + "\\s*\n    (?:,\\s*(-?\\d*(?:\\.\\d+)?%?)\\s*)?\n  \\)\n  $\n").replace(/\n|\s/g, ""), u2 = new RegExp(d2), g2 = ("^\n  rgba?\\(\n    \\s*" + l2 + "\\s*,\n    \\s*" + l2 + "\\s*,\n    \\s*" + l2 + "\\s*\n    (?:,\\s*(-?\\d*(?:\\.\\d+)?%?)\\s*)?\n  \\)\n  $\n").replace(/\n|\s/g, ""), p = new RegExp(g2), h2 = ("^\n  rgba?\\(\n    \\s*" + a + "\n    \\s+" + a + "\n    \\s+" + a + "\n    \\s*(?:\\s*\\/\\s*(-?\\d*(?:\\.\\d+)?%?)\\s*)?\n  \\)\n$\n").replace(/\n|\s/g, ""), c2 = new RegExp(h2), m2 = ("^\n  rgba?\\(\n    \\s*" + l2 + "\n    \\s+" + l2 + "\n    \\s+" + l2 + "\n    \\s*(?:\\s*\\/\\s*(-?\\d*(?:\\.\\d+)?%?)\\s*)?\n  \\)\n$\n").replace(/\n|\s/g, ""), f = new RegExp(m2), b = new RegExp(/^transparent$/, "i"), y = new RegExp("[^#a-f\\d]", "gi"), w2 = new RegExp("^#?[a-f\\d]{3}[a-f\\d]?$|^#?[a-f\\d]{6}([a-f\\d]{2})?$", "i"), k = /* @__PURE__ */ __name2(function(e2, r2, n2) {
        return Math.min(Math.max(r2, e2), n2);
      }, "k"), v2 = /* @__PURE__ */ __name2(function(e2) {
        var r2 = e2;
        return "number" != typeof r2 && (r2 = r2.endsWith("%") ? 255 * parseFloat(r2) / 100 : parseFloat(r2)), k(Math.round(r2), 0, 255);
      }, "v"), x22 = /* @__PURE__ */ __name2(function(e2) {
        return k(parseFloat(e2), 0, 100);
      }, "x");
      function E(e2) {
        var r2 = e2;
        return "number" != typeof r2 && (r2 = r2.endsWith("%") ? parseFloat(r2) / 100 : parseFloat(r2)), k(r2, 0, 1);
      }
      __name(E, "E");
      __name2(E, "E");
      function R2(e2) {
        var r2 = (function(e3, r3) {
          if (void 0 === r3 && (r3 = {}), "string" != typeof e3 || y.test(e3) || !w2.test(e3)) throw new TypeError("Expected a valid hex string");
          var n2 = 1;
          8 === (e3 = e3.replace(/^#/, "")).length && (n2 = Number.parseInt(e3.slice(6, 8), 16) / 255, e3 = e3.slice(0, 6)), 4 === e3.length && (n2 = Number.parseInt(e3.slice(3, 4).repeat(2), 16) / 255, e3 = e3.slice(0, 3)), 3 === e3.length && (e3 = e3[0] + e3[0] + e3[1] + e3[1] + e3[2] + e3[2]);
          var a2 = Number.parseInt(e3, 16), l3 = a2 >> 16, t2 = a2 >> 8 & 255, s2 = 255 & a2, i22 = "number" == typeof r3.alpha ? r3.alpha : n2;
          return "array" === r3.format ? [l3, t2, s2, i22] : "css" === r3.format ? "rgb(" + l3 + " " + t2 + " " + s2 + (1 === i22 ? "" : " / " + Number((100 * i22).toFixed(2)) + "%") + ")" : { red: l3, green: t2, blue: s2, alpha: i22 };
        })(e2, { format: "array" });
        return $([null, r2[0], r2[1], r2[2], r2[3]]);
      }
      __name(R2, "R2");
      __name2(R2, "R");
      function $(e2) {
        var r2 = e2[1], n2 = e2[2], a2 = e2[3], l3 = e2[4];
        return void 0 === l3 && (l3 = 1), { type: "rgb", values: [r2, n2, a2].map(v2), alpha: E(null === l3 ? 1 : l3) };
      }
      __name($, "$");
      __name2($, "$");
      return function(n2) {
        if ("string" != typeof n2) return null;
        var a2 = r.exec(n2);
        if (a2) return R2(a2[0]);
        var l3 = o.exec(n2) || s.exec(n2);
        if (l3) return (function(e2) {
          var r2 = e2[1], n3 = e2[2], a3 = e2[3], l4 = e2[4];
          void 0 === l4 && (l4 = 1);
          var t3 = r2;
          return { type: "hsl", values: [t3 = t3.endsWith("turn") ? 360 * parseFloat(t3) / 1 : t3.endsWith("rad") ? Math.round(180 * parseFloat(t3) / Math.PI) : parseFloat(t3), x22(n3), x22(a3)], alpha: E(null === l4 ? 1 : l4) };
        })(l3);
        var t2 = c2.exec(n2) || f.exec(n2) || u2.exec(n2) || p.exec(n2);
        if (t2) return $(t2);
        if (b.exec(n2)) return $([null, 0, 0, 0, 0]);
        var i22 = e[n2.toLowerCase()];
        return i22 ? $([null, i22[0], i22[1], i22[2], 1]) : null;
      };
    }));
  }
});
var require_escape_html = __commonJS({
  "../node_modules/escape-html/index.js"(exports2, module) {
    "use strict";
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    var matchHtmlRegExp = /["'&<>]/;
    module.exports = escapeHtml;
    function escapeHtml(string) {
      var str = "" + string;
      var match2 = matchHtmlRegExp.exec(str);
      if (!match2) {
        return str;
      }
      var escape;
      var html = "";
      var index = 0;
      var lastIndex = 0;
      for (index = match2.index; index < str.length; index++) {
        switch (str.charCodeAt(index)) {
          case 34:
            escape = "&quot;";
            break;
          case 38:
            escape = "&amp;";
            break;
          case 39:
            escape = "&#39;";
            break;
          case 60:
            escape = "&lt;";
            break;
          case 62:
            escape = "&gt;";
            break;
          default:
            continue;
        }
        if (lastIndex !== index) {
          html += str.substring(lastIndex, index);
        }
        lastIndex = index + 1;
        html += escape;
      }
      return lastIndex !== index ? html + str.substring(lastIndex, index) : html;
    }
    __name(escapeHtml, "escapeHtml");
    __name2(escapeHtml, "escapeHtml");
  }
});
function c(e, o = ",") {
  let t = [], n = 0, i2 = 0;
  o = new RegExp(o);
  for (let r = 0; r < e.length; r++) e[r] === "(" ? i2++ : e[r] === ")" && i2--, i2 === 0 && o.test(e[r]) && (t.push(e.slice(n, r).trim()), n = r + 1);
  return t.push(e.slice(n).trim()), t;
}
__name(c, "c");
function g(e) {
  let o = [];
  for (let t = 0, n = e.length; t < n; ) {
    let [i2, r] = c(e[t], /\s+/);
    m(e[t + 1]) ? (o.push({ color: i2, offset: l(r), hint: l(e[t + 1]) }), t += 2) : (o.push({ color: i2, offset: l(r) }), t++);
  }
  return o;
}
__name(g, "g");
function m(e) {
  return u.test(e);
}
__name(m, "m");
function l(e) {
  if (!e) return;
  let [, o, t] = e.trim().match(u) || [];
  return { value: o, unit: t ?? "px" };
}
__name(l, "l");
function P(e) {
  if (!/^(repeating-)?linear-gradient/.test(e)) throw new SyntaxError(`could not find syntax for this item: ${e}`);
  let [, o, t] = e.match(/(repeating-)?linear-gradient\((.+)\)/), n = { orientation: { type: "directional", value: "bottom" }, repeating: !!o, stops: [] }, i2 = c(t), r = x(i2[0]);
  return r && (n.orientation = r, i2.shift()), { ...n, stops: g(i2) };
}
__name(P, "P");
function x(e) {
  return e.startsWith("to ") ? { type: "directional", value: e.replace("to ", "") } : ["turn", "deg", "grad", "rad"].some((o) => e.endsWith(o)) ? { type: "angular", value: l(e) } : null;
}
__name(x, "x");
function d(e) {
  return v.has(e);
}
__name(d, "d");
function h(e) {
  return w.has(e);
}
__name(h, "h");
function R(e) {
  let o = Array(2).fill("");
  for (let t = 0; t < 2; t++) e[t] ? o[t] = e[t] : o[t] = "center";
  return o;
}
__name(R, "R");
function K(e) {
  if (!/(repeating-)?radial-gradient/.test(e)) throw new SyntaxError(`could not find syntax for this item: ${e}`);
  let [, o, t] = e.match(/(repeating-)?radial-gradient\((.+)\)/), n = { shape: "ellipse", repeating: !!o, size: [{ type: "keyword", value: "farthest-corner" }], position: { x: { type: "keyword", value: "center" }, y: { type: "keyword", value: "center" } }, stops: [] }, i2 = c(t);
  if (S(i2[0])) return { ...n, stops: g(i2) };
  let r = i2[0].split("at").map((f) => f.trim()), p = ((r[0] || "").match(/(circle|ellipse)/) || [])[1], a = (r[0] || "").match(/(-?\d+\.?\d*(vw|vh|px|em|rem|%|rad|grad|turn|deg)?|closest-corner|closest-side|farthest-corner|farthest-side)/g) || [], s = R((r[1] || "").split(" "));
  return p ? n.shape = p : a.length === 1 && !d(a[0]) ? n.shape = "circle" : n.shape = "ellipse", a.length === 0 && a.push("farthest-corner"), n.size = a.map((f) => d(f) ? { type: "keyword", value: f } : { type: "length", value: l(f) }), n.position.x = h(s[0]) ? { type: "keyword", value: s[0] } : { type: "length", value: l(s[0]) }, n.position.y = h(s[1]) ? { type: "keyword", value: s[1] } : { type: "length", value: l(s[1]) }, (p || a.length > 0 || r[1]) && i2.shift(), { ...n, stops: g(i2) };
}
__name(K, "K");
function S(e) {
  return /(circle|ellipse|at)/.test(e) ? false : /^(rgba?|hwb|hsl|lab|lch|oklab|color|#|[a-zA-Z]+)/.test(e);
}
__name(S, "S");
var u;
var v;
var w;
var init_dist = __esm({
  "../node_modules/css-gradient-parser/dist/index.js"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    __name2(c, "c");
    __name2(g, "g");
    u = /^(-?\d+\.?\d*)(%|vw|vh|px|em|rem|deg|rad|grad|turn|ch|vmin|vmax)?$/;
    __name2(m, "m");
    __name2(l, "l");
    __name2(P, "P");
    __name2(x, "x");
    v = /* @__PURE__ */ new Set(["closest-corner", "closest-side", "farthest-corner", "farthest-side"]);
    w = /* @__PURE__ */ new Set(["center", "left", "top", "right", "bottom"]);
    __name2(d, "d");
    __name2(h, "h");
    __name2(R, "R");
    __name2(K, "K");
    __name2(S, "S");
  }
});
function inflateSync(data, out) {
  return inflt(data, out);
}
__name(inflateSync, "inflateSync");
function Path() {
  this.commands = [];
  this.fill = "black";
  this.stroke = null;
  this.strokeWidth = 1;
}
__name(Path, "Path");
function DefaultEncoding(font) {
  this.font = font;
}
__name(DefaultEncoding, "DefaultEncoding");
function CmapEncoding(cmap2) {
  this.cmap = cmap2;
}
__name(CmapEncoding, "CmapEncoding");
function CffEncoding(encoding, charset) {
  this.encoding = encoding;
  this.charset = charset;
}
__name(CffEncoding, "CffEncoding");
function addGlyphNamesAll(font) {
  var glyph;
  var glyphIndexMap = font.tables.cmap.glyphIndexMap;
  var charCodes = Object.keys(glyphIndexMap);
  for (var i2 = 0; i2 < charCodes.length; i2 += 1) {
    var c2 = charCodes[i2];
    var glyphIndex = glyphIndexMap[c2];
    glyph = font.glyphs.get(glyphIndex);
    glyph.addUnicode(parseInt(c2));
  }
}
__name(addGlyphNamesAll, "addGlyphNamesAll");
function addGlyphNamesToUnicodeMap(font) {
  font._IndexToUnicodeMap = {};
  var glyphIndexMap = font.tables.cmap.glyphIndexMap;
  var charCodes = Object.keys(glyphIndexMap);
  for (var i2 = 0; i2 < charCodes.length; i2 += 1) {
    var c2 = charCodes[i2];
    var glyphIndex = glyphIndexMap[c2];
    if (font._IndexToUnicodeMap[glyphIndex] === void 0) {
      font._IndexToUnicodeMap[glyphIndex] = {
        unicodes: [parseInt(c2)]
      };
    } else {
      font._IndexToUnicodeMap[glyphIndex].unicodes.push(parseInt(c2));
    }
  }
}
__name(addGlyphNamesToUnicodeMap, "addGlyphNamesToUnicodeMap");
function addGlyphNames(font, opt) {
  if (opt.lowMemory) {
    addGlyphNamesToUnicodeMap(font);
  } else {
    addGlyphNamesAll(font);
  }
}
__name(addGlyphNames, "addGlyphNames");
function fail(message) {
  throw new Error(message);
}
__name(fail, "fail");
function argument(predicate, message) {
  if (!predicate) {
    fail(message);
  }
}
__name(argument, "argument");
function getPathDefinition(glyph, path) {
  var _path = path || new Path();
  return {
    configurable: true,
    get: /* @__PURE__ */ __name2(function() {
      if (typeof _path === "function") {
        _path = _path();
      }
      return _path;
    }, "get"),
    set: /* @__PURE__ */ __name2(function(p) {
      _path = p;
    }, "set")
  };
}
__name(getPathDefinition, "getPathDefinition");
function Glyph(options) {
  this.bindConstructorValues(options);
}
__name(Glyph, "Glyph");
function defineDependentProperty(glyph, externalName, internalName) {
  Object.defineProperty(glyph, externalName, {
    get: /* @__PURE__ */ __name2(function() {
      glyph.path;
      return glyph[internalName];
    }, "get"),
    set: /* @__PURE__ */ __name2(function(newValue) {
      glyph[internalName] = newValue;
    }, "set"),
    enumerable: true,
    configurable: true
  });
}
__name(defineDependentProperty, "defineDependentProperty");
function GlyphSet(font, glyphs) {
  this.font = font;
  this.glyphs = {};
  if (Array.isArray(glyphs)) {
    for (var i2 = 0; i2 < glyphs.length; i2++) {
      var glyph = glyphs[i2];
      glyph.path.unitsPerEm = font.unitsPerEm;
      this.glyphs[i2] = glyph;
    }
  }
  this.length = glyphs && glyphs.length || 0;
}
__name(GlyphSet, "GlyphSet");
function glyphLoader(font, index) {
  return new Glyph({ index, font });
}
__name(glyphLoader, "glyphLoader");
function ttfGlyphLoader(font, index, parseGlyph2, data, position, buildPath2) {
  return function() {
    var glyph = new Glyph({ index, font });
    glyph.path = function() {
      parseGlyph2(glyph, data, position);
      var path = buildPath2(font.glyphs, glyph);
      path.unitsPerEm = font.unitsPerEm;
      return path;
    };
    defineDependentProperty(glyph, "xMin", "_xMin");
    defineDependentProperty(glyph, "xMax", "_xMax");
    defineDependentProperty(glyph, "yMin", "_yMin");
    defineDependentProperty(glyph, "yMax", "_yMax");
    return glyph;
  };
}
__name(ttfGlyphLoader, "ttfGlyphLoader");
function cffGlyphLoader(font, index, parseCFFCharstring2, charstring) {
  return function() {
    var glyph = new Glyph({ index, font });
    glyph.path = function() {
      var path = parseCFFCharstring2(font, glyph, charstring);
      path.unitsPerEm = font.unitsPerEm;
      return path;
    };
    return glyph;
  };
}
__name(cffGlyphLoader, "cffGlyphLoader");
function searchTag(arr, tag) {
  var imin = 0;
  var imax = arr.length - 1;
  while (imin <= imax) {
    var imid = imin + imax >>> 1;
    var val = arr[imid].tag;
    if (val === tag) {
      return imid;
    } else if (val < tag) {
      imin = imid + 1;
    } else {
      imax = imid - 1;
    }
  }
  return -imin - 1;
}
__name(searchTag, "searchTag");
function binSearch(arr, value) {
  var imin = 0;
  var imax = arr.length - 1;
  while (imin <= imax) {
    var imid = imin + imax >>> 1;
    var val = arr[imid];
    if (val === value) {
      return imid;
    } else if (val < value) {
      imin = imid + 1;
    } else {
      imax = imid - 1;
    }
  }
  return -imin - 1;
}
__name(binSearch, "binSearch");
function searchRange(ranges, value) {
  var range;
  var imin = 0;
  var imax = ranges.length - 1;
  while (imin <= imax) {
    var imid = imin + imax >>> 1;
    range = ranges[imid];
    var start = range.start;
    if (start === value) {
      return range;
    } else if (start < value) {
      imin = imid + 1;
    } else {
      imax = imid - 1;
    }
  }
  if (imin > 0) {
    range = ranges[imin - 1];
    if (value > range.end) {
      return 0;
    }
    return range;
  }
}
__name(searchRange, "searchRange");
function Layout(font, tableName) {
  this.font = font;
  this.tableName = tableName;
}
__name(Layout, "Layout");
function Position(font) {
  Layout.call(this, font, "gpos");
}
__name(Position, "Position");
function Substitution(font) {
  Layout.call(this, font, "gsub");
}
__name(Substitution, "Substitution");
function arraysEqual(ar1, ar2) {
  var n = ar1.length;
  if (n !== ar2.length) {
    return false;
  }
  for (var i2 = 0; i2 < n; i2++) {
    if (ar1[i2] !== ar2[i2]) {
      return false;
    }
  }
  return true;
}
__name(arraysEqual, "arraysEqual");
function getSubstFormat(lookupTable, format, defaultSubtable) {
  var subtables = lookupTable.subtables;
  for (var i2 = 0; i2 < subtables.length; i2++) {
    var subtable = subtables[i2];
    if (subtable.substFormat === format) {
      return subtable;
    }
  }
  if (defaultSubtable) {
    subtables.push(defaultSubtable);
    return defaultSubtable;
  }
  return void 0;
}
__name(getSubstFormat, "getSubstFormat");
function checkArgument(expression, message) {
  if (!expression) {
    throw message;
  }
}
__name(checkArgument, "checkArgument");
function getByte(dataView, offset) {
  return dataView.getUint8(offset);
}
__name(getByte, "getByte");
function getUShort(dataView, offset) {
  return dataView.getUint16(offset, false);
}
__name(getUShort, "getUShort");
function getShort(dataView, offset) {
  return dataView.getInt16(offset, false);
}
__name(getShort, "getShort");
function getULong(dataView, offset) {
  return dataView.getUint32(offset, false);
}
__name(getULong, "getULong");
function getFixed(dataView, offset) {
  var decimal = dataView.getInt16(offset, false);
  var fraction = dataView.getUint16(offset + 2, false);
  return decimal + fraction / 65535;
}
__name(getFixed, "getFixed");
function getTag(dataView, offset) {
  var tag = "";
  for (var i2 = offset; i2 < offset + 4; i2 += 1) {
    tag += String.fromCharCode(dataView.getInt8(i2));
  }
  return tag;
}
__name(getTag, "getTag");
function getOffset(dataView, offset, offSize) {
  var v2 = 0;
  for (var i2 = 0; i2 < offSize; i2 += 1) {
    v2 <<= 8;
    v2 += dataView.getUint8(offset + i2);
  }
  return v2;
}
__name(getOffset, "getOffset");
function getBytes(dataView, startOffset, endOffset) {
  var bytes = [];
  for (var i2 = startOffset; i2 < endOffset; i2 += 1) {
    bytes.push(dataView.getUint8(i2));
  }
  return bytes;
}
__name(getBytes, "getBytes");
function bytesToString(bytes) {
  var s = "";
  for (var i2 = 0; i2 < bytes.length; i2 += 1) {
    s += String.fromCharCode(bytes[i2]);
  }
  return s;
}
__name(bytesToString, "bytesToString");
function Parser(data, offset) {
  this.data = data;
  this.offset = offset;
  this.relativeOffset = 0;
}
__name(Parser, "Parser");
function parseGlyphCoordinate(p, flag, previousValue, shortVectorBitMask, sameBitMask) {
  var v2;
  if ((flag & shortVectorBitMask) > 0) {
    v2 = p.parseByte();
    if ((flag & sameBitMask) === 0) {
      v2 = -v2;
    }
    v2 = previousValue + v2;
  } else {
    if ((flag & sameBitMask) > 0) {
      v2 = previousValue;
    } else {
      v2 = previousValue + p.parseShort();
    }
  }
  return v2;
}
__name(parseGlyphCoordinate, "parseGlyphCoordinate");
function parseGlyph(glyph, data, start) {
  var p = new parse.Parser(data, start);
  glyph.numberOfContours = p.parseShort();
  glyph._xMin = p.parseShort();
  glyph._yMin = p.parseShort();
  glyph._xMax = p.parseShort();
  glyph._yMax = p.parseShort();
  var flags2;
  var flag;
  if (glyph.numberOfContours > 0) {
    var endPointIndices = glyph.endPointIndices = [];
    for (var i2 = 0; i2 < glyph.numberOfContours; i2 += 1) {
      endPointIndices.push(p.parseUShort());
    }
    glyph.instructionLength = p.parseUShort();
    glyph.instructions = [];
    for (var i$1 = 0; i$1 < glyph.instructionLength; i$1 += 1) {
      glyph.instructions.push(p.parseByte());
    }
    var numberOfCoordinates = endPointIndices[endPointIndices.length - 1] + 1;
    flags2 = [];
    for (var i$2 = 0; i$2 < numberOfCoordinates; i$2 += 1) {
      flag = p.parseByte();
      flags2.push(flag);
      if ((flag & 8) > 0) {
        var repeatCount = p.parseByte();
        for (var j = 0; j < repeatCount; j += 1) {
          flags2.push(flag);
          i$2 += 1;
        }
      }
    }
    check.argument(flags2.length === numberOfCoordinates, "Bad flags.");
    if (endPointIndices.length > 0) {
      var points = [];
      var point;
      if (numberOfCoordinates > 0) {
        for (var i$3 = 0; i$3 < numberOfCoordinates; i$3 += 1) {
          flag = flags2[i$3];
          point = {};
          point.onCurve = !!(flag & 1);
          point.lastPointOfContour = endPointIndices.indexOf(i$3) >= 0;
          points.push(point);
        }
        var px = 0;
        for (var i$4 = 0; i$4 < numberOfCoordinates; i$4 += 1) {
          flag = flags2[i$4];
          point = points[i$4];
          point.x = parseGlyphCoordinate(p, flag, px, 2, 16);
          px = point.x;
        }
        var py = 0;
        for (var i$5 = 0; i$5 < numberOfCoordinates; i$5 += 1) {
          flag = flags2[i$5];
          point = points[i$5];
          point.y = parseGlyphCoordinate(p, flag, py, 4, 32);
          py = point.y;
        }
      }
      glyph.points = points;
    } else {
      glyph.points = [];
    }
  } else if (glyph.numberOfContours === 0) {
    glyph.points = [];
  } else {
    glyph.isComposite = true;
    glyph.points = [];
    glyph.components = [];
    var moreComponents = true;
    while (moreComponents) {
      flags2 = p.parseUShort();
      var component = {
        glyphIndex: p.parseUShort(),
        xScale: 1,
        scale01: 0,
        scale10: 0,
        yScale: 1,
        dx: 0,
        dy: 0
      };
      if ((flags2 & 1) > 0) {
        if ((flags2 & 2) > 0) {
          component.dx = p.parseShort();
          component.dy = p.parseShort();
        } else {
          component.matchedPoints = [p.parseUShort(), p.parseUShort()];
        }
      } else {
        if ((flags2 & 2) > 0) {
          component.dx = p.parseChar();
          component.dy = p.parseChar();
        } else {
          component.matchedPoints = [p.parseByte(), p.parseByte()];
        }
      }
      if ((flags2 & 8) > 0) {
        component.xScale = component.yScale = p.parseF2Dot14();
      } else if ((flags2 & 64) > 0) {
        component.xScale = p.parseF2Dot14();
        component.yScale = p.parseF2Dot14();
      } else if ((flags2 & 128) > 0) {
        component.xScale = p.parseF2Dot14();
        component.scale01 = p.parseF2Dot14();
        component.scale10 = p.parseF2Dot14();
        component.yScale = p.parseF2Dot14();
      }
      glyph.components.push(component);
      moreComponents = !!(flags2 & 32);
    }
    if (flags2 & 256) {
      glyph.instructionLength = p.parseUShort();
      glyph.instructions = [];
      for (var i$6 = 0; i$6 < glyph.instructionLength; i$6 += 1) {
        glyph.instructions.push(p.parseByte());
      }
    }
  }
}
__name(parseGlyph, "parseGlyph");
function transformPoints(points, transform) {
  var newPoints = [];
  for (var i2 = 0; i2 < points.length; i2 += 1) {
    var pt = points[i2];
    var newPt = {
      x: transform.xScale * pt.x + transform.scale01 * pt.y + transform.dx,
      y: transform.scale10 * pt.x + transform.yScale * pt.y + transform.dy,
      onCurve: pt.onCurve,
      lastPointOfContour: pt.lastPointOfContour
    };
    newPoints.push(newPt);
  }
  return newPoints;
}
__name(transformPoints, "transformPoints");
function getContours(points) {
  var contours = [];
  var currentContour = [];
  for (var i2 = 0; i2 < points.length; i2 += 1) {
    var pt = points[i2];
    currentContour.push(pt);
    if (pt.lastPointOfContour) {
      contours.push(currentContour);
      currentContour = [];
    }
  }
  check.argument(currentContour.length === 0, "There are still points left in the current contour.");
  return contours;
}
__name(getContours, "getContours");
function getPath(points) {
  var p = new Path();
  if (!points) {
    return p;
  }
  var contours = getContours(points);
  for (var contourIndex = 0; contourIndex < contours.length; ++contourIndex) {
    var contour = contours[contourIndex];
    var prev = null;
    var curr = contour[contour.length - 1];
    var next = contour[0];
    if (curr.onCurve) {
      p.moveTo(curr.x, curr.y);
    } else {
      if (next.onCurve) {
        p.moveTo(next.x, next.y);
      } else {
        var start = { x: (curr.x + next.x) * 0.5, y: (curr.y + next.y) * 0.5 };
        p.moveTo(start.x, start.y);
      }
    }
    for (var i2 = 0; i2 < contour.length; ++i2) {
      prev = curr;
      curr = next;
      next = contour[(i2 + 1) % contour.length];
      if (curr.onCurve) {
        p.lineTo(curr.x, curr.y);
      } else {
        var prev2 = prev;
        var next2 = next;
        if (!prev.onCurve) {
          prev2 = { x: (curr.x + prev.x) * 0.5, y: (curr.y + prev.y) * 0.5 };
        }
        if (!next.onCurve) {
          next2 = { x: (curr.x + next.x) * 0.5, y: (curr.y + next.y) * 0.5 };
        }
        p.quadraticCurveTo(curr.x, curr.y, next2.x, next2.y);
      }
    }
    p.closePath();
  }
  return p;
}
__name(getPath, "getPath");
function buildPath(glyphs, glyph) {
  if (glyph.isComposite) {
    for (var j = 0; j < glyph.components.length; j += 1) {
      var component = glyph.components[j];
      var componentGlyph = glyphs.get(component.glyphIndex);
      componentGlyph.getPath();
      if (componentGlyph.points) {
        var transformedPoints = void 0;
        if (component.matchedPoints === void 0) {
          transformedPoints = transformPoints(componentGlyph.points, component);
        } else {
          if (component.matchedPoints[0] > glyph.points.length - 1 || component.matchedPoints[1] > componentGlyph.points.length - 1) {
            throw Error("Matched points out of range in " + glyph.name);
          }
          var firstPt = glyph.points[component.matchedPoints[0]];
          var secondPt = componentGlyph.points[component.matchedPoints[1]];
          var transform = {
            xScale: component.xScale,
            scale01: component.scale01,
            scale10: component.scale10,
            yScale: component.yScale,
            dx: 0,
            dy: 0
          };
          secondPt = transformPoints([secondPt], transform)[0];
          transform.dx = firstPt.x - secondPt.x;
          transform.dy = firstPt.y - secondPt.y;
          transformedPoints = transformPoints(componentGlyph.points, transform);
        }
        glyph.points = glyph.points.concat(transformedPoints);
      }
    }
  }
  return getPath(glyph.points);
}
__name(buildPath, "buildPath");
function parseGlyfTableAll(data, start, loca2, font) {
  var glyphs = new glyphset.GlyphSet(font);
  for (var i2 = 0; i2 < loca2.length - 1; i2 += 1) {
    var offset = loca2[i2];
    var nextOffset = loca2[i2 + 1];
    if (offset !== nextOffset) {
      glyphs.push(i2, glyphset.ttfGlyphLoader(font, i2, parseGlyph, data, start + offset, buildPath));
    } else {
      glyphs.push(i2, glyphset.glyphLoader(font, i2));
    }
  }
  return glyphs;
}
__name(parseGlyfTableAll, "parseGlyfTableAll");
function parseGlyfTableOnLowMemory(data, start, loca2, font) {
  var glyphs = new glyphset.GlyphSet(font);
  font._push = function(i2) {
    var offset = loca2[i2];
    var nextOffset = loca2[i2 + 1];
    if (offset !== nextOffset) {
      glyphs.push(i2, glyphset.ttfGlyphLoader(font, i2, parseGlyph, data, start + offset, buildPath));
    } else {
      glyphs.push(i2, glyphset.glyphLoader(font, i2));
    }
  };
  return glyphs;
}
__name(parseGlyfTableOnLowMemory, "parseGlyfTableOnLowMemory");
function parseGlyfTable(data, start, loca2, font, opt) {
  if (opt.lowMemory) {
    return parseGlyfTableOnLowMemory(data, start, loca2, font);
  } else {
    return parseGlyfTableAll(data, start, loca2, font);
  }
}
__name(parseGlyfTable, "parseGlyfTable");
function Hinting(font) {
  this.font = font;
  this.getCommands = function(hPoints) {
    return glyf.getPath(hPoints).commands;
  };
  this._fpgmState = this._prepState = void 0;
  this._errorState = 0;
}
__name(Hinting, "Hinting");
function roundOff(v2) {
  return v2;
}
__name(roundOff, "roundOff");
function roundToGrid(v2) {
  return Math.sign(v2) * Math.round(Math.abs(v2));
}
__name(roundToGrid, "roundToGrid");
function roundToDoubleGrid(v2) {
  return Math.sign(v2) * Math.round(Math.abs(v2 * 2)) / 2;
}
__name(roundToDoubleGrid, "roundToDoubleGrid");
function roundToHalfGrid(v2) {
  return Math.sign(v2) * (Math.round(Math.abs(v2) + 0.5) - 0.5);
}
__name(roundToHalfGrid, "roundToHalfGrid");
function roundUpToGrid(v2) {
  return Math.sign(v2) * Math.ceil(Math.abs(v2));
}
__name(roundUpToGrid, "roundUpToGrid");
function roundDownToGrid(v2) {
  return Math.sign(v2) * Math.floor(Math.abs(v2));
}
__name(roundDownToGrid, "roundDownToGrid");
function UnitVector(x22, y) {
  this.x = x22;
  this.y = y;
  this.axis = void 0;
  this.slope = y / x22;
  this.normalSlope = -x22 / y;
  Object.freeze(this);
}
__name(UnitVector, "UnitVector");
function getUnitVector(x22, y) {
  var d2 = Math.sqrt(x22 * x22 + y * y);
  x22 /= d2;
  y /= d2;
  if (x22 === 1 && y === 0) {
    return xUnitVector;
  } else if (x22 === 0 && y === 1) {
    return yUnitVector;
  } else {
    return new UnitVector(x22, y);
  }
}
__name(getUnitVector, "getUnitVector");
function HPoint(x22, y, lastPointOfContour, onCurve) {
  this.x = this.xo = Math.round(x22 * 64) / 64;
  this.y = this.yo = Math.round(y * 64) / 64;
  this.lastPointOfContour = lastPointOfContour;
  this.onCurve = onCurve;
  this.prevPointOnContour = void 0;
  this.nextPointOnContour = void 0;
  this.xTouched = false;
  this.yTouched = false;
  Object.preventExtensions(this);
}
__name(HPoint, "HPoint");
function State(env22, prog) {
  this.env = env22;
  this.stack = [];
  this.prog = prog;
  switch (env22) {
    case "glyf":
      this.zp0 = this.zp1 = this.zp2 = 1;
      this.rp0 = this.rp1 = this.rp2 = 0;
    /* fall through */
    case "prep":
      this.fv = this.pv = this.dpv = xUnitVector;
      this.round = roundToGrid;
  }
}
__name(State, "State");
function initTZone(state) {
  var tZone = state.tZone = new Array(state.gZone.length);
  for (var i2 = 0; i2 < tZone.length; i2++) {
    tZone[i2] = new HPoint(0, 0);
  }
}
__name(initTZone, "initTZone");
function skip(state, handleElse) {
  var prog = state.prog;
  var ip = state.ip;
  var nesting = 1;
  var ins;
  do {
    ins = prog[++ip];
    if (ins === 88) {
      nesting++;
    } else if (ins === 89) {
      nesting--;
    } else if (ins === 64) {
      ip += prog[ip + 1] + 1;
    } else if (ins === 65) {
      ip += 2 * prog[ip + 1] + 1;
    } else if (ins >= 176 && ins <= 183) {
      ip += ins - 176 + 1;
    } else if (ins >= 184 && ins <= 191) {
      ip += (ins - 184 + 1) * 2;
    } else if (handleElse && nesting === 1 && ins === 27) {
      break;
    }
  } while (nesting > 0);
  state.ip = ip;
}
__name(skip, "skip");
function SVTCA(v2, state) {
  if (exports.DEBUG) {
    console.log(state.step, "SVTCA[" + v2.axis + "]");
  }
  state.fv = state.pv = state.dpv = v2;
}
__name(SVTCA, "SVTCA");
function SPVTCA(v2, state) {
  if (exports.DEBUG) {
    console.log(state.step, "SPVTCA[" + v2.axis + "]");
  }
  state.pv = state.dpv = v2;
}
__name(SPVTCA, "SPVTCA");
function SFVTCA(v2, state) {
  if (exports.DEBUG) {
    console.log(state.step, "SFVTCA[" + v2.axis + "]");
  }
  state.fv = v2;
}
__name(SFVTCA, "SFVTCA");
function SPVTL(a, state) {
  var stack = state.stack;
  var p2i = stack.pop();
  var p1i = stack.pop();
  var p2 = state.z2[p2i];
  var p1 = state.z1[p1i];
  if (exports.DEBUG) {
    console.log("SPVTL[" + a + "]", p2i, p1i);
  }
  var dx;
  var dy;
  if (!a) {
    dx = p1.x - p2.x;
    dy = p1.y - p2.y;
  } else {
    dx = p2.y - p1.y;
    dy = p1.x - p2.x;
  }
  state.pv = state.dpv = getUnitVector(dx, dy);
}
__name(SPVTL, "SPVTL");
function SFVTL(a, state) {
  var stack = state.stack;
  var p2i = stack.pop();
  var p1i = stack.pop();
  var p2 = state.z2[p2i];
  var p1 = state.z1[p1i];
  if (exports.DEBUG) {
    console.log("SFVTL[" + a + "]", p2i, p1i);
  }
  var dx;
  var dy;
  if (!a) {
    dx = p1.x - p2.x;
    dy = p1.y - p2.y;
  } else {
    dx = p2.y - p1.y;
    dy = p1.x - p2.x;
  }
  state.fv = getUnitVector(dx, dy);
}
__name(SFVTL, "SFVTL");
function SPVFS(state) {
  var stack = state.stack;
  var y = stack.pop();
  var x22 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SPVFS[]", y, x22);
  }
  state.pv = state.dpv = getUnitVector(x22, y);
}
__name(SPVFS, "SPVFS");
function SFVFS(state) {
  var stack = state.stack;
  var y = stack.pop();
  var x22 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SPVFS[]", y, x22);
  }
  state.fv = getUnitVector(x22, y);
}
__name(SFVFS, "SFVFS");
function GPV(state) {
  var stack = state.stack;
  var pv = state.pv;
  if (exports.DEBUG) {
    console.log(state.step, "GPV[]");
  }
  stack.push(pv.x * 16384);
  stack.push(pv.y * 16384);
}
__name(GPV, "GPV");
function GFV(state) {
  var stack = state.stack;
  var fv = state.fv;
  if (exports.DEBUG) {
    console.log(state.step, "GFV[]");
  }
  stack.push(fv.x * 16384);
  stack.push(fv.y * 16384);
}
__name(GFV, "GFV");
function SFVTPV(state) {
  state.fv = state.pv;
  if (exports.DEBUG) {
    console.log(state.step, "SFVTPV[]");
  }
}
__name(SFVTPV, "SFVTPV");
function ISECT(state) {
  var stack = state.stack;
  var pa0i = stack.pop();
  var pa1i = stack.pop();
  var pb0i = stack.pop();
  var pb1i = stack.pop();
  var pi = stack.pop();
  var z0 = state.z0;
  var z1 = state.z1;
  var pa0 = z0[pa0i];
  var pa1 = z0[pa1i];
  var pb0 = z1[pb0i];
  var pb1 = z1[pb1i];
  var p = state.z2[pi];
  if (exports.DEBUG) {
    console.log("ISECT[], ", pa0i, pa1i, pb0i, pb1i, pi);
  }
  var x1 = pa0.x;
  var y1 = pa0.y;
  var x22 = pa1.x;
  var y2 = pa1.y;
  var x3 = pb0.x;
  var y3 = pb0.y;
  var x4 = pb1.x;
  var y4 = pb1.y;
  var div = (x1 - x22) * (y3 - y4) - (y1 - y2) * (x3 - x4);
  var f1 = x1 * y2 - y1 * x22;
  var f2 = x3 * y4 - y3 * x4;
  p.x = (f1 * (x3 - x4) - f2 * (x1 - x22)) / div;
  p.y = (f1 * (y3 - y4) - f2 * (y1 - y2)) / div;
}
__name(ISECT, "ISECT");
function SRP0(state) {
  state.rp0 = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SRP0[]", state.rp0);
  }
}
__name(SRP0, "SRP0");
function SRP1(state) {
  state.rp1 = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SRP1[]", state.rp1);
  }
}
__name(SRP1, "SRP1");
function SRP2(state) {
  state.rp2 = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SRP2[]", state.rp2);
  }
}
__name(SRP2, "SRP2");
function SZP0(state) {
  var n = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SZP0[]", n);
  }
  state.zp0 = n;
  switch (n) {
    case 0:
      if (!state.tZone) {
        initTZone(state);
      }
      state.z0 = state.tZone;
      break;
    case 1:
      state.z0 = state.gZone;
      break;
    default:
      throw new Error("Invalid zone pointer");
  }
}
__name(SZP0, "SZP0");
function SZP1(state) {
  var n = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SZP1[]", n);
  }
  state.zp1 = n;
  switch (n) {
    case 0:
      if (!state.tZone) {
        initTZone(state);
      }
      state.z1 = state.tZone;
      break;
    case 1:
      state.z1 = state.gZone;
      break;
    default:
      throw new Error("Invalid zone pointer");
  }
}
__name(SZP1, "SZP1");
function SZP2(state) {
  var n = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SZP2[]", n);
  }
  state.zp2 = n;
  switch (n) {
    case 0:
      if (!state.tZone) {
        initTZone(state);
      }
      state.z2 = state.tZone;
      break;
    case 1:
      state.z2 = state.gZone;
      break;
    default:
      throw new Error("Invalid zone pointer");
  }
}
__name(SZP2, "SZP2");
function SZPS(state) {
  var n = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SZPS[]", n);
  }
  state.zp0 = state.zp1 = state.zp2 = n;
  switch (n) {
    case 0:
      if (!state.tZone) {
        initTZone(state);
      }
      state.z0 = state.z1 = state.z2 = state.tZone;
      break;
    case 1:
      state.z0 = state.z1 = state.z2 = state.gZone;
      break;
    default:
      throw new Error("Invalid zone pointer");
  }
}
__name(SZPS, "SZPS");
function SLOOP(state) {
  state.loop = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SLOOP[]", state.loop);
  }
}
__name(SLOOP, "SLOOP");
function RTG(state) {
  if (exports.DEBUG) {
    console.log(state.step, "RTG[]");
  }
  state.round = roundToGrid;
}
__name(RTG, "RTG");
function RTHG(state) {
  if (exports.DEBUG) {
    console.log(state.step, "RTHG[]");
  }
  state.round = roundToHalfGrid;
}
__name(RTHG, "RTHG");
function SMD(state) {
  var d2 = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SMD[]", d2);
  }
  state.minDis = d2 / 64;
}
__name(SMD, "SMD");
function ELSE(state) {
  if (exports.DEBUG) {
    console.log(state.step, "ELSE[]");
  }
  skip(state, false);
}
__name(ELSE, "ELSE");
function JMPR(state) {
  var o = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "JMPR[]", o);
  }
  state.ip += o - 1;
}
__name(JMPR, "JMPR");
function SCVTCI(state) {
  var n = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SCVTCI[]", n);
  }
  state.cvCutIn = n / 64;
}
__name(SCVTCI, "SCVTCI");
function DUP(state) {
  var stack = state.stack;
  if (exports.DEBUG) {
    console.log(state.step, "DUP[]");
  }
  stack.push(stack[stack.length - 1]);
}
__name(DUP, "DUP");
function POP(state) {
  if (exports.DEBUG) {
    console.log(state.step, "POP[]");
  }
  state.stack.pop();
}
__name(POP, "POP");
function CLEAR(state) {
  if (exports.DEBUG) {
    console.log(state.step, "CLEAR[]");
  }
  state.stack.length = 0;
}
__name(CLEAR, "CLEAR");
function SWAP(state) {
  var stack = state.stack;
  var a = stack.pop();
  var b = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SWAP[]");
  }
  stack.push(a);
  stack.push(b);
}
__name(SWAP, "SWAP");
function DEPTH(state) {
  var stack = state.stack;
  if (exports.DEBUG) {
    console.log(state.step, "DEPTH[]");
  }
  stack.push(stack.length);
}
__name(DEPTH, "DEPTH");
function LOOPCALL(state) {
  var stack = state.stack;
  var fn = stack.pop();
  var c2 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "LOOPCALL[]", fn, c2);
  }
  var cip = state.ip;
  var cprog = state.prog;
  state.prog = state.funcs[fn];
  for (var i2 = 0; i2 < c2; i2++) {
    exec(state);
    if (exports.DEBUG) {
      console.log(
        ++state.step,
        i2 + 1 < c2 ? "next loopcall" : "done loopcall",
        i2
      );
    }
  }
  state.ip = cip;
  state.prog = cprog;
}
__name(LOOPCALL, "LOOPCALL");
function CALL(state) {
  var fn = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "CALL[]", fn);
  }
  var cip = state.ip;
  var cprog = state.prog;
  state.prog = state.funcs[fn];
  exec(state);
  state.ip = cip;
  state.prog = cprog;
  if (exports.DEBUG) {
    console.log(++state.step, "returning from", fn);
  }
}
__name(CALL, "CALL");
function CINDEX(state) {
  var stack = state.stack;
  var k = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "CINDEX[]", k);
  }
  stack.push(stack[stack.length - k]);
}
__name(CINDEX, "CINDEX");
function MINDEX(state) {
  var stack = state.stack;
  var k = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "MINDEX[]", k);
  }
  stack.push(stack.splice(stack.length - k, 1)[0]);
}
__name(MINDEX, "MINDEX");
function FDEF(state) {
  if (state.env !== "fpgm") {
    throw new Error("FDEF not allowed here");
  }
  var stack = state.stack;
  var prog = state.prog;
  var ip = state.ip;
  var fn = stack.pop();
  var ipBegin = ip;
  if (exports.DEBUG) {
    console.log(state.step, "FDEF[]", fn);
  }
  while (prog[++ip] !== 45) {
  }
  state.ip = ip;
  state.funcs[fn] = prog.slice(ipBegin + 1, ip);
}
__name(FDEF, "FDEF");
function MDAP(round, state) {
  var pi = state.stack.pop();
  var p = state.z0[pi];
  var fv = state.fv;
  var pv = state.pv;
  if (exports.DEBUG) {
    console.log(state.step, "MDAP[" + round + "]", pi);
  }
  var d2 = pv.distance(p, HPZero);
  if (round) {
    d2 = state.round(d2);
  }
  fv.setRelative(p, HPZero, d2, pv);
  fv.touch(p);
  state.rp0 = state.rp1 = pi;
}
__name(MDAP, "MDAP");
function IUP(v2, state) {
  var z2 = state.z2;
  var pLen = z2.length - 2;
  var cp;
  var pp;
  var np;
  if (exports.DEBUG) {
    console.log(state.step, "IUP[" + v2.axis + "]");
  }
  for (var i2 = 0; i2 < pLen; i2++) {
    cp = z2[i2];
    if (v2.touched(cp)) {
      continue;
    }
    pp = cp.prevTouched(v2);
    if (pp === cp) {
      continue;
    }
    np = cp.nextTouched(v2);
    if (pp === np) {
      v2.setRelative(cp, cp, v2.distance(pp, pp, false, true), v2, true);
    }
    v2.interpolate(cp, pp, np, v2);
  }
}
__name(IUP, "IUP");
function SHP(a, state) {
  var stack = state.stack;
  var rpi = a ? state.rp1 : state.rp2;
  var rp = (a ? state.z0 : state.z1)[rpi];
  var fv = state.fv;
  var pv = state.pv;
  var loop = state.loop;
  var z2 = state.z2;
  while (loop--) {
    var pi = stack.pop();
    var p = z2[pi];
    var d2 = pv.distance(rp, rp, false, true);
    fv.setRelative(p, p, d2, pv);
    fv.touch(p);
    if (exports.DEBUG) {
      console.log(
        state.step,
        (state.loop > 1 ? "loop " + (state.loop - loop) + ": " : "") + "SHP[" + (a ? "rp1" : "rp2") + "]",
        pi
      );
    }
  }
  state.loop = 1;
}
__name(SHP, "SHP");
function SHC(a, state) {
  var stack = state.stack;
  var rpi = a ? state.rp1 : state.rp2;
  var rp = (a ? state.z0 : state.z1)[rpi];
  var fv = state.fv;
  var pv = state.pv;
  var ci = stack.pop();
  var sp = state.z2[state.contours[ci]];
  var p = sp;
  if (exports.DEBUG) {
    console.log(state.step, "SHC[" + a + "]", ci);
  }
  var d2 = pv.distance(rp, rp, false, true);
  do {
    if (p !== rp) {
      fv.setRelative(p, p, d2, pv);
    }
    p = p.nextPointOnContour;
  } while (p !== sp);
}
__name(SHC, "SHC");
function SHZ(a, state) {
  var stack = state.stack;
  var rpi = a ? state.rp1 : state.rp2;
  var rp = (a ? state.z0 : state.z1)[rpi];
  var fv = state.fv;
  var pv = state.pv;
  var e = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SHZ[" + a + "]", e);
  }
  var z;
  switch (e) {
    case 0:
      z = state.tZone;
      break;
    case 1:
      z = state.gZone;
      break;
    default:
      throw new Error("Invalid zone");
  }
  var p;
  var d2 = pv.distance(rp, rp, false, true);
  var pLen = z.length - 2;
  for (var i2 = 0; i2 < pLen; i2++) {
    p = z[i2];
    fv.setRelative(p, p, d2, pv);
  }
}
__name(SHZ, "SHZ");
function SHPIX(state) {
  var stack = state.stack;
  var loop = state.loop;
  var fv = state.fv;
  var d2 = stack.pop() / 64;
  var z2 = state.z2;
  while (loop--) {
    var pi = stack.pop();
    var p = z2[pi];
    if (exports.DEBUG) {
      console.log(
        state.step,
        (state.loop > 1 ? "loop " + (state.loop - loop) + ": " : "") + "SHPIX[]",
        pi,
        d2
      );
    }
    fv.setRelative(p, p, d2);
    fv.touch(p);
  }
  state.loop = 1;
}
__name(SHPIX, "SHPIX");
function IP(state) {
  var stack = state.stack;
  var rp1i = state.rp1;
  var rp2i = state.rp2;
  var loop = state.loop;
  var rp1 = state.z0[rp1i];
  var rp2 = state.z1[rp2i];
  var fv = state.fv;
  var pv = state.dpv;
  var z2 = state.z2;
  while (loop--) {
    var pi = stack.pop();
    var p = z2[pi];
    if (exports.DEBUG) {
      console.log(
        state.step,
        (state.loop > 1 ? "loop " + (state.loop - loop) + ": " : "") + "IP[]",
        pi,
        rp1i,
        "<->",
        rp2i
      );
    }
    fv.interpolate(p, rp1, rp2, pv);
    fv.touch(p);
  }
  state.loop = 1;
}
__name(IP, "IP");
function MSIRP(a, state) {
  var stack = state.stack;
  var d2 = stack.pop() / 64;
  var pi = stack.pop();
  var p = state.z1[pi];
  var rp0 = state.z0[state.rp0];
  var fv = state.fv;
  var pv = state.pv;
  fv.setRelative(p, rp0, d2, pv);
  fv.touch(p);
  if (exports.DEBUG) {
    console.log(state.step, "MSIRP[" + a + "]", d2, pi);
  }
  state.rp1 = state.rp0;
  state.rp2 = pi;
  if (a) {
    state.rp0 = pi;
  }
}
__name(MSIRP, "MSIRP");
function ALIGNRP(state) {
  var stack = state.stack;
  var rp0i = state.rp0;
  var rp0 = state.z0[rp0i];
  var loop = state.loop;
  var fv = state.fv;
  var pv = state.pv;
  var z1 = state.z1;
  while (loop--) {
    var pi = stack.pop();
    var p = z1[pi];
    if (exports.DEBUG) {
      console.log(
        state.step,
        (state.loop > 1 ? "loop " + (state.loop - loop) + ": " : "") + "ALIGNRP[]",
        pi
      );
    }
    fv.setRelative(p, rp0, 0, pv);
    fv.touch(p);
  }
  state.loop = 1;
}
__name(ALIGNRP, "ALIGNRP");
function RTDG(state) {
  if (exports.DEBUG) {
    console.log(state.step, "RTDG[]");
  }
  state.round = roundToDoubleGrid;
}
__name(RTDG, "RTDG");
function MIAP(round, state) {
  var stack = state.stack;
  var n = stack.pop();
  var pi = stack.pop();
  var p = state.z0[pi];
  var fv = state.fv;
  var pv = state.pv;
  var cv = state.cvt[n];
  if (exports.DEBUG) {
    console.log(
      state.step,
      "MIAP[" + round + "]",
      n,
      "(",
      cv,
      ")",
      pi
    );
  }
  var d2 = pv.distance(p, HPZero);
  if (round) {
    if (Math.abs(d2 - cv) < state.cvCutIn) {
      d2 = cv;
    }
    d2 = state.round(d2);
  }
  fv.setRelative(p, HPZero, d2, pv);
  if (state.zp0 === 0) {
    p.xo = p.x;
    p.yo = p.y;
  }
  fv.touch(p);
  state.rp0 = state.rp1 = pi;
}
__name(MIAP, "MIAP");
function NPUSHB(state) {
  var prog = state.prog;
  var ip = state.ip;
  var stack = state.stack;
  var n = prog[++ip];
  if (exports.DEBUG) {
    console.log(state.step, "NPUSHB[]", n);
  }
  for (var i2 = 0; i2 < n; i2++) {
    stack.push(prog[++ip]);
  }
  state.ip = ip;
}
__name(NPUSHB, "NPUSHB");
function NPUSHW(state) {
  var ip = state.ip;
  var prog = state.prog;
  var stack = state.stack;
  var n = prog[++ip];
  if (exports.DEBUG) {
    console.log(state.step, "NPUSHW[]", n);
  }
  for (var i2 = 0; i2 < n; i2++) {
    var w2 = prog[++ip] << 8 | prog[++ip];
    if (w2 & 32768) {
      w2 = -((w2 ^ 65535) + 1);
    }
    stack.push(w2);
  }
  state.ip = ip;
}
__name(NPUSHW, "NPUSHW");
function WS(state) {
  var stack = state.stack;
  var store = state.store;
  if (!store) {
    store = state.store = [];
  }
  var v2 = stack.pop();
  var l2 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "WS", v2, l2);
  }
  store[l2] = v2;
}
__name(WS, "WS");
function RS(state) {
  var stack = state.stack;
  var store = state.store;
  var l2 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "RS", l2);
  }
  var v2 = store && store[l2] || 0;
  stack.push(v2);
}
__name(RS, "RS");
function WCVTP(state) {
  var stack = state.stack;
  var v2 = stack.pop();
  var l2 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "WCVTP", v2, l2);
  }
  state.cvt[l2] = v2 / 64;
}
__name(WCVTP, "WCVTP");
function RCVT(state) {
  var stack = state.stack;
  var cvte = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "RCVT", cvte);
  }
  stack.push(state.cvt[cvte] * 64);
}
__name(RCVT, "RCVT");
function GC(a, state) {
  var stack = state.stack;
  var pi = stack.pop();
  var p = state.z2[pi];
  if (exports.DEBUG) {
    console.log(state.step, "GC[" + a + "]", pi);
  }
  stack.push(state.dpv.distance(p, HPZero, a, false) * 64);
}
__name(GC, "GC");
function MD(a, state) {
  var stack = state.stack;
  var pi2 = stack.pop();
  var pi1 = stack.pop();
  var p2 = state.z1[pi2];
  var p1 = state.z0[pi1];
  var d2 = state.dpv.distance(p1, p2, a, a);
  if (exports.DEBUG) {
    console.log(state.step, "MD[" + a + "]", pi2, pi1, "->", d2);
  }
  state.stack.push(Math.round(d2 * 64));
}
__name(MD, "MD");
function MPPEM(state) {
  if (exports.DEBUG) {
    console.log(state.step, "MPPEM[]");
  }
  state.stack.push(state.ppem);
}
__name(MPPEM, "MPPEM");
function FLIPON(state) {
  if (exports.DEBUG) {
    console.log(state.step, "FLIPON[]");
  }
  state.autoFlip = true;
}
__name(FLIPON, "FLIPON");
function LT(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "LT[]", e2, e1);
  }
  stack.push(e1 < e2 ? 1 : 0);
}
__name(LT, "LT");
function LTEQ(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "LTEQ[]", e2, e1);
  }
  stack.push(e1 <= e2 ? 1 : 0);
}
__name(LTEQ, "LTEQ");
function GT(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "GT[]", e2, e1);
  }
  stack.push(e1 > e2 ? 1 : 0);
}
__name(GT, "GT");
function GTEQ(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "GTEQ[]", e2, e1);
  }
  stack.push(e1 >= e2 ? 1 : 0);
}
__name(GTEQ, "GTEQ");
function EQ(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "EQ[]", e2, e1);
  }
  stack.push(e2 === e1 ? 1 : 0);
}
__name(EQ, "EQ");
function NEQ(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "NEQ[]", e2, e1);
  }
  stack.push(e2 !== e1 ? 1 : 0);
}
__name(NEQ, "NEQ");
function ODD(state) {
  var stack = state.stack;
  var n = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "ODD[]", n);
  }
  stack.push(Math.trunc(n) % 2 ? 1 : 0);
}
__name(ODD, "ODD");
function EVEN(state) {
  var stack = state.stack;
  var n = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "EVEN[]", n);
  }
  stack.push(Math.trunc(n) % 2 ? 0 : 1);
}
__name(EVEN, "EVEN");
function IF(state) {
  var test = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "IF[]", test);
  }
  if (!test) {
    skip(state, true);
    if (exports.DEBUG) {
      console.log(state.step, "EIF[]");
    }
  }
}
__name(IF, "IF");
function EIF(state) {
  if (exports.DEBUG) {
    console.log(state.step, "EIF[]");
  }
}
__name(EIF, "EIF");
function AND(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "AND[]", e2, e1);
  }
  stack.push(e2 && e1 ? 1 : 0);
}
__name(AND, "AND");
function OR(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "OR[]", e2, e1);
  }
  stack.push(e2 || e1 ? 1 : 0);
}
__name(OR, "OR");
function NOT(state) {
  var stack = state.stack;
  var e = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "NOT[]", e);
  }
  stack.push(e ? 0 : 1);
}
__name(NOT, "NOT");
function DELTAP123(b, state) {
  var stack = state.stack;
  var n = stack.pop();
  var fv = state.fv;
  var pv = state.pv;
  var ppem = state.ppem;
  var base = state.deltaBase + (b - 1) * 16;
  var ds2 = state.deltaShift;
  var z0 = state.z0;
  if (exports.DEBUG) {
    console.log(state.step, "DELTAP[" + b + "]", n, stack);
  }
  for (var i2 = 0; i2 < n; i2++) {
    var pi = stack.pop();
    var arg = stack.pop();
    var appem = base + ((arg & 240) >> 4);
    if (appem !== ppem) {
      continue;
    }
    var mag = (arg & 15) - 8;
    if (mag >= 0) {
      mag++;
    }
    if (exports.DEBUG) {
      console.log(state.step, "DELTAPFIX", pi, "by", mag * ds2);
    }
    var p = z0[pi];
    fv.setRelative(p, p, mag * ds2, pv);
  }
}
__name(DELTAP123, "DELTAP123");
function SDB(state) {
  var stack = state.stack;
  var n = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SDB[]", n);
  }
  state.deltaBase = n;
}
__name(SDB, "SDB");
function SDS(state) {
  var stack = state.stack;
  var n = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SDS[]", n);
  }
  state.deltaShift = Math.pow(0.5, n);
}
__name(SDS, "SDS");
function ADD(state) {
  var stack = state.stack;
  var n2 = stack.pop();
  var n1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "ADD[]", n2, n1);
  }
  stack.push(n1 + n2);
}
__name(ADD, "ADD");
function SUB(state) {
  var stack = state.stack;
  var n2 = stack.pop();
  var n1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SUB[]", n2, n1);
  }
  stack.push(n1 - n2);
}
__name(SUB, "SUB");
function DIV(state) {
  var stack = state.stack;
  var n2 = stack.pop();
  var n1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "DIV[]", n2, n1);
  }
  stack.push(n1 * 64 / n2);
}
__name(DIV, "DIV");
function MUL(state) {
  var stack = state.stack;
  var n2 = stack.pop();
  var n1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "MUL[]", n2, n1);
  }
  stack.push(n1 * n2 / 64);
}
__name(MUL, "MUL");
function ABS(state) {
  var stack = state.stack;
  var n = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "ABS[]", n);
  }
  stack.push(Math.abs(n));
}
__name(ABS, "ABS");
function NEG(state) {
  var stack = state.stack;
  var n = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "NEG[]", n);
  }
  stack.push(-n);
}
__name(NEG, "NEG");
function FLOOR(state) {
  var stack = state.stack;
  var n = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "FLOOR[]", n);
  }
  stack.push(Math.floor(n / 64) * 64);
}
__name(FLOOR, "FLOOR");
function CEILING(state) {
  var stack = state.stack;
  var n = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "CEILING[]", n);
  }
  stack.push(Math.ceil(n / 64) * 64);
}
__name(CEILING, "CEILING");
function ROUND(dt, state) {
  var stack = state.stack;
  var n = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "ROUND[]");
  }
  stack.push(state.round(n / 64) * 64);
}
__name(ROUND, "ROUND");
function WCVTF(state) {
  var stack = state.stack;
  var v2 = stack.pop();
  var l2 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "WCVTF[]", v2, l2);
  }
  state.cvt[l2] = v2 * state.ppem / state.font.unitsPerEm;
}
__name(WCVTF, "WCVTF");
function DELTAC123(b, state) {
  var stack = state.stack;
  var n = stack.pop();
  var ppem = state.ppem;
  var base = state.deltaBase + (b - 1) * 16;
  var ds2 = state.deltaShift;
  if (exports.DEBUG) {
    console.log(state.step, "DELTAC[" + b + "]", n, stack);
  }
  for (var i2 = 0; i2 < n; i2++) {
    var c2 = stack.pop();
    var arg = stack.pop();
    var appem = base + ((arg & 240) >> 4);
    if (appem !== ppem) {
      continue;
    }
    var mag = (arg & 15) - 8;
    if (mag >= 0) {
      mag++;
    }
    var delta = mag * ds2;
    if (exports.DEBUG) {
      console.log(state.step, "DELTACFIX", c2, "by", delta);
    }
    state.cvt[c2] += delta;
  }
}
__name(DELTAC123, "DELTAC123");
function SROUND(state) {
  var n = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SROUND[]", n);
  }
  state.round = roundSuper;
  var period;
  switch (n & 192) {
    case 0:
      period = 0.5;
      break;
    case 64:
      period = 1;
      break;
    case 128:
      period = 2;
      break;
    default:
      throw new Error("invalid SROUND value");
  }
  state.srPeriod = period;
  switch (n & 48) {
    case 0:
      state.srPhase = 0;
      break;
    case 16:
      state.srPhase = 0.25 * period;
      break;
    case 32:
      state.srPhase = 0.5 * period;
      break;
    case 48:
      state.srPhase = 0.75 * period;
      break;
    default:
      throw new Error("invalid SROUND value");
  }
  n &= 15;
  if (n === 0) {
    state.srThreshold = 0;
  } else {
    state.srThreshold = (n / 8 - 0.5) * period;
  }
}
__name(SROUND, "SROUND");
function S45ROUND(state) {
  var n = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "S45ROUND[]", n);
  }
  state.round = roundSuper;
  var period;
  switch (n & 192) {
    case 0:
      period = Math.sqrt(2) / 2;
      break;
    case 64:
      period = Math.sqrt(2);
      break;
    case 128:
      period = 2 * Math.sqrt(2);
      break;
    default:
      throw new Error("invalid S45ROUND value");
  }
  state.srPeriod = period;
  switch (n & 48) {
    case 0:
      state.srPhase = 0;
      break;
    case 16:
      state.srPhase = 0.25 * period;
      break;
    case 32:
      state.srPhase = 0.5 * period;
      break;
    case 48:
      state.srPhase = 0.75 * period;
      break;
    default:
      throw new Error("invalid S45ROUND value");
  }
  n &= 15;
  if (n === 0) {
    state.srThreshold = 0;
  } else {
    state.srThreshold = (n / 8 - 0.5) * period;
  }
}
__name(S45ROUND, "S45ROUND");
function ROFF(state) {
  if (exports.DEBUG) {
    console.log(state.step, "ROFF[]");
  }
  state.round = roundOff;
}
__name(ROFF, "ROFF");
function RUTG(state) {
  if (exports.DEBUG) {
    console.log(state.step, "RUTG[]");
  }
  state.round = roundUpToGrid;
}
__name(RUTG, "RUTG");
function RDTG(state) {
  if (exports.DEBUG) {
    console.log(state.step, "RDTG[]");
  }
  state.round = roundDownToGrid;
}
__name(RDTG, "RDTG");
function SCANCTRL(state) {
  var n = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SCANCTRL[]", n);
  }
}
__name(SCANCTRL, "SCANCTRL");
function SDPVTL(a, state) {
  var stack = state.stack;
  var p2i = stack.pop();
  var p1i = stack.pop();
  var p2 = state.z2[p2i];
  var p1 = state.z1[p1i];
  if (exports.DEBUG) {
    console.log(state.step, "SDPVTL[" + a + "]", p2i, p1i);
  }
  var dx;
  var dy;
  if (!a) {
    dx = p1.x - p2.x;
    dy = p1.y - p2.y;
  } else {
    dx = p2.y - p1.y;
    dy = p1.x - p2.x;
  }
  state.dpv = getUnitVector(dx, dy);
}
__name(SDPVTL, "SDPVTL");
function GETINFO(state) {
  var stack = state.stack;
  var sel = stack.pop();
  var r = 0;
  if (exports.DEBUG) {
    console.log(state.step, "GETINFO[]", sel);
  }
  if (sel & 1) {
    r = 35;
  }
  if (sel & 32) {
    r |= 4096;
  }
  stack.push(r);
}
__name(GETINFO, "GETINFO");
function ROLL(state) {
  var stack = state.stack;
  var a = stack.pop();
  var b = stack.pop();
  var c2 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "ROLL[]");
  }
  stack.push(b);
  stack.push(a);
  stack.push(c2);
}
__name(ROLL, "ROLL");
function MAX(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "MAX[]", e2, e1);
  }
  stack.push(Math.max(e1, e2));
}
__name(MAX, "MAX");
function MIN(state) {
  var stack = state.stack;
  var e2 = stack.pop();
  var e1 = stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "MIN[]", e2, e1);
  }
  stack.push(Math.min(e1, e2));
}
__name(MIN, "MIN");
function SCANTYPE(state) {
  var n = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "SCANTYPE[]", n);
  }
}
__name(SCANTYPE, "SCANTYPE");
function INSTCTRL(state) {
  var s = state.stack.pop();
  var v2 = state.stack.pop();
  if (exports.DEBUG) {
    console.log(state.step, "INSTCTRL[]", s, v2);
  }
  switch (s) {
    case 1:
      state.inhibitGridFit = !!v2;
      return;
    case 2:
      state.ignoreCvt = !!v2;
      return;
    default:
      throw new Error("invalid INSTCTRL[] selector");
  }
}
__name(INSTCTRL, "INSTCTRL");
function PUSHB(n, state) {
  var stack = state.stack;
  var prog = state.prog;
  var ip = state.ip;
  if (exports.DEBUG) {
    console.log(state.step, "PUSHB[" + n + "]");
  }
  for (var i2 = 0; i2 < n; i2++) {
    stack.push(prog[++ip]);
  }
  state.ip = ip;
}
__name(PUSHB, "PUSHB");
function PUSHW(n, state) {
  var ip = state.ip;
  var prog = state.prog;
  var stack = state.stack;
  if (exports.DEBUG) {
    console.log(state.ip, "PUSHW[" + n + "]");
  }
  for (var i2 = 0; i2 < n; i2++) {
    var w2 = prog[++ip] << 8 | prog[++ip];
    if (w2 & 32768) {
      w2 = -((w2 ^ 65535) + 1);
    }
    stack.push(w2);
  }
  state.ip = ip;
}
__name(PUSHW, "PUSHW");
function MDRP_MIRP(indirect, setRp0, keepD, ro, dt, state) {
  var stack = state.stack;
  var cvte = indirect && stack.pop();
  var pi = stack.pop();
  var rp0i = state.rp0;
  var rp = state.z0[rp0i];
  var p = state.z1[pi];
  var md2 = state.minDis;
  var fv = state.fv;
  var pv = state.dpv;
  var od2;
  var d2;
  var sign;
  var cv;
  d2 = od2 = pv.distance(p, rp, true, true);
  sign = d2 >= 0 ? 1 : -1;
  d2 = Math.abs(d2);
  if (indirect) {
    cv = state.cvt[cvte];
    if (ro && Math.abs(d2 - cv) < state.cvCutIn) {
      d2 = cv;
    }
  }
  if (keepD && d2 < md2) {
    d2 = md2;
  }
  if (ro) {
    d2 = state.round(d2);
  }
  fv.setRelative(p, rp, sign * d2, pv);
  fv.touch(p);
  if (exports.DEBUG) {
    console.log(
      state.step,
      (indirect ? "MIRP[" : "MDRP[") + (setRp0 ? "M" : "m") + (keepD ? ">" : "_") + (ro ? "R" : "_") + (dt === 0 ? "Gr" : dt === 1 ? "Bl" : dt === 2 ? "Wh" : "") + "]",
      indirect ? cvte + "(" + state.cvt[cvte] + "," + cv + ")" : "",
      pi,
      "(d =",
      od2,
      "->",
      sign * d2,
      ")"
    );
  }
  state.rp1 = state.rp0;
  state.rp2 = pi;
  if (setRp0) {
    state.rp0 = pi;
  }
}
__name(MDRP_MIRP, "MDRP_MIRP");
function Token(char) {
  this.char = char;
  this.state = {};
  this.activeState = null;
}
__name(Token, "Token");
function ContextRange(startIndex, endOffset, contextName) {
  this.contextName = contextName;
  this.startIndex = startIndex;
  this.endOffset = endOffset;
}
__name(ContextRange, "ContextRange");
function ContextChecker(contextName, checkStart, checkEnd) {
  this.contextName = contextName;
  this.openRange = null;
  this.ranges = [];
  this.checkStart = checkStart;
  this.checkEnd = checkEnd;
}
__name(ContextChecker, "ContextChecker");
function ContextParams(context22, currentIndex) {
  this.context = context22;
  this.index = currentIndex;
  this.length = context22.length;
  this.current = context22[currentIndex];
  this.backtrack = context22.slice(0, currentIndex);
  this.lookahead = context22.slice(currentIndex + 1);
}
__name(ContextParams, "ContextParams");
function Event(eventId) {
  this.eventId = eventId;
  this.subscribers = [];
}
__name(Event, "Event");
function initializeCoreEvents(events) {
  var this$1 = this;
  var coreEvents = [
    "start",
    "end",
    "next",
    "newToken",
    "contextStart",
    "contextEnd",
    "insertToken",
    "removeToken",
    "removeRange",
    "replaceToken",
    "replaceRange",
    "composeRUD",
    "updateContextsRanges"
  ];
  coreEvents.forEach(function(eventId) {
    Object.defineProperty(this$1.events, eventId, {
      value: new Event(eventId)
    });
  });
  if (!!events) {
    coreEvents.forEach(function(eventId) {
      var event = events[eventId];
      if (typeof event === "function") {
        this$1.events[eventId].subscribe(event);
      }
    });
  }
  var requiresContextUpdate = [
    "insertToken",
    "removeToken",
    "removeRange",
    "replaceToken",
    "replaceRange",
    "composeRUD"
  ];
  requiresContextUpdate.forEach(function(eventId) {
    this$1.events[eventId].subscribe(
      this$1.updateContextsRanges
    );
  });
}
__name(initializeCoreEvents, "initializeCoreEvents");
function Tokenizer(events) {
  this.tokens = [];
  this.registeredContexts = {};
  this.contextCheckers = [];
  this.events = {};
  this.registeredModifiers = [];
  initializeCoreEvents.call(this, events);
}
__name(Tokenizer, "Tokenizer");
function isArabicChar(c2) {
  return /[\u0600-\u065F\u066A-\u06D2\u06FA-\u06FF]/.test(c2);
}
__name(isArabicChar, "isArabicChar");
function isIsolatedArabicChar(char) {
  return /[\u0630\u0690\u0621\u0631\u0661\u0671\u0622\u0632\u0672\u0692\u06C2\u0623\u0673\u0693\u06C3\u0624\u0694\u06C4\u0625\u0675\u0695\u06C5\u06E5\u0676\u0696\u06C6\u0627\u0677\u0697\u06C7\u0648\u0688\u0698\u06C8\u0689\u0699\u06C9\u068A\u06CA\u066B\u068B\u06CB\u068C\u068D\u06CD\u06FD\u068E\u06EE\u06FE\u062F\u068F\u06CF\u06EF]/.test(char);
}
__name(isIsolatedArabicChar, "isIsolatedArabicChar");
function isTashkeelArabicChar(char) {
  return /[\u0600-\u0605\u060C-\u060E\u0610-\u061B\u061E\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED]/.test(char);
}
__name(isTashkeelArabicChar, "isTashkeelArabicChar");
function isLatinChar(c2) {
  return /[A-z]/.test(c2);
}
__name(isLatinChar, "isLatinChar");
function isWhiteSpace(c2) {
  return /\s/.test(c2);
}
__name(isWhiteSpace, "isWhiteSpace");
function FeatureQuery(font) {
  this.font = font;
  this.features = {};
}
__name(FeatureQuery, "FeatureQuery");
function SubstitutionAction(action) {
  this.id = action.id;
  this.tag = action.tag;
  this.substitution = action.substitution;
}
__name(SubstitutionAction, "SubstitutionAction");
function lookupCoverage(glyphIndex, coverage) {
  if (!glyphIndex) {
    return -1;
  }
  switch (coverage.format) {
    case 1:
      return coverage.glyphs.indexOf(glyphIndex);
    case 2:
      var ranges = coverage.ranges;
      for (var i2 = 0; i2 < ranges.length; i2++) {
        var range = ranges[i2];
        if (glyphIndex >= range.start && glyphIndex <= range.end) {
          var offset = glyphIndex - range.start;
          return range.index + offset;
        }
      }
      break;
    default:
      return -1;
  }
  return -1;
}
__name(lookupCoverage, "lookupCoverage");
function singleSubstitutionFormat1(glyphIndex, subtable) {
  var substituteIndex = lookupCoverage(glyphIndex, subtable.coverage);
  if (substituteIndex === -1) {
    return null;
  }
  return glyphIndex + subtable.deltaGlyphId;
}
__name(singleSubstitutionFormat1, "singleSubstitutionFormat1");
function singleSubstitutionFormat2(glyphIndex, subtable) {
  var substituteIndex = lookupCoverage(glyphIndex, subtable.coverage);
  if (substituteIndex === -1) {
    return null;
  }
  return subtable.substitute[substituteIndex];
}
__name(singleSubstitutionFormat2, "singleSubstitutionFormat2");
function lookupCoverageList(coverageList, contextParams) {
  var lookupList = [];
  for (var i2 = 0; i2 < coverageList.length; i2++) {
    var coverage = coverageList[i2];
    var glyphIndex = contextParams.current;
    glyphIndex = Array.isArray(glyphIndex) ? glyphIndex[0] : glyphIndex;
    var lookupIndex = lookupCoverage(glyphIndex, coverage);
    if (lookupIndex !== -1) {
      lookupList.push(lookupIndex);
    }
  }
  if (lookupList.length !== coverageList.length) {
    return -1;
  }
  return lookupList;
}
__name(lookupCoverageList, "lookupCoverageList");
function chainingSubstitutionFormat3(contextParams, subtable) {
  var lookupsCount = subtable.inputCoverage.length + subtable.lookaheadCoverage.length + subtable.backtrackCoverage.length;
  if (contextParams.context.length < lookupsCount) {
    return [];
  }
  var inputLookups = lookupCoverageList(
    subtable.inputCoverage,
    contextParams
  );
  if (inputLookups === -1) {
    return [];
  }
  var lookaheadOffset = subtable.inputCoverage.length - 1;
  if (contextParams.lookahead.length < subtable.lookaheadCoverage.length) {
    return [];
  }
  var lookaheadContext = contextParams.lookahead.slice(lookaheadOffset);
  while (lookaheadContext.length && isTashkeelArabicChar(lookaheadContext[0].char)) {
    lookaheadContext.shift();
  }
  var lookaheadParams = new ContextParams(lookaheadContext, 0);
  var lookaheadLookups = lookupCoverageList(
    subtable.lookaheadCoverage,
    lookaheadParams
  );
  var backtrackContext = [].concat(contextParams.backtrack);
  backtrackContext.reverse();
  while (backtrackContext.length && isTashkeelArabicChar(backtrackContext[0].char)) {
    backtrackContext.shift();
  }
  if (backtrackContext.length < subtable.backtrackCoverage.length) {
    return [];
  }
  var backtrackParams = new ContextParams(backtrackContext, 0);
  var backtrackLookups = lookupCoverageList(
    subtable.backtrackCoverage,
    backtrackParams
  );
  var contextRulesMatch = inputLookups.length === subtable.inputCoverage.length && lookaheadLookups.length === subtable.lookaheadCoverage.length && backtrackLookups.length === subtable.backtrackCoverage.length;
  var substitutions = [];
  if (contextRulesMatch) {
    for (var i2 = 0; i2 < subtable.lookupRecords.length; i2++) {
      var lookupRecord = subtable.lookupRecords[i2];
      var lookupListIndex = lookupRecord.lookupListIndex;
      var lookupTable = this.getLookupByIndex(lookupListIndex);
      for (var s = 0; s < lookupTable.subtables.length; s++) {
        var subtable$1 = lookupTable.subtables[s];
        var lookup = this.getLookupMethod(lookupTable, subtable$1);
        var substitutionType = this.getSubstitutionType(lookupTable, subtable$1);
        if (substitutionType === "12") {
          for (var n = 0; n < inputLookups.length; n++) {
            var glyphIndex = contextParams.get(n);
            var substitution = lookup(glyphIndex);
            if (substitution) {
              substitutions.push(substitution);
            }
          }
        }
      }
    }
  }
  return substitutions;
}
__name(chainingSubstitutionFormat3, "chainingSubstitutionFormat3");
function ligatureSubstitutionFormat1(contextParams, subtable) {
  var glyphIndex = contextParams.current;
  var ligSetIndex = lookupCoverage(glyphIndex, subtable.coverage);
  if (ligSetIndex === -1) {
    return null;
  }
  var ligature;
  var ligatureSet = subtable.ligatureSets[ligSetIndex];
  for (var s = 0; s < ligatureSet.length; s++) {
    ligature = ligatureSet[s];
    for (var l2 = 0; l2 < ligature.components.length; l2++) {
      var lookaheadItem = contextParams.lookahead[l2];
      var component = ligature.components[l2];
      if (lookaheadItem !== component) {
        break;
      }
      if (l2 === ligature.components.length - 1) {
        return ligature;
      }
    }
  }
  return null;
}
__name(ligatureSubstitutionFormat1, "ligatureSubstitutionFormat1");
function decompositionSubstitutionFormat1(glyphIndex, subtable) {
  var substituteIndex = lookupCoverage(glyphIndex, subtable.coverage);
  if (substituteIndex === -1) {
    return null;
  }
  return subtable.sequences[substituteIndex];
}
__name(decompositionSubstitutionFormat1, "decompositionSubstitutionFormat1");
function arabicWordStartCheck(contextParams) {
  var char = contextParams.current;
  var prevChar = contextParams.get(-1);
  return (
    // ? arabic first char
    prevChar === null && isArabicChar(char) || // ? arabic char preceded with a non arabic char
    !isArabicChar(prevChar) && isArabicChar(char)
  );
}
__name(arabicWordStartCheck, "arabicWordStartCheck");
function arabicWordEndCheck(contextParams) {
  var nextChar = contextParams.get(1);
  return (
    // ? last arabic char
    nextChar === null || // ? next char is not arabic
    !isArabicChar(nextChar)
  );
}
__name(arabicWordEndCheck, "arabicWordEndCheck");
function arabicSentenceStartCheck(contextParams) {
  var char = contextParams.current;
  var prevChar = contextParams.get(-1);
  return (
    // ? an arabic char preceded with a non arabic char
    (isArabicChar(char) || isTashkeelArabicChar(char)) && !isArabicChar(prevChar)
  );
}
__name(arabicSentenceStartCheck, "arabicSentenceStartCheck");
function arabicSentenceEndCheck(contextParams) {
  var nextChar = contextParams.get(1);
  switch (true) {
    case nextChar === null:
      return true;
    case (!isArabicChar(nextChar) && !isTashkeelArabicChar(nextChar)):
      var nextIsWhitespace = isWhiteSpace(nextChar);
      if (!nextIsWhitespace) {
        return true;
      }
      if (nextIsWhitespace) {
        var arabicCharAhead = false;
        arabicCharAhead = contextParams.lookahead.some(
          function(c2) {
            return isArabicChar(c2) || isTashkeelArabicChar(c2);
          }
        );
        if (!arabicCharAhead) {
          return true;
        }
      }
      break;
    default:
      return false;
  }
}
__name(arabicSentenceEndCheck, "arabicSentenceEndCheck");
function singleSubstitutionFormat1$1(action, tokens, index) {
  tokens[index].setState(action.tag, action.substitution);
}
__name(singleSubstitutionFormat1$1, "singleSubstitutionFormat1$1");
function singleSubstitutionFormat2$1(action, tokens, index) {
  tokens[index].setState(action.tag, action.substitution);
}
__name(singleSubstitutionFormat2$1, "singleSubstitutionFormat2$1");
function chainingSubstitutionFormat3$1(action, tokens, index) {
  action.substitution.forEach(function(subst, offset) {
    var token = tokens[index + offset];
    token.setState(action.tag, subst);
  });
}
__name(chainingSubstitutionFormat3$1, "chainingSubstitutionFormat3$1");
function ligatureSubstitutionFormat1$1(action, tokens, index) {
  var token = tokens[index];
  token.setState(action.tag, action.substitution.ligGlyph);
  var compsCount = action.substitution.components.length;
  for (var i2 = 0; i2 < compsCount; i2++) {
    token = tokens[index + i2 + 1];
    token.setState("deleted", true);
  }
}
__name(ligatureSubstitutionFormat1$1, "ligatureSubstitutionFormat1$1");
function applySubstitution(action, tokens, index) {
  if (action instanceof SubstitutionAction && SUBSTITUTIONS[action.id]) {
    SUBSTITUTIONS[action.id](action, tokens, index);
  }
}
__name(applySubstitution, "applySubstitution");
function willConnectPrev(charContextParams) {
  var backtrack = [].concat(charContextParams.backtrack);
  for (var i2 = backtrack.length - 1; i2 >= 0; i2--) {
    var prevChar = backtrack[i2];
    var isolated = isIsolatedArabicChar(prevChar);
    var tashkeel = isTashkeelArabicChar(prevChar);
    if (!isolated && !tashkeel) {
      return true;
    }
    if (isolated) {
      return false;
    }
  }
  return false;
}
__name(willConnectPrev, "willConnectPrev");
function willConnectNext(charContextParams) {
  if (isIsolatedArabicChar(charContextParams.current)) {
    return false;
  }
  for (var i2 = 0; i2 < charContextParams.lookahead.length; i2++) {
    var nextChar = charContextParams.lookahead[i2];
    var tashkeel = isTashkeelArabicChar(nextChar);
    if (!tashkeel) {
      return true;
    }
  }
  return false;
}
__name(willConnectNext, "willConnectNext");
function arabicPresentationForms(range) {
  var this$1 = this;
  var script = "arab";
  var tags = this.featuresTags[script];
  var tokens = this.tokenizer.getRangeTokens(range);
  if (tokens.length === 1) {
    return;
  }
  var contextParams = new ContextParams(
    tokens.map(
      function(token) {
        return token.getState("glyphIndex");
      }
    ),
    0
  );
  var charContextParams = new ContextParams(
    tokens.map(
      function(token) {
        return token.char;
      }
    ),
    0
  );
  tokens.forEach(function(token, index) {
    if (isTashkeelArabicChar(token.char)) {
      return;
    }
    contextParams.setCurrentIndex(index);
    charContextParams.setCurrentIndex(index);
    var CONNECT = 0;
    if (willConnectPrev(charContextParams)) {
      CONNECT |= 1;
    }
    if (willConnectNext(charContextParams)) {
      CONNECT |= 2;
    }
    var tag;
    switch (CONNECT) {
      case 1:
        tag = "fina";
        break;
      case 2:
        tag = "init";
        break;
      case 3:
        tag = "medi";
        break;
    }
    if (tags.indexOf(tag) === -1) {
      return;
    }
    var substitutions = this$1.query.lookupFeature({
      tag,
      script,
      contextParams
    });
    if (substitutions instanceof Error) {
      return console.info(substitutions.message);
    }
    substitutions.forEach(function(action, index2) {
      if (action instanceof SubstitutionAction) {
        applySubstitution(action, tokens, index2);
        contextParams.context[index2] = action.substitution;
      }
    });
  });
}
__name(arabicPresentationForms, "arabicPresentationForms");
function getContextParams(tokens, index) {
  var context22 = tokens.map(function(token) {
    return token.activeState.value;
  });
  return new ContextParams(context22, index || 0);
}
__name(getContextParams, "getContextParams");
function arabicRequiredLigatures(range) {
  var this$1 = this;
  var script = "arab";
  var tokens = this.tokenizer.getRangeTokens(range);
  var contextParams = getContextParams(tokens);
  contextParams.context.forEach(function(glyphIndex, index) {
    contextParams.setCurrentIndex(index);
    var substitutions = this$1.query.lookupFeature({
      tag: "rlig",
      script,
      contextParams
    });
    if (substitutions.length) {
      substitutions.forEach(
        function(action) {
          return applySubstitution(action, tokens, index);
        }
      );
      contextParams = getContextParams(tokens);
    }
  });
}
__name(arabicRequiredLigatures, "arabicRequiredLigatures");
function latinWordStartCheck(contextParams) {
  var char = contextParams.current;
  var prevChar = contextParams.get(-1);
  return (
    // ? latin first char
    prevChar === null && isLatinChar(char) || // ? latin char preceded with a non latin char
    !isLatinChar(prevChar) && isLatinChar(char)
  );
}
__name(latinWordStartCheck, "latinWordStartCheck");
function latinWordEndCheck(contextParams) {
  var nextChar = contextParams.get(1);
  return (
    // ? last latin char
    nextChar === null || // ? next char is not latin
    !isLatinChar(nextChar)
  );
}
__name(latinWordEndCheck, "latinWordEndCheck");
function getContextParams$1(tokens, index) {
  var context22 = tokens.map(function(token) {
    return token.activeState.value;
  });
  return new ContextParams(context22, index || 0);
}
__name(getContextParams$1, "getContextParams$1");
function latinLigature(range) {
  var this$1 = this;
  var script = "latn";
  var tokens = this.tokenizer.getRangeTokens(range);
  var contextParams = getContextParams$1(tokens);
  contextParams.context.forEach(function(glyphIndex, index) {
    contextParams.setCurrentIndex(index);
    var substitutions = this$1.query.lookupFeature({
      tag: "liga",
      script,
      contextParams
    });
    if (substitutions.length) {
      substitutions.forEach(
        function(action) {
          return applySubstitution(action, tokens, index);
        }
      );
      contextParams = getContextParams$1(tokens);
    }
  });
}
__name(latinLigature, "latinLigature");
function Bidi(baseDir) {
  this.baseDir = baseDir || "ltr";
  this.tokenizer = new Tokenizer();
  this.featuresTags = {};
}
__name(Bidi, "Bidi");
function registerContextChecker(checkId) {
  var check2 = this.contextChecks[checkId + "Check"];
  return this.tokenizer.registerContextChecker(
    checkId,
    check2.startCheck,
    check2.endCheck
  );
}
__name(registerContextChecker, "registerContextChecker");
function tokenizeText() {
  registerContextChecker.call(this, "latinWord");
  registerContextChecker.call(this, "arabicWord");
  registerContextChecker.call(this, "arabicSentence");
  return this.tokenizer.tokenize(this.text);
}
__name(tokenizeText, "tokenizeText");
function reverseArabicSentences() {
  var this$1 = this;
  var ranges = this.tokenizer.getContextRanges("arabicSentence");
  ranges.forEach(function(range) {
    var rangeTokens = this$1.tokenizer.getRangeTokens(range);
    this$1.tokenizer.replaceRange(
      range.startIndex,
      range.endOffset,
      rangeTokens.reverse()
    );
  });
}
__name(reverseArabicSentences, "reverseArabicSentences");
function checkGlyphIndexStatus() {
  if (this.tokenizer.registeredModifiers.indexOf("glyphIndex") === -1) {
    throw new Error(
      "glyphIndex modifier is required to apply arabic presentation features."
    );
  }
}
__name(checkGlyphIndexStatus, "checkGlyphIndexStatus");
function applyArabicPresentationForms() {
  var this$1 = this;
  var script = "arab";
  if (!this.featuresTags.hasOwnProperty(script)) {
    return;
  }
  checkGlyphIndexStatus.call(this);
  var ranges = this.tokenizer.getContextRanges("arabicWord");
  ranges.forEach(function(range) {
    arabicPresentationForms.call(this$1, range);
  });
}
__name(applyArabicPresentationForms, "applyArabicPresentationForms");
function applyArabicRequireLigatures() {
  var this$1 = this;
  var script = "arab";
  if (!this.featuresTags.hasOwnProperty(script)) {
    return;
  }
  var tags = this.featuresTags[script];
  if (tags.indexOf("rlig") === -1) {
    return;
  }
  checkGlyphIndexStatus.call(this);
  var ranges = this.tokenizer.getContextRanges("arabicWord");
  ranges.forEach(function(range) {
    arabicRequiredLigatures.call(this$1, range);
  });
}
__name(applyArabicRequireLigatures, "applyArabicRequireLigatures");
function applyLatinLigatures() {
  var this$1 = this;
  var script = "latn";
  if (!this.featuresTags.hasOwnProperty(script)) {
    return;
  }
  var tags = this.featuresTags[script];
  if (tags.indexOf("liga") === -1) {
    return;
  }
  checkGlyphIndexStatus.call(this);
  var ranges = this.tokenizer.getContextRanges("latinWord");
  ranges.forEach(function(range) {
    latinLigature.call(this$1, range);
  });
}
__name(applyLatinLigatures, "applyLatinLigatures");
function Font(options) {
  options = options || {};
  options.tables = options.tables || {};
  if (!options.empty) {
    checkArgument(
      options.familyName,
      "When creating a new Font object, familyName is required."
    );
    checkArgument(
      options.styleName,
      "When creating a new Font object, styleName is required."
    );
    checkArgument(
      options.unitsPerEm,
      "When creating a new Font object, unitsPerEm is required."
    );
    checkArgument(
      options.ascender,
      "When creating a new Font object, ascender is required."
    );
    checkArgument(
      options.descender <= 0,
      "When creating a new Font object, negative descender value is required."
    );
    this.unitsPerEm = options.unitsPerEm || 1e3;
    this.ascender = options.ascender;
    this.descender = options.descender;
    this.createdTimestamp = options.createdTimestamp;
    this.tables = Object.assign(options.tables, {
      os2: Object.assign(
        {
          usWeightClass: options.weightClass || this.usWeightClasses.MEDIUM,
          usWidthClass: options.widthClass || this.usWidthClasses.MEDIUM,
          fsSelection: options.fsSelection || this.fsSelectionValues.REGULAR
        },
        options.tables.os2
      )
    });
  }
  this.supported = true;
  this.glyphs = new glyphset.GlyphSet(this, options.glyphs || []);
  this.encoding = new DefaultEncoding(this);
  this.position = new Position(this);
  this.substitution = new Substitution(this);
  this.tables = this.tables || {};
  this._push = null;
  this._hmtxTableData = {};
  Object.defineProperty(this, "hinting", {
    get: /* @__PURE__ */ __name2(function() {
      if (this._hinting) {
        return this._hinting;
      }
      if (this.outlinesFormat === "truetype") {
        return this._hinting = new Hinting(this);
      }
    }, "get")
  });
}
__name(Font, "Font");
function parseCmapTableFormat12(cmap2, p) {
  p.parseUShort();
  cmap2.length = p.parseULong();
  cmap2.language = p.parseULong();
  var groupCount;
  cmap2.groupCount = groupCount = p.parseULong();
  cmap2.glyphIndexMap = {};
  for (var i2 = 0; i2 < groupCount; i2 += 1) {
    var startCharCode = p.parseULong();
    var endCharCode = p.parseULong();
    var startGlyphId = p.parseULong();
    for (var c2 = startCharCode; c2 <= endCharCode; c2 += 1) {
      cmap2.glyphIndexMap[c2] = startGlyphId;
      startGlyphId++;
    }
  }
}
__name(parseCmapTableFormat12, "parseCmapTableFormat12");
function parseCmapTableFormat4(cmap2, p, data, start, offset) {
  cmap2.length = p.parseUShort();
  cmap2.language = p.parseUShort();
  var segCount;
  cmap2.segCount = segCount = p.parseUShort() >> 1;
  p.skip("uShort", 3);
  cmap2.glyphIndexMap = {};
  var endCountParser = new parse.Parser(data, start + offset + 14);
  var startCountParser = new parse.Parser(
    data,
    start + offset + 16 + segCount * 2
  );
  var idDeltaParser = new parse.Parser(
    data,
    start + offset + 16 + segCount * 4
  );
  var idRangeOffsetParser = new parse.Parser(
    data,
    start + offset + 16 + segCount * 6
  );
  var glyphIndexOffset = start + offset + 16 + segCount * 8;
  for (var i2 = 0; i2 < segCount - 1; i2 += 1) {
    var glyphIndex = void 0;
    var endCount = endCountParser.parseUShort();
    var startCount = startCountParser.parseUShort();
    var idDelta = idDeltaParser.parseShort();
    var idRangeOffset = idRangeOffsetParser.parseUShort();
    for (var c2 = startCount; c2 <= endCount; c2 += 1) {
      if (idRangeOffset !== 0) {
        glyphIndexOffset = idRangeOffsetParser.offset + idRangeOffsetParser.relativeOffset - 2;
        glyphIndexOffset += idRangeOffset;
        glyphIndexOffset += (c2 - startCount) * 2;
        glyphIndex = parse.getUShort(data, glyphIndexOffset);
        if (glyphIndex !== 0) {
          glyphIndex = glyphIndex + idDelta & 65535;
        }
      } else {
        glyphIndex = c2 + idDelta & 65535;
      }
      cmap2.glyphIndexMap[c2] = glyphIndex;
    }
  }
}
__name(parseCmapTableFormat4, "parseCmapTableFormat4");
function parseCmapTable(data, start) {
  var cmap2 = {};
  cmap2.version = parse.getUShort(data, start);
  check.argument(cmap2.version === 0, "cmap table version should be 0.");
  cmap2.numTables = parse.getUShort(data, start + 2);
  var offset = -1;
  for (var i2 = cmap2.numTables - 1; i2 >= 0; i2 -= 1) {
    var platformId = parse.getUShort(data, start + 4 + i2 * 8);
    var encodingId = parse.getUShort(data, start + 4 + i2 * 8 + 2);
    if (platformId === 3 && (encodingId === 0 || encodingId === 1 || encodingId === 10) || platformId === 0 && (encodingId === 0 || encodingId === 1 || encodingId === 2 || encodingId === 3 || encodingId === 4)) {
      offset = parse.getULong(data, start + 4 + i2 * 8 + 4);
      break;
    }
  }
  if (offset === -1) {
    throw new Error("No valid cmap sub-tables found.");
  }
  var p = new parse.Parser(data, start + offset);
  cmap2.format = p.parseUShort();
  if (cmap2.format === 12) {
    parseCmapTableFormat12(cmap2, p);
  } else if (cmap2.format === 4) {
    parseCmapTableFormat4(cmap2, p, data, start, offset);
  } else {
    throw new Error(
      "Only format 4 and 12 cmap tables are supported (found format " + cmap2.format + ")."
    );
  }
  return cmap2;
}
__name(parseCmapTable, "parseCmapTable");
function calcCFFSubroutineBias(subrs) {
  var bias;
  if (subrs.length < 1240) {
    bias = 107;
  } else if (subrs.length < 33900) {
    bias = 1131;
  } else {
    bias = 32768;
  }
  return bias;
}
__name(calcCFFSubroutineBias, "calcCFFSubroutineBias");
function parseCFFIndex(data, start, conversionFn) {
  var offsets = [];
  var objects = [];
  var count32 = parse.getCard16(data, start);
  var objectOffset;
  var endOffset;
  if (count32 !== 0) {
    var offsetSize = parse.getByte(data, start + 2);
    objectOffset = start + (count32 + 1) * offsetSize + 2;
    var pos = start + 3;
    for (var i2 = 0; i2 < count32 + 1; i2 += 1) {
      offsets.push(parse.getOffset(data, pos, offsetSize));
      pos += offsetSize;
    }
    endOffset = objectOffset + offsets[count32];
  } else {
    endOffset = start + 2;
  }
  for (var i$1 = 0; i$1 < offsets.length - 1; i$1 += 1) {
    var value = parse.getBytes(
      data,
      objectOffset + offsets[i$1],
      objectOffset + offsets[i$1 + 1]
    );
    if (conversionFn) {
      value = conversionFn(value);
    }
    objects.push(value);
  }
  return { objects, startOffset: start, endOffset };
}
__name(parseCFFIndex, "parseCFFIndex");
function parseCFFIndexLowMemory(data, start) {
  var offsets = [];
  var count32 = parse.getCard16(data, start);
  var objectOffset;
  var endOffset;
  if (count32 !== 0) {
    var offsetSize = parse.getByte(data, start + 2);
    objectOffset = start + (count32 + 1) * offsetSize + 2;
    var pos = start + 3;
    for (var i2 = 0; i2 < count32 + 1; i2 += 1) {
      offsets.push(parse.getOffset(data, pos, offsetSize));
      pos += offsetSize;
    }
    endOffset = objectOffset + offsets[count32];
  } else {
    endOffset = start + 2;
  }
  return { offsets, startOffset: start, endOffset };
}
__name(parseCFFIndexLowMemory, "parseCFFIndexLowMemory");
function getCffIndexObject(i2, offsets, data, start, conversionFn) {
  var count32 = parse.getCard16(data, start);
  var objectOffset = 0;
  if (count32 !== 0) {
    var offsetSize = parse.getByte(data, start + 2);
    objectOffset = start + (count32 + 1) * offsetSize + 2;
  }
  var value = parse.getBytes(
    data,
    objectOffset + offsets[i2],
    objectOffset + offsets[i2 + 1]
  );
  if (conversionFn) {
    value = conversionFn(value);
  }
  return value;
}
__name(getCffIndexObject, "getCffIndexObject");
function parseFloatOperand(parser) {
  var s = "";
  var eof = 15;
  var lookup = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    ".",
    "E",
    "E-",
    null,
    "-"
  ];
  while (true) {
    var b = parser.parseByte();
    var n1 = b >> 4;
    var n2 = b & 15;
    if (n1 === eof) {
      break;
    }
    s += lookup[n1];
    if (n2 === eof) {
      break;
    }
    s += lookup[n2];
  }
  return parseFloat(s);
}
__name(parseFloatOperand, "parseFloatOperand");
function parseOperand(parser, b0) {
  var b1;
  var b2;
  var b3;
  var b4;
  if (b0 === 28) {
    b1 = parser.parseByte();
    b2 = parser.parseByte();
    return b1 << 8 | b2;
  }
  if (b0 === 29) {
    b1 = parser.parseByte();
    b2 = parser.parseByte();
    b3 = parser.parseByte();
    b4 = parser.parseByte();
    return b1 << 24 | b2 << 16 | b3 << 8 | b4;
  }
  if (b0 === 30) {
    return parseFloatOperand(parser);
  }
  if (b0 >= 32 && b0 <= 246) {
    return b0 - 139;
  }
  if (b0 >= 247 && b0 <= 250) {
    b1 = parser.parseByte();
    return (b0 - 247) * 256 + b1 + 108;
  }
  if (b0 >= 251 && b0 <= 254) {
    b1 = parser.parseByte();
    return -(b0 - 251) * 256 - b1 - 108;
  }
  throw new Error("Invalid b0 " + b0);
}
__name(parseOperand, "parseOperand");
function entriesToObject(entries) {
  var o = {};
  for (var i2 = 0; i2 < entries.length; i2 += 1) {
    var key = entries[i2][0];
    var values = entries[i2][1];
    var value = void 0;
    if (values.length === 1) {
      value = values[0];
    } else {
      value = values;
    }
    if (o.hasOwnProperty(key) && !isNaN(o[key])) {
      throw new Error("Object " + o + " already has key " + key);
    }
    o[key] = value;
  }
  return o;
}
__name(entriesToObject, "entriesToObject");
function parseCFFDict(data, start, size) {
  start = start !== void 0 ? start : 0;
  var parser = new parse.Parser(data, start);
  var entries = [];
  var operands = [];
  size = size !== void 0 ? size : data.length;
  while (parser.relativeOffset < size) {
    var op = parser.parseByte();
    if (op <= 21) {
      if (op === 12) {
        op = 1200 + parser.parseByte();
      }
      entries.push([op, operands]);
      operands = [];
    } else {
      operands.push(parseOperand(parser, op));
    }
  }
  return entriesToObject(entries);
}
__name(parseCFFDict, "parseCFFDict");
function getCFFString(strings, index) {
  if (index <= 390) {
    index = cffStandardStrings[index];
  } else {
    index = strings[index - 391];
  }
  return index;
}
__name(getCFFString, "getCFFString");
function interpretDict(dict, meta2, strings) {
  var newDict = {};
  var value;
  for (var i2 = 0; i2 < meta2.length; i2 += 1) {
    var m2 = meta2[i2];
    if (Array.isArray(m2.type)) {
      var values = [];
      values.length = m2.type.length;
      for (var j = 0; j < m2.type.length; j++) {
        value = dict[m2.op] !== void 0 ? dict[m2.op][j] : void 0;
        if (value === void 0) {
          value = m2.value !== void 0 && m2.value[j] !== void 0 ? m2.value[j] : null;
        }
        if (m2.type[j] === "SID") {
          value = getCFFString(strings, value);
        }
        values[j] = value;
      }
      newDict[m2.name] = values;
    } else {
      value = dict[m2.op];
      if (value === void 0) {
        value = m2.value !== void 0 ? m2.value : null;
      }
      if (m2.type === "SID") {
        value = getCFFString(strings, value);
      }
      newDict[m2.name] = value;
    }
  }
  return newDict;
}
__name(interpretDict, "interpretDict");
function parseCFFHeader(data, start) {
  var header = {};
  header.formatMajor = parse.getCard8(data, start);
  header.formatMinor = parse.getCard8(data, start + 1);
  header.size = parse.getCard8(data, start + 2);
  header.offsetSize = parse.getCard8(data, start + 3);
  header.startOffset = start;
  header.endOffset = start + 4;
  return header;
}
__name(parseCFFHeader, "parseCFFHeader");
function parseCFFTopDict(data, strings) {
  var dict = parseCFFDict(data, 0, data.byteLength);
  return interpretDict(dict, TOP_DICT_META, strings);
}
__name(parseCFFTopDict, "parseCFFTopDict");
function parseCFFPrivateDict(data, start, size, strings) {
  var dict = parseCFFDict(data, start, size);
  return interpretDict(dict, PRIVATE_DICT_META, strings);
}
__name(parseCFFPrivateDict, "parseCFFPrivateDict");
function gatherCFFTopDicts(data, start, cffIndex, strings) {
  var topDictArray = [];
  for (var iTopDict = 0; iTopDict < cffIndex.length; iTopDict += 1) {
    var topDictData = new DataView(
      new Uint8Array(cffIndex[iTopDict]).buffer
    );
    var topDict = parseCFFTopDict(topDictData, strings);
    topDict._subrs = [];
    topDict._subrsBias = 0;
    topDict._defaultWidthX = 0;
    topDict._nominalWidthX = 0;
    var privateSize = topDict.private[0];
    var privateOffset = topDict.private[1];
    if (privateSize !== 0 && privateOffset !== 0) {
      var privateDict = parseCFFPrivateDict(
        data,
        privateOffset + start,
        privateSize,
        strings
      );
      topDict._defaultWidthX = privateDict.defaultWidthX;
      topDict._nominalWidthX = privateDict.nominalWidthX;
      if (privateDict.subrs !== 0) {
        var subrOffset = privateOffset + privateDict.subrs;
        var subrIndex = parseCFFIndex(data, subrOffset + start);
        topDict._subrs = subrIndex.objects;
        topDict._subrsBias = calcCFFSubroutineBias(topDict._subrs);
      }
      topDict._privateDict = privateDict;
    }
    topDictArray.push(topDict);
  }
  return topDictArray;
}
__name(gatherCFFTopDicts, "gatherCFFTopDicts");
function parseCFFCharset(data, start, nGlyphs, strings) {
  var sid;
  var count32;
  var parser = new parse.Parser(data, start);
  nGlyphs -= 1;
  var charset = [".notdef"];
  var format = parser.parseCard8();
  if (format === 0) {
    for (var i2 = 0; i2 < nGlyphs; i2 += 1) {
      sid = parser.parseSID();
      charset.push(getCFFString(strings, sid));
    }
  } else if (format === 1) {
    while (charset.length <= nGlyphs) {
      sid = parser.parseSID();
      count32 = parser.parseCard8();
      for (var i$1 = 0; i$1 <= count32; i$1 += 1) {
        charset.push(getCFFString(strings, sid));
        sid += 1;
      }
    }
  } else if (format === 2) {
    while (charset.length <= nGlyphs) {
      sid = parser.parseSID();
      count32 = parser.parseCard16();
      for (var i$2 = 0; i$2 <= count32; i$2 += 1) {
        charset.push(getCFFString(strings, sid));
        sid += 1;
      }
    }
  } else {
    throw new Error("Unknown charset format " + format);
  }
  return charset;
}
__name(parseCFFCharset, "parseCFFCharset");
function parseCFFEncoding(data, start, charset) {
  var code;
  var enc = {};
  var parser = new parse.Parser(data, start);
  var format = parser.parseCard8();
  if (format === 0) {
    var nCodes = parser.parseCard8();
    for (var i2 = 0; i2 < nCodes; i2 += 1) {
      code = parser.parseCard8();
      enc[code] = i2;
    }
  } else if (format === 1) {
    var nRanges = parser.parseCard8();
    code = 1;
    for (var i$1 = 0; i$1 < nRanges; i$1 += 1) {
      var first = parser.parseCard8();
      var nLeft = parser.parseCard8();
      for (var j = first; j <= first + nLeft; j += 1) {
        enc[j] = code;
        code += 1;
      }
    }
  } else {
    throw new Error("Unknown encoding format " + format);
  }
  return new CffEncoding(enc, charset);
}
__name(parseCFFEncoding, "parseCFFEncoding");
function parseCFFCharstring(font, glyph, code) {
  var c1x;
  var c1y;
  var c2x;
  var c2y;
  var p = new Path();
  var stack = [];
  var nStems = 0;
  var haveWidth = false;
  var open = false;
  var x22 = 0;
  var y = 0;
  var subrs;
  var subrsBias;
  var defaultWidthX;
  var nominalWidthX;
  if (font.isCIDFont) {
    var fdIndex = font.tables.cff.topDict._fdSelect[glyph.index];
    var fdDict = font.tables.cff.topDict._fdArray[fdIndex];
    subrs = fdDict._subrs;
    subrsBias = fdDict._subrsBias;
    defaultWidthX = fdDict._defaultWidthX;
    nominalWidthX = fdDict._nominalWidthX;
  } else {
    subrs = font.tables.cff.topDict._subrs;
    subrsBias = font.tables.cff.topDict._subrsBias;
    defaultWidthX = font.tables.cff.topDict._defaultWidthX;
    nominalWidthX = font.tables.cff.topDict._nominalWidthX;
  }
  var width = defaultWidthX;
  function newContour(x3, y2) {
    if (open) {
      p.closePath();
    }
    p.moveTo(x3, y2);
    open = true;
  }
  __name(newContour, "newContour");
  __name2(newContour, "newContour");
  function parseStems() {
    var hasWidthArg;
    hasWidthArg = stack.length % 2 !== 0;
    if (hasWidthArg && !haveWidth) {
      width = stack.shift() + nominalWidthX;
    }
    nStems += stack.length >> 1;
    stack.length = 0;
    haveWidth = true;
  }
  __name(parseStems, "parseStems");
  __name2(parseStems, "parseStems");
  function parse3(code2) {
    var b1;
    var b2;
    var b3;
    var b4;
    var codeIndex;
    var subrCode;
    var jpx;
    var jpy;
    var c3x;
    var c3y;
    var c4x;
    var c4y;
    var i2 = 0;
    while (i2 < code2.length) {
      var v2 = code2[i2];
      i2 += 1;
      switch (v2) {
        case 1:
          parseStems();
          break;
        case 3:
          parseStems();
          break;
        case 4:
          if (stack.length > 1 && !haveWidth) {
            width = stack.shift() + nominalWidthX;
            haveWidth = true;
          }
          y += stack.pop();
          newContour(x22, y);
          break;
        case 5:
          while (stack.length > 0) {
            x22 += stack.shift();
            y += stack.shift();
            p.lineTo(x22, y);
          }
          break;
        case 6:
          while (stack.length > 0) {
            x22 += stack.shift();
            p.lineTo(x22, y);
            if (stack.length === 0) {
              break;
            }
            y += stack.shift();
            p.lineTo(x22, y);
          }
          break;
        case 7:
          while (stack.length > 0) {
            y += stack.shift();
            p.lineTo(x22, y);
            if (stack.length === 0) {
              break;
            }
            x22 += stack.shift();
            p.lineTo(x22, y);
          }
          break;
        case 8:
          while (stack.length > 0) {
            c1x = x22 + stack.shift();
            c1y = y + stack.shift();
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            x22 = c2x + stack.shift();
            y = c2y + stack.shift();
            p.curveTo(c1x, c1y, c2x, c2y, x22, y);
          }
          break;
        case 10:
          codeIndex = stack.pop() + subrsBias;
          subrCode = subrs[codeIndex];
          if (subrCode) {
            parse3(subrCode);
          }
          break;
        case 11:
          return;
        case 12:
          v2 = code2[i2];
          i2 += 1;
          switch (v2) {
            case 35:
              c1x = x22 + stack.shift();
              c1y = y + stack.shift();
              c2x = c1x + stack.shift();
              c2y = c1y + stack.shift();
              jpx = c2x + stack.shift();
              jpy = c2y + stack.shift();
              c3x = jpx + stack.shift();
              c3y = jpy + stack.shift();
              c4x = c3x + stack.shift();
              c4y = c3y + stack.shift();
              x22 = c4x + stack.shift();
              y = c4y + stack.shift();
              stack.shift();
              p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
              p.curveTo(c3x, c3y, c4x, c4y, x22, y);
              break;
            case 34:
              c1x = x22 + stack.shift();
              c1y = y;
              c2x = c1x + stack.shift();
              c2y = c1y + stack.shift();
              jpx = c2x + stack.shift();
              jpy = c2y;
              c3x = jpx + stack.shift();
              c3y = c2y;
              c4x = c3x + stack.shift();
              c4y = y;
              x22 = c4x + stack.shift();
              p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
              p.curveTo(c3x, c3y, c4x, c4y, x22, y);
              break;
            case 36:
              c1x = x22 + stack.shift();
              c1y = y + stack.shift();
              c2x = c1x + stack.shift();
              c2y = c1y + stack.shift();
              jpx = c2x + stack.shift();
              jpy = c2y;
              c3x = jpx + stack.shift();
              c3y = c2y;
              c4x = c3x + stack.shift();
              c4y = c3y + stack.shift();
              x22 = c4x + stack.shift();
              p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
              p.curveTo(c3x, c3y, c4x, c4y, x22, y);
              break;
            case 37:
              c1x = x22 + stack.shift();
              c1y = y + stack.shift();
              c2x = c1x + stack.shift();
              c2y = c1y + stack.shift();
              jpx = c2x + stack.shift();
              jpy = c2y + stack.shift();
              c3x = jpx + stack.shift();
              c3y = jpy + stack.shift();
              c4x = c3x + stack.shift();
              c4y = c3y + stack.shift();
              if (Math.abs(c4x - x22) > Math.abs(c4y - y)) {
                x22 = c4x + stack.shift();
              } else {
                y = c4y + stack.shift();
              }
              p.curveTo(c1x, c1y, c2x, c2y, jpx, jpy);
              p.curveTo(c3x, c3y, c4x, c4y, x22, y);
              break;
            default:
              console.log(
                "Glyph " + glyph.index + ": unknown operator 1200" + v2
              );
              stack.length = 0;
          }
          break;
        case 14:
          if (stack.length > 0 && !haveWidth) {
            width = stack.shift() + nominalWidthX;
            haveWidth = true;
          }
          if (open) {
            p.closePath();
            open = false;
          }
          break;
        case 18:
          parseStems();
          break;
        case 19:
        // hintmask
        case 20:
          parseStems();
          i2 += nStems + 7 >> 3;
          break;
        case 21:
          if (stack.length > 2 && !haveWidth) {
            width = stack.shift() + nominalWidthX;
            haveWidth = true;
          }
          y += stack.pop();
          x22 += stack.pop();
          newContour(x22, y);
          break;
        case 22:
          if (stack.length > 1 && !haveWidth) {
            width = stack.shift() + nominalWidthX;
            haveWidth = true;
          }
          x22 += stack.pop();
          newContour(x22, y);
          break;
        case 23:
          parseStems();
          break;
        case 24:
          while (stack.length > 2) {
            c1x = x22 + stack.shift();
            c1y = y + stack.shift();
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            x22 = c2x + stack.shift();
            y = c2y + stack.shift();
            p.curveTo(c1x, c1y, c2x, c2y, x22, y);
          }
          x22 += stack.shift();
          y += stack.shift();
          p.lineTo(x22, y);
          break;
        case 25:
          while (stack.length > 6) {
            x22 += stack.shift();
            y += stack.shift();
            p.lineTo(x22, y);
          }
          c1x = x22 + stack.shift();
          c1y = y + stack.shift();
          c2x = c1x + stack.shift();
          c2y = c1y + stack.shift();
          x22 = c2x + stack.shift();
          y = c2y + stack.shift();
          p.curveTo(c1x, c1y, c2x, c2y, x22, y);
          break;
        case 26:
          if (stack.length % 2) {
            x22 += stack.shift();
          }
          while (stack.length > 0) {
            c1x = x22;
            c1y = y + stack.shift();
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            x22 = c2x;
            y = c2y + stack.shift();
            p.curveTo(c1x, c1y, c2x, c2y, x22, y);
          }
          break;
        case 27:
          if (stack.length % 2) {
            y += stack.shift();
          }
          while (stack.length > 0) {
            c1x = x22 + stack.shift();
            c1y = y;
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            x22 = c2x + stack.shift();
            y = c2y;
            p.curveTo(c1x, c1y, c2x, c2y, x22, y);
          }
          break;
        case 28:
          b1 = code2[i2];
          b2 = code2[i2 + 1];
          stack.push((b1 << 24 | b2 << 16) >> 16);
          i2 += 2;
          break;
        case 29:
          codeIndex = stack.pop() + font.gsubrsBias;
          subrCode = font.gsubrs[codeIndex];
          if (subrCode) {
            parse3(subrCode);
          }
          break;
        case 30:
          while (stack.length > 0) {
            c1x = x22;
            c1y = y + stack.shift();
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            x22 = c2x + stack.shift();
            y = c2y + (stack.length === 1 ? stack.shift() : 0);
            p.curveTo(c1x, c1y, c2x, c2y, x22, y);
            if (stack.length === 0) {
              break;
            }
            c1x = x22 + stack.shift();
            c1y = y;
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            y = c2y + stack.shift();
            x22 = c2x + (stack.length === 1 ? stack.shift() : 0);
            p.curveTo(c1x, c1y, c2x, c2y, x22, y);
          }
          break;
        case 31:
          while (stack.length > 0) {
            c1x = x22 + stack.shift();
            c1y = y;
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            y = c2y + stack.shift();
            x22 = c2x + (stack.length === 1 ? stack.shift() : 0);
            p.curveTo(c1x, c1y, c2x, c2y, x22, y);
            if (stack.length === 0) {
              break;
            }
            c1x = x22;
            c1y = y + stack.shift();
            c2x = c1x + stack.shift();
            c2y = c1y + stack.shift();
            x22 = c2x + stack.shift();
            y = c2y + (stack.length === 1 ? stack.shift() : 0);
            p.curveTo(c1x, c1y, c2x, c2y, x22, y);
          }
          break;
        default:
          if (v2 < 32) {
            console.log(
              "Glyph " + glyph.index + ": unknown operator " + v2
            );
          } else if (v2 < 247) {
            stack.push(v2 - 139);
          } else if (v2 < 251) {
            b1 = code2[i2];
            i2 += 1;
            stack.push((v2 - 247) * 256 + b1 + 108);
          } else if (v2 < 255) {
            b1 = code2[i2];
            i2 += 1;
            stack.push(-(v2 - 251) * 256 - b1 - 108);
          } else {
            b1 = code2[i2];
            b2 = code2[i2 + 1];
            b3 = code2[i2 + 2];
            b4 = code2[i2 + 3];
            i2 += 4;
            stack.push(
              (b1 << 24 | b2 << 16 | b3 << 8 | b4) / 65536
            );
          }
      }
    }
  }
  __name(parse3, "parse3");
  __name2(parse3, "parse");
  parse3(code);
  glyph.advanceWidth = width;
  return p;
}
__name(parseCFFCharstring, "parseCFFCharstring");
function parseCFFFDSelect(data, start, nGlyphs, fdArrayCount) {
  var fdSelect = [];
  var fdIndex;
  var parser = new parse.Parser(data, start);
  var format = parser.parseCard8();
  if (format === 0) {
    for (var iGid = 0; iGid < nGlyphs; iGid++) {
      fdIndex = parser.parseCard8();
      if (fdIndex >= fdArrayCount) {
        throw new Error(
          "CFF table CID Font FDSelect has bad FD index value " + fdIndex + " (FD count " + fdArrayCount + ")"
        );
      }
      fdSelect.push(fdIndex);
    }
  } else if (format === 3) {
    var nRanges = parser.parseCard16();
    var first = parser.parseCard16();
    if (first !== 0) {
      throw new Error(
        "CFF Table CID Font FDSelect format 3 range has bad initial GID " + first
      );
    }
    var next;
    for (var iRange = 0; iRange < nRanges; iRange++) {
      fdIndex = parser.parseCard8();
      next = parser.parseCard16();
      if (fdIndex >= fdArrayCount) {
        throw new Error(
          "CFF table CID Font FDSelect has bad FD index value " + fdIndex + " (FD count " + fdArrayCount + ")"
        );
      }
      if (next > nGlyphs) {
        throw new Error(
          "CFF Table CID Font FDSelect format 3 range has bad GID " + next
        );
      }
      for (; first < next; first++) {
        fdSelect.push(fdIndex);
      }
      first = next;
    }
    if (next !== nGlyphs) {
      throw new Error(
        "CFF Table CID Font FDSelect format 3 range has bad final GID " + next
      );
    }
  } else {
    throw new Error(
      "CFF Table CID Font FDSelect table has unsupported format " + format
    );
  }
  return fdSelect;
}
__name(parseCFFFDSelect, "parseCFFFDSelect");
function parseCFFTable(data, start, font, opt) {
  font.tables.cff = {};
  var header = parseCFFHeader(data, start);
  var nameIndex = parseCFFIndex(
    data,
    header.endOffset,
    parse.bytesToString
  );
  var topDictIndex = parseCFFIndex(data, nameIndex.endOffset);
  var stringIndex = parseCFFIndex(
    data,
    topDictIndex.endOffset,
    parse.bytesToString
  );
  var globalSubrIndex = parseCFFIndex(data, stringIndex.endOffset);
  font.gsubrs = globalSubrIndex.objects;
  font.gsubrsBias = calcCFFSubroutineBias(font.gsubrs);
  var topDictArray = gatherCFFTopDicts(
    data,
    start,
    topDictIndex.objects,
    stringIndex.objects
  );
  if (topDictArray.length !== 1) {
    throw new Error(
      "CFF table has too many fonts in 'FontSet' - count of fonts NameIndex.length = " + topDictArray.length
    );
  }
  var topDict = topDictArray[0];
  font.tables.cff.topDict = topDict;
  if (topDict._privateDict) {
    font.defaultWidthX = topDict._privateDict.defaultWidthX;
    font.nominalWidthX = topDict._privateDict.nominalWidthX;
  }
  if (topDict.ros[0] !== void 0 && topDict.ros[1] !== void 0) {
    font.isCIDFont = true;
  }
  if (font.isCIDFont) {
    var fdArrayOffset = topDict.fdArray;
    var fdSelectOffset = topDict.fdSelect;
    if (fdArrayOffset === 0 || fdSelectOffset === 0) {
      throw new Error(
        "Font is marked as a CID font, but FDArray and/or FDSelect information is missing"
      );
    }
    fdArrayOffset += start;
    var fdArrayIndex = parseCFFIndex(data, fdArrayOffset);
    var fdArray = gatherCFFTopDicts(
      data,
      start,
      fdArrayIndex.objects,
      stringIndex.objects
    );
    topDict._fdArray = fdArray;
    fdSelectOffset += start;
    topDict._fdSelect = parseCFFFDSelect(
      data,
      fdSelectOffset,
      font.numGlyphs,
      fdArray.length
    );
  }
  var privateDictOffset = start + topDict.private[1];
  var privateDict = parseCFFPrivateDict(
    data,
    privateDictOffset,
    topDict.private[0],
    stringIndex.objects
  );
  font.defaultWidthX = privateDict.defaultWidthX;
  font.nominalWidthX = privateDict.nominalWidthX;
  if (privateDict.subrs !== 0) {
    var subrOffset = privateDictOffset + privateDict.subrs;
    var subrIndex = parseCFFIndex(data, subrOffset);
    font.subrs = subrIndex.objects;
    font.subrsBias = calcCFFSubroutineBias(font.subrs);
  } else {
    font.subrs = [];
    font.subrsBias = 0;
  }
  var charStringsIndex;
  if (opt.lowMemory) {
    charStringsIndex = parseCFFIndexLowMemory(
      data,
      start + topDict.charStrings
    );
    font.nGlyphs = charStringsIndex.offsets.length;
  } else {
    charStringsIndex = parseCFFIndex(data, start + topDict.charStrings);
    font.nGlyphs = charStringsIndex.objects.length;
  }
  var charset = parseCFFCharset(
    data,
    start + topDict.charset,
    font.nGlyphs,
    stringIndex.objects
  );
  if (topDict.encoding === 0) {
    font.cffEncoding = new CffEncoding(cffStandardEncoding, charset);
  } else if (topDict.encoding === 1) {
    font.cffEncoding = new CffEncoding(cffExpertEncoding, charset);
  } else {
    font.cffEncoding = parseCFFEncoding(
      data,
      start + topDict.encoding,
      charset
    );
  }
  font.encoding = font.encoding || font.cffEncoding;
  font.glyphs = new glyphset.GlyphSet(font);
  if (opt.lowMemory) {
    font._push = function(i22) {
      var charString2 = getCffIndexObject(
        i22,
        charStringsIndex.offsets,
        data,
        start + topDict.charStrings
      );
      font.glyphs.push(
        i22,
        glyphset.cffGlyphLoader(font, i22, parseCFFCharstring, charString2)
      );
    };
  } else {
    for (var i2 = 0; i2 < font.nGlyphs; i2 += 1) {
      var charString = charStringsIndex.objects[i2];
      font.glyphs.push(
        i2,
        glyphset.cffGlyphLoader(font, i2, parseCFFCharstring, charString)
      );
    }
  }
}
__name(parseCFFTable, "parseCFFTable");
function parseFvarAxis(data, start, names) {
  var axis = {};
  var p = new parse.Parser(data, start);
  axis.tag = p.parseTag();
  axis.minValue = p.parseFixed();
  axis.defaultValue = p.parseFixed();
  axis.maxValue = p.parseFixed();
  p.skip("uShort", 1);
  axis.name = names[p.parseUShort()] || {};
  return axis;
}
__name(parseFvarAxis, "parseFvarAxis");
function parseFvarInstance(data, start, axes, names) {
  var inst = {};
  var p = new parse.Parser(data, start);
  inst.name = names[p.parseUShort()] || {};
  p.skip("uShort", 1);
  inst.coordinates = {};
  for (var i2 = 0; i2 < axes.length; ++i2) {
    inst.coordinates[axes[i2].tag] = p.parseFixed();
  }
  return inst;
}
__name(parseFvarInstance, "parseFvarInstance");
function parseFvarTable(data, start, names) {
  var p = new parse.Parser(data, start);
  var tableVersion = p.parseULong();
  check.argument(
    tableVersion === 65536,
    "Unsupported fvar table version."
  );
  var offsetToData = p.parseOffset16();
  p.skip("uShort", 1);
  var axisCount = p.parseUShort();
  var axisSize = p.parseUShort();
  var instanceCount = p.parseUShort();
  var instanceSize = p.parseUShort();
  var axes = [];
  for (var i2 = 0; i2 < axisCount; i2++) {
    axes.push(
      parseFvarAxis(data, start + offsetToData + i2 * axisSize, names)
    );
  }
  var instances = [];
  var instanceStart = start + offsetToData + axisCount * axisSize;
  for (var j = 0; j < instanceCount; j++) {
    instances.push(
      parseFvarInstance(
        data,
        instanceStart + j * instanceSize,
        axes,
        names
      )
    );
  }
  return { axes, instances };
}
__name(parseFvarTable, "parseFvarTable");
function parseGDEFTable(data, start) {
  start = start || 0;
  var p = new Parser(data, start);
  var tableVersion = p.parseVersion(1);
  check.argument(
    tableVersion === 1 || tableVersion === 1.2 || tableVersion === 1.3,
    "Unsupported GDEF table version."
  );
  var gdef2 = {
    version: tableVersion,
    classDef: p.parsePointer(Parser.classDef),
    attachList: p.parsePointer(attachList),
    ligCaretList: p.parsePointer(ligCaretList),
    markAttachClassDef: p.parsePointer(Parser.classDef)
  };
  if (tableVersion >= 1.2) {
    gdef2.markGlyphSets = p.parsePointer(markGlyphSets);
  }
  return gdef2;
}
__name(parseGDEFTable, "parseGDEFTable");
function parseGposTable(data, start) {
  start = start || 0;
  var p = new Parser(data, start);
  var tableVersion = p.parseVersion(1);
  check.argument(
    tableVersion === 1 || tableVersion === 1.1,
    "Unsupported GPOS table version " + tableVersion
  );
  if (tableVersion === 1) {
    return {
      version: tableVersion,
      scripts: p.parseScriptList(),
      features: p.parseFeatureList(),
      lookups: p.parseLookupList(subtableParsers)
    };
  } else {
    return {
      version: tableVersion,
      scripts: p.parseScriptList(),
      features: p.parseFeatureList(),
      lookups: p.parseLookupList(subtableParsers),
      variations: p.parseFeatureVariationsList()
    };
  }
}
__name(parseGposTable, "parseGposTable");
function parseGsubTable(data, start) {
  start = start || 0;
  var p = new Parser(data, start);
  var tableVersion = p.parseVersion(1);
  check.argument(
    tableVersion === 1 || tableVersion === 1.1,
    "Unsupported GSUB table version."
  );
  if (tableVersion === 1) {
    return {
      version: tableVersion,
      scripts: p.parseScriptList(),
      features: p.parseFeatureList(),
      lookups: p.parseLookupList(subtableParsers$1)
    };
  } else {
    return {
      version: tableVersion,
      scripts: p.parseScriptList(),
      features: p.parseFeatureList(),
      lookups: p.parseLookupList(subtableParsers$1),
      variations: p.parseFeatureVariationsList()
    };
  }
}
__name(parseGsubTable, "parseGsubTable");
function parseHeadTable(data, start) {
  var head2 = {};
  var p = new parse.Parser(data, start);
  head2.version = p.parseVersion();
  head2.fontRevision = Math.round(p.parseFixed() * 1e3) / 1e3;
  head2.checkSumAdjustment = p.parseULong();
  head2.magicNumber = p.parseULong();
  check.argument(
    head2.magicNumber === 1594834165,
    "Font header has wrong magic number."
  );
  head2.flags = p.parseUShort();
  head2.unitsPerEm = p.parseUShort();
  head2.created = p.parseLongDateTime();
  head2.modified = p.parseLongDateTime();
  head2.xMin = p.parseShort();
  head2.yMin = p.parseShort();
  head2.xMax = p.parseShort();
  head2.yMax = p.parseShort();
  head2.macStyle = p.parseUShort();
  head2.lowestRecPPEM = p.parseUShort();
  head2.fontDirectionHint = p.parseShort();
  head2.indexToLocFormat = p.parseShort();
  head2.glyphDataFormat = p.parseShort();
  return head2;
}
__name(parseHeadTable, "parseHeadTable");
function parseHheaTable(data, start) {
  var hhea2 = {};
  var p = new parse.Parser(data, start);
  hhea2.version = p.parseVersion();
  hhea2.ascender = p.parseShort();
  hhea2.descender = p.parseShort();
  hhea2.lineGap = p.parseShort();
  hhea2.advanceWidthMax = p.parseUShort();
  hhea2.minLeftSideBearing = p.parseShort();
  hhea2.minRightSideBearing = p.parseShort();
  hhea2.xMaxExtent = p.parseShort();
  hhea2.caretSlopeRise = p.parseShort();
  hhea2.caretSlopeRun = p.parseShort();
  hhea2.caretOffset = p.parseShort();
  p.relativeOffset += 8;
  hhea2.metricDataFormat = p.parseShort();
  hhea2.numberOfHMetrics = p.parseUShort();
  return hhea2;
}
__name(parseHheaTable, "parseHheaTable");
function parseHmtxTableAll(data, start, numMetrics, numGlyphs, glyphs) {
  var advanceWidth;
  var leftSideBearing;
  var p = new parse.Parser(data, start);
  for (var i2 = 0; i2 < numGlyphs; i2 += 1) {
    if (i2 < numMetrics) {
      advanceWidth = p.parseUShort();
      leftSideBearing = p.parseShort();
    }
    var glyph = glyphs.get(i2);
    glyph.advanceWidth = advanceWidth;
    glyph.leftSideBearing = leftSideBearing;
  }
}
__name(parseHmtxTableAll, "parseHmtxTableAll");
function parseHmtxTableOnLowMemory(font, data, start, numMetrics, numGlyphs) {
  font._hmtxTableData = {};
  var advanceWidth;
  var leftSideBearing;
  var p = new parse.Parser(data, start);
  for (var i2 = 0; i2 < numGlyphs; i2 += 1) {
    if (i2 < numMetrics) {
      advanceWidth = p.parseUShort();
      leftSideBearing = p.parseShort();
    }
    font._hmtxTableData[i2] = {
      advanceWidth,
      leftSideBearing
    };
  }
}
__name(parseHmtxTableOnLowMemory, "parseHmtxTableOnLowMemory");
function parseHmtxTable(font, data, start, numMetrics, numGlyphs, glyphs, opt) {
  if (opt.lowMemory) {
    parseHmtxTableOnLowMemory(font, data, start, numMetrics, numGlyphs);
  } else {
    parseHmtxTableAll(data, start, numMetrics, numGlyphs, glyphs);
  }
}
__name(parseHmtxTable, "parseHmtxTable");
function parseWindowsKernTable(p) {
  var pairs = {};
  p.skip("uShort");
  var subtableVersion = p.parseUShort();
  check.argument(subtableVersion === 0, "Unsupported kern sub-table version.");
  p.skip("uShort", 2);
  var nPairs = p.parseUShort();
  p.skip("uShort", 3);
  for (var i2 = 0; i2 < nPairs; i2 += 1) {
    var leftIndex = p.parseUShort();
    var rightIndex = p.parseUShort();
    var value = p.parseShort();
    pairs[leftIndex + "," + rightIndex] = value;
  }
  return pairs;
}
__name(parseWindowsKernTable, "parseWindowsKernTable");
function parseMacKernTable(p) {
  var pairs = {};
  p.skip("uShort");
  var nTables = p.parseULong();
  if (nTables > 1) {
    console.warn("Only the first kern subtable is supported.");
  }
  p.skip("uLong");
  var coverage = p.parseUShort();
  var subtableVersion = coverage & 255;
  p.skip("uShort");
  if (subtableVersion === 0) {
    var nPairs = p.parseUShort();
    p.skip("uShort", 3);
    for (var i2 = 0; i2 < nPairs; i2 += 1) {
      var leftIndex = p.parseUShort();
      var rightIndex = p.parseUShort();
      var value = p.parseShort();
      pairs[leftIndex + "," + rightIndex] = value;
    }
  }
  return pairs;
}
__name(parseMacKernTable, "parseMacKernTable");
function parseKernTable(data, start) {
  var p = new parse.Parser(data, start);
  var tableVersion = p.parseUShort();
  if (tableVersion === 0) {
    return parseWindowsKernTable(p);
  } else if (tableVersion === 1) {
    return parseMacKernTable(p);
  } else {
    throw new Error("Unsupported kern table version (" + tableVersion + ").");
  }
}
__name(parseKernTable, "parseKernTable");
function parseLtagTable(data, start) {
  var p = new parse.Parser(data, start);
  var tableVersion = p.parseULong();
  check.argument(tableVersion === 1, "Unsupported ltag table version.");
  p.skip("uLong", 1);
  var numTags = p.parseULong();
  var tags = [];
  for (var i2 = 0; i2 < numTags; i2++) {
    var tag = "";
    var offset = start + p.parseUShort();
    var length = p.parseUShort();
    for (var j = offset; j < offset + length; ++j) {
      tag += String.fromCharCode(data.getInt8(j));
    }
    tags.push(tag);
  }
  return tags;
}
__name(parseLtagTable, "parseLtagTable");
function parseLocaTable(data, start, numGlyphs, shortVersion) {
  var p = new parse.Parser(data, start);
  var parseFn = shortVersion ? p.parseUShort : p.parseULong;
  var glyphOffsets = [];
  for (var i2 = 0; i2 < numGlyphs + 1; i2 += 1) {
    var glyphOffset = parseFn.call(p);
    if (shortVersion) {
      glyphOffset *= 2;
    }
    glyphOffsets.push(glyphOffset);
  }
  return glyphOffsets;
}
__name(parseLocaTable, "parseLocaTable");
function parseMaxpTable(data, start) {
  var maxp2 = {};
  var p = new parse.Parser(data, start);
  maxp2.version = p.parseVersion();
  maxp2.numGlyphs = p.parseUShort();
  if (maxp2.version === 1) {
    maxp2.maxPoints = p.parseUShort();
    maxp2.maxContours = p.parseUShort();
    maxp2.maxCompositePoints = p.parseUShort();
    maxp2.maxCompositeContours = p.parseUShort();
    maxp2.maxZones = p.parseUShort();
    maxp2.maxTwilightPoints = p.parseUShort();
    maxp2.maxStorage = p.parseUShort();
    maxp2.maxFunctionDefs = p.parseUShort();
    maxp2.maxInstructionDefs = p.parseUShort();
    maxp2.maxStackElements = p.parseUShort();
    maxp2.maxSizeOfInstructions = p.parseUShort();
    maxp2.maxComponentElements = p.parseUShort();
    maxp2.maxComponentDepth = p.parseUShort();
  }
  return maxp2;
}
__name(parseMaxpTable, "parseMaxpTable");
function parseOS2Table(data, start) {
  var os22 = {};
  var p = new parse.Parser(data, start);
  os22.version = p.parseUShort();
  os22.xAvgCharWidth = p.parseShort();
  os22.usWeightClass = p.parseUShort();
  os22.usWidthClass = p.parseUShort();
  os22.fsType = p.parseUShort();
  os22.ySubscriptXSize = p.parseShort();
  os22.ySubscriptYSize = p.parseShort();
  os22.ySubscriptXOffset = p.parseShort();
  os22.ySubscriptYOffset = p.parseShort();
  os22.ySuperscriptXSize = p.parseShort();
  os22.ySuperscriptYSize = p.parseShort();
  os22.ySuperscriptXOffset = p.parseShort();
  os22.ySuperscriptYOffset = p.parseShort();
  os22.yStrikeoutSize = p.parseShort();
  os22.yStrikeoutPosition = p.parseShort();
  os22.sFamilyClass = p.parseShort();
  os22.panose = [];
  for (var i2 = 0; i2 < 10; i2++) {
    os22.panose[i2] = p.parseByte();
  }
  os22.ulUnicodeRange1 = p.parseULong();
  os22.ulUnicodeRange2 = p.parseULong();
  os22.ulUnicodeRange3 = p.parseULong();
  os22.ulUnicodeRange4 = p.parseULong();
  os22.achVendID = String.fromCharCode(
    p.parseByte(),
    p.parseByte(),
    p.parseByte(),
    p.parseByte()
  );
  os22.fsSelection = p.parseUShort();
  os22.usFirstCharIndex = p.parseUShort();
  os22.usLastCharIndex = p.parseUShort();
  os22.sTypoAscender = p.parseShort();
  os22.sTypoDescender = p.parseShort();
  os22.sTypoLineGap = p.parseShort();
  os22.usWinAscent = p.parseUShort();
  os22.usWinDescent = p.parseUShort();
  if (os22.version >= 1) {
    os22.ulCodePageRange1 = p.parseULong();
    os22.ulCodePageRange2 = p.parseULong();
  }
  if (os22.version >= 2) {
    os22.sxHeight = p.parseShort();
    os22.sCapHeight = p.parseShort();
    os22.usDefaultChar = p.parseUShort();
    os22.usBreakChar = p.parseUShort();
    os22.usMaxContent = p.parseUShort();
  }
  return os22;
}
__name(parseOS2Table, "parseOS2Table");
function parsePostTable(data, start) {
  var post2 = {};
  var p = new parse.Parser(data, start);
  post2.version = p.parseVersion();
  post2.italicAngle = p.parseFixed();
  post2.underlinePosition = p.parseShort();
  post2.underlineThickness = p.parseShort();
  post2.isFixedPitch = p.parseULong();
  post2.minMemType42 = p.parseULong();
  post2.maxMemType42 = p.parseULong();
  post2.minMemType1 = p.parseULong();
  post2.maxMemType1 = p.parseULong();
  post2.names = [];
  switch (post2.version) {
    case 1:
      break;
    case 2:
      post2.numberOfGlyphs = p.parseUShort();
      post2.glyphNameIndex = new Array(post2.numberOfGlyphs);
      for (var i2 = 0; i2 < post2.numberOfGlyphs; i2++) {
        post2.glyphNameIndex[i2] = p.parseUShort();
      }
      break;
    case 2.5:
      post2.numberOfGlyphs = p.parseUShort();
      post2.offset = new Array(post2.numberOfGlyphs);
      for (var i$1 = 0; i$1 < post2.numberOfGlyphs; i$1++) {
        post2.offset[i$1] = p.parseChar();
      }
      break;
  }
  return post2;
}
__name(parsePostTable, "parsePostTable");
function parseMetaTable(data, start) {
  var p = new parse.Parser(data, start);
  var tableVersion = p.parseULong();
  check.argument(tableVersion === 1, "Unsupported META table version.");
  p.parseULong();
  p.parseULong();
  var numDataMaps = p.parseULong();
  var tags = {};
  for (var i2 = 0; i2 < numDataMaps; i2++) {
    var tag = p.parseTag();
    var dataOffset = p.parseULong();
    var dataLength = p.parseULong();
    var text = decode.UTF8(data, start + dataOffset, dataLength);
    tags[tag] = text;
  }
  return tags;
}
__name(parseMetaTable, "parseMetaTable");
function parseOpenTypeTableEntries(data, numTables) {
  var tableEntries = [];
  var p = 12;
  for (var i2 = 0; i2 < numTables; i2 += 1) {
    var tag = parse.getTag(data, p);
    var checksum = parse.getULong(data, p + 4);
    var offset = parse.getULong(data, p + 8);
    var length = parse.getULong(data, p + 12);
    tableEntries.push({
      tag,
      checksum,
      offset,
      length,
      compression: false
    });
    p += 16;
  }
  return tableEntries;
}
__name(parseOpenTypeTableEntries, "parseOpenTypeTableEntries");
function parseWOFFTableEntries(data, numTables) {
  var tableEntries = [];
  var p = 44;
  for (var i2 = 0; i2 < numTables; i2 += 1) {
    var tag = parse.getTag(data, p);
    var offset = parse.getULong(data, p + 4);
    var compLength = parse.getULong(data, p + 8);
    var origLength = parse.getULong(data, p + 12);
    var compression = void 0;
    if (compLength < origLength) {
      compression = "WOFF";
    } else {
      compression = false;
    }
    tableEntries.push({
      tag,
      offset,
      compression,
      compressedLength: compLength,
      length: origLength
    });
    p += 20;
  }
  return tableEntries;
}
__name(parseWOFFTableEntries, "parseWOFFTableEntries");
function uncompressTable(data, tableEntry) {
  if (tableEntry.compression === "WOFF") {
    var inBuffer = new Uint8Array(
      data.buffer,
      tableEntry.offset + 2,
      tableEntry.compressedLength - 2
    );
    var outBuffer = new Uint8Array(tableEntry.length);
    inflateSync(inBuffer, outBuffer);
    if (outBuffer.byteLength !== tableEntry.length) {
      throw new Error(
        "Decompression error: " + tableEntry.tag + " decompressed length doesn't match recorded length"
      );
    }
    var view = new DataView(outBuffer.buffer, 0);
    return { data: view, offset: 0 };
  } else {
    return { data, offset: tableEntry.offset };
  }
}
__name(uncompressTable, "uncompressTable");
function parseBuffer(buffer, opt) {
  opt = opt === void 0 || opt === null ? {} : opt;
  var indexToLocFormat;
  var font = new Font({ empty: true });
  var data = new DataView(buffer, 0);
  var numTables;
  var tableEntries = [];
  var signature = parse.getTag(data, 0);
  if (signature === String.fromCharCode(0, 1, 0, 0) || signature === "true" || signature === "typ1") {
    font.outlinesFormat = "truetype";
    numTables = parse.getUShort(data, 4);
    tableEntries = parseOpenTypeTableEntries(data, numTables);
  } else if (signature === "OTTO") {
    font.outlinesFormat = "cff";
    numTables = parse.getUShort(data, 4);
    tableEntries = parseOpenTypeTableEntries(data, numTables);
  } else if (signature === "wOFF") {
    var flavor = parse.getTag(data, 4);
    if (flavor === String.fromCharCode(0, 1, 0, 0)) {
      font.outlinesFormat = "truetype";
    } else if (flavor === "OTTO") {
      font.outlinesFormat = "cff";
    } else {
      throw new Error("Unsupported OpenType flavor " + signature);
    }
    numTables = parse.getUShort(data, 12);
    tableEntries = parseWOFFTableEntries(data, numTables);
  } else {
    throw new Error("Unsupported OpenType signature " + signature);
  }
  var cffTableEntry;
  var fvarTableEntry;
  var glyfTableEntry;
  var gdefTableEntry;
  var gposTableEntry;
  var gsubTableEntry;
  var hmtxTableEntry;
  var kernTableEntry;
  var locaTableEntry;
  var metaTableEntry;
  var p;
  for (var i2 = 0; i2 < numTables; i2 += 1) {
    var tableEntry = tableEntries[i2];
    var table32 = void 0;
    switch (tableEntry.tag) {
      case "cmap":
        table32 = uncompressTable(data, tableEntry);
        font.tables.cmap = cmap.parse(table32.data, table32.offset);
        font.encoding = new CmapEncoding(font.tables.cmap);
        break;
      case "cvt ":
        table32 = uncompressTable(data, tableEntry);
        p = new parse.Parser(table32.data, table32.offset);
        font.tables.cvt = p.parseShortList(tableEntry.length / 2);
        break;
      case "fvar":
        fvarTableEntry = tableEntry;
        break;
      case "fpgm":
        table32 = uncompressTable(data, tableEntry);
        p = new parse.Parser(table32.data, table32.offset);
        font.tables.fpgm = p.parseByteList(tableEntry.length);
        break;
      case "head":
        table32 = uncompressTable(data, tableEntry);
        font.tables.head = head.parse(table32.data, table32.offset);
        font.unitsPerEm = font.tables.head.unitsPerEm;
        indexToLocFormat = font.tables.head.indexToLocFormat;
        break;
      case "hhea":
        table32 = uncompressTable(data, tableEntry);
        font.tables.hhea = hhea.parse(table32.data, table32.offset);
        font.ascender = font.tables.hhea.ascender;
        font.descender = font.tables.hhea.descender;
        font.numberOfHMetrics = font.tables.hhea.numberOfHMetrics;
        break;
      case "hmtx":
        hmtxTableEntry = tableEntry;
        break;
      case "ltag":
        table32 = uncompressTable(data, tableEntry);
        ltagTable = ltag.parse(table32.data, table32.offset);
        break;
      case "maxp":
        table32 = uncompressTable(data, tableEntry);
        font.tables.maxp = maxp.parse(table32.data, table32.offset);
        font.numGlyphs = font.tables.maxp.numGlyphs;
        break;
      case "OS/2":
        table32 = uncompressTable(data, tableEntry);
        font.tables.os2 = os2.parse(table32.data, table32.offset);
        break;
      case "post":
        table32 = uncompressTable(data, tableEntry);
        font.tables.post = post.parse(table32.data, table32.offset);
        break;
      case "prep":
        table32 = uncompressTable(data, tableEntry);
        p = new parse.Parser(table32.data, table32.offset);
        font.tables.prep = p.parseByteList(tableEntry.length);
        break;
      case "glyf":
        glyfTableEntry = tableEntry;
        break;
      case "loca":
        locaTableEntry = tableEntry;
        break;
      case "CFF ":
        cffTableEntry = tableEntry;
        break;
      case "kern":
        kernTableEntry = tableEntry;
        break;
      case "GDEF":
        gdefTableEntry = tableEntry;
        break;
      case "GPOS":
        gposTableEntry = tableEntry;
        break;
      case "GSUB":
        gsubTableEntry = tableEntry;
        break;
      case "meta":
        metaTableEntry = tableEntry;
        break;
    }
  }
  if (glyfTableEntry && locaTableEntry) {
    var shortVersion = indexToLocFormat === 0;
    var locaTable = uncompressTable(data, locaTableEntry);
    var locaOffsets = loca.parse(
      locaTable.data,
      locaTable.offset,
      font.numGlyphs,
      shortVersion
    );
    var glyfTable = uncompressTable(data, glyfTableEntry);
    font.glyphs = glyf.parse(
      glyfTable.data,
      glyfTable.offset,
      locaOffsets,
      font,
      opt
    );
  } else if (cffTableEntry) {
    var cffTable = uncompressTable(data, cffTableEntry);
    cff.parse(cffTable.data, cffTable.offset, font, opt);
  } else {
    throw new Error("Font doesn't contain TrueType or CFF outlines.");
  }
  var hmtxTable = uncompressTable(data, hmtxTableEntry);
  hmtx.parse(
    font,
    hmtxTable.data,
    hmtxTable.offset,
    font.numberOfHMetrics,
    font.numGlyphs,
    font.glyphs,
    opt
  );
  addGlyphNames(font, opt);
  if (kernTableEntry) {
    var kernTable = uncompressTable(data, kernTableEntry);
    font.kerningPairs = kern.parse(kernTable.data, kernTable.offset);
  } else {
    font.kerningPairs = {};
  }
  if (gdefTableEntry) {
    var gdefTable = uncompressTable(data, gdefTableEntry);
    font.tables.gdef = gdef.parse(gdefTable.data, gdefTable.offset);
  }
  if (gposTableEntry) {
    var gposTable = uncompressTable(data, gposTableEntry);
    font.tables.gpos = gpos.parse(gposTable.data, gposTable.offset);
    font.position.init();
  }
  if (gsubTableEntry) {
    var gsubTable = uncompressTable(data, gsubTableEntry);
    font.tables.gsub = gsub.parse(gsubTable.data, gsubTable.offset);
  }
  if (fvarTableEntry) {
    var fvarTable = uncompressTable(data, fvarTableEntry);
    font.tables.fvar = fvar.parse(
      fvarTable.data,
      fvarTable.offset,
      font.names
    );
  }
  if (metaTableEntry) {
    var metaTable = uncompressTable(data, metaTableEntry);
    font.tables.meta = meta.parse(metaTable.data, metaTable.offset);
    font.metas = font.tables.meta;
  }
  return font;
}
__name(parseBuffer, "parseBuffer");
function load2() {
}
__name(load2, "load2");
function loadSync() {
}
__name(loadSync, "loadSync");
var u8;
var u16;
var u32;
var fleb;
var fdeb;
var clim;
var freb;
var _a;
var fl;
var revfl;
var _b;
var fd;
var rev;
var x2;
var i;
var hMap;
var flt;
var i;
var i;
var i;
var i;
var fdt;
var i;
var flrm;
var fdrm;
var max;
var bits;
var bits16;
var shft;
var slc;
var ec;
var err;
var inflt;
var et;
var td;
var tds;
var cffStandardStrings;
var cffStandardEncoding;
var cffExpertEncoding;
var check;
var glyphset;
var typeOffsets;
var langSysTable;
var parse;
var glyf;
var instructionTable;
var exec;
var execGlyph;
var execComponent;
var roundSuper;
var xUnitVector;
var yUnitVector;
var HPZero;
var defaultState;
var arabicWordCheck;
var arabicSentenceCheck;
var SUBSTITUTIONS;
var latinWordCheck;
var cmap;
var TOP_DICT_META;
var PRIVATE_DICT_META;
var cff;
var fvar;
var attachList;
var caretValue;
var ligGlyph;
var ligCaretList;
var markGlyphSets;
var gdef;
var subtableParsers;
var gpos;
var subtableParsers$1;
var lookupRecordDesc;
var gsub;
var head;
var hhea;
var hmtx;
var kern;
var ltag;
var loca;
var maxp;
var os2;
var post;
var decode;
var eightBitMacEncodings;
var meta;
var opentype;
var opentype_module_default;
var init_opentype_module = __esm({
  "../node_modules/@shuding/opentype.js/dist/opentype.module.js"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    u8 = Uint8Array;
    u16 = Uint16Array;
    u32 = Uint32Array;
    fleb = new u8([
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      1,
      1,
      1,
      2,
      2,
      2,
      2,
      3,
      3,
      3,
      3,
      4,
      4,
      4,
      4,
      5,
      5,
      5,
      5,
      0,
      /* unused */
      0,
      0,
      /* impossible */
      0
    ]);
    fdeb = new u8([
      0,
      0,
      0,
      0,
      1,
      1,
      2,
      2,
      3,
      3,
      4,
      4,
      5,
      5,
      6,
      6,
      7,
      7,
      8,
      8,
      9,
      9,
      10,
      10,
      11,
      11,
      12,
      12,
      13,
      13,
      /* unused */
      0,
      0
    ]);
    clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
    freb = /* @__PURE__ */ __name2(function(eb, start) {
      var b = new u16(31);
      for (var i2 = 0; i2 < 31; ++i2) {
        b[i2] = start += 1 << eb[i2 - 1];
      }
      var r = new u32(b[30]);
      for (var i2 = 1; i2 < 30; ++i2) {
        for (var j = b[i2]; j < b[i2 + 1]; ++j) {
          r[j] = j - b[i2] << 5 | i2;
        }
      }
      return [b, r];
    }, "freb");
    _a = freb(fleb, 2);
    fl = _a[0];
    revfl = _a[1];
    fl[28] = 258, revfl[258] = 28;
    _b = freb(fdeb, 0);
    fd = _b[0];
    rev = new u16(32768);
    for (i = 0; i < 32768; ++i) {
      x2 = (i & 43690) >>> 1 | (i & 21845) << 1;
      x2 = (x2 & 52428) >>> 2 | (x2 & 13107) << 2;
      x2 = (x2 & 61680) >>> 4 | (x2 & 3855) << 4;
      rev[i] = ((x2 & 65280) >>> 8 | (x2 & 255) << 8) >>> 1;
    }
    hMap = /* @__PURE__ */ __name2((function(cd2, mb, r) {
      var s = cd2.length;
      var i2 = 0;
      var l2 = new u16(mb);
      for (; i2 < s; ++i2) {
        if (cd2[i2]) {
          ++l2[cd2[i2] - 1];
        }
      }
      var le = new u16(mb);
      for (i2 = 0; i2 < mb; ++i2) {
        le[i2] = le[i2 - 1] + l2[i2 - 1] << 1;
      }
      var co;
      if (r) {
        co = new u16(1 << mb);
        var rvb = 15 - mb;
        for (i2 = 0; i2 < s; ++i2) {
          if (cd2[i2]) {
            var sv = i2 << 4 | cd2[i2];
            var r_1 = mb - cd2[i2];
            var v2 = le[cd2[i2] - 1]++ << r_1;
            for (var m2 = v2 | (1 << r_1) - 1; v2 <= m2; ++v2) {
              co[rev[v2] >>> rvb] = sv;
            }
          }
        }
      } else {
        co = new u16(s);
        for (i2 = 0; i2 < s; ++i2) {
          if (cd2[i2]) {
            co[i2] = rev[le[cd2[i2] - 1]++] >>> 15 - cd2[i2];
          }
        }
      }
      return co;
    }), "hMap");
    flt = new u8(288);
    for (i = 0; i < 144; ++i) {
      flt[i] = 8;
    }
    for (i = 144; i < 256; ++i) {
      flt[i] = 9;
    }
    for (i = 256; i < 280; ++i) {
      flt[i] = 7;
    }
    for (i = 280; i < 288; ++i) {
      flt[i] = 8;
    }
    fdt = new u8(32);
    for (i = 0; i < 32; ++i) {
      fdt[i] = 5;
    }
    flrm = /* @__PURE__ */ hMap(flt, 9, 1);
    fdrm = /* @__PURE__ */ hMap(fdt, 5, 1);
    max = /* @__PURE__ */ __name2(function(a) {
      var m2 = a[0];
      for (var i2 = 1; i2 < a.length; ++i2) {
        if (a[i2] > m2) {
          m2 = a[i2];
        }
      }
      return m2;
    }, "max");
    bits = /* @__PURE__ */ __name2(function(d2, p, m2) {
      var o = p / 8 | 0;
      return (d2[o] | d2[o + 1] << 8) >> (p & 7) & m2;
    }, "bits");
    bits16 = /* @__PURE__ */ __name2(function(d2, p) {
      var o = p / 8 | 0;
      return (d2[o] | d2[o + 1] << 8 | d2[o + 2] << 16) >> (p & 7);
    }, "bits16");
    shft = /* @__PURE__ */ __name2(function(p) {
      return (p + 7) / 8 | 0;
    }, "shft");
    slc = /* @__PURE__ */ __name2(function(v2, s, e) {
      if (s == null || s < 0) {
        s = 0;
      }
      if (e == null || e > v2.length) {
        e = v2.length;
      }
      var n = new (v2.BYTES_PER_ELEMENT == 2 ? u16 : v2.BYTES_PER_ELEMENT == 4 ? u32 : u8)(e - s);
      n.set(v2.subarray(s, e));
      return n;
    }, "slc");
    ec = [
      "unexpected EOF",
      "invalid block type",
      "invalid length/literal",
      "invalid distance",
      "stream finished",
      "no stream handler",
      ,
      "no callback",
      "invalid UTF-8 data",
      "extra field too long",
      "date not in range 1980-2099",
      "filename too long",
      "stream finishing",
      "invalid zip data"
      // determined by unknown compression method
    ];
    err = /* @__PURE__ */ __name2(function(ind, msg, nt) {
      var e = new Error(msg || ec[ind]);
      e.code = ind;
      if (Error.captureStackTrace) {
        Error.captureStackTrace(e, err);
      }
      if (!nt) {
        throw e;
      }
      return e;
    }, "err");
    inflt = /* @__PURE__ */ __name2(function(dat, buf, st) {
      var sl2 = dat.length;
      if (!sl2 || st && st.f && !st.l) {
        return buf || new u8(0);
      }
      var noBuf = !buf || st;
      var noSt = !st || st.i;
      if (!st) {
        st = {};
      }
      if (!buf) {
        buf = new u8(sl2 * 3);
      }
      var cbuf = /* @__PURE__ */ __name2(function(l3) {
        var bl = buf.length;
        if (l3 > bl) {
          var nbuf = new u8(Math.max(bl * 2, l3));
          nbuf.set(buf);
          buf = nbuf;
        }
      }, "cbuf");
      var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
      var tbts = sl2 * 8;
      do {
        if (!lm) {
          final = bits(dat, pos, 1);
          var type = bits(dat, pos + 1, 3);
          pos += 3;
          if (!type) {
            var s = shft(pos) + 4, l2 = dat[s - 4] | dat[s - 3] << 8, t = s + l2;
            if (t > sl2) {
              if (noSt) {
                err(0);
              }
              break;
            }
            if (noBuf) {
              cbuf(bt + l2);
            }
            buf.set(dat.subarray(s, t), bt);
            st.b = bt += l2, st.p = pos = t * 8, st.f = final;
            continue;
          } else if (type == 1) {
            lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
          } else if (type == 2) {
            var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
            var tl = hLit + bits(dat, pos + 5, 31) + 1;
            pos += 14;
            var ldt = new u8(tl);
            var clt = new u8(19);
            for (var i2 = 0; i2 < hcLen; ++i2) {
              clt[clim[i2]] = bits(dat, pos + i2 * 3, 7);
            }
            pos += hcLen * 3;
            var clb = max(clt), clbmsk = (1 << clb) - 1;
            var clm = hMap(clt, clb, 1);
            for (var i2 = 0; i2 < tl; ) {
              var r = clm[bits(dat, pos, clbmsk)];
              pos += r & 15;
              var s = r >>> 4;
              if (s < 16) {
                ldt[i2++] = s;
              } else {
                var c2 = 0, n = 0;
                if (s == 16) {
                  n = 3 + bits(dat, pos, 3), pos += 2, c2 = ldt[i2 - 1];
                } else if (s == 17) {
                  n = 3 + bits(dat, pos, 7), pos += 3;
                } else if (s == 18) {
                  n = 11 + bits(dat, pos, 127), pos += 7;
                }
                while (n--) {
                  ldt[i2++] = c2;
                }
              }
            }
            var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
            lbt = max(lt);
            dbt = max(dt);
            lm = hMap(lt, lbt, 1);
            dm = hMap(dt, dbt, 1);
          } else {
            err(1);
          }
          if (pos > tbts) {
            if (noSt) {
              err(0);
            }
            break;
          }
        }
        if (noBuf) {
          cbuf(bt + 131072);
        }
        var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
        var lpos = pos;
        for (; ; lpos = pos) {
          var c2 = lm[bits16(dat, pos) & lms], sym = c2 >>> 4;
          pos += c2 & 15;
          if (pos > tbts) {
            if (noSt) {
              err(0);
            }
            break;
          }
          if (!c2) {
            err(2);
          }
          if (sym < 256) {
            buf[bt++] = sym;
          } else if (sym == 256) {
            lpos = pos, lm = null;
            break;
          } else {
            var add = sym - 254;
            if (sym > 264) {
              var i2 = sym - 257, b = fleb[i2];
              add = bits(dat, pos, (1 << b) - 1) + fl[i2];
              pos += b;
            }
            var d2 = dm[bits16(dat, pos) & dms], dsym = d2 >>> 4;
            if (!d2) {
              err(3);
            }
            pos += d2 & 15;
            var dt = fd[dsym];
            if (dsym > 3) {
              var b = fdeb[dsym];
              dt += bits16(dat, pos) & (1 << b) - 1, pos += b;
            }
            if (pos > tbts) {
              if (noSt) {
                err(0);
              }
              break;
            }
            if (noBuf) {
              cbuf(bt + 131072);
            }
            var end = bt + add;
            for (; bt < end; bt += 4) {
              buf[bt] = buf[bt - dt];
              buf[bt + 1] = buf[bt + 1 - dt];
              buf[bt + 2] = buf[bt + 2 - dt];
              buf[bt + 3] = buf[bt + 3 - dt];
            }
            bt = end;
          }
        }
        st.l = lm, st.p = lpos, st.b = bt, st.f = final;
        if (lm) {
          final = 1, st.m = lbt, st.d = dm, st.n = dbt;
        }
      } while (!final);
      return bt == buf.length ? buf : slc(buf, 0, bt);
    }, "inflt");
    et = /* @__PURE__ */ new u8(0);
    __name2(inflateSync, "inflateSync");
    td = typeof TextDecoder != "undefined" && /* @__PURE__ */ new TextDecoder();
    tds = 0;
    try {
      td.decode(et, { stream: true });
      tds = 1;
    } catch (e) {
    }
    __name2(Path, "Path");
    Path.prototype.moveTo = function(x22, y) {
      this.commands.push({
        type: "M",
        x: x22,
        y
      });
    };
    Path.prototype.lineTo = function(x22, y) {
      this.commands.push({
        type: "L",
        x: x22,
        y
      });
    };
    Path.prototype.curveTo = Path.prototype.bezierCurveTo = function(x1, y1, x22, y2, x3, y) {
      this.commands.push({
        type: "C",
        x1,
        y1,
        x2: x22,
        y2,
        x: x3,
        y
      });
    };
    Path.prototype.quadTo = Path.prototype.quadraticCurveTo = function(x1, y1, x22, y) {
      this.commands.push({
        type: "Q",
        x1,
        y1,
        x: x22,
        y
      });
    };
    Path.prototype.close = Path.prototype.closePath = function() {
      this.commands.push({
        type: "Z"
      });
    };
    Path.prototype.extend = function(pathOrCommands) {
      if (pathOrCommands.commands) {
        pathOrCommands = pathOrCommands.commands;
      }
      Array.prototype.push.apply(this.commands, pathOrCommands);
    };
    Path.prototype.toPathData = function(decimalPlaces) {
      decimalPlaces = decimalPlaces !== void 0 ? decimalPlaces : 2;
      function floatToString(v2) {
        if (Math.round(v2) === v2) {
          return "" + Math.round(v2);
        } else {
          return v2.toFixed(decimalPlaces);
        }
      }
      __name(floatToString, "floatToString");
      __name2(floatToString, "floatToString");
      function packValues() {
        var arguments$1 = arguments;
        var s = "";
        for (var i22 = 0; i22 < arguments.length; i22 += 1) {
          var v2 = arguments$1[i22];
          if (v2 >= 0 && i22 > 0) {
            s += " ";
          }
          s += floatToString(v2);
        }
        return s;
      }
      __name(packValues, "packValues");
      __name2(packValues, "packValues");
      var d2 = "";
      for (var i2 = 0; i2 < this.commands.length; i2 += 1) {
        var cmd = this.commands[i2];
        if (cmd.type === "M") {
          d2 += "M" + packValues(cmd.x, cmd.y);
        } else if (cmd.type === "L") {
          d2 += "L" + packValues(cmd.x, cmd.y);
        } else if (cmd.type === "C") {
          d2 += "C" + packValues(cmd.x1, cmd.y1, cmd.x2, cmd.y2, cmd.x, cmd.y);
        } else if (cmd.type === "Q") {
          d2 += "Q" + packValues(cmd.x1, cmd.y1, cmd.x, cmd.y);
        } else if (cmd.type === "Z") {
          d2 += "Z";
        }
      }
      return d2;
    };
    cffStandardStrings = [
      ".notdef",
      "space",
      "exclam",
      "quotedbl",
      "numbersign",
      "dollar",
      "percent",
      "ampersand",
      "quoteright",
      "parenleft",
      "parenright",
      "asterisk",
      "plus",
      "comma",
      "hyphen",
      "period",
      "slash",
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "colon",
      "semicolon",
      "less",
      "equal",
      "greater",
      "question",
      "at",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "bracketleft",
      "backslash",
      "bracketright",
      "asciicircum",
      "underscore",
      "quoteleft",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "braceleft",
      "bar",
      "braceright",
      "asciitilde",
      "exclamdown",
      "cent",
      "sterling",
      "fraction",
      "yen",
      "florin",
      "section",
      "currency",
      "quotesingle",
      "quotedblleft",
      "guillemotleft",
      "guilsinglleft",
      "guilsinglright",
      "fi",
      "fl",
      "endash",
      "dagger",
      "daggerdbl",
      "periodcentered",
      "paragraph",
      "bullet",
      "quotesinglbase",
      "quotedblbase",
      "quotedblright",
      "guillemotright",
      "ellipsis",
      "perthousand",
      "questiondown",
      "grave",
      "acute",
      "circumflex",
      "tilde",
      "macron",
      "breve",
      "dotaccent",
      "dieresis",
      "ring",
      "cedilla",
      "hungarumlaut",
      "ogonek",
      "caron",
      "emdash",
      "AE",
      "ordfeminine",
      "Lslash",
      "Oslash",
      "OE",
      "ordmasculine",
      "ae",
      "dotlessi",
      "lslash",
      "oslash",
      "oe",
      "germandbls",
      "onesuperior",
      "logicalnot",
      "mu",
      "trademark",
      "Eth",
      "onehalf",
      "plusminus",
      "Thorn",
      "onequarter",
      "divide",
      "brokenbar",
      "degree",
      "thorn",
      "threequarters",
      "twosuperior",
      "registered",
      "minus",
      "eth",
      "multiply",
      "threesuperior",
      "copyright",
      "Aacute",
      "Acircumflex",
      "Adieresis",
      "Agrave",
      "Aring",
      "Atilde",
      "Ccedilla",
      "Eacute",
      "Ecircumflex",
      "Edieresis",
      "Egrave",
      "Iacute",
      "Icircumflex",
      "Idieresis",
      "Igrave",
      "Ntilde",
      "Oacute",
      "Ocircumflex",
      "Odieresis",
      "Ograve",
      "Otilde",
      "Scaron",
      "Uacute",
      "Ucircumflex",
      "Udieresis",
      "Ugrave",
      "Yacute",
      "Ydieresis",
      "Zcaron",
      "aacute",
      "acircumflex",
      "adieresis",
      "agrave",
      "aring",
      "atilde",
      "ccedilla",
      "eacute",
      "ecircumflex",
      "edieresis",
      "egrave",
      "iacute",
      "icircumflex",
      "idieresis",
      "igrave",
      "ntilde",
      "oacute",
      "ocircumflex",
      "odieresis",
      "ograve",
      "otilde",
      "scaron",
      "uacute",
      "ucircumflex",
      "udieresis",
      "ugrave",
      "yacute",
      "ydieresis",
      "zcaron",
      "exclamsmall",
      "Hungarumlautsmall",
      "dollaroldstyle",
      "dollarsuperior",
      "ampersandsmall",
      "Acutesmall",
      "parenleftsuperior",
      "parenrightsuperior",
      "266 ff",
      "onedotenleader",
      "zerooldstyle",
      "oneoldstyle",
      "twooldstyle",
      "threeoldstyle",
      "fouroldstyle",
      "fiveoldstyle",
      "sixoldstyle",
      "sevenoldstyle",
      "eightoldstyle",
      "nineoldstyle",
      "commasuperior",
      "threequartersemdash",
      "periodsuperior",
      "questionsmall",
      "asuperior",
      "bsuperior",
      "centsuperior",
      "dsuperior",
      "esuperior",
      "isuperior",
      "lsuperior",
      "msuperior",
      "nsuperior",
      "osuperior",
      "rsuperior",
      "ssuperior",
      "tsuperior",
      "ff",
      "ffi",
      "ffl",
      "parenleftinferior",
      "parenrightinferior",
      "Circumflexsmall",
      "hyphensuperior",
      "Gravesmall",
      "Asmall",
      "Bsmall",
      "Csmall",
      "Dsmall",
      "Esmall",
      "Fsmall",
      "Gsmall",
      "Hsmall",
      "Ismall",
      "Jsmall",
      "Ksmall",
      "Lsmall",
      "Msmall",
      "Nsmall",
      "Osmall",
      "Psmall",
      "Qsmall",
      "Rsmall",
      "Ssmall",
      "Tsmall",
      "Usmall",
      "Vsmall",
      "Wsmall",
      "Xsmall",
      "Ysmall",
      "Zsmall",
      "colonmonetary",
      "onefitted",
      "rupiah",
      "Tildesmall",
      "exclamdownsmall",
      "centoldstyle",
      "Lslashsmall",
      "Scaronsmall",
      "Zcaronsmall",
      "Dieresissmall",
      "Brevesmall",
      "Caronsmall",
      "Dotaccentsmall",
      "Macronsmall",
      "figuredash",
      "hypheninferior",
      "Ogoneksmall",
      "Ringsmall",
      "Cedillasmall",
      "questiondownsmall",
      "oneeighth",
      "threeeighths",
      "fiveeighths",
      "seveneighths",
      "onethird",
      "twothirds",
      "zerosuperior",
      "foursuperior",
      "fivesuperior",
      "sixsuperior",
      "sevensuperior",
      "eightsuperior",
      "ninesuperior",
      "zeroinferior",
      "oneinferior",
      "twoinferior",
      "threeinferior",
      "fourinferior",
      "fiveinferior",
      "sixinferior",
      "seveninferior",
      "eightinferior",
      "nineinferior",
      "centinferior",
      "dollarinferior",
      "periodinferior",
      "commainferior",
      "Agravesmall",
      "Aacutesmall",
      "Acircumflexsmall",
      "Atildesmall",
      "Adieresissmall",
      "Aringsmall",
      "AEsmall",
      "Ccedillasmall",
      "Egravesmall",
      "Eacutesmall",
      "Ecircumflexsmall",
      "Edieresissmall",
      "Igravesmall",
      "Iacutesmall",
      "Icircumflexsmall",
      "Idieresissmall",
      "Ethsmall",
      "Ntildesmall",
      "Ogravesmall",
      "Oacutesmall",
      "Ocircumflexsmall",
      "Otildesmall",
      "Odieresissmall",
      "OEsmall",
      "Oslashsmall",
      "Ugravesmall",
      "Uacutesmall",
      "Ucircumflexsmall",
      "Udieresissmall",
      "Yacutesmall",
      "Thornsmall",
      "Ydieresissmall",
      "001.000",
      "001.001",
      "001.002",
      "001.003",
      "Black",
      "Bold",
      "Book",
      "Light",
      "Medium",
      "Regular",
      "Roman",
      "Semibold"
    ];
    cffStandardEncoding = [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "space",
      "exclam",
      "quotedbl",
      "numbersign",
      "dollar",
      "percent",
      "ampersand",
      "quoteright",
      "parenleft",
      "parenright",
      "asterisk",
      "plus",
      "comma",
      "hyphen",
      "period",
      "slash",
      "zero",
      "one",
      "two",
      "three",
      "four",
      "five",
      "six",
      "seven",
      "eight",
      "nine",
      "colon",
      "semicolon",
      "less",
      "equal",
      "greater",
      "question",
      "at",
      "A",
      "B",
      "C",
      "D",
      "E",
      "F",
      "G",
      "H",
      "I",
      "J",
      "K",
      "L",
      "M",
      "N",
      "O",
      "P",
      "Q",
      "R",
      "S",
      "T",
      "U",
      "V",
      "W",
      "X",
      "Y",
      "Z",
      "bracketleft",
      "backslash",
      "bracketright",
      "asciicircum",
      "underscore",
      "quoteleft",
      "a",
      "b",
      "c",
      "d",
      "e",
      "f",
      "g",
      "h",
      "i",
      "j",
      "k",
      "l",
      "m",
      "n",
      "o",
      "p",
      "q",
      "r",
      "s",
      "t",
      "u",
      "v",
      "w",
      "x",
      "y",
      "z",
      "braceleft",
      "bar",
      "braceright",
      "asciitilde",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "exclamdown",
      "cent",
      "sterling",
      "fraction",
      "yen",
      "florin",
      "section",
      "currency",
      "quotesingle",
      "quotedblleft",
      "guillemotleft",
      "guilsinglleft",
      "guilsinglright",
      "fi",
      "fl",
      "",
      "endash",
      "dagger",
      "daggerdbl",
      "periodcentered",
      "",
      "paragraph",
      "bullet",
      "quotesinglbase",
      "quotedblbase",
      "quotedblright",
      "guillemotright",
      "ellipsis",
      "perthousand",
      "",
      "questiondown",
      "",
      "grave",
      "acute",
      "circumflex",
      "tilde",
      "macron",
      "breve",
      "dotaccent",
      "dieresis",
      "",
      "ring",
      "cedilla",
      "",
      "hungarumlaut",
      "ogonek",
      "caron",
      "emdash",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "AE",
      "",
      "ordfeminine",
      "",
      "",
      "",
      "",
      "Lslash",
      "Oslash",
      "OE",
      "ordmasculine",
      "",
      "",
      "",
      "",
      "",
      "ae",
      "",
      "",
      "",
      "dotlessi",
      "",
      "",
      "lslash",
      "oslash",
      "oe",
      "germandbls"
    ];
    cffExpertEncoding = [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "space",
      "exclamsmall",
      "Hungarumlautsmall",
      "",
      "dollaroldstyle",
      "dollarsuperior",
      "ampersandsmall",
      "Acutesmall",
      "parenleftsuperior",
      "parenrightsuperior",
      "twodotenleader",
      "onedotenleader",
      "comma",
      "hyphen",
      "period",
      "fraction",
      "zerooldstyle",
      "oneoldstyle",
      "twooldstyle",
      "threeoldstyle",
      "fouroldstyle",
      "fiveoldstyle",
      "sixoldstyle",
      "sevenoldstyle",
      "eightoldstyle",
      "nineoldstyle",
      "colon",
      "semicolon",
      "commasuperior",
      "threequartersemdash",
      "periodsuperior",
      "questionsmall",
      "",
      "asuperior",
      "bsuperior",
      "centsuperior",
      "dsuperior",
      "esuperior",
      "",
      "",
      "isuperior",
      "",
      "",
      "lsuperior",
      "msuperior",
      "nsuperior",
      "osuperior",
      "",
      "",
      "rsuperior",
      "ssuperior",
      "tsuperior",
      "",
      "ff",
      "fi",
      "fl",
      "ffi",
      "ffl",
      "parenleftinferior",
      "",
      "parenrightinferior",
      "Circumflexsmall",
      "hyphensuperior",
      "Gravesmall",
      "Asmall",
      "Bsmall",
      "Csmall",
      "Dsmall",
      "Esmall",
      "Fsmall",
      "Gsmall",
      "Hsmall",
      "Ismall",
      "Jsmall",
      "Ksmall",
      "Lsmall",
      "Msmall",
      "Nsmall",
      "Osmall",
      "Psmall",
      "Qsmall",
      "Rsmall",
      "Ssmall",
      "Tsmall",
      "Usmall",
      "Vsmall",
      "Wsmall",
      "Xsmall",
      "Ysmall",
      "Zsmall",
      "colonmonetary",
      "onefitted",
      "rupiah",
      "Tildesmall",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      "exclamdownsmall",
      "centoldstyle",
      "Lslashsmall",
      "",
      "",
      "Scaronsmall",
      "Zcaronsmall",
      "Dieresissmall",
      "Brevesmall",
      "Caronsmall",
      "",
      "Dotaccentsmall",
      "",
      "",
      "Macronsmall",
      "",
      "",
      "figuredash",
      "hypheninferior",
      "",
      "",
      "Ogoneksmall",
      "Ringsmall",
      "Cedillasmall",
      "",
      "",
      "",
      "onequarter",
      "onehalf",
      "threequarters",
      "questiondownsmall",
      "oneeighth",
      "threeeighths",
      "fiveeighths",
      "seveneighths",
      "onethird",
      "twothirds",
      "",
      "",
      "zerosuperior",
      "onesuperior",
      "twosuperior",
      "threesuperior",
      "foursuperior",
      "fivesuperior",
      "sixsuperior",
      "sevensuperior",
      "eightsuperior",
      "ninesuperior",
      "zeroinferior",
      "oneinferior",
      "twoinferior",
      "threeinferior",
      "fourinferior",
      "fiveinferior",
      "sixinferior",
      "seveninferior",
      "eightinferior",
      "nineinferior",
      "centinferior",
      "dollarinferior",
      "periodinferior",
      "commainferior",
      "Agravesmall",
      "Aacutesmall",
      "Acircumflexsmall",
      "Atildesmall",
      "Adieresissmall",
      "Aringsmall",
      "AEsmall",
      "Ccedillasmall",
      "Egravesmall",
      "Eacutesmall",
      "Ecircumflexsmall",
      "Edieresissmall",
      "Igravesmall",
      "Iacutesmall",
      "Icircumflexsmall",
      "Idieresissmall",
      "Ethsmall",
      "Ntildesmall",
      "Ogravesmall",
      "Oacutesmall",
      "Ocircumflexsmall",
      "Otildesmall",
      "Odieresissmall",
      "OEsmall",
      "Oslashsmall",
      "Ugravesmall",
      "Uacutesmall",
      "Ucircumflexsmall",
      "Udieresissmall",
      "Yacutesmall",
      "Thornsmall",
      "Ydieresissmall"
    ];
    __name2(DefaultEncoding, "DefaultEncoding");
    DefaultEncoding.prototype.charToGlyphIndex = function(c2) {
      var code = c2.codePointAt(0);
      var glyphs = this.font.glyphs;
      if (glyphs) {
        for (var i2 = 0; i2 < glyphs.length; i2 += 1) {
          var glyph = glyphs.get(i2);
          for (var j = 0; j < glyph.unicodes.length; j += 1) {
            if (glyph.unicodes[j] === code) {
              return i2;
            }
          }
        }
      }
      return null;
    };
    __name2(CmapEncoding, "CmapEncoding");
    CmapEncoding.prototype.charToGlyphIndex = function(c2) {
      return this.cmap.glyphIndexMap[c2.codePointAt(0)] || 0;
    };
    __name2(CffEncoding, "CffEncoding");
    CffEncoding.prototype.charToGlyphIndex = function(s) {
      var code = s.codePointAt(0);
      var charName = this.encoding[code];
      return this.charset.indexOf(charName);
    };
    __name2(addGlyphNamesAll, "addGlyphNamesAll");
    __name2(addGlyphNamesToUnicodeMap, "addGlyphNamesToUnicodeMap");
    __name2(addGlyphNames, "addGlyphNames");
    __name2(fail, "fail");
    __name2(argument, "argument");
    check = { fail, argument, assert: argument };
    __name2(getPathDefinition, "getPathDefinition");
    __name2(Glyph, "Glyph");
    Glyph.prototype.bindConstructorValues = function(options) {
      this.index = options.index || 0;
      this.name = options.name || null;
      this.unicode = options.unicode || void 0;
      this.unicodes = options.unicodes || options.unicode !== void 0 ? [options.unicode] : [];
      if ("xMin" in options) {
        this.xMin = options.xMin;
      }
      if ("yMin" in options) {
        this.yMin = options.yMin;
      }
      if ("xMax" in options) {
        this.xMax = options.xMax;
      }
      if ("yMax" in options) {
        this.yMax = options.yMax;
      }
      if ("advanceWidth" in options) {
        this.advanceWidth = options.advanceWidth;
      }
      Object.defineProperty(this, "path", getPathDefinition(this, options.path));
    };
    Glyph.prototype.addUnicode = function(unicode) {
      if (this.unicodes.length === 0) {
        this.unicode = unicode;
      }
      this.unicodes.push(unicode);
    };
    Glyph.prototype.getPath = function(x22, y, fontSize, options, font) {
      x22 = x22 !== void 0 ? x22 : 0;
      y = y !== void 0 ? y : 0;
      fontSize = fontSize !== void 0 ? fontSize : 72;
      var commands;
      var hPoints;
      if (!options) {
        options = {};
      }
      var xScale = options.xScale;
      var yScale = options.yScale;
      if (options.hinting && font && font.hinting) {
        hPoints = this.path && font.hinting.exec(this, fontSize);
      }
      if (hPoints) {
        commands = font.hinting.getCommands(hPoints);
        x22 = Math.round(x22);
        y = Math.round(y);
        xScale = yScale = 1;
      } else {
        commands = this.path.commands;
        var scale = 1 / (this.path.unitsPerEm || 1e3) * fontSize;
        if (xScale === void 0) {
          xScale = scale;
        }
        if (yScale === void 0) {
          yScale = scale;
        }
      }
      var p = new Path();
      for (var i2 = 0; i2 < commands.length; i2 += 1) {
        var cmd = commands[i2];
        if (cmd.type === "M") {
          p.moveTo(x22 + cmd.x * xScale, y + -cmd.y * yScale);
        } else if (cmd.type === "L") {
          p.lineTo(x22 + cmd.x * xScale, y + -cmd.y * yScale);
        } else if (cmd.type === "Q") {
          p.quadraticCurveTo(
            x22 + cmd.x1 * xScale,
            y + -cmd.y1 * yScale,
            x22 + cmd.x * xScale,
            y + -cmd.y * yScale
          );
        } else if (cmd.type === "C") {
          p.curveTo(
            x22 + cmd.x1 * xScale,
            y + -cmd.y1 * yScale,
            x22 + cmd.x2 * xScale,
            y + -cmd.y2 * yScale,
            x22 + cmd.x * xScale,
            y + -cmd.y * yScale
          );
        } else if (cmd.type === "Z") {
          p.closePath();
        }
      }
      return p;
    };
    Glyph.prototype.getContours = function() {
      if (this.points === void 0) {
        return [];
      }
      var contours = [];
      var currentContour = [];
      for (var i2 = 0; i2 < this.points.length; i2 += 1) {
        var pt = this.points[i2];
        currentContour.push(pt);
        if (pt.lastPointOfContour) {
          contours.push(currentContour);
          currentContour = [];
        }
      }
      check.argument(
        currentContour.length === 0,
        "There are still points left in the current contour."
      );
      return contours;
    };
    Glyph.prototype.getMetrics = function() {
      var commands = this.path.commands;
      var xCoords = [];
      var yCoords = [];
      for (var i2 = 0; i2 < commands.length; i2 += 1) {
        var cmd = commands[i2];
        if (cmd.type !== "Z") {
          xCoords.push(cmd.x);
          yCoords.push(cmd.y);
        }
        if (cmd.type === "Q" || cmd.type === "C") {
          xCoords.push(cmd.x1);
          yCoords.push(cmd.y1);
        }
        if (cmd.type === "C") {
          xCoords.push(cmd.x2);
          yCoords.push(cmd.y2);
        }
      }
      var metrics = {
        xMin: Math.min.apply(null, xCoords),
        yMin: Math.min.apply(null, yCoords),
        xMax: Math.max.apply(null, xCoords),
        yMax: Math.max.apply(null, yCoords),
        leftSideBearing: this.leftSideBearing
      };
      if (!isFinite(metrics.xMin)) {
        metrics.xMin = 0;
      }
      if (!isFinite(metrics.xMax)) {
        metrics.xMax = this.advanceWidth;
      }
      if (!isFinite(metrics.yMin)) {
        metrics.yMin = 0;
      }
      if (!isFinite(metrics.yMax)) {
        metrics.yMax = 0;
      }
      metrics.rightSideBearing = this.advanceWidth - metrics.leftSideBearing - (metrics.xMax - metrics.xMin);
      return metrics;
    };
    __name2(defineDependentProperty, "defineDependentProperty");
    __name2(GlyphSet, "GlyphSet");
    GlyphSet.prototype.get = function(index) {
      if (this.glyphs[index] === void 0) {
        this.font._push(index);
        if (typeof this.glyphs[index] === "function") {
          this.glyphs[index] = this.glyphs[index]();
        }
        var glyph = this.glyphs[index];
        var unicodeObj = this.font._IndexToUnicodeMap[index];
        if (unicodeObj) {
          for (var j = 0; j < unicodeObj.unicodes.length; j++) {
            glyph.addUnicode(unicodeObj.unicodes[j]);
          }
        }
        this.glyphs[index].advanceWidth = this.font._hmtxTableData[index].advanceWidth;
        this.glyphs[index].leftSideBearing = this.font._hmtxTableData[index].leftSideBearing;
      } else {
        if (typeof this.glyphs[index] === "function") {
          this.glyphs[index] = this.glyphs[index]();
        }
      }
      return this.glyphs[index];
    };
    GlyphSet.prototype.push = function(index, loader) {
      this.glyphs[index] = loader;
      this.length++;
    };
    __name2(glyphLoader, "glyphLoader");
    __name2(ttfGlyphLoader, "ttfGlyphLoader");
    __name2(cffGlyphLoader, "cffGlyphLoader");
    glyphset = { GlyphSet, glyphLoader, ttfGlyphLoader, cffGlyphLoader };
    __name2(searchTag, "searchTag");
    __name2(binSearch, "binSearch");
    __name2(searchRange, "searchRange");
    __name2(Layout, "Layout");
    Layout.prototype = {
      /**
       * Binary search an object by "tag" property
       * @instance
       * @function searchTag
       * @memberof opentype.Layout
       * @param  {Array} arr
       * @param  {string} tag
       * @return {number}
       */
      searchTag,
      /**
       * Binary search in a list of numbers
       * @instance
       * @function binSearch
       * @memberof opentype.Layout
       * @param  {Array} arr
       * @param  {number} value
       * @return {number}
       */
      binSearch,
      /**
       * Get or create the Layout table (GSUB, GPOS etc).
       * @param  {boolean} create - Whether to create a new one.
       * @return {Object} The GSUB or GPOS table.
       */
      getTable: /* @__PURE__ */ __name2(function(create) {
        var layout = this.font.tables[this.tableName];
        if (!layout && create) {
          layout = this.font.tables[this.tableName] = this.createDefaultTable();
        }
        return layout;
      }, "getTable"),
      /**
       * Returns the best bet for a script name.
       * Returns 'DFLT' if it exists.
       * If not, returns 'latn' if it exists.
       * If neither exist, returns undefined.
       */
      getDefaultScriptName: /* @__PURE__ */ __name2(function() {
        var layout = this.getTable();
        if (!layout) {
          return;
        }
        var hasLatn = false;
        for (var i2 = 0; i2 < layout.scripts.length; i2++) {
          var name = layout.scripts[i2].tag;
          if (name === "DFLT") {
            return name;
          }
          if (name === "latn") {
            hasLatn = true;
          }
        }
        if (hasLatn) {
          return "latn";
        }
      }, "getDefaultScriptName"),
      /**
       * Returns all LangSysRecords in the given script.
       * @instance
       * @param {string} [script='DFLT']
       * @param {boolean} create - forces the creation of this script table if it doesn't exist.
       * @return {Object} An object with tag and script properties.
       */
      getScriptTable: /* @__PURE__ */ __name2(function(script, create) {
        var layout = this.getTable(create);
        if (layout) {
          script = script || "DFLT";
          var scripts = layout.scripts;
          var pos = searchTag(layout.scripts, script);
          if (pos >= 0) {
            return scripts[pos].script;
          } else if (create) {
            var scr = {
              tag: script,
              script: {
                defaultLangSys: {
                  reserved: 0,
                  reqFeatureIndex: 65535,
                  featureIndexes: []
                },
                langSysRecords: []
              }
            };
            scripts.splice(-1 - pos, 0, scr);
            return scr.script;
          }
        }
      }, "getScriptTable"),
      /**
       * Returns a language system table
       * @instance
       * @param {string} [script='DFLT']
       * @param {string} [language='dlft']
       * @param {boolean} create - forces the creation of this langSysTable if it doesn't exist.
       * @return {Object}
       */
      getLangSysTable: /* @__PURE__ */ __name2(function(script, language, create) {
        var scriptTable = this.getScriptTable(script, create);
        if (scriptTable) {
          if (!language || language === "dflt" || language === "DFLT") {
            return scriptTable.defaultLangSys;
          }
          var pos = searchTag(scriptTable.langSysRecords, language);
          if (pos >= 0) {
            return scriptTable.langSysRecords[pos].langSys;
          } else if (create) {
            var langSysRecord = {
              tag: language,
              langSys: {
                reserved: 0,
                reqFeatureIndex: 65535,
                featureIndexes: []
              }
            };
            scriptTable.langSysRecords.splice(-1 - pos, 0, langSysRecord);
            return langSysRecord.langSys;
          }
        }
      }, "getLangSysTable"),
      /**
       * Get a specific feature table.
       * @instance
       * @param {string} [script='DFLT']
       * @param {string} [language='dlft']
       * @param {string} feature - One of the codes listed at https://www.microsoft.com/typography/OTSPEC/featurelist.htm
       * @param {boolean} create - forces the creation of the feature table if it doesn't exist.
       * @return {Object}
       */
      getFeatureTable: /* @__PURE__ */ __name2(function(script, language, feature, create) {
        var langSysTable2 = this.getLangSysTable(script, language, create);
        if (langSysTable2) {
          var featureRecord;
          var featIndexes = langSysTable2.featureIndexes;
          var allFeatures = this.font.tables[this.tableName].features;
          for (var i2 = 0; i2 < featIndexes.length; i2++) {
            featureRecord = allFeatures[featIndexes[i2]];
            if (featureRecord.tag === feature) {
              return featureRecord.feature;
            }
          }
          if (create) {
            var index = allFeatures.length;
            check.assert(
              index === 0 || feature >= allFeatures[index - 1].tag,
              "Features must be added in alphabetical order."
            );
            featureRecord = {
              tag: feature,
              feature: { params: 0, lookupListIndexes: [] }
            };
            allFeatures.push(featureRecord);
            featIndexes.push(index);
            return featureRecord.feature;
          }
        }
      }, "getFeatureTable"),
      /**
       * Get the lookup tables of a given type for a script/language/feature.
       * @instance
       * @param {string} [script='DFLT']
       * @param {string} [language='dlft']
       * @param {string} feature - 4-letter feature code
       * @param {number} lookupType - 1 to 9
       * @param {boolean} create - forces the creation of the lookup table if it doesn't exist, with no subtables.
       * @return {Object[]}
       */
      getLookupTables: /* @__PURE__ */ __name2(function(script, language, feature, lookupType, create) {
        var featureTable = this.getFeatureTable(
          script,
          language,
          feature,
          create
        );
        var tables = [];
        if (featureTable) {
          var lookupTable;
          var lookupListIndexes = featureTable.lookupListIndexes;
          var allLookups = this.font.tables[this.tableName].lookups;
          for (var i2 = 0; i2 < lookupListIndexes.length; i2++) {
            lookupTable = allLookups[lookupListIndexes[i2]];
            if (lookupTable.lookupType === lookupType) {
              tables.push(lookupTable);
            }
          }
          if (tables.length === 0 && create) {
            lookupTable = {
              lookupType,
              lookupFlag: 0,
              subtables: [],
              markFilteringSet: void 0
            };
            var index = allLookups.length;
            allLookups.push(lookupTable);
            lookupListIndexes.push(index);
            return [lookupTable];
          }
        }
        return tables;
      }, "getLookupTables"),
      /**
       * Find a glyph in a class definition table
       * https://docs.microsoft.com/en-us/typography/opentype/spec/chapter2#class-definition-table
       * @param {object} classDefTable - an OpenType Layout class definition table
       * @param {number} glyphIndex - the index of the glyph to find
       * @returns {number} -1 if not found
       */
      getGlyphClass: /* @__PURE__ */ __name2(function(classDefTable, glyphIndex) {
        switch (classDefTable.format) {
          case 1:
            if (classDefTable.startGlyph <= glyphIndex && glyphIndex < classDefTable.startGlyph + classDefTable.classes.length) {
              return classDefTable.classes[glyphIndex - classDefTable.startGlyph];
            }
            return 0;
          case 2:
            var range = searchRange(classDefTable.ranges, glyphIndex);
            return range ? range.classId : 0;
        }
      }, "getGlyphClass"),
      /**
       * Find a glyph in a coverage table
       * https://docs.microsoft.com/en-us/typography/opentype/spec/chapter2#coverage-table
       * @param {object} coverageTable - an OpenType Layout coverage table
       * @param {number} glyphIndex - the index of the glyph to find
       * @returns {number} -1 if not found
       */
      getCoverageIndex: /* @__PURE__ */ __name2(function(coverageTable, glyphIndex) {
        switch (coverageTable.format) {
          case 1:
            var index = binSearch(coverageTable.glyphs, glyphIndex);
            return index >= 0 ? index : -1;
          case 2:
            var range = searchRange(coverageTable.ranges, glyphIndex);
            return range ? range.index + glyphIndex - range.start : -1;
        }
      }, "getCoverageIndex"),
      /**
       * Returns the list of glyph indexes of a coverage table.
       * Format 1: the list is stored raw
       * Format 2: compact list as range records.
       * @instance
       * @param  {Object} coverageTable
       * @return {Array}
       */
      expandCoverage: /* @__PURE__ */ __name2(function(coverageTable) {
        if (coverageTable.format === 1) {
          return coverageTable.glyphs;
        } else {
          var glyphs = [];
          var ranges = coverageTable.ranges;
          for (var i2 = 0; i2 < ranges.length; i2++) {
            var range = ranges[i2];
            var start = range.start;
            var end = range.end;
            for (var j = start; j <= end; j++) {
              glyphs.push(j);
            }
          }
          return glyphs;
        }
      }, "expandCoverage")
    };
    __name2(Position, "Position");
    Position.prototype = Layout.prototype;
    Position.prototype.init = function() {
      var script = this.getDefaultScriptName();
      this.defaultKerningTables = this.getKerningTables(script);
    };
    Position.prototype.getKerningValue = function(kerningLookups, leftIndex, rightIndex) {
      for (var i2 = 0; i2 < kerningLookups.length; i2++) {
        var subtables = kerningLookups[i2].subtables;
        for (var j = 0; j < subtables.length; j++) {
          var subtable = subtables[j];
          var covIndex = this.getCoverageIndex(subtable.coverage, leftIndex);
          if (covIndex < 0) {
            continue;
          }
          switch (subtable.posFormat) {
            case 1:
              var pairSet = subtable.pairSets[covIndex];
              for (var k = 0; k < pairSet.length; k++) {
                var pair = pairSet[k];
                if (pair.secondGlyph === rightIndex) {
                  return pair.value1 && pair.value1.xAdvance || 0;
                }
              }
              break;
            // left glyph found, not right glyph - try next subtable
            case 2:
              var class1 = this.getGlyphClass(subtable.classDef1, leftIndex);
              var class2 = this.getGlyphClass(subtable.classDef2, rightIndex);
              var pair$1 = subtable.classRecords[class1][class2];
              return pair$1.value1 && pair$1.value1.xAdvance || 0;
          }
        }
      }
      return 0;
    };
    Position.prototype.getKerningTables = function(script, language) {
      if (this.font.tables.gpos) {
        return this.getLookupTables(script, language, "kern", 2);
      }
    };
    __name2(Substitution, "Substitution");
    __name2(arraysEqual, "arraysEqual");
    __name2(getSubstFormat, "getSubstFormat");
    Substitution.prototype = Layout.prototype;
    Substitution.prototype.createDefaultTable = function() {
      return {
        version: 1,
        scripts: [
          {
            tag: "DFLT",
            script: {
              defaultLangSys: {
                reserved: 0,
                reqFeatureIndex: 65535,
                featureIndexes: []
              },
              langSysRecords: []
            }
          }
        ],
        features: [],
        lookups: []
      };
    };
    Substitution.prototype.getSingle = function(feature, script, language) {
      var substitutions = [];
      var lookupTables = this.getLookupTables(script, language, feature, 1);
      for (var idx = 0; idx < lookupTables.length; idx++) {
        var subtables = lookupTables[idx].subtables;
        for (var i2 = 0; i2 < subtables.length; i2++) {
          var subtable = subtables[i2];
          var glyphs = this.expandCoverage(subtable.coverage);
          var j = void 0;
          if (subtable.substFormat === 1) {
            var delta = subtable.deltaGlyphId;
            for (j = 0; j < glyphs.length; j++) {
              var glyph = glyphs[j];
              substitutions.push({ sub: glyph, by: glyph + delta });
            }
          } else {
            var substitute = subtable.substitute;
            for (j = 0; j < glyphs.length; j++) {
              substitutions.push({ sub: glyphs[j], by: substitute[j] });
            }
          }
        }
      }
      return substitutions;
    };
    Substitution.prototype.getMultiple = function(feature, script, language) {
      var substitutions = [];
      var lookupTables = this.getLookupTables(script, language, feature, 2);
      for (var idx = 0; idx < lookupTables.length; idx++) {
        var subtables = lookupTables[idx].subtables;
        for (var i2 = 0; i2 < subtables.length; i2++) {
          var subtable = subtables[i2];
          var glyphs = this.expandCoverage(subtable.coverage);
          var j = void 0;
          for (j = 0; j < glyphs.length; j++) {
            var glyph = glyphs[j];
            var replacements = subtable.sequences[j];
            substitutions.push({ sub: glyph, by: replacements });
          }
        }
      }
      return substitutions;
    };
    Substitution.prototype.getAlternates = function(feature, script, language) {
      var alternates = [];
      var lookupTables = this.getLookupTables(script, language, feature, 3);
      for (var idx = 0; idx < lookupTables.length; idx++) {
        var subtables = lookupTables[idx].subtables;
        for (var i2 = 0; i2 < subtables.length; i2++) {
          var subtable = subtables[i2];
          var glyphs = this.expandCoverage(subtable.coverage);
          var alternateSets = subtable.alternateSets;
          for (var j = 0; j < glyphs.length; j++) {
            alternates.push({ sub: glyphs[j], by: alternateSets[j] });
          }
        }
      }
      return alternates;
    };
    Substitution.prototype.getLigatures = function(feature, script, language) {
      var ligatures = [];
      var lookupTables = this.getLookupTables(script, language, feature, 4);
      for (var idx = 0; idx < lookupTables.length; idx++) {
        var subtables = lookupTables[idx].subtables;
        for (var i2 = 0; i2 < subtables.length; i2++) {
          var subtable = subtables[i2];
          var glyphs = this.expandCoverage(subtable.coverage);
          var ligatureSets = subtable.ligatureSets;
          for (var j = 0; j < glyphs.length; j++) {
            var startGlyph = glyphs[j];
            var ligSet = ligatureSets[j];
            for (var k = 0; k < ligSet.length; k++) {
              var lig = ligSet[k];
              ligatures.push({
                sub: [startGlyph].concat(lig.components),
                by: lig.ligGlyph
              });
            }
          }
        }
      }
      return ligatures;
    };
    Substitution.prototype.addSingle = function(feature, substitution, script, language) {
      var lookupTable = this.getLookupTables(
        script,
        language,
        feature,
        1,
        true
      )[0];
      var subtable = getSubstFormat(lookupTable, 2, {
        // lookup type 1 subtable, format 2, coverage format 1
        substFormat: 2,
        coverage: { format: 1, glyphs: [] },
        substitute: []
      });
      check.assert(
        subtable.coverage.format === 1,
        "Single: unable to modify coverage table format " + subtable.coverage.format
      );
      var coverageGlyph = substitution.sub;
      var pos = this.binSearch(subtable.coverage.glyphs, coverageGlyph);
      if (pos < 0) {
        pos = -1 - pos;
        subtable.coverage.glyphs.splice(pos, 0, coverageGlyph);
        subtable.substitute.splice(pos, 0, 0);
      }
      subtable.substitute[pos] = substitution.by;
    };
    Substitution.prototype.addMultiple = function(feature, substitution, script, language) {
      check.assert(
        substitution.by instanceof Array && substitution.by.length > 1,
        'Multiple: "by" must be an array of two or more ids'
      );
      var lookupTable = this.getLookupTables(
        script,
        language,
        feature,
        2,
        true
      )[0];
      var subtable = getSubstFormat(lookupTable, 1, {
        // lookup type 2 subtable, format 1, coverage format 1
        substFormat: 1,
        coverage: { format: 1, glyphs: [] },
        sequences: []
      });
      check.assert(
        subtable.coverage.format === 1,
        "Multiple: unable to modify coverage table format " + subtable.coverage.format
      );
      var coverageGlyph = substitution.sub;
      var pos = this.binSearch(subtable.coverage.glyphs, coverageGlyph);
      if (pos < 0) {
        pos = -1 - pos;
        subtable.coverage.glyphs.splice(pos, 0, coverageGlyph);
        subtable.sequences.splice(pos, 0, 0);
      }
      subtable.sequences[pos] = substitution.by;
    };
    Substitution.prototype.addAlternate = function(feature, substitution, script, language) {
      var lookupTable = this.getLookupTables(
        script,
        language,
        feature,
        3,
        true
      )[0];
      var subtable = getSubstFormat(lookupTable, 1, {
        // lookup type 3 subtable, format 1, coverage format 1
        substFormat: 1,
        coverage: { format: 1, glyphs: [] },
        alternateSets: []
      });
      check.assert(
        subtable.coverage.format === 1,
        "Alternate: unable to modify coverage table format " + subtable.coverage.format
      );
      var coverageGlyph = substitution.sub;
      var pos = this.binSearch(subtable.coverage.glyphs, coverageGlyph);
      if (pos < 0) {
        pos = -1 - pos;
        subtable.coverage.glyphs.splice(pos, 0, coverageGlyph);
        subtable.alternateSets.splice(pos, 0, 0);
      }
      subtable.alternateSets[pos] = substitution.by;
    };
    Substitution.prototype.addLigature = function(feature, ligature, script, language) {
      var lookupTable = this.getLookupTables(
        script,
        language,
        feature,
        4,
        true
      )[0];
      var subtable = lookupTable.subtables[0];
      if (!subtable) {
        subtable = {
          // lookup type 4 subtable, format 1, coverage format 1
          substFormat: 1,
          coverage: { format: 1, glyphs: [] },
          ligatureSets: []
        };
        lookupTable.subtables[0] = subtable;
      }
      check.assert(
        subtable.coverage.format === 1,
        "Ligature: unable to modify coverage table format " + subtable.coverage.format
      );
      var coverageGlyph = ligature.sub[0];
      var ligComponents = ligature.sub.slice(1);
      var ligatureTable = {
        ligGlyph: ligature.by,
        components: ligComponents
      };
      var pos = this.binSearch(subtable.coverage.glyphs, coverageGlyph);
      if (pos >= 0) {
        var ligatureSet = subtable.ligatureSets[pos];
        for (var i2 = 0; i2 < ligatureSet.length; i2++) {
          if (arraysEqual(ligatureSet[i2].components, ligComponents)) {
            return;
          }
        }
        ligatureSet.push(ligatureTable);
      } else {
        pos = -1 - pos;
        subtable.coverage.glyphs.splice(pos, 0, coverageGlyph);
        subtable.ligatureSets.splice(pos, 0, [ligatureTable]);
      }
    };
    Substitution.prototype.getFeature = function(feature, script, language) {
      if (/ss\d\d/.test(feature)) {
        return this.getSingle(feature, script, language);
      }
      switch (feature) {
        case "aalt":
        case "salt":
          return this.getSingle(feature, script, language).concat(
            this.getAlternates(feature, script, language)
          );
        case "dlig":
        case "liga":
        case "rlig":
          return this.getLigatures(feature, script, language);
        case "ccmp":
          return this.getMultiple(feature, script, language).concat(
            this.getLigatures(feature, script, language)
          );
        case "stch":
          return this.getMultiple(feature, script, language);
      }
      return void 0;
    };
    Substitution.prototype.add = function(feature, sub, script, language) {
      if (/ss\d\d/.test(feature)) {
        return this.addSingle(feature, sub, script, language);
      }
      switch (feature) {
        case "aalt":
        case "salt":
          if (typeof sub.by === "number") {
            return this.addSingle(feature, sub, script, language);
          }
          return this.addAlternate(feature, sub, script, language);
        case "dlig":
        case "liga":
        case "rlig":
          return this.addLigature(feature, sub, script, language);
        case "ccmp":
          if (sub.by instanceof Array) {
            return this.addMultiple(feature, sub, script, language);
          }
          return this.addLigature(feature, sub, script, language);
      }
      return void 0;
    };
    __name2(checkArgument, "checkArgument");
    __name2(getByte, "getByte");
    __name2(getUShort, "getUShort");
    __name2(getShort, "getShort");
    __name2(getULong, "getULong");
    __name2(getFixed, "getFixed");
    __name2(getTag, "getTag");
    __name2(getOffset, "getOffset");
    __name2(getBytes, "getBytes");
    __name2(bytesToString, "bytesToString");
    typeOffsets = {
      byte: 1,
      uShort: 2,
      short: 2,
      uLong: 4,
      fixed: 4,
      longDateTime: 8,
      tag: 4
    };
    __name2(Parser, "Parser");
    Parser.prototype.parseByte = function() {
      var v2 = this.data.getUint8(this.offset + this.relativeOffset);
      this.relativeOffset += 1;
      return v2;
    };
    Parser.prototype.parseChar = function() {
      var v2 = this.data.getInt8(this.offset + this.relativeOffset);
      this.relativeOffset += 1;
      return v2;
    };
    Parser.prototype.parseCard8 = Parser.prototype.parseByte;
    Parser.prototype.parseUShort = function() {
      var v2 = this.data.getUint16(this.offset + this.relativeOffset);
      this.relativeOffset += 2;
      return v2;
    };
    Parser.prototype.parseCard16 = Parser.prototype.parseUShort;
    Parser.prototype.parseSID = Parser.prototype.parseUShort;
    Parser.prototype.parseOffset16 = Parser.prototype.parseUShort;
    Parser.prototype.parseShort = function() {
      var v2 = this.data.getInt16(this.offset + this.relativeOffset);
      this.relativeOffset += 2;
      return v2;
    };
    Parser.prototype.parseF2Dot14 = function() {
      var v2 = this.data.getInt16(this.offset + this.relativeOffset) / 16384;
      this.relativeOffset += 2;
      return v2;
    };
    Parser.prototype.parseULong = function() {
      var v2 = getULong(this.data, this.offset + this.relativeOffset);
      this.relativeOffset += 4;
      return v2;
    };
    Parser.prototype.parseOffset32 = Parser.prototype.parseULong;
    Parser.prototype.parseFixed = function() {
      var v2 = getFixed(this.data, this.offset + this.relativeOffset);
      this.relativeOffset += 4;
      return v2;
    };
    Parser.prototype.parseString = function(length) {
      var dataView = this.data;
      var offset = this.offset + this.relativeOffset;
      var string = "";
      this.relativeOffset += length;
      for (var i2 = 0; i2 < length; i2++) {
        string += String.fromCharCode(dataView.getUint8(offset + i2));
      }
      return string;
    };
    Parser.prototype.parseTag = function() {
      return this.parseString(4);
    };
    Parser.prototype.parseLongDateTime = function() {
      var v2 = getULong(this.data, this.offset + this.relativeOffset + 4);
      v2 -= 2082844800;
      this.relativeOffset += 8;
      return v2;
    };
    Parser.prototype.parseVersion = function(minorBase) {
      var major = getUShort(this.data, this.offset + this.relativeOffset);
      var minor = getUShort(this.data, this.offset + this.relativeOffset + 2);
      this.relativeOffset += 4;
      if (minorBase === void 0) {
        minorBase = 4096;
      }
      return major + minor / minorBase / 10;
    };
    Parser.prototype.skip = function(type, amount) {
      if (amount === void 0) {
        amount = 1;
      }
      this.relativeOffset += typeOffsets[type] * amount;
    };
    Parser.prototype.parseULongList = function(count32) {
      if (count32 === void 0) {
        count32 = this.parseULong();
      }
      var offsets = new Array(count32);
      var dataView = this.data;
      var offset = this.offset + this.relativeOffset;
      for (var i2 = 0; i2 < count32; i2++) {
        offsets[i2] = dataView.getUint32(offset);
        offset += 4;
      }
      this.relativeOffset += count32 * 4;
      return offsets;
    };
    Parser.prototype.parseOffset16List = Parser.prototype.parseUShortList = function(count32) {
      if (count32 === void 0) {
        count32 = this.parseUShort();
      }
      var offsets = new Array(count32);
      var dataView = this.data;
      var offset = this.offset + this.relativeOffset;
      for (var i2 = 0; i2 < count32; i2++) {
        offsets[i2] = dataView.getUint16(offset);
        offset += 2;
      }
      this.relativeOffset += count32 * 2;
      return offsets;
    };
    Parser.prototype.parseShortList = function(count32) {
      var list = new Array(count32);
      var dataView = this.data;
      var offset = this.offset + this.relativeOffset;
      for (var i2 = 0; i2 < count32; i2++) {
        list[i2] = dataView.getInt16(offset);
        offset += 2;
      }
      this.relativeOffset += count32 * 2;
      return list;
    };
    Parser.prototype.parseByteList = function(count32) {
      var list = new Array(count32);
      var dataView = this.data;
      var offset = this.offset + this.relativeOffset;
      for (var i2 = 0; i2 < count32; i2++) {
        list[i2] = dataView.getUint8(offset++);
      }
      this.relativeOffset += count32;
      return list;
    };
    Parser.prototype.parseList = function(count32, itemCallback) {
      if (!itemCallback) {
        itemCallback = count32;
        count32 = this.parseUShort();
      }
      var list = new Array(count32);
      for (var i2 = 0; i2 < count32; i2++) {
        list[i2] = itemCallback.call(this);
      }
      return list;
    };
    Parser.prototype.parseList32 = function(count32, itemCallback) {
      if (!itemCallback) {
        itemCallback = count32;
        count32 = this.parseULong();
      }
      var list = new Array(count32);
      for (var i2 = 0; i2 < count32; i2++) {
        list[i2] = itemCallback.call(this);
      }
      return list;
    };
    Parser.prototype.parseRecordList = function(count32, recordDescription) {
      if (!recordDescription) {
        recordDescription = count32;
        count32 = this.parseUShort();
      }
      var records = new Array(count32);
      var fields = Object.keys(recordDescription);
      for (var i2 = 0; i2 < count32; i2++) {
        var rec = {};
        for (var j = 0; j < fields.length; j++) {
          var fieldName = fields[j];
          var fieldType = recordDescription[fieldName];
          rec[fieldName] = fieldType.call(this);
        }
        records[i2] = rec;
      }
      return records;
    };
    Parser.prototype.parseRecordList32 = function(count32, recordDescription) {
      if (!recordDescription) {
        recordDescription = count32;
        count32 = this.parseULong();
      }
      var records = new Array(count32);
      var fields = Object.keys(recordDescription);
      for (var i2 = 0; i2 < count32; i2++) {
        var rec = {};
        for (var j = 0; j < fields.length; j++) {
          var fieldName = fields[j];
          var fieldType = recordDescription[fieldName];
          rec[fieldName] = fieldType.call(this);
        }
        records[i2] = rec;
      }
      return records;
    };
    Parser.prototype.parseStruct = function(description) {
      if (typeof description === "function") {
        return description.call(this);
      } else {
        var fields = Object.keys(description);
        var struct = {};
        for (var j = 0; j < fields.length; j++) {
          var fieldName = fields[j];
          var fieldType = description[fieldName];
          struct[fieldName] = fieldType.call(this);
        }
        return struct;
      }
    };
    Parser.prototype.parseValueRecord = function(valueFormat) {
      if (valueFormat === void 0) {
        valueFormat = this.parseUShort();
      }
      if (valueFormat === 0) {
        return;
      }
      var valueRecord = {};
      if (valueFormat & 1) {
        valueRecord.xPlacement = this.parseShort();
      }
      if (valueFormat & 2) {
        valueRecord.yPlacement = this.parseShort();
      }
      if (valueFormat & 4) {
        valueRecord.xAdvance = this.parseShort();
      }
      if (valueFormat & 8) {
        valueRecord.yAdvance = this.parseShort();
      }
      if (valueFormat & 16) {
        valueRecord.xPlaDevice = void 0;
        this.parseShort();
      }
      if (valueFormat & 32) {
        valueRecord.yPlaDevice = void 0;
        this.parseShort();
      }
      if (valueFormat & 64) {
        valueRecord.xAdvDevice = void 0;
        this.parseShort();
      }
      if (valueFormat & 128) {
        valueRecord.yAdvDevice = void 0;
        this.parseShort();
      }
      return valueRecord;
    };
    Parser.prototype.parseValueRecordList = function() {
      var valueFormat = this.parseUShort();
      var valueCount = this.parseUShort();
      var values = new Array(valueCount);
      for (var i2 = 0; i2 < valueCount; i2++) {
        values[i2] = this.parseValueRecord(valueFormat);
      }
      return values;
    };
    Parser.prototype.parsePointer = function(description) {
      var structOffset = this.parseOffset16();
      if (structOffset > 0) {
        return new Parser(this.data, this.offset + structOffset).parseStruct(description);
      }
      return void 0;
    };
    Parser.prototype.parsePointer32 = function(description) {
      var structOffset = this.parseOffset32();
      if (structOffset > 0) {
        return new Parser(this.data, this.offset + structOffset).parseStruct(description);
      }
      return void 0;
    };
    Parser.prototype.parseListOfLists = function(itemCallback) {
      var offsets = this.parseOffset16List();
      var count32 = offsets.length;
      var relativeOffset = this.relativeOffset;
      var list = new Array(count32);
      for (var i2 = 0; i2 < count32; i2++) {
        var start = offsets[i2];
        if (start === 0) {
          list[i2] = void 0;
          continue;
        }
        this.relativeOffset = start;
        if (itemCallback) {
          var subOffsets = this.parseOffset16List();
          var subList = new Array(subOffsets.length);
          for (var j = 0; j < subOffsets.length; j++) {
            this.relativeOffset = start + subOffsets[j];
            subList[j] = itemCallback.call(this);
          }
          list[i2] = subList;
        } else {
          list[i2] = this.parseUShortList();
        }
      }
      this.relativeOffset = relativeOffset;
      return list;
    };
    Parser.prototype.parseCoverage = function() {
      var startOffset = this.offset + this.relativeOffset;
      var format = this.parseUShort();
      var count32 = this.parseUShort();
      if (format === 1) {
        return {
          format: 1,
          glyphs: this.parseUShortList(count32)
        };
      } else if (format === 2) {
        var ranges = new Array(count32);
        for (var i2 = 0; i2 < count32; i2++) {
          ranges[i2] = {
            start: this.parseUShort(),
            end: this.parseUShort(),
            index: this.parseUShort()
          };
        }
        return {
          format: 2,
          ranges
        };
      }
      throw new Error("0x" + startOffset.toString(16) + ": Coverage format must be 1 or 2.");
    };
    Parser.prototype.parseClassDef = function() {
      var startOffset = this.offset + this.relativeOffset;
      var format = this.parseUShort();
      if (format === 1) {
        return {
          format: 1,
          startGlyph: this.parseUShort(),
          classes: this.parseUShortList()
        };
      } else if (format === 2) {
        return {
          format: 2,
          ranges: this.parseRecordList({
            start: Parser.uShort,
            end: Parser.uShort,
            classId: Parser.uShort
          })
        };
      }
      throw new Error("0x" + startOffset.toString(16) + ": ClassDef format must be 1 or 2.");
    };
    Parser.list = function(count32, itemCallback) {
      return function() {
        return this.parseList(count32, itemCallback);
      };
    };
    Parser.list32 = function(count32, itemCallback) {
      return function() {
        return this.parseList32(count32, itemCallback);
      };
    };
    Parser.recordList = function(count32, recordDescription) {
      return function() {
        return this.parseRecordList(count32, recordDescription);
      };
    };
    Parser.recordList32 = function(count32, recordDescription) {
      return function() {
        return this.parseRecordList32(count32, recordDescription);
      };
    };
    Parser.pointer = function(description) {
      return function() {
        return this.parsePointer(description);
      };
    };
    Parser.pointer32 = function(description) {
      return function() {
        return this.parsePointer32(description);
      };
    };
    Parser.tag = Parser.prototype.parseTag;
    Parser.byte = Parser.prototype.parseByte;
    Parser.uShort = Parser.offset16 = Parser.prototype.parseUShort;
    Parser.uShortList = Parser.prototype.parseUShortList;
    Parser.uLong = Parser.offset32 = Parser.prototype.parseULong;
    Parser.uLongList = Parser.prototype.parseULongList;
    Parser.struct = Parser.prototype.parseStruct;
    Parser.coverage = Parser.prototype.parseCoverage;
    Parser.classDef = Parser.prototype.parseClassDef;
    langSysTable = {
      reserved: Parser.uShort,
      reqFeatureIndex: Parser.uShort,
      featureIndexes: Parser.uShortList
    };
    Parser.prototype.parseScriptList = function() {
      return this.parsePointer(Parser.recordList({
        tag: Parser.tag,
        script: Parser.pointer({
          defaultLangSys: Parser.pointer(langSysTable),
          langSysRecords: Parser.recordList({
            tag: Parser.tag,
            langSys: Parser.pointer(langSysTable)
          })
        })
      })) || [];
    };
    Parser.prototype.parseFeatureList = function() {
      return this.parsePointer(Parser.recordList({
        tag: Parser.tag,
        feature: Parser.pointer({
          featureParams: Parser.offset16,
          lookupListIndexes: Parser.uShortList
        })
      })) || [];
    };
    Parser.prototype.parseLookupList = function(lookupTableParsers) {
      return this.parsePointer(Parser.list(Parser.pointer(function() {
        var lookupType = this.parseUShort();
        check.argument(1 <= lookupType && lookupType <= 9, "GPOS/GSUB lookup type " + lookupType + " unknown.");
        var lookupFlag = this.parseUShort();
        var useMarkFilteringSet = lookupFlag & 16;
        return {
          lookupType,
          lookupFlag,
          subtables: this.parseList(Parser.pointer(lookupTableParsers[lookupType])),
          markFilteringSet: useMarkFilteringSet ? this.parseUShort() : void 0
        };
      }))) || [];
    };
    Parser.prototype.parseFeatureVariationsList = function() {
      return this.parsePointer32(function() {
        var majorVersion = this.parseUShort();
        var minorVersion = this.parseUShort();
        check.argument(majorVersion === 1 && minorVersion < 1, "GPOS/GSUB feature variations table unknown.");
        var featureVariations = this.parseRecordList32({
          conditionSetOffset: Parser.offset32,
          featureTableSubstitutionOffset: Parser.offset32
        });
        return featureVariations;
      }) || [];
    };
    parse = {
      getByte,
      getCard8: getByte,
      getUShort,
      getCard16: getUShort,
      getShort,
      getULong,
      getFixed,
      getTag,
      getOffset,
      getBytes,
      bytesToString,
      Parser
    };
    __name2(parseGlyphCoordinate, "parseGlyphCoordinate");
    __name2(parseGlyph, "parseGlyph");
    __name2(transformPoints, "transformPoints");
    __name2(getContours, "getContours");
    __name2(getPath, "getPath");
    __name2(buildPath, "buildPath");
    __name2(parseGlyfTableAll, "parseGlyfTableAll");
    __name2(parseGlyfTableOnLowMemory, "parseGlyfTableOnLowMemory");
    __name2(parseGlyfTable, "parseGlyfTable");
    glyf = { getPath, parse: parseGlyfTable };
    __name2(Hinting, "Hinting");
    __name2(roundOff, "roundOff");
    __name2(roundToGrid, "roundToGrid");
    __name2(roundToDoubleGrid, "roundToDoubleGrid");
    __name2(roundToHalfGrid, "roundToHalfGrid");
    __name2(roundUpToGrid, "roundUpToGrid");
    __name2(roundDownToGrid, "roundDownToGrid");
    roundSuper = /* @__PURE__ */ __name2(function(v2) {
      var period = this.srPeriod;
      var phase = this.srPhase;
      var threshold = this.srThreshold;
      var sign = 1;
      if (v2 < 0) {
        v2 = -v2;
        sign = -1;
      }
      v2 += threshold - phase;
      v2 = Math.trunc(v2 / period) * period;
      v2 += phase;
      if (v2 < 0) {
        return phase * sign;
      }
      return v2 * sign;
    }, "roundSuper");
    xUnitVector = {
      x: 1,
      y: 0,
      axis: "x",
      // Gets the projected distance between two points.
      // o1/o2 ... if true, respective original position is used.
      distance: /* @__PURE__ */ __name2(function(p1, p2, o1, o2) {
        return (o1 ? p1.xo : p1.x) - (o2 ? p2.xo : p2.x);
      }, "distance"),
      // Moves point p so the moved position has the same relative
      // position to the moved positions of rp1 and rp2 than the
      // original positions had.
      //
      // See APPENDIX on INTERPOLATE at the bottom of this file.
      interpolate: /* @__PURE__ */ __name2(function(p, rp1, rp2, pv) {
        var do1;
        var do2;
        var doa1;
        var doa2;
        var dm1;
        var dm2;
        var dt;
        if (!pv || pv === this) {
          do1 = p.xo - rp1.xo;
          do2 = p.xo - rp2.xo;
          dm1 = rp1.x - rp1.xo;
          dm2 = rp2.x - rp2.xo;
          doa1 = Math.abs(do1);
          doa2 = Math.abs(do2);
          dt = doa1 + doa2;
          if (dt === 0) {
            p.x = p.xo + (dm1 + dm2) / 2;
            return;
          }
          p.x = p.xo + (dm1 * doa2 + dm2 * doa1) / dt;
          return;
        }
        do1 = pv.distance(p, rp1, true, true);
        do2 = pv.distance(p, rp2, true, true);
        dm1 = pv.distance(rp1, rp1, false, true);
        dm2 = pv.distance(rp2, rp2, false, true);
        doa1 = Math.abs(do1);
        doa2 = Math.abs(do2);
        dt = doa1 + doa2;
        if (dt === 0) {
          xUnitVector.setRelative(p, p, (dm1 + dm2) / 2, pv, true);
          return;
        }
        xUnitVector.setRelative(p, p, (dm1 * doa2 + dm2 * doa1) / dt, pv, true);
      }, "interpolate"),
      // Slope of line normal to this
      normalSlope: Number.NEGATIVE_INFINITY,
      // Sets the point 'p' relative to point 'rp'
      // by the distance 'd'.
      //
      // See APPENDIX on SETRELATIVE at the bottom of this file.
      //
      // p   ... point to set
      // rp  ... reference point
      // d   ... distance on projection vector
      // pv  ... projection vector (undefined = this)
      // org ... if true, uses the original position of rp as reference.
      setRelative: /* @__PURE__ */ __name2(function(p, rp, d2, pv, org) {
        if (!pv || pv === this) {
          p.x = (org ? rp.xo : rp.x) + d2;
          return;
        }
        var rpx = org ? rp.xo : rp.x;
        var rpy = org ? rp.yo : rp.y;
        var rpdx = rpx + d2 * pv.x;
        var rpdy = rpy + d2 * pv.y;
        p.x = rpdx + (p.y - rpdy) / pv.normalSlope;
      }, "setRelative"),
      // Slope of vector line.
      slope: 0,
      // Touches the point p.
      touch: /* @__PURE__ */ __name2(function(p) {
        p.xTouched = true;
      }, "touch"),
      // Tests if a point p is touched.
      touched: /* @__PURE__ */ __name2(function(p) {
        return p.xTouched;
      }, "touched"),
      // Untouches the point p.
      untouch: /* @__PURE__ */ __name2(function(p) {
        p.xTouched = false;
      }, "untouch")
    };
    yUnitVector = {
      x: 0,
      y: 1,
      axis: "y",
      // Gets the projected distance between two points.
      // o1/o2 ... if true, respective original position is used.
      distance: /* @__PURE__ */ __name2(function(p1, p2, o1, o2) {
        return (o1 ? p1.yo : p1.y) - (o2 ? p2.yo : p2.y);
      }, "distance"),
      // Moves point p so the moved position has the same relative
      // position to the moved positions of rp1 and rp2 than the
      // original positions had.
      //
      // See APPENDIX on INTERPOLATE at the bottom of this file.
      interpolate: /* @__PURE__ */ __name2(function(p, rp1, rp2, pv) {
        var do1;
        var do2;
        var doa1;
        var doa2;
        var dm1;
        var dm2;
        var dt;
        if (!pv || pv === this) {
          do1 = p.yo - rp1.yo;
          do2 = p.yo - rp2.yo;
          dm1 = rp1.y - rp1.yo;
          dm2 = rp2.y - rp2.yo;
          doa1 = Math.abs(do1);
          doa2 = Math.abs(do2);
          dt = doa1 + doa2;
          if (dt === 0) {
            p.y = p.yo + (dm1 + dm2) / 2;
            return;
          }
          p.y = p.yo + (dm1 * doa2 + dm2 * doa1) / dt;
          return;
        }
        do1 = pv.distance(p, rp1, true, true);
        do2 = pv.distance(p, rp2, true, true);
        dm1 = pv.distance(rp1, rp1, false, true);
        dm2 = pv.distance(rp2, rp2, false, true);
        doa1 = Math.abs(do1);
        doa2 = Math.abs(do2);
        dt = doa1 + doa2;
        if (dt === 0) {
          yUnitVector.setRelative(p, p, (dm1 + dm2) / 2, pv, true);
          return;
        }
        yUnitVector.setRelative(p, p, (dm1 * doa2 + dm2 * doa1) / dt, pv, true);
      }, "interpolate"),
      // Slope of line normal to this.
      normalSlope: 0,
      // Sets the point 'p' relative to point 'rp'
      // by the distance 'd'
      //
      // See APPENDIX on SETRELATIVE at the bottom of this file.
      //
      // p   ... point to set
      // rp  ... reference point
      // d   ... distance on projection vector
      // pv  ... projection vector (undefined = this)
      // org ... if true, uses the original position of rp as reference.
      setRelative: /* @__PURE__ */ __name2(function(p, rp, d2, pv, org) {
        if (!pv || pv === this) {
          p.y = (org ? rp.yo : rp.y) + d2;
          return;
        }
        var rpx = org ? rp.xo : rp.x;
        var rpy = org ? rp.yo : rp.y;
        var rpdx = rpx + d2 * pv.x;
        var rpdy = rpy + d2 * pv.y;
        p.y = rpdy + pv.normalSlope * (p.x - rpdx);
      }, "setRelative"),
      // Slope of vector line.
      slope: Number.POSITIVE_INFINITY,
      // Touches the point p.
      touch: /* @__PURE__ */ __name2(function(p) {
        p.yTouched = true;
      }, "touch"),
      // Tests if a point p is touched.
      touched: /* @__PURE__ */ __name2(function(p) {
        return p.yTouched;
      }, "touched"),
      // Untouches the point p.
      untouch: /* @__PURE__ */ __name2(function(p) {
        p.yTouched = false;
      }, "untouch")
    };
    Object.freeze(xUnitVector);
    Object.freeze(yUnitVector);
    __name2(UnitVector, "UnitVector");
    UnitVector.prototype.distance = function(p1, p2, o1, o2) {
      return this.x * xUnitVector.distance(p1, p2, o1, o2) + this.y * yUnitVector.distance(p1, p2, o1, o2);
    };
    UnitVector.prototype.interpolate = function(p, rp1, rp2, pv) {
      var dm1;
      var dm2;
      var do1;
      var do2;
      var doa1;
      var doa2;
      var dt;
      do1 = pv.distance(p, rp1, true, true);
      do2 = pv.distance(p, rp2, true, true);
      dm1 = pv.distance(rp1, rp1, false, true);
      dm2 = pv.distance(rp2, rp2, false, true);
      doa1 = Math.abs(do1);
      doa2 = Math.abs(do2);
      dt = doa1 + doa2;
      if (dt === 0) {
        this.setRelative(p, p, (dm1 + dm2) / 2, pv, true);
        return;
      }
      this.setRelative(p, p, (dm1 * doa2 + dm2 * doa1) / dt, pv, true);
    };
    UnitVector.prototype.setRelative = function(p, rp, d2, pv, org) {
      pv = pv || this;
      var rpx = org ? rp.xo : rp.x;
      var rpy = org ? rp.yo : rp.y;
      var rpdx = rpx + d2 * pv.x;
      var rpdy = rpy + d2 * pv.y;
      var pvns = pv.normalSlope;
      var fvs = this.slope;
      var px = p.x;
      var py = p.y;
      p.x = (fvs * px - pvns * rpdx + rpdy - py) / (fvs - pvns);
      p.y = fvs * (p.x - px) + py;
    };
    UnitVector.prototype.touch = function(p) {
      p.xTouched = true;
      p.yTouched = true;
    };
    __name2(getUnitVector, "getUnitVector");
    __name2(HPoint, "HPoint");
    HPoint.prototype.nextTouched = function(v2) {
      var p = this.nextPointOnContour;
      while (!v2.touched(p) && p !== this) {
        p = p.nextPointOnContour;
      }
      return p;
    };
    HPoint.prototype.prevTouched = function(v2) {
      var p = this.prevPointOnContour;
      while (!v2.touched(p) && p !== this) {
        p = p.prevPointOnContour;
      }
      return p;
    };
    HPZero = Object.freeze(new HPoint(0, 0));
    defaultState = {
      cvCutIn: 17 / 16,
      // control value cut in
      deltaBase: 9,
      deltaShift: 0.125,
      loop: 1,
      // loops some instructions
      minDis: 1,
      // minimum distance
      autoFlip: true
    };
    __name2(State, "State");
    Hinting.prototype.exec = function(glyph, ppem) {
      if (typeof ppem !== "number") {
        throw new Error("Point size is not a number!");
      }
      if (this._errorState > 2) {
        return;
      }
      var font = this.font;
      var prepState = this._prepState;
      if (!prepState || prepState.ppem !== ppem) {
        var fpgmState = this._fpgmState;
        if (!fpgmState) {
          State.prototype = defaultState;
          fpgmState = this._fpgmState = new State("fpgm", font.tables.fpgm);
          fpgmState.funcs = [];
          fpgmState.font = font;
          if (exports.DEBUG) {
            console.log("---EXEC FPGM---");
            fpgmState.step = -1;
          }
          try {
            exec(fpgmState);
          } catch (e) {
            console.log("Hinting error in FPGM:" + e);
            this._errorState = 3;
            return;
          }
        }
        State.prototype = fpgmState;
        prepState = this._prepState = new State("prep", font.tables.prep);
        prepState.ppem = ppem;
        var oCvt = font.tables.cvt;
        if (oCvt) {
          var cvt = prepState.cvt = new Array(oCvt.length);
          var scale = ppem / font.unitsPerEm;
          for (var c2 = 0; c2 < oCvt.length; c2++) {
            cvt[c2] = oCvt[c2] * scale;
          }
        } else {
          prepState.cvt = [];
        }
        if (exports.DEBUG) {
          console.log("---EXEC PREP---");
          prepState.step = -1;
        }
        try {
          exec(prepState);
        } catch (e) {
          if (this._errorState < 2) {
            console.log("Hinting error in PREP:" + e);
          }
          this._errorState = 2;
        }
      }
      if (this._errorState > 1) {
        return;
      }
      try {
        return execGlyph(glyph, prepState);
      } catch (e) {
        if (this._errorState < 1) {
          console.log("Hinting error:" + e);
          console.log("Note: further hinting errors are silenced");
        }
        this._errorState = 1;
        return void 0;
      }
    };
    execGlyph = /* @__PURE__ */ __name2(function(glyph, prepState) {
      var xScale = prepState.ppem / prepState.font.unitsPerEm;
      var yScale = xScale;
      var components = glyph.components;
      var contours;
      var gZone;
      var state;
      State.prototype = prepState;
      if (!components) {
        state = new State("glyf", glyph.instructions);
        if (exports.DEBUG) {
          console.log("---EXEC GLYPH---");
          state.step = -1;
        }
        execComponent(glyph, state, xScale, yScale);
        gZone = state.gZone;
      } else {
        var font = prepState.font;
        gZone = [];
        contours = [];
        for (var i2 = 0; i2 < components.length; i2++) {
          var c2 = components[i2];
          var cg = font.glyphs.get(c2.glyphIndex);
          state = new State("glyf", cg.instructions);
          if (exports.DEBUG) {
            console.log("---EXEC COMP " + i2 + "---");
            state.step = -1;
          }
          execComponent(cg, state, xScale, yScale);
          var dx = Math.round(c2.dx * xScale);
          var dy = Math.round(c2.dy * yScale);
          var gz = state.gZone;
          var cc2 = state.contours;
          for (var pi = 0; pi < gz.length; pi++) {
            var p = gz[pi];
            p.xTouched = p.yTouched = false;
            p.xo = p.x = p.x + dx;
            p.yo = p.y = p.y + dy;
          }
          var gLen = gZone.length;
          gZone.push.apply(gZone, gz);
          for (var j = 0; j < cc2.length; j++) {
            contours.push(cc2[j] + gLen);
          }
        }
        if (glyph.instructions && !state.inhibitGridFit) {
          state = new State("glyf", glyph.instructions);
          state.gZone = state.z0 = state.z1 = state.z2 = gZone;
          state.contours = contours;
          gZone.push(
            new HPoint(0, 0),
            new HPoint(Math.round(glyph.advanceWidth * xScale), 0)
          );
          if (exports.DEBUG) {
            console.log("---EXEC COMPOSITE---");
            state.step = -1;
          }
          exec(state);
          gZone.length -= 2;
        }
      }
      return gZone;
    }, "execGlyph");
    execComponent = /* @__PURE__ */ __name2(function(glyph, state, xScale, yScale) {
      var points = glyph.points || [];
      var pLen = points.length;
      var gZone = state.gZone = state.z0 = state.z1 = state.z2 = [];
      var contours = state.contours = [];
      var cp;
      for (var i2 = 0; i2 < pLen; i2++) {
        cp = points[i2];
        gZone[i2] = new HPoint(
          cp.x * xScale,
          cp.y * yScale,
          cp.lastPointOfContour,
          cp.onCurve
        );
      }
      var sp;
      var np;
      for (var i$1 = 0; i$1 < pLen; i$1++) {
        cp = gZone[i$1];
        if (!sp) {
          sp = cp;
          contours.push(i$1);
        }
        if (cp.lastPointOfContour) {
          cp.nextPointOnContour = sp;
          sp.prevPointOnContour = cp;
          sp = void 0;
        } else {
          np = gZone[i$1 + 1];
          cp.nextPointOnContour = np;
          np.prevPointOnContour = cp;
        }
      }
      if (state.inhibitGridFit) {
        return;
      }
      if (exports.DEBUG) {
        console.log("PROCESSING GLYPH", state.stack);
        for (var i$2 = 0; i$2 < pLen; i$2++) {
          console.log(i$2, gZone[i$2].x, gZone[i$2].y);
        }
      }
      gZone.push(
        new HPoint(0, 0),
        new HPoint(Math.round(glyph.advanceWidth * xScale), 0)
      );
      exec(state);
      gZone.length -= 2;
      if (exports.DEBUG) {
        console.log("FINISHED GLYPH", state.stack);
        for (var i$3 = 0; i$3 < pLen; i$3++) {
          console.log(i$3, gZone[i$3].x, gZone[i$3].y);
        }
      }
    }, "execComponent");
    exec = /* @__PURE__ */ __name2(function(state) {
      var prog = state.prog;
      if (!prog) {
        return;
      }
      var pLen = prog.length;
      var ins;
      for (state.ip = 0; state.ip < pLen; state.ip++) {
        if (exports.DEBUG) {
          state.step++;
        }
        ins = instructionTable[prog[state.ip]];
        if (!ins) {
          throw new Error(
            "unknown instruction: 0x" + Number(prog[state.ip]).toString(16)
          );
        }
        ins(state);
      }
    }, "exec");
    __name2(initTZone, "initTZone");
    __name2(skip, "skip");
    __name2(SVTCA, "SVTCA");
    __name2(SPVTCA, "SPVTCA");
    __name2(SFVTCA, "SFVTCA");
    __name2(SPVTL, "SPVTL");
    __name2(SFVTL, "SFVTL");
    __name2(SPVFS, "SPVFS");
    __name2(SFVFS, "SFVFS");
    __name2(GPV, "GPV");
    __name2(GFV, "GFV");
    __name2(SFVTPV, "SFVTPV");
    __name2(ISECT, "ISECT");
    __name2(SRP0, "SRP0");
    __name2(SRP1, "SRP1");
    __name2(SRP2, "SRP2");
    __name2(SZP0, "SZP0");
    __name2(SZP1, "SZP1");
    __name2(SZP2, "SZP2");
    __name2(SZPS, "SZPS");
    __name2(SLOOP, "SLOOP");
    __name2(RTG, "RTG");
    __name2(RTHG, "RTHG");
    __name2(SMD, "SMD");
    __name2(ELSE, "ELSE");
    __name2(JMPR, "JMPR");
    __name2(SCVTCI, "SCVTCI");
    __name2(DUP, "DUP");
    __name2(POP, "POP");
    __name2(CLEAR, "CLEAR");
    __name2(SWAP, "SWAP");
    __name2(DEPTH, "DEPTH");
    __name2(LOOPCALL, "LOOPCALL");
    __name2(CALL, "CALL");
    __name2(CINDEX, "CINDEX");
    __name2(MINDEX, "MINDEX");
    __name2(FDEF, "FDEF");
    __name2(MDAP, "MDAP");
    __name2(IUP, "IUP");
    __name2(SHP, "SHP");
    __name2(SHC, "SHC");
    __name2(SHZ, "SHZ");
    __name2(SHPIX, "SHPIX");
    __name2(IP, "IP");
    __name2(MSIRP, "MSIRP");
    __name2(ALIGNRP, "ALIGNRP");
    __name2(RTDG, "RTDG");
    __name2(MIAP, "MIAP");
    __name2(NPUSHB, "NPUSHB");
    __name2(NPUSHW, "NPUSHW");
    __name2(WS, "WS");
    __name2(RS, "RS");
    __name2(WCVTP, "WCVTP");
    __name2(RCVT, "RCVT");
    __name2(GC, "GC");
    __name2(MD, "MD");
    __name2(MPPEM, "MPPEM");
    __name2(FLIPON, "FLIPON");
    __name2(LT, "LT");
    __name2(LTEQ, "LTEQ");
    __name2(GT, "GT");
    __name2(GTEQ, "GTEQ");
    __name2(EQ, "EQ");
    __name2(NEQ, "NEQ");
    __name2(ODD, "ODD");
    __name2(EVEN, "EVEN");
    __name2(IF, "IF");
    __name2(EIF, "EIF");
    __name2(AND, "AND");
    __name2(OR, "OR");
    __name2(NOT, "NOT");
    __name2(DELTAP123, "DELTAP123");
    __name2(SDB, "SDB");
    __name2(SDS, "SDS");
    __name2(ADD, "ADD");
    __name2(SUB, "SUB");
    __name2(DIV, "DIV");
    __name2(MUL, "MUL");
    __name2(ABS, "ABS");
    __name2(NEG, "NEG");
    __name2(FLOOR, "FLOOR");
    __name2(CEILING, "CEILING");
    __name2(ROUND, "ROUND");
    __name2(WCVTF, "WCVTF");
    __name2(DELTAC123, "DELTAC123");
    __name2(SROUND, "SROUND");
    __name2(S45ROUND, "S45ROUND");
    __name2(ROFF, "ROFF");
    __name2(RUTG, "RUTG");
    __name2(RDTG, "RDTG");
    __name2(SCANCTRL, "SCANCTRL");
    __name2(SDPVTL, "SDPVTL");
    __name2(GETINFO, "GETINFO");
    __name2(ROLL, "ROLL");
    __name2(MAX, "MAX");
    __name2(MIN, "MIN");
    __name2(SCANTYPE, "SCANTYPE");
    __name2(INSTCTRL, "INSTCTRL");
    __name2(PUSHB, "PUSHB");
    __name2(PUSHW, "PUSHW");
    __name2(MDRP_MIRP, "MDRP_MIRP");
    instructionTable = [
      /* 0x00 */
      SVTCA.bind(void 0, yUnitVector),
      /* 0x01 */
      SVTCA.bind(void 0, xUnitVector),
      /* 0x02 */
      SPVTCA.bind(void 0, yUnitVector),
      /* 0x03 */
      SPVTCA.bind(void 0, xUnitVector),
      /* 0x04 */
      SFVTCA.bind(void 0, yUnitVector),
      /* 0x05 */
      SFVTCA.bind(void 0, xUnitVector),
      /* 0x06 */
      SPVTL.bind(void 0, 0),
      /* 0x07 */
      SPVTL.bind(void 0, 1),
      /* 0x08 */
      SFVTL.bind(void 0, 0),
      /* 0x09 */
      SFVTL.bind(void 0, 1),
      /* 0x0A */
      SPVFS,
      /* 0x0B */
      SFVFS,
      /* 0x0C */
      GPV,
      /* 0x0D */
      GFV,
      /* 0x0E */
      SFVTPV,
      /* 0x0F */
      ISECT,
      /* 0x10 */
      SRP0,
      /* 0x11 */
      SRP1,
      /* 0x12 */
      SRP2,
      /* 0x13 */
      SZP0,
      /* 0x14 */
      SZP1,
      /* 0x15 */
      SZP2,
      /* 0x16 */
      SZPS,
      /* 0x17 */
      SLOOP,
      /* 0x18 */
      RTG,
      /* 0x19 */
      RTHG,
      /* 0x1A */
      SMD,
      /* 0x1B */
      ELSE,
      /* 0x1C */
      JMPR,
      /* 0x1D */
      SCVTCI,
      /* 0x1E */
      void 0,
      // TODO SSWCI
      /* 0x1F */
      void 0,
      // TODO SSW
      /* 0x20 */
      DUP,
      /* 0x21 */
      POP,
      /* 0x22 */
      CLEAR,
      /* 0x23 */
      SWAP,
      /* 0x24 */
      DEPTH,
      /* 0x25 */
      CINDEX,
      /* 0x26 */
      MINDEX,
      /* 0x27 */
      void 0,
      // TODO ALIGNPTS
      /* 0x28 */
      void 0,
      /* 0x29 */
      void 0,
      // TODO UTP
      /* 0x2A */
      LOOPCALL,
      /* 0x2B */
      CALL,
      /* 0x2C */
      FDEF,
      /* 0x2D */
      void 0,
      // ENDF (eaten by FDEF)
      /* 0x2E */
      MDAP.bind(void 0, 0),
      /* 0x2F */
      MDAP.bind(void 0, 1),
      /* 0x30 */
      IUP.bind(void 0, yUnitVector),
      /* 0x31 */
      IUP.bind(void 0, xUnitVector),
      /* 0x32 */
      SHP.bind(void 0, 0),
      /* 0x33 */
      SHP.bind(void 0, 1),
      /* 0x34 */
      SHC.bind(void 0, 0),
      /* 0x35 */
      SHC.bind(void 0, 1),
      /* 0x36 */
      SHZ.bind(void 0, 0),
      /* 0x37 */
      SHZ.bind(void 0, 1),
      /* 0x38 */
      SHPIX,
      /* 0x39 */
      IP,
      /* 0x3A */
      MSIRP.bind(void 0, 0),
      /* 0x3B */
      MSIRP.bind(void 0, 1),
      /* 0x3C */
      ALIGNRP,
      /* 0x3D */
      RTDG,
      /* 0x3E */
      MIAP.bind(void 0, 0),
      /* 0x3F */
      MIAP.bind(void 0, 1),
      /* 0x40 */
      NPUSHB,
      /* 0x41 */
      NPUSHW,
      /* 0x42 */
      WS,
      /* 0x43 */
      RS,
      /* 0x44 */
      WCVTP,
      /* 0x45 */
      RCVT,
      /* 0x46 */
      GC.bind(void 0, 0),
      /* 0x47 */
      GC.bind(void 0, 1),
      /* 0x48 */
      void 0,
      // TODO SCFS
      /* 0x49 */
      MD.bind(void 0, 0),
      /* 0x4A */
      MD.bind(void 0, 1),
      /* 0x4B */
      MPPEM,
      /* 0x4C */
      void 0,
      // TODO MPS
      /* 0x4D */
      FLIPON,
      /* 0x4E */
      void 0,
      // TODO FLIPOFF
      /* 0x4F */
      void 0,
      // TODO DEBUG
      /* 0x50 */
      LT,
      /* 0x51 */
      LTEQ,
      /* 0x52 */
      GT,
      /* 0x53 */
      GTEQ,
      /* 0x54 */
      EQ,
      /* 0x55 */
      NEQ,
      /* 0x56 */
      ODD,
      /* 0x57 */
      EVEN,
      /* 0x58 */
      IF,
      /* 0x59 */
      EIF,
      /* 0x5A */
      AND,
      /* 0x5B */
      OR,
      /* 0x5C */
      NOT,
      /* 0x5D */
      DELTAP123.bind(void 0, 1),
      /* 0x5E */
      SDB,
      /* 0x5F */
      SDS,
      /* 0x60 */
      ADD,
      /* 0x61 */
      SUB,
      /* 0x62 */
      DIV,
      /* 0x63 */
      MUL,
      /* 0x64 */
      ABS,
      /* 0x65 */
      NEG,
      /* 0x66 */
      FLOOR,
      /* 0x67 */
      CEILING,
      /* 0x68 */
      ROUND.bind(void 0, 0),
      /* 0x69 */
      ROUND.bind(void 0, 1),
      /* 0x6A */
      ROUND.bind(void 0, 2),
      /* 0x6B */
      ROUND.bind(void 0, 3),
      /* 0x6C */
      void 0,
      // TODO NROUND[ab]
      /* 0x6D */
      void 0,
      // TODO NROUND[ab]
      /* 0x6E */
      void 0,
      // TODO NROUND[ab]
      /* 0x6F */
      void 0,
      // TODO NROUND[ab]
      /* 0x70 */
      WCVTF,
      /* 0x71 */
      DELTAP123.bind(void 0, 2),
      /* 0x72 */
      DELTAP123.bind(void 0, 3),
      /* 0x73 */
      DELTAC123.bind(void 0, 1),
      /* 0x74 */
      DELTAC123.bind(void 0, 2),
      /* 0x75 */
      DELTAC123.bind(void 0, 3),
      /* 0x76 */
      SROUND,
      /* 0x77 */
      S45ROUND,
      /* 0x78 */
      void 0,
      // TODO JROT[]
      /* 0x79 */
      void 0,
      // TODO JROF[]
      /* 0x7A */
      ROFF,
      /* 0x7B */
      void 0,
      /* 0x7C */
      RUTG,
      /* 0x7D */
      RDTG,
      /* 0x7E */
      POP,
      // actually SANGW, supposed to do only a pop though
      /* 0x7F */
      POP,
      // actually AA, supposed to do only a pop though
      /* 0x80 */
      void 0,
      // TODO FLIPPT
      /* 0x81 */
      void 0,
      // TODO FLIPRGON
      /* 0x82 */
      void 0,
      // TODO FLIPRGOFF
      /* 0x83 */
      void 0,
      /* 0x84 */
      void 0,
      /* 0x85 */
      SCANCTRL,
      /* 0x86 */
      SDPVTL.bind(void 0, 0),
      /* 0x87 */
      SDPVTL.bind(void 0, 1),
      /* 0x88 */
      GETINFO,
      /* 0x89 */
      void 0,
      // TODO IDEF
      /* 0x8A */
      ROLL,
      /* 0x8B */
      MAX,
      /* 0x8C */
      MIN,
      /* 0x8D */
      SCANTYPE,
      /* 0x8E */
      INSTCTRL,
      /* 0x8F */
      void 0,
      /* 0x90 */
      void 0,
      /* 0x91 */
      void 0,
      /* 0x92 */
      void 0,
      /* 0x93 */
      void 0,
      /* 0x94 */
      void 0,
      /* 0x95 */
      void 0,
      /* 0x96 */
      void 0,
      /* 0x97 */
      void 0,
      /* 0x98 */
      void 0,
      /* 0x99 */
      void 0,
      /* 0x9A */
      void 0,
      /* 0x9B */
      void 0,
      /* 0x9C */
      void 0,
      /* 0x9D */
      void 0,
      /* 0x9E */
      void 0,
      /* 0x9F */
      void 0,
      /* 0xA0 */
      void 0,
      /* 0xA1 */
      void 0,
      /* 0xA2 */
      void 0,
      /* 0xA3 */
      void 0,
      /* 0xA4 */
      void 0,
      /* 0xA5 */
      void 0,
      /* 0xA6 */
      void 0,
      /* 0xA7 */
      void 0,
      /* 0xA8 */
      void 0,
      /* 0xA9 */
      void 0,
      /* 0xAA */
      void 0,
      /* 0xAB */
      void 0,
      /* 0xAC */
      void 0,
      /* 0xAD */
      void 0,
      /* 0xAE */
      void 0,
      /* 0xAF */
      void 0,
      /* 0xB0 */
      PUSHB.bind(void 0, 1),
      /* 0xB1 */
      PUSHB.bind(void 0, 2),
      /* 0xB2 */
      PUSHB.bind(void 0, 3),
      /* 0xB3 */
      PUSHB.bind(void 0, 4),
      /* 0xB4 */
      PUSHB.bind(void 0, 5),
      /* 0xB5 */
      PUSHB.bind(void 0, 6),
      /* 0xB6 */
      PUSHB.bind(void 0, 7),
      /* 0xB7 */
      PUSHB.bind(void 0, 8),
      /* 0xB8 */
      PUSHW.bind(void 0, 1),
      /* 0xB9 */
      PUSHW.bind(void 0, 2),
      /* 0xBA */
      PUSHW.bind(void 0, 3),
      /* 0xBB */
      PUSHW.bind(void 0, 4),
      /* 0xBC */
      PUSHW.bind(void 0, 5),
      /* 0xBD */
      PUSHW.bind(void 0, 6),
      /* 0xBE */
      PUSHW.bind(void 0, 7),
      /* 0xBF */
      PUSHW.bind(void 0, 8),
      /* 0xC0 */
      MDRP_MIRP.bind(void 0, 0, 0, 0, 0, 0),
      /* 0xC1 */
      MDRP_MIRP.bind(void 0, 0, 0, 0, 0, 1),
      /* 0xC2 */
      MDRP_MIRP.bind(void 0, 0, 0, 0, 0, 2),
      /* 0xC3 */
      MDRP_MIRP.bind(void 0, 0, 0, 0, 0, 3),
      /* 0xC4 */
      MDRP_MIRP.bind(void 0, 0, 0, 0, 1, 0),
      /* 0xC5 */
      MDRP_MIRP.bind(void 0, 0, 0, 0, 1, 1),
      /* 0xC6 */
      MDRP_MIRP.bind(void 0, 0, 0, 0, 1, 2),
      /* 0xC7 */
      MDRP_MIRP.bind(void 0, 0, 0, 0, 1, 3),
      /* 0xC8 */
      MDRP_MIRP.bind(void 0, 0, 0, 1, 0, 0),
      /* 0xC9 */
      MDRP_MIRP.bind(void 0, 0, 0, 1, 0, 1),
      /* 0xCA */
      MDRP_MIRP.bind(void 0, 0, 0, 1, 0, 2),
      /* 0xCB */
      MDRP_MIRP.bind(void 0, 0, 0, 1, 0, 3),
      /* 0xCC */
      MDRP_MIRP.bind(void 0, 0, 0, 1, 1, 0),
      /* 0xCD */
      MDRP_MIRP.bind(void 0, 0, 0, 1, 1, 1),
      /* 0xCE */
      MDRP_MIRP.bind(void 0, 0, 0, 1, 1, 2),
      /* 0xCF */
      MDRP_MIRP.bind(void 0, 0, 0, 1, 1, 3),
      /* 0xD0 */
      MDRP_MIRP.bind(void 0, 0, 1, 0, 0, 0),
      /* 0xD1 */
      MDRP_MIRP.bind(void 0, 0, 1, 0, 0, 1),
      /* 0xD2 */
      MDRP_MIRP.bind(void 0, 0, 1, 0, 0, 2),
      /* 0xD3 */
      MDRP_MIRP.bind(void 0, 0, 1, 0, 0, 3),
      /* 0xD4 */
      MDRP_MIRP.bind(void 0, 0, 1, 0, 1, 0),
      /* 0xD5 */
      MDRP_MIRP.bind(void 0, 0, 1, 0, 1, 1),
      /* 0xD6 */
      MDRP_MIRP.bind(void 0, 0, 1, 0, 1, 2),
      /* 0xD7 */
      MDRP_MIRP.bind(void 0, 0, 1, 0, 1, 3),
      /* 0xD8 */
      MDRP_MIRP.bind(void 0, 0, 1, 1, 0, 0),
      /* 0xD9 */
      MDRP_MIRP.bind(void 0, 0, 1, 1, 0, 1),
      /* 0xDA */
      MDRP_MIRP.bind(void 0, 0, 1, 1, 0, 2),
      /* 0xDB */
      MDRP_MIRP.bind(void 0, 0, 1, 1, 0, 3),
      /* 0xDC */
      MDRP_MIRP.bind(void 0, 0, 1, 1, 1, 0),
      /* 0xDD */
      MDRP_MIRP.bind(void 0, 0, 1, 1, 1, 1),
      /* 0xDE */
      MDRP_MIRP.bind(void 0, 0, 1, 1, 1, 2),
      /* 0xDF */
      MDRP_MIRP.bind(void 0, 0, 1, 1, 1, 3),
      /* 0xE0 */
      MDRP_MIRP.bind(void 0, 1, 0, 0, 0, 0),
      /* 0xE1 */
      MDRP_MIRP.bind(void 0, 1, 0, 0, 0, 1),
      /* 0xE2 */
      MDRP_MIRP.bind(void 0, 1, 0, 0, 0, 2),
      /* 0xE3 */
      MDRP_MIRP.bind(void 0, 1, 0, 0, 0, 3),
      /* 0xE4 */
      MDRP_MIRP.bind(void 0, 1, 0, 0, 1, 0),
      /* 0xE5 */
      MDRP_MIRP.bind(void 0, 1, 0, 0, 1, 1),
      /* 0xE6 */
      MDRP_MIRP.bind(void 0, 1, 0, 0, 1, 2),
      /* 0xE7 */
      MDRP_MIRP.bind(void 0, 1, 0, 0, 1, 3),
      /* 0xE8 */
      MDRP_MIRP.bind(void 0, 1, 0, 1, 0, 0),
      /* 0xE9 */
      MDRP_MIRP.bind(void 0, 1, 0, 1, 0, 1),
      /* 0xEA */
      MDRP_MIRP.bind(void 0, 1, 0, 1, 0, 2),
      /* 0xEB */
      MDRP_MIRP.bind(void 0, 1, 0, 1, 0, 3),
      /* 0xEC */
      MDRP_MIRP.bind(void 0, 1, 0, 1, 1, 0),
      /* 0xED */
      MDRP_MIRP.bind(void 0, 1, 0, 1, 1, 1),
      /* 0xEE */
      MDRP_MIRP.bind(void 0, 1, 0, 1, 1, 2),
      /* 0xEF */
      MDRP_MIRP.bind(void 0, 1, 0, 1, 1, 3),
      /* 0xF0 */
      MDRP_MIRP.bind(void 0, 1, 1, 0, 0, 0),
      /* 0xF1 */
      MDRP_MIRP.bind(void 0, 1, 1, 0, 0, 1),
      /* 0xF2 */
      MDRP_MIRP.bind(void 0, 1, 1, 0, 0, 2),
      /* 0xF3 */
      MDRP_MIRP.bind(void 0, 1, 1, 0, 0, 3),
      /* 0xF4 */
      MDRP_MIRP.bind(void 0, 1, 1, 0, 1, 0),
      /* 0xF5 */
      MDRP_MIRP.bind(void 0, 1, 1, 0, 1, 1),
      /* 0xF6 */
      MDRP_MIRP.bind(void 0, 1, 1, 0, 1, 2),
      /* 0xF7 */
      MDRP_MIRP.bind(void 0, 1, 1, 0, 1, 3),
      /* 0xF8 */
      MDRP_MIRP.bind(void 0, 1, 1, 1, 0, 0),
      /* 0xF9 */
      MDRP_MIRP.bind(void 0, 1, 1, 1, 0, 1),
      /* 0xFA */
      MDRP_MIRP.bind(void 0, 1, 1, 1, 0, 2),
      /* 0xFB */
      MDRP_MIRP.bind(void 0, 1, 1, 1, 0, 3),
      /* 0xFC */
      MDRP_MIRP.bind(void 0, 1, 1, 1, 1, 0),
      /* 0xFD */
      MDRP_MIRP.bind(void 0, 1, 1, 1, 1, 1),
      /* 0xFE */
      MDRP_MIRP.bind(void 0, 1, 1, 1, 1, 2),
      /* 0xFF */
      MDRP_MIRP.bind(void 0, 1, 1, 1, 1, 3)
    ];
    __name2(Token, "Token");
    __name2(ContextRange, "ContextRange");
    __name2(ContextChecker, "ContextChecker");
    __name2(ContextParams, "ContextParams");
    __name2(Event, "Event");
    __name2(initializeCoreEvents, "initializeCoreEvents");
    __name2(Tokenizer, "Tokenizer");
    Token.prototype.setState = function(key, value) {
      this.state[key] = value;
      this.activeState = { key, value: this.state[key] };
      return this.activeState;
    };
    Token.prototype.getState = function(stateId) {
      return this.state[stateId] || null;
    };
    Tokenizer.prototype.inboundIndex = function(index) {
      return index >= 0 && index < this.tokens.length;
    };
    Tokenizer.prototype.composeRUD = function(RUDs) {
      var this$1 = this;
      var silent = true;
      var state = RUDs.map(function(RUD) {
        return this$1[RUD[0]].apply(this$1, RUD.slice(1).concat(silent));
      });
      var hasFAILObject = /* @__PURE__ */ __name2(function(obj) {
        return typeof obj === "object" && obj.hasOwnProperty("FAIL");
      }, "hasFAILObject");
      if (state.every(hasFAILObject)) {
        return {
          FAIL: "composeRUD: one or more operations hasn't completed successfully",
          report: state.filter(hasFAILObject)
        };
      }
      this.dispatch("composeRUD", [state.filter(function(op) {
        return !hasFAILObject(op);
      })]);
    };
    Tokenizer.prototype.replaceRange = function(startIndex, offset, tokens, silent) {
      offset = offset !== null ? offset : this.tokens.length;
      var isTokenType = tokens.every(function(token) {
        return token instanceof Token;
      });
      if (!isNaN(startIndex) && this.inboundIndex(startIndex) && isTokenType) {
        var replaced = this.tokens.splice.apply(
          this.tokens,
          [startIndex, offset].concat(tokens)
        );
        if (!silent) {
          this.dispatch("replaceToken", [startIndex, offset, tokens]);
        }
        return [replaced, tokens];
      } else {
        return { FAIL: "replaceRange: invalid tokens or startIndex." };
      }
    };
    Tokenizer.prototype.replaceToken = function(index, token, silent) {
      if (!isNaN(index) && this.inboundIndex(index) && token instanceof Token) {
        var replaced = this.tokens.splice(index, 1, token);
        if (!silent) {
          this.dispatch("replaceToken", [index, token]);
        }
        return [replaced[0], token];
      } else {
        return { FAIL: "replaceToken: invalid token or index." };
      }
    };
    Tokenizer.prototype.removeRange = function(startIndex, offset, silent) {
      offset = !isNaN(offset) ? offset : this.tokens.length;
      var tokens = this.tokens.splice(startIndex, offset);
      if (!silent) {
        this.dispatch("removeRange", [tokens, startIndex, offset]);
      }
      return tokens;
    };
    Tokenizer.prototype.removeToken = function(index, silent) {
      if (!isNaN(index) && this.inboundIndex(index)) {
        var token = this.tokens.splice(index, 1);
        if (!silent) {
          this.dispatch("removeToken", [token, index]);
        }
        return token;
      } else {
        return { FAIL: "removeToken: invalid token index." };
      }
    };
    Tokenizer.prototype.insertToken = function(tokens, index, silent) {
      var tokenType = tokens.every(
        function(token) {
          return token instanceof Token;
        }
      );
      if (tokenType) {
        this.tokens.splice.apply(
          this.tokens,
          [index, 0].concat(tokens)
        );
        if (!silent) {
          this.dispatch("insertToken", [tokens, index]);
        }
        return tokens;
      } else {
        return { FAIL: "insertToken: invalid token(s)." };
      }
    };
    Tokenizer.prototype.registerModifier = function(modifierId, condition, modifier) {
      this.events.newToken.subscribe(function(token, contextParams) {
        var conditionParams = [token, contextParams];
        var canApplyModifier = condition === null || condition.apply(this, conditionParams) === true;
        var modifierParams = [token, contextParams];
        if (canApplyModifier) {
          var newStateValue = modifier.apply(this, modifierParams);
          token.setState(modifierId, newStateValue);
        }
      });
      this.registeredModifiers.push(modifierId);
    };
    Event.prototype.subscribe = function(eventHandler) {
      if (typeof eventHandler === "function") {
        return this.subscribers.push(eventHandler) - 1;
      } else {
        return { FAIL: "invalid '" + this.eventId + "' event handler" };
      }
    };
    Event.prototype.unsubscribe = function(subsId) {
      this.subscribers.splice(subsId, 1);
    };
    ContextParams.prototype.setCurrentIndex = function(index) {
      this.index = index;
      this.current = this.context[index];
      this.backtrack = this.context.slice(0, index);
      this.lookahead = this.context.slice(index + 1);
    };
    ContextParams.prototype.get = function(offset) {
      switch (true) {
        case offset === 0:
          return this.current;
        case (offset < 0 && Math.abs(offset) <= this.backtrack.length):
          return this.backtrack.slice(offset)[0];
        case (offset > 0 && offset <= this.lookahead.length):
          return this.lookahead[offset - 1];
        default:
          return null;
      }
    };
    Tokenizer.prototype.rangeToText = function(range) {
      if (range instanceof ContextRange) {
        return this.getRangeTokens(range).map(function(token) {
          return token.char;
        }).join("");
      }
    };
    Tokenizer.prototype.getText = function() {
      return this.tokens.map(function(token) {
        return token.char;
      }).join("");
    };
    Tokenizer.prototype.getContext = function(contextName) {
      var context22 = this.registeredContexts[contextName];
      return !!context22 ? context22 : null;
    };
    Tokenizer.prototype.on = function(eventName, eventHandler) {
      var event = this.events[eventName];
      if (!!event) {
        return event.subscribe(eventHandler);
      } else {
        return null;
      }
    };
    Tokenizer.prototype.dispatch = function(eventName, args) {
      var this$1 = this;
      var event = this.events[eventName];
      if (event instanceof Event) {
        event.subscribers.forEach(function(subscriber) {
          subscriber.apply(this$1, args || []);
        });
      }
    };
    Tokenizer.prototype.registerContextChecker = function(contextName, contextStartCheck, contextEndCheck) {
      if (!!this.getContext(contextName)) {
        return {
          FAIL: "context name '" + contextName + "' is already registered."
        };
      }
      if (typeof contextStartCheck !== "function") {
        return {
          FAIL: "missing context start check."
        };
      }
      if (typeof contextEndCheck !== "function") {
        return {
          FAIL: "missing context end check."
        };
      }
      var contextCheckers = new ContextChecker(
        contextName,
        contextStartCheck,
        contextEndCheck
      );
      this.registeredContexts[contextName] = contextCheckers;
      this.contextCheckers.push(contextCheckers);
      return contextCheckers;
    };
    Tokenizer.prototype.getRangeTokens = function(range) {
      var endIndex = range.startIndex + range.endOffset;
      return [].concat(
        this.tokens.slice(range.startIndex, endIndex)
      );
    };
    Tokenizer.prototype.getContextRanges = function(contextName) {
      var context22 = this.getContext(contextName);
      if (!!context22) {
        return context22.ranges;
      } else {
        return { FAIL: "context checker '" + contextName + "' is not registered." };
      }
    };
    Tokenizer.prototype.resetContextsRanges = function() {
      var registeredContexts = this.registeredContexts;
      for (var contextName in registeredContexts) {
        if (registeredContexts.hasOwnProperty(contextName)) {
          var context22 = registeredContexts[contextName];
          context22.ranges = [];
        }
      }
    };
    Tokenizer.prototype.updateContextsRanges = function() {
      this.resetContextsRanges();
      var chars = this.tokens.map(function(token) {
        return token.char;
      });
      for (var i2 = 0; i2 < chars.length; i2++) {
        var contextParams = new ContextParams(chars, i2);
        this.runContextCheck(contextParams);
      }
      this.dispatch("updateContextsRanges", [this.registeredContexts]);
    };
    Tokenizer.prototype.setEndOffset = function(offset, contextName) {
      var startIndex = this.getContext(contextName).openRange.startIndex;
      var range = new ContextRange(startIndex, offset, contextName);
      var ranges = this.getContext(contextName).ranges;
      range.rangeId = contextName + "." + ranges.length;
      ranges.push(range);
      this.getContext(contextName).openRange = null;
      return range;
    };
    Tokenizer.prototype.runContextCheck = function(contextParams) {
      var this$1 = this;
      var index = contextParams.index;
      this.contextCheckers.forEach(function(contextChecker) {
        var contextName = contextChecker.contextName;
        var openRange = this$1.getContext(contextName).openRange;
        if (!openRange && contextChecker.checkStart(contextParams)) {
          openRange = new ContextRange(index, null, contextName);
          this$1.getContext(contextName).openRange = openRange;
          this$1.dispatch("contextStart", [contextName, index]);
        }
        if (!!openRange && contextChecker.checkEnd(contextParams)) {
          var offset = index - openRange.startIndex + 1;
          var range = this$1.setEndOffset(offset, contextName);
          this$1.dispatch("contextEnd", [contextName, range]);
        }
      });
    };
    Tokenizer.prototype.tokenize = function(text) {
      this.tokens = [];
      this.resetContextsRanges();
      var chars = Array.from(text);
      this.dispatch("start");
      for (var i2 = 0; i2 < chars.length; i2++) {
        var char = chars[i2];
        var contextParams = new ContextParams(chars, i2);
        this.dispatch("next", [contextParams]);
        this.runContextCheck(contextParams);
        var token = new Token(char);
        this.tokens.push(token);
        this.dispatch("newToken", [token, contextParams]);
      }
      this.dispatch("end", [this.tokens]);
      return this.tokens;
    };
    __name2(isArabicChar, "isArabicChar");
    __name2(isIsolatedArabicChar, "isIsolatedArabicChar");
    __name2(isTashkeelArabicChar, "isTashkeelArabicChar");
    __name2(isLatinChar, "isLatinChar");
    __name2(isWhiteSpace, "isWhiteSpace");
    __name2(FeatureQuery, "FeatureQuery");
    __name2(SubstitutionAction, "SubstitutionAction");
    __name2(lookupCoverage, "lookupCoverage");
    __name2(singleSubstitutionFormat1, "singleSubstitutionFormat1");
    __name2(singleSubstitutionFormat2, "singleSubstitutionFormat2");
    __name2(lookupCoverageList, "lookupCoverageList");
    __name2(chainingSubstitutionFormat3, "chainingSubstitutionFormat3");
    __name2(ligatureSubstitutionFormat1, "ligatureSubstitutionFormat1");
    __name2(decompositionSubstitutionFormat1, "decompositionSubstitutionFormat1");
    FeatureQuery.prototype.getDefaultScriptFeaturesIndexes = function() {
      var scripts = this.font.tables.gsub.scripts;
      for (var s = 0; s < scripts.length; s++) {
        var script = scripts[s];
        if (script.tag === "DFLT") {
          return script.script.defaultLangSys.featureIndexes;
        }
      }
      return [];
    };
    FeatureQuery.prototype.getScriptFeaturesIndexes = function(scriptTag) {
      var tables = this.font.tables;
      if (!tables.gsub) {
        return [];
      }
      if (!scriptTag) {
        return this.getDefaultScriptFeaturesIndexes();
      }
      var scripts = this.font.tables.gsub.scripts;
      for (var i2 = 0; i2 < scripts.length; i2++) {
        var script = scripts[i2];
        if (script.tag === scriptTag && script.script.defaultLangSys) {
          return script.script.defaultLangSys.featureIndexes;
        } else {
          var langSysRecords = script.langSysRecords;
          if (!!langSysRecords) {
            for (var j = 0; j < langSysRecords.length; j++) {
              var langSysRecord = langSysRecords[j];
              if (langSysRecord.tag === scriptTag) {
                var langSys = langSysRecord.langSys;
                return langSys.featureIndexes;
              }
            }
          }
        }
      }
      return this.getDefaultScriptFeaturesIndexes();
    };
    FeatureQuery.prototype.mapTagsToFeatures = function(features22, scriptTag) {
      var tags = {};
      for (var i2 = 0; i2 < features22.length; i2++) {
        var tag = features22[i2].tag;
        var feature = features22[i2].feature;
        tags[tag] = feature;
      }
      this.features[scriptTag].tags = tags;
    };
    FeatureQuery.prototype.getScriptFeatures = function(scriptTag) {
      var features22 = this.features[scriptTag];
      if (this.features.hasOwnProperty(scriptTag)) {
        return features22;
      }
      var featuresIndexes = this.getScriptFeaturesIndexes(scriptTag);
      if (!featuresIndexes) {
        return null;
      }
      var gsub2 = this.font.tables.gsub;
      features22 = featuresIndexes.map(function(index) {
        return gsub2.features[index];
      });
      this.features[scriptTag] = features22;
      this.mapTagsToFeatures(features22, scriptTag);
      return features22;
    };
    FeatureQuery.prototype.getSubstitutionType = function(lookupTable, subtable) {
      var lookupType = lookupTable.lookupType.toString();
      var substFormat = subtable.substFormat.toString();
      return lookupType + substFormat;
    };
    FeatureQuery.prototype.getLookupMethod = function(lookupTable, subtable) {
      var this$1 = this;
      var substitutionType = this.getSubstitutionType(lookupTable, subtable);
      switch (substitutionType) {
        case "11":
          return function(glyphIndex) {
            return singleSubstitutionFormat1.apply(
              this$1,
              [glyphIndex, subtable]
            );
          };
        case "12":
          return function(glyphIndex) {
            return singleSubstitutionFormat2.apply(
              this$1,
              [glyphIndex, subtable]
            );
          };
        case "63":
          return function(contextParams) {
            return chainingSubstitutionFormat3.apply(
              this$1,
              [contextParams, subtable]
            );
          };
        case "41":
          return function(contextParams) {
            return ligatureSubstitutionFormat1.apply(
              this$1,
              [contextParams, subtable]
            );
          };
        case "21":
          return function(glyphIndex) {
            return decompositionSubstitutionFormat1.apply(
              this$1,
              [glyphIndex, subtable]
            );
          };
        default:
          throw new Error(
            "lookupType: " + lookupTable.lookupType + " - substFormat: " + subtable.substFormat + " is not yet supported"
          );
      }
    };
    FeatureQuery.prototype.lookupFeature = function(query) {
      var contextParams = query.contextParams;
      var currentIndex = contextParams.index;
      var feature = this.getFeature({
        tag: query.tag,
        script: query.script
      });
      if (!feature) {
        return new Error(
          "font '" + this.font.names.fullName.en + "' doesn't support feature '" + query.tag + "' for script '" + query.script + "'."
        );
      }
      var lookups = this.getFeatureLookups(feature);
      var substitutions = [].concat(contextParams.context);
      for (var l2 = 0; l2 < lookups.length; l2++) {
        var lookupTable = lookups[l2];
        var subtables = this.getLookupSubtables(lookupTable);
        for (var s = 0; s < subtables.length; s++) {
          var subtable = subtables[s];
          var substType = this.getSubstitutionType(lookupTable, subtable);
          var lookup = this.getLookupMethod(lookupTable, subtable);
          var substitution = void 0;
          switch (substType) {
            case "11":
              substitution = lookup(contextParams.current);
              if (substitution) {
                substitutions.splice(currentIndex, 1, new SubstitutionAction({
                  id: 11,
                  tag: query.tag,
                  substitution
                }));
              }
              break;
            case "12":
              substitution = lookup(contextParams.current);
              if (substitution) {
                substitutions.splice(currentIndex, 1, new SubstitutionAction({
                  id: 12,
                  tag: query.tag,
                  substitution
                }));
              }
              break;
            case "63":
              substitution = lookup(contextParams);
              if (Array.isArray(substitution) && substitution.length) {
                substitutions.splice(currentIndex, 1, new SubstitutionAction({
                  id: 63,
                  tag: query.tag,
                  substitution
                }));
              }
              break;
            case "41":
              substitution = lookup(contextParams);
              if (substitution) {
                substitutions.splice(currentIndex, 1, new SubstitutionAction({
                  id: 41,
                  tag: query.tag,
                  substitution
                }));
              }
              break;
            case "21":
              substitution = lookup(contextParams.current);
              if (substitution) {
                substitutions.splice(currentIndex, 1, new SubstitutionAction({
                  id: 21,
                  tag: query.tag,
                  substitution
                }));
              }
              break;
          }
          contextParams = new ContextParams(substitutions, currentIndex);
          if (Array.isArray(substitution) && !substitution.length) {
            continue;
          }
          substitution = null;
        }
      }
      return substitutions.length ? substitutions : null;
    };
    FeatureQuery.prototype.supports = function(query) {
      if (!query.script) {
        return false;
      }
      this.getScriptFeatures(query.script);
      var supportedScript = this.features.hasOwnProperty(query.script);
      if (!query.tag) {
        return supportedScript;
      }
      var supportedFeature = this.features[query.script].some(function(feature) {
        return feature.tag === query.tag;
      });
      return supportedScript && supportedFeature;
    };
    FeatureQuery.prototype.getLookupSubtables = function(lookupTable) {
      return lookupTable.subtables || null;
    };
    FeatureQuery.prototype.getLookupByIndex = function(index) {
      var lookups = this.font.tables.gsub.lookups;
      return lookups[index] || null;
    };
    FeatureQuery.prototype.getFeatureLookups = function(feature) {
      return feature.lookupListIndexes.map(this.getLookupByIndex.bind(this));
    };
    FeatureQuery.prototype.getFeature = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function getFeature(query) {
      if (!this.font) {
        return { FAIL: "No font was found" };
      }
      if (!this.features.hasOwnProperty(query.script)) {
        this.getScriptFeatures(query.script);
      }
      var scriptFeatures = this.features[query.script];
      if (!scriptFeatures) {
        return { FAIL: "No feature for script " + query.script };
      }
      if (!scriptFeatures.tags[query.tag]) {
        return null;
      }
      return this.features[query.script].tags[query.tag];
    }, "getFeature"), "getFeature");
    __name2(arabicWordStartCheck, "arabicWordStartCheck");
    __name2(arabicWordEndCheck, "arabicWordEndCheck");
    arabicWordCheck = {
      startCheck: arabicWordStartCheck,
      endCheck: arabicWordEndCheck
    };
    __name2(arabicSentenceStartCheck, "arabicSentenceStartCheck");
    __name2(arabicSentenceEndCheck, "arabicSentenceEndCheck");
    arabicSentenceCheck = {
      startCheck: arabicSentenceStartCheck,
      endCheck: arabicSentenceEndCheck
    };
    __name2(singleSubstitutionFormat1$1, "singleSubstitutionFormat1$1");
    __name2(singleSubstitutionFormat2$1, "singleSubstitutionFormat2$1");
    __name2(chainingSubstitutionFormat3$1, "chainingSubstitutionFormat3$1");
    __name2(ligatureSubstitutionFormat1$1, "ligatureSubstitutionFormat1$1");
    SUBSTITUTIONS = {
      11: singleSubstitutionFormat1$1,
      12: singleSubstitutionFormat2$1,
      63: chainingSubstitutionFormat3$1,
      41: ligatureSubstitutionFormat1$1
    };
    __name2(applySubstitution, "applySubstitution");
    __name2(willConnectPrev, "willConnectPrev");
    __name2(willConnectNext, "willConnectNext");
    __name2(arabicPresentationForms, "arabicPresentationForms");
    __name2(getContextParams, "getContextParams");
    __name2(arabicRequiredLigatures, "arabicRequiredLigatures");
    __name2(latinWordStartCheck, "latinWordStartCheck");
    __name2(latinWordEndCheck, "latinWordEndCheck");
    latinWordCheck = {
      startCheck: latinWordStartCheck,
      endCheck: latinWordEndCheck
    };
    __name2(getContextParams$1, "getContextParams$1");
    __name2(latinLigature, "latinLigature");
    __name2(Bidi, "Bidi");
    Bidi.prototype.setText = function(text) {
      this.text = text;
    };
    Bidi.prototype.contextChecks = {
      latinWordCheck,
      arabicWordCheck,
      arabicSentenceCheck
    };
    __name2(registerContextChecker, "registerContextChecker");
    __name2(tokenizeText, "tokenizeText");
    __name2(reverseArabicSentences, "reverseArabicSentences");
    Bidi.prototype.registerFeatures = function(script, tags) {
      var this$1 = this;
      var supportedTags = tags.filter(
        function(tag) {
          return this$1.query.supports({ script, tag });
        }
      );
      if (!this.featuresTags.hasOwnProperty(script)) {
        this.featuresTags[script] = supportedTags;
      } else {
        this.featuresTags[script] = this.featuresTags[script].concat(supportedTags);
      }
    };
    Bidi.prototype.applyFeatures = function(font, features22) {
      if (!font) {
        throw new Error(
          "No valid font was provided to apply features"
        );
      }
      if (!this.query) {
        this.query = new FeatureQuery(font);
      }
      for (var f = 0; f < features22.length; f++) {
        var feature = features22[f];
        if (!this.query.supports({ script: feature.script })) {
          continue;
        }
        this.registerFeatures(feature.script, feature.tags);
      }
    };
    Bidi.prototype.registerModifier = function(modifierId, condition, modifier) {
      this.tokenizer.registerModifier(modifierId, condition, modifier);
    };
    __name2(checkGlyphIndexStatus, "checkGlyphIndexStatus");
    __name2(applyArabicPresentationForms, "applyArabicPresentationForms");
    __name2(applyArabicRequireLigatures, "applyArabicRequireLigatures");
    __name2(applyLatinLigatures, "applyLatinLigatures");
    Bidi.prototype.checkContextReady = function(contextId) {
      return !!this.tokenizer.getContext(contextId);
    };
    Bidi.prototype.applyFeaturesToContexts = function() {
      if (this.checkContextReady("arabicWord")) {
        applyArabicPresentationForms.call(this);
        applyArabicRequireLigatures.call(this);
      }
      if (this.checkContextReady("latinWord")) {
        applyLatinLigatures.call(this);
      }
      if (this.checkContextReady("arabicSentence")) {
        reverseArabicSentences.call(this);
      }
    };
    Bidi.prototype.processText = function(text) {
      if (!this.text || this.text !== text) {
        this.setText(text);
        tokenizeText.call(this);
        this.applyFeaturesToContexts();
      }
    };
    Bidi.prototype.getBidiText = function(text) {
      this.processText(text);
      return this.tokenizer.getText();
    };
    Bidi.prototype.getTextGlyphs = function(text) {
      this.processText(text);
      var indexes = [];
      for (var i2 = 0; i2 < this.tokenizer.tokens.length; i2++) {
        var token = this.tokenizer.tokens[i2];
        if (token.state.deleted) {
          continue;
        }
        var index = token.activeState.value;
        indexes.push(Array.isArray(index) ? index[0] : index);
      }
      return indexes;
    };
    __name2(Font, "Font");
    Font.prototype.hasChar = function(c2) {
      return this.encoding.charToGlyphIndex(c2) !== null;
    };
    Font.prototype.charToGlyphIndex = function(s) {
      return this.encoding.charToGlyphIndex(s);
    };
    Font.prototype.charToGlyph = function(c2) {
      var glyphIndex = this.charToGlyphIndex(c2);
      var glyph = this.glyphs.get(glyphIndex);
      if (!glyph) {
        glyph = this.glyphs.get(0);
      }
      return glyph;
    };
    Font.prototype.updateFeatures = function(options) {
      return this.defaultRenderOptions.features.map(function(feature) {
        if (feature.script === "latn") {
          return {
            script: "latn",
            tags: feature.tags.filter(function(tag) {
              return options[tag];
            })
          };
        } else {
          return feature;
        }
      });
    };
    Font.prototype.stringToGlyphs = function(s, options) {
      var this$1 = this;
      var bidi = new Bidi();
      var charToGlyphIndexMod = /* @__PURE__ */ __name2(function(token) {
        return this$1.charToGlyphIndex(token.char);
      }, "charToGlyphIndexMod");
      bidi.registerModifier("glyphIndex", null, charToGlyphIndexMod);
      var features22 = options ? this.updateFeatures(options.features) : this.defaultRenderOptions.features;
      bidi.applyFeatures(this, features22);
      var indexes = bidi.getTextGlyphs(s);
      var length = indexes.length;
      var glyphs = new Array(length);
      var notdef = this.glyphs.get(0);
      for (var i2 = 0; i2 < length; i2 += 1) {
        glyphs[i2] = this.glyphs.get(indexes[i2]) || notdef;
      }
      return glyphs;
    };
    Font.prototype.getKerningValue = function(leftGlyph, rightGlyph) {
      leftGlyph = leftGlyph.index || leftGlyph;
      rightGlyph = rightGlyph.index || rightGlyph;
      var gposKerning = this.position.defaultKerningTables;
      if (gposKerning) {
        return this.position.getKerningValue(
          gposKerning,
          leftGlyph,
          rightGlyph
        );
      }
      return this.kerningPairs[leftGlyph + "," + rightGlyph] || 0;
    };
    Font.prototype.defaultRenderOptions = {
      kerning: true,
      features: [
        /**
         * these 4 features are required to render Arabic text properly
         * and shouldn't be turned off when rendering arabic text.
         */
        { script: "arab", tags: ["init", "medi", "fina", "rlig"] },
        { script: "latn", tags: ["liga", "rlig"] }
      ]
    };
    Font.prototype.forEachGlyph = function(text, x22, y, fontSize, options, callback) {
      x22 = x22 !== void 0 ? x22 : 0;
      y = y !== void 0 ? y : 0;
      fontSize = fontSize !== void 0 ? fontSize : 72;
      options = Object.assign({}, this.defaultRenderOptions, options);
      var fontScale = 1 / this.unitsPerEm * fontSize;
      var glyphs = this.stringToGlyphs(text, options);
      var kerningLookups;
      if (options.kerning) {
        var script = options.script || this.position.getDefaultScriptName();
        kerningLookups = this.position.getKerningTables(
          script,
          options.language
        );
      }
      for (var i2 = 0; i2 < glyphs.length; i2 += 1) {
        var glyph = glyphs[i2];
        callback.call(this, glyph, x22, y, fontSize, options);
        if (glyph.advanceWidth) {
          x22 += glyph.advanceWidth * fontScale;
        }
        if (options.kerning && i2 < glyphs.length - 1) {
          var kerningValue = kerningLookups ? this.position.getKerningValue(
            kerningLookups,
            glyph.index,
            glyphs[i2 + 1].index
          ) : this.getKerningValue(glyph, glyphs[i2 + 1]);
          x22 += kerningValue * fontScale;
        }
        if (options.letterSpacing) {
          x22 += options.letterSpacing * fontSize;
        } else if (options.tracking) {
          x22 += options.tracking / 1e3 * fontSize;
        }
      }
      return x22;
    };
    Font.prototype.getPath = function(text, x22, y, fontSize, options) {
      var fullPath = new Path();
      this.forEachGlyph(
        text,
        x22,
        y,
        fontSize,
        options,
        function(glyph, gX, gY, gFontSize) {
          var glyphPath = glyph.getPath(gX, gY, gFontSize, options, this);
          fullPath.extend(glyphPath);
        }
      );
      return fullPath;
    };
    Font.prototype.getPaths = function(text, x22, y, fontSize, options) {
      var glyphPaths = [];
      this.forEachGlyph(
        text,
        x22,
        y,
        fontSize,
        options,
        function(glyph, gX, gY, gFontSize) {
          var glyphPath = glyph.getPath(gX, gY, gFontSize, options, this);
          glyphPaths.push(glyphPath);
        }
      );
      return glyphPaths;
    };
    Font.prototype.getAdvanceWidth = function(text, fontSize, options) {
      return this.forEachGlyph(text, 0, 0, fontSize, options, function() {
      });
    };
    Font.prototype.fsSelectionValues = {
      ITALIC: 1,
      //1
      UNDERSCORE: 2,
      //2
      NEGATIVE: 4,
      //4
      OUTLINED: 8,
      //8
      STRIKEOUT: 16,
      //16
      BOLD: 32,
      //32
      REGULAR: 64,
      //64
      USER_TYPO_METRICS: 128,
      //128
      WWS: 256,
      //256
      OBLIQUE: 512
      //512
    };
    Font.prototype.usWidthClasses = {
      ULTRA_CONDENSED: 1,
      EXTRA_CONDENSED: 2,
      CONDENSED: 3,
      SEMI_CONDENSED: 4,
      MEDIUM: 5,
      SEMI_EXPANDED: 6,
      EXPANDED: 7,
      EXTRA_EXPANDED: 8,
      ULTRA_EXPANDED: 9
    };
    Font.prototype.usWeightClasses = {
      THIN: 100,
      EXTRA_LIGHT: 200,
      LIGHT: 300,
      NORMAL: 400,
      MEDIUM: 500,
      SEMI_BOLD: 600,
      BOLD: 700,
      EXTRA_BOLD: 800,
      BLACK: 900
    };
    __name2(parseCmapTableFormat12, "parseCmapTableFormat12");
    __name2(parseCmapTableFormat4, "parseCmapTableFormat4");
    __name2(parseCmapTable, "parseCmapTable");
    cmap = { parse: parseCmapTable };
    __name2(calcCFFSubroutineBias, "calcCFFSubroutineBias");
    __name2(parseCFFIndex, "parseCFFIndex");
    __name2(parseCFFIndexLowMemory, "parseCFFIndexLowMemory");
    __name2(getCffIndexObject, "getCffIndexObject");
    __name2(parseFloatOperand, "parseFloatOperand");
    __name2(parseOperand, "parseOperand");
    __name2(entriesToObject, "entriesToObject");
    __name2(parseCFFDict, "parseCFFDict");
    __name2(getCFFString, "getCFFString");
    __name2(interpretDict, "interpretDict");
    __name2(parseCFFHeader, "parseCFFHeader");
    TOP_DICT_META = [
      { name: "version", op: 0, type: "SID" },
      { name: "notice", op: 1, type: "SID" },
      { name: "copyright", op: 1200, type: "SID" },
      { name: "fullName", op: 2, type: "SID" },
      { name: "familyName", op: 3, type: "SID" },
      { name: "weight", op: 4, type: "SID" },
      { name: "isFixedPitch", op: 1201, type: "number", value: 0 },
      { name: "italicAngle", op: 1202, type: "number", value: 0 },
      { name: "underlinePosition", op: 1203, type: "number", value: -100 },
      { name: "underlineThickness", op: 1204, type: "number", value: 50 },
      { name: "paintType", op: 1205, type: "number", value: 0 },
      { name: "charstringType", op: 1206, type: "number", value: 2 },
      {
        name: "fontMatrix",
        op: 1207,
        type: ["real", "real", "real", "real", "real", "real"],
        value: [1e-3, 0, 0, 1e-3, 0, 0]
      },
      { name: "uniqueId", op: 13, type: "number" },
      {
        name: "fontBBox",
        op: 5,
        type: ["number", "number", "number", "number"],
        value: [0, 0, 0, 0]
      },
      { name: "strokeWidth", op: 1208, type: "number", value: 0 },
      { name: "xuid", op: 14, type: [], value: null },
      { name: "charset", op: 15, type: "offset", value: 0 },
      { name: "encoding", op: 16, type: "offset", value: 0 },
      { name: "charStrings", op: 17, type: "offset", value: 0 },
      { name: "private", op: 18, type: ["number", "offset"], value: [0, 0] },
      { name: "ros", op: 1230, type: ["SID", "SID", "number"] },
      { name: "cidFontVersion", op: 1231, type: "number", value: 0 },
      { name: "cidFontRevision", op: 1232, type: "number", value: 0 },
      { name: "cidFontType", op: 1233, type: "number", value: 0 },
      { name: "cidCount", op: 1234, type: "number", value: 8720 },
      { name: "uidBase", op: 1235, type: "number" },
      { name: "fdArray", op: 1236, type: "offset" },
      { name: "fdSelect", op: 1237, type: "offset" },
      { name: "fontName", op: 1238, type: "SID" }
    ];
    PRIVATE_DICT_META = [
      { name: "subrs", op: 19, type: "offset", value: 0 },
      { name: "defaultWidthX", op: 20, type: "number", value: 0 },
      { name: "nominalWidthX", op: 21, type: "number", value: 0 }
    ];
    __name2(parseCFFTopDict, "parseCFFTopDict");
    __name2(parseCFFPrivateDict, "parseCFFPrivateDict");
    __name2(gatherCFFTopDicts, "gatherCFFTopDicts");
    __name2(parseCFFCharset, "parseCFFCharset");
    __name2(parseCFFEncoding, "parseCFFEncoding");
    __name2(parseCFFCharstring, "parseCFFCharstring");
    __name2(parseCFFFDSelect, "parseCFFFDSelect");
    __name2(parseCFFTable, "parseCFFTable");
    cff = { parse: parseCFFTable };
    __name2(parseFvarAxis, "parseFvarAxis");
    __name2(parseFvarInstance, "parseFvarInstance");
    __name2(parseFvarTable, "parseFvarTable");
    fvar = { parse: parseFvarTable };
    attachList = /* @__PURE__ */ __name2(function() {
      return {
        coverage: this.parsePointer(Parser.coverage),
        attachPoints: this.parseList(Parser.pointer(Parser.uShortList))
      };
    }, "attachList");
    caretValue = /* @__PURE__ */ __name2(function() {
      var format = this.parseUShort();
      check.argument(
        format === 1 || format === 2 || format === 3,
        "Unsupported CaretValue table version."
      );
      if (format === 1) {
        return { coordinate: this.parseShort() };
      } else if (format === 2) {
        return { pointindex: this.parseShort() };
      } else if (format === 3) {
        return { coordinate: this.parseShort() };
      }
    }, "caretValue");
    ligGlyph = /* @__PURE__ */ __name2(function() {
      return this.parseList(Parser.pointer(caretValue));
    }, "ligGlyph");
    ligCaretList = /* @__PURE__ */ __name2(function() {
      return {
        coverage: this.parsePointer(Parser.coverage),
        ligGlyphs: this.parseList(Parser.pointer(ligGlyph))
      };
    }, "ligCaretList");
    markGlyphSets = /* @__PURE__ */ __name2(function() {
      this.parseUShort();
      return this.parseList(Parser.pointer(Parser.coverage));
    }, "markGlyphSets");
    __name2(parseGDEFTable, "parseGDEFTable");
    gdef = { parse: parseGDEFTable };
    subtableParsers = new Array(10);
    subtableParsers[1] = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseLookup1() {
      var start = this.offset + this.relativeOffset;
      var posformat = this.parseUShort();
      if (posformat === 1) {
        return {
          posFormat: 1,
          coverage: this.parsePointer(Parser.coverage),
          value: this.parseValueRecord()
        };
      } else if (posformat === 2) {
        return {
          posFormat: 2,
          coverage: this.parsePointer(Parser.coverage),
          values: this.parseValueRecordList()
        };
      }
      check.assert(
        false,
        "0x" + start.toString(16) + ": GPOS lookup type 1 format must be 1 or 2."
      );
    }, "parseLookup1"), "parseLookup1");
    subtableParsers[2] = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseLookup2() {
      var start = this.offset + this.relativeOffset;
      var posFormat = this.parseUShort();
      check.assert(
        posFormat === 1 || posFormat === 2,
        "0x" + start.toString(16) + ": GPOS lookup type 2 format must be 1 or 2."
      );
      var coverage = this.parsePointer(Parser.coverage);
      var valueFormat1 = this.parseUShort();
      var valueFormat2 = this.parseUShort();
      if (posFormat === 1) {
        return {
          posFormat,
          coverage,
          valueFormat1,
          valueFormat2,
          pairSets: this.parseList(
            Parser.pointer(
              Parser.list(function() {
                return {
                  // pairValueRecord
                  secondGlyph: this.parseUShort(),
                  value1: this.parseValueRecord(valueFormat1),
                  value2: this.parseValueRecord(valueFormat2)
                };
              })
            )
          )
        };
      } else if (posFormat === 2) {
        var classDef1 = this.parsePointer(Parser.classDef);
        var classDef2 = this.parsePointer(Parser.classDef);
        var class1Count = this.parseUShort();
        var class2Count = this.parseUShort();
        return {
          // Class Pair Adjustment
          posFormat,
          coverage,
          valueFormat1,
          valueFormat2,
          classDef1,
          classDef2,
          class1Count,
          class2Count,
          classRecords: this.parseList(
            class1Count,
            Parser.list(class2Count, function() {
              return {
                value1: this.parseValueRecord(valueFormat1),
                value2: this.parseValueRecord(valueFormat2)
              };
            })
          )
        };
      }
    }, "parseLookup2"), "parseLookup2");
    subtableParsers[3] = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseLookup3() {
      return { error: "GPOS Lookup 3 not supported" };
    }, "parseLookup3"), "parseLookup3");
    subtableParsers[4] = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseLookup4() {
      return { error: "GPOS Lookup 4 not supported" };
    }, "parseLookup4"), "parseLookup4");
    subtableParsers[5] = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseLookup5() {
      return { error: "GPOS Lookup 5 not supported" };
    }, "parseLookup5"), "parseLookup5");
    subtableParsers[6] = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseLookup6() {
      return { error: "GPOS Lookup 6 not supported" };
    }, "parseLookup6"), "parseLookup6");
    subtableParsers[7] = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseLookup7() {
      return { error: "GPOS Lookup 7 not supported" };
    }, "parseLookup7"), "parseLookup7");
    subtableParsers[8] = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseLookup8() {
      return { error: "GPOS Lookup 8 not supported" };
    }, "parseLookup8"), "parseLookup8");
    subtableParsers[9] = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseLookup9() {
      return { error: "GPOS Lookup 9 not supported" };
    }, "parseLookup9"), "parseLookup9");
    __name2(parseGposTable, "parseGposTable");
    gpos = { parse: parseGposTable };
    subtableParsers$1 = new Array(9);
    subtableParsers$1[1] = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseLookup12() {
      var start = this.offset + this.relativeOffset;
      var substFormat = this.parseUShort();
      if (substFormat === 1) {
        return {
          substFormat: 1,
          coverage: this.parsePointer(Parser.coverage),
          deltaGlyphId: this.parseUShort()
        };
      } else if (substFormat === 2) {
        return {
          substFormat: 2,
          coverage: this.parsePointer(Parser.coverage),
          substitute: this.parseOffset16List()
        };
      }
      check.assert(
        false,
        "0x" + start.toString(16) + ": lookup type 1 format must be 1 or 2."
      );
    }, "parseLookup12"), "parseLookup1");
    subtableParsers$1[2] = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseLookup22() {
      var substFormat = this.parseUShort();
      check.argument(
        substFormat === 1,
        "GSUB Multiple Substitution Subtable identifier-format must be 1"
      );
      return {
        substFormat,
        coverage: this.parsePointer(Parser.coverage),
        sequences: this.parseListOfLists()
      };
    }, "parseLookup22"), "parseLookup2");
    subtableParsers$1[3] = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseLookup32() {
      var substFormat = this.parseUShort();
      check.argument(
        substFormat === 1,
        "GSUB Alternate Substitution Subtable identifier-format must be 1"
      );
      return {
        substFormat,
        coverage: this.parsePointer(Parser.coverage),
        alternateSets: this.parseListOfLists()
      };
    }, "parseLookup32"), "parseLookup3");
    subtableParsers$1[4] = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseLookup42() {
      var substFormat = this.parseUShort();
      check.argument(
        substFormat === 1,
        "GSUB ligature table identifier-format must be 1"
      );
      return {
        substFormat,
        coverage: this.parsePointer(Parser.coverage),
        ligatureSets: this.parseListOfLists(function() {
          return {
            ligGlyph: this.parseUShort(),
            components: this.parseUShortList(this.parseUShort() - 1)
          };
        })
      };
    }, "parseLookup42"), "parseLookup4");
    lookupRecordDesc = {
      sequenceIndex: Parser.uShort,
      lookupListIndex: Parser.uShort
    };
    subtableParsers$1[5] = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseLookup52() {
      var start = this.offset + this.relativeOffset;
      var substFormat = this.parseUShort();
      if (substFormat === 1) {
        return {
          substFormat,
          coverage: this.parsePointer(Parser.coverage),
          ruleSets: this.parseListOfLists(function() {
            var glyphCount2 = this.parseUShort();
            var substCount2 = this.parseUShort();
            return {
              input: this.parseUShortList(glyphCount2 - 1),
              lookupRecords: this.parseRecordList(
                substCount2,
                lookupRecordDesc
              )
            };
          })
        };
      } else if (substFormat === 2) {
        return {
          substFormat,
          coverage: this.parsePointer(Parser.coverage),
          classDef: this.parsePointer(Parser.classDef),
          classSets: this.parseListOfLists(function() {
            var glyphCount2 = this.parseUShort();
            var substCount2 = this.parseUShort();
            return {
              classes: this.parseUShortList(glyphCount2 - 1),
              lookupRecords: this.parseRecordList(
                substCount2,
                lookupRecordDesc
              )
            };
          })
        };
      } else if (substFormat === 3) {
        var glyphCount = this.parseUShort();
        var substCount = this.parseUShort();
        return {
          substFormat,
          coverages: this.parseList(
            glyphCount,
            Parser.pointer(Parser.coverage)
          ),
          lookupRecords: this.parseRecordList(substCount, lookupRecordDesc)
        };
      }
      check.assert(
        false,
        "0x" + start.toString(16) + ": lookup type 5 format must be 1, 2 or 3."
      );
    }, "parseLookup52"), "parseLookup5");
    subtableParsers$1[6] = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseLookup62() {
      var start = this.offset + this.relativeOffset;
      var substFormat = this.parseUShort();
      if (substFormat === 1) {
        return {
          substFormat: 1,
          coverage: this.parsePointer(Parser.coverage),
          chainRuleSets: this.parseListOfLists(function() {
            return {
              backtrack: this.parseUShortList(),
              input: this.parseUShortList(this.parseShort() - 1),
              lookahead: this.parseUShortList(),
              lookupRecords: this.parseRecordList(lookupRecordDesc)
            };
          })
        };
      } else if (substFormat === 2) {
        return {
          substFormat: 2,
          coverage: this.parsePointer(Parser.coverage),
          backtrackClassDef: this.parsePointer(Parser.classDef),
          inputClassDef: this.parsePointer(Parser.classDef),
          lookaheadClassDef: this.parsePointer(Parser.classDef),
          chainClassSet: this.parseListOfLists(function() {
            return {
              backtrack: this.parseUShortList(),
              input: this.parseUShortList(this.parseShort() - 1),
              lookahead: this.parseUShortList(),
              lookupRecords: this.parseRecordList(lookupRecordDesc)
            };
          })
        };
      } else if (substFormat === 3) {
        return {
          substFormat: 3,
          backtrackCoverage: this.parseList(Parser.pointer(Parser.coverage)),
          inputCoverage: this.parseList(Parser.pointer(Parser.coverage)),
          lookaheadCoverage: this.parseList(Parser.pointer(Parser.coverage)),
          lookupRecords: this.parseRecordList(lookupRecordDesc)
        };
      }
      check.assert(
        false,
        "0x" + start.toString(16) + ": lookup type 6 format must be 1, 2 or 3."
      );
    }, "parseLookup62"), "parseLookup6");
    subtableParsers$1[7] = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseLookup72() {
      var substFormat = this.parseUShort();
      check.argument(
        substFormat === 1,
        "GSUB Extension Substitution subtable identifier-format must be 1"
      );
      var extensionLookupType = this.parseUShort();
      var extensionParser = new Parser(
        this.data,
        this.offset + this.parseULong()
      );
      return {
        substFormat: 1,
        lookupType: extensionLookupType,
        extension: subtableParsers$1[extensionLookupType].call(extensionParser)
      };
    }, "parseLookup72"), "parseLookup7");
    subtableParsers$1[8] = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function parseLookup82() {
      var substFormat = this.parseUShort();
      check.argument(
        substFormat === 1,
        "GSUB Reverse Chaining Contextual Single Substitution Subtable identifier-format must be 1"
      );
      return {
        substFormat,
        coverage: this.parsePointer(Parser.coverage),
        backtrackCoverage: this.parseList(Parser.pointer(Parser.coverage)),
        lookaheadCoverage: this.parseList(Parser.pointer(Parser.coverage)),
        substitutes: this.parseUShortList()
      };
    }, "parseLookup82"), "parseLookup8");
    __name2(parseGsubTable, "parseGsubTable");
    gsub = { parse: parseGsubTable };
    __name2(parseHeadTable, "parseHeadTable");
    head = { parse: parseHeadTable };
    __name2(parseHheaTable, "parseHheaTable");
    hhea = { parse: parseHheaTable };
    __name2(parseHmtxTableAll, "parseHmtxTableAll");
    __name2(parseHmtxTableOnLowMemory, "parseHmtxTableOnLowMemory");
    __name2(parseHmtxTable, "parseHmtxTable");
    hmtx = { parse: parseHmtxTable };
    __name2(parseWindowsKernTable, "parseWindowsKernTable");
    __name2(parseMacKernTable, "parseMacKernTable");
    __name2(parseKernTable, "parseKernTable");
    kern = { parse: parseKernTable };
    __name2(parseLtagTable, "parseLtagTable");
    ltag = { parse: parseLtagTable };
    __name2(parseLocaTable, "parseLocaTable");
    loca = { parse: parseLocaTable };
    __name2(parseMaxpTable, "parseMaxpTable");
    maxp = { parse: parseMaxpTable };
    __name2(parseOS2Table, "parseOS2Table");
    os2 = { parse: parseOS2Table };
    __name2(parsePostTable, "parsePostTable");
    post = { parse: parsePostTable };
    decode = {};
    decode.UTF8 = function(data, offset, numBytes) {
      var codePoints = [];
      var numChars = numBytes;
      for (var j = 0; j < numChars; j++, offset += 1) {
        codePoints[j] = data.getUint8(offset);
      }
      return String.fromCharCode.apply(null, codePoints);
    };
    decode.UTF16 = function(data, offset, numBytes) {
      var codePoints = [];
      var numChars = numBytes / 2;
      for (var j = 0; j < numChars; j++, offset += 2) {
        codePoints[j] = data.getUint16(offset);
      }
      return String.fromCharCode.apply(null, codePoints);
    };
    eightBitMacEncodings = {
      "x-mac-croatian": (
        // Python: 'mac_croatian'
        "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\u0160\u2122\xB4\xA8\u2260\u017D\xD8\u221E\xB1\u2264\u2265\u2206\xB5\u2202\u2211\u220F\u0161\u222B\xAA\xBA\u03A9\u017E\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u0106\xAB\u010C\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u0110\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\uF8FF\xA9\u2044\u20AC\u2039\u203A\xC6\xBB\u2013\xB7\u201A\u201E\u2030\xC2\u0107\xC1\u010D\xC8\xCD\xCE\xCF\xCC\xD3\xD4\u0111\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u03C0\xCB\u02DA\xB8\xCA\xE6\u02C7"
      ),
      "x-mac-cyrillic": (
        // Python: 'mac_cyrillic'
        "\u0410\u0411\u0412\u0413\u0414\u0415\u0416\u0417\u0418\u0419\u041A\u041B\u041C\u041D\u041E\u041F\u0420\u0421\u0422\u0423\u0424\u0425\u0426\u0427\u0428\u0429\u042A\u042B\u042C\u042D\u042E\u042F\u2020\xB0\u0490\xA3\xA7\u2022\xB6\u0406\xAE\xA9\u2122\u0402\u0452\u2260\u0403\u0453\u221E\xB1\u2264\u2265\u0456\xB5\u0491\u0408\u0404\u0454\u0407\u0457\u0409\u0459\u040A\u045A\u0458\u0405\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\u040B\u045B\u040C\u045C\u0455\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u201E\u040E\u045E\u040F\u045F\u2116\u0401\u0451\u044F\u0430\u0431\u0432\u0433\u0434\u0435\u0436\u0437\u0438\u0439\u043A\u043B\u043C\u043D\u043E\u043F\u0440\u0441\u0442\u0443\u0444\u0445\u0446\u0447\u0448\u0449\u044A\u044B\u044C\u044D\u044E"
      ),
      "x-mac-gaelic": (
        // http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/GAELIC.TXT
        "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u1E02\xB1\u2264\u2265\u1E03\u010A\u010B\u1E0A\u1E0B\u1E1E\u1E1F\u0120\u0121\u1E40\xE6\xF8\u1E41\u1E56\u1E57\u027C\u0192\u017F\u1E60\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\u1E61\u1E9B\xFF\u0178\u1E6A\u20AC\u2039\u203A\u0176\u0177\u1E6B\xB7\u1EF2\u1EF3\u204A\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\u2663\xD2\xDA\xDB\xD9\u0131\xDD\xFD\u0174\u0175\u1E84\u1E85\u1E80\u1E81\u1E82\u1E83"
      ),
      "x-mac-greek": (
        // Python: 'mac_greek'
        "\xC4\xB9\xB2\xC9\xB3\xD6\xDC\u0385\xE0\xE2\xE4\u0384\xA8\xE7\xE9\xE8\xEA\xEB\xA3\u2122\xEE\xEF\u2022\xBD\u2030\xF4\xF6\xA6\u20AC\xF9\xFB\xFC\u2020\u0393\u0394\u0398\u039B\u039E\u03A0\xDF\xAE\xA9\u03A3\u03AA\xA7\u2260\xB0\xB7\u0391\xB1\u2264\u2265\xA5\u0392\u0395\u0396\u0397\u0399\u039A\u039C\u03A6\u03AB\u03A8\u03A9\u03AC\u039D\xAC\u039F\u03A1\u2248\u03A4\xAB\xBB\u2026\xA0\u03A5\u03A7\u0386\u0388\u0153\u2013\u2015\u201C\u201D\u2018\u2019\xF7\u0389\u038A\u038C\u038E\u03AD\u03AE\u03AF\u03CC\u038F\u03CD\u03B1\u03B2\u03C8\u03B4\u03B5\u03C6\u03B3\u03B7\u03B9\u03BE\u03BA\u03BB\u03BC\u03BD\u03BF\u03C0\u03CE\u03C1\u03C3\u03C4\u03B8\u03C9\u03C2\u03C7\u03C5\u03B6\u03CA\u03CB\u0390\u03B0\xAD"
      ),
      "x-mac-icelandic": (
        // Python: 'mac_iceland'
        "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\xDD\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\xE6\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u2044\u20AC\xD0\xF0\xDE\xFE\xFD\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7"
      ),
      "x-mac-inuit": (
        // http://unicode.org/Public/MAPPINGS/VENDORS/APPLE/INUIT.TXT
        "\u1403\u1404\u1405\u1406\u140A\u140B\u1431\u1432\u1433\u1434\u1438\u1439\u1449\u144E\u144F\u1450\u1451\u1455\u1456\u1466\u146D\u146E\u146F\u1470\u1472\u1473\u1483\u148B\u148C\u148D\u148E\u1490\u1491\xB0\u14A1\u14A5\u14A6\u2022\xB6\u14A7\xAE\xA9\u2122\u14A8\u14AA\u14AB\u14BB\u14C2\u14C3\u14C4\u14C5\u14C7\u14C8\u14D0\u14EF\u14F0\u14F1\u14F2\u14F4\u14F5\u1505\u14D5\u14D6\u14D7\u14D8\u14DA\u14DB\u14EA\u1528\u1529\u152A\u152B\u152D\u2026\xA0\u152E\u153E\u1555\u1556\u1557\u2013\u2014\u201C\u201D\u2018\u2019\u1558\u1559\u155A\u155D\u1546\u1547\u1548\u1549\u154B\u154C\u1550\u157F\u1580\u1581\u1582\u1583\u1584\u1585\u158F\u1590\u1591\u1592\u1593\u1594\u1595\u1671\u1672\u1673\u1674\u1675\u1676\u1596\u15A0\u15A1\u15A2\u15A3\u15A4\u15A5\u15A6\u157C\u0141\u0142"
      ),
      "x-mac-ce": (
        // Python: 'mac_latin2'
        "\xC4\u0100\u0101\xC9\u0104\xD6\xDC\xE1\u0105\u010C\xE4\u010D\u0106\u0107\xE9\u0179\u017A\u010E\xED\u010F\u0112\u0113\u0116\xF3\u0117\xF4\xF6\xF5\xFA\u011A\u011B\xFC\u2020\xB0\u0118\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\u0119\xA8\u2260\u0123\u012E\u012F\u012A\u2264\u2265\u012B\u0136\u2202\u2211\u0142\u013B\u013C\u013D\u013E\u0139\u013A\u0145\u0146\u0143\xAC\u221A\u0144\u0147\u2206\xAB\xBB\u2026\xA0\u0148\u0150\xD5\u0151\u014C\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\u014D\u0154\u0155\u0158\u2039\u203A\u0159\u0156\u0157\u0160\u201A\u201E\u0161\u015A\u015B\xC1\u0164\u0165\xCD\u017D\u017E\u016A\xD3\xD4\u016B\u016E\xDA\u016F\u0170\u0171\u0172\u0173\xDD\xFD\u0137\u017B\u0141\u017C\u0122\u02C7"
      ),
      macintosh: (
        // Python: 'mac_roman'
        "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\xE6\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u2044\u20AC\u2039\u203A\uFB01\uFB02\u2021\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7"
      ),
      "x-mac-romanian": (
        // Python: 'mac_romanian'
        "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\u0102\u0218\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\u0103\u0219\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u2044\u20AC\u2039\u203A\u021A\u021B\u2021\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\u0131\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7"
      ),
      "x-mac-turkish": (
        // Python: 'mac_turkish'
        "\xC4\xC5\xC7\xC9\xD1\xD6\xDC\xE1\xE0\xE2\xE4\xE3\xE5\xE7\xE9\xE8\xEA\xEB\xED\xEC\xEE\xEF\xF1\xF3\xF2\xF4\xF6\xF5\xFA\xF9\xFB\xFC\u2020\xB0\xA2\xA3\xA7\u2022\xB6\xDF\xAE\xA9\u2122\xB4\xA8\u2260\xC6\xD8\u221E\xB1\u2264\u2265\xA5\xB5\u2202\u2211\u220F\u03C0\u222B\xAA\xBA\u03A9\xE6\xF8\xBF\xA1\xAC\u221A\u0192\u2248\u2206\xAB\xBB\u2026\xA0\xC0\xC3\xD5\u0152\u0153\u2013\u2014\u201C\u201D\u2018\u2019\xF7\u25CA\xFF\u0178\u011E\u011F\u0130\u0131\u015E\u015F\u2021\xB7\u201A\u201E\u2030\xC2\xCA\xC1\xCB\xC8\xCD\xCE\xCF\xCC\xD3\xD4\uF8FF\xD2\xDA\xDB\xD9\uF8A0\u02C6\u02DC\xAF\u02D8\u02D9\u02DA\xB8\u02DD\u02DB\u02C7"
      )
    };
    decode.MACSTRING = function(dataView, offset, dataLength, encoding) {
      var table32 = eightBitMacEncodings[encoding];
      if (table32 === void 0) {
        return void 0;
      }
      var result = "";
      for (var i2 = 0; i2 < dataLength; i2++) {
        var c2 = dataView.getUint8(offset + i2);
        if (c2 <= 127) {
          result += String.fromCharCode(c2);
        } else {
          result += table32[c2 & 127];
        }
      }
      return result;
    };
    __name2(parseMetaTable, "parseMetaTable");
    meta = { parse: parseMetaTable };
    __name2(parseOpenTypeTableEntries, "parseOpenTypeTableEntries");
    __name2(parseWOFFTableEntries, "parseWOFFTableEntries");
    __name2(uncompressTable, "uncompressTable");
    __name2(parseBuffer, "parseBuffer");
    __name2(load2, "load");
    __name2(loadSync, "loadSync");
    opentype = /* @__PURE__ */ Object.freeze({
      __proto__: null,
      Font,
      Glyph,
      Path,
      _parse: parse,
      parse: parseBuffer,
      load: load2,
      loadSync
    });
    opentype_module_default = opentype;
  }
});
function Ri(e) {
  function t(i2, o, s) {
    let a = i2[o];
    i2[o] = function() {
      for (var u2 = arguments.length, f = new Array(u2), l2 = 0; l2 < u2; l2++) f[l2] = arguments[l2];
      return s.call(this, a, ...f);
    };
  }
  __name(t, "t");
  __name2(t, "t");
  for (let i2 of ["setPosition", "setMargin", "setFlexBasis", "setWidth", "setHeight", "setMinWidth", "setMinHeight", "setMaxWidth", "setMaxHeight", "setPadding", "setGap"]) {
    let o = { [ht.Point]: e.Node.prototype[i2], [ht.Percent]: e.Node.prototype[`${i2}Percent`], [ht.Auto]: e.Node.prototype[`${i2}Auto`] };
    t(e.Node.prototype, i2, function(s) {
      for (var a = arguments.length, u2 = new Array(a > 1 ? a - 1 : 0), f = 1; f < a; f++) u2[f - 1] = arguments[f];
      let l2 = u2.pop(), p, h2;
      if (l2 === "auto") p = ht.Auto, h2 = void 0;
      else if (typeof l2 == "object") p = l2.unit, h2 = l2.valueOf();
      else if (p = typeof l2 == "string" && l2.endsWith("%") ? ht.Percent : ht.Point, h2 = parseFloat(l2), l2 !== void 0 && !Number.isNaN(l2) && Number.isNaN(h2)) throw new Error(`Invalid value ${l2} for ${i2}`);
      if (!o[p]) throw new Error(`Failed to execute "${i2}": Unsupported unit '${l2}'`);
      return h2 !== void 0 ? o[p].call(this, ...u2, h2) : o[p].call(this, ...u2);
    });
  }
  function n(i2) {
    return e.MeasureCallback.implement({ measure: /* @__PURE__ */ __name2(function() {
      let { width: o, height: s } = i2(...arguments);
      return { width: o ?? NaN, height: s ?? NaN };
    }, "measure") });
  }
  __name(n, "n");
  __name2(n, "n");
  t(e.Node.prototype, "setMeasureFunc", function(i2, o) {
    return o ? i2.call(this, n(o)) : this.unsetMeasureFunc();
  });
  function r(i2) {
    return e.DirtiedCallback.implement({ dirtied: i2 });
  }
  __name(r, "r");
  __name2(r, "r");
  return t(e.Node.prototype, "setDirtiedFunc", function(i2, o) {
    i2.call(this, r(o));
  }), t(e.Config.prototype, "free", function() {
    e.Config.destroy(this);
  }), t(e.Node, "create", (i2, o) => o ? e.Node.createWithConfig(o) : e.Node.createDefault()), t(e.Node.prototype, "free", function() {
    e.Node.destroy(this);
  }), t(e.Node.prototype, "freeRecursive", function() {
    for (let i2 = 0, o = this.getChildCount(); i2 < o; ++i2) this.getChild(0).freeRecursive();
    this.free();
  }), t(e.Node.prototype, "calculateLayout", function(i2) {
    let o = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : NaN, s = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : NaN, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : Ar.LTR;
    return i2.call(this, o, s, a);
  }), { Config: e.Config, Node: e.Node, ...ga };
}
__name(Ri, "Ri");
function Sc(e) {
  e = e || {};
  var t;
  t || (t = typeof e < "u" ? e : {});
  var n, r;
  t.ready = new Promise(function(c2, d2) {
    n = c2, r = d2;
  });
  var i2 = Object.assign({}, t), o = "";
  typeof document < "u" && document.currentScript && (o = document.currentScript.src), va && (o = va), o.indexOf("blob:") !== 0 ? o = o.substr(0, o.replace(/[?#].*/, "").lastIndexOf("/") + 1) : o = "";
  var s = t.print || console.log.bind(console), a = t.printErr || console.warn.bind(console);
  Object.assign(t, i2), i2 = null;
  var u2;
  t.wasmBinary && (u2 = t.wasmBinary);
  var f = t.noExitRuntime || true;
  typeof WebAssembly != "object" && de("no native wasm support detected");
  var l2, p = false;
  function h2(c2, d2, m2) {
    m2 = d2 + m2;
    for (var v2 = ""; !(d2 >= m2); ) {
      var x22 = c2[d2++];
      if (!x22) break;
      if (x22 & 128) {
        var E = c2[d2++] & 63;
        if ((x22 & 224) == 192) v2 += String.fromCharCode((x22 & 31) << 6 | E);
        else {
          var P2 = c2[d2++] & 63;
          x22 = (x22 & 240) == 224 ? (x22 & 15) << 12 | E << 6 | P2 : (x22 & 7) << 18 | E << 12 | P2 << 6 | c2[d2++] & 63, 65536 > x22 ? v2 += String.fromCharCode(x22) : (x22 -= 65536, v2 += String.fromCharCode(55296 | x22 >> 10, 56320 | x22 & 1023));
        }
      } else v2 += String.fromCharCode(x22);
    }
    return v2;
  }
  __name(h2, "h2");
  __name2(h2, "h");
  var g2, b, y, k, S2, I, w2, T, O;
  function C() {
    var c2 = l2.buffer;
    g2 = c2, t.HEAP8 = b = new Int8Array(c2), t.HEAP16 = k = new Int16Array(c2), t.HEAP32 = I = new Int32Array(c2), t.HEAPU8 = y = new Uint8Array(c2), t.HEAPU16 = S2 = new Uint16Array(c2), t.HEAPU32 = w2 = new Uint32Array(c2), t.HEAPF32 = T = new Float32Array(c2), t.HEAPF64 = O = new Float64Array(c2);
  }
  __name(C, "C");
  __name2(C, "C");
  var D, q = [], Y = [], ue = [];
  function _e() {
    var c2 = t.preRun.shift();
    q.unshift(c2);
  }
  __name(_e, "_e");
  __name2(_e, "_e");
  var ce = 0, oe = null, ve = null;
  function de(c2) {
    throw t.onAbort && t.onAbort(c2), c2 = "Aborted(" + c2 + ")", a(c2), p = true, c2 = new WebAssembly.RuntimeError(c2 + ". Build with -sASSERTIONS for more info."), r(c2), c2;
  }
  __name(de, "de");
  __name2(de, "de");
  function le(c2) {
    return c2.startsWith("data:application/octet-stream;base64,");
  }
  __name(le, "le");
  __name2(le, "le");
  var ee = "";
  if (!le(ee)) {
    var Le = ee;
    ee = t.locateFile ? t.locateFile(Le, o) : o + Le;
  }
  function Oe() {
    var c2 = ee;
    try {
      if (c2 == ee && u2) return new Uint8Array(u2);
      if (le(c2)) try {
        var d2 = ec2(c2.slice(37)), m2 = new Uint8Array(d2.length);
        for (c2 = 0; c2 < d2.length; ++c2) m2[c2] = d2.charCodeAt(c2);
        var v2 = m2;
      } catch {
        throw Error("Converting base64 string to bytes failed.");
      }
      else v2 = void 0;
      var x22 = v2;
      if (x22) return x22;
      throw "both async and sync fetching of the wasm failed";
    } catch (E) {
      de(E);
    }
  }
  __name(Oe, "Oe");
  __name2(Oe, "Oe");
  function Te() {
    return u2 || typeof fetch != "function" ? Promise.resolve().then(function() {
      return Oe();
    }) : fetch(ee, { credentials: "same-origin" }).then(function(c2) {
      if (!c2.ok) throw "failed to load wasm binary file at '" + ee + "'";
      return c2.arrayBuffer();
    }).catch(function() {
      return Oe();
    });
  }
  __name(Te, "Te");
  __name2(Te, "Te");
  function _t(c2) {
    for (; 0 < c2.length; ) c2.shift()(t);
  }
  __name(_t, "_t");
  __name2(_t, "_t");
  function Me(c2) {
    if (c2 === void 0) return "_unknown";
    c2 = c2.replace(/[^a-zA-Z0-9_]/g, "$");
    var d2 = c2.charCodeAt(0);
    return 48 <= d2 && 57 >= d2 ? "_" + c2 : c2;
  }
  __name(Me, "Me");
  __name2(Me, "Me");
  function Je(c2, d2) {
    return c2 = Me(c2), function() {
      return d2.apply(this, arguments);
    };
  }
  __name(Je, "Je");
  __name2(Je, "Je");
  var Pe = [{}, { value: void 0 }, { value: null }, { value: true }, { value: false }], G = [];
  function Ie(c2) {
    var d2 = Error, m2 = Je(c2, function(v2) {
      this.name = c2, this.message = v2, v2 = Error(v2).stack, v2 !== void 0 && (this.stack = this.toString() + `
` + v2.replace(/^Error(:[^\n]*)?\n/, ""));
    });
    return m2.prototype = Object.create(d2.prototype), m2.prototype.constructor = m2, m2.prototype.toString = function() {
      return this.message === void 0 ? this.name : this.name + ": " + this.message;
    }, m2;
  }
  __name(Ie, "Ie");
  __name2(Ie, "Ie");
  var Re = void 0;
  function V(c2) {
    throw new Re(c2);
  }
  __name(V, "V");
  __name2(V, "V");
  var ut = /* @__PURE__ */ __name2((c2) => (c2 || V("Cannot use deleted val. handle = " + c2), Pe[c2].value), "ut"), Tt = /* @__PURE__ */ __name2((c2) => {
    switch (c2) {
      case void 0:
        return 1;
      case null:
        return 2;
      case true:
        return 3;
      case false:
        return 4;
      default:
        var d2 = G.length ? G.pop() : Pe.length;
        return Pe[d2] = { ga: 1, value: c2 }, d2;
    }
  }, "Tt"), $t = void 0, Sn = void 0;
  function Ee(c2) {
    for (var d2 = ""; y[c2]; ) d2 += Sn[y[c2++]];
    return d2;
  }
  __name(Ee, "Ee");
  __name2(Ee, "Ee");
  var gt = [];
  function qt() {
    for (; gt.length; ) {
      var c2 = gt.pop();
      c2.M.$ = false, c2.delete();
    }
  }
  __name(qt, "qt");
  __name2(qt, "qt");
  var Be = void 0, Ze = {};
  function ur(c2, d2) {
    for (d2 === void 0 && V("ptr should not be undefined"); c2.R; ) d2 = c2.ba(d2), c2 = c2.R;
    return d2;
  }
  __name(ur, "ur");
  __name2(ur, "ur");
  var bt = {};
  function lr(c2) {
    c2 = Ys(c2);
    var d2 = Ee(c2);
    return Rt(c2), d2;
  }
  __name(lr, "lr");
  __name2(lr, "lr");
  function _n(c2, d2) {
    var m2 = bt[c2];
    return m2 === void 0 && V(d2 + " has unknown type " + lr(c2)), m2;
  }
  __name(_n, "_n");
  __name2(_n, "_n");
  function kt() {
  }
  __name(kt, "kt");
  __name2(kt, "kt");
  var lt = false;
  function ft(c2) {
    --c2.count.value, c2.count.value === 0 && (c2.T ? c2.U.W(c2.T) : c2.P.N.W(c2.O));
  }
  __name(ft, "ft");
  __name2(ft, "ft");
  function He(c2, d2, m2) {
    return d2 === m2 ? c2 : m2.R === void 0 ? null : (c2 = He(c2, d2, m2.R), c2 === null ? null : m2.na(c2));
  }
  __name(He, "He");
  __name2(He, "He");
  var Kt = {};
  function ct(c2, d2) {
    return d2 = ur(c2, d2), Ze[d2];
  }
  __name(ct, "ct");
  __name2(ct, "ct");
  var Et = void 0;
  function Ot(c2) {
    throw new Et(c2);
  }
  __name(Ot, "Ot");
  __name2(Ot, "Ot");
  function Jt(c2, d2) {
    return d2.P && d2.O || Ot("makeClassHandle requires ptr and ptrType"), !!d2.U != !!d2.T && Ot("Both smartPtrType and smartPtr must be specified"), d2.count = { value: 1 }, dt(Object.create(c2, { M: { value: d2 } }));
  }
  __name(Jt, "Jt");
  __name2(Jt, "Jt");
  function dt(c2) {
    return typeof FinalizationRegistry > "u" ? (dt = /* @__PURE__ */ __name2((d2) => d2, "dt"), c2) : (lt = new FinalizationRegistry((d2) => {
      ft(d2.M);
    }), dt = /* @__PURE__ */ __name2((d2) => {
      var m2 = d2.M;
      return m2.T && lt.register(d2, { M: m2 }, d2), d2;
    }, "dt"), kt = /* @__PURE__ */ __name2((d2) => {
      lt.unregister(d2);
    }, "kt"), dt(c2));
  }
  __name(dt, "dt");
  __name2(dt, "dt");
  var $e = {};
  function Pt(c2) {
    for (; c2.length; ) {
      var d2 = c2.pop();
      c2.pop()(d2);
    }
  }
  __name(Pt, "Pt");
  __name2(Pt, "Pt");
  function qe(c2) {
    return this.fromWireType(I[c2 >> 2]);
  }
  __name(qe, "qe");
  __name2(qe, "qe");
  var At = {}, H = {};
  function j(c2, d2, m2) {
    function v2(A) {
      A = m2(A), A.length !== c2.length && Ot("Mismatched type converter count");
      for (var N = 0; N < c2.length; ++N) Q(c2[N], A[N]);
    }
    __name(v2, "v2");
    __name2(v2, "v");
    c2.forEach(function(A) {
      H[A] = d2;
    });
    var x22 = Array(d2.length), E = [], P2 = 0;
    d2.forEach((A, N) => {
      bt.hasOwnProperty(A) ? x22[N] = bt[A] : (E.push(A), At.hasOwnProperty(A) || (At[A] = []), At[A].push(() => {
        x22[N] = bt[A], ++P2, P2 === E.length && v2(x22);
      }));
    }), E.length === 0 && v2(x22);
  }
  __name(j, "j");
  __name2(j, "j");
  function se(c2) {
    switch (c2) {
      case 1:
        return 0;
      case 2:
        return 1;
      case 4:
        return 2;
      case 8:
        return 3;
      default:
        throw new TypeError("Unknown type size: " + c2);
    }
  }
  __name(se, "se");
  __name2(se, "se");
  function Q(c2, d2, m2 = {}) {
    if (!("argPackAdvance" in d2)) throw new TypeError("registerType registeredInstance requires argPackAdvance");
    var v2 = d2.name;
    if (c2 || V('type "' + v2 + '" must have a positive integer typeid pointer'), bt.hasOwnProperty(c2)) {
      if (m2.ua) return;
      V("Cannot register type '" + v2 + "' twice");
    }
    bt[c2] = d2, delete H[c2], At.hasOwnProperty(c2) && (d2 = At[c2], delete At[c2], d2.forEach((x22) => x22()));
  }
  __name(Q, "Q");
  __name2(Q, "Q");
  function ge(c2) {
    V(c2.M.P.N.name + " instance already deleted");
  }
  __name(ge, "ge");
  __name2(ge, "ge");
  function J() {
  }
  __name(J, "J");
  __name2(J, "J");
  function pe(c2, d2, m2) {
    if (c2[d2].S === void 0) {
      var v2 = c2[d2];
      c2[d2] = function() {
        return c2[d2].S.hasOwnProperty(arguments.length) || V("Function '" + m2 + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + c2[d2].S + ")!"), c2[d2].S[arguments.length].apply(this, arguments);
      }, c2[d2].S = [], c2[d2].S[v2.Z] = v2;
    }
  }
  __name(pe, "pe");
  __name2(pe, "pe");
  function ie(c2, d2) {
    t.hasOwnProperty(c2) ? (V("Cannot register public name '" + c2 + "' twice"), pe(t, c2, c2), t.hasOwnProperty(void 0) && V("Cannot register multiple overloads of a function with the same number of arguments (undefined)!"), t[c2].S[void 0] = d2) : t[c2] = d2;
  }
  __name(ie, "ie");
  __name2(ie, "ie");
  function te(c2, d2, m2, v2, x22, E, P2, A) {
    this.name = c2, this.constructor = d2, this.X = m2, this.W = v2, this.R = x22, this.pa = E, this.ba = P2, this.na = A, this.ja = [];
  }
  __name(te, "te");
  __name2(te, "te");
  function Ue(c2, d2, m2) {
    for (; d2 !== m2; ) d2.ba || V("Expected null or instance of " + m2.name + ", got an instance of " + d2.name), c2 = d2.ba(c2), d2 = d2.R;
    return c2;
  }
  __name(Ue, "Ue");
  __name2(Ue, "Ue");
  function K2(c2, d2) {
    return d2 === null ? (this.ea && V("null is not a valid " + this.name), 0) : (d2.M || V('Cannot pass "' + Qe(d2) + '" as a ' + this.name), d2.M.O || V("Cannot pass deleted object as a pointer of type " + this.name), Ue(d2.M.O, d2.M.P.N, this.N));
  }
  __name(K2, "K2");
  __name2(K2, "K");
  function vt(c2, d2) {
    if (d2 === null) {
      if (this.ea && V("null is not a valid " + this.name), this.da) {
        var m2 = this.fa();
        return c2 !== null && c2.push(this.W, m2), m2;
      }
      return 0;
    }
    if (d2.M || V('Cannot pass "' + Qe(d2) + '" as a ' + this.name), d2.M.O || V("Cannot pass deleted object as a pointer of type " + this.name), !this.ca && d2.M.P.ca && V("Cannot convert argument of type " + (d2.M.U ? d2.M.U.name : d2.M.P.name) + " to parameter type " + this.name), m2 = Ue(d2.M.O, d2.M.P.N, this.N), this.da) switch (d2.M.T === void 0 && V("Passing raw pointer to smart pointer is illegal"), this.Ba) {
      case 0:
        d2.M.U === this ? m2 = d2.M.T : V("Cannot convert argument of type " + (d2.M.U ? d2.M.U.name : d2.M.P.name) + " to parameter type " + this.name);
        break;
      case 1:
        m2 = d2.M.T;
        break;
      case 2:
        if (d2.M.U === this) m2 = d2.M.T;
        else {
          var v2 = d2.clone();
          m2 = this.xa(m2, Tt(function() {
            v2.delete();
          })), c2 !== null && c2.push(this.W, m2);
        }
        break;
      default:
        V("Unsupporting sharing policy");
    }
    return m2;
  }
  __name(vt, "vt");
  __name2(vt, "vt");
  function Ne(c2, d2) {
    return d2 === null ? (this.ea && V("null is not a valid " + this.name), 0) : (d2.M || V('Cannot pass "' + Qe(d2) + '" as a ' + this.name), d2.M.O || V("Cannot pass deleted object as a pointer of type " + this.name), d2.M.P.ca && V("Cannot convert argument of type " + d2.M.P.name + " to parameter type " + this.name), Ue(d2.M.O, d2.M.P.N, this.N));
  }
  __name(Ne, "Ne");
  __name2(Ne, "Ne");
  function Ye(c2, d2, m2, v2) {
    this.name = c2, this.N = d2, this.ea = m2, this.ca = v2, this.da = false, this.W = this.xa = this.fa = this.ka = this.Ba = this.wa = void 0, d2.R !== void 0 ? this.toWireType = vt : (this.toWireType = v2 ? K2 : Ne, this.V = null);
  }
  __name(Ye, "Ye");
  __name2(Ye, "Ye");
  function et2(c2, d2) {
    t.hasOwnProperty(c2) || Ot("Replacing nonexistant public symbol"), t[c2] = d2, t[c2].Z = void 0;
  }
  __name(et2, "et2");
  __name2(et2, "et");
  function fr(c2, d2) {
    var m2 = [];
    return function() {
      if (m2.length = 0, Object.assign(m2, arguments), c2.includes("j")) {
        var v2 = t["dynCall_" + c2];
        v2 = m2 && m2.length ? v2.apply(null, [d2].concat(m2)) : v2.call(null, d2);
      } else v2 = D.get(d2).apply(null, m2);
      return v2;
    };
  }
  __name(fr, "fr");
  __name2(fr, "fr");
  function we(c2, d2) {
    c2 = Ee(c2);
    var m2 = c2.includes("j") ? fr(c2, d2) : D.get(d2);
    return typeof m2 != "function" && V("unknown function pointer with signature " + c2 + ": " + d2), m2;
  }
  __name(we, "we");
  __name2(we, "we");
  var Ut = void 0;
  function be(c2, d2) {
    function m2(E) {
      x22[E] || bt[E] || (H[E] ? H[E].forEach(m2) : (v2.push(E), x22[E] = true));
    }
    __name(m2, "m2");
    __name2(m2, "m");
    var v2 = [], x22 = {};
    throw d2.forEach(m2), new Ut(c2 + ": " + v2.map(lr).join([", "]));
  }
  __name(be, "be");
  __name2(be, "be");
  function Se(c2, d2, m2, v2, x22) {
    var E = d2.length;
    2 > E && V("argTypes array size mismatch! Must at least get return value and 'this' types!");
    var P2 = d2[1] !== null && m2 !== null, A = false;
    for (m2 = 1; m2 < d2.length; ++m2) if (d2[m2] !== null && d2[m2].V === void 0) {
      A = true;
      break;
    }
    var N = d2[0].name !== "void", L = E - 2, F = Array(L), z = [], Z = [];
    return function() {
      if (arguments.length !== L && V("function " + c2 + " called with " + arguments.length + " arguments, expected " + L + " args!"), Z.length = 0, z.length = P2 ? 2 : 1, z[0] = x22, P2) {
        var ke = d2[1].toWireType(Z, this);
        z[1] = ke;
      }
      for (var ae = 0; ae < L; ++ae) F[ae] = d2[ae + 2].toWireType(Z, arguments[ae]), z.push(F[ae]);
      if (ae = v2.apply(null, z), A) Pt(Z);
      else for (var Ke = P2 ? 1 : 2; Ke < d2.length; Ke++) {
        var pt = Ke === 1 ? ke : F[Ke - 2];
        d2[Ke].V !== null && d2[Ke].V(pt);
      }
      return ke = N ? d2[0].fromWireType(ae) : void 0, ke;
    };
  }
  __name(Se, "Se");
  __name2(Se, "Se");
  function Xe(c2, d2) {
    for (var m2 = [], v2 = 0; v2 < c2; v2++) m2.push(w2[d2 + 4 * v2 >> 2]);
    return m2;
  }
  __name(Xe, "Xe");
  __name2(Xe, "Xe");
  function We(c2) {
    4 < c2 && --Pe[c2].ga === 0 && (Pe[c2] = void 0, G.push(c2));
  }
  __name(We, "We");
  __name2(We, "We");
  function Qe(c2) {
    if (c2 === null) return "null";
    var d2 = typeof c2;
    return d2 === "object" || d2 === "array" || d2 === "function" ? c2.toString() : "" + c2;
  }
  __name(Qe, "Qe");
  __name2(Qe, "Qe");
  function It(c2, d2) {
    switch (d2) {
      case 2:
        return function(m2) {
          return this.fromWireType(T[m2 >> 2]);
        };
      case 3:
        return function(m2) {
          return this.fromWireType(O[m2 >> 3]);
        };
      default:
        throw new TypeError("Unknown float type: " + c2);
    }
  }
  __name(It, "It");
  __name2(It, "It");
  function ze(c2, d2, m2) {
    switch (d2) {
      case 0:
        return m2 ? function(v2) {
          return b[v2];
        } : function(v2) {
          return y[v2];
        };
      case 1:
        return m2 ? function(v2) {
          return k[v2 >> 1];
        } : function(v2) {
          return S2[v2 >> 1];
        };
      case 2:
        return m2 ? function(v2) {
          return I[v2 >> 2];
        } : function(v2) {
          return w2[v2 >> 2];
        };
      default:
        throw new TypeError("Unknown integer type: " + c2);
    }
  }
  __name(ze, "ze");
  __name2(ze, "ze");
  function tt(c2, d2) {
    for (var m2 = "", v2 = 0; !(v2 >= d2 / 2); ++v2) {
      var x22 = k[c2 + 2 * v2 >> 1];
      if (x22 == 0) break;
      m2 += String.fromCharCode(x22);
    }
    return m2;
  }
  __name(tt, "tt");
  __name2(tt, "tt");
  function kr(c2, d2, m2) {
    if (m2 === void 0 && (m2 = 2147483647), 2 > m2) return 0;
    m2 -= 2;
    var v2 = d2;
    m2 = m2 < 2 * c2.length ? m2 / 2 : c2.length;
    for (var x22 = 0; x22 < m2; ++x22) k[d2 >> 1] = c2.charCodeAt(x22), d2 += 2;
    return k[d2 >> 1] = 0, d2 - v2;
  }
  __name(kr, "kr");
  __name2(kr, "kr");
  function cr(c2) {
    return 2 * c2.length;
  }
  __name(cr, "cr");
  __name2(cr, "cr");
  function Tn(c2, d2) {
    for (var m2 = 0, v2 = ""; !(m2 >= d2 / 4); ) {
      var x22 = I[c2 + 4 * m2 >> 2];
      if (x22 == 0) break;
      ++m2, 65536 <= x22 ? (x22 -= 65536, v2 += String.fromCharCode(55296 | x22 >> 10, 56320 | x22 & 1023)) : v2 += String.fromCharCode(x22);
    }
    return v2;
  }
  __name(Tn, "Tn");
  __name2(Tn, "Tn");
  function kn(c2, d2, m2) {
    if (m2 === void 0 && (m2 = 2147483647), 4 > m2) return 0;
    var v2 = d2;
    m2 = v2 + m2 - 4;
    for (var x22 = 0; x22 < c2.length; ++x22) {
      var E = c2.charCodeAt(x22);
      if (55296 <= E && 57343 >= E) {
        var P2 = c2.charCodeAt(++x22);
        E = 65536 + ((E & 1023) << 10) | P2 & 1023;
      }
      if (I[d2 >> 2] = E, d2 += 4, d2 + 4 > m2) break;
    }
    return I[d2 >> 2] = 0, d2 - v2;
  }
  __name(kn, "kn");
  __name2(kn, "kn");
  function En(c2) {
    for (var d2 = 0, m2 = 0; m2 < c2.length; ++m2) {
      var v2 = c2.charCodeAt(m2);
      55296 <= v2 && 57343 >= v2 && ++m2, d2 += 4;
    }
    return d2;
  }
  __name(En, "En");
  __name2(En, "En");
  var Qf = {};
  function js(c2) {
    var d2 = Qf[c2];
    return d2 === void 0 ? Ee(c2) : d2;
  }
  __name(js, "js");
  __name2(js, "js");
  var On = [];
  function Kf(c2) {
    var d2 = On.length;
    return On.push(c2), d2;
  }
  __name(Kf, "Kf");
  __name2(Kf, "Kf");
  function Jf(c2, d2) {
    for (var m2 = Array(c2), v2 = 0; v2 < c2; ++v2) m2[v2] = _n(w2[d2 + 4 * v2 >> 2], "parameter " + v2);
    return m2;
  }
  __name(Jf, "Jf");
  __name2(Jf, "Jf");
  var Vs = [], Zf = [null, [], []];
  Re = t.BindingError = Ie("BindingError"), t.count_emval_handles = function() {
    for (var c2 = 0, d2 = 5; d2 < Pe.length; ++d2) Pe[d2] !== void 0 && ++c2;
    return c2;
  }, t.get_first_emval = function() {
    for (var c2 = 5; c2 < Pe.length; ++c2) if (Pe[c2] !== void 0) return Pe[c2];
    return null;
  }, $t = t.PureVirtualError = Ie("PureVirtualError");
  for (var Hs = Array(256), Pn = 0; 256 > Pn; ++Pn) Hs[Pn] = String.fromCharCode(Pn);
  Sn = Hs, t.getInheritedInstanceCount = function() {
    return Object.keys(Ze).length;
  }, t.getLiveInheritedInstances = function() {
    var c2 = [], d2;
    for (d2 in Ze) Ze.hasOwnProperty(d2) && c2.push(Ze[d2]);
    return c2;
  }, t.flushPendingDeletes = qt, t.setDelayFunction = function(c2) {
    Be = c2, gt.length && Be && Be(qt);
  }, Et = t.InternalError = Ie("InternalError"), J.prototype.isAliasOf = function(c2) {
    if (!(this instanceof J && c2 instanceof J)) return false;
    var d2 = this.M.P.N, m2 = this.M.O, v2 = c2.M.P.N;
    for (c2 = c2.M.O; d2.R; ) m2 = d2.ba(m2), d2 = d2.R;
    for (; v2.R; ) c2 = v2.ba(c2), v2 = v2.R;
    return d2 === v2 && m2 === c2;
  }, J.prototype.clone = function() {
    if (this.M.O || ge(this), this.M.aa) return this.M.count.value += 1, this;
    var c2 = dt, d2 = Object, m2 = d2.create, v2 = Object.getPrototypeOf(this), x22 = this.M;
    return c2 = c2(m2.call(d2, v2, { M: { value: { count: x22.count, $: x22.$, aa: x22.aa, O: x22.O, P: x22.P, T: x22.T, U: x22.U } } })), c2.M.count.value += 1, c2.M.$ = false, c2;
  }, J.prototype.delete = function() {
    this.M.O || ge(this), this.M.$ && !this.M.aa && V("Object already scheduled for deletion"), kt(this), ft(this.M), this.M.aa || (this.M.T = void 0, this.M.O = void 0);
  }, J.prototype.isDeleted = function() {
    return !this.M.O;
  }, J.prototype.deleteLater = function() {
    return this.M.O || ge(this), this.M.$ && !this.M.aa && V("Object already scheduled for deletion"), gt.push(this), gt.length === 1 && Be && Be(qt), this.M.$ = true, this;
  }, Ye.prototype.qa = function(c2) {
    return this.ka && (c2 = this.ka(c2)), c2;
  }, Ye.prototype.ha = function(c2) {
    this.W && this.W(c2);
  }, Ye.prototype.argPackAdvance = 8, Ye.prototype.readValueFromPointer = qe, Ye.prototype.deleteObject = function(c2) {
    c2 !== null && c2.delete();
  }, Ye.prototype.fromWireType = function(c2) {
    function d2() {
      return this.da ? Jt(this.N.X, { P: this.wa, O: m2, U: this, T: c2 }) : Jt(this.N.X, { P: this, O: c2 });
    }
    __name(d2, "d2");
    __name2(d2, "d");
    var m2 = this.qa(c2);
    if (!m2) return this.ha(c2), null;
    var v2 = ct(this.N, m2);
    if (v2 !== void 0) return v2.M.count.value === 0 ? (v2.M.O = m2, v2.M.T = c2, v2.clone()) : (v2 = v2.clone(), this.ha(c2), v2);
    if (v2 = this.N.pa(m2), v2 = Kt[v2], !v2) return d2.call(this);
    v2 = this.ca ? v2.la : v2.pointerType;
    var x22 = He(m2, this.N, v2.N);
    return x22 === null ? d2.call(this) : this.da ? Jt(v2.N.X, { P: v2, O: x22, U: this, T: c2 }) : Jt(v2.N.X, { P: v2, O: x22 });
  }, Ut = t.UnboundTypeError = Ie("UnboundTypeError");
  var ec2 = typeof atob == "function" ? atob : function(c2) {
    var d2 = "", m2 = 0;
    c2 = c2.replace(/[^A-Za-z0-9\+\/=]/g, "");
    do {
      var v2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c2.charAt(m2++)), x22 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c2.charAt(m2++)), E = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c2.charAt(m2++)), P2 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(c2.charAt(m2++));
      v2 = v2 << 2 | x22 >> 4, x22 = (x22 & 15) << 4 | E >> 2;
      var A = (E & 3) << 6 | P2;
      d2 += String.fromCharCode(v2), E !== 64 && (d2 += String.fromCharCode(x22)), P2 !== 64 && (d2 += String.fromCharCode(A));
    } while (m2 < c2.length);
    return d2;
  }, tc = { l: /* @__PURE__ */ __name2(function(c2, d2, m2, v2) {
    de("Assertion failed: " + (c2 ? h2(y, c2) : "") + ", at: " + [d2 ? d2 ? h2(y, d2) : "" : "unknown filename", m2, v2 ? v2 ? h2(y, v2) : "" : "unknown function"]);
  }, "l"), q: /* @__PURE__ */ __name2(function(c2, d2, m2) {
    c2 = Ee(c2), d2 = _n(d2, "wrapper"), m2 = ut(m2);
    var v2 = [].slice, x22 = d2.N, E = x22.X, P2 = x22.R.X, A = x22.R.constructor;
    c2 = Je(c2, function() {
      x22.R.ja.forEach(function(L) {
        if (this[L] === P2[L]) throw new $t("Pure virtual function " + L + " must be implemented in JavaScript");
      }.bind(this)), Object.defineProperty(this, "__parent", { value: E }), this.__construct.apply(this, v2.call(arguments));
    }), E.__construct = function() {
      this === E && V("Pass correct 'this' to __construct");
      var L = A.implement.apply(void 0, [this].concat(v2.call(arguments)));
      kt(L);
      var F = L.M;
      L.notifyOnDestruction(), F.aa = true, Object.defineProperties(this, { M: { value: F } }), dt(this), L = F.O, L = ur(x22, L), Ze.hasOwnProperty(L) ? V("Tried to register registered instance: " + L) : Ze[L] = this;
    }, E.__destruct = function() {
      this === E && V("Pass correct 'this' to __destruct"), kt(this);
      var L = this.M.O;
      L = ur(x22, L), Ze.hasOwnProperty(L) ? delete Ze[L] : V("Tried to unregister unregistered instance: " + L);
    }, c2.prototype = Object.create(E);
    for (var N in m2) c2.prototype[N] = m2[N];
    return Tt(c2);
  }, "q"), j: /* @__PURE__ */ __name2(function(c2) {
    var d2 = $e[c2];
    delete $e[c2];
    var m2 = d2.fa, v2 = d2.W, x22 = d2.ia, E = x22.map((P2) => P2.ta).concat(x22.map((P2) => P2.za));
    j([c2], E, (P2) => {
      var A = {};
      return x22.forEach((N, L) => {
        var F = P2[L], z = N.ra, Z = N.sa, ke = P2[L + x22.length], ae = N.ya, Ke = N.Aa;
        A[N.oa] = { read: /* @__PURE__ */ __name2((pt) => F.fromWireType(z(Z, pt)), "read"), write: /* @__PURE__ */ __name2((pt, Er) => {
          var Ct = [];
          ae(Ke, pt, ke.toWireType(Ct, Er)), Pt(Ct);
        }, "write") };
      }), [{ name: d2.name, fromWireType: /* @__PURE__ */ __name2(function(N) {
        var L = {}, F;
        for (F in A) L[F] = A[F].read(N);
        return v2(N), L;
      }, "fromWireType"), toWireType: /* @__PURE__ */ __name2(function(N, L) {
        for (var F in A) if (!(F in L)) throw new TypeError('Missing field:  "' + F + '"');
        var z = m2();
        for (F in A) A[F].write(z, L[F]);
        return N !== null && N.push(v2, z), z;
      }, "toWireType"), argPackAdvance: 8, readValueFromPointer: qe, V: v2 }];
    });
  }, "j"), v: /* @__PURE__ */ __name2(function() {
  }, "v"), B: /* @__PURE__ */ __name2(function(c2, d2, m2, v2, x22) {
    var E = se(m2);
    d2 = Ee(d2), Q(c2, { name: d2, fromWireType: /* @__PURE__ */ __name2(function(P2) {
      return !!P2;
    }, "fromWireType"), toWireType: /* @__PURE__ */ __name2(function(P2, A) {
      return A ? v2 : x22;
    }, "toWireType"), argPackAdvance: 8, readValueFromPointer: /* @__PURE__ */ __name2(function(P2) {
      if (m2 === 1) var A = b;
      else if (m2 === 2) A = k;
      else if (m2 === 4) A = I;
      else throw new TypeError("Unknown boolean type size: " + d2);
      return this.fromWireType(A[P2 >> E]);
    }, "readValueFromPointer"), V: null });
  }, "B"), f: /* @__PURE__ */ __name2(function(c2, d2, m2, v2, x22, E, P2, A, N, L, F, z, Z) {
    F = Ee(F), E = we(x22, E), A && (A = we(P2, A)), L && (L = we(N, L)), Z = we(z, Z);
    var ke = Me(F);
    ie(ke, function() {
      be("Cannot construct " + F + " due to unbound types", [v2]);
    }), j([c2, d2, m2], v2 ? [v2] : [], function(ae) {
      if (ae = ae[0], v2) var Ke = ae.N, pt = Ke.X;
      else pt = J.prototype;
      ae = Je(ke, function() {
        if (Object.getPrototypeOf(this) !== Er) throw new Re("Use 'new' to construct " + F);
        if (Ct.Y === void 0) throw new Re(F + " has no accessible constructor");
        var Ks = Ct.Y[arguments.length];
        if (Ks === void 0) throw new Re("Tried to invoke ctor of " + F + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(Ct.Y).toString() + ") parameters instead!");
        return Ks.apply(this, arguments);
      });
      var Er = Object.create(pt, { constructor: { value: ae } });
      ae.prototype = Er;
      var Ct = new te(F, ae, Er, Z, Ke, E, A, L);
      Ke = new Ye(F, Ct, true, false), pt = new Ye(F + "*", Ct, false, false);
      var Qs = new Ye(F + " const*", Ct, false, true);
      return Kt[c2] = { pointerType: pt, la: Qs }, et2(ke, ae), [Ke, pt, Qs];
    });
  }, "f"), d: /* @__PURE__ */ __name2(function(c2, d2, m2, v2, x22, E, P2) {
    var A = Xe(m2, v2);
    d2 = Ee(d2), E = we(x22, E), j([], [c2], function(N) {
      function L() {
        be("Cannot call " + F + " due to unbound types", A);
      }
      __name(L, "L");
      __name2(L, "L");
      N = N[0];
      var F = N.name + "." + d2;
      d2.startsWith("@@") && (d2 = Symbol[d2.substring(2)]);
      var z = N.N.constructor;
      return z[d2] === void 0 ? (L.Z = m2 - 1, z[d2] = L) : (pe(z, d2, F), z[d2].S[m2 - 1] = L), j([], A, function(Z) {
        return Z = Se(F, [Z[0], null].concat(Z.slice(1)), null, E, P2), z[d2].S === void 0 ? (Z.Z = m2 - 1, z[d2] = Z) : z[d2].S[m2 - 1] = Z, [];
      }), [];
    });
  }, "d"), p: /* @__PURE__ */ __name2(function(c2, d2, m2, v2, x22, E) {
    0 < d2 || de();
    var P2 = Xe(d2, m2);
    x22 = we(v2, x22), j([], [c2], function(A) {
      A = A[0];
      var N = "constructor " + A.name;
      if (A.N.Y === void 0 && (A.N.Y = []), A.N.Y[d2 - 1] !== void 0) throw new Re("Cannot register multiple constructors with identical number of parameters (" + (d2 - 1) + ") for class '" + A.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
      return A.N.Y[d2 - 1] = () => {
        be("Cannot construct " + A.name + " due to unbound types", P2);
      }, j([], P2, function(L) {
        return L.splice(1, 0, null), A.N.Y[d2 - 1] = Se(N, L, null, x22, E), [];
      }), [];
    });
  }, "p"), a: /* @__PURE__ */ __name2(function(c2, d2, m2, v2, x22, E, P2, A) {
    var N = Xe(m2, v2);
    d2 = Ee(d2), E = we(x22, E), j([], [c2], function(L) {
      function F() {
        be("Cannot call " + z + " due to unbound types", N);
      }
      __name(F, "F");
      __name2(F, "F");
      L = L[0];
      var z = L.name + "." + d2;
      d2.startsWith("@@") && (d2 = Symbol[d2.substring(2)]), A && L.N.ja.push(d2);
      var Z = L.N.X, ke = Z[d2];
      return ke === void 0 || ke.S === void 0 && ke.className !== L.name && ke.Z === m2 - 2 ? (F.Z = m2 - 2, F.className = L.name, Z[d2] = F) : (pe(Z, d2, z), Z[d2].S[m2 - 2] = F), j([], N, function(ae) {
        return ae = Se(z, ae, L, E, P2), Z[d2].S === void 0 ? (ae.Z = m2 - 2, Z[d2] = ae) : Z[d2].S[m2 - 2] = ae, [];
      }), [];
    });
  }, "a"), A: /* @__PURE__ */ __name2(function(c2, d2) {
    d2 = Ee(d2), Q(c2, { name: d2, fromWireType: /* @__PURE__ */ __name2(function(m2) {
      var v2 = ut(m2);
      return We(m2), v2;
    }, "fromWireType"), toWireType: /* @__PURE__ */ __name2(function(m2, v2) {
      return Tt(v2);
    }, "toWireType"), argPackAdvance: 8, readValueFromPointer: qe, V: null });
  }, "A"), n: /* @__PURE__ */ __name2(function(c2, d2, m2) {
    m2 = se(m2), d2 = Ee(d2), Q(c2, { name: d2, fromWireType: /* @__PURE__ */ __name2(function(v2) {
      return v2;
    }, "fromWireType"), toWireType: /* @__PURE__ */ __name2(function(v2, x22) {
      return x22;
    }, "toWireType"), argPackAdvance: 8, readValueFromPointer: It(d2, m2), V: null });
  }, "n"), e: /* @__PURE__ */ __name2(function(c2, d2, m2, v2, x22) {
    d2 = Ee(d2), x22 === -1 && (x22 = 4294967295), x22 = se(m2);
    var E = /* @__PURE__ */ __name2((A) => A, "E");
    if (v2 === 0) {
      var P2 = 32 - 8 * m2;
      E = /* @__PURE__ */ __name2((A) => A << P2 >>> P2, "E");
    }
    m2 = d2.includes("unsigned") ? function(A, N) {
      return N >>> 0;
    } : function(A, N) {
      return N;
    }, Q(c2, { name: d2, fromWireType: E, toWireType: m2, argPackAdvance: 8, readValueFromPointer: ze(d2, x22, v2 !== 0), V: null });
  }, "e"), b: /* @__PURE__ */ __name2(function(c2, d2, m2) {
    function v2(E) {
      E >>= 2;
      var P2 = w2;
      return new x22(g2, P2[E + 1], P2[E]);
    }
    __name(v2, "v2");
    __name2(v2, "v");
    var x22 = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array][d2];
    m2 = Ee(m2), Q(c2, { name: m2, fromWireType: v2, argPackAdvance: 8, readValueFromPointer: v2 }, { ua: true });
  }, "b"), o: /* @__PURE__ */ __name2(function(c2, d2) {
    d2 = Ee(d2);
    var m2 = d2 === "std::string";
    Q(c2, { name: d2, fromWireType: /* @__PURE__ */ __name2(function(v2) {
      var x22 = w2[v2 >> 2], E = v2 + 4;
      if (m2) for (var P2 = E, A = 0; A <= x22; ++A) {
        var N = E + A;
        if (A == x22 || y[N] == 0) {
          if (P2 = P2 ? h2(y, P2, N - P2) : "", L === void 0) var L = P2;
          else L += String.fromCharCode(0), L += P2;
          P2 = N + 1;
        }
      }
      else {
        for (L = Array(x22), A = 0; A < x22; ++A) L[A] = String.fromCharCode(y[E + A]);
        L = L.join("");
      }
      return Rt(v2), L;
    }, "fromWireType"), toWireType: /* @__PURE__ */ __name2(function(v2, x22) {
      x22 instanceof ArrayBuffer && (x22 = new Uint8Array(x22));
      var E, P2 = typeof x22 == "string";
      if (P2 || x22 instanceof Uint8Array || x22 instanceof Uint8ClampedArray || x22 instanceof Int8Array || V("Cannot pass non-string to std::string"), m2 && P2) {
        var A = 0;
        for (E = 0; E < x22.length; ++E) {
          var N = x22.charCodeAt(E);
          127 >= N ? A++ : 2047 >= N ? A += 2 : 55296 <= N && 57343 >= N ? (A += 4, ++E) : A += 3;
        }
        E = A;
      } else E = x22.length;
      if (A = vi(4 + E + 1), N = A + 4, w2[A >> 2] = E, m2 && P2) {
        if (P2 = N, N = E + 1, E = y, 0 < N) {
          N = P2 + N - 1;
          for (var L = 0; L < x22.length; ++L) {
            var F = x22.charCodeAt(L);
            if (55296 <= F && 57343 >= F) {
              var z = x22.charCodeAt(++L);
              F = 65536 + ((F & 1023) << 10) | z & 1023;
            }
            if (127 >= F) {
              if (P2 >= N) break;
              E[P2++] = F;
            } else {
              if (2047 >= F) {
                if (P2 + 1 >= N) break;
                E[P2++] = 192 | F >> 6;
              } else {
                if (65535 >= F) {
                  if (P2 + 2 >= N) break;
                  E[P2++] = 224 | F >> 12;
                } else {
                  if (P2 + 3 >= N) break;
                  E[P2++] = 240 | F >> 18, E[P2++] = 128 | F >> 12 & 63;
                }
                E[P2++] = 128 | F >> 6 & 63;
              }
              E[P2++] = 128 | F & 63;
            }
          }
          E[P2] = 0;
        }
      } else if (P2) for (P2 = 0; P2 < E; ++P2) L = x22.charCodeAt(P2), 255 < L && (Rt(N), V("String has UTF-16 code units that do not fit in 8 bits")), y[N + P2] = L;
      else for (P2 = 0; P2 < E; ++P2) y[N + P2] = x22[P2];
      return v2 !== null && v2.push(Rt, A), A;
    }, "toWireType"), argPackAdvance: 8, readValueFromPointer: qe, V: /* @__PURE__ */ __name2(function(v2) {
      Rt(v2);
    }, "V") });
  }, "o"), i: /* @__PURE__ */ __name2(function(c2, d2, m2) {
    if (m2 = Ee(m2), d2 === 2) var v2 = tt, x22 = kr, E = cr, P2 = /* @__PURE__ */ __name2(() => S2, "P"), A = 1;
    else d2 === 4 && (v2 = Tn, x22 = kn, E = En, P2 = /* @__PURE__ */ __name2(() => w2, "P"), A = 2);
    Q(c2, { name: m2, fromWireType: /* @__PURE__ */ __name2(function(N) {
      for (var L = w2[N >> 2], F = P2(), z, Z = N + 4, ke = 0; ke <= L; ++ke) {
        var ae = N + 4 + ke * d2;
        (ke == L || F[ae >> A] == 0) && (Z = v2(Z, ae - Z), z === void 0 ? z = Z : (z += String.fromCharCode(0), z += Z), Z = ae + d2);
      }
      return Rt(N), z;
    }, "fromWireType"), toWireType: /* @__PURE__ */ __name2(function(N, L) {
      typeof L != "string" && V("Cannot pass non-string to C++ string type " + m2);
      var F = E(L), z = vi(4 + F + d2);
      return w2[z >> 2] = F >> A, x22(L, z + 4, F + d2), N !== null && N.push(Rt, z), z;
    }, "toWireType"), argPackAdvance: 8, readValueFromPointer: qe, V: /* @__PURE__ */ __name2(function(N) {
      Rt(N);
    }, "V") });
  }, "i"), k: /* @__PURE__ */ __name2(function(c2, d2, m2, v2, x22, E) {
    $e[c2] = { name: Ee(d2), fa: we(m2, v2), W: we(x22, E), ia: [] };
  }, "k"), h: /* @__PURE__ */ __name2(function(c2, d2, m2, v2, x22, E, P2, A, N, L) {
    $e[c2].ia.push({ oa: Ee(d2), ta: m2, ra: we(v2, x22), sa: E, za: P2, ya: we(A, N), Aa: L });
  }, "h"), C: /* @__PURE__ */ __name2(function(c2, d2) {
    d2 = Ee(d2), Q(c2, { va: true, name: d2, argPackAdvance: 0, fromWireType: /* @__PURE__ */ __name2(function() {
    }, "fromWireType"), toWireType: /* @__PURE__ */ __name2(function() {
    }, "toWireType") });
  }, "C"), s: /* @__PURE__ */ __name2(function(c2, d2, m2, v2, x22) {
    c2 = On[c2], d2 = ut(d2), m2 = js(m2);
    var E = [];
    return w2[v2 >> 2] = Tt(E), c2(d2, m2, E, x22);
  }, "s"), t: /* @__PURE__ */ __name2(function(c2, d2, m2, v2) {
    c2 = On[c2], d2 = ut(d2), m2 = js(m2), c2(d2, m2, null, v2);
  }, "t"), g: We, m: /* @__PURE__ */ __name2(function(c2, d2) {
    var m2 = Jf(c2, d2), v2 = m2[0];
    d2 = v2.name + "_$" + m2.slice(1).map(function(P2) {
      return P2.name;
    }).join("_") + "$";
    var x22 = Vs[d2];
    if (x22 !== void 0) return x22;
    var E = Array(c2 - 1);
    return x22 = Kf((P2, A, N, L) => {
      for (var F = 0, z = 0; z < c2 - 1; ++z) E[z] = m2[z + 1].readValueFromPointer(L + F), F += m2[z + 1].argPackAdvance;
      for (P2 = P2[A].apply(P2, E), z = 0; z < c2 - 1; ++z) m2[z + 1].ma && m2[z + 1].ma(E[z]);
      if (!v2.va) return v2.toWireType(N, P2);
    }), Vs[d2] = x22;
  }, "m"), D: /* @__PURE__ */ __name2(function(c2) {
    4 < c2 && (Pe[c2].ga += 1);
  }, "D"), r: /* @__PURE__ */ __name2(function(c2) {
    var d2 = ut(c2);
    Pt(d2), We(c2);
  }, "r"), c: /* @__PURE__ */ __name2(function() {
    de("");
  }, "c"), x: /* @__PURE__ */ __name2(function(c2, d2, m2) {
    y.copyWithin(c2, d2, d2 + m2);
  }, "x"), w: /* @__PURE__ */ __name2(function(c2) {
    var d2 = y.length;
    if (c2 >>>= 0, 2147483648 < c2) return false;
    for (var m2 = 1; 4 >= m2; m2 *= 2) {
      var v2 = d2 * (1 + 0.2 / m2);
      v2 = Math.min(v2, c2 + 100663296);
      var x22 = Math;
      v2 = Math.max(c2, v2), x22 = x22.min.call(x22, 2147483648, v2 + (65536 - v2 % 65536) % 65536);
      e: {
        try {
          l2.grow(x22 - g2.byteLength + 65535 >>> 16), C();
          var E = 1;
          break e;
        } catch {
        }
        E = void 0;
      }
      if (E) return true;
    }
    return false;
  }, "w"), z: /* @__PURE__ */ __name2(function() {
    return 52;
  }, "z"), u: /* @__PURE__ */ __name2(function() {
    return 70;
  }, "u"), y: /* @__PURE__ */ __name2(function(c2, d2, m2, v2) {
    for (var x22 = 0, E = 0; E < m2; E++) {
      var P2 = w2[d2 >> 2], A = w2[d2 + 4 >> 2];
      d2 += 8;
      for (var N = 0; N < A; N++) {
        var L = y[P2 + N], F = Zf[c2];
        L === 0 || L === 10 ? ((c2 === 1 ? s : a)(h2(F, 0)), F.length = 0) : F.push(L);
      }
      x22 += A;
    }
    return w2[v2 >> 2] = x22, 0;
  }, "y") };
  (function() {
    function c2(x22) {
      t.asm = x22.exports, l2 = t.asm.E, C(), D = t.asm.J, Y.unshift(t.asm.F), ce--, t.monitorRunDependencies && t.monitorRunDependencies(ce), ce == 0 && (oe !== null && (clearInterval(oe), oe = null), ve && (x22 = ve, ve = null, x22()));
    }
    __name(c2, "c2");
    __name2(c2, "c");
    function d2(x22) {
      c2(x22.instance);
    }
    __name(d2, "d2");
    __name2(d2, "d");
    function m2(x22) {
      return Te().then(function(E) {
        return E instanceof WebAssembly.Instance ? E : WebAssembly.instantiate(E, v2);
      }).then(function(E) {
        return E;
      }).then(x22, function(E) {
        a("failed to asynchronously prepare wasm: " + E), de(E);
      });
    }
    __name(m2, "m2");
    __name2(m2, "m");
    var v2 = { a: tc };
    if (ce++, t.monitorRunDependencies && t.monitorRunDependencies(ce), t.instantiateWasm) try {
      return t.instantiateWasm(v2, c2);
    } catch (x22) {
      a("Module.instantiateWasm callback failed with error: " + x22), r(x22);
    }
    return (function() {
      return u2 || typeof WebAssembly.instantiateStreaming != "function" || le(ee) || typeof fetch != "function" ? m2(d2) : fetch(ee, { credentials: "same-origin" }).then(function(x22) {
        return WebAssembly.instantiateStreaming(x22, v2).then(d2, function(E) {
          return a("wasm streaming compile failed: " + E), a("falling back to ArrayBuffer instantiation"), m2(d2);
        });
      });
    })().catch(r), {};
  })(), t.___wasm_call_ctors = function() {
    return (t.___wasm_call_ctors = t.asm.F).apply(null, arguments);
  };
  var Ys = t.___getTypeName = function() {
    return (Ys = t.___getTypeName = t.asm.G).apply(null, arguments);
  };
  t.__embind_initialize_bindings = function() {
    return (t.__embind_initialize_bindings = t.asm.H).apply(null, arguments);
  };
  var vi = t._malloc = function() {
    return (vi = t._malloc = t.asm.I).apply(null, arguments);
  }, Rt = t._free = function() {
    return (Rt = t._free = t.asm.K).apply(null, arguments);
  };
  t.dynCall_jiji = function() {
    return (t.dynCall_jiji = t.asm.L).apply(null, arguments);
  };
  var An;
  ve = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function c2() {
    An || Xs(), An || (ve = c2);
  }, "c2"), "c");
  function Xs() {
    function c2() {
      if (!An && (An = true, t.calledRun = true, !p)) {
        if (_t(Y), n(t), t.onRuntimeInitialized && t.onRuntimeInitialized(), t.postRun) for (typeof t.postRun == "function" && (t.postRun = [t.postRun]); t.postRun.length; ) {
          var d2 = t.postRun.shift();
          ue.unshift(d2);
        }
        _t(ue);
      }
    }
    __name(c2, "c2");
    __name2(c2, "c");
    if (!(0 < ce)) {
      if (t.preRun) for (typeof t.preRun == "function" && (t.preRun = [t.preRun]); t.preRun.length; ) _e();
      _t(q), 0 < ce || (t.setStatus ? (t.setStatus("Running..."), setTimeout(function() {
        setTimeout(function() {
          t.setStatus("");
        }, 1), c2();
      }, 1)) : c2());
    }
  }
  __name(Xs, "Xs");
  __name2(Xs, "Xs");
  if (t.preInit) for (typeof t.preInit == "function" && (t.preInit = [t.preInit]); 0 < t.preInit.length; ) t.preInit.pop()();
  return Xs(), e.ready;
}
__name(Sc, "Sc");
async function wa(e) {
  let { default: t } = await Promise.resolve().then(() => (xa(), ya));
  return Ri(await t(e));
}
__name(wa, "wa");
async function kc(e, t) {
  let n = e;
  if ((typeof n == "string" || typeof Request == "function" && n instanceof Request || typeof URL == "function" && n instanceof URL) && (n = await fetch(n)), typeof Response == "function" && n instanceof Response) {
    if (typeof WebAssembly.instantiateStreaming == "function") try {
      return await WebAssembly.instantiateStreaming(n, t);
    } catch (o) {
      n.headers.get("Content-Type") !== "application/wasm" && console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", o);
    }
    let i2 = await n.arrayBuffer();
    return await WebAssembly.instantiate(i2, t);
  }
  let r = await WebAssembly.instantiate("buffer" in n ? n.buffer.slice(n.byteOffset, n.byteOffset + n.byteLength) : n, t);
  return r instanceof WebAssembly.Instance ? { instance: r, module: n } : r;
}
__name(kc, "kc");
function Ec(e) {
  _c({ instantiateWasm(t, n) {
    return kc(e, t).then(({ instance: r }) => {
      n(r);
    }).catch(Ci), {};
  } }).then(_a2).catch(Ci);
}
__name(Ec, "Ec");
function Oc() {
  return Tc;
}
__name(Oc, "Oc");
function xi(e) {
  if (/\.\D?$/.test(e)) throw new Error("The dot should be followed by a number");
  if (/^[+-]{2}/.test(e)) throw new Error("Only one leading +/- is allowed");
  if (hc(e) > 1) throw new Error("Only one dot is allowed");
  if (/%$/.test(e)) {
    this.type = "percentage", this.value = yi(e), this.unit = "%";
    return;
  }
  var t = gc(e);
  if (!t) {
    this.type = "number", this.value = yi(e);
    return;
  }
  this.type = vc(t), this.value = yi(e.substr(0, e.length - t.length)), this.unit = t;
}
__name(xi, "xi");
function Lt(e) {
  return new xi(e);
}
__name(Lt, "Lt");
function hc(e) {
  var t = e.match(/\./g);
  return t ? t.length : 0;
}
__name(hc, "hc");
function yi(e) {
  var t = parseFloat(e);
  if (isNaN(t)) throw new Error("Invalid number: " + e);
  return t;
}
__name(yi, "yi");
function gc(e) {
  var t = e.match(/\D+$/), n = t && t[0];
  if (n && mc.indexOf(n) === -1) throw new Error("Invalid unit: " + n);
  return n;
}
__name(gc, "gc");
function Ln(e, t) {
  return Object.fromEntries(e.map((n) => [n, t]));
}
__name(Ln, "Ln");
function vc(e) {
  return bc[e] || "length";
}
__name(vc, "vc");
function dr(e) {
  let t = typeof e;
  return !(t === "number" || t === "bigint" || t === "string" || t === "boolean");
}
__name(dr, "dr");
function na(e) {
  return /^class\s/.test(e.toString());
}
__name(na, "na");
function _i(e) {
  return e && e.$$typeof === /* @__PURE__ */ Symbol.for("react.forward_ref");
}
__name(_i, "_i");
function ia(e) {
  return typeof e == "function" || _i(e);
}
__name(ia, "ia");
function oa(e) {
  return "dangerouslySetInnerHTML" in e;
}
__name(oa, "oa");
function sa(e) {
  let t = typeof e > "u" ? [] : [].concat(e).flat(1 / 0), n = [];
  for (let r = 0; r < t.length; r++) {
    let i2 = t[r];
    typeof i2 > "u" || typeof i2 == "boolean" || i2 === null || (typeof i2 == "number" && (i2 = String(i2)), typeof i2 == "string" && n.length && typeof n[n.length - 1] == "string" ? n[n.length - 1] += i2 : n.push(i2));
  }
  return n;
}
__name(sa, "sa");
function X(e, t, n, r, i2 = false) {
  if (typeof e == "number") return e;
  try {
    if (e = e.trim(), /[ /\(,]/.test(e)) return;
    if (e === String(+e)) return +e;
    let o = new Lt(e);
    if (o.type === "length") switch (o.unit) {
      case "em":
        return o.value * t;
      case "rem":
        return o.value * 16;
      case "vw":
        return ~~(o.value * r._viewportWidth / 100);
      case "vh":
        return ~~(o.value * r._viewportHeight / 100);
      default:
        return o.value;
    }
    else {
      if (o.type === "angle") return Ti(e);
      if (o.type === "percentage" && i2) return o.value / 100 * n;
    }
  } catch {
  }
}
__name(X, "X");
function Ti(e) {
  let t = new Lt(e);
  switch (t.unit) {
    case "deg":
      return t.value;
    case "rad":
      return t.value * 180 / Math.PI;
    case "turn":
      return t.value * 360;
    case "grad":
      return 0.9 * t.value;
  }
}
__name(Ti, "Ti");
function Pr(e, t) {
  return [e[0] * t[0] + e[2] * t[1], e[1] * t[0] + e[3] * t[1], e[0] * t[2] + e[2] * t[3], e[1] * t[2] + e[3] * t[3], e[0] * t[4] + e[2] * t[5] + e[4], e[1] * t[4] + e[3] * t[5] + e[5]];
}
__name(Pr, "Pr");
function Fe(e, t, n, r) {
  let i2 = t[e];
  if (typeof i2 > "u") {
    if (r && typeof e < "u") throw new Error(`Invalid value for CSS property "${r}". Allowed values: ${Object.keys(t).map((o) => `"${o}"`).join(" | ")}. Received: "${e}".`);
    i2 = n;
  }
  return i2;
}
__name(Fe, "Fe");
function De(e, t, n) {
  if (!wi || !Si) {
    if (!(typeof Intl < "u" && "Segmenter" in Intl)) throw new Error("Intl.Segmenter does not exist, please use import a polyfill.");
    wi = new Intl.Segmenter(n, { granularity: "word" }), Si = new Intl.Segmenter(n, { granularity: "grapheme" });
  }
  if (t === "grapheme") return [...Si.segment(e)].map((r) => r.segment);
  {
    let r = [...wi.segment(e)].map((s) => s.segment), i2 = [], o = 0;
    for (; o < r.length; ) {
      let s = r[o];
      if (s == "\xA0") {
        let a = o === 0 ? "" : i2.pop(), u2 = o === r.length - 1 ? "" : r[o + 1];
        i2.push(a + "\xA0" + u2), o += 2;
      } else i2.push(s), o++;
    }
    return i2;
  }
}
__name(De, "De");
function M(e, t, n) {
  let r = "";
  for (let [i2, o] of Object.entries(t)) typeof o < "u" && (r += ` ${i2}="${o}"`);
  return n ? `<${e}${r}>${n}</${e}>` : `<${e}${r}/>`;
}
__name(M, "M");
function ua(e = 20) {
  let t = /* @__PURE__ */ new Map();
  function n(o, s) {
    if (t.size >= e) {
      let a = t.keys().next().value;
      t.delete(a);
    }
    t.set(o, s);
  }
  __name(n, "n");
  __name2(n, "n");
  function r(o) {
    if (!t.has(o)) return;
    let a = t.get(o);
    return t.delete(o), t.set(o, a), a;
  }
  __name(r, "r");
  __name2(r, "r");
  function i2() {
    t.clear();
  }
  __name(i2, "i");
  __name2(i2, "i");
  return { set: n, get: r, clear: i2 };
}
__name(ua, "ua");
function pr(e) {
  return e ? e.split(/[, ]/).filter(Boolean).map(Number) : null;
}
__name(pr, "pr");
function Mn(e) {
  return typeof e == "string";
}
__name(Mn, "Mn");
function la(e) {
  return typeof e == "number";
}
__name(la, "la");
function fa(e) {
  return typeof e > "u";
}
__name(fa, "fa");
function Mt(e, t) {
  if (typeof e == "number") return e;
  if (e.endsWith("%")) {
    let n = parseFloat(e.slice(0, -1));
    if (isNaN(n)) {
      console.warn(`Invalid value "${e}"${typeof t == "string" ? ` for "${t}"` : ""}. Expected a percentage value (e.g., "50%").`);
      return;
    }
    return `${n}%`;
  }
  console.warn(`Invalid value "${e}"${typeof t == "string" ? ` for "${t}"` : ""}. Expected a number or a percentage value (e.g., "50%").`);
}
__name(Mt, "Mt");
function zt(e, t) {
  if (typeof e == "number") return e;
  if (e === "auto") return "auto";
  if (e.endsWith("%")) {
    let n = parseFloat(e.slice(0, -1));
    if (isNaN(n)) {
      console.warn(`Invalid value "${e}"${typeof t == "string" ? ` for "${t}"` : ""}. Expected a percentage value (e.g., "50%").`);
      return;
    }
    return `${n}%`;
  }
  console.warn(`Invalid value "${e}"${typeof t == "string" ? ` for "${t}"` : ""}. Expected a number, "auto", or a percentage value (e.g., "50%").`);
}
__name(zt, "zt");
function ca(e, t) {
  if (t === "break-all") return { words: De(e, "grapheme"), requiredBreaks: [] };
  if (t === "keep-all") return { words: De(e, "word"), requiredBreaks: [] };
  let n = new $557adaaeb0c7885f$exports(e), r = 0, i2 = n.nextBreak(), o = [], s = [false];
  for (; i2; ) {
    let a = e.slice(r, i2.position);
    o.push(a), i2.required ? s.push(true) : s.push(false), r = i2.position, i2 = n.nextBreak();
  }
  return { words: o, requiredBreaks: s };
}
__name(ca, "ca");
function Nn(e, t = ",") {
  let n = [], r = 0, i2 = 0;
  t = new RegExp(t);
  for (let o = 0; o < e.length; o++) e[o] === "(" ? i2++ : e[o] === ")" && i2--, i2 === 0 && t.test(e[o]) && (n.push(e.slice(r, o).trim()), r = o + 1);
  return n.push(e.slice(r).trim()), n;
}
__name(Nn, "Nn");
function Pc(e) {
  return Promise.resolve().then(() => (Mi(), Li)).then((t) => t.init(e));
}
__name(Pc, "Pc");
function Gt() {
  return Promise.resolve().then(() => (Mi(), Li)).then((e) => e.getYoga());
}
__name(Gt, "Gt");
function Ea(e) {
  let t = new DataView(e), n = 4, r = t.byteLength;
  for (; n < r; ) {
    let i2 = t.getUint16(n, false);
    if (i2 > r) throw new TypeError("Invalid JPEG");
    let o = t.getUint8(i2 + 1 + n);
    if (o === 192 || o === 193 || o === 194) return [t.getUint16(i2 + 7 + n, false), t.getUint16(i2 + 5 + n, false)];
    n += i2 + 2;
  }
  throw new TypeError("Invalid JPEG");
}
__name(Ea, "Ea");
function Oa(e) {
  let t = new Uint8Array(e.slice(6, 10));
  return [t[0] | t[1] << 8, t[2] | t[3] << 8];
}
__name(Oa, "Oa");
function Pa(e) {
  let t = new DataView(e);
  return [t.getUint16(18, false), t.getUint16(22, false)];
}
__name(Pa, "Pa");
function Cc(e) {
  let t = "", n = new Uint8Array(e);
  for (let r = 0; r < n.byteLength; r++) t += String.fromCharCode(n[r]);
  return btoa(t);
}
__name(Cc, "Cc");
function Lc(e) {
  let t = atob(e), n = t.length, r = new Uint8Array(n);
  for (let i2 = 0; i2 < n; i2++) r[i2] = t.charCodeAt(i2);
  return r.buffer;
}
__name(Lc, "Lc");
function Ta(e, t) {
  let n = t.match(/<svg[^>]*>/)[0], r = n.match(/viewBox=['"](.+)['"]/), i2 = r ? pr(r[1]) : null, o = n.match(/width=['"](\d*\.\d+|\d+)['"]/), s = n.match(/height=['"](\d*\.\d+|\d+)['"]/);
  if (!i2 && (!o || !s)) throw new Error(`Failed to parse SVG from ${e}: missing "viewBox"`);
  let a = i2 ? [i2[2], i2[3]] : [+o[1], +s[1]], u2 = a[0] / a[1];
  return o && s ? [+o[1], +s[1]] : o ? [+o[1], +o[1] / u2] : s ? [+s[1] * u2, +s[1]] : [a[0], a[1]];
}
__name(Ta, "Ta");
function ka(e) {
  let t, n = Mc(new Uint8Array(e));
  switch (n) {
    case Bn:
    case Fn:
      t = Pa(e);
      break;
    case qn:
      t = Oa(e);
      break;
    case $n:
      t = Ea(e);
      break;
  }
  if (!Rc.includes(n)) throw new Error(`Unsupported image type: ${n || "unknown"}`);
  return [`data:${n};base64,${Cc(e)}`, t];
}
__name(ka, "ka");
async function br(e) {
  if (!e) throw new Error("Image source is not provided.");
  if (typeof e == "object") {
    let [i2, o] = ka(e);
    return [i2, ...o];
  }
  if ((e.startsWith('"') && e.endsWith('"') || e.startsWith("'") && e.endsWith("'")) && (e = e.slice(1, -1)), typeof window > "u" && !e.startsWith("http") && !e.startsWith("data:")) throw new Error(`Image source must be an absolute URL: ${e}`);
  if (e.startsWith("data:")) {
    let i2;
    try {
      i2 = /data:(?<imageType>[a-z/+]+)(;[^;=]+=[^;=]+)*?(;(?<encodingType>[^;,]+))?,(?<dataString>.*)/g.exec(e).groups;
    } catch {
      return console.warn("Image data URI resolved without size:" + e), [e];
    }
    let { imageType: o, encodingType: s, dataString: a } = i2;
    if (o === Ni) {
      let u2 = s === "base64" ? atob(a) : decodeURIComponent(a.replace(/ /g, "%20")), f = s === "base64" ? e : `data:image/svg+xml;base64,${btoa(u2)}`, l2 = Ta(e, u2);
      return yt.set(e, [f, ...l2]), [f, ...l2];
    } else if (s === "base64") {
      let u2, f = Lc(a);
      switch (o) {
        case Bn:
        case Fn:
          u2 = Pa(f);
          break;
        case qn:
          u2 = Oa(f);
          break;
        case $n:
          u2 = Ea(f);
          break;
      }
      return yt.set(e, [e, ...u2]), [e, ...u2];
    } else return console.warn("Image data URI resolved without size:" + e), yt.set(e, [e]), [e];
  }
  if (!globalThis.fetch) throw new Error("`fetch` is required to be polyfilled to load images.");
  if (Ir.has(e)) return Ir.get(e);
  let t = yt.get(e);
  if (t) return t;
  let n = e, r = fetch(n).then((i2) => {
    let o = i2.headers.get("content-type");
    return o === "image/svg+xml" || o === "application/svg+xml" ? i2.text() : i2.arrayBuffer();
  }).then((i2) => {
    if (typeof i2 == "string") try {
      let a = `data:image/svg+xml;base64,${btoa(i2)}`, u2 = Ta(n, i2);
      return [a, ...u2];
    } catch (a) {
      throw new Error(`Failed to parse SVG image: ${a.message}`);
    }
    let [o, s] = ka(i2);
    return [o, ...s];
  }).then((i2) => (yt.set(n, i2), i2)).catch((i2) => (console.error(`Can't load image ${n}: ` + i2.message), yt.set(n, []), []));
  return Ir.set(n, r), r;
}
__name(br, "br");
function Mc(e) {
  return [255, 216, 255].every((t, n) => e[n] === t) ? $n : [137, 80, 78, 71, 13, 10, 26, 10].every((t, n) => e[n] === t) ? Nc(e) ? Fn : Bn : [71, 73, 70, 56].every((t, n) => e[n] === t) ? qn : [82, 73, 70, 70, 0, 0, 0, 0, 87, 69, 66, 80].every((t, n) => !t || e[n] === t) ? Ic : [60, 63, 120, 109, 108].every((t, n) => e[n] === t) ? Ni : [0, 0, 0, 0, 102, 116, 121, 112, 97, 118, 105, 102].every((t, n) => !t || e[n] === t) ? Ac : null;
}
__name(Mc, "Mc");
function Nc(e) {
  let t = new DataView(e.buffer), n, r, i2 = 8, o = false;
  for (; !o && n !== "IEND" && i2 < e.length; ) {
    r = t.getUint32(i2);
    let s = e.subarray(i2 + 4, i2 + 8);
    n = String.fromCharCode(...s), o = n === "acTL", i2 += 12 + r;
  }
  return o;
}
__name(Nc, "Nc");
function Di(e, t) {
  if (!e) return "";
  if (Array.isArray(e)) return e.map((f) => Di(f, t)).join("");
  if (typeof e != "object") return String(e);
  let n = e.type;
  if (n === "text") throw new Error("<text> nodes are not currently supported, please convert them to <path>");
  let { children: r, style: i2, ...o } = e.props || {}, s = (i2 == null ? void 0 : i2.color) || t, a = `${Object.entries(o).map(([f, l2]) => (typeof l2 == "string" && l2.toLowerCase() === "currentcolor" && (l2 = s), f === "href" && n === "image" ? ` ${Wi[f] || f}="${yt.get(l2)[0]}"` : ` ${Wi[f] || f}="${l2}"`)).join("")}`, u2 = i2 ? ` style="${Object.entries(i2).map(([f, l2]) => `${da(f)}:${l2}`).join(";")}"` : "";
  return `<${n}${a}${u2}>${Di(r, s)}</${n}>`;
}
__name(Di, "Di");
async function Aa(e) {
  let t = /* @__PURE__ */ new Set(), n = /* @__PURE__ */ __name2((r) => {
    if (r && dr(r)) {
      if (Array.isArray(r)) {
        r.forEach((i2) => n(i2));
        return;
      } else typeof r == "object" && (r.type === "image" ? t.has(r.props.href) || t.add(r.props.href) : r.type === "img" && (t.has(r.props.src) || t.add(r.props.src)));
      Array.isArray(r.props.children) ? r.props.children.map((i2) => n(i2)) : n(r.props.children);
    }
  }, "n");
  return n(e), Promise.all(Array.from(t).map((r) => br(r)));
}
__name(Aa, "Aa");
async function Ia(e, t) {
  let { viewBox: n, viewbox: r, width: i2, height: o, className: s, style: a, children: u2, ...f } = e.props || {};
  n ||= r, f.xmlns = "http://www.w3.org/2000/svg";
  let l2 = (a == null ? void 0 : a.color) || t, p = pr(n), h2 = p ? p[3] / p[2] : null;
  return i2 = i2 || h2 && o ? o / h2 : null, o = o || h2 && i2 ? i2 * h2 : null, f.width = i2, f.height = o, n && (f.viewBox = n), `data:image/svg+xml;utf8,${`<svg ${Object.entries(f).map(([g2, b]) => (typeof b == "string" && b.toLowerCase() === "currentcolor" && (b = l2), ` ${Wi[g2] || g2}="${b}"`)).join("")}>${Di(u2, l2)}</svg>`.replace(Wc, encodeURIComponent)}`;
}
__name(Ia, "Ia");
function Fi(e) {
  let t = {};
  for (let n in e) Dc.has(n) && (t[n] = e[n]);
  return t;
}
__name(Fi, "Fi");
function Bc(e, t) {
  try {
    let n = new Lt(e);
    switch (n.unit) {
      case "px":
        return { absolute: n.value };
      case "em":
        return { absolute: n.value * t };
      case "rem":
        return { absolute: n.value * 16 };
      case "%":
        return { relative: n.value };
      default:
        return {};
    }
  } catch {
    return {};
  }
}
__name(Bc, "Bc");
function Bi(e, t, n) {
  switch (e) {
    case "top":
      return { yRelative: 0 };
    case "left":
      return { xRelative: 0 };
    case "right":
      return { xRelative: 100 };
    case "bottom":
      return { yRelative: 100 };
    case "center":
      return {};
    default: {
      let r = Bc(e, t);
      return r.absolute ? { [n ? "xAbsolute" : "yAbsolute"]: r.absolute } : r.relative ? { [n ? "xRelative" : "yRelative"]: r.relative } : {};
    }
  }
}
__name(Bi, "Bi");
function $i(e, t) {
  if (typeof e == "number") return { xAbsolute: e };
  let n;
  try {
    n = (0, import_postcss_value_parser.default)(e).nodes.filter((r) => r.type === "word").map((r) => r.value);
  } catch {
    return {};
  }
  return n.length === 1 ? Bi(n[0], t, true) : n.length === 2 ? ((n[0] === "top" || n[0] === "bottom" || n[1] === "left" || n[1] === "right") && n.reverse(), { ...Bi(n[0], t, true), ...Bi(n[1], t, false) }) : {};
}
__name($i, "$i");
function Rr(e, t) {
  let n = (0, import_css_to_react_native2.getPropertyName)(`mask-${t}`);
  return e[n] || e[`WebkitM${n.substring(1)}`];
}
__name(Rr, "Rr");
function Ca(e) {
  let t = e.maskImage || e.WebkitMaskImage, n = { position: Rr(e, "position") || "0% 0%", size: Rr(e, "size") || "100% 100%", repeat: Rr(e, "repeat") || "repeat", origin: Rr(e, "origin") || "border-box", clip: Rr(e, "origin") || "border-box" };
  return Nn(t).filter((i2) => i2 && i2 !== "none").reverse().map((i2) => ({ image: i2, ...n }));
}
__name(Ca, "Ca");
function Hc(e, t, n, r) {
  return e === "textDecoration" && !n.includes(t.textDecorationColor) && (t.textDecorationColor = r), t;
}
__name(Hc, "Hc");
function er(e, t) {
  let n = Number(t);
  return isNaN(n) ? t : jc.has(e) ? Vc.has(e) ? n : String(t) : n + "px";
}
__name(er, "er");
function Yc(e, t, n) {
  if (e === "zIndex") return console.warn("`z-index` is currently not supported."), { [e]: t };
  if (e === "lineHeight") return { lineHeight: er(e, t) };
  if (e === "fontFamily") return { fontFamily: t.split(",").map((r) => r.trim().replace(/(^['"])|(['"]$)/g, "").toLocaleLowerCase()) };
  if (e === "borderRadius") {
    if (typeof t != "string" || !t.includes("/")) return;
    let [r, i2] = t.split("/"), o = (0, import_css_to_react_native.getStylesForProperty)(e, r, true), s = (0, import_css_to_react_native.getStylesForProperty)(e, i2, true);
    for (let a in o) s[a] = er(e, o[a]) + " " + er(e, s[a]);
    return s;
  }
  if (/^border(Top|Right|Bottom|Left)?$/.test(e)) {
    let r = (0, import_css_to_react_native.getStylesForProperty)("border", t, true);
    r.borderWidth === 1 && !String(t).includes("1px") && (r.borderWidth = 3), r.borderColor === "black" && !String(t).includes("black") && (r.borderColor = n);
    let i2 = { Width: er(e + "Width", r.borderWidth), Style: Fe(r.borderStyle, { solid: "solid", dashed: "dashed" }, "solid", e + "Style"), Color: r.borderColor }, o = {};
    for (let s of e === "border" ? ["Top", "Right", "Bottom", "Left"] : [e.slice(6)]) for (let a in i2) o["border" + s + a] = i2[a];
    return o;
  }
  if (e === "boxShadow") {
    if (!t) throw new Error('Invalid `boxShadow` value: "' + t + '".');
    return { [e]: typeof t == "string" ? (0, import_css_box_shadow.parse)(t) : t };
  }
  if (e === "transform") {
    if (typeof t != "string") throw new Error("Invalid `transform` value.");
    let r = {}, i2 = t.replace(/(-?[\d.]+%)/g, (s, a) => {
      let u2 = ~~(Math.random() * 1e9);
      return r[u2] = a, u2 + "px";
    }), o = (0, import_css_to_react_native.getStylesForProperty)("transform", i2, true);
    for (let s of o.transform) for (let a in s) r[s[a]] && (s[a] = r[s[a]]);
    return o;
  }
  if (e === "background") return t = t.toString().trim(), /^(linear-gradient|radial-gradient|url|repeating-linear-gradient|repeating-radial-gradient)\(/.test(t) ? (0, import_css_to_react_native.getStylesForProperty)("backgroundImage", t, true) : (0, import_css_to_react_native.getStylesForProperty)("background", t, true);
  if (e === "textShadow") {
    t = t.toString().trim();
    let r = {}, i2 = Nn(t);
    for (let o of i2) {
      let s = (0, import_css_to_react_native.getStylesForProperty)("textShadow", o, true);
      for (let a in s) r[a] ? r[a].push(s[a]) : r[a] = [s[a]];
    }
    return r;
  }
  if (e === "WebkitTextStroke") {
    t = t.toString().trim();
    let r = t.split(" ");
    if (r.length !== 2) throw new Error("Invalid `WebkitTextStroke` value.");
    return { WebkitTextStrokeWidth: er(e, r[0]), WebkitTextStrokeColor: er(e, r[1]) };
  }
  if (e === "textDecorationSkipInk") {
    let r = t.toString().trim().toLowerCase();
    if (!["auto", "none", "all"].includes(r)) throw new Error("Invalid `textDecorationSkipInk` value.");
    return { textDecorationSkipInk: r };
  }
}
__name(Yc, "Yc");
function La(e) {
  return e === "transform" ? " Only absolute lengths such as `10px` are supported." : "";
}
__name(La, "La");
function Wa(e) {
  if (typeof e == "string" && Ma.test(e.trim())) return e.trim().replace(Ma, (t, n, r, i2, o) => `rgba(${n}, ${r}, ${i2}, ${o})`);
  if (typeof e == "object" && e !== null) {
    for (let t in e) e[t] = Wa(e[t]);
    return e;
  }
  return e;
}
__name(Wa, "Wa");
function Un(e, t) {
  let n = {};
  if (e) {
    let i2 = Qc(e.color, t.color);
    n.color = i2;
    for (let o in e) {
      if (o.startsWith("_")) {
        n[o] = e[o];
        continue;
      }
      if (o === "color") continue;
      let s = (0, import_css_to_react_native.getPropertyName)(o), a = Jc(e[o], i2);
      try {
        let u2 = Yc(s, a, i2) || Hc(s, (0, import_css_to_react_native.getStylesForProperty)(s, er(s, a), true), a, i2);
        Object.assign(n, u2);
      } catch (u2) {
        throw new Error(u2.message + (u2.message.includes(a) ? `
  ` + La(s) : `
  in CSS rule \`${s}: ${a}\`.${La(s)}`));
      }
    }
  }
  if (n.backgroundImage) {
    let { backgrounds: i2 } = (0, import_css_background_parser.parseElementStyle)(n);
    n.backgroundImage = i2;
  }
  (n.maskImage || n.WebkitMaskImage) && (n.maskImage = Ca(n));
  let r = Xc(n.fontSize, t.fontSize);
  typeof n.fontSize < "u" && (n.fontSize = r), n.transformOrigin && (n.transformOrigin = $i(n.transformOrigin, r));
  for (let i2 in n) {
    let o = n[i2];
    if (i2 === "lineHeight") typeof o == "string" && o !== "normal" && (o = n[i2] = X(o, r, r, t, true) / r);
    else {
      if (typeof o == "string") {
        let s = X(o, r, r, t);
        typeof s < "u" && (n[i2] = s), o = n[i2];
      }
      if (typeof o == "string" || typeof o == "object") {
        let s = Wa(o);
        s && (n[i2] = s), o = n[i2];
      }
    }
    if (i2 === "opacity" && typeof o == "number" && (n.opacity = o * t.opacity), i2 === "transform") {
      let s = o;
      for (let a of s) {
        let u2 = Object.keys(a)[0], f = a[u2], l2 = typeof f == "string" ? X(f, r, r, t) ?? f : f;
        a[u2] = l2;
      }
    }
    if (i2 === "textShadowRadius") {
      let s = o;
      n.textShadowRadius = s.map((a) => X(a, r, 0, t, false));
    }
    if (i2 === "textShadowOffset") {
      let s = o;
      n.textShadowOffset = s.map(({ height: a, width: u2 }) => ({ height: X(a, r, 0, t, false), width: X(u2, r, 0, t, false) }));
    }
  }
  return n;
}
__name(Un, "Un");
function Xc(e, t) {
  if (typeof e == "number") return e;
  try {
    let n = new Lt(e);
    switch (n.unit) {
      case "em":
        return n.value * t;
      case "rem":
        return n.value * 16;
    }
  } catch {
    return t;
  }
}
__name(Xc, "Xc");
function Na(e) {
  if (e.startsWith("hsl")) {
    let t = (0, import_parse_css_color.default)(e), [n, r, i2] = t.values;
    return `hsl(${[n, `${r}%`, `${i2}%`].concat(t.alpha === 1 ? [] : [t.alpha]).join(",")})`;
  }
  return e;
}
__name(Na, "Na");
function Qc(e, t) {
  return e && e.toLowerCase() !== "currentcolor" ? Na(e) : Na(t);
}
__name(Qc, "Qc");
function Kc(e, t) {
  return e.replace(/currentcolor/gi, t);
}
__name(Kc, "Kc");
function Jc(e, t) {
  return Mn(e) && (e = Kc(e, t)), e;
}
__name(Jc, "Jc");
async function qi(e, t, n, r, i2) {
  let o = await Gt(), s = { ...n, ...Un(Ra[t], n), ...Un(r, n) };
  if (t === "img") {
    let [a, u2, f] = await br(i2.src);
    if (u2 === void 0 && f === void 0) {
      if (i2.width === void 0 || i2.height === void 0) throw new Error("Image size cannot be determined. Please provide the width and height of the image.");
      u2 = parseInt(i2.width), f = parseInt(i2.height);
    }
    let l2 = f / u2, p = (s.borderLeftWidth || 0) + (s.borderRightWidth || 0) + (s.paddingLeft || 0) + (s.paddingRight || 0), h2 = (s.borderTopWidth || 0) + (s.borderBottomWidth || 0) + (s.paddingTop || 0) + (s.paddingBottom || 0), g2 = s.width || i2.width, b = s.height || i2.height, y = typeof g2 == "number" && typeof b == "number";
    y && (g2 -= p, b -= h2), g2 === void 0 && b === void 0 ? (g2 = "100%", e.setAspectRatio(1 / l2)) : g2 === void 0 ? typeof b == "number" ? g2 = b / l2 : e.setAspectRatio(1 / l2) : b === void 0 && (typeof g2 == "number" ? b = g2 * l2 : e.setAspectRatio(1 / l2)), s.width = y ? g2 + p : g2, s.height = y ? b + h2 : b, s.__src = a;
  }
  if (t === "svg") {
    let a = i2.viewBox || i2.viewbox, u2 = pr(a), f = u2 ? u2[3] / u2[2] : null, { width: l2, height: p } = i2;
    typeof l2 > "u" && p ? f == null ? l2 = 0 : typeof p == "string" && p.endsWith("%") ? l2 = parseInt(p) / f + "%" : (p = X(p, n.fontSize, 1, n), l2 = p / f) : typeof p > "u" && l2 ? f == null ? l2 = 0 : typeof l2 == "string" && l2.endsWith("%") ? p = parseInt(l2) * f + "%" : (l2 = X(l2, n.fontSize, 1, n), p = l2 * f) : (typeof l2 < "u" && (l2 = X(l2, n.fontSize, 1, n) || l2), typeof p < "u" && (p = X(p, n.fontSize, 1, n) || p), l2 ||= u2 == null ? void 0 : u2[2], p ||= u2 == null ? void 0 : u2[3]), !s.width && l2 && (s.width = l2), !s.height && p && (s.height = p);
  }
  return e.setDisplay(Fe(s.display, { flex: o.DISPLAY_FLEX, block: o.DISPLAY_FLEX, contents: o.DISPLAY_CONTENTS, none: o.DISPLAY_NONE, "-webkit-box": o.DISPLAY_FLEX }, o.DISPLAY_FLEX, "display")), e.setAlignContent(Fe(s.alignContent, { stretch: o.ALIGN_STRETCH, center: o.ALIGN_CENTER, "flex-start": o.ALIGN_FLEX_START, "flex-end": o.ALIGN_FLEX_END, "space-between": o.ALIGN_SPACE_BETWEEN, "space-around": o.ALIGN_SPACE_AROUND, baseline: o.ALIGN_BASELINE, normal: o.ALIGN_AUTO }, o.ALIGN_AUTO, "alignContent")), e.setAlignItems(Fe(s.alignItems, { stretch: o.ALIGN_STRETCH, center: o.ALIGN_CENTER, "flex-start": o.ALIGN_FLEX_START, "flex-end": o.ALIGN_FLEX_END, baseline: o.ALIGN_BASELINE, normal: o.ALIGN_AUTO }, o.ALIGN_STRETCH, "alignItems")), e.setAlignSelf(Fe(s.alignSelf, { stretch: o.ALIGN_STRETCH, center: o.ALIGN_CENTER, "flex-start": o.ALIGN_FLEX_START, "flex-end": o.ALIGN_FLEX_END, baseline: o.ALIGN_BASELINE, normal: o.ALIGN_AUTO }, o.ALIGN_AUTO, "alignSelf")), e.setJustifyContent(Fe(s.justifyContent, { center: o.JUSTIFY_CENTER, "flex-start": o.JUSTIFY_FLEX_START, "flex-end": o.JUSTIFY_FLEX_END, "space-between": o.JUSTIFY_SPACE_BETWEEN, "space-around": o.JUSTIFY_SPACE_AROUND }, o.JUSTIFY_FLEX_START, "justifyContent")), e.setFlexDirection(Fe(s.flexDirection, { row: o.FLEX_DIRECTION_ROW, column: o.FLEX_DIRECTION_COLUMN, "row-reverse": o.FLEX_DIRECTION_ROW_REVERSE, "column-reverse": o.FLEX_DIRECTION_COLUMN_REVERSE }, o.FLEX_DIRECTION_ROW, "flexDirection")), e.setFlexWrap(Fe(s.flexWrap, { wrap: o.WRAP_WRAP, nowrap: o.WRAP_NO_WRAP, "wrap-reverse": o.WRAP_WRAP_REVERSE }, o.WRAP_NO_WRAP, "flexWrap")), typeof s.gap < "u" && e.setGap(o.GUTTER_ALL, s.gap), typeof s.rowGap < "u" && e.setGap(o.GUTTER_ROW, s.rowGap), typeof s.columnGap < "u" && e.setGap(o.GUTTER_COLUMN, s.columnGap), typeof s.flexBasis < "u" && e.setFlexBasis(zt(s.flexBasis, "flexBasis")), e.setFlexGrow(typeof s.flexGrow > "u" ? 0 : s.flexGrow), e.setFlexShrink(typeof s.flexShrink > "u" ? 0 : s.flexShrink), typeof s.maxHeight < "u" && e.setMaxHeight(Mt(s.maxHeight, "maxHeight")), typeof s.maxWidth < "u" && e.setMaxWidth(Mt(s.maxWidth, "maxWidth")), typeof s.minHeight < "u" && e.setMinHeight(Mt(s.minHeight, "minHeight")), typeof s.minWidth < "u" && e.setMinWidth(Mt(s.minWidth, "minWidth")), e.setOverflow(Fe(s.overflow, { visible: o.OVERFLOW_VISIBLE, hidden: o.OVERFLOW_HIDDEN }, o.OVERFLOW_VISIBLE, "overflow")), e.setMargin(o.EDGE_TOP, zt(s.marginTop || 0)), e.setMargin(o.EDGE_BOTTOM, zt(s.marginBottom || 0)), e.setMargin(o.EDGE_LEFT, zt(s.marginLeft || 0)), e.setMargin(o.EDGE_RIGHT, zt(s.marginRight || 0)), e.setBorder(o.EDGE_TOP, s.borderTopWidth || 0), e.setBorder(o.EDGE_BOTTOM, s.borderBottomWidth || 0), e.setBorder(o.EDGE_LEFT, s.borderLeftWidth || 0), e.setBorder(o.EDGE_RIGHT, s.borderRightWidth || 0), e.setPadding(o.EDGE_TOP, s.paddingTop || 0), e.setPadding(o.EDGE_BOTTOM, s.paddingBottom || 0), e.setPadding(o.EDGE_LEFT, s.paddingLeft || 0), e.setPadding(o.EDGE_RIGHT, s.paddingRight || 0), e.setBoxSizing(Fe(s.boxSizing, { "border-box": o.BOX_SIZING_BORDER_BOX, "content-box": o.BOX_SIZING_CONTENT_BOX }, o.BOX_SIZING_BORDER_BOX, "boxSizing")), e.setPositionType(Fe(s.position, { absolute: o.POSITION_TYPE_ABSOLUTE, relative: o.POSITION_TYPE_RELATIVE, static: o.POSITION_TYPE_STATIC }, o.POSITION_TYPE_RELATIVE, "position")), typeof s.top < "u" && e.setPosition(o.EDGE_TOP, Mt(s.top, "top")), typeof s.bottom < "u" && e.setPosition(o.EDGE_BOTTOM, Mt(s.bottom, "bottom")), typeof s.left < "u" && e.setPosition(o.EDGE_LEFT, Mt(s.left, "left")), typeof s.right < "u" && e.setPosition(o.EDGE_RIGHT, Mt(s.right, "right")), typeof s.height < "u" ? e.setHeight(zt(s.height, "height")) : e.setHeightAuto(), typeof s.width < "u" ? e.setWidth(zt(s.width, "width")) : e.setWidthAuto(), [s, Fi(s)];
}
__name(qi, "qi");
function Zc(e, t, n) {
  let r = [...Da];
  for (let i2 of e) {
    let o = Object.keys(i2)[0], s = i2[o];
    if (typeof s == "string") if (o === "translateX") s = parseFloat(s) / 100 * t, i2[o] = s;
    else if (o === "translateY") s = parseFloat(s) / 100 * n, i2[o] = s;
    else throw new Error(`Invalid transform: "${o}: ${s}".`);
    let a = s, u2 = [...Da];
    switch (o) {
      case "translateX":
        u2[4] = a;
        break;
      case "translateY":
        u2[5] = a;
        break;
      case "scale":
        u2[0] = a, u2[3] = a;
        break;
      case "scaleX":
        u2[0] = a;
        break;
      case "scaleY":
        u2[3] = a;
        break;
      case "rotate": {
        let f = a * Math.PI / 180, l2 = Math.cos(f), p = Math.sin(f);
        u2[0] = l2, u2[1] = p, u2[2] = -p, u2[3] = l2;
        break;
      }
      case "skewX":
        u2[2] = Math.tan(a * Math.PI / 180);
        break;
      case "skewY":
        u2[1] = Math.tan(a * Math.PI / 180);
        break;
    }
    r = Pr(u2, r);
  }
  e.splice(0, e.length), e.push(...r), e.__resolved = true;
}
__name(Zc, "Zc");
function Cr({ left: e, top: t, width: n, height: r }, i2, o, s) {
  let a;
  i2.__resolved || Zc(i2, n, r);
  let u2 = i2;
  if (o) a = u2;
  else {
    let f = (s == null ? void 0 : s.xAbsolute) ?? ((s == null ? void 0 : s.xRelative) ?? 50) * n / 100, l2 = (s == null ? void 0 : s.yAbsolute) ?? ((s == null ? void 0 : s.yRelative) ?? 50) * r / 100, p = e + f, h2 = t + l2;
    a = Pr([1, 0, 0, 1, p, h2], Pr(u2, [1, 0, 0, 1, -p, -h2])), u2.__parent && (a = Pr(u2.__parent, a)), u2.splice(0, 6, ...a);
  }
  return `matrix(${a.map((f) => f.toFixed(2)).join(",")})`;
}
__name(Cr, "Cr");
function Ba({ left: e, top: t, width: n, height: r, isInheritingTransform: i2 }, o) {
  let s = "", a = 1;
  return o.transform && (s = Cr({ left: e, top: t, width: n, height: r }, o.transform, i2, o.transformOrigin)), o.opacity !== void 0 && (a = +o.opacity), { matrix: s, opacity: a };
}
__name(Ba, "Ba");
function Ui({ id: e, content: t, filter: n, left: r, top: i2, width: o, height: s, matrix: a, opacity: u2, image: f, clipPathId: l2, debug: p, shape: h2, decorationShape: g2 }, b) {
  let y = "";
  if (p && (y = M("rect", { x: r, y: i2 - s, width: o, height: s, fill: "transparent", stroke: "#575eff", "stroke-width": 1, transform: a || void 0, "clip-path": l2 ? `url(#${l2})` : void 0 })), f) {
    let S2 = { href: f, x: r, y: i2, width: o, height: s, transform: a || void 0, "clip-path": l2 ? `url(#${l2})` : void 0, style: b.filter ? `filter:${b.filter}` : void 0 };
    return [(n ? `${n}<g filter="url(#satori_s-${e})">` : "") + M("image", { ...S2, opacity: u2 !== 1 ? u2 : void 0 }) + (g2 || "") + (n ? "</g>" : "") + y, ""];
  }
  let k = { x: r, y: i2, width: o, height: s, "font-weight": b.fontWeight, "font-style": b.fontStyle, "font-size": b.fontSize, "font-family": b.fontFamily, "letter-spacing": b.letterSpacing || void 0, transform: a || void 0, "clip-path": l2 ? `url(#${l2})` : void 0, style: b.filter ? `filter:${b.filter}` : void 0, "stroke-width": b.WebkitTextStrokeWidth ? `${b.WebkitTextStrokeWidth}px` : void 0, stroke: b.WebkitTextStrokeWidth ? b.WebkitTextStrokeColor : void 0, "stroke-linejoin": b.WebkitTextStrokeWidth ? "round" : void 0, "paint-order": b.WebkitTextStrokeWidth ? "stroke" : void 0 };
  return [(n ? `${n}<g filter="url(#satori_s-${e})">` : "") + M("text", { ...k, fill: b.color, opacity: u2 !== 1 ? u2 : void 0 }, (0, import_escape_html.default)(t)) + (g2 || "") + (n ? "</g>" : "") + y, h2 ? M("text", k, (0, import_escape_html.default)(t)) : ""];
}
__name(Ui, "Ui");
function ed(e, t, n) {
  return e.replace(/([MA])([0-9.-]+),([0-9.-]+)/g, function(r, i2, o, s) {
    return i2 + (parseFloat(o) + t) + "," + (parseFloat(s) + n);
  });
}
__name(ed, "ed");
function $a({ id: e, width: t, height: n }, r, i2 = false) {
  if (!r.shadowColor || !r.shadowOffset || typeof r.shadowRadius > "u") return "";
  let o = r.shadowColor.length, s = "", a = "", u2 = 0, f = t, l2 = 0, p = n;
  for (let h2 = 0; h2 < o; h2++) {
    let g2 = r.shadowRadius[h2] * r.shadowRadius[h2] / 4;
    if (u2 = Math.min(r.shadowOffset[h2].width - g2, u2), f = Math.max(r.shadowOffset[h2].width + g2 + t, f), l2 = Math.min(r.shadowOffset[h2].height - g2, l2), p = Math.max(r.shadowOffset[h2].height + g2 + n, p), i2) {
      let b = `satori_s-${e}-result-${h2}`;
      s += M("feGaussianBlur", { in: "SourceAlpha", stdDeviation: r.shadowRadius[h2] / 2, result: `${b}-blur` }) + M("feOffset", { in: `${b}-blur`, dx: r.shadowOffset[h2].width, dy: r.shadowOffset[h2].height, result: `${b}-offset` }) + M("feFlood", { "flood-color": r.shadowColor[h2], "flood-opacity": 1, result: `${b}-color` }) + M("feComposite", { in: `${b}-color`, in2: `${b}-offset`, operator: "in", result: o > 1 ? b : void 0 });
    } else s += M("feDropShadow", { dx: r.shadowOffset[h2].width, dy: r.shadowOffset[h2].height, stdDeviation: r.shadowRadius[h2] / 2, "flood-color": r.shadowColor[h2], "flood-opacity": 1, ...o > 1 ? { in: "SourceGraphic", result: `satori_s-${e}-result-${h2}` } : {} });
    o > 1 && (a = M("feMergeNode", { in: `satori_s-${e}-result-${h2}` }) + a);
  }
  return M("filter", { id: `satori_s-${e}`, x: (u2 / t * 100 * zn).toFixed(2) + "%", y: (l2 / n * 100 * zn).toFixed(2) + "%", width: ((f - u2) / t * 100 * zn).toFixed(2) + "%", height: ((p - l2) / n * 100 * zn).toFixed(2) + "%" }, s + (a ? M("feMerge", {}, a) : ""));
}
__name($a, "$a");
function qa({ width: e, height: t, shape: n, opacity: r, id: i2 }, o) {
  if (!o.boxShadow) return null;
  let s = "", a = "";
  for (let u2 = o.boxShadow.length - 1; u2 >= 0; u2--) {
    let f = "", l2 = o.boxShadow[u2];
    l2.spreadRadius && l2.inset && (l2.spreadRadius = -l2.spreadRadius);
    let p = l2.blurRadius * l2.blurRadius / 4 + (l2.spreadRadius || 0), h2 = Math.min(-p - (l2.inset ? l2.offsetX : 0), 0), g2 = Math.max(p + e - (l2.inset ? l2.offsetX : 0), e), b = Math.min(-p - (l2.inset ? l2.offsetY : 0), 0), y = Math.max(p + t - (l2.inset ? l2.offsetY : 0), t), k = `satori_s-${i2}-${u2}`, S2 = `satori_ms-${i2}-${u2}`, I = l2.spreadRadius ? n.replace('stroke-width="0"', `stroke-width="${l2.spreadRadius * 2}"`) : n;
    f += M("mask", { id: S2, maskUnits: "userSpaceOnUse" }, M("rect", { x: 0, y: 0, width: o._viewportWidth || "100%", height: o._viewportHeight || "100%", fill: l2.inset ? "#000" : "#fff" }) + I.replace('fill="#fff"', l2.inset ? 'fill="#fff"' : 'fill="#000"').replace('stroke="#fff"', ""));
    let w2 = I.replace(/d="([^"]+)"/, (T, O) => 'd="' + ed(O, l2.offsetX, l2.offsetY) + '"').replace(/x="([^"]+)"/, (T, O) => 'x="' + (parseFloat(O) + l2.offsetX) + '"').replace(/y="([^"]+)"/, (T, O) => 'y="' + (parseFloat(O) + l2.offsetY) + '"');
    l2.spreadRadius && l2.spreadRadius < 0 && (f += M("mask", { id: S2 + "-neg", maskUnits: "userSpaceOnUse" }, w2.replace('stroke="#fff"', 'stroke="#000"').replace(/stroke-width="[^"]+"/, `stroke-width="${-l2.spreadRadius * 2}"`))), l2.spreadRadius && l2.spreadRadius < 0 && (w2 = M("g", { mask: `url(#${S2}-neg)` }, w2)), f += M("defs", {}, M("filter", { id: k, x: `${h2 / e * 100}%`, y: `${b / t * 100}%`, width: `${(g2 - h2) / e * 100}%`, height: `${(y - b) / t * 100}%` }, M("feGaussianBlur", { stdDeviation: l2.blurRadius / 2, result: "b" }) + M("feFlood", { "flood-color": l2.color, in: "SourceGraphic", result: "f" }) + M("feComposite", { in: "f", in2: "b", operator: l2.inset ? "out" : "in" }))) + M("g", { mask: `url(#${S2})`, filter: `url(#${k})`, opacity: r }, w2), l2.inset ? a += f : s += f;
  }
  return [s, a];
}
__name(qa, "qa");
function td2(e, t, n, r, i2, o) {
  let s = i2 / 2, a = Math.max(s, i2 * 1.25), u2 = [];
  for (let p of n) {
    if (p.y2 < o + s || p.y1 > r + s) continue;
    let h2 = Math.max(e, p.x1 - a), g2 = Math.min(t, p.x2 + a);
    if (h2 >= g2) continue;
    if (u2.length === 0) {
      u2.push([h2, g2]);
      continue;
    }
    let b = u2[u2.length - 1];
    h2 <= b[1] ? b[1] = Math.max(b[1], g2) : u2.push([h2, g2]);
  }
  if (!u2.length) return [[e, t]];
  let f = [], l2 = e;
  for (let [p, h2] of u2) if (p > l2 && f.push([l2, p]), l2 = Math.max(l2, h2), l2 >= t) break;
  return l2 < t && f.push([l2, t]), f;
}
__name(td2, "td2");
function zi({ width: e, left: t, top: n, ascender: r, clipPathId: i2, matrix: o, glyphBoxes: s }, a) {
  let { textDecorationColor: u2, textDecorationStyle: f, textDecorationLine: l2, textDecorationSkipInk: p, fontSize: h2, color: g2 } = a;
  if (!l2 || l2 === "none") return "";
  let b = Math.max(1, h2 * 0.1), y = l2 === "line-through" ? n + r * 0.7 : l2 === "underline" ? n + r * 1.1 : n, k = f === "dashed" ? `${b * 1.2} ${b * 2}` : f === "dotted" ? `0 ${b * 2}` : void 0, S2 = l2 === "underline" && (p || "auto") !== "none" && (s == null ? void 0 : s.length), I = n + r, w2 = S2 ? td2(t, t + e, s, y, b, I) : [[t, t + e]], T = f === "double" ? w2.map(([O, C]) => M("line", { x1: O, y1: y + b + 1, x2: C, y2: y + b + 1, stroke: u2 || g2, "stroke-width": b, "stroke-dasharray": k, "stroke-linecap": f === "dotted" ? "round" : "square", transform: o })).join("") : "";
  return (i2 ? `<g clip-path="url(#${i2})">` : "") + w2.map(([O, C]) => M("line", { x1: O, y1: y, x2: C, y2: y, stroke: u2 || g2, "stroke-width": b, "stroke-dasharray": k, "stroke-linecap": f === "dotted" ? "round" : "square", transform: o })).join("") + T + (i2 ? "</g>" : "");
}
__name(zi, "zi");
function Gi(e) {
  return e = e.replace("U+", "0x"), String.fromCodePoint(Number(e));
}
__name(Gi, "Gi");
function Ua(e, t, n) {
  let { fontSize: r, letterSpacing: i2 } = n, o = /* @__PURE__ */ new Map();
  function s(f) {
    if (o.has(f)) return o.get(f);
    let l2 = e.measure(f, { fontSize: r, letterSpacing: i2 });
    return o.set(f, l2), l2;
  }
  __name(s, "s");
  __name2(s, "s");
  function a(f) {
    let l2 = 0;
    for (let p of f) t(p) ? l2 += r : l2 += s(p);
    return l2;
  }
  __name(a, "a");
  __name2(a, "a");
  function u2(f) {
    return a(De(f, "grapheme"));
  }
  __name(u2, "u2");
  __name2(u2, "u");
  return { measureGrapheme: s, measureGraphemeArray: a, measureText: u2 };
}
__name(Ua, "Ua");
function za(e, t, n) {
  let { textTransform: r, whiteSpace: i2, wordBreak: o } = t;
  e = rd(e, r, n);
  let { content: s, shouldCollapseTabsAndSpaces: a, allowSoftWrap: u2 } = od(e, i2), { words: f, requiredBreaks: l2, allowBreakWord: p } = id(s, o), [h2, g2] = nd(t, u2);
  return { words: f, requiredBreaks: l2, allowSoftWrap: u2, allowBreakWord: p, processedContent: s, shouldCollapseTabsAndSpaces: a, lineLimit: h2, blockEllipsis: g2 };
}
__name(za, "za");
function rd(e, t, n) {
  return t === "uppercase" ? e = e.toLocaleUpperCase(n) : t === "lowercase" ? e = e.toLocaleLowerCase(n) : t === "capitalize" && (e = De(e, "word", n).map((r) => De(r, "grapheme", n).map((i2, o) => o === 0 ? i2.toLocaleUpperCase(n) : i2).join("")).join("")), e;
}
__name(rd, "rd");
function nd(e, t) {
  let { textOverflow: n, lineClamp: r, WebkitLineClamp: i2, WebkitBoxOrient: o, overflow: s, display: a } = e;
  if (a === "block" && r) {
    let [u2, f = vr] = sd(r);
    if (u2) return [u2, f];
  }
  return n === "ellipsis" && a === "-webkit-box" && o === "vertical" && la(i2) && i2 > 0 ? [i2, vr] : n === "ellipsis" && s === "hidden" && !t ? [1, vr] : [1 / 0];
}
__name(nd, "nd");
function id(e, t) {
  let n = ["break-all", "break-word"].includes(t), { words: r, requiredBreaks: i2 } = ca(e, t);
  return { words: r, requiredBreaks: i2, allowBreakWord: n };
}
__name(id, "id");
function od(e, t) {
  let n = ["pre", "pre-wrap", "pre-line"].includes(t), r = ["normal", "nowrap", "pre-line"].includes(t), i2 = !["pre", "nowrap"].includes(t);
  return n || (e = e.replace(/\n/g, tr)), r && (e = e.replace(/([ ]|\t)+/g, tr).replace(/^[ ]|[ ]$/g, "")), { content: e, shouldCollapseTabsAndSpaces: r, allowSoftWrap: i2 };
}
__name(od, "od");
function sd(e) {
  if (typeof e == "number") return [e];
  let t = /^(\d+)\s*"(.*)"$/, n = /^(\d+)\s*'(.*)'$/, r = t.exec(e), i2 = n.exec(e);
  if (r) {
    let o = +r[1], s = r[2];
    return [o, s];
  } else if (i2) {
    let o = +i2[1], s = i2[2];
    return [o, s];
  }
  return [];
}
__name(sd, "sd");
function ud(e) {
  return ad.has(e);
}
__name(ud, "ud");
function Vi(e) {
  if (e === "transparent") return true;
  let t = (0, import_parse_css_color2.default)(e);
  return t ? t.alpha === 0 : false;
}
__name(Vi, "Vi");
function Ga(e) {
  if (!e) return false;
  let t = (0, import_parse_css_color2.default)(e);
  if (!t) return false;
  let [n, r, i2, o] = t.values;
  return n === 255 && r === 255 && i2 === 255 && (o === void 0 || o === 1);
}
__name(Ga, "Ga");
async function* Hi(e, t) {
  let n = await Gt(), { parentStyle: r, inheritedStyle: i2, parent: o, font: s, id: a, isInheritingTransform: u2, debug: f, embedFont: l2, graphemeImages: p, locale: h2, canLoadAdditionalAssets: g2 } = t, { textAlign: b, lineHeight: y, textWrap: k, fontSize: S2, filter: I, tabSize: w2 = 8, letterSpacing: T, _inheritedBackgroundClipTextPath: O, _inheritedBackgroundClipTextHasBackground: C, flexShrink: D } = r, { words: q, requiredBreaks: Y, allowSoftWrap: ue, allowBreakWord: _e, processedContent: ce, shouldCollapseTabsAndSpaces: oe, lineLimit: ve, blockEllipsis: de } = za(e, r, h2), le = ld(n, b);
  o.insertChild(le, o.getChildCount()), fa(D) && o.setFlexShrink(1);
  let ee = s.getEngine(S2, y, r, h2), Le = g2 ? De(ce, "grapheme").filter((H) => !ud(H) && !ee.has(H)) : [];
  yield Le.map((H) => ({ word: H, locale: h2 })), Le.length && (ee = s.getEngine(S2, y, r, h2));
  function Oe(H) {
    return !!(p && p[H]);
  }
  __name(Oe, "Oe");
  __name2(Oe, "Oe");
  let { measureGrapheme: Te, measureGraphemeArray: _t, measureText: Me } = Ua(ee, Oe, { fontSize: S2, letterSpacing: T }), Je = Mn(w2) ? X(w2, S2, 1, r) : Te(tr) * w2, Pe = /* @__PURE__ */ __name2((H, j) => {
    if (H.length === 0) return { originWidth: 0, endingSpacesWidth: 0, text: H };
    let { index: se, tabCount: Q } = fd2(H), ge = 0;
    if (Q > 0) {
      let pe = H.slice(0, se), ie = H.slice(se + Q), te = Me(pe), Ue = te + j;
      ge = (Je === 0 ? te : (Math.floor(Ue / Je) + Q) * Je) + Me(ie);
    } else ge = Me(H);
    let J = H.trimEnd() === H ? ge : Me(H.trimEnd());
    return { originWidth: ge, endingSpacesWidth: ge - J, text: H };
  }, "Pe"), G = [], Ie = [], Re = [], V = [], ut = [];
  function Tt(H) {
    let j = 0, se = 0, Q = -1, ge = 0, J = 0, pe = 0, ie = 0;
    G = [], Re = [0], V = [], ut = [];
    let te = 0, Ue = 0;
    for (; te < q.length && j < ve; ) {
      let K2 = q[te], vt = Y[te], Ne = 0, { originWidth: Ye, endingSpacesWidth: et2, text: fr } = Pe(K2, J);
      K2 = fr, Ne = Ye;
      let we = et2;
      vt && pe === 0 && (pe = ee.height(K2));
      let Ut = b === "justify", be = te && J + Ne > H + we && ue;
      if (_e && Ne > H && (!J || be || vt)) {
        let We = De(K2, "grapheme");
        q.splice(te, 1, ...We), J > 0 && (G.push(J - Ue), Ie.push(ie), j++, ge += pe, J = 0, pe = 0, ie = 0, Re.push(1), Q = -1), Ue = we;
        continue;
      }
      if (vt || be) oe && K2 === tr && (Ne = 0), G.push(J - Ue), Ie.push(ie), j++, ge += pe, J = Ne, pe = Ne ? Math.round(ee.height(K2)) : 0, ie = Ne ? Math.round(ee.baseline(K2)) : 0, Re.push(1), Q = -1, vt || (se = Math.max(se, H));
      else {
        J += Ne;
        let We = Math.round(ee.height(K2));
        We > pe && (pe = We, ie = Math.round(ee.baseline(K2))), Ut && Re[Re.length - 1]++;
      }
      Ut && Q++, se = Math.max(se, J);
      let Xe = J - Ne;
      if (Ne === 0) ut.push({ y: ge, x: Xe, width: 0, line: j, lineIndex: Q, isImage: false });
      else {
        let We = De(K2, "word");
        for (let Qe = 0; Qe < We.length; Qe++) {
          let It = We[Qe], ze = 0, tt = false;
          Oe(It) ? (ze = S2, tt = true) : ze = Te(It), V.push(It), ut.push({ y: ge, x: Xe, width: ze, line: j, lineIndex: Q, isImage: tt }), Xe += ze;
        }
      }
      te++, Ue = we;
    }
    return J && (j < ve && (ge += pe), j++, G.push(J), Ie.push(ie)), { width: se, height: ge };
  }
  __name(Tt, "Tt");
  __name2(Tt, "Tt");
  let $t = { width: 0, height: 0 };
  le.setMeasureFunc((H) => {
    let { width: j, height: se } = Tt(H);
    if (k === "balance") {
      let ge = j / 2, J = j, pe = j;
      for (; ge + 1 < J; ) {
        pe = (ge + J) / 2;
        let { height: te } = Tt(pe);
        te > se ? ge = pe : J = pe;
      }
      Tt(J);
      let ie = Math.ceil(J);
      return $t = { width: ie, height: se }, { width: ie, height: se };
    }
    if (k === "pretty" && G[G.length - 1] < j / 3) {
      let pe = j * 0.9, ie = Tt(pe);
      if (ie.height <= se * 1.3) return $t = { width: j, height: ie.height }, { width: j, height: ie.height };
    }
    let Q = Math.ceil(j);
    return $t = { width: Q, height: se }, { width: Q, height: se };
  });
  let [Sn, Ee] = yield, gt = "", qt = "", Be = i2._inheritedClipPathId, Ze = i2._inheritedMaskId, { left: ur, top: bt, width: lr, height: _n } = le.getComputedLayout(), kt = o.getComputedWidth() - o.getComputedPadding(n.EDGE_LEFT) - o.getComputedPadding(n.EDGE_RIGHT) - o.getComputedBorder(n.EDGE_LEFT) - o.getComputedBorder(n.EDGE_RIGHT), lt = Sn + ur, ft = Ee + bt, { matrix: He, opacity: Kt } = Ba({ left: ur, top: bt, width: lr, height: _n, isInheritingTransform: u2 }, r), ct = "";
  if (r.textShadowOffset) {
    let { textShadowColor: H, textShadowOffset: j, textShadowRadius: se } = r;
    ct = $a({ width: $t.width, height: $t.height, id: a }, { shadowColor: H, shadowOffset: j, shadowRadius: se }, Vi(r.color) || C && Ga(r.color)), ct = M("defs", {}, ct);
  }
  let Et = "", Ot = "", Jt = "", dt = -1, $e = {}, Pt = {}, qe = null, At = 0;
  for (let H = 0; H < V.length; H++) {
    let j = ut[H], se = ut[H + 1];
    if (!j) continue;
    let Q = V[H], ge = null, J = false, pe = p ? p[Q] : null, ie = j.y, te = j.x, Ue = j.width, K2 = j.line, vt = r.textDecorationLine === "underline" && (r.textDecorationSkipInk || "auto") !== "none";
    if (K2 === dt) continue;
    let Ne = false;
    if (G.length > 1) {
      let be = lr - G[K2];
      if (b === "right" || b === "end") te += be;
      else if (b === "center") te += be / 2;
      else if (b === "justify" && K2 < G.length - 1) {
        let Se = Re[K2], Xe = Se > 1 ? be / (Se - 1) : 0;
        te += Xe * j.lineIndex, Ne = true;
      }
      te = Math.round(te);
    }
    let Ye = Ie[K2], et2 = ee.baseline(Q), fr = ee.height(Q), we = Ye - et2, Ut = /* @__PURE__ */ __name2((be) => !vt || r.textDecorationLine !== "underline" ? void 0 : { underlineY: ft + be + we + et2 + et2 * 0.1, strokeWidth: Math.max(1, S2 * 0.1) }, "Ut");
    if ($e[K2] || ($e[K2] = { left: te, top: ft + ie + we, ascender: et2, width: Ne ? lr : G[K2] }), ve !== 1 / 0) {
      let It = /* @__PURE__ */ __name2(function(ze, tt) {
        let kr = De(tt, "grapheme", h2), cr = "", Tn = 0;
        for (let kn of kr) {
          let En = ze + _t([cr + kn]);
          if (cr && En + Se > kt) break;
          cr += kn, Tn = En;
        }
        return { subset: cr, resolvedWidth: Tn };
      }, "It"), be = de, Se = Te(de);
      Se > kt && (be = vr, Se = Te(be));
      let Xe = Te(tr), We = K2 < G.length - 1;
      if (K2 + 1 === ve && (We || G[K2] > kt)) {
        if (te + Ue + Se + Xe > kt) {
          let { subset: ze, resolvedWidth: tt } = It(te, Q);
          Q = ze + be, dt = K2, $e[K2].width = Math.max(0, tt - $e[K2].left), J = true;
        } else if (se && se.line !== K2) if (b === "center") {
          let { subset: ze, resolvedWidth: tt } = It(te, Q);
          Q = ze + be, dt = K2, $e[K2].width = Math.max(0, tt - $e[K2].left), J = true;
        } else {
          let ze = V[H + 1], { subset: tt, resolvedWidth: kr } = It(Ue + te, ze);
          Q = Q + tt + be, dt = K2, $e[K2].width = Math.max(0, kr - $e[K2].left), J = true;
        }
      }
    }
    if (pe) ie += 0;
    else if (l2) {
      if (!Q.includes(ji) && !aa.includes(Q) && V[H + 1] && se && !se.isImage && ie === se.y && !J) {
        qe === null && (At = te), qe = qe === null ? Q : qe + Q;
        continue;
      }
      let be = qe === null ? Q : qe + Q, Se = qe === null ? te : At, Xe = j.width + te - Se, We = Ut(ie), Qe = ee.getSVG(be.replace(/(\t)+/g, ""), { fontSize: S2, left: lt + Se, top: ft + ie + et2 + we, letterSpacing: T }, We);
      ge = Qe.path, vt && Qe.boxes && Qe.boxes.length && (Pt[K2] || (Pt[K2] = [])).push(...Qe.boxes), qe = null, f && (Jt += M("rect", { x: lt + Se, y: ft + ie + we, width: Xe, height: fr, fill: "transparent", stroke: "#575eff", "stroke-width": 1, transform: He || void 0, "clip-path": Be ? `url(#${Be})` : void 0 }) + M("line", { x1: lt + te, x2: lt + te + j.width, y1: ft + ie + we + et2, y2: ft + ie + we + et2, stroke: "#14c000", "stroke-width": 1, transform: He || void 0, "clip-path": Be ? `url(#${Be})` : void 0 }));
    } else if (ie += et2 + we, vt && !pe) {
      let be = Ut(ie), Se = ee.getSVG(Q.replace(/(\t)+/g, ""), { fontSize: S2, left: lt + te, top: ft + ie, letterSpacing: T }, be);
      Se.boxes && Se.boxes.length && (Pt[K2] || (Pt[K2] = [])).push(...Se.boxes);
    }
    if (ge !== null) Ot += ge + " ";
    else {
      let [be, Se] = Ui({ content: Q, filter: ct, id: a, left: lt + te, top: ft + ie, width: Ue, height: fr, matrix: He, opacity: Kt, image: pe, clipPathId: Be, debug: f, shape: !!O }, r);
      gt += be, qt += Se;
    }
    if (J) break;
  }
  if (r.textDecorationLine && (Et = Object.entries($e).map(([H, j]) => {
    if (!j) return "";
    let se = Pt[H] || [];
    return zi({ left: lt + j.left, top: j.top, width: j.width, ascender: j.ascender, clipPathId: Be, matrix: He, glyphBoxes: se }, r);
  }).join("")), Ot) {
    let H = (!Vi(r.color) || ct) && Kt !== 0 ? `<g ${Ze ? `mask="url(#${Ze})"` : ""} ${Be ? `clip-path="url(#${Be})"` : ""}>` + M("path", { fill: ct && (Vi(r.color) || C && Ga(r.color)) ? "black" : r.color, d: Ot, transform: He || void 0, opacity: Kt !== 1 ? Kt : void 0, style: I ? `filter:${I}` : void 0, "stroke-width": i2.WebkitTextStrokeWidth ? `${i2.WebkitTextStrokeWidth}px` : void 0, stroke: i2.WebkitTextStrokeWidth ? i2.WebkitTextStrokeColor : void 0, "stroke-linejoin": i2.WebkitTextStrokeWidth ? "round" : void 0, "paint-order": i2.WebkitTextStrokeWidth ? "stroke" : void 0 }) + "</g>" : "";
    O && (qt = M("path", { d: Ot, transform: He || void 0 })), gt += (ct ? ct + M("g", { filter: `url(#satori_s-${a})` }, H + Et) : H + Et) + Jt;
  } else Et && (gt += ct ? M("g", { filter: `url(#satori_s-${a})` }, Et) : Et);
  return qt && (r._inheritedBackgroundClipTextPath.value += qt), gt;
}
__name(Hi, "Hi");
function ld(e, t) {
  let n = e.Node.create();
  return n.setAlignItems(e.ALIGN_BASELINE), n.setJustifyContent(Fe(t, { left: e.JUSTIFY_FLEX_START, right: e.JUSTIFY_FLEX_END, center: e.JUSTIFY_CENTER, justify: e.JUSTIFY_SPACE_BETWEEN, start: e.JUSTIFY_FLEX_START, end: e.JUSTIFY_FLEX_END }, e.JUSTIFY_FLEX_START, "textAlign")), n;
}
__name(ld, "ld");
function fd2(e) {
  let t = /(\t)+/.exec(e);
  return t ? { index: t.index, tabCount: t[0].length } : { index: null, tabCount: 0 };
}
__name(fd2, "fd2");
function Gn(e, t, n, r, i2) {
  let o = [], s = t.at(-1), a = s && s.offset && s.offset.unit === "%" && r ? +s.offset.value : 100;
  for (let p of t) {
    let { color: h2 } = p;
    if (!o.length && (o.push({ offset: 0, color: h2 }), !p.offset || p.offset.value === "0")) continue;
    let g2 = typeof p.offset > "u" ? void 0 : p.offset.unit === "%" ? +p.offset.value / a : Number(X(`${p.offset.value}${p.offset.unit}`, n.fontSize, e, n, true)) / e;
    o.push({ offset: g2, color: h2 });
  }
  o.length || o.push({ offset: 0, color: "transparent" });
  let u2 = o[o.length - 1];
  u2.offset !== 1 && (typeof u2.offset > "u" ? u2.offset = 1 : r ? o[o.length - 1] = { offset: 1, color: u2.color } : o.push({ offset: 1, color: u2.color }));
  let f = 0, l2 = 1;
  for (let p = 0; p < o.length; p++) if (typeof o[p].offset > "u") {
    for (l2 < p && (l2 = p); typeof o[l2].offset > "u"; ) l2++;
    o[p].offset = (o[l2].offset - o[f].offset) / (l2 - f) * (p - f) + o[f].offset;
  } else f = p;
  return i2 === "mask" ? o.map((p) => {
    let h2 = (0, import_parse_css_color3.default)(p.color);
    return h2 ? h2.alpha === 0 ? { ...p, color: "rgba(0, 0, 0, 1)" } : { ...p, color: `rgba(255, 255, 255, ${h2.alpha})` } : p;
  }) : o;
}
__name(Gn, "Gn");
function Va({ id: e, width: t, height: n, repeatX: r, repeatY: i2 }, o, s, a, u2, f) {
  let l2 = P(o), [p, h2] = s, g2 = o.startsWith("repeating"), b, y, k;
  if (l2.orientation.type === "directional") b = hd(l2.orientation.value), y = Math.sqrt(Math.pow((b.x2 - b.x1) * p, 2) + Math.pow((b.y2 - b.y1) * h2, 2));
  else if (l2.orientation.type === "angular") {
    let { length: O, ...C } = md(Ti(`${l2.orientation.value.value}${l2.orientation.value.unit}`) / 180 * Math.PI, p, h2);
    y = O, b = C;
  }
  k = g2 ? gd(l2.stops, y, b, u2) : b;
  let S2 = Gn(g2 ? pd(l2.stops, y) : y, l2.stops, u2, g2, f), I = `satori_bi${e}`, w2 = `satori_pattern_${e}`, T = M("pattern", { id: w2, x: a[0] / t, y: a[1] / n, width: r ? p / t : "1", height: i2 ? h2 / n : "1", patternUnits: "objectBoundingBox" }, M("linearGradient", { id: I, ...k, spreadMethod: g2 ? "repeat" : "pad" }, S2.map((O) => M("stop", { offset: (O.offset ?? 0) * 100 + "%", "stop-color": O.color })).join("")) + M("rect", { x: 0, y: 0, width: p, height: h2, fill: `url(#${I})` }));
  return [w2, T];
}
__name(Va, "Va");
function pd(e, t) {
  let n = e[e.length - 1], { offset: r } = n;
  return r ? r.unit === "%" ? Number(r.value) / 100 * t : Number(r.value) : t;
}
__name(pd, "pd");
function hd(e) {
  let t = 0, n = 0, r = 0, i2 = 0;
  return e.includes("top") ? n = 1 : e.includes("bottom") && (i2 = 1), e.includes("left") ? t = 1 : e.includes("right") && (r = 1), !t && !r && !n && !i2 && (n = 1), { x1: t, y1: n, x2: r, y2: i2 };
}
__name(hd, "hd");
function md(e, t, n) {
  let r = Math.pow(n / t, 2);
  e = (e % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
  let i2, o, s, a, u2, f, l2, p, h2 = /* @__PURE__ */ __name2((g2) => {
    if (g2 === 0) {
      i2 = 0, o = n, s = 0, a = 0, u2 = n;
      return;
    } else if (g2 === Math.PI / 2) {
      i2 = 0, o = 0, s = t, a = 0, u2 = t;
      return;
    }
    if (g2 > 0 && g2 < Math.PI / 2) {
      i2 = (r * t / 2 / Math.tan(g2) - n / 2) / (Math.tan(g2) + r / Math.tan(g2)), o = Math.tan(g2) * i2 + n, s = Math.abs(t / 2 - i2) + t / 2, a = n / 2 - Math.abs(o - n / 2), u2 = Math.sqrt(Math.pow(s - i2, 2) + Math.pow(a - o, 2)), l2 = (t / 2 / Math.tan(g2) - n / 2) / (Math.tan(g2) + 1 / Math.tan(g2)), p = Math.tan(g2) * l2 + n, u2 = 2 * Math.sqrt(Math.pow(t / 2 - l2, 2) + Math.pow(n / 2 - p, 2));
      return;
    } else if (g2 > Math.PI / 2 && g2 < Math.PI) {
      i2 = (n / 2 + r * t / 2 / Math.tan(g2)) / (Math.tan(g2) + r / Math.tan(g2)), o = Math.tan(g2) * i2, s = Math.abs(t / 2 - i2) + t / 2, a = n / 2 + Math.abs(o - n / 2), l2 = (t / 2 / Math.tan(g2) + n / 2) / (Math.tan(g2) + 1 / Math.tan(g2)), p = Math.tan(g2) * l2, u2 = 2 * Math.sqrt(Math.pow(t / 2 - l2, 2) + Math.pow(n / 2 - p, 2));
      return;
    } else g2 >= Math.PI && (h2(g2 - Math.PI), f = i2, i2 = s, s = f, f = o, o = a, a = f);
  }, "h");
  return h2(e), { x1: i2 / t, y1: o / n, x2: s / t, y2: a / n, length: u2 };
}
__name(md, "md");
function gd(e, t, n, r) {
  let { x1: i2, x2: o, y1: s, y2: a } = n, u2 = e[0].offset ? e[0].offset.unit === "%" ? Number(e[0].offset.value) / 100 : X(`${e[0].offset.value}${e[0].offset.unit}`, r.fontSize, t, r, true) / t : 0, f = e.at(-1).offset ? e.at(-1).offset.unit === "%" ? Number(e.at(-1).offset.value) / 100 : X(`${e.at(-1).offset.value}${e.at(-1).offset.unit}`, r.fontSize, t, r, true) / t : 1, l2 = (o - i2) * u2 + i2, p = (a - s) * u2 + s, h2 = (o - i2) * f + i2, g2 = (a - s) * f + s;
  return { x1: l2, y1: p, x2: h2, y2: g2 };
}
__name(gd, "gd");
function Ya({ id: e, width: t, height: n, repeatX: r, repeatY: i2 }, o, s, a, u2, f) {
  var oe;
  let { shape: l2, stops: p, position: h2, size: g2, repeating: b } = K(o), [y, k] = s, S2 = y / 2, I = k / 2, w2 = yd(h2.x, h2.y, y, k, u2.fontSize, u2);
  S2 = w2.x, I = w2.y;
  let T = vd(t, p, b, u2), O = Gn(T, p, u2, b, f), C = `satori_radial_${e}`, D = `satori_pattern_${e}`, q = `satori_mask_${e}`, Y = wd(l2, g2, u2.fontSize, { x: S2, y: I }, [y, k], u2, b), ue = xd(l2, u2.fontSize, p, [y, k], u2, b, Y), _e = M("pattern", { id: D, x: a[0] / t, y: a[1] / n, width: r ? y / t : "1", height: i2 ? k / n : "1", patternUnits: "objectBoundingBox" }, M("radialGradient", { id: C, ...ue }, O.map((ve) => M("stop", { offset: ve.offset || 0, "stop-color": ve.color })).join("")) + M("mask", { id: q }, M("rect", { x: 0, y: 0, width: y, height: k, fill: "#fff" })) + M("rect", { x: 0, y: 0, width: y, height: k, fill: ((oe = O.at(-1)) == null ? void 0 : oe.color) || "transparent" }) + M(l2, { cx: S2, cy: I, width: y, height: k, ...Y, fill: `url(#${C})`, mask: `url(#${q})` }));
  return [D, _e];
}
__name(Ya, "Ya");
function vd(e, t, n, r) {
  if (!n) return e;
  let i2 = t.at(-1);
  return !i2 || !i2.offset || i2.offset.unit === "%" ? e : X(`${i2.offset.value}${i2.offset.unit}`, +r.fontSize, e, r, true);
}
__name(vd, "vd");
function yd(e, t, n, r, i2, o) {
  let s = { x: n / 2, y: r / 2 };
  return e.type === "keyword" ? Object.assign(s, Ha(e.value, n, r, "x")) : s.x = X(`${e.value.value}${e.value.unit}`, i2, n, o, true) ?? n / 2, t.type === "keyword" ? Object.assign(s, Ha(t.value, n, r, "y")) : s.y = X(`${t.value.value}${t.value.unit}`, i2, r, o, true) ?? r / 2, s;
}
__name(yd, "yd");
function Ha(e, t, n, r) {
  switch (e) {
    case "center":
      return { [r]: r === "x" ? t / 2 : n / 2 };
    case "left":
      return { x: 0 };
    case "top":
      return { y: 0 };
    case "right":
      return { x: t };
    case "bottom":
      return { y: n };
  }
}
__name(Ha, "Ha");
function xd(e, t, n, [r, i2], o, s, a) {
  let { r: u2, rx: f, ratio: l2 = 1 } = a;
  if (!s) return { spreadMethod: "pad" };
  let p = n.at(-1), h2 = e === "circle" ? u2 * 2 : f * 2;
  return { spreadMethod: "repeat", cx: "50%", cy: "50%", r: p.offset.unit === "%" ? `${Number(p.offset.value) * Math.min(i2 / r, 1) / l2}%` : Number(X(`${p.offset.value}${p.offset.unit}`, t, r, o, true) / h2) };
}
__name(xd, "xd");
function wd(e, t, n, r, i2, o, s) {
  let [a, u2] = i2, { x: f, y: l2 } = r, p = {}, h2 = 0, g2 = 0;
  if (Sd(t)) {
    if (t.some((b) => b.value.value.startsWith("-"))) throw new Error("disallow setting negative values to the size of the shape. Check https://w3c.github.io/csswg-drafts/css-images/#valdef-rg-size-length-0");
    return e === "circle" ? Object.assign(p, { r: Number(X(`${t[0].value.value}${t[0].value.unit}`, n, a, o, true)) }) : Object.assign(p, { rx: Number(X(`${t[0].value.value}${t[0].value.unit}`, n, a, o, true)), ry: Number(X(`${t[1].value.value}${t[1].value.unit}`, n, u2, o, true)) }), jn(p, a, u2, f, l2, s, e), p;
  }
  switch (t[0].value) {
    case "farthest-corner":
      h2 = Math.max(Math.abs(a - f), Math.abs(f)), g2 = Math.max(Math.abs(u2 - l2), Math.abs(l2));
      break;
    case "closest-corner":
      h2 = Math.min(Math.abs(a - f), Math.abs(f)), g2 = Math.min(Math.abs(u2 - l2), Math.abs(l2));
      break;
    case "farthest-side":
      return e === "circle" ? p.r = Math.max(Math.abs(a - f), Math.abs(f), Math.abs(u2 - l2), Math.abs(l2)) : (p.rx = Math.max(Math.abs(a - f), Math.abs(f)), p.ry = Math.max(Math.abs(u2 - l2), Math.abs(l2))), jn(p, a, u2, f, l2, s, e), p;
    case "closest-side":
      return e === "circle" ? p.r = Math.min(Math.abs(a - f), Math.abs(f), Math.abs(u2 - l2), Math.abs(l2)) : (p.rx = Math.min(Math.abs(a - f), Math.abs(f)), p.ry = Math.min(Math.abs(u2 - l2), Math.abs(l2))), jn(p, a, u2, f, l2, s, e), p;
  }
  return e === "circle" ? p.r = Math.sqrt(h2 * h2 + g2 * g2) : Object.assign(p, Xa(h2, g2)), jn(p, a, u2, f, l2, s, e), p;
}
__name(wd, "wd");
function jn(e, t, n, r, i2, o, s) {
  if (o) if (s === "ellipse") {
    let a = Math.max(Math.abs(t - r), Math.abs(r)), u2 = Math.max(Math.abs(n - i2), Math.abs(i2)), { rx: f, ry: l2 } = Xa(a, u2);
    e.ratio = Math.max(f / e.rx, l2 / e.ry), e.ratio > 1 && (e.rx *= e.ratio, e.ry *= e.ratio);
  } else {
    let a = Math.max(Math.abs(t - r), Math.abs(r)), u2 = Math.max(Math.abs(n - i2), Math.abs(i2)), f = Math.sqrt(a * a + u2 * u2);
    e.ratio = f / e.r, e.ratio > 1 && (e.r = f);
  }
}
__name(jn, "jn");
function Xa(e, t) {
  let n = t !== 0 ? e / t : 1;
  if (e === 0) return { rx: 0, ry: 0 };
  {
    let r = Math.sqrt(e * e + t * t * n * n) / n;
    return { ry: r, rx: r * n };
  }
}
__name(Xa, "Xa");
function Sd(e) {
  return !e.some((t) => t.type === "keyword");
}
__name(Sd, "Sd");
function _d(e, t) {
  return typeof e == "string" && e.endsWith("%") ? t * parseFloat(e) / 100 : +e;
}
__name(_d, "_d");
function Yi(e, { x: t, y: n, defaultX: r, defaultY: i2 }) {
  return (e ? e.split(" ").map((o) => {
    try {
      let s = new Lt(o);
      return s.type === "length" || s.type === "number" ? s.value : s.value + s.unit;
    } catch {
      return null;
    }
  }).filter((o) => o !== null) : [r, i2]).map((o, s) => _d(o, [t, n][s]));
}
__name(Yi, "Yi");
async function Lr({ id: e, width: t, height: n, left: r, top: i2 }, { image: o, size: s, position: a, repeat: u2 }, f, l2) {
  u2 = u2 || "repeat", l2 = l2 || "background";
  let p = u2 === "repeat-x" || u2 === "repeat", h2 = u2 === "repeat-y" || u2 === "repeat", g2 = Yi(s, { x: t, y: n, defaultX: t, defaultY: n }), b = Yi(a, { x: t, y: n, defaultX: 0, defaultY: 0 });
  if (o.startsWith("linear-gradient(") || o.startsWith("repeating-linear-gradient(")) return Va({ id: e, width: t, height: n, repeatX: p, repeatY: h2 }, o, g2, b, f, l2);
  if (o.startsWith("radial-gradient(") || o.startsWith("repeating-radial-gradient(")) return Ya({ id: e, width: t, height: n, repeatX: p, repeatY: h2 }, o, g2, b, f, l2);
  if (o.startsWith("url(")) {
    let y = Yi(s, { x: t, y: n, defaultX: 0, defaultY: 0 }), [k, S2, I] = await br(o.slice(4, -1)), w2 = l2 === "mask" ? S2 || y[0] : y[0] || S2, T = l2 === "mask" ? I || y[1] : y[1] || I;
    return [`satori_bi${e}`, M("pattern", { id: `satori_bi${e}`, patternContentUnits: "userSpaceOnUse", patternUnits: "userSpaceOnUse", x: b[0] + r, y: b[1] + i2, width: p ? w2 : "100%", height: h2 ? T : "100%" }, M("image", { x: 0, y: 0, width: w2, height: T, preserveAspectRatio: "none", href: k }))];
  }
  if ((0, import_parse_css_color4.default)(o)) {
    let y = (0, import_parse_css_color4.default)(o), [k, S2, I, w2] = y.values, O = `rgba(${k},${S2},${I},${w2 !== void 0 ? w2 : 1})`;
    return [`satori_bi${e}`, M("pattern", { id: `satori_bi${e}`, patternContentUnits: "userSpaceOnUse", patternUnits: "userSpaceOnUse", x: r, y: i2, width: t, height: n }, M("rect", { x: 0, y: 0, width: t, height: n, fill: O }))];
  }
  throw new Error(`Invalid background image: "${o}"`);
}
__name(Lr, "Lr");
function Td([e, t]) {
  return Math.round(e * 1e3) === 0 && Math.round(t * 1e3) === 0 ? 0 : Math.round(e * t / Math.sqrt(e * e + t * t) * 1e3) / 1e3;
}
__name(Td, "Td");
function Vn(e, t, n) {
  return n < e + t && (n / 2 < e && n / 2 < t ? e = t = n / 2 : n / 2 < e ? e = n - t : n / 2 < t && (t = n - e)), [e, t];
}
__name(Vn, "Vn");
function Hn(e) {
  e[0] = e[1] = Math.min(e[0], e[1]);
}
__name(Hn, "Hn");
function Yn(e, t, n, r, i2) {
  if (typeof e == "string") {
    let o = e.split(" ").map((a) => a.trim()), s = !o[1] && !o[0].endsWith("%");
    return o[1] = o[1] || o[0], [s, [Math.min(X(o[0], r, t, i2, true), t), Math.min(X(o[1], r, n, i2, true), n)]];
  }
  return typeof e == "number" ? [true, [Math.min(e, t), Math.min(e, n)]] : [true, void 0];
}
__name(Yn, "Yn");
function Ka({ id: e, borderRadiusPath: t, borderType: n, left: r, top: i2, width: o, height: s }, a) {
  let u2 = `satori_brc-${e}`;
  return [M("clipPath", { id: u2 }, M(n, { x: r, y: i2, width: o, height: s, d: t || void 0 })), u2];
}
__name(Ka, "Ka");
function Vt({ left: e, top: t, width: n, height: r }, i2, o) {
  let { borderTopLeftRadius: s, borderTopRightRadius: a, borderBottomLeftRadius: u2, borderBottomRightRadius: f, fontSize: l2 } = i2, p, h2, g2, b;
  if ([p, s] = Yn(s, n, r, l2, i2), [h2, a] = Yn(a, n, r, l2, i2), [g2, u2] = Yn(u2, n, r, l2, i2), [b, f] = Yn(f, n, r, l2, i2), !o && !Xn(s) && !Xn(a) && !Xn(u2) && !Xn(f)) return "";
  s ||= [0, 0], a ||= [0, 0], u2 ||= [0, 0], f ||= [0, 0], [s[0], a[0]] = Vn(s[0], a[0], n), [u2[0], f[0]] = Vn(u2[0], f[0], n), [s[1], u2[1]] = Vn(s[1], u2[1], r), [a[1], f[1]] = Vn(a[1], f[1], r), p && Hn(s), h2 && Hn(a), g2 && Hn(u2), b && Hn(f);
  let y = [];
  y[0] = [a, a], y[1] = [f, [-f[0], f[1]]], y[2] = [u2, [-u2[0], -u2[1]]], y[3] = [s, [s[0], -s[1]]];
  let k = `h${n - s[0] - a[0]} a${y[0][0]} 0 0 1 ${y[0][1]}`, S2 = `v${r - a[1] - f[1]} a${y[1][0]} 0 0 1 ${y[1][1]}`, I = `h${f[0] + u2[0] - n} a${y[2][0]} 0 0 1 ${y[2][1]}`, w2 = `v${u2[1] + s[1] - r} a${y[3][0]} 0 0 1 ${y[3][1]}`;
  if (o) {
    let O = /* @__PURE__ */ __name2(function(ce) {
      let oe = Td([s, a, f, u2][ce]);
      return ce === 0 ? [[e + s[0] - oe, t + s[1] - oe], [e + s[0], t]] : ce === 1 ? [[e + n - a[0] + oe, t + a[1] - oe], [e + n, t + a[1]]] : ce === 2 ? [[e + n - f[0] + oe, t + r - f[1] + oe], [e + n - f[0], t + r]] : [[e + u2[0] - oe, t + r - u2[1] + oe], [e, t + r - u2[1]]];
    }, "O"), T = o.indexOf(false);
    if (!o.includes(true)) throw new Error("Invalid `partialSides`.");
    if (T === -1) T = 0;
    else for (; !o[T]; ) T = (T + 1) % 4;
    let C = "", D = O(T), q = `M${D[0]} A${y[(T + 3) % 4][0]} 0 0 1 ${D[1]}`, Y = 0;
    for (; Y < 4 && o[(T + Y) % 4]; Y++) C += q + " ", q = [k, S2, I, w2][(T + Y) % 4];
    let ue = (T + Y) % 4;
    C += q.split(" ")[0];
    let _e = O(ue);
    return C += ` A${y[(ue + 3) % 4][0]} 0 0 1 ${_e[0]}`, C;
  }
  return `M${e + s[0]},${t} ${k} ${S2} ${I} ${w2}`;
}
__name(Vt, "Vt");
function Ja(e, t, n) {
  return n[e + "Width"] === n[t + "Width"] && n[e + "Style"] === n[t + "Style"] && n[e + "Color"] === n[t + "Color"];
}
__name(Ja, "Ja");
function Za({ id: e, currentClipPathId: t, borderPath: n, borderType: r, left: i2, top: o, width: s, height: a }, u2) {
  if (!(u2.borderTopWidth || u2.borderRightWidth || u2.borderBottomWidth || u2.borderLeftWidth)) return null;
  let l2 = `satori_bc-${e}`;
  return [M("clipPath", { id: l2, "clip-path": t ? `url(#${t})` : void 0 }, M(r, { x: i2, y: o, width: s, height: a, d: n || void 0 })), l2];
}
__name(Za, "Za");
function Mr({ left: e, top: t, width: n, height: r, props: i2, asContentMask: o, maskBorderOnly: s }, a) {
  let u2 = ["borderTop", "borderRight", "borderBottom", "borderLeft"];
  if (!o && !u2.some((g2) => a[g2 + "Width"])) return "";
  let f = "", l2 = 0;
  for (; l2 > 0 && Ja(u2[l2], u2[(l2 + 3) % 4], a); ) l2 = (l2 + 3) % 4;
  let p = [false, false, false, false], h2 = [];
  for (let g2 = 0; g2 < 4; g2++) {
    let b = (l2 + g2) % 4, y = (l2 + g2 + 1) % 4, k = u2[b], S2 = u2[y];
    if (p[b] = true, h2 = [a[k + "Width"], a[k + "Style"], a[k + "Color"], k], !Ja(k, S2, a)) {
      let I = (h2[0] || 0) + (o && !s && a[k.replace("border", "padding")] || 0);
      I && (f += M("path", { width: n, height: r, ...i2, fill: "none", stroke: o ? "#000" : h2[2], "stroke-width": I * 2, "stroke-dasharray": !o && h2[1] === "dashed" ? I * 2 + " " + I : void 0, d: Vt({ left: e, top: t, width: n, height: r }, a, p) })), p = [false, false, false, false];
    }
  }
  if (p.some(Boolean)) {
    let g2 = (h2[0] || 0) + (o && !s && a[h2[3].replace("border", "padding")] || 0);
    g2 && (f += M("path", { width: n, height: r, ...i2, fill: "none", stroke: o ? "#000" : h2[2], "stroke-width": g2 * 2, "stroke-dasharray": !o && h2[1] === "dashed" ? g2 * 2 + " " + g2 : void 0, d: Vt({ left: e, top: t, width: n, height: r }, a, p) }));
  }
  return f;
}
__name(Mr, "Mr");
function Xi({ id: e, left: t, top: n, width: r, height: i2, matrix: o, borderOnly: s }, a) {
  let u2 = (a.borderLeftWidth || 0) + (s ? 0 : a.paddingLeft || 0), f = (a.borderTopWidth || 0) + (s ? 0 : a.paddingTop || 0), l2 = (a.borderRightWidth || 0) + (s ? 0 : a.paddingRight || 0), p = (a.borderBottomWidth || 0) + (s ? 0 : a.paddingBottom || 0), h2 = { x: t + u2, y: n + f, width: r - u2 - l2, height: i2 - f - p };
  return M("mask", { id: e }, M("rect", { ...h2, fill: "#fff", transform: a.overflow === "hidden" && a.transform && o ? o : void 0, mask: a._inheritedMaskId ? `url(#${a._inheritedMaskId})` : void 0 }) + Mr({ left: t, top: n, width: r, height: i2, props: { transform: o || void 0 }, asContentMask: true, maskBorderOnly: s }, a));
}
__name(Xi, "Xi");
function nu({ width: e, height: t }, n, r) {
  function i2(f) {
    let l2 = f.match(Nr.circle);
    if (!l2) return null;
    let [, p] = l2, [h2, g2 = ""] = p.split("at").map((k) => k.trim()), { x: b, y } = ru(g2, e, t);
    return { type: "circle", r: X(h2, r.fontSize, Math.sqrt(Math.pow(e, 2) + Math.pow(t, 2)) / Math.sqrt(2), r, true), cx: X(b, r.fontSize, e, r, true), cy: X(y, r.fontSize, t, r, true) };
  }
  __name(i2, "i");
  __name2(i2, "i");
  function o(f) {
    let l2 = f.match(Nr.ellipse);
    if (!l2) return null;
    let [, p] = l2, [h2, g2 = ""] = p.split("at").map((I) => I.trim()), [b, y] = h2.split(" "), { x: k, y: S2 } = ru(g2, e, t);
    return { type: "ellipse", rx: X(b || "50%", r.fontSize, e, r, true), ry: X(y || "50%", r.fontSize, t, r, true), cx: X(k, r.fontSize, e, r, true), cy: X(S2, r.fontSize, t, r, true) };
  }
  __name(o, "o");
  __name2(o, "o");
  function s(f) {
    let l2 = f.match(Nr.path);
    if (!l2) return null;
    let [p, h2] = tu(l2[1]);
    return { type: "path", d: h2, "fill-rule": p };
  }
  __name(s, "s");
  __name2(s, "s");
  function a(f) {
    let l2 = f.match(Nr.polygon);
    if (!l2) return null;
    let [p, h2] = tu(l2[1]);
    return { type: "polygon", "fill-rule": p, points: h2.split(",").map((g2) => g2.split(" ").map((b, y) => X(b, r.fontSize, y === 0 ? e : t, r, true)).join(" ")).join(",") };
  }
  __name(a, "a");
  __name2(a, "a");
  function u2(f) {
    let l2 = f.match(Nr.inset);
    if (!l2) return null;
    let [p, h2] = (l2[1].includes("round") ? l2[1] : `${l2[1].trim()} round 0`).split("round"), g2 = (0, import_css_to_react_native3.getStylesForProperty)("borderRadius", h2, true), b = Object.values(g2).map((T) => String(T)).map((T, O) => X(T, r.fontSize, O === 0 || O === 2 ? t : e, r, true) || 0), y = Object.values((0, import_css_to_react_native3.getStylesForProperty)("margin", p, true)).map((T) => String(T)).map((T, O) => X(T, r.fontSize, O === 0 || O === 2 ? t : e, r, true) || 0), k = y[3], S2 = y[0], I = e - (y[1] + y[3]), w2 = t - (y[0] + y[2]);
    return b.some((T) => T > 0) ? { type: "path", d: Vt({ left: k, top: S2, width: I, height: w2 }, { ...n, ...g2 }) } : { type: "rect", x: k, y: S2, width: I, height: w2 };
  }
  __name(u2, "u2");
  __name2(u2, "u");
  return { parseCircle: i2, parseEllipse: o, parsePath: s, parsePolygon: a, parseInset: u2 };
}
__name(nu, "nu");
function tu(e) {
  let [, t = "nonzero", n] = e.replace(/('|")/g, "").match(/^(nonzero|evenodd)?,?(.+)/) || [];
  return [t, n];
}
__name(tu, "tu");
function ru(e, t, n) {
  let r = e.split(" "), i2 = { x: r[0] || "50%", y: r[1] || "50%" };
  return r.forEach((o) => {
    o === "top" ? i2.y = 0 : o === "bottom" ? i2.y = n : o === "left" ? i2.x = 0 : o === "right" ? i2.x = t : o === "center" && (i2.x = t / 2, i2.y = n / 2);
  }), i2;
}
__name(ru, "ru");
function Qn(e) {
  return `satori_cp-${e}`;
}
__name(Qn, "Qn");
function iu(e) {
  return `url(#${Qn(e)})`;
}
__name(iu, "iu");
function ou(e, t, n) {
  if (t.clipPath === "none") return "";
  let r = nu(e, t, n), i2 = t.clipPath, o = { type: "" };
  for (let s of Object.keys(r)) if (o = r[s](i2), o) break;
  if (o) {
    let { type: s, ...a } = o;
    return M("clipPath", { id: Qn(e.id), "clip-path": e.currentClipPath, transform: `translate(${e.left}, ${e.top})` }, M(s, a));
  }
  return "";
}
__name(ou, "ou");
function Qi({ left: e, top: t, width: n, height: r, path: i2, matrix: o, id: s, currentClipPath: a, src: u2 }, f, l2) {
  let p = "", h2 = f.clipPath && f.clipPath !== "none" ? ou({ left: e, top: t, width: n, height: r, path: i2, id: s, matrix: o, currentClipPath: a, src: u2 }, f, l2) : "";
  if (f.overflow !== "hidden" && !u2) p = "";
  else {
    let b = h2 ? `satori_ocp-${s}` : Qn(s);
    p = M("clipPath", { id: b, "clip-path": a }, M(i2 ? "path" : "rect", { x: e, y: t, width: n, height: r, d: i2 || void 0, transform: f.overflow === "hidden" && f.transform && o ? o : void 0 }));
  }
  let g2 = Xi({ id: `satori_om-${s}`, left: e, top: t, width: n, height: r, matrix: o, borderOnly: !u2 }, f);
  return h2 + p + g2;
}
__name(Qi, "Qi");
async function Ki(e, t, n) {
  if (!t.maskImage) return ["", ""];
  let { left: r, top: i2, width: o, height: s, id: a } = e, u2 = t.maskImage, f = u2.length;
  if (!f) return ["", ""];
  let l2 = kd(a), p = "";
  for (let h2 = 0; h2 < f; h2++) {
    let g2 = u2[h2], [b, y] = await Lr({ id: `${l2}-${h2}`, left: r, top: i2, width: o, height: s }, g2, n, "mask");
    p += y + M("rect", { x: r, y: i2, width: o, height: s, fill: `url(#${b})` });
  }
  return p = M("mask", { id: l2 }, p), [l2, p];
}
__name(Ki, "Ki");
async function Wr({ id: e, left: t, top: n, width: r, height: i2, isInheritingTransform: o, src: s, debug: a }, u2, f) {
  if (u2.display === "none") return "";
  let l2 = !!s, p = "rect", h2 = "", g2 = "", b = [], y = 1, k = "";
  u2.backgroundColor && b.push(u2.backgroundColor), u2.opacity !== void 0 && (y = +u2.opacity), u2.transform && (h2 = Cr({ left: t, top: n, width: r, height: i2 }, u2.transform, o, u2.transformOrigin));
  let S2 = "";
  if (u2.backgroundImage) {
    let de = [];
    for (let le = 0; le < u2.backgroundImage.length; le++) {
      let ee = u2.backgroundImage[le], Le = await Lr({ id: e + "_" + le, width: r, height: i2, left: t, top: n }, ee, f);
      Le && de.unshift(Le);
    }
    for (let le of de) b.push(`url(#${le[0]})`), g2 += le[1], le[2] && (S2 += le[2]);
  }
  let [I, w2] = await Ki({ id: e, left: t, top: n, width: r, height: i2 }, u2, f);
  g2 += w2;
  let T = I ? `url(#${I})` : u2._inheritedMaskId ? `url(#${u2._inheritedMaskId})` : void 0, O = Vt({ left: t, top: n, width: r, height: i2 }, u2);
  O && (p = "path");
  let C = u2._inheritedClipPathId;
  a && (k = M("rect", { x: t, y: n, width: r, height: i2, fill: "transparent", stroke: "#ff5757", "stroke-width": 1, transform: h2 || void 0, "clip-path": C ? `url(#${C})` : void 0 }));
  let { backgroundClip: D, filter: q } = u2, Y = D === "text" ? `url(#satori_bct-${e})` : C ? `url(#${C})` : u2.clipPath ? iu(e) : void 0, ue = Qi({ left: t, top: n, width: r, height: i2, path: O, id: e, matrix: h2, currentClipPath: Y, src: s }, u2, f), _e = b.map((de) => M(p, { x: t, y: n, width: r, height: i2, fill: de, d: O || void 0, transform: h2 || void 0, "clip-path": u2.transform ? void 0 : Y, style: q ? `filter:${q}` : void 0, mask: u2.transform ? void 0 : T })).join(""), ce = Za({ id: e, left: t, top: n, width: r, height: i2, currentClipPathId: C, borderPath: O, borderType: p }, u2), oe;
  if (l2) {
    let de = (u2.borderLeftWidth || 0) + (u2.paddingLeft || 0), le = (u2.borderTopWidth || 0) + (u2.paddingTop || 0), ee = (u2.borderRightWidth || 0) + (u2.paddingRight || 0), Le = (u2.borderBottomWidth || 0) + (u2.paddingBottom || 0), Oe = "Mid", Te = "Mid", Me = (u2.objectPosition || "center").toString().trim().toLowerCase().split(/\s+/);
    if (Me.length === 1) switch (Me[0]) {
      case "left":
        Oe = "Min", Te = "Mid";
        break;
      case "right":
        Oe = "Max", Te = "Mid";
        break;
      case "top":
        Oe = "Mid", Te = "Min";
        break;
      case "bottom":
        Oe = "Mid", Te = "Max";
        break;
      case "center":
        Oe = "Mid", Te = "Mid";
        break;
    }
    else if (Me.length === 2) for (let G of Me) G === "left" ? Oe = "Min" : G === "right" ? Oe = "Max" : G === "center" ? Oe = "Mid" : G === "top" ? Te = "Min" : G === "bottom" && (Te = "Max");
    let Je = `x${Oe}Y${Te}`, Pe = u2.objectFit === "contain" ? Je : u2.objectFit === "cover" ? `${Je} slice` : "none";
    u2.transform && (oe = Ka({ id: e, borderRadiusPath: O, borderType: p, left: t, top: n, width: r, height: i2 }, u2)), _e += M("image", { x: t + de, y: n + le, width: r - de - ee, height: i2 - le - Le, href: s, preserveAspectRatio: Pe, transform: h2 || void 0, style: q ? `filter:${q}` : void 0, "clip-path": u2.transform ? oe ? `url(#${oe[1]})` : void 0 : `url(#satori_cp-${e})`, mask: u2.transform ? void 0 : I ? `url(#${I})` : `url(#satori_om-${e})` });
  }
  if (ce) {
    g2 += ce[0];
    let de = ce[1];
    _e += Mr({ left: t, top: n, width: r, height: i2, props: { transform: h2 || void 0, "clip-path": `url(#${de})` } }, u2);
  }
  let ve = qa({ width: r, height: i2, id: e, opacity: y, shape: M(p, { x: t, y: n, width: r, height: i2, fill: "#fff", stroke: "#fff", "stroke-width": 0, d: O || void 0, transform: h2 || void 0, "clip-path": Y, mask: T }) }, u2);
  return (g2 ? M("defs", {}, g2) : "") + (ve ? ve[0] : "") + (oe ? oe[0] : "") + ue + (y !== 1 ? `<g opacity="${y}">` : "") + (u2.transform && (Y || T) ? `<g${Y ? ` clip-path="${Y}"` : ""}${T ? ` mask="${T}"` : ""}>` : "") + (S2 || _e) + (u2.transform && (Y || T) ? "</g>" : "") + (y !== 1 ? "</g>" : "") + (ve ? ve[1] : "") + k;
}
__name(Wr, "Wr");
function lu(e) {
  return Kn.includes(e);
}
__name(lu, "lu");
function fu(e, t) {
  for (let r of Object.keys(Ji)) if (Ji[r].test(e)) return [r];
  let n = Object.keys(Zi).filter((r) => Zi[r].test(e));
  if (n.length === 0) return ["unknown"];
  if (t) {
    let r = n.findIndex((i2) => i2 === t);
    r !== -1 && (n.splice(r, 1), n.unshift(t));
  }
  return n;
}
__name(fu, "fu");
function cu(e) {
  if (e) return Kn.find((t) => t.toLowerCase().startsWith(e.toLowerCase()));
}
__name(cu, "cu");
async function* Dr(e, t) {
  var Pe;
  let n = await Gt(), { id: r, inheritedStyle: i2, parent: o, font: s, debug: a, locale: u2, embedFont: f = true, graphemeImages: l2, canLoadAdditionalAssets: p, getTwStyles: h2 } = t;
  if (e === null || typeof e > "u") return yield, yield, "";
  if (!dr(e) || ia(e.type)) {
    let G;
    if (!dr(e)) G = Hi(String(e), t), yield (await G.next()).value;
    else {
      if (na(e.type)) throw new Error("Class component is not supported.");
      let Re;
      _i(e.type) ? Re = e.type.render : Re = e.type, G = Dr(await Re(e.props), t), yield (await G.next()).value;
    }
    await G.next();
    let Ie = yield;
    return (await G.next(Ie)).value;
  }
  let { type: g2, props: b } = e, y = g2;
  if (b && oa(b)) throw new Error("dangerouslySetInnerHTML property is not supported. See documentation for more information https://github.com/vercel/satori#jsx.");
  let { style: k, children: S2, tw: I, lang: w2 = u2 } = b || {}, T = cu(w2);
  if (I) {
    let G = h2(I, k);
    k = Object.assign(G, k);
  }
  let O = n.Node.create();
  o.insertChild(O, o.getChildCount());
  let [C, D] = await qi(O, y, i2, k, b), q = C.transform === i2.transform;
  if (q || (C.transform.__parent = i2.transform), (C.overflow === "hidden" || C.clipPath && C.clipPath !== "none") && (D._inheritedClipPathId = `satori_cp-${r}`, D._inheritedMaskId = `satori_om-${r}`), C.maskImage && (D._inheritedMaskId = `satori_mi-${r}`), C.backgroundClip === "text") {
    let G = { value: "" };
    D._inheritedBackgroundClipTextPath = G, C._inheritedBackgroundClipTextPath = G, C.backgroundImage && (D._inheritedBackgroundClipTextHasBackground = "true", C._inheritedBackgroundClipTextHasBackground = "true");
  }
  let Y = sa(S2), ue = [], _e = 0, ce = [];
  for (let G of Y) {
    let Ie = Dr(G, { id: r + "-" + _e++, parentStyle: C, inheritedStyle: D, isInheritingTransform: true, parent: O, font: s, embedFont: f, debug: a, graphemeImages: l2, canLoadAdditionalAssets: p, locale: T, getTwStyles: h2, onNodeDetected: t.onNodeDetected });
    p ? ce.push(...(await Ie.next()).value || []) : await Ie.next(), ue.push(Ie);
  }
  yield ce;
  for (let G of ue) await G.next();
  let [oe, ve] = yield, { left: de, top: le, width: ee, height: Le } = O.getComputedLayout();
  de += oe, le += ve;
  let Oe = "", Te = "", _t = "", { children: Me, ...Je } = b;
  if ((Pe = t.onNodeDetected) == null || Pe.call(t, { left: de, top: le, width: ee, height: Le, type: y, props: Je, key: e.key, textContent: dr(Me) ? void 0 : Me }), y === "img") {
    let G = C.__src;
    Te = await Wr({ id: r, left: de, top: le, width: ee, height: Le, src: G, isInheritingTransform: q, debug: a }, C, D);
  } else if (y === "svg") {
    let G = C.color, Ie = await Ia(e, G);
    Te = await Wr({ id: r, left: de, top: le, width: ee, height: Le, src: Ie, isInheritingTransform: q, debug: a }, C, D);
  } else {
    let G = k == null ? void 0 : k.display;
    if (y === "div" && S2 && typeof S2 != "string" && G !== "flex" && G !== "none" && G !== "contents") throw new Error('Expected <div> to have explicit "display: flex", "display: contents", or "display: none" if it has more than one child node.');
    Te = await Wr({ id: r, left: de, top: le, width: ee, height: Le, isInheritingTransform: q, debug: a }, C, D);
  }
  for (let G of ue) Oe += (await G.next([de, le])).value;
  return C._inheritedBackgroundClipTextPath && (_t += M("clipPath", { id: `satori_bct-${r}`, "clip-path": C._inheritedClipPathId ? `url(#${C._inheritedClipPathId})` : void 0 }, C._inheritedBackgroundClipTextPath.value)), _t + Te + Oe;
}
__name(Dr, "Dr");
function Od(e) {
  let t = [], n = [0, 0], r = [0, 0], i2 = /* @__PURE__ */ __name2((o, s) => {
    let a = o[0];
    for (let u2 = 1; u2 <= s; u2++) {
      let f = u2 / s, l2 = Pd(o, f);
      t.push({ from: a, to: l2 }), a = l2;
    }
    r = o[o.length - 1];
  }, "i");
  for (let o of e) {
    if (o.type === "M") {
      n = r = [o.x, o.y];
      continue;
    }
    if (o.type === "L") {
      let s = [o.x, o.y];
      t.push({ from: r, to: s }), r = s;
      continue;
    }
    if (o.type === "Q") {
      i2([r, [o.x1, o.y1], [o.x, o.y]], 12);
      continue;
    }
    if (o.type === "C") {
      i2([r, [o.x1, o.y1], [o.x2, o.y2], [o.x, o.y]], 16);
      continue;
    }
    o.type === "Z" && (t.push({ from: r, to: n }), r = n);
  }
  return t;
}
__name(Od, "Od");
function Pd(e, t) {
  let n = e;
  for (; n.length > 1; ) {
    let r = [];
    for (let i2 = 0; i2 < n.length - 1; i2++) r.push([n[i2][0] + (n[i2 + 1][0] - n[i2][0]) * t, n[i2][1] + (n[i2 + 1][1] - n[i2][1]) * t]);
    n = r;
  }
  return n[0];
}
__name(Pd, "Pd");
function Ad(e, t) {
  if (!t) return [];
  let n = t.strokeWidth, r = t.underlineY - n * 0.25, i2 = t.underlineY + n * 2.5, o = Od(e);
  if (!o.length) return [];
  let s = i2 - r, a = Math.max(12, Math.ceil(s / 0.25)), u2 = s / a, f = r + u2 / 2, l2 = /* @__PURE__ */ new Set();
  for (let w2 = 0; w2 < a; w2++) {
    let T = f + u2 * w2, O = [];
    for (let C of o) {
      let [D, q] = C.from, [Y, ue] = C.to;
      if (q === ue) continue;
      let _e = Math.min(q, ue), ce = Math.max(q, ue);
      if (T < _e || T >= ce) continue;
      let oe = (T - q) / (ue - q), ve = D + (Y - D) * oe;
      O.push(ve);
    }
    if (O.length) {
      O.sort((C, D) => C - D);
      for (let C = 0; C < O.length - 1; C += 2) {
        let D = Math.min(O[C], O[C + 1]), q = Math.max(O[C], O[C + 1]), Y = Math.floor(D), ue = Math.ceil(q);
        for (let _e = Y; _e < ue; _e++) l2.add(_e);
      }
    }
  }
  if (!l2.size) return [];
  let p = Array.from(l2.values()).sort((w2, T) => w2 - T), h2 = [], g2 = p[0], b = p[0];
  for (let w2 = 1; w2 < p.length; w2++) {
    let T = p[w2];
    T > b + 1 && (h2.push([g2, b + 1]), g2 = T), b = T;
  }
  h2.push([g2, b + 1]);
  let y = [], k = n * 0.6, S2 = h2[0][0], I = h2[h2.length - 1][1];
  for (let [w2, T] of h2) {
    let O = Math.min(w2, S2) - k, C = Math.max(T, I) + k;
    y.push({ x1: O, x2: C, y1: r, y2: i2 });
  }
  return y;
}
__name(Ad, "Ad");
function Id(e, t, [n, r], [i2, o]) {
  if (n !== i2) return n ? !i2 || n === e ? -1 : i2 === e ? 1 : e === 400 && n === 500 || e === 500 && n === 400 ? -1 : e === 400 && i2 === 500 || e === 500 && i2 === 400 ? 1 : e < 400 ? n < e && i2 < e ? i2 - n : n < e ? -1 : i2 < e ? 1 : n - i2 : e < n && e < i2 ? n - i2 : e < n ? -1 : e < i2 ? 1 : i2 - n : 1;
  if (r !== o) {
    if (r === t) return -1;
    if (o === t) return 1;
  }
  return -1;
}
__name(Id, "Id");
function Rd(e) {
  let t = e.split("_"), n = t[t.length - 1];
  return n === du ? void 0 : n;
}
__name(Rd, "Rd");
function to({ width: e, height: t, content: n }) {
  return M("svg", { width: e, height: t, viewBox: `0 0 ${e} ${t}`, xmlns: "http://www.w3.org/2000/svg" }, n);
}
__name(to, "to");
function kf(e) {
  return bb.includes(e);
}
__name(kf, "kf");
function Ef(e) {
  return vb.includes(e);
}
__name(Ef, "Ef");
function Ps(e) {
  return typeof e == "string";
}
__name(Ps, "Ps");
function As(e) {
  return typeof e == "object";
}
__name(As, "As");
function _(e) {
  return { kind: "complete", style: e };
}
__name(_, "_");
function Ae(e, t = {}) {
  let { fractions: n } = t;
  if (n && e.includes("/")) {
    let [o = "", s = ""] = e.split("/", 2), a = Ae(o), u2 = Ae(s);
    return !a || !u2 ? null : [a[0] / u2[0], u2[1]];
  }
  let r = parseFloat(e);
  if (Number.isNaN(r)) return null;
  let i2 = e.match(/(([a-z]{2,}|%))$/);
  if (!i2) return [r, ne.none];
  switch (i2 == null ? void 0 : i2[1]) {
    case "rem":
      return [r, ne.rem];
    case "px":
      return [r, ne.px];
    case "em":
      return [r, ne.em];
    case "%":
      return [r, ne.percent];
    case "vw":
      return [r, ne.vw];
    case "vh":
      return [r, ne.vh];
    default:
      return null;
  }
}
__name(Ae, "Ae");
function Bt(e, t, n = {}) {
  let r = wt(t, n);
  return r === null ? null : _({ [e]: r });
}
__name(Bt, "Bt");
function mi(e, t, n) {
  let r = wt(t);
  return r !== null && (n[e] = r), n;
}
__name(mi, "mi");
function Pf(e, t) {
  let n = wt(t);
  return n === null ? null : { [e]: n };
}
__name(Pf, "Pf");
function wt(e, t = {}) {
  if (e === void 0) return null;
  let n = Ae(String(e), t);
  return n ? Qt(...n, t) : null;
}
__name(wt, "wt");
function Qt(e, t, n = {}) {
  let { isNegative: r, device: i2 } = n;
  switch (t) {
    case ne.rem:
      return e * 16 * (r ? -1 : 1);
    case ne.px:
      return e * (r ? -1 : 1);
    case ne.percent:
      return `${r ? "-" : ""}${e}%`;
    case ne.none:
      return e * (r ? -1 : 1);
    case ne.vw:
      return i2 != null && i2.windowDimensions ? i2.windowDimensions.width * (e / 100) : (Ve("`vw` CSS unit requires configuration with `useDeviceContext()`"), null);
    case ne.vh:
      return i2 != null && i2.windowDimensions ? i2.windowDimensions.height * (e / 100) : (Ve("`vh` CSS unit requires configuration with `useDeviceContext()`"), null);
    default:
      return null;
  }
}
__name(Qt, "Qt");
function Rs(e) {
  let t = Ae(e);
  if (!t) return null;
  let [n, r] = t;
  switch (r) {
    case ne.rem:
      return n * 16;
    case ne.px:
      return n;
    default:
      return null;
  }
}
__name(Rs, "Rs");
function Cs(e) {
  return yb[e ?? ""] || "All";
}
__name(Cs, "Cs");
function Ls(e) {
  let t = "All";
  return [e.replace(/^-(t|b|r|l|tr|tl|br|bl)(-|$)/, (r, i2) => (t = Cs(i2), "")), t];
}
__name(Ls, "Ls");
function sr(e, t = {}) {
  if (e.includes("/")) {
    let n = Of(e, { ...t, fractions: true });
    if (n) return n;
  }
  return e[0] === "[" && (e = e.slice(1, -1)), Of(e, t);
}
__name(sr, "sr");
function at(e, t, n = {}) {
  let r = sr(t, n);
  return r === null ? null : _({ [e]: r });
}
__name(at, "at");
function Of(e, t = {}) {
  if (e === "px") return 1;
  let n = Ae(e, t);
  if (!n) return null;
  let [r, i2] = n;
  return t.fractions && (i2 = ne.percent, r *= 100), i2 === ne.none && (r = r / 4, i2 = ne.rem), Qt(r, i2, t);
}
__name(Of, "Of");
function xb(...e) {
  console.warn(...e);
}
__name(xb, "xb");
function wb(...e) {
}
__name(wb, "wb");
function bn(e) {
  return { kind: "dependent", complete(t) {
    (!t.fontVariant || !Array.isArray(t.fontVariant)) && (t.fontVariant = []), t.fontVariant.push(e);
  } };
}
__name(bn, "bn");
function Ns(e, t, n = {}) {
  let r = t == null ? void 0 : t[e];
  if (!r) return at("fontSize", e, n);
  if (typeof r == "string") return Bt("fontSize", r);
  let i2 = {}, [o, s] = r, a = Pf("fontSize", o);
  if (a && (i2 = a), typeof s == "string") return _(mi("lineHeight", Af(s, i2), i2));
  let { lineHeight: u2, letterSpacing: f } = s;
  return u2 && mi("lineHeight", Af(u2, i2), i2), f && mi("letterSpacing", f, i2), _(i2);
}
__name(Ns, "Ns");
function Af(e, t) {
  let n = Ae(e);
  if (n) {
    let [r, i2] = n;
    if ((i2 === ne.none || i2 === ne.em) && typeof t.fontSize == "number") return t.fontSize * r;
  }
  return e;
}
__name(Af, "Af");
function Ws(e, t) {
  var n;
  let r = (n = t == null ? void 0 : t[e]) !== null && n !== void 0 ? n : e.startsWith("[") ? e.slice(1, -1) : e, i2 = Ae(r);
  if (!i2) return null;
  let [o, s] = i2;
  if (s === ne.none) return { kind: "dependent", complete(u2) {
    if (typeof u2.fontSize != "number") return "relative line-height utilities require that font-size be set";
    u2.lineHeight = u2.fontSize * o;
  } };
  let a = Qt(o, s);
  return a !== null ? _({ lineHeight: a }) : null;
}
__name(Ws, "Ws");
function Ds(e, t, n, r, i2) {
  let o = "";
  if (r[0] === "[") o = r.slice(1, -1);
  else {
    let f = i2 == null ? void 0 : i2[r];
    if (f) o = f;
    else {
      let l2 = sr(r);
      return l2 && typeof l2 == "number" ? If(l2, ne.px, t, e) : null;
    }
  }
  if (o === "auto") return Rf(t, e, "auto");
  let s = Ae(o);
  if (!s) return null;
  let [a, u2] = s;
  return n && (a = -a), If(a, u2, t, e);
}
__name(Ds, "Ds");
function If(e, t, n, r) {
  let i2 = Qt(e, t);
  return i2 === null ? null : Rf(n, r, i2);
}
__name(If, "If");
function Rf(e, t, n) {
  switch (e) {
    case "All":
      return { kind: "complete", style: { [`${t}Top`]: n, [`${t}Right`]: n, [`${t}Bottom`]: n, [`${t}Left`]: n } };
    case "Bottom":
    case "Top":
    case "Left":
    case "Right":
      return { kind: "complete", style: { [`${t}${e}`]: n } };
    case "Vertical":
      return { kind: "complete", style: { [`${t}Top`]: n, [`${t}Bottom`]: n } };
    case "Horizontal":
      return { kind: "complete", style: { [`${t}Left`]: n, [`${t}Right`]: n } };
    default:
      return null;
  }
}
__name(Rf, "Rf");
function Fs(e) {
  if (!e) return {};
  let t = Object.entries(e).reduce((i2, [o, s]) => {
    let a = [0, 1 / 0, 0], u2 = typeof s == "string" ? { min: s } : s, f = u2.min ? Rs(u2.min) : 0;
    f === null ? Ve(`invalid screen config value: ${o}->min: ${u2.min}`) : a[0] = f;
    let l2 = u2.max ? Rs(u2.max) : 1 / 0;
    return l2 === null ? Ve(`invalid screen config value: ${o}->max: ${u2.max}`) : a[1] = l2, i2[o] = a, i2;
  }, {}), n = Object.values(t);
  n.sort((i2, o) => {
    let [s, a] = i2, [u2, f] = o;
    return a === 1 / 0 || f === 1 / 0 ? s - u2 : a - f;
  });
  let r = 0;
  return n.forEach((i2) => i2[2] = r++), t;
}
__name(Fs, "Fs");
function Bs(e, t) {
  let n = t == null ? void 0 : t[e];
  if (!n) return null;
  if (typeof n == "string") return _({ fontFamily: n });
  let r = n[0];
  return r ? _({ fontFamily: r }) : null;
}
__name(Bs, "Bs");
function ar(e, t, n) {
  if (!n) return null;
  let r;
  t.includes("/") && ([t = "", r] = t.split("/", 2));
  let i2 = "";
  if (t.startsWith("[#") || t.startsWith("[rgb") ? i2 = t.slice(1, -1) : i2 = Mf(t, n), !i2) return null;
  if (r) {
    let o = Number(r);
    if (!Number.isNaN(o)) return i2 = Cf(i2, o / 100), _({ [gi[e].color]: i2 });
  }
  return { kind: "dependent", complete(o) {
    let s = gi[e].opacity, a = o[s];
    typeof a == "number" && (i2 = Cf(i2, a)), o[gi[e].color] = i2;
  } };
}
__name(ar, "ar");
function yn(e, t) {
  let n = parseInt(t, 10);
  if (Number.isNaN(n)) return null;
  let r = n / 100;
  return { kind: "complete", style: { [gi[e].opacity]: r } };
}
__name(yn, "yn");
function Cf(e, t) {
  return e.startsWith("#") ? e = _b2(e) : e.startsWith("rgb(") && (e = e.replace(/^rgb\(/, "rgba(").replace(/\)$/, ", 1)")), e.replace(/, ?\d*\.?(\d+)\)$/, `, ${t})`);
}
__name(Cf, "Cf");
function Lf(e) {
  for (let t in e) t.startsWith("__opacity_") && delete e[t];
}
__name(Lf, "Lf");
function _b2(e) {
  let t = e;
  e = e.replace(Tb, (s, a, u2, f) => a + a + u2 + u2 + f + f);
  let n = kb.exec(e);
  if (!n) return Ve(`invalid config hex color value: ${t}`), "rgba(0, 0, 0, 1)";
  let r = parseInt(n[1], 16), i2 = parseInt(n[2], 16), o = parseInt(n[3], 16);
  return `rgba(${r}, ${i2}, ${o}, 1)`;
}
__name(_b2, "_b2");
function Mf(e, t) {
  let n = t[e];
  if (Ps(n)) return n;
  if (As(n) && Ps(n.DEFAULT)) return n.DEFAULT;
  let [r = "", ...i2] = e.split("-");
  for (; r !== e; ) {
    let o = t[r];
    if (As(o)) return Mf(i2.join("-"), o);
    if (i2.length === 0) return "";
    r = `${r}-${i2.shift()}`;
  }
  return "";
}
__name(Mf, "Mf");
function Wf(e, t) {
  let [n, r] = Ls(e);
  if (n.match(/^(-?(\d)+)?$/)) return Eb(n, r, t == null ? void 0 : t.borderWidth);
  if (n = n.replace(/^-/, ""), ["dashed", "solid", "dotted"].includes(n)) return _({ borderStyle: n });
  let o = "border";
  switch (r) {
    case "Bottom":
      o = "borderBottom";
      break;
    case "Top":
      o = "borderTop";
      break;
    case "Left":
      o = "borderLeft";
      break;
    case "Right":
      o = "borderRight";
      break;
  }
  let s = ar(o, n, t == null ? void 0 : t.borderColor);
  if (s) return s;
  let a = `border${r === "All" ? "" : r}Width`;
  n = n.replace(/^-/, "");
  let u2 = n.slice(1, -1), f = at(a, u2);
  return typeof (f == null ? void 0 : f.style[a]) != "number" ? null : f;
}
__name(Wf, "Wf");
function Eb(e, t, n) {
  if (!n) return null;
  e = e.replace(/^-/, "");
  let i2 = n[e === "" ? "DEFAULT" : e];
  if (i2 === void 0) return null;
  let o = `border${t === "All" ? "" : t}Width`;
  return Bt(o, i2);
}
__name(Eb, "Eb");
function Df(e, t) {
  if (!t) return null;
  let [n, r] = Ls(e);
  n = n.replace(/^-/, ""), n === "" && (n = "DEFAULT");
  let i2 = `border${r === "All" ? "" : r}Radius`, o = t[n];
  if (o) return Nf(Bt(i2, o));
  let s = at(i2, n);
  return typeof (s == null ? void 0 : s.style[i2]) != "number" ? null : Nf(s);
}
__name(Df, "Df");
function Nf(e) {
  if ((e == null ? void 0 : e.kind) !== "complete") return e;
  let t = e.style.borderTopRadius;
  t !== void 0 && (e.style.borderTopLeftRadius = t, e.style.borderTopRightRadius = t, delete e.style.borderTopRadius);
  let n = e.style.borderBottomRadius;
  n !== void 0 && (e.style.borderBottomLeftRadius = n, e.style.borderBottomRightRadius = n, delete e.style.borderBottomRadius);
  let r = e.style.borderLeftRadius;
  r !== void 0 && (e.style.borderBottomLeftRadius = r, e.style.borderTopLeftRadius = r, delete e.style.borderLeftRadius);
  let i2 = e.style.borderRightRadius;
  return i2 !== void 0 && (e.style.borderBottomRightRadius = i2, e.style.borderTopRightRadius = i2, delete e.style.borderRightRadius), e;
}
__name(Nf, "Nf");
function _r(e, t, n, r) {
  let i2 = null;
  e === "inset" && (t = t.replace(/^(x|y)-/, (a, u2) => (i2 = u2 === "x" ? "x" : "y", "")));
  let o = r == null ? void 0 : r[t];
  if (o) {
    let a = wt(o, { isNegative: n });
    if (a !== null) return Ff(e, i2, a);
  }
  let s = sr(t, { isNegative: n });
  return s !== null ? Ff(e, i2, s) : null;
}
__name(_r, "_r");
function Ff(e, t, n) {
  if (e !== "inset") return _({ [e]: n });
  switch (t) {
    case null:
      return _({ top: n, left: n, right: n, bottom: n });
    case "y":
      return _({ top: n, bottom: n });
    case "x":
      return _({ left: n, right: n });
  }
}
__name(Ff, "Ff");
function xn(e, t, n) {
  var r;
  t = t.replace(/^-/, "");
  let i2 = t === "" ? "DEFAULT" : t, o = Number((r = n == null ? void 0 : n[i2]) !== null && r !== void 0 ? r : t);
  return Number.isNaN(o) ? null : _({ [`flex${e}`]: o });
}
__name(xn, "xn");
function Bf(e, t) {
  var n, r;
  if (e = (t == null ? void 0 : t[e]) || e, ["min-content", "revert", "unset"].includes(e)) return null;
  if (e.match(/^\d+(\.\d+)?$/)) return _({ flexGrow: Number(e), flexBasis: "0%" });
  let i2 = e.match(/^(\d+)\s+(\d+)$/);
  if (i2) return _({ flexGrow: Number(i2[1]), flexShrink: Number(i2[2]) });
  if (i2 = e.match(/^(\d+)\s+([^ ]+)$/), i2) {
    let o = wt((n = i2[2]) !== null && n !== void 0 ? n : "");
    return o ? _({ flexGrow: Number(i2[1]), flexBasis: o }) : null;
  }
  if (i2 = e.match(/^(\d+)\s+(\d+)\s+(.+)$/), i2) {
    let o = wt((r = i2[3]) !== null && r !== void 0 ? r : "");
    return o ? _({ flexGrow: Number(i2[1]), flexShrink: Number(i2[2]), flexBasis: o }) : null;
  }
  return null;
}
__name(Bf, "Bf");
function $s(e, t, n = {}, r) {
  let i2 = r == null ? void 0 : r[t];
  return i2 !== void 0 ? Bt(e, i2, n) : at(e, t, n);
}
__name($s, "$s");
function wn(e, t, n = {}, r) {
  let i2 = wt(r == null ? void 0 : r[t], n);
  return i2 ? _({ [e]: i2 }) : (t === "screen" && (t = e.includes("Width") ? "100vw" : "100vh"), at(e, t, n));
}
__name(wn, "wn");
function $f(e, t, n) {
  let r = n == null ? void 0 : n[e];
  if (r) {
    let i2 = Ae(r, { isNegative: t });
    if (!i2) return null;
    let [o, s] = i2;
    if (s === ne.em) return Ob(o);
    if (s === ne.percent) return Ve("percentage-based letter-spacing configuration currently unsupported, switch to `em`s, or open an issue if you'd like to see support added."), null;
    let a = Qt(o, s, { isNegative: t });
    return a !== null ? _({ letterSpacing: a }) : null;
  }
  return at("letterSpacing", e, { isNegative: t });
}
__name($f, "$f");
function Ob(e) {
  return { kind: "dependent", complete(t) {
    let n = t.fontSize;
    if (typeof n != "number" || Number.isNaN(n)) return "tracking-X relative letter spacing classes require font-size to be set";
    t.letterSpacing = Math.round((e * n + Number.EPSILON) * 100) / 100;
  } };
}
__name(Ob, "Ob");
function qf(e, t) {
  let n = t == null ? void 0 : t[e];
  if (n) {
    let i2 = Ae(String(n));
    if (i2) return _({ opacity: i2[0] });
  }
  let r = Ae(e);
  return r ? _({ opacity: r[0] / 100 }) : null;
}
__name(qf, "qf");
function Uf(e) {
  let t = parseInt(e, 10);
  return Number.isNaN(t) ? null : { kind: "complete", style: { shadowOpacity: t / 100 } };
}
__name(Uf, "Uf");
function zf(e) {
  if (e.includes("/")) {
    let [n = "", r = ""] = e.split("/", 2), i2 = qs(n), o = qs(r);
    return i2 === null || o === null ? null : { kind: "complete", style: { shadowOffset: { width: i2, height: o } } };
  }
  let t = qs(e);
  return t === null ? null : { kind: "complete", style: { shadowOffset: { width: t, height: t } } };
}
__name(zf, "zf");
function qs(e) {
  let t = sr(e);
  return typeof t == "number" ? t : null;
}
__name(qs, "qs");
function Gf(e) {
  let t = [], n = null;
  return e.forEach((r) => {
    if (typeof r == "string") t = [...t, ...Us(r)];
    else if (Array.isArray(r)) t = [...t, ...r.flatMap(Us)];
    else if (typeof r == "object" && r !== null) for (let [i2, o] of Object.entries(r)) typeof o == "boolean" ? t = [...t, ...o ? Us(i2) : []] : n ? n[i2] = o : n = { [i2]: o };
  }), [t.filter(Boolean).filter(Pb), n];
}
__name(Gf, "Gf");
function Us(e) {
  return e.trim().split(/\s+/);
}
__name(Us, "Us");
function Pb(e, t, n) {
  return n.indexOf(e) === t;
}
__name(Pb, "Pb");
function jf(e) {
  var t;
  return (t = e == null ? void 0 : e.reduce((n, r) => ({ ...n, ...Ab(r.handler) }), {})) !== null && t !== void 0 ? t : {};
}
__name(jf, "jf");
function Ab(e) {
  let t = {};
  return e({ addUtilities: /* @__PURE__ */ __name2((n) => {
    t = n;
  }, "addUtilities"), ...Ib }), t;
}
__name(Ab, "Ab");
function St(e) {
  throw new Error(`tailwindcss plugin function argument object prop "${e}" not implemented`);
}
__name(St, "St");
function Hf(e, t) {
  let n = (0, Vf.default)(Rb(e)), r = {}, i2 = jf(n.plugins), o = {}, s = Object.entries(i2).map(([b, y]) => typeof y == "string" ? (o[b] = y, [b, { kind: "null" }]) : [b, _(y)]).filter(([, b]) => b.kind !== "null");
  function a() {
    return [r.windowDimensions ? `w${r.windowDimensions.width}` : false, r.windowDimensions ? `h${r.windowDimensions.height}` : false, r.fontScale ? `fs${r.fontScale}` : false, r.colorScheme === "dark" ? "dark" : false, r.pixelDensity === 2 ? "retina" : false].filter(Boolean).join("--") || "default";
  }
  __name(a, "a");
  __name2(a, "a");
  let u2 = a(), f = {};
  function l2() {
    let b = f[u2];
    if (b) return b;
    let y = new vn(s);
    return f[u2] = y, y;
  }
  __name(l2, "l2");
  __name2(l2, "l");
  function p(...b) {
    let y = l2(), k = {}, S2 = [], I = [], [w2, T] = Gf(b), O = w2.join(" "), C = y.getStyle(O);
    if (C) return { ...C, ...T || {} };
    for (let D of w2) {
      let q = y.getIr(D);
      if (!q && D in o) {
        let ue = p(o[D]);
        y.setIr(D, _(ue)), k = { ...k, ...ue };
        continue;
      }
      switch (q = new Tr(D, n, y, r, t).parse(), q.kind) {
        case "complete":
          k = { ...k, ...q.style }, y.setIr(D, q);
          break;
        case "dependent":
          S2.push(q);
          break;
        case "ordered":
          I.push(q);
          break;
        case "null":
          y.setIr(D, q);
          break;
      }
    }
    if (I.length > 0) {
      I.sort((D, q) => D.order - q.order);
      for (let D of I) switch (D.styleIr.kind) {
        case "complete":
          k = { ...k, ...D.styleIr.style };
          break;
        case "dependent":
          S2.push(D.styleIr);
          break;
      }
    }
    if (S2.length > 0) {
      for (let D of S2) {
        let q = D.complete(k);
        q && Ve(q);
      }
      Lf(k);
    }
    return O !== "" && y.setStyle(O, k), T && (k = { ...k, ...T }), k;
  }
  __name(p, "p");
  __name2(p, "p");
  function h2(b) {
    let y = p(b.split(/\s+/g).map((k) => k.replace(/^(bg|text|border)-/, "")).map((k) => `bg-${k}`).join(" "));
    return typeof y.backgroundColor == "string" ? y.backgroundColor : void 0;
  }
  __name(h2, "h2");
  __name2(h2, "h");
  let g2 = /* @__PURE__ */ __name2((b, ...y) => {
    let k = "";
    return b.forEach((S2, I) => {
      var w2;
      k += S2 + ((w2 = y[I]) !== null && w2 !== void 0 ? w2 : "");
    }), p(k);
  }, "g");
  return g2.style = p, g2.color = h2, g2.prefixMatch = (...b) => {
    let y = b.sort().join(":"), k = l2(), S2 = k.getPrefixMatch(y);
    if (S2 !== void 0) return S2;
    let T = new Tr(`${y}:flex`, n, k, r, t).parse().kind !== "null";
    return k.setPrefixMatch(y, T), T;
  }, g2.setWindowDimensions = (b) => {
    r.windowDimensions = b, u2 = a();
  }, g2.setFontScale = (b) => {
    r.fontScale = b, u2 = a();
  }, g2.setPixelDensity = (b) => {
    r.pixelDensity = b, u2 = a();
  }, g2.setColorScheme = (b) => {
    r.colorScheme = b, u2 = a();
  }, g2;
}
__name(Hf, "Hf");
function Rb(e) {
  return { ...e, content: ["_no_warnings_please"] };
}
__name(Rb, "Rb");
function Mb(e) {
  return Hf({ ...e, plugins: [...(e == null ? void 0 : e.plugins) ?? [], Lb] }, "web");
}
__name(Mb, "Mb");
function zs({ width: e, height: t, config: n }) {
  return bi || (bi = Mb(n)), bi.setWindowDimensions({ width: +e, height: +t }), bi;
}
__name(zs, "zs");
async function Xf(e, t) {
  let n = await Gt();
  if (!n || !n.Node) throw new Error("Satori is not initialized: expect `yoga` to be loaded, got " + n);
  t.fonts = t.fonts || [];
  let r;
  Gs.has(t.fonts) ? r = Gs.get(t.fonts) : Gs.set(t.fonts, r = new Br(t.fonts));
  let i2 = "width" in t ? t.width : void 0, o = "height" in t ? t.height : void 0, s = Nb(n, t.pointScaleFactor);
  i2 && s.setWidth(i2), o && s.setHeight(o), s.setFlexDirection(n.FLEX_DIRECTION_ROW), s.setFlexWrap(n.WRAP_WRAP), s.setAlignContent(n.ALIGN_AUTO), s.setAlignItems(n.ALIGN_FLEX_START), s.setJustifyContent(n.JUSTIFY_FLEX_START), s.setOverflow(n.OVERFLOW_HIDDEN);
  let a = { ...t.graphemeImages }, u2 = /* @__PURE__ */ new Set();
  yt.clear(), Ir.clear(), await Aa(e);
  let f = Dr(e, { id: "id", parentStyle: {}, inheritedStyle: { fontSize: 16, fontWeight: "normal", fontFamily: "serif", fontStyle: "normal", lineHeight: "normal", color: "black", opacity: 1, whiteSpace: "normal", _viewportWidth: i2, _viewportHeight: o }, parent: s, font: r, embedFont: t.embedFont, debug: t.debug, graphemeImages: a, canLoadAdditionalAssets: !!t.loadAdditionalAsset, onNodeDetected: t.onNodeDetected, getTwStyles: /* @__PURE__ */ __name2((b, y) => {
    let S2 = { ...zs({ width: i2, height: o, config: t.tailwindConfig })([b]) };
    return typeof S2.lineHeight == "number" && (S2.lineHeight = S2.lineHeight / (+S2.fontSize || y.fontSize || 16)), S2.shadowColor && S2.boxShadow && (S2.boxShadow = S2.boxShadow.replace(/rgba?\([^)]+\)/, S2.shadowColor)), S2;
  }, "getTwStyles") }), l2 = (await f.next()).value;
  if (t.loadAdditionalAsset && l2.length) {
    let b = Wb(l2), y = [], k = {};
    await Promise.all(Object.entries(b).flatMap(([S2, I]) => I.map((w2) => {
      let T = `${S2}_${w2}`;
      return u2.has(T) ? null : (u2.add(T), t.loadAdditionalAsset(S2, w2).then((O) => {
        typeof O == "string" ? k[w2] = O : O && (Array.isArray(O) ? y.push(...O) : y.push(O));
      }));
    }))), r.addFonts(y), Object.assign(a, k);
  }
  await f.next(), s.calculateLayout(i2, o, n.DIRECTION_LTR);
  let p = (await f.next([0, 0])).value, h2 = s.getComputedWidth(), g2 = s.getComputedHeight();
  return s.freeRecursive(), to({ width: h2, height: g2, content: p });
}
__name(Xf, "Xf");
function Nb(e, t) {
  if (t) {
    let n = e.Config.create();
    return n.setPointScaleFactor(t), e.Node.createWithConfig(n);
  } else return e.Node.create();
}
__name(Nb, "Nb");
function Wb(e) {
  let t = {}, n = {};
  for (let { word: r, locale: i2 } of e) {
    let o = fu(r, i2).join("|");
    n[o] = n[o] || "", n[o] += r;
  }
  return Object.keys(n).forEach((r) => {
    t[r] = t[r] || [], r === "emoji" ? t[r].push(...Yf(De(n[r], "grapheme"))) : (t[r][0] = t[r][0] || "", t[r][0] += Yf(De(n[r], "grapheme", r === "unknown" ? void 0 : r)).join(""));
  }), t;
}
__name(Wb, "Wb");
function Yf(e) {
  return Array.from(new Set(e));
}
__name(Yf, "Yf");
var import_css_to_react_native;
var import_css_background_parser;
var import_css_box_shadow;
var import_parse_css_color;
var import_postcss_value_parser;
var import_css_to_react_native2;
var import_escape_html;
var import_parse_css_color2;
var import_parse_css_color3;
var import_parse_css_color4;
var import_css_to_react_native3;
var rc;
var In;
var nc;
var ic;
var oc;
var sc;
var Zt;
var U;
var Rn;
var Js;
var ac;
var Cn;
var Nt;
var pa;
var ha;
var Ar;
var ki;
var Wt;
var hr;
var xc;
var Wn;
var Ei;
var mr;
var gr;
var Oi;
var ma;
var Pi;
var Ai;
var ht;
var Ii;
var wc;
var ga;
var Dn;
var ba;
var ya;
var va;
var xa;
var Sa;
var Li;
var _c;
var _a2;
var Ci;
var Tc;
var Mi;
var no;
var pu;
var hu;
var so;
var Jn;
var Nd;
var Zn;
var gu;
var bu;
var vu;
var xu;
var wu;
var Su;
var mo;
var ku;
var Ou;
var Au;
var Ur;
var Dt;
var Ce;
var oi;
var vo;
var xo;
var si;
var _o;
var ko;
var Oo;
var ai;
var Io;
var Co;
var Mo;
var Zu;
var $o;
var Uo;
var Go;
var Vo;
var sl;
var Ho;
var fl2;
var vl;
var xl;
var wl;
var kl;
var El;
var Al;
var Il;
var Cl;
var fs;
var ds;
var Bl;
var ql;
var zl;
var Ql;
var of;
var sf;
var cf;
var df;
var ib;
var pf;
var bf;
var yf;
var wf;
var _f;
var Or;
var uc;
var lc;
var fc;
var cc;
var dc;
var pc;
var Zs;
var ea;
var ta;
var ra;
var mc;
var bc;
var wi;
var Si;
var aa;
var da;
var Ac;
var Ic;
var Fn;
var Bn;
var $n;
var qn;
var Ni;
var yt;
var Ir;
var Rc;
var Wi;
var Wc;
var rt;
var Ra;
var Dc;
var jc;
var Vc;
var Ma;
var Da;
var zn;
var tr;
var ji;
var vr;
var ad;
var Xn;
var Nr;
var kd;
var au;
var su;
var uu;
var Ed;
var Ji;
var Zi;
var Kn;
var du;
var eo;
var Br;
var Vf;
var bb;
var vb;
var Tf;
var ne;
var Is;
var yb;
var Ve;
var Sb;
var Ms;
var vn;
var gi;
var Tb;
var kb;
var Tr;
var Ib;
var Lb;
var bi;
var Gs;
var init_standalone = __esm({
  "../node_modules/satori/dist/standalone.js"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_module();
    import_css_to_react_native = __toESM(require_css_to_react_native(), 1);
    import_css_background_parser = __toESM(require_css_background_parser(), 1);
    import_css_box_shadow = __toESM(require_css_box_shadow(), 1);
    import_parse_css_color = __toESM(require_index_umd(), 1);
    import_postcss_value_parser = __toESM(require_lib(), 1);
    import_css_to_react_native2 = __toESM(require_css_to_react_native(), 1);
    import_escape_html = __toESM(require_escape_html(), 1);
    import_parse_css_color2 = __toESM(require_index_umd(), 1);
    init_dist();
    import_parse_css_color3 = __toESM(require_index_umd(), 1);
    init_dist();
    import_parse_css_color4 = __toESM(require_index_umd(), 1);
    import_css_to_react_native3 = __toESM(require_css_to_react_native(), 1);
    init_opentype_module();
    rc = Object.create;
    In = Object.defineProperty;
    nc = Object.getOwnPropertyDescriptor;
    ic = Object.getOwnPropertyNames;
    oc = Object.getPrototypeOf;
    sc = Object.prototype.hasOwnProperty;
    Zt = /* @__PURE__ */ __name2((e, t) => () => (e && (t = e(e = 0)), t), "Zt");
    U = /* @__PURE__ */ __name2((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "U");
    Rn = /* @__PURE__ */ __name2((e, t) => {
      for (var n in t) In(e, n, { get: t[n], enumerable: true });
    }, "Rn");
    Js = /* @__PURE__ */ __name2((e, t, n, r) => {
      if (t && typeof t == "object" || typeof t == "function") for (let i2 of ic(t)) !sc.call(e, i2) && i2 !== n && In(e, i2, { get: /* @__PURE__ */ __name2(() => t[i2], "get"), enumerable: !(r = nc(t, i2)) || r.enumerable });
      return e;
    }, "Js");
    ac = /* @__PURE__ */ __name2((e, t, n) => (n = e != null ? rc(oc(e)) : {}, Js(t || !e || !e.__esModule ? In(n, "default", { value: e, enumerable: true }) : n, e)), "ac");
    Cn = /* @__PURE__ */ __name2((e) => Js(In({}, "__esModule", { value: true }), e), "Cn");
    Dn = Zt(() => {
      Nt = (function(e) {
        return e[e.Auto = 0] = "Auto", e[e.FlexStart = 1] = "FlexStart", e[e.Center = 2] = "Center", e[e.FlexEnd = 3] = "FlexEnd", e[e.Stretch = 4] = "Stretch", e[e.Baseline = 5] = "Baseline", e[e.SpaceBetween = 6] = "SpaceBetween", e[e.SpaceAround = 7] = "SpaceAround", e[e.SpaceEvenly = 8] = "SpaceEvenly", e;
      })({}), pa = (function(e) {
        return e[e.BorderBox = 0] = "BorderBox", e[e.ContentBox = 1] = "ContentBox", e;
      })({}), ha = (function(e) {
        return e[e.Width = 0] = "Width", e[e.Height = 1] = "Height", e;
      })({}), Ar = (function(e) {
        return e[e.Inherit = 0] = "Inherit", e[e.LTR = 1] = "LTR", e[e.RTL = 2] = "RTL", e;
      })({}), ki = (function(e) {
        return e[e.Flex = 0] = "Flex", e[e.None = 1] = "None", e[e.Contents = 2] = "Contents", e;
      })({}), Wt = (function(e) {
        return e[e.Left = 0] = "Left", e[e.Top = 1] = "Top", e[e.Right = 2] = "Right", e[e.Bottom = 3] = "Bottom", e[e.Start = 4] = "Start", e[e.End = 5] = "End", e[e.Horizontal = 6] = "Horizontal", e[e.Vertical = 7] = "Vertical", e[e.All = 8] = "All", e;
      })({}), hr = (function(e) {
        return e[e.None = 0] = "None", e[e.StretchFlexBasis = 1] = "StretchFlexBasis", e[e.AbsolutePositionWithoutInsetsExcludesPadding = 2] = "AbsolutePositionWithoutInsetsExcludesPadding", e[e.AbsolutePercentAgainstInnerSize = 4] = "AbsolutePercentAgainstInnerSize", e[e.All = 2147483647] = "All", e[e.Classic = 2147483646] = "Classic", e;
      })({}), xc = (function(e) {
        return e[e.WebFlexBasis = 0] = "WebFlexBasis", e;
      })({}), Wn = (function(e) {
        return e[e.Column = 0] = "Column", e[e.ColumnReverse = 1] = "ColumnReverse", e[e.Row = 2] = "Row", e[e.RowReverse = 3] = "RowReverse", e;
      })({}), Ei = (function(e) {
        return e[e.Column = 0] = "Column", e[e.Row = 1] = "Row", e[e.All = 2] = "All", e;
      })({}), mr = (function(e) {
        return e[e.FlexStart = 0] = "FlexStart", e[e.Center = 1] = "Center", e[e.FlexEnd = 2] = "FlexEnd", e[e.SpaceBetween = 3] = "SpaceBetween", e[e.SpaceAround = 4] = "SpaceAround", e[e.SpaceEvenly = 5] = "SpaceEvenly", e;
      })({}), gr = (function(e) {
        return e[e.Error = 0] = "Error", e[e.Warn = 1] = "Warn", e[e.Info = 2] = "Info", e[e.Debug = 3] = "Debug", e[e.Verbose = 4] = "Verbose", e[e.Fatal = 5] = "Fatal", e;
      })({}), Oi = (function(e) {
        return e[e.Undefined = 0] = "Undefined", e[e.Exactly = 1] = "Exactly", e[e.AtMost = 2] = "AtMost", e;
      })({}), ma = (function(e) {
        return e[e.Default = 0] = "Default", e[e.Text = 1] = "Text", e;
      })({}), Pi = (function(e) {
        return e[e.Visible = 0] = "Visible", e[e.Hidden = 1] = "Hidden", e[e.Scroll = 2] = "Scroll", e;
      })({}), Ai = (function(e) {
        return e[e.Static = 0] = "Static", e[e.Relative = 1] = "Relative", e[e.Absolute = 2] = "Absolute", e;
      })({}), ht = (function(e) {
        return e[e.Undefined = 0] = "Undefined", e[e.Point = 1] = "Point", e[e.Percent = 2] = "Percent", e[e.Auto = 3] = "Auto", e;
      })({}), Ii = (function(e) {
        return e[e.NoWrap = 0] = "NoWrap", e[e.Wrap = 1] = "Wrap", e[e.WrapReverse = 2] = "WrapReverse", e;
      })({}), wc = { ALIGN_AUTO: Nt.Auto, ALIGN_FLEX_START: Nt.FlexStart, ALIGN_CENTER: Nt.Center, ALIGN_FLEX_END: Nt.FlexEnd, ALIGN_STRETCH: Nt.Stretch, ALIGN_BASELINE: Nt.Baseline, ALIGN_SPACE_BETWEEN: Nt.SpaceBetween, ALIGN_SPACE_AROUND: Nt.SpaceAround, ALIGN_SPACE_EVENLY: Nt.SpaceEvenly, BOX_SIZING_BORDER_BOX: pa.BorderBox, BOX_SIZING_CONTENT_BOX: pa.ContentBox, DIMENSION_WIDTH: ha.Width, DIMENSION_HEIGHT: ha.Height, DIRECTION_INHERIT: Ar.Inherit, DIRECTION_LTR: Ar.LTR, DIRECTION_RTL: Ar.RTL, DISPLAY_FLEX: ki.Flex, DISPLAY_NONE: ki.None, DISPLAY_CONTENTS: ki.Contents, EDGE_LEFT: Wt.Left, EDGE_TOP: Wt.Top, EDGE_RIGHT: Wt.Right, EDGE_BOTTOM: Wt.Bottom, EDGE_START: Wt.Start, EDGE_END: Wt.End, EDGE_HORIZONTAL: Wt.Horizontal, EDGE_VERTICAL: Wt.Vertical, EDGE_ALL: Wt.All, ERRATA_NONE: hr.None, ERRATA_STRETCH_FLEX_BASIS: hr.StretchFlexBasis, ERRATA_ABSOLUTE_POSITION_WITHOUT_INSETS_EXCLUDES_PADDING: hr.AbsolutePositionWithoutInsetsExcludesPadding, ERRATA_ABSOLUTE_PERCENT_AGAINST_INNER_SIZE: hr.AbsolutePercentAgainstInnerSize, ERRATA_ALL: hr.All, ERRATA_CLASSIC: hr.Classic, EXPERIMENTAL_FEATURE_WEB_FLEX_BASIS: xc.WebFlexBasis, FLEX_DIRECTION_COLUMN: Wn.Column, FLEX_DIRECTION_COLUMN_REVERSE: Wn.ColumnReverse, FLEX_DIRECTION_ROW: Wn.Row, FLEX_DIRECTION_ROW_REVERSE: Wn.RowReverse, GUTTER_COLUMN: Ei.Column, GUTTER_ROW: Ei.Row, GUTTER_ALL: Ei.All, JUSTIFY_FLEX_START: mr.FlexStart, JUSTIFY_CENTER: mr.Center, JUSTIFY_FLEX_END: mr.FlexEnd, JUSTIFY_SPACE_BETWEEN: mr.SpaceBetween, JUSTIFY_SPACE_AROUND: mr.SpaceAround, JUSTIFY_SPACE_EVENLY: mr.SpaceEvenly, LOG_LEVEL_ERROR: gr.Error, LOG_LEVEL_WARN: gr.Warn, LOG_LEVEL_INFO: gr.Info, LOG_LEVEL_DEBUG: gr.Debug, LOG_LEVEL_VERBOSE: gr.Verbose, LOG_LEVEL_FATAL: gr.Fatal, MEASURE_MODE_UNDEFINED: Oi.Undefined, MEASURE_MODE_EXACTLY: Oi.Exactly, MEASURE_MODE_AT_MOST: Oi.AtMost, NODE_TYPE_DEFAULT: ma.Default, NODE_TYPE_TEXT: ma.Text, OVERFLOW_VISIBLE: Pi.Visible, OVERFLOW_HIDDEN: Pi.Hidden, OVERFLOW_SCROLL: Pi.Scroll, POSITION_TYPE_STATIC: Ai.Static, POSITION_TYPE_RELATIVE: Ai.Relative, POSITION_TYPE_ABSOLUTE: Ai.Absolute, UNIT_UNDEFINED: ht.Undefined, UNIT_POINT: ht.Point, UNIT_PERCENT: ht.Percent, UNIT_AUTO: ht.Auto, WRAP_NO_WRAP: Ii.NoWrap, WRAP_WRAP: Ii.Wrap, WRAP_WRAP_REVERSE: Ii.WrapReverse }, ga = wc;
    });
    __name2(Ri, "Ri");
    ba = Zt(() => {
      Dn();
      Dn();
    });
    ya = {};
    Rn(ya, { default: /* @__PURE__ */ __name2(() => Sc, "default") });
    __name2(Sc, "Sc");
    xa = Zt(() => {
      va = "";
    });
    __name2(wa, "wa");
    Sa = Zt(() => {
      ba();
      Dn();
    });
    Li = {};
    Rn(Li, { getYoga: /* @__PURE__ */ __name2(() => Oc, "getYoga"), init: /* @__PURE__ */ __name2(() => Ec, "init") });
    __name2(kc, "kc");
    __name2(Ec, "Ec");
    __name2(Oc, "Oc");
    Mi = Zt(() => {
      Sa();
      _c = wa, Tc = new Promise((e, t) => {
        _a2 = e, Ci = t;
      });
    });
    no = U((ro) => {
      "use strict";
      Object.defineProperty(ro, "__esModule", { value: true });
      Object.defineProperty(ro, "default", { enumerable: true, get: /* @__PURE__ */ __name2(() => Cd, "get") });
      function Cd(e) {
        if (e = `${e}`, e === "0") return "0";
        if (/^[+-]?(\d+|\d*\.\d+)(e[+-]?\d+)?(%|\w+)?$/.test(e)) return e.replace(/^[+-]?/, (t) => t === "-" ? "" : "-");
        if (e.includes("var(") || e.includes("calc(")) return `calc(${e} * -1)`;
      }
      __name(Cd, "Cd");
      __name2(Cd, "Cd");
    });
    pu = U((io) => {
      "use strict";
      Object.defineProperty(io, "__esModule", { value: true });
      Object.defineProperty(io, "default", { enumerable: true, get: /* @__PURE__ */ __name2(() => Ld, "get") });
      var Ld = ["preflight", "container", "accessibility", "pointerEvents", "visibility", "position", "inset", "isolation", "zIndex", "order", "gridColumn", "gridColumnStart", "gridColumnEnd", "gridRow", "gridRowStart", "gridRowEnd", "float", "clear", "margin", "boxSizing", "display", "aspectRatio", "height", "maxHeight", "minHeight", "width", "minWidth", "maxWidth", "flex", "flexShrink", "flexGrow", "flexBasis", "tableLayout", "borderCollapse", "borderSpacing", "transformOrigin", "translate", "rotate", "skew", "scale", "transform", "animation", "cursor", "touchAction", "userSelect", "resize", "scrollSnapType", "scrollSnapAlign", "scrollSnapStop", "scrollMargin", "scrollPadding", "listStylePosition", "listStyleType", "appearance", "columns", "breakBefore", "breakInside", "breakAfter", "gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateColumns", "gridTemplateRows", "flexDirection", "flexWrap", "placeContent", "placeItems", "alignContent", "alignItems", "justifyContent", "justifyItems", "gap", "space", "divideWidth", "divideStyle", "divideColor", "divideOpacity", "placeSelf", "alignSelf", "justifySelf", "overflow", "overscrollBehavior", "scrollBehavior", "textOverflow", "whitespace", "wordBreak", "borderRadius", "borderWidth", "borderStyle", "borderColor", "borderOpacity", "backgroundColor", "backgroundOpacity", "backgroundImage", "gradientColorStops", "boxDecorationBreak", "backgroundSize", "backgroundAttachment", "backgroundClip", "backgroundPosition", "backgroundRepeat", "backgroundOrigin", "fill", "stroke", "strokeWidth", "objectFit", "objectPosition", "padding", "textAlign", "textIndent", "verticalAlign", "fontFamily", "fontSize", "fontWeight", "textTransform", "fontStyle", "fontVariantNumeric", "lineHeight", "letterSpacing", "textColor", "textOpacity", "textDecoration", "textDecorationColor", "textDecorationStyle", "textDecorationThickness", "textUnderlineOffset", "fontSmoothing", "placeholderColor", "placeholderOpacity", "caretColor", "accentColor", "opacity", "backgroundBlendMode", "mixBlendMode", "boxShadow", "boxShadowColor", "outlineStyle", "outlineWidth", "outlineOffset", "outlineColor", "ringWidth", "ringColor", "ringOpacity", "ringOffsetWidth", "ringOffsetColor", "blur", "brightness", "contrast", "dropShadow", "grayscale", "hueRotate", "invert", "saturate", "sepia", "filter", "backdropBlur", "backdropBrightness", "backdropContrast", "backdropGrayscale", "backdropHueRotate", "backdropInvert", "backdropOpacity", "backdropSaturate", "backdropSepia", "backdropFilter", "transitionProperty", "transitionDelay", "transitionDuration", "transitionTimingFunction", "willChange", "content"];
    });
    hu = U((oo) => {
      "use strict";
      Object.defineProperty(oo, "__esModule", { value: true });
      Object.defineProperty(oo, "default", { enumerable: true, get: /* @__PURE__ */ __name2(() => Md, "get") });
      function Md(e, t) {
        return e === void 0 ? t : Array.isArray(e) ? e : [...new Set(t.filter((r) => e !== false && e[r] !== false).concat(Object.keys(e).filter((r) => e[r] !== false)))];
      }
      __name(Md, "Md");
      __name2(Md, "Md");
    });
    so = U((Ex, mu) => {
      mu.exports = { content: [], presets: [], darkMode: "media", theme: { screens: { sm: "640px", md: "768px", lg: "1024px", xl: "1280px", "2xl": "1536px" }, colors: /* @__PURE__ */ __name2(({ colors: e }) => ({ inherit: e.inherit, current: e.current, transparent: e.transparent, black: e.black, white: e.white, slate: e.slate, gray: e.gray, zinc: e.zinc, neutral: e.neutral, stone: e.stone, red: e.red, orange: e.orange, amber: e.amber, yellow: e.yellow, lime: e.lime, green: e.green, emerald: e.emerald, teal: e.teal, cyan: e.cyan, sky: e.sky, blue: e.blue, indigo: e.indigo, violet: e.violet, purple: e.purple, fuchsia: e.fuchsia, pink: e.pink, rose: e.rose }), "colors"), columns: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", "3xs": "16rem", "2xs": "18rem", xs: "20rem", sm: "24rem", md: "28rem", lg: "32rem", xl: "36rem", "2xl": "42rem", "3xl": "48rem", "4xl": "56rem", "5xl": "64rem", "6xl": "72rem", "7xl": "80rem" }, spacing: { px: "1px", 0: "0px", 0.5: "0.125rem", 1: "0.25rem", 1.5: "0.375rem", 2: "0.5rem", 2.5: "0.625rem", 3: "0.75rem", 3.5: "0.875rem", 4: "1rem", 5: "1.25rem", 6: "1.5rem", 7: "1.75rem", 8: "2rem", 9: "2.25rem", 10: "2.5rem", 11: "2.75rem", 12: "3rem", 14: "3.5rem", 16: "4rem", 20: "5rem", 24: "6rem", 28: "7rem", 32: "8rem", 36: "9rem", 40: "10rem", 44: "11rem", 48: "12rem", 52: "13rem", 56: "14rem", 60: "15rem", 64: "16rem", 72: "18rem", 80: "20rem", 96: "24rem" }, animation: { none: "none", spin: "spin 1s linear infinite", ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite", pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite", bounce: "bounce 1s infinite" }, aspectRatio: { auto: "auto", square: "1 / 1", video: "16 / 9" }, backdropBlur: /* @__PURE__ */ __name2(({ theme: e }) => e("blur"), "backdropBlur"), backdropBrightness: /* @__PURE__ */ __name2(({ theme: e }) => e("brightness"), "backdropBrightness"), backdropContrast: /* @__PURE__ */ __name2(({ theme: e }) => e("contrast"), "backdropContrast"), backdropGrayscale: /* @__PURE__ */ __name2(({ theme: e }) => e("grayscale"), "backdropGrayscale"), backdropHueRotate: /* @__PURE__ */ __name2(({ theme: e }) => e("hueRotate"), "backdropHueRotate"), backdropInvert: /* @__PURE__ */ __name2(({ theme: e }) => e("invert"), "backdropInvert"), backdropOpacity: /* @__PURE__ */ __name2(({ theme: e }) => e("opacity"), "backdropOpacity"), backdropSaturate: /* @__PURE__ */ __name2(({ theme: e }) => e("saturate"), "backdropSaturate"), backdropSepia: /* @__PURE__ */ __name2(({ theme: e }) => e("sepia"), "backdropSepia"), backgroundColor: /* @__PURE__ */ __name2(({ theme: e }) => e("colors"), "backgroundColor"), backgroundImage: { none: "none", "gradient-to-t": "linear-gradient(to top, var(--tw-gradient-stops))", "gradient-to-tr": "linear-gradient(to top right, var(--tw-gradient-stops))", "gradient-to-r": "linear-gradient(to right, var(--tw-gradient-stops))", "gradient-to-br": "linear-gradient(to bottom right, var(--tw-gradient-stops))", "gradient-to-b": "linear-gradient(to bottom, var(--tw-gradient-stops))", "gradient-to-bl": "linear-gradient(to bottom left, var(--tw-gradient-stops))", "gradient-to-l": "linear-gradient(to left, var(--tw-gradient-stops))", "gradient-to-tl": "linear-gradient(to top left, var(--tw-gradient-stops))" }, backgroundOpacity: /* @__PURE__ */ __name2(({ theme: e }) => e("opacity"), "backgroundOpacity"), backgroundPosition: { bottom: "bottom", center: "center", left: "left", "left-bottom": "left bottom", "left-top": "left top", right: "right", "right-bottom": "right bottom", "right-top": "right top", top: "top" }, backgroundSize: { auto: "auto", cover: "cover", contain: "contain" }, blur: { 0: "0", none: "0", sm: "4px", DEFAULT: "8px", md: "12px", lg: "16px", xl: "24px", "2xl": "40px", "3xl": "64px" }, brightness: { 0: "0", 50: ".5", 75: ".75", 90: ".9", 95: ".95", 100: "1", 105: "1.05", 110: "1.1", 125: "1.25", 150: "1.5", 200: "2" }, borderColor: /* @__PURE__ */ __name2(({ theme: e }) => ({ ...e("colors"), DEFAULT: e("colors.gray.200", "currentColor") }), "borderColor"), borderOpacity: /* @__PURE__ */ __name2(({ theme: e }) => e("opacity"), "borderOpacity"), borderRadius: { none: "0px", sm: "0.125rem", DEFAULT: "0.25rem", md: "0.375rem", lg: "0.5rem", xl: "0.75rem", "2xl": "1rem", "3xl": "1.5rem", full: "9999px" }, borderSpacing: /* @__PURE__ */ __name2(({ theme: e }) => ({ ...e("spacing") }), "borderSpacing"), borderWidth: { DEFAULT: "1px", 0: "0px", 2: "2px", 4: "4px", 8: "8px" }, boxShadow: { sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)", DEFAULT: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)", md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)", lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)", xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)", "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)", inner: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)", none: "none" }, boxShadowColor: /* @__PURE__ */ __name2(({ theme: e }) => e("colors"), "boxShadowColor"), caretColor: /* @__PURE__ */ __name2(({ theme: e }) => e("colors"), "caretColor"), accentColor: /* @__PURE__ */ __name2(({ theme: e }) => ({ ...e("colors"), auto: "auto" }), "accentColor"), contrast: { 0: "0", 50: ".5", 75: ".75", 100: "1", 125: "1.25", 150: "1.5", 200: "2" }, container: {}, content: { none: "none" }, cursor: { auto: "auto", default: "default", pointer: "pointer", wait: "wait", text: "text", move: "move", help: "help", "not-allowed": "not-allowed", none: "none", "context-menu": "context-menu", progress: "progress", cell: "cell", crosshair: "crosshair", "vertical-text": "vertical-text", alias: "alias", copy: "copy", "no-drop": "no-drop", grab: "grab", grabbing: "grabbing", "all-scroll": "all-scroll", "col-resize": "col-resize", "row-resize": "row-resize", "n-resize": "n-resize", "e-resize": "e-resize", "s-resize": "s-resize", "w-resize": "w-resize", "ne-resize": "ne-resize", "nw-resize": "nw-resize", "se-resize": "se-resize", "sw-resize": "sw-resize", "ew-resize": "ew-resize", "ns-resize": "ns-resize", "nesw-resize": "nesw-resize", "nwse-resize": "nwse-resize", "zoom-in": "zoom-in", "zoom-out": "zoom-out" }, divideColor: /* @__PURE__ */ __name2(({ theme: e }) => e("borderColor"), "divideColor"), divideOpacity: /* @__PURE__ */ __name2(({ theme: e }) => e("borderOpacity"), "divideOpacity"), divideWidth: /* @__PURE__ */ __name2(({ theme: e }) => e("borderWidth"), "divideWidth"), dropShadow: { sm: "0 1px 1px rgb(0 0 0 / 0.05)", DEFAULT: ["0 1px 2px rgb(0 0 0 / 0.1)", "0 1px 1px rgb(0 0 0 / 0.06)"], md: ["0 4px 3px rgb(0 0 0 / 0.07)", "0 2px 2px rgb(0 0 0 / 0.06)"], lg: ["0 10px 8px rgb(0 0 0 / 0.04)", "0 4px 3px rgb(0 0 0 / 0.1)"], xl: ["0 20px 13px rgb(0 0 0 / 0.03)", "0 8px 5px rgb(0 0 0 / 0.08)"], "2xl": "0 25px 25px rgb(0 0 0 / 0.15)", none: "0 0 #0000" }, fill: /* @__PURE__ */ __name2(({ theme: e }) => e("colors"), "fill"), grayscale: { 0: "0", DEFAULT: "100%" }, hueRotate: { 0: "0deg", 15: "15deg", 30: "30deg", 60: "60deg", 90: "90deg", 180: "180deg" }, invert: { 0: "0", DEFAULT: "100%" }, flex: { 1: "1 1 0%", auto: "1 1 auto", initial: "0 1 auto", none: "none" }, flexBasis: /* @__PURE__ */ __name2(({ theme: e }) => ({ auto: "auto", ...e("spacing"), "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", "1/5": "20%", "2/5": "40%", "3/5": "60%", "4/5": "80%", "1/6": "16.666667%", "2/6": "33.333333%", "3/6": "50%", "4/6": "66.666667%", "5/6": "83.333333%", "1/12": "8.333333%", "2/12": "16.666667%", "3/12": "25%", "4/12": "33.333333%", "5/12": "41.666667%", "6/12": "50%", "7/12": "58.333333%", "8/12": "66.666667%", "9/12": "75%", "10/12": "83.333333%", "11/12": "91.666667%", full: "100%" }), "flexBasis"), flexGrow: { 0: "0", DEFAULT: "1" }, flexShrink: { 0: "0", DEFAULT: "1" }, fontFamily: { sans: ["ui-sans-serif", "system-ui", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", '"Helvetica Neue"', "Arial", '"Noto Sans"', "sans-serif", '"Apple Color Emoji"', '"Segoe UI Emoji"', '"Segoe UI Symbol"', '"Noto Color Emoji"'], serif: ["ui-serif", "Georgia", "Cambria", '"Times New Roman"', "Times", "serif"], mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", '"Liberation Mono"', '"Courier New"', "monospace"] }, fontSize: { xs: ["0.75rem", { lineHeight: "1rem" }], sm: ["0.875rem", { lineHeight: "1.25rem" }], base: ["1rem", { lineHeight: "1.5rem" }], lg: ["1.125rem", { lineHeight: "1.75rem" }], xl: ["1.25rem", { lineHeight: "1.75rem" }], "2xl": ["1.5rem", { lineHeight: "2rem" }], "3xl": ["1.875rem", { lineHeight: "2.25rem" }], "4xl": ["2.25rem", { lineHeight: "2.5rem" }], "5xl": ["3rem", { lineHeight: "1" }], "6xl": ["3.75rem", { lineHeight: "1" }], "7xl": ["4.5rem", { lineHeight: "1" }], "8xl": ["6rem", { lineHeight: "1" }], "9xl": ["8rem", { lineHeight: "1" }] }, fontWeight: { thin: "100", extralight: "200", light: "300", normal: "400", medium: "500", semibold: "600", bold: "700", extrabold: "800", black: "900" }, gap: /* @__PURE__ */ __name2(({ theme: e }) => e("spacing"), "gap"), gradientColorStops: /* @__PURE__ */ __name2(({ theme: e }) => e("colors"), "gradientColorStops"), gridAutoColumns: { auto: "auto", min: "min-content", max: "max-content", fr: "minmax(0, 1fr)" }, gridAutoRows: { auto: "auto", min: "min-content", max: "max-content", fr: "minmax(0, 1fr)" }, gridColumn: { auto: "auto", "span-1": "span 1 / span 1", "span-2": "span 2 / span 2", "span-3": "span 3 / span 3", "span-4": "span 4 / span 4", "span-5": "span 5 / span 5", "span-6": "span 6 / span 6", "span-7": "span 7 / span 7", "span-8": "span 8 / span 8", "span-9": "span 9 / span 9", "span-10": "span 10 / span 10", "span-11": "span 11 / span 11", "span-12": "span 12 / span 12", "span-full": "1 / -1" }, gridColumnEnd: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", 13: "13" }, gridColumnStart: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12", 13: "13" }, gridRow: { auto: "auto", "span-1": "span 1 / span 1", "span-2": "span 2 / span 2", "span-3": "span 3 / span 3", "span-4": "span 4 / span 4", "span-5": "span 5 / span 5", "span-6": "span 6 / span 6", "span-full": "1 / -1" }, gridRowStart: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7" }, gridRowEnd: { auto: "auto", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7" }, gridTemplateColumns: { none: "none", 1: "repeat(1, minmax(0, 1fr))", 2: "repeat(2, minmax(0, 1fr))", 3: "repeat(3, minmax(0, 1fr))", 4: "repeat(4, minmax(0, 1fr))", 5: "repeat(5, minmax(0, 1fr))", 6: "repeat(6, minmax(0, 1fr))", 7: "repeat(7, minmax(0, 1fr))", 8: "repeat(8, minmax(0, 1fr))", 9: "repeat(9, minmax(0, 1fr))", 10: "repeat(10, minmax(0, 1fr))", 11: "repeat(11, minmax(0, 1fr))", 12: "repeat(12, minmax(0, 1fr))" }, gridTemplateRows: { none: "none", 1: "repeat(1, minmax(0, 1fr))", 2: "repeat(2, minmax(0, 1fr))", 3: "repeat(3, minmax(0, 1fr))", 4: "repeat(4, minmax(0, 1fr))", 5: "repeat(5, minmax(0, 1fr))", 6: "repeat(6, minmax(0, 1fr))" }, height: /* @__PURE__ */ __name2(({ theme: e }) => ({ auto: "auto", ...e("spacing"), "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", "1/5": "20%", "2/5": "40%", "3/5": "60%", "4/5": "80%", "1/6": "16.666667%", "2/6": "33.333333%", "3/6": "50%", "4/6": "66.666667%", "5/6": "83.333333%", full: "100%", screen: "100vh", min: "min-content", max: "max-content", fit: "fit-content" }), "height"), inset: /* @__PURE__ */ __name2(({ theme: e }) => ({ auto: "auto", ...e("spacing"), "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", full: "100%" }), "inset"), keyframes: { spin: { to: { transform: "rotate(360deg)" } }, ping: { "75%, 100%": { transform: "scale(2)", opacity: "0" } }, pulse: { "50%": { opacity: ".5" } }, bounce: { "0%, 100%": { transform: "translateY(-25%)", animationTimingFunction: "cubic-bezier(0.8,0,1,1)" }, "50%": { transform: "none", animationTimingFunction: "cubic-bezier(0,0,0.2,1)" } } }, letterSpacing: { tighter: "-0.05em", tight: "-0.025em", normal: "0em", wide: "0.025em", wider: "0.05em", widest: "0.1em" }, lineHeight: { none: "1", tight: "1.25", snug: "1.375", normal: "1.5", relaxed: "1.625", loose: "2", 3: ".75rem", 4: "1rem", 5: "1.25rem", 6: "1.5rem", 7: "1.75rem", 8: "2rem", 9: "2.25rem", 10: "2.5rem" }, listStyleType: { none: "none", disc: "disc", decimal: "decimal" }, margin: /* @__PURE__ */ __name2(({ theme: e }) => ({ auto: "auto", ...e("spacing") }), "margin"), maxHeight: /* @__PURE__ */ __name2(({ theme: e }) => ({ ...e("spacing"), full: "100%", screen: "100vh", min: "min-content", max: "max-content", fit: "fit-content" }), "maxHeight"), maxWidth: /* @__PURE__ */ __name2(({ theme: e, breakpoints: t }) => ({ none: "none", 0: "0rem", xs: "20rem", sm: "24rem", md: "28rem", lg: "32rem", xl: "36rem", "2xl": "42rem", "3xl": "48rem", "4xl": "56rem", "5xl": "64rem", "6xl": "72rem", "7xl": "80rem", full: "100%", min: "min-content", max: "max-content", fit: "fit-content", prose: "65ch", ...t(e("screens")) }), "maxWidth"), minHeight: { 0: "0px", full: "100%", screen: "100vh", min: "min-content", max: "max-content", fit: "fit-content" }, minWidth: { 0: "0px", full: "100%", min: "min-content", max: "max-content", fit: "fit-content" }, objectPosition: { bottom: "bottom", center: "center", left: "left", "left-bottom": "left bottom", "left-top": "left top", right: "right", "right-bottom": "right bottom", "right-top": "right top", top: "top" }, opacity: { 0: "0", 5: "0.05", 10: "0.1", 20: "0.2", 25: "0.25", 30: "0.3", 40: "0.4", 50: "0.5", 60: "0.6", 70: "0.7", 75: "0.75", 80: "0.8", 90: "0.9", 95: "0.95", 100: "1" }, order: { first: "-9999", last: "9999", none: "0", 1: "1", 2: "2", 3: "3", 4: "4", 5: "5", 6: "6", 7: "7", 8: "8", 9: "9", 10: "10", 11: "11", 12: "12" }, padding: /* @__PURE__ */ __name2(({ theme: e }) => e("spacing"), "padding"), placeholderColor: /* @__PURE__ */ __name2(({ theme: e }) => e("colors"), "placeholderColor"), placeholderOpacity: /* @__PURE__ */ __name2(({ theme: e }) => e("opacity"), "placeholderOpacity"), outlineColor: /* @__PURE__ */ __name2(({ theme: e }) => e("colors"), "outlineColor"), outlineOffset: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" }, outlineWidth: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" }, ringColor: /* @__PURE__ */ __name2(({ theme: e }) => ({ DEFAULT: e("colors.blue.500", "#3b82f6"), ...e("colors") }), "ringColor"), ringOffsetColor: /* @__PURE__ */ __name2(({ theme: e }) => e("colors"), "ringOffsetColor"), ringOffsetWidth: { 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" }, ringOpacity: /* @__PURE__ */ __name2(({ theme: e }) => ({ DEFAULT: "0.5", ...e("opacity") }), "ringOpacity"), ringWidth: { DEFAULT: "3px", 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" }, rotate: { 0: "0deg", 1: "1deg", 2: "2deg", 3: "3deg", 6: "6deg", 12: "12deg", 45: "45deg", 90: "90deg", 180: "180deg" }, saturate: { 0: "0", 50: ".5", 100: "1", 150: "1.5", 200: "2" }, scale: { 0: "0", 50: ".5", 75: ".75", 90: ".9", 95: ".95", 100: "1", 105: "1.05", 110: "1.1", 125: "1.25", 150: "1.5" }, scrollMargin: /* @__PURE__ */ __name2(({ theme: e }) => ({ ...e("spacing") }), "scrollMargin"), scrollPadding: /* @__PURE__ */ __name2(({ theme: e }) => e("spacing"), "scrollPadding"), sepia: { 0: "0", DEFAULT: "100%" }, skew: { 0: "0deg", 1: "1deg", 2: "2deg", 3: "3deg", 6: "6deg", 12: "12deg" }, space: /* @__PURE__ */ __name2(({ theme: e }) => ({ ...e("spacing") }), "space"), stroke: /* @__PURE__ */ __name2(({ theme: e }) => e("colors"), "stroke"), strokeWidth: { 0: "0", 1: "1", 2: "2" }, textColor: /* @__PURE__ */ __name2(({ theme: e }) => e("colors"), "textColor"), textDecorationColor: /* @__PURE__ */ __name2(({ theme: e }) => e("colors"), "textDecorationColor"), textDecorationThickness: { auto: "auto", "from-font": "from-font", 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" }, textUnderlineOffset: { auto: "auto", 0: "0px", 1: "1px", 2: "2px", 4: "4px", 8: "8px" }, textIndent: /* @__PURE__ */ __name2(({ theme: e }) => ({ ...e("spacing") }), "textIndent"), textOpacity: /* @__PURE__ */ __name2(({ theme: e }) => e("opacity"), "textOpacity"), transformOrigin: { center: "center", top: "top", "top-right": "top right", right: "right", "bottom-right": "bottom right", bottom: "bottom", "bottom-left": "bottom left", left: "left", "top-left": "top left" }, transitionDelay: { 75: "75ms", 100: "100ms", 150: "150ms", 200: "200ms", 300: "300ms", 500: "500ms", 700: "700ms", 1e3: "1000ms" }, transitionDuration: { DEFAULT: "150ms", 75: "75ms", 100: "100ms", 150: "150ms", 200: "200ms", 300: "300ms", 500: "500ms", 700: "700ms", 1e3: "1000ms" }, transitionProperty: { none: "none", all: "all", DEFAULT: "color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter", colors: "color, background-color, border-color, text-decoration-color, fill, stroke", opacity: "opacity", shadow: "box-shadow", transform: "transform" }, transitionTimingFunction: { DEFAULT: "cubic-bezier(0.4, 0, 0.2, 1)", linear: "linear", in: "cubic-bezier(0.4, 0, 1, 1)", out: "cubic-bezier(0, 0, 0.2, 1)", "in-out": "cubic-bezier(0.4, 0, 0.2, 1)" }, translate: /* @__PURE__ */ __name2(({ theme: e }) => ({ ...e("spacing"), "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", full: "100%" }), "translate"), width: /* @__PURE__ */ __name2(({ theme: e }) => ({ auto: "auto", ...e("spacing"), "1/2": "50%", "1/3": "33.333333%", "2/3": "66.666667%", "1/4": "25%", "2/4": "50%", "3/4": "75%", "1/5": "20%", "2/5": "40%", "3/5": "60%", "4/5": "80%", "1/6": "16.666667%", "2/6": "33.333333%", "3/6": "50%", "4/6": "66.666667%", "5/6": "83.333333%", "1/12": "8.333333%", "2/12": "16.666667%", "3/12": "25%", "4/12": "33.333333%", "5/12": "41.666667%", "6/12": "50%", "7/12": "58.333333%", "8/12": "66.666667%", "9/12": "75%", "10/12": "83.333333%", "11/12": "91.666667%", full: "100%", screen: "100vw", min: "min-content", max: "max-content", fit: "fit-content" }), "width"), willChange: { auto: "auto", scroll: "scroll-position", contents: "contents", transform: "transform" }, zIndex: { auto: "auto", 0: "0", 10: "10", 20: "20", 30: "30", 40: "40", 50: "50" } }, variantOrder: ["first", "last", "odd", "even", "visited", "checked", "empty", "read-only", "group-hover", "group-focus", "focus-within", "hover", "focus", "focus-visible", "active", "disabled"], plugins: [] };
    });
    Jn = {};
    Rn(Jn, { default: /* @__PURE__ */ __name2(() => Nd, "default") });
    Zn = Zt(() => {
      Nd = { info(e, t) {
        console.info(...Array.isArray(e) ? [e] : [t, e]);
      }, warn(e, t) {
        console.warn(...Array.isArray(e) ? [e] : [t, e]);
      }, risk(e, t) {
        console.error(...Array.isArray(e) ? [e] : [t, e]);
      } };
    });
    gu = U((ao) => {
      "use strict";
      Object.defineProperty(ao, "__esModule", { value: true });
      Object.defineProperty(ao, "default", { enumerable: true, get: /* @__PURE__ */ __name2(() => Fd, "get") });
      var Wd = Dd((Zn(), Cn(Jn)));
      function Dd(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(Dd, "Dd");
      __name2(Dd, "Dd");
      function $r({ version: e, from: t, to: n }) {
        Wd.default.warn(`${t}-color-renamed`, [`As of Tailwind CSS ${e}, \`${t}\` has been renamed to \`${n}\`.`, "Update your configuration file to silence this warning."]);
      }
      __name($r, "$r");
      __name2($r, "$r");
      var Fd = { inherit: "inherit", current: "currentColor", transparent: "transparent", black: "#000", white: "#fff", slate: { 50: "#f8fafc", 100: "#f1f5f9", 200: "#e2e8f0", 300: "#cbd5e1", 400: "#94a3b8", 500: "#64748b", 600: "#475569", 700: "#334155", 800: "#1e293b", 900: "#0f172a" }, gray: { 50: "#f9fafb", 100: "#f3f4f6", 200: "#e5e7eb", 300: "#d1d5db", 400: "#9ca3af", 500: "#6b7280", 600: "#4b5563", 700: "#374151", 800: "#1f2937", 900: "#111827" }, zinc: { 50: "#fafafa", 100: "#f4f4f5", 200: "#e4e4e7", 300: "#d4d4d8", 400: "#a1a1aa", 500: "#71717a", 600: "#52525b", 700: "#3f3f46", 800: "#27272a", 900: "#18181b" }, neutral: { 50: "#fafafa", 100: "#f5f5f5", 200: "#e5e5e5", 300: "#d4d4d4", 400: "#a3a3a3", 500: "#737373", 600: "#525252", 700: "#404040", 800: "#262626", 900: "#171717" }, stone: { 50: "#fafaf9", 100: "#f5f5f4", 200: "#e7e5e4", 300: "#d6d3d1", 400: "#a8a29e", 500: "#78716c", 600: "#57534e", 700: "#44403c", 800: "#292524", 900: "#1c1917" }, red: { 50: "#fef2f2", 100: "#fee2e2", 200: "#fecaca", 300: "#fca5a5", 400: "#f87171", 500: "#ef4444", 600: "#dc2626", 700: "#b91c1c", 800: "#991b1b", 900: "#7f1d1d" }, orange: { 50: "#fff7ed", 100: "#ffedd5", 200: "#fed7aa", 300: "#fdba74", 400: "#fb923c", 500: "#f97316", 600: "#ea580c", 700: "#c2410c", 800: "#9a3412", 900: "#7c2d12" }, amber: { 50: "#fffbeb", 100: "#fef3c7", 200: "#fde68a", 300: "#fcd34d", 400: "#fbbf24", 500: "#f59e0b", 600: "#d97706", 700: "#b45309", 800: "#92400e", 900: "#78350f" }, yellow: { 50: "#fefce8", 100: "#fef9c3", 200: "#fef08a", 300: "#fde047", 400: "#facc15", 500: "#eab308", 600: "#ca8a04", 700: "#a16207", 800: "#854d0e", 900: "#713f12" }, lime: { 50: "#f7fee7", 100: "#ecfccb", 200: "#d9f99d", 300: "#bef264", 400: "#a3e635", 500: "#84cc16", 600: "#65a30d", 700: "#4d7c0f", 800: "#3f6212", 900: "#365314" }, green: { 50: "#f0fdf4", 100: "#dcfce7", 200: "#bbf7d0", 300: "#86efac", 400: "#4ade80", 500: "#22c55e", 600: "#16a34a", 700: "#15803d", 800: "#166534", 900: "#14532d" }, emerald: { 50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 300: "#6ee7b7", 400: "#34d399", 500: "#10b981", 600: "#059669", 700: "#047857", 800: "#065f46", 900: "#064e3b" }, teal: { 50: "#f0fdfa", 100: "#ccfbf1", 200: "#99f6e4", 300: "#5eead4", 400: "#2dd4bf", 500: "#14b8a6", 600: "#0d9488", 700: "#0f766e", 800: "#115e59", 900: "#134e4a" }, cyan: { 50: "#ecfeff", 100: "#cffafe", 200: "#a5f3fc", 300: "#67e8f9", 400: "#22d3ee", 500: "#06b6d4", 600: "#0891b2", 700: "#0e7490", 800: "#155e75", 900: "#164e63" }, sky: { 50: "#f0f9ff", 100: "#e0f2fe", 200: "#bae6fd", 300: "#7dd3fc", 400: "#38bdf8", 500: "#0ea5e9", 600: "#0284c7", 700: "#0369a1", 800: "#075985", 900: "#0c4a6e" }, blue: { 50: "#eff6ff", 100: "#dbeafe", 200: "#bfdbfe", 300: "#93c5fd", 400: "#60a5fa", 500: "#3b82f6", 600: "#2563eb", 700: "#1d4ed8", 800: "#1e40af", 900: "#1e3a8a" }, indigo: { 50: "#eef2ff", 100: "#e0e7ff", 200: "#c7d2fe", 300: "#a5b4fc", 400: "#818cf8", 500: "#6366f1", 600: "#4f46e5", 700: "#4338ca", 800: "#3730a3", 900: "#312e81" }, violet: { 50: "#f5f3ff", 100: "#ede9fe", 200: "#ddd6fe", 300: "#c4b5fd", 400: "#a78bfa", 500: "#8b5cf6", 600: "#7c3aed", 700: "#6d28d9", 800: "#5b21b6", 900: "#4c1d95" }, purple: { 50: "#faf5ff", 100: "#f3e8ff", 200: "#e9d5ff", 300: "#d8b4fe", 400: "#c084fc", 500: "#a855f7", 600: "#9333ea", 700: "#7e22ce", 800: "#6b21a8", 900: "#581c87" }, fuchsia: { 50: "#fdf4ff", 100: "#fae8ff", 200: "#f5d0fe", 300: "#f0abfc", 400: "#e879f9", 500: "#d946ef", 600: "#c026d3", 700: "#a21caf", 800: "#86198f", 900: "#701a75" }, pink: { 50: "#fdf2f8", 100: "#fce7f3", 200: "#fbcfe8", 300: "#f9a8d4", 400: "#f472b6", 500: "#ec4899", 600: "#db2777", 700: "#be185d", 800: "#9d174d", 900: "#831843" }, rose: { 50: "#fff1f2", 100: "#ffe4e6", 200: "#fecdd3", 300: "#fda4af", 400: "#fb7185", 500: "#f43f5e", 600: "#e11d48", 700: "#be123c", 800: "#9f1239", 900: "#881337" }, get lightBlue() {
        return $r({ version: "v2.2", from: "lightBlue", to: "sky" }), this.sky;
      }, get warmGray() {
        return $r({ version: "v3.0", from: "warmGray", to: "stone" }), this.stone;
      }, get trueGray() {
        return $r({ version: "v3.0", from: "trueGray", to: "neutral" }), this.neutral;
      }, get coolGray() {
        return $r({ version: "v3.0", from: "coolGray", to: "gray" }), this.gray;
      }, get blueGray() {
        return $r({ version: "v3.0", from: "blueGray", to: "slate" }), this.slate;
      } };
    });
    bu = U((uo) => {
      "use strict";
      Object.defineProperty(uo, "__esModule", { value: true });
      Object.defineProperty(uo, "defaults", { enumerable: true, get: /* @__PURE__ */ __name2(() => Bd, "get") });
      function Bd(e, ...t) {
        for (let i2 of t) {
          for (let o in i2) {
            var n;
            !(e == null || (n = e.hasOwnProperty) === null || n === void 0) && n.call(e, o) || (e[o] = i2[o]);
          }
          for (let o of Object.getOwnPropertySymbols(i2)) {
            var r;
            !(e == null || (r = e.hasOwnProperty) === null || r === void 0) && r.call(e, o) || (e[o] = i2[o]);
          }
        }
        return e;
      }
      __name(Bd, "Bd");
      __name2(Bd, "Bd");
    });
    vu = U((lo) => {
      "use strict";
      Object.defineProperty(lo, "__esModule", { value: true });
      Object.defineProperty(lo, "toPath", { enumerable: true, get: /* @__PURE__ */ __name2(() => $d, "get") });
      function $d(e) {
        if (Array.isArray(e)) return e;
        let t = e.split("[").length - 1, n = e.split("]").length - 1;
        if (t !== n) throw new Error(`Path is invalid. Has unbalanced brackets: ${e}`);
        return e.split(/\.(?![^\[]*\])|[\[\]]/g).filter(Boolean);
      }
      __name($d, "$d");
      __name2($d, "$d");
    });
    xu = U((fo) => {
      "use strict";
      Object.defineProperty(fo, "__esModule", { value: true });
      Object.defineProperty(fo, "normalizeConfig", { enumerable: true, get: /* @__PURE__ */ __name2(() => Ud, "get") });
      var qr = qd((Zn(), Cn(Jn)));
      function yu(e) {
        if (typeof WeakMap != "function") return null;
        var t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
        return (yu = /* @__PURE__ */ __name2(function(r) {
          return r ? n : t;
        }, "yu"))(e);
      }
      __name(yu, "yu");
      __name2(yu, "yu");
      function qd(e, t) {
        if (!t && e && e.__esModule) return e;
        if (e === null || typeof e != "object" && typeof e != "function") return { default: e };
        var n = yu(t);
        if (n && n.has(e)) return n.get(e);
        var r = {}, i2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var o in e) if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i2 ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set) ? Object.defineProperty(r, o, s) : r[o] = e[o];
        }
        return r.default = e, n && n.set(e, r), r;
      }
      __name(qd, "qd");
      __name2(qd, "qd");
      function Ud(e) {
        if ((() => {
          if (e.purge || !e.content || !Array.isArray(e.content) && !(typeof e.content == "object" && e.content !== null)) return false;
          if (Array.isArray(e.content)) return e.content.every((r) => typeof r == "string" ? true : !(typeof (r == null ? void 0 : r.raw) != "string" || r != null && r.extension && typeof (r == null ? void 0 : r.extension) != "string"));
          if (typeof e.content == "object" && e.content !== null) {
            if (Object.keys(e.content).some((r) => !["files", "extract", "transform"].includes(r))) return false;
            if (Array.isArray(e.content.files)) {
              if (!e.content.files.every((r) => typeof r == "string" ? true : !(typeof (r == null ? void 0 : r.raw) != "string" || r != null && r.extension && typeof (r == null ? void 0 : r.extension) != "string"))) return false;
              if (typeof e.content.extract == "object") {
                for (let r of Object.values(e.content.extract)) if (typeof r != "function") return false;
              } else if (!(e.content.extract === void 0 || typeof e.content.extract == "function")) return false;
              if (typeof e.content.transform == "object") {
                for (let r of Object.values(e.content.transform)) if (typeof r != "function") return false;
              } else if (!(e.content.transform === void 0 || typeof e.content.transform == "function")) return false;
            }
            return true;
          }
          return false;
        })() || qr.default.warn("purge-deprecation", ["The `purge`/`content` options have changed in Tailwind CSS v3.0.", "Update your configuration file to eliminate this warning.", "https://tailwindcss.com/docs/upgrade-guide#configure-content-sources"]), e.safelist = (() => {
          var r;
          let { content: i2, purge: o, safelist: s } = e;
          return Array.isArray(s) ? s : Array.isArray(i2 == null ? void 0 : i2.safelist) ? i2.safelist : Array.isArray(o == null ? void 0 : o.safelist) ? o.safelist : Array.isArray(o == null || (r = o.options) === null || r === void 0 ? void 0 : r.safelist) ? o.options.safelist : [];
        })(), typeof e.prefix == "function") qr.default.warn("prefix-function", ["As of Tailwind CSS v3.0, `prefix` cannot be a function.", "Update `prefix` in your configuration to be a string to eliminate this warning.", "https://tailwindcss.com/docs/upgrade-guide#prefix-cannot-be-a-function"]), e.prefix = "";
        else {
          var n;
          e.prefix = (n = e.prefix) !== null && n !== void 0 ? n : "";
        }
        e.content = { files: (() => {
          let { content: r, purge: i2 } = e;
          return Array.isArray(i2) ? i2 : Array.isArray(i2 == null ? void 0 : i2.content) ? i2.content : Array.isArray(r) ? r : Array.isArray(r == null ? void 0 : r.content) ? r.content : Array.isArray(r == null ? void 0 : r.files) ? r.files : [];
        })(), extract: (() => {
          let r = (() => {
            var s, a, u2, f, l2, p, h2, g2, b, y;
            return !((s = e.purge) === null || s === void 0) && s.extract ? e.purge.extract : !((a = e.content) === null || a === void 0) && a.extract ? e.content.extract : !((u2 = e.purge) === null || u2 === void 0 || (f = u2.extract) === null || f === void 0) && f.DEFAULT ? e.purge.extract.DEFAULT : !((l2 = e.content) === null || l2 === void 0 || (p = l2.extract) === null || p === void 0) && p.DEFAULT ? e.content.extract.DEFAULT : !((h2 = e.purge) === null || h2 === void 0 || (g2 = h2.options) === null || g2 === void 0) && g2.extractors ? e.purge.options.extractors : !((b = e.content) === null || b === void 0 || (y = b.options) === null || y === void 0) && y.extractors ? e.content.options.extractors : {};
          })(), i2 = {}, o = (() => {
            var s, a, u2, f;
            if (!((s = e.purge) === null || s === void 0 || (a = s.options) === null || a === void 0) && a.defaultExtractor) return e.purge.options.defaultExtractor;
            if (!((u2 = e.content) === null || u2 === void 0 || (f = u2.options) === null || f === void 0) && f.defaultExtractor) return e.content.options.defaultExtractor;
          })();
          if (o !== void 0 && (i2.DEFAULT = o), typeof r == "function") i2.DEFAULT = r;
          else if (Array.isArray(r)) for (let { extensions: s, extractor: a } of r ?? []) for (let u2 of s) i2[u2] = a;
          else typeof r == "object" && r !== null && Object.assign(i2, r);
          return i2;
        })(), transform: (() => {
          let r = (() => {
            var o, s, a, u2, f, l2;
            return !((o = e.purge) === null || o === void 0) && o.transform ? e.purge.transform : !((s = e.content) === null || s === void 0) && s.transform ? e.content.transform : !((a = e.purge) === null || a === void 0 || (u2 = a.transform) === null || u2 === void 0) && u2.DEFAULT ? e.purge.transform.DEFAULT : !((f = e.content) === null || f === void 0 || (l2 = f.transform) === null || l2 === void 0) && l2.DEFAULT ? e.content.transform.DEFAULT : {};
          })(), i2 = {};
          return typeof r == "function" && (i2.DEFAULT = r), typeof r == "object" && r !== null && Object.assign(i2, r), i2;
        })() };
        for (let r of e.content.files) if (typeof r == "string" && /{([^,]*?)}/g.test(r)) {
          qr.default.warn("invalid-glob-braces", [`The glob pattern ${(0, qr.dim)(r)} in your Tailwind CSS configuration is invalid.`, `Update it to ${(0, qr.dim)(r.replace(/{([^,]*?)}/g, "$1"))} to silence this warning.`]);
          break;
        }
        return e;
      }
      __name(Ud, "Ud");
      __name2(Ud, "Ud");
    });
    wu = U((co) => {
      "use strict";
      Object.defineProperty(co, "__esModule", { value: true });
      Object.defineProperty(co, "default", { enumerable: true, get: /* @__PURE__ */ __name2(() => zd, "get") });
      function zd(e) {
        if (Object.prototype.toString.call(e) !== "[object Object]") return false;
        let t = Object.getPrototypeOf(e);
        return t === null || t === Object.prototype;
      }
      __name(zd, "zd");
      __name2(zd, "zd");
    });
    Su = U((ho) => {
      "use strict";
      Object.defineProperty(ho, "__esModule", { value: true });
      Object.defineProperty(ho, "cloneDeep", { enumerable: true, get: /* @__PURE__ */ __name2(() => po, "get") });
      function po(e) {
        return Array.isArray(e) ? e.map((t) => po(t)) : typeof e == "object" && e !== null ? Object.fromEntries(Object.entries(e).map(([t, n]) => [t, po(n)])) : e;
      }
      __name(po, "po");
      __name2(po, "po");
    });
    mo = U((ei, _u) => {
      "use strict";
      ei.__esModule = true;
      ei.default = Vd;
      function Gd(e) {
        for (var t = e.toLowerCase(), n = "", r = false, i2 = 0; i2 < 6 && t[i2] !== void 0; i2++) {
          var o = t.charCodeAt(i2), s = o >= 97 && o <= 102 || o >= 48 && o <= 57;
          if (r = o === 32, !s) break;
          n += t[i2];
        }
        if (n.length !== 0) {
          var a = parseInt(n, 16), u2 = a >= 55296 && a <= 57343;
          return u2 || a === 0 || a > 1114111 ? ["\uFFFD", n.length + (r ? 1 : 0)] : [String.fromCodePoint(a), n.length + (r ? 1 : 0)];
        }
      }
      __name(Gd, "Gd");
      __name2(Gd, "Gd");
      var jd = /\\/;
      function Vd(e) {
        var t = jd.test(e);
        if (!t) return e;
        for (var n = "", r = 0; r < e.length; r++) {
          if (e[r] === "\\") {
            var i2 = Gd(e.slice(r + 1, r + 7));
            if (i2 !== void 0) {
              n += i2[0], r += i2[1];
              continue;
            }
            if (e[r + 1] === "\\") {
              n += "\\", r++;
              continue;
            }
            e.length === r + 1 && (n += e[r]);
            continue;
          }
          n += e[r];
        }
        return n;
      }
      __name(Vd, "Vd");
      __name2(Vd, "Vd");
      _u.exports = ei.default;
    });
    ku = U((ti, Tu) => {
      "use strict";
      ti.__esModule = true;
      ti.default = Hd;
      function Hd(e) {
        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
        for (; n.length > 0; ) {
          var i2 = n.shift();
          if (!e[i2]) return;
          e = e[i2];
        }
        return e;
      }
      __name(Hd, "Hd");
      __name2(Hd, "Hd");
      Tu.exports = ti.default;
    });
    Ou = U((ri, Eu) => {
      "use strict";
      ri.__esModule = true;
      ri.default = Yd;
      function Yd(e) {
        for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) n[r - 1] = arguments[r];
        for (; n.length > 0; ) {
          var i2 = n.shift();
          e[i2] || (e[i2] = {}), e = e[i2];
        }
      }
      __name(Yd, "Yd");
      __name2(Yd, "Yd");
      Eu.exports = ri.default;
    });
    Au = U((ni, Pu) => {
      "use strict";
      ni.__esModule = true;
      ni.default = Xd;
      function Xd(e) {
        for (var t = "", n = e.indexOf("/*"), r = 0; n >= 0; ) {
          t = t + e.slice(r, n);
          var i2 = e.indexOf("*/", n + 2);
          if (i2 < 0) return t;
          r = i2 + 2, n = e.indexOf("/*", r);
        }
        return t = t + e.slice(r), t;
      }
      __name(Xd, "Xd");
      __name2(Xd, "Xd");
      Pu.exports = ni.default;
    });
    Ur = U((xt) => {
      "use strict";
      xt.__esModule = true;
      xt.stripComments = xt.ensureObject = xt.getProp = xt.unesc = void 0;
      var Qd = ii(mo());
      xt.unesc = Qd.default;
      var Kd = ii(ku());
      xt.getProp = Kd.default;
      var Jd = ii(Ou());
      xt.ensureObject = Jd.default;
      var Zd = ii(Au());
      xt.stripComments = Zd.default;
      function ii(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(ii, "ii");
      __name2(ii, "ii");
    });
    Dt = U((zr, Cu) => {
      "use strict";
      zr.__esModule = true;
      zr.default = void 0;
      var Iu = Ur();
      function Ru(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || false, r.configurable = true, "value" in r && (r.writable = true), Object.defineProperty(e, r.key, r);
        }
      }
      __name(Ru, "Ru");
      __name2(Ru, "Ru");
      function ep(e, t, n) {
        return t && Ru(e.prototype, t), n && Ru(e, n), e;
      }
      __name(ep, "ep");
      __name2(ep, "ep");
      var tp = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function e(t, n) {
        if (typeof t != "object" || t === null) return t;
        var r = new t.constructor();
        for (var i2 in t) if (t.hasOwnProperty(i2)) {
          var o = t[i2], s = typeof o;
          i2 === "parent" && s === "object" ? n && (r[i2] = n) : o instanceof Array ? r[i2] = o.map(function(a) {
            return e(a, r);
          }) : r[i2] = e(o, r);
        }
        return r;
      }, "e"), "e"), rp = (function() {
        function e(n) {
          n === void 0 && (n = {}), Object.assign(this, n), this.spaces = this.spaces || {}, this.spaces.before = this.spaces.before || "", this.spaces.after = this.spaces.after || "";
        }
        __name(e, "e");
        __name2(e, "e");
        var t = e.prototype;
        return t.remove = function() {
          return this.parent && this.parent.removeChild(this), this.parent = void 0, this;
        }, t.replaceWith = function() {
          if (this.parent) {
            for (var r in arguments) this.parent.insertBefore(this, arguments[r]);
            this.remove();
          }
          return this;
        }, t.next = function() {
          return this.parent.at(this.parent.index(this) + 1);
        }, t.prev = function() {
          return this.parent.at(this.parent.index(this) - 1);
        }, t.clone = function(r) {
          r === void 0 && (r = {});
          var i2 = tp(this);
          for (var o in r) i2[o] = r[o];
          return i2;
        }, t.appendToPropertyAndEscape = function(r, i2, o) {
          this.raws || (this.raws = {});
          var s = this[r], a = this.raws[r];
          this[r] = s + i2, a || o !== i2 ? this.raws[r] = (a || s) + o : delete this.raws[r];
        }, t.setPropertyAndEscape = function(r, i2, o) {
          this.raws || (this.raws = {}), this[r] = i2, this.raws[r] = o;
        }, t.setPropertyWithoutEscape = function(r, i2) {
          this[r] = i2, this.raws && delete this.raws[r];
        }, t.isAtPosition = function(r, i2) {
          if (this.source && this.source.start && this.source.end) return !(this.source.start.line > r || this.source.end.line < r || this.source.start.line === r && this.source.start.column > i2 || this.source.end.line === r && this.source.end.column < i2);
        }, t.stringifyProperty = function(r) {
          return this.raws && this.raws[r] || this[r];
        }, t.valueToString = function() {
          return String(this.stringifyProperty("value"));
        }, t.toString = function() {
          return [this.rawSpaceBefore, this.valueToString(), this.rawSpaceAfter].join("");
        }, ep(e, [{ key: "rawSpaceBefore", get: /* @__PURE__ */ __name2(function() {
          var r = this.raws && this.raws.spaces && this.raws.spaces.before;
          return r === void 0 && (r = this.spaces && this.spaces.before), r || "";
        }, "get"), set: /* @__PURE__ */ __name2(function(r) {
          (0, Iu.ensureObject)(this, "raws", "spaces"), this.raws.spaces.before = r;
        }, "set") }, { key: "rawSpaceAfter", get: /* @__PURE__ */ __name2(function() {
          var r = this.raws && this.raws.spaces && this.raws.spaces.after;
          return r === void 0 && (r = this.spaces.after), r || "";
        }, "get"), set: /* @__PURE__ */ __name2(function(r) {
          (0, Iu.ensureObject)(this, "raws", "spaces"), this.raws.spaces.after = r;
        }, "set") }]), e;
      })();
      zr.default = rp;
      Cu.exports = zr.default;
    });
    Ce = U((he) => {
      "use strict";
      he.__esModule = true;
      he.UNIVERSAL = he.ATTRIBUTE = he.CLASS = he.COMBINATOR = he.COMMENT = he.ID = he.NESTING = he.PSEUDO = he.ROOT = he.SELECTOR = he.STRING = he.TAG = void 0;
      var np = "tag";
      he.TAG = np;
      var ip = "string";
      he.STRING = ip;
      var op = "selector";
      he.SELECTOR = op;
      var sp = "root";
      he.ROOT = sp;
      var ap = "pseudo";
      he.PSEUDO = ap;
      var up = "nesting";
      he.NESTING = up;
      var lp = "id";
      he.ID = lp;
      var fp = "comment";
      he.COMMENT = fp;
      var cp = "combinator";
      he.COMBINATOR = cp;
      var dp = "class";
      he.CLASS = dp;
      var pp = "attribute";
      he.ATTRIBUTE = pp;
      var hp = "universal";
      he.UNIVERSAL = hp;
    });
    oi = U((Gr, Wu) => {
      "use strict";
      Gr.__esModule = true;
      Gr.default = void 0;
      var mp = bp(Dt()), Ft = gp(Ce());
      function Nu() {
        if (typeof WeakMap != "function") return null;
        var e = /* @__PURE__ */ new WeakMap();
        return Nu = /* @__PURE__ */ __name2(function() {
          return e;
        }, "Nu"), e;
      }
      __name(Nu, "Nu");
      __name2(Nu, "Nu");
      function gp(e) {
        if (e && e.__esModule) return e;
        if (e === null || typeof e != "object" && typeof e != "function") return { default: e };
        var t = Nu();
        if (t && t.has(e)) return t.get(e);
        var n = {}, r = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var i2 in e) if (Object.prototype.hasOwnProperty.call(e, i2)) {
          var o = r ? Object.getOwnPropertyDescriptor(e, i2) : null;
          o && (o.get || o.set) ? Object.defineProperty(n, i2, o) : n[i2] = e[i2];
        }
        return n.default = e, t && t.set(e, n), n;
      }
      __name(gp, "gp");
      __name2(gp, "gp");
      function bp(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(bp, "bp");
      __name2(bp, "bp");
      function vp(e, t) {
        var n;
        if (typeof Symbol > "u" || e[Symbol.iterator] == null) {
          if (Array.isArray(e) || (n = yp(e)) || t && e && typeof e.length == "number") {
            n && (e = n);
            var r = 0;
            return function() {
              return r >= e.length ? { done: true } : { done: false, value: e[r++] };
            };
          }
          throw new TypeError(`Invalid attempt to iterate non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
        }
        return n = e[Symbol.iterator](), n.next.bind(n);
      }
      __name(vp, "vp");
      __name2(vp, "vp");
      function yp(e, t) {
        if (e) {
          if (typeof e == "string") return Lu(e, t);
          var n = Object.prototype.toString.call(e).slice(8, -1);
          if (n === "Object" && e.constructor && (n = e.constructor.name), n === "Map" || n === "Set") return Array.from(e);
          if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return Lu(e, t);
        }
      }
      __name(yp, "yp");
      __name2(yp, "yp");
      function Lu(e, t) {
        (t == null || t > e.length) && (t = e.length);
        for (var n = 0, r = new Array(t); n < t; n++) r[n] = e[n];
        return r;
      }
      __name(Lu, "Lu");
      __name2(Lu, "Lu");
      function Mu(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || false, r.configurable = true, "value" in r && (r.writable = true), Object.defineProperty(e, r.key, r);
        }
      }
      __name(Mu, "Mu");
      __name2(Mu, "Mu");
      function xp(e, t, n) {
        return t && Mu(e.prototype, t), n && Mu(e, n), e;
      }
      __name(xp, "xp");
      __name2(xp, "xp");
      function wp(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, go(e, t);
      }
      __name(wp, "wp");
      __name2(wp, "wp");
      function go(e, t) {
        return go = Object.setPrototypeOf || function(r, i2) {
          return r.__proto__ = i2, r;
        }, go(e, t);
      }
      __name(go, "go");
      __name2(go, "go");
      var Sp = (function(e) {
        wp(t, e);
        function t(r) {
          var i2;
          return i2 = e.call(this, r) || this, i2.nodes || (i2.nodes = []), i2;
        }
        __name(t, "t");
        __name2(t, "t");
        var n = t.prototype;
        return n.append = function(i2) {
          return i2.parent = this, this.nodes.push(i2), this;
        }, n.prepend = function(i2) {
          return i2.parent = this, this.nodes.unshift(i2), this;
        }, n.at = function(i2) {
          return this.nodes[i2];
        }, n.index = function(i2) {
          return typeof i2 == "number" ? i2 : this.nodes.indexOf(i2);
        }, n.removeChild = function(i2) {
          i2 = this.index(i2), this.at(i2).parent = void 0, this.nodes.splice(i2, 1);
          var o;
          for (var s in this.indexes) o = this.indexes[s], o >= i2 && (this.indexes[s] = o - 1);
          return this;
        }, n.removeAll = function() {
          for (var i2 = vp(this.nodes), o; !(o = i2()).done; ) {
            var s = o.value;
            s.parent = void 0;
          }
          return this.nodes = [], this;
        }, n.empty = function() {
          return this.removeAll();
        }, n.insertAfter = function(i2, o) {
          o.parent = this;
          var s = this.index(i2);
          this.nodes.splice(s + 1, 0, o), o.parent = this;
          var a;
          for (var u2 in this.indexes) a = this.indexes[u2], s <= a && (this.indexes[u2] = a + 1);
          return this;
        }, n.insertBefore = function(i2, o) {
          o.parent = this;
          var s = this.index(i2);
          this.nodes.splice(s, 0, o), o.parent = this;
          var a;
          for (var u2 in this.indexes) a = this.indexes[u2], a <= s && (this.indexes[u2] = a + 1);
          return this;
        }, n._findChildAtPosition = function(i2, o) {
          var s = void 0;
          return this.each(function(a) {
            if (a.atPosition) {
              var u2 = a.atPosition(i2, o);
              if (u2) return s = u2, false;
            } else if (a.isAtPosition(i2, o)) return s = a, false;
          }), s;
        }, n.atPosition = function(i2, o) {
          if (this.isAtPosition(i2, o)) return this._findChildAtPosition(i2, o) || this;
        }, n._inferEndPosition = function() {
          this.last && this.last.source && this.last.source.end && (this.source = this.source || {}, this.source.end = this.source.end || {}, Object.assign(this.source.end, this.last.source.end));
        }, n.each = function(i2) {
          this.lastEach || (this.lastEach = 0), this.indexes || (this.indexes = {}), this.lastEach++;
          var o = this.lastEach;
          if (this.indexes[o] = 0, !!this.length) {
            for (var s, a; this.indexes[o] < this.length && (s = this.indexes[o], a = i2(this.at(s), s), a !== false); ) this.indexes[o] += 1;
            if (delete this.indexes[o], a === false) return false;
          }
        }, n.walk = function(i2) {
          return this.each(function(o, s) {
            var a = i2(o, s);
            if (a !== false && o.length && (a = o.walk(i2)), a === false) return false;
          });
        }, n.walkAttributes = function(i2) {
          var o = this;
          return this.walk(function(s) {
            if (s.type === Ft.ATTRIBUTE) return i2.call(o, s);
          });
        }, n.walkClasses = function(i2) {
          var o = this;
          return this.walk(function(s) {
            if (s.type === Ft.CLASS) return i2.call(o, s);
          });
        }, n.walkCombinators = function(i2) {
          var o = this;
          return this.walk(function(s) {
            if (s.type === Ft.COMBINATOR) return i2.call(o, s);
          });
        }, n.walkComments = function(i2) {
          var o = this;
          return this.walk(function(s) {
            if (s.type === Ft.COMMENT) return i2.call(o, s);
          });
        }, n.walkIds = function(i2) {
          var o = this;
          return this.walk(function(s) {
            if (s.type === Ft.ID) return i2.call(o, s);
          });
        }, n.walkNesting = function(i2) {
          var o = this;
          return this.walk(function(s) {
            if (s.type === Ft.NESTING) return i2.call(o, s);
          });
        }, n.walkPseudos = function(i2) {
          var o = this;
          return this.walk(function(s) {
            if (s.type === Ft.PSEUDO) return i2.call(o, s);
          });
        }, n.walkTags = function(i2) {
          var o = this;
          return this.walk(function(s) {
            if (s.type === Ft.TAG) return i2.call(o, s);
          });
        }, n.walkUniversals = function(i2) {
          var o = this;
          return this.walk(function(s) {
            if (s.type === Ft.UNIVERSAL) return i2.call(o, s);
          });
        }, n.split = function(i2) {
          var o = this, s = [];
          return this.reduce(function(a, u2, f) {
            var l2 = i2.call(o, u2);
            return s.push(u2), l2 ? (a.push(s), s = []) : f === o.length - 1 && a.push(s), a;
          }, []);
        }, n.map = function(i2) {
          return this.nodes.map(i2);
        }, n.reduce = function(i2, o) {
          return this.nodes.reduce(i2, o);
        }, n.every = function(i2) {
          return this.nodes.every(i2);
        }, n.some = function(i2) {
          return this.nodes.some(i2);
        }, n.filter = function(i2) {
          return this.nodes.filter(i2);
        }, n.sort = function(i2) {
          return this.nodes.sort(i2);
        }, n.toString = function() {
          return this.map(String).join("");
        }, xp(t, [{ key: "first", get: /* @__PURE__ */ __name2(function() {
          return this.at(0);
        }, "get") }, { key: "last", get: /* @__PURE__ */ __name2(function() {
          return this.at(this.length - 1);
        }, "get") }, { key: "length", get: /* @__PURE__ */ __name2(function() {
          return this.nodes.length;
        }, "get") }]), t;
      })(mp.default);
      Gr.default = Sp;
      Wu.exports = Gr.default;
    });
    vo = U((jr, Fu) => {
      "use strict";
      jr.__esModule = true;
      jr.default = void 0;
      var _p = kp(oi()), Tp = Ce();
      function kp(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(kp, "kp");
      __name2(kp, "kp");
      function Du(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || false, r.configurable = true, "value" in r && (r.writable = true), Object.defineProperty(e, r.key, r);
        }
      }
      __name(Du, "Du");
      __name2(Du, "Du");
      function Ep(e, t, n) {
        return t && Du(e.prototype, t), n && Du(e, n), e;
      }
      __name(Ep, "Ep");
      __name2(Ep, "Ep");
      function Op(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, bo(e, t);
      }
      __name(Op, "Op");
      __name2(Op, "Op");
      function bo(e, t) {
        return bo = Object.setPrototypeOf || function(r, i2) {
          return r.__proto__ = i2, r;
        }, bo(e, t);
      }
      __name(bo, "bo");
      __name2(bo, "bo");
      var Pp = (function(e) {
        Op(t, e);
        function t(r) {
          var i2;
          return i2 = e.call(this, r) || this, i2.type = Tp.ROOT, i2;
        }
        __name(t, "t");
        __name2(t, "t");
        var n = t.prototype;
        return n.toString = function() {
          var i2 = this.reduce(function(o, s) {
            return o.push(String(s)), o;
          }, []).join(",");
          return this.trailingComma ? i2 + "," : i2;
        }, n.error = function(i2, o) {
          return this._error ? this._error(i2, o) : new Error(i2);
        }, Ep(t, [{ key: "errorGenerator", set: /* @__PURE__ */ __name2(function(i2) {
          this._error = i2;
        }, "set") }]), t;
      })(_p.default);
      jr.default = Pp;
      Fu.exports = jr.default;
    });
    xo = U((Vr, Bu) => {
      "use strict";
      Vr.__esModule = true;
      Vr.default = void 0;
      var Ap = Rp(oi()), Ip = Ce();
      function Rp(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(Rp, "Rp");
      __name2(Rp, "Rp");
      function Cp(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, yo(e, t);
      }
      __name(Cp, "Cp");
      __name2(Cp, "Cp");
      function yo(e, t) {
        return yo = Object.setPrototypeOf || function(r, i2) {
          return r.__proto__ = i2, r;
        }, yo(e, t);
      }
      __name(yo, "yo");
      __name2(yo, "yo");
      var Lp = (function(e) {
        Cp(t, e);
        function t(n) {
          var r;
          return r = e.call(this, n) || this, r.type = Ip.SELECTOR, r;
        }
        __name(t, "t");
        __name2(t, "t");
        return t;
      })(Ap.default);
      Vr.default = Lp;
      Bu.exports = Vr.default;
    });
    si = U((Nx, $u) => {
      "use strict";
      var Mp = {}, Np = Mp.hasOwnProperty, Wp = /* @__PURE__ */ __name2(function(t, n) {
        if (!t) return n;
        var r = {};
        for (var i2 in n) r[i2] = Np.call(t, i2) ? t[i2] : n[i2];
        return r;
      }, "Wp"), Dp = /[ -,\.\/:-@\[-\^`\{-~]/, Fp = /[ -,\.\/:-@\[\]\^`\{-~]/, Bp = /(^|\\+)?(\\[A-F0-9]{1,6})\x20(?![a-fA-F0-9\x20])/g, wo = /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function e(t, n) {
        n = Wp(n, e.options), n.quotes != "single" && n.quotes != "double" && (n.quotes = "single");
        for (var r = n.quotes == "double" ? '"' : "'", i2 = n.isIdentifier, o = t.charAt(0), s = "", a = 0, u2 = t.length; a < u2; ) {
          var f = t.charAt(a++), l2 = f.charCodeAt(), p = void 0;
          if (l2 < 32 || l2 > 126) {
            if (l2 >= 55296 && l2 <= 56319 && a < u2) {
              var h2 = t.charCodeAt(a++);
              (h2 & 64512) == 56320 ? l2 = ((l2 & 1023) << 10) + (h2 & 1023) + 65536 : a--;
            }
            p = "\\" + l2.toString(16).toUpperCase() + " ";
          } else n.escapeEverything ? Dp.test(f) ? p = "\\" + f : p = "\\" + l2.toString(16).toUpperCase() + " " : /[\t\n\f\r\x0B]/.test(f) ? p = "\\" + l2.toString(16).toUpperCase() + " " : f == "\\" || !i2 && (f == '"' && r == f || f == "'" && r == f) || i2 && Fp.test(f) ? p = "\\" + f : p = f;
          s += p;
        }
        return i2 && (/^-[-\d]/.test(s) ? s = "\\-" + s.slice(1) : /\d/.test(o) && (s = "\\3" + o + " " + s.slice(1))), s = s.replace(Bp, function(g2, b, y) {
          return b && b.length % 2 ? g2 : (b || "") + y;
        }), !i2 && n.wrap ? r + s + r : s;
      }, "e"), "e");
      wo.options = { escapeEverything: false, isIdentifier: false, quotes: "single", wrap: false };
      wo.version = "3.0.0";
      $u.exports = wo;
    });
    _o = U((Hr, zu) => {
      "use strict";
      Hr.__esModule = true;
      Hr.default = void 0;
      var $p = Uu(si()), qp = Ur(), Up = Uu(Dt()), zp = Ce();
      function Uu(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(Uu, "Uu");
      __name2(Uu, "Uu");
      function qu(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || false, r.configurable = true, "value" in r && (r.writable = true), Object.defineProperty(e, r.key, r);
        }
      }
      __name(qu, "qu");
      __name2(qu, "qu");
      function Gp(e, t, n) {
        return t && qu(e.prototype, t), n && qu(e, n), e;
      }
      __name(Gp, "Gp");
      __name2(Gp, "Gp");
      function jp(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, So(e, t);
      }
      __name(jp, "jp");
      __name2(jp, "jp");
      function So(e, t) {
        return So = Object.setPrototypeOf || function(r, i2) {
          return r.__proto__ = i2, r;
        }, So(e, t);
      }
      __name(So, "So");
      __name2(So, "So");
      var Vp = (function(e) {
        jp(t, e);
        function t(r) {
          var i2;
          return i2 = e.call(this, r) || this, i2.type = zp.CLASS, i2._constructed = true, i2;
        }
        __name(t, "t");
        __name2(t, "t");
        var n = t.prototype;
        return n.valueToString = function() {
          return "." + e.prototype.valueToString.call(this);
        }, Gp(t, [{ key: "value", get: /* @__PURE__ */ __name2(function() {
          return this._value;
        }, "get"), set: /* @__PURE__ */ __name2(function(i2) {
          if (this._constructed) {
            var o = (0, $p.default)(i2, { isIdentifier: true });
            o !== i2 ? ((0, qp.ensureObject)(this, "raws"), this.raws.value = o) : this.raws && delete this.raws.value;
          }
          this._value = i2;
        }, "set") }]), t;
      })(Up.default);
      Hr.default = Vp;
      zu.exports = Hr.default;
    });
    ko = U((Yr, Gu) => {
      "use strict";
      Yr.__esModule = true;
      Yr.default = void 0;
      var Hp = Xp(Dt()), Yp = Ce();
      function Xp(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(Xp, "Xp");
      __name2(Xp, "Xp");
      function Qp(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, To(e, t);
      }
      __name(Qp, "Qp");
      __name2(Qp, "Qp");
      function To(e, t) {
        return To = Object.setPrototypeOf || function(r, i2) {
          return r.__proto__ = i2, r;
        }, To(e, t);
      }
      __name(To, "To");
      __name2(To, "To");
      var Kp = (function(e) {
        Qp(t, e);
        function t(n) {
          var r;
          return r = e.call(this, n) || this, r.type = Yp.COMMENT, r;
        }
        __name(t, "t");
        __name2(t, "t");
        return t;
      })(Hp.default);
      Yr.default = Kp;
      Gu.exports = Yr.default;
    });
    Oo = U((Xr, ju) => {
      "use strict";
      Xr.__esModule = true;
      Xr.default = void 0;
      var Jp = eh(Dt()), Zp = Ce();
      function eh(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(eh, "eh");
      __name2(eh, "eh");
      function th(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Eo(e, t);
      }
      __name(th, "th");
      __name2(th, "th");
      function Eo(e, t) {
        return Eo = Object.setPrototypeOf || function(r, i2) {
          return r.__proto__ = i2, r;
        }, Eo(e, t);
      }
      __name(Eo, "Eo");
      __name2(Eo, "Eo");
      var rh = (function(e) {
        th(t, e);
        function t(r) {
          var i2;
          return i2 = e.call(this, r) || this, i2.type = Zp.ID, i2;
        }
        __name(t, "t");
        __name2(t, "t");
        var n = t.prototype;
        return n.valueToString = function() {
          return "#" + e.prototype.valueToString.call(this);
        }, t;
      })(Jp.default);
      Xr.default = rh;
      ju.exports = Xr.default;
    });
    ai = U((Qr, Yu) => {
      "use strict";
      Qr.__esModule = true;
      Qr.default = void 0;
      var nh = Hu(si()), ih = Ur(), oh = Hu(Dt());
      function Hu(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(Hu, "Hu");
      __name2(Hu, "Hu");
      function Vu(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || false, r.configurable = true, "value" in r && (r.writable = true), Object.defineProperty(e, r.key, r);
        }
      }
      __name(Vu, "Vu");
      __name2(Vu, "Vu");
      function sh(e, t, n) {
        return t && Vu(e.prototype, t), n && Vu(e, n), e;
      }
      __name(sh, "sh");
      __name2(sh, "sh");
      function ah(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Po(e, t);
      }
      __name(ah, "ah");
      __name2(ah, "ah");
      function Po(e, t) {
        return Po = Object.setPrototypeOf || function(r, i2) {
          return r.__proto__ = i2, r;
        }, Po(e, t);
      }
      __name(Po, "Po");
      __name2(Po, "Po");
      var uh = (function(e) {
        ah(t, e);
        function t() {
          return e.apply(this, arguments) || this;
        }
        __name(t, "t");
        __name2(t, "t");
        var n = t.prototype;
        return n.qualifiedName = function(i2) {
          return this.namespace ? this.namespaceString + "|" + i2 : i2;
        }, n.valueToString = function() {
          return this.qualifiedName(e.prototype.valueToString.call(this));
        }, sh(t, [{ key: "namespace", get: /* @__PURE__ */ __name2(function() {
          return this._namespace;
        }, "get"), set: /* @__PURE__ */ __name2(function(i2) {
          if (i2 === true || i2 === "*" || i2 === "&") {
            this._namespace = i2, this.raws && delete this.raws.namespace;
            return;
          }
          var o = (0, nh.default)(i2, { isIdentifier: true });
          this._namespace = i2, o !== i2 ? ((0, ih.ensureObject)(this, "raws"), this.raws.namespace = o) : this.raws && delete this.raws.namespace;
        }, "set") }, { key: "ns", get: /* @__PURE__ */ __name2(function() {
          return this._namespace;
        }, "get"), set: /* @__PURE__ */ __name2(function(i2) {
          this.namespace = i2;
        }, "set") }, { key: "namespaceString", get: /* @__PURE__ */ __name2(function() {
          if (this.namespace) {
            var i2 = this.stringifyProperty("namespace");
            return i2 === true ? "" : i2;
          } else return "";
        }, "get") }]), t;
      })(oh.default);
      Qr.default = uh;
      Yu.exports = Qr.default;
    });
    Io = U((Kr, Xu) => {
      "use strict";
      Kr.__esModule = true;
      Kr.default = void 0;
      var lh = ch(ai()), fh = Ce();
      function ch(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(ch, "ch");
      __name2(ch, "ch");
      function dh(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Ao(e, t);
      }
      __name(dh, "dh");
      __name2(dh, "dh");
      function Ao(e, t) {
        return Ao = Object.setPrototypeOf || function(r, i2) {
          return r.__proto__ = i2, r;
        }, Ao(e, t);
      }
      __name(Ao, "Ao");
      __name2(Ao, "Ao");
      var ph = (function(e) {
        dh(t, e);
        function t(n) {
          var r;
          return r = e.call(this, n) || this, r.type = fh.TAG, r;
        }
        __name(t, "t");
        __name2(t, "t");
        return t;
      })(lh.default);
      Kr.default = ph;
      Xu.exports = Kr.default;
    });
    Co = U((Jr, Qu) => {
      "use strict";
      Jr.__esModule = true;
      Jr.default = void 0;
      var hh = gh(Dt()), mh = Ce();
      function gh(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(gh, "gh");
      __name2(gh, "gh");
      function bh(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Ro(e, t);
      }
      __name(bh, "bh");
      __name2(bh, "bh");
      function Ro(e, t) {
        return Ro = Object.setPrototypeOf || function(r, i2) {
          return r.__proto__ = i2, r;
        }, Ro(e, t);
      }
      __name(Ro, "Ro");
      __name2(Ro, "Ro");
      var vh = (function(e) {
        bh(t, e);
        function t(n) {
          var r;
          return r = e.call(this, n) || this, r.type = mh.STRING, r;
        }
        __name(t, "t");
        __name2(t, "t");
        return t;
      })(hh.default);
      Jr.default = vh;
      Qu.exports = Jr.default;
    });
    Mo = U((Zr, Ku) => {
      "use strict";
      Zr.__esModule = true;
      Zr.default = void 0;
      var yh = wh(oi()), xh = Ce();
      function wh(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(wh, "wh");
      __name2(wh, "wh");
      function Sh(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Lo(e, t);
      }
      __name(Sh, "Sh");
      __name2(Sh, "Sh");
      function Lo(e, t) {
        return Lo = Object.setPrototypeOf || function(r, i2) {
          return r.__proto__ = i2, r;
        }, Lo(e, t);
      }
      __name(Lo, "Lo");
      __name2(Lo, "Lo");
      var _h = (function(e) {
        Sh(t, e);
        function t(r) {
          var i2;
          return i2 = e.call(this, r) || this, i2.type = xh.PSEUDO, i2;
        }
        __name(t, "t");
        __name2(t, "t");
        var n = t.prototype;
        return n.toString = function() {
          var i2 = this.length ? "(" + this.map(String).join(",") + ")" : "";
          return [this.rawSpaceBefore, this.stringifyProperty("value"), i2, this.rawSpaceAfter].join("");
        }, t;
      })(yh.default);
      Zr.default = _h;
      Ku.exports = Zr.default;
    });
    Zu = U((Wx, Ju) => {
      Ju.exports = function(t, n) {
        return function(...r) {
          return console.warn(n), t(...r);
        };
      };
    });
    $o = U((rn) => {
      "use strict";
      rn.__esModule = true;
      rn.unescapeValue = Bo;
      rn.default = void 0;
      var en = Fo(si()), Th = Fo(mo()), kh = Fo(ai()), Eh = Ce(), No;
      function Fo(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(Fo, "Fo");
      __name2(Fo, "Fo");
      function el(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || false, r.configurable = true, "value" in r && (r.writable = true), Object.defineProperty(e, r.key, r);
        }
      }
      __name(el, "el");
      __name2(el, "el");
      function Oh(e, t, n) {
        return t && el(e.prototype, t), n && el(e, n), e;
      }
      __name(Oh, "Oh");
      __name2(Oh, "Oh");
      function Ph(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Do(e, t);
      }
      __name(Ph, "Ph");
      __name2(Ph, "Ph");
      function Do(e, t) {
        return Do = Object.setPrototypeOf || function(r, i2) {
          return r.__proto__ = i2, r;
        }, Do(e, t);
      }
      __name(Do, "Do");
      __name2(Do, "Do");
      var tn = Zu(), Ah = /^('|")([^]*)\1$/, Ih = tn(function() {
      }, "Assigning an attribute a value containing characters that might need to be escaped is deprecated. Call attribute.setValue() instead."), Rh = tn(function() {
      }, "Assigning attr.quoted is deprecated and has no effect. Assign to attr.quoteMark instead."), Ch = tn(function() {
      }, "Constructing an Attribute selector with a value without specifying quoteMark is deprecated. Note: The value should be unescaped now.");
      function Bo(e) {
        var t = false, n = null, r = e, i2 = r.match(Ah);
        return i2 && (n = i2[1], r = i2[2]), r = (0, Th.default)(r), r !== e && (t = true), { deprecatedUsage: t, unescaped: r, quoteMark: n };
      }
      __name(Bo, "Bo");
      __name2(Bo, "Bo");
      function Lh(e) {
        if (e.quoteMark !== void 0 || e.value === void 0) return e;
        Ch();
        var t = Bo(e.value), n = t.quoteMark, r = t.unescaped;
        return e.raws || (e.raws = {}), e.raws.value === void 0 && (e.raws.value = e.value), e.value = r, e.quoteMark = n, e;
      }
      __name(Lh, "Lh");
      __name2(Lh, "Lh");
      var ui = (function(e) {
        Ph(t, e);
        function t(r) {
          var i2;
          return r === void 0 && (r = {}), i2 = e.call(this, Lh(r)) || this, i2.type = Eh.ATTRIBUTE, i2.raws = i2.raws || {}, Object.defineProperty(i2.raws, "unquoted", { get: tn(function() {
            return i2.value;
          }, "attr.raws.unquoted is deprecated. Call attr.value instead."), set: tn(function() {
            return i2.value;
          }, "Setting attr.raws.unquoted is deprecated and has no effect. attr.value is unescaped by default now.") }), i2._constructed = true, i2;
        }
        __name(t, "t");
        __name2(t, "t");
        var n = t.prototype;
        return n.getQuotedValue = function(i2) {
          i2 === void 0 && (i2 = {});
          var o = this._determineQuoteMark(i2), s = Wo[o], a = (0, en.default)(this._value, s);
          return a;
        }, n._determineQuoteMark = function(i2) {
          return i2.smart ? this.smartQuoteMark(i2) : this.preferredQuoteMark(i2);
        }, n.setValue = function(i2, o) {
          o === void 0 && (o = {}), this._value = i2, this._quoteMark = this._determineQuoteMark(o), this._syncRawValue();
        }, n.smartQuoteMark = function(i2) {
          var o = this.value, s = o.replace(/[^']/g, "").length, a = o.replace(/[^"]/g, "").length;
          if (s + a === 0) {
            var u2 = (0, en.default)(o, { isIdentifier: true });
            if (u2 === o) return t.NO_QUOTE;
            var f = this.preferredQuoteMark(i2);
            if (f === t.NO_QUOTE) {
              var l2 = this.quoteMark || i2.quoteMark || t.DOUBLE_QUOTE, p = Wo[l2], h2 = (0, en.default)(o, p);
              if (h2.length < u2.length) return l2;
            }
            return f;
          } else return a === s ? this.preferredQuoteMark(i2) : a < s ? t.DOUBLE_QUOTE : t.SINGLE_QUOTE;
        }, n.preferredQuoteMark = function(i2) {
          var o = i2.preferCurrentQuoteMark ? this.quoteMark : i2.quoteMark;
          return o === void 0 && (o = i2.preferCurrentQuoteMark ? i2.quoteMark : this.quoteMark), o === void 0 && (o = t.DOUBLE_QUOTE), o;
        }, n._syncRawValue = function() {
          var i2 = (0, en.default)(this._value, Wo[this.quoteMark]);
          i2 === this._value ? this.raws && delete this.raws.value : this.raws.value = i2;
        }, n._handleEscapes = function(i2, o) {
          if (this._constructed) {
            var s = (0, en.default)(o, { isIdentifier: true });
            s !== o ? this.raws[i2] = s : delete this.raws[i2];
          }
        }, n._spacesFor = function(i2) {
          var o = { before: "", after: "" }, s = this.spaces[i2] || {}, a = this.raws.spaces && this.raws.spaces[i2] || {};
          return Object.assign(o, s, a);
        }, n._stringFor = function(i2, o, s) {
          o === void 0 && (o = i2), s === void 0 && (s = tl);
          var a = this._spacesFor(o);
          return s(this.stringifyProperty(i2), a);
        }, n.offsetOf = function(i2) {
          var o = 1, s = this._spacesFor("attribute");
          if (o += s.before.length, i2 === "namespace" || i2 === "ns") return this.namespace ? o : -1;
          if (i2 === "attributeNS" || (o += this.namespaceString.length, this.namespace && (o += 1), i2 === "attribute")) return o;
          o += this.stringifyProperty("attribute").length, o += s.after.length;
          var a = this._spacesFor("operator");
          o += a.before.length;
          var u2 = this.stringifyProperty("operator");
          if (i2 === "operator") return u2 ? o : -1;
          o += u2.length, o += a.after.length;
          var f = this._spacesFor("value");
          o += f.before.length;
          var l2 = this.stringifyProperty("value");
          if (i2 === "value") return l2 ? o : -1;
          o += l2.length, o += f.after.length;
          var p = this._spacesFor("insensitive");
          return o += p.before.length, i2 === "insensitive" && this.insensitive ? o : -1;
        }, n.toString = function() {
          var i2 = this, o = [this.rawSpaceBefore, "["];
          return o.push(this._stringFor("qualifiedAttribute", "attribute")), this.operator && (this.value || this.value === "") && (o.push(this._stringFor("operator")), o.push(this._stringFor("value")), o.push(this._stringFor("insensitiveFlag", "insensitive", function(s, a) {
            return s.length > 0 && !i2.quoted && a.before.length === 0 && !(i2.spaces.value && i2.spaces.value.after) && (a.before = " "), tl(s, a);
          }))), o.push("]"), o.push(this.rawSpaceAfter), o.join("");
        }, Oh(t, [{ key: "quoted", get: /* @__PURE__ */ __name2(function() {
          var i2 = this.quoteMark;
          return i2 === "'" || i2 === '"';
        }, "get"), set: /* @__PURE__ */ __name2(function(i2) {
          Rh();
        }, "set") }, { key: "quoteMark", get: /* @__PURE__ */ __name2(function() {
          return this._quoteMark;
        }, "get"), set: /* @__PURE__ */ __name2(function(i2) {
          if (!this._constructed) {
            this._quoteMark = i2;
            return;
          }
          this._quoteMark !== i2 && (this._quoteMark = i2, this._syncRawValue());
        }, "set") }, { key: "qualifiedAttribute", get: /* @__PURE__ */ __name2(function() {
          return this.qualifiedName(this.raws.attribute || this.attribute);
        }, "get") }, { key: "insensitiveFlag", get: /* @__PURE__ */ __name2(function() {
          return this.insensitive ? "i" : "";
        }, "get") }, { key: "value", get: /* @__PURE__ */ __name2(function() {
          return this._value;
        }, "get"), set: /* @__PURE__ */ __name2(function(i2) {
          if (this._constructed) {
            var o = Bo(i2), s = o.deprecatedUsage, a = o.unescaped, u2 = o.quoteMark;
            if (s && Ih(), a === this._value && u2 === this._quoteMark) return;
            this._value = a, this._quoteMark = u2, this._syncRawValue();
          } else this._value = i2;
        }, "set") }, { key: "attribute", get: /* @__PURE__ */ __name2(function() {
          return this._attribute;
        }, "get"), set: /* @__PURE__ */ __name2(function(i2) {
          this._handleEscapes("attribute", i2), this._attribute = i2;
        }, "set") }]), t;
      })(kh.default);
      rn.default = ui;
      ui.NO_QUOTE = null;
      ui.SINGLE_QUOTE = "'";
      ui.DOUBLE_QUOTE = '"';
      var Wo = (No = { "'": { quotes: "single", wrap: true }, '"': { quotes: "double", wrap: true } }, No[null] = { isIdentifier: true }, No);
      function tl(e, t) {
        return "" + t.before + e + t.after;
      }
      __name(tl, "tl");
      __name2(tl, "tl");
    });
    Uo = U((nn, rl) => {
      "use strict";
      nn.__esModule = true;
      nn.default = void 0;
      var Mh = Wh(ai()), Nh = Ce();
      function Wh(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(Wh, "Wh");
      __name2(Wh, "Wh");
      function Dh(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, qo(e, t);
      }
      __name(Dh, "Dh");
      __name2(Dh, "Dh");
      function qo(e, t) {
        return qo = Object.setPrototypeOf || function(r, i2) {
          return r.__proto__ = i2, r;
        }, qo(e, t);
      }
      __name(qo, "qo");
      __name2(qo, "qo");
      var Fh = (function(e) {
        Dh(t, e);
        function t(n) {
          var r;
          return r = e.call(this, n) || this, r.type = Nh.UNIVERSAL, r.value = "*", r;
        }
        __name(t, "t");
        __name2(t, "t");
        return t;
      })(Mh.default);
      nn.default = Fh;
      rl.exports = nn.default;
    });
    Go = U((on22, nl) => {
      "use strict";
      on22.__esModule = true;
      on22.default = void 0;
      var Bh = qh(Dt()), $h = Ce();
      function qh(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(qh, "qh");
      __name2(qh, "qh");
      function Uh(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, zo(e, t);
      }
      __name(Uh, "Uh");
      __name2(Uh, "Uh");
      function zo(e, t) {
        return zo = Object.setPrototypeOf || function(r, i2) {
          return r.__proto__ = i2, r;
        }, zo(e, t);
      }
      __name(zo, "zo");
      __name2(zo, "zo");
      var zh = (function(e) {
        Uh(t, e);
        function t(n) {
          var r;
          return r = e.call(this, n) || this, r.type = $h.COMBINATOR, r;
        }
        __name(t, "t");
        __name2(t, "t");
        return t;
      })(Bh.default);
      on22.default = zh;
      nl.exports = on22.default;
    });
    Vo = U((sn, il) => {
      "use strict";
      sn.__esModule = true;
      sn.default = void 0;
      var Gh = Vh(Dt()), jh = Ce();
      function Vh(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(Vh, "Vh");
      __name2(Vh, "Vh");
      function Hh(e, t) {
        e.prototype = Object.create(t.prototype), e.prototype.constructor = e, jo(e, t);
      }
      __name(Hh, "Hh");
      __name2(Hh, "Hh");
      function jo(e, t) {
        return jo = Object.setPrototypeOf || function(r, i2) {
          return r.__proto__ = i2, r;
        }, jo(e, t);
      }
      __name(jo, "jo");
      __name2(jo, "jo");
      var Yh = (function(e) {
        Hh(t, e);
        function t(n) {
          var r;
          return r = e.call(this, n) || this, r.type = jh.NESTING, r.value = "&", r;
        }
        __name(t, "t");
        __name2(t, "t");
        return t;
      })(Gh.default);
      sn.default = Yh;
      il.exports = sn.default;
    });
    sl = U((li, ol) => {
      "use strict";
      li.__esModule = true;
      li.default = Xh;
      function Xh(e) {
        return e.sort(function(t, n) {
          return t - n;
        });
      }
      __name(Xh, "Xh");
      __name2(Xh, "Xh");
      ol.exports = li.default;
    });
    Ho = U(($) => {
      "use strict";
      $.__esModule = true;
      $.combinator = $.word = $.comment = $.str = $.tab = $.newline = $.feed = $.cr = $.backslash = $.bang = $.slash = $.doubleQuote = $.singleQuote = $.space = $.greaterThan = $.pipe = $.equals = $.plus = $.caret = $.tilde = $.dollar = $.closeSquare = $.openSquare = $.closeParenthesis = $.openParenthesis = $.semicolon = $.colon = $.comma = $.at = $.asterisk = $.ampersand = void 0;
      var Qh = 38;
      $.ampersand = Qh;
      var Kh = 42;
      $.asterisk = Kh;
      var Jh = 64;
      $.at = Jh;
      var Zh = 44;
      $.comma = Zh;
      var em = 58;
      $.colon = em;
      var tm = 59;
      $.semicolon = tm;
      var rm = 40;
      $.openParenthesis = rm;
      var nm = 41;
      $.closeParenthesis = nm;
      var im = 91;
      $.openSquare = im;
      var om = 93;
      $.closeSquare = om;
      var sm = 36;
      $.dollar = sm;
      var am = 126;
      $.tilde = am;
      var um = 94;
      $.caret = um;
      var lm = 43;
      $.plus = lm;
      var fm = 61;
      $.equals = fm;
      var cm = 124;
      $.pipe = cm;
      var dm = 62;
      $.greaterThan = dm;
      var pm = 32;
      $.space = pm;
      var al = 39;
      $.singleQuote = al;
      var hm = 34;
      $.doubleQuote = hm;
      var mm = 47;
      $.slash = mm;
      var gm = 33;
      $.bang = gm;
      var bm = 92;
      $.backslash = bm;
      var vm = 13;
      $.cr = vm;
      var ym = 12;
      $.feed = ym;
      var xm = 10;
      $.newline = xm;
      var wm = 9;
      $.tab = wm;
      var Sm = al;
      $.str = Sm;
      var _m = -1;
      $.comment = _m;
      var Tm = -2;
      $.word = Tm;
      var km = -3;
      $.combinator = km;
    });
    fl2 = U((an) => {
      "use strict";
      an.__esModule = true;
      an.default = Cm;
      an.FIELDS = void 0;
      var W = Em(Ho()), yr, fe;
      function ll() {
        if (typeof WeakMap != "function") return null;
        var e = /* @__PURE__ */ new WeakMap();
        return ll = /* @__PURE__ */ __name2(function() {
          return e;
        }, "ll"), e;
      }
      __name(ll, "ll");
      __name2(ll, "ll");
      function Em(e) {
        if (e && e.__esModule) return e;
        if (e === null || typeof e != "object" && typeof e != "function") return { default: e };
        var t = ll();
        if (t && t.has(e)) return t.get(e);
        var n = {}, r = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var i2 in e) if (Object.prototype.hasOwnProperty.call(e, i2)) {
          var o = r ? Object.getOwnPropertyDescriptor(e, i2) : null;
          o && (o.get || o.set) ? Object.defineProperty(n, i2, o) : n[i2] = e[i2];
        }
        return n.default = e, t && t.set(e, n), n;
      }
      __name(Em, "Em");
      __name2(Em, "Em");
      var Om = (yr = {}, yr[W.tab] = true, yr[W.newline] = true, yr[W.cr] = true, yr[W.feed] = true, yr), Pm = (fe = {}, fe[W.space] = true, fe[W.tab] = true, fe[W.newline] = true, fe[W.cr] = true, fe[W.feed] = true, fe[W.ampersand] = true, fe[W.asterisk] = true, fe[W.bang] = true, fe[W.comma] = true, fe[W.colon] = true, fe[W.semicolon] = true, fe[W.openParenthesis] = true, fe[W.closeParenthesis] = true, fe[W.openSquare] = true, fe[W.closeSquare] = true, fe[W.singleQuote] = true, fe[W.doubleQuote] = true, fe[W.plus] = true, fe[W.pipe] = true, fe[W.tilde] = true, fe[W.greaterThan] = true, fe[W.equals] = true, fe[W.dollar] = true, fe[W.caret] = true, fe[W.slash] = true, fe), Yo = {}, ul = "0123456789abcdefABCDEF";
      for (fi = 0; fi < ul.length; fi++) Yo[ul.charCodeAt(fi)] = true;
      var fi;
      function Am(e, t) {
        var n = t, r;
        do {
          if (r = e.charCodeAt(n), Pm[r]) return n - 1;
          r === W.backslash ? n = Im(e, n) + 1 : n++;
        } while (n < e.length);
        return n - 1;
      }
      __name(Am, "Am");
      __name2(Am, "Am");
      function Im(e, t) {
        var n = t, r = e.charCodeAt(n + 1);
        if (!Om[r]) if (Yo[r]) {
          var i2 = 0;
          do
            n++, i2++, r = e.charCodeAt(n + 1);
          while (Yo[r] && i2 < 6);
          i2 < 6 && r === W.space && n++;
        } else n++;
        return n;
      }
      __name(Im, "Im");
      __name2(Im, "Im");
      var Rm = { TYPE: 0, START_LINE: 1, START_COL: 2, END_LINE: 3, END_COL: 4, START_POS: 5, END_POS: 6 };
      an.FIELDS = Rm;
      function Cm(e) {
        var t = [], n = e.css.valueOf(), r = n, i2 = r.length, o = -1, s = 1, a = 0, u2 = 0, f, l2, p, h2, g2, b, y, k, S2, I, w2, T, O;
        function C(D, q) {
          if (e.safe) n += q, S2 = n.length - 1;
          else throw e.error("Unclosed " + D, s, a - o, a);
        }
        __name(C, "C");
        __name2(C, "C");
        for (; a < i2; ) {
          switch (f = n.charCodeAt(a), f === W.newline && (o = a, s += 1), f) {
            case W.space:
            case W.tab:
            case W.newline:
            case W.cr:
            case W.feed:
              S2 = a;
              do
                S2 += 1, f = n.charCodeAt(S2), f === W.newline && (o = S2, s += 1);
              while (f === W.space || f === W.newline || f === W.tab || f === W.cr || f === W.feed);
              O = W.space, h2 = s, p = S2 - o - 1, u2 = S2;
              break;
            case W.plus:
            case W.greaterThan:
            case W.tilde:
            case W.pipe:
              S2 = a;
              do
                S2 += 1, f = n.charCodeAt(S2);
              while (f === W.plus || f === W.greaterThan || f === W.tilde || f === W.pipe);
              O = W.combinator, h2 = s, p = a - o, u2 = S2;
              break;
            case W.asterisk:
            case W.ampersand:
            case W.bang:
            case W.comma:
            case W.equals:
            case W.dollar:
            case W.caret:
            case W.openSquare:
            case W.closeSquare:
            case W.colon:
            case W.semicolon:
            case W.openParenthesis:
            case W.closeParenthesis:
              S2 = a, O = f, h2 = s, p = a - o, u2 = S2 + 1;
              break;
            case W.singleQuote:
            case W.doubleQuote:
              T = f === W.singleQuote ? "'" : '"', S2 = a;
              do
                for (g2 = false, S2 = n.indexOf(T, S2 + 1), S2 === -1 && C("quote", T), b = S2; n.charCodeAt(b - 1) === W.backslash; ) b -= 1, g2 = !g2;
              while (g2);
              O = W.str, h2 = s, p = a - o, u2 = S2 + 1;
              break;
            default:
              f === W.slash && n.charCodeAt(a + 1) === W.asterisk ? (S2 = n.indexOf("*/", a + 2) + 1, S2 === 0 && C("comment", "*/"), l2 = n.slice(a, S2 + 1), k = l2.split(`
`), y = k.length - 1, y > 0 ? (I = s + y, w2 = S2 - k[y].length) : (I = s, w2 = o), O = W.comment, s = I, h2 = I, p = S2 - w2) : f === W.slash ? (S2 = a, O = f, h2 = s, p = a - o, u2 = S2 + 1) : (S2 = Am(n, a), O = W.word, h2 = s, p = S2 - o), u2 = S2 + 1;
              break;
          }
          t.push([O, s, a - o, h2, p, a, u2]), w2 && (o = w2, w2 = null), a = u2;
        }
        return t;
      }
      __name(Cm, "Cm");
      __name2(Cm, "Cm");
    });
    vl = U((un, bl) => {
      "use strict";
      un.__esModule = true;
      un.default = void 0;
      var Lm = nt(vo()), Xo = nt(xo()), Mm = nt(_o()), cl = nt(ko()), Nm = nt(Oo()), Wm = nt(Io()), Qo = nt(Co()), Dm = nt(Mo()), dl = ci($o()), Fm = nt(Uo()), Ko = nt(Go()), Bm = nt(Vo()), $m = nt(sl()), R2 = ci(fl2()), B = ci(Ho()), qm = ci(Ce()), ye = Ur(), rr, Jo;
      function gl() {
        if (typeof WeakMap != "function") return null;
        var e = /* @__PURE__ */ new WeakMap();
        return gl = /* @__PURE__ */ __name2(function() {
          return e;
        }, "gl"), e;
      }
      __name(gl, "gl");
      __name2(gl, "gl");
      function ci(e) {
        if (e && e.__esModule) return e;
        if (e === null || typeof e != "object" && typeof e != "function") return { default: e };
        var t = gl();
        if (t && t.has(e)) return t.get(e);
        var n = {}, r = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var i2 in e) if (Object.prototype.hasOwnProperty.call(e, i2)) {
          var o = r ? Object.getOwnPropertyDescriptor(e, i2) : null;
          o && (o.get || o.set) ? Object.defineProperty(n, i2, o) : n[i2] = e[i2];
        }
        return n.default = e, t && t.set(e, n), n;
      }
      __name(ci, "ci");
      __name2(ci, "ci");
      function nt(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(nt, "nt");
      __name2(nt, "nt");
      function pl(e, t) {
        for (var n = 0; n < t.length; n++) {
          var r = t[n];
          r.enumerable = r.enumerable || false, r.configurable = true, "value" in r && (r.writable = true), Object.defineProperty(e, r.key, r);
        }
      }
      __name(pl, "pl");
      __name2(pl, "pl");
      function Um(e, t, n) {
        return t && pl(e.prototype, t), n && pl(e, n), e;
      }
      __name(Um, "Um");
      __name2(Um, "Um");
      var ts = (rr = {}, rr[B.space] = true, rr[B.cr] = true, rr[B.feed] = true, rr[B.newline] = true, rr[B.tab] = true, rr), zm = Object.assign({}, ts, (Jo = {}, Jo[B.comment] = true, Jo));
      function hl(e) {
        return { line: e[R2.FIELDS.START_LINE], column: e[R2.FIELDS.START_COL] };
      }
      __name(hl, "hl");
      __name2(hl, "hl");
      function ml(e) {
        return { line: e[R2.FIELDS.END_LINE], column: e[R2.FIELDS.END_COL] };
      }
      __name(ml, "ml");
      __name2(ml, "ml");
      function nr(e, t, n, r) {
        return { start: { line: e, column: t }, end: { line: n, column: r } };
      }
      __name(nr, "nr");
      __name2(nr, "nr");
      function xr(e) {
        return nr(e[R2.FIELDS.START_LINE], e[R2.FIELDS.START_COL], e[R2.FIELDS.END_LINE], e[R2.FIELDS.END_COL]);
      }
      __name(xr, "xr");
      __name2(xr, "xr");
      function Zo(e, t) {
        if (e) return nr(e[R2.FIELDS.START_LINE], e[R2.FIELDS.START_COL], t[R2.FIELDS.END_LINE], t[R2.FIELDS.END_COL]);
      }
      __name(Zo, "Zo");
      __name2(Zo, "Zo");
      function wr(e, t) {
        var n = e[t];
        if (typeof n == "string") return n.indexOf("\\") !== -1 && ((0, ye.ensureObject)(e, "raws"), e[t] = (0, ye.unesc)(n), e.raws[t] === void 0 && (e.raws[t] = n)), e;
      }
      __name(wr, "wr");
      __name2(wr, "wr");
      function es(e, t) {
        for (var n = -1, r = []; (n = e.indexOf(t, n + 1)) !== -1; ) r.push(n);
        return r;
      }
      __name(es, "es");
      __name2(es, "es");
      function Gm() {
        var e = Array.prototype.concat.apply([], arguments);
        return e.filter(function(t, n) {
          return n === e.indexOf(t);
        });
      }
      __name(Gm, "Gm");
      __name2(Gm, "Gm");
      var jm = (function() {
        function e(n, r) {
          r === void 0 && (r = {}), this.rule = n, this.options = Object.assign({ lossy: false, safe: false }, r), this.position = 0, this.css = typeof this.rule == "string" ? this.rule : this.rule.selector, this.tokens = (0, R2.default)({ css: this.css, error: this._errorGenerator(), safe: this.options.safe });
          var i2 = Zo(this.tokens[0], this.tokens[this.tokens.length - 1]);
          this.root = new Lm.default({ source: i2 }), this.root.errorGenerator = this._errorGenerator();
          var o = new Xo.default({ source: { start: { line: 1, column: 1 } } });
          this.root.append(o), this.current = o, this.loop();
        }
        __name(e, "e");
        __name2(e, "e");
        var t = e.prototype;
        return t._errorGenerator = function() {
          var r = this;
          return function(i2, o) {
            return typeof r.rule == "string" ? new Error(i2) : r.rule.error(i2, o);
          };
        }, t.attribute = function() {
          var r = [], i2 = this.currToken;
          for (this.position++; this.position < this.tokens.length && this.currToken[R2.FIELDS.TYPE] !== B.closeSquare; ) r.push(this.currToken), this.position++;
          if (this.currToken[R2.FIELDS.TYPE] !== B.closeSquare) return this.expected("closing square bracket", this.currToken[R2.FIELDS.START_POS]);
          var o = r.length, s = { source: nr(i2[1], i2[2], this.currToken[3], this.currToken[4]), sourceIndex: i2[R2.FIELDS.START_POS] };
          if (o === 1 && !~[B.word].indexOf(r[0][R2.FIELDS.TYPE])) return this.expected("attribute", r[0][R2.FIELDS.START_POS]);
          for (var a = 0, u2 = "", f = "", l2 = null, p = false; a < o; ) {
            var h2 = r[a], g2 = this.content(h2), b = r[a + 1];
            switch (h2[R2.FIELDS.TYPE]) {
              case B.space:
                if (p = true, this.options.lossy) break;
                if (l2) {
                  (0, ye.ensureObject)(s, "spaces", l2);
                  var y = s.spaces[l2].after || "";
                  s.spaces[l2].after = y + g2;
                  var k = (0, ye.getProp)(s, "raws", "spaces", l2, "after") || null;
                  k && (s.raws.spaces[l2].after = k + g2);
                } else u2 = u2 + g2, f = f + g2;
                break;
              case B.asterisk:
                if (b[R2.FIELDS.TYPE] === B.equals) s.operator = g2, l2 = "operator";
                else if ((!s.namespace || l2 === "namespace" && !p) && b) {
                  u2 && ((0, ye.ensureObject)(s, "spaces", "attribute"), s.spaces.attribute.before = u2, u2 = ""), f && ((0, ye.ensureObject)(s, "raws", "spaces", "attribute"), s.raws.spaces.attribute.before = u2, f = ""), s.namespace = (s.namespace || "") + g2;
                  var S2 = (0, ye.getProp)(s, "raws", "namespace") || null;
                  S2 && (s.raws.namespace += g2), l2 = "namespace";
                }
                p = false;
                break;
              case B.dollar:
                if (l2 === "value") {
                  var I = (0, ye.getProp)(s, "raws", "value");
                  s.value += "$", I && (s.raws.value = I + "$");
                  break;
                }
              case B.caret:
                b[R2.FIELDS.TYPE] === B.equals && (s.operator = g2, l2 = "operator"), p = false;
                break;
              case B.combinator:
                if (g2 === "~" && b[R2.FIELDS.TYPE] === B.equals && (s.operator = g2, l2 = "operator"), g2 !== "|") {
                  p = false;
                  break;
                }
                b[R2.FIELDS.TYPE] === B.equals ? (s.operator = g2, l2 = "operator") : !s.namespace && !s.attribute && (s.namespace = true), p = false;
                break;
              case B.word:
                if (b && this.content(b) === "|" && r[a + 2] && r[a + 2][R2.FIELDS.TYPE] !== B.equals && !s.operator && !s.namespace) s.namespace = g2, l2 = "namespace";
                else if (!s.attribute || l2 === "attribute" && !p) {
                  u2 && ((0, ye.ensureObject)(s, "spaces", "attribute"), s.spaces.attribute.before = u2, u2 = ""), f && ((0, ye.ensureObject)(s, "raws", "spaces", "attribute"), s.raws.spaces.attribute.before = f, f = ""), s.attribute = (s.attribute || "") + g2;
                  var w2 = (0, ye.getProp)(s, "raws", "attribute") || null;
                  w2 && (s.raws.attribute += g2), l2 = "attribute";
                } else if (!s.value && s.value !== "" || l2 === "value" && !p) {
                  var T = (0, ye.unesc)(g2), O = (0, ye.getProp)(s, "raws", "value") || "", C = s.value || "";
                  s.value = C + T, s.quoteMark = null, (T !== g2 || O) && ((0, ye.ensureObject)(s, "raws"), s.raws.value = (O || C) + g2), l2 = "value";
                } else {
                  var D = g2 === "i" || g2 === "I";
                  (s.value || s.value === "") && (s.quoteMark || p) ? (s.insensitive = D, (!D || g2 === "I") && ((0, ye.ensureObject)(s, "raws"), s.raws.insensitiveFlag = g2), l2 = "insensitive", u2 && ((0, ye.ensureObject)(s, "spaces", "insensitive"), s.spaces.insensitive.before = u2, u2 = ""), f && ((0, ye.ensureObject)(s, "raws", "spaces", "insensitive"), s.raws.spaces.insensitive.before = f, f = "")) : (s.value || s.value === "") && (l2 = "value", s.value += g2, s.raws.value && (s.raws.value += g2));
                }
                p = false;
                break;
              case B.str:
                if (!s.attribute || !s.operator) return this.error("Expected an attribute followed by an operator preceding the string.", { index: h2[R2.FIELDS.START_POS] });
                var q = (0, dl.unescapeValue)(g2), Y = q.unescaped, ue = q.quoteMark;
                s.value = Y, s.quoteMark = ue, l2 = "value", (0, ye.ensureObject)(s, "raws"), s.raws.value = g2, p = false;
                break;
              case B.equals:
                if (!s.attribute) return this.expected("attribute", h2[R2.FIELDS.START_POS], g2);
                if (s.value) return this.error('Unexpected "=" found; an operator was already defined.', { index: h2[R2.FIELDS.START_POS] });
                s.operator = s.operator ? s.operator + g2 : g2, l2 = "operator", p = false;
                break;
              case B.comment:
                if (l2) if (p || b && b[R2.FIELDS.TYPE] === B.space || l2 === "insensitive") {
                  var _e = (0, ye.getProp)(s, "spaces", l2, "after") || "", ce = (0, ye.getProp)(s, "raws", "spaces", l2, "after") || _e;
                  (0, ye.ensureObject)(s, "raws", "spaces", l2), s.raws.spaces[l2].after = ce + g2;
                } else {
                  var oe = s[l2] || "", ve = (0, ye.getProp)(s, "raws", l2) || oe;
                  (0, ye.ensureObject)(s, "raws"), s.raws[l2] = ve + g2;
                }
                else f = f + g2;
                break;
              default:
                return this.error('Unexpected "' + g2 + '" found.', { index: h2[R2.FIELDS.START_POS] });
            }
            a++;
          }
          wr(s, "attribute"), wr(s, "namespace"), this.newNode(new dl.default(s)), this.position++;
        }, t.parseWhitespaceEquivalentTokens = function(r) {
          r < 0 && (r = this.tokens.length);
          var i2 = this.position, o = [], s = "", a = void 0;
          do
            if (ts[this.currToken[R2.FIELDS.TYPE]]) this.options.lossy || (s += this.content());
            else if (this.currToken[R2.FIELDS.TYPE] === B.comment) {
              var u2 = {};
              s && (u2.before = s, s = ""), a = new cl.default({ value: this.content(), source: xr(this.currToken), sourceIndex: this.currToken[R2.FIELDS.START_POS], spaces: u2 }), o.push(a);
            }
          while (++this.position < r);
          if (s) {
            if (a) a.spaces.after = s;
            else if (!this.options.lossy) {
              var f = this.tokens[i2], l2 = this.tokens[this.position - 1];
              o.push(new Qo.default({ value: "", source: nr(f[R2.FIELDS.START_LINE], f[R2.FIELDS.START_COL], l2[R2.FIELDS.END_LINE], l2[R2.FIELDS.END_COL]), sourceIndex: f[R2.FIELDS.START_POS], spaces: { before: s, after: "" } }));
            }
          }
          return o;
        }, t.convertWhitespaceNodesToSpace = function(r, i2) {
          var o = this;
          i2 === void 0 && (i2 = false);
          var s = "", a = "";
          r.forEach(function(f) {
            var l2 = o.lossySpace(f.spaces.before, i2), p = o.lossySpace(f.rawSpaceBefore, i2);
            s += l2 + o.lossySpace(f.spaces.after, i2 && l2.length === 0), a += l2 + f.value + o.lossySpace(f.rawSpaceAfter, i2 && p.length === 0);
          }), a === s && (a = void 0);
          var u2 = { space: s, rawSpace: a };
          return u2;
        }, t.isNamedCombinator = function(r) {
          return r === void 0 && (r = this.position), this.tokens[r + 0] && this.tokens[r + 0][R2.FIELDS.TYPE] === B.slash && this.tokens[r + 1] && this.tokens[r + 1][R2.FIELDS.TYPE] === B.word && this.tokens[r + 2] && this.tokens[r + 2][R2.FIELDS.TYPE] === B.slash;
        }, t.namedCombinator = function() {
          if (this.isNamedCombinator()) {
            var r = this.content(this.tokens[this.position + 1]), i2 = (0, ye.unesc)(r).toLowerCase(), o = {};
            i2 !== r && (o.value = "/" + r + "/");
            var s = new Ko.default({ value: "/" + i2 + "/", source: nr(this.currToken[R2.FIELDS.START_LINE], this.currToken[R2.FIELDS.START_COL], this.tokens[this.position + 2][R2.FIELDS.END_LINE], this.tokens[this.position + 2][R2.FIELDS.END_COL]), sourceIndex: this.currToken[R2.FIELDS.START_POS], raws: o });
            return this.position = this.position + 3, s;
          } else this.unexpected();
        }, t.combinator = function() {
          var r = this;
          if (this.content() === "|") return this.namespace();
          var i2 = this.locateNextMeaningfulToken(this.position);
          if (i2 < 0 || this.tokens[i2][R2.FIELDS.TYPE] === B.comma) {
            var o = this.parseWhitespaceEquivalentTokens(i2);
            if (o.length > 0) {
              var s = this.current.last;
              if (s) {
                var a = this.convertWhitespaceNodesToSpace(o), u2 = a.space, f = a.rawSpace;
                f !== void 0 && (s.rawSpaceAfter += f), s.spaces.after += u2;
              } else o.forEach(function(O) {
                return r.newNode(O);
              });
            }
            return;
          }
          var l2 = this.currToken, p = void 0;
          i2 > this.position && (p = this.parseWhitespaceEquivalentTokens(i2));
          var h2;
          if (this.isNamedCombinator() ? h2 = this.namedCombinator() : this.currToken[R2.FIELDS.TYPE] === B.combinator ? (h2 = new Ko.default({ value: this.content(), source: xr(this.currToken), sourceIndex: this.currToken[R2.FIELDS.START_POS] }), this.position++) : ts[this.currToken[R2.FIELDS.TYPE]] || p || this.unexpected(), h2) {
            if (p) {
              var g2 = this.convertWhitespaceNodesToSpace(p), b = g2.space, y = g2.rawSpace;
              h2.spaces.before = b, h2.rawSpaceBefore = y;
            }
          } else {
            var k = this.convertWhitespaceNodesToSpace(p, true), S2 = k.space, I = k.rawSpace;
            I || (I = S2);
            var w2 = {}, T = { spaces: {} };
            S2.endsWith(" ") && I.endsWith(" ") ? (w2.before = S2.slice(0, S2.length - 1), T.spaces.before = I.slice(0, I.length - 1)) : S2.startsWith(" ") && I.startsWith(" ") ? (w2.after = S2.slice(1), T.spaces.after = I.slice(1)) : T.value = I, h2 = new Ko.default({ value: " ", source: Zo(l2, this.tokens[this.position - 1]), sourceIndex: l2[R2.FIELDS.START_POS], spaces: w2, raws: T });
          }
          return this.currToken && this.currToken[R2.FIELDS.TYPE] === B.space && (h2.spaces.after = this.optionalSpace(this.content()), this.position++), this.newNode(h2);
        }, t.comma = function() {
          if (this.position === this.tokens.length - 1) {
            this.root.trailingComma = true, this.position++;
            return;
          }
          this.current._inferEndPosition();
          var r = new Xo.default({ source: { start: hl(this.tokens[this.position + 1]) } });
          this.current.parent.append(r), this.current = r, this.position++;
        }, t.comment = function() {
          var r = this.currToken;
          this.newNode(new cl.default({ value: this.content(), source: xr(r), sourceIndex: r[R2.FIELDS.START_POS] })), this.position++;
        }, t.error = function(r, i2) {
          throw this.root.error(r, i2);
        }, t.missingBackslash = function() {
          return this.error("Expected a backslash preceding the semicolon.", { index: this.currToken[R2.FIELDS.START_POS] });
        }, t.missingParenthesis = function() {
          return this.expected("opening parenthesis", this.currToken[R2.FIELDS.START_POS]);
        }, t.missingSquareBracket = function() {
          return this.expected("opening square bracket", this.currToken[R2.FIELDS.START_POS]);
        }, t.unexpected = function() {
          return this.error("Unexpected '" + this.content() + "'. Escaping special characters with \\ may help.", this.currToken[R2.FIELDS.START_POS]);
        }, t.namespace = function() {
          var r = this.prevToken && this.content(this.prevToken) || true;
          if (this.nextToken[R2.FIELDS.TYPE] === B.word) return this.position++, this.word(r);
          if (this.nextToken[R2.FIELDS.TYPE] === B.asterisk) return this.position++, this.universal(r);
        }, t.nesting = function() {
          if (this.nextToken) {
            var r = this.content(this.nextToken);
            if (r === "|") {
              this.position++;
              return;
            }
          }
          var i2 = this.currToken;
          this.newNode(new Bm.default({ value: this.content(), source: xr(i2), sourceIndex: i2[R2.FIELDS.START_POS] })), this.position++;
        }, t.parentheses = function() {
          var r = this.current.last, i2 = 1;
          if (this.position++, r && r.type === qm.PSEUDO) {
            var o = new Xo.default({ source: { start: hl(this.tokens[this.position - 1]) } }), s = this.current;
            for (r.append(o), this.current = o; this.position < this.tokens.length && i2; ) this.currToken[R2.FIELDS.TYPE] === B.openParenthesis && i2++, this.currToken[R2.FIELDS.TYPE] === B.closeParenthesis && i2--, i2 ? this.parse() : (this.current.source.end = ml(this.currToken), this.current.parent.source.end = ml(this.currToken), this.position++);
            this.current = s;
          } else {
            for (var a = this.currToken, u2 = "(", f; this.position < this.tokens.length && i2; ) this.currToken[R2.FIELDS.TYPE] === B.openParenthesis && i2++, this.currToken[R2.FIELDS.TYPE] === B.closeParenthesis && i2--, f = this.currToken, u2 += this.parseParenthesisToken(this.currToken), this.position++;
            r ? r.appendToPropertyAndEscape("value", u2, u2) : this.newNode(new Qo.default({ value: u2, source: nr(a[R2.FIELDS.START_LINE], a[R2.FIELDS.START_COL], f[R2.FIELDS.END_LINE], f[R2.FIELDS.END_COL]), sourceIndex: a[R2.FIELDS.START_POS] }));
          }
          if (i2) return this.expected("closing parenthesis", this.currToken[R2.FIELDS.START_POS]);
        }, t.pseudo = function() {
          for (var r = this, i2 = "", o = this.currToken; this.currToken && this.currToken[R2.FIELDS.TYPE] === B.colon; ) i2 += this.content(), this.position++;
          if (!this.currToken) return this.expected(["pseudo-class", "pseudo-element"], this.position - 1);
          if (this.currToken[R2.FIELDS.TYPE] === B.word) this.splitWord(false, function(s, a) {
            i2 += s, r.newNode(new Dm.default({ value: i2, source: Zo(o, r.currToken), sourceIndex: o[R2.FIELDS.START_POS] })), a > 1 && r.nextToken && r.nextToken[R2.FIELDS.TYPE] === B.openParenthesis && r.error("Misplaced parenthesis.", { index: r.nextToken[R2.FIELDS.START_POS] });
          });
          else return this.expected(["pseudo-class", "pseudo-element"], this.currToken[R2.FIELDS.START_POS]);
        }, t.space = function() {
          var r = this.content();
          this.position === 0 || this.prevToken[R2.FIELDS.TYPE] === B.comma || this.prevToken[R2.FIELDS.TYPE] === B.openParenthesis || this.current.nodes.every(function(i2) {
            return i2.type === "comment";
          }) ? (this.spaces = this.optionalSpace(r), this.position++) : this.position === this.tokens.length - 1 || this.nextToken[R2.FIELDS.TYPE] === B.comma || this.nextToken[R2.FIELDS.TYPE] === B.closeParenthesis ? (this.current.last.spaces.after = this.optionalSpace(r), this.position++) : this.combinator();
        }, t.string = function() {
          var r = this.currToken;
          this.newNode(new Qo.default({ value: this.content(), source: xr(r), sourceIndex: r[R2.FIELDS.START_POS] })), this.position++;
        }, t.universal = function(r) {
          var i2 = this.nextToken;
          if (i2 && this.content(i2) === "|") return this.position++, this.namespace();
          var o = this.currToken;
          this.newNode(new Fm.default({ value: this.content(), source: xr(o), sourceIndex: o[R2.FIELDS.START_POS] }), r), this.position++;
        }, t.splitWord = function(r, i2) {
          for (var o = this, s = this.nextToken, a = this.content(); s && ~[B.dollar, B.caret, B.equals, B.word].indexOf(s[R2.FIELDS.TYPE]); ) {
            this.position++;
            var u2 = this.content();
            if (a += u2, u2.lastIndexOf("\\") === u2.length - 1) {
              var f = this.nextToken;
              f && f[R2.FIELDS.TYPE] === B.space && (a += this.requiredSpace(this.content(f)), this.position++);
            }
            s = this.nextToken;
          }
          var l2 = es(a, ".").filter(function(b) {
            var y = a[b - 1] === "\\", k = /^\d+\.\d+%$/.test(a);
            return !y && !k;
          }), p = es(a, "#").filter(function(b) {
            return a[b - 1] !== "\\";
          }), h2 = es(a, "#{");
          h2.length && (p = p.filter(function(b) {
            return !~h2.indexOf(b);
          }));
          var g2 = (0, $m.default)(Gm([0].concat(l2, p)));
          g2.forEach(function(b, y) {
            var k = g2[y + 1] || a.length, S2 = a.slice(b, k);
            if (y === 0 && i2) return i2.call(o, S2, g2.length);
            var I, w2 = o.currToken, T = w2[R2.FIELDS.START_POS] + g2[y], O = nr(w2[1], w2[2] + b, w2[3], w2[2] + (k - 1));
            if (~l2.indexOf(b)) {
              var C = { value: S2.slice(1), source: O, sourceIndex: T };
              I = new Mm.default(wr(C, "value"));
            } else if (~p.indexOf(b)) {
              var D = { value: S2.slice(1), source: O, sourceIndex: T };
              I = new Nm.default(wr(D, "value"));
            } else {
              var q = { value: S2, source: O, sourceIndex: T };
              wr(q, "value"), I = new Wm.default(q);
            }
            o.newNode(I, r), r = null;
          }), this.position++;
        }, t.word = function(r) {
          var i2 = this.nextToken;
          return i2 && this.content(i2) === "|" ? (this.position++, this.namespace()) : this.splitWord(r);
        }, t.loop = function() {
          for (; this.position < this.tokens.length; ) this.parse(true);
          return this.current._inferEndPosition(), this.root;
        }, t.parse = function(r) {
          switch (this.currToken[R2.FIELDS.TYPE]) {
            case B.space:
              this.space();
              break;
            case B.comment:
              this.comment();
              break;
            case B.openParenthesis:
              this.parentheses();
              break;
            case B.closeParenthesis:
              r && this.missingParenthesis();
              break;
            case B.openSquare:
              this.attribute();
              break;
            case B.dollar:
            case B.caret:
            case B.equals:
            case B.word:
              this.word();
              break;
            case B.colon:
              this.pseudo();
              break;
            case B.comma:
              this.comma();
              break;
            case B.asterisk:
              this.universal();
              break;
            case B.ampersand:
              this.nesting();
              break;
            case B.slash:
            case B.combinator:
              this.combinator();
              break;
            case B.str:
              this.string();
              break;
            case B.closeSquare:
              this.missingSquareBracket();
            case B.semicolon:
              this.missingBackslash();
            default:
              this.unexpected();
          }
        }, t.expected = function(r, i2, o) {
          if (Array.isArray(r)) {
            var s = r.pop();
            r = r.join(", ") + " or " + s;
          }
          var a = /^[aeiou]/.test(r[0]) ? "an" : "a";
          return o ? this.error("Expected " + a + " " + r + ', found "' + o + '" instead.', { index: i2 }) : this.error("Expected " + a + " " + r + ".", { index: i2 });
        }, t.requiredSpace = function(r) {
          return this.options.lossy ? " " : r;
        }, t.optionalSpace = function(r) {
          return this.options.lossy ? "" : r;
        }, t.lossySpace = function(r, i2) {
          return this.options.lossy ? i2 ? " " : "" : r;
        }, t.parseParenthesisToken = function(r) {
          var i2 = this.content(r);
          return r[R2.FIELDS.TYPE] === B.space ? this.requiredSpace(i2) : i2;
        }, t.newNode = function(r, i2) {
          return i2 && (/^ +$/.test(i2) && (this.options.lossy || (this.spaces = (this.spaces || "") + i2), i2 = true), r.namespace = i2, wr(r, "namespace")), this.spaces && (r.spaces.before = this.spaces, this.spaces = ""), this.current.append(r);
        }, t.content = function(r) {
          return r === void 0 && (r = this.currToken), this.css.slice(r[R2.FIELDS.START_POS], r[R2.FIELDS.END_POS]);
        }, t.locateNextMeaningfulToken = function(r) {
          r === void 0 && (r = this.position + 1);
          for (var i2 = r; i2 < this.tokens.length; ) if (zm[this.tokens[i2][R2.FIELDS.TYPE]]) {
            i2++;
            continue;
          } else return i2;
          return -1;
        }, Um(e, [{ key: "currToken", get: /* @__PURE__ */ __name2(function() {
          return this.tokens[this.position];
        }, "get") }, { key: "nextToken", get: /* @__PURE__ */ __name2(function() {
          return this.tokens[this.position + 1];
        }, "get") }, { key: "prevToken", get: /* @__PURE__ */ __name2(function() {
          return this.tokens[this.position - 1];
        }, "get") }]), e;
      })();
      un.default = jm;
      bl.exports = un.default;
    });
    xl = U((ln, yl) => {
      "use strict";
      ln.__esModule = true;
      ln.default = void 0;
      var Vm = Hm(vl());
      function Hm(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(Hm, "Hm");
      __name2(Hm, "Hm");
      var Ym = (function() {
        function e(n, r) {
          this.func = n || function() {
          }, this.funcRes = null, this.options = r;
        }
        __name(e, "e");
        __name2(e, "e");
        var t = e.prototype;
        return t._shouldUpdateSelector = function(r, i2) {
          i2 === void 0 && (i2 = {});
          var o = Object.assign({}, this.options, i2);
          return o.updateSelector === false ? false : typeof r != "string";
        }, t._isLossy = function(r) {
          r === void 0 && (r = {});
          var i2 = Object.assign({}, this.options, r);
          return i2.lossless === false;
        }, t._root = function(r, i2) {
          i2 === void 0 && (i2 = {});
          var o = new Vm.default(r, this._parseOptions(i2));
          return o.root;
        }, t._parseOptions = function(r) {
          return { lossy: this._isLossy(r) };
        }, t._run = function(r, i2) {
          var o = this;
          return i2 === void 0 && (i2 = {}), new Promise(function(s, a) {
            try {
              var u2 = o._root(r, i2);
              Promise.resolve(o.func(u2)).then(function(f) {
                var l2 = void 0;
                return o._shouldUpdateSelector(r, i2) && (l2 = u2.toString(), r.selector = l2), { transform: f, root: u2, string: l2 };
              }).then(s, a);
            } catch (f) {
              a(f);
              return;
            }
          });
        }, t._runSync = function(r, i2) {
          i2 === void 0 && (i2 = {});
          var o = this._root(r, i2), s = this.func(o);
          if (s && typeof s.then == "function") throw new Error("Selector processor returned a promise to a synchronous call.");
          var a = void 0;
          return i2.updateSelector && typeof r != "string" && (a = o.toString(), r.selector = a), { transform: s, root: o, string: a };
        }, t.ast = function(r, i2) {
          return this._run(r, i2).then(function(o) {
            return o.root;
          });
        }, t.astSync = function(r, i2) {
          return this._runSync(r, i2).root;
        }, t.transform = function(r, i2) {
          return this._run(r, i2).then(function(o) {
            return o.transform;
          });
        }, t.transformSync = function(r, i2) {
          return this._runSync(r, i2).transform;
        }, t.process = function(r, i2) {
          return this._run(r, i2).then(function(o) {
            return o.string || o.root.toString();
          });
        }, t.processSync = function(r, i2) {
          var o = this._runSync(r, i2);
          return o.string || o.root.toString();
        }, e;
      })();
      ln.default = Ym;
      yl.exports = ln.default;
    });
    wl = U((me) => {
      "use strict";
      me.__esModule = true;
      me.universal = me.tag = me.string = me.selector = me.root = me.pseudo = me.nesting = me.id = me.comment = me.combinator = me.className = me.attribute = void 0;
      var Xm = it($o()), Qm = it(_o()), Km = it(Go()), Jm = it(ko()), Zm = it(Oo()), e0 = it(Vo()), t0 = it(Mo()), r0 = it(vo()), n0 = it(xo()), i0 = it(Co()), o0 = it(Io()), s0 = it(Uo());
      function it(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(it, "it");
      __name2(it, "it");
      var a0 = /* @__PURE__ */ __name2(function(t) {
        return new Xm.default(t);
      }, "a0");
      me.attribute = a0;
      var u0 = /* @__PURE__ */ __name2(function(t) {
        return new Qm.default(t);
      }, "u0");
      me.className = u0;
      var l0 = /* @__PURE__ */ __name2(function(t) {
        return new Km.default(t);
      }, "l0");
      me.combinator = l0;
      var f0 = /* @__PURE__ */ __name2(function(t) {
        return new Jm.default(t);
      }, "f0");
      me.comment = f0;
      var c0 = /* @__PURE__ */ __name2(function(t) {
        return new Zm.default(t);
      }, "c0");
      me.id = c0;
      var d0 = /* @__PURE__ */ __name2(function(t) {
        return new e0.default(t);
      }, "d0");
      me.nesting = d0;
      var p0 = /* @__PURE__ */ __name2(function(t) {
        return new t0.default(t);
      }, "p0");
      me.pseudo = p0;
      var h0 = /* @__PURE__ */ __name2(function(t) {
        return new r0.default(t);
      }, "h0");
      me.root = h0;
      var m0 = /* @__PURE__ */ __name2(function(t) {
        return new n0.default(t);
      }, "m0");
      me.selector = m0;
      var g0 = /* @__PURE__ */ __name2(function(t) {
        return new i0.default(t);
      }, "g0");
      me.string = g0;
      var b0 = /* @__PURE__ */ __name2(function(t) {
        return new o0.default(t);
      }, "b0");
      me.tag = b0;
      var v0 = /* @__PURE__ */ __name2(function(t) {
        return new s0.default(t);
      }, "v0");
      me.universal = v0;
    });
    kl = U((re) => {
      "use strict";
      re.__esModule = true;
      re.isNode = rs;
      re.isPseudoElement = Tl;
      re.isPseudoClass = A0;
      re.isContainer = I0;
      re.isNamespace = R0;
      re.isUniversal = re.isTag = re.isString = re.isSelector = re.isRoot = re.isPseudo = re.isNesting = re.isIdentifier = re.isComment = re.isCombinator = re.isClassName = re.isAttribute = void 0;
      var xe = Ce(), Ge, y0 = (Ge = {}, Ge[xe.ATTRIBUTE] = true, Ge[xe.CLASS] = true, Ge[xe.COMBINATOR] = true, Ge[xe.COMMENT] = true, Ge[xe.ID] = true, Ge[xe.NESTING] = true, Ge[xe.PSEUDO] = true, Ge[xe.ROOT] = true, Ge[xe.SELECTOR] = true, Ge[xe.STRING] = true, Ge[xe.TAG] = true, Ge[xe.UNIVERSAL] = true, Ge);
      function rs(e) {
        return typeof e == "object" && y0[e.type];
      }
      __name(rs, "rs");
      __name2(rs, "rs");
      function ot(e, t) {
        return rs(t) && t.type === e;
      }
      __name(ot, "ot");
      __name2(ot, "ot");
      var Sl = ot.bind(null, xe.ATTRIBUTE);
      re.isAttribute = Sl;
      var x0 = ot.bind(null, xe.CLASS);
      re.isClassName = x0;
      var w0 = ot.bind(null, xe.COMBINATOR);
      re.isCombinator = w0;
      var S0 = ot.bind(null, xe.COMMENT);
      re.isComment = S0;
      var _0 = ot.bind(null, xe.ID);
      re.isIdentifier = _0;
      var T0 = ot.bind(null, xe.NESTING);
      re.isNesting = T0;
      var ns = ot.bind(null, xe.PSEUDO);
      re.isPseudo = ns;
      var k0 = ot.bind(null, xe.ROOT);
      re.isRoot = k0;
      var E0 = ot.bind(null, xe.SELECTOR);
      re.isSelector = E0;
      var O0 = ot.bind(null, xe.STRING);
      re.isString = O0;
      var _l = ot.bind(null, xe.TAG);
      re.isTag = _l;
      var P0 = ot.bind(null, xe.UNIVERSAL);
      re.isUniversal = P0;
      function Tl(e) {
        return ns(e) && e.value && (e.value.startsWith("::") || e.value.toLowerCase() === ":before" || e.value.toLowerCase() === ":after" || e.value.toLowerCase() === ":first-letter" || e.value.toLowerCase() === ":first-line");
      }
      __name(Tl, "Tl");
      __name2(Tl, "Tl");
      function A0(e) {
        return ns(e) && !Tl(e);
      }
      __name(A0, "A0");
      __name2(A0, "A0");
      function I0(e) {
        return !!(rs(e) && e.walk);
      }
      __name(I0, "I0");
      __name2(I0, "I0");
      function R0(e) {
        return Sl(e) || _l(e);
      }
      __name(R0, "R0");
      __name2(R0, "R0");
    });
    El = U((mt) => {
      "use strict";
      mt.__esModule = true;
      var is = Ce();
      Object.keys(is).forEach(function(e) {
        e === "default" || e === "__esModule" || e in mt && mt[e] === is[e] || (mt[e] = is[e]);
      });
      var os = wl();
      Object.keys(os).forEach(function(e) {
        e === "default" || e === "__esModule" || e in mt && mt[e] === os[e] || (mt[e] = os[e]);
      });
      var ss = kl();
      Object.keys(ss).forEach(function(e) {
        e === "default" || e === "__esModule" || e in mt && mt[e] === ss[e] || (mt[e] = ss[e]);
      });
    });
    Al = U((fn, Pl) => {
      "use strict";
      fn.__esModule = true;
      fn.default = void 0;
      var C0 = N0(xl()), L0 = M0(El());
      function Ol() {
        if (typeof WeakMap != "function") return null;
        var e = /* @__PURE__ */ new WeakMap();
        return Ol = /* @__PURE__ */ __name2(function() {
          return e;
        }, "Ol"), e;
      }
      __name(Ol, "Ol");
      __name2(Ol, "Ol");
      function M0(e) {
        if (e && e.__esModule) return e;
        if (e === null || typeof e != "object" && typeof e != "function") return { default: e };
        var t = Ol();
        if (t && t.has(e)) return t.get(e);
        var n = {}, r = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var i2 in e) if (Object.prototype.hasOwnProperty.call(e, i2)) {
          var o = r ? Object.getOwnPropertyDescriptor(e, i2) : null;
          o && (o.get || o.set) ? Object.defineProperty(n, i2, o) : n[i2] = e[i2];
        }
        return n.default = e, t && t.set(e, n), n;
      }
      __name(M0, "M0");
      __name2(M0, "M0");
      function N0(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(N0, "N0");
      __name2(N0, "N0");
      var as = /* @__PURE__ */ __name2(function(t) {
        return new C0.default(t);
      }, "as");
      Object.assign(as, L0);
      delete as.__esModule;
      var W0 = as;
      fn.default = W0;
      Pl.exports = fn.default;
    });
    Il = U((us) => {
      "use strict";
      Object.defineProperty(us, "__esModule", { value: true });
      Object.defineProperty(us, "default", { enumerable: true, get: /* @__PURE__ */ __name2(() => D0, "get") });
      function D0(e) {
        return e.replace(/\\,/g, "\\2c ");
      }
      __name(D0, "D0");
      __name2(D0, "D0");
    });
    Cl = U((Gx, Rl) => {
      "use strict";
      Rl.exports = { aliceblue: [240, 248, 255], antiquewhite: [250, 235, 215], aqua: [0, 255, 255], aquamarine: [127, 255, 212], azure: [240, 255, 255], beige: [245, 245, 220], bisque: [255, 228, 196], black: [0, 0, 0], blanchedalmond: [255, 235, 205], blue: [0, 0, 255], blueviolet: [138, 43, 226], brown: [165, 42, 42], burlywood: [222, 184, 135], cadetblue: [95, 158, 160], chartreuse: [127, 255, 0], chocolate: [210, 105, 30], coral: [255, 127, 80], cornflowerblue: [100, 149, 237], cornsilk: [255, 248, 220], crimson: [220, 20, 60], cyan: [0, 255, 255], darkblue: [0, 0, 139], darkcyan: [0, 139, 139], darkgoldenrod: [184, 134, 11], darkgray: [169, 169, 169], darkgreen: [0, 100, 0], darkgrey: [169, 169, 169], darkkhaki: [189, 183, 107], darkmagenta: [139, 0, 139], darkolivegreen: [85, 107, 47], darkorange: [255, 140, 0], darkorchid: [153, 50, 204], darkred: [139, 0, 0], darksalmon: [233, 150, 122], darkseagreen: [143, 188, 143], darkslateblue: [72, 61, 139], darkslategray: [47, 79, 79], darkslategrey: [47, 79, 79], darkturquoise: [0, 206, 209], darkviolet: [148, 0, 211], deeppink: [255, 20, 147], deepskyblue: [0, 191, 255], dimgray: [105, 105, 105], dimgrey: [105, 105, 105], dodgerblue: [30, 144, 255], firebrick: [178, 34, 34], floralwhite: [255, 250, 240], forestgreen: [34, 139, 34], fuchsia: [255, 0, 255], gainsboro: [220, 220, 220], ghostwhite: [248, 248, 255], gold: [255, 215, 0], goldenrod: [218, 165, 32], gray: [128, 128, 128], green: [0, 128, 0], greenyellow: [173, 255, 47], grey: [128, 128, 128], honeydew: [240, 255, 240], hotpink: [255, 105, 180], indianred: [205, 92, 92], indigo: [75, 0, 130], ivory: [255, 255, 240], khaki: [240, 230, 140], lavender: [230, 230, 250], lavenderblush: [255, 240, 245], lawngreen: [124, 252, 0], lemonchiffon: [255, 250, 205], lightblue: [173, 216, 230], lightcoral: [240, 128, 128], lightcyan: [224, 255, 255], lightgoldenrodyellow: [250, 250, 210], lightgray: [211, 211, 211], lightgreen: [144, 238, 144], lightgrey: [211, 211, 211], lightpink: [255, 182, 193], lightsalmon: [255, 160, 122], lightseagreen: [32, 178, 170], lightskyblue: [135, 206, 250], lightslategray: [119, 136, 153], lightslategrey: [119, 136, 153], lightsteelblue: [176, 196, 222], lightyellow: [255, 255, 224], lime: [0, 255, 0], limegreen: [50, 205, 50], linen: [250, 240, 230], magenta: [255, 0, 255], maroon: [128, 0, 0], mediumaquamarine: [102, 205, 170], mediumblue: [0, 0, 205], mediumorchid: [186, 85, 211], mediumpurple: [147, 112, 219], mediumseagreen: [60, 179, 113], mediumslateblue: [123, 104, 238], mediumspringgreen: [0, 250, 154], mediumturquoise: [72, 209, 204], mediumvioletred: [199, 21, 133], midnightblue: [25, 25, 112], mintcream: [245, 255, 250], mistyrose: [255, 228, 225], moccasin: [255, 228, 181], navajowhite: [255, 222, 173], navy: [0, 0, 128], oldlace: [253, 245, 230], olive: [128, 128, 0], olivedrab: [107, 142, 35], orange: [255, 165, 0], orangered: [255, 69, 0], orchid: [218, 112, 214], palegoldenrod: [238, 232, 170], palegreen: [152, 251, 152], paleturquoise: [175, 238, 238], palevioletred: [219, 112, 147], papayawhip: [255, 239, 213], peachpuff: [255, 218, 185], peru: [205, 133, 63], pink: [255, 192, 203], plum: [221, 160, 221], powderblue: [176, 224, 230], purple: [128, 0, 128], rebeccapurple: [102, 51, 153], red: [255, 0, 0], rosybrown: [188, 143, 143], royalblue: [65, 105, 225], saddlebrown: [139, 69, 19], salmon: [250, 128, 114], sandybrown: [244, 164, 96], seagreen: [46, 139, 87], seashell: [255, 245, 238], sienna: [160, 82, 45], silver: [192, 192, 192], skyblue: [135, 206, 235], slateblue: [106, 90, 205], slategray: [112, 128, 144], slategrey: [112, 128, 144], snow: [255, 250, 250], springgreen: [0, 255, 127], steelblue: [70, 130, 180], tan: [210, 180, 140], teal: [0, 128, 128], thistle: [216, 191, 216], tomato: [255, 99, 71], turquoise: [64, 224, 208], violet: [238, 130, 238], wheat: [245, 222, 179], white: [255, 255, 255], whitesmoke: [245, 245, 245], yellow: [255, 255, 0], yellowgreen: [154, 205, 50] };
    });
    fs = U((ls) => {
      "use strict";
      Object.defineProperty(ls, "__esModule", { value: true });
      function F0(e, t) {
        for (var n in t) Object.defineProperty(e, n, { enumerable: true, get: t[n] });
      }
      __name(F0, "F0");
      __name2(F0, "F0");
      F0(ls, { parseColor: /* @__PURE__ */ __name2(() => G0, "parseColor"), formatColor: /* @__PURE__ */ __name2(() => j0, "formatColor") });
      var Ll = B0(Cl());
      function B0(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(B0, "B0");
      __name2(B0, "B0");
      var $0 = /^#([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i, q0 = /^#([a-f\d])([a-f\d])([a-f\d])([a-f\d])?$/i, Ht = /(?:\d+|\d*\.\d+)%?/, di = /(?:\s*,\s*|\s+)/, Ml = /\s*[,/]\s*/, Yt = /var\(--(?:[^ )]*?)\)/, U0 = new RegExp(`^(rgb)a?\\(\\s*(${Ht.source}|${Yt.source})(?:${di.source}(${Ht.source}|${Yt.source}))?(?:${di.source}(${Ht.source}|${Yt.source}))?(?:${Ml.source}(${Ht.source}|${Yt.source}))?\\s*\\)$`), z0 = new RegExp(`^(hsl)a?\\(\\s*((?:${Ht.source})(?:deg|rad|grad|turn)?|${Yt.source})(?:${di.source}(${Ht.source}|${Yt.source}))?(?:${di.source}(${Ht.source}|${Yt.source}))?(?:${Ml.source}(${Ht.source}|${Yt.source}))?\\s*\\)$`);
      function G0(e, { loose: t = false } = {}) {
        var n, r;
        if (typeof e != "string") return null;
        if (e = e.trim(), e === "transparent") return { mode: "rgb", color: ["0", "0", "0"], alpha: "0" };
        if (e in Ll.default) return { mode: "rgb", color: Ll.default[e].map((u2) => u2.toString()) };
        let i2 = e.replace(q0, (u2, f, l2, p, h2) => ["#", f, f, l2, l2, p, p, h2 ? h2 + h2 : ""].join("")).match($0);
        if (i2 !== null) return { mode: "rgb", color: [parseInt(i2[1], 16), parseInt(i2[2], 16), parseInt(i2[3], 16)].map((u2) => u2.toString()), alpha: i2[4] ? (parseInt(i2[4], 16) / 255).toString() : void 0 };
        var o;
        let s = (o = e.match(U0)) !== null && o !== void 0 ? o : e.match(z0);
        if (s === null) return null;
        let a = [s[2], s[3], s[4]].filter(Boolean).map((u2) => u2.toString());
        return !t && a.length !== 3 || a.length < 3 && !a.some((u2) => /^var\(.*?\)$/.test(u2)) ? null : { mode: s[1], color: a, alpha: (n = s[5]) === null || n === void 0 || (r = n.toString) === null || r === void 0 ? void 0 : r.call(n) };
      }
      __name(G0, "G0");
      __name2(G0, "G0");
      function j0({ mode: e, color: t, alpha: n }) {
        let r = n !== void 0;
        return `${e}(${t.join(" ")}${r ? ` / ${n}` : ""})`;
      }
      __name(j0, "j0");
      __name2(j0, "j0");
    });
    ds = U((cs) => {
      "use strict";
      Object.defineProperty(cs, "__esModule", { value: true });
      function V0(e, t) {
        for (var n in t) Object.defineProperty(e, n, { enumerable: true, get: t[n] });
      }
      __name(V0, "V0");
      __name2(V0, "V0");
      V0(cs, { withAlphaValue: /* @__PURE__ */ __name2(() => H0, "withAlphaValue"), default: /* @__PURE__ */ __name2(() => Y0, "default") });
      var pi = fs();
      function H0(e, t, n) {
        if (typeof e == "function") return e({ opacityValue: t });
        let r = (0, pi.parseColor)(e, { loose: true });
        return r === null ? n : (0, pi.formatColor)({ ...r, alpha: t });
      }
      __name(H0, "H0");
      __name2(H0, "H0");
      function Y0({ color: e, property: t, variable: n }) {
        let r = [].concat(t);
        if (typeof e == "function") return { [n]: "1", ...Object.fromEntries(r.map((o) => [o, e({ opacityVariable: n, opacityValue: `var(${n})` })])) };
        let i2 = (0, pi.parseColor)(e);
        return i2 === null ? Object.fromEntries(r.map((o) => [o, e])) : i2.alpha !== void 0 ? Object.fromEntries(r.map((o) => [o, e])) : { [n]: "1", ...Object.fromEntries(r.map((o) => [o, (0, pi.formatColor)({ ...i2, alpha: `var(${n})` })])) };
      }
      __name(Y0, "Y0");
      __name2(Y0, "Y0");
    });
    Bl = U((ps) => {
      "use strict";
      Object.defineProperty(ps, "__esModule", { value: true });
      function X0(e, t) {
        for (var n in t) Object.defineProperty(e, n, { enumerable: true, get: t[n] });
      }
      __name(X0, "X0");
      __name2(X0, "X0");
      X0(ps, { pattern: /* @__PURE__ */ __name2(() => K0, "pattern"), withoutCapturing: /* @__PURE__ */ __name2(() => Wl, "withoutCapturing"), any: /* @__PURE__ */ __name2(() => Dl, "any"), optional: /* @__PURE__ */ __name2(() => J0, "optional"), zeroOrMore: /* @__PURE__ */ __name2(() => Z0, "zeroOrMore"), nestedBrackets: /* @__PURE__ */ __name2(() => Fl, "nestedBrackets"), escape: /* @__PURE__ */ __name2(() => ir, "escape") });
      var Nl = /[\\^$.*+?()[\]{}|]/g, Q0 = RegExp(Nl.source);
      function cn(e) {
        return e = Array.isArray(e) ? e : [e], e = e.map((t) => t instanceof RegExp ? t.source : t), e.join("");
      }
      __name(cn, "cn");
      __name2(cn, "cn");
      function K0(e) {
        return new RegExp(cn(e), "g");
      }
      __name(K0, "K0");
      __name2(K0, "K0");
      function Wl(e) {
        return new RegExp(`(?:${cn(e)})`, "g");
      }
      __name(Wl, "Wl");
      __name2(Wl, "Wl");
      function Dl(e) {
        return `(?:${e.map(cn).join("|")})`;
      }
      __name(Dl, "Dl");
      __name2(Dl, "Dl");
      function J0(e) {
        return `(?:${cn(e)})?`;
      }
      __name(J0, "J0");
      __name2(J0, "J0");
      function Z0(e) {
        return `(?:${cn(e)})*`;
      }
      __name(Z0, "Z0");
      __name2(Z0, "Z0");
      function Fl(e, t, n = 1) {
        return Wl([ir(e), /[^\s]*/, n === 1 ? `[^${ir(e)}${ir(t)}s]*` : Dl([`[^${ir(e)}${ir(t)}s]*`, Fl(e, t, n - 1)]), /[^\s]*/, ir(t)]);
      }
      __name(Fl, "Fl");
      __name2(Fl, "Fl");
      function ir(e) {
        return e && Q0.test(e) ? e.replace(Nl, "\\$&") : e || "";
      }
      __name(ir, "ir");
      __name2(ir, "ir");
    });
    ql = U((hs) => {
      "use strict";
      Object.defineProperty(hs, "__esModule", { value: true });
      Object.defineProperty(hs, "splitAtTopLevelOnly", { enumerable: true, get: /* @__PURE__ */ __name2(() => rg, "get") });
      var eg = tg(Bl());
      function $l(e) {
        if (typeof WeakMap != "function") return null;
        var t = /* @__PURE__ */ new WeakMap(), n = /* @__PURE__ */ new WeakMap();
        return ($l = /* @__PURE__ */ __name2(function(r) {
          return r ? n : t;
        }, "$l"))(e);
      }
      __name($l, "$l");
      __name2($l, "$l");
      function tg(e, t) {
        if (!t && e && e.__esModule) return e;
        if (e === null || typeof e != "object" && typeof e != "function") return { default: e };
        var n = $l(t);
        if (n && n.has(e)) return n.get(e);
        var r = {}, i2 = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var o in e) if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
          var s = i2 ? Object.getOwnPropertyDescriptor(e, o) : null;
          s && (s.get || s.set) ? Object.defineProperty(r, o, s) : r[o] = e[o];
        }
        return r.default = e, n && n.set(e, r), r;
      }
      __name(tg, "tg");
      __name2(tg, "tg");
      function* rg(e, t) {
        let n = new RegExp(`[(){}\\[\\]${eg.escape(t)}]`, "g"), r = 0, i2 = 0, o = false, s = 0, a = 0, u2 = t.length;
        for (let f of e.matchAll(n)) {
          let l2 = f[0] === t[s], p = s === u2 - 1, h2 = l2 && p;
          f[0] === "(" && r++, f[0] === ")" && r--, f[0] === "[" && r++, f[0] === "]" && r--, f[0] === "{" && r++, f[0] === "}" && r--, l2 && r === 0 && (a === 0 && (a = f.index), s++), h2 && r === 0 && (o = true, yield e.substring(i2, a), i2 = a + u2), s === u2 && (s = 0, a = 0);
        }
        o ? yield e.substring(i2) : yield e;
      }
      __name(rg, "rg");
      __name2(rg, "rg");
    });
    zl = U((ms) => {
      "use strict";
      Object.defineProperty(ms, "__esModule", { value: true });
      function ng(e, t) {
        for (var n in t) Object.defineProperty(e, n, { enumerable: true, get: t[n] });
      }
      __name(ng, "ng");
      __name2(ng, "ng");
      ng(ms, { parseBoxShadowValue: /* @__PURE__ */ __name2(() => ag, "parseBoxShadowValue"), formatBoxShadowValue: /* @__PURE__ */ __name2(() => ug, "formatBoxShadowValue") });
      var ig = ql(), og = /* @__PURE__ */ new Set(["inset", "inherit", "initial", "revert", "unset"]), sg = /\ +(?![^(]*\))/g, Ul = /^-?(\d+|\.\d+)(.*?)$/g;
      function ag(e) {
        return Array.from((0, ig.splitAtTopLevelOnly)(e, ",")).map((n) => {
          let r = n.trim(), i2 = { raw: r }, o = r.split(sg), s = /* @__PURE__ */ new Set();
          for (let a of o) Ul.lastIndex = 0, !s.has("KEYWORD") && og.has(a) ? (i2.keyword = a, s.add("KEYWORD")) : Ul.test(a) ? s.has("X") ? s.has("Y") ? s.has("BLUR") ? s.has("SPREAD") || (i2.spread = a, s.add("SPREAD")) : (i2.blur = a, s.add("BLUR")) : (i2.y = a, s.add("Y")) : (i2.x = a, s.add("X")) : i2.color ? (i2.unknown || (i2.unknown = []), i2.unknown.push(a)) : i2.color = a;
          return i2.valid = i2.x !== void 0 && i2.y !== void 0, i2;
        });
      }
      __name(ag, "ag");
      __name2(ag, "ag");
      function ug(e) {
        return e.map((t) => t.valid ? [t.keyword, t.x, t.y, t.blur, t.spread, t.color].filter(Boolean).join(" ") : t.raw).join(", ");
      }
      __name(ug, "ug");
      __name2(ug, "ug");
    });
    Ql = U((bs) => {
      "use strict";
      Object.defineProperty(bs, "__esModule", { value: true });
      function lg(e, t) {
        for (var n in t) Object.defineProperty(e, n, { enumerable: true, get: t[n] });
      }
      __name(lg, "lg");
      __name2(lg, "lg");
      lg(bs, { normalize: /* @__PURE__ */ __name2(() => Xt, "normalize"), url: /* @__PURE__ */ __name2(() => Vl, "url"), number: /* @__PURE__ */ __name2(() => dg, "number"), percentage: /* @__PURE__ */ __name2(() => Hl, "percentage"), length: /* @__PURE__ */ __name2(() => Yl, "length"), lineWidth: /* @__PURE__ */ __name2(() => mg, "lineWidth"), shadow: /* @__PURE__ */ __name2(() => gg, "shadow"), color: /* @__PURE__ */ __name2(() => bg, "color"), image: /* @__PURE__ */ __name2(() => vg, "image"), gradient: /* @__PURE__ */ __name2(() => Xl, "gradient"), position: /* @__PURE__ */ __name2(() => wg, "position"), familyName: /* @__PURE__ */ __name2(() => Sg, "familyName"), genericName: /* @__PURE__ */ __name2(() => Tg, "genericName"), absoluteSize: /* @__PURE__ */ __name2(() => Eg, "absoluteSize"), relativeSize: /* @__PURE__ */ __name2(() => Pg, "relativeSize") });
      var fg = fs(), cg = zl(), gs = ["min", "max", "clamp", "calc"], jl = /,(?![^(]*\))/g, hi = /_(?![^(]*\))/g;
      function Xt(e, t = true) {
        return e.includes("url(") ? e.split(/(url\(.*?\))/g).filter(Boolean).map((n) => /^url\(.*?\)$/.test(n) ? n : Xt(n, false)).join("") : (e = e.replace(/([^\\])_+/g, (n, r) => r + " ".repeat(n.length - 1)).replace(/^_/g, " ").replace(/\\_/g, "_"), t && (e = e.trim()), e = e.replace(/(calc|min|max|clamp)\(.+\)/g, (n) => n.replace(/(-?\d*\.?\d(?!\b-.+[,)](?![^+\-/*])\D)(?:%|[a-z]+)?|\))([+\-/*])/g, "$1 $2 ")), e);
      }
      __name(Xt, "Xt");
      __name2(Xt, "Xt");
      function Vl(e) {
        return e.startsWith("url(");
      }
      __name(Vl, "Vl");
      __name2(Vl, "Vl");
      function dg(e) {
        return !isNaN(Number(e)) || gs.some((t) => new RegExp(`^${t}\\(.+?`).test(e));
      }
      __name(dg, "dg");
      __name2(dg, "dg");
      function Hl(e) {
        return e.split(hi).every((t) => /%$/g.test(t) || gs.some((n) => new RegExp(`^${n}\\(.+?%`).test(t)));
      }
      __name(Hl, "Hl");
      __name2(Hl, "Hl");
      var pg = ["cm", "mm", "Q", "in", "pc", "pt", "px", "em", "ex", "ch", "rem", "lh", "vw", "vh", "vmin", "vmax"], Gl = `(?:${pg.join("|")})`;
      function Yl(e) {
        return e.split(hi).every((t) => t === "0" || new RegExp(`${Gl}$`).test(t) || gs.some((n) => new RegExp(`^${n}\\(.+?${Gl}`).test(t)));
      }
      __name(Yl, "Yl");
      __name2(Yl, "Yl");
      var hg = /* @__PURE__ */ new Set(["thin", "medium", "thick"]);
      function mg(e) {
        return hg.has(e);
      }
      __name(mg, "mg");
      __name2(mg, "mg");
      function gg(e) {
        let t = (0, cg.parseBoxShadowValue)(Xt(e));
        for (let n of t) if (!n.valid) return false;
        return true;
      }
      __name(gg, "gg");
      __name2(gg, "gg");
      function bg(e) {
        let t = 0;
        return e.split(hi).every((r) => (r = Xt(r), r.startsWith("var(") ? true : (0, fg.parseColor)(r, { loose: true }) !== null ? (t++, true) : false)) ? t > 0 : false;
      }
      __name(bg, "bg");
      __name2(bg, "bg");
      function vg(e) {
        let t = 0;
        return e.split(jl).every((r) => (r = Xt(r), r.startsWith("var(") ? true : Vl(r) || Xl(r) || ["element(", "image(", "cross-fade(", "image-set("].some((i2) => r.startsWith(i2)) ? (t++, true) : false)) ? t > 0 : false;
      }
      __name(vg, "vg");
      __name2(vg, "vg");
      var yg = /* @__PURE__ */ new Set(["linear-gradient", "radial-gradient", "repeating-linear-gradient", "repeating-radial-gradient", "conic-gradient"]);
      function Xl(e) {
        e = Xt(e);
        for (let t of yg) if (e.startsWith(`${t}(`)) return true;
        return false;
      }
      __name(Xl, "Xl");
      __name2(Xl, "Xl");
      var xg = /* @__PURE__ */ new Set(["center", "top", "right", "bottom", "left"]);
      function wg(e) {
        let t = 0;
        return e.split(hi).every((r) => (r = Xt(r), r.startsWith("var(") ? true : xg.has(r) || Yl(r) || Hl(r) ? (t++, true) : false)) ? t > 0 : false;
      }
      __name(wg, "wg");
      __name2(wg, "wg");
      function Sg(e) {
        let t = 0;
        return e.split(jl).every((r) => (r = Xt(r), r.startsWith("var(") ? true : r.includes(" ") && !/(['"])([^"']+)\1/g.test(r) || /^\d/g.test(r) ? false : (t++, true))) ? t > 0 : false;
      }
      __name(Sg, "Sg");
      __name2(Sg, "Sg");
      var _g = /* @__PURE__ */ new Set(["serif", "sans-serif", "monospace", "cursive", "fantasy", "system-ui", "ui-serif", "ui-sans-serif", "ui-monospace", "ui-rounded", "math", "emoji", "fangsong"]);
      function Tg(e) {
        return _g.has(e);
      }
      __name(Tg, "Tg");
      __name2(Tg, "Tg");
      var kg = /* @__PURE__ */ new Set(["xx-small", "x-small", "small", "medium", "large", "x-large", "x-large", "xxx-large"]);
      function Eg(e) {
        return kg.has(e);
      }
      __name(Eg, "Eg");
      __name2(Eg, "Eg");
      var Og = /* @__PURE__ */ new Set(["larger", "smaller"]);
      function Pg(e) {
        return Og.has(e);
      }
      __name(Pg, "Pg");
      __name2(Pg, "Pg");
    });
    of = U((xs) => {
      "use strict";
      Object.defineProperty(xs, "__esModule", { value: true });
      function Ag(e, t) {
        for (var n in t) Object.defineProperty(e, n, { enumerable: true, get: t[n] });
      }
      __name(Ag, "Ag");
      __name2(Ag, "Ag");
      Ag(xs, { updateAllClasses: /* @__PURE__ */ __name2(() => Cg, "updateAllClasses"), asValue: /* @__PURE__ */ __name2(() => pn, "asValue"), parseColorFormat: /* @__PURE__ */ __name2(() => vs, "parseColorFormat"), asColor: /* @__PURE__ */ __name2(() => tf, "asColor"), asLookupValue: /* @__PURE__ */ __name2(() => rf, "asLookupValue"), coerceValue: /* @__PURE__ */ __name2(() => Wg, "coerceValue") });
      var Ig = ys(Al()), Rg = ys(Il()), Kl = ds(), je = Ql(), Jl = ys(no());
      function ys(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(ys, "ys");
      __name2(ys, "ys");
      function Cg(e, t) {
        return (0, Ig.default)((i2) => {
          i2.walkClasses((o) => {
            let s = t(o.value);
            o.value = s, o.raws && o.raws.value && (o.raws.value = (0, Rg.default)(o.raws.value));
          });
        }).processSync(e);
      }
      __name(Cg, "Cg");
      __name2(Cg, "Cg");
      function ef(e, t) {
        if (!dn(e)) return;
        let n = e.slice(1, -1);
        if (t(n)) return (0, je.normalize)(n);
      }
      __name(ef, "ef");
      __name2(ef, "ef");
      function Lg(e, t = {}, n) {
        let r = t[e];
        if (r !== void 0) return (0, Jl.default)(r);
        if (dn(e)) {
          let i2 = ef(e, n);
          return i2 === void 0 ? void 0 : (0, Jl.default)(i2);
        }
      }
      __name(Lg, "Lg");
      __name2(Lg, "Lg");
      function pn(e, t = {}, { validate: n = /* @__PURE__ */ __name2(() => true, "n") } = {}) {
        var r;
        let i2 = (r = t.values) === null || r === void 0 ? void 0 : r[e];
        return i2 !== void 0 ? i2 : t.supportsNegativeValues && e.startsWith("-") ? Lg(e.slice(1), t.values, n) : ef(e, n);
      }
      __name(pn, "pn");
      __name2(pn, "pn");
      function dn(e) {
        return e.startsWith("[") && e.endsWith("]");
      }
      __name(dn, "dn");
      __name2(dn, "dn");
      function Mg(e) {
        let t = e.lastIndexOf("/");
        return t === -1 || t === e.length - 1 ? [e] : [e.slice(0, t), e.slice(t + 1)];
      }
      __name(Mg, "Mg");
      __name2(Mg, "Mg");
      function vs(e) {
        if (typeof e == "string" && e.includes("<alpha-value>")) {
          let t = e;
          return ({ opacityValue: n = 1 }) => t.replace("<alpha-value>", n);
        }
        return e;
      }
      __name(vs, "vs");
      __name2(vs, "vs");
      function tf(e, t = {}, { tailwindConfig: n = {} } = {}) {
        var r;
        if (((r = t.values) === null || r === void 0 ? void 0 : r[e]) !== void 0) {
          var i2;
          return vs((i2 = t.values) === null || i2 === void 0 ? void 0 : i2[e]);
        }
        let [o, s] = Mg(e);
        if (s !== void 0) {
          var a, u2, f, l2;
          let p = (l2 = (a = t.values) === null || a === void 0 ? void 0 : a[o]) !== null && l2 !== void 0 ? l2 : dn(o) ? o.slice(1, -1) : void 0;
          return p === void 0 ? void 0 : (p = vs(p), dn(s) ? (0, Kl.withAlphaValue)(p, s.slice(1, -1)) : ((u2 = n.theme) === null || u2 === void 0 || (f = u2.opacity) === null || f === void 0 ? void 0 : f[s]) === void 0 ? void 0 : (0, Kl.withAlphaValue)(p, n.theme.opacity[s]));
        }
        return pn(e, t, { validate: je.color });
      }
      __name(tf, "tf");
      __name2(tf, "tf");
      function rf(e, t = {}) {
        var n;
        return (n = t.values) === null || n === void 0 ? void 0 : n[e];
      }
      __name(rf, "rf");
      __name2(rf, "rf");
      function st(e) {
        return (t, n) => pn(t, n, { validate: e });
      }
      __name(st, "st");
      __name2(st, "st");
      var nf = { any: pn, color: tf, url: st(je.url), image: st(je.image), length: st(je.length), percentage: st(je.percentage), position: st(je.position), lookup: rf, "generic-name": st(je.genericName), "family-name": st(je.familyName), number: st(je.number), "line-width": st(je.lineWidth), "absolute-size": st(je.absoluteSize), "relative-size": st(je.relativeSize), shadow: st(je.shadow) }, Zl = Object.keys(nf);
      function Ng(e, t) {
        let n = e.indexOf(t);
        return n === -1 ? [void 0, e] : [e.slice(0, n), e.slice(n + 1)];
      }
      __name(Ng, "Ng");
      __name2(Ng, "Ng");
      function Wg(e, t, n, r) {
        if (dn(t)) {
          let i2 = t.slice(1, -1), [o, s] = Ng(i2, ":");
          if (!/^[\w-_]+$/g.test(o)) s = i2;
          else if (o !== void 0 && !Zl.includes(o)) return [];
          if (s.length > 0 && Zl.includes(o)) return [pn(`[${s}]`, n), o];
        }
        for (let i2 of [].concat(e)) {
          let o = nf[i2](t, n, { tailwindConfig: r });
          if (o !== void 0) return [o, i2];
        }
        return [];
      }
      __name(Wg, "Wg");
      __name2(Wg, "Wg");
    });
    sf = U((ws) => {
      "use strict";
      Object.defineProperty(ws, "__esModule", { value: true });
      Object.defineProperty(ws, "default", { enumerable: true, get: /* @__PURE__ */ __name2(() => Dg, "get") });
      function Dg(e) {
        return typeof e == "function" ? e({}) : e;
      }
      __name(Dg, "Dg");
      __name2(Dg, "Dg");
    });
    cf = U((_s) => {
      "use strict";
      Object.defineProperty(_s, "__esModule", { value: true });
      Object.defineProperty(_s, "default", { enumerable: true, get: /* @__PURE__ */ __name2(() => nb, "get") });
      var Fg = or(no()), Bg = or(pu()), $g = or(hu()), qg = or(so()), Ug = or(gu()), lf = bu(), af = vu(), zg = xu(), Gg = or(wu()), jg = Su(), Vg = of(), Hg = ds(), Yg = or(sf());
      function or(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(or, "or");
      __name2(or, "or");
      function Sr(e) {
        return typeof e == "function";
      }
      __name(Sr, "Sr");
      __name2(Sr, "Sr");
      function hn(e) {
        return typeof e == "object" && e !== null;
      }
      __name(hn, "hn");
      __name2(hn, "hn");
      function mn(e, ...t) {
        let n = t.pop();
        for (let r of t) for (let i2 in r) {
          let o = n(e[i2], r[i2]);
          o === void 0 ? hn(e[i2]) && hn(r[i2]) ? e[i2] = mn(e[i2], r[i2], n) : e[i2] = r[i2] : e[i2] = o;
        }
        return e;
      }
      __name(mn, "mn");
      __name2(mn, "mn");
      var Ss = { colors: Ug.default, negative(e) {
        return Object.keys(e).filter((t) => e[t] !== "0").reduce((t, n) => {
          let r = (0, Fg.default)(e[n]);
          return r !== void 0 && (t[`-${n}`] = r), t;
        }, {});
      }, breakpoints(e) {
        return Object.keys(e).filter((t) => typeof e[t] == "string").reduce((t, n) => ({ ...t, [`screen-${n}`]: e[n] }), {});
      } };
      function Xg(e, ...t) {
        return Sr(e) ? e(...t) : e;
      }
      __name(Xg, "Xg");
      __name2(Xg, "Xg");
      function Qg(e) {
        return e.reduce((t, { extend: n }) => mn(t, n, (r, i2) => r === void 0 ? [i2] : Array.isArray(r) ? [i2, ...r] : [i2, r]), {});
      }
      __name(Qg, "Qg");
      __name2(Qg, "Qg");
      function Kg(e) {
        return { ...e.reduce((t, n) => (0, lf.defaults)(t, n), {}), extend: Qg(e) };
      }
      __name(Kg, "Kg");
      __name2(Kg, "Kg");
      function uf(e, t) {
        if (Array.isArray(e) && hn(e[0])) return e.concat(t);
        if (Array.isArray(t) && hn(t[0]) && hn(e)) return [e, ...t];
        if (Array.isArray(t)) return t;
      }
      __name(uf, "uf");
      __name2(uf, "uf");
      function Jg({ extend: e, ...t }) {
        return mn(t, e, (n, r) => !Sr(n) && !r.some(Sr) ? mn({}, n, ...r, uf) : (i2, o) => mn({}, ...[n, ...r].map((s) => Xg(s, i2, o)), uf));
      }
      __name(Jg, "Jg");
      __name2(Jg, "Jg");
      function* Zg(e) {
        let t = (0, af.toPath)(e);
        if (t.length === 0 || (yield t, Array.isArray(e))) return;
        let n = /^(.*?)\s*\/\s*([^/]+)$/, r = e.match(n);
        if (r !== null) {
          let [, i2, o] = r, s = (0, af.toPath)(i2);
          s.alpha = o, yield s;
        }
      }
      __name(Zg, "Zg");
      __name2(Zg, "Zg");
      function eb(e) {
        let t = /* @__PURE__ */ __name2((n, r) => {
          for (let i2 of Zg(n)) {
            let o = 0, s = e;
            for (; s != null && o < i2.length; ) s = s[i2[o++]], s = Sr(s) && (i2.alpha === void 0 || o <= i2.length - 1) ? s(t, Ss) : s;
            if (s !== void 0) {
              if (i2.alpha !== void 0) {
                let a = (0, Vg.parseColorFormat)(s);
                return (0, Hg.withAlphaValue)(a, i2.alpha, (0, Yg.default)(a));
              }
              return (0, Gg.default)(s) ? (0, jg.cloneDeep)(s) : s;
            }
          }
          return r;
        }, "t");
        return Object.assign(t, { theme: t, ...Ss }), Object.keys(e).reduce((n, r) => (n[r] = Sr(e[r]) ? e[r](t, Ss) : e[r], n), {});
      }
      __name(eb, "eb");
      __name2(eb, "eb");
      function ff(e) {
        let t = [];
        return e.forEach((n) => {
          t = [...t, n];
          var r;
          let i2 = (r = n == null ? void 0 : n.plugins) !== null && r !== void 0 ? r : [];
          i2.length !== 0 && i2.forEach((o) => {
            o.__isOptionsFunction && (o = o());
            var s;
            t = [...t, ...ff([(s = o == null ? void 0 : o.config) !== null && s !== void 0 ? s : {}])];
          });
        }), t;
      }
      __name(ff, "ff");
      __name2(ff, "ff");
      function tb(e) {
        return [...e].reduceRight((n, r) => Sr(r) ? r({ corePlugins: n }) : (0, $g.default)(r, n), Bg.default);
      }
      __name(tb, "tb");
      __name2(tb, "tb");
      function rb(e) {
        return [...e].reduceRight((n, r) => [...n, ...r], []);
      }
      __name(rb, "rb");
      __name2(rb, "rb");
      function nb(e) {
        let t = [...ff(e), { prefix: "", important: false, separator: ":", variantOrder: qg.default.variantOrder }];
        var n, r;
        return (0, zg.normalizeConfig)((0, lf.defaults)({ theme: eb(Jg(Kg(t.map((i2) => (n = i2 == null ? void 0 : i2.theme) !== null && n !== void 0 ? n : {})))), corePlugins: tb(t.map((i2) => i2.corePlugins)), plugins: rb(e.map((i2) => (r = i2 == null ? void 0 : i2.plugins) !== null && r !== void 0 ? r : [])) }, ...t));
      }
      __name(nb, "nb");
      __name2(nb, "nb");
    });
    df = {};
    Rn(df, { default: /* @__PURE__ */ __name2(() => ib, "default") });
    pf = Zt(() => {
      ib = { yellow: /* @__PURE__ */ __name2((e) => e, "yellow") };
    });
    bf = U((Ts) => {
      "use strict";
      Object.defineProperty(Ts, "__esModule", { value: true });
      function ob(e, t) {
        for (var n in t) Object.defineProperty(e, n, { enumerable: true, get: t[n] });
      }
      __name(ob, "ob");
      __name2(ob, "ob");
      ob(Ts, { flagEnabled: /* @__PURE__ */ __name2(() => ub, "flagEnabled"), issueFlagNotices: /* @__PURE__ */ __name2(() => lb, "issueFlagNotices"), default: /* @__PURE__ */ __name2(() => fb, "default") });
      var sb = gf((pf(), Cn(df))), ab = gf((Zn(), Cn(Jn)));
      function gf(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(gf, "gf");
      __name2(gf, "gf");
      var hf = { optimizeUniversalDefaults: false }, gn = { future: ["hoverOnlyWhenSupported", "respectDefaultRingColorOpacity"], experimental: ["optimizeUniversalDefaults", "matchVariant"] };
      function ub(e, t) {
        if (gn.future.includes(t)) {
          var n, r, i2;
          return e.future === "all" || ((i2 = (r = e == null || (n = e.future) === null || n === void 0 ? void 0 : n[t]) !== null && r !== void 0 ? r : hf[t]) !== null && i2 !== void 0 ? i2 : false);
        }
        if (gn.experimental.includes(t)) {
          var o, s, a;
          return e.experimental === "all" || ((a = (s = e == null || (o = e.experimental) === null || o === void 0 ? void 0 : o[t]) !== null && s !== void 0 ? s : hf[t]) !== null && a !== void 0 ? a : false);
        }
        return false;
      }
      __name(ub, "ub");
      __name2(ub, "ub");
      function mf(e) {
        if (e.experimental === "all") return gn.experimental;
        var t;
        return Object.keys((t = e == null ? void 0 : e.experimental) !== null && t !== void 0 ? t : {}).filter((n) => gn.experimental.includes(n) && e.experimental[n]);
      }
      __name(mf, "mf");
      __name2(mf, "mf");
      function lb(e) {
        if (process.env.JEST_WORKER_ID === void 0 && mf(e).length > 0) {
          let t = mf(e).map((n) => sb.default.yellow(n)).join(", ");
          ab.default.warn("experimental-flags-enabled", [`You have enabled experimental features: ${t}`, "Experimental features in Tailwind CSS are not covered by semver, may introduce breaking changes, and can change at any time."]);
        }
      }
      __name(lb, "lb");
      __name2(lb, "lb");
      var fb = gn;
    });
    yf = U((ks) => {
      "use strict";
      Object.defineProperty(ks, "__esModule", { value: true });
      Object.defineProperty(ks, "default", { enumerable: true, get: /* @__PURE__ */ __name2(() => vf, "get") });
      var cb = pb(so()), db = bf();
      function pb(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(pb, "pb");
      __name2(pb, "pb");
      function vf(e) {
        var t;
        let n = ((t = e == null ? void 0 : e.presets) !== null && t !== void 0 ? t : [cb.default]).slice().reverse().flatMap((o) => vf(typeof o == "function" ? o() : o)), r = { respectDefaultRingColorOpacity: { theme: { ringColor: { DEFAULT: "#3b82f67f" } } } }, i2 = Object.keys(r).filter((o) => (0, db.flagEnabled)(e, o)).map((o) => r[o]);
        return [e, ...i2, ...n];
      }
      __name(vf, "vf");
      __name2(vf, "vf");
    });
    wf = U((Es) => {
      "use strict";
      Object.defineProperty(Es, "__esModule", { value: true });
      Object.defineProperty(Es, "default", { enumerable: true, get: /* @__PURE__ */ __name2(() => gb, "get") });
      var hb = xf(cf()), mb = xf(yf());
      function xf(e) {
        return e && e.__esModule ? e : { default: e };
      }
      __name(xf, "xf");
      __name2(xf, "xf");
      function gb(...e) {
        let [, ...t] = (0, mb.default)(e[0]);
        return (0, hb.default)([...e, ...t]);
      }
      __name(gb, "gb");
      __name2(gb, "gb");
    });
    _f = U((n1, Sf) => {
      var Os = wf();
      Sf.exports = (Os.__esModule ? Os : { default: Os }).default;
    });
    Or = /* @__PURE__ */ __name2((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "Or");
    uc = Or((e, t) => {
      t.exports = ["em", "ex", "ch", "rem", "vh", "vw", "vmin", "vmax", "px", "mm", "cm", "in", "pt", "pc", "mozmm"];
    });
    lc = Or((e, t) => {
      t.exports = ["deg", "grad", "rad", "turn"];
    });
    fc = Or((e, t) => {
      t.exports = ["dpi", "dpcm", "dppx"];
    });
    cc = Or((e, t) => {
      t.exports = ["Hz", "kHz"];
    });
    dc = Or((e, t) => {
      t.exports = ["s", "ms"];
    });
    pc = uc();
    Zs = lc();
    ea = fc();
    ta = cc();
    ra = dc();
    __name2(xi, "xi");
    xi.prototype.valueOf = function() {
      return this.value;
    };
    xi.prototype.toString = function() {
      return this.value + (this.unit || "");
    };
    __name2(Lt, "Lt");
    __name2(hc, "hc");
    __name2(yi, "yi");
    mc = [].concat(Zs, ta, pc, ea, ra);
    __name2(gc, "gc");
    bc = Object.assign(Ln(Zs, "angle"), Ln(ta, "frequency"), Ln(ea, "resolution"), Ln(ra, "time"));
    __name2(Ln, "Ln");
    __name2(vc, "vc");
    __name2(dr, "dr");
    __name2(na, "na");
    __name2(_i, "_i");
    __name2(ia, "ia");
    __name2(oa, "oa");
    __name2(sa, "sa");
    __name2(X, "X");
    __name2(Ti, "Ti");
    __name2(Pr, "Pr");
    __name2(Fe, "Fe");
    aa = [32, 160, 4961, 65792, 65793, 4153, 4241, 10].map((e) => String.fromCodePoint(e));
    __name2(De, "De");
    __name2(M, "M");
    __name2(ua, "ua");
    __name2(pr, "pr");
    __name2(Mn, "Mn");
    __name2(la, "la");
    __name2(fa, "fa");
    __name2(Mt, "Mt");
    __name2(zt, "zt");
    __name2(ca, "ca");
    da = /* @__PURE__ */ __name2((e) => e.replaceAll(/([A-Z])/g, (t, n) => `-${n.toLowerCase()}`), "da");
    __name2(Nn, "Nn");
    __name2(Pc, "Pc");
    __name2(Gt, "Gt");
    Ac = "image/avif";
    Ic = "image/webp";
    Fn = "image/apng";
    Bn = "image/png";
    $n = "image/jpeg";
    qn = "image/gif";
    Ni = "image/svg+xml";
    __name2(Ea, "Ea");
    __name2(Oa, "Oa");
    __name2(Pa, "Pa");
    yt = ua(100);
    Ir = /* @__PURE__ */ new Map();
    Rc = [Bn, Fn, $n, qn, Ni];
    __name2(Cc, "Cc");
    __name2(Lc, "Lc");
    __name2(Ta, "Ta");
    __name2(ka, "ka");
    __name2(br, "br");
    __name2(Mc, "Mc");
    __name2(Nc, "Nc");
    Wi = { accentHeight: "accent-height", alignmentBaseline: "alignment-baseline", arabicForm: "arabic-form", baselineShift: "baseline-shift", capHeight: "cap-height", clipPath: "clip-path", clipRule: "clip-rule", colorInterpolation: "color-interpolation", colorInterpolationFilters: "color-interpolation-filters", colorProfile: "color-profile", colorRendering: "color-rendering", dominantBaseline: "dominant-baseline", enableBackground: "enable-background", fillOpacity: "fill-opacity", fillRule: "fill-rule", floodColor: "flood-color", floodOpacity: "flood-opacity", fontFamily: "font-family", fontSize: "font-size", fontSizeAdjust: "font-size-adjust", fontStretch: "font-stretch", fontStyle: "font-style", fontVariant: "font-variant", fontWeight: "font-weight", glyphName: "glyph-name", glyphOrientationHorizontal: "glyph-orientation-horizontal", glyphOrientationVertical: "glyph-orientation-vertical", horizAdvX: "horiz-adv-x", horizOriginX: "horiz-origin-x", href: "href", imageRendering: "image-rendering", letterSpacing: "letter-spacing", lightingColor: "lighting-color", markerEnd: "marker-end", markerMid: "marker-mid", markerStart: "marker-start", overlinePosition: "overline-position", overlineThickness: "overline-thickness", paintOrder: "paint-order", panose1: "panose-1", pointerEvents: "pointer-events", renderingIntent: "rendering-intent", shapeRendering: "shape-rendering", stopColor: "stop-color", stopOpacity: "stop-opacity", strikethroughPosition: "strikethrough-position", strikethroughThickness: "strikethrough-thickness", strokeDasharray: "stroke-dasharray", strokeDashoffset: "stroke-dashoffset", strokeLinecap: "stroke-linecap", strokeLinejoin: "stroke-linejoin", strokeMiterlimit: "stroke-miterlimit", strokeOpacity: "stroke-opacity", strokeWidth: "stroke-width", textAnchor: "text-anchor", textDecoration: "text-decoration", textRendering: "text-rendering", underlinePosition: "underline-position", underlineThickness: "underline-thickness", unicodeBidi: "unicode-bidi", unicodeRange: "unicode-range", unitsPerEm: "units-per-em", vAlphabetic: "v-alphabetic", vHanging: "v-hanging", vIdeographic: "v-ideographic", vMathematical: "v-mathematical", vectorEffect: "vector-effect", vertAdvY: "vert-adv-y", vertOriginX: "vert-origin-x", vertOriginY: "vert-origin-y", wordSpacing: "word-spacing", writingMode: "writing-mode", xHeight: "x-height", xlinkActuate: "xlink:actuate", xlinkArcrole: "xlink:arcrole", xlinkHref: "xlink:href", xlinkRole: "xlink:role", xlinkShow: "xlink:show", xlinkTitle: "xlink:title", xlinkType: "xlink:type", xmlBase: "xml:base", xmlLang: "xml:lang", xmlSpace: "xml:space", xmlnsXlink: "xmlns:xlink" };
    Wc = /[\r\n%#()<>?[\\\]^`{|}"']/g;
    __name2(Di, "Di");
    __name2(Aa, "Aa");
    __name2(Ia, "Ia");
    rt = "flex";
    Ra = { p: { display: rt, marginTop: "1em", marginBottom: "1em" }, div: { display: rt }, blockquote: { display: rt, marginTop: "1em", marginBottom: "1em", marginLeft: 40, marginRight: 40 }, center: { display: rt, textAlign: "center" }, hr: { display: rt, marginTop: "0.5em", marginBottom: "0.5em", marginLeft: "auto", marginRight: "auto", borderWidth: 1, borderStyle: "solid" }, h1: { display: rt, fontSize: "2em", marginTop: "0.67em", marginBottom: "0.67em", marginLeft: 0, marginRight: 0, fontWeight: "bold" }, h2: { display: rt, fontSize: "1.5em", marginTop: "0.83em", marginBottom: "0.83em", marginLeft: 0, marginRight: 0, fontWeight: "bold" }, h3: { display: rt, fontSize: "1.17em", marginTop: "1em", marginBottom: "1em", marginLeft: 0, marginRight: 0, fontWeight: "bold" }, h4: { display: rt, marginTop: "1.33em", marginBottom: "1.33em", marginLeft: 0, marginRight: 0, fontWeight: "bold" }, h5: { display: rt, fontSize: "0.83em", marginTop: "1.67em", marginBottom: "1.67em", marginLeft: 0, marginRight: 0, fontWeight: "bold" }, h6: { display: rt, fontSize: "0.67em", marginTop: "2.33em", marginBottom: "2.33em", marginLeft: 0, marginRight: 0, fontWeight: "bold" }, u: { textDecoration: "underline" }, strong: { fontWeight: "bold" }, b: { fontWeight: "bold" }, i: { fontStyle: "italic" }, em: { fontStyle: "italic" }, code: { fontFamily: "monospace" }, kbd: { fontFamily: "monospace" }, pre: { display: rt, fontFamily: "monospace", whiteSpace: "pre", marginTop: "1em", marginBottom: "1em" }, mark: { backgroundColor: "yellow", color: "black" }, big: { fontSize: "larger" }, small: { fontSize: "smaller" }, s: { textDecoration: "line-through" } };
    Dc = /* @__PURE__ */ new Set(["color", "font", "fontFamily", "fontSize", "fontStyle", "fontWeight", "letterSpacing", "lineHeight", "textAlign", "textTransform", "textShadowOffset", "textShadowColor", "textShadowRadius", "WebkitTextStrokeWidth", "WebkitTextStrokeColor", "textDecorationLine", "textDecorationStyle", "textDecorationColor", "textDecorationSkipInk", "whiteSpace", "transform", "wordBreak", "tabSize", "opacity", "filter", "_viewportWidth", "_viewportHeight", "_inheritedClipPathId", "_inheritedMaskId", "_inheritedBackgroundClipTextPath", "_inheritedBackgroundClipTextHasBackground"]);
    __name2(Fi, "Fi");
    __name2(Bc, "Bc");
    __name2(Bi, "Bi");
    __name2($i, "$i");
    __name2(Rr, "Rr");
    __name2(Ca, "Ca");
    jc = /* @__PURE__ */ new Set(["flex", "flexGrow", "flexShrink", "flexBasis", "fontWeight", "lineHeight", "opacity", "scale", "scaleX", "scaleY"]);
    Vc = /* @__PURE__ */ new Set(["lineHeight"]);
    __name2(Hc, "Hc");
    __name2(er, "er");
    __name2(Yc, "Yc");
    __name2(La, "La");
    Ma = /rgb\((\d+)\s+(\d+)\s+(\d+)\s*\/\s*([\.\d]+)\)/;
    __name2(Wa, "Wa");
    __name2(Un, "Un");
    __name2(Xc, "Xc");
    __name2(Na, "Na");
    __name2(Qc, "Qc");
    __name2(Kc, "Kc");
    __name2(Jc, "Jc");
    __name2(qi, "qi");
    Da = [1, 0, 0, 1, 0, 0];
    __name2(Zc, "Zc");
    __name2(Cr, "Cr");
    __name2(Ba, "Ba");
    __name2(Ui, "Ui");
    __name2(ed, "ed");
    zn = 1.1;
    __name2($a, "$a");
    __name2(qa, "qa");
    __name2(td2, "td");
    __name2(zi, "zi");
    __name2(Gi, "Gi");
    tr = Gi("U+0020");
    ji = Gi("U+0009");
    vr = Gi("U+2026");
    __name2(Ua, "Ua");
    __name2(za, "za");
    __name2(rd, "rd");
    __name2(nd, "nd");
    __name2(id, "id");
    __name2(od, "od");
    __name2(sd, "sd");
    ad = /* @__PURE__ */ new Set([ji]);
    __name2(ud, "ud");
    __name2(Vi, "Vi");
    __name2(Ga, "Ga");
    __name2(Hi, "Hi");
    __name2(ld, "ld");
    __name2(fd2, "fd");
    __name2(Gn, "Gn");
    __name2(Va, "Va");
    __name2(pd, "pd");
    __name2(hd, "hd");
    __name2(md, "md");
    __name2(gd, "gd");
    __name2(Ya, "Ya");
    __name2(vd, "vd");
    __name2(yd, "yd");
    __name2(Ha, "Ha");
    __name2(xd, "xd");
    __name2(wd, "wd");
    __name2(jn, "jn");
    __name2(Xa, "Xa");
    __name2(Sd, "Sd");
    __name2(_d, "_d");
    __name2(Yi, "Yi");
    __name2(Lr, "Lr");
    __name2(Td, "Td");
    __name2(Vn, "Vn");
    __name2(Hn, "Hn");
    __name2(Yn, "Yn");
    Xn = /* @__PURE__ */ __name2((e) => e && e[0] !== 0 && e[1] !== 0, "Xn");
    __name2(Ka, "Ka");
    __name2(Vt, "Vt");
    __name2(Ja, "Ja");
    __name2(Za, "Za");
    __name2(Mr, "Mr");
    __name2(Xi, "Xi");
    Nr = { circle: /circle\((.+)\)/, ellipse: /ellipse\((.+)\)/, path: /path\((.+)\)/, polygon: /polygon\((.+)\)/, inset: /inset\((.+)\)/ };
    __name2(nu, "nu");
    __name2(tu, "tu");
    __name2(ru, "ru");
    __name2(Qn, "Qn");
    __name2(iu, "iu");
    __name2(ou, "ou");
    __name2(Qi, "Qi");
    kd = /* @__PURE__ */ __name2((e) => `satori_mi-${e}`, "kd");
    __name2(Ki, "Ki");
    __name2(Wr, "Wr");
    au = String.raw;
    su = au`\p{Emoji}(?:\p{EMod}|[\u{E0020}-\u{E007E}]+\u{E007F}|\uFE0F?\u20E3?)`;
    uu = /* @__PURE__ */ __name2(() => new RegExp(au`\p{RI}{2}|(?![#*\d](?!\uFE0F?\u20E3))${su}(?:\u200D${su})*`, "gu"), "uu");
    Ed = new RegExp(uu(), "u");
    Ji = { emoji: Ed, symbol: /\p{Symbol}/u, math: /\p{Math}/u };
    Zi = { "ja-JP": /\p{scx=Hira}|\p{scx=Kana}|\p{scx=Han}|[\u3000]|[\uFF00-\uFFEF]/u, "ko-KR": /\p{scx=Hangul}/u, "zh-CN": /\p{scx=Han}/u, "zh-TW": /\p{scx=Han}/u, "zh-HK": /\p{scx=Han}/u, "th-TH": /\p{scx=Thai}/u, "bn-IN": /\p{scx=Bengali}/u, "ar-AR": /\p{scx=Arabic}/u, "ta-IN": /\p{scx=Tamil}/u, "ml-IN": /\p{scx=Malayalam}/u, "he-IL": /\p{scx=Hebrew}/u, "te-IN": /\p{scx=Telugu}/u, devanagari: /\p{scx=Devanagari}/u, kannada: /\p{scx=Kannada}/u };
    Kn = Object.keys({ ...Zi, ...Ji });
    __name2(lu, "lu");
    __name2(fu, "fu");
    __name2(cu, "cu");
    __name2(Dr, "Dr");
    du = "unknown";
    __name2(Od, "Od");
    __name2(Pd, "Pd");
    __name2(Ad, "Ad");
    __name2(Id, "Id");
    eo = /* @__PURE__ */ new WeakMap();
    Br = class {
      static {
        __name(this, "Br");
      }
      static {
        __name2(this, "Br");
      }
      constructor(t) {
        this.fonts = /* @__PURE__ */ new Map();
        this.addFonts(t);
      }
      get({ name: t, weight: n, style: r }) {
        if (!this.fonts.has(t)) return null;
        n === "normal" && (n = 400), n === "bold" && (n = 700), typeof n == "string" && (n = Number.parseInt(n, 10));
        let i2 = [...this.fonts.get(t)], o = i2[0];
        for (let s = 1; s < i2.length; s++) {
          let [, a, u2] = o, [, f, l2] = i2[s];
          Id(n, r, [a, u2], [f, l2]) > 0 && (o = i2[s]);
        }
        return o[0];
      }
      addFonts(t) {
        for (let n of t) {
          let { name: r, data: i2, lang: o } = n;
          if (o && !lu(o)) throw new Error(`Invalid value for props \`lang\`: "${o}". The value must be one of the following: ${Kn.join(", ")}.`);
          let s = o ?? du, a;
          if (eo.has(i2)) a = eo.get(i2);
          else {
            a = opentype_module_default.parse("buffer" in i2 ? i2.buffer.slice(i2.byteOffset, i2.byteOffset + i2.byteLength) : i2, { lowMemory: true });
            let f = a.charToGlyphIndex;
            a.charToGlyphIndex = (l2) => {
              let p = f.call(a, l2);
              return p === 0 && a._trackBrokenChars && a._trackBrokenChars.push(l2), p;
            }, eo.set(i2, a);
          }
          this.defaultFont || (this.defaultFont = a);
          let u2 = `${r.toLowerCase()}_${s}`;
          this.fonts.has(u2) || this.fonts.set(u2, []), this.fonts.get(u2).push([a, n.weight, n.style]);
        }
      }
      getEngine(t = 16, n = "normal", { fontFamily: r = "sans-serif", fontWeight: i2 = 400, fontStyle: o = "normal" }, s) {
        if (!this.fonts.size) throw new Error("No fonts are loaded. At least one font is required to calculate the layout.");
        r = (Array.isArray(r) ? r : [r]).map((w2) => w2.toLowerCase());
        let a = [];
        r.forEach((w2) => {
          let T = this.get({ name: w2, weight: i2, style: o });
          if (T) {
            a.push(T);
            return;
          }
          let O = this.get({ name: w2 + "_unknown", weight: i2, style: o });
          if (O) {
            a.push(O);
            return;
          }
        });
        let u2 = Array.from(this.fonts.keys()), f = [], l2 = [], p = [];
        for (let w2 of u2) if (!r.includes(w2)) if (s) {
          let T = Rd(w2);
          T ? T === s ? f.push(this.get({ name: w2, weight: i2, style: o })) : l2.push(this.get({ name: w2, weight: i2, style: o })) : p.push(this.get({ name: w2, weight: i2, style: o }));
        } else p.push(this.get({ name: w2, weight: i2, style: o }));
        let h2 = /* @__PURE__ */ new Map(), g2 = /* @__PURE__ */ __name2((w2, T = true) => {
          let O = [...a, ...p, ...f, ...T ? l2 : []];
          if (typeof w2 > "u") return T ? O[O.length - 1] : void 0;
          let C = w2.charCodeAt(0);
          if (h2.has(C)) return h2.get(C);
          let D = O.find((q, Y) => !!q.charToGlyphIndex(w2) || T && Y === O.length - 1);
          return D && h2.set(C, D), D;
        }, "g"), b = /* @__PURE__ */ __name2((w2, T = false) => {
          var C, D;
          return ((T ? (D = (C = w2.tables) == null ? void 0 : C.os2) == null ? void 0 : D.sTypoAscender : 0) || w2.ascender) / w2.unitsPerEm * t;
        }, "b"), y = /* @__PURE__ */ __name2((w2, T = false) => {
          var C, D;
          return ((T ? (D = (C = w2.tables) == null ? void 0 : C.os2) == null ? void 0 : D.sTypoDescender : 0) || w2.descender) / w2.unitsPerEm * t;
        }, "y"), k = /* @__PURE__ */ __name2((w2, T = false) => {
          var O, C;
          if (typeof n == "string" && n === "normal") {
            let D = (T ? (C = (O = w2.tables) == null ? void 0 : O.os2) == null ? void 0 : C.sTypoLineGap : 0) || 0;
            return b(w2, T) - y(w2, T) + D / w2.unitsPerEm * t;
          } else if (typeof n == "number") return t * n;
        }, "k"), S2 = /* @__PURE__ */ __name2((w2) => g2(w2, false), "S");
        return { has: /* @__PURE__ */ __name2((w2) => {
          if (w2 === `
`) return true;
          let T = S2(w2);
          return T ? (T._trackBrokenChars = [], T.stringToGlyphs(w2), T._trackBrokenChars.length ? (T._trackBrokenChars = void 0, false) : true) : false;
        }, "has"), baseline: /* @__PURE__ */ __name2((w2, T = typeof w2 > "u" ? a[0] : g2(w2)) => {
          let O = b(T), C = y(T), D = O - C;
          return O + (k(T) - D) / 2;
        }, "baseline"), height: /* @__PURE__ */ __name2((w2, T = typeof w2 > "u" ? a[0] : g2(w2)) => k(T), "height"), measure: /* @__PURE__ */ __name2((w2, T) => this.measure(g2, w2, T), "measure"), getSVG: /* @__PURE__ */ __name2((w2, T, O) => this.getSVG(g2, w2, T, O), "getSVG") };
      }
      patchFontFallbackResolver(t, n) {
        let r = [];
        t._trackBrokenChars = r;
        let i2 = t.stringToGlyphs;
        return t.stringToGlyphs = (o, ...s) => {
          let a = i2.call(t, o, ...s);
          for (let u2 = 0; u2 < a.length; u2++) if (a[u2].unicode === void 0) {
            let f = r.shift(), l2 = n(f);
            if (l2 !== t) {
              let p = l2.charToGlyph(f), h2 = t.unitsPerEm / l2.unitsPerEm, g2 = new opentype_module_default.Path();
              g2.unitsPerEm = t.unitsPerEm, g2.commands = p.path.commands.map((y) => {
                let k = { ...y };
                for (let S2 in k) typeof k[S2] == "number" && (k[S2] *= h2);
                return k;
              });
              let b = new opentype_module_default.Glyph({ ...p, advanceWidth: p.advanceWidth * h2, xMin: p.xMin * h2, xMax: p.xMax * h2, yMin: p.yMin * h2, yMax: p.yMax * h2, path: g2 });
              a[u2] = b;
            }
          }
          return a;
        }, () => {
          t.stringToGlyphs = i2, t._trackBrokenChars = void 0;
        };
      }
      measure(t, n, { fontSize: r, letterSpacing: i2 = 0 }) {
        let o = t(n), s = this.patchFontFallbackResolver(o, t);
        try {
          return o.getAdvanceWidth(n, r, { letterSpacing: i2 / r });
        } finally {
          s();
        }
      }
      getSVG(t, n, { fontSize: r, top: i2, left: o, letterSpacing: s = 0 }, a) {
        let u2 = t(n), f = this.patchFontFallbackResolver(u2, t);
        try {
          if (r === 0) return { path: "", boxes: [] };
          let l2 = new opentype_module_default.Path(), p = [], h2 = { letterSpacing: s / r }, g2 = /* @__PURE__ */ new WeakMap();
          return u2.forEachGlyph(n.replace(/\n/g, ""), o, i2, r, h2, function(b, y, k, S2) {
            let I;
            if (!g2.has(b)) I = b.getPath(y, k, S2, h2), g2.set(b, [y, k, I]);
            else {
              let [T, O, C] = g2.get(b);
              I = new opentype_module_default.Path(), I.commands = C.commands.map((D) => {
                let q = { ...D };
                for (let Y in q) typeof q[Y] == "number" && ((Y === "x" || Y === "x1" || Y === "x2") && (q[Y] += y - T), (Y === "y" || Y === "y1" || Y === "y2") && (q[Y] += k - O));
                return q;
              });
            }
            let w2 = a ? Ad(I.commands, a) : [];
            w2.length && p.push(...w2), l2.extend(I);
          }), { path: l2.toPathData(1), boxes: p };
        } finally {
          f();
        }
      }
    };
    __name2(Rd, "Rd");
    __name2(to, "to");
    Vf = ac(_f());
    bb = ["ios", "android", "windows", "macos", "web"];
    __name2(kf, "kf");
    vb = ["portrait", "landscape"];
    __name2(Ef, "Ef");
    (function(e) {
      e.fontSize = "fontSize", e.lineHeight = "lineHeight";
    })(Tf || (Tf = {}));
    (function(e) {
      e.rem = "rem", e.em = "em", e.px = "px", e.percent = "%", e.vw = "vw", e.vh = "vh", e.none = "<no-css-unit>";
    })(ne || (ne = {}));
    __name2(Ps, "Ps");
    __name2(As, "As");
    __name2(_, "_");
    __name2(Ae, "Ae");
    __name2(Bt, "Bt");
    __name2(mi, "mi");
    __name2(Pf, "Pf");
    __name2(wt, "wt");
    __name2(Qt, "Qt");
    __name2(Rs, "Rs");
    yb = { t: "Top", tr: "TopRight", tl: "TopLeft", b: "Bottom", br: "BottomRight", bl: "BottomLeft", l: "Left", r: "Right", x: "Horizontal", y: "Vertical" };
    __name2(Cs, "Cs");
    __name2(Ls, "Ls");
    __name2(sr, "sr");
    __name2(at, "at");
    __name2(Of, "Of");
    __name2(xb, "xb");
    __name2(wb, "wb");
    Ve = typeof process > "u" || ((Is = process == null ? void 0 : process.env) === null || Is === void 0 ? void 0 : Is.JEST_WORKER_ID) === void 0 ? xb : wb;
    Sb = [["aspect-square", _({ aspectRatio: 1 })], ["aspect-video", _({ aspectRatio: 16 / 9 })], ["items-center", _({ alignItems: "center" })], ["items-start", _({ alignItems: "flex-start" })], ["items-end", _({ alignItems: "flex-end" })], ["items-baseline", _({ alignItems: "baseline" })], ["items-stretch", _({ alignItems: "stretch" })], ["justify-start", _({ justifyContent: "flex-start" })], ["justify-end", _({ justifyContent: "flex-end" })], ["justify-center", _({ justifyContent: "center" })], ["justify-between", _({ justifyContent: "space-between" })], ["justify-around", _({ justifyContent: "space-around" })], ["justify-evenly", _({ justifyContent: "space-evenly" })], ["content-start", _({ alignContent: "flex-start" })], ["content-end", _({ alignContent: "flex-end" })], ["content-between", _({ alignContent: "space-between" })], ["content-around", _({ alignContent: "space-around" })], ["content-stretch", _({ alignContent: "stretch" })], ["content-center", _({ alignContent: "center" })], ["self-auto", _({ alignSelf: "auto" })], ["self-start", _({ alignSelf: "flex-start" })], ["self-end", _({ alignSelf: "flex-end" })], ["self-center", _({ alignSelf: "center" })], ["self-stretch", _({ alignSelf: "stretch" })], ["self-baseline", _({ alignSelf: "baseline" })], ["direction-inherit", _({ direction: "inherit" })], ["direction-ltr", _({ direction: "ltr" })], ["direction-rtl", _({ direction: "rtl" })], ["hidden", _({ display: "none" })], ["flex", _({ display: "flex" })], ["flex-row", _({ flexDirection: "row" })], ["flex-row-reverse", _({ flexDirection: "row-reverse" })], ["flex-col", _({ flexDirection: "column" })], ["flex-col-reverse", _({ flexDirection: "column-reverse" })], ["flex-wrap", _({ flexWrap: "wrap" })], ["flex-wrap-reverse", _({ flexWrap: "wrap-reverse" })], ["flex-nowrap", _({ flexWrap: "nowrap" })], ["flex-auto", _({ flexGrow: 1, flexShrink: 1, flexBasis: "auto" })], ["flex-initial", _({ flexGrow: 0, flexShrink: 1, flexBasis: "auto" })], ["flex-none", _({ flexGrow: 0, flexShrink: 0, flexBasis: "auto" })], ["overflow-hidden", _({ overflow: "hidden" })], ["overflow-visible", _({ overflow: "visible" })], ["overflow-scroll", _({ overflow: "scroll" })], ["absolute", _({ position: "absolute" })], ["relative", _({ position: "relative" })], ["italic", _({ fontStyle: "italic" })], ["not-italic", _({ fontStyle: "normal" })], ["oldstyle-nums", bn("oldstyle-nums")], ["small-caps", bn("small-caps")], ["lining-nums", bn("lining-nums")], ["tabular-nums", bn("tabular-nums")], ["proportional-nums", bn("proportional-nums")], ["font-thin", _({ fontWeight: "100" })], ["font-100", _({ fontWeight: "100" })], ["font-extralight", _({ fontWeight: "200" })], ["font-200", _({ fontWeight: "200" })], ["font-light", _({ fontWeight: "300" })], ["font-300", _({ fontWeight: "300" })], ["font-normal", _({ fontWeight: "normal" })], ["font-400", _({ fontWeight: "400" })], ["font-medium", _({ fontWeight: "500" })], ["font-500", _({ fontWeight: "500" })], ["font-semibold", _({ fontWeight: "600" })], ["font-600", _({ fontWeight: "600" })], ["font-bold", _({ fontWeight: "bold" })], ["font-700", _({ fontWeight: "700" })], ["font-extrabold", _({ fontWeight: "800" })], ["font-800", _({ fontWeight: "800" })], ["font-black", _({ fontWeight: "900" })], ["font-900", _({ fontWeight: "900" })], ["include-font-padding", _({ includeFontPadding: true })], ["remove-font-padding", _({ includeFontPadding: false })], ["max-w-none", _({ maxWidth: "99999%" })], ["text-left", _({ textAlign: "left" })], ["text-center", _({ textAlign: "center" })], ["text-right", _({ textAlign: "right" })], ["text-justify", _({ textAlign: "justify" })], ["text-auto", _({ textAlign: "auto" })], ["underline", _({ textDecorationLine: "underline" })], ["line-through", _({ textDecorationLine: "line-through" })], ["no-underline", _({ textDecorationLine: "none" })], ["uppercase", _({ textTransform: "uppercase" })], ["lowercase", _({ textTransform: "lowercase" })], ["capitalize", _({ textTransform: "capitalize" })], ["normal-case", _({ textTransform: "none" })], ["w-auto", _({ width: "auto" })], ["h-auto", _({ height: "auto" })], ["shadow-sm", _({ shadowOffset: { width: 1, height: 1 }, shadowColor: "#000", shadowRadius: 1, shadowOpacity: 0.025, elevation: 1 })], ["shadow", _({ shadowOffset: { width: 1, height: 1 }, shadowColor: "#000", shadowRadius: 1, shadowOpacity: 0.075, elevation: 2 })], ["shadow-md", _({ shadowOffset: { width: 1, height: 1 }, shadowColor: "#000", shadowRadius: 3, shadowOpacity: 0.125, elevation: 3 })], ["shadow-lg", _({ shadowOffset: { width: 1, height: 1 }, shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 8, elevation: 8 })], ["shadow-xl", _({ shadowOffset: { width: 1, height: 1 }, shadowColor: "#000", shadowOpacity: 0.19, shadowRadius: 20, elevation: 12 })], ["shadow-2xl", _({ shadowOffset: { width: 1, height: 1 }, shadowColor: "#000", shadowOpacity: 0.25, shadowRadius: 30, elevation: 16 })], ["shadow-none", _({ shadowOffset: { width: 0, height: 0 }, shadowColor: "#000", shadowRadius: 0, shadowOpacity: 0, elevation: 0 })]];
    Ms = Sb;
    __name2(bn, "bn");
    vn = class {
      static {
        __name(this, "vn");
      }
      static {
        __name2(this, "vn");
      }
      constructor(t) {
        this.ir = new Map(Ms), this.styles = /* @__PURE__ */ new Map(), this.prefixes = /* @__PURE__ */ new Map(), this.ir = new Map([...Ms, ...t ?? []]);
      }
      getStyle(t) {
        return this.styles.get(t);
      }
      setStyle(t, n) {
        this.styles.set(t, n);
      }
      getIr(t) {
        return this.ir.get(t);
      }
      setIr(t, n) {
        this.ir.set(t, n);
      }
      getPrefixMatch(t) {
        return this.prefixes.get(t);
      }
      setPrefixMatch(t, n) {
        this.prefixes.set(t, n);
      }
    };
    __name2(Ns, "Ns");
    __name2(Af, "Af");
    __name2(Ws, "Ws");
    __name2(Ds, "Ds");
    __name2(If, "If");
    __name2(Rf, "Rf");
    __name2(Fs, "Fs");
    __name2(Bs, "Bs");
    __name2(ar, "ar");
    __name2(yn, "yn");
    __name2(Cf, "Cf");
    __name2(Lf, "Lf");
    gi = { bg: { opacity: "__opacity_bg", color: "backgroundColor" }, text: { opacity: "__opacity_text", color: "color" }, border: { opacity: "__opacity_border", color: "borderColor" }, borderTop: { opacity: "__opacity_border", color: "borderTopColor" }, borderBottom: { opacity: "__opacity_border", color: "borderBottomColor" }, borderLeft: { opacity: "__opacity_border", color: "borderLeftColor" }, borderRight: { opacity: "__opacity_border", color: "borderRightColor" }, shadow: { opacity: "__opacity_shadow", color: "shadowColor" }, tint: { opacity: "__opacity_tint", color: "tintColor" } };
    __name2(_b2, "_b");
    __name2(Mf, "Mf");
    Tb = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    kb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
    __name2(Wf, "Wf");
    __name2(Eb, "Eb");
    __name2(Df, "Df");
    __name2(Nf, "Nf");
    __name2(_r, "_r");
    __name2(Ff, "Ff");
    __name2(xn, "xn");
    __name2(Bf, "Bf");
    __name2($s, "$s");
    __name2(wn, "wn");
    __name2($f, "$f");
    __name2(Ob, "Ob");
    __name2(qf, "qf");
    __name2(Uf, "Uf");
    __name2(zf, "zf");
    __name2(qs, "qs");
    Tr = class {
      static {
        __name(this, "Tr");
      }
      static {
        __name2(this, "Tr");
      }
      constructor(t, n = {}, r, i2, o) {
        var s, a, u2, f, l2, p;
        this.config = n, this.cache = r, this.position = 0, this.isNull = false, this.isNegative = false, this.context = {}, this.context.device = i2;
        let h2 = t.trim().split(":"), g2 = [];
        h2.length === 1 ? this.string = t : (this.string = (s = h2.pop()) !== null && s !== void 0 ? s : "", g2 = h2), this.char = this.string[0];
        let b = Fs((a = this.config.theme) === null || a === void 0 ? void 0 : a.screens);
        for (let y of g2) if (b[y]) {
          let k = (u2 = b[y]) === null || u2 === void 0 ? void 0 : u2[2];
          k !== void 0 && (this.order = ((f = this.order) !== null && f !== void 0 ? f : 0) + k);
          let S2 = (l2 = i2.windowDimensions) === null || l2 === void 0 ? void 0 : l2.width;
          if (S2) {
            let [I, w2] = (p = b[y]) !== null && p !== void 0 ? p : [0, 0];
            (S2 <= I || S2 > w2) && (this.isNull = true);
          } else this.isNull = true;
        } else kf(y) ? this.isNull = y !== o : Ef(y) ? i2.windowDimensions ? (i2.windowDimensions.width > i2.windowDimensions.height ? "landscape" : "portrait") !== y ? this.isNull = true : this.incrementOrder() : this.isNull = true : y === "retina" ? i2.pixelDensity === 2 ? this.incrementOrder() : this.isNull = true : y === "dark" ? i2.colorScheme !== "dark" ? this.isNull = true : this.incrementOrder() : this.handlePossibleArbitraryBreakpointPrefix(y) || (this.isNull = true);
      }
      parse() {
        if (this.isNull) return { kind: "null" };
        let t = this.cache.getIr(this.rest);
        if (t) return t;
        this.parseIsNegative();
        let n = this.parseUtility();
        return n ? this.order !== void 0 ? { kind: "ordered", order: this.order, styleIr: n } : n : { kind: "null" };
      }
      parseUtility() {
        var t, n, r, i2, o;
        let s = this.config.theme, a = null;
        switch (this.char) {
          case "m":
          case "p": {
            let u2 = this.peekSlice(1, 3).match(/^(t|b|r|l|x|y)?-/);
            if (u2) {
              let f = this.char === "m" ? "margin" : "padding";
              this.advance(((n = (t = u2[0]) === null || t === void 0 ? void 0 : t.length) !== null && n !== void 0 ? n : 0) + 1);
              let l2 = Cs(u2[1]), p = Ds(f, l2, this.isNegative, this.rest, (r = this.config.theme) === null || r === void 0 ? void 0 : r[f]);
              if (p) return p;
            }
          }
        }
        if (this.consumePeeked("h-") && (a = $s("height", this.rest, this.context, s == null ? void 0 : s.height), a) || this.consumePeeked("w-") && (a = $s("width", this.rest, this.context, s == null ? void 0 : s.width), a) || this.consumePeeked("min-w-") && (a = wn("minWidth", this.rest, this.context, s == null ? void 0 : s.minWidth), a) || this.consumePeeked("min-h-") && (a = wn("minHeight", this.rest, this.context, s == null ? void 0 : s.minHeight), a) || this.consumePeeked("max-w-") && (a = wn("maxWidth", this.rest, this.context, s == null ? void 0 : s.maxWidth), a) || this.consumePeeked("max-h-") && (a = wn("maxHeight", this.rest, this.context, s == null ? void 0 : s.maxHeight), a) || this.consumePeeked("leading-") && (a = Ws(this.rest, s == null ? void 0 : s.lineHeight), a) || this.consumePeeked("text-") && (a = Ns(this.rest, s == null ? void 0 : s.fontSize, this.context), a || (a = ar("text", this.rest, s == null ? void 0 : s.textColor), a) || this.consumePeeked("opacity-") && (a = yn("text", this.rest), a)) || this.consumePeeked("font-") && (a = Bs(this.rest, s == null ? void 0 : s.fontFamily), a) || this.consumePeeked("aspect-") && (this.consumePeeked("ratio-") && Ve("`aspect-ratio-{ratio}` is deprecated, use `aspect-{ratio}` instead"), a = Bt("aspectRatio", this.rest, { fractions: true }), a) || this.consumePeeked("tint-") && (a = ar("tint", this.rest, s == null ? void 0 : s.colors), a) || this.consumePeeked("bg-") && (a = ar("bg", this.rest, s == null ? void 0 : s.backgroundColor), a || this.consumePeeked("opacity-") && (a = yn("bg", this.rest), a)) || this.consumePeeked("border") && (a = Wf(this.rest, s), a || this.consumePeeked("-opacity-") && (a = yn("border", this.rest), a)) || this.consumePeeked("rounded") && (a = Df(this.rest, s == null ? void 0 : s.borderRadius), a) || this.consumePeeked("bottom-") && (a = _r("bottom", this.rest, this.isNegative, s == null ? void 0 : s.inset), a) || this.consumePeeked("top-") && (a = _r("top", this.rest, this.isNegative, s == null ? void 0 : s.inset), a) || this.consumePeeked("left-") && (a = _r("left", this.rest, this.isNegative, s == null ? void 0 : s.inset), a) || this.consumePeeked("right-") && (a = _r("right", this.rest, this.isNegative, s == null ? void 0 : s.inset), a) || this.consumePeeked("inset-") && (a = _r("inset", this.rest, this.isNegative, s == null ? void 0 : s.inset), a) || this.consumePeeked("flex-") && (this.consumePeeked("grow") ? a = xn("Grow", this.rest, s == null ? void 0 : s.flexGrow) : this.consumePeeked("shrink") ? a = xn("Shrink", this.rest, s == null ? void 0 : s.flexShrink) : a = Bf(this.rest, s == null ? void 0 : s.flex), a) || this.consumePeeked("grow") && (a = xn("Grow", this.rest, s == null ? void 0 : s.flexGrow), a) || this.consumePeeked("shrink") && (a = xn("Shrink", this.rest, s == null ? void 0 : s.flexShrink), a) || this.consumePeeked("shadow-color-opacity-") && (a = yn("shadow", this.rest), a) || this.consumePeeked("shadow-opacity-") && (a = Uf(this.rest), a) || this.consumePeeked("shadow-offset-") && (a = zf(this.rest), a) || this.consumePeeked("shadow-radius-") && (a = at("shadowRadius", this.rest), a) || this.consumePeeked("shadow-") && (a = ar("shadow", this.rest, s == null ? void 0 : s.colors), a)) return a;
        if (this.consumePeeked("elevation-")) {
          let u2 = parseInt(this.rest, 10);
          if (!Number.isNaN(u2)) return _({ elevation: u2 });
        }
        if (this.consumePeeked("opacity-") && (a = qf(this.rest, s == null ? void 0 : s.opacity), a) || this.consumePeeked("tracking-") && (a = $f(this.rest, this.isNegative, s == null ? void 0 : s.letterSpacing), a)) return a;
        if (this.consumePeeked("z-")) {
          let u2 = Number((o = (i2 = s == null ? void 0 : s.zIndex) === null || i2 === void 0 ? void 0 : i2[this.rest]) !== null && o !== void 0 ? o : this.rest);
          if (!Number.isNaN(u2)) return _({ zIndex: u2 });
        }
        return Ve(`\`${this.rest}\` unknown or invalid utility`), null;
      }
      handlePossibleArbitraryBreakpointPrefix(t) {
        var n;
        if (t[0] !== "m") return false;
        let r = t.match(/^(min|max)-(w|h)-\[([^\]]+)\]$/);
        if (!r) return false;
        if (!(!((n = this.context.device) === null || n === void 0) && n.windowDimensions)) return this.isNull = true, true;
        let i2 = this.context.device.windowDimensions, [, o = "", s = "", a = ""] = r, u2 = s === "w" ? i2.width : i2.height, f = Ae(a, this.context);
        if (f === null) return this.isNull = true, true;
        let [l2, p] = f;
        return p !== "px" && (this.isNull = true), (o === "min" ? u2 >= l2 : u2 <= l2) ? this.incrementOrder() : this.isNull = true, true;
      }
      advance(t = 1) {
        this.position += t, this.char = this.string[this.position];
      }
      get rest() {
        return this.peekSlice(0, this.string.length);
      }
      peekSlice(t, n) {
        return this.string.slice(this.position + t, this.position + n);
      }
      consumePeeked(t) {
        return this.peekSlice(0, t.length) === t ? (this.advance(t.length), true) : false;
      }
      parseIsNegative() {
        this.char === "-" && (this.advance(), this.isNegative = true, this.context.isNegative = true);
      }
      incrementOrder() {
        var t;
        this.order = ((t = this.order) !== null && t !== void 0 ? t : 0) + 1;
      }
    };
    __name2(Gf, "Gf");
    __name2(Us, "Us");
    __name2(Pb, "Pb");
    __name2(jf, "jf");
    __name2(Ab, "Ab");
    __name2(St, "St");
    Ib = { addComponents: St, addBase: St, addVariant: St, e: St, prefix: St, theme: St, variants: St, config: St, corePlugins: St, matchUtilities: St, postcss: null };
    __name2(Hf, "Hf");
    __name2(Rb, "Rb");
    Lb = { handler: /* @__PURE__ */ __name2(({ addUtilities: e }) => {
      e({ "shadow-sm": { boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)" }, shadow: { boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)" }, "shadow-md": { boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)" }, "shadow-lg": { boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" }, "shadow-xl": { boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }, "shadow-2xl": { boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.25)" }, "shadow-inner": { boxShadow: "inset 0 2px 4px 0 rgb(0 0 0 / 0.05)" }, "shadow-none": { boxShadow: "0 0 #0000" } });
    }, "handler") };
    __name2(Mb, "Mb");
    __name2(zs, "zs");
    Gs = /* @__PURE__ */ new WeakMap();
    __name2(Xf, "Xf");
    __name2(Nb, "Nb");
    __name2(Wb, "Wb");
    __name2(Yf, "Yf");
  }
});
async function initSatori(input) {
  if (initSatori.initialized) {
    throw new Error("(@cf-wasm/satori): Function already called. The `initSatori()` function can be used only once.");
  }
  if (!input) {
    throw new Error("(@cf-wasm/satori): Argument `input` is not valid.");
  }
  initSatori.initialized = true;
  initSatori.promise = (async () => {
    await Pc(await input);
    initSatori.ready = true;
  })();
  return initSatori.promise;
}
__name(initSatori, "initSatori");
async function satori(element, options) {
  await initSatori.ensure();
  return Xf(element, options);
}
__name(satori, "satori");
var init_chunk_A2OS6YKP = __esm({
  "../node_modules/@cf-wasm/satori/dist/chunk-A2OS6YKP.js"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_standalone();
    __name2(initSatori, "initSatori");
    initSatori.promise = null;
    initSatori.initialized = false;
    initSatori.ready = false;
    initSatori.ensure = async () => {
      if (!initSatori.promise) {
        throw new Error("(@cf-wasm/satori): Function not called. Call `initSatori()` function first.");
      }
      return initSatori.promise;
    };
    __name2(satori, "satori");
  }
});
var workerd_exports2 = {};
__export(workerd_exports2, {
  default: /* @__PURE__ */ __name(() => workerd_default, "default"),
  initSatori: /* @__PURE__ */ __name(() => initSatori, "initSatori"),
  satori: /* @__PURE__ */ __name(() => satori, "satori"),
  yogaWasmModule: /* @__PURE__ */ __name(() => yogaWasmModule, "yogaWasmModule")
});
var workerd_default;
var init_workerd2 = __esm({
  "../node_modules/@cf-wasm/satori/dist/workerd.js"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_chunk_A2OS6YKP();
    initSatori(yogaWasmModule);
    workerd_default = satori;
  }
});
var init_workerd3 = __esm({
  "../node_modules/@cf-wasm/og/dist/workerd.js"() {
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_chunk_F4YVNV3Y();
    init_chunk_5NA2TFPG();
    init_chunk_YPHVUSHP();
    init_workerd();
    init_workerd2();
    modules.set(workerd_exports, workerd_exports2);
    defaultFont.set(noto_sans_v27_latin_regular_ttf_bin_inline_default);
  }
});
async function fetchFont() {
  return fetch(
    "https://cdn.jsdelivr.net/npm/@fontsource/noto-sans-jp@5/files/noto-sans-jp-japanese-700-normal.woff"
  ).then((r) => r.arrayBuffer());
}
__name(fetchFont, "fetchFont");
var onRequest;
var init_og = __esm({
  "api/og.ts"() {
    "use strict";
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    init_workerd3();
    __name2(fetchFont, "fetchFont");
    onRequest = /* @__PURE__ */ __name2(async (context22) => {
      const url = new URL(context22.request.url);
      const pt = parseInt(url.searchParams.get("pt") ?? "0", 10);
      const p1 = parseInt(url.searchParams.get("p1") ?? "0", 10);
      const p2 = parseInt(url.searchParams.get("p2") ?? "0", 10);
      const p3 = parseInt(url.searchParams.get("p3") ?? "0", 10);
      const n = parseInt(url.searchParams.get("n") ?? "0", 10);
      const fontData = await fetchFont();
      const element = {
        type: "div",
        props: {
          style: {
            width: "1200px",
            height: "630px",
            background: "#0f766e",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "Noto Sans JP",
            color: "white",
            padding: "60px",
            boxSizing: "border-box"
          },
          children: [
            {
              type: "p",
              props: {
                style: {
                  fontSize: "30px",
                  margin: "0 0 20px",
                  opacity: "0.85",
                  letterSpacing: "0.02em"
                },
                children: "\u300E\u30C1\u30AF\u30CA\u30DF\u30B7\u30C6\u30A3\u300F\u8857\u3065\u304F\u308A\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8"
              }
            },
            {
              type: "p",
              props: {
                style: {
                  fontSize: "100px",
                  fontWeight: "700",
                  margin: "0",
                  lineHeight: "1"
                },
                children: `${pt}pt`
              }
            },
            {
              type: "p",
              props: {
                style: {
                  fontSize: "26px",
                  margin: "12px 0 36px",
                  opacity: "0.8"
                },
                children: "\u793E\u4F1A\u8CA2\u732E\u30DD\u30A4\u30F3\u30C8"
              }
            },
            {
              type: "div",
              props: {
                style: {
                  display: "flex",
                  gap: "48px",
                  marginBottom: "28px",
                  fontSize: "26px",
                  opacity: "0.9"
                },
                children: [
                  { type: "span", props: { children: `1\u671F ${p1}pt` } },
                  { type: "span", props: { children: `2\u671F ${p2}pt` } },
                  { type: "span", props: { children: `3\u671F ${p3}pt` } }
                ]
              }
            },
            {
              type: "p",
              props: {
                style: {
                  fontSize: "28px",
                  margin: "0",
                  opacity: "0.9"
                },
                children: `\u30BD\u30EA\u30E5\u30FC\u30B7\u30E7\u30F3\u9054\u6210: ${n}\u4EF6`
              }
            }
          ]
        }
      };
      const response = new ImageResponse(element, {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Noto Sans JP",
            data: fontData,
            style: "normal",
            weight: 700
          }
        ]
      });
      response.headers.set("Cache-Control", "public, max-age=86400");
      return response;
    }, "onRequest");
  }
});
var onRequest2;
var init_share = __esm({
  "share.ts"() {
    "use strict";
    init_functionsRoutes_0_44714878799983215();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
    init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
    init_performance2();
    onRequest2 = /* @__PURE__ */ __name2(async (context22) => {
      const url = new URL(context22.request.url);
      const pt = url.searchParams.get("pt") ?? "0";
      const p1 = url.searchParams.get("p1") ?? "0";
      const p2 = url.searchParams.get("p2") ?? "0";
      const p3 = url.searchParams.get("p3") ?? "0";
      const n = url.searchParams.get("n") ?? "0";
      const ogImageUrl = `${url.origin}/api/og?pt=${pt}&p1=${p1}&p2=${p2}&p3=${p3}&n=${n}`;
      const gameUrl = `${url.origin}/`;
      const title22 = `\u300E\u30C1\u30AF\u30CA\u30DF\u30B7\u30C6\u30A3\u300F\u3067${pt}pt\u9054\u6210\uFF01`;
      const description = `\u793E\u4F1A\u8CA2\u732E\u30DD\u30A4\u30F3\u30C8${pt}pt\u30FB\u30BD\u30EA\u30E5\u30FC\u30B7\u30E7\u30F3${n}\u4EF6\u3092\u9054\u6210\u3057\u307E\u3057\u305F\u3002`;
      const html = `<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title22}</title>
  <meta name="description" content="${description}" />
  <meta property="og:title" content="${title22}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${ogImageUrl}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${url.href}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title22}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${ogImageUrl}" />
  <meta http-equiv="refresh" content="0; url=${gameUrl}" />
  <style>
    body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; background: #f0fdfa; }
    a { color: #0f766e; font-weight: bold; }
  </style>
</head>
<body>
  <p>\u30EA\u30C0\u30A4\u30EC\u30AF\u30C8\u4E2D... <a href="${gameUrl}">\u3053\u3061\u3089</a>\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u304F\u3060\u3055\u3044\u3002</p>
</body>
</html>`;
      return new Response(html, {
        headers: {
          "Content-Type": "text/html;charset=UTF-8",
          "Cache-Control": "public, max-age=3600"
        }
      });
    }, "onRequest");
  }
});
var routes;
var init_functionsRoutes_0_44714878799983215 = __esm({
  "../.wrangler/tmp/pages-u6lnzJ/functionsRoutes-0.44714878799983215.mjs"() {
    "use strict";
    init_og();
    init_share();
    routes = [
      {
        routePath: "/api/og",
        mountPath: "/api",
        method: "",
        middlewares: [],
        modules: [onRequest]
      },
      {
        routePath: "/share",
        mountPath: "/",
        method: "",
        middlewares: [],
        modules: [onRequest2]
      }
    ];
  }
});
init_functionsRoutes_0_44714878799983215();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_functionsRoutes_0_44714878799983215();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_functionsRoutes_0_44714878799983215();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
init_functionsRoutes_0_44714878799983215();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function lexer(str) {
  var tokens = [];
  var i2 = 0;
  while (i2 < str.length) {
    var char = str[i2];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i2, value: str[i2++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i2++, value: str[i2++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i2, value: str[i2++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i2, value: str[i2++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i2 + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i2));
      tokens.push({ type: "NAME", index: i2, value: name });
      i2 = j;
      continue;
    }
    if (char === "(") {
      var count32 = 1;
      var pattern = "";
      var j = i2 + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count32--;
          if (count32 === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count32++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count32)
        throw new TypeError("Unbalanced pattern at ".concat(i2));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i2));
      tokens.push({ type: "PATTERN", index: i2, value: pattern });
      i2 = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i2, value: str[i2++] });
  }
  tokens.push({ type: "END", index: i2, value: "" });
  return tokens;
}
__name(lexer, "lexer");
__name2(lexer, "lexer");
function parse2(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a3 = options.prefixes, prefixes = _a3 === void 0 ? "./" : _a3, _b3 = options.delimiter, delimiter = _b3 === void 0 ? "/#?" : _b3;
  var result = [];
  var key = 0;
  var i2 = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name2(function(type) {
    if (i2 < tokens.length && tokens[i2].type === type)
      return tokens[i2++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name2(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a4 = tokens[i2], nextType = _a4.type, index = _a4.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name2(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name2(function(value2) {
    for (var _i2 = 0, delimiter_1 = delimiter; _i2 < delimiter_1.length; _i2++) {
      var char2 = delimiter_1[_i2];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name2(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i2 < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse2, "parse2");
__name2(parse2, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
__name2(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a3 = options.decode, decode2 = _a3 === void 0 ? function(x22) {
    return x22;
  } : _a3;
  return function(pathname) {
    var m2 = re.exec(pathname);
    if (!m2)
      return false;
    var path = m2[0], index = m2.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name2(function(i22) {
      if (m2[i22] === void 0)
        return "continue";
      var key = keys[i22 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m2[i22].split(key.prefix + key.suffix).map(function(value) {
          return decode2(value, key);
        });
      } else {
        params[key.name] = decode2(m2[i22], key);
      }
    }, "_loop_1");
    for (var i2 = 1; i2 < m2.length; i2++) {
      _loop_1(i2);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
__name2(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
__name2(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
__name2(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
__name2(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
__name2(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse2(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
__name2(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a3 = options.strict, strict = _a3 === void 0 ? false : _a3, _b3 = options.start, start = _b3 === void 0 ? true : _b3, _c2 = options.end, end = _c2 === void 0 ? true : _c2, _d2 = options.encode, encode = _d2 === void 0 ? function(x22) {
    return x22;
  } : _d2, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f2 = options.endsWith, endsWith = _f2 === void 0 ? "" : _f2;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i2 = 0, tokens_1 = tokens; _i2 < tokens_1.length; _i2++) {
    var token = tokens_1[_i2];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
__name2(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");
__name2(pathToRegexp, "pathToRegexp");
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
__name2(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env22, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name2(async (input, init2) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init2);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context22 = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env: env22,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name2(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context22);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env22["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error32) {
      if (isFailOpen) {
        const response = await env22["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error32;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name2((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
init_functionsRoutes_0_44714878799983215();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var drainBody = /* @__PURE__ */ __name2(async (request, env22, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env22);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
init_functionsRoutes_0_44714878799983215();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request, env22, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env22);
  } catch (e) {
    const error32 = reduceError(e);
    return Response.json(error32, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;
init_functionsRoutes_0_44714878799983215();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_process();
init_virtual_unenv_global_polyfill_cloudflare_unenv_preset_node_console();
init_performance2();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env22, ctx, dispatch, middlewareChain) {
  const [head2, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head2(request, env22, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env22, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env22, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  static {
    __name(this, "___Facade_ScheduledController__");
  }
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name2(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env22, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env22, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env22, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init2) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init2.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env22, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env22, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name2((request, env22, ctx) => {
      this.env = env22;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name2((type, init2) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init2.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } catch (e) {
    const error4 = reduceError2(e);
    return Response.json(error4, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-g7hDgg/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = middleware_loader_entry_default;

// ../../.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env3, ctx, dispatch, middlewareChain) {
  const [head2, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head2(request, env3, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env3, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env3, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-g7hDgg/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class ___Facade_ScheduledController__2 {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env3, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env3, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env3, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init2) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init2.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env3, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env3, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env3, ctx) => {
      this.env = env3;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init2) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init2.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
/*! Bundled license information:

css-background-parser/index.js:
  (*!
   * https://github.com/gilmoreorless/css-background-parser
   * Copyright © 2015 Gilmore Davidson under the MIT license: http://gilmoreorless.mit-license.org/
   *)

parse-css-color/dist/index.umd.js:
  (**
  	 * parse-css-color
  	 * @version v0.2.1
  	 * @link http://github.com/noeldelgado/parse-css-color/
  	 * @license MIT
  	 *)

escape-html/index.js:
  (*!
   * escape-html
   * Copyright(c) 2012-2013 TJ Holowaychuk
   * Copyright(c) 2015 Andreas Lubbe
   * Copyright(c) 2015 Tiancheng "Timothy" Gu
   * MIT Licensed
   *)
*/
//# sourceMappingURL=functionsWorker-0.3359935224937285.js.map
