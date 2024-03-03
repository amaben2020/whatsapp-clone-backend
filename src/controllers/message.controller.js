export const sendMessage = async () => {
  // get user id from mware
  const userId = req.user;

  // throw error is no files or sender
  if (req.body.files || req.body.conversation_id) {
    return res.sendStatus(400);
  }
  // create msgData with the model shape

  const msgData = {
    sender: userId,
    message: req.body.message,
    conversation: req.body.conversation_id,
    files: req.body.files || [],
  };

  // create message service used for the above purpose
  let newMessage = await createMessage(msgData);
  // create a populate message service to flesh out all properties

  try {
  } catch (error) {}
};
export const getMessages = async () => {};
