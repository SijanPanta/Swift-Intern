const socket = io();
const sendBtn = document.getElementById("sendBtn");
const messageInput = document.getElementById("message");
const getMsg = () => {
  return messageInput.value;
};

sendBtn.addEventListener("click", (e) => {
  const message = getMsg();
  sendFunction(message);
});

messageInput.addEventListener("keydown", (e) => {
  const message = getMsg();
  if (e.key === "Enter" && message) {
    sendFunction(message);
  }
});

function sendFunction(message) {
    if (message.trim()) { 
    socket.emit("message", message);
    messageInput.value = ""; 
    messageInput.focus();
  }
}

socket.on("out-msg", (message) => {
  console.log(message);
});
