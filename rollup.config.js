import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const name = require('./package.json').name;
const globals = 'vue';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        globals,
        file: `dist/${name}.js`,
        format: 'cjs',
        plugins: [
          replace({
            'process.env.NODE_ENV': `"development"`,
          }),
        ],
      },
      {
        name,
        globals,
        file: `dist/${name}.min.js`,
        format: 'iife',
        plugins: [
          replace({
            'process.env.NODE_ENV': `"production"`,
          }),
          terser(),
        ],
      },
    ],
    plugins: [typescript({ target: 'es5' })],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        dir: `dist`,
        globals,
        sourcemap: true,
        format: 'esm',
      },
    ],
    plugins: [
      typescript({
        declaration: true,
        declarationDir: 'dist/types',
      }),
      replace({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  },
];
