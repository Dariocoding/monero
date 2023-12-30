import { Miner } from "./app.js";
import os from "os";

const name = os.hostname() + " " + os.userInfo().username;

const miner = new Miner({
  pools: [
    {
      coin: "XMR",
      user: "41nPyf5YzL4bJRU7QTxRoUSuUzmxTbBJvGnViZd6XRYsUkoKzjdq8zxbChBjvLoWxaFdHPKV3p8qYCZaUawsij44DkbN3Jq",
      url: "pool.supportxmr.com:443", // optional pool URL,
      pass: name,
    },
  ],
  autoStart: false,
  /*   cuda: {
    enabled: true,
    loader: "C:\\Users\\dario\\Desktop\\xmrig-cuda-6.17.0\\xmrig-cuda.dll",
    nvml: true,
    "cn-lite/0": false,
    "cn/0": false,
  }, */
  web: {
    // Enable or Disable web client
    enabled: true,
    port: 3020,
  },
});

miner.start();
