# OpenSpec in the 101 track

The 101 Plan beat runs OpenSpec locally. No Linear, no Cloud Agents — those are 201 beats.

```
/opsx-explore <feature>          thinks; writes nothing
/opsx-propose <id>               writes openspec/changes/<id>/ (proposal, design, delta specs, tasks)
npx openspec validate --changes --strict
/opsx-apply <id>                 builds against the accepted change
```

The demo change is `invoice-detail-email`: update the customer email on the invoice detail customer card, no email-format validation. Verify at [inv_1048](http://127.0.0.1:43173/invoices/inv_1048).

`openspec/changes/` is empty on a clean tree. Record a live change for reset:

```bash
npm run demo:session -- record project-path openspec/changes/invoice-detail-email
```

Catalog: Starter **$49**, Growth **$99**, Scale **$249**. Do not correct the $400 claim on `dsp_1043`. Do not edit `tests/suggested-credit-api.test.ts` to force green. Archive or sync only when the operator asks.
