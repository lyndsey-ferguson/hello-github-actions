const core = require('@actions/core');
const github = require('@actions/github');

try {
  console.log('Review New Issue: active!');
  const payload = JSON.stringify(github.context.payload);
  console.log(`payload: ${payload}`);

  const myToken = core.getInput('myToken');
  const octokit = new github.GitHub(myToken);
  const repoOwner = github.context.repo.owner;
  const repoName = github.context.repo.repo;
  const issueId = github.context.payload.issue.id;

  octokit.issues.createComment({
      repoOwner,
      repoName,
      issueId,
      "*I see you*"
  });
} catch(error) {
  core.setFailed(error.message);
}

