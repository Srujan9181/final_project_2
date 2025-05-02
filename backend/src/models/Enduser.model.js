import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  day: {
    type: String,
    required: true
  },
  count: {
    type: Number,
    required: true
  }
});

const dialogueSchema = new mongoose.Schema({
  message: String,
  sender: String,
  receiver: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const clientSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  status: String,
  ticket_id: String,
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  messages: [dialogueSchema],
  isMissed: {
    type: Boolean,
    default: false
  }
});

const Client = mongoose.model('clients', clientSchema);
const MissedRecords = mongoose.model('missed_records', analyticsSchema);

export { Client, MissedRecords };
