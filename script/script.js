import contactList from "./contacts.js";

contactList.sort(function (a, b) {
  if (
    a.messages[a.messages.length - 1].date <
    b.messages[b.messages.length - 1].date
  ) {
    return -1;
  }
  if (
    a.messages[a.messages.length - 1].date >
    b.messages[b.messages.length - 1].date
  ) {
    return 1;
  }
  return 0;
});

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
    editDateToTime: function (date) {
      date = date.split(" ");
      let time = date[1].split(":");
      return `${time[0]}:${time[1]}`;
    },
    getNewMessage: function () {
      let newMessage = {
        date: new Date().toLocaleString(),
        message: document.querySelector("#messageInput").value,
        status: "sent",
      };
      this.activeChat.push(newMessage);
      // console.log(this.activeContact);
      // console.log(this.contacts);
      document.querySelector("#messageInput").value = "";
      this.updateContact(this.activeContact);
    },
    updateContact: function (contact) {
      this.contacts.splice(this.contacts.indexOf(contact), 1);
      this.contacts.unshift(contact);
    },
  },
});
