module.exports = {
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    globals: {
        wx: true,
        App: true,
        Page: true,
        Component: true
    },
    extends: [
        'standard'
    ],
    parserOptions: {
        parser: 'babel-eslint'
    },
    rules: {
        // 来自 https://juejin.im/post/5d270196f265da1ba2528a6d
        'no-async-promise-executor': 'off',
        'no-misleading-character-class': 'off',
        'no-prototype-builtins': 'off',
        'no-shadow-restricted-names': 'off',
        'no-useless-catch': 'off',
        'no-with': 'off',
        'require-atomic-updates': 'off',
        // 自定义
        // 'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        // 'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-console': 'off',
        'no-debugger': 'off',
        'standard/no-callback-literal': 0,
        indent: ['error', 4]
    }
}
