import React, { PureComponent } from 'react';
import Tabs from './components/Tabs'
import Resources from './components/Resources'
import './App.css';

const tabItems = [
  // { title: 'Database', id: 'database' },
  // { title: 'API', id: 'api' },
  // { title: 'Client', id: 'client' }
  { title: 'Model', id: 'model' },
  { title: 'API Routes', id: 'routes' }//,
  //{ title: 'Client', id: 'client' }
]

class App extends PureComponent {
  render() {
    return (
      <div className="App">
        <Tabs
          items={ tabItems }
          selectedID='routes'
          onSelectTab={ (id) => {} }
        />
        <Resources />
      </div>
    );
  }
}

export default App;
