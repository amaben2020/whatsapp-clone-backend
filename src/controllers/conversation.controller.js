// this is a private convo i.e message between 2 users
export const create_open_conversation = async (req, res, next) => {
  try {
    // get the sender and receiver ids

    const senderId = req.user;
    const receiverId = req.body.receiver_id;

    // check if the convo exists for the 2 users
    const convoExists = doesConvoExist(senderId, receiverId);
    console.log(convoExists);

    if (!convoExists) {
      // create a new convo
    } else {
      // send the convo to client
    }

    // return the conversation if it exists
    // create a new convo if it doesnt
  } catch (error) {
    next(error);
  }
};

export const getConversation = async () => {};
