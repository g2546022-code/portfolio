/* =========================
   WEATHER
========================= */

// 東京の位置
const latitude = 35.6762;
const longitude = 139.6503;


// 天気コードを日本語に変換
function getWeatherInfo(code) {

    // 晴れ
    if (code === 0) {

        return {
            text: "快晴",
            icon: "☀️",
            className: "weather-sunny"
        };

    }


    // 晴れ時々曇り
    if (code === 1 || code === 2) {

        return {
            text: "晴れ / 曇り",
            icon: "🌤️",
            className: "weather-sunny"
        };

    }


    // 曇り
    if (code === 3) {

        return {
            text: "曇り",
            icon: "☁️",
            className: "weather-cloudy"
        };

    }


    // 霧
    if (
        code === 45 ||
        code === 48
    ) {

        return {
            text: "霧",
            icon: "🌫️",
            className: "weather-cloudy"
        };

    }


    // 雨
    if (
        code >= 51 &&
        code <= 67
    ) {

        return {
            text: "雨",
            icon: "🌧️",
            className: "weather-rain"
        };

    }


    // 雪
    if (
        code >= 71 &&
        code <= 77
    ) {

        return {
            text: "雪",
            icon: "❄️",
            className: "weather-snow"
        };

    }


    // 強い雨
    if (
        code >= 80 &&
        code <= 82
    ) {

        return {
            text: "強い雨",
            icon: "🌧️",
            className: "weather-rain"
        };

    }


    // 雷雨
    if (
        code >= 95 &&
        code <= 99
    ) {

        return {
            text: "雷雨",
            icon: "⛈️",
            className: "weather-storm"
        };

    }


    // その他

    return {
        text: "天気不明",
        icon: "🌤️",
        className: "weather-cloudy"
    };

}



// 天気を取得
async function getWeather() {

    try {

        const url =
            "https://api.open-meteo.com/v1/forecast" +
            "?latitude=" + latitude +
            "&longitude=" + longitude +
            "&current=weather_code" +
            "&timezone=Asia%2FTokyo";


        const response =
            await fetch(url);


        const data =
            await response.json();


        const weatherCode =
            data.current.weather_code;


        const weather =
            getWeatherInfo(weatherCode);


        // 天気表示

        document.getElementById(
            "weather-icon"
        ).textContent =
            weather.icon;


        document.getElementById(
            "weather-text"
        ).textContent =
            weather.text;


        // いったん天気用クラスを全部削除

        document.body.classList.remove(
            "weather-sunny",
            "weather-cloudy",
            "weather-rain",
            "weather-snow",
            "weather-storm"
        );


        // 現在の天気のクラスを追加

        document.body.classList.add(
            weather.className
        );


    } catch (error) {

        console.log(
            "天気情報を取得できませんでした。",
            error
        );


        document.getElementById(
            "weather-text"
        ).textContent =
            "天気情報を取得できません";


    }

}


// ページを開いたときに実行

getWeather();



/* =========================
   SCROLL ANIMATION
========================= */

const elements =
    document.querySelectorAll(
        ".about-grid, .hobby-card, .work-card"
    );


const observer =
    new IntersectionObserver(

        function (entries) {

            entries.forEach(
                function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "show"
                        );

                    }

                }
            );

        },

        {
            threshold: 0.15
        }

    );


elements.forEach(
    function (element) {

        observer.observe(
            element
        );

    }
);