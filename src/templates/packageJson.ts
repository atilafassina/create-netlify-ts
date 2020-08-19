type PkgJsonInfo = {
  [key: string]: string
}

export default ({
  packageName,
  gitName,
  gitEmail,
  isPrivate,
  withPrettier,
}: PkgJsonInfo) => `
{
  "name": "${packageName}",
  "version": "1.0.0",
  "main": "index.js",
  "author": "${gitName.trimEnd()} <${gitEmail.trimEnd()}>",
  "license": "MIT",
  "private": ${isPrivate},
  "scripts": {
    "build": "netlify-lambda build src",
    "ts-check": "tsc --noEmit --lib ES2015 ./src/*.ts"
  }${
    withPrettier
      ? `,
  "prettier": {
    "semi": false,
    "singleQuote": true
  }`
      : ''
  }
}

`
