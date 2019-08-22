require('dotenv').config()
const withCSS = require('@zeit/next-css')
const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = withCSS({
    webpack: (_config) => {
        const config = _config
        config.module.rules.push({
            test: /\.svg$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        svgo: false,
                    },
                },
            ],
        })
        config.plugins = config.plugins || []
        config.plugins = [
            ...config.plugins,

            // Read the .env file
            new Dotenv({
                path: path.join(__dirname, '.env'),
                systemvars: true,
            }),
        ]
        return config
    },
})
