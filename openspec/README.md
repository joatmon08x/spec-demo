# OpenSpec in the 101 track

OpenSpec appears once, in the last 101 beat (MCP / Linear). Two steps:

```
/opsx-explore <feature>          thinks; writes nothing
/opsx-propose <id>               writes openspec/changes/<id>/ (proposal, design, delta specs, tasks)
                                 then files one Linear issue from it through the Linear MCP
npx openspec validate --changes --strict
```

The demo change is `resolve-dispute-panel`: enable Accept credit and Decline on the dispute Resolution panel, without touching the suggested-credit routes. The beat ends at the ticket — do not `/opsx-apply`, archive, or sync unless the operator asks.

`openspec/changes/` is empty on a clean tree. Record a live change for reset:

```bash
npm run demo:session -- record project-path openspec/changes/resolve-dispute-panel
```

`reset-demo-state` cancels the Linear issue when the Linear MCP is connected.

Catalog: Starter **$49**, Growth **$99**, Scale **$249**. Do not correct the $400 claim on `dsp_1043`. Do not edit `tests/suggested-credit-api.test.ts` to force green.
