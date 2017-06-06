import React from 'react'
import Code from './Code'

export default function AxiosCode({ collectionName }) {
    return (
        <Code>
        {`
// api/${collectionName}.js

import axios from 'axios'

const api = axios.create({
    baseURL: process.env.API_URL
})

export function create(props) {
    return api.post('/${collectionName}', props)
}

export function list() {
    return api.get('/${collectionName}')
}

export function fetch(id) {
    return api.get(\`/${collectionName}/\${ id }\`)
}

export function update(id, changes) {
    return api.patch(\`/${collectionName}/\${ id }\`, changes)
}

export function delete(id) {
    return api.delete(\`/${collectionName}/\${ id }\`)
}`
        }
        </Code>
    )
}
