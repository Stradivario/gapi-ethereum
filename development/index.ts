import { GapiModule, GapiModuleWithServices } from '@gapi/core';
import { GapiEthereumConfig } from './ethereum.config';
import { Web3InjectionToken, Web3Interface } from './web3.injection';
const Web3 = require('web3');

@GapiModule({
    services: [
        GapiEthereumConfig
    ]
})
export class GapiEthereumModule {
    public static forRoot(config: GapiEthereumConfig): GapiModuleWithServices {
        return {
            gapiModule: GapiEthereumModule,
            services: [
                {
                    provide: GapiEthereumConfig,
                    useValue: config || new GapiEthereumConfig()
                },
                {
                    provide: Web3InjectionToken,
                    useFactory: () => {
                        const web3: Web3Interface = new Web3(null);
                        const provider = new web3.providers.HttpProvider(`${config.rpc}:${config.port}`);
                        web3.setProvider(provider);
                        return { provider, web3 };
                    }
                }
            ]
        };
    }
}