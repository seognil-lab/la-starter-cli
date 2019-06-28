## 🛠️ What is this

A quick lib starter for npm package develop and publish.  
(This is only for pure function libs. I'd like to create a new tool called component-starter)

(Not fully optimized yet, but already works in our projects. 😀)  
(I'd upgrade this starter as my futher development)

It is build from scratch. (well basiclly... just some tool installed and their configs, 😆)  
So you can also check the code and references to learn how to build your own tool kit. 🖖

---

## ⭐️ Main Features Supported

Includes:

- Bundling (rollup)
- Auto ESlint (with husky)
- Auto Prettier (with husky)

---

## 📦 Getting Started

`git clone https://github.com/seognil-lab/lib-starter`

`npm install`

**!! MUST !!**

update the `publishConfig` and `name` (also `author` and `homepage` and more) in `package.json`

update `git remote`
update the `LICENSE` file
update the `readme.md`

---

## ⌨️ Coding

### Develop the lib package

Write code and test in `/src` and `/test`

There are six `npm scripts` for developing,  
check that in `package.json`.

- build
- build:watch
- test
- test:watch
- format
- format:watch

### Git Commit

`git cz` (`cz-cli`) is recommended.

### For publish, see the next section

---

## 📦 Publishing

### NPM Entry Point

there are two fields in `package.json`

- main: cmd (module.exports), normal npm entry point
- module: esm (import/export), supported by rollup/webpack

### Publish the package

I personally use `np` for releasing a version to github and npm.  
(Or your can just follow the default `git push && npm pulish` way)  
It's not perfect (such as bumping message unmodifiable and no changelog).  
but good enough to use simply.

it will run these in order

- **build** source code
- **test** built code (for release)
- **bump version**
- **eslint** the staged files
- **prettier** the staged files
- **publish** to github and npm (your seeting registry)

(Notice that this starter self **will not** bump the version or publish to npm,  
Because it's not a package!  
maybe I'd make a cli for starter later...)

### Dependencies And Files

( Simply marked up )  
( `+` for dependencies )  
( `[[]]` for files )

```bash
+ eslint
+ lint-staged # run eslint for staged files
[[.eslintrc.js]]
[[.eslintignore]]

+ prettier
+ pretty-quick # run prettier for staged files
[[.prettierrc.js]]
[[.prettierignore]]

+ jest/mocha/chai # test tools

+ rollup
+ rollup-plugin-terser # uglify
[[rollup.config.js]]

+ babel # parse 'import' for jest and eslint
[[.babelrc.js]]

+ husky # git hooks, run scripts before commit

# npm global installed tools (optional)
+ np/standard-version/release-it # bump version tools
+ cz-cli # git cz
+ generate-license # MIT and more
+ verdaccio # private npm registry

[[.gitignore]] # generate by gi
[[.npmignore]] # now only include dist/built (cjs) & src (esm) files
```

---

## 📜 References

Verdaccio - A lightweight private npm proxy registry - https://verdaccio.org/

gi - https://docs.gitignore.io/install/command-line  
generate-license - https://github.com/generate/generate-license

Semantic Versioning - http://semver.org  
Conventional Commits - https://conventionalcommits.org  
cz-cli - https://github.com/commitizen/cz-cli  
np && standard-version - https://github.com/sindresorhus/np/pull/344

Configuring ESLint - https://eslint.org/docs/user-guide/configuring  
Prettier Options - https://prettier.io/docs/en/options.html  
rollup output-format - https://rollupjs.org/guide/en/#output-format

Package.json package-bundlers - https://github.com/stereobooster/package.json#package-bundlers  
glob syntax - https://github.com/isaacs/node-glob/blob/master/README.md#glob-primer

Node.js — How to test your new NPM module without publishing it every 5 minutes - https://medium.com/@the1mills/how-to-test-your-npm-module-without-publishing-it-every-5-minutes-1c4cb4b369be

typescript-library-starter - https://github.com/alexjoverm/typescript-library-starter

README-Template.md - https://gist.github.com/PurpleBooth/109311bb0361f32d87a2

---

## 🕗 TODO

- [ ] config optimization
- [ ] stylelint for css files
- [ ] tslint for ts files
- [ ] test（mocha case / coverage）
- [ ] changelog with np
