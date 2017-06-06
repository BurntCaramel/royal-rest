import React from 'react'
import Code from './Code'

export default function FetchCode({ collectionName }) {
    return (
        <Code>
        {`
// api/${collectionName}.js

function fetchAPI(path, options) {
    return fetch(process.env.API_URL + path, options)
}

export function create(props) {
    postAPI('/${collectionName}', props)
}

export function list() {
    fetchAPI('/${collectionName}')
}

export function fetch(id) {
    fetchAPI(\`/${collectionName}/\${ id }\`)
}

export function update(id, changes) {
    patchAPI(\`/${collectionName}/\${ id }\`, changes)
}

export function delete(id) {
    deleteAPI(\`/${collectionName}/\${ id }\`)
}`
        }
        </Code>
    )
}
