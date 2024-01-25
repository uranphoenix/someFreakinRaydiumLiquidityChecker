const web3 = require("@solana/web3.js");
(async () => {
    const solana = new web3.Connection("https://boldest-prettiest-water.solana-mainnet.quiknode.pro/467f79bc0d43e22464295523012978be5babd16e/");
    console.log(await solana.getSlot());
})();