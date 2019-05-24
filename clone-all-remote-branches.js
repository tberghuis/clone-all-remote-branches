const shell = require("shelljs");

// const repoUrl = "https://github.com/kentcdodds/react-github-profile";
// var repoParentDir = "/home/tom/tmp/checkout-all-branches/";
// const repoName = "react-github-profile";
const repoUrl = "https://github.com/nanohop/RestaurantReview.git";
var repoParentDir = "/home/tom/Desktop/egghead/react-native/RestaurantReview/";
const repoName = "RestaurantReview";

// debugger;

shell.mkdir("-p", repoParentDir);
shell.cd(repoParentDir);
// i should probably only clone depth 1
shell.exec(`git clone ${repoUrl} ${repoName}`);
shell.cd(repoName);
// probably not needed
shell.exec("git fetch");

// cant use const in debugger mode
var branches = shell
  .exec("git branch -a")
  .stdout.split("\n")
  .map(line => line.trim())
  .filter(
    line =>
      line.startsWith("remotes/origin/") &&
      !line.startsWith("remotes/origin/HEAD")
  )
  .map(line => line.replace("remotes/origin/", ""));

branches.forEach(function(branch) {
  shell.cd(repoParentDir);
  shell.mkdir("-p", `branches/${branch}`);
  shell.cd(`${repoParentDir}/branches/${branch}`);
  shell.exec(`git clone --depth 1  --branch ${branch} ${repoUrl} ${repoName}`);
});

console.log("done");
