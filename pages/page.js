import PropTypes from 'prop-types'
import Link from 'next/link'
import { Box, Heading, Text } from 'rebass/styled-components'
import { MotionBox } from '../components/motion-box'
// import Prismic from 'prismic-javascript'
// import { query } from '../utils/prismic'

const Page = ({ data = {} }) => {
    const { results } = data
    return (
        <MotionBox
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, stiffness: 100, ease: 'easeInOut' }}>
            <Link href="/page?uid=home" as="/">
                <Box as="a" href="/">
                    Home
                </Box>
            </Link>
            <Link href="/page?uid=about" as="/about">
                <Box as="a" href="/about">
                    About
                </Box>
            </Link>
            <Heading>Getting started with Next Base:</Heading>
            <Text>
                This is a starter kit for projects that wish to utilize Prismic, NextJS, and Express. Below are the
                instructions for getting this base setup correctly:
            </Text>
            <ol>
                <li>Create or login to your Prismic repo</li>
                <li>Go to settings and get or generate your API key</li>
                <li>
                    Copy the env.sample file and rename it to ".env", and place it in the root of this project:
                    <ul>
                        <li>Add your prismic key there: PRISMIC_ACCESS_TOKEN=MY_KEY_HERE</li>
                        <li>(optional) Add a username: USERNAME=my_username</li>
                        <li>(optional) Add a password: PASSWORD=my_password</li>
                    </ul>
                </li>

                <li>
                    Go to /constants/prismic.js and update the PRISMIC_API_URL information there to point to your
                    Prismic repo
                </li>
                <li>Go to /constants/metadata.js and update the DEFAULT_METADATA there</li>
                <li>Go to /constants/analytics.js and update your GA_TRACKING_ID</li>
                <li>Update the /public/manifest.json so your app can be accessed offline</li>
                <li>
                    Uncomment this getInitialProps function in this file and update as necessary to get data for your
                    project. Remember to also uncomment the appropriate imports too
                </li>
                <li>
                    If connected successfully, you will see data below. Then feel free to remove these instructions and
                    any code that you don’t need (hopefully there’s not too much of that)
                </li>
            </ol>
            <Box as="pre">{JSON.stringify(results, null, 2)}</Box>
        </MotionBox>
    )
}

// Page.getInitialProps = async (ctx) => {
//     const { uid = 'home' } = ctx.query
//     // Replace with your query
//     const data = await query({
//         predicates: Prismic.Predicates.at('my.page.uid', uid),
//         context: ctx,
//     })

//     return { data }
// }

Page.propTypes = {
    data: PropTypes.object,
}

export default Page
