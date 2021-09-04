import {Request, ResponseToolkit} from "@hapi/hapi";
import {IUser} from "../interfaces";
import {HobbyModel, UserModel} from "../models";
import * as Boom from "boom";
import {ObjectId} from "mongoose";

/**
 * paginated users list
 * @param request
 * @param h
 */
export async function getUsers(request: Request, h: ResponseToolkit) {
    const limit: number = request.query.limit || 100;
    const page: number = Math.max(request.query.page, 0) || 0;

    try{
        const [users, count] = await Promise.all([
            UserModel.find()
                .sort('-createdOn')
                .limit(limit)
                .skip(limit * page),
            UserModel.count()
        ])
        return h.response({count, users}).code(200);
    }
    catch(e) {
        console.log(e);
        return Boom.badImplementation(e.message);
    }
}

export async function getUser(request: Request, h: ResponseToolkit) {
    // note that to get the hobbies you need a second query.
    // For better implementation user aggregate function
    try {
        const _id: ObjectId = <ObjectId>request.query._id;
        const user : IUser = await UserModel.findById(_id)
        return h.response(user).code(200);
    }
    catch(e) {
        return Boom.badImplementation(e.message);
    }
}

export async function createUser(request: Request, h: ResponseToolkit) {
    try {
        const user: IUser = await UserModel.create(request.payload);
        return h.response(user).code(201);
    }
    catch(e) {
        return Boom.badImplementation(e.message);
    }
}

export async function updateUser(request: Request, h: ResponseToolkit) {
    try {
        let user: IUser = <IUser>request.payload
        user = await UserModel.findByIdAndUpdate(user._id, user)
        return h.response(user).code(200);
    }
    catch(e) {
        return Boom.badImplementation(e.message);
    }
}

export async function deleteUser(request: Request, h: ResponseToolkit) {
    try{
        const _id: ObjectId = <ObjectId>request.params._id
        const user = await UserModel.findByIdAndRemove(_id)
        await HobbyModel.deleteMany({user: _id})
        return h.response(user).code(200);
    }
    catch(e) {
        return Boom.badImplementation(e.message);
    }
}

