import kelvinToRGB from './kelvinToRGB'

export default ([red, green, blue]) => {
	const epsilon = 0.4

	let temperature = 0
	let minTemperature = 1000
	let maxTemperature = 40000

	while(maxTemperature - minTemperature > epsilon) {
		temperature = (maxTemperature + minTemperature) * 0.5

		const [tRed,, tBlue] = kelvinToRGB(temperature)
		if(tBlue / tRed >= blue / red) maxTemperature = temperature
		else minTemperature = temperature
	}

	return Math.round(temperature)
}
