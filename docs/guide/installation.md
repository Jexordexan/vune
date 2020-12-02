# Installation

## NPM

Vune’s only peer dependency is Vue 3. If you are working with Vue 2, this is not the package for you.

```bash
npm install vune

# or

yarn add vune
```

## Browser

Vune can be used in the browser alongside a browser version of Vue 3.

Use this script tag in your `index.html`

<!-- I had to hardcode this because normal code blocks dont support interpolation -->
<div class="language-html">
<pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span> <span class="token attr-name">src</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">"</span>https://unpkg.com/vune@{{ $site.themeConfig.version }}/dist/vune.min.js<span class="token punctuation">"</span></span> <span class="token punctuation">/&gt;</span></span>
</code></pre></div>
