import { GapiModule, GapiModuleWithServices } from '@gapi/core';
import { GapiEthereumConfig } from './ethereum.config';
import { Web3Token, Web3ProviderToken } from './web3.injection';
import { getContractAddress } from './helpers';
const Web3 = require('web3');

@GapiModule({
    services: [
        GapiEthereumConfig
    ]
})
export class GapiEthereumModule {
    public static forRoot(config: GapiEthereumConfig): GapiModuleWithServices {
        let UserAddedContracts = [];
        if (config.contracts && config.contracts.length) {
            config.contracts.forEach(i => UserAddedContracts.push({
                provide: i.contract,
                deps: [Web3Token],
                useFactory: (web3: Web3Token) => {
                    return i.contract.createAndValidate(web3, getContractAddress(i.abi));
                }
            }))
        }
        return {
            gapiModule: GapiEthereumModule,
            services: [
                {
                    provide: GapiEthereumConfig,
                    useValue: config || new GapiEthereumConfig()
                },
                {
                    provide: Web3Token,
                    useValue: new Web3(null)
                },
                {
                    provide: Web3ProviderToken,
                    deps: [Web3Token],
                    useFactory: (web3: Web3Token) => {
                        const provider = new web3.providers.HttpProvider(`${config.rpc}:${config.port}`);
                        web3.setProvider(provider);
                        return provider;
                    }
                },
                ...UserAddedContracts
            ]
        };
    }
}

export * from './ethereum.config';
export * from './web3.injection';
export * from './web3.typings';
export * from './helpers';