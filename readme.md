# POC 1

- POC abordando conceito de paginação no back-end utilizando o cabeçalho (header) e o copor (body) para apresentar informações referente a paginação (total, pagesize, currentpage, totalpages, etc).
- E lógica concentrada no servico (service) no front-end para compartilhamento de e atualização de informações (produtos).

By Guilherme Lima

# Back

- Retorno com paginação retornando informações no corpo (body)

<img src=".docs/img-1.png" alt="My cool logo"/>

- Retorno com paginação retornando informações no cabeçalho (header) - x-pagination

<img src=".docs/img-2.png" alt="My cool logo"/>

# Front

- Lógica utilizando o componente para armazenar e manipular os dados

<img src=".docs/img-8.png" alt="My cool logo"/>

- Lógica utilizando serviço para armazenar e manipular os dados

<img src=".docs/img-9.png" alt="My cool logo"/>

- Fazendo uso de resolver para obter dados durante a navegação - ProdutoResolver

<img src=".docs/img-3.png" alt="My cool logo"/>

- Método para obter lista e armazenar lista no serviço (service) -

<img src=".docs/img-4.png" alt="My cool logo"/>

- Método para atualizar um item específico da lista

<img src=".docs/img-5.png" alt="My cool logo"/>

- Método para remover um item específico da lista

<img src=".docs/img-6.png" alt="My cool logo"/>

- Estrutura de pastas em cada módulo separando componente (component) por página (page)

<img src=".docs/img-7.png" alt="My cool logo"/>