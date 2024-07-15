const setContacts = (contacts) => {
  localStorage.setItem('contacts', JSON.stringify(contacts));
};

const getContacts = () => {
  const contacts = localStorage.getItem('contacts');

  return contacts ? JSON.parse(contacts) : [];
};