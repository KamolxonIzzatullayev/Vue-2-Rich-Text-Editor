<template>
  <div class="m-4">
    <div v-html="page.content"></div>
    <div class="d-flex justify-content-between">
      <b-button variant="danger" @click="$router.go(-1)">Go back</b-button>
      <div class="d-flex gap-4">
        <b-button variant="outline-primary" :to="'/edit/' + page.id">
          Edit
        </b-button>
        <b-button variant="danger" @click="deletePage">Delete</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  head() {
    return {
      title: this.page.title,
      meta: [{ name: "keywords", content: this.page.keywords }],
    };
  },
  data() {
    return {
      page: {},
    };
  },
  mounted() {
    this.fetchPage();
  },
  methods: {
    async fetchPage() {
      try {
        const res = await axios.get(`http://localhost:3000/pages/`);

        let currentId = null;
        res.data.forEach((element) => {
          if (element.slug == this.$route.params.id) {
            currentId = element.id;
          }
        });

        const response = await axios.get(
          `http://localhost:3000/pages/${currentId}`
        );
        this.page = response.data;
      } catch (error) {
        console.error("Error fetching page:", error);
      }
    },
    async deletePage() {
      try {
        await axios.delete(
          `http://localhost:3000/pages/${this.$route.params.id}`
        );
        this.$router.push("/");
      } catch (error) {
        console.error("Error deleting page:", error);
      }
    },
  },
};
</script>
