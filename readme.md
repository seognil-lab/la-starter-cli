## 🛠️ What is this

A CLI to start a new project.

Appreciate to [vue-cli](https://github.com/vuejs/vue-cli).

---

## ⭐️ Provides

Make life easier :)

- Download project boilerplate
- Generate LICENSE and readme
- Update package.json
- npm and git init

---

## 📦 Getting Started

```bash
# install
npm i -g @seognil-lab/la-starter-cli

# command name
lcli -v
lcli --help

# create a new project
lcli create project-name

```

Don't forget to update `readme.md` and `package.json` of your project.

---

## 📜 References

[vue-cli](https://github.com/vuejs/vue-cli)

It would be better to tweak the official npm global config first.  
[Setting Global NPM Defaults for Quick-starting New Projects](https://codeburst.io/setting-global-npm-defaults-for-quick-starting-new-projects-ed06ed22edb3)  
Because these values would be used to update the `package.json` of the new project

- init-author-name
- init-version
- init-license

<br>

About my starters  
[webpack-starter](https://github.com/seognil-lab/webpack-starter)  
[lib-starter](https://github.com/seognil-lab/lib-starter)

---

## 🕗 TODO

- [ ] Refactor cli main code
- [ ] update checker
- [ ] Gen license using `spdx`
- [ ] `~/.lclirc` feature
- [ ] change `publishConfig.registry` command
- [ ] `license` command
- [ ] `readme` command
- [ ] Better readme template for JS project
- [ ] Only merge config files
- [ ] merge like git merge?
