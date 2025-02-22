import { model, models, Schema } from "mongoose";

const AdminSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, default: '' },
}, { timestamps: true })

export const Admin = models?.admins || model('admins', AdminSchema)
