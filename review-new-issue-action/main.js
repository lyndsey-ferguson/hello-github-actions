const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    console.log('Review New Issue: active!');
  
    const myToken = core.getInput('repo-token');
    const octokit = new github.GitHub(myToken);
    const issue = github.context.payload.issue;
    const issueNumber = issue.number;
  
    const issueBody = issue.body;
    const isSupportQuestion = issueBody.includes('### Question Checklist');
    const supportQuestionLabelString = ':question: Question'
    if (isSupportQuestion) {
      let supportQuestionLabel = null
      octokit.issues.getLabel({
        ...github.context.repo,
        name: supportQuestionLabelString
      }).then(({data, headers, status}) => {
        // handle data
        console.log(`getLabel data: ${data}`);
      }).catch(err => {
        if (err.status === 404) {
          octokit.issues.createLabel({
            ...github.context.repo,
            name: supportQuestionLabelString,
            color: 'ad751e'
          });
        } else {
          console.log(err);
        }
      });
    }

    octokit.issues.addLabels({
        ...github.context.repo,
        issue_number: issueNumber,
        labels: [supportQuestionLabelString]
    });

    console.log(`issueBody: ${issueBody}`);

    octokit.issues.createComment({
      ...github.context.repo,
      issue_number: issueNumber,
      body: "*I see you*"
    }).then(({ data, headers, status }) => {
      // handle data
    }).catch(err => {
      console.log(err)
    });
  
  } catch(error) {
    core.setFailed(error.message);
  }
}

run();
