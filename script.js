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
    { song: "As It Was", artist: "Harry Styles", Spotify: 6100000, YouTube: 1300000, TikTok: 2500000, explicit: "no" },
    { song: "Running Up That Hill (A Deal With God)", artist: "Kate Bush", Spotify: 5000000, YouTube: 4000000, TikTok: 3000000, explicit: "no" },
    { song: "Flowers", artist: "Miley Cyrus", Spotify: 4500000, YouTube: 3500000, TikTok: 2000000, explicit: "no" },
    { song: "Kill Bill", artist: "SZA", Spotify: 4000000, YouTube: 3000000, TikTok: 1500000, explicit: "yes" },
    { song: "Ella Baila Sola", artist: "Eslabon Armado & Peso Pluma", Spotify: 3500000, YouTube: 2500000, TikTok: 1000000, explicit: "yes" },
    { song: "Creepin'", artist: "Metro Boomin, The Weeknd & 21 Savage", Spotify: 3000000, YouTube: 2000000, TikTok: 500000, explicit: "yes" },
    { song: "La Bebe", artist: "Yng Lvcas & Peso Pluma", Spotify: 2500000, YouTube: 1500000, TikTok: 1000000, explicit: "yes" },
    { song: "Calm Down", artist: "Rema & Selena Gomez", Spotify: 2000000, YouTube: 1000000, TikTok: 500000, explicit: "no" },
    { song: "Unholy", artist: "Sam Smith & Kim Petras", Spotify: 1500000, YouTube: 500000, TikTok: 200000, explicit: "yes" },
    { song: "Die For You", artist: "The Weeknd & Ariana Grande", Spotify: 1000000, YouTube: 400000, TikTok: 100000, explicit: "no" },
    { song: "Fortnight", artist: "Taylor Swift & Post Malone", Spotify: 6100000, YouTube: 1300000, TikTok: 2500000, explicit: "no" },
    { song: "I Had Some Help", artist: "Post Malone & Morgan Wallen", Spotify: 5000000, YouTube: 4000000, TikTok: 3000000, explicit: "no" },
    { song: "Like That", artist: "Future, Metro Boomin & Kendrick Lamar", Spotify: 4500000, YouTube: 3500000, TikTok: 2000000, explicit: "yes" },
    { song: "Texas Hold 'Em", artist: "Beyoncé", Spotify: 4000000, YouTube: 3000000, TikTok: 1500000, explicit: "yes" },
    { song: "We Can't Be Friends", artist: "Ariana Grande", Spotify: 3500000, YouTube: 2500000, TikTok: 1000000, explicit: "no" },
    { song: "Lose Control", artist: "Teddy Swims", Spotify: 3000000, YouTube: 2000000, TikTok: 500000, explicit: "yes" },
    { song: "Sweet", artist: "Hozier", Spotify: 2500000, YouTube: 1500000, TikTok: 1000000, explicit: "no" },
    { song: "Not Like Us", artist: "Kendrick Lamar", Spotify: 2000000, YouTube: 1000000, TikTok: 500000, explicit: "yes" },
    { song: "Carnival", artist: "Kanye West & Ty Dolla $ign", Spotify: 1500000, YouTube: 500000, TikTok: 200000, explicit: "yes" },
    { song: "Please Please Please", artist: "Sabrina Carpenter", Spotify: 1000000, YouTube: 400000, TikTok: 100000, explicit: "no" }
    
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
