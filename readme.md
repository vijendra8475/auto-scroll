<h1 align="center">🎬 Auto Reels Player – Chrome Extension</h1>

<p align="center">
  <b>A lightweight Chrome Extension that automatically scrolls Instagram Reels, keeps them playing in background, and includes an ON/OFF toggle for full control.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-1.6-blue?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" />
</p>

---

## 🌟 Overview

**Auto Reels Player** enhances your Instagram Reels experience by automating playback.  
It auto-scrolls to the next reel once one finishes and continues playing even when the browser tab is minimized.  
You can easily control the behavior with a floating **ON/OFF toggle button** that remembers your last setting.

---

## 🚀 Features

✅ **Auto-Scroll to Next Reel** – Seamlessly plays through reels without manual scrolling.  
🧠 **Background Playback** – Keeps reels running even when switching tabs or minimizing Chrome.  
🎚️ **Floating Toggle Button** – Turn automation ON/OFF anytime without reloading the page.  
💾 **Persistent State** – Remembers your toggle choice using Chrome Storage API.  
🧩 **Full Compatibility** – Works on both **Reels Feed** and **Saved Collections**.  
🔒 **Privacy-Friendly** – No tracking, no data collection, only uses local storage.  

---

## 🛠️ How It Works

1. When you open **Instagram Reels**, the extension automatically injects a script into the page.
2. It observes the active `<video>` element using:
   - `IntersectionObserver` (to detect visible reels)
   - `MutationObserver` (to handle dynamically loaded reels)
3. When a reel finishes playing:
   - It scrolls to or navigates to the next reel automatically.
4. A pink floating button (`Auto Scroll: ON/OFF`) appears at the bottom-right corner for control.
5. It overrides `document.visibilityState` to prevent Instagram from pausing playback when backgrounded.

---

## 🧩 Installation (Manual / Local)

You can install **Auto Reels Player** manually in Chrome in just a few steps 👇

### 1️⃣ Download or Clone this Repository
```bash
git clone https://github.com/yourusername/auto-reels-extension.git
2️⃣ Open Chrome Extensions Page
Visit → chrome://extensions/

Turn Developer Mode ON (top-right switch)

3️⃣ Load the Extension
Click Load Unpacked

Select your project folder (the one containing manifest.json)

4️⃣ Open Instagram
Go to https://www.instagram.com/reels/

Start watching — the extension takes care of the rest 🎥

⚙️ Project Structure
bash
Copy code
auto-reels-extension/
├── manifest.json        # Chrome extension config
├── background.js        # Handles install events/logs
├── content.js           # Main logic (auto-scroll, toggle, observers)
├── icon.png             # Extension icon (48x48)
└── README.md            # Project documentation
💡 Usage Guide
Open Instagram Reels or Saved Reels Collection.

A pink button labeled Auto Scroll: ON will appear at the bottom-right corner.

Click it anytime to toggle between ON/OFF modes.

When ON:

The extension will automatically move to the next reel once the current one ends.

Reels keep playing even when minimized or inactive.

When OFF:

Everything behaves normally (manual scrolling).

🧠 Tech Stack & Concepts
Feature	Technology / API Used
Browser Extension	Chrome Manifest V3
Scripting	Vanilla JavaScript
Video Detection	IntersectionObserver
Dynamic DOM Handling	MutationObserver
Background Playback	document.visibilityState override
Data Persistence	Chrome Storage API
UI	Custom HTML Button + Inline CSS

🧾 Permissions Used
json
Copy code
"permissions": ["storage"]
✅ Used only for saving your toggle ON/OFF preference.
🚫 No external APIs, no tracking, and no personal data collection.

🧠 Key Learnings
Through this project, I learned how to:

Interact with modern web apps (like Instagram’s dynamic React DOM)

Control video playback and detect active elements efficiently

Override browser visibility events safely

Build modular, lightweight Chrome extensions using Manifest V3

Create persistent, interactive UI elements inside content scripts

👨‍💻 Author
Vijendra Chandra
💼 Developer | Builder | Tech Enthusiast
📧 [your-email@example.com]
🔗 LinkedIn Profile

📜 License
This project is licensed under the MIT License — feel free to use, modify, and share.
If you use or improve this project, a small credit mention would be appreciated ❤️

🌈 Future Improvements
✨ Add playback speed control (1x, 1.25x, 1.5x)
✨ Add custom delay before moving to next reel
✨ Add analytics (number of reels watched, total watch time)
✨ Add Edge & Firefox compatibility

🧠 Example Screenshots
Feature	Screenshot
Toggle Button	(Screenshot showing the pink ON/OFF button at bottom-right)
Auto Scroll	(Screenshot showing reel switching automatically)

⭐ Support & Feedback
If you found Auto Reels Player useful:

⭐ Star this repository

💬 Share your feedback or feature ideas on LinkedIn

🚀 Spread the word — let more people enjoy hands-free reels!

<p align="center">🎬 <b>Auto Reels Player – Scroll Less, Watch More!</b> 🚀</p> ```