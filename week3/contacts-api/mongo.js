const mongoose = require('mongoose');

const url = `mongodb://${process.env.PB_MONGO_USER}:${process.env.PB_MONGO_PW}@ds117178.mlab.com:17178/contacts`;

(async () => {
  await mongoose.connect(url);

  const Contact = mongoose.model('Contact', {
    name: String,
    number: String,
  });

  if (process.argv.length === 4) {
    const name = process.argv[2];
    const number = process.argv[3];
  
    await new Contact({name, number}).save();
    console.log(`Saved ${name} ${number}`);
  } else {
    const contacts = await Contact.find({});
    console.log('puhelinluettelo:');
    contacts.forEach(contact => {
      console.log(`${contact.name} ${contact.number}`);
    });
  }

  mongoose.connection.close();
})();