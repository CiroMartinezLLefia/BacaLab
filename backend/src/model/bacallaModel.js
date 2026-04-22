import mongoose from "mongoose";

const bacallaSchema = new mongoose.Schema(
  {
    nom: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    origen: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
    tipus: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
      enum: ["Salat", "Fresc", "Esqueixat", "Altres"],
    },
    descripcio: {
      type: String,
      required: [true, "El nombre es obligatorio"],
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Bacalla", bacallaSchema);