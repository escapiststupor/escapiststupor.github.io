// JavaScript
window.jQuery = require("./jquery.min.js");
require("./jquery.poptrox.min.js");
window.skel = require("./skel.min.js");
require("./util.js");
require("./main.js");

// Language utilities
require("./languageUtils.js");

// Initialize language toggle when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
  if (typeof window.languageUtils !== "undefined") {
    window.languageUtils.initLanguageToggle();
  }
});
