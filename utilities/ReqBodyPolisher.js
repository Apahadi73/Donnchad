const ReqBodyPolisher = {
  polishUser: (body) => {
    const { firstname, lastname, email, password, phonenumber } = body;
    let user = {};
    if (firstname != null) {
      user.firstname = firstname;
    }
    if (lastname != null) {
      user.lastname = lastname;
    }
    if (email != null) {
      user.email = email;
    }
    if (password != null) {
      user.password = password;
    }
    if (phonenumber != null) {
      user.phonenumber = phonenumber;
    }
    return body;
  },
};

export default ReqBodyPolisher;
