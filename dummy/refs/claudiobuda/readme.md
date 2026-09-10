downloaded the entire website archive using wget

how to download entire website pages

Use **`wget`** in your terminal. It's the standard tool for mirroring websites.

```bash
wget --recursive --page-requisites --adjust-extension --convert-links --no-clobber https://example.com
```
wget --recursive --page-requisites --adjust-extension --convert-links --no-clobber https://claudiobuda.substack.com/archive


**Flag breakdown:**
* `-r` (recursive): Download linked pages.
* `-p` (page-requisites): Get images, CSS, and JS needed to display the page offline.
* `-k` (convert-links): Fix links so they work locally.
* `-E` (adjust-extension): Save HTML files with `.html` extensions.
* `-nc` (no-clobber): Don't overwrite existing files if you resume the download.

*(In Emacs, you can run this via `M-x shell` or `M-x async-shell-command`)*.
