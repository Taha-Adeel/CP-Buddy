var activeTabUrl;
var chatMessages;

  // Display the user message on the chat
  function displayUserMessage(message) {
    let chat = document.getElementById("chat");
    let userMessage = document.createElement("div");
    userMessage.classList.add("message");
    userMessage.classList.add("user");
    let userAvatar = document.createElement("div");
    userAvatar.classList.add("avatar");
    let userText = document.createElement("div");
    userText.classList.add("text");
    userText.innerHTML = message;
    userMessage.appendChild(userAvatar);
    userMessage.appendChild(userText);
    chat.appendChild(userMessage);
    chat.scrollTop = chat.scrollHeight;
    saveChat();
  }

  // Display the bot message on the chat
  function displayBotMessage(message) {
    let chat = document.getElementById("chat");
    let botMessage = document.createElement("div");
    botMessage.classList.add("message");
    botMessage.classList.add("bot");
    let botAvatar = document.createElement("div");
    botAvatar.classList.add("avatar");
    let botText = document.createElement("div");
    botText.classList.add("text");
    botText.innerHTML = message;
    botMessage.appendChild(botAvatar);
    botMessage.appendChild(botText);
    chat.appendChild(botMessage);
    chat.scrollTop = chat.scrollHeight;
    saveChat();
  }

  // Send the user message and get the bot response
  function sendMessage() {
    let input = document.getElementById("input").value;
    if (input) {
      displayUserMessage(input);
      document.getElementById("input").value = "";
      var chatMessages = [];
      
      try {
        if (localStorage.getItem('chatMessages') !== null) {
          chatMessages = JSON.parse(localStorage.getItem('chatMessages'));
        }
      } catch (e) {
        chatMessages = [];
      }      
      chatMessages.push({ role: "user", content: input });
      
      try {
        localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
      } catch (e) {
      }
      var backendUrl = 'https://cpbuddy-server.onrender.com/api/chat';
      
      fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ url: activeTabUrl , messages : chatMessages})
      })
      .then(response => response.json())
      .then(data => {
        chatMessages.push({ role: "assistant", content: data });
        sessionStorage.setItem('chatMessages', JSON.stringify(chatMessages));
        displayBotMessage(data);
      })
      .catch(error => {
        chatMessages = []
      });
      
      saveChat();
      document.getElementById("input").value = "";
    }
  }

  function saveChat() {
    let chat = document.getElementById("chat").innerHTML;
    localStorage.setItem(activeTabUrl, chat);
    localStorage.setItem('chatMessages', JSON.stringify(chatMessages));
  }

  function loadChat() {
    let chatData = localStorage.getItem(activeTabUrl);
    if (chatData != null) {
        document.getElementById("chat").innerHTML = chatData;
    }
  }

  document.addEventListener('DOMContentLoaded', function() {    
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      var activeTab = tabs[0];
      activeTabUrl = activeTab.url;
      loadChat();

      var backendUrl = 'https://cpbuddy-server.onrender.com/api/hints';

      let sentUrls = JSON.parse(localStorage.getItem('sentUrls')) || [];
      // console.log(sentUrls)

      if(!sentUrls.includes(activeTabUrl)){
        fetch(backendUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ url: activeTabUrl })
        })
        .then(response => response.json())
        .then(data => {
          sentUrls.push(activeTabUrl);
          sessionStorage.setItem('sentUrls', JSON.stringify(sentUrls));
        })
        .catch(error => {
          console.error('Error:', error);
        });
      }

      let chat = document.getElementById("chat");
      chat.scrollTop = chat.scrollHeight;

    });
  });

  loadChat();
  

  // Add a click event listener to the button
  document.getElementById("button").addEventListener("click", sendMessage);

  // Add a keypress event listener to the input
  document.getElementById("input").addEventListener("keypress", function(event) {
    if (event.keyCode == 13) {
      sendMessage();
    }
  });
