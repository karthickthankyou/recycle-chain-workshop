import type { CodegenConfig } from '@graphql-codegen/cli'

const documentsPattern = '**/*.graphql'

const plugins = [
  'typescript',
  'typescript-operations',
  'named-operations-object',
  'typed-document-node',
]

const config: CodegenConfig = {
  overwrite: true,
  watch: true,
  schema: '../../apps/api/src/schema.gql',
  generates: {
    './src/gql/generated.tsx': {
      documents: `./src/${documentsPattern}`,
      plugins,
    },
    '../../standalone/mobile-apps/gql/generated.tsx': {
      documents: `../../standalone/mobile-apps/gql/${documentsPattern}`,
      plugins,
    },
  },
}

export default config
