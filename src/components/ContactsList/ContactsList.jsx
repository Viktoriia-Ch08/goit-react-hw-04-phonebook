import { ButtonWrapper, DeleteButton, Item, List } from './ContactsList.styled';
import { FaTrashAlt } from 'react-icons/fa';
import { Component } from 'react';

class ContactsList extends Component {
  state = {
    contactsToDelete: [],
  };

  handleCheckboxStatus = selectedContact => {
    this.setState({
      contactsToDelete: this.state.contactsToDelete.includes(selectedContact)
        ? this.state.contactsToDelete.filter(
            contact => contact !== selectedContact
          )
        : [...this.state.contactsToDelete, selectedContact],
    });
  };

  reset = () => this.setState({ contactsToDelete: [] });

  render() {
    return (
      <>
        <List>
          {this.props.contacts
            .filter(
              contact =>
                this.props.filter === '' ||
                contact.name
                  .toLowerCase()
                  .includes(this.props.filter.toLowerCase())
            )
            .map(contact => (
              <label key={contact.id}>
                <Item>
                  <input
                    type="checkbox"
                    name="contactToDelete"
                    checked={this.state.contactsToDelete.includes(contact)}
                    onChange={() => this.handleCheckboxStatus(contact)}
                  />
                  <p>{`${contact.name}: ${contact.number} ${
                    contact.type ? `*${contact.type}*` : ''
                  }`}</p>
                </Item>
              </label>
            ))}
        </List>

        <ButtonWrapper>
          <DeleteButton
            type="button"
            onClick={() => {
              if (this.state.contactsToDelete.length === 0)
                alert('Choose contact(s) to delete');
              else {
                this.props.deleteContacts(this.state.contactsToDelete);
                this.reset();
              }
            }}
          >
            <FaTrashAlt className="icon" />
          </DeleteButton>
        </ButtonWrapper>
      </>
    );
  }
}

export default ContactsList;
