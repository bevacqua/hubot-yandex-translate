# hubot-yandex-translate

> Allows Hubot to translate things using the Yandex Translation API

See [`src/yandex-translate.js`](src/yandex-translate.js) for full documentation.

# Installation

In hubot project repo, run:

```shell
npm install hubot-yandex-translate --save
```

Then add **hubot-yandex-translate** to your `external-scripts.json`:

```json
[
  "hubot-yandex-translate"
]
```

# Setup

Get [a Yandex API key][1]. Add it to your environment.

```bash
heroku config:add YANDEX_TRANSLATE_API_KEY=$KEY
```

# Command

- `hubot translate <message>`
- `hubot traducir <message>`
- `hubot traduce <message>`
- `hubot tr <message>`
- `hubot t <message>`
- `hubot translate [from-to] <message>`

# License

MIT

[1]: https://tech.yandex.com/key/form.xml?service=trnsl
