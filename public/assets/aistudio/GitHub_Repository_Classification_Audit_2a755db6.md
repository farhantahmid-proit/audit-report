# **GitHub Repository Portfolio Audit: Handle Attribution, Fork Lineage, and Functional Taxonomy**

Across the **507** raw lines submitted for analysis, deduplication yields **422 unique URLs**, consisting of **416 valid GitHub repositories**, **3 GitHub non-repository links**, and **3 non-GitHub URLs**1. Partitioning the **416** GitHub repositories by handle shows **346** entries (**83.2%**, representing **262** unique repository names) under Farhan Tahmid Sabit's accounts and organizations—farhantahmid-proit (**174**), fts-pro (**164** of **490** total repositories listed on that profile), and DEMOITS-POC (**8**)—alongside **70** third-party repositories (**16.8%**) distributed across **61** external owners1.  
A central finding of this audit is that Farhan's personal and organizational handles operate primarily as a cross-account mirroring and fork-staging ecosystem rather than an exclusively original codebase. Specifically, **13** Farhan-hosted repositories trace to verified external upstream repositories (via direct co-occurrence in the input list, workspace technical docs, or GitHub issue logs)1, **77** additional repository names are mirrored across two Farhan handles (farhantahmid-proit ↔ fts-pro or fts-pro ↔ DEMOITS-POC)1, and **9** repositories match Farhan's proprietary **HelloKhata / BanglaBiz / AIaaS** naming and domain architecture1. Meanwhile, **3** third-party repositories (BaaRai/ARTEX, elementalsouls/Claude-BugHunter, and OpenAnimationLibrary/ot3d) are themselves forks or derived continuations of upstream projects8.  
Two verification constraints govern the metadata categories (MIT, Apache, Deprecated, Popular, and unverified fork parents). First, live GitHub pages for fts-pro pagination and farhantahmid-proit/BanglaBiz-AI returned inaccessible responses12, leaving license identifiers, star counts, archival flags, and exact upstream parent URLs \[Unverified\] for most Farhan-hosted entries. Second, **28** third-party repositories had no retrieved repository metadata beyond their owner/repo paths. Accordingly, license, popularity, and deprecation labels are assigned strictly where backed by retrieved documentation, while functional types (AI, Develop, Design, Study/Research, Traditional, SEO/Audit Tool, SMM Tool) are explicitly split between verified descriptions and slug-inferred classifications.

## **1\. Input Hygiene, Deduplication, and Non-Repository URLs**

Normalizing the **507** raw lines removes **85** redundant line occurrences spanning **65** repeated URLs (**64** under Farhan's handles and element-hq/element-web among third-party links) and isolates **6** non-repository links1. Although Farhan's curriculum vitae documents also cite github.com/FarhanSabit, github.com/FarhanSab, and github.com/FarhanSabit-OITS, none of the **416** repository URLs use those three account handles1.

| Inventory Segment | Count | Details and Representative Entries |
| :---- | :---- | :---- |
| **Raw Input Lines** | 507 | Total non-empty lines in the submitted list1. |
| **Duplicate Line Occurrences** | 85 | Across 65 unique URLs: **2** appear 4× (farhantahmid-proit/supervision, farhantahmid-proit/komi-learn); **16** appear 3× (claude-bug-bounty, croc, vllm, Agents, DEMOITS-POC/LEANN, Sana, OpenHands, OmniVoice-Studio, langroid, core, sentence-transformers, onyx, osmedeus, UI-TARS-desktop, deep-research, olmocr); **47** appear 2× (46 Farhan-handle links and element-hq/element-web)1. |
| **Unique URLs** | 422 | Complete deduplicated link inventory1. |
| **Non-GitHub URLs** | 3 | teamily.ai (with Google Ads tracking parameters), codata.io (with UTM/Google Ads parameters), and developers.openai.com/api/docs/guides/agents (OpenAI Agents guide)1. |
| **GitHub Non-Repository URLs** | 3 | github.com/feed (user feed), github.com/frappe-pr-bot (user/bot profile path), and github.com/fts-pro?page=16\&tab=repositories (org pagination query)1. |
| **Farhan Handle Repositories** | 346 | farhantahmid-proit (174), fts-pro (164), DEMOITS-POC (8) — **262** unique repository names plus **84** cross-handle mirrors1. |
| **Third-Party Handle Repositories** | 70 | External repositories across **61** distinct owners (anomalyco: 5; zyno-io: 4; vercel-labs: 2; KhaiTrang1995: 2; **57** single-repo owners)1. |

## **2\. Handle Partitioning and Fork Lineage**

Because GitHub ownership and code provenance diverge across this dataset, repositories are classified below along both axes: whether they sit under a Farhan handle (farhantahmid-proit, fts-pro, DEMOITS-POC) or an external handle, and whether they represent confirmed forks/derivatives with verified upstream source URLs1.

### **2.1 Verified Forked and Derived Repositories (With Source Links)**

In total, **16** distinct repository lineages (**23** repository links when counting dual-handle mirrors) have confirmed upstream source projects established by co-occurring upstream URLs in the input list, citations in Farhan's master technical documents, GitHub commit references, or repository documentation1. Notably, **9** of the upstream links appear directly in the third-party portion of the user's input list (agent-orchestrator, appsmith, bbot, horizon, Ornith-1, social-analyzer, stagehand, VvvebJs, zeroleaks)1.

| Handle & Repository | Handle Category | Verified Upstream Source Link | Functional & Metadata Types | Verification Basis |
| :---- | :---- | :---- | :---- | :---- |
| farhantahmid-proit/agent-orchestrator, fts-pro/agent-orchestrator | Farhan (Forked) | https\://github.com/OrchestratorInc/agent-orchestrator | AI, Develop | Upstream present in input list1. |
| farhantahmid-proit/appsmith, fts-pro/appsmith | Farhan (Forked) | https\://github.com/appsmithorg/appsmith | Develop, Traditional (Low-Code) | Upstream present in input list1. |
| fts-pro/bbot | Farhan (Forked) | https\://github.com/blacklanternsecurity/bbot | Security/Audit, OSINT | Upstream present in input list1. |
| farhantahmid-proit/horizon, fts-pro/horizon | Farhan (Forked) | https\://github.com/rethinkdb/horizon | Develop, Traditional, Deprecated/Legacy | Upstream present in input list1. |
| farhantahmid-proit/Ornith-1, fts-pro/Ornith-1 | Farhan (Forked) | https\://github.com/ornith-ai/Ornith-1 | AI, Develop | Upstream present in input list1. |
| farhantahmid-proit/social-analyzer | Farhan (Forked) | https\://github.com/qeeqbox/social-analyzer | SMM Tool, Security/Audit, OSINT | Upstream present in input list1. |
| farhantahmid-proit/stagehand | Farhan (Forked) | https\://github.com/browserbase/stagehand | AI, Develop (Browser Automation) | Upstream present in input list1. |
| farhantahmid-proit/VvvebJs, fts-pro/VvvebJs | Farhan (Forked) | https\://github.com/givanz/VvvebJs | Design, Develop (Web Builder) | Upstream present in input list1. |
| farhantahmid-proit/zeroleaks, fts-pro/zeroleaks | Farhan (Forked) | https\://github.com/ZeroLeaks/zeroleaks | AI, Security/Audit | Upstream present in input list1. |
| farhantahmid-proit/langroid, fts-pro/langroid | Farhan (Forked) | https\://github.com/langroid/langroid | AI, Develop (Multi-Agent) | fts-pro commit linked in langroid/langroid\#10264. |
| fts-pro/Bangla-NLP-Dataset | Farhan (Forked) | https\://github.com/Foysal87/Bangla-NLP-Dataset | AI, Study/Research (Bangla Corpus) | Source link cited in Bangla-Biz master doc1. |
| fts-pro/awesome-bangla | Farhan (Forked) | https\://github.com/banglakit/awesome-bangla | AI, Study/Research (Curated Bangla) | Source link cited in Bangla-Biz master doc1. |
| fts-pro/BanglaSpeech2Text | Farhan (Forked) | https\://github.com/shhossain/BanglaSpeech2Text | AI, Develop (Offline STT) | Source link cited in Bangla-Biz master doc1. |
| BaaRai/ARTEX | Third-Party (Forked) | https\://github.com/Autumn-27/ARTEX | AI, Security/Audit, Develop, AGPL-3.0 | Continuation of Autumn-27/ARTEX9. |
| elementalsouls/Claude-BugHunter | Third-Party (Derived) | https\://github.com/shuvonsec/claude-bug-bounty | AI, Security/Audit, Study/Research | Vendors shuvonsec/claude-bug-bounty (8 of 84 skills); note matching slug farhantahmid-proit/claude-bug-bounty1. |
| OpenAnimationLibrary/ot3d | Third-Party (Derived) | OpenToonz (upstream project; exact GitHub URL not in retrieved text) | Design, Traditional (2D/3D Animation) | Derived from OpenToonz / Toonz Studio Ghibli Version11. |

### **2.2 Cross-Account Mirrored Repositories Without Retrieved Upstream URLs**

Beyond the **10** Farhan-hosted repository names with confirmed external upstreams that also overlap internally (agent-orchestrator, appsmith, horizon, langroid, Ornith-1, VvvebJs, zeroleaks across two handles, plus bbot, social-analyzer, stagehand across one Farhan handle and a third-party link), **77** additional repository names appear simultaneously across two Farhan handles1. Within DEMOITS-POC, **6 of the 8** repositories mirror fts-pro repositories (bot-on-anything, BuildingAI, Open-Generative-AI, puter, RAG-Anything, Unlimited-OCR)1. Because live GitHub repository pages for these accounts were inaccessible12, their upstream parent URLs remain \[Unverified\].

* **fts-pro ↔ DEMOITS-POC Mirrors (6):** bot-on-anything, BuildingAI, Open-Generative-AI, puter, RAG-Anything, Unlimited-OCR1.  
* **farhantahmid-proit ↔ fts-pro Mirrors (71):** AionUi, airllm, all-agentic-architectures, andrej-karpathy-skills, API-mega-list, autoskills, awesome-ai-anatomy, build-your-own-x, caveman, chatwoot, chunkr, CodeBrain, codeflow, core, deepwiki-rs, dograh, free-voice-clone, FreeDomain, Hyper-Extract, JARVIS, jcode, komi-learn, LangGPT, llm-architecture-gallery, llms-tools, local-voice-ai, managarm, mcp-neuralmemory, meilisearch, MiMo-Code, mlc-llm, multica, n8n-as-code, nango, Nemotron, noir, ntfy, olmocr, omniget, OmniVoice-Studio, onyx, open-agent-builder, open-source-web-scanners, openai-chatkit-starter-app, OpenHands, OpenSandbox, Pake, paperclip, paperless-ngx, personaplex, platformio-core, PraisonAI, Repo2RLEnv, rtk, Sakana-Fugu, Sana, sentence-transformers, sentry, superpowers, supertonic, supervision, swarmvault, swr, TokenTamer, UI-TARS-desktop, Vane, vllm, web-to-app, Win11Debloat, XMem, zvec-studio1.

## **3\. Third-Party Repositories: Verified Metadata and Functional Classification (70 Repositories)**

Of the **70** third-party repositories, **42** have retrieved descriptions, license tags, star counts, or fork links from GitHub or third-party indexes, whereas **28** lack retrieved metadata and are classified provisionally by repository name.

### **3.1 Verified Third-Party Repositories (42 Repositories)**

Star counts reported via third-party directories or aggregators are attributed explicitly to their respective platforms, as independent GitHub API queries were unavailable.

| Repository | Assigned Categories | Verified Details and Evidence |
| :---- | :---- | :---- |
| anomalyco/hex | AI, Develop, **MIT**, **Popular** | Local voice dictation for macOS, Windows, and Linux in Rust; **8,408** stars and MIT license on GitHub org overview15. |
| anomalyco/browse | AI, Develop | MCP server and Chromium extension enabling AI agents to use a real browser18. |
| anomalyco/opencode-android | AI, Develop | Android client in the anomalyco OpenCode coding-agent ecosystem19. |
| anomalyco/psychoscript | Develop | Language compiler, VM, runtime, stdlib, and Effect driver for OpenCode codemode21. |
| anomalyco/rune | Design, Develop | Native UI framework22. |
| appsmithorg/appsmith | Develop, Traditional | Low-code application platform; upstream for farhantahmid-proit & fts-pro; license \[Unverified\]1. |
| BaaRai/ARTEX | AI, Security/Audit, Develop, **AGPL-3.0** | Self-hosted, model-agnostic dual-graph AI penetration testing system; fork of Autumn-27/ARTEX9. |
| blacklanternsecurity/bbot | Security/Audit, OSINT | Upstream for fts-pro/bbot; license \[Unverified\]1. |
| browserbase/stagehand | AI, Develop | Upstream for farhantahmid-proit/stagehand; license \[Unverified\]1. |
| CGG888/SrcBox | Traditional, Design, Develop | Windows IPTV player built with libmpv and WPF; license \[Unverified\]23. |
| crafter-research/khipu-null | Study/Research, **MIT** | Python research repository; **1** star and MIT license on GitHub org page24. |
| crafter-station/crafter.run | Study/Research, AI, Traditional | Research, hardware lab, games, and community hub25. |
| DietrichGebert/ponytail | AI, Develop, **Popular** | AI coding skill enforcing YAGNI constraints for Claude Code/Codex/Pi; **198k** stars on GitHub topics; license \[Unverified\]26. |
| djeada/Standard-of-Iron | Traditional, Develop | Active desktop/graphics codebase (Windows OpenGL/Mesa startup handling)29. |
| duriantaco/skylos | AI, Security/Audit, Develop | Local-first PR scanner detecting dead code, security bugs, secrets, and AI-code mistakes30. |
| elementalsouls/Claude-BugHunter | AI, Security/Audit, Study/Research | Bundle of **84** Claude Code skills and **15** slash commands for bug hunting/red-teaming; vendors shuvonsec/claude-bug-bounty8. |
| givanz/VvvebJs | Design, Develop | Web page builder; upstream for farhantahmid-proit & fts-pro; license \[Unverified\]1. |
| JuneYaooo/rea-video | AI, Design, **Apache-2.0**, **Popular** | CLI and skill to reverse-engineer videos shot-by-shot into VIDEO.md; Apache-2.0 per AI-TLDR directory31; **12.2k–13k** stars on GitHub topics32. |
| kortix-ai/CompanyOS | AI, Develop | Multiplayer AI agents / "company as code" operating system35. |
| luelueking/RuoYi-v4.7.8-RCE-POC | Security/Audit, Study/Research | Exploit proof-of-concept for RuoYi v4.7.8 SQLi/RCE37. |
| nuIIpointerexception/www\.seekvisualartist.com | Design, Develop | Web project built with Bun39. |
| nuphos/nuphos | AI, Develop | Open-source team bot running on Claude Code or Codex subscriptions40. |
| nyakang/nyaterm | Traditional, Develop | Modern remote terminal workspace41. |
| OpenAnimationLibrary/ot3d | Design, Traditional | Mixed 2D/3D GLB animation workspace derived from OpenToonz11. |
| OrchestratorInc/agent-orchestrator | AI, Develop | Upstream for farhantahmid-proit & fts-pro; license \[Unverified\]1. |
| ornith-ai/Ornith-1 | AI, Develop | Upstream for farhantahmid-proit & fts-pro; license \[Unverified\]1. |
| oxc-project/tsrs | Develop | Repository within the oxc-project JavaScript/TypeScript toolchain42. |
| PatrolTech/mcp-server | AI, Develop | Official remote MCP server for PatrolTech guard-tour and security patrol operations43. |
| pgkt04/defender-control | Traditional, **Deprecated (Partial)** | Open-source Windows Defender manager; a 2024 technical writeup notes its TrustedInstaller bypass fails on live Windows 11 builds45. |
| qeeqbox/social-analyzer | SMM Tool, Security/Audit, OSINT | Upstream for farhantahmid-proit/social-analyzer; license \[Unverified\]1. |
| qybaihe/bla | Security/Audit, AI, **Popular** | Protects binaries, WASM, GGUF/Safetensors, and DEX against AI reverse-engineering agents; reported at over **3.7K** stars on GitHubPlay47. |
| Ray-lea/Argus | Traditional, Design, Develop, **Popular** | Modern Windows task manager in Rust and GPUI Kit (design docs also cite Tauri/SolidJS); listed at **2.6k** stars on Tinix49. |
| realiti4/claude-swap | AI, Develop | Multi-account Claude Code switcher with automatic rate-limit rotation and usage dashboard52. |
| rethinkdb/horizon | Traditional, Develop | Upstream for farhantahmid-proit & fts-pro; license \[Unverified\]1. |
| unam4/fineldapc | Security/Audit, Study/Research | Intranet/offline gadget exploitation research53. |
| vercel-labs/screen-relay | AI, Develop | Low-latency (up to 120 fps) C++ desktop streaming for humans and AI agents; **393** stars listed on Vercel Labs54. |
| yjid/kensaku | AI, Develop, **Popular** | Local-first file search/launcher with OCR, semantic search, and MCP agent access; tracked at **1,893** stars on GitHot56. |
| ZeroLeaks/zeroleaks | AI, Security/Audit | Upstream for farhantahmid-proit & fts-pro; license \[Unverified\]1. |
| Zjackky/CodeScan | Traditional, Security/Audit, Develop | Lightweight sink-matching code audit scanner for red teams; **399** stars on GitHub topics59. |
| zyno-io/siple | AI, Develop, **FSL-1.1-ALv2** | Native Rust SIP softphone with JSON-RPC \+ MCP AI-agent API; source-available (non-OSI open source)61. |
| zyno-io/thinpost | Develop | Active repository under zyno-io62. |
| zyno-io/v8s | Develop | Active repository under zyno-io62. |

### **3.2 Unretrieved Third-Party Repositories (28 Repositories — Provisional Classification)**

For the remaining **28** external links, license status (MIT/Apache), deprecation state, and star counts remain \[Unverified\]. Grouping them by slug conventions indicates five primary domains1:

* **AI & Agent Tooling (10):** duyuanfu/evan-ocr (AI / OCR), FareedKhan-dev/trillion-serving (AI / Inference / Study), google/adk-python (AI / Agent SDK), headroomlabs-ai/headroom (AI), KhaiTrang1995/java4shell-agent (AI / Security), KhaiTrang1995/OpenMausBot (AI / Automation), MontrealAI/AGI-Alpha-Invention-Flywheel-Lab (AI / Study/Research), VectifyAI/PageIndex (AI / RAG), vercel-labs/agent-browser (AI / Develop), yamadashy/repomix (AI / Develop)1.  
* **Security, Audit & Web Crawling (3):** smicallef/spiderfoot (Security / OSINT / Audit), trufflesecurity/trufflehog (Security / Secret Audit), unclecode/crawl4ai (AI / Web Crawling / SEO-Audit)1.  
* **Design & UI Components (3):** Aedifex-BIM/aedifex-bim.github.io (Design / BIM Web), kofigyan/StateProgressBar (Design / UI Widget), lopspower/CircularProgressBar (Design / UI Widget)1.  
* **Traditional Software, DevOps & Analytics (9):** element-hq/element-web (Traditional / Messaging), fosrl/pangolin (Traditional / Infrastructure), jaredwray/keyv (Traditional / Develop), jdx/mise (Traditional / Dev Tooling), makeplane/plane (Traditional / Project Management), neondatabase/neon (Traditional / Database), PostHog/posthog (Traditional / Product & Web Analytics), zyno-io/diskspace.cc (Traditional / System Utility), Railly/Railly (Personal / Unclassified)1.  
* **Study / Research & Documentation (3):** FrontierCS/Pumpkin (Study/Research / Develop), midudev/upskilling-mwc-taller (Study/Research / Workshop), nextcloud/documentation (Study/Research / Documentation)1.

## **4\. Farhan Handle Repositories: Domain-Aligned Core and Functional Taxonomy (346 Links / 262 Unique Names)**

Across farhantahmid-proit (**174**), fts-pro (**164**), and DEMOITS-POC (**8**), workspace technical documents establish an active retail-AI ecosystem centered on **HelloKhata / Bangla-Biz-AI** and **AI as a Service**5. Because live repository inspection was blocked for these handles12, MIT/Apache, Popular, and Deprecated labels are \[Unverified\] unless inherited from a verified upstream in Section 2.1. Every single one of the **262** unique Farhan-hosted repository names is accounted for in the ten functional clusters below.

### **4.1 Farhan-Branded and Domain-Aligned Repositories (9 Repositories)**

These **9** repositories match Farhan's personal initials (FTS), flagship product lines (BanglaBiz, HelloKhata/HK, Smart-DigiBiz), or internal R\&D modules documented in his workspace files (AI as a Service, Gemini/Whisper STT-TTS retail pipelines)1:

| Repository | Handle | Functional Type | Alignment With Workspace Documentation |
| :---- | :---- | :---- | :---- |
| BanglaBiz-AI | farhantahmid-proit | AI, Develop | Matches Bangla-Biz-AI / HelloKhata voice-first retail OS documentation1. |
| BanglaBiz-HK-ERP | fts-pro | Develop, Business ERP | Matches the HelloKhata (HK) ERP subsystem specification1. |
| FTS-HK-OLD | fts-pro | Develop, Legacy ERP | Naming (FTS \+ HK \+ OLD) indicates an earlier/legacy HelloKhata codebase1. |
| HKAI-ShopKeeper | farhantahmid-proit | AI, Develop | Matches HelloKhata (HK) AI shopkeeper assistant workflow1. |
| Smart-DigiBiz | farhantahmid-proit | Develop, Business SME | Aligns with Farhan's SME business digitization domain1. |
| GeminAI-STT-TTS | fts-pro | AI, Develop (Speech) | Aligns with Farhan's Gemini \+ Whisper multimodal STT-TTS retail pipeline1. |
| BanglaScript | farhantahmid-proit | Develop, Study/Research | Aligns with Bangla/Banglish script and transliteration tooling1. |
| AIaaS | fts-pro | AI, Develop, Infra | Matches "AI as a Service" platform work documented under OITS Dhaka1. |
| knowledge-catalog | DEMOITS-POC | AI, Study/Research | Organizational POC catalog under DEMOITS-POC1. |

### **4.2 Bangla NLP, Speech, and Transliteration Stack (7 Repositories)**

Directly supporting the Bangla and Banglish voice-recognition layer detailed in Farhan's STT-TTS architecture3:

* **Verified Forks (3):** Bangla-NLP-Dataset (fts-pro ← Foysal87/Bangla-NLP-Dataset), awesome-bangla (fts-pro ← banglakit/awesome-bangla), and BanglaSpeech2Text (fts-pro ← shhossain/BanglaSpeech2Text)1.  
* **fts-pro Only (4):** Automatic-Back-Transliteration-of-Romanized-Bengali-to-Bengali (AI, Study/Research), BanglaTLit (AI, Develop), IndicXlit (AI, Develop), and multilingual\_kws (AI, Study/Research)1.

### **4.3 AI Agents, Skills, Prompts, and MCP Tooling (58 Repositories)**

This cluster encompasses multi-agent orchestrators, Claude Code/Codex skills, prompt libraries, and Model Context Protocol (MCP) servers1:

* **Dual-Handle Mirrors (18):** agent-orchestrator (← OrchestratorInc/agent-orchestrator1), all-agentic-architectures, andrej-karpathy-skills, autoskills, bot-on-anything (fts-pro, DEMOITS-POC), caveman, JARVIS, LangGPT, langroid (← langroid/langroid4), mcp-neuralmemory, multica, open-agent-builder, OpenHands, PraisonAI, superpowers, swarmvault, TokenTamer, and UI-TARS-desktop1.  
* **farhantahmid-proit Only (28):** agency-agents, agent-kit, agent-skills, Agentic-Dev-Resources, Agents, antigravity-superpowers, awesome-agent-skills, awesome-claude-skills, awesome-codex-subagents, awesome-mcp-servers, claude-code-sub-agents, claude-mem, claude-skills, context-engineering-kit, deepagents, deepagentsjs, git-mcp, github-mcp-server, hello-agents, mcp-sequential-thinking, mnemo-cortex, nocturne\_memory, obsidian-skills, OpenSwarm, skillsCodex, skillsVercel, stitch-skills, and webmcp1.  
* **fts-pro Only (12):** 10x, 12-factor-agents, AgentGPT, agentic-ai-starters, AgentStack, ANUS, claude-task-master, deer-flow, goose, MCP-SuperAssistant, mempalace, and promptflow1.

### **4.4 AI Models, Inference, Coding Assistants, RAG, OCR, Vision, and Speech (74 Repositories)**

These repositories closely track Farhan's production AI blueprint components—vLLM serving, edge/local inference, YOLO/OCR document and shelf scanning, Qdrant/vector stores, and multimodal voice1:

* **Dual-Handle Mirrors (36):** AionUi, airllm, awesome-ai-anatomy, BuildingAI (fts-pro, DEMOITS-POC), chunkr, CodeBrain, deepwiki-rs, dograh, free-voice-clone, Hyper-Extract, jcode, llm-architecture-gallery, llms-tools, local-voice-ai, MiMo-Code, mlc-llm, Nemotron, olmocr, OmniVoice-Studio, onyx, Open-Generative-AI (fts-pro, DEMOITS-POC), openai-chatkit-starter-app, Ornith-1 (← ornith-ai/Ornith-11), personaplex, RAG-Anything (fts-pro, DEMOITS-POC), Repo2RLEnv, Sakana-Fugu, Sana, sentence-transformers, supertonic, supervision, Unlimited-OCR (fts-pro, DEMOITS-POC), Vane, vllm, XMem, and zvec-studio1.  
* **farhantahmid-proit Only (13):** ai-engineering-from-scratch, AI-For-Beginners, deep-research, Hands-On-AI-Engineering, iFixAi, knowledge-rag, MonkeyOCR, PixelRAG, SenseNova-U1, SocratiCode, timesfm, turbovec, and zvec1.  
* **fts-pro Only (24):** ai, AI-Infra-from-Zero-to-Hero, all-rl-algorithms, atomcode, codeburn, CodeGeeX4, CodeWhale, example-chat-app, gemma-cookbook, k8sgpt, llm\_wiki, memory-graph, MoneyPrinterPlus, needle, open-lovable, open-webui, OpenAdapt, OpenAssistantGPT, opencodes, openui, qwen-code, sakana, Understand-Anything, and video-use1.  
* **DEMOITS-POC Only (1):** LEANN1.

### **4.5 Security, Bug Bounty, OSINT, and Audit Tools (16 Repositories)**

* **Verified Forks (3):** bbot (fts-pro ← blacklanternsecurity/bbot), social-analyzer (farhantahmid-proit ← qeeqbox/social-analyzer), and zeroleaks (farhantahmid-proit, fts-pro ← ZeroLeaks/zeroleaks)1.  
* **Dual-Handle Mirrors (2):** noir and open-source-web-scanners (farhantahmid-proit, fts-pro)1.  
* **farhantahmid-proit Only (7):** claude-bug-bounty (matches vendored name in Claude-BugHunter8), ESP32-DIV, Flipper, OSINT-BIBLE, osmedeus, securo, and ST3GG1.  
* **fts-pro Only (4):** CF-Hero, flipperzero-firmware, hetty, and OBLITERATUS1.

### **4.6 Design, UI/UX, Web Builders, Video, and Visualization (14 Repositories)**

* **Verified Fork (1):** VvvebJs (farhantahmid-proit, fts-pro ← givanz/VvvebJs)1.  
* **Dual-Handle Mirrors (3):** codeflow, Pake, and web-to-app (farhantahmid-proit, fts-pro)1.  
* **farhantahmid-proit Only (6):** awesome-design-md, awesome-diagramming, html-video, hyperframes, invidious, and penpot1.  
* **fts-pro Only (4):** codag-visualizer, freemocap, graphify, and VidBee1.

### **4.7 Study / Research, Curated Lists, and Academic (11 Repositories)**

* **Dual-Handle Mirrors (3):** API-mega-list, build-your-own-x, and komi-learn (farhantahmid-proit, fts-pro)1.  
* **farhantahmid-proit Only (5):** ACLPUB, awesome-useful-websites, flink-learning, system-design-notes, and xv6-riscv1.  
* **fts-pro Only (3):** awesome-opensource-email, coding-interview-university, and notebooks1.

### **4.8 Traditional Software Dev, Databases, DevOps, Scraping, and Productivity (61 Repositories)**

* **Verified Forks (3):** appsmith (farhantahmid-proit, fts-pro ← appsmithorg/appsmith), horizon (farhantahmid-proit, fts-pro ← rethinkdb/horizon), and stagehand (farhantahmid-proit ← browserbase/stagehand)1.  
* **Dual-Handle Mirrors (16):** core, FreeDomain, managarm, meilisearch, n8n-as-code, nango, ntfy, omniget, OpenSandbox, paperclip, paperless-ngx, puter (fts-pro, DEMOITS-POC), rtk, sentry, swr, and Win11Debloat1.  
* **farhantahmid-proit Only (25):** 1Panel, archify, cockpit-tools, coolify, croc, ironclaw, maestro, maxun, monty, nezha, obsidian-releases, Patter, platform, platforms, playground, refly, scallopbot, scraping-apis-for-devs, Scrapling, sqlmodel, syncthing, TREK, umami (Traditional / Web Analytics), VaultS3, and webclaw1.  
* **fts-pro Only (17):** daytona, floci, founders-kit, get-shit-done, git-credential-manager, GitNexus, minio, node-gyp, pocketbase, sandbox, saperp, server, session-store-nextjs, TNN, tolaria, toon, and warp1.

### **4.9 IoT, Embedded, Robotics, and Mobile Hardware (6 Repositories)**

* **Dual-Handle Mirror (1):** platformio-core (farhantahmid-proit, fts-pro)1.  
* **farhantahmid-proit Only (2):** 100\_Days\_100\_IoT\_Projects (Study/Research, IoT) and openwallet-android (Develop, Mobile)1.  
* **fts-pro Only (3):** bumblebee, heyhank, and VINS-Fusion (SLAM / Robotics)1.

### **4.10 SMM, Messaging Gateways, and Communication Channels (6 Repositories)**

These tools align with the WhatsApp, SMS, and customer-messaging channels specified in Farhan's retail OS architecture1:

* **Dual-Handle Mirror (1):** chatwoot (farhantahmid-proit, fts-pro; Traditional / Omnichannel Support)1.  
* **farhantahmid-proit Only (4):** android-sms-gateway, fleetbase, httpsms-node, and waha (WhatsApp HTTP API)1.  
* **fts-pro Only (1):** OpenWA (WhatsApp automation)1.

## **5\. Cross-Cutting Synthesis: Taxonomy Coverage and Verification Boundaries**

Evaluating all **416** valid GitHub repositories against the requested functional and metadata labels clarifies how the portfolio is weighted and where missing GitHub metadata restricts classification.

| Requested Label | Portfolio Coverage and Boundaries | Verified Examples (and Verification Notes) |
| :---- | :---- | :---- |
| **AI** | Largest thematic cluster across both Farhan handles (**140+** distinct repos across agents, MCP, RAG, OCR, STT/TTS, and LLM serving) and external links. | anomalyco/hex, BaaRai/ARTEX, DietrichGebert/ponytail, JuneYaooo/rea-video, yjid/kensaku, kortix-ai/CompanyOS, langroid, BanglaBiz-AI, GeminAI-STT-TTS1. |
| **Develop** | Covers core application frameworks, compilers, terminals, low-code platforms, and coding-agent SDKs across Farhan and third-party handles. | anomalyco/psychoscript, anomalyco/rune, zyno-io/siple, oxc-project/tsrs, vercel-labs/screen-relay, BanglaBiz-HK-ERP7. |
| **Design** | Covers UI frameworks, drag-and-drop web builders, 2D/3D animation, video breakdown tools, and visualization systems. | OpenAnimationLibrary/ot3d, anomalyco/rune, JuneYaooo/rea-video, Ray-lea/Argus, CGG888/SrcBox, givanz/VvvebJs1. |
| **Study/Research** | Covers Bangla NLP corpora, curated resource lists, security PoCs, and educational/research hubs. | crafter-research/khipu-null, crafter-station/crafter.run, Foysal87/Bangla-NLP-Dataset, banglakit/awesome-bangla, luelueking/RuoYi-v4.7.8-RCE-POC, unam4/fineldapc3. |
| **MIT** | **2** third-party repositories verified as MIT; remaining repositories \[Unverified\]. | anomalyco/hex, crafter-research/khipu-null16. |
| **Apache** | **1** third-party repository verified as Apache-2.0; remaining repositories \[Unverified\]. | JuneYaooo/rea-video31. (Note: BaaRai/ARTEX is **AGPL-3.0**9 and zyno-io/siple is **FSL-1.1-ALv2**61.) |
| **Traditional** | Covers non-AI desktop utilities, SIP softphones, terminals, task managers, code scanners, and legacy BaaS/ERP tooling. | CGG888/SrcBox, nyakang/nyaterm, Ray-lea/Argus, Zjackky/CodeScan, djeada/Standard-of-Iron, rethinkdb/horizon1. |
| **Deprecated** | **1** third-party utility flagged for broken Windows 11 compatibility, plus **1** legacy-named Farhan repo; all others \[Unverified\]. | pgkt04/defender-control (TrustedInstaller method ineffective on live Windows 11 builds per 2024 writeup46); fts-pro/FTS-HK-OLD (legacy naming1). |
| **Popular** | **6** third-party repositories verified above 1,000 stars (across GitHub pages and third-party trackers); remaining repositories \[Unverified\]. | DietrichGebert/ponytail (198k28), JuneYaooo/rea-video (12.2k–13k32), anomalyco/hex (8,40816), qybaihe/bla (\>3.7K48), Ray-lea/Argus (2.6k50), yjid/kensaku (1,89358). |
| **SEO/Audit Tool** | Strongly populated by **Security, Code-Audit, PR-Quality, and Web-Scraping/Analytics** tools; no dedicated SEO keyword or SERP suite is verified. | Code/Security Audit: Zjackky/CodeScan, duriantaco/skylos, BaaRai/ARTEX, ZeroLeaks/zeroleaks, trufflesecurity/trufflehog, blacklanternsecurity/bbot, smicallef/spiderfoot1. Crawling/Analytics: unclecode/crawl4ai, umami, PostHog/posthog1. |
| **SMM Tool** | Represented by **Social OSINT and WhatsApp/SMS Messaging Gateways** rather than commercial social-media scheduling dashboards. | qeeqbox/social-analyzer, chatwoot, waha, OpenWA, android-sms-gateway, httpsms-node1. |

To resolve the remaining \[Unverified\] MIT/Apache, Deprecated, Popular, and fork-parent URL fields across farhantahmid-proit, fts-pro, DEMOITS-POC, and the **28** unretrieved third-party repositories, the required follow-up is an authenticated GitHub GraphQL or REST API export querying parent.html\_url, licenseInfo.spdxId, stargazerCount, isArchived, and pushedAt.

#### **Works cited**

> 1. [unknown\_url](http://docs.google.com/unknown_url)  
> 2. fts-pro (FTS\_PRO) · GitHub, [https\://github.com/fts-pro](https://github.com/fts-pro)  
> 3. Bangla-Biz-Multimodal-AI STT-TTS Master-Google-Doc-1, [https\://drive.google.com/open?id=1hL2vp7Sw5yxkVHh0SM8pE0d\_rnDl9TGNjSvQFQEdta4](https://drive.google.com/open?id=1hL2vp7Sw5yxkVHh0SM8pE0d_rnDl9TGNjSvQFQEdta4)  
> 4. Remove dependency on pymupdf4llm/pymupdf · Issue \#1026 \- GitHub, [https\://github.com/langroid/langroid/issues/1026](https://github.com/langroid/langroid/issues/1026)  
> 5. CV: AI/ML DEV-FARHAN TAHMID SABIT, [https\://drive.google.com/open?id=1D3RPHooLkxxU84xyGcdE6tfU3Fzqev-iuO\_nfm43uJU](https://drive.google.com/open?id=1D3RPHooLkxxU84xyGcdE6tfU3Fzqev-iuO_nfm43uJU)  
> 6. Bangla-Biz-AI, [https\://drive.google.com/open?id=1bf7DcSP48vwsheldgwXuoXT0kK6a\_8qeTm8JChGasVU](https://drive.google.com/open?id=1bf7DcSP48vwsheldgwXuoXT0kK6a_8qeTm8JChGasVU)  
> 7. HelloKhata-SSOT-Consolidated-Document, [https\://drive.google.com/open?id=1yuX02f1wb1Xx-2EoxhNfdszdL56rHf99HYPyQyLcxSc](https://drive.google.com/open?id=1yuX02f1wb1Xx-2EoxhNfdszdL56rHf99HYPyQyLcxSc)  
> 8. GitHub \- elementalsouls/Claude-BugHunter: A Claude Code skill, [https\://github.com/elementalsouls/Claude-BugHunter](https://github.com/elementalsouls/Claude-BugHunter)  
> 9. GitHub \- BaaRai/ARTEX: Actively maintained ARTEX: AI, [https\://github.com/BaaRai/ARTEX](https://github.com/BaaRai/ARTEX)  
> 10. ARTEX/README.md at main · BaaRai/ARTEX · GitHub, [https\://github.com/BaaRai/ARTEX/blob/main/README.md](https://github.com/BaaRai/ARTEX/blob/main/README.md)  
> 11. OpenAnimationLibrary/ot3d: Opentoonz with 3D \- GitHub, [https\://github.com/OpenAnimationLibrary/ot3d](https://github.com/OpenAnimationLibrary/ot3d)  
> 12. [https\://github.com/fts-pro?page=16\&tab=repositories](https://github.com/fts-pro?page=16&tab=repositories)  
> 13. [https\://github.com/farhantahmid-proit/BanglaBiz-AI](https://github.com/farhantahmid-proit/BanglaBiz-AI)  
> 14. Frontend\_Developer\_CV\_BusinessProfessional\_2026-06-10, [https\://drive.google.com/open?id=1ENo1dWi0uNc6RkD8MiERqpDH5mWymd14JyNJlUlY3tk](https://drive.google.com/open?id=1ENo1dWi0uNc6RkD8MiERqpDH5mWymd14JyNJlUlY3tk)  
> 15. anomalyco/hex: Local voice dictation for mac, windows and linux, [https\://github.com/anomalyco/hex](https://github.com/anomalyco/hex)  
> 16. Anomaly \- GitHub, [https\://github.com/anomalyco](https://github.com/anomalyco)  
> 17. How to use Hex for voice dictation \- Flavio Copes, [https\://flaviocopes.com/hex/](https://flaviocopes.com/hex/)  
> 18. Issues · anomalyco/browse \- GitHub, [https\://github.com/anomalyco/browse/issues](https://github.com/anomalyco/browse/issues)  
> 19. anomalyco repositories \- GitHub, [https\://github.com/orgs/anomalyco/repositories](https://github.com/orgs/anomalyco/repositories)  
> 20. Who builds anomalyco/opencode? Engineers and contributors \| Vamo, [https\://vamotalent.com/repos/anomalyco/opencode](https://vamotalent.com/repos/anomalyco/opencode)  
> 21. opencode/packages/codemode/AGENTS.md at dev \- GitHub, [https\://github.com/anomalyco/opencode/blob/dev/packages/codemode/AGENTS.md](https://github.com/anomalyco/opencode/blob/dev/packages/codemode/AGENTS.md)  
> 22. Releases · anomalyco/rune \- GitHub, [https\://github.com/anomalyco/rune/releases](https://github.com/anomalyco/rune/releases)  
> 23. 源匣-SrcBox是一款专为Windows 平台打造的高性能、现代化的IPTV, [https\://github.com/CGG888/SrcBox](https://github.com/CGG888/SrcBox)  
> 24. Crafter Research \- GitHub, [https\://github.com/crafter-research](https://github.com/crafter-research)  
> 25. crafter-station/crafter.run \- GitHub, [https\://github.com/crafter-station/crafter.run](https://github.com/crafter-station/crafter.run)  
> 26. GitHub \- DietrichGebert/ponytail: Makes your AI agent think like the, [https\://github.com/dietrichgebert/ponytail](https://github.com/dietrichgebert/ponytail)  
> 27. Ponytail GitHub Skill: Claude Code Setup & Guide \| APIVALE, [https\://apivale.com/blog/ponytail-github-claude-code-guide/](https://apivale.com/blog/ponytail-github-claude-code-guide/)  
> 28. agent-skills · GitHub Topics, [https\://github.com/topics/agent-skills](https://github.com/topics/agent-skills)  
> 29. Issues · djeada/Standard-of-Iron \- GitHub, [https\://github.com/djeada/Standard-of-Iron/issues](https://github.com/djeada/Standard-of-Iron/issues)  
> 30. duriantaco/skylos: Open source local-first PR scanner that ... \- GitHub, [https\://github.com/duriantaco/skylos](https://github.com/duriantaco/skylos)  
> 31. rea-video GitHub: Reverse-Engineer Any Video Shot by Shot, [https\://ai-tldr.dev/tools/rea-video/](https://ai-tldr.dev/tools/rea-video/)  
> 32. videomd · GitHub Topics, [https\://github.com/topics/videomd](https://github.com/topics/videomd)  
> 33. ai-video · GitHub Topics, [https\://github.com/topics/ai-video](https://github.com/topics/ai-video)  
> 34. video-generation · GitHub Topics, [https\://github.com/topics/video-generation](https://github.com/topics/video-generation)  
> 35. kortix-ai/CompanyOS \- Workflow runs \- GitHub, [https\://github.com/kortix-ai/CompanyOS/actions](https://github.com/kortix-ai/CompanyOS/actions)  
> 36. Repository insights \- kortix-ai/CompanyOS \- GitHub, [https\://github.com/kortix-ai/CompanyOS/insights](https://github.com/kortix-ai/CompanyOS/insights)  
> 37. RuoYi-v4.7.8-RCE-POC \- 知識補完計画, [https\://notes-bice-five.vercel.app/cheatsheet/ruoyi\_v4\_7\_8\_rce\_poc](https://notes-bice-five.vercel.app/cheatsheet/ruoyi_v4_7_8_rce_poc)  
> 38. RUOYI-v4.7.8存在远程代码执行漏洞.md \- GitHub, [https\://github.com/eeeeeeeeee-code/POC/blob/main/wpoc/RuoYi/RUOYI-v4.7.8%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md](https://github.com/eeeeeeeeee-code/POC/blob/main/wpoc/RuoYi/RUOYI-v4.7.8%E5%AD%98%E5%9C%A8%E8%BF%9C%E7%A8%8B%E4%BB%A3%E7%A0%81%E6%89%A7%E8%A1%8C%E6%BC%8F%E6%B4%9E.md)  
> 39. nuIIpointerexception/www\.seekvisualartist.com: Personal portfolio, [https\://github.com/nuIIpointerexception/www\.seekvisualartist.com](https://github.com/nuIIpointerexception/www.seekvisualartist.com)  
> 40. Nuphos \- GitHub, [https\://github.com/nuphos/nuphos](https://github.com/nuphos/nuphos)  
> 41. GitHub \- nyakang/nyaterm: A modern remote terminal workspace, [https\://github.com/nyakang/nyaterm](https://github.com/nyakang/nyaterm)  
> 42. Issues · oxc-project/tsrs \- GitHub, [https\://github.com/oxc-project/tsrs/issues/views](https://github.com/oxc-project/tsrs/issues/views)  
> 43. Official PatrolTech MCP connector: manage security patrols ... \- GitHub, [https\://github.com/PatrolTech/ai-integrations](https://github.com/PatrolTech/ai-integrations)  
> 44. Open-Source MCP Servers \- Glama, [https\://glama.ai/mcp/servers?attributes=capability%3Aresources](https://glama.ai/mcp/servers?attributes=capability:resources)  
> 45. pgkt04/defender-control: An open-source windows ... \- GitHub, [https\://github.com/pgkt04/defender-control](https://github.com/pgkt04/defender-control)  
> 46. GitHub \- pgkt04/defender-control: An open-source windows, [https\://www\.liyang.gzbak.com/article/github/20240924-2149959986.html](https://www.liyang.gzbak.com/article/github/20240924-2149959986.html)  
> 47. qybaihe/bla: 🛡️ BLA (bla-agents / Blind LLM Agents ... \- GitHub, [https\://github.com/qybaihe/bla](https://github.com/qybaihe/bla)  
> 48. bla Official Latest Download (source) \- Fast Releases Binary, [https\://githubplay.com/app/qybaihe/bla?lang=en](https://githubplay.com/app/qybaihe/bla?lang=en)  
> 49. GitHub \- Ray-lea/Argus: 现代Windows 任务管理器, [https\://github.com/Ray-lea/Argus](https://github.com/Ray-lea/Argus)  
> 50. Ray-lea/Argus \- TiniX Repo Trending, [https\://repo.tinix.ai/en/project/ray-lea-argus-5048c271-b746-4c57-a752-dbda96ac7997](https://repo.tinix.ai/en/project/ray-lea-argus-5048c271-b746-4c57-a752-dbda96ac7997)  
> 51. README.md \- Ray-lea/Argus \- GitHub, [https\://github.com/Ray-lea/Argus/blob/main/docs/design/README.md](https://github.com/Ray-lea/Argus/blob/main/docs/design/README.md)  
> 52. GitHub \- realiti4/claude-swap: Switch between multiple Claude, [https\://github.com/realiti4/claude-swap](https://github.com/realiti4/claude-swap)  
> 53. Issues · unam4/fineldapc · GitHub, [https\://github.com/unam4/fineldapc/issues](https://github.com/unam4/fineldapc/issues)  
> 54. stefanofa/awesome: A collection of my starred repos ... \- GitHub, [https\://github.com/stefanofa/awesome](https://github.com/stefanofa/awesome)  
> 55. Vercel Labs, [https\://vercel.com/labs](https://vercel.com/labs)  
> 56. yjid/kensaku \- GitHub Signals, [https\://githubsignals.io/repo/yjid/kensaku/](https://githubsignals.io/repo/yjid/kensaku/)  
> 57. kensaku/README.md at master \- yjid \- GitHub, [https\://github.com/yjid/kensaku/blob/master/README.md](https://github.com/yjid/kensaku/blob/master/README.md)  
> 58. GitHub \- yjid/kensaku: Durchsuche Dokumente, Code und ... \- GitHot, [https\://githot.net/de/projects/yjid/kensaku](https://githot.net/de/projects/yjid/kensaku)  
> 59. GitHub \- Zjackky/CodeScan: 一款轻量级匹配Sink点的代码审计扫描器, [https\://github.com/Zjackky/CodeScan](https://github.com/Zjackky/CodeScan)  
> 60. codescan · GitHub Topics, [https\://github.com/topics/codescan](https://github.com/topics/codescan)  
> 61. Siple: a source-available desktop SIP softphone for macOS ... \- GitHub, [https\://github.com/zyno-io/siple](https://github.com/zyno-io/siple)  
> 62. Zyno Consulting \- GitHub, [https\://github.com/zyno-io](https://github.com/zyno-io)  
> 63. 3 Multimodal AI for Biz STT-TTS Master Doc 1Multimodal AI for Biz STT-TTS Master Doc 2.docx, [https\://drive.google.com/open?id=1BYsdHpf0N-3msklVu\_KYKc9X89cnG2-r](https://drive.google.com/open?id=1BYsdHpf0N-3msklVu_KYKc9X89cnG2-r)  
> 64. HelloKhata-Comprehensive-Findings-and-Issues, [https\://drive.google.com/open?id=1BV-U7Tbn4uZVhaKPiAJ9rHGYNrnFBPp1LcqGyiiXj5o](https://drive.google.com/open?id=1BV-U7Tbn4uZVhaKPiAJ9rHGYNrnFBPp1LcqGyiiXj5o)  
> 65. AI-First Retail OS Architecture Deep Dive, [https\://drive.google.com/open?id=1ok2Ozyq21PTfiguh0cBIo-aHvf-hvZ9NvMAiJoV69hY](https://drive.google.com/open?id=1ok2Ozyq21PTfiguh0cBIo-aHvf-hvZ9NvMAiJoV69hY)  
> 66. Bangla-Biz-Multimodal-AI STT-TTS Master-Google-Doc, [https\://drive.google.com/open?id=1ccEHpP4JSn9lrVGE-HYMscSNnksPFE\_wXQw0EwHWjds](https://drive.google.com/open?id=1ccEHpP4JSn9lrVGE-HYMscSNnksPFE_wXQw0EwHWjds)