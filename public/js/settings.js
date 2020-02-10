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

//Update settings
function saveSettings(){
    var user = firebase.auth().currentUser;

    //Display Name settings
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

    //New Password settings
    var newPassword = document.getElementById("inputPassword6").value;
    if(newPassword.trim()){
        user.updatePassword(newPassword).then(function() {
            console.log("Password saved");
          }).catch(function(error) {
            console.log(error);
        });
    }
  

    //Ecryption Mode settings (nr, nn, cr)
    var encryption = document.getElementById("encryption-mode");
    var selectedMode = encryption.options[encryption.selectedIndex].value; 

    if(selectedMode == "nr"){ //Normal
        //Change chat to normal encryption
        console.log("Normal encryption set.");
    }
    else if(selectedMode =="nn"){
        //No encryption
        console.log("No encryption set.");
    }
    else{ //Crazy
        //Change to crazy encryption
        console.log("Crazy encryption set.");
    }
    
    
}

document.addEventListener('DOMContentLoaded',init);
