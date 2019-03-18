import React from 'react';
import ItemForm from './ItemForm';
import { Button, } from 'semantic-ui-react';

class Item extends React.Component {
  state = { toggleEdit: false }

  toggleEdit = () => this.setState({ showEdit: !this.state.showEdit, });

  render(){
    return(
      <div>
          {
            this.state.showEdit ?
            <ItemForm
            id={this.props.item.id}
            {...this.props }
            updateItem={this.props.updateItem}
            toggleEdit={this.toggleEdit}
            />
          :
            <div>
              {this.props.item.name} {this.props.item.price}
            </div>
          }
          <Button onClick={this.toggleEdit}>
            Edit
          </Button>
          <Button onClick={() => this.props.destroyItem(this.props.item.id)}>
            Delete
          </Button>
      </div>
    )
  }
}

export default Item