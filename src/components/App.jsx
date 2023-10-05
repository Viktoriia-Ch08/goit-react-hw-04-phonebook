import { useEffect, useState } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import Filter from 'components/Filter/Filter';
import ContactsList from 'components/ContactsList/ContactsList';
import { Container, Headline, Title } from './App.styled';

const LS_KEY = 'contacts';
export default function App() {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem(LS_KEY)) ?? []
  );
  const [filter, setFilter] = useState('');

  const formSubmitData = data => {
    contacts.some(element => element.name === data.name)
      ? alert('This contact has already exists')
      : setContacts([...contacts, data]);
  };

  const filterInputNames = event => {
    setFilter(event.currentTarget.value);
  };

  const deleteContacts = contactsToDelete => {
    setContacts(
      contacts.filter(element => !contactsToDelete.includes(element))
    );
  };

  useEffect(() => {
    const stringifiedContacts = JSON.stringify(contacts);
    localStorage.setItem(LS_KEY, stringifiedContacts);
  }, [contacts]);

  return (
    <Container>
      <Headline>Phonebook</Headline>
      <ContactForm onSubmit={formSubmitData} />
      {contacts.length !== 0 ? (
        <>
          <Title>Contacts</Title>
          <Filter value={filter} onChange={filterInputNames} />
          <ContactsList
            contacts={contacts}
            filter={filter}
            deleteContacts={deleteContacts}
          />
        </>
      ) : (
        <Title>There are no contacts</Title>
      )}
    </Container>
  );
}
