<template>
    <div>
        <div class="container-fluid px-4">
            <h1 class="mt-4">Book</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="">Dashboard</a></li>
                <li class="breadcrumb-item active">Book</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    List Book

                    <button @click="Add()" data-bs-toggle="modal" data-bs-target="#book_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i> Add Book</button>
                </div>
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>ID BOOK</th>
                                <th>BOOK NAME</th>
                                <th>AUTHOR</th>
                                <th>DESCRIPTION</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>ID BOOK</th>
                                <th>BOOK NAME</th>
                                <th>AUTHOR</th>
                                <th>DESCRIPTION</th>
                                <th>ACTION</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="lb in list_book" :key="lb">
                                <td>{{ lb.id_book }}</td>
                                <td>{{ lb.book_name }}</td>
                                <td>{{ lb.author }}</td>
                                <td>{{ lb.description }}</td>
                                <td>
                                    <button class="btn btn-info"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="book_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Book Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="book_name" class="form-label">Book Name</label>
                            <input type="text" class="form-control" id="book_name" v-model="book_name" placeholder="Book Name">
                        </div>

                        <div class="mb-3">
                            <label for="author" class="form-label">Author</label>
                            <input type="text" class="form-control" id="author" v-model="author" placeholder="Author">
                        </div>

                        <div class="mb-3">
                            <label for="description" class="form-label">Description</label>
                            <textarea class="form-control" id="description" v-model="description" rows="3"></textarea>
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Save()">Submit</button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
module.exports = {
    // state
    data : function(){
        return {
            id_book: "",
            book_name: "",
            author: "",
            description: "",
            action: "", //untuk membedakan di BE ini nanti post/put
            list_book: [],
        }
    },
    methods: {
        getData: function(){
            // token
            let token = {
                headers: { "Authorization": "Bearer " + this.$cookies.get('Authorization') }
            }
            axios.get(api_url + "/book", token)
            .then(response => {
                this.list_book = response.data;
            })
        }, 
        Add: function() {
            this.id_book = "",
            this.book_name = "",
            this.author = "",
            this.description = "",
            this.action = "insert"
        }, 
        Save: function() {
            // mapping header token
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            // mapping data
            let form = {
                'book_name': this.book_name,
                'author': this.author,
                'description': this.description
            }

            if(this.action === 'insert'){ //POST
                axios.post(api_url + '/book', form, token)
                .then( response => {
                    alert(response.data.message)

                    this.getData()
                })

            } else { //PUT

            }

            // $("#book_modal").modal('hide');
        }
    },
    mounted(){
        this.getData();
    }
}
</script>
