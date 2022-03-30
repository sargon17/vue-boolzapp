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
    editDateToTime: function (date) {
      date = date.split(" ");

      let time = date[1].split(":");
      if (date.includes("PM")) {
        let hour = parseInt(time[0]) + 12;
        return `${hour}:${time[1]}`;
      }
      return `${time[0]}:${time[1]}`;
    },
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

    activeThisContact: function (contact) {
      this.activeContact = contact;
      this.activeChat = contact.messages;
    },
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
    updateContact: function (contact) {
      this.contacts.splice(this.contacts.indexOf(contact), 1);
      this.contacts.unshift(contact);
    },
    autoReply: function () {
      let newMessage = {
        date: new Date().toLocaleString(),
        message: "Ok",
        status: "received",
      };
      this.activeChat.push(newMessage);
      this.updateContact(this.activeContact);
    },
    userSearch: function () {
      // let search = event.target.value.toLowerCase();
      let search = document.querySelector("#searchInput").value.toLowerCase();
      console.log(search);
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
