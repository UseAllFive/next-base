import PropTypes from 'prop-types'
import { Box } from 'rebass/styled-components'
import { getEntryAPI } from '../utils/prismic'
import { Slices } from '../components/slices'

const Page = ({ pageData }) => {
    const page = pageData.data

    return (
        <Box sx={{ fontStyle: 'italic' }}>
            <Slices body={page.body} />
        </Box>
    )
}

Page.getInitialProps = async (context) => {
    const { uid: value = 'home' } = context.query
    const fragment = 'my.page.uid'
    const pageData = await getEntryAPI({ fragment, value, context })
    return { pageData }
}

Page.propTypes = {
    pageData: PropTypes.object.isRequired,
}

export default Page
