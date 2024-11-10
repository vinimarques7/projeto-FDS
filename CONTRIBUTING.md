
# Contribuindo para o WhichTeacher

Obrigado por considerar contribuir para o projeto WhichTeacher! Aqui estão algumas diretrizes para tornar o processo de contribuição o mais eficiente e colaborativo possível.

## Como Contribuir

1. **Leia as Issues**: Verifique se o problema que você deseja resolver já existe no [Issue Tracker](https://github.com/vinimarques7/projeto-FDS/issues). Discuta sua solução na issue antes de começar a trabalhar.
2. **Fork o Repositório**: Crie um fork deste repositório para trabalhar nas suas mudanças.
3. **Clone o Projeto**:
   ```bash
   git clone https://github.com/vinimarques7/projeto-FDS.git
   cd projeto-FDS
   ```
4. **Crie uma Branch**: Organize sua contribuição em uma nova branch.
   ```bash
   git checkout -b minha-nova-feature
   ```

## Padrões de Código

- **Python**: Certifique-se de que o código siga as convenções do PEP8. Utilize o `flake8` ou `black` para ajudar.
- **HTML/CSS**: Mantenha uma estrutura semântica no HTML e utilize classes CSS descritivas e bem documentadas.
- **JavaScript**: Escreva código claro e modular. Utilize o `eslint` para manter a consistência.

## Configuração do Ambiente de Desenvolvimento

Este projeto utiliza **Django** e **PostgreSQL**. Para configurar o ambiente de desenvolvimento:

1. **Instale as dependências**:
   ```bash
   pip install -r requirements.txt
   ```
2. **Configure o banco de dados**: Crie um banco de dados PostgreSQL e defina as variáveis de ambiente.
3. **Faça as migrações**:
   ```bash
   python manage.py migrate
   ```
4. **Inicie o servidor local**:
   ```bash
   python manage.py runserver
   ```

## Submetendo Sua Contribuição

1. **Commit e Push**: Faça commits concisos e descritivos e dê push para a sua branch.
   ```bash
   git add .
   git commit -m "Descrição clara da alteração"
   git push origin minha-nova-feature
   ```
2. **Abra um Pull Request**: Acesse o repositório no GitHub e abra um Pull Request. Explique as mudanças e mencione as issues relacionadas, se houver.

### Exemplo de Mensagem de Commit

```
[Feature] Adiciona filtragem de professores por matéria e nível de ensino
```

## Revisão de Código

Após submeter um Pull Request:
- Seu código será revisado para assegurar que está de acordo com as diretrizes e padrões do projeto.
- Faremos sugestões de mudanças, se necessário. 

## Reportando Bugs e Solicitando Funcionalidades

1. **Bugs**: Descreva claramente o bug, incluindo como reproduzi-lo, o comportamento esperado e o ambiente.
2. **Funcionalidades**: Descreva a nova funcionalidade desejada e explique como ela melhoraria o projeto.

## Agradecimentos

Agradecemos sua contribuição! Cada melhoria é importante para o desenvolvimento do WhichTeacher, e estamos animados para colaborar com você.
