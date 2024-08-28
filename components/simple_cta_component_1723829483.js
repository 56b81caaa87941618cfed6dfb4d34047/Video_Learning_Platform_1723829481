/* Summary: This component contains a contact form with fields for name, email, and message. */
Vue.component("simple_cta_component_1723829483", {
    template: `
    <section id="cta-component" class="bg-gray-50 dark:bg-gray-800 flex-1">
        <div id="cta-inner-container" class="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
            <div id="cta-content" class="max-w-screen-md mx-auto">
                <h2 id="cta-title" class="mb-4 text-3xl font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                <form id="contact-form" @submit.prevent="submitForm" class="space-y-6">
                    <div>
                        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                        <input type="text" id="name" v-model="form.name" class="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="John Doe" required>
                    </div>
                    <div>
                        <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Email</label>
                        <input type="email" id="email" v-model="form.email" class="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="name@example.com" required>
                    </div>
                    <div>
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Message</label>
                        <textarea id="message" v-model="form.message" rows="4" class="w-full px-3 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Your message here..." required></textarea>
                    </div>
                    <button type="submit" class="w-full text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800">Send Message</button>
                </form>
            </div>
        </div>
    </section>
    `,
    data() {
        return {
            form: {
                name: '',
                email: '',
                message: ''
            }
        };
    },
    methods: {
        // Submit form method
        submitForm() {
            console.log('Form submitted:', this.form);
            // Add your form submission logic here
            // Reset form after submission
            this.form = { name: '', email: '', message: '' };
        }
        // End of submit form method
    }
});
