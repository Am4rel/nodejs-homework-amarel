const {Contact} = require("./schemas");

const listContacts = async () => {
  try {
    const contacts = await Contact.find({});
    
    return contacts;
  } catch (error) {
    throw error
  };
};

const getContactById = async (contactId) => {
  try {
      const neededContact = Contact.find({_id: contactId})
      
      return neededContact;
  } catch (error) {
      throw error;        
  };
};

const removeContactById = async (contactId) => {
  try {
      const deletedContact = await getContactById(contactId);

      await Contact.deleteOne({_id: contactId})
      
      return deletedContact;
  } catch (error) {
      throw error;
  };
};

const addContact = async (body) => {
  try {
    const newContact = await Contact.create(body);

    return newContact;
  } catch (error) {
      throw error;
  };
};

const updateContactById = async (contactId, body) => {
  try {
    await Contact.updateOne({_id: contactId}, body);
    const newContact = await getContactById(contactId);
    
    return newContact;
  } catch (error) {
    throw error;
  }
};

const updateFav = async (contactId, body) => {
  try {
    const {favorite} = body;

    const contact = await getContactById(contactId);

    await Contact.updateOne({_id: contactId}, {favorite});
    return {...contact._doc, favorite};
  } catch (error) {
    throw error;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
  updateFav,
};
