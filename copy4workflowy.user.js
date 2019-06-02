// ==UserScript==
// @name         Copy for WorkFlowy
// @namespace    https://github.com/mbhutton/copy4workflowy
// @version      0.1.0.0
// @description  Copies the URL and title of the current page for pasting into WorkFlowy
// @author       Matt Hutton
// @include      *
// @grant        GM_setClipboard
// @run-at       document-start
// @downloadURL  https://github.com/mbhutton/copy4workflowy/raw/master/copy4workflowy.user.js
// ==/UserScript==

// Enable TypeScript checking
// @ts-check
/// <reference path="index.d.ts" />

(function() {
  "use strict";

  function isKeyboardShortcut(keyEvent) {
    return keyEvent.ctrlKey && keyEvent.shiftKey && keyEvent.code === "Digit7";
  }

  /**
   * @param {string} c The character to escape.
   * @return {string} The escaped string.
   */
  function escapeXmlAttrChar(c) {
    switch (c) {
      case "&":
        return "&amp;";
      case "<":
        return "&lt;";
      case ">":
        return "&gt;";
      case "'":
        return "&apos;";
      case '"':
        return "&quot;";
      default:
        return c;
    }
  }

  /**
   * @param {string} s The string to escape.
   * @return {string} The escaped string.
   */
  function escapeXmlAttr(s) {
    var escapedString = "";
    for (var c of s) {
      escapedString += escapeXmlAttrChar(c);
    }
    return escapedString;
  }

  /**
   * @param {string} title The page title.
   * @param {string} url The page URL.
   * @return {string} The WorkFlowy note, as OPML.
   */
  function toWorkFlowyNoteOpml(title, url) {
    return `
<?xml version="1.0"?>
<opml version="2.0">
<head>
</head>
<body>
  <outline
     text="${escapeXmlAttr(title)}"
    _note="${escapeXmlAttr(url)}" />
</body>
</opml>
`.trim();
  }

  function keyListener(keyEvent) {
    if (isKeyboardShortcut(keyEvent)) {
      const data = toWorkFlowyNoteOpml(
        document.title,
        document.location.toString()
      );
      const metadata = { type: "text", mimetype: "text/plain" };
      GM_setClipboard(data, metadata);
      keyEvent.stopPropagation();
      keyEvent.preventDefault();
    }
  }

  document.addEventListener("keydown", keyListener);
})();
