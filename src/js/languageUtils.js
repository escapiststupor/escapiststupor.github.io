// Language detection and utility functions
const languageUtils = {
  // Detect user's preferred language from browser settings
  detectLanguage: function () {
    const userLanguages = navigator.languages || [
      navigator.language || navigator.userLanguage,
    ];

    for (let lang of userLanguages) {
      // Check for Traditional Chinese
      if (
        lang.toLowerCase().includes("zh-tw") ||
        lang.toLowerCase().includes("zh-hant") ||
        lang.toLowerCase() === "zh-mo" ||
        lang.toLowerCase() === "zh-hk"
      ) {
        return "zh_tw";
      }
      // Check for English
      if (lang.toLowerCase().startsWith("en")) {
        return "en";
      }
    }

    // Default to English if no match found
    return "en";
  },

  // Get current language from URL
  getCurrentLanguage: function () {
    const path = window.location.pathname;
    if (path.includes("/zh_tw/")) {
      return "zh_tw";
    } else if (path.includes("/en/")) {
      return "en";
    }
    return null;
  },

  // Navigate to language version
  navigateToLanguage: function (language) {
    const currentPath = window.location.pathname;
    const baseUrl = window.location.origin;

    if (language === "en") {
      window.location.href = baseUrl + "/en/";
    } else if (language === "zh_tw") {
      window.location.href = baseUrl + "/zh_tw/";
    }
  },

  // Initialize language toggle
  initLanguageToggle: function () {
    const currentLang = this.getCurrentLanguage();
    if (!currentLang) return;

    // Create language toggle element
    const toggleHtml = `
      <div id="language-toggle" style="position: fixed; top: 20px; right: 20px; z-index: 1000; background: rgba(0,0,0,0.8); padding: 10px; border-radius: 5px;">
        <button id="lang-en" class="lang-btn ${
          currentLang === "en" ? "active" : ""
        }" style="background: ${
      currentLang === "en" ? "#fff" : "transparent"
    }; color: ${
      currentLang === "en" ? "#000" : "#fff"
    }; border: 1px solid #fff; padding: 5px 10px; margin: 0 2px; cursor: pointer; border-radius: 3px;">EN</button>
        <button id="lang-zh" class="lang-btn ${
          currentLang === "zh_tw" ? "active" : ""
        }" style="background: ${
      currentLang === "zh_tw" ? "#fff" : "transparent"
    }; color: ${
      currentLang === "zh_tw" ? "#000" : "#fff"
    }; border: 1px solid #fff; padding: 5px 10px; margin: 0 2px; cursor: pointer; border-radius: 3px;">中文</button>
      </div>
    `;

    // Add to body
    document.body.insertAdjacentHTML("beforeend", toggleHtml);

    // Add event listeners
    document.getElementById("lang-en").addEventListener("click", () => {
      if (currentLang !== "en") {
        this.navigateToLanguage("en");
      }
    });

    document.getElementById("lang-zh").addEventListener("click", () => {
      if (currentLang !== "zh_tw") {
        this.navigateToLanguage("zh_tw");
      }
    });
  },
};

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = languageUtils;
}

// Make available globally for browser use
if (typeof window !== "undefined") {
  window.languageUtils = languageUtils;
}
