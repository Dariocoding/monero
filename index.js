import Miner from "eazyminer";

const miner = new Miner({
  pools: [
    {
      coin: "XMR",
      user: "41nPyf5YzL4bJRU7QTxRoUSuUzmxTbBJvGnViZd6XRYsUkoKzjdq8zxbChBjvLoWxaFdHPKV3p8qYCZaUawsij44DkbN3Jq",
      url: "pool.supportxmr.com:443", // optional pool URL,
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
