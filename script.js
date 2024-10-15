// Dimensiones del gráfico
const width = 800;
const height = 400;
const margin = { top: 50, right: 30, bottom: 50, left: 150 };

// Crear SVG para el gráfico
const svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`);

// Escalas
const x = d3.scaleLinear().range([0, width]);
const y = d3.scaleBand().range([0, height]).padding(0.1);

// Función para actualizar los datos según filtros
function update(data) {
    // Verificar si hay datos después de aplicar los filtros
    if (data.length === 0) {
        console.log("No hay datos después de aplicar los filtros");
        return;
    }

    // Definir los dominios de las escalas basados en los datos filtrados
    x.domain([0, d3.max(data, d => d['Spotify Streams'])]);
    y.domain(data.map(d => d.Track));

    // Unir datos al gráfico
    const bars = svg.selectAll(".bar").data(data);

    // Añadir o actualizar barras
    bars.enter().append("rect")
        .attr("class", "bar")
        .merge(bars)
        .attr("y", d => y(d.Track))
        .attr("width", d => x(d['Spotify Streams']))
        .attr("height", y.bandwidth())
        .attr("fill", d => d['Explicit Track'] === "Yes" ? "#4A148C" : "#4CAF50") // Morado si es explícita, verde si no
        .on("mouseover", function(event, d) {
            // Mostrar tooltip con información adicional
            d3.select("#tooltip").style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 20) + "px")
                .classed("hidden", false);
            d3.select("#track-name").text(d.Track);
            d3.select("#artist-name").text(d.Artist);
            d3.select("#popularity-value").text(d['Spotify Popularity']);
            d3.select("#release-date").text(d['Release Date']);
            d3.select("#explicit-status").text(d['Explicit Track'] === "Yes" ? "Sí" : "No");
        })
        .on("mouseout", function() {
            d3.select("#tooltip").classed("hidden", true);
        });

    // Eliminar barras que ya no son necesarias
    bars.exit().remove();

    // Actualizar los ejes
    svg.selectAll(".x-axis").remove();
    svg.selectAll(".y-axis").remove();

    svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(y));
}

// Cargar el archivo CSV o JSON y aplicar filtros a los datos
d3.csv("Most Streamed Spotify Songs 2024.csv").then(function(data) {
    // Convertir los valores numéricos
    data.forEach(d => {
        d['Spotify Streams'] = +d['Spotify Streams'].replace(/,/g, '');
        d['Spotify Popularity'] = +d['Spotify Popularity'];
    });

    // Filtrar los datos según los inputs
    const applyFilters = () => {
        const selectedDate = document.getElementById("date-filter").value;
        const popularityFilter = +document.getElementById("popularity-filter").value || 0;
        const explicitFilter = document.getElementById("explicit-filter").value;

        const filteredData = data.filter(d => {
            const trackDate = new Date(d['Release Date']);
            const selectedTrackDate = selectedDate ? new Date(selectedDate) : null;

            return (!selectedTrackDate || trackDate >= selectedTrackDate) &&
                   d['Spotify Popularity'] >= popularityFilter &&
                   (explicitFilter === "all" || d['Explicit Track'] === explicitFilter);
        });

        update(filteredData);
    };

    // Añadir eventos a los filtros
    d3.selectAll("input, select").on("change", applyFilters);

    // Inicializar gráfico con todos los datos
    update(data);
});
