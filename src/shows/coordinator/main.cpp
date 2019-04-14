#include <map>
#include <string>

#include "../../main.hpp"
#include "../../ringLEDs/main.hpp"

#include "./shows/rainbowBreathe.hpp"
#include "./shows/ringFade.hpp"

std::map<std::string, void (*)(ConfigurableSettings& settings)> shows{{"rainbowBreathe", loopRainbowBreathe}, {"ringFade", loopRingFade}};
std::string lastShow;

void initialiseCoordinator(ConfigurableSettings& settings){};

void loopCoordinator(ConfigurableSettings& settings){
  if(settings.show.compare(lastShow) != 0) {
    for(auto& ringLED : allLEDs) rawLEDs[ringLED.index] = CHSV(0, 0, 0);
    Serial.println("Changing Show");
  };

  lastShow = settings.show;
  shows[settings.show](settings);
};
