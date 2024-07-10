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
const contactDetail = document.getElementById('contact-detail');

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

const renderContactDetail = (item) => {
  const {
    fullName, email, category, phoneNumber, address, notes
  } = item;

  contactDetail.innerHTML = `
    <div class="contact-detail-person-icon-container">
      <ion-icon name="person-circle-outline" class="contact-detail-person-icon"></ion-icon>
    </div>
    <div>
      <div class="contact-detail-name-container">
        <p class="contact-full-name">${fullName}</p>
        <p class="contact-category">${category}</p>
      </div>
      <div class="contact-detail-field">
        <div class="contact-detail-field-item-container">
          <div class="contact-detail-field-container">
            <p class="contact-detail-field-title">Phone Number</p>
            <p class="contact-detail-field-subtitle">${phoneNumber}</p>
          </div>
          <ion-icon name="call" class="contact-detail-field-icon"></ion-icon>
        </div>
        <div class="contact-detail-field-item-container">
          <div class="contact-detail-field-container">
            <p class="contact-detail-field-title">Email</p>
            <p class="contact-detail-field-subtitle">${email}</p>
          </div>
          <ion-icon name="mail" class="contact-detail-field-icon"></ion-icon>
        </div>
        <div class="contact-detail-field-item-container">
          <div class="contact-detail-field-container">
            <p class="contact-detail-field-title">Address</p>
            <p class="contact-detail-field-subtitle">${address}</p>
          </div>
          <ion-icon name="home" class="contact-detail-field-icon"></ion-icon>
        </div>
        <div class="contact-detail-field-item-container">
          <div class="contact-detail-field-container">
            <p class="contact-detail-field-title">Notes</p>
            <p class="contact-detail-field-subtitle">${notes}</p>
          </div>
          <ion-icon name="document" class="contact-detail-field-icon"></ion-icon>
        </div>
        <div class="button-action-container">
          <button class="button-action edit" id="editButton">Edit</button>
          <button class="button-action delete">Delete</button>
        </div>
      </div>
  `;
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
  console.log('showEditFormHandler')
  const element = document.getElementById('editModalContainer');

  element.style.display = 'flex';
};

const hideEditFormHandler = () => {
  const element = document.getElementById('editModalContainer');

  element.style.display = 'none';
};

document.getElementById('addButton').addEventListener('click', showInputFormHandler);
document.getElementById('closeInputForm').addEventListener('click', hideInputFormHandler);

document.getElementById('closeEditForm').addEventListener('click', hideEditFormHandler);

formAddContact.addEventListener('submit', (event) => {
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

const onClickEditButton = () => {
  const editButton = document.getElementById('editButton');
  
  editButton.addEventListener('click', showEditFormHandler);
};

const setActiveHandler = (contactItem) => {
  const allContactItems = document.querySelectorAll('.contact-item');
  allContactItems.forEach(ci => ci.classList.remove('active'));
  
  contactItem.classList.add('active');
};

const renderContacts = () => {
  const contacts = onShowContacts();
  contactList.innerHTML = '';

  contacts.forEach((item, index) => {
    const contactItem = document.createElement('li');
    contactItem.classList.add('contact-item');
    contactItem.innerHTML = `
      <div class="contact-left-content">
        <ion-icon name="person-circle-outline" class="person-icon"></ion-icon>
        <div class="name-container">
          <p class="contact-full-name">${item.fullName}</p>
          <p class="contact-category">${item.email}</p>
        </div>
      </div>
      <p class="contact-number">${item.phoneNumber}</p>
    `;

    contactList.appendChild(contactItem);

    contactItem.addEventListener('click', () => {
      setActiveHandler(contactItem);
      renderContactDetail(item);
      onClickEditButton();
    });
  });
};
 
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderCategoriesEdit();
  renderContacts();
});
