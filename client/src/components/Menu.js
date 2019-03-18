import React from 'react';
import { Button, } from 'semantic-ui-react'
import MenuForm from './MenuForm'

class Menu extends React.Component {
  state = { showEdit: false, };

  toggleEdit = () => this.setState({ showEdit: !this.state.showEdit, });

  render(){ 
    return(
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
    )
  }
};

export default Menu;