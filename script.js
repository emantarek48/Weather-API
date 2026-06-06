const input = document.getElementById("city");
const btn = document.getElementById("btn");
const result = document.getElementById("result");

btn.addEventListener("click", getWeather);

async function getWeather() {
    const city = input.value;

    if (city === "") return;

    try {
        // 1️⃣ نجيب الإحداثيات
        const geoRes = await fetch(
            `https://geocoding-api.open-meteo.com/v1/search?name=${city}`
        );

        const geoData = await geoRes.json();
console.log(geoData);
console.log(geoData.results);
console.log(geoData.results[0]);
        if (!geoData.results) {
            result.textContent = "City not found ❌";
            return;
        }

        const { latitude, longitude, name } = geoData.results[0];

        // 2️⃣ نجيب الطقس الحقيقي
        const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );

        const weatherData = await weatherRes.json();
        //    console.log(weatherData);

        // 3️⃣ عرض النتيجة
        result.innerHTML = `
            <h2>📍 ${name}</h2>
            <p>🌡 Temp: ${weatherData.current_weather.temperature} °C</p>
            <p>🌬 Wind: ${weatherData.current_weather.windspeed} km/h</p>
        `;

    } catch (error) {
        result.textContent = "Error ❌";
    }
}


















/*
Cairo
Alexandria
Giza
Luxor
Aswan
London
Paris
Berlin
Tokyo
New York
Dubai*/
