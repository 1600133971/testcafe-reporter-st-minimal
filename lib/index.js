'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

exports['default'] = function () {
  return {
    noColors: false,
    failed: 0,
    skipped: 0,
    lastSuiteName: null,
    startTime: null,
    fixtureTestCount: 0,
    fixtureDuration: 0,
    fixtureName: null,
    fixtureCount: 0,
    testCount: 0,
    fixturePath: null,
    reportTaskStart: function reportTaskStart(startTime, userAgents, testCount) {
      this.startTime = startTime;
      this.fixtureCount = 0;
      this.testCount = testCount;
    },
    reportFixtureStart: function reportFixtureStart(name, path) {
      if (this.lastSuiteName) {
        this.fixtureDuration = 0;
      }
      this.lastSuiteName = name;
      this.fixtureTestCount = 0;
      this.fixtureName = name.split('-')[0].trim();
      this.fixtureCount++;
      this.fixturePath = path;
    },
    reportTestStart: function reportTestStart(name, testRunInfo) {
    },
    reportTestDone: function reportTestDone(name, testRunInfo) {
      this.fixtureTestCount++;
      if (testRunInfo.skipped) {
        this.skipped++;
        return;
      }
      if (testRunInfo.errs && testRunInfo.errs.length > 0) {
        this.failed++;
        this.newline().write(this.chalk.red('[   FAILED ] ' + escape(this.fixtureName) + ' . ' + escape(name))).newline();
        this.renderErrors(name, testRunInfo);
        return;
      }
      this.write(this.chalk.green('▧'));
      this.fixtureDuration += testRunInfo.durationMs;
    },
    reportTaskDone: function reportTaskDone(endTime, passed, warnings) {
      if (this.lastSuiteName) {
        this.fixtureDuration = 0;
      }
      this
        .newline()
        .write('| ')
        .write(this.chalk.green('[ DURATION ] ') + this.moment.duration(endTime - this.startTime).format('d[d] h[h] mm[m] ss[s] SSS[ms]')).write(' | ')
        .write(this.chalk.green('[  PASSED  ] ' + this.stasticTest(passed))).write(' | ')
        .write(this.failed > 0 ? this.chalk.red('[  FAILED  ] ' + this.stasticTest(this.failed)) : this.chalk.green('[  FAILED  ] ' + this.stasticTest(this.failed))).write(' | ')
        .write(this.skipped > 0 ? this.chalk.grey('[ SKIPPED  ] ' + this.stasticTest(this.skipped)) : this.chalk.green('[  SKIPPED ] ' + this.stasticTest(this.skipped))).write(' |');
      if (warnings.length) {
        this.newline().write(this.chalk.yellow('[  WARNING ] ')).newline().setIndent(0).renderWarnings(warnings);
      }
    },
    stasticTest: function stasticNum(num) {
      return num + (num <= 1 ? ' test' : ' tests');
    },
    stasticFixture: function stasticFixture(num) {
      return num + ' test ' + (num <= 1 ? 'fixture' : 'fixtures');
    },
    renderErrors: function renderErrors(name, testRunInfo) {
      var _this = this;
      var errDescriptors = testRunInfo.errs.map(function (err) {
        return {
          err: err,
          testName: name,
          fixtureName: _this.lastSuiteName
        };
      });
      errDescriptors.forEach(function (errDescriptor) {
        _this.useWordWrap(true).newline().write(_this.formatError(errDescriptor.err)).newline().newline();
      });
    },
    renderWarnings: function renderWarnings(warnings) {
      var _this = this;
      this.newline().setIndent(1).write(this.chalk.bold.yellow('Warnings (' + warnings.length + '):')).newline();
      warnings.forEach(function (msg) {
        _this.setIndent(1).write(_this.chalk.bold.yellow('--')).newline().setIndent(2).write(_this.chalk.bold.yellow(msg)).newline();
      });
    }
  }
};

var escape = function escape(str) {
  if (!str) return '';
  return str.toString().replace(/\x1B.*?m/g, '').replace(/\|/g, '||').replace(/\n/g, '|n').replace(/\r/g, '|r').replace(/\[/g, '|[').replace(/\]/g, '|]').replace(/\u0085/g, '|x').replace(/\u2028/g, '|l').replace(/\u2029/g, '|p').replace(/'/g, '|\'');
};

module.exports = exports['default'];
