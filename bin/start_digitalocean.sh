#!/usr/bin/env bash

openssl x509 -passin pass:passwd -req -days 365 -in openbattles.csr -signkey openbattles.key -out openbattles.crt \
gunicorn wsgi:app --worker-tmp-dir /dev/shm --bind 0.0.0.0:8443 --log-level=debug --workers=3 --certfile=openbattles.crt 
--keyfile=openbattles.key