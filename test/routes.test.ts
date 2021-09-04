"use strict"

import * as Lab from "@hapi/lab"
import {expect} from "@hapi/code";
export const lab = Lab.script()
const {beforeEach, afterEach, describe, it, before} = lab

import {init} from "../src/server";
import {UserModel} from "../src/models";

describe('GET /user/all', () => {
    let server;

    before(() => {
        // hacky database mock implementation
        const users = [{name: 'Steve'}, {name: 'Bill'}];
        const skip = function() {return users;}
        const limit = function() {return this;}
        const sort = function() {console.log("sort", this);return this;}

        // noinspection TypeScriptValidateTypes
        UserModel.find = function() {return {sort, limit, skip}}
        // noinspection TypeScriptValidateTypes
        UserModel.count = async () => 2;
    })

    beforeEach(async () => {
        server = await init();
    });

    afterEach(async () => {
        await server.stop();
    });

    it('responds with 200', async () => {
        const res = await server.inject({
            method: 'get',
            url: '/user/all'
        });
        expect(res.statusCode).to.equal(200);
        expect(JSON.parse(res.payload).users.length).to.equal(2);
        expect(JSON.parse(res.payload).count).to.equal(2);

    });
});