#include <cmath>
#include <vector>
#include <stdlib.h>

#include <Arduino.h>
#include <FastLED.h>

#include "allLEDs.hpp"
#include "wifi.hpp"

float fps = 1000 / 60;
float maxHue = 255;
float maxOffset = 255 / maxHue;
float offsetIncrement = 0.0025;
int globalBrightness = 255;

void setup() {
	Serial.begin(9600);
	Serial.println("resetting");
  initialiseLEDs(globalBrightness);
  initialiseWifi(globalBrightness);
}

void loop() {
  loopWifi();

	static unsigned long lastExecution = 0;
	static float offset = 0;

  if(millis() >= lastExecution + fps){
    LEDS.setBrightness(globalBrightness);
    for(int i = 0; i < allLEDs.size(); i++) {
  		float ledOffset = (*std::find_if(allLEDs.begin(), allLEDs.end(), [&index = i](const RingLED& m) -> bool { return m.index == index;})).angle;
  		float hue = fmod(ledOffset + offset, maxOffset) * maxHue;

  		rawLEDs[i] = CHSV(hue, 255, 255);
  	}
  	offset = fmod(offset + offsetIncrement, maxOffset);
  	FastLED.show();
    lastExecution = millis();
  }
}
