#!/usr/bin/env python3
"""Create conceptual, illustrative synthetic traces for Cases A–D.

These generated waveforms are examples for a technical presentation only.
They are not site measurements, a detector model, or evidence of performance.
"""

from __future__ import annotations

import argparse
import csv
from pathlib import Path

import matplotlib

matplotlib.use("Agg")

import matplotlib.pyplot as plt
import numpy as np

SAMPLE_LABEL = "ILLUSTRATIVE SYNTHETIC DATA — NOT SITE MEASUREMENTS"
DEFAULT_OUTPUT_DIR = Path("generated-artifacts/wp2-signal-plots")


def build_scenarios(seed: int) -> tuple[np.ndarray, list[dict[str, object]]]:
    """Return synthetic time-series examples with a reproducible random seed."""
    rng = np.random.default_rng(seed)
    time = np.linspace(0, 20, 600)
    noise = lambda scale: rng.normal(0, scale, time.size)

    case_a = {
        "case": "A",
        "title": "Normal pass",
        "state": "No Detection Indicated",
        "description": "Illustrative baseline only; not a calibrated threshold.",
        "runs": [
            {
                "run": 1,
                "emi": noise(0.07),
                "magnetic": noise(0.07),
            }
        ],
    }

    event_shape = np.exp(-0.5 * ((time - 10) / 0.42) ** 2)
    case_b = {
        "case": "B",
        "title": "Concealed target example",
        "state": "Illustrative Event Flag",
        "description": "Synthetic channel changes shown for workflow illustration.",
        "runs": [
            {
                "run": 1,
                "emi": 0.68 * event_shape + noise(0.07),
                "magnetic": 0.84 * event_shape + noise(0.07),
            }
        ],
    }

    interference_emi = (
        0.24 * np.sin(2 * np.pi * 0.42 * time)
        + 0.13 * np.sin(2 * np.pi * 1.2 * time + 0.8)
    )
    interference_magnetic = (
        0.28 * np.sin(2 * np.pi * 0.42 * time + 0.9)
        + 0.09 * np.sin(2 * np.pi * 0.9 * time)
    )
    case_c = {
        "case": "C",
        "title": "Interference / ambiguity",
        "state": "Requires Validation / Operator Review",
        "description": "Example interference pattern; classification is not implied.",
        "runs": [
            {
                "run": 1,
                "emi": interference_emi + noise(0.07),
                "magnetic": interference_magnetic + noise(0.07),
            }
        ],
    }

    case_d_runs = []
    for run_number in range(1, 6):
        amplitude = rng.uniform(0.45, 0.95)
        shift = rng.normal(0, 0.22)
        run_shape = np.exp(-0.5 * ((time - (10 + shift)) / 0.52) ** 2)
        case_d_runs.append(
            {
                "run": run_number,
                "emi": amplitude * run_shape + noise(0.09),
                "magnetic": (amplitude * 0.86) * run_shape + noise(0.09),
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
        "run",
        "time_seconds",
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
                            "run": run["run"],
                            "time_seconds": f"{seconds:.4f}",
                            "emi_synthetic_relative_units": f"{emi[index]:.6f}",
                            "magnetic_synthetic_relative_units": f"{magnetic[index]:.6f}",
                            "label": SAMPLE_LABEL,
                        }
                    )


def save_figure(
    output_path: Path, time: np.ndarray, scenarios: list[dict[str, object]]
) -> None:
    fig, axes = plt.subplots(2, 2, figsize=(15, 10), constrained_layout=True)
    fig.suptitle(
        "Hybrid sensing concept | synthetic examples only",
        fontsize=18,
        fontweight="bold",
    )
    colors = {"emi": "#d67539", "magnetic": "#2678a8"}

    for ax, scenario in zip(axes.flat, scenarios, strict=True):
        runs = scenario["runs"]
        if scenario["case"] != "D":
            run = runs[0]
            ax.plot(time, run["emi"], color=colors["emi"], lw=1.8, label="EMI example")
            ax.plot(
                time,
                run["magnetic"],
                color=colors["magnetic"],
                lw=1.8,
                label="Magnetic / gradiometric example",
            )
        else:
            for run in runs:
                ax.plot(
                    time,
                    run["emi"],
                    color=colors["emi"],
                    alpha=0.48,
                    lw=1.1,
                    label="EMI example runs" if run["run"] == 1 else None,
                )
                ax.plot(
                    time,
                    run["magnetic"],
                    color=colors["magnetic"],
                    alpha=0.48,
                    lw=1.1,
                    label=(
                        "Magnetic / gradiometric example runs"
                        if run["run"] == 1
                        else None
                    ),
                )

        ax.set_title(f"Case {scenario['case']} — {scenario['title']}", loc="left", weight="bold")
        ax.set_xlabel("Illustrative timeline (seconds)")
        ax.set_ylabel("Synthetic relative units")
        ax.grid(True, color="#d8dee4", linewidth=0.7, alpha=0.75)
        ax.legend(loc="upper right", frameon=True, fontsize=8)
        ax.text(
            0.02,
            0.97,
            SAMPLE_LABEL,
            transform=ax.transAxes,
            va="top",
            fontsize=7.5,
            color="#8a3d23",
            bbox={"facecolor": "white", "edgecolor": "#dfc9bd", "alpha": 0.92},
        )
        ax.text(
            0.02,
            0.03,
            f"{scenario['state']}\n{scenario['description']}",
            transform=ax.transAxes,
            va="bottom",
            fontsize=8,
            color="#374151",
            bbox={"facecolor": "white", "edgecolor": "#d8dee4", "alpha": 0.9},
        )

    fig.text(
        0.5,
        0.003,
        "Conceptual only. Physical testing is required to evaluate system behavior.",
        ha="center",
        fontsize=9,
        color="#46515d",
    )
    fig.savefig(output_path, dpi=220, facecolor="white", bbox_inches="tight")
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
        default=20261118,
        help="Random seed for reproducible illustrative traces.",
    )
    args = parser.parse_args()

    args.output_dir.mkdir(parents=True, exist_ok=True)
    time, scenarios = build_scenarios(args.seed)
    figure_path = args.output_dir / "signal-cases-A-D.png"
    csv_path = args.output_dir / "signal-cases-A-D.csv"
    save_figure(figure_path, time, scenarios)
    save_csv(csv_path, time, scenarios)
    print(f"Generated illustrative figure: {figure_path}")
    print(f"Generated illustrative samples: {csv_path}")
    print("No site measurements or validated performance claims are represented.")


if __name__ == "__main__":
    main()
