#include <WiFiManager.h> // https://github.com/tzapu/WiFiManager
#include <ESP8266mDNS.h>
#include <ESP8266WebServer.h>

#include "main.h"

WiFiManager wm;
ESP8266WebServer server(80);

void initialiseWifi(ConfigurableSettings& settings){
  wm.setConfigPortalBlocking(false);

  if(wm.autoConnect("Ojoiris", "noruega1911")) Serial.println("WiFi Connection Established");

  if(MDNS.begin("ojoiris")) Serial.println("mDNS Runnings");

  server.on("/", [&](){
    if(server.hasArg("topHold")){
      String arg = String(server.arg("topHold"));
      settings.topHold = atoi(arg.c_str());
    }

    if(server.hasArg("bottomHold")){
      String arg = String(server.arg("bottomHold"));
      settings.bottomHold = atoi(arg.c_str());
    }

    if(server.hasArg("transitionLength")){
      String arg = String(server.arg("transitionLength"));
      settings.transitionLength = atoi(arg.c_str());
    }

    if(server.hasArg("dimmingLength")){
      String arg = String(server.arg("dimmingLength"));
      settings.dimmingLength = atoi(arg.c_str());
    }

    if(server.hasArg("colourOffsetIncrement")){
      String arg = String(server.arg("colourOffsetIncrement"));
      settings.colourOffsetIncrement = atof(arg.c_str());
    }

    if(server.hasArg("fps")){
      String arg = String(server.arg("fps"));
      settings.fps = atof(arg.c_str());
    }

    if(server.hasArg("brightness")){
      String arg = String(server.arg("brightness"));
      settings.maxBrightness = atoi(arg.c_str());
    }

    if(server.hasArg("enabled")){
      String enabledArg = String(server.arg("enabled"));
      settings.enabled = enabledArg == "true";
    }

    if(server.hasArg("resetWifi")){
      wm.resetSettings();
      Serial.println("Wifi Settings Reset");
    }

    String response =
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
