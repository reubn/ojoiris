#include <vector>

#include <Arduino.h>
#include <FastLED.h>

#include "../main.hpp"
#include "../ringLEDs/main.hpp"

#include "solidColour.hpp"

void loopSolidColour(ConfigurableSettings& settings) {
  static int headingTowardsRed = settings.red;
  static int headingTowardsGreen = settings.green;
  static int headingTowardsBlue = settings.blue;

  static int incrementPerFrameRed = 0;
  static int incrementPerFrameGreen = 0;
  static int incrementPerFrameBlue = 0;

  static unsigned long lastExecution = millis();
  static int currentRed = settings.red;
  static int currentGreen = settings.green;
  static int currentBlue = settings.blue;

  if(settings.red != headingTowardsRed || settings.green != headingTowardsGreen || settings.blue != headingTowardsBlue){
    headingTowardsRed = settings.red;
    headingTowardsGreen = settings.green;
    headingTowardsBlue = settings.blue;

    int deltaRed = headingTowardsRed - currentRed;
    int deltaGreen = headingTowardsGreen - currentGreen;
    int deltaBlue = headingTowardsBlue - currentBlue;

    float transitionDuration = (abs(deltaRed) + abs(deltaGreen) + abs(deltaBlue)) * 2;
    float numberOfFramesNeeded = transitionDuration / settings.fps;

    incrementPerFrameRed = deltaRed / numberOfFramesNeeded;
    incrementPerFrameGreen = deltaGreen / numberOfFramesNeeded;
    incrementPerFrameBlue = deltaBlue / numberOfFramesNeeded;
  }

  if(millis() >= lastExecution + settings.fps){
    LEDS.setBrightness(settings.globalBrightness);
    if(settings.enabled){
      if(((incrementPerFrameRed > 0) && (currentRed < headingTowardsRed)) || ((incrementPerFrameRed < 0) && (currentRed > headingTowardsRed))) currentRed += incrementPerFrameRed;
      else currentRed = headingTowardsRed;

      if(((incrementPerFrameGreen > 0) && (currentGreen < headingTowardsGreen)) || ((incrementPerFrameGreen < 0) && (currentGreen > headingTowardsGreen))) currentGreen += incrementPerFrameGreen;
      else currentGreen = headingTowardsGreen;

      if(((incrementPerFrameBlue > 0) && (currentBlue < headingTowardsBlue)) || ((incrementPerFrameBlue < 0) && (currentBlue > headingTowardsBlue))) currentBlue += incrementPerFrameBlue;
      else currentBlue = headingTowardsBlue;

      for(auto& ringLED : allLEDs) rawLEDs[ringLED.index] = CRGB(currentRed, currentGreen, currentBlue);
    }
    else for(auto& ringLED : allLEDs) rawLEDs[ringLED.index] = CRGB(0, 0, 0);
  	FastLED.show();
  }
}
