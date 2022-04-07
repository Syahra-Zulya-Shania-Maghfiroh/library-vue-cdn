<template>
    <div>
        <div class="container-fluid px-4">
            <h1 class="mt-4">Grade</h1>
            <ol class="breadcrumb mb-4">
                <li class="breadcrumb-item"><a href="">Dashboard</a></li>
                <li class="breadcrumb-item active">Grade</li>
            </ol>

            <div class="card mb-4">
                <div class="card-header">
                    <i class="fas fa-table me-1"></i>
                    List Grade
                    <button @click="Add()" data-bs-toggle="modal" data-bs-target="#grade_modal" class="btn btn-primary btn-sm float-end"><i class="fas fa-plus fa-fw"></i>Add Grade</button>
                </div>
                <div class="card-body">
                    <table id="datatablesSimple" class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>ID GRADE</th>
                                <th>GRADE NAME</th>
                                <th>GROUP</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tfoot>
                            <tr>
                                <th>ID GRADE</th>
                                <th>GRADE NAME</th>
                                <th>GROUP</th>
                                <th>ACTION</th>
                            </tr>
                        </tfoot>
                        <tbody>
                            <tr v-for="lg in list_grade" :key="lg">
                                <td>{{ lg.id_grade }}</td>
                                <td>{{ lg.grade_name }}</td>
                                <td>{{ lg.group }}</td>
                                <td>
                                    <button class="btn btn-info" @click="Edit(lg)" data-bs-toggle="modal" data-bs-target="#grade_modal"><i class="fas fa-pencil-alt fa-fw"></i></button>
                                    <button class="btn btn-danger" @click="Delete(lg.id_grade)"><i class="fas fa-trash-alt fa-fw"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

               <div class="modal fade" id="grade_modal" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="staticBackdropLabel">Book Data</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="mb-3">
                            <label for="grade_name" class="form-label">Grade Name</label>
                            <input type="text" class="form-control" id="grade_name" v-model="grade_name" placeholder="Grade Name">
                        </div>

                        <div class="mb-3">
                            <label for="group" class="form-label">Group</label>
                            <input type="text" class="form-control" id="group" v-model="group" placeholder="Group">
                        </div>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-primary" @click="Save()" data-bs-dismiss="modal">Submit</button>
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
            id_grade: "",
            grade_name: "",
            group: "",
            action: "", //untuk membedakan di BE ini nanti post/put
            list_grade: [],
        }
    },
    methods : {
        getData: function(){
            // token
            let token = {
                headers: { "Authorization": "Bearer " + this.$cookies.get('Authorization') }
            }
            axios.get(api_url + "/grade", token)
            .then(response => {
                this.list_grade = response.data;
            })
        }, 
        Add: function() {
            this.id_grade = "",
            this.grade_name = "",
            this.group = "",
            this.action = "insert"
        },
        Edit: function(lg) {
            this.id_grade = lg.id_grade
            this.grade_name = lg.grade_name
            this.group = lg.group
            this.action = "update"
        },
        Delete: function(id_grade) {
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
                        axios.delete(api_url + '/grade/' + id_grade, token)
                        .then( response => {
                            Swal.fire({
                                tittle : 'Deleted!',
                                text : response.data.message,
                                icon : 'success',
                                confirmButtonText : 'OK!'
                            })

                            this.getData()
                        })

                    } 
                })    
        },
        Save: function() {
            // mapping header token
            let token = {
                headers : { "Authorization" : "Bearer " + this.$cookies.get("Authorization"), 
                }
            }

            // mapping data
            let form = {
                'grade_name': this.grade_name,
                'group': this.group,
            }

            if(this.action === 'insert'){ //POST
            axios.post(api_url + '/grade', form, token)
            .then( response => {
                Swal.fire({
                    tittle : 'Success!',
                    text : response.data.message,
                    icon : 'success',
                    confirmButtonText : 'OK!'
                })

                this.getData()
            })

            } else { //PUT
            axios.put(api_url + '/grade/' + this.id_grade, form, token)
                .then( response => {
                    Swal.fire({
                        tittle : 'Success!',
                        text : response.data.message,
                        icon : 'success',
                        confirmButtonText : 'OK!'
                    })

                    this.getData()
                })
            }

        },
    },
    mounted(){
        this.getData();
    }
}
</script>
