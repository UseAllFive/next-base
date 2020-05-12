const withOffline = require('next-offline')

module.exports = withOffline({
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
        return config
    },
})
