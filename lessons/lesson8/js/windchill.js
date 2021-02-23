const tempNum = parseFloat(document.getElementById("temp").textContent)
const windSpeedNum = parseFloat(document.getElementById("windSpeed").textContent)

let windChill = Math.round(35.74 + (0.6215 * tempNum) 
    - (35.75 * Math.pow(windSpeedNum, 0.16)) 
    + (0.4275 * tempNum * Math.pow(windSpeedNum, 0.16)));

    if (tempNum <= 10 && windSpeedNum > 4.8) {
        document.getElementById("windChill").textContent = windChill        
    } else {
        document.getElementById("windChill").textContent = "N/A"      
    }