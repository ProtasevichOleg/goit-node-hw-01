const shortid = require('shortid');
const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(item => item.id === contactId);
  return contact || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index !== -1) {
    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  }
  return null;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContactId = shortid.generate();
  const newContact = { id: newContactId, name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
