# Release Process & Versioning

## 1. Versioning Standard

We follow [Semantic Versioning (SemVer)](https://semver.org/): `MAJOR.MINOR.PATCH`
- **MAJOR**: Breaking structural or API changes.
- **MINOR**: New feature modules added backward-compatibly.
- **PATCH**: Bug fixes and minor visual patches.

---

## 2. Release Checklist

1. Merge `develop` into `release/vX.Y.Z`.
2. Run full test suite (`make test` and `make lint`).
3. Update [CHANGELOG.md](../../CHANGELOG.md).
4. Create Git Tag (`git tag -a vX.Y.Z -m "Release vX.Y.Z"`).
5. Deploy to Production environment.
