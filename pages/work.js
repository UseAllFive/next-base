import Link from 'next/link'
import { getEntryAPI } from '../utils/prismic'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../utils/link-resolver'
import Prismic from 'prismic-javascript'

const Work = ({ data }) => {
    const work = data
    return (
        <div>
            <ul>
                {work.map((item) => (
                    <li key={item.uid}>
                        <Link href={`/work-detail?slug=${item.uid}`} as={`/work/${item.uid}`} prefetch>
                            <a>{item.data.project_title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

Work.getInitialProps = async (context) => {
    const predicates = [Prismic.Predicates.at('document.type', 'work')]
    let categoryCacheString = ''
    const query = context.query

    if (query.industry) {
        categoryCacheString += query.industry
        const industry = await getEntryAPI({
            context,
            fragment: 'my.industry.uid',
            value: query.industry,
        })
        if (industry && industry.id) {
            predicates.push(Prismic.Predicates.at('my.work.industries', industry.id))
        }
    }

    if (query.discipline) {
        categoryCacheString += query.discipline
        const discipline = await getEntryAPI({
            context,
            fragment: 'my.discipline.uid',
            value: query.discipline,
        })
        if (discipline && discipline.id) {
            predicates.push(Prismic.Predicates.at('my.work.disciplines', discipline.id))
        }
    }

    const multiple = true
    const customPredicate = predicates
    const customPredicateKey = `work-items${categoryCacheString}`
    const data = await getEntryAPI({ customPredicateKey, customPredicate, multiple, context })
    return { data }
}

export default Work
// industry: fashion: XP7yuBAAACAAxlxx | tech: XP7y1hAAACEAxlz5
// discipline: Creative Direction: XP76XRAAAB4Axn5K |
