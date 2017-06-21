"use strict";
const PLUGIN_NAME = "gulp-jsdom";
const through = require("through2");
const gutil = require("gulp-util");
const PluginError = gutil.PluginError;

const jsdom = require("jsdom");
const { JSDOM } = jsdom;

module.exports = function(mutator, options, serialize) {
	options = options || {};
	serialize = serialize || true;
	
	function transform(file, encoding, callback) {
		if (file.isNull()) {
			callback(null, file); return;
		}
		if (file.isStream()) {
			callback(new PluginError(PLUGIN_NAME, "Streaming not supported")); return;
		}
		
		try {
			if (file.isBuffer()) {
				const dom = new JSDOM(file.contents.toString("utf8"), options);
				
				var output;
				if (mutator.length === 0) {
					output = mutator.call(dom.window.document);
				} else {
					output = mutator(dom.window.document);
				}
				
				file.contents = new Buffer((typeof output === "string") ? output : (serialize === true) ? dom.serialize() : dom.window.document.documentElement.outerHTML);
				this.push(file);
			}
			
		} catch (err) {
			this.emit("error", new PluginError(PLUGIN_NAME, err));
		}

		callback();
	}

	return through.obj(transform);
};
