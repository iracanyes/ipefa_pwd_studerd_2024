# IPEFA Projet Web 2024 - API 

## Install

### Set environmnent variables

1. Copy ``./.env.dist`` to ``./.env`` and change the following values

````dotenv
### JWT
BACKEND_JWT_TOKEN_SECRET=!CHANGE_ME!
# For testing, set token expires to higher
BACKEND_JWT_TOKEN_EXPIRE_IN=15m
BACKEND_JWT_REFRESH_TOKEN_SECRET=!CHANGE_ME!
BACKEND_JWT_REFRESH_TOKEN_EXPIRE_IN=1w
###

# IF you use Docker network to connect with db container
# use the docker network container name instead
# BACKEND_DB_HOST=db
BACKEND_DB_HOST=localhost
BACKEND_DB_USERNAME=ralphi
BACKEND_DB_PASSWORD=P@ssword
````

If your environment variables have different keys name ,
Change the value of the keys to correspond with your environment variables in the file ``common/enum/ConfigKeyEnum.enum.ts``  
````shell

````

 