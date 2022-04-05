#!/usr/bin/env bash

# openssl req -x509 -nodes -days 365 -newkey rsa:2048 -subj "/C=US/ST=NY/O=Company/CN=example.com" -keyout openbattles.key -out openbattles.crt && \
gunicorn wsgi:app --bind 0.0.0.0:8080 --log-level=debug --workers=4