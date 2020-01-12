const core = require('@actions/core');
const github = require('@actions/github');

try {
  console.log('Review New Issue: active!');
  const context = JSON.stringify(github.context);
  console.log(`actor: ${context['actor']}`);
} catch(error) {
  core.setFailed(error.message);
}

