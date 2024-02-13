<template>
  <form @submit.prevent="handleSubmit">
    <h2 class="m-4">{{ mode === "create" ? "Create Page" : "Edit Page" }}</h2>
    <div class="m-4">
      <label for="title">Title:</label>
      <b-form-input
        id="title"
        v-model="formData.title"
        placeholder="Enter your name"
        type="text"
        required
      ></b-form-input>
    </div>
    <div class="m-4">
      <label for="slug">URL Slug:</label>
      <b-form-input
        id="slug"
        v-model="formData.slug"
        placeholder="Enter URL Slug"
        type="text"
        required
      ></b-form-input>
    </div>
    <div class="m-4">
      <label for="meta">Meta Keywords:</label>

      <b-form-input
        id="meta"
        v-model="formData.keywords"
        placeholder="Enter URL Slug"
        type="text"
        required
      ></b-form-input>
    </div>
    <div class="m-4">
      <label class="content">Content:</label>
      <TipTap v-model="formData.content" />
    </div>

    <div class="d-flex justify-content-between m-4">
      <b-button variant="danger" @click="$router.go(-1)">Go back</b-button>
      <b-button type="submit" variant="outline-primary">
        {{ mode === "create" ? "Create" : "Update" }} Page
      </b-button>
    </div>
  </form>
</template>

<script>
import TipTap from "./TipTap.vue";
import axios from "axios";

export default {
  components: {
    TipTap,
  },
  data() {
    return {
      formData: {
        title: "",
        slug: "",
        keywords: "",
        content: "",
      },
      mode: "create",
    };
  },
  methods: {
    async fetchPage(id) {
      try {
        const response = await axios.get(`http://localhost:3000/pages/${id}`);
        this.formData = response.data;
      } catch (error) {
        console.error("Error fetching page:", error);
      }
    },
    async handleSubmit() {
      try {
        if (this.mode === "create") {
          await axios.post("http://localhost:3000/pages", this.formData);
        } else {
          await axios.put(
            `http://localhost:3000/pages/${this.$route.params.id}`,
            this.formData
          );
        }
        this.$router.push("/");
      } catch (error) {
        console.error("Error submitting page:", error);
      }
    },
  },
  mounted() {
    if (this.$route.name === "EditPage") {
      this.mode = "update";
      this.fetchPage(this.$route.params.id);
    }
  },
};
</script>
