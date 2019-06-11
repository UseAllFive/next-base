const isProd = process.env.NODE_ENV === 'production'
const origin = isProd ? `www.useallfive.com` : `localhost:${process.env.PORT}`
const PRISMIC_API_URL = 'https://useallfive.prismic.io/api/v2'
const DEFAULT_METADATA = {
    title: 'Use All Five',
    description: 'Use all five does things',
    image: `//${origin}/static/images/share.jpg`,
    suffix: 'Use All Five',
    divider: '|',
}

module.exports = {
    PRISMIC_API_URL,
    DEFAULT_METADATA,
}
