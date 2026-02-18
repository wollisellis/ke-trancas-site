"""Generate PRISMA-ScR flow diagram for EJCN submission.

Outputs 600 DPI PNG, TIFF (LZW), and vector PDF at 180 mm width.
Focus on perfect centering and professional layout.
"""
from __future__ import annotations

from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch


# ── colours ──────────────────────────────────────────────────────────────
MAIN_FC   = "#EAF0F7"   # light blue-grey for main-flow boxes
SIDE_FC   = "#FFFFFF"    # white for exclusion boxes
EDGE_C    = "#2C3E50"    # dark slate edge
TEXT_C     = "#1A1A1A"    # near-black text
ARROW_C    = "#2C3E50"


def _box(
    ax, *, x, y, w, h,
    facecolor=MAIN_FC,
    header: str = "",
    lines: list[str] | None = None,
    fs_header: int = 11,
    fs_body: int = 10,
    lw: float = 1.3,
    edge: str = EDGE_C,
) -> FancyBboxPatch:
    """Add a rounded box with perfectly centered text."""
    patch = FancyBboxPatch(
        (x, y), w, h,
        boxstyle="round,pad=0,rounding_size=0.015",
        linewidth=lw, edgecolor=edge, facecolor=facecolor,
        transform=ax.transAxes,
        zorder=1
    )
    ax.add_patch(patch)

    cx = x + w / 2
    cy = y + h / 2
    body_lines = lines or []
    n_body = len(body_lines)
    
    # Standard line spacing (approx 1.5 relative to font size on 9in page)
    # 0.022 axes units ~ 14pt vertical space
    SPACING = 0.022

    if header:
        # Header position: Fixed relative to top of box for consistency
        # y + h * 0.78 seems visually correct for these boxes
        header_y = y + h * 0.78
        ax.text(cx, header_y, header,
                ha="center", va="center", fontsize=fs_header,
                fontweight="bold", color=TEXT_C, transform=ax.transAxes,
                family="sans-serif", zorder=2)
        
        # Body vertical center target
        # For boxed with header, center body in the space below header nicely.
        # ~38% from bottom gives good visual balance between header and bottom edge.
        cy_body = y + h * 0.38
        
        # Calculate start Y so that block is centered around cy_body
        # Top line Y = cy_body + (n-1)*SPACING / 2
        start_y = cy_body + (n_body - 1) * SPACING / 2
        
        for i, line in enumerate(body_lines):
            ax.text(
                cx,
                start_y - i * SPACING,
                line,
                ha="center", va="center", fontsize=fs_body,
                color=TEXT_C, transform=ax.transAxes, family="sans-serif",
                zorder=2
            )
            
    else:
        # No header - center vertically in box
        cy_body = cy
        start_y = cy_body + (n_body - 1) * SPACING / 2
        
        for i, line in enumerate(body_lines):
            ax.text(
                cx,
                start_y - i * SPACING,
                line,
                ha="center", va="center", fontsize=fs_body,
                color=TEXT_C, transform=ax.transAxes, family="sans-serif",
                zorder=2
            )

    return patch


def _exclusion_box(ax, *, x, y, w, h, text_lines: list[str]) -> FancyBboxPatch:
    """Exclusion box with left-aligned, vertically centered text."""
    patch = FancyBboxPatch(
        (x, y), w, h,
        boxstyle="round,pad=0,rounding_size=0.015",
        linewidth=1.3, edgecolor=EDGE_C, facecolor=SIDE_FC,
        transform=ax.transAxes,
        zorder=1
    )
    ax.add_patch(patch)
    
    # Vertically center the text block
    full_text = "\n".join(text_lines)
    
    ax.text(x + w * 0.08, y + h / 2, full_text,
            ha="left", va="center", fontsize=8.5,
            color=TEXT_C, transform=ax.transAxes,
            linespacing=1.6, family="sans-serif",
            clip_on=True, clip_path=patch, zorder=2)
            
    return patch


def _arrow(ax, start, end, *, dashed=False, lw=1.5):
    ax.add_patch(FancyArrowPatch(
        start, end, arrowstyle="-|>", mutation_scale=15,
        linewidth=lw,
        linestyle=(0, (6, 5)) if dashed else "-",
        color=ARROW_C, transform=ax.transAxes,
        zorder=0
    ))


def _center(p, side="bottom"):
    x0, y0 = p.get_x(), p.get_y()
    w, h = p.get_width(), p.get_height()
    cmap = {
        "bottom": (x0 + w/2, y0),
        "top":    (x0 + w/2, y0 + h),
        "left":   (x0,       y0 + h/2),
        "right":  (x0 + w,   y0 + h/2),
    }
    return cmap[side]


def generate_prisma_flowchart(out_dir: Path) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)

    # 180 mm wide ≈ 7.087 in; height ~9 in
    fig = plt.figure(figsize=(7.087, 8.5), dpi=600)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_axis_off()

    # ── title ────────────────────────────────────────────────────────────
    ax.text(0.50, 0.97, "PRISMA-ScR Flow Diagram",
            ha="center", va="center", fontsize=15, fontweight="bold",
            color=TEXT_C, transform=ax.transAxes, family="sans-serif")

    # ── layout grid ──────────────────────────────────────────────────────
    x_main, w_main = 0.08, 0.50
    gap = 0.04
    x_side, w_side = x_main + w_main + gap, 0.30

    h_box = 0.11
    h_side_s = 0.08
    h_excl = 0.18

    # Vertical positions
    y_id     = 0.82
    y_screen = 0.63
    y_elig   = 0.40
    y_incl   = 0.12

    # ── IDENTIFICATION ───────────────────────────────────────────────────
    id_box = _box(ax, x=x_main, y=y_id, w=w_main, h=h_box,
                  header="IDENTIFICATION",
                  lines=["Records identified from databases", "(n = 8,247)"])

    # Center side box relative to main box
    y_dup = y_id + (h_box - h_side_s) / 2
    dup_box = _box(ax, x=x_side, y=y_dup, w=w_side, h=h_side_s,
                   facecolor=SIDE_FC,
                   lines=["Duplicates removed", "(n = 2,415)"], fs_body=9)

    # ── SCREENING ────────────────────────────────────────────────────────
    scr_box = _box(ax, x=x_main, y=y_screen, w=w_main, h=h_box,
                   header="SCREENING",
                   lines=["Records screened", "(n = 5,832)"])

    y_exc1 = y_screen + (h_box - h_side_s) / 2
    exc1_box = _box(ax, x=x_side, y=y_exc1, w=w_side, h=h_side_s,
                    facecolor=SIDE_FC,
                    lines=["Records excluded", "(n = 5,520)"], fs_body=9)

    # ── ELIGIBILITY ──────────────────────────────────────────────────────
    elig_box = _box(ax, x=x_main, y=y_elig, w=w_main, h=h_box,
                    header="ELIGIBILITY",
                    lines=["Full-text reports assessed", "(n = 312)"])

    y_exc2 = y_elig + (h_box - h_excl) / 2
    exc2_box = _exclusion_box(
        ax, x=x_side, y=y_exc2, w=w_side, h=h_excl,
        text_lines=[
            "Reports excluded (n = 259):",
            "• Non-clinical food science",
            "• No quantitative outcomes",
            "• Non-English publication",
            "• Duplicate / abstract only",
        ],
    )

    # ── INCLUDED ─────────────────────────────────────────────────────────
    h_incl = 0.15
    incl_box = _box(ax, x=x_main, y=y_incl, w=w_main, h=h_incl,
                    header="INCLUDED",
                    lines=[
                        "Sources included in review",
                        "(n = 53)",
                        "Primary search: 49",
                        "Bridge search: 4",
                    ],
                    fs_body=10)

    # ── ARROWS ───────────────────────────────────────────────────────────
    # vertical (main flow)
    _arrow(ax, _center(id_box, "bottom"),  _center(scr_box, "top"))
    _arrow(ax, _center(scr_box, "bottom"), _center(elig_box, "top"))
    _arrow(ax, _center(elig_box, "bottom"), _center(incl_box, "top"))

    # horizontal (exclusions) — dashed
    
    # ID -> Dup
    sx, sy = _center(id_box, "right")
    ex, ey = _center(dup_box, "left")
    # For horizontal arrows, vertical alignment should match box centers
    # id_box center Y = y_id + h_box/2. dup_box center = y_dup + h_side_s/2.
    # We aligned y_dup such that centers match.
    # Just to be safe, use (ex, sy) for end point Y if we trust id_box center more?
    # No, let's keep it clean.
    _arrow(ax, (sx, sy), (ex, ey), dashed=True)

    # Screen -> Exc1
    sx, sy = _center(scr_box, "right")
    ex, ey = _center(exc1_box, "left")
    _arrow(ax, (sx, sy), (ex, ey), dashed=True)

    # Elig -> Exc2
    sx, sy = _center(elig_box, "right")
    ex, ey = _center(exc2_box, "left")
    _arrow(ax, (sx, sy), (ex, ey), dashed=True)

    # ── SAVE ─────────────────────────────────────────────────────────────
    # PNG
    fig.savefig(out_dir / "Figure_1_PRISMA_Flowchart.png",
                dpi=600, facecolor="white", bbox_inches="tight")
    
    # PDF
    fig.savefig(out_dir / "Figure_1_PRISMA_Flowchart.pdf",
                facecolor="white", bbox_inches="tight")
    
    # TIFF (LZW compression)
    fig.savefig(out_dir / "Figure_1_PRISMA_Flowchart.tiff",
                dpi=600, facecolor="white", bbox_inches="tight",
                pil_kwargs={"compression": "tiff_lzw"})
                
    plt.close(fig)
    print("PRISMA figure saved: PNG, PDF, TIFF (600 DPI LZW)")


if __name__ == "__main__":
    generate_prisma_flowchart(Path(__file__).resolve().parent)
