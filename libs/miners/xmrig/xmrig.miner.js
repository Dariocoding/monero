import os from "os";
import fs from "fs";
import path from "path";
import { spawn } from "child_process";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PLATFORM = os.platform().toLowerCase();
const LINUX_PATH = path.join(__dirname, "./xmrig");
const WINDOWS_PATH = path.join(__dirname, "./xmrig.exe");
const cpus = +process.env.USAGE_THREADS || os.cpus().length;

console.log({ PLATFORM });

export default class XMRIGMiner {
  name = "xmrig";

  _app = null;

  _initialized = false;

  _miner = null;

  _filePath = null;

  _running = false;

  _worker = null;

  constructor(app) {
    this._app = app;
    this._init();
  }

  async _init() {
    if (PLATFORM === "linux") {
      this._loadLinux();
    } else if (PLATFORM === "win32") {
      this._loadWindows();
    } else {
      throw new Error("Unsopperted platform");
    }

    this._initialized = true;
  }

  start() {
    if (this._running) {
      console.info("XMRIG already running");
      return;
    }

    this._running = true;
    this._exec();
  }

  stop() {
    if (this._worker) {
      this._worker.kill();
      this._worker = null;
    }
  }

  getStatus() {}

  _loadLinux() {
    // add execution rights
    console.log({ LINUX_PATH });
    fs.chmodSync(LINUX_PATH, 754);
    this._filePath = LINUX_PATH;
  }

  _loadWindows() {
    this._filePath = WINDOWS_PATH;
  }

  _exec() {
    this._updateConfig();

    // start script

    /*     console.log({
      path: this._filePath,
    }); */

    this._worker = spawn(this._filePath, [], {
      windowsHide: true,
    });

    /*     console.log({
      xmrig: this._worker,
      path: this._filePath,
    }); */

    // passthrough output
    this._worker.stdout.on("data", (data) => this._app.logger.info(data));
    this._worker.stderr.on("data", (data) => this._app.logger.error(data));
  }

  _updateConfig() {
    const configBasePath = path.join(__dirname, "./config.base.json");
    const configBase = JSON.parse(fs.readFileSync(configBasePath));

    // merge given pools config with base configs
    const pools = this._app.config.pools.map((poolConfig) =>
      Object.assign({}, configBase.pools[0], poolConfig)
    );

    this._app.logger.info("XMRIG pools configuration");
    this._app.logger.info(JSON.stringify(pools, null, 2));
    configBase.pools = pools;
    Object.assign(configBase.opencl, this._app.config.opencl);
    Object.assign(configBase.cuda, this._app.config.cuda);
    const rx = [];
    const argon2 = [];
    const astrobwt = [];
    const rxWow = [];
    const cn = [];
    const cnHeavy = [];
    const cnPico = [];
    const cnUpx2 = [];
    const ghostrider = [];
    const cnLite = [];
    for (let i = 0; i < cpus; i++) {
      rx.push(i);
      rxWow.push(i);
      argon2.push(i);
      astrobwt.push(i);
      cn.push([1, i]);
      cnLite.push([1, i]);
      cnPico.push([2, i]);
      cnUpx2.push([2, i]);
      if (i % 2 === 0) cnHeavy.push([1, i]);
      if (i % 2 === 0) ghostrider.push([8, i]);
    }
    console.log({ rx, rxWow, argon2, astrobwt, cn, cnHeavy, cnPico, cnUpx2, ghostrider, cnLite });
    Object.assign(configBase.cpu, {
      ...configBase.cpu,
      rx,
      "rx/wow": rxWow,
      argon2,
      astrobwt,
      cn,
      "cn-heavy": cnHeavy,
      "cn-pico": cnPico,
      "cn/upx2": cnUpx2,
      ghostrider,
    });
    fs.writeFileSync(path.join(__dirname, "config.json"), JSON.stringify(configBase, null, 2));
  }
}
