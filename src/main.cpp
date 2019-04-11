#include <cmath>
#include <vector>
#include <algorithm>
#include <stdlib.h>

#include <Arduino.h>
#include <FastLED.h>

#include "main.h"
#include "ringLEDs.h"
#include "wifi.h"

ConfigurableSettings settings;

void setup() {
	Serial.begin(9600);
  initialiseLEDs(settings.maxBrightness);
  initialiseWifi(settings);
}

void loop() {
  loopWifi();

	static unsigned long lastExecutionColour = 0;
	static unsigned long lastExecutionBrightness = 0;
	static float brightness = settings.minBrightness;
  static float colourOffset = 0;
	static int mode = +1;
	static int hold = 0;
  static boolean blanked = false;

  if(settings.enabled) {
    int adjustedBrightness = dim8_lin(min(settings.maxBrightness, max(settings.minBrightness, int(round(brightness)))));

    if(millis() >= lastExecutionBrightness + (hold ? hold : settings.fps)){
      hold = 0;

      for(auto& ringLED : innerLEDs) rawLEDs[ringLED.index] = CHSV(0, 0, settings.maxBrightness - adjustedBrightness);

      if(brightness >= settings.maxBrightness) {hold = settings.topHold; mode = -1;}
      if(brightness <= settings.minBrightness) {hold = settings.bottomHold; mode = +1;}

      float brightnessIncrement = (settings.maxBrightness - settings.minBrightness) / (settings.transitionLength / settings.fps);
      brightness += (brightnessIncrement * mode);

    	FastLED.show();
      lastExecutionBrightness = millis();
    }

    if(millis() >= lastExecutionColour + settings.fps){
      for(auto& ringLED : outerLEDs) {
    		float hue = fmod(ringLED.angle + colourOffset, settings.maxOffset) * settings.maxHue;
    		rawLEDs[ringLED.index] = CHSV(hue, 255, adjustedBrightness);
    	}

    	colourOffset = fmod(colourOffset + settings.colourOffsetIncrement, settings.maxOffset);

    	FastLED.show();
      lastExecutionColour = millis();
    }
    blanked = false;
  } else if(!blanked && millis() >= lastExecutionBrightness + settings.fps){
    for(auto& ringLED : allLEDs) {
      CHSV current = rgb2hsv_approximate(rawLEDs[ringLED.index]);
      rawLEDs[ringLED.index] = CHSV(current.h, current.s, min(settings.maxBrightness, max(settings.minBrightness, int(floor(brightness)))));
    }

    if(brightness <= 0) blanked = true;

    float dimmingIncrement = settings.maxBrightness / (settings.dimmingLength / settings.fps);
    brightness -= dimmingIncrement;

  	FastLED.show();
    lastExecutionBrightness = millis();
  }
}
