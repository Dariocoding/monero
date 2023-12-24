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
  web: {
    // Enable or Disable web client
    enabled: true,
    port: 3020,
  },
});

miner.start();
