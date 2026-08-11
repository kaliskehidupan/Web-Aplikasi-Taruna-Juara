# Dockerfile for Custom Odoo Backend Core
FROM odoo:16.0

USER root

# Install Python extra requirements if needed
RUN pip3 install --no-cache-dir \
    requests \
    pyjwt \
    cryptography

USER odoo
