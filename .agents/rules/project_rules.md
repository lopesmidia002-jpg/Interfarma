# Regras do Projeto Intelfarma

## Diretrizes Obrigatórias ao Final de Cada Tarefa / Feat / Fix:
1. **Atualização Contínua de Documentação**:
   - Sempre atualizar `DOCUMENTACAO.md` com novas funcionalidades, endpoints, esquemas ou alterações.
   - Sempre atualizar `PASSOS.md`, marcando com `[x]` os passos concluídos e refletindo o status atual.
   - Sempre atualizar `CONTEXTO.md` mantendo o estado técnico, dados, componentes e regras de negócio alinhados.
2. **Controle de Execução por Passos**:
   - Respeitar estritamente a ordem dos passos em `PASSOS.md`.
   - Somente iniciar o próximo passo quando o usuário solicitar explicitamente ("iniciar próximo passo", "pode prosseguir", "continuar", etc.).
3. **Sugestão de Commit**:
   - Sempre ao final de qualquer implementação ou correção, gerar e exibir um texto formatado e padronizado para commit no Git (ex: Conventional Commits com título e descrição).
4. **Ambiente Docker**:
   - Manter a aplicação 100% conteinerizada e executável via Docker (`docker-compose up --build`).
