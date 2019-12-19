const isProd = process.env.NODE_ENV === 'production'
const origin = isProd ? `www.useallfive.com` : `localhost:${process.env.PORT}`
// Update with your Prismic API URL
const PRISMIC_API_URL = 'https://useallfive.prismic.io/api/v2'
// Update with your metadata defaults
const DEFAULT_METADATA = {
    title: 'Use All Five',
    description: 'Use all five does things',
    image: `//${origin}/images/share.jpg`,
    suffix: 'Use All Five',
    divider: '|',
}

module.exports = {
    PRISMIC_API_URL,
    DEFAULT_METADATA,
}
