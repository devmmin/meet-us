module.exports = {
  globals: {
    JSX: true,
  },
  env: {
    browser: true,
    es2021: true,
  },
  plugins: ["react", "react-hooks", "@typescript-eslint"],
  extends: [
    "react-app",
    "react-app/jest",
    "plugin:react/recommended",
    "airbnb",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    "import/prefer-default-export": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        ts: "never",
        tsx: "never",
        js: "never",
      },
    ],
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    ],
    "react/function-component-definition": [
      2,
      {
        namedComponents: "arrow-function",
      },
    ],
    "react/jsx-curly-newline": "off",
    "react/jsx-curr": "off",
    "react/jsx-one-expression-per-line": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": [
      "warn",
      {
        additionalHooks: "useRecoilCallback",
      },
    ],
    "comma-dangle": "off",
    "object-curly-newline": "off",
    "implicit-arrow-linebreak": "off",
    "no-else-return": ["error", { allowElseIf: true }],
    "operator-linebreak": "off",
    "linebreak-style": "off",
    "no-restricted-syntax": [
      "error",
      "FunctionExpression",
      "WithStatement",
      "BinaryExpression[operator='in']",
    ],
    "no-console": "off",
    "no-param-reassign": "off",
    quotes: ["error", "double"],
    "no-lonely-if": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
      },
    },
  },
};
