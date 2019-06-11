import Link from 'next/link'
import { getEntryAPI } from '../utils/prismic'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../utils/link-resolver'

const WorkDetail = ({ data }) => {
    console.log(data)
    return (
        <div>
            <h1>{data.data.project_title}</h1>
        </div>
    )
}

WorkDetail.getInitialProps = async (context) => {
    const { slug: value } = context.query
    const fragment = 'my.work.uid'
    const data = await getEntryAPI({ fragment, value, context })
    return { data }
}

export default WorkDetail
