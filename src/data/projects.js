// Public projects only (every link must open for a logged-out visitor). The S2S research code is a
// private lab repo, so that work lives under Research on the home page, not here.
// Wording mirrors the resume source (~/Documents/Job Search/generator/base.js); update both together.
export const projects = [
  {
    title: "Council of Sumer",
    year: "2026",
    description:
      "A council of five LLM agents with conflicting goals, built at the UCSC AI Hackathon @ SF Tech Week (team of 3). The agents run as separate processes, debate over AGNTCY SLIM, and vote on each year's plan in the 1968 city-management game Hamurabi, with runoffs and a human tie-break on deadlock. I co-wrote the deliberation engine and the benchmark: over 16 seeded games, the council survived 11 of 15 completed reigns versus 9 of 16 for a single LLM, and starved 27% fewer people.",
    links: [{ label: "code", url: "https://github.com/ericxu1070/council-of-sumer" }],
  },
  {
    title: "Cross-Species Transfer Learning with DeepSEA",
    year: "2026",
    description:
      "Fine-tunes the human-trained DeepSEA genomic sequence model on mouse ENCODE data. Fine-tuning beat training from scratch on 115 of 133 chromatin features (median AUROC 0.877 vs 0.865) and converged in fewer epochs, while zero-shot transfer scored near chance (median AUROC 0.50).",
    links: [{ label: "code", url: "https://github.com/ericxu1070/DeepSEA-Transfer-Learning" }],
  },
  {
    title: "4D-Var Data Assimilation with a Learned Inverse Operator",
    year: "2026",
    description:
      "AM 170B capstone, team of 5. We reimplemented Frerix et al. (ICML 2021), a 4D-Var method with a learned inverse observation operator, in PyTorch and extended it with the full 4D-Var cost, Gaussian observation noise at three levels, and sliding-window cycling, on Lorenz-96 and 2D Kolmogorov flow. On Lorenz-96, learned-inverse initialization with hybrid optimization gave the lowest analysis RMSE at every noise level.",
    links: [
      { label: "report (PDF)", url: "https://github.com/ericxu1070/invobs-data-assimilation/blob/master/paper/main.pdf" },
      { label: "code", url: "https://github.com/ericxu1070/invobs-data-assimilation" },
    ],
  },
];
