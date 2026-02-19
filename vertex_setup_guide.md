# OpenClaw + Vertex AI Setup Guide

## Pré-requisitos

1. Conta no Google Cloud Platform com acesso ao Vertex AI.
2. Projeto criado e configurado no Vertex AI.
3. Chave de conta de serviço (Service Account) com permissões para acessar os modelos do Vertex AI.
4. OpenClaw instalado e configurado.

## Configuração

1. **Autenticação no Google Cloud (Vertex AI):**
    *   Na máquina onde o OpenClaw roda:

    ```bash
    gcloud auth login # (Autentique-se com sua conta)
    gcloud auth application-default login # (Defina as credenciais padrão para o aplicativo)
    gcloud config set project SEU_PROJECT_ID # (Defina o projeto padrão)
    ```

2. **Variáveis de ambiente no OpenClaw:**
    *   Edite `/home/unienutri/.openclaw/openclaw.json` com as seguintes variáveis (substitua `SEU_PROJECT_ID` e `SUA_REGIÃO`):

    ```json
    "env": {
      "vars": {
        "GOOGLE_CLOUD_PROJECT": "SEU_PROJECT_ID",
        "GOOGLE_PROJECT_ID": "SEU_PROJECT_ID",
        "GCLOUD_PROJECT": "SEU_PROJECT_ID",
        "VERTEX_REGION": "global", // Ou use \"sua-regiao-ativa\" se precisar de região específica
        "GOOGLE_CLOUD_LOCATION": "global" // (Mesma região da variável acima)
      }
    }
    ```

3. **Custom Provider no OpenClaw:**
   Abra o arquivo de configuração do OpenClaw (geralmente em `/home/unienutri/.openclaw/openclaw.json`) e procure pela seção `"models"`. Caso não exista, crie-a. Certifique-se de ajustar o `baseUrl` e o `MODELO_ID` conforme sua necessidade.
    ```json
    "models": {
      "providers": {
        "vertex-custom": {
          "baseUrl": "https://aiplatform.googleapis.com/v1/projects/SEU_PROJECT_ID/locations/global/publishers/google/models/",
          "auth": "token",
          "api": "google-generative-ai",
          "models": [
            { "id": "MODELO_ID_1", "name": "Modelo Nome 1" },
            { "id": "MODELO_ID_2", "name": "Modelo Nome 2" }
          ]
        }
      }
    }
    ```

4. **Autorize os modelos no OpenClaw:**
    *   Na seção `"agents"`, defina quais modelos serão permitidos:

    ```json
    "agents": {
      "defaults": {
        "models": {
          "google-vertex/gemini-2.0-flash": {},
          "openai-codex/gpt-5.3-codex": {},
          "vertex-custom/MODELO_ID_1": {},
          "vertex-custom/MODELO_ID_2": {}
        }
      }
    }
    ```
    *   Defina qual será o modelo "primário" e quais serão os "fallbacks":
     Em `agents.list`, ajuste qual modelo primário usar e qual a ordem de `fallbacks`:

    ```json
    "agents": {
        "list": [
          {
            "id": "nome_do_agente",
            "model": {
              "primary": "vertex-custom/MODELO_ID_1",
              "fallbacks": [
                "google-vertex/gemini-2.0-flash",
                "openai-codex/gpt-5.3-codex"
              ]
            }
          }
        ]
      }
    ```

5. **Reinicie o Gateway:**

    ```bash
    openclaw gateway restart
    ```

6. **Teste:**
    *   Use o comando `sessions_spawn` para testar um modelo `vertex-custom`.

        ```bash
        openclaw sessions_spawn task="Teste Vertex Custom OK" model="vertex-custom/MODELO_ID_1"
        ```
       Espere a resposta `OK` do modelo.

---

**Observações:**

*   Após seguir este passo a passo, o OpenClaw e os modelos Vertex devem se integrar de forma estável.
*   Lembre-se de **nunca expor dados sensíveis publicamente** (chaves, tokens, etc.).
