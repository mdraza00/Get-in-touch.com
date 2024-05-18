const btnStartChat = document.querySelectorAll(".btn-start-chat");
const btnLogout = document.querySelector(".btn-logout");
const btnSendRequest = document.querySelectorAll(".btn-send-friend-request");
const btnSendMessage = document.querySelector(".btn-send-msg");
const btnAddPost = document.querySelector(".btn-add-post");
const btnAcceptRequest = document.querySelectorAll(
  ".btn-accept-friend-request"
);

const inputMessage = document.querySelector(".message-input-box");

// **** LOGGING OUT USER **** //
btnLogout.addEventListener("click", () => {
  document.cookie = `authorization=;expires=${Date.now}`;
  alert("sign out successful");
  window.location.reload();
});

// **** SENDING FRIEND REQUEST **** //
btnSendRequest.forEach((btn) => {
  btn.addEventListener("click", () => {
    alert("Request Sent Successfully.");
  });
});

// **** ACCEPTING FRIEND REQUEST **** //
btnAcceptRequest.forEach((btn) => {
  btn.addEventListener("click", () => {
    alert("Request Accepted successfully.");
  });
});

// **** ADDING POST **** //
btnAddPost.addEventListener("click", (e) => {
  const form = document.createElement("form");
  const inputFile = document.createElement("input");
  const inputSubmit = document.createElement("input");
  // Creating click event
  const click = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: false,
  });

  // setting form attributes
  form.setAttribute("method", "post");
  form.setAttribute("action", "/");
  form.setAttribute("enctype", "multipart/form-data");

  // setting input attributes
  inputFile.setAttribute("type", "file");
  inputFile.setAttribute("name", "postImage");
  inputFile.classList.add("btn", "input-post");

  // setting submit input attributes
  inputSubmit.setAttribute("type", "submit");
  inputSubmit.setAttribute("value", "post");
  inputSubmit.classList.add("btn", "btn-submit-post-input");

  // adding elements in the form
  form.appendChild(inputFile);
  form.appendChild(inputSubmit);

  // adding form to the body
  document.body.appendChild(form);
  // adding click event on the submit button;
  inputFile.dispatchEvent(click);
  inputFile.onchange = () => form.submit();
});
