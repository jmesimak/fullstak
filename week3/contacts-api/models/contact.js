const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
  name: { type: String, unique: true, required: true },
  number: { type: String, required: true },
});
contactSchema.statics.format = function(contact) {
  return {
    id: contact._id,
    name: contact.name,
    number: contact.number,
  };
};
const Contact = mongoose.model('Contact', contactSchema);
module.exports = {
  findAll: async () => (await Contact.find({})).map(Contact.format),
  findOne: async (id) => {
    const foundContact = await Contact.findOne({ _id: id });
    return Contact.format(foundContact);
  },
  create: async (user) => {
    const newUser = new Contact(user);
    await newUser.save();
    return newUser;
  },
  remove: id => {
    return Contact.remove({ _id: id });
  },
  replace: async (id, user) => (
    Contact.format((await Contact.findOneAndUpdate({ _id: id }, user, { new: true })))
  ),
};