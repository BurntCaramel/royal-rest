import React from 'react'
import Section from './Section'
import Field from './Field'
import Choice from './Choice'
import Button from './Button'

const typeChoices = [
    { id: 'string', title: 'String' },
    { id: 'number', title: 'Number' }
]

const requiredChoices = [
    { id: true, title: 'Required' },
    { id: false, title: 'Optional' }
]

const style = {
    display: 'flex', flexDirection: 'column'
}

export default function SchemaEditor({
    schema,
    onAdd,
    onRemove,
    onChangeName,
    onChangeType,
    onChangeRequired
}) {
    return (
        <div style={ style }>
        {
            schema.map(({ name, type, required = true }, index) => (
                (name === 'id') ? (
                    <noscript key={ name } />
                ) : (
                    <Section key={ index }>
                        <Field key={ `name-${index}` }
                            title='name'
                            value={ name }
                            width='14em'
                            onChange={ (event) => {
                                onChangeName(index, event.target.value)
                            } }
                        />
                        <Choice key={ `type-${index}` }
                            title='type'
                            chosenID={ type }
                            choices={ typeChoices }
                            width='14em'
                            onChange={ (event) => {
                                onChangeType(index, event.target.value)
                            } }
                        />
                        <Choice key={ `required-${index}` }
                            title='required'
                            chosenID={ required }
                            choices={ requiredChoices }
                            width='14em'
                            onChange={ (event) => {
                                onChangeRequired(index, event.target.value)
                            } }
                        />
                        <Button
                            title='Remove'
                            onClick={ () => { onRemove(index) } }
                        />
                    </Section>
                )
            ))
        }
            <Button
                title='Add'
                onClick={ onAdd }
            />
        </div>
    )
}
