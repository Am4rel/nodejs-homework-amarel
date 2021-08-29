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
  const neededContact = Contact.findOne({_id: contactId}).then(result => {
    if (result){
      return result
    }else{
      return null
    }
  }).catch(_ => null)

  return neededContact;
};

const removeContactById = async (contactId) => {
  try {
      const deletedContact = await getContactById(contactId);

      if (!deletedContact){
        return null;
      }

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
    const {message} = error;
    
    if (message.indexOf("duplicate") !== -1){
      return null;
    };
    
    throw error;
  };
};

const updateContactById = async (contactId, body) => {
  try {
    const contact = await getContactById(contactId);

    if (!contact){
      return null;
    }

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
    
    if (!contact){
      return null;
    }
    
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
