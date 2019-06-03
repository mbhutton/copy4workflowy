// ==UserScript==
// @name         Copy for WorkFlowy
// @namespace    https://github.com/mbhutton/copy4workflowy
// @version      0.1.0.2
// @description  Copies the URL and title of the current page for pasting into WorkFlowy
// @author       Matt Hutton
// @include      *
// @grant        GM_setClipboard
// @grant        GM_notification
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

  /**
   * @param {string} url The URL to normalise. Dev and beta workflowy.com domains
   *                 are normalised to the production workflowy.com domain.
   * @returns {string} The normalised version.
   */
  function normaliseUrl(url) {
    for (var domain of ["dev.workflowy.com", "beta.workflowy.com"]) {
      var prefix = `https://${domain}`;
      if (url.startsWith(prefix)) {
        url = `https://workflowy.com${url.substring(prefix.length)}`;
      }
    }
    return url;
  }

  /**
   * @param {string} title The page title to normalise. For WF pages, the title
   *                 is wrapped in text to emphasize that it is a link.
   * @param {string} url The URL of the page
   * @returns {string} The normalised version.
   */
  function normaliseTitle(title, url) {
    if (normaliseUrl(url).startsWith("https://workflowy.com/#/")) {
      title = `<i>See: "${title}"</i>`;
    }
    return title;
  }

  function keyListener(keyEvent) {
    if (isKeyboardShortcut(keyEvent)) {
      const url = normaliseUrl(document.location.toString());
      const normalisedTitle = normaliseTitle(document.title, url);
      const data = toWorkFlowyNoteOpml(normalisedTitle, url);
      const metadata = { type: "text", mimetype: "text/plain" };
      GM_setClipboard(data, metadata);
      const notificationTitle = "Success: Copied title & URL";
      GM_notification({ title: notificationTitle, text: document.title }, null); // eslint-disable-line no-undef
      keyEvent.stopPropagation();
      keyEvent.preventDefault();
    }
  }

  document.addEventListener("keydown", keyListener);
})();
