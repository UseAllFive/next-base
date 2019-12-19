import PropTypes from 'prop-types'
import { Box } from 'rebass/styled-components'
import Prismic from 'prismic-javascript'
import { query } from '../utils/prismic'

const Index = ({ data }) => {
    const { results } = data
    return <Box as="pre">{JSON.stringify(results, null, 2)}</Box>
}

Index.getInitialProps = async (ctx) => {
    // Replace with your query
    const data = await query({
        predicates: Prismic.Predicates.at('my.page.uid', 'home'),
        context: ctx,
    })

    return { data }
}

Index.propTypes = {
    data: PropTypes.object.isRequired,
}

export default Index
