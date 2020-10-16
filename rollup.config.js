import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';
import node from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const name = require('./package.json').name;
const external = ['vue'];

export default [
  {
    input: 'src/index.ts',
    external,
    output: [
      {
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
    plugins: [commonjs(), node(), typescript({ target: 'es5' })],
  },
  {
    input: 'src/index.ts',
    external,
    output: [
      {
        dir: `dist`,
        sourcemap: true,
        format: 'esm',
      },
    ],
    plugins: [
      commonjs(),
      node(),
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
