const NETLIFY_DEPENDENCIES = [
  'netlify-lambda',
  '@babel/core',
  '@babel/preset-env',
  '@babel/preset-typescript',
  'typescript',
  '@types/aws-lambda',
]
const VERCEL_DEPENDENCIES: string[] = []

export { NETLIFY_DEPENDENCIES, VERCEL_DEPENDENCIES }
