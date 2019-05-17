#include <vector>

#include <Arduino.h>
#include <FastLED.h>

#include "../main.hpp"
#include "../ringLEDs/main.hpp"

#include "solidColour.hpp"

void loopSolidColour(ConfigurableSettings& settings) {
  static float msBetweenFrames = 1000 / 60; // 60FPS

  static unsigned long lastExecution = millis();

  if(millis() >= lastExecution + msBetweenFrames){
    if(settings.enabled){
      LEDS.setBrightness(settings.value);
      for(auto& ringLED : allLEDs) rawLEDs[ringLED.index] = CHSV(settings.hue, settings.saturation, 255);
    }
    else for(auto& ringLED : allLEDs) rawLEDs[ringLED.index] = CRGB(0, 0, 0);
  	FastLED.show();
  }
}
