const mongoose = require('mongoose');

const ticketSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    product: {
      type: String,
      required: [true, 'Please select a product'],
      enum: ['iPhone', 'iMac', 'MacBook', 'iPad', 'AirPods', 'Accessories'],
    },
    description: {
      type: String,
      required: [true, 'Please add a description of the issue'],
    },
    status: {
      type: String,
      required: true,
      enum: ['issued', 'open', 'closed'],
      default: 'issued',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Ticket', ticketSchema);
