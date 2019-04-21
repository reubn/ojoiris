#include <cmath>
#include <vector>

#include <Arduino.h>
#include <FastLED.h>

#include "ringLEDs.hpp"

void ringFade(ConfigurableSettings& settings) {
	static int brightness = 10;
	static int mode = 1;

  if(millis() >= lastExecutionBrightness + settings.fps){
    for(auto& ringLED : outerLEDs) rawLEDs[ringLED.index] = CHSV(0, 0, brightness);
    for(auto& ringLED : innerLEDs) rawLEDs[ringLED.index] = CHSV(0, 0, 255 - brightness);

    if(brightness >= 255) mode = -1;
    if(brightness <= 10) mode = +1;

  	brightness = brightness + mode;
  	FastLED.show();
  }
}
