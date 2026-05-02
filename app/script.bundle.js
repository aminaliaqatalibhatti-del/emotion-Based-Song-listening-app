(() => {
  // node_modules/@vercel/speed-insights/dist/index.mjs
  var initQueue = () => {
    if (window.si) return;
    window.si = function a(...params) {
      window.siq = window.siq || [];
      window.siq.push(params);
    };
  };
  var name = "@vercel/speed-insights";
  var version = "2.0.0";
  function isBrowser() {
    return typeof window !== "undefined";
  }
  function detectEnvironment() {
    try {
      const env = "development";
      if (env === "development" || env === "test") {
        return "development";
      }
    } catch {
    }
    return "production";
  }
  function isDevelopment() {
    return detectEnvironment() === "development";
  }
  function getScriptSrc(props) {
    if (props.scriptSrc) {
      return makeAbsolute(props.scriptSrc);
    }
    if (isDevelopment()) {
      return "https://va.vercel-scripts.com/v1/speed-insights/script.debug.js";
    }
    if (props.dsn) {
      return "https://va.vercel-scripts.com/v1/speed-insights/script.js";
    }
    if (props.basePath) {
      return makeAbsolute(`${props.basePath}/speed-insights/script.js`);
    }
    return "/_vercel/speed-insights/script.js";
  }
  function loadProps(explicitProps, confString) {
    var _a;
    let props = explicitProps;
    if (confString) {
      try {
        props = {
          ...(_a = JSON.parse(confString)) == null ? void 0 : _a.speedInsights,
          ...explicitProps
        };
      } catch {
      }
    }
    const dataset = {
      sdkn: name + (props.framework ? `/${props.framework}` : ""),
      sdkv: version
    };
    if (props.sampleRate) {
      dataset.sampleRate = props.sampleRate.toString();
    }
    if (props.route) {
      dataset.route = props.route;
    }
    if (isDevelopment() && props.debug === false) {
      dataset.debug = "false";
    }
    if (props.dsn) {
      dataset.dsn = props.dsn;
    }
    if (props.endpoint) {
      dataset.endpoint = makeAbsolute(props.endpoint);
    } else if (props.basePath) {
      dataset.endpoint = makeAbsolute(`${props.basePath}/speed-insights/vitals`);
    }
    return {
      src: getScriptSrc(props),
      beforeSend: props.beforeSend,
      dataset
    };
  }
  function makeAbsolute(url) {
    return url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/") ? url : `/${url}`;
  }
  function injectSpeedInsights(props = {}, confString) {
    var _a;
    if (!isBrowser() || props.route === null) return null;
    initQueue();
    const { beforeSend, src, dataset } = loadProps(props, confString);
    if (document.head.querySelector(`script[src*="${src}"]`)) return null;
    if (beforeSend) {
      (_a = window.si) == null ? void 0 : _a.call(window, "beforeSend", beforeSend);
    }
    const script = document.createElement("script");
    script.src = src;
    script.defer = true;
    for (const [key, value] of Object.entries(dataset)) {
      script.dataset[key] = value;
    }
    script.onerror = () => {
      console.log(
        `[Vercel Speed Insights] Failed to load script from ${src}. Please check if any content blockers are enabled and try again.`
      );
    };
    document.head.appendChild(script);
    return {
      setRoute: (route) => {
        script.dataset.route = route ?? void 0;
      }
    };
  }

  // app/script.js
  injectSpeedInsights({
    debug: true
    // Enable debug mode in development
  });
  var moodSongMap = {
    happy: {
      bollywood: "Tum Hi Ho - Aashiqui 2",
      hollywood: "Happy - Pharrell Williams",
      lollywood: "Larsha Pekhawar Ta - Gul Panra"
    },
    calm: {
      bollywood: "Jeena Jeena - Badlapur",
      hollywood: "Weightless - Marconi Union",
      lollywood: "Sajna Door - Hadiqa Kiani"
    },
    sad: {
      bollywood: "Kabhi Kabhi Aditi - Jaane Tu Ya Jaane Na",
      hollywood: "Someone Like You - Adele",
      lollywood: "Akhiyan Udeek Diyan - Shazia Manzoor"
    },
    anxious: {
      bollywood: "Zara Zara - Rehnaa Hai Terre Dil Mein",
      hollywood: "Breathe Me - Sia",
      lollywood: "Mahi Ve - Nusrat Fateh Ali Khan"
    },
    angry: {
      bollywood: "Maula Mere Maula - Anwar",
      hollywood: "In the End - Linkin Park",
      lollywood: "Dil Dil Pakistan - Vital Signs"
    },
    excited: {
      bollywood: "Jai Ho - Slumdog Millionaire",
      hollywood: "Can't Stop the Feeling - Justin Timberlake",
      lollywood: "Dosti - Junoon"
    }
  };
  var moodYoutubeMap = {
    happy: {
      bollywood: "IJq0yyWug1k",
      hollywood: "ZbZSe6N_BXs",
      lollywood: "dQw4w9WgXcQ"
    },
    calm: {
      bollywood: "EvKh7-PXR5M",
      hollywood: "NMWWHXb3awM",
      lollywood: "dQw4w9WgXcQ"
    },
    sad: {
      bollywood: "sH7baAvdVMY",
      hollywood: "hLQl3WQQoQ0",
      lollywood: "dQw4w9WgXcQ"
    },
    anxious: {
      bollywood: "h-C8jhfXUdg",
      hollywood: "SFGvmrJ5rjM",
      lollywood: "dQw4w9WgXcQ"
    },
    angry: {
      bollywood: "2gT9xS_9O44",
      hollywood: "eVTXPUF4Oz4",
      lollywood: "dQw4w9WgXcQ"
    },
    excited: {
      bollywood: "gfSQ3YU1B2Y",
      hollywood: "ru0K8uYEZWw",
      lollywood: "dQw4w9WgXcQ"
    }
  };
  var moodSelect = document.getElementById("mood");
  var saveBtn = document.getElementById("saveBtn");
  var clearBtn = document.getElementById("clearBtn");
  var entriesDiv = document.getElementById("entries");
  var entryCountP = document.getElementById("entryCount");
  var suggestedBollywoodSong = document.getElementById("suggestedBollywoodSong");
  var suggestedHollywoodSong = document.getElementById("suggestedHollywoodSong");
  var suggestedLollywoodSong = document.getElementById("suggestedLollywoodSong");
  var playBtn = document.getElementById("playBtn");
  var playBollywoodBtn = document.getElementById("playBollywoodBtn");
  var playHollywoodBtn = document.getElementById("playHollywoodBtn");
  var playLollywoodBtn = document.getElementById("playLollywoodBtn");
  var youtubePlayer = document.getElementById("youtubePlayer");
  var currentTrackLabel = document.getElementById("currentTrackLabel");
  var currentMood = "happy";
  moodSelect.addEventListener("change", (e) => {
    currentMood = e.target.value;
    updateSongSuggestions(currentMood);
  });
  function updateSongSuggestions(mood) {
    const songs = moodSongMap[mood];
    suggestedBollywoodSong.textContent = songs.bollywood;
    suggestedHollywoodSong.textContent = songs.hollywood;
    suggestedLollywoodSong.textContent = songs.lollywood;
  }
  playBtn.addEventListener("click", () => playSong(currentMood, "bollywood"));
  playBollywoodBtn.addEventListener("click", () => playSong(currentMood, "bollywood"));
  playHollywoodBtn.addEventListener("click", () => playSong(currentMood, "hollywood"));
  playLollywoodBtn.addEventListener("click", () => playSong(currentMood, "lollywood"));
  function playSong(mood, category) {
    const videoId = moodYoutubeMap[mood][category];
    const songName = moodSongMap[mood][category];
    youtubePlayer.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    currentTrackLabel.textContent = `Now playing: ${songName}`;
  }
  saveBtn.addEventListener("click", () => {
    const now = /* @__PURE__ */ new Date();
    const entry = {
      mood: currentMood,
      timestamp: now.toISOString(),
      song: moodSongMap[currentMood].bollywood
    };
    let entries = JSON.parse(localStorage.getItem("moodEntries") || "[]");
    entries.push(entry);
    localStorage.setItem("moodEntries", JSON.stringify(entries));
    renderEntries();
  });
  clearBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all mood history?")) {
      localStorage.removeItem("moodEntries");
      renderEntries();
    }
  });
  function renderEntries() {
    const entries = JSON.parse(localStorage.getItem("moodEntries") || "[]");
    if (entries.length === 0) {
      entryCountP.textContent = "No entries yet.";
      entriesDiv.innerHTML = "";
      return;
    }
    entryCountP.textContent = `${entries.length} ${entries.length === 1 ? "entry" : "entries"}`;
    entriesDiv.innerHTML = entries.reverse().map((entry) => {
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
    }).join("");
  }
  updateSongSuggestions(currentMood);
  renderEntries();
})();
