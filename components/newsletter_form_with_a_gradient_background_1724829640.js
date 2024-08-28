<template>
  <section class="py-28 relative">
    <div class="relative z-10 max-w-screen-xl mx-auto px-4 justify-between items-center gap-12 md:px-8 md:flex">
      <div class="flex-1 max-w-lg">
        <h3 class="text-3xl font-bold">NEWSLETTER_TITLE_PLACEHOLDER_TEXT</h3>
      </div>
      <div class="flex-1 mt-6 md:mt-0">
        <form class="flex items-center gap-x-3 md:justify-end w-full max-w-md mx-auto">
          <div class="relative w-full">
            <svg
              class="w-6 h-6 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              ></path>
            </svg>
            <div class="flex justify-end">
              <input
                type="email"
                required
                placeholder="Enter your email"
                class="text-right w-full pl-12 pr-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
              />
            </div>
          </div>
          <button
            class="block font-medium py-2.5 px-2.5 text-sm text-center text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none rounded-lg shadow"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
    <div
      class="absolute inset-0 w-full h-full"
      style="background: linear-gradient(137.92deg, rgba(192, 132, 252, 0) 20.43%, rgba(232, 121, 249, 0.26) 49.66%, rgba(204, 171, 238, 0) 92.38%)"
    ></div>
  </section>
</template>

<script>
export default {
  name: 'NewsletterFormWithAGradientBackground',
  delimiters: ['{', '}'],
  data() {
    return {};
  },
};
</script>
