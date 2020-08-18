function createTasks(platform) {
  return platform === 'netlify'
    ? `"scripts": {
    "build": "netlify-lambda build src",
    "ts-check": "tsc --noEmit --lib ES2015 ./src/*.ts"
  }
  `
    : ','
}

module.exports = ({
  packageName,
  gitName,
  gitEmail,
  isPrivate,
  withPrettier,
  platform,
}) => `
{
  "name": "${packageName}",
  "version": "1.0.0",
  "main": "index.js",
  "author": "${gitName.trimEnd()} <${gitEmail.trimEnd()}>",
  "license": "MIT",
  "private": ${isPrivate},
  ${createTasks(platform)}${
  withPrettier &&
  `,
  "prettier": {
    "semi": false,
    "singleQuote": true
  }`
}
}

`
