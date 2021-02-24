# dagger8224.github.io
this is the homepage project for ***dagger.js***

Please find the nginx configs to start up this site locally:

server { # homepage  
    listen 8286;  
    gzip on;  
    gzip_min_length 1k;  
    gzip_buffers 16 64k;  
    gzip_http_version 1.1;  
    gzip_types text/plain application/json text/css application/javascript application/xml application/x-javascript text/xml application/xml+rss text/javascript application/vnd.ms-fontobject application/x-font-ttf font/opentype image/svg+xml image/x-icon;  
    location / {  
        root /;  
        rewrite ^/(.*)$ ***<your-install-location>***/$1 break;  
    }  
}

