import React from 'react'
import { Seed } from 'react-seeds'
import * as colors from './colors'

const styles = ({ selected, tab }) => ({
    grow: tab ? 1 : null,
    font: { size: '1rem' },
    text: { lineHeight: '1.3rem', color: colors.action[selected ? 'highlight' : 'normal'] },
    padding: { base: '0.1em', left: '0.5em', right: '0.5em' },
    background: { color: colors.action[selected ? 'normal' : 'highlight'] },
    border: { width: tab ? 0 : 1, style: 'solid', color: colors.action.normal },
    cornerRadius: tab ? 0 : 5,
    cursor: 'pointer'
})

export default function Button({ title, selected = false, tab = false, classes, onClick }) {
    return (
        <Seed Component='button'
            children={ title }
            classes={ classes }
            onClick={ onClick }
            { ...styles({ selected, tab }) }
        />
    )
}
