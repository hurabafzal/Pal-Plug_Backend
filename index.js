import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const filePath = "./data.json";
const git = simpleGit();

async function commitOnce(weeksAgo, dayOffset) {
  const date = moment()
    .subtract(2, "y")
    .add(1, "d")
    .add(weeksAgo, "w")
    .add(dayOffset, "d")
    .format();

  const data = { date };
  await jsonfile.writeFile(filePath, data);

  try {
    await git.add(filePath);
    await git.commit(date, { "--date": date });
    console.log("✅ Commit done:", date);
  } catch (err) {
    console.error("❌ Git commit failed:", err.message);
  }
}

async function makeCommits(n) {
  for (let i = 0; i < n; i++) {
    const x = random.int(0, 54);
    const y = random.int(0, 6);
    await commitOnce(x, y);
  }

  // finally push
  try {
    await git.push("origin", "main"); // change to "master" if that’s your branch
    console.log("🚀 All commits pushed successfully!");
  } catch (err) {
    console.error("❌ Push failed:", err.message);
  }
}

makeCommits(500);
