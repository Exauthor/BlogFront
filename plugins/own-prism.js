import Vue from 'vue'

Vue.prototype.$prism = function() {
  /* PrismJS 1.16.0
https://prismjs.com/download.html#themes=prism&languages=markup+css+clike+javascript+c+bash+docker+git+go+graphql+http+hpkp+hsts+json+nginx+sql+powershell+python+rust+plsql+pug+wasm&plugins=autolinker+toolbar+command-line+show-language+copy-to-clipboard */
  const _self =
    typeof window !== 'undefined'
      ? window
      : typeof WorkerGlobalScope !== 'undefined' &&
        self instanceof WorkerGlobalScope
      ? self
      : {}
  const Prism = (function(g) {
    const c = /\blang(?:uage)?-([\w-]+)\b/i
    let a = 0
    var C = {
      manual: g.Prism && g.Prism.manual,
      disableWorkerMessageHandler:
        g.Prism && g.Prism.disableWorkerMessageHandler,
      util: {
        encode(e) {
          return e instanceof M
            ? new M(e.type, C.util.encode(e.content), e.alias)
            : Array.isArray(e)
            ? e.map(C.util.encode)
            : e
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/\u00A0/g, ' ')
        },
        type(e) {
          return Object.prototype.toString.call(e).slice(8, -1)
        },
        objId(e) {
          return (
            e.__id || Object.defineProperty(e, '__id', { value: ++a }), e.__id
          )
        },
        clone: function n(e, t) {
          let r
          let a
          const i = C.util.type(e)
          switch (((t = t || {}), i)) {
            case 'Object':
              if (((a = C.util.objId(e)), t[a])) return t[a]
              for (const l in ((r = {}), (t[a] = r), e))
                e.hasOwnProperty(l) && (r[l] = n(e[l], t))
              return r
            case 'Array':
              return (
                (a = C.util.objId(e)),
                t[a]
                  ? t[a]
                  : ((r = []),
                    (t[a] = r),
                    e.forEach(function(e, a) {
                      r[a] = n(e, t)
                    }),
                    r)
              )
            default:
              return e
          }
        }
      },
      languages: {
        extend(e, a) {
          const n = C.util.clone(C.languages[e])
          for (const t in a) n[t] = a[t]
          return n
        },
        insertBefore(n, e, a, t) {
          const r = (t = t || C.languages)[n]
          const i = {}
          for (const l in r)
            if (r.hasOwnProperty(l)) {
              if (l == e)
                for (const o in a) a.hasOwnProperty(o) && (i[o] = a[o])
              a.hasOwnProperty(l) || (i[l] = r[l])
            }
          const s = t[n]
          return (
            (t[n] = i),
            C.languages.DFS(C.languages, function(e, a) {
              a === s && e != n && (this[e] = i)
            }),
            i
          )
        },
        DFS: function e(a, n, t, r) {
          r = r || {}
          const i = C.util.objId
          for (const l in a)
            if (a.hasOwnProperty(l)) {
              n.call(a, l, a[l], t || l)
              const o = a[l]
              const s = C.util.type(o)
              s !== 'Object' || r[i(o)]
                ? s !== 'Array' || r[i(o)] || ((r[i(o)] = !0), e(o, n, l, r))
                : ((r[i(o)] = !0), e(o, n, null, r))
            }
        }
      },
      plugins: {},
      highlightAll(e, a) {
        C.highlightAllUnder(document, e, a)
      },
      highlightAllUnder(e, a, n) {
        const t = {
          callback: n,
          selector:
            'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
        }
        C.hooks.run('before-highlightall', t)
        for (
          var r, i = t.elements || e.querySelectorAll(t.selector), l = 0;
          (r = i[l++]);

        )
          C.highlightElement(r, !0 === a, t.callback)
      },
      highlightElement(e, a, n) {
        for (var t, r = 'none', i = e; i && !c.test(i.className); )
          i = i.parentNode
        i &&
          ((r = (i.className.match(c) || [, 'none'])[1].toLowerCase()),
          (t = C.languages[r])),
          (e.className =
            e.className.replace(c, '').replace(/\s+/g, ' ') + ' language-' + r),
          e.parentNode &&
            ((i = e.parentNode),
            /pre/i.test(i.nodeName) &&
              (i.className =
                i.className.replace(c, '').replace(/\s+/g, ' ') +
                ' language-' +
                r))
        const l = { element: e, language: r, grammar: t, code: e.textContent }
        const o = function(e) {
          ;(l.highlightedCode = e),
            C.hooks.run('before-insert', l),
            (l.element.innerHTML = l.highlightedCode),
            C.hooks.run('after-highlight', l),
            C.hooks.run('complete', l),
            n && n.call(l.element)
        }
        if ((C.hooks.run('before-sanity-check', l), l.code))
          if ((C.hooks.run('before-highlight', l), l.grammar))
            if (a && g.Worker) {
              const s = new Worker(C.filename)
              ;(s.onmessage = function(e) {
                o(e.data)
              }),
                s.postMessage(
                  JSON.stringify({
                    language: l.language,
                    code: l.code,
                    immediateClose: !0
                  })
                )
            } else o(C.highlight(l.code, l.grammar, l.language))
          else o(C.util.encode(l.code))
        else C.hooks.run('complete', l)
      },
      highlight(e, a, n) {
        const t = { code: e, grammar: a, language: n }
        return (
          C.hooks.run('before-tokenize', t),
          (t.tokens = C.tokenize(t.code, t.grammar)),
          C.hooks.run('after-tokenize', t),
          M.stringify(C.util.encode(t.tokens), t.language)
        )
      },
      matchGrammar(e, a, n, t, r, i, l) {
        for (const o in n)
          if (n.hasOwnProperty(o) && n[o]) {
            if (o == l) return
            let s = n[o]
            s = C.util.type(s) === 'Array' ? s : [s]
            for (let g = 0; g < s.length; ++g) {
              let c = s[g]
              const u = c.inside
              const h = !!c.lookbehind
              const f = !!c.greedy
              let d = 0
              const m = c.alias
              if (f && !c.pattern.global) {
                const p = c.pattern.toString().match(/[imuy]*$/)[0]
                c.pattern = RegExp(c.pattern.source, p + 'g')
              }
              c = c.pattern || c
              for (let y = t, v = r; y < a.length; v += a[y].length, ++y) {
                let k = a[y]
                if (a.length > e.length) return
                if (!(k instanceof M)) {
                  if (f && y != a.length - 1) {
                    if (((c.lastIndex = v), !(x = c.exec(e)))) break
                    for (
                      var b = x.index + (h ? x[1].length : 0),
                        w = x.index + x[0].length,
                        A = y,
                        P = v,
                        O = a.length;
                      A < O && (P < w || (!a[A].type && !a[A - 1].greedy));
                      ++A
                    )
                      (P += a[A].length) <= b && (++y, (v = P))
                    if (a[y] instanceof M) continue
                    ;(N = A - y), (k = e.slice(v, P)), (x.index -= v)
                  } else {
                    c.lastIndex = 0
                    var x = c.exec(k)
                    var N = 1
                  }
                  if (x) {
                    h && (d = x[1] ? x[1].length : 0)
                    w = (b = x.index + d) + (x = x[0].slice(d)).length
                    const j = k.slice(0, b)
                    const S = k.slice(w)
                    const E = [y, N]
                    j && (++y, (v += j.length), E.push(j))
                    const _ = new M(o, u ? C.tokenize(x, u) : x, m, x, f)
                    if (
                      (E.push(_),
                      S && E.push(S),
                      Array.prototype.splice.apply(a, E),
                      N != 1 && C.matchGrammar(e, a, n, y, v, !0, o),
                      i)
                    )
                      break
                  } else if (i) break
                }
              }
            }
          }
      },
      tokenize(e, a) {
        const n = [e]
        const t = a.rest
        if (t) {
          for (const r in t) a[r] = t[r]
          delete a.rest
        }
        return C.matchGrammar(e, n, a, 0, 0, !1), n
      },
      hooks: {
        all: {},
        add(e, a) {
          const n = C.hooks.all
          ;(n[e] = n[e] || []), n[e].push(a)
        },
        run(e, a) {
          const n = C.hooks.all[e]
          if (n && n.length) for (var t, r = 0; (t = n[r++]); ) t(a)
        }
      },
      Token: M
    }
    function M(e, a, n, t, r) {
      ;(this.type = e),
        (this.content = a),
        (this.alias = n),
        (this.length = 0 | (t || '').length),
        (this.greedy = !!r)
    }
    if (
      ((g.Prism = C),
      (M.stringify = function(e, a) {
        if (typeof e === 'string') return e
        if (Array.isArray(e))
          return e
            .map(function(e) {
              return M.stringify(e, a)
            })
            .join('')
        const n = {
          type: e.type,
          content: M.stringify(e.content, a),
          tag: 'span',
          classes: ['token', e.type],
          attributes: {},
          language: a
        }
        if (e.alias) {
          const t = Array.isArray(e.alias) ? e.alias : [e.alias]
          Array.prototype.push.apply(n.classes, t)
        }
        C.hooks.run('wrap', n)
        const r = Object.keys(n.attributes)
          .map(function(e) {
            return (
              e + '="' + (n.attributes[e] || '').replace(/"/g, '&quot;') + '"'
            )
          })
          .join(' ')
        return (
          '<' +
          n.tag +
          ' class="' +
          n.classes.join(' ') +
          '"' +
          (r ? ' ' + r : '') +
          '>' +
          n.content +
          '</' +
          n.tag +
          '>'
        )
      }),
      !g.document)
    )
      return (
        g.addEventListener &&
          (C.disableWorkerMessageHandler ||
            g.addEventListener(
              'message',
              function(e) {
                const a = JSON.parse(e.data)
                const n = a.language
                const t = a.code
                const r = a.immediateClose
                g.postMessage(C.highlight(t, C.languages[n], n)), r && g.close()
              },
              !1
            )),
        C
      )
    const e =
      document.currentScript ||
      [].slice.call(document.getElementsByTagName('script')).pop()
    return (
      e &&
        ((C.filename = e.src),
        C.manual ||
          e.hasAttribute('data-manual') ||
          (document.readyState !== 'loading'
            ? window.requestAnimationFrame
              ? window.requestAnimationFrame(C.highlightAll)
              : window.setTimeout(C.highlightAll, 16)
            : document.addEventListener('DOMContentLoaded', C.highlightAll))),
      C
    )
  })(_self)
  typeof module !== 'undefined' && module.exports && (module.exports = Prism),
    typeof global !== 'undefined' && (global.Prism = Prism)
  ;(Prism.languages.markup = {
    comment: /<!--[\s\S]*?-->/,
    prolog: /<\?[\s\S]+?\?>/,
    doctype: /<!DOCTYPE[\s\S]+?>/i,
    cdata: /<!\[CDATA\[[\s\S]*?]]>/i,
    tag: {
      pattern: /<\/?(?!\d)[^\s>\/=$<%]+(?:\s(?:\s*[^\s>\/=]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+(?=[\s>]))|(?=[\s/>])))+)?\s*\/?>/i,
      greedy: !0,
      inside: {
        tag: {
          pattern: /^<\/?[^\s>\/]+/i,
          inside: { punctuation: /^<\/?/, namespace: /^[^\s>\/:]+:/ }
        },
        'attr-value': {
          pattern: /=\s*(?:"[^"]*"|'[^']*'|[^\s'">=]+)/i,
          inside: {
            punctuation: [/^=/, { pattern: /^(\s*)["']|["']$/, lookbehind: !0 }]
          }
        },
        punctuation: /\/?>/,
        'attr-name': {
          pattern: /[^\s>\/]+/,
          inside: { namespace: /^[^\s>\/:]+:/ }
        }
      }
    },
    entity: /&#?[\da-z]{1,8};/i
  }),
    (Prism.languages.markup.tag.inside['attr-value'].inside.entity =
      Prism.languages.markup.entity),
    Prism.hooks.add('wrap', function(a) {
      a.type === 'entity' &&
        (a.attributes.title = a.content.replace(/&amp;/, '&'))
    }),
    Object.defineProperty(Prism.languages.markup.tag, 'addInlined', {
      value(a, e) {
        const s = {}
        ;(s['language-' + e] = {
          pattern: /(^<!\[CDATA\[)[\s\S]+?(?=\]\]>$)/i,
          lookbehind: !0,
          inside: Prism.languages[e]
        }),
          (s.cdata = /^<!\[CDATA\[|\]\]>$/i)
        const n = {
          'included-cdata': { pattern: /<!\[CDATA\[[\s\S]*?\]\]>/i, inside: s }
        }
        n['language-' + e] = { pattern: /[\s\S]+/, inside: Prism.languages[e] }
        const i = {}
        ;(i[a] = {
          pattern: RegExp(
            '(<__[\\s\\S]*?>)(?:<!\\[CDATA\\[[\\s\\S]*?\\]\\]>\\s*|[\\s\\S])*?(?=<\\/__>)'.replace(
              /__/g,
              a
            ),
            'i'
          ),
          lookbehind: !0,
          greedy: !0,
          inside: n
        }),
          Prism.languages.insertBefore('markup', 'cdata', i)
      }
    }),
    (Prism.languages.xml = Prism.languages.extend('markup', {})),
    (Prism.languages.html = Prism.languages.markup),
    (Prism.languages.mathml = Prism.languages.markup),
    (Prism.languages.svg = Prism.languages.markup)
  !(function(s) {
    const t = /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/
    ;(s.languages.css = {
      comment: /\/\*[\s\S]*?\*\//,
      atrule: {
        pattern: /@[\w-]+[\s\S]*?(?:;|(?=\s*\{))/,
        inside: { rule: /@[\w-]+/ }
      },
      url: {
        pattern: RegExp('url\\((?:' + t.source + '|[^\n\r()]*)\\)', 'i'),
        inside: { function: /^url/i, punctuation: /^\(|\)$/ }
      },
      selector: RegExp('[^{}\\s](?:[^{};"\']|' + t.source + ')*?(?=\\s*\\{)'),
      string: { pattern: t, greedy: !0 },
      property: /[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,
      important: /!important\b/i,
      function: /[-a-z0-9]+(?=\()/i,
      punctuation: /[(){};:,]/
    }),
      (s.languages.css.atrule.inside.rest = s.languages.css)
    const e = s.languages.markup
    e &&
      (e.tag.addInlined('style', 'css'),
      s.languages.insertBefore(
        'inside',
        'attr-value',
        {
          'style-attr': {
            pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
            inside: {
              'attr-name': { pattern: /^\s*style/i, inside: e.tag.inside },
              punctuation: /^\s*=\s*['"]|['"]\s*$/,
              'attr-value': { pattern: /.+/i, inside: s.languages.css }
            },
            alias: 'language-css'
          }
        },
        e.tag
      ))
  })(Prism)
  Prism.languages.clike = {
    comment: [
      { pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/, lookbehind: !0 },
      { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0, greedy: !0 }
    ],
    string: {
      pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
      greedy: !0
    },
    'class-name': {
      pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
      lookbehind: !0,
      inside: { punctuation: /[.\\]/ }
    },
    keyword: /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
    boolean: /\b(?:true|false)\b/,
    function: /\w+(?=\()/,
    number: /\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,
    operator: /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
    punctuation: /[{}[\];(),.:]/
  }
  ;(Prism.languages.javascript = Prism.languages.extend('clike', {
    'class-name': [
      Prism.languages.clike['class-name'],
      {
        pattern: /(^|[^$\w\xA0-\uFFFF])[_$A-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\.(?:prototype|constructor))/,
        lookbehind: !0
      }
    ],
    keyword: [
      { pattern: /((?:^|})\s*)(?:catch|finally)\b/, lookbehind: !0 },
      {
        pattern: /(^|[^.])\b(?:as|async(?=\s*(?:function\b|\(|[$\w\xA0-\uFFFF]|$))|await|break|case|class|const|continue|debugger|default|delete|do|else|enum|export|extends|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)\b/,
        lookbehind: !0
      }
    ],
    number: /\b(?:(?:0[xX](?:[\dA-Fa-f](?:_[\dA-Fa-f])?)+|0[bB](?:[01](?:_[01])?)+|0[oO](?:[0-7](?:_[0-7])?)+)n?|(?:\d(?:_\d)?)+n|NaN|Infinity)\b|(?:\b(?:\d(?:_\d)?)+\.?(?:\d(?:_\d)?)*|\B\.(?:\d(?:_\d)?)+)(?:[Ee][+-]?(?:\d(?:_\d)?)+)?/,
    function: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*(?:\.\s*(?:apply|bind|call)\s*)?\()/,
    operator: /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
  })),
    (Prism.languages.javascript[
      'class-name'
    ][0].pattern = /(\b(?:class|interface|extends|implements|instanceof|new)\s+)[\w.\\]+/),
    Prism.languages.insertBefore('javascript', 'keyword', {
      regex: {
        pattern: /((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[(?:[^\]\\\r\n]|\\.)*]|\\.|[^/\\\[\r\n])+\/[gimyus]{0,6}(?=\s*($|[\r\n,.;})\]]))/,
        lookbehind: !0,
        greedy: !0
      },
      'function-variable': {
        pattern: /[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*[=:]\s*(?:async\s*)?(?:\bfunction\b|(?:\((?:[^()]|\([^()]*\))*\)|[_$a-zA-Z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/,
        alias: 'function'
      },
      parameter: [
        {
          pattern: /(function(?:\s+[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)?\s*\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\))/,
          lookbehind: !0,
          inside: Prism.languages.javascript
        },
        {
          pattern: /[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=>)/i,
          inside: Prism.languages.javascript
        },
        {
          pattern: /(\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*=>)/,
          lookbehind: !0,
          inside: Prism.languages.javascript
        },
        {
          pattern: /((?:\b|\s|^)(?!(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|undefined|var|void|while|with|yield)(?![$\w\xA0-\uFFFF]))(?:[_$A-Za-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*\s*)\(\s*)(?!\s)(?:[^()]|\([^()]*\))+?(?=\s*\)\s*\{)/,
          lookbehind: !0,
          inside: Prism.languages.javascript
        }
      ],
      constant: /\b[A-Z](?:[A-Z_]|\dx?)*\b/
    }),
    Prism.languages.insertBefore('javascript', 'string', {
      'template-string': {
        pattern: /`(?:\\[\s\S]|\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}|[^\\`])*`/,
        greedy: !0,
        inside: {
          interpolation: {
            pattern: /\${(?:[^{}]|{(?:[^{}]|{[^}]*})*})+}/,
            inside: {
              'interpolation-punctuation': {
                pattern: /^\${|}$/,
                alias: 'punctuation'
              },
              rest: Prism.languages.javascript
            }
          },
          string: /[\s\S]+/
        }
      }
    }),
    Prism.languages.markup &&
      Prism.languages.markup.tag.addInlined('script', 'javascript'),
    (Prism.languages.js = Prism.languages.javascript)
  ;(Prism.languages.c = Prism.languages.extend('clike', {
    'class-name': { pattern: /(\b(?:enum|struct)\s+)\w+/, lookbehind: !0 },
    keyword: /\b(?:_Alignas|_Alignof|_Atomic|_Bool|_Complex|_Generic|_Imaginary|_Noreturn|_Static_assert|_Thread_local|asm|typeof|inline|auto|break|case|char|const|continue|default|do|double|else|enum|extern|float|for|goto|if|int|long|register|return|short|signed|sizeof|static|struct|switch|typedef|union|unsigned|void|volatile|while)\b/,
    operator: />>=?|<<=?|->|([-+&|:])\1|[?:~]|[-+*/%&|^!=<>]=?/,
    number: /(?:\b0x(?:[\da-f]+\.?[\da-f]*|\.[\da-f]+)(?:p[+-]?\d+)?|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?)[ful]*/i
  })),
    Prism.languages.insertBefore('c', 'string', {
      macro: {
        pattern: /(^\s*)#\s*[a-z]+(?:[^\r\n\\]|\\(?:\r\n|[\s\S]))*/im,
        lookbehind: !0,
        alias: 'property',
        inside: {
          string: {
            pattern: /(#\s*include\s*)(?:<.+?>|("|')(?:\\?.)+?\2)/,
            lookbehind: !0
          },
          directive: {
            pattern: /(#\s*)\b(?:define|defined|elif|else|endif|error|ifdef|ifndef|if|import|include|line|pragma|undef|using)\b/,
            lookbehind: !0,
            alias: 'keyword'
          }
        }
      },
      constant: /\b(?:__FILE__|__LINE__|__DATE__|__TIME__|__TIMESTAMP__|__func__|EOF|NULL|SEEK_CUR|SEEK_END|SEEK_SET|stdin|stdout|stderr)\b/
    }),
    delete Prism.languages.c.boolean
  !(function(e) {
    const t =
      '\\b(?:BASH|BASHOPTS|BASH_ALIASES|BASH_ARGC|BASH_ARGV|BASH_CMDS|BASH_COMPLETION_COMPAT_DIR|BASH_LINENO|BASH_REMATCH|BASH_SOURCE|BASH_VERSINFO|BASH_VERSION|COLORTERM|COLUMNS|COMP_WORDBREAKS|DBUS_SESSION_BUS_ADDRESS|DEFAULTS_PATH|DESKTOP_SESSION|DIRSTACK|DISPLAY|EUID|GDMSESSION|GDM_LANG|GNOME_KEYRING_CONTROL|GNOME_KEYRING_PID|GPG_AGENT_INFO|GROUPS|HISTCONTROL|HISTFILE|HISTFILESIZE|HISTSIZE|HOME|HOSTNAME|HOSTTYPE|IFS|INSTANCE|JOB|LANG|LANGUAGE|LC_ADDRESS|LC_ALL|LC_IDENTIFICATION|LC_MEASUREMENT|LC_MONETARY|LC_NAME|LC_NUMERIC|LC_PAPER|LC_TELEPHONE|LC_TIME|LESSCLOSE|LESSOPEN|LINES|LOGNAME|LS_COLORS|MACHTYPE|MAILCHECK|MANDATORY_PATH|NO_AT_BRIDGE|OLDPWD|OPTERR|OPTIND|ORBIT_SOCKETDIR|OSTYPE|PAPERSIZE|PATH|PIPESTATUS|PPID|PS1|PS2|PS3|PS4|PWD|RANDOM|REPLY|SECONDS|SELINUX_INIT|SESSION|SESSIONTYPE|SESSION_MANAGER|SHELL|SHELLOPTS|SHLVL|SSH_AUTH_SOCK|TERM|UID|UPSTART_EVENTS|UPSTART_INSTANCE|UPSTART_JOB|UPSTART_SESSION|USER|WINDOWID|XAUTHORITY|XDG_CONFIG_DIRS|XDG_CURRENT_DESKTOP|XDG_DATA_DIRS|XDG_GREETER_DATA_DIR|XDG_MENU_PREFIX|XDG_RUNTIME_DIR|XDG_SEAT|XDG_SEAT_PATH|XDG_SESSION_DESKTOP|XDG_SESSION_ID|XDG_SESSION_PATH|XDG_SESSION_TYPE|XDG_VTNR|XMODIFIERS)\\b'
    const n = {
      environment: { pattern: RegExp('\\$' + t), alias: 'constant' },
      variable: [
        {
          pattern: /\$?\(\([\s\S]+?\)\)/,
          greedy: !0,
          inside: {
            variable: [
              { pattern: /(^\$\(\([\s\S]+)\)\)/, lookbehind: !0 },
              /^\$\(\(/
            ],
            number: /\b0x[\dA-Fa-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee]-?\d+)?/,
            operator: /--?|-=|\+\+?|\+=|!=?|~|\*\*?|\*=|\/=?|%=?|<<=?|>>=?|<=?|>=?|==?|&&?|&=|\^=?|\|\|?|\|=|\?|:/,
            punctuation: /\(\(?|\)\)?|,|;/
          }
        },
        {
          pattern: /\$\((?:\([^)]+\)|[^()])+\)|`[^`]+`/,
          greedy: !0,
          inside: { variable: /^\$\(|^`|\)$|`$/ }
        },
        {
          pattern: /\$\{[^}]+\}/,
          greedy: !0,
          inside: {
            operator: /:[-=?+]?|[!\/]|##?|%%?|\^\^?|,,?/,
            punctuation: /[\[\]]/,
            environment: {
              pattern: RegExp('(\\{)' + t),
              lookbehind: !0,
              alias: 'constant'
            }
          }
        },
        /\$(?:\w+|[#?*!@$])/
      ],
      entity: /\\(?:[abceEfnrtv\\"]|O?[0-7]{1,3}|x[0-9a-fA-F]{1,2}|u[0-9a-fA-F]{4}|U[0-9a-fA-F]{8})/
    }
    e.languages.bash = {
      shebang: { pattern: /^#!\s*\/.*/, alias: 'important' },
      comment: { pattern: /(^|[^"{\\$])#.*/, lookbehind: !0 },
      'function-name': [
        {
          pattern: /(\bfunction\s+)\w+(?=(?:\s*\(?:\s*\))?\s*\{)/,
          lookbehind: !0,
          alias: 'function'
        },
        { pattern: /\b\w+(?=\s*\(\s*\)\s*\{)/, alias: 'function' }
      ],
      'for-or-select': {
        pattern: /(\b(?:for|select)\s+)\w+(?=\s+in\s)/,
        alias: 'variable',
        lookbehind: !0
      },
      'assign-left': {
        pattern: /(^|[\s;|&]|[<>]\()\w+(?=\+?=)/,
        inside: {
          environment: {
            pattern: RegExp('(^|[\\s;|&]|[<>]\\()' + t),
            lookbehind: !0,
            alias: 'constant'
          }
        },
        alias: 'variable',
        lookbehind: !0
      },
      string: [
        {
          pattern: /((?:^|[^<])<<-?\s*)(\w+?)\s*(?:\r?\n|\r)(?:[\s\S])*?(?:\r?\n|\r)\2/,
          lookbehind: !0,
          greedy: !0,
          inside: n
        },
        {
          pattern: /((?:^|[^<])<<-?\s*)(["'])(\w+)\2\s*(?:\r?\n|\r)(?:[\s\S])*?(?:\r?\n|\r)\3/,
          lookbehind: !0,
          greedy: !0
        },
        {
          pattern: /(["'])(?:\\[\s\S]|\$\([^)]+\)|`[^`]+`|(?!\1)[^\\])*\1/,
          greedy: !0,
          inside: n
        }
      ],
      environment: { pattern: RegExp('\\$?' + t), alias: 'constant' },
      variable: n.variable,
      function: {
        pattern: /(^|[\s;|&]|[<>]\()(?:add|apropos|apt|aptitude|apt-cache|apt-get|aspell|automysqlbackup|awk|basename|bash|bc|bconsole|bg|bzip2|cal|cat|cfdisk|chgrp|chkconfig|chmod|chown|chroot|cksum|clear|cmp|column|comm|cp|cron|crontab|csplit|curl|cut|date|dc|dd|ddrescue|debootstrap|df|diff|diff3|dig|dir|dircolors|dirname|dirs|dmesg|du|egrep|eject|env|ethtool|expand|expect|expr|fdformat|fdisk|fg|fgrep|file|find|fmt|fold|format|free|fsck|ftp|fuser|gawk|git|gparted|grep|groupadd|groupdel|groupmod|groups|grub-mkconfig|gzip|halt|head|hg|history|host|hostname|htop|iconv|id|ifconfig|ifdown|ifup|import|install|ip|jobs|join|kill|killall|less|link|ln|locate|logname|logrotate|look|lpc|lpr|lprint|lprintd|lprintq|lprm|ls|lsof|lynx|make|man|mc|mdadm|mkconfig|mkdir|mke2fs|mkfifo|mkfs|mkisofs|mknod|mkswap|mmv|more|most|mount|mtools|mtr|mutt|mv|nano|nc|netstat|nice|nl|nohup|notify-send|npm|nslookup|op|open|parted|passwd|paste|pathchk|ping|pkill|pnpm|popd|pr|printcap|printenv|ps|pushd|pv|quota|quotacheck|quotactl|ram|rar|rcp|reboot|remsync|rename|renice|rev|rm|rmdir|rpm|rsync|scp|screen|sdiff|sed|sendmail|seq|service|sftp|sh|shellcheck|shuf|shutdown|sleep|slocate|sort|split|ssh|stat|strace|su|sudo|sum|suspend|swapon|sync|tac|tail|tar|tee|time|timeout|top|touch|tr|traceroute|tsort|tty|umount|uname|unexpand|uniq|units|unrar|unshar|unzip|update-grub|uptime|useradd|userdel|usermod|users|uudecode|uuencode|v|vdir|vi|vim|virsh|vmstat|wait|watch|wc|wget|whereis|which|who|whoami|write|xargs|xdg-open|yarn|yes|zenity|zip|zsh|zypper)(?=$|[)\s;|&])/,
        lookbehind: !0
      },
      keyword: {
        pattern: /(^|[\s;|&]|[<>]\()(?:if|then|else|elif|fi|for|while|in|case|esac|function|select|do|done|until)(?=$|[)\s;|&])/,
        lookbehind: !0
      },
      builtin: {
        pattern: /(^|[\s;|&]|[<>]\()(?:\.|:|break|cd|continue|eval|exec|exit|export|getopts|hash|pwd|readonly|return|shift|test|times|trap|umask|unset|alias|bind|builtin|caller|command|declare|echo|enable|help|let|local|logout|mapfile|printf|read|readarray|source|type|typeset|ulimit|unalias|set|shopt)(?=$|[)\s;|&])/,
        lookbehind: !0,
        alias: 'class-name'
      },
      boolean: {
        pattern: /(^|[\s;|&]|[<>]\()(?:true|false)(?=$|[)\s;|&])/,
        lookbehind: !0
      },
      'file-descriptor': { pattern: /\B&\d\b/, alias: 'important' },
      operator: {
        pattern: /\d?<>|>\||\+=|==?|!=?|=~|<<[<-]?|[&\d]?>>|\d?[<>]&?|&[>&]?|\|[&|]?|<=?|>=?/,
        inside: { 'file-descriptor': { pattern: /^\d/, alias: 'important' } }
      },
      punctuation: /\$?\(\(?|\)\)?|\.\.|[{}[\];\\]/,
      number: { pattern: /(^|\s)(?:[1-9]\d*|0)(?:[.,]\d+)?\b/, lookbehind: !0 }
    }
    for (
      let a = [
          'comment',
          'function-name',
          'for-or-select',
          'assign-left',
          'string',
          'environment',
          'function',
          'keyword',
          'builtin',
          'boolean',
          'file-descriptor',
          'operator',
          'punctuation',
          'number'
        ],
        r = n.variable[1].inside,
        s = 0;
      s < a.length;
      s++
    )
      r[a[s]] = e.languages.bash[a[s]]
    e.languages.shell = e.languages.bash
  })(Prism)
  ;(Prism.languages.docker = {
    keyword: {
      pattern: /(^\s*)(?:ADD|ARG|CMD|COPY|ENTRYPOINT|ENV|EXPOSE|FROM|HEALTHCHECK|LABEL|MAINTAINER|ONBUILD|RUN|SHELL|STOPSIGNAL|USER|VOLUME|WORKDIR)(?=\s)/im,
      lookbehind: !0
    },
    string: /("|')(?:(?!\1)[^\\\r\n]|\\(?:\r\n|[\s\S]))*\1/,
    comment: /#.*/,
    punctuation: /---|\.\.\.|[:[\]{}\-,|>?]/
  }),
    (Prism.languages.dockerfile = Prism.languages.docker)
  Prism.languages.git = {
    comment: /^#.*/m,
    deleted: /^[-–].*/m,
    inserted: /^\+.*/m,
    string: /("|')(?:\\.|(?!\1)[^\\\r\n])*\1/m,
    command: { pattern: /^.*\$ git .*$/m, inside: { parameter: /\s--?\w+/m } },
    coord: /^@@.*@@$/m,
    commit_sha1: /^commit \w{40}$/m
  }
  ;(Prism.languages.go = Prism.languages.extend('clike', {
    keyword: /\b(?:break|case|chan|const|continue|default|defer|else|fallthrough|for|func|go(?:to)?|if|import|interface|map|package|range|return|select|struct|switch|type|var)\b/,
    builtin: /\b(?:bool|byte|complex(?:64|128)|error|float(?:32|64)|rune|string|u?int(?:8|16|32|64)?|uintptr|append|cap|close|complex|copy|delete|imag|len|make|new|panic|print(?:ln)?|real|recover)\b/,
    boolean: /\b(?:_|iota|nil|true|false)\b/,
    operator: /[*\/%^!=]=?|\+[=+]?|-[=-]?|\|[=|]?|&(?:=|&|\^=?)?|>(?:>=?|=)?|<(?:<=?|=|-)?|:=|\.\.\./,
    number: /(?:\b0x[a-f\d]+|(?:\b\d+\.?\d*|\B\.\d+)(?:e[-+]?\d+)?)i?/i,
    string: { pattern: /(["'`])(\\[\s\S]|(?!\1)[^\\])*\1/, greedy: !0 }
  })),
    delete Prism.languages.go['class-name']
  Prism.languages.graphql = {
    comment: /#.*/,
    string: { pattern: /"(?:\\.|[^\\"\r\n])*"/, greedy: !0 },
    number: /(?:\B-|\b)\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
    boolean: /\b(?:true|false)\b/,
    variable: /\$[a-z_]\w*/i,
    directive: { pattern: /@[a-z_]\w*/i, alias: 'function' },
    'attr-name': {
      pattern: /[a-z_]\w*(?=\s*(?:\((?:[^()"]|"(?:\\.|[^\\"\r\n])*")*\))?:)/i,
      greedy: !0
    },
    'class-name': {
      pattern: /(\b(?:enum|implements|interface|on|scalar|type|union)\s+)[a-zA-Z_]\w*/,
      lookbehind: !0
    },
    fragment: {
      pattern: /(\bfragment\s+|\.{3}\s*(?!on\b))[a-zA-Z_]\w*/,
      lookbehind: !0,
      alias: 'function'
    },
    keyword: /\b(?:enum|fragment|implements|input|interface|mutation|on|query|scalar|schema|type|union)\b/,
    operator: /[!=|]|\.{3}/,
    punctuation: /[!(){}\[\]:=,]/,
    constant: /\b(?!ID\b)[A-Z][A-Z_\d]*\b/
  }
  !(function(t) {
    t.languages.http = {
      'request-line': {
        pattern: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\s(?:https?:\/\/|\/)\S+\sHTTP\/[0-9.]+/m,
        inside: {
          property: /^(?:POST|GET|PUT|DELETE|OPTIONS|PATCH|TRACE|CONNECT)\b/,
          'attr-name': /:\w+/
        }
      },
      'response-status': {
        pattern: /^HTTP\/1.[01] \d+.*/m,
        inside: {
          property: { pattern: /(^HTTP\/1.[01] )\d+.*/i, lookbehind: !0 }
        }
      },
      'header-name': { pattern: /^[\w-]+:(?=.)/m, alias: 'keyword' }
    }
    let a
    let e
    let n
    const i = t.languages
    const s = {
      'application/javascript': i.javascript,
      'application/json': i.json || i.javascript,
      'application/xml': i.xml,
      'text/xml': i.xml,
      'text/html': i.html,
      'text/css': i.css
    }
    const p = { 'application/json': !0, 'application/xml': !0 }
    for (const r in s)
      if (s[r]) {
        a = a || {}
        const T = p[r]
          ? (void 0,
            (n = (e = r).replace(/^[a-z]+\//, '')),
            '(?:' + e + '|\\w+/(?:[\\w.-]+\\+)+' + n + '(?![+\\w.-]))')
          : r
        a[r] = {
          pattern: RegExp(
            '(content-type:\\s*' + T + '[\\s\\S]*?)(?:\\r?\\n|\\r){2}[\\s\\S]*',
            'i'
          ),
          lookbehind: !0,
          inside: { rest: s[r] }
        }
      }
    a && t.languages.insertBefore('http', 'header-name', a)
  })(Prism)
  Prism.languages.hpkp = {
    directive: {
      pattern: /\b(?:(?:includeSubDomains|preload|strict)(?: |;)|pin-sha256="[a-zA-Z\d+=/]+"|(?:max-age|report-uri)=|report-to )/,
      alias: 'keyword'
    },
    safe: { pattern: /\d{7,}/, alias: 'selector' },
    unsafe: { pattern: /\d{1,6}/, alias: 'function' }
  }
  Prism.languages.hsts = {
    directive: {
      pattern: /\b(?:max-age=|includeSubDomains|preload)/,
      alias: 'keyword'
    },
    safe: { pattern: /\d{8,}/, alias: 'selector' },
    unsafe: { pattern: /\d{1,7}/, alias: 'function' }
  }
  Prism.languages.json = {
    property: { pattern: /"(?:\\.|[^\\"\r\n])*"(?=\s*:)/, greedy: !0 },
    string: { pattern: /"(?:\\.|[^\\"\r\n])*"(?!\s*:)/, greedy: !0 },
    comment: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
    number: /-?\d+\.?\d*(e[+-]?\d+)?/i,
    punctuation: /[{}[\],]/,
    operator: /:/,
    boolean: /\b(?:true|false)\b/,
    null: { pattern: /\bnull\b/, alias: 'keyword' }
  }
  ;(Prism.languages.nginx = Prism.languages.extend('clike', {
    comment: { pattern: /(^|[^"{\\])#.*/, lookbehind: !0 },
    keyword: /\b(?:CONTENT_|DOCUMENT_|GATEWAY_|HTTP_|HTTPS|if_not_empty|PATH_|QUERY_|REDIRECT_|REMOTE_|REQUEST_|SCGI|SCRIPT_|SERVER_|http|events|accept_mutex|accept_mutex_delay|access_log|add_after_body|add_before_body|add_header|addition_types|aio|alias|allow|ancient_browser|ancient_browser_value|auth|auth_basic|auth_basic_user_file|auth_http|auth_http_header|auth_http_timeout|autoindex|autoindex_exact_size|autoindex_localtime|break|charset|charset_map|charset_types|chunked_transfer_encoding|client_body_buffer_size|client_body_in_file_only|client_body_in_single_buffer|client_body_temp_path|client_body_timeout|client_header_buffer_size|client_header_timeout|client_max_body_size|connection_pool_size|create_full_put_path|daemon|dav_access|dav_methods|debug_connection|debug_points|default_type|deny|devpoll_changes|devpoll_events|directio|directio_alignment|disable_symlinks|empty_gif|env|epoll_events|error_log|error_page|expires|fastcgi_buffer_size|fastcgi_buffers|fastcgi_busy_buffers_size|fastcgi_cache|fastcgi_cache_bypass|fastcgi_cache_key|fastcgi_cache_lock|fastcgi_cache_lock_timeout|fastcgi_cache_methods|fastcgi_cache_min_uses|fastcgi_cache_path|fastcgi_cache_purge|fastcgi_cache_use_stale|fastcgi_cache_valid|fastcgi_connect_timeout|fastcgi_hide_header|fastcgi_ignore_client_abort|fastcgi_ignore_headers|fastcgi_index|fastcgi_intercept_errors|fastcgi_keep_conn|fastcgi_max_temp_file_size|fastcgi_next_upstream|fastcgi_no_cache|fastcgi_param|fastcgi_pass|fastcgi_pass_header|fastcgi_read_timeout|fastcgi_redirect_errors|fastcgi_send_timeout|fastcgi_split_path_info|fastcgi_store|fastcgi_store_access|fastcgi_temp_file_write_size|fastcgi_temp_path|flv|geo|geoip_city|geoip_country|google_perftools_profiles|gzip|gzip_buffers|gzip_comp_level|gzip_disable|gzip_http_version|gzip_min_length|gzip_proxied|gzip_static|gzip_types|gzip_vary|if|if_modified_since|ignore_invalid_headers|image_filter|image_filter_buffer|image_filter_jpeg_quality|image_filter_sharpen|image_filter_transparency|imap_capabilities|imap_client_buffer|include|index|internal|ip_hash|keepalive|keepalive_disable|keepalive_requests|keepalive_timeout|kqueue_changes|kqueue_events|large_client_header_buffers|limit_conn|limit_conn_log_level|limit_conn_zone|limit_except|limit_rate|limit_rate_after|limit_req|limit_req_log_level|limit_req_zone|limit_zone|lingering_close|lingering_time|lingering_timeout|listen|location|lock_file|log_format|log_format_combined|log_not_found|log_subrequest|map|map_hash_bucket_size|map_hash_max_size|master_process|max_ranges|memcached_buffer_size|memcached_connect_timeout|memcached_next_upstream|memcached_pass|memcached_read_timeout|memcached_send_timeout|merge_slashes|min_delete_depth|modern_browser|modern_browser_value|mp4|mp4_buffer_size|mp4_max_buffer_size|msie_padding|msie_refresh|multi_accept|open_file_cache|open_file_cache_errors|open_file_cache_min_uses|open_file_cache_valid|open_log_file_cache|optimize_server_names|override_charset|pcre_jit|perl|perl_modules|perl_require|perl_set|pid|pop3_auth|pop3_capabilities|port_in_redirect|post_action|postpone_output|protocol|proxy|proxy_buffer|proxy_buffer_size|proxy_buffering|proxy_buffers|proxy_busy_buffers_size|proxy_cache|proxy_cache_bypass|proxy_cache_key|proxy_cache_lock|proxy_cache_lock_timeout|proxy_cache_methods|proxy_cache_min_uses|proxy_cache_path|proxy_cache_use_stale|proxy_cache_valid|proxy_connect_timeout|proxy_cookie_domain|proxy_cookie_path|proxy_headers_hash_bucket_size|proxy_headers_hash_max_size|proxy_hide_header|proxy_http_version|proxy_ignore_client_abort|proxy_ignore_headers|proxy_intercept_errors|proxy_max_temp_file_size|proxy_method|proxy_next_upstream|proxy_no_cache|proxy_pass|proxy_pass_error_message|proxy_pass_header|proxy_pass_request_body|proxy_pass_request_headers|proxy_read_timeout|proxy_redirect|proxy_redirect_errors|proxy_send_lowat|proxy_send_timeout|proxy_set_body|proxy_set_header|proxy_ssl_session_reuse|proxy_store|proxy_store_access|proxy_temp_file_write_size|proxy_temp_path|proxy_timeout|proxy_upstream_fail_timeout|proxy_upstream_max_fails|random_index|read_ahead|real_ip_header|recursive_error_pages|request_pool_size|reset_timedout_connection|resolver|resolver_timeout|return|rewrite|root|rtsig_overflow_events|rtsig_overflow_test|rtsig_overflow_threshold|rtsig_signo|satisfy|satisfy_any|secure_link_secret|send_lowat|send_timeout|sendfile|sendfile_max_chunk|server|server_name|server_name_in_redirect|server_names_hash_bucket_size|server_names_hash_max_size|server_tokens|set|set_real_ip_from|smtp_auth|smtp_capabilities|so_keepalive|source_charset|split_clients|ssi|ssi_silent_errors|ssi_types|ssi_value_length|ssl|ssl_certificate|ssl_certificate_key|ssl_ciphers|ssl_client_certificate|ssl_crl|ssl_dhparam|ssl_engine|ssl_prefer_server_ciphers|ssl_protocols|ssl_session_cache|ssl_session_timeout|ssl_verify_client|ssl_verify_depth|starttls|stub_status|sub_filter|sub_filter_once|sub_filter_types|tcp_nodelay|tcp_nopush|timeout|timer_resolution|try_files|types|types_hash_bucket_size|types_hash_max_size|underscores_in_headers|uninitialized_variable_warn|upstream|use|user|userid|userid_domain|userid_expires|userid_name|userid_p3p|userid_path|userid_service|valid_referers|variables_hash_bucket_size|variables_hash_max_size|worker_connections|worker_cpu_affinity|worker_priority|worker_processes|worker_rlimit_core|worker_rlimit_nofile|worker_rlimit_sigpending|working_directory|xclient|xml_entities|xslt_entities|xslt_stylesheet|xslt_types|ssl_session_tickets|ssl_stapling|ssl_stapling_verify|ssl_ecdh_curve|ssl_trusted_certificate|more_set_headers|ssl_early_data)\b/i
  })),
    Prism.languages.insertBefore('nginx', 'keyword', { variable: /\$[a-z_]+/i })
  Prism.languages.sql = {
    comment: {
      pattern: /(^|[^\\])(?:\/\*[\s\S]*?\*\/|(?:--|\/\/|#).*)/,
      lookbehind: !0
    },
    variable: [
      { pattern: /@(["'`])(?:\\[\s\S]|(?!\1)[^\\])+\1/, greedy: !0 },
      /@[\w.$]+/
    ],
    string: {
      pattern: /(^|[^@\\])("|')(?:\\[\s\S]|(?!\2)[^\\]|\2\2)*\2/,
      greedy: !0,
      lookbehind: !0
    },
    function: /\b(?:AVG|COUNT|FIRST|FORMAT|LAST|LCASE|LEN|MAX|MID|MIN|MOD|NOW|ROUND|SUM|UCASE)(?=\s*\()/i,
    keyword: /\b(?:ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)\b/i,
    boolean: /\b(?:TRUE|FALSE|NULL)\b/i,
    number: /\b0x[\da-f]+\b|\b\d+\.?\d*|\B\.\d+\b/i,
    operator: /[-+*\/=%^~]|&&?|\|\|?|!=?|<(?:=>?|<|>)?|>[>=]?|\b(?:AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)\b/i,
    punctuation: /[;[\]()`,.]/
  }
  !(function(e) {
    const t = (Prism.languages.powershell = {
      comment: [
        { pattern: /(^|[^`])<#[\s\S]*?#>/, lookbehind: !0 },
        { pattern: /(^|[^`])#.*/, lookbehind: !0 }
      ],
      string: [
        {
          pattern: /"(?:`[\s\S]|[^`"])*"/,
          greedy: !0,
          inside: {
            function: {
              pattern: /(^|[^`])\$\((?:\$\(.*?\)|(?!\$\()[^\r\n)])*\)/,
              lookbehind: !0,
              inside: {}
            }
          }
        },
        { pattern: /'(?:[^']|'')*'/, greedy: !0 }
      ],
      namespace: /\[[a-z](?:\[(?:\[[^\]]*]|[^\[\]])*]|[^\[\]])*]/i,
      boolean: /\$(?:true|false)\b/i,
      variable: /\$\w+\b/i,
      function: [
        /\b(?:Add-(?:Computer|Content|History|Member|PSSnapin|Type)|Checkpoint-Computer|Clear-(?:Content|EventLog|History|Item|ItemProperty|Variable)|Compare-Object|Complete-Transaction|Connect-PSSession|ConvertFrom-(?:Csv|Json|StringData)|Convert-Path|ConvertTo-(?:Csv|Html|Json|Xml)|Copy-(?:Item|ItemProperty)|Debug-Process|Disable-(?:ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Disconnect-PSSession|Enable-(?:ComputerRestore|PSBreakpoint|PSRemoting|PSSessionConfiguration)|Enter-PSSession|Exit-PSSession|Export-(?:Alias|Clixml|Console|Csv|FormatData|ModuleMember|PSSession)|ForEach-Object|Format-(?:Custom|List|Table|Wide)|Get-(?:Alias|ChildItem|Command|ComputerRestorePoint|Content|ControlPanelItem|Culture|Date|Event|EventLog|EventSubscriber|FormatData|Help|History|Host|HotFix|Item|ItemProperty|Job|Location|Member|Module|Process|PSBreakpoint|PSCallStack|PSDrive|PSProvider|PSSession|PSSessionConfiguration|PSSnapin|Random|Service|TraceSource|Transaction|TypeData|UICulture|Unique|Variable|WmiObject)|Group-Object|Import-(?:Alias|Clixml|Csv|LocalizedData|Module|PSSession)|Invoke-(?:Command|Expression|History|Item|RestMethod|WebRequest|WmiMethod)|Join-Path|Limit-EventLog|Measure-(?:Command|Object)|Move-(?:Item|ItemProperty)|New-(?:Alias|Event|EventLog|Item|ItemProperty|Module|ModuleManifest|Object|PSDrive|PSSession|PSSessionConfigurationFile|PSSessionOption|PSTransportOption|Service|TimeSpan|Variable|WebServiceProxy)|Out-(?:Default|File|GridView|Host|Null|Printer|String)|Pop-Location|Push-Location|Read-Host|Receive-(?:Job|PSSession)|Register-(?:EngineEvent|ObjectEvent|PSSessionConfiguration|WmiEvent)|Remove-(?:Computer|Event|EventLog|Item|ItemProperty|Job|Module|PSBreakpoint|PSDrive|PSSession|PSSnapin|TypeData|Variable|WmiObject)|Rename-(?:Computer|Item|ItemProperty)|Reset-ComputerMachinePassword|Resolve-Path|Restart-(?:Computer|Service)|Restore-Computer|Resume-(?:Job|Service)|Save-Help|Select-(?:Object|String|Xml)|Send-MailMessage|Set-(?:Alias|Content|Date|Item|ItemProperty|Location|PSBreakpoint|PSDebug|PSSessionConfiguration|Service|StrictMode|TraceSource|Variable|WmiInstance)|Show-(?:Command|ControlPanelItem|EventLog)|Sort-Object|Split-Path|Start-(?:Job|Process|Service|Sleep|Transaction)|Stop-(?:Computer|Job|Process|Service)|Suspend-(?:Job|Service)|Tee-Object|Test-(?:ComputerSecureChannel|Connection|ModuleManifest|Path|PSSessionConfigurationFile)|Trace-Command|Unblock-File|Undo-Transaction|Unregister-(?:Event|PSSessionConfiguration)|Update-(?:FormatData|Help|List|TypeData)|Use-Transaction|Wait-(?:Event|Job|Process)|Where-Object|Write-(?:Debug|Error|EventLog|Host|Output|Progress|Verbose|Warning))\b/i,
        /\b(?:ac|cat|chdir|clc|cli|clp|clv|compare|copy|cp|cpi|cpp|cvpa|dbp|del|diff|dir|ebp|echo|epal|epcsv|epsn|erase|fc|fl|ft|fw|gal|gbp|gc|gci|gcs|gdr|gi|gl|gm|gp|gps|group|gsv|gu|gv|gwmi|iex|ii|ipal|ipcsv|ipsn|irm|iwmi|iwr|kill|lp|ls|measure|mi|mount|move|mp|mv|nal|ndr|ni|nv|ogv|popd|ps|pushd|pwd|rbp|rd|rdr|ren|ri|rm|rmdir|rni|rnp|rp|rv|rvpa|rwmi|sal|saps|sasv|sbp|sc|select|set|shcm|si|sl|sleep|sls|sort|sp|spps|spsv|start|sv|swmi|tee|trcm|type|write)\b/i
      ],
      keyword: /\b(?:Begin|Break|Catch|Class|Continue|Data|Define|Do|DynamicParam|Else|ElseIf|End|Exit|Filter|Finally|For|ForEach|From|Function|If|InlineScript|Parallel|Param|Process|Return|Sequence|Switch|Throw|Trap|Try|Until|Using|Var|While|Workflow)\b/i,
      operator: {
        pattern: /(\W?)(?:!|-(eq|ne|gt|ge|lt|le|sh[lr]|not|b?(?:and|x?or)|(?:Not)?(?:Like|Match|Contains|In)|Replace|Join|is(?:Not)?|as)\b|-[-=]?|\+[+=]?|[*\/%]=?)/i,
        lookbehind: !0
      },
      punctuation: /[|{}[\];(),.]/
    })
    const o = t.string[0].inside
    ;(o.boolean = t.boolean), (o.variable = t.variable), (o.function.inside = t)
  })()
  ;(Prism.languages.python = {
    comment: { pattern: /(^|[^\\])#.*/, lookbehind: !0 },
    'string-interpolation': {
      pattern: /(?:f|rf|fr)(?:("""|''')[\s\S]+?\1|("|')(?:\\.|(?!\2)[^\\\r\n])*\2)/i,
      greedy: !0,
      inside: {
        interpolation: {
          pattern: /((?:^|[^{])(?:{{)*){(?!{)(?:[^{}]|{(?!{)(?:[^{}]|{(?!{)(?:[^{}])+})+})+}/,
          lookbehind: !0,
          inside: {
            'format-spec': { pattern: /(:)[^:(){}]+(?=}$)/, lookbehind: !0 },
            'conversion-option': {
              pattern: /![sra](?=[:}]$)/,
              alias: 'punctuation'
            },
            rest: null
          }
        },
        string: /[\s\S]+/
      }
    },
    'triple-quoted-string': {
      pattern: /(?:[rub]|rb|br)?("""|''')[\s\S]+?\1/i,
      greedy: !0,
      alias: 'string'
    },
    string: {
      pattern: /(?:[rub]|rb|br)?("|')(?:\\.|(?!\1)[^\\\r\n])*\1/i,
      greedy: !0
    },
    function: {
      pattern: /((?:^|\s)def[ \t]+)[a-zA-Z_]\w*(?=\s*\()/g,
      lookbehind: !0
    },
    'class-name': { pattern: /(\bclass\s+)\w+/i, lookbehind: !0 },
    decorator: {
      pattern: /(^\s*)@\w+(?:\.\w+)*/i,
      lookbehind: !0,
      alias: ['annotation', 'punctuation'],
      inside: { punctuation: /\./ }
    },
    keyword: /\b(?:and|as|assert|async|await|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|nonlocal|not|or|pass|print|raise|return|try|while|with|yield)\b/,
    builtin: /\b(?:__import__|abs|all|any|apply|ascii|basestring|bin|bool|buffer|bytearray|bytes|callable|chr|classmethod|cmp|coerce|compile|complex|delattr|dict|dir|divmod|enumerate|eval|execfile|file|filter|float|format|frozenset|getattr|globals|hasattr|hash|help|hex|id|input|int|intern|isinstance|issubclass|iter|len|list|locals|long|map|max|memoryview|min|next|object|oct|open|ord|pow|property|range|raw_input|reduce|reload|repr|reversed|round|set|setattr|slice|sorted|staticmethod|str|sum|super|tuple|type|unichr|unicode|vars|xrange|zip)\b/,
    boolean: /\b(?:True|False|None)\b/,
    number: /(?:\b(?=\d)|\B(?=\.))(?:0[bo])?(?:(?:\d|0x[\da-f])[\da-f]*\.?\d*|\.\d+)(?:e[+-]?\d+)?j?\b/i,
    operator: /[-+%=]=?|!=|\*\*?=?|\/\/?=?|<[<=>]?|>[=>]?|[&|^~]/,
    punctuation: /[{}[\];(),.:]/
  }),
    (Prism.languages.python[
      'string-interpolation'
    ].inside.interpolation.inside.rest = Prism.languages.python),
    (Prism.languages.py = Prism.languages.python)
  Prism.languages.rust = {
    comment: [
      { pattern: /(^|[^\\])\/\*[\s\S]*?\*\//, lookbehind: !0 },
      { pattern: /(^|[^\\:])\/\/.*/, lookbehind: !0 }
    ],
    string: [
      { pattern: /b?r(#*)"(?:\\.|(?!"\1)[^\\\r\n])*"\1/, greedy: !0 },
      { pattern: /b?"(?:\\.|[^\\\r\n"])*"/, greedy: !0 }
    ],
    char: {
      pattern: /b?'(?:\\(?:x[0-7][\da-fA-F]|u{(?:[\da-fA-F]_*){1,6}|.)|[^\\\r\n\t'])'/,
      alias: 'string'
    },
    'lifetime-annotation': { pattern: /'[^\s>']+/, alias: 'symbol' },
    keyword: /\b(?:abstract|alignof|as|async|await|be|box|break|const|continue|crate|do|dyn|else|enum|extern|false|final|fn|for|if|impl|in|let|loop|match|mod|move|mut|offsetof|once|override|priv|pub|pure|ref|return|sizeof|static|self|Self|struct|super|true|trait|type|typeof|union|unsafe|unsized|use|virtual|where|while|yield)\b/,
    attribute: { pattern: /#!?\[.+?\]/, greedy: !0, alias: 'attr-name' },
    function: [/\w+(?=\s*\()/, /\w+!(?=\s*\(|\[)/],
    'macro-rules': { pattern: /\w+!/, alias: 'function' },
    number: /\b(?:0x[\dA-Fa-f](?:_?[\dA-Fa-f])*|0o[0-7](?:_?[0-7])*|0b[01](?:_?[01])*|(\d(?:_?\d)*)?\.?\d(?:_?\d)*(?:[Ee][+-]?\d+)?)(?:_?(?:[iu](?:8|16|32|64)?|f32|f64))?\b/,
    'closure-params': {
      pattern: /\|[^|]*\|(?=\s*[{-])/,
      inside: { punctuation: /[|:,]/, operator: /[&*]/ }
    },
    punctuation: /->|\.\.=|\.{1,3}|::|[{}[\];(),:]/,
    operator: /[-+*\/%!^]=?|=[=>]?|&[&=]?|\|[|=]?|<<?=?|>>?=?|[@?]/
  }
  !(function(E) {
    const A = (E.languages.plsql = E.languages.extend('sql', {
      comment: [/\/\*[\s\S]*?\*\//, /--.*/]
    }))
    let T = A.keyword
    Array.isArray(T) || (T = A.keyword = [T]),
      T.unshift(
        /\b(?:ACCESS|AGENT|AGGREGATE|ARRAY|ARROW|AT|ATTRIBUTE|AUDIT|AUTHID|BFILE_BASE|BLOB_BASE|BLOCK|BODY|BOTH|BOUND|BYTE|CALLING|CHAR_BASE|CHARSET(?:FORM|ID)|CLOB_BASE|COLAUTH|COLLECT|CLUSTERS?|COMPILED|COMPRESS|CONSTANT|CONSTRUCTOR|CONTEXT|CRASH|CUSTOMDATUM|DANGLING|DATE_BASE|DEFINE|DETERMINISTIC|DURATION|ELEMENT|EMPTY|EXCEPTIONS?|EXCLUSIVE|EXTERNAL|FINAL|FORALL|FORM|FOUND|GENERAL|HEAP|HIDDEN|IDENTIFIED|IMMEDIATE|INCLUDING|INCREMENT|INDICATOR|INDEXES|INDICES|INFINITE|INITIAL|ISOPEN|INSTANTIABLE|INTERFACE|INVALIDATE|JAVA|LARGE|LEADING|LENGTH|LIBRARY|LIKE[24C]|LIMITED|LONG|LOOP|MAP|MAXEXTENTS|MAXLEN|MEMBER|MINUS|MLSLABEL|MULTISET|NAME|NAN|NATIVE|NEW|NOAUDIT|NOCOMPRESS|NOCOPY|NOTFOUND|NOWAIT|NUMBER(?:_BASE)?|OBJECT|OCI(?:COLL|DATE|DATETIME|DURATION|INTERVAL|LOBLOCATOR|NUMBER|RAW|REF|REFCURSOR|ROWID|STRING|TYPE)|OFFLINE|ONLINE|ONLY|OPAQUE|OPERATOR|ORACLE|ORADATA|ORGANIZATION|ORL(?:ANY|VARY)|OTHERS|OVERLAPS|OVERRIDING|PACKAGE|PARALLEL_ENABLE|PARAMETERS?|PASCAL|PCTFREE|PIPE(?:LINED)?|PRAGMA|PRIOR|PRIVATE|RAISE|RANGE|RAW|RECORD|REF|REFERENCE|REM|REMAINDER|RESULT|RESOURCE|RETURNING|REVERSE|ROW(?:ID|NUM|TYPE)|SAMPLE|SB[124]|SEGMENT|SELF|SEPARATE|SEQUENCE|SHORT|SIZE(?:_T)?|SPARSE|SQL(?:CODE|DATA|NAME|STATE)|STANDARD|STATIC|STDDEV|STORED|STRING|STRUCT|STYLE|SUBMULTISET|SUBPARTITION|SUBSTITUTABLE|SUBTYPE|SUCCESSFUL|SYNONYM|SYSDATE|TABAUTH|TDO|THE|TIMEZONE_(?:ABBR|HOUR|MINUTE|REGION)|TRAILING|TRANSAC(?:TIONAL)?|TRUSTED|UB[124]|UID|UNDER|UNTRUSTED|VALIDATE|VALIST|VARCHAR2|VARIABLE|VARIANCE|VARRAY|VIEWS|VOID|WHENEVER|WRAPPED|ZONE)\b/i
      )
    let R = A.operator
    Array.isArray(R) || (R = A.operator = [R]), R.unshift(/:=/)
  })(Prism)
  !(function(e) {
    e.languages.pug = {
      comment: {
        pattern: /(^([\t ]*))\/\/.*(?:(?:\r?\n|\r)\2[\t ]+.+)*/m,
        lookbehind: !0
      },
      'multiline-script': {
        pattern: /(^([\t ]*)script\b.*\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
        lookbehind: !0,
        inside: { rest: e.languages.javascript }
      },
      filter: {
        pattern: /(^([\t ]*)):.+(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
        lookbehind: !0,
        inside: { 'filter-name': { pattern: /^:[\w-]+/, alias: 'variable' } }
      },
      'multiline-plain-text': {
        pattern: /(^([\t ]*)[\w\-#.]+\.[\t ]*)(?:(?:\r?\n|\r(?!\n))(?:\2[\t ]+.+|\s*?(?=\r?\n|\r)))+/m,
        lookbehind: !0
      },
      markup: {
        pattern: /(^[\t ]*)<.+/m,
        lookbehind: !0,
        inside: { rest: e.languages.markup }
      },
      doctype: { pattern: /((?:^|\n)[\t ]*)doctype(?: .+)?/, lookbehind: !0 },
      'flow-control': {
        pattern: /(^[\t ]*)(?:if|unless|else|case|when|default|each|while)\b(?: .+)?/m,
        lookbehind: !0,
        inside: {
          each: {
            pattern: /^each .+? in\b/,
            inside: { keyword: /\b(?:each|in)\b/, punctuation: /,/ }
          },
          branch: {
            pattern: /^(?:if|unless|else|case|when|default|while)\b/,
            alias: 'keyword'
          },
          rest: e.languages.javascript
        }
      },
      keyword: {
        pattern: /(^[\t ]*)(?:block|extends|include|append|prepend)\b.+/m,
        lookbehind: !0
      },
      mixin: [
        {
          pattern: /(^[\t ]*)mixin .+/m,
          lookbehind: !0,
          inside: {
            keyword: /^mixin/,
            function: /\w+(?=\s*\(|\s*$)/,
            punctuation: /[(),.]/
          }
        },
        {
          pattern: /(^[\t ]*)\+.+/m,
          lookbehind: !0,
          inside: {
            name: { pattern: /^\+\w+/, alias: 'function' },
            rest: e.languages.javascript
          }
        }
      ],
      script: {
        pattern: /(^[\t ]*script(?:(?:&[^(]+)?\([^)]+\))*[\t ]+).+/m,
        lookbehind: !0,
        inside: { rest: e.languages.javascript }
      },
      'plain-text': {
        pattern: /(^[\t ]*(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?[\t ]+).+/m,
        lookbehind: !0
      },
      tag: {
        pattern: /(^[\t ]*)(?!-)[\w\-#.]*[\w\-](?:(?:&[^(]+)?\([^)]+\))*\/?:?/m,
        lookbehind: !0,
        inside: {
          attributes: [
            {
              pattern: /&[^(]+\([^)]+\)/,
              inside: { rest: e.languages.javascript }
            },
            {
              pattern: /\([^)]+\)/,
              inside: {
                'attr-value': {
                  pattern: /(=\s*)(?:\{[^}]*\}|[^,)\r\n]+)/,
                  lookbehind: !0,
                  inside: { rest: e.languages.javascript }
                },
                'attr-name': /[\w-]+(?=\s*!?=|\s*[,)])/,
                punctuation: /[!=(),]+/
              }
            }
          ],
          punctuation: /:/
        }
      },
      code: [
        {
          pattern: /(^[\t ]*(?:-|!?=)).+/m,
          lookbehind: !0,
          inside: { rest: e.languages.javascript }
        }
      ],
      punctuation: /[.\-!=|]+/
    }
    for (
      var t = [
          { filter: 'atpl', language: 'twig' },
          { filter: 'coffee', language: 'coffeescript' },
          'ejs',
          'handlebars',
          'less',
          'livescript',
          'markdown',
          { filter: 'sass', language: 'scss' },
          'stylus'
        ],
        n = {},
        a = 0,
        i = t.length;
      a < i;
      a++
    ) {
      let r = t[a]
      ;(r = typeof r === 'string' ? { filter: r, language: r } : r),
        e.languages[r.language] &&
          (n['filter-' + r.filter] = {
            pattern: RegExp(
              '(^([\t ]*)):{{filter_name}}(?:(?:\r?\n|\r(?!\n))(?:\\2[\t ]+.+|\\s*?(?=\r?\n|\r)))+'.replace(
                '{{filter_name}}',
                r.filter
              ),
              'm'
            ),
            lookbehind: !0,
            inside: {
              'filter-name': { pattern: /^:[\w-]+/, alias: 'variable' },
              rest: e.languages[r.language]
            }
          })
    }
    e.languages.insertBefore('pug', 'filter', n)
  })(Prism)
  Prism.languages.wasm = {
    comment: [/\(;[\s\S]*?;\)/, { pattern: /;;.*/, greedy: !0 }],
    string: { pattern: /"(?:\\[\s\S]|[^"\\])*"/, greedy: !0 },
    keyword: [
      { pattern: /\b(?:align|offset)=/, inside: { operator: /=/ } },
      {
        pattern: /\b(?:(?:f32|f64|i32|i64)(?:\.(?:abs|add|and|ceil|clz|const|convert_[su]\/i(?:32|64)|copysign|ctz|demote\/f64|div(?:_[su])?|eqz?|extend_[su]\/i32|floor|ge(?:_[su])?|gt(?:_[su])?|le(?:_[su])?|load(?:(?:8|16|32)_[su])?|lt(?:_[su])?|max|min|mul|nearest|neg?|or|popcnt|promote\/f32|reinterpret\/[fi](?:32|64)|rem_[su]|rot[lr]|shl|shr_[su]|store(?:8|16|32)?|sqrt|sub|trunc(?:_[su]\/f(?:32|64))?|wrap\/i64|xor))?|memory\.(?:grow|size))\b/,
        inside: { punctuation: /\./ }
      },
      /\b(?:anyfunc|block|br(?:_if|_table)?|call(?:_indirect)?|data|drop|elem|else|end|export|func|get_(?:global|local)|global|if|import|local|loop|memory|module|mut|nop|offset|param|result|return|select|set_(?:global|local)|start|table|tee_local|then|type|unreachable)\b/
    ],
    variable: /\$[\w!#$%&'*+\-./:<=>?@\\^_`|~]+/i,
    number: /[+-]?\b(?:\d(?:_?\d)*(?:\.\d(?:_?\d)*)?(?:[eE][+-]?\d(?:_?\d)*)?|0x[\da-fA-F](?:_?[\da-fA-F])*(?:\.[\da-fA-F](?:_?[\da-fA-D])*)?(?:[pP][+-]?\d(?:_?\d)*)?)\b|\binf\b|\bnan(?::0x[\da-fA-F](?:_?[\da-fA-D])*)?\b/,
    punctuation: /[()]/
  }
  !(function() {
    if (
      (typeof self === 'undefined' || self.Prism) &&
      (typeof global === 'undefined' || global.Prism)
    ) {
      const t = /\b([a-z]{3,7}:\/\/|tel:)[\w\-+%~/.:=&@]+(?:\?[\w\-+%~/.:=?&!$'()*,;@]*)?(?:#[\w\-+%~/.:#=?&!$'()*,;@]*)?/
      const r = /\b\S+@[\w.]+[a-z]{2}/
      const a = /\[([^\]]+)]\(([^)]+)\)/
      const l = ['comment', 'url', 'attr-value', 'string']
      ;(Prism.plugins.autolinker = {
        processGrammar(i) {
          i &&
            !i['url-link'] &&
            (Prism.languages.DFS(i, function(i, n, e) {
              l.includes(e) &&
                !Array.isArray(n) &&
                (n.pattern || (n = this[i] = { pattern: n }),
                (n.inside = n.inside || {}),
                e == 'comment' && (n.inside['md-link'] = a),
                e == 'attr-value'
                  ? Prism.languages.insertBefore(
                      'inside',
                      'punctuation',
                      { 'url-link': t },
                      n
                    )
                  : (n.inside['url-link'] = t),
                (n.inside['email-link'] = r))
            }),
            (i['url-link'] = t),
            (i['email-link'] = r))
        }
      }),
        Prism.hooks.add('before-highlight', function(i) {
          Prism.plugins.autolinker.processGrammar(i.grammar)
        }),
        Prism.hooks.add('wrap', function(i) {
          if (/-link$/.test(i.type)) {
            i.tag = 'a'
            let n = i.content
            if (i.type == 'email-link' && n.indexOf('mailto:') != 0)
              n = 'mailto:' + n
            else if (i.type == 'md-link') {
              const e = i.content.match(a)
              ;(n = e[2]), (i.content = e[1])
            }
            i.attributes.href = n
            try {
              i.content = decodeURIComponent(i.content)
            } catch (i) {}
          }
        })
    }
  })()
  !(function() {
    if (typeof self !== 'undefined' && self.Prism && self.document) {
      let r = []
      const i = {}
      const n = function() {}
      Prism.plugins.toolbar = {}
      const t = (Prism.plugins.toolbar.registerButton = function(t, n) {
        let e
        ;(e =
          typeof n === 'function'
            ? n
            : function(t) {
                let e
                return (
                  typeof n.onClick === 'function'
                    ? (((e = document.createElement('button')).type = 'button'),
                      e.addEventListener('click', function() {
                        n.onClick.call(this, t)
                      }))
                    : typeof n.url === 'string'
                    ? ((e = document.createElement('a')).href = n.url)
                    : (e = document.createElement('span')),
                  (e.textContent = n.text),
                  e
                )
              }),
          t in i
            ? console.warn(
                'There is a button with the key "' + t + '" registered already.'
              )
            : r.push((i[t] = e))
      })
      const e = (Prism.plugins.toolbar.hook = function(a) {
        const t = a.element.parentNode
        if (
          t &&
          /pre/i.test(t.nodeName) &&
          !t.parentNode.classList.contains('code-toolbar')
        ) {
          const e = document.createElement('div')
          e.classList.add('code-toolbar'),
            t.parentNode.insertBefore(e, t),
            e.appendChild(t)
          const o = document.createElement('div')
          o.classList.add('toolbar'),
            document.body.hasAttribute('data-toolbar-order') &&
              (r = document.body
                .getAttribute('data-toolbar-order')
                .split(',')
                .map(function(t) {
                  return i[t] || n
                })),
            r.forEach(function(t) {
              const e = t(a)
              if (e) {
                const n = document.createElement('div')
                n.classList.add('toolbar-item'),
                  n.appendChild(e),
                  o.appendChild(n)
              }
            }),
            e.appendChild(o)
        }
      })
      t('label', function(t) {
        const e = t.element.parentNode
        if (e && /pre/i.test(e.nodeName) && e.hasAttribute('data-label')) {
          let n
          let a
          const o = e.getAttribute('data-label')
          try {
            a = document.querySelector('template#' + o)
          } catch (t) {}
          return (
            a
              ? (n = a.content)
              : (e.hasAttribute('data-url')
                  ? ((n = document.createElement('a')).href = e.getAttribute(
                      'data-url'
                    ))
                  : (n = document.createElement('span')),
                (n.textContent = o)),
            n
          )
        }
      }),
        Prism.hooks.add('complete', e)
    }
  })()
  !(function() {
    if (typeof self !== 'undefined' && self.Prism && self.document) {
      const u = /(?:^|\s)command-line(?:\s|$)/
      Prism.hooks.add('before-highlight', function(e) {
        const t = (e.vars = e.vars || {})
        const a = (t['command-line'] = t['command-line'] || {})
        if (!a.complete && e.code) {
          const n = e.element.parentNode
          if (
            n &&
            /pre/i.test(n.nodeName) &&
            (u.test(n.className) || u.test(e.element.className))
          )
            if (e.element.querySelector('.command-line-prompt')) a.complete = !0
            else {
              const r = e.code.split('\n')
              a.numberOfLines = r.length
              const s = (a.outputLines = [])
              let o = n.getAttribute('data-output')
              const i = n.getAttribute('data-filter-output')
              if (o || o === '') {
                o = o.split(',')
                for (var l = 0; l < o.length; l++) {
                  const m = o[l].split('-')
                  let p = parseInt(m[0], 10)
                  let d = m.length === 2 ? parseInt(m[1], 10) : p
                  if (!isNaN(p) && !isNaN(d)) {
                    p < 1 && (p = 1), d > r.length && (d = r.length), d--
                    for (let c = --p; c <= d; c++) (s[c] = r[c]), (r[c] = '')
                  }
                }
              } else if (i)
                for (l = 0; l < r.length; l++)
                  r[l].indexOf(i) === 0 &&
                    ((s[l] = r[l].slice(i.length)), (r[l] = ''))
              e.code = r.join('\n')
            }
          else a.complete = !0
        } else a.complete = !0
      }),
        Prism.hooks.add('before-insert', function(e) {
          const t = (e.vars = e.vars || {})
          const a = (t['command-line'] = t['command-line'] || {})
          if (!a.complete) {
            for (
              var n = e.highlightedCode.split('\n'),
                r = 0,
                s = (a.outputLines || []).length;
              r < s;
              r++
            )
              a.outputLines.hasOwnProperty(r) && (n[r] = a.outputLines[r])
            e.highlightedCode = n.join('\n')
          }
        }),
        Prism.hooks.add('complete', function(e) {
          const t = (e.vars = e.vars || {})
          const a = (t['command-line'] = t['command-line'] || {})
          if (!a.complete) {
            const n = e.element.parentNode
            u.test(e.element.className) &&
              (e.element.className = e.element.className.replace(u, ' ')),
              u.test(n.className) || (n.className += ' command-line')
            const r = function(e, t) {
              return (n.getAttribute(e) || t).replace(/"/g, '&quot')
            }
            let s = new Array((a.numberOfLines || 0) + 1)
            const o = r('data-prompt', '')
            if (o !== '') s = s.join('<span data-prompt="' + o + '"></span>')
            else {
              const i = r('data-user', 'user')
              const l = r('data-host', 'localhost')
              s = s.join(
                '<span data-user="' + i + '" data-host="' + l + '"></span>'
              )
            }
            const m = document.createElement('span')
            ;(m.className = 'command-line-prompt'), (m.innerHTML = s)
            for (let p = 0, d = (a.outputLines || []).length; p < d; p++)
              if (a.outputLines.hasOwnProperty(p)) {
                const c = m.children[p]
                c.removeAttribute('data-user'),
                  c.removeAttribute('data-host'),
                  c.removeAttribute('data-prompt')
              }
            e.element.insertBefore(m, e.element.firstChild), (a.complete = !0)
          }
        })
    }
  })()
  !(function() {
    if (typeof self !== 'undefined' && self.Prism && self.document)
      if (Prism.plugins.toolbar) {
        const r = {
          html: 'HTML',
          xml: 'XML',
          svg: 'SVG',
          mathml: 'MathML',
          css: 'CSS',
          clike: 'C-like',
          js: 'JavaScript',
          abap: 'ABAP',
          abnf: 'Augmented Backus–Naur form',
          apacheconf: 'Apache Configuration',
          apl: 'APL',
          arff: 'ARFF',
          asciidoc: 'AsciiDoc',
          adoc: 'AsciiDoc',
          asm6502: '6502 Assembly',
          aspnet: 'ASP.NET (C#)',
          autohotkey: 'AutoHotkey',
          autoit: 'AutoIt',
          shell: 'Bash',
          basic: 'BASIC',
          bnf: 'Backus–Naur form',
          rbnf: 'Routing Backus–Naur form',
          csharp: 'C#',
          cs: 'C#',
          dotnet: 'C#',
          cpp: 'C++',
          cil: 'CIL',
          coffee: 'CoffeeScript',
          cmake: 'CMake',
          csp: 'Content-Security-Policy',
          'css-extras': 'CSS Extras',
          django: 'Django/Jinja2',
          jinja2: 'Django/Jinja2',
          dockerfile: 'Docker',
          ebnf: 'Extended Backus–Naur form',
          ejs: 'EJS',
          erb: 'ERB',
          fsharp: 'F#',
          gcode: 'G-code',
          gedcom: 'GEDCOM',
          glsl: 'GLSL',
          gml: 'GameMaker Language',
          gamemakerlanguage: 'GameMaker Language',
          graphql: 'GraphQL',
          hs: 'Haskell',
          hcl: 'HCL',
          http: 'HTTP',
          hpkp: 'HTTP Public-Key-Pins',
          hsts: 'HTTP Strict-Transport-Security',
          ichigojam: 'IchigoJam',
          inform7: 'Inform 7',
          javadoc: 'JavaDoc',
          javadoclike: 'JavaDoc-like',
          javastacktrace: 'Java stack trace',
          jq: 'JQ',
          jsdoc: 'JSDoc',
          'js-extras': 'JS Extras',
          json: 'JSON',
          jsonp: 'JSONP',
          json5: 'JSON5',
          latex: 'LaTeX',
          tex: 'TeX',
          context: 'ConTeXt',
          emacs: 'Lisp',
          elisp: 'Lisp',
          'emacs-lisp': 'Lisp',
          lolcode: 'LOLCODE',
          md: 'Markdown',
          'markup-templating': 'Markup templating',
          matlab: 'MATLAB',
          mel: 'MEL',
          n1ql: 'N1QL',
          n4js: 'N4JS',
          n4jsd: 'N4JS',
          'nand2tetris-hdl': 'Nand To Tetris HDL',
          nasm: 'NASM',
          nginx: 'nginx',
          nsis: 'NSIS',
          objectivec: 'Objective-C',
          ocaml: 'OCaml',
          opencl: 'OpenCL',
          parigp: 'PARI/GP',
          objectpascal: 'Object Pascal',
          php: 'PHP',
          phpdoc: 'PHPDoc',
          'php-extras': 'PHP Extras',
          plsql: 'PL/SQL',
          powershell: 'PowerShell',
          properties: '.properties',
          protobuf: 'Protocol Buffers',
          py: 'Python',
          q: 'Q (kdb+ database)',
          jsx: 'React JSX',
          tsx: 'React TSX',
          renpy: "Ren'py",
          rest: 'reST (reStructuredText)',
          rb: 'Ruby',
          sas: 'SAS',
          sass: 'Sass (Sass)',
          scss: 'Sass (Scss)',
          sql: 'SQL',
          soy: 'Soy (Closure Template)',
          tap: 'TAP',
          toml: 'TOML',
          tt2: 'Template Toolkit 2',
          ts: 'TypeScript',
          't4-cs': 'T4 Text Templates (C#)',
          t4: 'T4 Text Templates (C#)',
          't4-vb': 'T4 Text Templates (VB)',
          't4-templating': 'T4 templating',
          vbnet: 'VB.Net',
          vhdl: 'VHDL',
          vim: 'vim',
          'visual-basic': 'Visual Basic',
          vb: 'Visual Basic',
          wasm: 'WebAssembly',
          wiki: 'Wiki markup',
          xeoracube: 'XeoraCube',
          xojo: 'Xojo (REALbasic)',
          xquery: 'XQuery',
          yaml: 'YAML',
          yml: 'YAML'
        }
        Prism.plugins.toolbar.registerButton('show-language', function(e) {
          const a = e.element.parentNode
          if (a && /pre/i.test(a.nodeName)) {
            let s
            const t =
              a.getAttribute('data-language') ||
              r[e.language] ||
              ((s = e.language)
                ? (s.substring(0, 1).toUpperCase() + s.substring(1)).replace(
                    /s(?=cript)/,
                    'S'
                  )
                : s)
            if (t) {
              const o = document.createElement('span')
              return (o.textContent = t), o
            }
          }
        })
      } else console.warn('Show Languages plugin loaded before Toolbar plugin.')
  })()
  !(function() {
    if (typeof self !== 'undefined' && self.Prism && self.document) {
      if (!Prism.plugins.toolbar)
        return (
          console.warn(
            'Copy to Clipboard plugin loaded before Toolbar plugin.'
          ),
          void 0
        )
      let o = window.ClipboardJS || void 0
      o || typeof require !== 'function' || (o = require('clipboard'))
      const e = []
      if (!o) {
        const t = document.createElement('script')
        const n = document.querySelector('head')
        ;(t.onload = function() {
          if ((o = window.ClipboardJS)) for (; e.length; ) e.pop()()
        }),
          (t.src =
            'https://cdnjs.cloudflare.com/ajax/libs/clipboard.js/2.0.0/clipboard.min.js'),
          n.appendChild(t)
      }
      Prism.plugins.toolbar.registerButton('copy-to-clipboard', function(t) {
        function n() {
          const e = new o(i, {
            text() {
              return t.code
            }
          })
          e.on('success', function() {
            ;(i.textContent = 'Copied!'), r()
          }),
            e.on('error', function() {
              ;(i.textContent = 'Press Ctrl+C to copy'), r()
            })
        }
        function r() {
          setTimeout(function() {
            i.textContent = 'Copy'
          }, 5e3)
        }
        var i = document.createElement('a')
        return (i.textContent = 'Copy'), o ? n() : e.push(n), i
      })
    }
  })()
}
