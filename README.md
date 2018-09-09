# testcafe-reporter-st-minimal

This is the **st-minimal** reporter plugin for [TestCafe](http://devexpress.github.io/testcafe).

## Install

This reporter isn't shipped with TestCafe by default. In most cases, you need to install it separately.

However, if you need to install this reporter, you can use the following command.

```
npm install testcafe-reporter-st-minimal
```

## Usage

When you run tests from the command line, specify the reporter name by using the `--reporter` option:

```
testcafe chrome 'path/to/test/file.js' --reporter st-minimal
```


When you use API, pass the reporter name to the `reporter()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('chrome')
    .reporter('st-minimal') // <-
    .run();
``` 


