import {Request, ResponseToolkit} from "@hapi/hapi";
import {HobbyModel, UserModel} from "../models";
import {IHobby} from "../interfaces";
import * as Boom from "boom";
import {ObjectId} from "mongoose";

export async function getHobbies(request: Request, h: ResponseToolkit) {
    const limit: number = request.query?.limit || 100;
    const page: number = Math.max(request.query.page, 0) || 0;
    const user: ObjectId = <ObjectId>request.query.user

    try{
        const [hobbies, count] = await Promise.all([
            HobbyModel.find({user})
                .sort('-createdOn')
                .limit(limit)
                .skip(limit * page).exec(),
            HobbyModel.count()
        ])
        return h.response({count, hobbies}).code(200);
    }
    catch(e) {
        return Boom.badImplementation(e);
    }
}

export async function createHobby(request: Request, h: ResponseToolkit) {
    const userExists : boolean = (await UserModel.exists({_id: (<IHobby>request.payload).user}));
    if(userExists) {
        return Boom.badRequest("user not found")
    }

    try {
        const hobby: IHobby = <IHobby>await HobbyModel.create(<IHobby>request.payload);
        return h.response(hobby).code(201);
    }
    catch(e) {
        return Boom.badImplementation(e.message);
    }
}

export async function updateHobby(request: Request, h: ResponseToolkit) {
    // note that obviously any user authentication is lacking
    try {
        let hobby: IHobby = <IHobby>request.payload;
        hobby = await HobbyModel.findByIdAndUpdate(hobby._id, hobby)
        return h.response(hobby).code(200);
    }
    catch(e) {
        return Boom.badImplementation(e.message);
    }
}

export async function deleteHobby(request: Request, h: ResponseToolkit) {
    try{
        const hobby : IHobby = await HobbyModel.findByIdAndRemove(request.params._id)
        return h.response(hobby).code(200);
    }
    catch(e) {
        return Boom.badImplementation(e.message);
    }
}
