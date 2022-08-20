# ANGULAR RESOLVER

## Back-End

- Net 6
- Dapper
- EF Core
- Swagger
- Pagination

## Front-End

- Angular
- Angular Material
- Tailwind
- PDFMake
- Pagination
- Resolver

#

# Back

### POC abordando conceito de paginação utilizando o header e o body para apresentar informações referente a paginação (total, pagesize, currentpage, totalpages, etc).

#

- Paginação retornando informações no body.

<img src=".docs/images/img-1.png" alt="image"/>

- Paginação retornando informações no header (x-pagination).

<img src=".docs/images/img-2.png" alt="image"/>

#

# Front

### Lógica concentrada no serviço para compartilhamento e atualização de informações (produtos).

#

- Lógica utilizando o componente Pai para armazenar e distribuir os dados.

<img src=".docs/images/img-3.png" alt="image"/>

- Lógica utilizando serviço para armazenar e distribuir os dados.

<img src=".docs/images/img-4.png" alt="image"/>

- Lógica utilizando resolver.

<img src=".docs/images/img-5.png" alt="image"/>

- Exemplo de descentralização.

<img src=".docs/images/img-6.png" alt="image"/>

- Página de listagem (utilizando resolver).

<img src=".docs/images/img-7.png" alt="image"/>

- Detalhes do produto (utilizando resolver).

<img src=".docs/images/img-8.png" alt="image"/>

- Exemplo de geração de PDF (PDFMake).

<img src=".docs/images/img-9.png" alt="image"/>
