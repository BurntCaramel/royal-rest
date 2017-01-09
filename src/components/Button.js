import React from 'react'
import { Seed } from 'react-seeds'
import * as colors from './colors'

const styles = ({ selected }) => ({
    font: { size: '1rem' },
    text: { lineHeight: '1.3rem', color: colors.action.normal },
    padding: { base: '0.1em', left: '0.5em', right: '0.5em' },
    background: { color: colors.action.highlight },
    border: { width: 1, style: 'solid', color: colors.action.normal },
    cornerRadius: 5,
    cursor: 'pointer'
})

export default function Button({ title, selected = false, onClick }) {
    return (
        <Seed Component='button'
            children={ title }
            onClick={ onClick }
            { ...styles({ selected }) }
        />
    )
}
