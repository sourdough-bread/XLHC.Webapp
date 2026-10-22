# XLHC.Webapp

## Development setup (Claude Code)

- **Matt Pocock's skills** are enabled for this repo via `.claude/settings.json`
  (marketplace `mattpocock/skills`, plugin `mattpocock-skills`). Claude Code offers
  to install them when you open the project; use them as `/mattpocock-skills:grill-me`,
  `/mattpocock-skills:tdd`, `/mattpocock-skills:to-spec`, and so on.
- **Google Stitch MCP** is configured in `.mcp.json`. It reads your key from the
  `STITCH_API_KEY` environment variable, so the key never lives in git.
  Create a key at https://stitch.withgoogle.com (settings, API keys), then set
  `STITCH_API_KEY` in your shell or in the Claude cloud environment's variables.
