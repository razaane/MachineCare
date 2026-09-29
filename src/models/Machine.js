const mongoose = require('mongoose');

const machineSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nom: {
      type: String,
      required: true,
      trim: true,
    },
    atelier: {
      type: String,
      required: true,
      trim: true,
    },
    statut: {
      type: String,
      enum: ['disponible', 'en_maintenance', 'hors_service'],
      default: 'disponible',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Machine', machineSchema);