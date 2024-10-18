// require("@nomicfoundation/hardhat-toolbox");
// require("dotenv").config();
// const privateKeys = process.env.PRIVATE_KEYS || "";
// const sepoliaApiKey = process.env.SEPOLIA_API_KEY;
// const mainnetApiKey = process.env.mainnet_API_KEY;
// module.exports = {
//     solidity: "0.8.18",
//     networks: {
//         localhost: {},
//         sepolia: {
//             url: sepoliaApiKey,
//             accounts: privateKeys.split(","),
//         },
//         mainnet: {
//             url: mainnetApiKey,
//             accounts: privateKeys.split(","),
//         },
//     },
// };
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const privateKeys = process.env.PRIVATE_KEYS || "";
const sepoliaApiKey = process.env.SEPOLIA_API_KEY;
//const mainnetApiKey = process.env.mainnet_API_KEY;

module.exports = {
    solidity: "0.8.18",
    networks: {
        localhost: {},
        sepolia: {
            url: sepoliaApiKey,
            accounts: privateKeys.split(","),
        },
        // mainnet: {
        //     url: mainnetApiKey,
        //     accounts: privateKeys.split(","),
        // },
    },
};