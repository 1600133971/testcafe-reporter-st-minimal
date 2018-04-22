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
      this.newline();
      this.write('|');
      this.write(this.chalk.green(' BROWER: ') + this.userAgents).write(' |');
      this.write(this.chalk.green(' TESTS: ') + (this.testCount + this.skipped)).write(' |');
      this.write(this.chalk.green(' FIXTURES: ') + this.fixtureCount).write(' |');
      this.write(this.chalk.green(' DURATION: ') + this.moment.duration(endTime - this.startTime).format('d[d] h[h] mm[m] ss[s] SSS[ms]')).write(' |');
      if (passed > 0) this.write(this.chalk.green(' PASSED: ' + passed)).write(' |');
      if (this.failed > 0) this.write(this.chalk.red(' FAILED: ' + this.failed)).write(' |');
      if (this.skipped > 0) this.write(this.chalk.grey(' SKIPPED: ' + this.skipped)).write(' |');
      if (this.warnings > 0)this.write(this.chalk.yellow(' WARNINGS: ' + this.warnings)).write(' |');
      this.newline();
    }
  }
};

module.exports = exports['default'];
