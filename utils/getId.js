const getId = (contacts) => {
    const ids = contacts.map(contact => contact.id);
    return Math.max(...ids) + 1;
};

module.exports = getId;