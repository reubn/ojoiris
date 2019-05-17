#include <cmath>
#include <vector>
#include <algorithm>
#include <functional>
#include <stdlib.h>
#include <string.h>

#include <Arduino.h>
#include <FastLED.h>
#include <ESP_EEPROM.h>

#include "main.hpp"

#include "./ringLEDs/main.hpp"
#include "./wifi/main.hpp"

#include "./shows/coordinator/main.hpp"

ConfigurableSettings settings;
// ConfigurableSettings settingsEEPROM;

int eepromTimeout = (5 * 1000);
unsigned long lastChange;
bool needChange = false;

std::function<void()> saveConfig = [&](){
  lastChange = millis();
  needChange = true;
};

void setup() {
	Serial.begin(9600);

  EEPROM.begin(sizeof(ConfigurableSettings));
  if(EEPROM.percentUsed()>=0) {
    EEPROM.get(0, settings);
    Serial.println("Restoring Settings from EEPROM");
    Serial.print(EEPROM.percentUsed());
    Serial.println("% used");
  } else Serial.println("EEPROM Erased");

  initialiseLEDs(settings.globalBrightness);
  initialiseWifi(settings, saveConfig);
}

void loop() {
  loopWifi();
  loopCoordinator(settings);

  if(needChange && millis() >= lastChange + eepromTimeout) {
    EEPROM.put(0, settings);
    boolean ok = EEPROM.commit();
    Serial.println((ok) ? "Config Saved" : "Config Save Failed");
    needChange = false;
  }
}
