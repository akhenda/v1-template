# Commitlint & Semantic Release

## Commitlint CZ-Git Config

### Setup OpenAI token

1. <https://platform.openai.com/account/api-keys>
   Login and create your API secret key, which usually starts with sk-
2. Run command `npx czg --api-key=<API secret key>` and input your key to setup your token save to local

```sh
npx czg --api-key=sk-xxxxx
```

## Semantic Release

### Usage on a Project

In order to release a project, add a `realese.config.mjs` file to the project. Bare minimal configuration looks like this:

```cjs
const baseConfig = require('@v1/release');
const pkg = require('./package.json');

const config = baseConfig(pkg.name);

/**
 * @type {import('semantic-release').GlobalConfig}
 */
module.exports = config;
```

You should also install `semantic-release` and `semantic-release-monorepo` in the project by running:

```sh
bun add -D semantic-release semantic-release-monorepo
```

Update the project's `package.json` with the following:

```json
{
  "scripts": {
    ...
    "release": "semantic-release",
    ...
  },
  "dependencies": {
    ...
    "@v1/release": "workspace:*",
    ...
  }
}
```

> Hint: You can also use the generator `generator command here` to generate this configuration.

### Skipping commits

You can skip commits for given projects using `[skip $PROJECT_NAME]` in its body. Ex:

```txt
  feat: update something

  [skip my-app1]
  [skip my-app2]
```

During analysis this commit will be skipped for release pipeline for `my-app1`, `my-app2`.
You can also use `[skip all]` to skip commit for all projects or **one single** `[skip my-app1, my-app2]` to skip commits related to `my-app1`, `my-app2` at once.

---

Alternatively you can include only particular projects in given commit by using `[only $PROJECT_NAME]`. Ex:

```txt
  feat: update something

  [only my-app1]
  [only my-app2]
```

During analysis this commit will be included only for release pipeline for `my-app`, `my-app2`.
You can also use **one single** `[skip my-app1, my-app2]` to skip commits related to `my-app1`, `my-app2` at once.
