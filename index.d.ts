//****************************************************************************
// This file is not a reference.
// It exists solely to help support TypeScript's static analysis.
//****************************************************************************

type NoArgVoidFunction = () => void;

// Tampermonkey symbols

declare const GM_notification: (object, NoArgVoidFunction) => void;

declare const GM_setClipboard: (string, object) => void;
