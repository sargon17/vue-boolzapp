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
    // this function create the template for the contact image
    imgTemplate: function (contact) {
      return `./img/avatar${contact.avatar}.jpg`;
    },
    // this function check the last message
    lastMessage: function (contact) {
      let lastMessage = contact.messages[contact.messages.length - 1];
      return lastMessage.message;
    },
    // this function edit the time format
    editDateToTime: function (date) {
      date = date.split(" ");
      let time = date[1].split(":");
      if (date.includes("PM")) {
        let hour = parseInt(time[0]) + 12;
        return `${hour}:${time[1]}`;
      }
      return `${time[0]}:${time[1]}`;
    },
    // this function check the last recived message data
    lastRecivedMessageData: function (contact) {
      let lastMessage;
      let index = contact.messages.length - 1;
      while (lastMessage === undefined) {
        let message = contact.messages[index];

        if (message.status === "received") {
          lastMessage = message;
          break;
        }
        index--;
      }
      return this.editDateToTime(lastMessage.date);
    },
    // this function set the active contact and the active chat
    activeThisContact: function (contact) {
      this.activeContact = contact;
      this.activeChat = contact.messages;
    },
    // this function read the message, add the message to the active chat and set the status to sent
    getNewMessage: function () {
      let newMessage = {
        date: new Date().toLocaleString(),
        message: document.querySelector("#messageInput").value,
        status: "sent",
      };
      this.activeChat.push(newMessage);
      document.querySelector("#messageInput").value = "";
      this.updateContact(this.activeContact);
      setTimeout(this.autoReply, 1000);
    },
    // this function reorder the contact list
    updateContact: function (contact) {
      this.contacts.splice(this.contacts.indexOf(contact), 1);
      this.contacts.unshift(contact);
    },
    // function that auto replay to recived messages
    autoReply: function () {
      let newMessage = {
        date: new Date().toLocaleString(),
        message: "Ok",
        status: "received",
      };
      this.activeChat.push(newMessage);
      this.updateContact(this.activeContact);
    },
    // function that allow to search a contact
    userSearch: function () {
      let search = document.querySelector("#searchInput").value.toLowerCase();
      let contacts = this.contacts;
      contacts.forEach((contact) => {
        if (contact.name.toLowerCase().includes(search)) {
          contact.visible = true;
        } else {
          contact.visible = false;
        }
      });
    },
  },
});
