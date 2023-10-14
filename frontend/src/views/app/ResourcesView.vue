<template>
  <div>
    <div class="card">
      <h1>Naslovnica</h1>
    </div>
    <div class="row">
      <div class="col">
        <div class="card">
          <h1>Dobro došli! 🎉</h1>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <h1>Resursi</h1>
          <br />
          <h4>👨🏻‍💻 Software Engineering</h4>
          <div>
            <a
              href="https://www.youtube.com/@NikolaTankovic/playlists"
              target="_blank"
              >📺 YouTube profil profesora Tankovića</a
            >
          </div>
          <div>
            <a
              href="https://www.youtube.com/playlist?list=PLIeA2EYS12RUPm-F2Br6Ug5eWp6xIKjxT"
              target="_blank"
              >📺 Playlista profesora Tankovića (Programko inženjerstvo)</a
            >
          </div>
          <div>
            <a
              href="https://www.youtube.com/playlist?list=PLIeA2EYS12RW4obW-O64LsfcS6lhKIHre"
              target="_blank"
              >📺 Playlista profesora Tankovića (Web aplikacije)</a
            >
          </div>
          <div>
            <a href="https://nodejs.org/en/docs" target="_blank"
              >📖 Node.js dokumentacija</a
            >
          </div>
          <div>
            <a href="https://expressjs.com/" target="_blank">📖 Express</a>
          </div>
          <div>
            <a href="https://vuejs.org/guide/introduction.html" target="_blank"
              >📖 Vue dokumentacija</a
            >
          </div>
          <div>
            <a href="https://developer.mozilla.org/en-US/" target="_blank"
              >📖 MDN Web Docs</a
            >
          </div>
          <br />
          <h4>🔐 Cybersecurity</h4>
          <div>
            <a href="https://overthewire.org/wargames/natas/" target="_blank"
              >🎮 OverTheWire</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResourcesView",
  data() {
    return {};
  },
};
</script>

<style scoped>
.card {
  border: none;
  padding: 1vw;
  margin-bottom: 1vw;
}
a {
  color: rgb(33, 37, 41);
}
</style>
