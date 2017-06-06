import R from 'ramda'
import React from 'react'
import * as colors from './colors'

const goodStatus = (status) => status >= 200 && status < 400
// Status colors from Material UI
const colorForStatus = (status) => goodStatus(status) ? '#689F38' : '#EF6C00'

const textForStatus = R.prop(R.__, {
    200: 'OK',
    201: 'Created',
    204: 'No Content',
    404: 'Not Found'
})

const styles = {
    json: (status) => ({
        paddingLeft: '0.5em', paddingRight: '0.5em', paddingTop: '0.25em', bpaddingBottom: '0.25em',
        textAlign: 'left',
        color: colorForStatus(status),
        whitespace: 'pre-wrap',
        backgroundColor: colors.lightness.normal
    })
}

export default function Result({ status, json }) {
    return (
        <pre style={ styles.json(status) }>
            <span>
                { 'HTTP/1.1 ' }
                { status }
                { ' ' }
                { textForStatus(status) }
            </span>
            { json && '\n' }
            { json && 'Content-Type: application/json' }
            { '\n\n' }
            { JSON.stringify(json, null, 2) }
        </pre>
    )
}
