// Configuración flat para ESLint v9+ (compatible con el CLI)
module.exports = [
  {
    ignores: ['node_modules/**']
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021
    },
    plugins: {},
    rules: {
      'no-restricted-syntax': [
        'error',
        {
          selector: 'ClassDeclaration',
          message: "No use de 'class' — usa constructores y prototipos en su lugar."
        },
        {
          selector: 'ClassExpression',
          message: "No use de 'class' — usa constructores y prototipos en su lugar."
        }
      ]
    }
  }
];
