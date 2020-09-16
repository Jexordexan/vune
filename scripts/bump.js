var conventionalRecommendedBump = require('conventional-recommended-bump');

conventionalRecommendedBump(
  {
    preset: 'angular',
  },
  function (err, result) {
    console.log(result.releaseType);
  }
);
