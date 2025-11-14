// bot.js - GitHub Release Notifier (Stable CommonJS, PM2 kompatibilis)

const fs = require('fs');
const fetch = require('node-fetch'); // node-fetch v2 szükséges

// Webhook URL
const WEBHOOK_URL = "YOUR-DISCROD-WEBHOOK-URL";

// GitHub repositories to monitor
const REPOS = [
  "YOUR-REPO1", // No url needed, just author/reponame
  "YOUR-REPO2"
];

// Storage file for last checked versions
const DATA_FILE = "last_releases.json";
let lastReleases = {};

if (fs.existsSync(DATA_FILE)) {
  lastReleases = JSON.parse(fs.readFileSync(DATA_FILE));
}

async function checkRepo(repo) {
  try {
    const response = await fetch(`https://api.github.com/repos/${repo}/releases/latest`);
    if (!response.ok) return;
    const data = await response.json();
    const latestTag = data.tag_name;
    if (!latestTag) return;

    if (lastReleases[repo] !== latestTag) {
      await sendDiscordNotification(repo, data);
      lastReleases[repo] = latestTag;
      fs.writeFileSync(DATA_FILE, JSON.stringify(lastReleases, null, 2));
    }
  } catch (err) {
    console.error(`Error checking ${repo}:`, err);
  }
}

async function sendDiscordNotification(repo, release) {
  const payload = {
    username: "Github",
    embeds: [
      {
        title: `🆕 New Release: ${release.name || release.tag_name}`,
        url: release.html_url,
        description: `Repo: **${repo}**`,
        color: 16750848,
        fields: [
          {
            name: "Changelog",
            value: release.body ? release.body.substring(0, 1024) : "(nincs leírás)"
          }
        ],
        timestamp: new Date()
      }
    ]
  };

  try {
    await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    console.log(`Notification sent for ${repo}`);
  } catch (err) {
    console.error(`Error sending Discord notification for ${repo}:`, err);
  }
}

async function checkAll() {
  console.log("Checking repositories...");
  for (const repo of REPOS) {
    await checkRepo(repo);
  }
}

// Run every 5 minutes
setInterval(checkAll, 1000 * 60 * 5);
checkAll();
