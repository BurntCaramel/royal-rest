import React, { PureComponent } from 'react';
import Section from './Section'
import Tabs from './Tabs'
import SchemaEditor from './SchemaEditor'
import Resources from './Resources'
import FrontEndAPI from './Code/FrontEndAPI'
import Field from './Field'
//import addHandlers from './addHandlers'
import { addHandlers } from 'react-ramda'
import * as schemaStateChangers from '../stateChangers/schema'

const tabItems = [
  // { title: 'Database', id: 'database' },
  // { title: 'API', id: 'api' },
  // { title: 'Client', id: 'client' }
  { title: 'Schema', id: 'schema' },
  { title: 'Query', id: 'query' },
  { title: 'API', id: 'api' },
  { title: 'Fetch', id: 'fetch' },
  //{ title: 'Client', id: 'client' }
]

class Collection extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      sectionID: 'api',
      collectionName: 'items',
      schema: [
        { name: 'id', type: 'string', required: true },
        { name: 'firstName', type: 'string', required: true },
        { name: 'lastName', type: 'string', required: true }
      ],
      collection: [],
      itemID: 'id'
    }

    addHandlers(this, {
      changeState: schemaStateChangers
    })
  }

  render() {
    const { sectionID, collectionName, schema } = this.state
    return (
      <div>
        <Section>
          <Field
            value={ collectionName }
            title='Collection name'
            width='8em'
            onChange={ this.handleEvent('collectionName') }
          />
        </Section>
        <Section>
          <Tabs
            items={ tabItems }
            selectedID={ sectionID }
            onSelectTab={ this.handleValue('sectionID') }
          />
        </Section>
        {
          (sectionID === 'schema') ? (
            <SchemaEditor
              schema={ schema }
              onAdd={ this.addSchemaItem }
              onRemove={ this.removeSchemaItem }
              onChangeName={ this.handleArrayProp('schema', 'name') }
              onChangeType={ this.handleArrayProp('schema', 'type') }
              onChangeRequired={ this.handleArrayProp('schema', 'required') }
            />
          ) : (sectionID === 'api') ? (
            <Resources
              collectionName={ collectionName }
            />
          ) : (sectionID === 'fetch') ? (
            <FrontEndAPI
              collectionName={ collectionName }
            />
          ) : (
            null
          )
        }
      </div>
    );
  }
}

export default Collection
