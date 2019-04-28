#include <cmath>
#include <vector>
#include <algorithm>
#include <functional>
#include <stdlib.h>
#include <string.h>

#include <Arduino.h>
#include <FastLED.h>

#include "main.hpp"
#include "secrets.hpp"

#include "./ringLEDs/main.hpp"
#include "./wifi/main.hpp"

#include "./shows/coordinator/main.hpp"

ConfigurableSettings settings;

void setup() {
	Serial.begin(9600);

  initialiseLEDs(settings.maxBrightness);
  initialiseWifi(settings);
}

void loop() {
  loopWifi();
  loopCoordinator(settings);
}
