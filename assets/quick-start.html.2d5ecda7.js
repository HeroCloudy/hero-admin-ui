import{A as n}from"./app.a319b750.js";import{_ as s}from"./plugin-vue_export-helper.21dcd24c.js";const a={},e=n(`<h1 id="\u5FEB\u901F\u5F00\u59CB" tabindex="-1"><a class="header-anchor" href="#\u5FEB\u901F\u5F00\u59CB" aria-hidden="true">#</a> \u5FEB\u901F\u5F00\u59CB</h1><h2 id="\u5B89\u88C5" tabindex="-1"><a class="header-anchor" href="#\u5B89\u88C5" aria-hidden="true">#</a> \u5B89\u88C5</h2><p>\u7531\u4E8E hero-admin-ui \u662F\u4F9D\u8D56\u4E8E element-plus \u7684\uFF0C\u6240\u4EE5\u9700\u8981\u5206\u522B\u5B89\u88C5 element-plus \u548C hero-admin-ui</p><div class="language-bash ext-sh line-numbers-mode"><pre class="language-bash"><code><span class="token function">yarn</span> <span class="token function">add</span> element-plus
<span class="token function">yarn</span> <span class="token function">add</span> hero-admin-ui
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div><h2 id="\u5F15\u5165" tabindex="-1"><a class="header-anchor" href="#\u5F15\u5165" aria-hidden="true">#</a> \u5F15\u5165</h2><p>\u5728 <code>main.ts</code> \u6216 <code>main.js</code> \u4E2D\u5206\u522B\u5F15\u5165 <code>element-plus</code> \u548C <code>hero-admin-ui</code></p><div class="language-javascript ext-js line-numbers-mode"><pre class="language-javascript"><code><span class="token comment">// ...</span>

<span class="token keyword">import</span> ElementPlus <span class="token keyword">from</span> <span class="token string">&#39;element-plus&#39;</span>
<span class="token keyword">import</span> HeroAdminUi <span class="token keyword">from</span> <span class="token string">&#39;hero-admin-ui&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;element-plus/dist/index.css&#39;</span>
<span class="token keyword">import</span> <span class="token string">&#39;hero-admin-ui/dist/hero-admin-ui.css&#39;</span>

<span class="token comment">// ...</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token function">createApp</span><span class="token punctuation">(</span>App<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>ElementPlus<span class="token punctuation">)</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>HeroAdminUi<span class="token punctuation">)</span>

<span class="token comment">// ...</span>
</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br><span class="line-number">8</span><br><span class="line-number">9</span><br><span class="line-number">10</span><br><span class="line-number">11</span><br><span class="line-number">12</span><br><span class="line-number">13</span><br><span class="line-number">14</span><br></div></div>`,7);function p(c,t){return e}var l=s(a,[["render",p]]);export{l as default};
