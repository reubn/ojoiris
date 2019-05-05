#include <vector>

#include <Arduino.h>
#include <FastLED.h>

#include "../main.hpp"
#include "../ringLEDs/main.hpp"

#include "solidColour.hpp"

void loopSolidColour(ConfigurableSettings& settings) {
  static int headingTowardsHue = settings.hue;
  static int headingTowardsSaturation = settings.saturation;
  static int headingTowardsValue = settings.value;

  static int incrementPerFrameHue = 0;
  static int incrementPerFrameSaturation = 0;
  static int incrementPerFrameValue = 0;

  static unsigned long lastExecution = millis();
  static int currentHue = settings.hue;
  static int currentSaturation = settings.saturation;
  static int currentValue = settings.value;

  if(settings.hue != headingTowardsHue || settings.saturation != headingTowardsSaturation || settings.value != headingTowardsValue){
    headingTowardsHue = settings.hue;
    headingTowardsSaturation = settings.saturation;
    headingTowardsValue = settings.value;

    int deltaHue = headingTowardsHue - currentHue;
    int deltaSaturation = headingTowardsSaturation - currentSaturation;
    int deltaValue = headingTowardsValue - currentValue;

    if(abs(deltaHue) > 128) deltaHue = 255 - deltaHue;

    incrementPerFrameHue = deltaHue / (abs(2 * deltaHue / 255) / settings.fps);
    incrementPerFrameSaturation = deltaSaturation / (abs(2 * deltaSaturation / 255) / settings.fps);
    incrementPerFrameValue = deltaValue / (abs(2 * deltaValue / 255) / settings.fps);
  }

  if(millis() >= lastExecution + settings.fps){
    if(settings.enabled){
      if(((incrementPerFrameHue > 0) && (currentHue < headingTowardsHue)) || ((incrementPerFrameHue < 0) && (currentHue > headingTowardsHue))) currentHue += incrementPerFrameHue;
      else currentHue = headingTowardsHue;

      if(((incrementPerFrameSaturation > 0) && (currentSaturation < headingTowardsSaturation)) || ((incrementPerFrameSaturation < 0) && (currentSaturation > headingTowardsSaturation))) currentSaturation += incrementPerFrameSaturation;
      else currentSaturation = headingTowardsSaturation;

      if(((incrementPerFrameValue > 0) && (currentValue < headingTowardsValue)) || ((incrementPerFrameValue < 0) && (currentValue > headingTowardsValue))) currentValue += incrementPerFrameValue;
      else currentValue = headingTowardsValue;

      LEDS.setBrightness(currentValue);
      for(auto& ringLED : allLEDs) rawLEDs[ringLED.index] = CHSV(currentHue, currentSaturation, 255);
    }
    else for(auto& ringLED : allLEDs) rawLEDs[ringLED.index] = CRGB(0, 0, 0);
  	FastLED.show();
  }
}
