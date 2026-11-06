// Public projects only (every link must open for a logged-out visitor). The S2S research code is a
// private lab repo, so that work lives under Research on the home page, not here.
// Wording mirrors the resume source (~/Documents/Job Search/generator/base.js); update both together.
export const projects = [
  {
    title: "Council of Sumer",
    year: "2026",
    description:
      "A council of five LLM agents with conflicting goals, built at the UCSC AI Hackathon @ SF Tech Week (team of 3). The agents run as separate processes, debate over AGNTCY SLIM, and vote on each year's plan in the 1968 city-management game Hamurabi, with runoffs and a human tie-break on deadlock. I co-wrote the deliberation engine and the benchmark; over 16 seeded games, the council improved on the single-LLM baseline.",
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
      "AM 170B capstone, team of 5. Frerix et al. (ICML 2021) learn an inverse observation operator to make 4D-Var easier to optimize. I wrote most of our PyTorch port of their JAX code and reproduced the Lorenz-96 results. We then extended the paper with the full 4D-Var cost, noisy observations, and sliding-window cycling; I studied gradient blow-up over long assimilation windows and ran the sliding-window experiments on Lorenz-96 and 2D Kolmogorov flow.",
    links: [
      { label: "code", url: "https://github.com/ericxu1070/invobs-data-assimilation" },
    ],
  },
];
