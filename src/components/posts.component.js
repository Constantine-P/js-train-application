import Component from "../core/component";
import {apiService} from "../services/api.service";
import {TransformService} from "../services/transform.service";
import {renderPost} from "../templates/post.template";

export class PostsComponent extends Component {
    constructor(id, {loader}) {
        super(id);
        this.loader = loader;
    }

    init() {
        this.$el.addEventListener("click", buttonHandler.bind(this))
    }

    async onShow() {
        this.loader.show();
        const fbData = await apiService.fetchPosts();
        const posts = TransformService.fbObjectToArray(fbData);
        const html = posts.map(post => renderPost(post));
        this.loader.hide();

        this.$el.insertAdjacentHTML("afterbegin", html.join(" "));
        //console.log(posts);
    }

    onHide() {
        this.$el.innerHTML = "";
    }
}


function buttonHandler(event) {
    const $el = event.target;
    const id = $el.dataset.id;
    const title = $el.dataset.title;

    if (id) {

        let favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        let favoriteTitles = JSON.parse(localStorage.getItem("favoriteTitles") || "[]");
        //console.log(favorites);

        if (favorites.includes(id)) {
            $el.textContent = "Сохранить";
            $el.classList.add("button-primary");
            $el.classList.remove("button-danger");
            favorites = favorites.filter(fId => fId !== id);
            favoriteTitles = favoriteTitles.filter(fTitle => fTitle !== title);
        } else {
            $el.textContent = "Удалить";
            $el.classList.remove("button-primary");
            $el.classList.add("button-danger");
            favorites.push(id);
            favoriteTitles.push(title);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
        localStorage.setItem("favoriteTitles", JSON.stringify(favoriteTitles));
    }
}