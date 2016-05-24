---
layout: default
title:  "Javascript Class Export Patterns"
author: "Andrew Stelmach"
date: 2016-05-24
categories: javascript, express, mocha, chai, testing
---

An export/import pattern for ES6 that allows for easy testing and stubbing of (injected) dependencies with a neat use of curly-braces when importing into a test file.

featureSwitches.js:

{% highlight js linenos %}

export class FeatureSwitches {
  constructor(switchesFile = "./feature-switches.json") {
    this.switches = JSON.parse(fs.readFileSync(switchesFile));
  }

  isOn(switchName) {
    const env = process.env.NODE_ENV;

    if (this.switches.hasOwnProperty(env) && this.switches[env].hasOwnProperty(switchName)) {
      return this.switches[env][switchName];
    } else {
      return true;
    }
  }

  isOff(switchName) {
    return !this.isOn(switchName);
  }
}

export default new FeatureSwitches();

{% endhighlight %}

Line 21 allows the opportunity to `import` a new _instance_ of FeatureSwitches, like so:

app.js:
{% highlight js linenos %}
...
import FeatureSwitches from "../helpers/featureSwitches";
...

function createApp() {
  const app = express();
  ...
  if (FeatureSwitches.isOn("apiTokenEnforcer")) {
    app.use(apiTokenEnforcer());
  }
  ...
  return app;
}

export default createApp;
{% endhighlight %}

`apiTokenEnforcer` is essentially a piece of middleware.

NB on line 2 the instance of `featureSwitches` is assigned to `FeatureSwitches`. However, you could call it whatever you like eg `import AnyName from "../helpers/featureSwitches";`

`console.log(process.cwd)` is useful for ascertaining what relative paths you need.

feature-switches.json:
{% highlight json %}
{
  "development": {
    "apiTokenEnforcer": false
  },
  "integration": {
    "apiTokenEnforcer": false
  },
  "production": {
    "apiTokenEnforcer": true
  }
}
{% endhighlight %}

This allowed us to include or omit ('turn on' or 'turn off') sections of code at will to control what is run in different environments.

`const` is immutable and block-scoped

`let` is mutable and block-scoped

`var` is mutable and function-scoped

Everything should generally be assigned to `const` in ES6 unless you're planning to mutate the variable.

## Tests

test/helpers/featureSwitches.js:
{% highlight js linenos %}
import { expect } from "chai";
import { FeatureSwitches } from "../../helpers/feature_switches";
...

let environment;

const changeEnv = function changeEnv(newEnv) {
  environment = process.env.NODE_ENV;
  process.env.NODE_ENV = newEnv;
};

const restoreEnv = function restoreEnv() {
  process.env.NODE_ENV = environment;
};

describe("Feature Switches", () => {
  describe('when in development environment', () => {
    before(() => { changeEnv("development"); });
    after(restoreEnv);
    const featureSwitches = new FeatureSwitches('./fixtures/feature-switches/testFixture');

    it('a development-only feature is switched on', () => {
      expect(featureSwitches.isOn("devOnlyFeature")).to.be.true;
      expect(featureSwitches.isOff("devOnlyFeature")).to.be.false;
    });

    it('a production-only feature is switched off', () => {
      expect(featureSwitches.isOn("prodOnlyFeature")).to.be.false;
      expect(featureSwitches.isOff("prodOnlyFeature")).to.be.true;
    });
    ...
  });

  describe('when in production environment', () => {
    before(() => { changeEnv("production"); });
    after(restoreEnv);
    const featureSwitches = new FeatureSwitches('./fixtures/feature-switches/testFixture');

    it('a production-only feature is switched on', () => {
      expect(featureSwitches.isOn("prodOnlyFeature")).to.be.true;
      expect(featureSwitches.isOff("prodOnlyFeature")).to.be.false;
    });

    it('a development-only feature is switched off', () => {
      expect(featureSwitches.isOn("devOnlyFeature")).to.be.false;
      expect(featureSwitches.isOff("devOnlyFeature")).to.be.true;
    });
    ...
  });
});
{% endhighlight %}

testFixture.js:
{% highlight json %}
{
  "development": {
    "devOnlyFeature": true,
    "prodOnlyFeature": false
  },
  "production": {
    "devOnlyFeature": false,
    "prodOnlyFeature": true
  }
}
{% endhighlight %}

## Key Points

Line 2, by using curly braces `{}`, imports the class name itself so you then have to create a new instance of it (as on Line 6).

Without the curly braces (as on line 2 of app.js), a new instance is created with the default json already having been passed in. This would make it impossible to pass in a different json file for the purpose of our test (line 20). Using this `{}` technique solved this problem nicely.

It was also very difficult to stub the feature-switches.js without injecting it as a dependency (`featureSwitches.js`, line 2) as opposed to having it sat inside the class as a dependency - a good example of how [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection) makes your code easier to work with (amongst other benefits).
