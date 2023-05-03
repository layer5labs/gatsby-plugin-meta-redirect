const path = require('path');
const { exists, writeFile, ensureDir } = require('fs-extra');

const getMetaRedirect = require('./getMetaRedirect');

async function writeRedirectsFile(redirects, folder, pathPrefix, siteUrl) {

  if (!redirects.length) return;

  for (const redirect of redirects) {
    const { fromPath, toPath } = redirect;

    const FILE_PATH = path.join(
      folder,
      fromPath.replace(pathPrefix, ""),
      "index.html"
    );

    const fileExists = await exists(FILE_PATH);
    if (!fileExists) {
      try {
        await ensureDir(path.dirname(FILE_PATH));
      } catch (err) {
        // ignore if the directory already exists;
      }

      const data = getMetaRedirect(toPath, pathPrefix, siteUrl);
      await writeFile(FILE_PATH, data);
    }
  }
}

exports.onPostBuild = ({ store }) => {
  const { redirects, program, config } = store.getState();

  let pathPrefix = "";
  if (program.prefixPaths) {
    pathPrefix = config.pathPrefix;
  }

  const siteUrl = config.siteMetadata.siteUrl;
  const folder = path.join(program.directory, "public");

  return writeRedirectsFile(redirects, folder, pathPrefix, siteUrl);
};

/* MIT License

Copyright (c) 2018 Get Chalk

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/