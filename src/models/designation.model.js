const mongoose = require("./../db");

const DesignationSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Designation name required"],
      lowerCase: true,
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Designation description required"],
      lowerCase: true,
      trim: true,
      unique: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "department",
      required: [true, "Department required"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("designation", DesignationSchema);