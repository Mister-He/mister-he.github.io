---
title: "Shell File Descriptor and Redirection Reference"
author: "He Yichen"
date: 2025-08-13
permalink: /posts/2025/08/Shell File Descriptor and Redirection Reference/
tags:
  - Study
  - Linux
---
Summary: This note explains shell file descriptors and redirection. It covers stdin, stdout, stderr, and how to redirect or merge them with operators like >, 2>, and 2>&1. It shows differences between & in redirection and background execution, common command flags, pitfalls, examples, and best practices for HPC logging.

{% include toc %}

# Motivation

When running code on HPC, we often used following code to free the terminal and put it in the background:

```bash
nohup Rscript analysis.R >output.log 2>&1 &
```

I'm always curious about the command used especially the numbers and the use `&`, hence, this is a learning note to help remember this.

# 1. Overview

The shell's input/output redirection system uses **file descriptors** to manage standard input, standard output, and standard error. Understanding this allows you to:
- Save program output to files
- Separate or merge normal output and error output
- Run long jobs in the background with logging
- Combine streams for easier debugging

---

# 2. What Are File Descriptors?

Every process has three standard file descriptors representing the common I/O channels:

| Descriptor |  Name  | Default Target |                   Purpose                    |
| :--------: | :----: | :------------: | :------------------------------------------: |
|    `0`     | stdin  |    keyboard    |             Input to the program             |
|    `1`     | stdout |     screen     |                Normal output                 |
|    `2`     | stderr |     screen     | Error/warning output (separated from stdout) |

Separating stdout and stderr allows independent handling or controlled merging.

---

# 3. Basic Redirections with Examples

## 3.1 Redirecting Standard Output

```bash
echo "hello" > out.txt
```
- `>` is shorthand for `1>`: redirects **stdout** to a file, overwriting it.

## 3.2 Appending Output

```bash
echo "more" >> out.txt
```
- `>>` appends stdout to the file without truncating.

## 3.3 Redirecting Standard Input

```bash
sort < unsorted.txt
```
- `<` uses a file as the program's stdin.

---

# 4. Explicit Descriptor Redirection

- `1>file` : explicitly redirect stdout to `file` (same as `>file`).
- `2>error.log` : redirect stderr to a separate file.
- `&>` (Bash extension) : shortcut to redirect both stdout and stderr (not portable to all shells).
  ```bash
  command &> combined.log  # In Bash, equivalent to: command > combined.log 2>&1
  ```

---

# 5. Merging stdout and stderr: `2>&1`

```bash
command > out.txt 2>&1
```
- First, `>` redirects stdout to `out.txt`.
- Then `2>&1` redirects stderr to wherever stdout is currently going (i.e., `out.txt`), combining both.

Order matters:

```bash
command 2>&1 > out.txt   # WRONG: stderr goes to original stdout (terminal), stdout goes to file
command > out.txt 2>&1   # CORRECT: both stdout and stderr go to out.txt
```

---

# 6. Dual Meaning of `&`

## 6.1 In Redirection Context

- In `2>&1`, the `&1` means “the target of file descriptor 1,” not a file named `1`.
- Writing `2>1` would create/write to a file literally named `1`, not merge streams.

## 6.2 At the End of a Command

```bash
some_command &
```
- The trailing `&` puts the command in the **background**, returning the shell prompt immediately.

---

# 7. Common Combinations and Patterns

## 7.1 Combine stdout and stderr into one file (overwrite)
```bash
command > all.log 2>&1
```

## 7.2 Append both outputs
```bash
command >> all.log 2>&1
```

### 7.3 Capture stdout and stderr separately
```bash
command > stdout.log 2> stderr.log
```

## 7.4 Background execution with persistence (survives terminal close)
```bash
nohup Rscript analysis.R >output_log_file.Rout 2>&1 &
```
Explanation:
- `nohup`: ignores hangup signal so the process keeps running after logout.
- `Rscript analysis.R`: the script being executed.
- `>output_log_file.Rout`: stdout redirected to file.
- `2>&1`: stderr merged into stdout.
- Trailing `&`: run in background.

---

# 8. Common Flag Conventions (Meanings Depend on Command)

| Flag | Typical Meaning                                          | Common Commands |
|------|---------------------------------------------------------|-----------------|
| `-i` | interactive; prompt before action (e.g., before deletion) | `rm -i`, `cp -i` |
| `-r` | recursive; operate on directories and contents           | `rm -r`, `cp -r` |
| `-a` | all / archive; include hidden or preserve attributes      | `ls -a`, `cp -a` |
| `-b` | backup or escape (e.g., show non-printing chars escaped) | `ls -b`         |
| `-f` | force; do not prompt, ignore errors or missing targets    | `rm -f`, `cp -f` |

Examples:

```bash
rm -i file.txt          # confirm before deleting
rm -rf some_dir/        # recursive forced delete (dangerous)
ls -al                  # show all files including hidden, long format
```

---

# 9. Common Pitfalls / Gotchas

- `2>1` is not `2>&1`: first writes stderr to a file named `1`; second merges stderr into stdout.
- The order of redirections matters: `command 2>&1 > out.txt` behaves differently from `command > out.txt 2>&1`.
- `>` is shorthand for `1>`.
- `&>` is a Bash-specific shorthand for `>file 2>&1` and might not work in non-Bash shells.
- `rm -rf` combines recursion and force—**very dangerous**, especially with variables or globs.

---

# 10. Inspecting and Controlling Execution

- List background jobs in current shell:
  ```bash
  jobs
  ```
- Bring a background job to foreground (e.g., job 1):
  ```bash
  fg %1
  ```
- Check if a process is running:
  ```bash
  ps aux | grep analysis.R
  ```
- Follow log output in real time:
  ```bash
  tail -f output_log_file.Rout
  ```

---

# 11. Platform Differences (Example: `ls`)

- **GNU version** (common on Linux) supports `--help` and many GNU-style options:
  ```bash
  ls --help
```
- **BSD version** (e.g., macOS) may not support `--help` and will print:
  ```
  ls: unrecognized option `--help'
  usage: ls [options] [file ...]
  ```
- To get GNU tools on macOS:
  ```bash
  brew install coreutils
  ```
  Then use `gls` instead of `ls`:
  ```bash
  gls --help
  ```

---


# 12. Quick Reference Examples

```bash
# Merge stdout and stderr (overwrite)
some_cmd > out.log 2>&1

# Append both outputs
some_cmd >> out.log 2>&1

# Separate stdout and stderr
some_cmd > stdout.log 2> stderr.log

# Background with persistence (survives logout)
nohup some_cmd > all.log 2>&1 &

# Interactive delete (confirmation)
rm -i sensitive.txt

# Recursive forced delete (use with caution)
rm -rf unwanted_directory/
```

---

# 13. Recommended Practices

- Preview variable expansions before destructive operations (e.g., use `echo "$VAR"` or `ls`).
- Always write combined redirection as `>file 2>&1`, not reversed.
- For long-running jobs, use `nohup` + `&` or session managers like `tmux`/`screen`.
- Monitor logs with `tail -f` and filter with `grep` for focused debugging.