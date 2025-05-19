// Add this function in your City component or a utility file
async function getCityFromLocation() {
  if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser.");
        return null;
    }

    return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
            const response = await fetch(url);
            const data = await response.json();
            const cityName = data.address.city || data.address.town || data.address.village || data.address.state;
            resolve(cityName);
        }, () => {
            alert("Permission denied or unable to get location.");
            resolve(null);
        });
    });
}

export { getCityFromLocation };