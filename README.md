[![Travis][build-badge]][build]

[![npm package][npm-badge]][npm]

# gatsby-plugin-meta-redirect

This is a forked version. Original [plugin and repo available here](https://github.com/nsresulta/gatsby-plugin-meta-redirect).

MIT License
Copyright (c) 2018 Get Chalk

---

Generates meta redirect html files for redirecting on GitHub Pages.

## How to add to program

**In your package.json**

`npm i https://github.com/layer5labs/gatsby-plugin-meta-redirect`

**In your gatsby-config.js**

plugins: [

`"gatsby-plugin-meta-redirect"` // make sure to put last in the array

];

### Redirects

You can create redirects using the [`createRedirect`](https://www.gatsbyjs.org/docs/bound-action-creators/#createRedirect) action.

An example:

```js
createRedirect({ fromPath: '/old-url', toPath: '/new-url', isPermanent: true });

createRedirect({ fromPath: '/url', toPath: '/zn-CH/url', Language: 'zn' });
```

That will generate the following html files:

### `/old-url/index.html`:

```html
<meta http-equiv="refresh" content="0; URL='/new-url/'" />
```

and

### `/url/index.html`:

```html
<meta http-equiv="refresh" content="0; URL='/zn-CH/url/'" />
```

[build-badge]: https://img.shields.io/travis/getchalk/gatsby-plugin-meta-redirect/master.png?style=flat-square
[build]: https://travis-ci.org/getchalk/gatsby-plugin-meta-redirect
[npm-badge]: https://img.shields.io/npm/v/gatsby-plugin-meta-redirect.png?style=flat-square
[npm]: https://www.npmjs.org/package/gatsby-plugin-meta-redirect
