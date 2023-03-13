module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'import'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'error',
    "@typescript-eslint/typedef": [
      "error",
      {
        "parameter": true,
      }
    ],
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    "prettier/prettier": ["error", {"printWidth": 135}],
    "prefer-const": ["warn", {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }],
    "semi": ["error", "always"],
    "import/order": [
      "error",
      {
        "alphabetize": {
          "order": "asc",
          "caseInsensitive": true
        },
        "newlines-between": "never",
        "groups": ["builtin", "external", "parent", "sibling", "index"],
        "pathGroups": [
          {
            "pattern": "~/**",
            "group": "external",
            "position": "before"
          }
        ],
        "pathGroupsExcludedImportTypes": ["builtin"]
      }
    ],
  },
  "overrides": [
    {
      // enable the rule specifically for TypeScript files
      "files": ["*.ts", "*.tsx"],
      "rules": {
        "@typescript-eslint/explicit-member-accessibility": ["error", {
          "accessibility": 'explicit',
          "overrides": {
            "accessors": 'explicit',
            "constructors": 'no-public',
            "methods": 'explicit',
            "properties": 'off',
            "parameterProperties": 'explicit'
          }
        }]
      }
    }
  ]
};
