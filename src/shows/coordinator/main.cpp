#include <map>

#include "../../main.hpp"
#include "../../ringLEDs/main.hpp"

#include "./shows/rainbowBreathe.hpp"
#include "./shows/ringFade.hpp"

std::map<int, void (*)(ConfigurableSettings& settings)> shows{{0, loopRainbowBreathe}, {1, loopRingFade}};
int lastShow;

void initialiseCoordinator(ConfigurableSettings& settings){};

void loopCoordinator(ConfigurableSettings& settings){
  if(settings.showId != lastShow) {
    for(auto& ringLED : allLEDs) rawLEDs[ringLED.index] = CHSV(0, 0, 0);
    Serial.println("Changing Show");
  };

  lastShow = settings.showId;
  shows[settings.showId](settings);
};
