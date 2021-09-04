import {ServerRoute} from "@hapi/hapi";
import * as Joi from 'joi';
import {createUser, deleteUser, getUser, getUsers, updateUser} from "../services/user";

export const userRoutes: ServerRoute[] = [
    {
        method: "GET",
        path: "/user/all",
        options: {
            handler: getUsers,
            tags: ['api'],
            description: "Get a list of all user documents and the total count. Can be paginated.",
            notes: "N.b. does not aggregate hobbies for users. Use hobbies API for that.",
            validate: {
                query: Joi.object({
                    limit: Joi.number().description("max amount per page"),
                    page: Joi.number().description("page number")
                })
            }
        }
    },
    {
        method: "GET",
        path: "/user",
        options: {
            handler: getUser,
            tags: ['api'],
            description: "get a user document",
            notes: "N.b. does not aggregate hobbies for user. Use hobbies API for that.",
            validate: {
                query: Joi.object({
                    _id: Joi.string().required()
                })
            }
        }
    },
    {
        method: "POST",
        path: "/user",
        options: {
            handler: createUser,
            tags: ['api'],
            description: "create a user document",
            validate: {
                payload: Joi.object({
                    name: Joi.string().required()
                })
            }
        }
    },
    {
        method: "PUT",
        path: "/user",
        options: {
            handler: updateUser,
            tags: ['api'],
            description: "update a user document",
            validate: {
                payload: Joi.object({
                    _id: Joi.string(), // not required; already given by params
                    name: Joi.string().required()
                })
            }
        }
    },
    {
        method: "DELETE",
        path: "/user/{_id}",
        options: {
            handler: deleteUser,
            tags: ['api'],
            description: "delete a user document and associated hobbies",
            validate: {
                params: Joi.object({
                    _id: Joi.string().required()
                })
            }
        }
    },
];