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

unsigned char* hexstr_to_char(const char* hexstr)
{
    size_t len = strlen(hexstr);
    size_t final_len = len / 2;
    unsigned char* chrs = (unsigned char*)malloc((final_len+1) * sizeof(*chrs));
    for (size_t i=0, j=0; j<final_len; i+=2, j++)
        chrs[j] = (hexstr[i] % 32 + 9) % 25 * 16 + (hexstr[i+1] % 32 + 9) % 25;
    chrs[final_len] = '\0';
    return chrs;
}

void initialiseWifi(ConfigurableSettings& settings, std::function<void()>& saveConfig){
  uint8* mac = hexstr_to_char(MAC_ADDR);
  if(wifi_set_macaddr(STATION_IF, mac)) Serial.println("MAC Address Changed: " MAC_ADDR);

  wm.setCustomHeadElement("<style>body{background:#090910;color:#ececec!important;font-family:'SF Pro Display',-apple-system,BlinkMacSystemFont,'SF Pro Text'}.msg,form[action*=exit],form[action*=info],h3{display:none}button,input[type=button],input[type=submit]{cursor:pointer;border:0;background-color:#ffb400;border:none;border-radius:2px;color:#fff;line-height:2.4rem;font-size:1.2rem;width:100%}.wrap{position:absolute;top:0;left:0;width:100vw;height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center}form{width:80%}h1{font-weight:200}h1:after{content:\"Connect your light to Wifi\";display:block;font-size:1rem;opacity:.8}a{color:#ececec;font-weight:200}a:hover{color:#ff0084;text-decoration:none!important;font-weight:400}.q:after{display:none;}.q:before{content:\"Secure\";background:0 0!important;color:#ffb400;font-size:.8rem}#p,#s{border:none;height:2.5rem;padding-left:1rem;border-radius:2px}.wrap>div:first-child:before{content:\"Select a Network or Enter Your Own\";font-size:1.25rem;font-weight:300;position:absolute;top:3rem;width:100vw;left:50%;transform:translateX(-50%);display:block;text-align:center;}</style>");
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
      if(shows.find(arg) != shows.end()) settings.showId = arg;
      changed = true;
    }

    if(server.hasArg("showMode")){
      int arg = atoi(server.arg("showMode").c_str());
      settings.showMode = arg;
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
      "showMode " + String(settings.showMode) + "\n" +
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
