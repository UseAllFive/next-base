import Prismic from 'prismic-javascript'
import getCookies from 'next-cookies'
import { PRISMIC_API_URL } from '../constants/prismic'

// Generates a singleton Prismic intstance
const getPrismicApi = async () => {
    return Prismic.getApi(PRISMIC_API_URL, {
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
    })
}

// Queries Prismic instance based on predicates, options and context
// https://prismic.io/docs/javascript/query-the-api/query-predicates-reference
// See example in pages/index.js for how this works
const query = async ({ predicates, options = {}, context }) => {
    const cookies = getCookies(context)
    const ref = cookies['io.prismic.preview']
    const api = await getPrismicApi()
    return api.query(predicates, { ref, ...options })
}

export { query, getPrismicApi }
