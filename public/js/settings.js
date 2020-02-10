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
}

function logOut(){
    firebase.auth().signOut().then(function() {
        console.log("SIGN OUT");
        window.location.replace("login.html");
      }).catch(function(error) {

        console.error(error);
      });
}

document.addEventListener('DOMContentLoaded',init);
