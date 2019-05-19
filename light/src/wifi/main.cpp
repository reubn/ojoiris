#include <string>
#include <algorithm>
#include <functional>

#include <Arduino.h>
#include <WiFiManager.h> // https://github.com/tzapu/WiFiManager
#include <ESP8266mDNS.h>
#include <ESP8266WebServer.h>
// #include <ESP8266WebServerSecure.h>
#include <SHA256.h>

#include "../main.hpp"
#include "../shows/coordinator/main.hpp"

// #include CERT_PATH
// #include KEY_PATH

#include "main.hpp"

WiFiManager wm;
ESP8266WebServer server(80);
// BearSSL::ESP8266WebServerSecure server(443);

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
  // Serial.println("CORS");

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

void initialiseWifi(ConfigurableSettings& settings, std::function<void()>& saveConfig){
  wm.setConfigPortalBlocking(false);
  if(wm.autoConnect(WIFI_SSID, WIFI_PASS)) Serial.println("WiFi Connection Established");

  if(MDNS.begin(MDNS_DOMAIN)) Serial.println("mDNS Running: " MDNS_DOMAIN);

  // server.setRSACert(
  //   new BearSSL::X509List(CERT_VAR, CERT_LEN_VAR),
  //   new BearSSL::PrivateKey(KEY_VAR, KEY_LEN_VAR));

  server.on("/", HTTP_OPTIONS, []() {
    CORSHeaders();
    server.send(200, "text/plain", "OK");
  });

  server.on("/", HTTP_GET, [&](){
    CORSHeaders();
    server.sendHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    server.sendHeader("Pragma", "no-cache");
    server.sendHeader("Expires", "0");

    if(server.args() > 0) {
      if(!server.hasArg("hmac")){
        server.send(401, "text/plain", "No HMAC");
        return;
      }

      std::string params = "";
      for (int i = 0; i < server.args(); i++) params += std::string(server.argName(i).c_str()).compare("hmac") == 0 ? "" : (params.length() > 0 ? "&" : "") + std::string(server.argName(i).c_str()) + "=" + std::string(server.arg(i).c_str());

      std::string suppliedHMAC = server.arg("hmac").c_str();
      std::string calculatedHMAC;
      const char *argumentList = params.data();
  	  // params.copy(argumentList, params.size() + 1);

      sha256.resetHMAC(DEVICE_KEY, strlen(DEVICE_KEY));
      sha256.update(argumentList, strlen(argumentList));
      sha256.finalizeHMAC(DEVICE_KEY, strlen(DEVICE_KEY), HMAC, sizeof(HMAC));

      calculatedHMAC = hexStr(HMAC, sizeof(HMAC));

      // Serial.println(params.c_str());
      // Serial.println(suppliedHMAC.c_str());
      // Serial.println(calculatedHMAC.c_str());

      if(suppliedHMAC.compare(calculatedHMAC) != 0) {
        server.send(403, "text/plain", "HMAC Invalid");
        return;
      }

      if(!server.hasArg("timestamp") || abs(atoi(server.arg("timestamp").c_str()) - int(millis())) > (2 * 1000)) {
        server.send(403, "text/plain", "Timestamp Invalid " + String(millis()));
        return;
      }
    }

    bool changed = false;

    if(server.hasArg("show")){
      int arg = atoi(server.arg("show").c_str());
      if (shows.find(arg) != shows.end()) settings.showId = arg;
      changed = true;
    }

    if(server.hasArg("brightness")){
      std::string arg = server.arg("brightness").c_str();
      settings.globalBrightness = atoi(arg.c_str());
      changed = true;
    }

    if(server.hasArg("hue")){
      std::string arg = server.arg("hue").c_str();
      settings.hue = atoi(arg.c_str());
      changed = true;
    }

    if(server.hasArg("saturation")){
      std::string arg = server.arg("saturation").c_str();
      settings.saturation = atoi(arg.c_str());
      changed = true;
    }

    if(server.hasArg("value")){
      std::string arg = server.arg("value").c_str();
      settings.value = atoi(arg.c_str());
      changed = true;
    }

    if(server.hasArg("enabled")){
      std::string enabledArg = server.arg("enabled").c_str();
      settings.enabled = enabledArg.compare("true") == 0;
      changed = true;
    }

    if(server.hasArg("resetWifi")){
      wm.resetSettings();
      Serial.println("Wifi Settings Reset");
    }

    if(changed) saveConfig();

    String response =
      // "HMAC " + String((char*)HMAC) + "\n" +
      "timestamp " + String(millis()) + "\n" +
      "value " + String(settings.value) + "\n" +
      "saturation " + String(settings.saturation) + "\n" +
      "hue " + String(settings.hue) + "\n" +
      "show " + String(settings.showId) + "\n" +
      "brightness " + String(settings.globalBrightness) + "\n" +
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
