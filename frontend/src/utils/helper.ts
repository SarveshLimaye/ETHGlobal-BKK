import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const chains = [
  {
    id: 11155111,
    name: "Ethereum Sepolia",
    logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=015",
    factoryAddress: "0x86552b6aaf1D7f0ffFc7cEe029A501e4883308bC",
    tokens: [
      {
        symbol: "LINK",
        name: "Chainlink",
        address: "0x779877A7B0D9E8603169DdbD7836e478b4624789",
        logo: "https://cryptologos.cc/logos/chainlink-link-logo.svg?v=025",
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=015",
      },
      {
        symbol: "USDC",
        name: "USD Coin",
        address: "0x94a9D9AC8a22534E3FaCa9F4e7F2E2cf85d5E4C8",
        logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=025",
      },
    ],
  },
  {
    id: 80001,
    name: "Polygon Amoy",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=025",
    factoryAddress: "",
    tokens: [
      {
        symbol: "LINK",
        name: "Chainlink",
        address: "0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904",
        logo: "https://cryptologos.cc/logos/chainlink-link-logo.svg?v=025",
        receiverFactory: "0xReceiverFactory3",
      },
      {
        symbol: "USDC",
        name: "USD Coin",
        address: "0x9999f7Fea5938fD3b1E26A12c3f2fb024e194f97",
        logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=025",
        receiverFactory: "0xReceiverFactory4",
      },
    ],
  },
  {
    id: 2442,
    name: "Polygon Cardona",
    logo: "https://cryptologos.cc/logos/polygon-matic-logo.svg?v=025",

    factoryAddress: "",
    tokens: [
      {
        symbol: "ETH",
        name: "ETH",
        address: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
        logo: "https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=015",
      },
    ],
  },
  {
    id: 421614,
    name: "Arbitrum Sepolia",
    logo: "https://cryptologos.cc/logos/arbitrum-arb-logo.svg?v=025",
    factoryAddress: "0x7E33E711612Af4c4522d89C8F88f7eA9E925a5D3",
    tokens: [
      {
        symbol: "LINK",
        name: "Chainlink",
        address: "0xb1D4538B4571d411F07960EF2838Ce337FE1E80E",
        logo: "https://cryptologos.cc/logos/chainlink-link-logo.svg?v=025",
      },
      {
        symbol: "USDC",
        name: "USD Coin",
        address: "0x75faf114eafb1BDbe2F0316DF893fd58CE46AA4d",
        logo: "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=025",
      },
    ],
  },
  {
    id: 84532,
    name: "Base Sepolia",
    logo: "https://i.seadn.io/gcs/files/f75d772fba8058dbbbefbc0578bae807.png?auto=format&dpr=1&w=384",
    factoryAddress: "0x275fC6E5b9BCE1b756EacA955b7758070099e07d",
    tokens: [
      {
        symbol: "LINK",
        name: "Chainlink",
        address: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
        logo: "https://cryptologos.cc/logos/chainlink-link-logo.svg?v=025",
      },
    ],
  },

  {
    id: 11155420,
    name: "Optimism Sepolia",
    logo: "https://cryptologos.cc/logos/optimism-ethereum-op-logo.png?v=025",
    factoryAddress: "0xfa24eaD3De76045f875998dd1d75562057cEB26d",
    tokens: [
      {
        symbol: "LINK",
        name: "Chainlink",
        address: "0xE4aB69C077896252FAFBD49EFD26B5D171A32410",
        logo: "https://cryptologos.cc/logos/chainlink-link-logo.svg?v=025",
      },
    ],
  },
];

export const SEPOLIA_CHAIN_ID = 11155111;

export const CARDONA_CHAIN_ID = 2442;

export const ARBITUM_SEPOLIA_CHAIN_ID = 421614;

export const OPTIMISM_SEPOLIA_CHAIN_ID = 11155420;

export const BASE_SEPOLIA_CHAIN_ID = 84532;

export const NATIVE_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee";

export const UNIFIED_BRIDGE = "0x528e26b25a34a4a5d0dbda1d57d318153d2ed582";

export const checkIfPolygonAggLayer = (
  srcChainId: number,
  destChainId: number,
  srcToken: string,
  destToken: string
) => {
  if (
    (srcChainId === SEPOLIA_CHAIN_ID &&
      destChainId === CARDONA_CHAIN_ID &&
      srcToken === NATIVE_ADDRESS &&
      destToken === NATIVE_ADDRESS) ||
    (srcChainId === CARDONA_CHAIN_ID &&
      destChainId === SEPOLIA_CHAIN_ID &&
      srcToken === NATIVE_ADDRESS &&
      destToken === NATIVE_ADDRESS)
  ) {
    return true;
  } else {
    return false;
  }
};

export const getPoolAddress = (srcChainId: number) => {
  if (srcChainId === SEPOLIA_CHAIN_ID) {
    return "0x29277F9207Ff093c206292c28406Ee51e1605166";
  } else if (srcChainId === ARBITUM_SEPOLIA_CHAIN_ID) {
    return "0xD255FBb48513e92c7D7e2a16769dDDE92d8698E6";
  } else if (srcChainId === BASE_SEPOLIA_CHAIN_ID) {
    return "0x0ffb63091d69A3c050FA5A788A68cff304F76ae6";
  } else if (srcChainId === OPTIMISM_SEPOLIA_CHAIN_ID) {
    return "0xDAd3276564bEC357300F3cD7B852015ADc278A42";
  }
};
