export default {
  async fetch(request, env, ctx) {
    // এই কোডটি public ফোল্ডারের ফাইলগুলো (HTML, CSS, JS) সার্ভ করবে
    return env.ASSETS.fetch(request);
  },
};
