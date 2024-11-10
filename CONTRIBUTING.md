
## 👋 Bem-vindo(a)!

Se você chegou até aqui, é porque tem interesse em contribuir com o WhichTeacher! Antes de começar, leia este guia para entender como você pode colaborar da melhor forma possível.

---

## 🤔 Como contribuir?

Você pode sugerir uma nova funcionalidade, propor melhorias ou escolher uma das [issues em aberto](https://github.com/vinimarques7/projeto-FDS/issues) para resolver.

---

## 📁 Configurando o repositório

1. **Faça um Fork do Repositório:** Crie uma cópia do repositório na sua conta para realizar alterações sem afetar o repositório principal.

2. **Clone o repositório:**
   ```bash
   git clone https://github.com/vinimarques7/projeto-FDS.git
   ```

3. **Crie sua Branch:**
   ```bash
   git checkout -b minha-nova-funcionalidade
   ```

---

## 💻 Configurando o ambiente de desenvolvimento

1. **Entre no Diretório do Projeto:**
   ```bash
   cd projeto-FDS
   ```

2. **Crie um Ambiente Virtual:**
   ```bash
   python -m venv venv
   ```

3. **Ative o Ambiente Virtual:**
   - Windows:
     ```bash
     venv\Scripts\activate
     ```
   - Linux/Mac:
     ```bash
     source venv/bin/activate
     ```

4. **Instale as Dependências:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Aplique as Migrations (Criar o Banco de Dados):**
   ```bash
   python manage.py migrate
   ```

6. **Rode o Servidor:**
   ```bash
   python manage.py runserver
   ```

### Rodando os testes

Para garantir que seu código não afete outras partes do projeto:

1. **Baixe o [Node](https://nodejs.org/en) na versão LTS.**

2. **Instale as dependências:**
   ```bash
   npm ci
   ```

3. **Execute os testes:**
   ```bash
   npx cypress run
   ```

---

## 🛰️ Submetendo suas Alterações

Quando terminar, abra um Pull Request com uma descrição detalhada das alterações realizadas.

1. **No repositório do seu fork, clique em `Contribute`.**

2. **Clique em `Open pull request`.**

3. **Selecione o repositório e a branch onde realizou as alterações.**

4. **Para finalizar, clique em `Create pull request`.**

Nós da equipe do WhichTeacher iremos avaliar sua submissão. Se necessário, entraremos em contato para revisarmos o seu código.

---

## ❤️ Obrigado por Contribuir!

Estamos ansiosos para receber suas sugestões e melhorias! Caso tenha dúvidas, entre em contato conosco através do e-mail: [contato.whichteacher@gmail.com](mailto:contato.whichteacher@gmail.com).
