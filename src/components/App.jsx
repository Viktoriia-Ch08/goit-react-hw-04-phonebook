import { Component } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactsList from 'components/ContactsList/ContactsList';
import { Container, Headline, Title } from './App.styled';

const LS_KEY = 'contacts';
class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  formSubmitData = data => {
    this.state.contacts.some(element => element.name === data.name)
      ? alert('This contact has already exists')
      : this.setState({
          contacts: [...this.state.contacts, data],
        });
  };

  filterInputNames = event => {
    this.setState({
      filter: event.currentTarget.value,
    });
  };

  checkExistingContact = data => {
    this.state.contacts.name === data.name
      ? alert('This contact has already existed')
      : this.setState({
          contacts: [...this.state.contacts, data],
        });
  };

  deleteContacts = contactsToDelete => {
    this.setState({
      contacts: this.state.contacts.filter(
        element => !contactsToDelete.includes(element)
      ),
    });
  };

  componentDidMount() {
    const savedContacts = localStorage.getItem(LS_KEY);
    const parsedContacts = JSON.parse(savedContacts) ?? [];
    this.setState({ contacts: parsedContacts });
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts.length !== contacts.length) {
      const stringifiedContacts = JSON.stringify(contacts);
      localStorage.setItem(LS_KEY, stringifiedContacts);
    }
  }

  render() {
    return (
      <Container>
        <Headline>Phonebook</Headline>
        <ContactForm onSubmit={this.formSubmitData} />
        {this.state.contacts.length !== 0 ? (
          <>
            <Title>Contacts</Title>
            <Filter
              value={this.state.filter}
              onChange={this.filterInputNames}
            />
            <ContactsList
              contacts={this.state.contacts}
              filter={this.state.filter}
              deleteContacts={this.deleteContacts}
            />
          </>
        ) : (
          <Title>There are no contacts</Title>
        )}
      </Container>
    );
  }
}

export default App;
