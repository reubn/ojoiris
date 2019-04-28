#!/bin/sh

CAPASS=`cat caRoot.secret.pwd`

if [ -f caRoot.secret.key ]; then
  echo CA Root key already exists
else
  openssl genrsa -aes256 -passout pass:$CAPASS -out caRoot.secret.key 2048
  openssl req -config /usr/local/etc/openssl/openssl.cnf -x509 -passin pass:$CAPASS \
   -subj '/C=UK/OU=Ojoiris/O=Reuben/CN=Ojoiris Certificate Authority/' \
   -new -nodes -extensions v3_ca \
   -key caRoot.secret.key -days 10950 -out caRoot.secret.crt -sha512
fi
