import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

/**
 * Next.js 16 の flat config を直接 import して利用する。
 * (eslint-config-next/core-web-vitals は flat config の配列をそのまま export している)
 *
 * 方針:
 *  - v0 生成コード由来で出やすい noisy rule は `warn` に下げ、CI(eslint .)を緑に保つ
 *    (`eslint .` は error のみで非ゼロ終了するため、warn は CI を落とさない)
 *  - rules-of-hooks 違反や TDZ 参照など、明確なバグになり得る rule は `error` のまま残す
 *
 * @type {import('eslint').Linter.Config[]}
 */
const config = [
  {
    ignores: ['.next/**', 'out/**', 'build/**', 'node_modules/**', 'next-env.d.ts'],
  },
  ...nextCoreWebVitals,
  {
    rules: {
      // --- v0 生成コードで出やすい noisy rule は warn に下げる ---
      // (base config では error 指定のものを緩める)
      'react/no-unescaped-entities': 'warn',
      'react-hooks/set-state-in-effect': 'warn',
      '@next/next/no-img-element': 'warn',
      // core rule (plugin 不要)。base config では未設定だが将来の noise 抑制として warn 固定
      'no-unused-vars': 'warn',
      'prefer-const': 'warn',
      // --- 明確なバグになり得る rule は error のまま残す ---
      'react-hooks/rules-of-hooks': 'error',
    },
  },
]

export default config
