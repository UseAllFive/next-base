import Link from 'next/link'
import { getEntryAPI } from '../utils/prismic'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from '../utils/link-resolver'
import { Hero } from '../components/hero'

const Home = ({ data }) => {
    const page = data.data

    const clicked = () => {
        console.log('clicked')
    }

    return (
        <div>
            <Hero onClick={clicked} title={RichText.render(page.headline, linkResolver)}></Hero>
            <Link href="/work" prefetch>
                <a>Work</a>
            </Link>
        </div>
    )
}

Home.getInitialProps = async (context) => {
    const fragment = 'document.type'
    const value = 'home_page'
    const data = await getEntryAPI({ fragment, value, context })
    return { data }
}

export default Home
