const core = require('@actions/core');
const github = require('@actions/github');

try {
  console.log('Review New Issue: active!');
  const payload = github.context.payload;
  console.log(`payload: ${payload}`);
  const actor = github.context.payload.actor;
  console.log(`actor: ${actor}`);
} catch(error) {
  core.setFailed(error.message);
}

