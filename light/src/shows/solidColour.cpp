#include <vector>

#include <Arduino.h>
#include <FastLED.h>

#include "../main.hpp"
#include "../ringLEDs/main.hpp"

#include "solidColour.hpp"

void loopSolidColour(ConfigurableSettings& settings) {
  static unsigned long lastExecution = 0;

  if(millis() >= lastExecution + settings.fps){
    if(settings.enabled) for(auto& ringLED : allLEDs) rawLEDs[ringLED.index] = CRGB(settings.red, settings.green, settings.blue);
    else for(auto& ringLED : allLEDs) rawLEDs[ringLED.index] = CRGB(0, 0, 0);
  	FastLED.show();
  }
}
