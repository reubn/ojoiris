#include <WiFiManager.h> // https://github.com/tzapu/WiFiManager
#include <ESP8266mDNS.h>
#include <ESP8266WebServer.h>
WiFiManager wm;
ESP8266WebServer server(80);

void initialiseWifi(int& globalBrightness, boolean& enabled){
  wm.setConfigPortalBlocking(false);

  if(wm.autoConnect("Ojoiris", "noruega1911")) Serial.println("WiFi Connection Established");

  if(MDNS.begin("ojoiris")) Serial.println("mDNS Runnings");

  server.on("/", [&](){
    if(server.hasArg("brightness")){
      String arg = String(server.arg("brightness"));
      globalBrightness = atoi(arg.c_str());
    }

    if(server.hasArg("enabled")){
      String enabledArg = String(server.arg("enabled"));
      enabled = enabledArg == "true";
    }

    if(server.hasArg("resetWifi")){
      wm.resetSettings();
      Serial.println("Wifi Settings Reset");
    }

    server.send(200, "text/plain", String(globalBrightness));
  });
  server.begin();
  Serial.println("HTTP Server Started");
}

void loopWifi(){
  wm.process();
  MDNS.update();
  server.handleClient();
}
