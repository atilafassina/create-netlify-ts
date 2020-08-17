module.exports = ({ cwd }) => [
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
    type: 'text',
    name: 'packageName',
    message: 'What is the name of the package?',
    validate: (value) => (value.includes(' ') ? `Cannot have spaces` : true),
  },
  {
    type: 'toggle',
    name: 'path',
    message: (prev) => `We will create a new dir at ${cwd}/${prev}. Confirm?`,
    initial: true,
    active: 'yes',
    inactive: 'no',
  },
  {
    type: 'toggle',
    name: 'private',
    message: 'Is this package private?',
    initial: true,
    active: 'yes',
    inactive: 'no',
  },
  {
    type: 'select',
    name: 'prettier',
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
    type: 'select',
    name: 'platform',
    message: 'Netlify or Vercel?',
    choices: [
      {
        title: 'Netlify',
        description: '',
        value: 'netlify',
      },
      {
        title: 'Vercel',
        description: '',
        value: 'vercel',
      },
    ],
    initial: 0,
  },
  {
    type: (prev) => (prev === 'netlify' ? 'toggle' : null),
    name: 'netlifyDev',
    message: 'May I install or update Netlify-Dev (globally) for you?',
    initial: true,
    active: 'Yes',
    inactive: 'No',
  },
  {
    type: (prev, { platform }) => (platform === 'netlify' ? 'toggle' : null),
    name: 'rewrite',
    message:
      'Would you like to make a Rewrite from `/functions/.netlify` to the root?',
    initial: false,
    active: 'Yes',
    inactive: 'No',
  },
]
