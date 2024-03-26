const mongoose = require("mongoose");

const serviceRequestSchema = new mongoose.Schema(
  {
    typeOfServiceNeeded: {
      type: String,
      required: true,
    },
    descriptionOfServiceRequest: {
      type: String,
      required: true,
    },
    preferredDateAndTimeRange: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
    },
    additionalNotesOrInstructions: {
      type: String,
    },
    preferredContactMethod: { type: String, enum: ["email", "phone", "other"] },
    paymentInformation: {
      type: String,
    },
  },
  { collection: "ServiceRequests" }
);

const ServiceRequestModel = mongoose.model(
  "ServiceRequest",
  serviceRequestSchema
);

module.exports = ServiceRequestModel;
