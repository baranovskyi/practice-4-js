import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import { getResponse, jsonResult } from "./utils.js";
import getParallel from "../../src/task-2.js";

chai.use(chaiAsPromised);
const assert = chai.assert;

const json1 = { hello: "world", world: "hello" };
const json2 = { hello: "wollo", world: "herld" };

describe("Task 2: getParallel", () => {
    beforeEach(() => {
        const fetchstub = sinon.stub(window, "fetch");
        
        fetchstub.withArgs("/test/200").resolves(jsonResult(json1));
        fetchstub.withArgs("/test/200/1").resolves(jsonResult(json1));
        fetchstub.withArgs("/test/200/2").resolves(jsonResult(json2));
        fetchstub.withArgs("/test/200/3").resolves(jsonResult(json1));
        fetchstub.withArgs("/test/200/4").resolves(jsonResult(json2));
        fetchstub.withArgs("/test/404").resolves(getResponse(404));
        fetchstub.withArgs("/test/500").resolves(getResponse(500));
        fetchstub.rejects(new TypeError("Failed to fetch"));
    });

    afterEach(() => {
        window.fetch.restore();
    });

    it("should return Promise", () => assert.instanceOf(getParallel(["/test/200"]), Promise));

    it("should resolve for resolved fetches", () => assert.eventually.deepEqual(getParallel(["/test/200/1", "/test/200/2"]), [json1, json2]));

    it("should reject [200, 404]", () => assert.isRejected(getParallel(["/test/200/3", "/test/404"]), Error, "Not Found"));

    it("should reject [500, 200]", () => assert.isRejected(getParallel(["/test/500", "/test/200/4"]), Error, "Internal Server Error"));

    it("should reject [fail, 404]", () => assert.isRejected(getParallel(["/test/dog", "/test/404"]), Error, "Failed to fetch"));

});
