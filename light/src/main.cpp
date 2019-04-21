#include <cmath>
#include <vector>
#include <algorithm>
#include <functional>
#include <stdlib.h>
#include <string.h>

#include <Arduino.h>
#include <FastLED.h>
// #include <Crypto.h>
// #include <SHA256.h>

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
  //
  // // const char *key;
  // const char *data = "The quick brown fox jumps over the lazy dog";
  // SHA256 sha256;
  // uint8_t result[32];
  // // uint8_t correct[32] = {0xf7, 0xbc, 0x83, 0xf4, 0x30, 0x53, 0x84, 0x24,
  // //    0xb1, 0x32, 0x98, 0xe6, 0xaa, 0x6f, 0xb1, 0x43,
  // //    0xef, 0x4d, 0x59, 0xa1, 0x49, 0x46, 0x17, 0x59,
  // //    0x97, 0x47, 0x9d, 0xbc, 0x2d, 0x1a, 0x3c, 0xd8};
  //
  // sha256.resetHMAC(key, strlen(key));
  // sha256.update(data, strlen(data));
  // sha256.finalizeHMAC(key, strlen(key), result, sizeof(result));

  // for(int i = 0; i < sizeof(result); i++) Serial.println(result[i]);
  // Serial.println("Done");
  // Serial.println(strlen(key));

  // if(!memcmp(result, correct, sizeof(correct))) Serial.println("Passed");
  // else Serial.println("Failed");
}

void loop() {
  loopWifi();
  loopCoordinator(settings);
}
