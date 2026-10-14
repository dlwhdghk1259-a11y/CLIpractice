<!-- l10n-sync: source-file="workshop/02-plan-and-scaffold.md" -->
# Parte 2: Planificación y estructura

---

Antes de escribir código, usemos los flujos de planificación de Copilot para pensar en la arquitectura. Planificar primero ayuda a diseñar sistemas mejores y proporciona a Copilot el contexto que necesita para generar código de mayor calidad.

## Tarea 1: Planifica la arquitectura de la API

<!-- track:vscode:start -->
1. Cambia al modo **Plan** en Copilot Chat (haz clic en el selector de modo situado en la parte inferior del panel de chat)
<!-- track:vscode:end -->

<!-- track:cli:start -->
1. Entra en **plan mode** en Copilot CLI pulsando **Shift+Tab** hasta que cambie el modo, o usando `/plan`.
<!-- track:cli:end -->

2. Introduce este prompt:

   ```
   I need to build a server-side API proxy that fetches GitHub contribution data
   for any username. The endpoint is https://github.com/{username}.contribs which
   returns JSON. We need to bypass CORS restrictions. Plan the implementation
   including the route structure, error handling, and caching strategy.
   ```

3. **Revisa el plan**: aquí es donde la planificación demuestra su valor. No aceptes sin más la primera respuesta:
   - Pide aclaraciones sobre cualquier aspecto que no esté claro
   - Sugiere cambios si algo no te convence
   - Itera hasta estar satisfecho con el enfoque

<!-- track:vscode:start -->
4. Cuando estés satisfecho con el plan, pide a Copilot que lo implemente: cambia al modo **Agent** y dile que proceda.
<!-- track:vscode:end -->

<!-- track:cli:start -->
4. Cuando estés satisfecho con el plan, indica a Copilot CLI que proceda con la implementación.
5. Revisa con `/diff` las ediciones resultantes de los archivos antes de aprobarlas.
<!-- track:cli:end -->

6. **Resultado:** ahora deberías tener una ruta de API creada en:

   ```
   src/pages/api/contributions/[username].ts
   ```

## Tarea 2: Prueba la API

> **⚠️ ¿No ves cambios?** Si el servidor de desarrollo no detecta la nueva ruta, detenlo (`Ctrl+C`) y reinícialo con `npm run dev`.

1. Asegúrate de que el servidor de desarrollo esté en ejecución y prueba el endpoint:

   ```bash
   curl http://localhost:4321/api/contributions/octocat
   ```

2. Deberías ver un JSON con los datos de contribuciones.
3. Prueba también el caso de error: usa un nombre de usuario no válido y confirma que devuelve una respuesta de error adecuada.

## Tarea 3: Planifica la página de batalla

<!-- track:vscode:start -->
1. Mantente en modo **Plan** e introduce este prompt:
<!-- track:vscode:end -->

<!-- track:cli:start -->
1. Mantente en plan mode (o ejecuta `/plan`) e introduce este prompt:
<!-- track:cli:end -->

   ```
   Now I need the main page. Plan a battle page for "Mona Mayhem - GitHub
   Contribution Battle Arena" with: two username inputs (Player 1 and Player 2),
   a battle button, and a results area. Keep the UI simple — don't over-engineer
   the layout or styling at this stage. Plan the HTML structure, basic styling,
   and how the battle interaction will work.
   ```

2. **Revisa e itera** sobre el plan: haz preguntas, sugiere cambios y perfecciona el enfoque.

<!-- track:vscode:start -->
3. Cuando estés satisfecho, cambia al modo **Agent** y deja que Copilot construya la página.
<!-- track:vscode:end -->

<!-- track:cli:start -->
3. Cuando estés satisfecho, pide a Copilot CLI que implemente el plan aprobado.
4. Usa `/diff` de nuevo para inspeccionar la estructura inicial de HTML y CSS antes de aprobarla.
<!-- track:cli:end -->

## Tarea 4: Verifica la estructura

> **⚠️ ¿No ves cambios?** Si la página no tiene el aspecto esperado o no se ha actualizado, detén el servidor (`Ctrl+C`), reinícialo con `npm run dev` y actualiza el navegador.

1. Abre http://localhost:4321 en el navegador.
2. Deberías ver:
   - El título del juego
   - Dos campos de entrada para nombres de usuario (Player 1 y Player 2)
   - Un botón de batalla
3. El botón todavía no funcionará; es lo esperado. Aún no hemos conectado la lógica de interacción. Eso viene después.

---

## ✅ ¡Parte 2 completada!

Has aprendido a:

- **Planificar antes de programar** en lugar de saltar directamente a la implementación
- **Iterar sobre los planes** hasta que la arquitectura sea adecuada
- **Pasar del plan a la implementación** con un flujo más claro y seguro
