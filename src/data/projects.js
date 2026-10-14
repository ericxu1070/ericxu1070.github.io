export const projects = [
  {
    title: "Subseasonal Extreme Temperature Forecasting",
    year: "2026",
    description:
      "TACS Lab research project. AI ensemble pipeline that forecasts heat waves and cold outbreaks three weeks ahead; ensemble members reached the observed extreme in 6 of 7 test cases, versus 0 of 7 for NOAA's CFSv2. Includes a diffusion model that downscales ERA5 to HRRR (~3 km) resolution.",
    repo: "https://github.com/ericxu1070/S2S_ExtremeWeather",
  },
  {
    title: "Cross-Species Transfer Learning with DeepSEA",
    year: "2026",
    description:
      "Transfers the DeepSEA genomic sequence model from human to mouse ENCODE data, with zero-shot evaluation and baseline pipelines for benchmarking cross-species generalization.",
    repo: "https://github.com/ericxu1070/DeepSEA-Transfer-Learning",
  },
  {
    title: "4D Variational Data Assimilation with AI",
    year: "2026",
    description:
      "Capstone project for AM 170B. PyTorch reimplementation and extension of 4D-Var data assimilation with a learned inverse observation operator, with experiments on the Lorenz-96 and Kolmogorov-flow systems.",
    repo: "https://github.com/ericxu1070/invobs-data-assimilation",
  },
  {
    title: "Reinforcement Learning Drone",
    year: "2026",
    description:
      "Capstone project for AM 170A. Compares a physics-only controller, pure reinforcement learning, and a hybrid controller (analytic prior plus learned residual) for point-to-point drone flight under stochastic wind, measuring total energy use and mission failure rate.",
    repo: null,
  },
  {
    title: "Council of Sumer",
    year: "2026",
    description:
      "UCSC AI Hackathon @ SF Tech Week. A multi-agent take on the 1968 city-management game Hamurabi: five LLM advisors with conflicting goals run as separate processes, debate over AGNTCY SLIM, and vote on each year's plan, with runoffs and human tie-breaking on deadlock. Across 16 seeded cities, the council kept 73% of reigns versus 56% for a single LLM and starved 27% fewer people.",
    repo: "https://github.com/ericxu1070/council-of-sumer",
  },
];
