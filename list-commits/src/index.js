const core = require('@actions/core');
const github = require('@actions/github');

async function run() {
  try {
    const token = core.getInput('token');
    const octokit = github.getOctokit(token);
    const { owner, repo } = github.context.repo;

    core.info('Fetching commits...');
    
    const commits = await octokit.paginate(
      octokit.rest.repos.listCommits,
      {
        owner,
        repo,
        per_page: 100
      }
    );

    core.info(commits);
    core.info(`Total commits found: ${commits.length}`);
    const commitShas = commits.map(commit => commit.sha);
    core.setOutput('commits', JSON.stringify(commitShas));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
