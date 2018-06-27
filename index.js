"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@rxdi/core");
const ethereum_config_1 = require("./ethereum.config");
const web3_injection_1 = require("./web3.injection");
const helpers_1 = require("./helpers");
const Web3 = require("web3");
let EthereumModule = EthereumModule_1 = class EthereumModule {
    static forRoot(config) {
        let UserAddedContracts = [];
        if (config.contracts && config.contracts.length) {
            config.contracts.forEach(i => UserAddedContracts.push({
                provide: i.contract,
                deps: [web3_injection_1.Web3Token],
                lazy: true,
                useFactory: (web3) => __awaiter(this, void 0, void 0, function* () { return yield i.contract.createAndValidate(web3, helpers_1.getContractAddress(i.abi)); })
            }));
        }
        return {
            module: EthereumModule_1,
            services: [
                {
                    provide: ethereum_config_1.EthereumConfig,
                    useValue: config || new ethereum_config_1.EthereumConfig()
                },
                {
                    provide: web3_injection_1.Web3Token,
                    useValue: new Web3(null)
                },
                {
                    provide: web3_injection_1.Web3ProviderToken,
                    deps: [web3_injection_1.Web3Token],
                    useFactory: (web3) => {
                        const provider = new web3.providers.HttpProvider(`${config.rpc}:${config.port}`);
                        web3.setProvider(provider);
                        return provider;
                    }
                },
                ...UserAddedContracts
            ]
        };
    }
};
EthereumModule = EthereumModule_1 = __decorate([
    core_1.Module({
        services: [ethereum_config_1.EthereumConfig]
    })
], EthereumModule);
exports.EthereumModule = EthereumModule;
__export(require("./ethereum.config"));
__export(require("./web3.injection"));
__export(require("./web3.typings"));
__export(require("./helpers"));
var EthereumModule_1;
