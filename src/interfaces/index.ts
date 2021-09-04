import {Document, ObjectId} from 'mongoose'

export interface IUser extends Document {
    _id: ObjectId,
    name: string,
    hobbies: Array<IHobby>
}

export interface IHobby extends Document {
    _id: ObjectId,
    user: ObjectId,
    passionLevel: string,
    name: string,
    year: Number
}