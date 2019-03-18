import React from 'react';
import { Form, } from 'semantic-ui-react';

class MenuForm extends React.Component {
  state = { name: "", times: "", }

  componentDidMount() {
    if (this.props.id)
      this.setState({ name: this.props.menu.name, times: this.props.menu.times, });
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.props.menu.id) {
      this.props.updateMenu({id: this.props.menu.id, ...this.state});
      this.props.toggleEdit()
    } else {
      this.props.createMenu(this.state);
    }
      this.setState({ name: "", times: "", });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group>
          <Form.Input
            label="Menu"
            placeholder="Name"
            required
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Form.Input
            placeholder="Times"
            name="times"
            value={this.state.times}
            onChange={this.handleChange}
          />
        </Form.Group>
        <Form.Button>Submit</Form.Button>
      </Form>
    )
  }
}

export default MenuForm