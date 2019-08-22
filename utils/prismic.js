import Prismic from 'prismic-javascript'
import getCookies from 'next-cookies'
import { PRISMIC_API_URL } from '../config'
import { toParamsString } from './helpers'

const isServer = typeof window === 'undefined'
const _cache = {}
let _cachedAPI = false

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
        let cacheKey
        if (!customPredicate) {
            p = Prismic.Predicates.at(fragment, value)
            cacheKey = `${fragment}:${value}${Object.keys(options).length > 0 ? `:${toParamsString(options)}` : ''}`
        } else {
            p = customPredicate
            cacheKey = customPredicateKey
        }
        const cookies = getCookies(context)
        const ref = cookies['io.prismic.preview']
        if (!_cachedAPI || isServer) {
            _cachedAPI = await Prismic.api(PRISMIC_API_URL, {
                accessToken: process.env.PRISMIC_ACCESS_TOKEN,
            })
        }
        if (!_cache[cacheKey] || isServer) {
            const response = await _cachedAPI.query(p, { ref, ...options })
            _cache[cacheKey] = multiple ? response.results : response.results[0]
        }

        return _cache[cacheKey]
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
        return error
    }
}

const getDisciplines = async (context) => {
    return getEntryAPI({
        multiple: true,
        fragment: 'document.type',
        value: 'discipline',
        context,
    })
}

const getIndustries = async (context) => {
    return getEntryAPI({
        multiple: true,
        fragment: 'document.type',
        value: 'industry',
        context,
    })
}

export { getEntryAPI, getIndustries, getDisciplines }
