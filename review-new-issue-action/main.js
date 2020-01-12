const core = require('@actions/core');
const github = require('@actions/github');

try {
  console.log('Review New Issue: active!');

  const myToken = core.getInput('myToken');
  const octokit = new github.GitHub(myToken);
  const issue = github.context.payload.issue;
  console.log(`issue info: ${JSON.stringify(issue)}`);
  const issueId = github.context.payload.issue.id;

  octokit.issues.createComment({
    ...github.context.repo,
    issue_id: issueId,
    body: "*I see you*"
  });

} catch(error) {
  core.setFailed(error.message);
}

