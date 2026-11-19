#!/usr/bin/env python3
"""Create conceptual, illustrative synthetic traces for Cases A–D.

These generated waveforms are examples for a technical presentation only.
They are not site measurements, a detector model, or evidence of performance.
"""

from __future__ import annotations

import argparse
import csv
import json
from pathlib import Path

import matplotlib

matplotlib.use("Agg")

import matplotlib.pyplot as plt
import numpy as np
from matplotlib.patches import FancyArrowPatch, FancyBboxPatch

SAMPLE_LABEL = "ILLUSTRATIVE SYNTHETIC DATA — NOT SITE MEASUREMENTS"
DEFAULT_OUTPUT_DIR = Path("generated-artifacts/wp2-signal-plots")
DEFAULT_SEED = 20261118

# These values are chosen only to make distinct explanatory shapes on a chart.
# They are not sensor specifications, calibration values, thresholds, or
# measured mine data.
ILLUSTRATIVE_TIME_START_SECONDS = 0.0
ILLUSTRATIVE_TIME_END_SECONDS = 20.0
ILLUSTRATIVE_SAMPLE_COUNT = 600
CASE_A_NOISE_STD = 0.07
CASE_B_CENTER_SECONDS = 10.0
CASE_B_SIGMA_SECONDS = 0.42
CASE_B_EMI_AMPLITUDE = 0.68
CASE_B_MAGNETIC_AMPLITUDE = 0.84
CASE_B_NOISE_STD = 0.07
CASE_C_EMI_AMPLITUDES = (0.24, 0.13)
CASE_C_EMI_RATES = (0.42, 1.2)
CASE_C_EMI_PHASES = (0.0, 0.8)
CASE_C_MAGNETIC_AMPLITUDES = (0.28, 0.09)
CASE_C_MAGNETIC_RATES = (0.42, 0.9)
CASE_C_MAGNETIC_PHASES = (0.9, 0.0)
CASE_C_NOISE_STD = 0.07
CASE_D_RUN_COUNT = 5
CASE_D_AMPLITUDE_RANGE = (0.45, 0.95)
CASE_D_SHIFT_STD_SECONDS = 0.22
CASE_D_SIGMA_SECONDS = 0.52
CASE_D_MAGNETIC_SCALE = 0.86
CASE_D_NOISE_STD = 0.09

ILLUSTRATIVE_PARAMETERS = {
    "units": "arbitrary synthetic relative units; not calibrated",
    "noise_distribution": "normal draws scaled by the listed illustrative standard deviations",
    "timeline": {
        "start_seconds": ILLUSTRATIVE_TIME_START_SECONDS,
        "end_seconds": ILLUSTRATIVE_TIME_END_SECONDS,
        "points": ILLUSTRATIVE_SAMPLE_COUNT,
        "note": "Illustrative display axis only; not a sensor sampling specification.",
    },
    "case_a": {"noise_std_relative_units": CASE_A_NOISE_STD},
    "case_b": {
        "center_seconds": CASE_B_CENTER_SECONDS,
        "shape_sigma_seconds": CASE_B_SIGMA_SECONDS,
        "emi_amplitude_relative_units": CASE_B_EMI_AMPLITUDE,
        "magnetic_amplitude_relative_units": CASE_B_MAGNETIC_AMPLITUDE,
        "noise_std_relative_units": CASE_B_NOISE_STD,
        "note": "Generic channel changes; not a physical target-response model.",
    },
    "case_c": {
        "emi_amplitudes_relative_units": CASE_C_EMI_AMPLITUDES,
        "emi_rates_per_illustrative_time_unit": CASE_C_EMI_RATES,
        "emi_phase_offsets_radians": CASE_C_EMI_PHASES,
        "magnetic_amplitudes_relative_units": CASE_C_MAGNETIC_AMPLITUDES,
        "magnetic_rates_per_illustrative_time_unit": CASE_C_MAGNETIC_RATES,
        "magnetic_phase_offsets_radians": CASE_C_MAGNETIC_PHASES,
        "noise_std_relative_units": CASE_C_NOISE_STD,
        "note": "Visual interference-like texture; not a modeled truck, ore, or EMI effect.",
    },
    "case_d": {
        "run_count": CASE_D_RUN_COUNT,
        "amplitude_range_relative_units": CASE_D_AMPLITUDE_RANGE,
        "time_shift_std_seconds": CASE_D_SHIFT_STD_SECONDS,
        "shape_sigma_seconds": CASE_D_SIGMA_SECONDS,
        "magnetic_scale": CASE_D_MAGNETIC_SCALE,
        "noise_std_relative_units": CASE_D_NOISE_STD,
        "note": "Independent synthetic overlays; not repeatability evidence.",
    },
}


def build_scenarios(seed: int) -> tuple[np.ndarray, list[dict[str, object]]]:
    """Return presentation-only examples using a reproducible random seed."""
    rng = np.random.default_rng(seed)
    time = np.linspace(
        ILLUSTRATIVE_TIME_START_SECONDS,
        ILLUSTRATIVE_TIME_END_SECONDS,
        ILLUSTRATIVE_SAMPLE_COUNT,
    )
    noise = lambda scale: rng.normal(0, scale, time.size)

    case_a = {
        "case": "A",
        "title": "Normal pass",
        "state": "No Detection Indicated",
        "description": "Illustrative baseline only; not a calibrated threshold.",
        "runs": [
            {
                "run": 1,
                "emi": noise(CASE_A_NOISE_STD),
                "magnetic": noise(CASE_A_NOISE_STD),
            }
        ],
    }

    event_shape = np.exp(
        -0.5 * ((time - CASE_B_CENTER_SECONDS) / CASE_B_SIGMA_SECONDS) ** 2
    )
    case_b = {
        "case": "B",
        "title": "Concealed target example",
        "state": "Illustrative Event Flag",
        "description": "Synthetic channel changes shown for workflow illustration.",
        "runs": [
            {
                "run": 1,
                "emi": CASE_B_EMI_AMPLITUDE * event_shape + noise(CASE_B_NOISE_STD),
                "magnetic": CASE_B_MAGNETIC_AMPLITUDE * event_shape
                + noise(CASE_B_NOISE_STD),
            }
        ],
    }

    interference_emi = CASE_C_EMI_AMPLITUDES[0] * np.sin(
        2 * np.pi * CASE_C_EMI_RATES[0] * time + CASE_C_EMI_PHASES[0]
    ) + CASE_C_EMI_AMPLITUDES[1] * np.sin(
        2 * np.pi * CASE_C_EMI_RATES[1] * time + CASE_C_EMI_PHASES[1]
    )
    interference_magnetic = (
        CASE_C_MAGNETIC_AMPLITUDES[0]
        * np.sin(
            2 * np.pi * CASE_C_MAGNETIC_RATES[0] * time
            + CASE_C_MAGNETIC_PHASES[0]
        )
        + CASE_C_MAGNETIC_AMPLITUDES[1]
        * np.sin(
            2 * np.pi * CASE_C_MAGNETIC_RATES[1] * time
            + CASE_C_MAGNETIC_PHASES[1]
        )
    )
    case_c = {
        "case": "C",
        "title": "Interference / ambiguity",
        "state": "Requires Validation / Operator Review",
        "description": "Example interference pattern; classification is not implied.",
        "runs": [
            {
                "run": 1,
                "emi": interference_emi + noise(CASE_C_NOISE_STD),
                "magnetic": interference_magnetic + noise(CASE_C_NOISE_STD),
            }
        ],
    }

    case_d_runs = []
    for run_number in range(1, CASE_D_RUN_COUNT + 1):
        amplitude = rng.uniform(*CASE_D_AMPLITUDE_RANGE)
        shift = rng.normal(0, CASE_D_SHIFT_STD_SECONDS)
        run_shape = np.exp(
            -0.5
            * (
                (time - (CASE_B_CENTER_SECONDS + shift))
                / CASE_D_SIGMA_SECONDS
            )
            ** 2
        )
        case_d_runs.append(
            {
                "run": run_number,
                "emi": amplitude * run_shape + noise(CASE_D_NOISE_STD),
                "magnetic": CASE_D_MAGNETIC_SCALE
                * amplitude
                * run_shape
                + noise(CASE_D_NOISE_STD),
            }
        )

    case_d = {
        "case": "D",
        "title": "Repeated-run illustration",
        "state": "Physical evaluation required",
        "description": "Synthetic overlays do not establish repeatability or performance.",
        "runs": case_d_runs,
    }
    return time, [case_a, case_b, case_c, case_d]


def save_csv(
    output_path: Path, time: np.ndarray, scenarios: list[dict[str, object]]
) -> None:
    fieldnames = [
        "case",
        "case_title",
        "run",
        "illustrative_state",
        "illustrative_time_seconds",
        "emi_synthetic_relative_units",
        "magnetic_synthetic_relative_units",
        "label",
    ]
    with output_path.open("w", newline="", encoding="utf-8") as file:
        writer = csv.DictWriter(file, fieldnames=fieldnames)
        writer.writeheader()
        for scenario in scenarios:
            for run in scenario["runs"]:
                emi = run["emi"]
                magnetic = run["magnetic"]
                for index, seconds in enumerate(time):
                    writer.writerow(
                        {
                            "case": scenario["case"],
                            "case_title": scenario["title"],
                            "run": run["run"],
                            "illustrative_state": scenario["state"],
                            "illustrative_time_seconds": f"{seconds:.4f}",
                            "emi_synthetic_relative_units": f"{emi[index]:.6f}",
                            "magnetic_synthetic_relative_units": f"{magnetic[index]:.6f}",
                            "label": SAMPLE_LABEL,
                        }
                    )


def save_assumptions(output_path: Path, seed: int) -> None:
    """Save the exact synthetic recipe and its non-engineering limits."""
    manifest = {
        "label": SAMPLE_LABEL,
        "seed": seed,
        "parameters": ILLUSTRATIVE_PARAMETERS,
        "limits": [
            "No site measurements or physical sensor response are represented.",
            "No sensor sampling specification, threshold, or processing algorithm is represented.",
            "No detection range, sensitivity, false-alarm rate, or repeatability result is claimed.",
            "Case D is a synthetic overlay, not a repeatability test.",
            "The complementary input is unspecified and has no generated numeric channel.",
        ],
    }
    output_path.write_text(
        json.dumps(manifest, indent=2, ensure_ascii=False) + "\n",
        encoding="utf-8",
    )


CHANNEL_COLORS = {"emi": "#d67539", "magnetic": "#2678a8"}
CASE_OVERLAY_NAMES = {
    "A": "case-A-normal-pass-overlay.png",
    "B": "case-B-concealed-target-overlay.png",
    "C": "case-C-interference-ambiguity-overlay.png",
    "D": "case-D-repeated-run-overlay.png",
}


def plot_scenario(ax, time: np.ndarray, scenario: dict[str, object]) -> None:
    runs = scenario["runs"]
    is_repeated = scenario["case"] == "D"
    for run in runs:
        alpha = 0.42 if is_repeated else 1
        width = 1.4 if is_repeated else 2.2
        ax.plot(
            time,
            run["emi"],
            color=CHANNEL_COLORS["emi"],
            alpha=alpha,
            lw=width,
            label="EMI example runs" if is_repeated and run["run"] == 1 else (
                "EMI example" if not is_repeated else None
            ),
        )
        ax.plot(
            time,
            run["magnetic"],
            color=CHANNEL_COLORS["magnetic"],
            alpha=alpha,
            lw=width,
            label=(
                "Magnetic / gradiometric example runs"
                if is_repeated and run["run"] == 1
                else "Magnetic / gradiometric example" if not is_repeated else None
            ),
        )

    ax.set_title(
        f"Case {scenario['case']} — {scenario['title']}",
        loc="left",
        weight="bold",
        fontsize=12,
    )
    ax.set_xlabel("Illustrative timeline (s; not acquisition timing)")
    ax.set_ylabel("Synthetic relative units")
    ax.grid(True, color="#d8dee4", linewidth=0.7, alpha=0.75)
    ax.legend(loc="upper right", frameon=True, fontsize=8)
    ax.text(
        0.02,
        0.96,
        SAMPLE_LABEL,
        transform=ax.transAxes,
        va="top",
        fontsize=7.5,
        color="#8a3d23",
        bbox={"facecolor": "white", "edgecolor": "#dfc9bd", "alpha": 0.94},
    )
    ax.text(
        0.02,
        0.03,
        f"{scenario['state']}\n{scenario['description']}",
        transform=ax.transAxes,
        va="bottom",
        fontsize=8,
        color="#374151",
        bbox={"facecolor": "white", "edgecolor": "#d8dee4", "alpha": 0.94},
    )


def save_figure(
    output_path: Path, time: np.ndarray, scenarios: list[dict[str, object]]
) -> None:
    fig, axes = plt.subplots(2, 2, figsize=(16, 9))
    fig.subplots_adjust(
        left=0.07,
        right=0.98,
        bottom=0.13,
        top=0.88,
        wspace=0.17,
        hspace=0.34,
    )
    fig.suptitle(
        "WP2 · Hybrid sensing concept | synthetic examples only",
        fontsize=20,
        fontweight="bold",
        y=0.95,
    )
    for ax, scenario in zip(axes.flat, scenarios, strict=True):
        plot_scenario(ax, time, scenario)

    fig.text(
        0.5,
        0.025,
        "Conceptual only · physical tests are needed to evaluate system behavior · no performance claims",
        ha="center",
        fontsize=10,
        color="#46515d",
    )
    fig.savefig(output_path, dpi=120, facecolor="white")
    plt.close(fig)


def save_case_overlays(
    output_dir: Path, time: np.ndarray, scenarios: list[dict[str, object]]
) -> None:
    """Create transparent 16:9 chart overlays for video-editing use."""
    for scenario in scenarios:
        fig = plt.figure(figsize=(16, 9), facecolor="none")
        fig.patch.set_alpha(0)
        fig.patches.append(
            FancyBboxPatch(
                (0.035, 0.035),
                0.93,
                0.93,
                transform=fig.transFigure,
                boxstyle="round,pad=0.008,rounding_size=0.02",
                linewidth=1.2,
                edgecolor=(0.40, 0.48, 0.43, 0.9),
                facecolor=(0.97, 0.96, 0.92, 0.97),
                zorder=0,
            )
        )
        ax = fig.add_axes(
            [0.075, 0.15, 0.85, 0.64],
            facecolor=(0.99, 0.985, 0.96, 0.98),
            zorder=1,
        )
        plot_scenario(ax, time, scenario)
        fig.text(
            0.075,
            0.90,
            "WP2 · SIGNAL BEHAVIOUR",
            color="#26383c",
            fontsize=16,
            weight="bold",
        )
        fig.text(
            0.075,
            0.855,
            "Illustrative visual only · no site measurements or validated performance",
            color="#6a716b",
            fontsize=11,
        )
        fig.text(
            0.075,
            0.075,
            "Synthetic relative units · no sensor specification, threshold, or validated algorithm",
            color="#46515d",
            fontsize=10,
        )
        output_path = output_dir / CASE_OVERLAY_NAMES[str(scenario["case"])]
        fig.savefig(output_path, dpi=120, transparent=False)
        plt.close(fig)


def add_flow_box(
    ax,
    x: float,
    y: float,
    width: float,
    height: float,
    title: str,
    detail: str,
    edge: str,
    *,
    dashed: bool = False,
    face: str = "#fbfaf6",
) -> None:
    box = FancyBboxPatch(
        (x, y),
        width,
        height,
        boxstyle="round,pad=0.012,rounding_size=0.015",
        linewidth=1.8,
        edgecolor=edge,
        facecolor=face,
        linestyle="--" if dashed else "-",
    )
    ax.add_patch(box)
    ax.text(
        x + width / 2,
        y + height * 0.67,
        title,
        ha="center",
        va="center",
        fontsize=11,
        weight="bold",
        color="#26383c",
        wrap=True,
    )
    ax.text(
        x + width / 2,
        y + height * 0.32,
        detail,
        ha="center",
        va="center",
        fontsize=8.5,
        color="#5d6b65",
        wrap=True,
    )


def save_signal_flow(svg_path: Path, png_path: Path) -> None:
    """Draw the conceptual channel-to-review path without implying an algorithm."""
    fig, ax = plt.subplots(figsize=(16, 9))
    fig.patch.set_facecolor("#f5f2e9")
    ax.set_facecolor("#f5f2e9")
    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.axis("off")

    fig.text(
        0.055,
        0.91,
        "WP2 · SENSOR & SIGNAL BEHAVIOUR",
        fontsize=20,
        weight="bold",
        color="#26383c",
    )
    fig.text(
        0.055,
        0.865,
        "Conceptual signal flow · not an implementation or validated process",
        fontsize=12,
        color="#68756d",
    )

    add_flow_box(
        ax,
        0.045,
        0.68,
        0.22,
        0.12,
        "EMI channel",
        "synthetic example trace",
        CHANNEL_COLORS["emi"],
        face="#fff8f1",
    )
    add_flow_box(
        ax,
        0.045,
        0.48,
        0.22,
        0.12,
        "Magnetic / gradiometric",
        "synthetic example trace",
        CHANNEL_COLORS["magnetic"],
        face="#f1f8fb",
    )
    add_flow_box(
        ax,
        0.045,
        0.28,
        0.22,
        0.12,
        "Complementary input",
        "type not specified · no values",
        "#8d948c",
        dashed=True,
        face="#f0efe9",
    )

    nodes = [
        (0.32, "Data acquisition", "concept"),
        (0.49, "Generic conditioning", "method not specified"),
        (0.66, "Illustrative comparison", "no threshold or algorithm"),
        (0.83, "Operator review", "site-approved procedures"),
    ]
    node_width = 0.145
    node_y = 0.48
    node_height = 0.25
    node_colors = ["#809185", "#809185", "#b98334", "#627e6e"]
    for (x, title, detail), color in zip(nodes, node_colors, strict=True):
        add_flow_box(
            ax,
            x,
            node_y,
            node_width,
            node_height,
            title,
            detail,
            color,
        )

    arrow_style = dict(arrowstyle="-|>", mutation_scale=16, linewidth=1.8, color="#7c8980")
    for start, end in [
        ((0.265, 0.74), (0.32, 0.63)),
        ((0.265, 0.54), (0.32, 0.59)),
        ((0.465, 0.605), (0.49, 0.605)),
        ((0.635, 0.605), (0.66, 0.605)),
        ((0.805, 0.605), (0.83, 0.605)),
    ]:
        ax.add_patch(FancyArrowPatch(start, end, **arrow_style))

    ax.add_patch(
        FancyArrowPatch(
            (0.265, 0.34),
            (0.32, 0.55),
            arrowstyle="-|>",
            mutation_scale=16,
            linewidth=1.5,
            linestyle="--",
            color="#8d948c",
        )
    )
    fig.text(
        0.055,
        0.16,
        "Input type, sampling, conditioning method, decision logic, and operating response are not specified.",
        fontsize=11,
        color="#65532f",
        weight="bold",
    )
    fig.text(
        0.055,
        0.105,
        "All traces are synthetic examples · no site measurements · no detection or performance claim",
        fontsize=10,
        color="#59675f",
    )
    fig.savefig(svg_path, facecolor=fig.get_facecolor())
    fig.savefig(png_path, dpi=120, facecolor=fig.get_facecolor())
    plt.close(fig)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Generate clearly labeled synthetic EMI and magnetic examples."
    )
    parser.add_argument(
        "--output-dir",
        type=Path,
        default=DEFAULT_OUTPUT_DIR,
        help=f"Output folder (default: {DEFAULT_OUTPUT_DIR})",
    )
    parser.add_argument(
        "--seed",
        type=int,
        default=DEFAULT_SEED,
        help="Random seed for reproducible illustrative traces.",
    )
    args = parser.parse_args()

    args.output_dir.mkdir(parents=True, exist_ok=True)
    time, scenarios = build_scenarios(args.seed)
    figure_path = args.output_dir / "signal-cases-A-D.png"
    csv_path = args.output_dir / "signal-cases-A-D.csv"
    assumptions_path = args.output_dir / "signal-generation-assumptions.json"
    flow_svg_path = args.output_dir / "signal-conditioning-flow.svg"
    flow_png_path = args.output_dir / "signal-conditioning-flow.png"
    save_figure(figure_path, time, scenarios)
    save_case_overlays(args.output_dir, time, scenarios)
    save_csv(csv_path, time, scenarios)
    save_assumptions(assumptions_path, args.seed)
    save_signal_flow(flow_svg_path, flow_png_path)
    print(f"Generated illustrative figure: {figure_path}")
    print(f"Generated illustrative samples: {csv_path}")
    print(f"Generated video-ready case overlays: {len(scenarios)}")
    print(f"Generated conceptual signal flow: {flow_svg_path} and {flow_png_path}")
    print(f"Saved synthetic parameter manifest: {assumptions_path}")
    print("No site measurements or validated performance claims are represented.")


if __name__ == "__main__":
    main()
