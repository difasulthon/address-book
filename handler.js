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

const showDeleteConfirmationHandler = () => {
  const element = document.getElementById('delete-confirmation-modal');

  element.style.display = 'flex';
};

const hideDeleteConfirmationHandler = () => {
  const element = document.getElementById('delete-confirmation-modal');

  element.style.display = 'none';
};

const setDefaultValueHandler = (contact) => {
  const formEditContact = document.getElementById('form-edit-contact');
  const {
    fullName, phoneNumber, email, category, address, notes
  } = contact;

  formEditContact.elements['editFullName'].value = fullName;
  formEditContact.elements['editPhoneNumber'].value = phoneNumber;
  formEditContact.elements['editEmail'].value = email;
  formEditContact.elements['editCategory'].value = categories.find(item => item.label = category).id;
  formEditContact.elements['editAddress'].value = address;
  formEditContact.elements['editNotes'].value = notes;
};

const resetIconHandler = () => {
  const searchResetIcon = document.getElementById('search-input-reset');
  const value = formSearchContacts.elements['search-input'].value;

  if (!value) {
    searchResetIcon.style.display = 'none';
  } else {
    searchResetIcon.style.display = 'flex';

    searchResetIcon.addEventListener('click', () => {
      formSearchContacts.elements['search-input'].value = '';

      searchResetIcon.style.display = 'none';
      
      renderContacts();
    });
  }
};