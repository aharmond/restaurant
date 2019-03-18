import React from 'react';
import { Form, } from 'semantic-ui-react';

class ItemForm extends React.Component {
  state = { name: "", price: "", }

  componentDidMount() {
    if (this.props.id)
      this.setState({ name: this.props.item.name, price: this.props.item.price, });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.id) {
      this.props.updateItem({id: this.props.item.id, ...this.state});
      this.props.toggleEdit();
    } else {
      this.props.createItem(this.state);
      this.props.toggleNewItem();
    }
      this.setState({ name: "", price: "", });
  }

  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input
            label="Item"
            placeholder="Name"
            required
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Price"
            required
            name="price"
            value={this.state.price}
            onChange={this.handleChange}
          />
          <Form.Button>Submit</Form.Button>
        </Form.Group>
      </Form>
    )
  }
}

export default ItemForm;