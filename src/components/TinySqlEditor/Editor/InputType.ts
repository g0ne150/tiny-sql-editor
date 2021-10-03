// Defined in https://rawgit.com/w3c/input-events/v1/index.html#interface-InputEvent-Attributes

// inputType | User's expression of intention | Part of IME composition | beforeinput cancelable  | State of selection
export enum InputType {
    /**
     * insert typed plain text  | No  | Undefined  | Any
     */
    insertText = "insertText",
    /**
     * replace existing text by means of a spell checker, auto-correct or similar  | No  | Undefined  | Any
     */
    insertReplacementText = "insertReplacementText",
    /**
     * insert a line break  | No  | Undefined  | Any
     */
    insertLineBreak = "insertLineBreak",
    /**
     * insert a paragraph break  | No  | Undefined  | Any
     */
    insertParagraph = "insertParagraph",
    /**
     * insert a numbered list  | No  | Yes  | Any
     */
    insertOrderedList = "insertOrderedList",
    /**
     * insert a bulleted list  | No  | Yes  | Any
     */
    insertUnorderedList = "insertUnorderedList",
    /**
     * insert a horizontal rule  | No  | Yes  | Any
     */
    insertHorizontalRule = "insertHorizontalRule",
    /**
     * replace the current selection with content stored in a kill buffer  | No  | Yes  | Any
     */
    insertFromYank = "insertFromYank",
    /**
     * insert content into the DOM by means of drop  | No  | Yes  | Any
     */
    insertFromDrop = "insertFromDrop",
    /**
     * paste  | No  | Yes  | Any
     */
    insertFromPaste = "insertFromPaste",
    /**
     * paste content as a quotation  | No  | Yes  | Any
     */
    insertFromPasteAsQuotation = "insertFromPasteAsQuotation",
    /**
     * transpose the last two characters that were entered  | No  | Yes  | Any
     */
    insertTranspose = "insertTranspose",
    /**
     * replace the current composition string  | Yes  | No  | Any
     */
    insertCompositionText = "insertCompositionText",
    /**
     * insert a link  | No  | Yes  | Any
     */
    insertLink = "insertLink",
    /**
     * delete a word directly before the caret position  | No  | Undefined  | Collapsed
     */
    deleteWordBackward = "deleteWordBackward",
    /**
     * delete a word directly after the caret position  | No  | Undefined  | Collapsed
     */
    deleteWordForward = "deleteWordForward",
    /**
     * delete from the caret to the nearest visual line break before the caret position  | No  | Undefined  | Collapsed
     */
    deleteSoftLineBackward = "deleteSoftLineBackward",
    /**
     * delete from the caret to the nearest visual line break after the caret position  | No  | Undefined  | Collapsed
     */
    deleteSoftLineForward = "deleteSoftLineForward",
    /**
     * delete from to the nearest visual line break before the caret position to the nearest visual line break after the caret position  | No  | Undefined  | Collapsed
     */
    deleteEntireSoftLine = "deleteEntireSoftLine",
    /**
     * delete from the caret to the nearest beginning of a block element or br element before the caret position  | No  | Undefined  | Collapsed
     */
    deleteHardLineBackward = "deleteHardLineBackward",
    /**
     * delete from the caret to the nearest end of a block element or br element after the caret position  | No  | Undefined  | Collapsed
     */
    deleteHardLineForward = "deleteHardLineForward",
    /**
     * remove content from the DOM by means of drag  | No  | Yes  | Any
     */
    deleteByDrag = "deleteByDrag",
    /**
     * remove the current selection as part of a cut  | No  | Yes  | Any
     */
    deleteByCut = "deleteByCut",
    /**
     * delete the selection without specifying the direction of the deletion and this intention is not covered by another inputType  | No  | Undefined  | Non-collapsed
     */
    deleteContent = "deleteContent",
    /**
     * delete the content directly before the caret position and this intention is not covered by another inputType or delete the selection with the selection collapsing to its start after the deletion  | No  | Undefined  | Any
     */
    deleteContentBackward = "deleteContentBackward",
    /**
     * delete the content directly after the caret position and this intention is not covered by another inputType or delete the selection with the selection collapsing to its end after the deletion  | No  | Undefined  | Any
     */
    deleteContentForward = "deleteContentForward",
    /**
     * undo the last editing action  | No  | Yes  | Any
     */
    historyUndo = "historyUndo",
    /**
     * to redo the last undone editing action  | No  | Yes  | Any
     */
    historyRedo = "historyRedo",
    /**
     * initiate bold text  | No  | Yes  | Any
     */
    formatBold = "formatBold",
    /**
     * initiate italic text  | No  | Yes  | Any
     */
    formatItalic = "formatItalic",
    /**
     * initiate underline text  | No  | Yes  | Any
     */
    formatUnderline = "formatUnderline",
    /**
     * initiate stricken through text  | No  | Yes  | Any
     */
    formatStrikeThrough = "formatStrikeThrough",
    /**
     * initiate superscript text  | No  | Yes  | Any
     */
    formatSuperscript = "formatSuperscript",
    /**
     * initiate subscript text  | No  | Yes  | Any
     */
    formatSubscript = "formatSubscript",
    /**
     * make the current selection fully justified  | No  | Yes  | Any
     */
    formatJustifyFull = "formatJustifyFull",
    /**
     * center align the current selection  | No  | Yes  | Any
     */
    formatJustifyCenter = "formatJustifyCenter",
    /**
     * right align the current selection  | No  | Yes  | Any
     */
    formatJustifyRight = "formatJustifyRight",
    /**
     * left align the current selection  | No  | Yes  | Any
     */
    formatJustifyLeft = "formatJustifyLeft",
    /**
     * indent the current selection  | No  | Yes  | Any
     */
    formatIndent = "formatIndent",
    /**
     * outdent the current selection  | No  | Yes  | Any
     */
    formatOutdent = "formatOutdent",
    /**
     * remove all formatting from the current selection  | No  | Yes  | Any
     */
    formatRemove = "formatRemove",
    /**
     * set the text block direction  | No  | Yes  | Any
     */
    formatSetBlockTextDirection = "formatSetBlockTextDirection",
    /**
     * set the text inline direction  | No  | Yes  | Any
     */
    formatSetInlineTextDirection = "formatSetInlineTextDirection",
    /**
     * change the background color  | No  | Yes  | Any
     */
    formatBackColor = "formatBackColor",
    /**
     * change the font color  | No  | Yes  | Any
     */
    formatFontColor = "formatFontColor",
    /**
     * change the font-family  | No  | Yes  | Any
     */
    formatFontName = "formatFontName",

    // ---------------- Down below is custom defined, non w3c standard ----------------

    /**
     * For composition input, for input method support
     */
    compositionEnd = "compositionEnd",
    compositionStart = "compositionStart",
    compositionupdate = "compositionupdate",

    // new line insert input action
    newLineInsertBelow = "newLineInsertBelow",
    newLineInsertAbove = "newLineInsertAbove",

    // caret move action
    moveCaretUp = "moveCaretUp",
    moveCaretDown = "moveCaretDown",
    moveCaretForward = "moveCaretForward",
    moveCaretBackward = "moveCaretBackward",
}

export type InputTypeKey = keyof typeof InputType
