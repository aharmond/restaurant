import React from 'react';
import MenuOverview from './components/MenuOverview';
import MenuForm from './components/MenuForm';
import axios from 'axios';
import { Container, } from 'semantic-ui-react';

class App extends React.Component {
  state = { menus: [], };

  componentDidMount() {
    axios.get("/api/menus")
      .then( res => {
        this.setState({ menus: res.data, });
      })
      .catch( err => {
        console.log(err);
      })
  }

  createMenu = (MenuData) => {
    axios.post('/api/menus', MenuData )
      .then( res => {
        const { menus, } = this.state;
        this.setState({ menus: [...menus, res.data], });
      })
  }

  destroyMenu = (id) => {
    axios.delete(`/api/menus/${id}`)
      .then( res => {
        const { menus, } = this.state;
        this.setState({ menus: menus.filter( m => m.id !== id), })
      })
  }

  updateMenu = (MenuData) => {
    axios.put(`/api/menus/${MenuData.id}`, MenuData)
      .then( res => {
        const menus = this.state.menus.map( m => {
          if (m.id === MenuData.id)
            return res.data;
          return m;
        });
        this.setState({ menus, });
      })
  }

  render() {
    return (
      <Container>
        <MenuForm 
          createMenu={this.createMenu}
        />
        <br />
        <br />
        <MenuOverview 
          menus={this.state.menus}
          destroyMenu={this.destroyMenu}
          updateMenu={this.updateMenu}
        />
      </Container>
    );
  }
}

export default App;
