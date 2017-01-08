import R from 'ramda'
import React from 'react'
import seeds, { Seed } from 'react-seeds'
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
        padding: { left: '0.5em', right: '0.5em', top: '0.25em', bottom: '0.25em' },
        text: { align: 'left', color: colorForStatus(status), whitespace: 'pre-wrap' },
        background: { color: colors.lightness.normal }
    })
}

export default function Result({ status, json }) {
    return (
        <Seed { ...styles.resource }>
            <Seed Component='pre' { ...styles.json(status) }>
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
            </Seed>
        </Seed>
    )
}
