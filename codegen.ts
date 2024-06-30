import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8080/query',
  documents: 'src/**/*.gql',
  generates: {
    'src/lib/gql/type.ts': {
      plugins: ['typescript'],
    },
    'src/lib/gql/': {
      preset: 'near-operation-file',
      plugins: [
        'typescript-operations',
        {
          'typescript-urql': {},
        },
      ],
      presetConfig: {
        baseTypesPath: 'type.ts',
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
