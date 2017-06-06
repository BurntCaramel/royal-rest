import React from 'react'
import * as colors from '../colors'

const styles = {
    pre: {
        paddingLeft: '0.5em', paddingRight: '0.5em', paddingTop: '0.25em', paddingBottom: '0.25em',
        textAlign: 'left',
        color: colors.text.normal,
        whitespace: 'pre-wrap',
        backgroundColor: colors.lightness.normal
    }
}

export default function Code({ children }) {
    return (
        <pre
            children={ children.trim() }
            style={ styles.pre }
        >
        </pre>
    )
}
