"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Faq from "@/app/lp/Faq";
import FadeIn from "@/app/components/FadeIn";
import StatTicker from "@/app/components/StatTicker";
import InnerLayout from "@/app/components/InnerLayout";
import CopyBlock from "@/app/components/CopyBlock";
import { textTone } from "@/lib/colors";

/* ─── Types ───────────────────────────────────────────────────────── */
interface Tip {
  label?: string;
  // Set when `label` is a rule/habit callout rather than an actual tool or
  // app name (e.g. "Set the rule"), so it groups under "Habits worth
  // building" instead of being miscategorised as a tool just because it
  // has a bolded label.
  isHabit?: boolean;
  text: string;
  // A ready-to-copy example prompt for this specific tool, tailored to the
  // audience/age-group/format it appears under. Left unset for tools that
  // aren't actually prompt-driven (a camera-scan app, a one-click batch
  // processor, an automated checker) rather than forcing a fake prompt
  // onto them.
  prompt?: string;
}

type ParentEducatorStage = "pre-primary" | "primary" | "middle" | "senior";
type CreatorFormat = "writing" | "video" | "images";
type AudienceKey = "parents" | "educators" | "creators" | "leadership";

/* ─── Content (transcribed as provided, reformatted into label/text
   pairs for the card layout -- wording preserved, not summarised) ─── */

const PARENTS_TIPS: Record<ParentEducatorStage, Tip[]> = {
  "pre-primary": [
    { label: "Google Read Along", text: "AI-powered app that helps your child practice reading aloud, one on one." },
    { label: "Claude/ChatGPT voice mode", text: "Speak a story idea out loud together, get a full bedtime story back instantly.", prompt: "You're a warm, gentle children's storyteller. Tell me a 3-minute bedtime story for a 4-year-old about a brave little elephant named Ellie who's scared of thunderstorms. Use simple words a toddler understands, include one repeated phrase she can join in on, and end with her realising the thunder is just the clouds clapping for the rain. Keep the tone soothing, not exciting, since this is for bedtime." },
    { label: "Canva Magic Media", text: "Turn your child's favourite character or idea into a simple coloring page.", prompt: "A friendly, smiling cartoon dinosaur wearing a paper birthday hat, standing next to 3 balloons. Simple thick black outlines only, no shading or colour fill, big open spaces so a 4-year-old can colour it in easily with crayons. Square format, printable on A4." },
    { text: "Ask AI big questions kids ask (\"why is the sky blue?\") in toddler language, then read the answer together." },
    { text: "Ask AI for a rainy-day craft or activity idea using things you already have at home." },
    { text: "Use AI to write a short, personalized birthday poem or card message for a sibling or friend." },
    { label: "Golden rule at this age", isHabit: true, text: "Always use AI together with your child, never hand over the phone and walk away." },
    { text: "Ask AI to explain a big feeling (\"why do I feel scared of the dark?\") in simple words, then talk about it together." },
    { label: "ElevenLabs", text: "Turn a favourite story into an audio story read in a fun character voice.", prompt: "Read this story aloud in a warm, gentle grandmother's voice: slow pace, soft tone, a little extra warmth on the character names so a 4-year-old feels like she's being told the story by someone who loves her. Pause briefly at the end of each page so it feels like a real bedtime read-aloud, not a rushed narration: [paste your child's favourite story here]" },
    { text: "Use AI to generate simple, printable flashcards for colors, shapes, or animal names." },
  ],
  primary: [
    { label: "ChatGPT/Claude/Gemini", text: "Get step-by-step homework help, not just the final answer.", prompt: "You're a patient primary school maths tutor. My 8-year-old is stuck on this problem: [paste the problem]. Walk me through the solution one step at a time, explaining the reasoning behind each step in language I can repeat to my child. Don't give the final answer up front, let me follow the logic first, then suggest one simple question I can ask her afterward to check she understood it, not just copied it down." },
    { label: "Photomath", text: "Scan a math problem for a full step-by-step solve." },
    { label: "NotebookLM", text: "Upload class notes or a textbook chapter, get instant flashcards for revision.", prompt: "Upload this week's science chapter. Create 10 flashcards covering the key terms and concepts, written in language an 8-year-old understands, and a separate 5-question quiz mixing recall questions with one 'explain it in your own words' question. Order the flashcards easiest to hardest, and add a one-line 'why this matters' fact to each card to keep it interesting." },
    { text: "Ask AI to create a fun quiz on whatever your child is currently curious about (space, dinosaurs, etc)." },
    { label: "Google Lens", text: "Point the camera at a plant or insect on a walk and learn about it together." },
    { text: "Use AI to draft a leave letter or note to the teacher (you review and send it yourself)." },
    { text: "Have your child narrate a story idea out loud, turn it into a written story, then have them illustrate it." },
    { text: "Ask AI to explain a tricky topic using an analogy your child relates to (their favourite sport or cartoon)." },
    { label: "Build the \"check it\" habit early", isHabit: true, text: "After any AI answer, ask \"how do you know this is true?\"" },
    { text: "Use a language-learning app's AI feature for extra practice outside school hours." },
  ],
  middle: [
    { label: "Use AI as a tutor that quizzes, not tells", isHabit: true, text: "Ask it to test you instead of giving the answer." },
    { label: "NotebookLM", text: "Upload notes ahead of an exam, generate flashcards and practice questions.", prompt: "Upload these exam notes for [subject]. Quiz me one question at a time, starting with easier recall questions and gradually moving to harder application questions. Don't reveal the correct answer until I've given my attempt, then tell me clearly whether I was right, and if I was wrong, explain the concept again a different way before moving on. Tell me my score at the end." },
    { label: "Teach the prompt habit", isHabit: true, text: "\"Explain this like I'm in 7th grade\" gets a much better answer than a vague question." },
    { text: "Use AI to help outline an essay, then have your child write it in their own words." },
    { text: "Talk openly about what's okay to use AI for in schoolwork, and what isn't." },
    { text: "Use AI to research project topics, but make it a rule to verify at least one source independently." },
    { label: "Grammarly", text: "Check tone and grammar, without letting it rewrite the whole piece.", prompt: "Review the tone and grammar of this essay draft, written by a 7th grader. Don't rewrite any sentences for me, instead list each issue as a bullet point: quote the exact phrase, explain why it's an issue in one line, and pose the fix as a question rather than the answer, so my child makes the correction themselves: [paste essay]" },
    { text: "Ask AI to explain a current news topic in a simple, balanced way." },
    { label: "Canva / Adobe Firefly", text: "Generate visuals for a school project.", prompt: "A clean, colourful diagram of the water cycle for a 7th-grade science poster: label evaporation, condensation, precipitation, and collection with arrows showing the flow, use bright but not childish colours, include the sun and clouds, and leave space at the top for a title and at the bottom for a short caption." },
    { label: "Set an \"AI or me\" rule", isHabit: true, text: "Big feelings and personal problems go to a parent conversation, not an AI chat." },
  ],
  senior: [
    { label: "CareerExplorer", text: "Turn your child's interests into a shortlist of real careers to research further (\"what careers use a love of biology and art?\")." },
    { label: "Yoodli", text: "Practice mock interviews out loud and get instant feedback on pacing, filler words, and clarity.", prompt: "I'm preparing for a college admissions interview. Ask me: \"Tell me about a time you solved a difficult problem,\" then follow up with one probing question based on my answer, the way a real interviewer would. After I respond, give me specific feedback on my pacing, filler words, clarity, and whether my answer actually showed my thinking, not just the outcome." },
    { label: "CollegeVine", text: "Brainstorm college essay angles, then have your child write the essay in their own voice.", prompt: "Here's my personal statement draft for [university/course]: [paste draft]. This currently reads generic. Suggest 3 completely different angles I could take instead, each built around a specific moment or detail from my life rather than a general trait, and write the opening two sentences for each so I can see how it would actually sound." },
    { label: "NotebookLM / Quizlet AI", text: "Turn the syllabus into flashcards and self-quizzes for board exam prep.", prompt: "Upload this full board-exam syllabus. Turn every unit into a set of flashcards (term, definition, one example), then generate a 20-question mock test that mirrors the actual exam's mix of question types and difficulty, weighted more heavily toward the units that carry the most marks. Include an answer key with a one-line explanation for each answer." },
    { label: "Teal", text: "Get a first round of AI feedback on a resume or college application draft." },
    { label: "Set the rule", isHabit: true, text: "AI helps outline and check work, it doesn't write the assignment." },
    { text: "Ask AI to lay out multiple sides of a debate topic before your child forms their own opinion." },
    { text: "Build the habit of fact-checking anything AI says with at least one outside source." },
    { text: "Talk openly about how AI is changing the field your child is interested in pursuing." },
    { text: "Turn a rough voice note about a personal goal into a structured plan using AI." },
    { label: "Discuss AI's downsides too", isHabit: true, text: "Bias and misinformation, as part of building critical thinking." },
  ],
};

const EDUCATORS_TIPS: Record<ParentEducatorStage, Tip[]> = {
  "pre-primary": [
    { label: "MagicSchool AI", text: "Quick activity and worksheet ideas for young learners.", prompt: "Create a 20-minute circle-time activity for a class of 20 four-year-olds on colours and shapes. Include a 3-minute attention-grabbing opener (song or chant), a 10-minute interactive teaching segment with a simple game, and a 7-minute hands-on craft that reinforces the lesson using only materials a classroom would already have (paper, crayons, glue). Note where I should pause to check the children are still engaged." },
    { label: "Curipod", text: "Interactive, story-based lesson slides for circle time.", prompt: "Build an interactive, story-based lesson on 'sharing and taking turns' for pre-primary circle time. Use a simple 4-scene story with two relatable child characters and one toy, include one class poll asking what the character should do next, and end with a short, repeatable class chant the children can use whenever a real sharing conflict comes up during the day." },
    { label: "Canva Magic Design", text: "Classroom posters and decor in minutes.", prompt: "A bright, welcoming classroom poster titled 'Our Class Rules' for a pre-primary classroom. Use exactly 5 rules, each shown as one simple icon with a 2-3 word label underneath, no full sentences. Warm, cheerful colour palette, big rounded shapes, and enough white space that it doesn't feel cluttered from across the room." },
    { text: "Ask AI for simple story ideas tied to this week's classroom theme." },
    { text: "Use AI to draft short daily observation notes for parents." },
    { text: "Generate simple, printable phonics or number flashcards." },
    { text: "Use text-to-speech tools for multilingual story time." },
    { text: "Ask AI for practical classroom management tips for specific common behaviours." },
    { text: "Use AI for simple, warm daily-update templates to send to parents." },
    { text: "Generate step-by-step craft instructions matched to the week's theme." },
  ],
  primary: [
    { label: "MagicSchool AI", text: "Lesson plans and worksheets in minutes, not hours.", prompt: "Create a 45-minute lesson plan introducing fractions for grade 3. Structure it as: a 5-minute hook connecting fractions to something kids already know (like sharing a pizza), a 15-minute direct teaching segment, a 15-minute hands-on activity using everyday objects, 5 minutes of guided practice, and a 5-minute exit ticket with 3 questions that tell me who needs re-teaching tomorrow." },
    { label: "Diffit", text: "Turn one reading passage into three difficulty levels for a mixed-ability class.", prompt: "Paste this reading passage and generate 3 leveled versions for a mixed-ability grade 4 class: one simplified for struggling readers (shorter sentences, easier vocabulary, same core facts), one on grade level, and one extended for advanced readers with added detail and a higher-level comprehension question. Keep all 3 roughly the same length so I can hand them out without anyone noticing who got which version: [paste passage]" },
    { label: "NotebookLM", text: "Turn a textbook chapter into ready-made quiz questions.", prompt: "Upload this textbook chapter. Generate 10 quiz questions mixing multiple-choice, fill-in-the-blank, and one short-answer question, ordered easiest to hardest, with an answer key that includes the page number where each answer can be found, so I can quickly point struggling students back to the right section." },
    { label: "Curipod", text: "Interactive lesson slides with quizzes built in.", prompt: "Turn this topic into an interactive slide deck for grade 4: [topic]. Structure it as 6-8 slides, include one class poll to check understanding midway through and one open-ended discussion question near the end, and keep each slide to one core idea with a simple visual, no walls of text." },
    { text: "Use AI to generate grading rubrics for projects." },
    { label: "Otter.ai", text: "Transcribe and summarize staff meetings automatically." },
    { text: "Turn quick, rough notes into well-worded report card comments." },
    { text: "Generate differentiated homework sheets (easy/medium/hard) for the same topic." },
    { text: "Ask AI for a creative analogy or story to explain a tricky concept." },
    { label: "Canva / CapCut", text: "Class newsletters and quick video recaps of events.", prompt: "Create a 30-second recap video for our class trip to [location]. Use upbeat, kid-friendly background music, leave clearly marked space for 5 photos with a 2-second transition between each, add a title card at the start with the trip name and date, and end with a closing card that says 'See you next time!'" },
  ],
  middle: [
    { label: "MagicSchool AI / Curipod", text: "Build interactive lesson content quickly.", prompt: "Build a debate-style lesson on [topic] for grade 7. Give me 3 strong arguments for each side, written at a level 12-year-olds can actually use in discussion, not textbook jargon, plus 2 follow-up questions I can ask to push students past their first surface-level point. Suggest how to split the class into teams fairly." },
    { label: "NotebookLM", text: "Generate unit-based study guides straight from your syllabus.", prompt: "Upload this unit's syllabus. Build a study guide broken down by sub-topic, with a 2-3 sentence summary for each, one worked example where relevant, and a short list of common student mistakes on that sub-topic, so I know what to emphasise in class." },
    { text: "Use AI to design project rubrics with clear, specific criteria." },
    { text: "Ask AI to generate a debate topic with strong arguments on both sides for class discussion." },
    { text: "Create quizzes at varying difficulty levels for differentiated assessment." },
    { text: "Set and discuss a clear class policy on AI use for homework vs. assessments." },
    { label: "Grammarly", text: "Model what good, specific writing feedback looks like.", prompt: "Give specific, actionable feedback on this middle-school-level paragraph. Don't say 'good job' or 'needs work': pick the 2 strongest sentences and explain exactly why they work, then pick the 2 weakest and explain precisely what's unclear or unsupported, with a suggested direction for improvement rather than the rewritten sentence itself: [paste paragraph]" },
    { label: "Otter.ai", text: "Transcribe parent-teacher meeting notes." },
    { text: "Draft a first pass of a tricky parent email, then personalize before sending." },
    { text: "Use AI to brainstorm real-world examples that connect the curriculum to students' lives." },
  ],
  senior: [
    { label: "Quizizz AI", text: "Generate board-exam-style practice questions instantly for any topic.", prompt: "Generate 15 board-exam-style multiple-choice questions on [topic], matching the actual exam board's question format and command words. Mix difficulty: 5 easy recall, 7 medium application, 3 hard analysis-based. Include an answer key that explains why the correct answer is right and why the most common wrong answer is tempting but incorrect." },
    { label: "NotebookLM", text: "Build a full revision guide directly from the syllabus.", prompt: "Upload the full board-exam syllabus for [subject]. Build a complete revision guide organised unit by unit, with a one-paragraph summary, 3 key formulas or facts, and 2 likely exam-style questions per unit. Flag the 3 units that historically carry the most exam weight so students know where to focus first." },
    { text: "Use AI to design real-world case studies or application-based questions." },
    { text: "Set and clearly communicate an academic integrity policy around AI use." },
    { label: "Turnitin", text: "Draft detailed, specific essay feedback, then review and personalize before sending." },
    { text: "Draft a first version of a recommendation letter, then personalize it fully before sending." },
    { text: "Use AI to explore how your subject connects to real careers, for career-guidance chats." },
    { label: "Otter.ai / Grammarly", text: "Speed up admin: meeting notes, reports, emails.", prompt: "Draft a first-pass reply to this parent email. Keep the tone warm but firm: acknowledge their specific concern (not generically), state the school's position clearly in 2-3 sentences, and end with one concrete next step, a call, a meeting, or a follow-up date. I'll personalise the details before sending: [paste email]" },
    { text: "Design mock interview or viva questions for senior projects." },
    { label: "Teach AI literacy directly", isHabit: true, text: "How to question and verify AI output, not just use it." },
  ],
};

const CREATORS_TIPS: Record<CreatorFormat, Tip[]> = {
  writing: [
    { label: "ChatGPT/Claude", text: "Turn a rough voice note into a polished caption.", prompt: "Turn this rough voice note into a punchy, on-brand Instagram caption. Keep it under 150 characters, open with a hook in the first 5 words (not a greeting), match a confident-but-approachable brand voice, and end with a soft call-to-action, not a hard sell: [paste transcript]" },
    { text: "Generate 3-4 caption variations and pick the one with the best tone." },
    { text: "Fact-check any claims-heavy post using AI plus a web search before posting." },
    { label: "Grammarly", text: "Polish tone and grammar without a full rewrite.", prompt: "Check the tone and grammar of this caption. Don't rewrite it in your own voice, just flag anything that sounds off: grammar errors, awkward phrasing, or a tone shift that breaks the casual, confident style I've been using. Explain in one line why each flag is an issue: [paste caption]" },
    { label: "DeepL", text: "Translate captions accurately into other languages to widen your reach.", prompt: "Translate this caption into Hindi and Spanish. Don't do a literal word-for-word translation, adapt any idioms or humour so they land naturally in each language, keep the tone as casual and energetic as the English original, and flag anything that doesn't translate well so I can rework it instead: [paste caption]" },
    { text: "Ask AI to turn a long event into a punchy 3-line recap for a story or post." },
    { label: "Notion AI", text: "Plan and organize your content calendar.", prompt: "Build me a 30-day content calendar for [niche]. Mix content types across the month: roughly 50% educational, 30% behind-the-scenes/personal, 20% promotional, and never post two promotional posts back to back. For each day give me a one-line post idea and the format (Reel, carousel, single image), and flag 2-3 days that align with relevant trends or dates in [niche]." },
    { text: "Draft consistent, on-brand replies to common DMs and comments." },
    { label: "Jasper", text: "Brainstorm 10 hook lines for a post, then pick the strongest one.", prompt: "Give me 10 different hook lines for a post about [topic], each under 12 words. Use at least 3 different hook styles across the list: a bold claim, a relatable pain point, and a curiosity gap, so I have real variety to A/B test rather than 10 versions of the same idea." },
    { label: "Ask AI directly", isHabit: true, text: "\"Does this sound engaging, or generic?\"" },
  ],
  video: [
    { label: "CapCut", text: "Auto-captions, jump-cut removal, and music suggestions, all from your phone.", prompt: "Write a 30-second video script about [topic]. Structure it second by second: a hook in the first 3 seconds that states the payoff upfront (not 'today I'll show you'), 3 quick supporting points in the middle with an on-screen text cue for each, and a one-line closing call-to-action. Flag exactly where a jump-cut or text overlay would land best." },
    { label: "Opus Clip", text: "Turn one long video into several short, auto-captioned clips." },
    { label: "Descript", text: "Edit a video by editing its text transcript.", prompt: "Clean up this transcript: remove all filler words ('um', 'like', 'you know'), cut awkward pauses and repeated phrases, and tighten the whole thing to under 90 seconds read aloud at a natural pace, without losing the core point of any sentence. Flag any sentence where cutting it changes the meaning, rather than silently deleting it: [paste transcript]" },
    { label: "ElevenLabs", text: "AI voiceovers in different tones or languages.", prompt: "Read this script in an upbeat, confident voice, mid-paced, like a young founder explaining a genuinely useful tip to a friend over coffee, not pitching to an investor. Add natural emphasis on the 1-2 key words per sentence that matter most, and a short, natural pause before the final line so it lands: [paste script]" },
    { text: "Write a tight script outline with AI before you start filming." },
    { text: "Ask AI for trending formats or audio ideas relevant to your niche." },
    { text: "Auto-generate subtitles for better accessibility and reach." },
    { text: "Ask AI to suggest a strong thumbnail hook based on your video's content." },
    { text: "Repurpose one video into a carousel post script." },
    { text: "Feed AI your rough transcript and ask it to pull out the most quotable moments." },
  ],
  images: [
    { label: "Adobe Firefly / Midjourney / Canva Magic Media", text: "Custom graphics instead of stock photos.", prompt: "A modern, minimalist flat-lay shot from directly above: a laptop, a cup of coffee with visible steam, and an open notebook with a pen, arranged with generous negative space on the right third of the frame for text overlay. Warm morning light from one side, soft shadows, muted neutral colour palette, for a productivity-themed post." },
    { label: "remove.bg", text: "Clean up backgrounds or fix a photo in seconds." },
    { text: "Build a consistent, branded template for recurring post types." },
    { label: "Canva Magic Design", text: "Quick posters or announcement graphics.", prompt: "A bold announcement graphic for '[event name], this Saturday'. Use our brand colours [colour 1, colour 2, colour 3] as the primary palette, make the date and 'this Saturday' the largest text on the page since urgency is the point, leave space at the bottom for a small logo, and keep it readable at thumbnail size on a phone feed." },
    { label: "Topaz Photo AI", text: "Sharpen low-res images with AI upscaling before posting." },
    { text: "Generate a few style variations of one photo to A/B test which performs better." },
    { label: "Piktochart", text: "Turn raw data or stats into a simple infographic using AI.", prompt: "Turn this data into a simple infographic. Pick the 4 most surprising or important stats and make each its own visual block with a big number, a short 5-word label, and one small icon, in that order of visual priority. Use a colourful but consistent palette across all 4 blocks, and leave the least important data out entirely rather than cramming it in: [paste stats]" },
    { text: "Preview how a design looks on different platforms using AI mockups." },
    { text: "Batch-generate a consistent icon set for a content series." },
    { label: "Fotor", text: "Generate a scroll-stopping thumbnail from a template in seconds, no design skills needed.", prompt: "Generate 3 thumbnail options for a video titled '[video title]'. Each should use bold, high-contrast text (no more than 4 words on the image itself), a clear visual focal point that hints at the video's payoff without giving it away, and colours that pop against a typical feed background. Make the 3 options visibly different concepts, not just colour variations of one idea." },
    { text: "Ask AI for quick composition or color feedback before you post." },
  ],
};

const LEADERSHIP_TIPS: Tip[] = [
  { label: "Common Sense AI", text: "Ready-made frameworks and templates for publishing a clear, age-appropriate AI-use policy, shared openly with parents.", prompt: "Search Common Sense AI's resource library for an AI-use policy template suited to K-12 schools. Once you find the closest match, adapt it to our specific grade bands, pre-primary through senior, keep the plain-language tone so parents can read it without a glossary, and flag any section that seems built for a different country's context so I know what to localise." },
  { text: "Train teachers on 3-4 recommended tools, rather than leaving it to \"figure it out yourself.\"" },
  { label: "Otter.ai / Fireflies", text: "Transcribe and summarise leadership and staff meetings automatically.", prompt: "After the meeting, ask: \"Summarise the 3 most important decisions made in this meeting, list every action item with the specific person who owns it and a deadline if one was mentioned, and flag any point where two people seemed to disagree but it wasn't fully resolved.\"" },
  { label: "DeepL / Google Translate", text: "Translate newsletters and circulars accurately into every language your parent community speaks.", prompt: "Translate this circular into Hindi and Marathi. Keep the tone formal but simple enough for any parent to understand regardless of their education level, preserve all dates, names, and numbers exactly as written, and flag any word or phrase without a clean equivalent so I can review it manually: [paste circular text]" },
  { label: "CapCut", text: "Edit event highlight reels (Annual Day, Sports Day) for social media, right from a phone.", prompt: "Turn these 20 event photos and 3 short clips into a 45-second highlight reel for Annual Day. Open with the most energetic clip in the first 3 seconds, mix photos and video throughout rather than grouping all photos together, sync the cuts to the beat of upbeat, school-appropriate music, and end on a wide shot of the whole school community, not a single close-up." },
  { text: "Run parent workshops that demystify AI, instead of just restricting it." },
  { text: "Use AI-powered accessibility tools (text-to-speech, translation) to support differently-abled students." },
  { text: "Design assessments that value reasoning and process, not just a final, AI-checkable answer." },
  { text: "Build AI literacy into the curriculum across grades, not as a one-off session." },
  { text: "Use AI to quickly analyze anonymized parent and staff feedback surveys." },
  { label: "Draw a clear line", isHabit: true, text: "AI for admin and efficiency, never for serious pastoral care or wellbeing decisions." },
];

/* ─── Config ──────────────────────────────────────────────────────── */

const AUDIENCES: { key: AudienceKey; label: string; num: string; accent: string }[] = [
  { key: "parents", label: "Parents", num: "01", accent: "#F5B731" },
  { key: "educators", label: "Educators", num: "02", accent: "#3b82f6" },
  { key: "creators", label: "Content Creators", num: "03", accent: "#a855f7" },
  { key: "leadership", label: "Schools & Leadership", num: "04", accent: "#10b981" },
];

const STAGES: { key: ParentEducatorStage; label: string }[] = [
  { key: "pre-primary", label: "Pre-Primary" },
  { key: "primary", label: "Primary" },
  { key: "middle", label: "Middle" },
  { key: "senior", label: "Senior" },
];

const FORMATS: { key: CreatorFormat; label: string }[] = [
  { key: "writing", label: "Writing" },
  { key: "video", label: "Video" },
  { key: "images", label: "Images" },
];

const HIGHLIGHT_TIP: Record<AudienceKey, { role: string; note: string }> = {
  parents: { role: "The one rule that matters most", note: "Always use AI together with your child at the younger ages, never hand over the phone and walk away. As they get older, shift from doing it with them to teaching them to check it themselves." },
  educators: { role: "The one rule that matters most", note: "Let AI speed up your admin, lesson plans, rubrics, differentiated worksheets, so you get more time for the part no tool can do: actually teaching the room." },
  creators: { role: "The one rule that matters most", note: "AI should shorten your time to a first draft, not replace your judgement. Always ask yourself: does this sound engaging, or generic?" },
  leadership: { role: "The one rule that matters most", note: "Draw a clear line early: AI is for admin and efficiency. It is never a substitute for serious pastoral care or wellbeing decisions." },
};

const AUDIENCE_INTRO: Record<AudienceKey, string> = {
  parents: "AI at home works best as something you do with your child, not for them. These tips are grouped by school stage, since what's useful at 4 looks very different from what's useful at 16.",
  educators: "The fastest wins for teachers are almost always admin: lesson plans, worksheets, rubrics, and reports. That's time you get back for the part of teaching no tool can do. Pick your stage below.",
  creators: "Whether you're posting for the school or for yourself, AI should get you to a good first draft faster, not do the thinking for you. Pick the format you work in most.",
  leadership: "For school leaders, the job isn't picking the fanciest tool. It's setting clear, sensible ground rules so staff, students, and parents all know where AI helps and where it shouldn't be used.",
};

const PROMPT_PRINCIPLES = [
  {
    title: "Be specific, not vague",
    bad: "Help me with a lesson plan.",
    good: "Give me a 40-minute lesson plan for teaching photosynthesis to 12-year-olds, with one hands-on activity.",
  },
  {
    title: "Give it a role or an audience",
    bad: "Explain black holes.",
    good: "Explain black holes like you're talking to a curious 8-year-old, using an everyday analogy.",
  },
  {
    title: "Show it what \"good\" looks like",
    bad: "Write a caption for this event photo.",
    good: "Write a caption in this style: short, warm, one line, and ends with a question.",
  },
  {
    title: "Ask for a process, not just an answer",
    bad: "What's the answer to this problem?",
    good: "Walk me through solving this step by step, and check my understanding before giving the final answer.",
  },
  {
    title: "Treat the first answer as a draft",
    bad: "Accepting the first response as final.",
    good: "That's a good start. Make it shorter, and cut the jargon.",
  },
];

const ABOUT_FAQ = [
  { q: "Who is this guide for?", a: "Anyone who wants a practical, no-fluff starting point for using AI well: parents, teachers, students who create content, and school leadership. Each audience has its own section, so you can skip straight to the part that applies to you without reading the whole guide." },
  { q: "Do I need to already know these tools?", a: "No. Every tip is written to be usable the same day, whether you've never opened an AI tool before or already use one daily. Where a tip needs a specific tool, the guide names it and explains what it does, so you can try it without any setup beyond a free account." },
  { q: "Is this list exhaustive?", a: "No. It is intentionally a quick-start, not a full course: 10 solid starting points per audience, not the final word on AI in education. AI tools change quickly, so treat the specific tools as examples and focus on the habits behind them, which last longer." },
  { q: "Who put this together?", a: "Myntmore, a B2B outbound agency based in Mumbai that uses AI tools in its own daily work. The guide is based on the practical questions we hear most often from parents, educators and school leadership about using AI well, answered in plain language without technical jargon." },
];

/* ─── Small building blocks ───────────────────────────────────────── */

// Thin fixed bar that fills left-to-right with scroll depth, giving a
// constant, low-key sense of motion/progress down an otherwise long page.
function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? Math.min(window.scrollY / scrollable, 1) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed left-0 top-0 z-[60] h-1 w-full" style={{ backgroundColor: "rgba(10,10,10,0.06)" }}>
      <div
        className="h-full origin-left"
        style={{ transform: `scaleX(${progress})`, background: "linear-gradient(90deg, #F5B731, #D97706)", transition: "transform 100ms linear" }}
      />
    </div>
  );
}

// Small floating button that fades and scales in once the reader has
// scrolled past the hero, and smooth-scrolls back to top on click.
function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="lp-card fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full shadow-lg"
      style={{
        backgroundColor: "#F5B731",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(12px) scale(0.85)",
        pointerEvents: visible ? "auto" : "none",
        transition: "opacity 0.3s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="#0A0A0A" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  );
}

function SectionEyebrow({ num, label, accent }: { num: string; label: string; accent: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="text-sm font-black tabular-nums" style={{ color: textTone(accent) }}>{num}</span>
      <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#71675E" }}>{label}</span>
    </div>
  );
}

interface TabDef<T extends string> {
  key: T;
  label: string;
}

function TabGroup<T extends string>({
  tabs,
  active,
  onChange,
  ariaLabel,
  size = "md",
}: {
  tabs: TabDef<T>[];
  active: T;
  onChange: (key: T) => void;
  ariaLabel: string;
  size?: "md" | "sm";
}) {
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const focusIndex = useCallback(
    (i: number) => {
      const key = tabs[(i + tabs.length) % tabs.length].key;
      refs.current[key]?.focus();
      onChange(tabs[(i + tabs.length) % tabs.length].key);
    },
    [tabs, onChange],
  );

  const handleKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key === "ArrowRight") { e.preventDefault(); focusIndex(i + 1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); focusIndex(i - 1); }
    else if (e.key === "Home") { e.preventDefault(); focusIndex(0); }
    else if (e.key === "End") { e.preventDefault(); focusIndex(tabs.length - 1); }
  };

  const pad = size === "sm" ? "px-4 py-3 text-xs" : "px-5 py-2.5 text-sm";

  return (
    <div role="tablist" aria-label={ariaLabel} className="flex flex-wrap gap-2">
      {tabs.map((tab, i) => {
        const isActive = tab.key === active;
        return (
          <button
            key={tab.key}
            ref={(el) => { refs.current[tab.key] = el; }}
            role="tab"
            id={`tab-${tab.key}`}
            aria-selected={isActive}
            aria-controls={`panel-${tab.key}`}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(tab.key)}
            onKeyDown={(e) => handleKeyDown(e, i)}
            className={`lp-pop-in rounded-full font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 ${pad}`}
            style={
              isActive
                ? { backgroundColor: "#F5B731", color: "#0A0A0A", boxShadow: "0 4px 14px rgba(245,183,49,0.3)", animationDelay: `${i * 60}ms` }
                : { backgroundColor: "#ffffff", color: "#52525B", border: "1px solid #E8E2D9", animationDelay: `${i * 60}ms` }
            }
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}

// Tips that name a specific tool/app get a bolder, accent-tinted "tool
// card" treatment (icon = a little app/grid glyph); tips that are more
// of a habit or mindset shift get a quieter, checkmark-style treatment.
// Same data, just grouped and styled so a flat list of 10 near-identical
// lines doesn't read as one undifferentiated dump.

function ToolIcon({ color }: { color: string }) {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2.2} aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function CheckIcon({ color }: { color: string }) {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke={color} strokeWidth={2.5} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function TipCard({ tip, accent, variant, delay = 0 }: { tip: Tip; accent: string; variant: "tool" | "practice"; delay?: number }) {
  const isTool = variant === "tool";
  const [showPrompt, setShowPrompt] = useState(false);
  return (
    <div
      className="card-fade-up tip-card-hover group rounded-2xl border p-5 shadow-sm hover:shadow-md"
      style={{
        ...(isTool ? { backgroundColor: `${accent}0A`, borderColor: `${accent}40` } : { backgroundColor: "#ffffff", borderColor: "#E8E2D9" }),
        animationDelay: `${delay}ms`,
      }}
    >
      <div className="flex items-start gap-3.5">
        <span
          className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
          style={isTool ? { backgroundColor: `${accent}22`, border: `1px solid ${accent}55` } : { backgroundColor: "#F0FDF4", border: "1px solid rgba(16,185,129,0.3)" }}
        >
          {isTool ? <ToolIcon color={accent} /> : <CheckIcon color="#16A34A" />}
        </span>
        <div className="min-w-0 flex-1">
          {tip.label && <p className="mb-1 text-sm font-black leading-snug" style={{ color: "#0a0a0a" }}>{tip.label}</p>}
          <p className="text-sm leading-relaxed" style={{ color: "#52525B" }}>{tip.text}</p>
          {tip.prompt && (
            <>
              <button
                type="button"
                onClick={() => setShowPrompt((v) => !v)}
                aria-expanded={showPrompt}
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold hover:underline"
                style={{ color: textTone(accent) }}
              >
                <svg className={`h-3 w-3 transition-transform ${showPrompt ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
                {showPrompt ? "Hide example prompt" : "See an example prompt"}
              </button>
              {showPrompt && (
                <div className="mt-3">
                  <CopyBlock text={tip.prompt} accent={accent} label="Example prompt" />
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function TipGroup({ heading, tips, accent, variant }: { heading: string; tips: Tip[]; accent: string; variant: "tool" | "practice" }) {
  if (tips.length === 0) return null;
  return (
    <div className="mb-8">
      <p className="mb-3 text-xs font-bold uppercase tracking-widest" style={{ color: variant === "tool" ? textTone(accent) : "#166534" }}>{heading}</p>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {tips.map((tip, i) => (
          <TipCard key={i} tip={tip} accent={accent} variant={variant} delay={i * 45} />
        ))}
      </div>
    </div>
  );
}

function TipGrid({ tips, accent }: { tips: Tip[]; accent: string }) {
  const toolTips = tips.filter((t) => t.label && !t.isHabit);
  const practiceTips = tips.filter((t) => !t.label || t.isHabit);
  return (
    <div>
      <TipGroup heading="Tools & apps to try" tips={toolTips} accent={accent} variant="tool" />
      <TipGroup heading="Habits worth building" tips={practiceTips} accent={accent} variant="practice" />
    </div>
  );
}

function HighlightCallout({ role, note, accent }: { role: string; note: string; accent: string }) {
  return (
    <div className="card-fade-up mt-8 rounded-2xl border p-6 sm:p-8" style={{ backgroundColor: `${accent}0D`, borderColor: `${accent}4D`, animationDelay: "180ms" }}>
      <div className="flex items-start gap-4">
        <span className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full" aria-hidden="true">
          <span
            className="absolute inset-0 rounded-full"
            style={{ border: `1.5px solid ${accent}99`, animation: "lp-radar-ping 2.4s cubic-bezier(0.22,1,0.36,1) infinite" }}
          />
          <span
            className="relative flex h-11 w-11 items-center justify-center rounded-full"
            style={{ backgroundColor: `${accent}22`, border: `1px solid ${accent}55` }}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke={accent} strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </span>
        </span>
        <div>
          <p className="mb-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: textTone(accent) }}>{role}</p>
          <p className="text-base font-semibold leading-relaxed" style={{ color: "#0a0a0a" }}>{note}</p>
        </div>
      </div>
    </div>
  );
}

function PromptPrincipleCard({ num, title, bad, good }: { num: string; title: string; bad: string; good: string }) {
  return (
    <div className="tip-card-hover group rounded-2xl border bg-white p-6 shadow-sm hover:shadow-md">
      <div className="mb-4 flex items-center gap-3">
        <span className="inline-block text-sm font-black tabular-nums transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:scale-110" style={{ color: "#71675E" }}>{num}</span>
        <h3 className="text-base font-black" style={{ color: "#0a0a0a" }}>{title}</h3>
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.18)" }}>
          <p className="mb-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: "#DC2626" }}>Instead of</p>
          <p className="text-sm italic leading-relaxed" style={{ color: "#52525B" }}>&ldquo;{bad}&rdquo;</p>
        </div>
        <div className="rounded-xl p-4" style={{ backgroundColor: "rgba(16,163,74,0.06)", border: "1px solid rgba(16,163,74,0.22)" }}>
          <p className="mb-1.5 text-xs font-bold uppercase tracking-widest" style={{ color: "#166534" }}>Try this</p>
          <p className="text-sm leading-relaxed" style={{ color: "#0a0a0a" }}>&ldquo;{good}&rdquo;</p>
        </div>
      </div>
    </div>
  );
}

/* ─── Main page ───────────────────────────────────────────────────── */

export default function EducationGuideClient() {
  const [audience, setAudience] = useState<AudienceKey>("parents");
  const [stage, setStage] = useState<ParentEducatorStage>("primary");
  const [format, setFormat] = useState<CreatorFormat>("writing");
  const hydrated = useRef(false);

  // Restore state from a shareable URL hash like #parents/primary or
  // #creators/video on first load, so a link to a specific tab actually
  // opens on that tab. Also listens for hashchange so a hash edited or
  // re-navigated to within an already-open tab (not just a fresh load)
  // updates the view too.
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;
      const [a, sub] = hash.split("/");
      if (a && AUDIENCES.some((x) => x.key === a)) {
        setAudience(a as AudienceKey);
        if (sub) {
          if (STAGES.some((s) => s.key === sub)) setStage(sub as ParentEducatorStage);
          else if (FORMATS.some((f) => f.key === sub)) setFormat(sub as CreatorFormat);
        }
      }
    };
    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  // Keep the hash in sync (replaceState, not pushState, so tab clicks
  // don't spam the browser's back button) so the current view is always
  // shareable as a link.
  useEffect(() => {
    if (!hydrated.current) { hydrated.current = true; return; }
    let hash = audience as string;
    if (audience === "parents" || audience === "educators") hash += `/${stage}`;
    if (audience === "creators") hash += `/${format}`;
    window.history.replaceState(null, "", `#${hash}`);
  }, [audience, stage, format]);

  const activeAudience = useMemo(() => AUDIENCES.find((a) => a.key === audience)!, [audience]);

  const activeTips: Tip[] = useMemo(() => {
    if (audience === "parents") return PARENTS_TIPS[stage];
    if (audience === "educators") return EDUCATORS_TIPS[stage];
    if (audience === "creators") return CREATORS_TIPS[format];
    return LEADERSHIP_TIPS;
  }, [audience, stage, format]);

  const totalTips = useMemo(() => {
    const count = (r: Record<string, Tip[]>) => Object.values(r).reduce((sum, arr) => sum + arr.length, 0);
    return count(PARENTS_TIPS) + count(EDUCATORS_TIPS) + count(CREATORS_TIPS) + LEADERSHIP_TIPS.length;
  }, []);

  return (
    <InnerLayout>
    <div style={{ backgroundColor: "#F8F6F2" }}>
      <ScrollProgress />
      <BackToTop />
      {/* ─── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-4 pb-12 pt-32">
        <div aria-hidden="true" style={{ position: "absolute", top: "-140px", left: "-160px", width: "550px", height: "550px", borderRadius: "50%", background: "radial-gradient(circle, rgba(245,183,49,0.22) 0%, rgba(217,119,6,0.08) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none", animation: "lp-float 10s ease-in-out infinite" }} />
        <div aria-hidden="true" style={{ position: "absolute", top: "-100px", right: "-160px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.16) 0%, rgba(37,99,235,0.06) 40%, transparent 68%)", filter: "blur(55px)", pointerEvents: "none", animation: "lp-float 12s ease-in-out infinite reverse" }} />
        <span className="lp-float-icon lp-pop-in hidden sm:block text-3xl" aria-hidden="true" style={{ top: "28%", left: "8%", animationDelay: "0.2s", ["--lp-rot" as any]: "-10deg" }}>🤖</span>
        <span className="lp-float-icon lp-pop-in hidden sm:block text-2xl" aria-hidden="true" style={{ top: "62%", left: "5%", animationDelay: "1.5s", ["--lp-rot" as any]: "8deg" }}>✨</span>
        <span className="lp-float-icon lp-pop-in hidden sm:block text-3xl" aria-hidden="true" style={{ top: "32%", right: "7%", animationDelay: "0.9s", ["--lp-rot" as any]: "10deg" }}>💡</span>
        <span className="lp-float-icon lp-pop-in hidden sm:block text-2xl" aria-hidden="true" style={{ top: "64%", right: "10%", animationDelay: "2.2s", ["--lp-rot" as any]: "-6deg" }}>📚</span>
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-4 py-1.5 hero-fade" style={{ borderColor: "rgba(245,183,49,0.35)", backgroundColor: "rgba(245,183,49,0.07)" }}>
            <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: "#F5B731", animation: "lp-radar-ping 2.4s cubic-bezier(0.22,1,0.36,1) infinite" }} aria-hidden="true" />
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>A Myntmore AI guide</span>
          </div>
          <h1 className="mb-4 text-4xl font-black leading-tight sm:text-6xl hero-fade-d1" style={{ color: "#0a0a0a" }}>
            AI Quick-Start Guide
          </h1>
          <p className="mx-auto max-w-2xl text-base leading-relaxed sm:text-lg hero-fade-d2" style={{ color: "#52525B" }}>
            Practical AI tips for parents, educators, and creators.
          </p>

          <div className="mx-auto mt-10 grid max-w-lg grid-cols-3 gap-4 hero-fade-d3">
            {[
              { v: String(totalTips) + "+", l: "Practical tips" },
              { v: "5", l: "Content pillars" },
              { v: "16", l: "Stages & formats" },
            ].map((s) => (
              <div key={s.l} className="lp-stat">
                <StatTicker value={s.v} className="text-3xl font-black" style={{ color: "#0a0a0a" }} />
                <p className="mt-1 text-xs font-semibold" style={{ color: "#71675E" }}>{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About Tejas ──────────────────────────────────────── */}
      <section className="border-t px-4 py-14" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <FadeIn className="mx-auto block max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-[auto_1fr] gap-8 items-start">
            <div className="relative mx-auto h-40 w-40 flex-shrink-0 overflow-hidden rounded-2xl border sm:mx-0" style={{ backgroundColor: "#EDE9E4", borderColor: "#E8E2D9" }}>
              <Image src="/tejas-2.png" alt="Tejas Jhaveri, Founder of Myntmore" fill sizes="160px" className="object-cover object-top" />
            </div>
            <div>
              <p className="mb-1 text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>About Tejas</p>
              <h2 className="mb-1 text-xl font-black" style={{ color: "#0a0a0a" }}>Tejas Jhaveri</h2>
              <p className="mb-4 text-sm" style={{ color: "#71675E" }}>Founder, Myntmore &middot; TEDx Speaker &middot; Angel Investor</p>
              <div className="space-y-3 text-sm leading-relaxed" style={{ color: "#52525B" }}>
                <p>Tejas Jhaveri is a serial entrepreneur and the founder of Myntmore, an AI-first B2B lead generation company that builds intelligent outbound systems for LinkedIn and cold outreach at scale.</p>
                <p>Over the past 12+ years, he has built and scaled outbound engines that have generated over $80 million in pipeline and revenue for companies globally. He has built, scaled, and exited multiple ventures, notably selling one of his companies through a cold-email outreach campaign itself.</p>
                <p>He is also the founder of Blipper, an AI-powered suicide prevention platform that works with banks, police, and fire departments across the UK and US, using AI to detect vulnerability and distress in real time and help teams respond with greater empathy.</p>
                <p>Beyond his ventures, he is a TEDx speaker, angel investor, and visiting professor, having taught AI, growth, and modern lead generation at institutions including IIM and ISB.</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ─── Audience selector ────────────────────────────────── */}
      <section className="border-t px-4 py-10" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-center text-xs font-bold uppercase tracking-widest" style={{ color: "#71675E" }}>Who are you here for?</p>
          <div className="flex justify-center">
            <TabGroup tabs={AUDIENCES.map((a) => ({ key: a.key, label: a.label }))} active={audience} onChange={setAudience} ariaLabel="Choose your audience" />
          </div>
        </div>
      </section>

      {/* ─── Content ──────────────────────────────────────────── */}
      <section className="px-4 py-14">
        <FadeIn key={audience} className="mx-auto max-w-4xl block">
          <SectionEyebrow num={activeAudience.num} label={activeAudience.label} accent={activeAudience.accent} />
          <h2 className="mb-3 text-2xl font-black sm:text-3xl" style={{ color: "#0a0a0a" }}>
            {audience === "parents" && "AI tips for parents, by school stage"}
            {audience === "educators" && "AI tips for educators, by school stage"}
            {audience === "creators" && "AI tips for content creators, by format"}
            {audience === "leadership" && "AI tips for schools and leadership teams"}
          </h2>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed" style={{ color: "#52525B" }}>{AUDIENCE_INTRO[audience]}</p>

          {(audience === "parents" || audience === "educators") && (
            <div
              id={`panel-${audience}`}
              role="tabpanel"
              aria-labelledby={`tab-${audience}`}
              className="mb-8"
            >
              <TabGroup tabs={STAGES} active={stage} onChange={setStage} ariaLabel="Choose school stage" size="sm" />
            </div>
          )}

          {audience === "creators" && (
            <div id="panel-creators" role="tabpanel" aria-labelledby="tab-creators" className="mb-8">
              <TabGroup tabs={FORMATS} active={format} onChange={setFormat} ariaLabel="Choose content format" size="sm" />
            </div>
          )}

          <TipGrid key={`tips-${audience}-${stage}-${format}`} tips={activeTips} accent={activeAudience.accent} />

          <HighlightCallout key={`highlight-${audience}-${stage}-${format}`} {...HIGHLIGHT_TIP[audience]} accent={activeAudience.accent} />
        </FadeIn>
      </section>

      {/* ─── Effective prompting ──────────────────────────────── */}
      <section className="border-t px-4 py-14" style={{ borderColor: "#E8E2D9", backgroundColor: "#ffffff" }}>
        <FadeIn className="mx-auto block max-w-4xl">
          <SectionEyebrow num="05" label="How to prompt effectively" accent="#0a0a0a" />
          <h2 className="mb-3 text-2xl font-black sm:text-3xl" style={{ color: "#0a0a0a" }}>
            How to write prompts that actually work
          </h2>
          <p className="mb-8 max-w-2xl text-sm leading-relaxed" style={{ color: "#52525B" }}>
            Every tip and example prompt above assumes you're talking to AI the right way. A vague prompt gets a vague answer. Here are five habits that make almost any AI tool noticeably better, starting today.
          </p>
          <div className="grid grid-cols-1 gap-4">
            {PROMPT_PRINCIPLES.map((p, i) => (
              <FadeIn key={p.title} delay={i * 70}>
                <PromptPrincipleCard num={`0${i + 1}`} title={p.title} bad={p.bad} good={p.good} />
              </FadeIn>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border p-6 sm:p-8" style={{ backgroundColor: "#FEF9EC", borderColor: "rgba(245,183,49,0.3)" }}>
            <p className="mb-2 text-xs font-bold uppercase tracking-widest" style={{ color: "#A14A08" }}>A formula worth memorising</p>
            <p className="text-base font-semibold leading-relaxed" style={{ color: "#0a0a0a" }}>
              Role or audience + specific task + format or constraints = a prompt that actually works.
            </p>
            <p className="mt-3 text-sm italic leading-relaxed" style={{ color: "#52525B" }}>
              &ldquo;You're a Grade 6 science teacher. Write 5 quiz questions on the water cycle. Keep each question under 15 words.&rdquo;
            </p>
          </div>
        </FadeIn>
      </section>

      {/* ─── About this guide (accordion) ─────────────────────── */}
      <Faq badge="Good to know" title="About this guide" items={ABOUT_FAQ} />
    </div>
    </InnerLayout>
  );
}
