import React from 'react'
import Label from './Label'
import * as colors from './colors'

const styles = {
    input: ({ hasTitle, grow, width }) => ({
        flexGrow: grow,
        width,
        marginLeft: hasTitle ? '0.5em' : null,
        fontSize: '1rem',
        lineHeight: '1.3rem', color: colors.action.normal,
        paddingLeft: '0.25em', paddingRight: '0.25em',
        backgroundColor: colors.lightness.normal,
        borderColor: colors.action.normal, borderWidth: 1, borderStyle: 'solid',
        borderRadius: 2
    })
}

export default function Field({ value, title, grow, width, onChange }) {
    const hasTitle = (title != null)
    const input = (
        <input
            value={ value }
            onChange={ onChange }
            style={ styles.input({
                hasTitle,
                grow,
                width
            }) }
        />
    )

    return (
        <Label title={ title } children={ input } />
    )
}
