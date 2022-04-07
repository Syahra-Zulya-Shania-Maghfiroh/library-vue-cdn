//base URL API
var api_url = "http://localhost:8000/api";
var api_cover = "http://localhost:8000";
var api_profile = "http://localhost:8000";

// konfigurasi route
var router = [{
        path: "/",
        name: "Home",
        component: httpVueLoader("./src/components/Home.vue")
    },
    {
        path: "/book",
        name: "Book",
        component: httpVueLoader("./src/components/Book.vue")
    },
    {
        path: "/grade",
        name: "Grade",
        component: httpVueLoader("./src/components/Grade.vue")
    },
    {
        path: "/student",
        name: "Student",
        component: httpVueLoader("./src/components/Student.vue")
    },
    {
        path: "/borrow",
        name: "Borrow",
        component: httpVueLoader("./src/components/BookBorrow.vue")
    },
];

var routers = new VueRouter({ routes: router, base: "/" });

// instance vue
var app = new Vue({
    el: "#app", //elemen yang di vue kan
    //objek
    components: {
        "login": httpVueLoader("./src/components/Login.vue"),
        "apps": httpVueLoader("./src/components/App.vue")

    },
    //objek
    data: { //state /variabel global
        user: {
            id: "",
            name: "",
            email: "",
            type: "",
        },
        componentName: "",
    },
    router: routers,
    methods: {
        CekToken: function() {
            //cek cookies, apakah sudah punya token?
            if (this.$cookies.isKey('Authorization')) {
                // kalau punya token
                // mapping header token dulu
                let token = {
                        headers: { "Authorization": "Bearer " + this.$cookies.get('Authorization') }
                    }
                    //cek ke valid an token di BE
                axios.get(api_url + '/Login_check', token)
                    .then(response => {
                        if (response.data.status === 1) {
                            this.componentName = 'apps'
                        } else {
                            this.componentName = 'login'
                        }
                    })
            } else {
                this.componentName = 'login'
            }
        }
    },
    mounted() {
        this.CekToken();
    }
});