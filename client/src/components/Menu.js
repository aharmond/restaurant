import React from 'react';
import { Button, } from 'semantic-ui-react';
import MenuForm from './MenuForm';
import ItemForm from './ItemForm';
import Items from './Items';
import axios from 'axios';

class Menu extends React.Component {
  state = { items: [], showEdit: false, showNewItem: false };

  componentDidMount() {
    axios.get(`/api/menus/${this.props.menu.id}/items`)
      .then( res => {
        this.setState({ items: res.data, });
      })
      .catch( err => {
        console.log(err);
      })
  }

  createItem = (ItemData) => {
    axios.post(`/api/menus/${this.props.menu.id}/items`, ItemData)
      .then( res => {
        const { items, } = this.state;
        this.setState({ items: [...items, res.data], })
      })
  }

  destroyItem = (id) => {
    axios.delete(`/api/menus/${this.props.menu.id}/items/${id}`)
      .then( res => {
        const { items, } = this.state;
        this.setState({ items: items.filter( i => i.id !== id), })
      })
  }

  updateItem = (ItemData) => {
    axios.put(`/api/menus/${this.props.menu.id}/items/${ItemData.id}`, ItemData)
      .then( res => {
        const items = this.state.items.map( i => {
          if (i.id === ItemData.id)
            return res.data;
          return i;
        })
        this.setState({ items, })
      })
  }

  toggleEdit = () => this.setState({ showEdit: !this.state.showEdit, });

  toggleNewItem = () => this.setState({ showNewItem: !this.state.showNewItem, });

  render(){ 
    return(
      <div>
        <div>
            {
              this.state.showEdit ?
              <MenuForm 
              id={this.props.menu.id}
              { ...this.props }
              updateMenu={this.props.updateMenu} 
              toggleEdit={this.toggleEdit}  
              />
            :
              <div>
                <h1> {this.props.menu.name} </h1>
                <h2> {this.props.menu.times} </h2>
              </div>
            }
          <Button onClick={this.toggleEdit}>
            Edit
          </Button>
          <Button onClick={() => this.props.destroyMenu(this.props.menu.id)}>
            Delete
          </Button>
        </div>
        <div>
          <Button onClick={this.toggleNewItem}>
            New Item
          </Button>
          {
            this.state.showNewItem ?
            <ItemForm
            createItem={this.createItem}
            toggleNewItem={this.toggleNewItem}
            updateItem={this.updateItem}
            />
            :
            null
          }
        </div>
        <div>
          <Items
            items={this.state.items}
            destroyItem={this.destroyItem}
            updateItem={this.updateItem}
          />
        </div>
      </div>
    )
  }
};

export default Menu;