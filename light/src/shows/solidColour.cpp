#include <vector>

#include <Arduino.h>
#include <FastLED.h>

#include "../main.hpp"
#include "../ringLEDs/main.hpp"

#include "solidColour.hpp"

void loopSolidColour(ConfigurableSettings& settings) {
  static unsigned long lastExecution = millis();


  if(millis() >= lastExecution + settings.fps){
    if(settings.enabled){
      LEDS.setBrightness(settings.value);
      for(auto& ringLED : allLEDs) rawLEDs[ringLED.index] = CHSV(settings.hue, settings.saturation, 255);
    }
    else for(auto& ringLED : allLEDs) rawLEDs[ringLED.index] = CRGB(0, 0, 0);
  	FastLED.show();
  }
}
