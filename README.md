# The Art of Breaking Smart Machines
### ExpoQA 2026 — AI Red Teaming Workshop

A hands-on workshop exploring adversarial attacks against Large Language Models, prompt injection techniques, and automated security testing. Participants work through three progressive exercises — from manual jailbreaking to fully automated red team scans against live browser applications.

---

## Exercises

### Exercise 1 — The Firewall vs The Jailbreaker

A live red team battle. Teams are split into **Blue Team** (defenders) and **Red Team** (attackers).

- **Blue Team** writes a set of system prompt guardrails to protect a secret held by an AI concierge bot
- **Red Team** writes adversarial prompts to bypass those guardrails and extract the secret
- Teams test each other's work live

### Exercise 2 — LLM Prompt Injection & Tool Extraction

A Capture-the-Flag challenge hosted by [Lakera Gandalf](https://gandalf.lakera.ai/agent-breaker/product_recommendation_tool_extraction). Participants use prompt injection techniques to force an LLM agent to reveal its underlying tool specifications. Each level introduces stronger defences.

### Exercise 3 — Automated Red Teaming with Promptfoo + Playwright

Participants use [Promptfoo](https://promptfoo.dev) with a custom Playwright provider to automatically fire adversarial prompts at a real browser-based application and evaluate the results. The exercise covers installation, configuration, running scans, and interpreting the report.

```bash
cd promptfoo-playwright
npm install
npx playwright install chromium
export OPENAI_API_KEY=sk-<your-key>
npm run redteam
npm run report
```

---

## Workshop Materials

| Resource | Description |
|----------|-------------|
| [adoniscelestine.github.io/ExpoQA](https://adoniscelestine.github.io/ExpoQA) | Live workshop instructions page |
| [`promptfoo-playwright/`](promptfoo-playwright/) | Exercise 3 — Promptfoo + Playwright provider |

---

## Further Reading

A curated list of tools and resources to go deeper into LLM security and adversarial prompting.

### 🔬 NVIDIA Garak — LLM Vulnerability Scanner
[github.com/NVIDIA/garak](https://github.com/NVIDIA/garak/tree/main/garak/probes)

An open-source LLM vulnerability scanner from NVIDIA. Garak probes models for a wide range of weaknesses including hallucination, data leakage, prompt injection, and toxicity. The `probes` directory contains ready-to-use attack modules covering dozens of vulnerability categories — a great reference for understanding what automated red teaming looks like at scale.

---

### ⚔️ Microsoft PyRIT — Python Risk Identification Toolkit
[github.com/microsoft/PyRIT](https://github.com/microsoft/PyRIT/tree/main/pyrit/datasets/jailbreak/templates)

Microsoft's open-source framework for red teaming generative AI systems. The `jailbreak/templates` dataset is a goldmine of real-world adversarial prompt templates used in research — covering role-play bypasses, authority spoofing, fictional framing, and more. Essential reading for anyone building AI guardrails.

---

### 🔓 L1B3RT4S — Jailbreak Prompt Collection
[github.com/elder-plinius/L1B3RT4S](https://github.com/elder-plinius/L1B3RT4S)

A community-curated collection of jailbreak prompts targeting major LLMs. Maintained by the broader AI red teaming community, this repo documents the evolution of adversarial techniques in real time — from early DAN prompts to sophisticated multi-turn attacks. Useful for understanding what attackers are actually using in the wild.

---

### 😈 Happy Prompts — Adversarial Prompt Research
[github.com/davidegat/happy-prompts](https://github.com/davidegat/happy-prompts)

A research-focused collection of adversarial and manipulative prompts exploring how tone, framing, and emotional language can influence LLM behaviour. A useful complement to more technical attack databases — highlights the social engineering dimension of prompt injection.

---

### 🧠 Awesome GPT Super Prompting
[github.com/CyberAlbSecOP/Awesome_GPT_Super_Prompting](https://github.com/CyberAlbSecOP/Awesome_GPT_Super_Prompting)

A comprehensive resource covering jailbreaks, prompt injection, prompt leaking, and custom GPT security from a cybersecurity practitioner's perspective. Includes categorised attack patterns, bypass techniques, and defensive counter-prompts — making it one of the most practical references for both red and blue teams.

