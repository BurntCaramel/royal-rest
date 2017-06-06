import React from 'react'
import Section from '../Section'
import Fetch from './Fetch'
import Axios from './Axios'

export default function FrontEndAPI(props) {
    return (
        <div>
            <Section>
                <h2>fetch</h2>
                <Fetch { ...props } />
            </Section>
            <Section>
                <h2>axios</h2>
                <Axios { ...props } />
            </Section>
        </div>
    )
}
