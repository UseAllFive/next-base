import Prismic from 'prismic-javascript'
import getCookies from 'next-cookies'
import { PRISMIC_API_URL } from '../config'

let _instance

const getPrismicApi = async () => {
    if (!_instance) {
        _instance = Prismic.api(PRISMIC_API_URL, {
            accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        })
    }
    return _instance
}

const query = async ({ predicates, options = {}, context }) => {
    const cookies = getCookies(context)
    const ref = cookies['io.prismic.preview']
    const api = await getPrismicApi()
    return api.query(predicates, { ref, ...options })
}

export { query, getPrismicApi }
