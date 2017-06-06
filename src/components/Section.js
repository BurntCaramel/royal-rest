import React from 'react'

const style = {
    display: 'flex', flexDirection: 'column',
    marginBottom: '1rem',
    alignItems: 'center'
}

const Section = (props) => (
    <section {...props } style={ style } />
)

export default Section
