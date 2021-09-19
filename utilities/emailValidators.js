//checks email for valid college email address
export let checkCollegeEmail = function(email){
    const emailArray = email.split("@");
    return emailArray[1] == "patriots.uttyler.edu";
}