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
            port: 8545,
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
$ npm i -g typechain
```

Use it as folow inside Gapi root project folder
```bash
$ typechain --force --outDir src/app/core/contracts './truffle/build/contracts/*.json'
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
                    useFactory: (web3InjectionToken: Web3InjectionToken) => {
                        return Coin.createAndValidate(web3InjectionToken.web3, CoinABI.networks[Object.keys(CoinABI.networks)[0]].address);
                    }
                },
                {
                    provide: CoinCrowdsale,
                    deps: [Web3InjectionToken],
                    useFactory: (web3InjectionToken: Web3InjectionToken) => {
                        return CoinCrowdsale.createAndValidate(web3InjectionToken.web3, CoinCrowdsaleABI.networks[Object.keys(CoinCrowdsaleABI.networks)[0]].address);
                    }
                }
            ]
        };
    }
}

```

You can use also `contracts` parameter inside forRoot configuration without importing private ContractsModule
```typescript

import { GapiModule } from '@gapi/core';
import { GapiEthereumModule } from '@gapi/ethereum';
import { Coin } from '../core/contracts/Coin';
import { CoinCrowdsale } from '../core/contracts/CoinCrowdsale';

const CoinCrowdsaleABI = require('../../../truffle/build/contracts/CoinCrowdsale.json');
const CoinABI = require('../../../truffle/build/contracts/Coin.json');

@GapiModule({
    imports: [
        GapiEthereumModule.forRoot({
            port: process.env.ETHEREUM_PORT || 8545,
            rpc: process.env.ETHEREUM_HOST || 'http://localhost',
            contracts: [
                {
                    contract: Coin,
                    abi: CoinABI
                },
                {
                    contract: CoinCrowdsale,
                    abi: CoinCrowdsaleABI
                }
            ]
        })
        // ContractsModule.forRoot()
    ]
})
export class CoreModule { }
```


Then use them inside your controller
```typescript
import {
    Query, GraphQLNonNull, Type,
    GapiController, GraphQLInt, Public
} from '@gapi/core';
import { CoinCrowdsale } from '../core/contracts/CoinCrowdsale';

@GapiObjectType()
export class EthereumCrowdsaleType {
    startTime: number | GraphQLScalarType = GraphQLInt;
    endTime: number | GraphQLScalarType = GraphQLInt;
    hasEnded: boolean | GraphQLScalarType = GraphQLBoolean;
    token: string | GraphQLScalarType = GraphQLString;
    weiRaised: number | GraphQLScalarType = GraphQLInt;
    wallet: string | GraphQLScalarType = GraphQLString;
}


@GapiController()
export class EthereumQueriesController {

    constructor(
        private crowdsale: CoinCrowdsale
    ) {}

    @Type(EthereumCrowdsaleType)
    @Public()
    @Query()
    async getCrowdsaleInfo(root, payload, context): Promise<EthereumCrowdsaleType>  {
        const crowdsale = await this.crowdsale;
        const crowdsaleType = {
            startTime: (await crowdsale.startTime).toNumber(),
            endTime: (await crowdsale.endTime).toNumber(),
            hasEnded: await crowdsale.hasEnded,
            token: await crowdsale.token,
            weiRaised: (await crowdsale.weiRaised).toNumber(),
            wallet: await crowdsale.wallet,
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
If you want to use Web3InjectionToken use it the following way
```typescript
import { GapiController } from '@gapi/core';
import { Web3InjectionToken } from '@gapi/ethereum';

@GapiController()
export class EthereumQueriesController {

    constructor(
        @Inject(Web3InjectionToken) private web3InjectionToken: Web3InjectionToken
    ) {
        this.web3InjectionToken.web3;
        this.web3InjectionToken.provider;
    }

}
```


Running private blockchain using Ganache with Docker

### Docker

The Simplest way to get started with the Docker image:

```Bash
docker run -d -p 8545:8545 trufflesuite/ganache-cli:latest
```

To pass options to ganache-cli through Docker simply add the arguments to
the run command:

```Bash
docker run -d -p 8545:8545 trufflesuite/ganache-cli:latest -a 10 --debug
```

To build the Docker container from source:

```Bash
git clone https://github.com/trufflesuite/ganache-cli.git && cd ganache-cli
docker build -t trufflesuite/ganache-cli .
```

TODO: Better documentation...

Enjoy ! :)
