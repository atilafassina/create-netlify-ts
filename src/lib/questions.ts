import { PromptObject } from 'prompts'

export default ({ cwd }: { cwd: string }): PromptObject[] => [
  {
    type: 'text',
    name: 'packageName',
    message: 'What is the name of the package?',
    validate: (value: string) =>
      value.includes(' ') ? `Cannot have spaces` : true,
  },
  {
    type: 'toggle',
    name: 'path',
    message: (prev: string) =>
      `We will create a new dir at ${cwd}/${prev}. Confirm?`,
    initial: true,
    active: 'yes',
    inactive: 'no',
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
      },
      {
        title: 'NPM',
        description: 'Use NPM as the package manager',
        value: 'npm',
      },
    ],
    initial: 0,
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
    type: 'select',
    name: 'withPrettier',
    message: 'Would like some Prettier with that?',
    choices: [
      {
        title: 'Yes, please',
        description: 'Looks goood!!',
        value: true,
      },
      {
        title: 'No, thanks',
        description: 'I’m allergic.',
        value: false,
      },
    ],
    initial: 0,
  },
  {
    type: 'toggle',
    name: 'netlifyDev',
    message: 'May I install or update Netlify CLI (globally) for you?',
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
  {
    type: (prev: string) => (prev ? 'text' : null),
    name: 'functionName',
    message: 'What is the name of the function?',
    validate: (value: string) =>
      value.includes(' ') ? `Cannot have spaces` : true,
  },
]
