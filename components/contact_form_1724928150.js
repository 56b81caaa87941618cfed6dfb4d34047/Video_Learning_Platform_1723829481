<template>
  <main class="flex justify-center align-center p-10">
    <div class="w-fit max-w-lg p-8 bg-white shadow-lg rounded-lg">
      <div>
        <h3 class="text-black font-semibold text-xl">Get Started with EduStream</h3>
        <p class="mt-3 text-black w-fit">Have questions or ready to enhance your learning journey? We're here to help!</p>
      </div>
      <form @submit.prevent class="space-y-5 mt-5">
        <div>
          <label class="font-medium text-black">Your Full Name</label>
          <input
            type="text"
            required
            class="w-full mt-2 px-3 py-2 text-black bg-white border border-gray-300 focus:border-green-500 shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label class="font-medium text-black">Email Address</label>
          <input
            type="email"
            required
            class="w-full mt-2 px-3 py-2 text-black bg-white border border-gray-300 focus:border-green-500 shadow-sm rounded-lg"
          />
        </div>
        <div>
          <label class="font-medium text-black">Phone Number (Optional)</label>
          <div class="relative mt-2">
            <select v-model="countryCode" class="text-sm bg-white outline-none rounded-lg h-full text-black">
              <option value="US">US</option>
              <option value="ES">ES</option>
              <option value="MR">MR</option>
            </select>
            <input
              type="number"
              :placeholder="getPhoneNumberPlaceholder(countryCode)"
              required
              class="w-full pl-4 pr-3 py-2 appearance-none bg-white border border-gray-300 focus:border-green-500 shadow-sm rounded-lg text-black"
            />
          </div>
        </div>
        <div>
          <label class="font-medium text-black">Your Learning Goals</label>
          <ul class="grid gap-y-2 gap-x-6 flex-wrap grid-cols-2 mt-3">
            <li
              v-for="(item, idx) in servicesItems"
              :key="idx"
              class="flex gap-x-3 text-xs justify-between space-between"
            >
              <div>
                <input
                  :id="'service-' + idx"
                  type="checkbox"
                  class="relative flex w-5 h-5 bg-white rounded-md border ring-offset-2 ring-green-600 duration-150 checkbox-item peer cursor-pointer after:absolute after:inset-x-0 after:top-[3px] after:m-auto after:w-1.5 after:h-2.5 after:border-r-2 after:border-b-2 after:border-white after:rotate-45 text-black"
                />
              </div>
              <label :for="'service-' + idx" class="cursor-pointer text-black">{ item }</label>
            </li>
          </ul>
        </div>
        <div>
          <label class="font-medium text-black">Preferred Course Category</label>
          <textarea
            required
            class="w-full mt-2 h-36 px-3 py-2 resize-none appearance-none bg-white border border-gray-300 focus:border-green-500 shadow-sm rounded-lg text-black"
          ></textarea>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <button class="w-full px-4 py-2 text-white font-medium bg-red-600 hover:bg-red-500 active:bg-red-700 rounded-lg duration-150">
            Cancel
          </button>
          <button class="w-full px-4 py-2 text-white font-medium bg-green-600 hover:bg-green-500 active:bg-green-700 rounded-lg duration-150">
            Any Additional Questions????
          </button>
        </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      expanded: false,
      data: null,
      servicesItems: [
        'Course Recommendations',
        'Technical Support',
        'Pricing Information',
        'Content Creation Partnership',
      ],
      countryCode: 'US',
    };
  },
  methods: {
    getPhoneNumberPlaceholder(countryCode) {
      switch (countryCode) {
        case 'US':
          return '+1 (555) 000-0000';
        case 'ES':
          return '+34 000 000 000';
        case 'MR':
          return '+222 000 0000';
        default:
          return '+1 (555) 000-0000';
      }
    },
  },
};
</script>

<style scoped>
</style>
