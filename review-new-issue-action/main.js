const core = require('@actions/core');
const github = require('@actions/github');

try {
  console.log('Review New Issue: active!');
  const payload = JSON.stringify(github.context.payload);
  console.log(`payload: ${payload}`);
  const actor = github.context.payload.issue.user.login;
  console.log(`actor: ${actor}`);

  const myToken = core.getInput('myToken');
  const octokit = new github.GitHub(myToken);
  console.log(`result of getting context.repo: ${JSON.stringify(github.context.repo)}`);
  // octokit.issues.createComment({
  //     github.context.repo.owner,
  //     repo,
  //     issue_number,
  //     body
  // })
} catch(error) {
  core.setFailed(error.message);
}

