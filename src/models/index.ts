import { Schema, model } from 'mongoose';

import { IUser, IHobby } from "../interfaces";

const HobbySchema = new Schema<IHobby>(
    {
        passionLevel: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        year: Number,
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    },
);

export const HobbyModel = model<IHobby>('Hobby', HobbySchema);

const UserSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, 'Please enter a full name'],
            index: true,
        },
    },
    { timestamps: true },
);

export const UserModel = model<IUser>('Index', UserSchema);