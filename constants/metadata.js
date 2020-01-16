const isProd = process.env.NODE_ENV === 'production'

// Update MY_DOMAIN to be your actulal domain. Leave off the protocol.
const origin = isProd ? `www.mysite.com` : `localhost:${process.env.PORT}`

// Update with your metadata defaults
export const DEFAULT_METADATA = {
    title: 'Use All Five',
    description: 'Use all five does things',
    image: `//${origin}/images/share.jpg`,
    suffix: 'Use All Five',
    divider: '|',
}
