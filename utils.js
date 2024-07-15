
const getContactsWitMappingCategory = () => {
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

const getSortContactsByName = (contacts) => {
  if (!contacts) {
    return [];
  } else {
    contacts.sort((a, z) => {
      if (a.fullName < z.fullName) {
        return -1;
      }
      if (a.fullName > z.fullName) {
        return 1;
      }
      return 0;
    });

    return contacts;
  }
};

const getIsAllCategory = (category) => category.id === '0';