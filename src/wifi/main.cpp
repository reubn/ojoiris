#include <string>

#include <WiFiManager.h> // https://github.com/tzapu/WiFiManager
#include <ESP8266mDNS.h>
#include <ESP8266WebServer.h>

#include "../main.hpp"
#include "../shows/coordinator/main.hpp"

#include "main.hpp"

WiFiManager wm;
ESP8266WebServer server(80);

void initialiseWifi(ConfigurableSettings& settings){
  wm.setConfigPortalBlocking(false);

  if(wm.autoConnect("Ojoiris", "noruega1911")) Serial.println("WiFi Connection Established");

  if(MDNS.begin("ojoiris")) Serial.println("mDNS Runnings");

  server.on("/", [&](){
    if(server.hasArg("show")){
      std::string arg = server.arg("show").c_str();
      if (shows.find(arg) != shows.end()) settings.show = arg;
    }

    if(server.hasArg("topHold")){
      std::string arg = server.arg("topHold").c_str();
      settings.topHold = atoi(arg.c_str());
    }

    if(server.hasArg("bottomHold")){
      std::string arg = server.arg("bottomHold").c_str();
      settings.bottomHold = atoi(arg.c_str());
    }

    if(server.hasArg("transitionLength")){
      std::string arg = server.arg("transitionLength").c_str();
      settings.transitionLength = atoi(arg.c_str());
    }

    if(server.hasArg("dimmingLength")){
      std::string arg = server.arg("dimmingLength").c_str();
      settings.dimmingLength = atoi(arg.c_str());
    }

    if(server.hasArg("colourOffsetIncrement")){
      std::string arg = server.arg("colourOffsetIncrement").c_str();
      settings.colourOffsetIncrement = atof(arg.c_str());
    }

    if(server.hasArg("fps")){
      std::string arg = server.arg("fps").c_str();
      settings.fps = atof(arg.c_str());
    }

    if(server.hasArg("brightness")){
      std::string arg = server.arg("brightness").c_str();
      settings.maxBrightness = atoi(arg.c_str());
    }

    if(server.hasArg("enabled")){
      std::string enabledArg = server.arg("enabled").c_str();
      settings.enabled = enabledArg.compare("true") == 0;
    }

    if(server.hasArg("resetWifi")){
      wm.resetSettings();
      Serial.println("Wifi Settings Reset");
    }

    String response =
      "show " + String(settings.show.c_str()) + "\n" +
      "brightness " + String(settings.maxBrightness) + "\n" +
      "topHold " + String(settings.topHold) + "\n" +
      "bottomHold " + String(settings.bottomHold) + "\n" +
      "transitionLength " + String(settings.transitionLength) + "\n" +
      "dimmingLength " + String(settings.dimmingLength) + "\n" +
      "colourOffsetIncrement " + String(settings.colourOffsetIncrement) + "\n" +
      "fps " + String(settings.fps) + "\n" +
      "enabled " + String(settings.enabled) + "\n";


    server.send(200, "text/plain", response);
  });
  server.begin();
  Serial.println("HTTP Server Started");
}

void loopWifi(){
  wm.process();
  MDNS.update();
  server.handleClient();
}
