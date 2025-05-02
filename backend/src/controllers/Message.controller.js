import { Client, MissedRecords } from "../models/Enduser.model.js";
import { Staff } from "../models/User.model.js";


const respond = (res, status, payload) => res.status(status).json(payload);

const findByIdAndUpdateField = async (Model, id, field, value) => {
  const doc = await Model.findById(id);
  if (!doc) return null;
  doc[field] = value;
  return await doc.save();
};

const createClient = async (req, res) => {
  try {
    const user = new Client({ ...req.body, messages: [] });
    const saved = await user.save();
    respond(res, 200, { data: saved });
  } catch (err) {
    respond(res, 400, { message: err.message });
  }
};

const insertMessage = async (req, res) => {
  const { id, message } = req.body;
  try {
    const user = await Client.findById(id);
    if (!user) return respond(res, 404, { message: "User not found" });
    user.messages = [...user.messages, message];
    const saved = await user.save();
    respond(res, 200, { data: saved, message: "Message recorded" });
  } catch (err) {
    respond(res, 500, { message: err.message });
  }
};

const retrieveConversation = async (req, res) => {
  try {
    const user = await Client.findById(req.body.id);
    user ? respond(res, 200, user) : respond(res, 404, { message: "Not found" });
  } catch (err) {
    respond(res, 500, { message: err.message });
  }
};

const retrieveMemberMessages = async (req, res) => {
  try {
    const staff = await Staff.findById(req.params.id);
    const ids = staff?.assigned?.map(item => item.id) || [];
    const result = await Client.find({ _id: { $in: ids } });
    respond(res, 200, { data: result });
  } catch (err) {
    respond(res, 400, { message: "Failed to fetch", error: err });
  }
};

const listChatUsers = async (_req, res) => {
  try {
    const users = await Client.find();
    respond(res, 200, { data: users });
  } catch (err) {
    respond(res, 500, { message: err.message });
  }
};

const changeChatStatus = async (req, res) => {
  try {
    const updated = await findByIdAndUpdateField(Client, req.body.id, "status", req.body.status);
    updated
      ? respond(res, 200, { data: updated, message: "Status changed" })
      : respond(res, 404, { message: "Not found" });
  } catch (err) {
    respond(res, 500, { message: err.message });
  }
};

const assignTicket = async (req, res) => {
  const { memberId, ticketId } = req.query;
  try {
    const [member, ticket] = await Promise.all([
      Staff.findById(memberId),
      Client.findById(ticketId)
    ]);

    if (!member || !ticket) return respond(res, 404, { message: "Invalid member or ticket" });

    member.assigned.push({ id: ticketId });
    ticket.assignedTo = memberId;

    await Promise.all([member.save(), ticket.save()]);
    respond(res, 200, { message: "Assignment successful" });
  } catch (err) {
    respond(res, 500, { message: err.message });
  }
};

const markAsUnanswered = async (req, res) => {
  const { id, date } = req.body;
  try {
    const [ticket, existing] = await Promise.all([
      Client.findById(id),
      MissedRecords.findOne({ day: date })
    ]);

    if (existing) {
      existing.count += 1;
      await existing.save();
    } else {
      await new MissedRecords({ day: date, count: 1 }).save();
    }

    ticket.isMissed = true;
    const saved = await ticket.save();
    respond(res, 200, { data: saved, message: "Marked as missed" });
  } catch (err) {
    respond(res, 500, { message: err.message });
  }
};

const retrieveUnanswered = async (_req, res) => {
  try {
    const logs = await MissedRecords.find();
    respond(res, 200, { data: logs });
  } catch (err) {
    respond(res, 500, { message: err.message });
  }
};

export {
  createClient,
  insertMessage,
  retrieveConversation,
  listChatUsers,
  changeChatStatus,
  assignTicket,
  retrieveMemberMessages,
  markAsUnanswered,
  retrieveUnanswered
};
