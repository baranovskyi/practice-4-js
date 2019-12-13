import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import EP from "../../src/task-6.js";

chai.use(chaiAsPromised);
const assert = chai.assert;

function createStubPromise() {
    let settle;
    const p = new Promise((resolve, reject) => {
        settle = (flag, value) => {
            if (flag) {
                resolve(value);
            } else {
                reject(value);
            }
        };
    });
    p.settle = settle;
    return p;
}

describe("Task 6: some", () => {

    it("should return EnhancedPromise", () => {
        assert.instanceOf(
            EP.some([Promise.resolve(1), Promise.resolve(2)], 1), EP
        );
    });

    it("should resolve with empty array for empty promises array", () => {
        const p = EP.some([], 0);

        return assert.eventually.deepEqual(p, []);
    });

    it("should return values in order they were resolved", () => {
        const [p1, p2, p3, p4] = [0, 0, 0, 0].map(createStubPromise);

        const p = EP.some([p1, p2, p3, p4], 2);

        setTimeout(() => {
            p3.settle(true, 3);
            setTimeout(() => {
                p4.settle(false, 4);
                setTimeout(() => {
                    p2.settle(true, 2);
                    // don't resolve p1,
                    // to check if promise will be fulfilled
                    // without waiting all promises to be settled.
                }, 0);
            }, 0);
        }, 0);

        return assert.eventually.deepEqual(p, [3, 2]);
    });

    it("should reject when number of fulfilled promises in lesser that needed", () => {
        const [p1, p2, p3, p4] = [0, 0, 0, 0].map(createStubPromise);

        const p = EP.some([p1, p2, p3, p4], 3);

        setTimeout(() => {
            p3.settle(true, 3);
            setTimeout(() => {
                p4.settle(false, 4);
                setTimeout(() => {
                    p2.settle(false, 2);
                    // don't resolve p1,
                    // to check if promise will be rejected
                    // without waiting all promises to be settled.
                }, 0);
            }, 0);
        }, 0);

        return assert.isRejected(p, Error);
    });

    it("should reject when count is larger than length of array", () => {
        const p1 = createStubPromise();

        const p = EP.some([p1], 2);

        p1.settle(true, 1);
        return assert.isRejected(p, Error);
    });
});
