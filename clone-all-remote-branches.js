const shell = require("shelljs");
const argv = require("minimist")(process.argv.slice(2));

if (
  !argv.u ||
  !argv.n ||
  !argv.o ||
  typeof argv.u !== "string" ||
  typeof argv.n !== "string" ||
  typeof argv.o !== "string"
) {
  console.log(
    "Usage: clone-all-branches.sh -u <repo url> -n <repo name> -o <output dir>"
  );
  console.log("Example:");
  console.log(
    "checkout-all-branches.sh -u https://github.com/nanohop/RestaurantReview.git -n RestaurantReview -o /home/tom/Desktop/egghead/react-native/RestaurantReview/"
  );
  process.exit(1);
}

const repoUrl = argv.u;
var repoParentDir = argv.o;
const repoName = argv.n;

// debugger;

shell.mkdir("-p", repoParentDir);
shell.cd(repoParentDir);
shell.exec(`git clone ${repoUrl} ${repoName}`);
shell.cd(repoName);
// probably not needed
// shell.exec("git fetch");

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
