import contactList from "./contacts.js";

// new vue instance
const whatsApp = new Vue({
  el: "#app",
  data: {
    contacts: contactList,
    activeContact: null,
    activeChat: null,
  },
  methods: {
    imgTemplate: function (contact) {
      return `./img/avatar${contact.avatar}.jpg`;
    },
    lastMessage: function (contact) {
      let lastMessage = contact.messages[contact.messages.length - 1];
      return lastMessage.message;
    },
    activeThisContact: function (contact) {
      this.activeContact = contact;
      this.activeChat = contact.messages;
    },
  },
});
