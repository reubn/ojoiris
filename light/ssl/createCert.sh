#!/bin/sh

CAPASS=`cat caRoot.secret.pwd`

CN=$1

openssl genrsa -out "$CN.secret.key" 2048

cat > $CN.secret.reqcfg <<EOT
[ req ]
default_bits = 2048
prompt = no
default_md = sha256
distinguished_name = dn

[ dn ]
C=UK
O=Reuben
OU=Ojoiris
CN=$CN
EOT

openssl req -new -key "$CN.secret.key" -out "$CN.secret.csr" -sha512 -passin pass: \
  -config $CN.secret.reqcfg

cat > $CN.secret.sigcfg <<EOT
[ server ]
keyUsage                = critical,digitalSignature,keyEncipherment
extendedKeyUsage        = serverAuth
basicConstraints        = CA:FALSE
subjectKeyIdentifier    = hash
authorityKeyIdentifier  = keyid,issuer:always
subjectAltName = @alt_names

[ alt_names ]
DNS.1 = $CN
EOT

openssl x509 -req -in "$CN.secret.csr" \
        -CA caRoot.secret.crt -CAkey caRoot.secret.key -CAcreateserial \
        -passin pass:$CAPASS \
        -out "$CN.secret.crt" -days 3650 -sha512 \
        -extfile $CN.secret.sigcfg -extensions server

cat caRoot.secret.crt >> "$CN.secret.crt"

openssl rsa -in "$CN.secret.key" -outform DER -out "$CN.secret.key.der"
openssl x509 -in "$CN.secret.crt" -outform DER -out "$CN.secret.crt.der"

xxd -i "$CN.secret.key.der" > "$CN.secret.key.h"
xxd -i "$CN.secret.crt.der" > "$CN.secret.crt.h"
