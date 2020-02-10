var firebase = app_fireBase;
const userName = document.getElementById("user-name");
const setName = document.getElementById("user_profile_name");

function init(){
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
        // User is signed in. Get their name.
        var name = user.displayName;
        userName.innerHTML = "Wleocme, " + name + "!";
        setName.value = name;
        }else{
            //redirect to login page
            uid = null;
            window.location.replace("login.html");
        }
    });

    document.getElementById('log-out').addEventListener('click', logOut);
    document.getElementById('save-settings').addEventListener('click', saveSettings);
}

function logOut(){
    firebase.auth().signOut().then(function() {
        console.log("SIGN OUT");
        window.location.replace("login.html");
      }).catch(function(error) {

        console.error(error);
      });
}

function saveSettings(){
    var user = firebase.auth().currentUser;
    if(setName.value.trim()){
        user.updateProfile({
            displayName: setName.value
          }).then(function() {
              userName.innerHTML = "Wleocme, " + setName.value + "!";
              console.log("Name saved");
            
          }).catch(function(error) {
              console.log(error);
        });
    }
    var newPassword = document.getElementById("inputPassword6").value;
    if(newPassword.trim()){
        user.updatePassword(newPassword).then(function() {
            console.log("Password saved");
          }).catch(function(error) {
            console.log(error);
        });
    }
    
}

document.addEventListener('DOMContentLoaded',init);
