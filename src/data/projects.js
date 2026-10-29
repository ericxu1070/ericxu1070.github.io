export const projects = [
  {
    title: "Subseasonal Extreme Temperature Forecasting",
    year: "2026",
    description:
      "TACS Lab research project. An AI ensemble pipeline forecasts heat waves and cold outbreaks three weeks ahead. Ensemble members reached the observed extreme in 6 of 7 test cases, versus 0 of 7 for NOAA's CFSv2. The repo also has a diffusion model that downscales ERA5 to HRRR (~3 km) resolution.",
    repo: "https://github.com/ericxu1070/S2S_ExtremeWeather",
  },
  {
    title: "Cross-Species Transfer Learning with DeepSEA",
    year: "2026",
    description:
      "Fine-tunes the human-trained DeepSEA genomic sequence model on mouse ENCODE data. Fine-tuning beat training from scratch on 115 of 133 chromatin features, while zero-shot transfer scored near chance (AUROC 0.50).",
    repo: "https://github.com/ericxu1070/DeepSEA-Transfer-Learning",
  },
  {
    title: "4D Variational Data Assimilation with AI",
    year: "2026",
    description:
      "Capstone project for AM 170B. Reimplements and extends 4D-Var data assimilation in PyTorch with a learned inverse observation operator, tested on Lorenz-96 and Kolmogorov flow. On Lorenz-96 it cut state-estimation error by 38-75% versus standard 4D-Var.",
    repo: "https://github.com/ericxu1070/invobs-data-assimilation",
  },
  {
    title: "Council of Sumer",
    year: "2026",
    description:
      "UCSC AI Hackathon @ SF Tech Week. A multi-agent version of the 1968 city-management game Hamurabi. Five LLM advisors with conflicting goals run as separate processes, debate over AGNTCY SLIM, and vote on each year's plan. A deadlock goes to a runoff, then to a human tie-break. Across 16 seeded cities, the council kept 73% of reigns versus 56% for a single LLM and starved 27% fewer people.",
    repo: "https://github.com/ericxu1070/council-of-sumer",
  },
];
