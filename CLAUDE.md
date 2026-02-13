# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Systematic Review Manuscript Automation System** - Automated pipeline for preparing publication-ready systematic reviews for Applied Artificial Intelligence journal. This repository contains a comprehensive automation system for processing a systematic review on "Large Language Models in Clinical Nutrition" with >95% quality assurance for submission.

**Target Journal:** Applied Artificial Intelligence (Taylor & Francis, Open Access)
**Article Type:** Review Article (max 5,000 words)
**Current Status:** Draft manuscript + full automation system

## Quick Start Commands

### Initial Setup (First Time Only)
```powershell
# Install all dependencies (Pandoc, Python, Git, etc.)
./setup.ps1
```

### Main Build Commands

```bash
# Run complete build pipeline (recommended)
python automation/master_build.py

# Or use VS Code: Ctrl+Shift+B → "🚀 MASTER BUILD"
```

### Individual Component Commands

```bash
# Process references (701 sources → BibTeX)
python scripts/reference_processor.py --input referencias.md --output references/referencias.bib --deduplicate

# Generate PRISMA flowchart
python scripts/generate_prisma_flowchart.py --data prisma_data.json --output figures/generated

# Generate Risk of Bias visualization
python scripts/generate_rob_plot.py --input rob_assessment.csv --output figures/generated

# Validate manuscript for submission
python scripts/validate_manuscript.py IALLMREVIEW.docx --output validation_report.html

# Build final submission package
python automation/build_submission_package.py --output submission_package.zip
```

## Project Architecture

### Directory Structure
```
Minireview/
├── IALLMREVIEW.docx              # Main manuscript (~5000 words)
├── material1.md                   # Source: Extensive systematic review content
├── referencias.md                 # Source: 701 references
├── prisma_data.json              # PRISMA flowchart data (EDIT THIS)
├── rob_assessment.csv            # Risk of Bias assessment data
│
├── scripts/                       # Core automation scripts
│   ├── reference_processor.py    # Parse + deduplicate 701 refs
│   ├── generate_prisma_flowchart.py # Auto-generate PRISMA 2020 flowchart
│   ├── generate_rob_plot.py      # Risk of Bias traffic light plot
│   ├── validate_manuscript.py    # Pre-submission validation
│   └── wordcount_monitor.py      # Word count checker
│
├── automation/                    # Orchestration scripts
│   ├── master_build.py           # Main pipeline orchestrator
│   ├── build_submission_package.py # ZIP builder for submission
│   └── checklist_tracker.py      # Interactive checklist dashboard
│
├── figures/generated/            # Auto-generated figures (300+ DPI)
│   ├── prisma_flowchart.png      # PRISMA 2020 flowchart
│   └── rob_traffic_light.png     # Risk of Bias visualization
│
├── references/                   # Processed references
│   └── referencias.bib           # Clean BibTeX output
│
├── checklists/                   # Quality assurance checklists
│   ├── prisma_2020.json          # 27-item PRISMA checklist
│   ├── prisma_ai.json            # AI-specific extension
│   └── amstar2.json              # AMSTAR 2 quality assessment
│
└── .vscode/tasks.json           # VS Code task integration
```

### Key Files to Edit

1. **prisma_data.json** - Update with your actual study numbers
2. **rob_assessment.csv** - Complete Risk of Bias assessments
3. **IALLMREVIEW.docx** - Main manuscript file
4. **checklists/*.json** - Mark items as completed

### Technology Stack

- **Python 3.x** - Automation scripts
- **Pandoc** - Document conversion (DOCX ↔ Markdown)
- **Matplotlib/Seaborn** - Publication-quality figure generation
- **Git** - Version control
- **PowerShell** - Setup automation (Windows)

### VS Code Integration

**Keyboard Shortcuts:**
- `Ctrl+Shift+B` - Run Master Build
- `Ctrl+Shift+P` → "Tasks: Run Task" - Access all tasks

**Available Tasks:**
- 🚀 MASTER BUILD (Complete Pipeline) - DEFAULT
- 🔍 Validate Manuscript
- 📊 Generate PRISMA Flowchart
- 📚 Process References
- 📈 Generate Risk of Bias Plot
- 📝 Word Count Check
- 📦 Build Submission Package
- 🌐 Open Validation Report
- ⚙️ Run Setup
- 🧹 Clean Generated Files

## Development Workflow

### 1. Initial Setup Phase
```bash
# Install dependencies
./setup.ps1

# Edit data files
# - prisma_data.json (study numbers)
# - rob_assessment.csv (bias assessments)
```

### 2. Iterative Development
```bash
# Make changes to manuscript
# Run validation
python scripts/validate_manuscript.py IALLMREVIEW.docx

# Fix issues identified
# Re-run validation until 100% pass
```

### 3. Pre-Submission
```bash
# Run complete build
python automation/master_build.py

# Review validation_report.html
# Fix any remaining issues

# Build final package
python automation/build_submission_package.py
```

### 4. Submission
```bash
# Upload submission_package.zip to journal portal
# https://www.tandfonline.com/journals/uaai20
```

## Quality Assurance Checklist

The `validate_manuscript.py` script automatically checks:

- [ ] Word count ≤5,000 words
- [ ] Abstract = 200 words
- [ ] Keywords: 3-6
- [ ] PRISMA flowchart present (300+ DPI)
- [ ] Risk of Bias assessment complete
- [ ] Data Availability Statement included
- [ ] Disclosure of Interest Statement included
- [ ] Ethics Statement included
- [ ] CRediT Roles documented
- [ ] All figures ≥300 DPI
- [ ] References properly formatted

**Target:** >95% pass rate = Ready for submission

## Automation Pipeline Steps

The `master_build.py` orchestrator executes:

1. **Process References** - Parse 701 sources from referencias.md → Clean BibTeX
2. **Generate PRISMA Flowchart** - Auto-create publication-quality flowchart
3. **Generate RoB Plots** - Create Risk of Bias visualizations
4. **Update Checklists** - Auto-check completeness
5. **Validate Manuscript** - Run all pre-submission checks
6. **Build Package** - Create submission ZIP if all validations pass

**Total Runtime:** ~3-5 minutes for complete pipeline

## Common Tasks

### Update Reference List
```bash
# After editing referencias.md
python scripts/reference_processor.py --input referencias.md --output references/referencias.bib --deduplicate --check-dois
```

### Regenerate Figures
```bash
# After editing prisma_data.json
python scripts/generate_prisma_flowchart.py

# After editing rob_assessment.csv
python scripts/generate_rob_plot.py
```

### Check Word Count
```bash
python scripts/wordcount_monitor.py --file IALLMREVIEW.docx --limit 5000
```

### Clean Generated Files
```powershell
# Via VS Code task: "🧹 Clean Generated Files"
# Or manually:
Remove-Item -Path figures/generated/* -ErrorAction SilentlyContinue
Remove-Item -Path validation_report.html -ErrorAction SilentlyContinue
```

## Troubleshooting

### "Pandoc not found"
```powershell
choco install pandoc -y
```

### "Python package not found"
```bash
python -m pip install matplotlib seaborn pandas numpy scipy pillow requests
```

### Validation fails
1. Open `validation_report.html` in browser
2. Address all items marked ❌
3. Re-run master build

### Word count exceeds limit
- Move detailed tables to supplementary materials
- Condense verbose sections
- Use more concise phrasing
- Check word count: `python scripts/wordcount_monitor.py --file IALLMREVIEW.docx --limit 5000`

## Important Notes

- **All scripts are 100% local** - No external web apps required
- **Git-tracked** - All changes versioned automatically
- **Reproducible** - Complete pipeline can be re-run anytime
- **Extensible** - Scripts can be adapted for future systematic reviews

## Dependencies

### Required (Auto-installed by setup.ps1)
- Python 3.7+
- Pandoc 2.0+
- Git

### Python Packages
- matplotlib
- seaborn
- pandas
- numpy
- scipy
- pillow
- requests

## References

- **PRISMA 2020:** https://www.prisma-statement.org/
- **PRISMA-AI:** https://www.nature.com/articles/s41591-022-02139-w
- **Journal:** https://www.tandfonline.com/journals/uaai20
- **Submission Portal:** https://www.editorialmanager.com/uaai/

## Support

For issues with automation scripts, check:
1. Error messages in console output
2. README.md for detailed instructions
3. Script docstrings for usage examples

**Last Updated:** 2025-01-15
**System Version:** 1.0
