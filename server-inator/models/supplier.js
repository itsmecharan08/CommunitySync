const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    profilePicture: String,
    businessName: String,
    typeOfServicesOffered: { type: String, required: true },
    serviceArea: { type: String, required: true },
    yearsOfExperience: Number,
    certificationsOrLicences: String,
    briefDescriptionOfServicesProvided: String,
    portfolioOrPreviousWorkExamples: String,
    availabilitySchedule: String,
    preferredContactMethod: { type: String, enum: ["email", "phone", "other"] },
  },
  { collection: "Suppliers" }
);

const SupplierModel = mongoose.model("Supplier", supplierSchema);
module.exports = SupplierModel;
