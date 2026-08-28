#!/usr/bin/env bash
# Rewrite a PDF's Info-dict metadata (Title/Author/Subject/Keywords) using Ghostscript.
#
# Requires: gs (Ghostscript). Install via `brew install ghostscript`.
#
# Usage:
#   scripts/set-pdf-metadata.sh <pdf-path> [title] [author] [subject] [keywords]
#
# Defaults are tailored to the resume in public/ so you can just run:
#   scripts/set-pdf-metadata.sh "public/Alston Drew Devero-Belfon_Resume.pdf"

set -euo pipefail

PDF_PATH="${1:-public/Alston Drew Devero-Belfon_Resume.pdf}"
TITLE="${2:-Alston Drew Devero-Belfon - Resume}"
AUTHOR="${3:-Alston Drew Devero-Belfon}"
SUBJECT="${4:-Resume}"
KEYWORDS="${5:-resume, engineer, creative technologist}"

if [[ ! -f "$PDF_PATH" ]]; then
  echo "error: PDF not found at '$PDF_PATH'" >&2
  exit 1
fi

if ! command -v gs >/dev/null 2>&1; then
  echo "error: ghostscript (gs) not found. Install with: brew install ghostscript" >&2
  exit 1
fi

# Escape ) ( \ for PDF string literals so metadata with parens/backslashes survives.
escape_pdf_string() {
  printf '%s' "$1" | sed -e 's/\\/\\\\/g' -e 's/(/\\(/g' -e 's/)/\\)/g'
}

TITLE_ESC=$(escape_pdf_string "$TITLE")
AUTHOR_ESC=$(escape_pdf_string "$AUTHOR")
SUBJECT_ESC=$(escape_pdf_string "$SUBJECT")
KEYWORDS_ESC=$(escape_pdf_string "$KEYWORDS")

TMP_MARK=$(mktemp -t resume_meta.XXXXXX.pdfmark)
TMP_OUT=$(mktemp -t resume_meta_out.XXXXXX.pdf)
trap 'rm -f "$TMP_MARK" "$TMP_OUT"' EXIT

cat > "$TMP_MARK" <<EOF
[ /Title ($TITLE_ESC)
  /Author ($AUTHOR_ESC)
  /Subject ($SUBJECT_ESC)
  /Keywords ($KEYWORDS_ESC)
  /DOCINFO pdfmark
EOF

gs -q -dBATCH -dNOPAUSE -sDEVICE=pdfwrite \
  -sOutputFile="$TMP_OUT" \
  "$PDF_PATH" "$TMP_MARK"

mv "$TMP_OUT" "$PDF_PATH"

echo "✓ Updated metadata on: $PDF_PATH"
if command -v pdfinfo >/dev/null 2>&1; then
  pdfinfo "$PDF_PATH" | grep -E '^(Title|Author|Subject|Keywords):' || true
fi
