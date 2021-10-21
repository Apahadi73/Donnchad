class userRepoMock {
  constructor() {
    this.users = [
      {
        uid: 1,
        firstname: "Amir",
        lastname: "Pahadi",
        email: "a@patriots.uttyler.edu",
        password:
          "$2b$10$J.Trnmy6ArE6Cm6BiqYfzuVIDNvTVHz3ugmb/ajMmM6DIhsdNZ9u2",
        phonenumber: "9035088579",
        created_at: "2021-10-21T22:00:24.734Z",
        updated_at: "2021-10-21T22:00:24.734Z",
      },
      {
        uid: 2,
        firstname: "Amir",
        lastname: "Pahadi",
        email: "a1@patriots.uttyler.edu",
        password:
          "$2b$10$TPtpw72jEePnT16Do2YC9.7BGeYV1dSOL/jaCiisseY/y1Zky2BJO",
        phonenumber: "9035088579",
        created_at: "2021-10-21T22:00:30.679Z",
        updated_at: "2021-10-21T22:00:30.679Z",
      },
      {
        uid: 3,
        firstname: "Amir",
        lastname: "Pahadi",
        email: "a13@patriots.uttyler.edu",
        password:
          "$2b$10$s./ZScnWRj8kfUXYCMfgYuzIYjn4nrb3yAmGt4KbJAUuaGPKH6rSG",
        phonenumber: "9035088579",
        created_at: "2021-10-21T22:00:33.366Z",
        updated_at: "2021-10-21T22:00:33.366Z",
      },
    ];

    this.counter = this.users.length;
  }

  async checkEmailInDB(email) {
    let foundUsers = [];
    for (let user of this.users) {
      if (user.email == email) {
        foundUsers.push(user);
      }
    }
    return foundUsers.length > 0;
  }

  async checkUserInDB(uid) {
    let foundUsers = [];
    for (let user of this.users) {
      if (user.uid == uid) {
        foundUsers.push(user);
      }
    }
    return foundUsers.length > 0;
  }

  async registerUser(userInfo) {
    userInfo.uid = this.counter + 1;
    this.users.push(userInfo);
    return [userInfo];
  }

  // gets users from the db
  async getUsers() {
    return this.users;
  }
}

export default userRepoMock;
