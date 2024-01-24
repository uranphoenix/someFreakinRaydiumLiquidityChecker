const { Connection, PublicKey } = require("@solana/web3.js");

const RAYDIUM_PUBLIC_KEY = "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8";

const SESSION_HASH = 'QNDEMO'; // Random unique identifier for your session
let credits = 0;

const raydium = new PublicKey(RAYDIUM_PUBLIC_KEY);
// Replace HTTP_URL & WSS_URL with QuickNode HTTPS and WSS Solana Mainnet endpoint
const connection = new Connection(`https://boldest-prettiest-water.solana-mainnet.quiknode.pro/467f79bc0d43e22464295523012978be5babd16e/`, {
    wsEndpoint: `wss://boldest-prettiest-water.solana-mainnet.quiknode.pro/467f79bc0d43e22464295523012978be5babd16e/`,
    httpHeaders: {"x-session-hash": SESSION_HASH}
});

// Monitor logs
async function main(connection, programAddress) {
    console.log("Monitoring logs for program:", programAddress.toString());
    connection.onLogs(
        programAddress,
        ({ logs, err, signature }) => {
            if (err) return;

            if (logs && logs.some(log => log.includes("initialize2"))) {
                console.log("Signature for 'initialize2':", signature);
                fetchRaydiumAccounts(signature, connection);
            }
        },
        "finalized"
    );
}

// Parse transaction and filter data
async function fetchRaydiumAccounts(txId, connection) {
    const tx = await connection.getParsedTransaction(
        txId,
        {
            maxSupportedTransactionVersion: 0,
            commitment: 'confirmed'
        });

    credits += 100;
    const accounts = null;
    //const accounts = tx?.transaction.message.instructions.find(ix => ix.programId.toBase58() === RAYDIUM_PUBLIC_KEY).accounts;

    if (!accounts) {
        console.log("No accounts found in the transaction.");
        return;
    }

    const tokenAIndex = 8;
    const tokenBIndex = 9;

    //const tokenAAccount = accounts[tokenAIndex];
    //const tokenBAccount = accounts[tokenBIndex];
    /*
    const displayData = [
        { "Token": "A", "Account Public Key": tokenAAccount.toBase58() },
        { "Token": "B", "Account Public Key": tokenBAccount.toBase58() }
    ];



     */
    console.log("New LP Found at " + (new Date()).toLocaleString());
    console.log(generateExplorerUrl(txId));
    //console.table(displayData);
    console.log("Total QuickNode Credits Used in this session:", credits);
}

function generateExplorerUrl(txId) {
    return `https://solscan.io/tx/${txId}`;
}

main(connection, raydium).catch(console.error);