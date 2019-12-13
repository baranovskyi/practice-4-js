import config from "./rollup.config";
import merge from "lodash/merge";

export default merge({
    input: "test/**/*.spec.js",
    output: {
        file: "build/test-bundle.js"
    },
    globals: {
        mocha: "mocha",
        chai: "chai",
        sinon: "sinon"
    },
    external: ["mocha", "chai", "sinon"],
    intro: "if (typeof module !== \"undefined\") require(\"source-map-support\").install();"
}, config);
