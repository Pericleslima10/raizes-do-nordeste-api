Raízes do Nordeste - API Backend
API backend desenvolvida para o projeto multidisciplinar da trilha de Back-End.
O sistema simula uma plataforma de pedidos para restaurante com suporte a múltiplos canais: APP, WEB, TOTEM e BALCÃO.

Tecnologias Utilizadas
Node.js e Express (servidor e rotas)
Prisma ORM (modelagem e acesso ao banco)
PostgreSQL (banco de dados relacional)
JWT (autenticação)
bcryptjs (criptografia de senha)
dotenv (variáveis de ambiente)
Swagger (documentação da API)
CORS (segurança e controle de acesso)

Objetivo do Projeto
Gerenciar um restaurante digital com funcionalidades como:
Cadastro de usuários e autenticação
Gestão de produtos e categorias
Controle de estoque
Criação de pedidos e gerenciamento
Pagamentos simulados
Sistema de fidelidade
Logs de auditoria
Suporte a múltiplos canais de venda: APP, WEB, TOTEM e BALCÃO

Banco de Dados
Modelado em PostgreSQL utilizando Prisma ORM.

Principais entidades:
Usuários
Produtos
Categorias
Pedidos
Itens de pedido
Estoque
Pagamentos
Unidades
Fidelidade
Logs de auditoria

Como rodar o projeto localmente
Clonar o repositório

bash
git clone https://github.com/Pericleslima10/raizes-do-nordeste-api.git
cd raizes-do-nordeste-api
Instalar dependências

bash
npm install
Configurar variáveis de ambiente  
Criar arquivo .env na raiz do projeto:

env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/raizes"
JWT_SECRET="sua_chave_secreta"
PORT=3000
Configurar Prisma

bash
npx prisma generate
npx prisma migrate dev
Rodar o servidor

bash
npm run dev

Acessar API
Após iniciar o servidor:
http://localhost:3000

Documentação Swagger
Se configurado:
http://localhost:3000/api-docs

Autenticação
A API utiliza JWT.

Fluxo:
Login do usuário
Retorno de token JWT
Envio do token no header:

Código
Authorization: Bearer <token>

Scripts disponíveis
npm run dev → inicia o servidor em modo desenvolvimento

Observações
Nunca subir .env
Nunca subir node_modules
Rodar npm install após clonar
Sempre gerar Prisma antes de rodar

Autor
Pericles Lima  