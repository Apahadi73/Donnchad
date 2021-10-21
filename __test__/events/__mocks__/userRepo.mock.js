const UserRepo = {
users = [
    {
        uid: 1,
        firstname: "John",
        lastname: "Doe",
        email: "jdoe1@patriots.uttyler.edu",
        password: "password",
        phonenumber: null,
        created_at: "2021-10-21T20:07:26.399Z",
        updated_at: "2021-10-21T20:07:26.399Z"
    },
    {
        uid: 2,
        firstname: "John",
        lastname: "Doe",
        email: "jdoe2@patriots.uttyler.edu",
        password: "password",
        phonenumber: null,
        created_at: "2021-10-21T20:07:26.403Z",
        updated_at: "2021-10-21T20:07:26.403Z"
    },
    {
        uid: 3,
        firstname: "John Jr.",
        lastname: "Doe",
        email: "jdoe2@patriots.uttyler.edu",
        password: "password",
        phonenumber: null,
        created_at: "2021-10-21T20:07:26.406Z",
        updated_at: "2021-10-21T20:07:26.406Z"
    }
]
  async checkEmailInDB(email) {
    const user = await this.dbConnection(tables.USERS)
      .where({ email: email })
      .select();
    return user;
  },
};

export default UserRepo;
