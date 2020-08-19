const isYarnGlobal = require('is-yarn-global');
import { PromptObject } from 'prompts'

export default ({ cwd }: { cwd: string }): PromptObject[] => [
  {
    type: 'text',
    name: 'packageName',
    message: 'What is the name of the package?',
    validate: (value: string) =>
      Boolean(value) && value.includes(' ')
        ? `Cannot be blank, nor have spaces`
        : true,
  },
  {
    type: 'toggle',
    name: 'path',
    message: (prev: string) =>
      `A new directory will be created at ${cwd}/${prev}`,
    initial: true,
    active: 'OK',
    inactive: 'Cancel',
  },
  {
    type: (prev: string) => (prev ? 'text' : null),
    name: 'functionName',
    message: 'What is the name of the function?',
    validate: (value: string) =>
      Boolean(value) && value.includes(' ')
        ? `Cannot be blank, nor have spaces`
        : true,
  },
  {
    type: 'select',
    name: 'packageManager',
    message: 'Yarn or NPM?',
    choices: [
      {
        title: 'Yarn',
        description: 'Use Yarn as the package manager',
        value: 'yarn',
        disabled: !isYarnGlobal()
      },
      {
        title: 'NPM',
        description: 'Use NPM as the package manager',
        value: 'npm',
      },
    ],
    initial: isYarnGlobal() ? 0 : 1,
  },
  {
    type: 'toggle',
    name: 'isPrivate',
    message: 'Is this package private?',
    initial: true,
    active: 'yes',
    inactive: 'no',
  },
  {
    type: 'toggle',
    name: 'withPrettier',
    message: 'Add Prettier?',
    initial: false,
    active: 'yes',
    inactive: 'no',
  },
  {
    type: 'toggle',
    name: 'netlifyDev',
    message: 'Install or update Netlify CLI (globally)?',
    initial: false,
    active: 'Yes',
    inactive: 'No',
  },
  {
    type: 'toggle',
    name: 'shouldRewrite',
    message:
      'Would you like to make a Rewrite from `/functions/.netlify` to the root?',
    initial: false,
    active: 'Yes',
    inactive: 'No',
  },
]
