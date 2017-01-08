import React from 'react'
import seeds from 'react-seeds'

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
        text: { lineHeight: '1.3rem', color: '#222' },
        padding: { left: '0.25em', right: '0.25em' },
        background: { color: '#f6f6f6' },
        border: { color: '#222', width: 1, style: 'solid' }
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
