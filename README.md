# Github-Releases-Discord-Alerts
Linux JS Script for getting notifications on Discord when a specific github repository drops a new release

# ⚙️ Install Dependencies  

## 🔧 NodeJS / npm

```bash
mkdir -p /home/discord-bots
cd /home/discord-bots

sudo apt install nodejs npm
```

## 🔧 PM2

```bash
sudo npm install -g pm2
```

## 🔧 Node-fetch module

```bash
npm install node-fetch@2
```  

# ⚙️ Create and edit the script

```bash
cd /home/discord-bots

nano github.js
```

Paste the script from here:  
https://github.com/seeuinhell95/Github-Releases-Discord-Alerts/blob/main/github.js

Add your discord webhook here:  

```bash
// Webhook URL
const WEBHOOK_URL = "YOUR-DISCROD-WEBHOOK-URL";
```

Add Github repositories you want to get notifications when a new release has been dropped:  

```bash
// GitHub repositories to monitor
const REPOS = [
  "YOUR-REPO1", // No url needed, just author/reponame
  "YOUR-REPO2"
];
```

# ⚙️ Start the Bot with pm2  
```bash
cd /home/discord-bots
pm2 start github.js --name github-release-bot

# Check if its online:
pm2 list

# You should see something like this:
┌─────┬─────────────────────┬────┬──────┬────────┬──────┬────────┐
│ id  │ name                │... │status│ cpu    │ mem  │ ...    │
├─────┼─────────────────────┼────┼──────┼────────┼──────┼────────┤
│ 0   │ github-release-bot  │... │online│ 0%     │ 30MB │ ...    │
└─────┴─────────────────────┴────┴──────┴────────┴──────┴────────┘
```  
