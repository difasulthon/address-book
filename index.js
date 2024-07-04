const categories = [
  {
    id: '1',
    label: 'Friend',
  },
  {
    id: '2',
    label: 'Family',
  }
]
let contacts = [];

const addContactHandler = (contact) => {
  // const contacts = window.localStorage.getItem('contacts');
  const contactAdded = {
    ...contact,
    id: crypto.randomUUID()
  };
  const newContacts = contacts.push(contactAdded);

  // window.localStorage.setItem('contacts', newContacts);
};

const onShowContacts = () => {
  const contactsShow =  contacts.map(contact => {
    const categoryId = contact.category;
    const findCategory = categories.find(category => category.id === contact.category);

    return {
      ...contact,
      category: findCategory.label
    }
  })

  return contactsShow;
};

const onSearchContact = (name) => {
  const keyWord = name.toLowerCase();
  // const contacts = window.localStorage.getItem('contacts');

  const contactsFiltered = contacts.filter(contact => contact.name.toLowerCase().includes(keyWord));

  return contactsFiltered;
};

const onEditContact = (editedContact) => {  
  const newContacts = contacts.map(contact => {
    if (contact.id === editedContact.id) {
      return {
        ...contact,
        ...editedContact
      };
    }
    return contact;
  });
  contacts = newContacts;

  return contacts;
};

const onDeleteContact = (deletedContact) => {
  console.log('deletedContact', deletedContact)
  const newContacts = contacts.filter(contact => contact.id !== deletedContact.id);
  console.log('newContacts', newContacts)

  contacts = newContacts;

  return contacts;
}

const showInputFormHandler = () => {
  const element = document.getElementById('inputModalContainer');

  element.style.display = 'flex';
};

const hideInputFormHandler = () => {
  const element = document.getElementById('inputModalContainer');

  element.style.display = 'none';
};

const showEditFormHandler = () => {
  const element = document.getElementById('editModalContainer');

  element.style.display = 'flex';
};

const hideEditFormHandler = () => {
  const element = document.getElementById('editModalContainer');

  element.style.display = 'none';
};

document.getElementById('addButton').addEventListener('click', showInputFormHandler);
document.getElementById('closeInputForm').addEventListener('click', hideInputFormHandler);
document.getElementById('editButton').addEventListener('click', showEditFormHandler);
document.getElementById('closeEditForm').addEventListener('click', hideEditFormHandler);

const addContact1 = {
  name: 'difa',
  phoneNumber: '08123456789',
  email: 'difa@email.com',
  address: 'Bekasi',
  notes: 'teman',
  category: '1'
}
const addContact2 = {
  name: 'sulthon',
  phoneNumber: '08123456789',
  email: 'difa@email.com',
  address: 'Bekasi',
  notes: 'teman',
  category: '2'
}

addContactHandler(addContact1)
addContactHandler(addContact2)

console.log('onShowContacts', onShowContacts())

console.log('onSearchContact', onSearchContact('if'))

onEditContact({
  ...contacts.find(item => item.name === 'sulthon'),
  email: 'sulthon@email.com'
})
console.log('onShowContacts after edit', onShowContacts());

onDeleteContact({
  ...contacts.find(item => item.name === 'sulthon')
});

console.log('onShowContacts after delete', onShowContacts());

