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
  polishEvent: (body) => {
    const {
      name,
      hostname,
      eventtype,
      location,
      starttime,
      endtime,
      description,
      contactnumber,
      imageurl,
    } = body;

    let event = {};

    if (name != null) {
      event.name = name;
    }
    if (hostname != null) {
      event.hostname = hostname;
    }
    if (eventtype != null) {
      event.eventtype = eventtype;
    }
    if (location != null) {
      event.location = location;
    }
    if (starttime != null) {
      event.starttime = starttime;
    }
    if (endtime != null) {
      event.endtime = endtime;
    }
    if (description != null) {
      event.description = description;
    }
    if (contactnumber != null) {
      event.contactnumber = contactnumber;
    }
    if (imageurl != null) {
      event.imageurl = imageurl;
    }

    return event;
  },
};

export default ReqBodyPolisher;
