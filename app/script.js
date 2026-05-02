// Emotion Tracker Application

// Import and initialize Vercel Speed Insights
import { injectSpeedInsights } from '@vercel/speed-insights';

// Initialize Speed Insights
injectSpeedInsights({
  debug: true, // Enable debug mode in development
});

// Mood to song mappings
const moodSongMap = {
  happy: {
    bollywood: 'Tum Hi Ho - Aashiqui 2',
    hollywood: 'Happy - Pharrell Williams',
    lollywood: 'Larsha Pekhawar Ta - Gul Panra'
  },
  calm: {
    bollywood: 'Jeena Jeena - Badlapur',
    hollywood: 'Weightless - Marconi Union',
    lollywood: 'Sajna Door - Hadiqa Kiani'
  },
  sad: {
    bollywood: 'Kabhi Kabhi Aditi - Jaane Tu Ya Jaane Na',
    hollywood: 'Someone Like You - Adele',
    lollywood: 'Akhiyan Udeek Diyan - Shazia Manzoor'
  },
  anxious: {
    bollywood: 'Zara Zara - Rehnaa Hai Terre Dil Mein',
    hollywood: 'Breathe Me - Sia',
    lollywood: 'Mahi Ve - Nusrat Fateh Ali Khan'
  },
  angry: {
    bollywood: 'Maula Mere Maula - Anwar',
    hollywood: 'In the End - Linkin Park',
    lollywood: 'Dil Dil Pakistan - Vital Signs'
  },
  excited: {
    bollywood: 'Jai Ho - Slumdog Millionaire',
    hollywood: 'Can\'t Stop the Feeling - Justin Timberlake',
    lollywood: 'Dosti - Junoon'
  }
};

// Sample YouTube video IDs (you can replace with actual IDs)
const moodYoutubeMap = {
  happy: {
    bollywood: 'IJq0yyWug1k',
    hollywood: 'ZbZSe6N_BXs',
    lollywood: 'dQw4w9WgXcQ'
  },
  calm: {
    bollywood: 'EvKh7-PXR5M',
    hollywood: 'NMWWHXb3awM',
    lollywood: 'dQw4w9WgXcQ'
  },
  sad: {
    bollywood: 'sH7baAvdVMY',
    hollywood: 'hLQl3WQQoQ0',
    lollywood: 'dQw4w9WgXcQ'
  },
  anxious: {
    bollywood: 'h-C8jhfXUdg',
    hollywood: 'SFGvmrJ5rjM',
    lollywood: 'dQw4w9WgXcQ'
  },
  angry: {
    bollywood: '2gT9xS_9O44',
    hollywood: 'eVTXPUF4Oz4',
    lollywood: 'dQw4w9WgXcQ'
  },
  excited: {
    bollywood: 'gfSQ3YU1B2Y',
    hollywood: 'ru0K8uYEZWw',
    lollywood: 'dQw4w9WgXcQ'
  }
};

// Get DOM elements
const moodSelect = document.getElementById('mood');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const entriesDiv = document.getElementById('entries');
const entryCountP = document.getElementById('entryCount');
const suggestedBollywoodSong = document.getElementById('suggestedBollywoodSong');
const suggestedHollywoodSong = document.getElementById('suggestedHollywoodSong');
const suggestedLollywoodSong = document.getElementById('suggestedLollywoodSong');
const playBtn = document.getElementById('playBtn');
const playBollywoodBtn = document.getElementById('playBollywoodBtn');
const playHollywoodBtn = document.getElementById('playHollywoodBtn');
const playLollywoodBtn = document.getElementById('playLollywoodBtn');
const youtubePlayer = document.getElementById('youtubePlayer');
const currentTrackLabel = document.getElementById('currentTrackLabel');

let currentMood = 'happy';

// Update song suggestions when mood changes
moodSelect.addEventListener('change', (e) => {
  currentMood = e.target.value;
  updateSongSuggestions(currentMood);
});

function updateSongSuggestions(mood) {
  const songs = moodSongMap[mood];
  suggestedBollywoodSong.textContent = songs.bollywood;
  suggestedHollywoodSong.textContent = songs.hollywood;
  suggestedLollywoodSong.textContent = songs.lollywood;
}

// Play song functions
playBtn.addEventListener('click', () => playSong(currentMood, 'bollywood'));
playBollywoodBtn.addEventListener('click', () => playSong(currentMood, 'bollywood'));
playHollywoodBtn.addEventListener('click', () => playSong(currentMood, 'hollywood'));
playLollywoodBtn.addEventListener('click', () => playSong(currentMood, 'lollywood'));

function playSong(mood, category) {
  const videoId = moodYoutubeMap[mood][category];
  const songName = moodSongMap[mood][category];
  youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  currentTrackLabel.textContent = `Now playing: ${songName}`;
}

// Save mood entry
saveBtn.addEventListener('click', () => {
  const now = new Date();
  const entry = {
    mood: currentMood,
    timestamp: now.toISOString(),
    song: moodSongMap[currentMood].bollywood
  };
  
  let entries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
  entries.push(entry);
  localStorage.setItem('moodEntries', JSON.stringify(entries));
  
  renderEntries();
});

// Clear history
clearBtn.addEventListener('click', () => {
  if (confirm('Are you sure you want to clear all mood history?')) {
    localStorage.removeItem('moodEntries');
    renderEntries();
  }
});

// Render entries from localStorage
function renderEntries() {
  const entries = JSON.parse(localStorage.getItem('moodEntries') || '[]');
  
  if (entries.length === 0) {
    entryCountP.textContent = 'No entries yet.';
    entriesDiv.innerHTML = '';
    return;
  }
  
  entryCountP.textContent = `${entries.length} ${entries.length === 1 ? 'entry' : 'entries'}`;
  
  entriesDiv.innerHTML = entries.reverse().map(entry => {
    const date = new Date(entry.timestamp);
    return `
      <div class="entry">
        <div class="entry-mood">${entry.mood}</div>
        <div class="entry-details">
          <div class="entry-song">${entry.song}</div>
          <div class="entry-time">${date.toLocaleString()}</div>
        </div>
      </div>
    `;
  }).join('');
}

// Initialize
updateSongSuggestions(currentMood);
renderEntries();
