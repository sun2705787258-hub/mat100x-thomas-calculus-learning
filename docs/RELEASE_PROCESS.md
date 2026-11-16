# Release Process

## CI

Every pull request and `main` push runs:

```bash
npm run validate
npm run package:release
npm run verify:release
```

## Version release

1. Update `package.json` and `CHANGELOG.md`.
2. Merge through CI.
3. Create an annotated tag:

```bash
git tag -a v1.0.0 -m "v1.0.0"
git push origin v1.0.0
```

4. The release workflow creates a Draft Release.
5. Review the generated notes and assets.
6. Manually publish the Draft Release.

## Assets

- Unified site ZIP.
- 10 PDF files.
- `release-manifest.json`.
- `SHA256SUMS.txt`.

## Rollback

- Redeploy the previous successful site artifact.
- Keep the failed Release evidence.
- Create a new patch version for the fix.
- Do not silently replace artifacts in an already published Release.
