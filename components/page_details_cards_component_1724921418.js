<!--
INSTRUCTION: Summary: Contains a section with three cards with black background and white text. The three cards are side by side and each contains a detail name in bold above a detail value.
-->

<template>
  <section id="page-details-cards-component" class="py-8 bg-white">
    <h2 id="details-title" class="text-lg font-semibold mb-5 pl-4">Details</h2>
    <ul id="details-list" class="grid gap-4 min-[480px]:grid-cols-3 text-sm">
      <li id="project-length" class="px-5 py-4 rounded-lg bg-gradient-to-tr from-slate-950 to-slate-800 dark:from-slate-800/80 dark:to-slate-900">
        <div class="font-medium text-slate-200">Learn Anytime</div>
        <div class="text-slate-400">Access a vast library of educational videos on-demand, allowing you to learn at your own pace and schedule.</div>
      </li>
      <li id="start-date" class="px-5 py-4 rounded-lg bg-gradient-to-tr from-slate-950 to-slate-800 dark:from-slate-800/80 dark:to-slate-900">
        <div class="font-medium text-slate-200" id="start-date-des-1">Expert Instructors</div>
        <time class="text-slate-400" id="start-time-des-1">Gain knowledge from industry professionals and renowned educators through our curated collection of high-quality video lessons.</time>
      </li>
      <li id="end-date" class="px-5 py-4 rounded-lg bg-gradient-to-tr from-slate-950 to-slate-800 dark:from-slate-800/80 dark:to-slate-900">
        <div class="font-medium text-slate-200" id="end-date-des-1">Interactive Learning</div>
        <time class="text-slate-400" id="end-time-des-1">Engage with quizzes, assignments, and discussion forums to reinforce your understanding and connect with fellow learners.</time>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: "PageDetailsCardsComponent",
  data() {
    return {
      expanded: false,
      tab: null,
    };
  },
};
</script>
