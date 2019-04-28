#include <string>
#include <algorithm>

#include <WiFiManager.h> // https://github.com/tzapu/WiFiManager
#include <ESP8266mDNS.h>
#include <ESP8266WebServer.h>
#include <SHA256.h>

#include "../main.hpp"
#include "../secrets.hpp"
#include "../shows/coordinator/main.hpp"

#include "main.hpp"

WiFiManager wm;
ESP8266WebServer server(80);

SHA256 sha256;
uint8_t HMAC[32];

constexpr char hexmap[] = {'0', '1', '2', '3', '4', '5', '6', '7',
                           '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'};

std::string hexStr(unsigned char *data, int len)
{
  std::string s(len * 2, ' ');
  for (int i = 0; i < len; ++i) {
    s[2 * i]     = hexmap[(data[i] & 0xF0) >> 4];
    s[2 * i + 1] = hexmap[data[i] & 0x0F];
  }
  return s;
}

void CORSHeaders(){
  Serial.println("CORS");
  // if(server.hasHeader("Origin")) {
  //   bool allowed = false;
  //   const char *origin = server.header("Origin").c_str();
  //   Serial.println(origin);
  //
  //   for(auto& allowedOrigin : allowedOrigins){
  //     Serial.println(allowedOrigin.c_str());
  //     if(allowed == true || std::string(origin).find(allowedOrigin) != std::string::npos) allowed = true;
  //   }
  //
  //   if(allowed) server.sendHeader("Access-Control-Allow-Origin", origin);
  // }
  server.sendHeader("Access-Control-Allow-Origin", "*");


  server.sendHeader("Access-Control-Allow-Methods", "POST,GET,OPTIONS");
  server.sendHeader("Access-Control-Max-Age", "10000");
  server.sendHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
}

void initialiseWifi(ConfigurableSettings& settings){
  std::string SSID = std::string("Ojoiris-").append(std::string(lightID));
  std::string mdnsName = std::string("ojoiris-").append(std::string(lightID));

  wm.setConfigPortalBlocking(false);
  if(wm.autoConnect(SSID.c_str(), wifiPassword)) Serial.println("WiFi Connection Established");

  if(MDNS.begin(mdnsName.c_str())) Serial.println("mDNS Running");

  server.on("/", HTTP_OPTIONS, []() {
    CORSHeaders();
    server.send(200, "text/plain", "OK");
  });

  server.on("/", HTTP_GET, [&](){
    CORSHeaders();
    server.sendHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    server.sendHeader("Pragma", "no-cache");
    server.sendHeader("Expires", "0");

    if(!server.hasArg("hmac")){
      server.send(401, "text/plain", "No HMAC");
      return;
    }

    std::string params = "";
    for (int i = 0; i < server.args(); i++) params += std::string(server.argName(i).c_str()).compare("hmac") == 0 ? "" : std::string(server.argName(i).c_str()) + "=" + std::string(server.arg(i).c_str()) + "&";

    std::string suppliedHMAC = server.arg("hmac").c_str();
    std::string calculatedHMAC;
    const char *argumentList = params.data();
	  // params.copy(argumentList, params.size() + 1);

    sha256.resetHMAC(key, strlen(key));
    sha256.update(argumentList, strlen(argumentList));
    sha256.finalizeHMAC(key, strlen(key), HMAC, sizeof(HMAC));

    calculatedHMAC = hexStr(HMAC, sizeof(HMAC));

    // Serial.println(params.c_str());
    // Serial.println(suppliedHMAC.c_str());
    // Serial.println(calculatedHMAC.c_str());

    if(suppliedHMAC.compare(calculatedHMAC) != 0) {
      server.send(403, "text/plain", "HMAC Invalid");
      return;
    }

    if(server.hasArg("show")){
      int arg = atoi(server.arg("show").c_str());
      if (shows.find(arg) != shows.end()) settings.showId = arg;
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

    if(server.hasArg("red")){
      std::string arg = server.arg("red").c_str();
      settings.red = atoi(arg.c_str());
    }

    if(server.hasArg("green")){
      std::string arg = server.arg("green").c_str();
      settings.green = atoi(arg.c_str());
    }

    if(server.hasArg("blue")){
      std::string arg = server.arg("blue").c_str();
      settings.blue = atoi(arg.c_str());
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
      // "HMAC " + String((char*)HMAC) + "\n" +
      "show " + String(settings.showId) + "\n" +
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
