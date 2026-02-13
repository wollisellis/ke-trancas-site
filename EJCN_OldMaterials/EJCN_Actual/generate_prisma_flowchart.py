from __future__ import annotations

from pathlib import Path

import matplotlib.pyplot as plt
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch


def _add_box(
    ax: plt.Axes,
    *,
    x: float,
    y: float,
    w: float,
    h: float,
    facecolor: str,
    header: str,
    line1: str,
    line2: str | None = None,
    fontsize_header: int = 16,
    fontsize_body: int = 14,
    linewidth: float = 3.5,
    edgecolor: str = "#333333",
) -> FancyBboxPatch:
    patch = FancyBboxPatch(
        (x, y),
        w,
        h,
        boxstyle="round,pad=0,rounding_size=0.02",
        linewidth=linewidth,
        edgecolor=edgecolor,
        facecolor=facecolor,
        transform=ax.transAxes,
    )
    ax.add_patch(patch)

    if header:
        ax.text(
            x + w / 2,
            y + h * 0.67,
            header,
            ha="center",
            va="center",
            fontsize=fontsize_header,
            fontweight="bold",
            color="#111111",
            transform=ax.transAxes,
        )
        y1 = y + h * 0.44
        y2 = y + h * 0.26
    else:
        y1 = y + h * 0.60
        y2 = y + h * 0.37

    ax.text(
        x + w / 2,
        y1,
        line1,
        ha="center",
        va="center",
        fontsize=fontsize_body,
        color="#111111",
        transform=ax.transAxes,
    )
    if line2 is not None:
        ax.text(
            x + w / 2,
            y2,
            line2,
            ha="center",
            va="center",
            fontsize=fontsize_body,
            color="#111111",
            transform=ax.transAxes,
        )

    return patch


def _add_reports_excluded_box(
    ax: plt.Axes,
    *,
    x: float,
    y: float,
    w: float,
    h: float,
    facecolor: str,
    linewidth: float = 3.5,
    edgecolor: str = "#333333",
) -> FancyBboxPatch:
    patch = FancyBboxPatch(
        (x, y),
        w,
        h,
        boxstyle="round,pad=0,rounding_size=0.02",
        linewidth=linewidth,
        edgecolor=edgecolor,
        facecolor=facecolor,
        transform=ax.transAxes,
    )
    ax.add_patch(patch)

    text = (
        "Reports excluded\n"
        "(n = 259):\n"
        "- Non-clinical food\n  science focus\n"
        "- No quantitative\n  outcomes\n"
        "- Non-English\n  publication"
    )
    ax.text(
        x + w * 0.08,
        y + h * 0.78,
        text,
        ha="left",
        va="top",
        fontsize=12,
        color="#111111",
        transform=ax.transAxes,
        linespacing=1.25,
        clip_on=True,
        clip_path=patch,
    )

    return patch


def _add_arrow(
    ax: plt.Axes,
    *,
    start: tuple[float, float],
    end: tuple[float, float],
    dashed: bool,
    linewidth: float = 3.0,
    color: str = "#333333",
    mutation_scale: int = 22,
) -> None:
    arrow = FancyArrowPatch(
        start,
        end,
        arrowstyle="-|>",
        mutation_scale=mutation_scale,
        linewidth=linewidth,
        linestyle=(0, (10, 7)) if dashed else "-",
        color=color,
        transform=ax.transAxes,
    )
    ax.add_patch(arrow)


def generate_prisma_flowchart(out_dir: Path) -> None:
    out_dir.mkdir(parents=True, exist_ok=True)

    fig = plt.figure(figsize=(7.065, 8.792), dpi=600)
    ax = fig.add_axes([0, 0, 1, 1])
    ax.set_axis_off()

    ax.text(
        0.5,
        0.945,
        "PRISMA-ScR Flow Diagram",
        ha="center",
        va="center",
        fontsize=22,
        fontweight="bold",
        color="#111111",
        transform=ax.transAxes,
    )

    x_main = 0.07
    w_main = 0.55
    gap = 0.05
    x_right = x_main + w_main + gap
    w_right = 0.30

    h_main = 0.12
    h_right_small = 0.09
    h_right_large = 0.20

    y_id = 0.76
    y_screen = 0.53
    y_elig = 0.30
    y_incl = 0.10

    main_fc = "#f0f0f0"
    side_fc = "#ffffff"

    id_box = _add_box(
        ax,
        x=x_main,
        y=y_id,
        w=w_main,
        h=h_main,
        facecolor=main_fc,
        header="IDENTIFICATION",
        line1="Records identified from databases",
        line2="(n = 8,247)",
        fontsize_header=18,
        fontsize_body=14,
    )

    dup_box = _add_box(
        ax,
        x=x_right,
        y=y_id + (h_main - h_right_small) / 2,
        w=w_right,
        h=h_right_small,
        facecolor=side_fc,
        header="",
        line1="Duplicates removed",
        line2="(n = 2,415)",
        fontsize_body=13,
    )

    screen_box = _add_box(
        ax,
        x=x_main,
        y=y_screen,
        w=w_main,
        h=h_main,
        facecolor=main_fc,
        header="SCREENING",
        line1="Records screened",
        line2="(n = 5,832)",
        fontsize_header=18,
        fontsize_body=14,
    )

    rec_ex_box = _add_box(
        ax,
        x=x_right,
        y=y_screen + (h_main - h_right_small) / 2,
        w=w_right,
        h=h_right_small,
        facecolor=side_fc,
        header="",
        line1="Records excluded",
        line2="(n = 5,520)",
        fontsize_body=13,
    )

    elig_box = _add_box(
        ax,
        x=x_main,
        y=y_elig,
        w=w_main,
        h=h_main,
        facecolor=main_fc,
        header="ELIGIBILITY",
        line1="Reports assessed for eligibility",
        line2="(n = 312)",
        fontsize_header=18,
        fontsize_body=14,
    )

    rep_ex_box = _add_reports_excluded_box(
        ax,
        x=x_right,
        y=y_elig + h_main / 2 - h_right_large / 2,
        w=w_right,
        h=h_right_large,
        facecolor=side_fc,
    )

    incl_box = _add_box(
        ax,
        x=x_main,
        y=y_incl,
        w=w_main,
        h=h_main * 0.95,
        facecolor=main_fc,
        header="INCLUDED",
        line1="Studies included in review",
        line2="(n = 53)",
        fontsize_header=18,
        fontsize_body=14,
    )

    def center_bottom(p: FancyBboxPatch) -> tuple[float, float]:
        x, y = p.get_x(), p.get_y()
        w, h = p.get_width(), p.get_height()
        return (x + w / 2, y)

    def center_top(p: FancyBboxPatch) -> tuple[float, float]:
        x, y = p.get_x(), p.get_y()
        w, h = p.get_width(), p.get_height()
        return (x + w / 2, y + h)

    def center_left(p: FancyBboxPatch) -> tuple[float, float]:
        x, y = p.get_x(), p.get_y()
        h = p.get_height()
        return (x, y + h / 2)

    def center_right(p: FancyBboxPatch) -> tuple[float, float]:
        x, y = p.get_x(), p.get_y()
        w, h = p.get_width(), p.get_height()
        return (x + w, y + h / 2)

    _add_arrow(ax, start=center_bottom(id_box), end=center_top(screen_box), dashed=False, linewidth=2.8, mutation_scale=18)
    _add_arrow(ax, start=center_bottom(screen_box), end=center_top(elig_box), dashed=False, linewidth=2.8, mutation_scale=18)
    _add_arrow(ax, start=center_bottom(elig_box), end=center_top(incl_box), dashed=False, linewidth=2.8, mutation_scale=18)

    sx, sy = center_right(id_box)
    ex, _ = center_left(dup_box)
    _add_arrow(ax, start=(sx, sy), end=(ex, sy), dashed=True, linewidth=2.8, mutation_scale=18)

    sx, sy = center_right(screen_box)
    ex, _ = center_left(rec_ex_box)
    _add_arrow(ax, start=(sx, sy), end=(ex, sy), dashed=True, linewidth=2.8, mutation_scale=18)

    sx, sy = center_right(elig_box)
    ex, _ = center_left(rep_ex_box)
    _add_arrow(ax, start=(sx, sy), end=(ex, sy), dashed=True, linewidth=2.8, mutation_scale=18)

    png_path = out_dir / "Figure_1_PRISMA_Flowchart.png"
    pdf_path = out_dir / "Figure_1_PRISMA_Flowchart.pdf"
    svg_path = out_dir / "Figure_1_PRISMA_Flowchart.svg"

    fig.savefig(png_path, dpi=600, facecolor="white")
    fig.savefig(pdf_path, facecolor="white")
    fig.savefig(svg_path, facecolor="white")
    plt.close(fig)


if __name__ == "__main__":
    generate_prisma_flowchart(Path(__file__).resolve().parent)
