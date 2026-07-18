export const projects = [
  {
    title: "4D-Var Data Assimilation with a Learned Inverse Observation Operator",
    year: "2026",
    description:
      "Senior capstone (AM 170B). Variational data assimilation experiments on the Lorenz-96 and Kolmogorov-flow systems, learning an inverse observation operator to improve state estimation. Final report graded 95/A.",
    tags: ["jax", "dynamical-systems"],
    repo: null,
    demo: null,
    featured: true,
  },
  {
    title: "Grey-Swan Tropical Cyclone Prediction",
    year: "2026",
    description:
      "TACS Lab research project. ML pipeline coupling a GraphCast global weather model with super-resolution downscaling to HRRR (~3 km) resolution; trained and evaluated on NCAR Derecho and NERSC Perlmutter HPC clusters via SLURM and PBS schedulers.",
    tags: ["pytorch", "hpc"],
    repo: "https://github.com/ericxu1070/S2S_ExtremeWeather",
    demo: null,
    featured: true,
  },
  {
    title: "Cross-Species Transfer Learning with DeepSEA",
    year: "2026",
    description:
      "Transfers the DeepSEA genomic sequence model from human to mouse ENCODE data, with zero-shot evaluation and baseline pipelines for benchmarking cross-species generalization.",
    tags: ["pytorch", "genomics"],
    repo: "https://github.com/ericxu1070/DeepSEA-Transfer-Learning",
    demo: null,
    featured: true,
  },
  {
    title: "Personal Portfolio",
    year: "2026",
    description:
      "This website. Astro static site with a Three.js Lorenz-attractor loading animation, deployed on GitHub Pages.",
    tags: ["astro", "three.js"],
    repo: "https://github.com/ericxu1070/ericxu1070.github.io",
    demo: "https://ericxu1070.github.io",
    featured: false,
  },
  {
    title: "Restaurant Time Clock Kiosk",
    year: "2026",
    description:
      "An employee time-clock kiosk backed by Google Sheets for data storage and retrieval.",
    tags: ["javascript", "google-sheets"],
    repo: "https://github.com/ericxu1070/timeclock",
    demo: null,
    featured: false,
  },
];
