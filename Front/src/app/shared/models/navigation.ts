export const linkNavigation = [
  {
    id: 'dashboards',
    title: 'Home',
    type: 'basic',
    icon: 'heroicons_outline:home',
    link: '/home',
  },
  {
    id: 'configuracao',
    title: 'Configuração',
    type: 'collapsable',
    icon: 'heroicons_outline:cog',
    children: [
      {
        id: 'api-email',
        title: 'API',
        type: 'basic',
        link: '/api/',
      },
      {
        id: 'mensagem-email',
        title: 'Mensagem',
        type: 'basic',
        link: '/texto/',
      },
    ],
  },
  {
    id: 'log',
    title: 'Log',
    type: 'collapsable',
    icon: 'heroicons_outline:clock',
    children: [
      {
        id: 'log-movimentacao',
        title: 'Movimentação',
        type: 'basic',
        link: '/log/',
      },
    ],
  },
];
