import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8080/query',
  documents: 'src/**/*.gql',
  generates: {
    'src/lib/gql/type.generated.ts': {
      plugins: ['typescript'],
      config: {
        scalars: {
          ID: 'number',
          Timestamp: 'string',
        },
      },
    },
    'src/lib/gql/': {
      preset: 'near-operation-file',
      plugins: [
        'typescript-operations',
        {
          'typescript-urql': {},
        },
      ],
      config: {
        scalars: {
          ID: 'number',
          Timestamp: 'string',
        },
      },
      presetConfig: {
        baseTypesPath: 'type.generated.ts',
      },
    },
    './graphql.schema.json': {
      plugins: ['introspection'],
    },
  },
}

export default config
