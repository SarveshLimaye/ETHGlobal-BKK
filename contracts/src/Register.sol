// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.25;

contract Register {
    struct NetworkDetails {
        uint64 chainSelector;
        address routerAddress;
        address linkAddress;
        address wrappedNativeAddress;
        address ccipBnMAddress;
        address ccipLnMAddress;
    }

    mapping(uint256 chainId => NetworkDetails) internal s_networkDetails;

    constructor() {
        // Ethereum Sepolia
        s_networkDetails[11155111] = NetworkDetails({
            chainSelector: 16015286601757825753,
            routerAddress: 0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59,
            linkAddress: 0x779877A7B0D9E8603169DdbD7836e478b4624789,
            wrappedNativeAddress: 0x097D90c9d3E0B50Ca60e1ae45F6A81010f9FB534,
            ccipBnMAddress: 0xFd57b4ddBf88a4e07fF4e34C487b99af2Fe82a05,
            ccipLnMAddress: 0x466D489b6d36E7E3b824ef491C225F5830E81cC1
        });
        // Optimism Sepolia
        s_networkDetails[11155420] = NetworkDetails({
            chainSelector: 5224473277236331295,
            routerAddress: 0x114A20A10b43D4115e5aeef7345a1A71d2a60C57,
            linkAddress: 0xE4aB69C077896252FAFBD49EFD26B5D171A32410,
            wrappedNativeAddress: 0x4200000000000000000000000000000000000006,
            ccipBnMAddress: 0x8aF4204e30565DF93352fE8E1De78925F6664dA7,
            ccipLnMAddress: 0x044a6B4b561af69D2319A2f4be5Ec327a6975D0a
        });
        // Polygon Mumbai
        s_networkDetails[80001] = NetworkDetails({
            chainSelector: 12532609583862916517,
            routerAddress: 0x1035CabC275068e0F4b745A29CEDf38E13aF41b1,
            linkAddress: 0x326C977E6efc84E512bB9C30f76E30c160eD06FB,
            wrappedNativeAddress: 0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889,
            ccipBnMAddress: 0xf1E3A5842EeEF51F2967b3F05D45DD4f4205FF40,
            ccipLnMAddress: 0xc1c76a8c5bFDE1Be034bbcD930c668726E7C1987
        });
        // Polygon Amoy
        s_networkDetails[80002] = NetworkDetails({
            chainSelector: 16281711391670634445,
            routerAddress: 0x9C32fCB86BF0f4a1A8921a9Fe46de3198bb884B2,
            linkAddress: 0x0Fd9e8d3aF1aaee056EB9e802c3A762a667b1904,
            wrappedNativeAddress: 0x360ad4f9a9A8EFe9A8DCB5f461c4Cc1047E1Dcf9,
            ccipBnMAddress: address(0),
            ccipLnMAddress: address(0)
        });
        // Avalanche Fuji
        s_networkDetails[43113] = NetworkDetails({
            chainSelector: 14767482510784806043,
            routerAddress: 0xF694E193200268f9a4868e4Aa017A0118C9a8177,
            linkAddress: 0x0b9d5D9136855f6FEc3c0993feE6E9CE8a297846,
            wrappedNativeAddress: 0xd00ae08403B9bbb9124bB305C09058E32C39A48c,
            ccipBnMAddress: 0xD21341536c5cF5EB1bcb58f6723cE26e8D8E90e4,
            ccipLnMAddress: 0x70F5c5C40b873EA597776DA2C21929A8282A3b35
        });
        // BNB Chain Testnet
        s_networkDetails[97] = NetworkDetails({
            chainSelector: 13264668187771770619,
            routerAddress: 0xE1053aE1857476f36A3C62580FF9b016E8EE8F6f,
            linkAddress: 0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06,
            wrappedNativeAddress: 0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd,
            ccipBnMAddress: 0xbFA2ACd33ED6EEc0ed3Cc06bF1ac38d22b36B9e9,
            ccipLnMAddress: 0x79a4Fc27f69323660f5Bfc12dEe21c3cC14f5901
        });
        // Arbitrum Sepolia
        s_networkDetails[421614] = NetworkDetails({
            chainSelector: 3478487238524512106,
            routerAddress: 0x2a9C5afB0d0e4BAb2BCdaE109EC4b0c4Be15a165,
            linkAddress: 0xb1D4538B4571d411F07960EF2838Ce337FE1E80E,
            wrappedNativeAddress: 0xE591bf0A0CF924A0674d7792db046B23CEbF5f34,
            ccipBnMAddress: 0xA8C0c11bf64AF62CDCA6f93D3769B88BdD7cb93D,
            ccipLnMAddress: 0x139E99f0ab4084E14e6bb7DacA289a91a2d92927
        });
        // Base Sepolia
        s_networkDetails[84532] = NetworkDetails({
            chainSelector: 10344971235874465080,
            routerAddress: 0xD3b06cEbF099CE7DA4AcCf578aaebFDBd6e88a93,
            linkAddress: 0xE4aB69C077896252FAFBD49EFD26B5D171A32410,
            wrappedNativeAddress: 0x4200000000000000000000000000000000000006,
            ccipBnMAddress: 0x88A2d74F47a237a62e7A51cdDa67270CE381555e,
            ccipLnMAddress: 0xA98FA8A008371b9408195e52734b1768c0d1Cb5c
        });
        // Wemix Testnet
        s_networkDetails[1112] = NetworkDetails({
            chainSelector: 9284632837123596123,
            routerAddress: 0xA8C0c11bf64AF62CDCA6f93D3769B88BdD7cb93D,
            linkAddress: 0x3580c7A817cCD41f7e02143BFa411D4EeAE78093,
            wrappedNativeAddress: 0xbE3686643c05f00eC46e73da594c78098F7a9Ae7,
            ccipBnMAddress: 0xF4E4057FbBc86915F4b2d63EEFFe641C03294ffc,
            ccipLnMAddress: 0xcb342aE3D65E3fEDF8F912B0432e2B8F88514d5D
        });
        // Kroma Sepolia
        s_networkDetails[2358] = NetworkDetails({
            chainSelector: 5990477251245693094,
            routerAddress: 0xA8C0c11bf64AF62CDCA6f93D3769B88BdD7cb93D,
            linkAddress: 0xa75cCA5b404ec6F4BB6EC4853D177FE7057085c8,
            wrappedNativeAddress: 0x4200000000000000000000000000000000000001,
            ccipBnMAddress: 0x6AC3e353D1DDda24d5A5416024d6E436b8817A4e,
            ccipLnMAddress: 0x835fcBB6770E1246CfCf52F83cDcec3177d0bb6b
        });
        // Gnosis Chiado
        s_networkDetails[10200] = NetworkDetails({
            chainSelector: 8871595565390010547,
            routerAddress: 0x19b1bac554111517831ACadc0FD119D23Bb14391,
            linkAddress: 0xDCA67FD8324990792C0bfaE95903B8A64097754F,
            wrappedNativeAddress: 0x18c8a7ec7897177E4529065a7E7B0878358B3BfF,
            ccipBnMAddress: 0xA189971a2c5AcA0DFC5Ee7a2C44a2Ae27b3CF389,
            ccipLnMAddress: 0x30DeCD269277b8094c00B0bacC3aCaF3fF4Da7fB
        });
        //Linea Sepolia
         s_networkDetails[59141] = NetworkDetails({
            chainSelector: 5719461335882077547,
            routerAddress: 0xB4431A6c63F72916151fEA2864DBB13b8ce80E8a,
            linkAddress: 0xF64E6E064a71B45514691D397ad4204972cD6508,
            wrappedNativeAddress: 0x06565ed324Ee9fb4DB0FF80B7eDbE4Cb007555a3,
            ccipBnMAddress: 0x45A6F9a98932D03d34d50c42568D79023fE13fa6,
            ccipLnMAddress: 0xA7EA79b9E466e8D2a440128867ed399bC78f4aaE
        });
    }

    function getNetworkDetails(uint256 chainId) external view returns (NetworkDetails memory) {
        return s_networkDetails[chainId];
    }

    function setNetworkDetails(uint256 chainId, NetworkDetails memory networkDetails) external {
        s_networkDetails[chainId] = networkDetails;
    }
}
