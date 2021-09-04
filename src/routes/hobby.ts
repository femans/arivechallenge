import {ServerRoute} from "@hapi/hapi";
import * as Joi from 'joi';
import {createHobby, deleteHobby, getHobbies, updateHobby} from "../services/hobby";


export const hobbyRoutes: ServerRoute[] = [
    {
        method: "GET",
        path: "/hobby/all",
        options: {
            handler: getHobbies,
            description: "get list of hobbies for a user",
            notes: "retrieves list of hobbies based on user id",
            tags: ['api'],
            validate: {
                query: Joi.object({
                    user: Joi.string().required().description("_id of user"),
                    limit: Joi.number().description("max amount per page"),
                    page: Joi.number().description("page number")
                })
            }
        }
    },
    {
        method: "POST",
        path: "/hobby",
        options: {
            handler: createHobby,
            tags: ['api'],
            description: "create hobby for a specific user. The created document is returned.",
            notes: "user: user object. passionLevel, name and year are all required.",
            validate: {
                payload: Joi.object({
                    user: Joi.string().required(),
                    passionLevel: Joi.string().required().valid("Low", "Medium", "High", "Very-High"),
                    name: Joi.string().required(),
                    year: Joi.number().required()
                }).description("passionLevel: only values Low, Medium, High and Very-High allowed"),
            }
        }
    },
    {
        method: "PUT",
        path: "/hobby",
        options: {
            handler: updateHobby,
            tags: ['api'],
            description: "update a hobby. The updated document is returned.",
            validate: {
                payload: Joi.object({
                    _id: Joi.string().required(),
                    passionLevel: Joi.string().valid("Low", "Medium", "High", "Very-High"),
                    name: Joi.string(),
                    year: Joi.number()
                })
            }
        }
    },
    {
        method: "DELETE",
        path: "/hobby/{_id}",
        options: {
            handler: deleteHobby,
            tags: ['api'],
            description: "deletes a hobby",
            validate: {
                params: Joi.object({
                    _id: Joi.string().required()
                }),
            }
        }

    },
];
