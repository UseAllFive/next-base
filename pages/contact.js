import Link from 'next/link'
import { getEntryAPI } from '../utils/prismic'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../utils/link-resolver'

const Contact = ({ pageData }) => {
    const page = pageData.data
    return <div>{RichText.render(page.headline, linkResolver)}</div>
}

Contact.getInitialProps = async (context) => {
    const fragment = 'document.type'
    const value = 'contact'
    const pageData = await getEntryAPI({ fragment, value, context })
    return { pageData }
}

export default Contact
