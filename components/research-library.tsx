"use client"

import { useState, useEffect } from "react"
import {
  ArrowUpRight,
  BookOpen,
  Tag,
  X,
  FileText,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Code,
  Check,
  Search,
} from "lucide-react"

export interface DetailedPaper {
  id: string
  title: string
  authors: string
  venue: string
  year: string
  category: "LLMs & Reasoning" | "Transformers & Architecture" | "RAG & IR" | "Vision & Multimodal" | "Agents & Systems"
  arxivId: string
  arxivPdfUrl: string
  arxivHtmlUrl: string
  url: string
  keyInsight: string
  relevanceNote: string
  abstract: string
  appliedInProject?: string
  mathFormulas: {
    label: string
    formula: string
    explanation: string
  }[]
  architecturePoints: {
    title: string
    desc: string
  }[]
  benchmarks: {
    metric: string
    result: string
    baseline: string
  }[]
  engineeringTakeaways: string[]
}

export const PAPERS_DATA: DetailedPaper[] = [
  {
    id: "attention-is-all-you-need",
    title: "Attention Is All You Need",
    authors: "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, Illia Polosukhin",
    venue: "NeurIPS",
    year: "2017",
    category: "Transformers & Architecture",
    arxivId: "1706.03762",
    arxivPdfUrl: "https://arxiv.org/pdf/1706.03762.pdf",
    arxivHtmlUrl: "https://ar5iv.labs.arxiv.org/html/1706.03762",
    url: "https://arxiv.org/abs/1706.03762",
    keyInsight: "Introduced the multi-head self-attention mechanism, discarding recurrent and convolutional architectures in favor of purely attention-based sequence modeling.",
    relevanceNote: "Foundational backbone for all modern LLM architectures, encoder-decoder models, and self-attention operations.",
    appliedInProject: "Core foundation across all LLM inference pipelines in ATLAS & Medscope.",
    abstract:
      "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism. We propose a new simple network architecture, the Transformer, based solely on attention mechanisms, dispensing with recurrence and convolutions entirely. Experiments on two machine translation tasks show these models to be superior in quality while being more parallelizable and requiring significantly less time to train.",
    mathFormulas: [
      {
        label: "Scaled Dot-Product Attention",
        formula: "Attention(Q, K, V) = softmax( (Q · K^T) / √d_k ) · V",
        explanation: "Computes query-key alignment scaled by inverse square root of head dimension d_k to prevent gradient vanishing in large dimensions.",
      },
      {
        label: "Multi-Head Attention",
        formula: "MultiHead(Q, K, V) = Concat(head_1, ..., head_h) · W^O",
        explanation: "Allows the model to jointly attend to information from different representation subspaces at different token positions.",
      },
    ],
    architecturePoints: [
      {
        title: "Self-Attention vs Recurrence",
        desc: "Reduces sequential computational complexity O(n) to constant O(1) path length, unlocking massive parallel GPU utilization.",
      },
      {
        title: "Sinusoidal Positional Encodings",
        desc: "Injects sequence order awareness via fixed sine and cosine frequency functions without recurrence states.",
      },
      {
        title: "Residual & Layer Normalization",
        desc: "Enables stable deep gradient propagation across 6 to 96+ stacked transformer encoder-decoder layers.",
      },
    ],
    benchmarks: [
      { metric: "WMT 2014 English-to-German", result: "28.4 BLEU", baseline: "26.3 BLEU (+2.1 gain)" },
      { metric: "WMT 2014 English-to-French", result: "41.8 BLEU", baseline: "41.0 BLEU (State of the Art)" },
      { metric: "Training Flops", result: "3.5 days on 8 P100 GPUs", baseline: "Fraction of prior RNN costs" },
    ],
    engineeringTakeaways: [
      "Attention matrices scale quadratically O(n^2) with sequence length — motivating FlashAttention and sparse KV caching in production.",
      "Multi-head projections allow models to decouple syntactic parsing from semantic resolution.",
    ],
  },
  {
    id: "rag-lewis",
    title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks",
    authors: "Patrick Lewis, Ethan Perez, Aleksandera Piktus, Fabio Petroni, Vladimir Karpukhin, Naman Goyal, Heinrich Küttler, Mike Lewis, Wen-tau Yih, Tim Rocktäschel, Sebastian Riedel, Douwe Kiela",
    venue: "NeurIPS",
    year: "2020",
    category: "RAG & IR",
    arxivId: "2005.11401",
    arxivPdfUrl: "https://arxiv.org/pdf/2005.11401.pdf",
    arxivHtmlUrl: "https://ar5iv.labs.arxiv.org/html/2005.11401",
    url: "https://arxiv.org/abs/2005.11401",
    keyInsight: "Combines pre-trained parametric memory (seq2seq models) with non-parametric retrieval memory (dense vector index over external corpora) for grounded fact generation.",
    relevanceNote: "Direct architectural basis for modern enterprise search, context retrieval pipelines, and hallucinations reduction.",
    appliedInProject: "Knowledge ingestion & grounding engine in IDA & ATLAS.",
    abstract:
      "Large pre-trained language models have been shown to store factual knowledge in their parameters, and achieve state-of-the-art results when fine-tuned on downstream NLP tasks. However, their ability to access and precisely manipulate knowledge is still limited, and they lag behind task-specific architectures on knowledge-intensive tasks. We explore a general-purpose fine-tuning recipe for retrieval-augmented generation (RAG) — models which combine pre-trained parametric and non-parametric memory for language generation.",
    mathFormulas: [
      {
        label: "RAG-Sequence Marginalization",
        formula: "p_RAG-Seq(y|x) = ∑_{z ∈ top-k(p(·|x))} p_η(z|x) ∏_{i}^N p_θ(y_i | x, z, y_{1:i-1})",
        explanation: "Retrieves top-k documents once per query and marginalizes generation probability across all retrieved candidates.",
      },
      {
        label: "Dense Passage Retrieval (DPR) Scoring",
        formula: "p_η(z|x) ∝ exp( d(z)^T q(x) )",
        explanation: "Cosine similarity between query embedding q(x) and document embedding d(z) using dual BERT bi-encoders.",
      },
    ],
    architecturePoints: [
      {
        title: "Parametric + Non-Parametric Separation",
        desc: "Enables dynamic corpus updates without re-training trillion-parameter weights, drastically slashing hallucinations.",
      },
      {
        title: "End-to-End Retriever Fine-Tuning",
        desc: "Generator cross-entropy loss backpropagates into the retriever's question encoder to optimize relevant doc retrieval.",
      },
      {
        title: "Fact Grounding & Citation Traceability",
        desc: "Allows exact inspection of source document provenance for compliance and audit requirements.",
      },
    ],
    benchmarks: [
      { metric: "Natural Questions Exact Match", result: "44.5%", baseline: "34.5% (Closed-book T5-11B)" },
      { metric: "TriviaQA Open-Domain", result: "56.8%", baseline: "50.1% (Standard Seq2Seq)" },
      { metric: "Hallucination Rate Reduction", result: "> 68% decrease", baseline: "Pure generative LLMs" },
    ],
    engineeringTakeaways: [
      "Chunk size and semantic chunk boundaries dictate retrieval quality far more than pure model parameter scale.",
      "Hybrid retrieval (BM25 lexical + dense embeddings) beats pure dense retrieval on out-of-domain technical keywords.",
    ],
  },
  {
    id: "react-reasoning-acting",
    title: "ReAct: Synergizing Reasoning and Acting in Language Models",
    authors: "Shunyu Yao, Jeffrey Zhao, Dian Yu, Nan Du, Izhak Shafran, Karthik Narasimhan, Yuan Cao",
    venue: "ICLR",
    year: "2023",
    category: "Agents & Systems",
    arxivId: "2210.03629",
    arxivPdfUrl: "https://arxiv.org/pdf/2210.03629.pdf",
    arxivHtmlUrl: "https://ar5iv.labs.arxiv.org/html/2210.03629",
    url: "https://arxiv.org/abs/2210.03629",
    keyInsight: "Interleaves reasoning traces ('thought') and task-specific actions ('call tool', 'search') allowing language models to dynamically adjust plans and handle exceptions.",
    relevanceNote: "Core design pattern behind autonomous agent swarms, tool calling, and systems like CrewAI and Medscope.",
    appliedInProject: "Agent coordination loop in Medscope & CandidateFlow.",
    abstract:
      "While recent work has explored language models (LMs) for either reasoning (e.g. chain-of-thought) or acting (e.g. Action Plan Generation), the synergy between these two aspects has been largely unconsidered. We present ReAct, where LLMs generate reasoning traces and task-specific actions in an interleaved manner. Generating reasoning traces allows the model to induce, track, and update action plans, whereas action execution interfaces with external environments to gather real-time observation feedback.",
    mathFormulas: [
      {
        label: "ReAct Execution Loop",
        formula: "Trajectory = (Thought_t, Action_t, Observation_t)_{t=1}^T",
        explanation: "At each step t, the policy generates a natural language thought to decompose sub-goals, followed by an API action that yields external observation.",
      },
    ],
    architecturePoints: [
      {
        title: "Synergy of Internal & External State",
        desc: "Pure reasoning hallucinates facts without action; pure action fails long-horizon planning without thought.",
      },
      {
        title: "Human Interpretability & Steerability",
        desc: "Engineers can inspect explicit thought traces in real-time to debug agent bottlenecks or inject guardrail overrides.",
      },
      {
        title: "Error Recovery & Self-Correction",
        desc: "Allows the agent to observe API error codes or empty results and dynamically formulate alternative queries.",
      },
    ],
    benchmarks: [
      { metric: "HotpotQA Multi-Hop QA", result: "34.2% F1", baseline: "29.4% (Standard Chain-of-Thought)" },
      { metric: "ALFWorld Decision Making", result: "71% Success Rate", baseline: "45% (Act-only agent)" },
      { metric: "Fact Grounding Accuracy", result: "+48% gain", baseline: "Unconstrained zero-shot reasoning" },
    ],
    engineeringTakeaways: [
      "Constraining tool schemas with strict Pydantic/Zod validators prevents invalid JSON action generation.",
      "Max-step timeouts and loop-detection heuristics are mandatory to avoid circular hallucination loops.",
    ],
  },
  {
    id: "lora",
    title: "LoRA: Low-Rank Adaptation of Large Language Models",
    authors: "Edward J. Hu, Yelong Shen, Phillip Wallis, Zeyuan Allen-Zhu, Yuanzhi Li, Shean Wang, Lu Wang, Weizhu Chen",
    venue: "ICLR",
    year: "2022",
    category: "LLMs & Reasoning",
    arxivId: "2106.09685",
    arxivPdfUrl: "https://arxiv.org/pdf/2106.09685.pdf",
    arxivHtmlUrl: "https://ar5iv.labs.arxiv.org/html/2106.09685",
    url: "https://arxiv.org/abs/2106.09685",
    keyInsight: "Freezes pre-trained model weights and injects trainable rank decomposition matrices into each Transformer layer, reducing trainable parameters by 10,000x and GPU memory by 3x.",
    relevanceNote: "Standard practice for parameter-efficient fine-tuning (PEFT) in cost-constrained and edge AI deployments.",
    appliedInProject: "Domain-specific fine-tuning for DataPilot financial explainability.",
    abstract:
      "An important paradigm of natural language processing consists of large-scale pre-training on general domain data and adaptation to particular tasks. However, as models grow larger, full fine-tuning becomes prohibitive. We propose Low-Rank Adaptation (LoRA), which freezes the pre-trained model weights and injects trainable rank decomposition matrices into each layer of the Transformer architecture, greatly reducing the number of trainable parameters for downstream tasks.",
    mathFormulas: [
      {
        label: "Low-Rank Weight Parameterization",
        formula: "h = W_0 x + ΔW x = W_0 x + (B · A) x · (α / r)",
        explanation: "Where W_0 ∈ ℝ^{d×k} is frozen, B ∈ ℝ^{d×r}, A ∈ ℝ^{r×k} with intrinsic rank r ≪ min(d,k), scaled by α/r.",
      },
    ],
    architecturePoints: [
      {
        title: "Zero Inference Latency Overhead",
        desc: "During deployment, weights can be merged statically (W = W_0 + B·A), completely eliminating runtime overhead.",
      },
      {
        title: "10,000x Parameter Reduction",
        desc: "Adapters take merely 20MB-100MB of storage compared to 30GB+ full checkpoint copies.",
      },
      {
        title: "Multi-Tenant Serving",
        desc: "Enables hosting a single frozen base model on GPU while swapping lightweight LoRA adapter weights on the fly per tenant.",
      },
    ],
    benchmarks: [
      { metric: "GPT-3 175B Fine-tuning VRAM", result: "Reduced from 1.2TB to 350GB", baseline: "Full fine-tuning" },
      { metric: "Trainable Parameters", result: "0.01% of base model", baseline: "100% parameter retraining" },
      { metric: "GLUE Benchmark Performance", result: "Matched or outperformed full fine-tuning", baseline: "RoBERTa / DeBERTa" },
    ],
    engineeringTakeaways: [
      "Setting rank r=8 or r=16 is sufficient for most downstream domain adaptations without performance loss.",
      "Adapting only Query and Value projection matrices yields 80%+ of full-parameter expressiveness.",
    ],
  },
  {
    id: "chain-of-thought",
    title: "Chain-of-Thought Prompting Elicits Reasoning in Large Language Models",
    authors: "Jason Wei, Xuezhi Wang, Dale Schuurmans, Maarten Bosma, Fei Xia, Ed Chi, Quoc V. Le, Denny Zhou",
    venue: "NeurIPS",
    year: "2022",
    category: "LLMs & Reasoning",
    arxivId: "2201.11903",
    arxivPdfUrl: "https://arxiv.org/pdf/2201.11903.pdf",
    arxivHtmlUrl: "https://ar5iv.labs.arxiv.org/html/2201.11903",
    url: "https://arxiv.org/abs/2201.11903",
    keyInsight: "Demonstrates that generating intermediate reasoning steps significantly boosts multi-step arithmetic, symbolic reasoning, and commonsense tasks in LLMs.",
    relevanceNote: "Foundational mechanism behind modern structured reasoning, zero-shot planners, and deliberation agents.",
    appliedInProject: "Prompt engineering & multi-step analysis across ATLAS & Medscope.",
    abstract:
      "We explore how generating a chain of thought — a series of intermediate reasoning steps — significantly improves the ability of large language models to perform complex reasoning. In particular, we show how such reasoning abilities emerge naturally in sufficiently large language models via a simple method called chain-of-thought prompting, where a few chain-of-thought demonstrations are provided as exemplars in prompting.",
    mathFormulas: [
      {
        label: "Stepwise Reasoning Formulation",
        formula: "P(Answer | Input) = ∑_{Trace} P(Trace | Input) · P(Answer | Input, Trace)",
        explanation: "Decomposes monolithic mapping into a probability distribution over intermediate reasoning steps.",
      },
    ],
    architecturePoints: [
      {
        title: "Emergent Capability at Scale",
        desc: "Chain-of-thought gains only manifest prominently in models with >100B parameters or instruction-tuned models.",
      },
      {
        title: "Token Allocation as Computation",
        desc: "Generating more reasoning tokens provides the model with additional transformer forward passes to compute complex relations.",
      },
      {
        title: "Self-Consistency Voting (CoT-SC)",
        desc: "Sampling multiple reasoning chains and selecting the majority answer boosts accuracy by another 10-15%.",
      },
    ],
    benchmarks: [
      { metric: "GSM8K Grade School Math", result: "58.1% (PaLM 540B CoT)", baseline: "17.9% (Standard Prompting)" },
      { metric: "SVAMP Arithmetic", result: "79.0% Accuracy", baseline: "55.8% Baseline" },
      { metric: "CSQA Commonsense", result: "79.9% Accuracy", baseline: "68.2% Baseline" },
    ],
    engineeringTakeaways: [
      "Adding explicit 'think step-by-step' triggers latent reasoning attention pathways in zero-shot contexts.",
      "Structuring reasoning into distinct scratchpads before emitting final JSON payloads eliminates syntax errors.",
    ],
  },
  {
    id: "clip",
    title: "Learning Transferable Visual Models From Natural Language Supervision (CLIP)",
    authors: "Alec Radford, Jong Wook Kim, Chris Hallacy, Aditya Ramesh, Gabriel Goh, Sandhini Agarwal, Girish Sastry, Amanda Askell, Pamela Mishkin, Jack Clark, Gretchen Krueger, Ilya Sutskever",
    venue: "ICML",
    year: "2021",
    category: "Vision & Multimodal",
    arxivId: "2103.00020",
    arxivPdfUrl: "https://arxiv.org/pdf/2103.00020.pdf",
    arxivHtmlUrl: "https://ar5iv.labs.arxiv.org/html/2103.00020",
    url: "https://arxiv.org/abs/2103.00020",
    keyInsight: "Trains vision and text encoders jointly with contrastive loss over 400M (image, text) pairs, enabling zero-shot visual classification matching supervised ResNets.",
    relevanceNote: "Core bridge for multimodal image-text embeddings, zero-shot visual search, and vision-language models.",
    appliedInProject: "Visual tracking and interaction mapping in Suno & IDA.",
    abstract:
      "State-of-the-art computer vision systems are trained to predict a fixed set of predetermined object categories. This restricted form of supervision limits their generality and usability. We demonstrate that the simple pre-training task of predicting which caption goes with which image is an efficient and scalable way to learn SOTA image representations from scratch on a dataset of 400 million (image, text) pairs collected from the internet.",
    mathFormulas: [
      {
        label: "Symmetric InfoNCE Loss",
        formula: "L = 1/2 · ( L_image_to_text + L_text_to_image )",
        explanation: "Maximizes cosine similarity between correct (image_i, text_i) pairs in a batch while minimizing similarity to incorrect pairs.",
      },
    ],
    architecturePoints: [
      {
        title: "Joint Embedding Space",
        desc: "Maps images and textual phrases into the same metric space (e.g. 512-dim) allowing direct vector arithmetic.",
      },
      {
        title: "Zero-Shot Open-Vocabulary Prediction",
        desc: "Classifies unseen categories without fine-tuning simply by querying 'a photo of a {class_name}'.",
      },
      {
        title: "Dual ViT / Transformer Backbone",
        desc: "Utilizes Vision Transformers (ViT) for image patch encoding coupled with a standard Transformer text encoder.",
      },
    ],
    benchmarks: [
      { metric: "ImageNet Zero-Shot Accuracy", result: "76.2% Top-1", baseline: "Matches supervised ResNet-50 without labels" },
      { metric: "Robustness to Distribution Shift", result: "+28% over supervised models", baseline: "ImageNetV2, ImageNet-R" },
      { metric: "Pre-training Dataset", result: "400M WebImageText Pairs", baseline: "1.2M ImageNet" },
    ],
    engineeringTakeaways: [
      "Image embeddings can be indexed in standard vector DBs (e.g., pgvector, Milvus, SQLite) alongside text for unified search.",
      "Prompt engineering text prompts ('a crisp photo of a...') improves zero-shot classification accuracy by 3-5%.",
    ],
  },
  {
    id: "flashattention",
    title: "FlashAttention: Fast and Memory-Efficient Exact Attention with IO-Awareness",
    authors: "Tri Dao, Daniel Y. Fu, Stefano Ermon, Atri Rudra, Christopher Ré",
    venue: "NeurIPS",
    year: "2022",
    category: "Transformers & Architecture",
    arxivId: "2205.14135",
    arxivPdfUrl: "https://arxiv.org/pdf/2205.14135.pdf",
    arxivHtmlUrl: "https://ar5iv.labs.arxiv.org/html/2205.14135",
    url: "https://arxiv.org/abs/2205.14135",
    keyInsight: "Restructures exact attention computation to minimize GPU HBM (high bandwidth memory) read/writes through tiling and recomputation, scaling speed up to 3x.",
    relevanceNote: "Essential engine level optimization for long-context LLMs, high-throughput inference, and efficient training.",
    appliedInProject: "High-throughput inference acceleration in voice and backend services.",
    abstract:
      "Transformers are slow and memory-hungry on long sequences, since the time and memory complexity of self-attention are quadratic in sequence length. We propose FlashAttention, an IO-aware exact attention algorithm that uses tiling to reduce the number of memory reads/writes between GPU high bandwidth memory (HBM) and GPU on-chip SRAM. FlashAttention trains Transformers faster than existing baselines and enables longer contexts.",
    mathFormulas: [
      {
        label: "IO Memory Complexity",
        formula: "Standard Attention HBM Reads: O(N^2) → FlashAttention: O(N^2 d^2 / M)",
        explanation: "Where N is sequence length, d is head dimension, and M is SRAM capacity, dramatically reducing memory bandwidth bottlenecks.",
      },
    ],
    architecturePoints: [
      {
        title: "Tiling Strategy",
        desc: "Loads blocks of Q, K, and V into fast on-chip SRAM (19TB/s bandwidth) and computes softmax incrementally without materializing the full N×N matrix in HBM (1.5TB/s).",
      },
      {
        title: "Recomputation in Backward Pass",
        desc: "Instead of caching the giant N×N attention map for backprop, it recomputes it on-the-fly in SRAM during the backward pass.",
      },
      {
        title: "Exact Numerical Equivalence",
        desc: "Unlike approximate attention methods (Linformer, Reformer), FlashAttention produces 100% mathematically identical outputs.",
      },
    ],
    benchmarks: [
      { metric: "GPT-2 Training Speedup", result: "3.2x faster end-to-end", baseline: "HuggingFace PyTorch Attention" },
      { metric: "BERT Large Speedup", result: "2.4x speedup", baseline: "Megatron-LM" },
      { metric: "Context Window Scaling", result: "Enabled 64k+ context on single GPU", baseline: "Crashed at 4k on standard attention" },
    ],
    engineeringTakeaways: [
      "GPU bottlenecks in modern deep learning are IO bandwidth-bound rather than compute (FLOP)-bound.",
      "Always enable FlashAttention v2 / SDPA kernels in production PyTorch/vLLM inference clusters.",
    ],
  },
  {
    id: "rrf-search",
    title: "Reciprocal Rank Fusion Outperforms Condorcet and Individual Rank Learning Methods",
    authors: "Gordon V. Cormack, Charles L. A. Clarke, Stefan Buettcher",
    venue: "SIGIR",
    year: "2009",
    category: "RAG & IR",
    arxivId: "10.1145/1571941.1572114",
    arxivPdfUrl: "https://dl.acm.org/doi/pdf/10.1145/1571941.1572114",
    arxivHtmlUrl: "https://dl.acm.org/doi/10.1145/1571941.1572114",
    url: "https://dl.acm.org/doi/10.1145/1571941.1572114",
    keyInsight: "Provides an unsupervised, parameter-free formula to combine rankings from disparate information retrieval systems with robust score normalization.",
    relevanceNote: "Mathematical foundation for hybrid search pipelines (such as Surf) uniting BM25 lexical search with dense vector embeddings.",
    appliedInProject: "Core ranking engine in Surf local-first search engine.",
    abstract:
      "We investigate methods for combining the document ranking outputs of multiple disparate information retrieval systems. We present Reciprocal Rank Fusion (RRF), a simple yet remarkably effective heuristic for combining rankings without requiring calibration of score distributions or machine learning training data. RRF consistently outperforms standard Condorcet and learning-to-rank baselines on TREC retrieval benchmarks.",
    mathFormulas: [
      {
        label: "Reciprocal Rank Fusion (RRF) Formula",
        formula: "RRF_Score(d ∈ D) = ∑_{m ∈ M} 1 / ( k + r_m(d) )",
        explanation: "Where M is the set of rankers (e.g. BM25 and Vector Cosine), r_m(d) is the rank position of document d in ranker m, and k is a smoothing constant (typically k=60).",
      },
    ],
    architecturePoints: [
      {
        title: "Score Scale Invariance",
        desc: "Eliminates the danger of disparate score scales (e.g., unbounded BM25 scores vs [0,1] cosine similarities) by relying purely on rank positions.",
      },
      {
        title: "High-Rank Multiplier",
        desc: "Documents appearing near the top of both lexical and vector lists receive exponentially higher fused confidence.",
      },
      {
        title: "Zero-Latency Local Computation",
        desc: "Computes in under 1 millisecond on thousands of candidate document IDs directly in SQLite / memory.",
      },
    ],
    benchmarks: [
      { metric: "TREC 2004 Robust Track MAP", result: "0.492 Mean Avg Precision", baseline: "0.450 Individual Best System (+9.3%)" },
      { metric: "Hyperparameter Sensitivity", result: "k ∈ [20, 100] yields consistently optimal results", baseline: "Requires no hyperparameter tuning" },
      { metric: "Execution Overhead", result: "< 0.5ms on 1000 items", baseline: "Cross-encoder rerankers require 50-200ms" },
    ],
    engineeringTakeaways: [
      "In Surf, RRF enables instant hybrid search combining SQLite FTS5 lexical matching with local MiniLM vector similarities on local CPUs.",
      "Using k=60 gives the optimal balance between top-1 precision and broad recall.",
    ],
  },
  {
    id: "whisper",
    title: "Robust Speech Recognition via Large-Scale Weak Supervision (Whisper)",
    authors: "Alec Radford, Jong Wook Kim, Tao Xu, Greg Brockman, Christine McLeavey, Ilya Sutskever",
    venue: "ICML",
    year: "2023",
    category: "Vision & Multimodal",
    arxivId: "2212.04356",
    arxivPdfUrl: "https://arxiv.org/pdf/2212.04356.pdf",
    arxivHtmlUrl: "https://ar5iv.labs.arxiv.org/html/2212.04356",
    url: "https://arxiv.org/abs/2212.04356",
    keyInsight: "Demonstrates that scaling weakly supervised sequence-to-sequence audio encoders across 680,000 hours of multilingual audio generalizes robustly across accents and background noise.",
    relevanceNote: "Primary foundation for voice AI infrastructure, telephony IVR pipelines (such as Omniq), and real-time audio transcription.",
    appliedInProject: "Voice transcription & PSTN/2G telephony ingestion in Omniq.",
    abstract:
      "We study the capabilities of speech processing systems trained on 680,000 hours of multilingual and multitask supervised data collected from the web. We show that the use of such a large and diverse dataset leads to improved robustness to accents, background noise, and technical language. Moreover, it enables transcription in multiple languages, as well as translation from those languages into English.",
    mathFormulas: [
      {
        label: "Multitask Conditioning Prefix Tokens",
        formula: "Target Tokens = <|startoftranscript|> <|language_id|> <|task_transcribe/translate|> <|timestamps|> Text...",
        explanation: "Conditions a single unified autoregressive decoder to perform speech recognition, language identification, voice activity detection, and translation.",
      },
    ],
    architecturePoints: [
      {
        title: "80-Channel Log-Mel Spectrogram",
        desc: "Raw audio at 16kHz is mapped to 25ms windows with 10ms stride, processed by a standard 2-layer 1D convolutional stem.",
      },
      {
        title: "Zero-Shot Out-of-Domain Robustness",
        desc: "Because it trained on web-scraped noise, Whisper's error rate decays far more gracefully in real-world telephony conditions than clean LibriSpeech-trained models.",
      },
      {
        title: "Multilingual Zero-Shot Transfer",
        desc: "Translates and transcribes dozens of lower-resource languages directly into standardized text.",
      },
    ],
    benchmarks: [
      { metric: "Corpus Size", result: "680,000 Hours Audio (117k non-English)", baseline: "1,000 Hours (LibriSpeech)" },
      { metric: "Zero-Shot WER Reduction", result: "50% fewer errors on noisy real-world benchmarks", baseline: "Supervised SOTA ASR" },
      { metric: "Supported Tasks", result: "ASR, Translation, VAD, Timestamp Alignment", baseline: "Single-task pipelines" },
    ],
    engineeringTakeaways: [
      "In Omniq, Whisper converts 8kHz telephony G.711 audio feeds into clean multilingual transcriptions for downstream LLM reasoning.",
      "Using whisper.cpp or Faster-Whisper (CTranslate2 INT8) drops transcription latency below 200ms on CPU.",
    ],
  },
]

const CATEGORIES = [
  "All",
  "LLMs & Reasoning",
  "Transformers & Architecture",
  "RAG & IR",
  "Vision & Multimodal",
  "Agents & Systems",
] as const

export function ResearchLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [activePaper, setActivePaper] = useState<DetailedPaper | null>(null)
  const [readerTab, setReaderTab] = useState<"digest" | "math" | "doc" | "engineering">("digest")
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Filter papers
  const filteredPapers = PAPERS_DATA.filter((p) => {
    const matchesCategory = selectedCategory === "All" || p.category === selectedCategory
    const matchesSearch =
      searchQuery.trim() === "" ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.keyInsight.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleOpenPaper = (paper: DetailedPaper) => {
    setActivePaper(paper)
    setReaderTab("digest")
  }

  const handleNextPaper = () => {
    if (!activePaper) return
    const currentIndex = PAPERS_DATA.findIndex((p) => p.id === activePaper.id)
    const nextIndex = (currentIndex + 1) % PAPERS_DATA.length
    setActivePaper(PAPERS_DATA[nextIndex])
  }

  const handlePrevPaper = () => {
    if (!activePaper) return
    const currentIndex = PAPERS_DATA.findIndex((p) => p.id === activePaper.id)
    const prevIndex = (currentIndex - 1 + PAPERS_DATA.length) % PAPERS_DATA.length
    setActivePaper(PAPERS_DATA[prevIndex])
  }

  const handleCopyCitation = (paper: DetailedPaper) => {
    const citation = `${paper.authors} (${paper.year}). "${paper.title}". ${paper.venue}. ${paper.url}`
    navigator.clipboard.writeText(citation)
    setCopiedId(paper.id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  // Prevent background scroll when modal open
  useEffect(() => {
    if (activePaper) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [activePaper])

  return (
    <section className="py-12 border-t border-border">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Research & Foundation Reading
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-secondary text-foreground font-semibold">
                Interactive Library
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-xl">
              Foundational literature in LLMs, attention mechanisms, agentic reasoning, multimodal architectures, and hybrid retrieval. Click any paper to read full executive notes, mathematical formulations, and interactive reader documents.
            </p>
          </div>

          <span className="text-xs text-muted-foreground font-mono shrink-0">
            {filteredPapers.length} / {PAPERS_DATA.length} Papers
          </span>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="space-y-3">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search paper by title, author, or keyword (e.g., attention, RRF, LoRA)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-md bg-secondary/30 border border-border text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-accent font-sans"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted-foreground hover:text-foreground"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    isSelected
                      ? "bg-foreground text-background font-semibold"
                      : "bg-secondary/40 border border-border/80 text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>
        </div>

        {/* Papers List */}
        <div className="divide-y divide-border/70 border-t border-b border-border/70">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="py-5 space-y-2.5 group hover:bg-secondary/10 transition-colors rounded-sm px-1.5"
            >
              {/* Top Meta Line */}
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1.5">
                <button
                  onClick={() => handleOpenPaper(paper)}
                  className="text-left text-sm font-semibold text-foreground group-hover:text-accent transition-colors inline-flex items-center gap-1.5 flex-1"
                >
                  <BookOpen className="w-3.5 h-3.5 text-accent opacity-80 shrink-0" />
                  <span className="hover:underline underline-offset-2">{paper.title}</span>
                </button>

                <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground shrink-0">
                  <span className="px-1.5 py-0.5 rounded bg-secondary text-foreground/80 font-medium">
                    {paper.venue} {paper.year}
                  </span>
                  <span>·</span>
                  <span className="truncate max-w-[120px]">{paper.category}</span>
                </div>
              </div>

              {/* Authors */}
              <div className="text-xs font-mono text-muted-foreground">
                {paper.authors}
              </div>

              {/* Core Insight */}
              <p className="text-xs text-foreground/90 leading-relaxed">
                <span className="font-medium text-foreground">Core contribution: </span>
                {paper.keyInsight}
              </p>

              {/* Relevance in Engineering & Read Actions */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-border/30">
                <div className="text-[11px] text-muted-foreground font-mono flex items-start gap-1.5">
                  <Tag className="w-3 h-3 text-accent shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-foreground/80 font-normal">Engineering context: </strong>
                    {paper.relevanceNote}
                  </span>
                </div>

                <div className="flex items-center gap-2 shrink-0 text-xs">
                  <button
                    onClick={() => handleOpenPaper(paper)}
                    className="px-2.5 py-1 rounded bg-secondary hover:bg-secondary/80 text-foreground font-medium text-[11px] border border-border inline-flex items-center gap-1 transition-colors"
                  >
                    <FileText className="w-3 h-3 text-accent" />
                    <span>Read In-App</span>
                  </button>

                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                    title="Open on arXiv"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}

          {filteredPapers.length === 0 && (
            <div className="py-8 text-center text-xs text-muted-foreground font-mono">
              No research papers matched your search query. Try clearing filters.
            </div>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* IN-APP COMPREHENSIVE PAPER READER MODAL */}
      {/* ========================================================= */}
      {activePaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-background/85 backdrop-blur-md animate-in fade-in duration-150">
          <div
            className={`relative bg-card border border-border rounded-lg shadow-2xl flex flex-col overflow-hidden transition-all duration-200 ${
              isFullscreen
                ? "w-full h-full max-w-none max-h-none rounded-none"
                : "w-full max-w-4xl h-[90vh] max-h-[850px]"
            }`}
          >
            {/* Modal Top Header Bar */}
            <div className="px-5 py-3.5 border-b border-border bg-secondary/40 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="px-2 py-0.5 rounded bg-primary text-primary-foreground text-[10px] font-mono uppercase font-semibold shrink-0">
                  {activePaper.category}
                </span>
                <h3 className="text-sm font-semibold text-foreground truncate">
                  {activePaper.title}
                </h3>
              </div>

              {/* Window Controls */}
              <div className="flex items-center gap-1.5 shrink-0 text-muted-foreground">
                <button
                  onClick={handlePrevPaper}
                  className="p-1.5 rounded hover:bg-secondary hover:text-foreground transition-colors"
                  title="Previous Paper"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextPaper}
                  className="p-1.5 rounded hover:bg-secondary hover:text-foreground transition-colors"
                  title="Next Paper"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="p-1.5 rounded hover:bg-secondary hover:text-foreground transition-colors hidden sm:inline-flex"
                  title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActivePaper(null)}
                  className="p-1.5 rounded hover:bg-secondary hover:text-foreground transition-colors ml-1 text-foreground"
                  title="Close Reader"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Navigation Tabs Bar */}
            <div className="px-5 border-b border-border bg-card flex items-center justify-between overflow-x-auto gap-4">
              <div className="flex items-center gap-4 text-xs font-mono">
                <button
                  onClick={() => setReaderTab("digest")}
                  className={`py-2.5 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    readerTab === "digest"
                      ? "border-accent text-foreground font-semibold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Executive Digest</span>
                </button>

                <button
                  onClick={() => setReaderTab("math")}
                  className={`py-2.5 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    readerTab === "math"
                      ? "border-accent text-foreground font-semibold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Code className="w-3.5 h-3.5" />
                  <span>Math & Formulations</span>
                </button>

                <button
                  onClick={() => setReaderTab("engineering")}
                  className={`py-2.5 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    readerTab === "engineering"
                      ? "border-accent text-foreground font-semibold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Engineering Takeaways</span>
                </button>

                <button
                  onClick={() => setReaderTab("doc")}
                  className={`py-2.5 border-b-2 transition-colors flex items-center gap-1.5 whitespace-nowrap ${
                    readerTab === "doc"
                      ? "border-accent text-foreground font-semibold"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Live Document Reader</span>
                </button>
              </div>

              {/* Quick Actions */}
              <div className="hidden sm:flex items-center gap-2 text-xs shrink-0 py-1">
                <button
                  onClick={() => handleCopyCitation(activePaper)}
                  className="px-2 py-1 rounded bg-secondary hover:bg-secondary/80 text-[11px] font-mono text-muted-foreground hover:text-foreground border border-border inline-flex items-center gap-1 transition-colors"
                >
                  {copiedId === activePaper.id ? (
                    <>
                      <Check className="w-3 h-3 text-accent" />
                      <span>Copied Citation</span>
                    </>
                  ) : (
                    <span>Copy Citation</span>
                  )}
                </button>

                <a
                  href={activePaper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-1 rounded bg-secondary hover:bg-secondary/80 text-[11px] font-mono text-muted-foreground hover:text-foreground border border-border inline-flex items-center gap-1 transition-colors"
                >
                  <span>arXiv Source</span>
                  <ArrowUpRight className="w-3 h-3 opacity-70" />
                </a>
              </div>
            </div>

            {/* Reader Content Body */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
              {/* ================= TAB 1: DIGEST ================= */}
              {readerTab === "digest" && (
                <div className="space-y-6 max-w-3xl">
                  {/* Paper Header */}
                  <div className="space-y-2 border-b border-border pb-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
                      <span className="px-2 py-0.5 rounded bg-secondary text-foreground font-semibold">
                        {activePaper.venue} {activePaper.year}
                      </span>
                      <span>·</span>
                      <span>arXiv:{activePaper.arxivId}</span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-foreground tracking-tight">
                      {activePaper.title}
                    </h2>
                    <p className="text-xs font-mono text-muted-foreground leading-relaxed">
                      {activePaper.authors}
                    </p>
                  </div>

                  {/* Applied Project Link if available */}
                  {activePaper.appliedInProject && (
                    <div className="p-3.5 rounded-md bg-secondary/40 border border-border text-xs flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <div>
                        <span className="font-semibold text-foreground">Production Synergy: </span>
                        <span className="text-muted-foreground">{activePaper.appliedInProject}</span>
                      </div>
                    </div>
                  )}

                  {/* Abstract Box */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Abstract
                    </h4>
                    <p className="text-sm text-foreground/90 leading-relaxed font-sans bg-secondary/20 p-4 rounded-md border border-border/60">
                      {activePaper.abstract}
                    </p>
                  </div>

                  {/* Architecture Points */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-accent" />
                      <span>Key Architectural Innovations</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {activePaper.architecturePoints.map((pt) => (
                        <div key={pt.title} className="p-3.5 rounded-md bg-secondary/30 border border-border space-y-1.5">
                          <div className="text-xs font-semibold text-foreground">
                            {pt.title}
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {pt.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Empirical Benchmarks */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Key Benchmark Results
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {activePaper.benchmarks.map((b) => (
                        <div key={b.metric} className="p-3 rounded-md bg-secondary/20 border border-border/70 space-y-1">
                          <div className="text-[11px] font-mono text-muted-foreground">
                            {b.metric}
                          </div>
                          <div className="text-sm font-semibold text-accent">
                            {b.result}
                          </div>
                          <div className="text-[10px] font-mono text-muted-foreground">
                            vs {b.baseline}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ================= TAB 2: MATH & FORMULAS ================= */}
              {readerTab === "math" && (
                <div className="space-y-6 max-w-3xl">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-foreground">
                      Mathematical Foundations & Equations
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Exact formal representations and operational mechanisms introduced in the paper.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {activePaper.mathFormulas.map((f, idx) => (
                      <div key={f.label} className="p-4 rounded-lg bg-secondary/30 border border-border space-y-2.5">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-accent font-semibold">
                            Equation 0{idx + 1}: {f.label}
                          </span>
                        </div>

                        {/* Styled Equation Box */}
                        <div className="p-3.5 rounded bg-background border border-border font-mono text-xs sm:text-sm text-foreground overflow-x-auto text-center py-4 select-all">
                          {f.formula}
                        </div>

                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {f.explanation}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Implementation Snippet Preview */}
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                      Engineering Implementation Note
                    </h4>
                    <div className="p-4 rounded bg-secondary/20 border border-border text-xs text-muted-foreground space-y-2 font-mono">
                      <div className="text-foreground font-semibold">
                        // Core Execution Characteristic:
                      </div>
                      <p className="leading-relaxed">
                        {activePaper.keyInsight}
                      </p>
                      <div className="pt-2 text-[11px] text-accent">
                        → Applied in: {activePaper.relevanceNote}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= TAB 3: ENGINEERING TAKEAWAYS ================= */}
              {readerTab === "engineering" && (
                <div className="space-y-6 max-w-3xl">
                  <div className="space-y-1">
                    <h3 className="text-base font-semibold text-foreground">
                      Production Engineering Takeaways
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Practical guidelines for AI engineers implementing these architectures in production systems.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {activePaper.engineeringTakeaways.map((takeaway, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-secondary/30 border border-border flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-accent/20 text-accent font-mono text-xs flex items-center justify-center shrink-0 font-semibold mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                          {takeaway}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-lg bg-secondary/20 border border-border/80 space-y-2 text-xs">
                    <span className="font-mono text-muted-foreground uppercase text-[10px] block">
                      Portfolio Architecture Connection
                    </span>
                    <p className="text-foreground leading-relaxed">
                      This paper directly informs the systems engineering principles applied across Yeabsera&apos;s projects — from local-first vector fusion in <strong>Surf</strong> to multi-agent consensus in <strong>Medscope</strong> and low-latency voice pipelines in <strong>Omniq</strong>.
                    </p>
                  </div>
                </div>
              )}

              {/* ================= TAB 4: LIVE DOCUMENT / PDF READER ================= */}
              {readerTab === "doc" && (
                <div className="h-full min-h-[550px] flex flex-col space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground font-mono">
                      <span>Viewer Mode: Live arXiv Document Embed</span>
                      <span>·</span>
                      <span className="text-foreground font-semibold">{activePaper.arxivId}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={activePaper.arxivPdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-2.5 py-1 rounded bg-secondary hover:bg-secondary/80 text-foreground text-xs font-medium border border-border inline-flex items-center gap-1 transition-colors"
                      >
                        <span>Open Raw PDF</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  {/* Document Embed Container */}
                  <div className="flex-1 w-full min-h-[500px] border border-border rounded-lg overflow-hidden bg-background relative">
                    <iframe
                      src={activePaper.arxivHtmlUrl}
                      title={`Paper: ${activePaper.title}`}
                      className="w-full h-full min-h-[500px] border-0"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-[11px] font-mono text-muted-foreground text-center">
                    Rendered via ar5iv web paper viewer. If your browser blocks iframe rendering, use the &quot;Open Raw PDF&quot; button above.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Bottom Toolbar */}
            <div className="px-5 py-3 border-t border-border bg-secondary/30 flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-2 text-muted-foreground">
                <button
                  onClick={handlePrevPaper}
                  className="hover:text-foreground inline-flex items-center gap-0.5 transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Prev</span>
                </button>
                <span>·</span>
                <button
                  onClick={handleNextPaper}
                  className="hover:text-foreground inline-flex items-center gap-0.5 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="flex items-center gap-3">
                <a
                  href={activePaper.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1 transition-colors"
                >
                  <span>View on arXiv.org</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>

                <button
                  onClick={() => setActivePaper(null)}
                  className="px-3 py-1 rounded bg-secondary border border-border text-foreground hover:bg-secondary/80 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
