import { Input } from 'components/ContactForm/ContactForm.styled';
import { FilterContainer, FilterLabel } from './Filter.styled';

const Filter = ({ value, onChange }) => {
  return (
    <FilterContainer>
      <FilterLabel>
        Find contact name:
        <Input
          type="text"
          name="search"
          value={value}
          onChange={onChange}
          placeholder="Adam Smith"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        />
      </FilterLabel>
    </FilterContainer>
  );
};

export default Filter;
