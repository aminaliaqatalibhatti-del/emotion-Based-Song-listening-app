const moodSelect = document.getElementById('mood');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const playBtn = document.getElementById('playBtn');
const playBollywoodBtn = document.getElementById('playBollywoodBtn');
const playHollywoodBtn = document.getElementById('playHollywoodBtn');
const playLollywoodBtn = document.getElementById('playLollywoodBtn');
const entriesContainer = document.getElementById('entries');
const entryCount = document.getElementById('entryCount');
const suggestedBollywoodSongEl = document.getElementById('suggestedBollywoodSong');
const suggestedHollywoodSongEl = document.getElementById('suggestedHollywoodSong');
const suggestedLollywoodSongEl = document.getElementById('suggestedLollywoodSong');
const currentTrackLabel = document.getElementById('currentTrackLabel');
const storageKey = 'emotion-tracker-entries';

const thisMoodSongs = {
  happy: {
    bollywood: { name: 'Rick Roll', id: 'dQw4w9WgXcQ' },
    hollywood: { name: 'Happy (Pharrell Williams)', id: 'ZbZSe6N_BXs' },
    lollywood: { name: 'Pasoori (Coke Studio)', id: '5Eqb_-j3FDA' },
  },
  calm: {
    bollywood: { name: 'Tum Hi Ho (Aashiqui 2)', id: 'Umqb9KENgmk' },
    hollywood: { name: 'Shape of You (Ed Sheeran)', id: 'JGwWNGJdvx8' },
    lollywood: { name: 'Ko Ko Korina', id: 'O6WMef5erS8' },
  },
  sad: {
    bollywood: { name: 'Tera Hawale (Phantom)', id: 'KUpwupYj_tY' },
    hollywood: { name: 'Love Story (Taylor Swift)', id: '8xg3vE8Ie_E' },
    lollywood: { name: 'Humsafar (Bilal Saeed)', id: 'zhiIcpROvos' },
  },
  anxious: {
    bollywood: { name: 'Khairiyat (Chhichhore)', id: 'hoNb6HuNmU0' },
    hollywood: { name: 'Breathe Me (Sia)', id: 'YbYWhdLO43Q' },
    lollywood: { name: 'Pasoori (Coke Studio)', id: '5Eqb_-j3FDA' },
  },
  angry: {
    bollywood: { name: 'Malhari (Bajirao Mastani)', id: 'l_MyUGq7pgs' },
    hollywood: { name: 'Eye of the Tiger (Survivor)', id: 'btPJPFnesV4' },
    lollywood: { name: 'Humsafar (Bilal Saeed)', id: 'zhiIcpROvos' },
  },
  excited: {
    bollywood: { name: 'Kesariya (Brahmāstra)', id: 'BddP6PYo2gs' },
    hollywood: { name: 'See You Again (Wiz Khalifa)', id: 'RgKAFK5djSk' },
    lollywood: { name: 'Pasoori (Coke Studio)', id: '5Eqb_-j3FDA' },
  },
};

function loadEntries() {
  const saved = window.localStorage.getItem(storageKey);
  return saved ? JSON.parse(saved) : [];
}

function saveEntries(entries) {
  window.localStorage.setItem(storageKey, JSON.stringify(entries));
}

function getSuggestedSong(mood, genre) {
  const moodEntry = thisMoodSongs[mood] || thisMoodSongs.happy;
  return moodEntry[genre];
}

function renderSongSuggestion() {
  const mood = moodSelect.value;
  suggestedBollywoodSongEl.textContent = getSuggestedSong(mood, 'bollywood').name;
  suggestedHollywoodSongEl.textContent = getSuggestedSong(mood, 'hollywood').name;
  suggestedLollywoodSongEl.textContent = getSuggestedSong(mood, 'lollywood').name;
}

function playBollywoodSong() {
  playTrack('bollywood');
}

function playHollywoodSong() {
  playTrack('hollywood');
}

function playLollywoodSong() {
  playTrack('lollywood');
}

function playTrack(trackType) {
  const mood = moodSelect.value;
  const track = getSuggestedSong(mood, trackType);
  if (!track || !track.id) {
    alert('No playable song is currently available for this mood.');
    return;
  }

  window.open(`https://www.youtube.com/watch?v=${track.id}`, '_blank');
  currentTrackLabel.textContent = `Opened: ${track.name}`;
}

function renderEntries() {
  renderSongSuggestion();
  const entries = loadEntries();
  entriesContainer.innerHTML = entries.length
    ? entries.map(createEntryHtml).join('')
    : '<p class="empty-state">No mood entries yet. Add one to start tracking.</p>';

  entryCount.textContent = entries.length
    ? `${entries.length} saved ${entries.length === 1 ? 'entry' : 'entries'}`
    : 'No entries yet.';
}

function createEntryHtml(entry) {
  return `
    <article class="entry-card">
      <h3>${entry.mood}</h3>
      <time datetime="${entry.timestamp}">${formatDate(entry.timestamp)}</time>
      <p class="entry-song">Suggested song: <strong>${entry.song}</strong></p>
    </article>
  `;
}

function formatDate(value) {
  const date = new Date(value);
  return date.toLocaleString(undefined, {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function clearForm() {
  moodSelect.value = 'happy';
  moodSelect.focus();
}

function addEntry() {
  const mood = moodSelect.value;
  const entries = loadEntries();
  const song = getSuggestedSong(mood, 'bollywood');

  entries.unshift({
    mood,
    song: song ? song.name : 'Suggested song',
    timestamp: new Date().toISOString(),
  });

  saveEntries(entries);
  renderEntries();
  clearForm();
}

function clearHistory() {
  if (!window.confirm('Clear all saved mood entries?')) {
    return;
  }
  window.localStorage.removeItem(storageKey);
  renderEntries();
}

moodSelect.addEventListener('change', () => {
  renderSongSuggestion();
});
playBtn.addEventListener('click', () => playTrack('bollywood'));
playBollywoodBtn.addEventListener('click', playBollywoodSong);
playHollywoodBtn.addEventListener('click', playHollywoodSong);
playLollywoodBtn.addEventListener('click', playLollywoodSong);
saveBtn.addEventListener('click', addEntry);
clearBtn.addEventListener('click', clearHistory);

renderEntries();
