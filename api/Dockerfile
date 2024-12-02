# Usar la imagen base de Laravel Sail con PHP 8.1 y Composer
FROM laravelsail/php81-composer

# Definir el argumento para el grupo WWWGROUP
ARG WWWGROUP

# Actualizar e instalar dependencias necesarias
RUN apt-get update -y && apt-get install -y libpng-dev zlib1g-dev libicu-dev g++ \
    && docker-php-ext-configure intl \
    && docker-php-ext-install exif gd intl zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Crear el grupo 'sail' con el ID de grupo definido en WWWGROUP
RUN groupadd -g ${WWWGROUP} sail || true
