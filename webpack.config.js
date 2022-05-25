const Alt1Chain = require("@alt1/webpack").default;
const path = require("path");

module.exports = function(_env, argv) {
    const isProduction = argv.mode === "production";
    const isDevelopment = !isProduction;

    const srcdir = path.resolve(__dirname, "./src/");
    const outdir = path.resolve(__dirname, ".");
    const config = new Alt1Chain(srcdir, { ugly: false });

    //exposes all root level exports as UMD (as named package "testpackege" or "TEST" in global scope)
    config.makeUmd("testpackage", "TEST");

    //the name and location of our entry file (the name is used for output and can contain a relative path)
    config.entry("index", "./index.js");

    //where to put all the stuff
    config.output(outdir);

    let cfg = config.toConfig();
    
    let babel = {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                cacheDirectory: true,
                cacheCompression: false,
                envName: isProduction ? "production" : "development"
            }
        }
    }

    cfg.module.rules.push(babel);
    
    return cfg;
};

