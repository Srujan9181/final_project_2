import framework from 'express';
import {
  createClient as insertClient,
  insertMessage,
  retrieveConversation as retrieveMessages,
  listChatUsers as retrieveClients,
  changeChatStatus as changeStatus,
  assignTicket as assignHandler,
  retrieveMemberMessages,
  markAsUnanswered as reviseMissed,
  retrieveUnanswered as retrieveMissed
} from '../controllers/Message.controller.js';

const routeHandler = framework.Router();

routeHandler.get('/', retrieveMessages);
routeHandler.get('/users', retrieveClients);
routeHandler.get('/member/:id', retrieveMemberMessages);
routeHandler.post('/adduser', insertClient);
routeHandler.patch('/adduser', reviseMissed);
routeHandler.get('/missed', retrieveMissed);
routeHandler.post('/addmessage', insertMessage);
routeHandler.post('/updatestatus', changeStatus);
routeHandler.get('/assign', assignHandler);

export default routeHandler;
