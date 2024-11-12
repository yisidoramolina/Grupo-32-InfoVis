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
    {song: "Blinding Lights", artist: "The Weeknd", Spotify: 4281468720.0, YouTube: 833807130.0, TikTok: 3501177394.0, explicit: "no"},
    {song: "Blinding Lights", artist: "xSyborg", Spotify: 4261328190.0, explicit: "no"},
    {song: "Shape of You", artist: "Ed Sheeran", Spotify: 3909458734.0, YouTube: 8013997219.0, TikTok: 2320856331.0, explicit: "no"},
    {song: "Shape of You", artist: "xSyborg", Spotify: 3888356417.0, explicit: "no"},
    {song: "Someone You Loved", artist: "Lewis Capaldi", Spotify: 3427498835.0, YouTube: 2153701892.0, TikTok: 2161032034.0, explicit: "no"},
    {song: "Sunflower - Spider-Man: Into the Spider-Verse", artist: "Post Malone", Spotify: 3358704125.0, YouTube: 2763188773.0, TikTok: 1597453878.0, explicit: "no"},
    {song: "As It Was", artist: "Harry Styles", Spotify: 3301814535.0, YouTube: 800899315.0, TikTok: 15405881843.0, explicit: "no"},
    {song: "As It Was", artist: "Harry Styles", Spotify: 3299082422.0, explicit: "no"},
    {song: "Starboy", artist: "The Weeknd", Spotify: 3291262413.0, YouTube: 2829990867.0, TikTok: 375498232.0, explicit: "yes"},
    {song: "One Dance", artist: "Drake", Spotify: 3192204066.0, YouTube: 456806913.0, TikTok: 388544079.0, explicit: "no"},
    {song: "Baby Shark", artist: "Pinkfong", Spotify: 720822868.0, YouTube: 16322756555.0, TikTok: 6577639193.0, explicit: "no"},
    {song: "Despacito", artist: "Luis Fonsi", Spotify: 1747093405.0, YouTube: 9537135721.0, TikTok: 1143297071.0, explicit: "no"},
    {song: "Shape of You", artist: "Ed Sheeran", Spotify: 3909458734.0, YouTube: 8013997219.0, TikTok: 2320856331.0, explicit: "no"},
    {song: "bathroom floor", artist: "Kids With Buns", Spotify: 297185.0, YouTube: 6736502312.0, TikTok: 22234.0, explicit: "no"},
    {song: "Perfect", artist: "Ed Sheeran", Spotify: 2969999682.0, YouTube: 6473698897.0, TikTok: 7647479866.0, explicit: "no"},
    {song: "See You Again (feat. Charlie Puth)", artist: "Wiz Khalifa", Spotify: 1891920348.0, YouTube: 6335989683.0, TikTok: 3455170110.0, explicit: "no"},
    {song: "Gangnam Style (ï¿½ï¿½ï¿½ï¿½ï¿½ï", artist: "PSY", Spotify: 477162323.0, YouTube: 5849588091.0, TikTok: 578660460.0, explicit: "no"},
    {song: "Uptown Funk", artist: "Mark Ronson", Spotify: 1993030264.0, YouTube: 5644117304.0, TikTok: 1268235679.0, explicit: "yes"},
    {song: "Axel F", artist: "Crazy Frog", Spotify: 178536020.0, YouTube: 5049428366.0, explicit: "no"},
    {song: "Dame Tu Cosita", artist: "El Chombo", YouTube: 5004189392.0, explicit: "no"},
    {song: "Monkeys Spinning Monkeys", artist: "Kevin MacLeod", Spotify: 11477477.0, YouTube: 11457166.0, TikTok: 233232311463.0, explicit: "no"},
    {song: "Love You So", artist: "The King Khan & BBQ Show", Spotify: 16326628.0, YouTube: 7603329.0, TikTok: 214843956590.0, explicit: "no"},
    {song: "Oh No", artist: "Kreepa", Spotify: 40284121.0, YouTube: 17978707.0, TikTok: 61088562861.0, explicit: "yes"},
    {song: "Funny Song", artist: "Cavendish Music", Spotify: 5866282.0, YouTube: 11793478.0, TikTok: 38373644011.0, explicit: "no"},
    {song: "Aesthetic", artist: "Tollan Kim", Spotify: 5712985.0, YouTube: 3120073.0, TikTok: 33870791454.0, explicit: "no"},
    {song: "Spongebob", artist: "Dante9k", Spotify: 902103.0, TikTok: 33359398879.0, explicit: "no"},
    {song: "She Share Story", artist: "Shayne Orok", YouTube: 238798.0, TikTok: 33201904006.0, explicit: "no"},
    {song: "Pieces", artist: "Danilo Stankovic", Spotify: 5467217.0, YouTube: 283023.0, TikTok: 28032695489.0, explicit: "no"},
    {song: "love nwantiti (ah ah ah)", artist: "CKay", Spotify: 853451422.0, YouTube: 1132006963.0, TikTok: 23933379729.0, explicit: "yes"},
    {song: "STAY (with Justin Bieber)", artist: "The Kid LAROI", Spotify: 3107100349.0, YouTube: 1256973582.0, TikTok: 23712377029.0, explicit: "yes"},
    {song: "Monkeys Spinning Monkeys", artist: "Kevin MacLeod", Spotify: 11477477.0, YouTube: 11457166.0, TikTok: 233232311463.0, explicit: "no"},
    {song: "Love You So", artist: "The King Khan & BBQ Show", Spotify: 16326628.0, YouTube: 7603329.0, TikTok: 214843956590.0, explicit: "no"},
    {song: "Oh No", artist: "Kreepa", Spotify: 40284121.0, YouTube: 17978707.0, TikTok: 61088562861.0, explicit: "yes"},
    {song: "Funny Song", artist: "Cavendish Music", Spotify: 5866282.0, YouTube: 11793478.0, TikTok: 38373644011.0, explicit: "no"},
    {song: "Aesthetic", artist: "Tollan Kim", Spotify: 5712985.0, YouTube: 3120073.0, TikTok: 33870791454.0, explicit: "no"},
    {song: "STAY (with Justin Bieber)", artist: "The Kid LAROI", Spotify: 3107100349.0, YouTube: 1256973582.0, TikTok: 23712377029.0, explicit: "yes"},
    {song: "Pieces", artist: "Danilo Stankovic", Spotify: 5467217.0, YouTube: 283023.0, TikTok: 28032695489.0, explicit: "no"},
    {song: "love nwantiti (ah ah ah)", artist: "CKay", Spotify: 853451422.0, YouTube: 1132006963.0, TikTok: 23933379729.0, explicit: "yes"},
    {song: "Infinity", artist: "Jaymes Young", Spotify: 1059940209.0, YouTube: 569314714.0, TikTok: 22241102823.0, explicit: "no"},
    {song: "Baby Shark", artist: "Pinkfong", Spotify: 720822868.0, YouTube: 16322756555.0, TikTok: 6577639193.0, explicit: "no"}];

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
        platform === "general" ? "Canciones más reproducidas (General)" 
        : `${platform} Canciones más reproducidas`;

    chartContainer.innerHTML = "";

    // Filtrar canciones duplicadas basadas en el título y artista
    let uniqueSongs = [];
    let seen = new Set();
    songs.forEach(song => {
        const identifier = `${song.song}-${song.artist}`;
        if (!seen.has(identifier)) {
            seen.add(identifier);
            uniqueSongs.push(song);
        }
    });

    let filteredSongs = uniqueSongs.filter(song => {
        return (explicitFilter === "all" || song.explicit === explicitFilter);
    });

    let sortedSongs;
    if (platform === "general") {
        sortedSongs = filteredSongs.map(song => ({
            ...song,
            totalStreams: (song.Spotify || 0) + (song.YouTube || 0) + (song.TikTok || 0)
        }))
        .sort((a, b) => b.totalStreams - a.totalStreams);
    } else {
        sortedSongs = filteredSongs.slice().sort((a, b) => (b[platform] || 0) - (a[platform] || 0));
    }

    // Encontrar el máximo de reproducciones para escalar bien las barras
    const maxViews = platform === "general" 
        ? Math.max(...sortedSongs.map(song => song.totalStreams || 0))
        : Math.max(...sortedSongs.map(song => song[platform] || 0));

    sortedSongs.slice(0, 10).forEach((song, index) => {
        const barContainer = document.createElement("div");
        barContainer.classList.add("bar", platform.toLowerCase()); // Añadir clase de plataforma para estilo específico

        const rank = document.createElement("div");
        rank.classList.add("rank");
        rank.innerText = index + 1;
        barContainer.appendChild(rank);

        // Escalar el ancho de la barra con respecto al máximo de vistas
        const views = platform === "general" ? song.totalStreams : song[platform] || 0;
        const widthPercentage = (views / maxViews) * 100; // Escala relativa al máximo
        barContainer.style.setProperty("--final-width", `${widthPercentage}%`);
        barContainer.innerHTML += `${song.song} - ${song.artist}`;

        // Crear el tooltip para mostrar las vistas en hover
        const tooltip = document.createElement("div");
        tooltip.classList.add("tooltip");
        tooltip.innerHTML = `
            <strong>${song.song}</strong><br>
            Artist: ${song.artist}<br>
            Spotify: ${(song.Spotify || 0).toLocaleString()} views<br>
            YouTube: ${(song.YouTube || 0).toLocaleString()} views<br>
            TikTok: ${(song.TikTok || 0).toLocaleString()} views<br>
            ${platform === "general" ? `Total: ${views.toLocaleString()} views` : ""}
        `;
        barContainer.appendChild(tooltip);

        // Mostrar el tooltip al hacer hover
        barContainer.addEventListener("mouseover", () => {
            tooltip.style.display = "block";
        });
        barContainer.addEventListener("mouseout", () => {
            tooltip.style.display = "none";
        });

        // Reproducir sonido en hover
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