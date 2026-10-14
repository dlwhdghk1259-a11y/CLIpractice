<!-- l10n-sync: source-file="workshop/03-agent-mode.md" -->
# Parte 3: Construa o jogo com fluxos de trabalho agênticos

---

Nesta parte, o Copilot passa de planejador a implementador. Em vez de escrever código linha por linha, você descreve o que deseja e deixa o Copilot executar o trabalho nos arquivos que precisar modificar.

## Tarefa 1: Conecte a batalha

<!-- track:vscode:start -->
1. Mude para o modo **Agent** no Copilot Chat.
2. Insira este prompt:
<!-- track:vscode:end -->

<!-- track:cli:start -->
1. Retorne o Copilot CLI ao fluxo padrão de programação (ou permaneça no autopilot se quiser que o Copilot continue até você interrompê-lo).
2. Mencione o arquivo da página para fornecer contexto adicional, se for útil: `@src/pages/index.astro`
3. Insira este prompt:
<!-- track:cli:end -->

   > Add client-side JavaScript to the battle page that:
   > 1. When the Battle button is clicked, gets both usernames from the inputs
   > 2. Validates both are filled (show error if not)
   > 3. Fetches both users' contribution data in parallel from our API
   > 4. Renders contribution graphs as colored grids — each day is a colored square using GitHub's color palette
   > 5. Shows a VS badge between the two users
   > 6. Displays username, total contributions, and date range for each user
   > 7. Handles loading states and errors
   > 8. Also triggers on Enter key in input fields.
   > 9. Simple UI for now that is already scaffolded.
   >
   > Use TypeScript interfaces for the contribution data structure.

<!-- track:vscode:start -->
3. Deixe o Agent Mode trabalhar na implementação em `index.astro`.
4. Revise as alterações propostas na visualização de diff antes de aceitá-las.
<!-- track:vscode:end -->

<!-- track:cli:start -->
4. Deixe o Copilot CLI executar a implementação em `src/pages/index.astro`.
5. Use `/diff` para inspecionar as alterações geradas e depois aprová-las.
<!-- track:cli:end -->

## Tarefa 2: Teste a batalha

> **⚠️ Não está vendo alterações?** Se a página de batalha não tiver sido atualizada, pare o servidor de desenvolvimento (`Ctrl+C`), reinicie-o com `npm run dev` e atualize o navegador.

1. Insira `octocat` e `torvalds` como os dois nomes de usuário e clique em **Battle**.
2. Você deve ver os dois gráficos de contribuições renderizados lado a lado com grids coloridos.
3. Teste os casos de erro:
   - Deixe um ou ambos os campos vazios e clique em Battle: deve aparecer um erro de validação.
   - Insira um nome de usuário inválido: o aplicativo deve exibir um erro da API.
4. Teste pressionar **Enter** em qualquer campo de entrada: isso deve iniciar a batalha da mesma forma que clicar no botão.

## Tarefa 3: Faça iterações com o Copilot

Se algo não estiver totalmente correto, forneça feedback de acompanhamento diretamente ao Copilot. Por exemplo:

- *"The contribution squares are too large, make them 12x12px"*
- *"Add a hover tooltip showing the date and contribution count"*
- *"The loading state needs a pulse animation"*

<!-- track:vscode:start -->
O Agent Mode lida naturalmente com alterações em vários arquivos e iterações. Cada prompt de acompanhamento se baseia na conversa anterior, permitindo refinar a implementação aos poucos sem começar de novo.
<!-- track:vscode:end -->

<!-- track:cli:start -->
As sessões do Copilot CLI mantêm o histórico, então cada prompt de acompanhamento se baseia no anterior. Use `/session` ou `/context` para inspecionar o contexto que o Copilot mantém e execute `/review` depois de uma iteração maior para fazer uma verificação extra de bugs ou polimento.
<!-- track:cli:end -->

## Dicas para esta parte

- **Seja específico sobre o que deseja**: requisitos claros produzem resultados melhores.
- **Divida tarefas grandes em prompts menores** se o Copilot sair do rumo.
- **Revise as alterações antes de aceitá-las**: é mais rápido inspecionar o código gerado do que reescrevê-lo depois.
- **Teste o aplicativo imediatamente após cada etapa de implementação** para manter os problemas localizados.

## ✅ Parte 3 concluída

Você aprendeu a:

- Usar o Copilot para **trabalhar em implementações em vários arquivos**
- **Iterar nos resultados** com prompts de acompanhamento específicos
- Gerenciar o **ciclo completo de uma funcionalidade**: implementação, revisão, testes e refinamento
