#include <cmath>
#include <vector>
#include <algorithm>
#include <stdlib.h>

#include <Arduino.h>
#include <FastLED.h>

#include "allLEDs.h"
#include "wifi.h"

float fps = 1000 / 60;
int maxBrightness = 254;
int minBrightness = 0;

float maxHue = 255;
float maxOffset = 255 / maxHue;
float colourOffsetIncrement = 0.004;

float brightnessIncrement = (maxBrightness - minBrightness) / ((1000 * 3.25) / fps);
float dimmingIncrement = maxBrightness / ((1000 * 1) / fps);
int globalBrightness = 255;

boolean enabled = true;
boolean blanked = false;

void setup() {
	Serial.begin(9600);
	Serial.println("resetting");
  initialiseLEDs(globalBrightness);
  initialiseWifi(globalBrightness, enabled);
}

void loop() {
  loopWifi();

	static unsigned long lastExecutionColour = 0;
	static unsigned long lastExecutionBrightness = 0;
	static float brightness = minBrightness;
  static float colourOffset = 0;
	static int mode = +1;
	static int hold = 0;

  if(enabled) {
    int adjustedBrightness = dim8_lin(min(255, max(0, int(round(brightness)))));

    if(millis() >= lastExecutionBrightness + (hold ? hold : fps)){
      hold = 0;

      for(int i = 12; i < 20; i++) rawLEDs[i] = CHSV(0, 0, 255 - adjustedBrightness);

      if(brightness >= maxBrightness) {hold = 2750; mode = -1;}
      if(brightness <= minBrightness) {hold = 1750; mode = +1;}

      brightness += (brightnessIncrement * mode);

    	FastLED.show();
      lastExecutionBrightness = millis();
    }

    if(millis() >= lastExecutionColour + fps){
      for(int i = 0; i < 12; i++) {
    		float ledOffset = (*std::find_if(allLEDs.begin(), allLEDs.end(), [&index = i](const RingLED& m) -> bool { return m.index == index;})).angle;
    		float hue = fmod(ledOffset + colourOffset, maxOffset) * maxHue;

    		rawLEDs[i] = CHSV(hue, 255, adjustedBrightness);
    	}

    	colourOffset = fmod(colourOffset + colourOffsetIncrement, maxOffset);

    	FastLED.show();
      lastExecutionColour = millis();
    }
    blanked = false;
  } else if(!blanked){

    if(millis() >= lastExecutionBrightness + fps){

      for(int i = 0; i < 20; i++) {
        CHSV current = rgb2hsv_approximate(rawLEDs[i]);
        rawLEDs[i] = CHSV(current.h, current.s, min(255, max(0, int(floor(brightness)))));
      }

      brightness -= dimmingIncrement;

    	FastLED.show();
      lastExecutionBrightness = millis();

      if(brightness <= 0) blanked = true;
    }
  }
}
