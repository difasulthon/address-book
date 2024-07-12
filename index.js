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
let contactEdit;

const formAddContact = document.getElementById('form-add-contact');
const category = document.getElementById('category');
const categoryEdit = document.getElementById('editCategory');
const contactList = document.getElementById('contact-list');
const contactDetail = document.getElementById('contact-detail');
const formEditContact = document.getElementById('form-edit-contact');
const categoryList = document.getElementById('category-list');
const formSearchContacts = document.getElementById('form-search-contacts')

const getContacts = () => {
  const contacts = localStorage.getItem('contacts');

  return contacts ? JSON.parse(contacts) : [];
};

const setContacts = (contacts) => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

const onShowContacts = (key, value) => {
  const contacts = getContacts();
  const contactsShow =  contacts.map(contact => {
    const categoryId = contact.category;
    const findCategory = categories.find(category => category.id === contact.category);

    return {
      ...contact,
      category: findCategory.label
    }
  });

  if (!key || !value) {
    return contactsShow;
  } else {
    const filteredContact = contactsShow.filter(contact => contact[key].toLowerCase().includes(value.toLowerCase()));

    return filteredContact;
  };
};

const addContactHandler = (contact) => {
  const contacts = getContacts();
  const contactAdded = {
    ...contact,
    id: crypto.randomUUID()
  };
  contacts.push(contactAdded);

  setContacts(contacts);
  renderContacts();
};

const onSearchContact = (name) => {
  const keyWord = name.toLowerCase();
  // const contacts = window.localStorage.getItem('contacts');

  const contactsFiltered = contacts.filter(contact => contact.name.toLowerCase().includes(keyWord));

  return contactsFiltered;
};

const onEditContact = (editedContact) => {
  const contacts = getContacts();
  editedContact = {
    ...editedContact,
    id: contactEdit.id
  };

  const newContacts = contacts.map(contact => {
    if (contact.id === editedContact.id) {
      return {
        ...contact,
        ...editedContact
      };
    } else {
      return contact
    }
  });

  setContacts(newContacts);
  renderContacts();
};

const onDeleteContact = (deletedContact) => {
  const newContacts = contacts.filter(contact => contact.id !== deletedContact.id);

  contacts = newContacts;

  return contacts;
};

const editButtonClickHandler = (item) => {
  const {
    fullName, phoneNumber, email, category, address, notes
  } = item;
  const editButton = document.getElementById('editButton');
  
  editButton.addEventListener('click', showEditFormHandler);
  
  formEditContact.elements['editFullName'].value = fullName;
  formEditContact.elements['editPhoneNumber'].value = phoneNumber;
  formEditContact.elements['editEmail'].value = email;
  formEditContact.elements['editCategory'].value = categories.find(item => item.label = category).id;
  formEditContact.elements['editAddress'].value = address;
  formEditContact.elements['editNotes'].value = notes;
  contactEdit = { ...item };
};

const setActiveContactHandler = (contactItem) => {
  const allContactItems = document.querySelectorAll('.contact-item');
  allContactItems.forEach(item => item.classList.remove('active'));
  
  contactItem.classList.add('active');
};

const setActiveCategoryHandler = (categoryItem) => {
  const allCCategoryItems = document.querySelectorAll('.category-item');
  allCCategoryItems.forEach(item => item.classList.remove('active'));
  
  categoryItem.classList.add('active');
};

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

formEditContact.addEventListener('submit', (event) => {
  const contact = {
   fullName: formEditContact.elements['editFullName'].value,
   phoneNumber: formEditContact.elements['editPhoneNumber'].value,
   email: formEditContact.elements['editEmail'].value,
   category: formEditContact.elements['editCategory'].value,
   address: formEditContact.elements['editAddress'].value,
   notes: formEditContact.elements['editNotes'].value
  };

  onEditContact(contact);
  hideEditFormHandler();
});

formSearchContacts.addEventListener('submit', (event) => {
  event.preventDefault()
  const value = formSearchContacts.elements['search-input'].value;

  renderContacts('fullName', value);
});

const renderContactDetail = (item) => {
  const {
    fullName, email, category, phoneNumber, address, notes
  } = item;

  // innerHTML does not safe
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
  categories.forEach((item, index) => {
    const option = document.createElement("option");

    option.value = item.id;
    option.textContent = item.label;

    categoryEdit.appendChild(option);
  });
};

const renderContacts = (key, value) => {
  const contacts = onShowContacts(key, value);
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
      setActiveContactHandler(contactItem);
      renderContactDetail(item);
      editButtonClickHandler(item);
    });
  });
};

const renderFilterCategories = () => {
  const allCategory = {
    id: '0',
    label: 'All',
  };
  const newCategories = [ ...categories ]
  newCategories.unshift(allCategory);

  newCategories.forEach((item) => {
    const categoryItem = document.createElement('li');
    categoryItem.classList.add('category-item');
    categoryItem.innerHTML = `
      <p class="category-text">${item.label}</p>
      <ion-icon name="chevron-forward-outline" class="chevron-right"></ion-icon>
    `;

    categoryList.appendChild(categoryItem);

    categoryItem.addEventListener('click', () => {
      setActiveCategoryHandler(categoryItem);
      
      if (item.id === '0') {
        renderContacts();
      } else {
        renderContacts('category', item.label);
      }
    });
  });
};
 
document.addEventListener("DOMContentLoaded", () => {
  renderCategories();
  renderCategoriesEdit();
  renderContacts();
  renderFilterCategories();
});
