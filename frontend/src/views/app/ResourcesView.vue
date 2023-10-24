<template>
    <div>
        <div class="card">
            <h1>Resursi</h1>
        </div>
        <div class="row">
            <div class="col">
                <div class="card">
                    <h2>
                        Dobro došao/la u Šou program, još jednu studentsku
                        udrugu. 🙂
                    </h2>
                    <div class="socials">
                        <p>
                            <a
                                href="https://www.instagram.com/souprogram.fipu/"
                                target="_blank"
                            >
                                <img
                                    src="../../assets/instagram-icon.png"
                                    id="icon"
                                    alt=""
                                />
                            </a>
                            <a
                                href="https://www.linkedin.com/company/sou-program/"
                                target="_blank"
                            >
                                <img
                                    src="../../assets/linkedin-icon.png"
                                    id="icon"
                                    alt=""
                            /></a>

                            <a
                                href="https://youtube.com/@SouProgramYTkanal"
                                target="_blank"
                            >
                                <img
                                    src="../../assets/youtube-icon.png"
                                    id="icon"
                                    alt=""
                            /></a>
                            <a
                                href="https://github.com/souprogram"
                                target="_blank"
                            >
                                <img
                                    src="../../assets/github-icon.png"
                                    id="icon"
                                    alt=""
                            /></a>
                        </p>
                    </div>
                    <p>Ovo je naš službeni Email: souprogram.fipu@gmail.com</p>
                    <p>
                        Ovaj link obavezno podjeli sa svima:
                        https://discord.gg/JKzMW43hTA
                    </p>
                </div>
            </div>
            <div class="col">
                <search-resources
                    :searchedResourcesByTheme="searchedResourcesByTheme"
                />
                <div
                    class="card"
                    v-show="filteredCards.includes('cybersecurity')"
                >
                    <h4>🔐 Cybersecurity</h4>
                    <div>
                        🎮 OverTheWire
                        <ul>
                            <li>
                                <a
                                    href="https://overthewire.org/wargames/natas/"
                                    target="_blank"
                                >
                                    Natas</a
                                >
                            </li>
                        </ul>
                    </div>
                </div>
                <div
                    class="card"
                    v-show="filteredCards.includes('softwareengineering')"
                >
                    <h4>👨🏻‍💻 Software Engineering</h4>
                    <div>
                        📺 YouTube kanal profesora Tankovića
                        <ul>
                            <li>
                                <a
                                    href="https://www.youtube.com/playlist?list=PLIeA2EYS12RUPm-F2Br6Ug5eWp6xIKjxT"
                                    target="_blank"
                                    id="pi"
                                    >Playlista Programsko inženjerstvo</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://www.youtube.com/playlist?list=PLIeA2EYS12RW4obW-O64LsfcS6lhKIHre"
                                    target="_blank"
                                    >Playlista Web aplikacije</a
                                >
                            </li>
                        </ul>
                    </div>
                    <div>
                        💾 Backend
                        <ul>
                            <li>
                                <a
                                    href="https://nodejs.org/en/docs"
                                    target="_blank"
                                    >Node.js</a
                                >
                            </li>
                            <li>
                                <a href="https://expressjs.com/" target="_blank"
                                    >Express.js</a
                                >
                            </li>
                        </ul>
                    </div>
                    <div>
                        🖥️ Frontend
                        <ul>
                            <li>
                                <a
                                    href="https://vuejs.org/guide/introduction.html"
                                    target="_blank"
                                    >Vue.js</a
                                >
                            </li>
                        </ul>
                    </div>
                    <div>
                        📖 MDN
                        <ul>
                            <li>
                                <a
                                    href="https://developer.mozilla.org/en-US/"
                                    target="_blank"
                                    >Web Docs</a
                                >
                            </li>
                        </ul>
                    </div>
                </div>
                <div
                    class="card"
                    v-show="filteredCards.includes('datascience')"
                >
                    <h4>🧑🏻‍🔬 Data Science</h4>
                    <div>
                        📖 Šou program materijali
                        <ul>
                            <li>
                                <a
                                    href="https://github.com/souprogram/data-science"
                                    target="_blank"
                                    >Šou program Data science GitHub
                                    repozitorij</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://youtube.com/@SouProgramYTkanal"
                                    target="_blank"
                                    >Šou program YouTube kanal</a
                                >
                            </li>
                        </ul>
                    </div>
                    <div>
                        🐍 Python
                        <ul>
                            <li>
                                <a
                                    href="https://youtube.com/watch?v=rfscVS0vtbw"
                                    target="_blank"
                                    >freeCodeCamp Python Full Course</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://youtube.com/watch?v=x7X9w_GIm1s"
                                    target="_blank"
                                    >Python in 100 seconds</a
                                >
                            </li>
                        </ul>
                    </div>
                    <div>
                        🔢 NumPy
                        <ul>
                            <li>
                                <a
                                    href="https://youtube.com/watch?v=xECXZ3tyONo"
                                    target="_blank"
                                    >NumPy in 5 minutes</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://youtube.com/watch?v=GB9ByFAIAH4"
                                    target="_blank"
                                    >Complete Python NumPy tutorial</a
                                >
                            </li>
                        </ul>
                    </div>
                    <div>
                        🐼 Pandas
                        <ul>
                            <li>
                                <a
                                    href="https://youtube.com/watch?v=zoKK5US8fPc"
                                    target="_blank"
                                    >Pandas in 60 seconds</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://youtube.com/watch?v=vmEHCJofslg"
                                    target="_blank"
                                    >Complete Python Pandas tutorial</a
                                >
                            </li>
                        </ul>
                    </div>
                    <div>
                        📺 Data science
                        <ul>
                            <li>
                                <a
                                    href="https://youtube.com/watch?v=ua-CiDNNj30"
                                    target="_blank"
                                    >Data science full tutorial</a
                                >
                            </li>
                        </ul>
                    </div>
                    <div>
                        🧮 Vjerojatnost i statistika u Pythonu
                        <ul>
                            <li>
                                <a
                                    href="https://youtube.com/playlist?list=PLVgEzPHodXi1wT9OK8B_W6Hs8Xc-gaG6N"
                                    target="_blank"
                                    >Mastering Probability and Statistics in
                                    Python YouTube playlista</a
                                >
                            </li>
                        </ul>
                    </div>
                    <div>
                        📝 Data science platforme
                        <ul>
                            <li>
                                <a
                                    href="https://www.kaggle.com/"
                                    target="_blank"
                                    >Kaggle</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://www.datacamp.com/"
                                    target="_blank"
                                    >DataCamp</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://huggingface.co/"
                                    target="_blank"
                                    >Hugging Face</a
                                >
                            </li>
                        </ul>
                    </div>
                </div>
                <div
                    class="card"
                    v-show="filteredCards.includes('competitiveprogramming')"
                >
                    <h4>🏆 Competitive Programming</h4>
                    <div>
                        📖 Predavanja Programiranje i Strukture podataka i
                        algoritmi (zip)
                        <ul>
                            <li>
                                <a
                                    href="https://www.mediafire.com/file/irkolxpu8l9thjd/Programiranje-20231024T184320Z-001.zip/file"
                                    target="_blank"
                                >
                                    Programiranje</a
                                >
                            </li>
                            <li>
                                <a
                                    href="https://www.mediafire.com/file/0of5wyvi05dqcet/Strukture+podataka+i+algoritmi-20231024T183943Z-001.zip/file"
                                    target="_blank"
                                >
                                    Strukture podataka i algoritmi</a
                                >
                            </li>
                        </ul>
                    </div>
                    <div>
                        📚 Knjiga
                        <ul>
                            <li>
                                <a
                                    href="https://dl.ebooksworld.ir/books/Introduction.to.Algorithms.4th.Leiserson.Stein.Rivest.Cormen.MIT.Press.9780262046305.EBooksWorld.ir.pdf"
                                    target="_blank"
                                    >Introduction to Algorithms - Thomas H.
                                    Cormen</a
                                >
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="card" v-if="filteredCards.includes('notfound')">
                    <div class="notFound">
                        <h5>Tražena tema nije pronađena 😢</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import searchResources from '@/components/app/searchResources.vue';
export default {
    name: 'ResourcesView',
    data() {
        return {
            searchedTheme: '',
            cards: [
                'cybersecurity',
                'softwareengineering',
                'datascience',
                'competitiveprogramming',
            ],
        };
    },
    props: {
        id: {
            type: String,
            required: true,
        },
    },
    components: {
        searchResources,
    },
    created() {
        this.searchedResourcesByTheme('');
    },
    computed: {
        filteredCards() {
            if (this.searchedTheme.trim() === '') {
                return this.cards;
            }
            const searchTerm = this.searchedTheme.toLowerCase();
            let filteredCards = this.cards.filter((card) =>
                card.includes(searchTerm)
            );
            if (filteredCards.length > 0) {
                return filteredCards;
            } else {
                filteredCards = ['notfound'];
                return filteredCards;
            }
        },
    },
    methods: {
        searchedResourcesByTheme(searchedTheme) {
            this.searchedTheme = searchedTheme;
        },
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
#icon {
    scale: 0.7;
}
.socials {
    display: flex;
    justify-content: center;
    align-items: center;
}
.notFound {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
