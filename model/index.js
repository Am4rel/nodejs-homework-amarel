const fs = require('fs/promises');
const path = require("path");

const getId = require('../utils/getId');
const updateContacts = require("../utils/updateContactsList")

const contactsPath = path.join(__dirname, "/contacts.json");

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    return JSON.parse(contacts);
  } catch (error) {
    throw error
  };
};

const getContactById = async (contactId) => {
  try {
      const contacts = await listContacts();
      const neededContact = contacts.find(contact => contact.id === parseInt(contactId));

      return neededContact;
  } catch (error) {
      throw error;        
  };
};

const removeContactById = async (contactId) => {
  try {
      const contacts = await listContacts();
      const contactToDelete = contacts.find(contact => contact.id === parseInt(contactId));

      if (!contactToDelete){
        return null;
      };

      const newContacts = contacts.filter(contact => contact.id !== parseInt(contactId));
      await updateContacts(contactsPath, newContacts);
      
      return contactToDelete;
  } catch (error) {
      throw error;
  };
};

const addContact = async (body) => {
  try {
      const contacts = await listContacts();
      
      const id = getId(contacts);
      const newContact = {id, ...body};
      const newContacts = [...contacts, newContact];
      
      await updateContacts(contactsPath, newContacts);
      return newContact;
  } catch (error) {
      throw error;
  };
};

const updateContactById = async (contactId, body) => {
  try {
    const contacts = await listContacts();
    const contact = await getContactById(contactId);

    if (!contact){
      return null;
    }

    const updatedContact = {...contact, ...body};

    const newContacts = contacts.map((contact) => {
      return contact.id === parseInt(contactId) ? {...contact, ...body} : contact;
    });
          
    await updateContacts(contactsPath, newContacts);
    
    return updatedContact;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContactById,
  addContact,
  updateContactById,
};
