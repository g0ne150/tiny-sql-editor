import {
    LITERALS,
    MULTI_WORD_TYPES,
    TYPES,
    NON_RESERVED_WORDS,
    RESERVED_WORDS,
    RESERVED_FUNCTIONS,
    POSSIBLE_WITHOUT_PARENS,
    COMBOS,
} from "./sql"

export enum TokenType {
    LITERALS,
    MULTI_WORD_TYPES,
    TYPES,
    NON_RESERVED_WORDS,
    RESERVED_WORDS,
    RESERVED_FUNCTIONS,
    POSSIBLE_WITHOUT_PARENS,
    COMBOS,
    COMMENTS,
    DEFAULT,
}

const matchCreator = (regexp: string) => new RegExp(regexp, "i")

const rules = [
    {
        type: TokenType.LITERALS,
        match: matchCreator(`^(${LITERALS.join("|")})$`),
    },
    {
        type: TokenType.MULTI_WORD_TYPES,
        match: matchCreator(`^(${MULTI_WORD_TYPES.join("|")})$`),
    },
    {
        type: TokenType.TYPES,
        match: matchCreator(`^(${TYPES.join("|")})$`),
    },
    {
        type: TokenType.NON_RESERVED_WORDS,
        match: matchCreator(`^(${NON_RESERVED_WORDS.join("|")})$`),
    },
    {
        type: TokenType.RESERVED_WORDS,
        match: matchCreator(`^(${RESERVED_WORDS.join("|")})$`),
    },
    {
        type: TokenType.RESERVED_FUNCTIONS,
        match: matchCreator(`^(${RESERVED_FUNCTIONS.join("|")})$`),
    },
    {
        type: TokenType.POSSIBLE_WITHOUT_PARENS,
        match: matchCreator(`^(${POSSIBLE_WITHOUT_PARENS.join("|")})$`),
    },
    {
        type: TokenType.COMBOS,
        match: matchCreator(`^(${COMBOS.join("|")})$`),
    },
]

export type Token = {
    text: string
    type: TokenType
}

/**
 * Tokenize sql by RegExp match
 *
 * @param sqlLine a line code of sql
 * @returns
 */
export const tokenize: (sqlLine: string) => Token[] = (sqlLine: string) => {
    if (/^\s*--.*$/.test(sqlLine)) {
        return tokenizeComments(sqlLine)
    }
    let commentCharIdx = sqlLine.indexOf("--")
    commentCharIdx = commentCharIdx === -1 ? sqlLine.length : commentCharIdx
    return [
        ...tokenizeWithoutComments(sqlLine.substring(0, commentCharIdx)),
        ...tokenizeComments(sqlLine.substring(commentCharIdx)),
    ]
}

const tokenizeComments: (sql: string) => Token[] = (sql: string) => {
    if (/^\s*--.*$/.test(sql)) {
        return [{ type: TokenType.COMMENTS, text: sql }]
    }
    return []
}

const tokenizeWithoutComments: (sql: string) => Token[] = (sql: string) => {
    return sql.split(" ").map((word) => {
        for (const rule of rules) {
            if (rule.match.test(word)) {
                return {
                    text: word,
                    type: rule.type,
                }
            }
        }
        return {
            text: word,
            type: TokenType.DEFAULT,
        }
    })
}

/**
 * Token type map for syntax highlight
 */
export const classNameMap = new Map([
    [TokenType.LITERALS, "text-blue-900"],
    [TokenType.MULTI_WORD_TYPES, ""],
    [TokenType.TYPES, "text-blue-900"],
    [TokenType.NON_RESERVED_WORDS, ""],
    [TokenType.RESERVED_WORDS, "text-blue-600"],
    [TokenType.RESERVED_FUNCTIONS, "text-blue-900"],
    [TokenType.POSSIBLE_WITHOUT_PARENS, "text-blue-300"],
    [TokenType.COMBOS, ""],
    [TokenType.COMMENTS, "text-green-600"],
    [TokenType.DEFAULT, ""],
])