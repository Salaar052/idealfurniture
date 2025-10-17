import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

// 1️⃣ Define TypeScript interface for Admin document
export interface IAdmin extends Document {
  username: string;
  password: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

// 2️⃣ Define the Mongoose schema
const AdminSchema: Schema<IAdmin> = new Schema<IAdmin>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// 3️⃣ Hash password before saving
AdminSchema.pre<IAdmin>("save", async function (next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// 4️⃣ Custom method for comparing passwords
AdminSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin: Model<IAdmin> =
  mongoose.models.Admin || mongoose.model<IAdmin>("Admin", AdminSchema);

export default Admin;
