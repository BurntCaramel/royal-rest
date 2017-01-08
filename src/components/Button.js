import React from 'react'
import { Seed } from 'react-seeds'
import * as colors from './colors'

const styles = {
    font: { size: '1rem' },
    text: { lineHeight: '1.3rem', color: '#f6f6f6' },
    padding: { base: '0.1em', left: '0.5em', right: '0.5em' },
    background: { color: colors.action.normal },
    border: 'none'
}

export default function Button({ title, onClick }) {
    return (
        <Seed Component='button'
            children={ title }
            onClick={ onClick }
            { ...styles }
        />
    )
}
