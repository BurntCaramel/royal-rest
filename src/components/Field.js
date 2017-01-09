import React from 'react'
import seeds from 'react-seeds'
import * as colors from './colors'

const styles = {
    label: {
        row: true,
        alignItems: 'baseline',
        justifyContent: 'center',
        text: { lineHeight: '1.3rem' }
    },
    input: ({ hasTitle, grow, width }) => ({
        grow,
        width,
        margin: { left: hasTitle ? '0.5em' : null },
        font: { size: '1rem' },
        text: { lineHeight: '1.3rem', color: colors.action.normal },
        padding: { left: '0.25em', right: '0.25em' },
        background: { color: colors.lightness.normal },
        border: { color: colors.action.normal, width: 1, style: 'solid' },
        cornerRadius: 2
    })
}

export default function Field({ value, title, grow, width, onChange }) {
    const hasTitle = (title != null)
    const input = (
        <input
            value={ value }
            onChange={ onChange }
            { ...seeds(styles.input({
                hasTitle,
                grow,
                width
            })) }
        />
    )

    return (
        (hasTitle) ? (
            <label { ...seeds(styles.label) }>
                <span>{ title }</span>
                { input }
            </label>
        ) : (
            input
        )
    )
}
