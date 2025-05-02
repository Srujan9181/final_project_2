import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
});

const referenceSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  }
});

const staffSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  assigned: [referenceSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Accounts",
    required: true
  }
});

const Account = mongoose.model("Accounts", accountSchema);
const Staff = mongoose.model("StaffList", staffSchema);

export {
  Account,
  Staff
};
