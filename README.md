# dagger8224.github.io
This is the homepage project for ***dagger.js*** (with Microsoft monaco editor v0.31.1 embedded for performance consideration)

Please refer to the following nginx configs to setup the homepage locally:

server { # homepage  
    listen 8286;  
    gzip on;  
    gzip_min_length 1k;  
    gzip_buffers 16 64k;  
    gzip_http_version 1.1;  
    gzip_types text/plain application/json text/css application/javascript application/xml application/x-javascript text/xml application/xml+rss text/javascript application/vnd.ms-fontobject application/x-font-ttf font/opentype image/svg+xml image/x-icon;  
    location / {  
        root /;  
        rewrite ^/(.*)$ <***your-install-location***>/$1 break;  
    }  
}

