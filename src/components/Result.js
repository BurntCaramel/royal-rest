import R from 'ramda'
import React from 'react'
import seeds, { Seed } from 'react-seeds'

const goodStatus = (status) => status >= 200 && status < 400

const textForStatus = R.prop(R.__, {
    200: 'OK',
    404: 'Not Found'
})

const styles = {
    json: {
        padding: { left: '0.5em', right: '0.5em', top: '0.25em', bottom: '0.25em' },
        text: { align: 'left', color: '#f6f6f6' },
        background: { color: '#222' }
    },
    status: (status) => ({
        text: { color: goodStatus(status) ? 'green' : 'orange' }
    })
}

export default function Result({ status, json }) {
    return (
        <Seed { ...styles.resource }>
            <Seed Component='pre' { ...styles.json }>
                <span { ...seeds(styles.status(status)) }>
                    { status }
                    { ' ' }
                    { textForStatus(status) }
                </span>
                { '\n' }
                { JSON.stringify(json, null, 2) }
            </Seed>
        </Seed>
    )
}
