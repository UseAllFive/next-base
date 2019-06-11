import Prismic from 'prismic-javascript'
import getCookies from 'next-cookies'
import { PRISMIC_API_URL } from '../config'
import { toParamsString } from './helpers'

const isServer = typeof window === 'undefined'
const _cache = {}
let _cachedAPI = false

const getCategoryIdBySlug = async (context, slug, categoryType) => {}

const getDisciplines = async (context) => {
    return await getEntryAPI({
        multiple: true,
        fragment: 'document.type',
        value: 'discipline',
        context,
    })
}

const getIndustries = async (context) => {
    return await getEntryAPI({
        multiple: true,
        fragment: 'document.type',
        value: 'industry',
        context,
    })
}

const getEntryAPI = async ({
    context,
    fragment,
    value,
    multiple = false,
    options = {},
    customPredicate,
    customPredicateKey,
}) => {
    try {
        // Allow user to add a completely different predicate
        let p
        let cache_key
        if (!customPredicate) {
            p = Prismic.Predicates.at(fragment, value)
            cache_key = `${fragment}:${value}${Object.keys(options).length > 0 ? ':' + toParamsString(options) : ''}`
        } else {
            p = customPredicate
            cache_key = customPredicateKey
        }
        const cookies = getCookies(context)
        const ref = cookies['io.prismic.preview']
        if (!_cachedAPI || isServer) {
            _cachedAPI = await Prismic.api(PRISMIC_API_URL, {
                accessToken: process.env.PRISMIC_ACCESS_TOKEN,
            })
        }
        if (!_cache[cache_key] || isServer) {
            const response = await _cachedAPI.query(p, { ref, ...options })
            _cache[cache_key] = multiple ? response.results : response.results[0]
        }

        return _cache[cache_key]
    } catch (error) {
        console.error(error)
        return error
    }
}

export { getEntryAPI, getIndustries, getDisciplines }
