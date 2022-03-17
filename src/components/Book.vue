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
                                <th>COVER</th>
                                <th>BOOK NAME</th>
                                <th>AUTHOR</th>
                                <th>DESCRIPTION</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>ID BOOK</th>
                                <th>COVER</th>
                                <th>BOOK NAME</th>
                                <th>AUTHOR</th>
                                <th>DESCRIPTION</th>
                                <th>ACTION</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="lb in list_book" :key="lb">
                                <td>{{ lb.id_book }}</td>
                                <td><img :src="api_cover + '/images/' +  lb.image "  width="150"></td>
                                <td>{{ lb.book_name }}</td>
                                <td>{{ lb.author }}</td>
                                <td>{{ lb.description }}</td>
                                <td>
                                    <button class="btn btn-default" @click="Edit(lb)" data-bs-toggle="modal" data-bs-target="#bookcover_modal"><i class="fas fa-image fa-fw"></i></button>
                                    <button class="btn btn-info" @click="Edit(lb)" data-bs-toggle="modal" data-bs-target="#book_modal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger" @click="Delete(lb.id_book)"><i class="fas fa-trash-alt fa-fw"></i></button>
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
                        <button type="button" class="btn btn-primary" @click="Save()" data-bs-dismiss="modal">Submit</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="bookcover_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Book Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">

                        <div class="mb-3">
                            <label for="book_cover" class="form-label">Book Cover</label>
                            <input type="file" class="form-control" id="book_cover" @change="uploadCover($event)">
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Upload(id_book)" data-bs-dismiss="modal">Submit</button>
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
            book_cover: "", 
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
        Edit: function(lb) {
            this.id_book = lb.id_book
            this.book_name = lb.book_name
            this.author = lb.author
            this.description = lb.description
            this.action = "update"
        },
        uploadCover: function(e){
            this.book_cover = e.target.files[0]
        },
        Upload: function(id_book) {
            // mapping header token
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")
                }
            }
            let form = new FormData()
            form.append("book_cover", this.book_cover)

            axios.post(api_url + '/book/UploadCover/' + id_book, form, token)
            .then( response => {
                alert(response.data.message)       
            })
                this.getData()
        },
        Save: function() {
            // mapping header token
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization"), 
                }
            }

            // mapping data
            let form = {
                'book_name': this.book_name,
                'author': this.author,
                'description': this.description,
                'book_cover': this.book_cover
            }

            if(this.action === 'insert'){ //POST
            axios.post(api_url + '/book', form, token)
            .then( response => {
                alert(response.data.message)
                

                this.getData()
            })

            } else { //PUT
            axios.put(api_url + '/book/' + this.id_book, form, token)
                .then( response => {
                    alert(response.data.message)

                    this.getData()
                })
            }

            // $("#book_modal").modal('hide');
        },
        Delete: function(id_book) {
            // mapping header token
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization")}
            }

            Swal.fire({
                title: 'Are you sure delete this data?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            })
                .then((result) => {
                    if (result.isConfirmed){
                        axios.delete(api_url + '/book/' + id_book, token)
                        .then( response => {
                            Swal.fire({
                                tittle : 'Deleted!',
                                text : response.data.message,
                                icon : 'success',
                                confirmButtonText : 'OK!'
                            })

                            this.getData()
                        })

                    } else {
                        Swal.fire({
                            tittle : 'Cancelled!',
                            text : response.data.message,
                            icon : 'error',
                            confirmButtonText : 'OK!'
                        })
                    }
                })    
        }
    },
    mounted(){
        this.getData();
    }
}
</script>
