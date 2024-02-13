<template>
  <div class="c-page-list">
    <div class="text-center">
      <b-button variant="outline-primary" to="/create">
        Create a new Page
      </b-button>
    </div>

    <h2>Page List</h2>
    <ul class="list-group">
      <li
        class="list-group-item d-flex justify-content-between align-items-center"
        v-for="page in pages"
        :key="page.id"
      >
        <router-link :to="'/pages/' + page.slug">{{ page.title }}</router-link>
        <div class="actions d-flex gap-4">
          <b-button variant="outline-primary" @click="editPage(page.id)">
            Edit
          </b-button>
          <b-button variant="danger" @click="deletePage(page.id)">
            Delete
          </b-button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      pages: [],
    };
  },
  mounted() {
    this.fetchPages();
  },
  methods: {
    async fetchPages() {
      try {
        const response = await axios.get("http://localhost:3000/pages");
        this.pages = response.data;
      } catch (error) {
        console.error("Error fetching pages:", error);
      }
    },
    async deletePage(id) {
      try {
        await axios.delete(`http://localhost:3000/pages/${id}`);
        this.fetchPages();
      } catch (error) {
        console.error("Error deleting page:", error);
      }
    },
    editPage(id) {
      this.$router.push(`/edit/${id}`);
    },
  },
};
</script>

<style scoped lang="scss">
.c-page-list {
  padding: 1rem;
}
</style>
