import { projects } from "../data/projects.js";
import { papers } from "../data/papers.js";
import { coursework } from "../data/coursework.js";

// Plain-text summary for LLM agents (llmstxt.org); linked only from <head>, so readers never see it.
// Hand-written sections mirror public/resume.pdf and public/cv.pdf, which some agents cannot read.
// Their source is ~/Documents/Job Search/generator/base.js; update both together.
export function GET() {
  const lines = [
    "# Eric Xu",
    "",
    "> M.S. student in Scientific Computing and Applied Mathematics at UC Santa Cruz (Plan I thesis, expected June 2027; B.S. Applied Mathematics 2026, Highest Honors in the Major). Researcher in the TACS Lab, advised by Prof. Ashesh Chattopadhyay, working on machine learning for forecasting weather extremes weeks ahead. Part-time ML Researcher at Vayuh.ai (Jul 2026 - present). Applying to PhD programs for Fall 2027 and to machine learning and quantitative research roles starting in 2027.",
    "",
    "Interests: scientific machine learning, data assimilation, ML for weather and climate, rare-event sampling, GPU computing, dynamical systems, numerical methods.",
    "Contact: ericxu1070@gmail.com",
    "",
    "## Links",
    "- [Homepage](https://ericxu1070.github.io/)",
    "- [Resume (PDF)](https://ericxu1070.github.io/resume.pdf)",
    "- [CV (PDF)](https://ericxu1070.github.io/cv.pdf)",
    "- [GitHub](https://github.com/ericxu1070)",
    "- [LinkedIn](https://linkedin.com/in/exu06)",
    "",
    "## Education",
    "- M.S. Scientific Computing and Applied Mathematics, UC Santa Cruz (Plan I thesis, expected June 2027). Advisor: Prof. Ashesh Chattopadhyay.",
    "- B.S. Applied Mathematics, UC Santa Cruz (2024 - 2026). Highest Honors in the Major, GPA 3.77/4.00, Dean's Honors 4 quarters.",
    "- Relevant coursework: Scientific Machine Learning (AM 261, graduate), Applied Dynamical Systems (AM 224, graduate), Numerical Linear Algebra (AM 213A, graduate, in progress), GPU Programming (AM 148), Probability and Statistics (CSE 107), Classical and Bayesian Inference (STAT 132), Financial Mathematics (MATH 114).",
    "",
    "## Research experience",
    "Undergraduate and Graduate Researcher, TACS Lab, UC Santa Cruz (Sep 2025 - present). Advisor: Prof. Ashesh Chattopadhyay.",
    "- Adapting the AI+RES rare-event sampling algorithm (Lancelin et al., 2025, arXiv:2510.27066) to weather forecasts 3 to 4 weeks ahead. The method clones and prunes ensembles of AI weather models (FourCastNet 3, GenCast) by forecast score to oversample rare heat waves and cold outbreaks.",
    "- Built the batch pipeline (JAX, PyTorch; Slurm on H100 nodes, PBS on NCAR Derecho) that launches ensembles weeks before past US extremes and backtests them against historical observations (ERA5). The code is a private lab repository.",
    "",
    "ML Researcher (part-time), Vayuh.ai (Jul 2026 - present).",
    "- Put the AI+RES rare-event sampling algorithm into production for extreme-weather forecasts 3 to 4 weeks ahead.",
    "- Benchmarked GenCast, FourCastNet 3, and SFNO in different ensemble configurations on H100 nodes and cut compute per forecast case about 27x (33.5 to 1.23 H100-hours).",
    "- Profiled runs with NVIDIA Nsight and nvidia-smi to find the slowest stages and GPU kernels, then optimized them.",
    "",
    ...(papers.length ? ["## Papers", ...papers.map((p) => `- ${p.title}. ${p.authors}. ${p.venue}, ${p.year}.`), ""] : []),
    "## Projects",
    ...projects.map((p) => `- ${p.title} (${p.year}): ${p.description} Links: ${p.links.map((l) => `[${l.label}](${l.url})`).join(", ")}`),
    "",
    "## Teaching",
    "- Teaching Assistant, Baskin School of Engineering, UC Santa Cruz (Fall 2026): AM 20 Ordinary Differential Equations for Engineers; AM 11A Mathematical Methods for Economists I. Weekly discussion sections and office hours.",
    "- Tutor and Reader (Fall 2025 - Spring 2026): AM 10 Linear Algebra tutor for 3 consecutive quarters; reader for CSE 16 Applied Discrete Mathematics for 1 quarter; tutor for MATH 19B Calculus II.",
    "",
    "## Skills",
    "- Programming: Python (primary), C++ (working knowledge), MATLAB, R, Bash",
    "- ML and scientific computing: PyTorch, JAX, NumPy, scikit-learn",
    "- HPC and tools: Slurm, PBS, NCAR Derecho, H100 nodes, Linux, Git, SSH",
    "- Familiar from coursework: Triton (GPU kernels)",
    "- Mathematics: linear algebra, ODEs and PDEs, dynamical systems, numerical methods, optimization, inverse problems, probability and statistics",
    "",
    "## Coursework",
    ...coursework.map((g) => `- ${g.group}: ${g.courses.map(([c, n, note]) => `${c} ${n}${note ? ` (${note})` : ""}`).join("; ")}`),
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
