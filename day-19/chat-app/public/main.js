 const socket = io();
      const sendBtn = document.getElementById("sendBtn");
      const messageInput = document.getElementById("message");
      const inputMessage = messageInput.value;
      sendBtn.addEventListener("click", (e) => clickFun(inputMessage));
      messageInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && inputMessage) {
          clickFun(inputMessage);
        }
      });

      function clickFun(mes) {
        socket.emit("message", mes);
      }

      socket.on("out-msg", (message) => {
        console.log( message);
      });