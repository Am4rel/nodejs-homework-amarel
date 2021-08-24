const fs = require('fs/promises');

const updateContacts = async (contactsPath, updateInfo) => {
    const contactsForUpdate = JSON.stringify(updateInfo);
  
    await fs.writeFile(contactsPath, contactsForUpdate);
  };

module.exports = updateContacts;