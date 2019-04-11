#include <cmath>
#include <vector>

#include <Arduino.h>
#include <FastLED.h>

#include "allLEDs.h"

void setup() {
	Serial.begin(9600);
	Serial.println("resetting");
  initialiseLEDs();
}

void loop() {
	static int brightnessOuter = 10;
	static int brightnessInner = 255;
	static int mode = 1;
	for(int i = 0; i < allLEDs.size(); i++) rawLEDs[i] = CHSV(0, 0, i < 12 ? brightnessOuter : brightnessInner);

  if(brightnessOuter >= 255) mode = -1;
  if(brightnessOuter <= 10) mode = +1;
	brightnessOuter = brightnessOuter + mode;
	brightnessInner = brightnessInner - mode;
  // Serial.println(brightness);
	FastLED.show();
	FastLED.delay(1000 / (brightnessOuter > 50 ? 80 : (brightnessOuter == 10 ? 2 : 120)));
}
