#!/bin/bash

device="nodemcu"

. ./deviceConfig.secret.conf

domain="ojoiris-${lightID}.local"
domainLower=`echo "$domain" | tr '[:upper:]' '[:lower:]'`
mDNSDomain="${domain//\.local/}"
ssid="Ojoiris-${lightID}"

certificatePath="$(pwd)/ssl/${domainLower}.secret.crt.h"
keyPath="$(pwd)/ssl/${domainLower}.secret.key.h"

certificateVariable="${domain//[.-]/_}_secret_crt_der"
keyVariable="${domain//[.-]/_}_secret_key_der"

certificateLengthVariable="${domain//[.-]/_}_secret_crt_der_len"
keyLengthVariable="${domain//[.-]/_}_secret_key_der_len"

if [ -f $certificatePath ]; then
  echo "Certificate Exists Already - using"
else
  pio run -t clean
  cd ./ssl && ./createCert.sh ${domain} && cd ../
fi

export OJOIRIS_BUILD_FLAGS="-D LIGHT_ID=\"\\\"${lightID}\"\\\" -D MDNS_DOMAIN=\"\\\"${mDNSDomain}\"\\\" -D WIFI_SSID=\"\\\"${ssid}\"\\\" -D WIFI_PASS=\"\\\"${wifiPassword}\\\"\" -D DEVICE_KEY=\"\\\"${deviceKey}\"\\\" -D CERT_PATH=\"\\\"${certificatePath}\"\\\" -D KEY_PATH=\"\\\"${keyPath}\"\\\" -D CERT_VAR=\"${certificateVariable}\" -D KEY_VAR=\"${keyVariable}\" -D CERT_LEN_VAR=\"${certificateLengthVariable}\" -D KEY_LEN_VAR=\"${keyLengthVariable}\""

pio run -e "$device" && pio run -t upload -e "$device" && pio run -t monitor -e "$device"
