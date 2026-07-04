# 🎭 Emotion Tracker

A beautiful web application to log your mood and get personalized song recommendations across different music genres (Bollywood, Hollywood, Lollywood).

## ✨ Features

- **Mood Logging** - Track 6 different emotions: Happy, Calm, Sad, Anxious, Angry, Excited
- **Smart Song Suggestions** - Get recommendations from 3 music genres for each mood
- **Music Integration** - Click to play suggested songs directly on YouTube
- **Mood History** - View all your past mood entries with timestamps
- **Data Persistence** - Entries saved locally in your browser
- **Responsive Design** - Works beautifully on desktop, tablet, and mobile
- **Dark Theme UI** - Easy on the eyes with a modern dark interface
- **Accessible** - Full keyboard navigation and screen reader support

## 🚀 How to Run

### Option 1: VS Code Debug (Recommended)
1. Open the project in VS Code
2. Press `F5` or go to **Run → Start Debugging**
3. Select **"Launch App in Browser"**
4. The app opens automatically in your default browser

### Option 2: Use Python HTTP Server
```bash
cd app
python -m http.server 8000
```
Then visit: `http://localhost:8000/`

### Option 3: Use Node.js HTTP Server
```bash
npx http-server app -p 8000
```
Then visit: `http://localhost:8000/`

### Option 4: Direct File Open
- Double-click `app/index.html` to open in your default browser

## 📝 How to Use

1. **Select a Mood** - Choose from the dropdown menu
2. **View Suggestions** - See recommended songs from each genre
3. **Play a Song** - Click any "Play" button to open the song on YouTube
4. **Save Entry** - Click "Save entry" to record this mood
5. **View History** - See all past entries on the right side
6. **Clear History** - Click "Clear history" to delete all entries

## 📁 Project Structure

```
app/
├── index.html    - Main HTML interface
├── script.js     - Application logic & interactivity
└── styles.css    - Styling and responsive design
```

## 🛠️ Technologies Used

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with grid & flexbox
- **JavaScript (ES6+)** - Interactive functionality
- **LocalStorage API** - Data persistence
- **YouTube API** - Integration for music playback

## 💾 Data Storage

- All mood entries are saved in your browser's LocalStorage
- No data is sent to any server
- Clear your browser data to delete entries
- Each entry includes: mood, suggested song, and timestamp

## 🎯 Mood-to-Song Database

### Happy
- Bollywood: Rick Roll
- Hollywood: Happy (Pharrell Williams)
- Lollywood: Pasoori (Coke Studio)

### Calm
- Bollywood: Tum Hi Ho (Aashiqui 2)
- Hollywood: Shape of You (Ed Sheeran)
- Lollywood: Ko Ko Korina

### Sad
- Bollywood: Tera Hawale (Phantom)
- Hollywood: Love Story (Taylor Swift)
- Lollywood: Humsafar (Bilal Saeed)

### Anxious
- Bollywood: Khairiyat (Chhichhore)
- Hollywood: Breathe Me (Sia)
- Lollywood: Pasoori (Coke Studio)

### Angry
- Bollywood: Malhari (Bajirao Mastani)
- Hollywood: Eye of the Tiger (Survivor)
- Lollywood: Humsafar (Bilal Saeed)

### Excited
- Bollywood: Kesariya (Brahmāstra)
- Hollywood: See You Again (Wiz Khalifa)
- Lollywood: Pasoori (Coke Studio)

## 🎨 Design Highlights

- **Dark Theme** - Reduces eye strain
- **Modern Gradients** - Visual appeal with radial gradients
- **Smooth Animations** - Hover effects on buttons
- **Grid Layout** - Two-column responsive design
- **Accessibility-First** - ARIA labels and semantic HTML

## 📱 Browser Compatibility

- ✅ Chrome/Chromium
- ✅ Firefox
- ✅ Safari
- ✅ Edge
- ✅ Mobile browsers

## 📝 Notes

- Songs open in a new YouTube tab for playback
- Mood entries are timestamped automatically
- Each mood stores only one default song in the entry (Bollywood)
- The app works offline (except for YouTube playback links)

## 📄 License

Free to use and modify.

---

**Enjoy tracking your emotions and discovering new music! 🎵**
