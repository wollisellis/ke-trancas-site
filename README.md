# Systematic Review Manuscript Automation System

**100% VS Code Workflow for Applied Artificial Intelligence Journal**

Automated pipeline for preparing publication-ready systematic review manuscripts with >95% quality assurance.

---

## 🚀 Quick Start

### 1. First Time Setup (5 minutes)

```powershell
# Run setup script (installs all dependencies)
./setup.ps1
```

This installs:
- ✅ Chocolatey package manager
- ✅ Pandoc (document conversion)
- ✅ Python + required packages (matplotlib, seaborn, pandas, numpy, etc.)
- ✅ Git (version control)
- ✅ Folder structure

### 2. Configure Your Data (10 minutes)

Edit `prisma_data.json` with your study numbers:

```json
{
  "identification": {
    "database_results": 2847,  // ← Your numbers here
    ...
  }
}
```

### 3. Run Complete Build

**Option A: Via Command Line**
```bash
python automation/master_build.py
```

**Option B: Via VS Code**
Press `Ctrl+Shift+B` → Select "🚀 MASTER BUILD (Complete Pipeline)"

---

## 📁 Project Structure

```
Minireview/
├── IALLMREVIEW.docx              # Your manuscript
├── referencias.md                 # 701 reference sources
├── prisma_data.json              # PRISMA flowchart data
├── rob_assessment.csv            # Risk of Bias assessment
│
├── scripts/                       # Automation scripts
│   ├── reference_processor.py    # Process 701 refs → BibTeX
│   ├── generate_prisma_flowchart.py # Auto-generate PRISMA figure
│   ├── generate_rob_plot.py      # Risk of Bias visualization
│   └── validate_manuscript.py    # Pre-submission validation
│
├── automation/
│   ├── master_build.py           # Main orchestrator
│   └── build_submission_package.py # Creates submission ZIP
│
├── figures/generated/            # Auto-generated figures (300 DPI)
├── references/                   # BibTeX output
├── checklists/                   # PRISMA, PRISMA-AI, AMSTAR 2
└── .vscode/tasks.json           # VS Code integration

```

---

## 🛠️ Available Tools (VS Code Tasks)

Access via `Ctrl+Shift+P` → `Tasks: Run Task`

| Task | Shortcut | Description |
|------|----------|-------------|
| 🚀 MASTER BUILD | `Ctrl+Shift+B` | Run entire pipeline |
| 🔍 Validate Manuscript | — | Check all requirements |
| 📊 Generate PRISMA Flowchart | — | Create flowchart figure |
| 📚 Process References | — | Clean & deduplicate 701 refs |
| 📈 Generate RoB Plot | — | Risk of Bias visualization |
| 📝 Word Count Check | — | Verify ≤5000 words |
| 📦 Build Submission Package | — | Create final ZIP |
| 🌐 Open Validation Report | — | View HTML report |

---

## 📊 Automated Pipeline Steps

The master build executes these steps automatically:

### Step 1: Process References (2-3 min)
```bash
python scripts/reference_processor.py \
  --input referencias.md \
  --output references/referencias.bib \
  --deduplicate
```

**Output:**
- `referencias.bib` - Clean BibTeX file
- `duplicate_report.txt` - List of duplicates removed
- `missing_dois.txt` - References needing DOIs

### Step 2: Generate PRISMA Flowchart (30 sec)
```bash
python scripts/generate_prisma_flowchart.py \
  --data prisma_data.json \
  --output figures/generated
```

**Output:**
- `prisma_flowchart.png` (300 DPI)
- `prisma_flowchart.pdf` (vector)
- `prisma_flowchart.svg` (editable)

### Step 3: Generate Risk of Bias Plot (30 sec)
```bash
python scripts/generate_rob_plot.py \
  --input rob_assessment.csv \
  --output figures/generated
```

**Output:**
- `rob_traffic_light.png` (300 DPI)
- `rob_summary_chart.png` (300 DPI)

### Step 4: Validate Manuscript (10 sec)
```bash
python scripts/validate_manuscript.py \
  IALLMREVIEW.docx \
  --output validation_report.html
```

**Checks:**
- ✅ Word count ≤5000
- ✅ Abstract = 200 words
- ✅ Keywords 3-6
- ✅ PRISMA flowchart present
- ✅ Risk of Bias assessment complete
- ✅ Data Availability Statement
- ✅ Disclosure Statement
- ✅ Ethics Statement
- ✅ CRediT Roles
- ✅ Figures ≥300 DPI

**Output:**
- `validation_report.html` - Interactive report

### Step 5: Build Submission Package (30 sec)
```bash
python automation/build_submission_package.py \
  --output submission_package.zip
```

**Output:**
- `submission_package.zip` containing:
  - Final manuscript DOCX
  - All figures (high-res)
  - Supplementary materials
  - Completed checklists
  - Cover letter template

---

## 📋 Required Files You Need to Create

### 1. `prisma_data.json`

Template is auto-created. Edit with your numbers:

```json
{
  "identification": {
    "database_results": 2847,
    "register_results": 0,
    "other_results": 0
  },
  "screening": {
    "duplicates_removed": 892,
    "records_screened": 1955,
    "records_excluded": 1523
  },
  "eligibility": {
    "reports_sought": 432,
    "reports_not_retrieved": 0,
    "reports_assessed": 432,
    "reports_excluded": 276,
    "exclusion_reasons": {
      "Wrong population": 0,
      "No AI intervention": 0,
      "No quantitative data": 0,
      "Other reasons": 276
    }
  },
  "included": {
    "studies_included": 156,
    "reports_included": 156
  }
}
```

### 2. `rob_assessment.csv`

Create CSV with Risk of Bias assessments:

```csv
Study,Bias_Confounding,Bias_Selection,Bias_Classification,Bias_Deviations,Bias_Missing,Bias_Measurement,Bias_Reported,Overall
Azimi2025,Low,Low,Low,Low,Low,Low,Low,Low
Feng2025,Some,Low,Low,Low,Low,Low,Some,Some
Kirk2023,Low,Some,Low,Low,Low,Low,Low,Some
...
```

**Risk levels:** Low, Some, High

---

## 🎯 Quality Targets

| Metric | Target | Auto-Check |
|--------|--------|------------|
| Word count | ≤5,000 | ✅ |
| Abstract | 200 words | ✅ |
| Keywords | 3-6 | ✅ |
| Figures DPI | ≥300 | ✅ |
| PRISMA checklist | 27/27 items | ⚠️ Manual |
| PRISMA-AI | All items | ⚠️ Manual |
| RoB assessment | All studies | ✅ |
| References | Clean, deduplicated | ✅ |

**>95% quality = All critical items complete**

---

## 🔧 Troubleshooting

### "Pandoc not found"
```powershell
choco install pandoc -y
# OR download from: https://pandoc.org/installing.html
```

### "Python not found"
```powershell
choco install python -y
# OR download from: https://www.python.org/downloads/
```

### "Module not found: matplotlib"
```bash
python -m pip install matplotlib seaborn pandas numpy scipy pillow requests
```

### Validation fails
1. Open `validation_report.html` in browser
2. Fix issues listed in red ❌
3. Re-run master build

### Word count exceeds 5000
```bash
python scripts/wordcount_monitor.py --file IALLMREVIEW.docx --limit 5000
```
- Identify sections to trim
- Move details to supplementary materials
- Condense tables/figures

---

## 📚 Key References

### PRISMA Guidelines
- PRISMA 2020: https://www.prisma-statement.org/
- PRISMA-AI: https://www.nature.com/articles/s41591-022-02139-w
- Flowchart tool: https://estech.shinyapps.io/prisma_flowdiagram/

### Risk of Bias Tools
- RoB 2: https://methods.cochrane.org/bias/resources/rob-2-revised-cochrane-risk-bias-tool-randomized-trials
- ROBINS-I: https://www.riskofbias.info/welcome/robins-i-v2

### Journal
- Applied Artificial Intelligence: https://www.tandfonline.com/journals/uaai20
- Submission portal: https://www.editorialmanager.com/uaai/

---

## 🎉 Submission Checklist

Before uploading to journal:

- [ ] Run `master_build.py` → 100% pass
- [ ] Open `validation_report.html` → All ✅
- [ ] Review `submission_package.zip` contents
- [ ] Co-author approval obtained
- [ ] PROSPERO registration number added to abstract
- [ ] Cover letter written
- [ ] Suggested reviewers (3-5) identified

**Then:** Upload `submission_package.zip` to Taylor & Francis portal

---

## 📞 Support

For issues with:
- **Scripts:** Check error messages, ensure all dependencies installed
- **Journal requirements:** See `instructions.md`
- **PRISMA compliance:** Use checklists in `/checklists`

**Version:** 1.0
**Last Updated:** 2025-01-15
**Estimated Time to Submission:** 8-12 weeks (100 hours work)

---

**Automated with ❤️ for systematic review excellence**
