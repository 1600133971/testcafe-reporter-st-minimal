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
    fixtureCount: 0,
    testCount: 0,
    warnings: 0,
    userAgents: null,
    reportTaskStart: function reportTaskStart(startTime, userAgents, testCount) {
      this.startTime = startTime;
      this.fixtureCount = 0;
      this.testCount = testCount;
      this.userAgents = userAgents;
    },
    reportFixtureStart: function reportFixtureStart(name, path) {
      if (this.lastSuiteName) {
        this.fixtureDuration = 0;
      }
      this.lastSuiteName = name;
      this.fixtureTestCount = 0;
      this.fixtureCount++;
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
        return;
      }
      this.write(this.chalk.green('▧'));
      this.fixtureDuration += testRunInfo.durationMs;
    },
    reportTaskDone: function reportTaskDone(endTime, passed, warnings) {
      if (this.lastSuiteName) this.fixtureDuration = 0;
      if (warnings.length) this.warnings = warnings.length;
      this
        .newline()
        .write('| ')
        .write(this.chalk.green('BROWER: ') + this.userAgents).write(' | ')
        .write(this.chalk.green('TESTS: ') + (this.testCount + this.skipped)).write(' | ')
        .write(this.chalk.green('FIXTURES: ') + this.fixtureCount).write(' | ')
        .write(this.chalk.green('DURATION: ') + this.moment.duration(endTime - this.startTime).format('d[d] h[h] mm[m] ss[s] SSS[ms]')).write(' | ')
        .write(this.chalk.green('PASSED: ' + passed)).write(' | ')
        .write(this.failed > 0 ? this.chalk.red('FAILED: ' + this.failed) : this.chalk.green('FAILED: ' + this.failed)).write(' | ')
        .write(this.skipped > 0 ? this.chalk.grey('SKIPPED: ' + this.skipped) : this.chalk.green('SKIPPED: ' + this.skipped)).write(' | ')
        .write(this.warnings > 0 ? this.chalk.yellow('WARNINGS: ' + this.warnings) : this.chalk.green('WARNINGS: ' + this.warnings)).write(' |').newline();
    }
  }
};

var escape = function escape(str) {
  if (!str) return '';
  return str.toString().replace(/\x1B.*?m/g, '').replace(/\|/g, '||').replace(/\n/g, '|n').replace(/\r/g, '|r').replace(/\[/g, '|[').replace(/\]/g, '|]').replace(/\u0085/g, '|x').replace(/\u2028/g, '|l').replace(/\u2029/g, '|p').replace(/'/g, '|\'');
};

module.exports = exports['default'];
