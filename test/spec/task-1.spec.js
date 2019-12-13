import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import { getResponse, jsonResult } from "./utils.js";
import { status, json, getJSON } from "../../src/task-1.js";

chai.use(chaiAsPromised);
const assert = chai.assert;

const json1 = { hello: "world", world: "hello" };

describe("Task 1: status", () => {

    it("should pass through HTTP responses with 200-299 code", () => {
        let r = getResponse(200);
        assert.equal(status(r), r);

        r = getResponse(226);
        assert.equal(status(r), r);

        r = getResponse(299);
        assert.equal(status(r), r);
    });

    it("should throw error with HTTP response text for non-20* HTTP responses", () => {
        assert.throws(() => status(getResponse(307)), Error, "Temporary Redirect");
        assert.throws(() => status(getResponse(404)), Error, "Not Found");
        assert.throws(() => status(getResponse(503)), Error, "Service Unavailable");
    });

});

describe("Task 1: json", () => {
    it("should correctly parse JSON response", () => json(jsonResult(json1))
        .then(data => {
            assert.equal(data.hello, "world");
            assert.equal(data.world, "hello");
        })
    );
});

describe("Task 1: getJSON", () => {
    beforeEach(() => {
        const fetchstub = sinon.stub(window, "fetch");
        
        fetchstub.withArgs("/test/200").resolves(jsonResult(json1));
        fetchstub.withArgs("/test/200/1").resolves(jsonResult(json1));
        fetchstub.withArgs("/test/404").resolves(getResponse(404));
        fetchstub.rejects(new TypeError("Failed to fetch"));
    });

    afterEach(() => {
        window.fetch.restore();
    });

    it("should return Promise", () => assert.instanceOf(getJSON("/test/200"), Promise));

    it("should correctly parse JSON response", () => assert.eventually.deepEqual(getJSON("/test/200/1"), json1));

    it("should correctly handle failed HTTP responses", () => assert.isRejected(getJSON("/test/404"), Error, "Not Found"));

    it("should correctly handle rejected fetch call", () => assert.isRejected(getJSON("/test/car"), TypeError, "Failed to fetch"));

});
