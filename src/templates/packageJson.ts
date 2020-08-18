function createTasks(platform: string) {
  return platform === 'netlify'
    ? `"scripts": {
    "build": "netlify-lambda build src",
    "ts-check": "tsc --noEmit --lib ES2015 ./src/*.ts"
  }
  `
    : ','
}

type PkgJsonInfo = {
  [key: string]: string
}

export default ({
  packageName,
  gitName,
  gitEmail,
  isPrivate,
  withPrettier,
  platform,
}: PkgJsonInfo) => `
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
