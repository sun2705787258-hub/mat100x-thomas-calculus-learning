# GitHub Setup

## 1. Confirm assumptions

- Owner: `sun2705787258-hub`
- Repository: `mat100x-thomas-calculus-learning`
- Visibility: Private
- Default branch: `main`
- Remote: `https://github.com/sun2705787258-hub/mat100x-thomas-calculus-learning.git`

## 2. Authenticate locally

Install GitHub CLI if it is not already available:

```powershell
winget install --id GitHub.cli -e
```

Authenticate through the browser-based device flow:

```powershell
gh auth login
```

Do not share personal access tokens, passwords, or one-time codes.

## 3. Create the remote repository

The local remote already exists. Create the private GitHub repository without
overwriting the remote:

```powershell
gh repo create sun2705787258-hub/mat100x-thomas-calculus-learning --private
```

Then push the existing local `main` branch:

```powershell
git push -u origin main
```

## 4. Recommended repository settings

- Protect `main`.
- Require the `ci / validate` check before merge.
- Protect tags matching `v*.*.*`.
- Allow GitHub Actions to read repository contents.
- Do not grant write permissions globally; workflows request scoped permissions.
- Require manual approval before publishing a Release.

## 5. First release

After CI passes on `main`:

```powershell
git tag -a v1.0.0 -m "v1.0.0"
git push origin v1.0.0
```

The release workflow creates a Draft Release. Review the assets and publish the
Draft manually.

## 6. Pages

The Pages workflow is manual-only. Do not enable Pages until:

- the repository visibility is correct;
- the content rights are confirmed;
- the public site is intended to be reachable without authentication.
