function validation() {

    let emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let email = document.getElementById("email").value;
    // let emailElement = document.getElementById("email");

    if(email.length == 0){
        document.getElementById("email-error").innerHTML = "<em> *This field is required </em>";
        
    }
    if(!email.length == 0 && !email.match(emailFormat)){
        document.getElementById("email-error").innerHTML = "<em> *wrong email </em>";
    }
    // todo: Try get success look from bootstrap
//     else{
// emailElement.classList.add("was-validated");
//     }
    if (document.getElementById("name").value.length == 0){
        document.getElementById("name-error").innerHTML = "<em> *This field is required </em>";
        
    }
    if (document.getElementById("message").value.length == 0){
        document.getElementById("msg-error").innerHTML = "<em> *Message cannot be empty! </em>";
        return false;
    }
    return true;
}  