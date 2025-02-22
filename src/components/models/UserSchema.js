import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, default: '' },
    address: { type: String, default: '' },
    pincode: { type: Number, default: '' },
    phone: { type: Number, default: '' }
}, { timestamps: true })

export const User = models?.users || model('users', UserSchema)
