#include <cmath>
#include <vector>

#include <Arduino.h>
#include <FastLED.h>

#include "allLEDs.hpp"
#include "wifi.hpp"

int globalBrightness = 255;
boolean enabled = true;

void setup() {
	Serial.begin(9600);
	Serial.println("resetting");
  initialiseLEDs(globalBrightness);
  initialiseWifi(globalBrightness, enabled);
}

void loop() {
  loopWifi();

	static float offset = 0;
	for(int i = 0; i < allLEDs.size(); i++) {
		float ledOffset = (*std::find_if(allLEDs.begin(),
             allLEDs.end(),
             [&index = i]
             (const RingLED& m) -> bool { return m.index == index;})).angle;

		float pos = ledOffset;
		float hue = fmod(pos + offset, 1) * 255;
		CRGB tempRGB = CHSV(hue, 255, globalBrightness);
    int use = tempRGB.r;
    rawLEDs[i] = CRGB(use, use, use);
	}
	offset = fmod(offset + 0.002f, 1.00f);
	FastLED.show();
	FastLED.delay(1000 / 120);
}
