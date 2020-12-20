const cracoLessPlugin = require('craco-less');
const cracoAlias = require("craco-alias");

module.exports = {
    devServer:(devServerConfig)=>{
        return {...devServerConfig,...{
                proxy: {
                    '/api': 'http://10.147.20.228:2083'
                }
            }}
    },
    plugins: [
        {
            plugin: cracoLessPlugin,
            options: {
                lessLoaderOptions: {
                    lessOptions: {
                        modifyVars: { '@primary-color': '#1DA57A' },
                        javascriptEnabled: true,
                    },
                },
            },
        },
        {
            plugin: cracoAlias,
            options: {
                aliases:{
                    '@':'./src'
                }
            }
        }
    ],
};
