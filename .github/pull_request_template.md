## PR Title
chore: normalize line endings; fix husky CRLF

## Summary
- Enforce LF for Husky hooks and shell scripts via .gitattributes
- Keep CRLF for Windows-native scripts (.bat/.cmd/.ps1)
- Add .editorconfig to guide editors
- Update docs with renormalization steps and Windows guidance

## BEFORE / AFTER
- Before: `git add .` produced warning about CRLF/LF for `.husky/pre-push` on Windows/WSL.
- After: No warnings; hooks remain LF and executable, Windows scripts use CRLF.

## Verification Outputs (paste results)
```
# Clean status after commit
git status

# No warnings on add
git add .

# Husky hook header and file type (should be LF)
head -n1 .husky/pre-push
file .husky/pre-push  # should not show CRLF

# Repo-scoped config
git config --get core.autocrlf   # expect: input
git config --get core.eol        # expect: lf
git config --get core.safecrlf   # expect: warn

# If needed, set executable bit and verify
# git update-index --chmod=+x .husky/pre-push
# git ls-files --stage .husky/pre-push  # mode should be 100755
```

## Notes for Reviewers
- If line-ending churn appears on your machine, run:
```
git add --renormalize .
```
- Windows users: Prefer WSL or ensure your editor honors .editorconfig. `.gitattributes` forces LF for hooks even with global `core.autocrlf=true`.
