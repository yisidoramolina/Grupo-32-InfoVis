function playApplause(index) {
    let applauseSound;
    
    if (index === 0) {
        // Sonido para el top 1
        applauseSound = document.getElementById("applause_top1");
    } else if (index >= 7) {
        // Sonido para los top 8, 9 y 10
        applauseSound = document.getElementById("applause_top8_10");
    } else {
        // Sonido para los otros puestos (top 2 al 7)
        applauseSound = document.getElementById("applause_default");
    }

    if (applauseSound) {
        applauseSound.currentTime = 0; // Reiniciar el sonido desde el inicio
        applauseSound.play();
    }
}

function stopAllApplause() {
    const applauseSounds = [
        document.getElementById("applause_top1"),
        document.getElementById("applause_top8_10"),
        document.getElementById("applause_default")
    ];
    
    applauseSounds.forEach(sound => {
        if (sound) {
            sound.pause();
            sound.currentTime = 0; // Reiniciar el sonido para la próxima reproducción
        }
    });
}

const songs = [
    { song: "Midnight Dreams", artist: "Luna Night", Spotify: 1200000, YouTube: 2500000, TikTok: 800000, explicit: "yes" },
    { song: "Echoes of You", artist: "Echo Star", Spotify: 850000, YouTube: 1300000, TikTok: 2000000, explicit: "no" },
    { song: "Faded Lights", artist: "Nova Sky", Spotify: 1000000, YouTube: 3500000, TikTok: 1200000, explicit: "yes" },
    { song: "Ocean Breeze", artist: "Sunny Day", Spotify: 500000, YouTube: 900000, TikTok: 2500000, explicit: "no" },
    { song: "Shadow Play", artist: "The Shades", Spotify: 700000, YouTube: 800000, TikTok: 1500000, explicit: "yes" },
    { song: "Golden Hour", artist: "Ray Gold", Spotify: 4000000, YouTube: 1100000, TikTok: 500000, explicit: "no" },
    { song: "Lost in Time", artist: "Chronos", Spotify: 600000, YouTube: 7000000, TikTok: 1000000, explicit: "yes" },
    { song: "Neon City", artist: "The Streets", Spotify: 1300000, YouTube: 4500000, TikTok: 600000, explicit: "no" },
    { song: "Electric Dreams", artist: "Zara Volt", Spotify: 3000000, YouTube: 2000000, TikTok: 3000000, explicit: "yes" },
    { song: "Fire & Ice", artist: "Inferno & Frost", Spotify: 750000, YouTube: 2500000, TikTok: 1200000, explicit: "no" },
    { song: "Dancing Shadows", artist: "Lily Mist", Spotify: 900000, YouTube: 3000000, TikTok: 2500000, explicit: "yes" },
    { song: "Whispers in the Dark", artist: "Night Whisper", Spotify: 5000000, YouTube: 800000, TikTok: 1500000, explicit: "no" },
    { song: "Runaway", artist: "Freedom Wave", Spotify: 850000, YouTube: 1100000, TikTok: 5500000, explicit: "yes" },
    { song: "Forever Young", artist: "Youth", Spotify: 1500000, YouTube: 2500000, TikTok: 1000000, explicit: "no" },
    { song: "High Voltage", artist: "Electric Pulse", Spotify: 1200000, YouTube: 3200000, TikTok: 900000, explicit: "yes" },
    { song: "Into the Wild", artist: "Savanna", Spotify: 1100000, YouTube: 1000000, TikTok: 2000000, explicit: "no" },
    { song: "Heartbeat", artist: "Soul Rhythm", Spotify: 950000, YouTube: 1200000, TikTok: 1500000, explicit: "yes" },
    { song: "Golden Skies", artist: "Sunset Avenue", Spotify: 2500000, YouTube: 2000000, TikTok: 1800000, explicit: "no" },
    { song: "Waves of Emotion", artist: "Sea Star", Spotify: 800000, YouTube: 600000, TikTok: 7000000, explicit: "yes" },
    { song: "City Lights", artist: "Urban Flow", Spotify: 1500000, YouTube: 1800000, TikTok: 1200000, explicit: "no" }
];

let explicitFilter = "all";

function setExplicitFilter(filter) {
    explicitFilter = filter;
    showTop10(currentPlatform);
}

let currentPlatform = "general";

function showTop10(platform) {
    currentPlatform = platform;
    const chartContainer = document.getElementById("chart");
    const platformTitle = document.getElementById("platform-title");

    platformTitle.innerText = 
        platform === "general" ? "Canciones mas reproducidas (General)" 
        : `${platform} Canciones mas reproducidas`;

    chartContainer.innerHTML = "";

    let filteredSongs = songs.filter(song => {
        return (explicitFilter === "all" || song.explicit === explicitFilter);
    });

    let sortedSongs;
    if (platform === "general") {
        sortedSongs = filteredSongs.map(song => ({
            ...song,
            totalStreams: song.Spotify + song.YouTube + song.TikTok
        }))
        .sort((a, b) => b.totalStreams - a.totalStreams);
    } else {
        sortedSongs = filteredSongs.slice().sort((a, b) => b[platform] - a[platform]);
    }

    sortedSongs.slice(0, 10).forEach((song, index) => {
        const barContainer = document.createElement("div");
        barContainer.classList.add("bar", platform.toLowerCase());

        const rank = document.createElement("div");
        rank.classList.add("rank");
        rank.innerText = index + 1;
        barContainer.appendChild(rank);

        const views = platform === "general" ? song.totalStreams : song[platform];
        const widthPercentage = (views / 5000000) * 100;
        barContainer.style.setProperty("--final-width", `${widthPercentage}%`);
        barContainer.innerHTML += `${song.song} - ${song.artist}`;

        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        tooltip.innerHTML = `
            <strong>${song.song}</strong><br>
            Artist: ${song.artist}<br>
            Spotify: ${song.Spotify.toLocaleString()} views<br>
            YouTube: ${song.YouTube.toLocaleString()} views<br>
            TikTok: ${song.TikTok.toLocaleString()} views
        `;
        barContainer.appendChild(tooltip);

        barContainer.addEventListener("mouseover", () => playApplause(index));
        barContainer.addEventListener("mouseout", stopAllApplause);

        chartContainer.appendChild(barContainer);
    });
}

let isSoundOn = true;

function toggleSound() {
    isSoundOn = !isSoundOn; // Cambia el estado de isSoundOn
    const soundButton = document.getElementById("toggle-sound");
    soundButton.innerText = isSoundOn ? "🔊 Sonido Activado" : "🔇 Sonido Desactivado";
}

function playApplause(index) {
    if (!isSoundOn) return; // Verifica si el sonido está activado

    let applauseSound;
    if (index === 0) {
        // Sonido para el top 1
        applauseSound = document.getElementById("applause_top1");
    } else if (index >= 7) {
        // Sonido para los top 8, 9 y 10
        applauseSound = document.getElementById("applause_top8_10");
    } else {
        // Sonido para los otros puestos (top 2 al 7)
        applauseSound = document.getElementById("applause_default");
    }

    if (applauseSound) {
        applauseSound.currentTime = 0; // Reiniciar el sonido desde el inicio
        applauseSound.play();
    }
}

function stopAllApplause() {
    const applauseSounds = [
        document.getElementById("applause_top1"),
        document.getElementById("applause_top8_10"),
        document.getElementById("applause_default")
    ];
    
    applauseSounds.forEach(sound => {
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    });
}


barContainer.addEventListener("mouseover", () => playApplause(index));
barContainer.addEventListener("mouseout", stopAllApplause);



showTop10("general");
