import { tables } from "../types/Tables.js";

class MessageRepo {
  constructor(dbConnection) {
    this.dbConnection = dbConnection;
  }
  // create chat object in the chats relation
  async addMessage(eid, senderid, text) {
    const newChat = await this.dbConnection(tables.MESSAGE)
      .insert({ eid, senderid, text })
      .returning("*");
    return newChat[0];
  }
}

export default MessageRepo;
