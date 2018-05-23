"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@gapi/core");
const ethereum_config_1 = require("./ethereum.config");
const web3_injection_1 = require("./web3.injection");
const Web3 = require('web3');
let GapiEthereumModule = GapiEthereumModule_1 = class GapiEthereumModule {
    static forRoot(config) {
        return {
            gapiModule: GapiEthereumModule_1,
            services: [
                {
                    provide: ethereum_config_1.GapiEthereumConfig,
                    useValue: config || new ethereum_config_1.GapiEthereumConfig()
                },
                {
                    provide: web3_injection_1.Web3InjectionToken,
                    useFactory: () => {
                        const web3 = new Web3(null);
                        const provider = new web3.providers.HttpProvider(`${config.rpc}:${config.port}`);
                        web3.setProvider(provider);
                        return { provider, web3 };
                    }
                }
            ]
        };
    }
};
GapiEthereumModule = GapiEthereumModule_1 = __decorate([
    core_1.GapiModule({
        services: [
            ethereum_config_1.GapiEthereumConfig
        ]
    })
], GapiEthereumModule);
exports.GapiEthereumModule = GapiEthereumModule;
var GapiEthereumModule_1;
