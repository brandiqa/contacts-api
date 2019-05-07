// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { app, method, result, params } = context;

    // Ensure contacts is an array. If it's a single contact, wrap it into an array
    const contacts = method === 'find' ? result.data : [result];

    // Fetch user object from each contact's createdBy
    await Promise.all(
      contacts.map(async contact => {
        contact.user = await app
          .service('users')
          .get(contact.createdBy, params);
      })
    );

    return context;
  };
};
