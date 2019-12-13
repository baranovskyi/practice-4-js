import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import sinon from "sinon";
import { getResponse, jsonResult } from "./utils.js";
import getSeries from "../../src/task-3.js";

chai.use(chaiAsPromised);
const assert = chai.assert;

const json1 = { hello: "world", world: "hello" };
const json2 = { hello: "wollo", world: "herld" };

describe("Task 3: getSeries", () => {
    beforeEach(() => {
        const fetchstub = sinon.stub(window, "fetch");

        fetchstub.withArgs("/test/200/1").resolves(jsonResult(json1));
        fetchstub.withArgs("/test/200/2").resolves(jsonResult(json2));
        fetchstub.withArgs("/test/200/3").resolves(jsonResult(json1));
        fetchstub.withArgs("/test/200/4").resolves(jsonResult(json2));
        fetchstub.withArgs("/test/200/5").resolves(jsonResult(json1));
        fetchstub.withArgs("/test/200/6").resolves(jsonResult(json2));
        fetchstub.withArgs("/test/404").resolves(getResponse(404));
        fetchstub.withArgs("/test/500").resolves(getResponse(500));
        fetchstub.rejects(new TypeError("Failed to fetch"));
    });

    afterEach(() => {
        window.fetch.restore();
    });

    it("should return Promise", () => assert.instanceOf(getSeries("/test/200/1", "/test/200/2"), Promise));

    it("should correctly get", () => assert.eventually.deepEqual(getSeries("/test/200/3", "/test/200/4"), [json1, json2]));

    it("should throw Error('first fetch failed') if first failed", () => assert.isRejected(getSeries("/test/failed", "/test/200/5"), Error, "First fetch failed"));

    it("should throw Error('second fetch failed') if second failed", () => assert.isRejected(getSeries("/test/200/6", "/test/failed"), Error, "Second fetch failed"));

    it("should throw Error('first fetch failed') if both failed", () => assert.isRejected(getSeries("/test/failed", "/test/failed"), Error, "First fetch failed"));
    
});
