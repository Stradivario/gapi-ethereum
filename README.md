# @Gapi Ethereum

#### @Gapi Ethereum module @StrongTyped

##### For questions/issues you can write ticket [here](http://gitlab.youvolio.com/gapi/ethereum/issues)
##### This module is intended to be used with [GAPI](https://github.com/Stradivario/gapi)

## Installation and basic examples:
##### To install this Gapi module, run:

```bash
$ npm install @gapi/ethereum --save
```

## Consuming @gapi/ethereum

##### Import inside AppModule or CoreModule
```typescript

import { GapiModule } from '@gapi/core';
import { GapiEthereumModule } from '@gapi/ethereum';

@GapiModule({
    imports: [
        GapiEthereumModule.forRoot({
            port: 7545,
            rpc: 'http://localhost'
        }),
        ContractsModule.forRoot()
    ]
})
export class CoreModule { }
```

Then generate modules using [TypeChain](https://github.com/Neufund/TypeChain)

To install it type:

```bash
npm i -g typechain
```

Use it as folow inside Gapi root project folder
```bash
typechain --force --outDir src/app/core/contracts './truffle/build/contracts/*.json'
```

Then import your contract as follow
```typescript
import { GapiModule, GapiModuleWithServices } from '@gapi/core';
import { Web3InjectionToken } from '@gapi/ethereum';
import { Coin } from '../core/contracts/Coin';
import { CoinCrowdsale } from '../core/contracts/CoinCrowdsale';

const CoinCrowdsaleABI = require('../../../truffle/build/contracts/CoinCrowdsale.json');
const CoinABI = require('../../../truffle/build/contracts/Coin.json');

@GapiModule()
export class ContractsModule {
    public static forRoot(): GapiModuleWithServices {
        return {
            gapiModule: ContractsModule,
            services: [
                {
                    provide: Coin,
                    deps: [Web3InjectionToken],
                    useFactory: (value: Web3InjectionToken) => {
                        return Coin.createAndValidate(value.web3, CoinABI.networks[Object.keys(CoinABI.networks)[0]].address);
                    }
                },
                {
                    provide: CoinCrowdsale,
                    deps: [Web3InjectionToken],
                    useFactory: (value: Web3InjectionToken) => {
                        return CoinCrowdsale.createAndValidate(value.web3, CoinCrowdsaleABI.networks[Object.keys(CoinCrowdsaleABI.networks)[0]].address);
                    }
                }
            ]
        };
    }
}

```

Then use them inside your controller
```typescript
import {
    Query, GraphQLNonNull, Type,
    GapiController, GraphQLInt, Public
} from '@gapi/core';
import { PhoneumCoinCrowdsale } from '../core/contracts/PhoneumCoinCrowdsale';

@GapiObjectType()
export class EthereumCrowdsaleType {
    startTime: number | GraphQLScalarType = GraphQLInt;
    endTime: number | GraphQLScalarType = GraphQLInt;
    hasEnded: number | GraphQLScalarType = GraphQLBoolean;
    token: number | GraphQLScalarType = GraphQLString;
    weiRaised: number | GraphQLScalarType = GraphQLInt;
    wallet: string | GraphQLScalarType = GraphQLString;
}

@GapiController()
export class EthereumQueriesController {

    constructor(
        private phoneumCrowdsale: PhoneumCoinCrowdsale
    ) {}

    @Type(EthereumCrowdsaleType)
    @Public()
    @Query()
    async getCrowdsaleInfo(root, payload, context): EthereumCrowdsaleType  {
        const crowdsale = await this.phoneumCrowdsale;
        const crowdsaleType: EthereumCrowdsaleType = {
            startTime: (await crowdsale.startTime).toNumber();
            endTime: (await crowdsale.endTime).toNumber();
            hasEnded: await crowdsale.hasEnded;
            token: await crowdsale.token;
            weiRaised: (await crowdsale.weiRaised).toNumber();
            wallet: await crowdsale.wallet;
        };
        console.log('START TIME: ', crowdsaleType.startTime);
        console.log('END TIME: ', crowdsaleType.endTime);
        console.log('Has Ended: ', crowdsaleType.hasEnded);
        console.log('Token: ', crowdsaleType.token);
        console.log('WeiRaised: ', crowdsaleType.weiRaised);
        console.log('Owner Wallet: ', crowdsaleType.wallet);
        return crowdsaleType;
    }

}

```

TODO: Better documentation...

Enjoy ! :)
