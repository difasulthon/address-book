const categories = [
  {
    id: '1',
    label: 'Friend',
  },
  {
    id: '2',
    label: 'Family',
  }
];

const formAddContact = document.getElementById("form-add-contact");
const category = document.getElementById('category');
const categoryEdit = document.getElementById('categoryEdit');
const contactList = document.getElementById('contact-list');

const getContacts = () => {
  const contacts = localStorage.getItem('contacts');

  return contacts ? JSON.parse(contacts) : [];
};

const onShowContacts = () => {
  const contacts = getContacts();
  const contactsShow =  contacts.map(contact => {
    const categoryId = contact.category;
    const findCategory = categories.find(category => category.id === contact.category);

    return {
      ...contact,
      category: findCategory.label
    }
  });

  return contactsShow;
};

const renderContacts = () => {
  const contacts = onShowContacts();
  contactList.innerHTML = '';

  contacts.forEach((item, index) => {
    const contactItem = document.createElement('li');
    contactItem.innerHTML = `
     <li class="contact-item">
        <div class="contact-left-content">
          <ion-icon name="person-circle-outline" class="person-icon"></ion-icon>
          <div class="name-container">
            <p class="contact-full-name">${item.fullName}</p>
            <p class="contact-category">${item.email}</p>
          </div>
        </div>
        <p class="contact-number">${item.phoneNumber}</p>
      </li>
    `;

    contactList.appendChild(contactItem);
  })
};

const addContactHandler = (contact) => {
  const contacts = getContacts();
  const contactAdded = {
    ...contact,
    id: crypto.randomUUID()
  };
  contacts.push(contactAdded);

  localStorage.setItem('contacts', JSON.stringify(contacts));

  renderContacts()
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
  const newContacts = contacts.filter(contact => contact.id !== deletedContact.id);

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

formAddContact.addEventListener('submit', (event) => {
  event.preventDefault();

  const contact = {
   fullName: formAddContact.elements['fullName'].value,
   phoneNumber: formAddContact.elements['phoneNumber'].value,
   email: formAddContact.elements['email'].value,
   category: formAddContact.elements['category'].value,
   address: formAddContact.elements['address'].value,
   notes: formAddContact.elements['notes'].value
  };

  addContactHandler(contact);
  hideInputFormHandler();
});

const renderCategories = () => {
  category.innerHTML = '';
  categories.forEach((item, index) => {
    const option = document.createElement("option");

    option.value = item.id;
    option.textContent = item.label;

    category.appendChild(option);
  });
};

const renderCategoriesEdit = () => {
  categoryEdit.innerHTML = '';
  categories.forEach((item, index) => {
    const option = document.createElement("option");

    option.value = item.id;
    option.textContent = item.label;

    categoryEdit.appendChild(option);
  });
};
 
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderCategoriesEdit();
  renderContacts();
});
