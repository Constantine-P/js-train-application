import Component from "../core/component";
import {apiService} from "../services/api.service";
import {renderPost} from "../templates/post.template";

export class FavoriteComponent extends Component {
    constructor(id, options) {
        super(id);

        this.loader = options.loader;
    }

    init() {
        this.$el.addEventListener("click", linkClickHandler.bind(this));
    }

    onShow() {
        //const favorites = JSON.parse(localStorage.getItem("favorites"));
        const favoriteTitles = JSON.parse(localStorage.getItem("favoriteTitles"));
        const html = renderList(favoriteTitles);
        this.$el.insertAdjacentHTML("afterbegin", html);
    }

    onHide() {
        this.$el.innerHTML = "";
    }
}

function renderList(list = []) {
    if (list !== null && list.length) {
        return `
        <ul>
            ${list.map(i => `<li><a href="#" class="js-link">${i}</a></li>`).join(" ")}
        </ul>`;
    }
    return `<p class="center">Вы пока ничего не добавили</p>`
}

async function linkClickHandler(event) {
    event.preventDefault();
    let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    let favoriteTitles = JSON.parse(localStorage.getItem("favoriteTitles") || "[]");

    if (event.target.classList.contains("js-link")) {
        const title = event.target.textContent;
        const titlePos = favoriteTitles.indexOf(title);
        const postId = favorites[titlePos];
        //const postId = event.target.textContent;
        this.$el.innerHTML = "";
        this.loader.show();

        const post = await apiService.fetchPostById(postId);
        this.loader.hide();
        this.$el.insertAdjacentHTML("afterbegin", renderPost(post, {withButton: false}));

        //console.log(postId, post);
    }
}

