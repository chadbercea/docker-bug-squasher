FROM nginx:alpine

# Copy the game files to nginx html directory
COPY public/ /usr/share/nginx/html/

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Add some metadata
LABEL maintainer="Docker Bug Squasher Team"
LABEL description="A PS1-style arcade game where you squash Docker pun-bugs!"
LABEL version="1.0.0"

# Start nginx
CMD ["nginx", "-g", "daemon off;"]