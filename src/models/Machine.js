const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
      unique: true,
    },
    nom: {
      type: String,
      required: true,
    },
    atelier: {
      type: String,
      required: true,
    },
    statut: {
      type: String,
      enum: ['disponible', 'en_maintenance', 'hors_service'],
      default: 'disponible',
    },
  },
  { timestamps: true }
);
machineSchema.index({ reference: 1 }, { unique: true });
module.exports = mongoose.model('Machine', machineSchema);