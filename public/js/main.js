var firebase = app_fireBase;
let name = "";
const msgScreen = document.getElementById("messages");
const msgForm = document.getElementById("messageForm");
const msgInput = document.getElementById("msg-input");
const msgBtn = document.getElementById("msg-btn");
const userName = document.getElementById("user-name");
const db = firebase.database();
const msgRef = db.ref("/msgs"); //save in msgs folder in database
const id = uuid();

function init(){

    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in. Get their name.
          name = user.displayName;
          msgRef.on('child_added', updateMsgs);
          userName.innerHTML = "Wleocme, " + name + "!";
        }else{
            //redirect to login page
            uid = null;
            window.location.replace("login.html");
        }
      });

    document.getElementById('log-out').addEventListener('click', logOut);
    msgForm.addEventListener('submit', sendMessage);
}

function logOut(){
    firebase.auth().signOut().then(function() {
        console.log("SIGN OUT");
        window.location.replace("login.html");
      }).catch(function(error) {

        console.error(error);
      });
}

const updateMsgs = data =>{
  const {id , name: myName, text} = data.val();
  const msg = `<li class="${name == myName ? "msg my": "msg"}"><span class = "msg-span">
    <i class = "name">${myName}: </i>${text}
    </span>
  </li>`
  msgScreen.innerHTML += msg;
}

document.addEventListener('DOMContentLoaded',init);

function sendMessage(e){
  e.preventDefault();
  const text = msgInput.value;

    if(!text.trim()) return alert('Palese tpye yuor mesagse.'); //no msg submitted
    const msg = {
        id,
        name,
        text: text
    };

    msgRef.push(msg);
    msgInput.value = "";
}

