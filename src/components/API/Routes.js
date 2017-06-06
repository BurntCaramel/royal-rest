import React from 'react'
import Section from '../Section'
import Button from '../Button'
import Field from '../Field'
import ResourceEditor from '../ResourceEditor'

const styles = {
    routeHeading: {
        display: 'flex', flexDirection: 'row',
        width: '18em',
        alignItems: 'baseline',
        justifyContent: 'left',
        marginBottom: '0.5rem'
    }
}

const RouteHeading = ({
    method,
    path,
    showItemField = false,
    itemID,
    onAction,
    onChangeItemID
}) => (
    <p styles={{ ...styles.routeHeading }}>
        <Button
            title={ method }
            onClick={ onAction }
        />
        <span>&nbsp;</span>
        { path }
        { showItemField &&
            <span>&nbsp;</span>
        }
        { showItemField &&
            <Field
                value={ itemID }
                width='20em'
                onChange={ onChangeItemID }
            />
        }
    </p>
)

export default function Routes({
    pluralName,
    schema,
    itemID,
    createValues,
    updateValues,
    onChangeCreatedField,
    onChangeUpdatedField,
    onChangeItemID,
    onCreateItem,
    onListItems,
    onReadItem,
    onUpdateItem,
    onDeleteItem
}) {
    return (
        <div>
            <Section>
                <h2>Create</h2>
                <RouteHeading
                    method='POST'
                    path={ `/${ pluralName }` }
                    onAction={ onCreateItem }
                />
                <ResourceEditor
                    schema={ schema }
                    values={ createValues }
                    onChangeField={ onChangeCreatedField }
                />
            </Section>
            <Section>
                <h2>Read</h2>
                <RouteHeading
                    method='GET'
                    path={ `/${ pluralName }` }
                    onAction={ onListItems }
                />
                <RouteHeading
                    method='GET'
                    path={ `/${ pluralName }/` }
                    showItemField
                    itemID={ itemID }
                    onChangeItemID={ onChangeItemID }
                    onAction={ onReadItem }
                />
            </Section>
            <Section>
                <h2>Update</h2>
                <RouteHeading
                    method='PATCH'
                    path={ `/${ pluralName }/` }
                    showItemField
                    itemID={ itemID }
                    onChangeItemID={ onChangeItemID }
                    onAction={ onUpdateItem }
                />
                <ResourceEditor
                    schema={ schema }
                    values={ updateValues }
                    onChangeField={ onChangeUpdatedField }
                />
            </Section>
            <Section>
                <h2>Delete</h2>
                <RouteHeading
                    method='DELETE'
                    path={ `/${ pluralName }/` }
                    showItemField
                    itemID={ itemID }
                    onChangeItemID={ onChangeItemID }
                    onAction={ onDeleteItem }
                />
            </Section>
        </div>
    )
}
