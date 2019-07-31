module.exports = {
  types: [
    { value: 'feat', name: 'feat:     A new feature' },
    { value: 'fix', name: 'fix:      A bug fix' },
    {
      value: 'add',
      name: 'add:   Adding new file not related to feature/component/layout/theme-ui',
    },
    {
      value: 'update',
      name: 'update:   An update to existing feature/file/component/layout/theme-ui/hook',
    },
    { value: 'docs', name: 'docs:     Documentation only changes' },
    {
      value: 'style',
      name:
        'style:    Changes that do not affect the meaning of the code\n            (white-space, formatting, missing semi-colons, etc)',
    },
    {
      value: 'refactor',
      name:
        'refactor: A code change that neither fixes a bug nor adds a feature',
    },
    {
      value: 'perf',
      name: 'perf:     A code change that improves performance',
    },
    {
      value: 'test',
      name: 'test:     Adding missing tests or correcting existing tests',
    },
    {
      value: 'ci',
      name:
        'ci:       Changes to the our CI configuration files and scripts\n            (example scopes: Travis, circle, BrowserStack, SauceLabs)',
    },
    {
      value: 'chore',
      name:
        'chore:    Changes to the build process or auxiliary tools\n            and libraries such as documentation generation',
    },
    { value: 'revert', name: 'revert:   Revert to a commit' },
    { value: 'WIP', name: 'WIP:      Work in progress' },
  ],

  scopes: [
    { name: 'javascript' },
    { name: 'html' },
    { name: 'sass' },
    { name: 'config' },
    { name: 'theme' },
    { name: 'package.json' },
    { name: 'layout' },
    { name: 'component' },
    { name: 'hooks' },
    { name: 'theme-ui' },
    { name: 'asset' },
  ],

  allowTicketNumber: false,
  isTicketNumberRequired: false,
  ticketNumberPrefix: 'TICKET-',
  ticketNumberRegExp: '\\d{1,5}',

  // it needs to match the value for field type. Eg.: "fix"
  /*
    scopeOverrides: {
      fix: [
        {name: "merge"},
        {name: "style"},
        {name: "e2eTest"},
        {name: "unitTest"}
      ]
    },
    */
  // override the messages, defaults are as follows
  messages: {
    type: "Select the type of change that you're committing:",
    scope: '\nDenote the SCOPE of this change (optional):',
    // used if allowCustomScopes is true
    customScope: 'Denote the SCOPE of this change:',
    subject: 'Write a SHORT, IMPERATIVE tense description of the change:\n',
    body:
      'Provide a LONGER description of the change (optional). Use ' |
      ' to break new line:\n',
    breaking: 'List any BREAKING CHANGES (optional):\n',
    footer:
      'List any ISSUES CLOSED by this change (optional). E.g.: #31, #34:\n',
    confirmCommit: 'Are you sure you want to proceed with the commit above?',
  },

  allowCustomScopes: true,
  allowBreakingChanges: ['feat', 'fix'],
  // skip any questions you want
  // skipQuestions: ["body"],

  // limit subject length
  subjectLimit: 100,
  // breaklineChar: "|", // It is supported for fields body and footer.
  footerPrefix: 'ISSUES CLOSED:',
  // askForBreakingChangeFirst : true, // default is false
};
