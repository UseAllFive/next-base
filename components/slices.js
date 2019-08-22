import PropTypes from 'prop-types'

const Slices = ({ body }) => {
    return (
        <>
            {body.map((slice, i) => {
                let Component
                switch (slice.slice_type) {
                    default:
                        Component = <div>No slice found</div>
                        break
                }
                return <div key={i}>{Component}</div>
            })}
        </>
    )
}

Slices.propTypes = {
    body: PropTypes.array.isRequired,
}

export { Slices }
